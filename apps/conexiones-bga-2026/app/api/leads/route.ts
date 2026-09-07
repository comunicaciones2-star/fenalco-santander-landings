import { NextRequest, NextResponse } from 'next/server';
import { leadSchema, type LeadInput } from '@/lib/schemas/lead';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const MIN_SUBMIT_MS = 3_000;

const TIPO_INTERES_LABEL: Record<LeadInput['interestType'], string> = {
  participar: 'Participar en el evento',
  patrocinio: 'Patrocinio',
  expositor: 'Expositor / marca',
  alianza: 'Alianza institucional',
  comercial: 'Información comercial',
};

// Best-effort: en serverless cada instancia tiene su propio Map, así que el
// límite no es global, pero igual disuade a bots simples de un solo origen.
// Mismo patrón que noche-de-los-mejores-2026 (app/api/registro/route.ts).
const requestsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

async function sendViaResend(data: LeadInput): Promise<void> {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const result = await resend.emails.send({
    from: process.env.LEADS_FROM_EMAIL ?? 'onboarding@resend.dev',
    to: process.env.LEADS_TO_EMAIL ?? '',
    subject: `Nuevo lead · CONEXIONES BGA · ${TIPO_INTERES_LABEL[data.interestType]} · ${data.company}`,
    html: `
      <h2>Nuevo lead — CONEXIONES BGA 2026</h2>
      <ul>
        <li><strong>Nombre:</strong> ${data.name}</li>
        <li><strong>Empresa:</strong> ${data.company}</li>
        <li><strong>NIT:</strong> ${data.nit}</li>
        <li><strong>Cargo:</strong> ${data.role || '—'}</li>
        <li><strong>Correo:</strong> ${data.email}</li>
        <li><strong>Teléfono / WhatsApp:</strong> ${data.phone || '—'}</li>
        <li><strong>Afiliado a Fenalco:</strong> ${data.affiliated === 'si' ? 'Sí' : 'No'}</li>
        <li><strong>Tipo de interés:</strong> ${TIPO_INTERES_LABEL[data.interestType]}</li>
      </ul>
    `,
  });

  if (result.error) throw new Error(result.error.message);
}

// Contrato verificado leyendo routes/publicForms.js del propio backend fenalco-crm
// (NEXO): con el "schema unificado" (camposFormulario), cada campo llega por su
// `mapaA` (clave raíz) o dentro de `respuestas`, y el habeas data va en
// `consentimientos: [{ clave, aceptado }]` — igual patrón que
// noche-de-los-mejores-2026 (app/api/registro/route.ts).
//
// El evento "conexiones-bga-evento-2026" ya está sembrado en fenalco-crm
// (scripts/seed-conexiones-bga-evento.js, confirmado con el cliente) con 7
// campos: empresa, nit, nombre, telefono, email, esAfiliado, tratamiento_datos.
// Ninguno declara "cargo" ni "tipoInteres" — van dentro de `respuestas` como
// datos libres, mismo patrón que nit/esAfiliado en la app hermana.
async function sendACrm(data: LeadInput): Promise<string | null> {
  const baseUrl = process.env.CRM_API_BASE_URL;
  const apiKey = process.env.CRM_API_KEY;
  const slug = process.env.CRM_EVENT_SLUG;
  if (!baseUrl || !apiKey || !slug) return null;

  const response = await fetch(`${baseUrl}/api/public-forms/${slug}/inscripciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({
      nombre: data.name,
      email: data.email,
      telefono: data.phone || undefined,
      empresa: data.company,
      cargo: data.role || undefined,
      origen: 'landing-conexiones-bga',
      respuestas: {
        nit: data.nit,
        esAfiliado: data.affiliated === 'si' ? 'Si' : 'No',
        tipoInteres: TIPO_INTERES_LABEL[data.interestType],
      },
      consentimientos: [{ clave: 'tratamiento_datos', aceptado: data.privacyAccepted }],
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`fenalco-crm (inscripciones) respondió ${response.status}: ${body}`);
  }

  const result = (await response.json()) as { id: string };
  return result.id;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot activado: responder éxito falso para no delatar al bot.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (Date.now() - data._ts < MIN_SUBMIT_MS) {
    return NextResponse.json({ ok: false, error: 'too_fast' }, { status: 400 });
  }

  try {
    // Los canales son independientes: cada uno se intenta si está configurado,
    // y que uno falle no debe impedir ni ocultar el resultado del otro.
    let algunoEntregado = false;

    if (process.env.RESEND_API_KEY) {
      algunoEntregado =
        (await sendViaResend(data)
          .then(() => true)
          .catch((err) => {
            console.error('[leads] fallo envío Resend', err);
            return false;
          })) || algunoEntregado;
    }

    if (process.env.CRM_API_BASE_URL) {
      const registroId = await sendACrm(data).catch((err) => {
        console.error('[leads] fallo envío a fenalco-crm', err);
        return null;
      });
      algunoEntregado = algunoEntregado || registroId !== null;
    }

    if (!algunoEntregado) {
      console.info('[leads] lead recibido (sin canal de entrega configurado o todos fallaron):', {
        empresa: data.company,
        email: data.email,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[leads] error interno inesperado', error);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
