import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyMaterialToken } from '@/lib/token';

export const runtime = 'nodejs';

const materialSchema = z.object({
  token: z.string().min(1),
  material: z
    .object({
      logo: z
        .object({
          key: z.string().min(1),
          filename: z.string().optional(),
          sizeBytes: z.number().optional(),
          uploadedAt: z.string().optional(),
        })
        .optional(),
      video: z
        .object({
          key: z.string().optional(),
          filename: z.string().optional(),
          durationSec: z.number().optional(),
          width: z.number().optional(),
          height: z.number().optional(),
          via: z.enum(['upload', 'enlace']).optional(),
          url: z.string().optional(),
          uploadedAt: z.string().optional(),
        })
        .optional(),
    })
    .refine((m) => m.logo || m.video, { message: 'Falta logo o video en el material.' }),
});

export async function PATCH(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = materialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  const payload = verifyMaterialToken(parsed.data.token);
  if (!payload) {
    return NextResponse.json({ ok: false, error: 'token_invalido' }, { status: 401 });
  }

  const baseUrl = process.env.CRM_API_BASE_URL;
  const apiKey = process.env.CRM_API_KEY;
  const slug = payload.modalidad === 'postulacion' ? process.env.CRM_EVENT_SLUG : process.env.CRM_SPONSOR_SLUG;

  if (!baseUrl || !apiKey || !slug) {
    console.error('[registro/material] faltan variables de entorno del CRM para esta modalidad');
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }

  const ruta =
    payload.modalidad === 'postulacion'
      ? `${baseUrl}/api/public-forms/${slug}/inscripciones/${payload.registroId}/material`
      : `${baseUrl}/api/public-forms/patrocinadores/${slug}/${payload.registroId}/material`;

  try {
    const response = await fetch(ruta, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
      body: JSON.stringify({ material: parsed.data.material }),
    });

    if (!response.ok) {
      const detalle = await response.text().catch(() => '');
      console.error('[registro/material] fenalco-crm respondió', response.status, detalle);
      return NextResponse.json({ ok: false, error: 'crm_error' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[registro/material] error al actualizar el CRM', error);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
