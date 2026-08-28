import { NextRequest, NextResponse } from 'next/server';
import { contactoSchema, type ContactoInput } from '@/lib/schemas/contacto';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const MIN_SUBMIT_MS = 3_000;

// Best-effort: en serverless cada instancia tiene su propio Map, así que el
// límite no es global, pero igual disuade a bots simples de un solo origen.
const requestsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

async function sendViaResend(data: ContactoInput): Promise<void> {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: process.env.LEADS_FROM_EMAIL ?? 'onboarding@resend.dev',
    to: process.env.LEADS_TO_EMAIL ?? '',
    subject: `Nuevo lead · Fortaleza & Legado · ${data.empresa}`,
    html: `
      <h2>Nuevo lead — Proyecto Fortaleza & Legado</h2>
      <ul>
        <li><strong>Nombre:</strong> ${data.nombre}</li>
        <li><strong>Empresa:</strong> ${data.empresa}</li>
        <li><strong>NIT:</strong> ${data.nit || '—'}</li>
        <li><strong>Cargo:</strong> ${data.cargo}</li>
        <li><strong>Correo:</strong> ${data.correo}</li>
        <li><strong>Celular:</strong> ${data.celular}</li>
        <li><strong>Proyecto de interés:</strong> ${data.programaInteres}</li>
        <li><strong>Mensaje:</strong> ${data.mensaje || '—'}</li>
      </ul>
    `,
  });

  if (result.error) throw new Error(result.error.message);
}

// Mapea nuestro formulario al contrato real de fenalco-crm (verificado leyendo
// routes/publicForms.js + services/inscripcionService.js del propio backend):
// - Campos con `mapaA` en formularioConfig.camposFormulario van como clave RAÍZ
//   del body (nombre, apellido, empresa, cargo, email, telefono, nit).
// - Campos sin `mapaA` (ej. cual_es_tu_principal_interes) van dentro de
//   `respuestas: { <clave>: valor }`, no como clave raíz.
// - Los campos tipo "habeas_data" (tratamiento_datos, consentimiento_comercial)
//   NO se envían como booleanos sueltos: van en un array `consentimientos:
//   [{ clave, aceptado }]` — construirConsentimientos() en el backend busca ahí.
const PROGRAMA_A_ETIQUETA: Record<ContactoInput['programaInteres'], string> = {
  fortaleza: 'Proyecto Fortaleza',
  legado: 'Proyecto Legado',
  ambos: 'Ambos',
  'no-se': 'Aún no estoy seguro',
};

function splitNombreApellido(nombreCompleto: string): { nombre: string; apellido: string } {
  const partes = nombreCompleto.trim().split(/\s+/);
  return { nombre: partes[0] ?? '', apellido: partes.slice(1).join(' ') || partes[0] };
}

async function sendToFenalcoCrm(data: ContactoInput): Promise<void> {
  const baseUrl = process.env.CRM_API_BASE_URL;
  const apiKey = process.env.CRM_API_KEY;
  const slug = process.env.CRM_EVENT_SLUG;
  if (!baseUrl || !apiKey || !slug) return;

  const { nombre, apellido } = splitNombreApellido(data.nombre);

  const response = await fetch(`${baseUrl}/api/public-forms/${slug}/inscripciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({
      nombre,
      apellido,
      empresa: data.empresa,
      cargo: data.cargo,
      email: data.correo,
      telefono: data.celular,
      nit: data.nit || undefined,
      respuestas: {
        cual_es_tu_principal_interes: PROGRAMA_A_ETIQUETA[data.programaInteres],
      },
      consentimientos: [
        { clave: 'tratamiento_datos', aceptado: data.autorizacionDatos },
        { clave: 'consentimiento_comercial', aceptado: false },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`fenalco-crm respondió ${response.status}: ${body}`);
  }
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

  const parsed = contactoSchema.safeParse(body);
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
      algunoEntregado = await sendViaResend(data)
        .then(() => true)
        .catch((err) => {
          console.error('[contacto] fallo envío Resend', err);
          return false;
        }) || algunoEntregado;
    }

    if (process.env.CRM_API_BASE_URL) {
      algunoEntregado = await sendToFenalcoCrm(data)
        .then(() => true)
        .catch((err) => {
          console.error('[contacto] fallo envío a fenalco-crm', err);
          return false;
        }) || algunoEntregado;
    }

    if (!algunoEntregado) {
      console.info('[contacto] lead recibido (sin canal de entrega configurado o todos fallaron):', {
        empresa: data.empresa,
        correo: data.correo,
        programaInteres: data.programaInteres,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contacto] error interno inesperado', error);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
