import { NextRequest, NextResponse } from 'next/server';
import { registroSchema, type RegistroInput } from '@/lib/schemas/registro';
import { signMaterialToken } from '@/lib/token';
import { sendMaterialEmail } from '@/lib/materialEmail';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const MIN_SUBMIT_MS = 3_000;

interface MaterialLogo {
  key: string;
  filename: string;
  sizeBytes: number;
  uploadedAt: string;
}

interface MaterialVideo {
  key?: string;
  filename?: string;
  durationSec?: number;
  width?: number;
  height?: number;
  via: 'upload' | 'enlace';
  url?: string;
  uploadedAt: string;
}

interface Material {
  logo: MaterialLogo | null;
  video: MaterialVideo | null;
  estado: 'pendiente' | 'parcial' | 'completo';
}

function buildMaterial(data: RegistroInput): Material {
  const logo: MaterialLogo | null = data.logoKey
    ? {
        key: data.logoKey,
        filename: data.logoFilename || '',
        sizeBytes: data.logoSizeBytes ?? 0,
        uploadedAt: data.logoUploadedAt || new Date().toISOString(),
      }
    : null;

  let video: MaterialVideo | null = null;
  if (data.videoKey) {
    video = {
      key: data.videoKey,
      filename: data.videoFilename || '',
      durationSec: data.videoDurationSec,
      width: data.videoWidth,
      height: data.videoHeight,
      via: 'upload',
      uploadedAt: data.videoUploadedAt || new Date().toISOString(),
    };
  } else if (data.videoUrl) {
    video = { via: 'enlace', url: data.videoUrl, uploadedAt: new Date().toISOString() };
  }

  const estado: Material['estado'] = logo && video ? 'completo' : logo ? 'parcial' : 'pendiente';

  return { logo, video, estado };
}

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

async function sendViaResend(data: RegistroInput, material: Material): Promise<void> {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  const etiquetaModalidad = data.modalidad === 'postulacion' ? 'Postulación' : 'Patrocinio';
  const etiquetaMaterial = `${material.estado}${material.logo ? ' · logo ✓' : ' · logo ✗'}${material.video ? ' · video ✓' : ''}`;

  const result = await resend.emails.send({
    from: process.env.LEADS_FROM_EMAIL ?? 'onboarding@resend.dev',
    to: process.env.LEADS_TO_EMAIL ?? '',
    subject: `Nuevo lead · La Noche de los Mejores 2026 · ${etiquetaModalidad} · ${data.empresa}`,
    html: `
      <h2>Nuevo lead — La Noche de los Mejores 2026 (${etiquetaModalidad})</h2>
      <ul>
        <li><strong>Nombre:</strong> ${data.nombre} ${data.apellido}</li>
        <li><strong>Empresa:</strong> ${data.empresa}</li>
        <li><strong>NIT:</strong> ${data.nit || '—'}</li>
        <li><strong>Cargo:</strong> ${data.cargo}</li>
        <li><strong>Correo:</strong> ${data.email}</li>
        <li><strong>Celular:</strong> ${data.telefono}</li>
        <li><strong>Sector:</strong> ${data.sector || '—'}</li>
        <li><strong>Ciudad:</strong> ${data.ciudad || '—'}</li>
        <li><strong>Afiliado a Fenalco:</strong> ${data.esAfiliado === 'si' ? 'Sí' : 'No'}</li>
        ${data.modalidad === 'postulacion' ? `<li><strong>Categoría:</strong> ${data.categoriaPostulacion}</li>` : ''}
        <li><strong>Mensaje:</strong> ${data.mensaje || '—'}</li>
        <li><strong>Material promocional:</strong> ${etiquetaMaterial}</li>
        <li><strong>Origen:</strong> ${data.origen || '—'} · UTM: ${[data.utm_source, data.utm_medium, data.utm_campaign, data.utm_content].filter(Boolean).join(' / ') || '—'}</li>
      </ul>
    `,
  });

  if (result.error) throw new Error(result.error.message);
}

// Postulación → POST /api/public-forms/:slug/inscripciones (modelo Inscrito).
// Contrato verificado leyendo routes/publicForms.js + services/inscripcionService.js
// del propio backend fenalco-crm: con "schema unificado" (camposFormulario), cada
// campo llega por su `mapaA` (clave raíz) o dentro de `respuestas`, y el habeas data
// va en `consentimientos: [{ clave, aceptado }]`. La clave exacta de cada `mapaA` y del
// habeas_data para el evento "noche-de-los-mejores-2026" depende de cómo el equipo de
// Fenalco configure ese evento en el admin de fenalco-crm — no es algo que este
// repositorio pueda fijar. Se asume la convención más común (mapaA=nombre de campo,
// clave de habeas data='tratamiento_datos'); si el admin usa otras claves, ajustar aquí.
async function sendPostulacionACrm(data: RegistroInput, material: Material): Promise<string | null> {
  const baseUrl = process.env.CRM_API_BASE_URL;
  const apiKey = process.env.CRM_API_KEY;
  const slug = process.env.CRM_EVENT_SLUG;
  if (!baseUrl || !apiKey || !slug) return null;

  const response = await fetch(`${baseUrl}/api/public-forms/${slug}/inscripciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      empresa: data.empresa,
      nit: data.nit || undefined,
      cargo: data.cargo,
      origen: 'landing',
      material,
      respuestas: {
        sector: data.sector,
        ciudad: data.ciudad,
        esAfiliado: data.esAfiliado === 'si' ? 'Si' : 'No',
        categoriaPostulacion: data.categoriaPostulacion,
        mensaje: data.mensaje,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        utm_content: data.utm_content,
      },
      consentimientos: [
        { clave: 'tratamiento_datos', aceptado: data.aceptaHabeasData },
        { clave: 'uso_material_promocional', aceptado: data.aceptaUsoMaterial },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`fenalco-crm (inscripciones) respondió ${response.status}: ${body}`);
  }

  const result = (await response.json()) as { id: string };
  return result.id;
}

// Patrocinio → POST /api/public-forms/patrocinadores/:slug (modelo Patrocinador, contrato
// DISTINTO al de inscripciones — ver mismo archivo backend). Usa CRM_SPONSOR_SLUG, que es
// un slug de patrocinadores independiente del slug de inscripciones.
async function sendPatrocinioACrm(data: RegistroInput, material: Material): Promise<string | null> {
  const baseUrl = process.env.CRM_API_BASE_URL;
  const apiKey = process.env.CRM_API_KEY;
  const slug = process.env.CRM_SPONSOR_SLUG;
  if (!baseUrl || !apiKey || !slug) return null;

  const response = await fetch(`${baseUrl}/api/public-forms/patrocinadores/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({
      esEmpresa: true,
      razonSocial: data.empresa,
      nit: data.nit || undefined,
      contactoNombre: data.nombre,
      contactoApellido: data.apellido,
      contactoCargo: data.cargo,
      contactoEmail: data.email,
      contactoTelefono: data.telefono,
      sector: data.sector || undefined,
      material,
      consentimiento: { autorizado: data.aceptaHabeasData, usoMaterial: data.aceptaUsoMaterial },
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`fenalco-crm (patrocinadores) respondió ${response.status}: ${body}`);
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

  const parsed = registroSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const material = buildMaterial(data);

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
      algunoEntregado = await sendViaResend(data, material)
        .then(() => true)
        .catch((err) => {
          console.error('[registro] fallo envío Resend', err);
          return false;
        }) || algunoEntregado;
    }

    let registroId: string | null = null;
    const enviarACrm = data.modalidad === 'postulacion' ? sendPostulacionACrm : sendPatrocinioACrm;
    if (process.env.CRM_API_BASE_URL) {
      registroId = await enviarACrm(data, material).catch((err) => {
        console.error('[registro] fallo envío a fenalco-crm', err);
        return null;
      });
      algunoEntregado = algunoEntregado || registroId !== null;
    }

    // El enlace de material solo tiene sentido si el registro quedó identificado
    // en el CRM: es lo que permite al PATCH posterior (/api/registro/material)
    // saber qué registro actualizar.
    if (registroId && process.env.RESEND_API_KEY) {
      const token = signMaterialToken({
        modalidad: data.modalidad,
        nit: data.nit,
        registroId,
        empresa: data.empresa,
      });
      await sendMaterialEmail({ nombre: data.nombre, email: data.email, modalidad: data.modalidad, token }).catch(
        (err) => console.error('[registro] fallo envío de correo de material', err),
      );
    }

    if (!algunoEntregado) {
      console.info('[registro] lead recibido (sin canal de entrega configurado o todos fallaron):', {
        modalidad: data.modalidad,
        empresa: data.empresa,
        email: data.email,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[registro] error interno inesperado', error);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
