import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { LOGO, VIDEO, buildKey, type TipoArchivo } from '@/lib/upload-rules';
import { getUploadUrl } from '@/lib/r2';

export const runtime = 'nodejs';

const presignSchema = z.object({
  modalidad: z.enum(['postulantes', 'patrocinadores'], { error: 'Modalidad inválida' }),
  nit: z.string().trim().min(1, 'Falta el NIT'),
  tipo: z.enum(['logo', 'video'], { error: 'Tipo de archivo inválido' }),
  filename: z.string().trim().min(1, 'Falta el nombre del archivo'),
  contentType: z.string().trim().min(1, 'Falta el tipo de contenido'),
  sizeBytes: z.number().positive('El tamaño del archivo no es válido'),
});

function getExtension(filename: string): string {
  const partes = filename.toLowerCase().split('.');
  return partes.length > 1 ? partes[partes.length - 1] : '';
}

function validarArchivo(
  tipo: TipoArchivo,
  ext: string,
  contentType: string,
  sizeBytes: number,
): string | null {
  const regla = tipo === 'logo' ? LOGO : VIDEO;

  if (!(regla.extensiones as readonly string[]).includes(ext)) {
    return tipo === 'logo'
      ? 'El logo debe ser un archivo .ai, .eps, .pdf, .svg o .png.'
      : 'El video debe ser un archivo .mp4 o .mov.';
  }

  if (!regla.mimes.includes(contentType)) {
    return 'El tipo de archivo no coincide con su extensión.';
  }

  if (sizeBytes > regla.maxBytes) {
    const maxMb = Math.round(regla.maxBytes / (1024 * 1024));
    return `El archivo supera el tamaño máximo permitido de ${maxMb} MB.`;
  }

  return null;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'La solicitud no tiene un formato JSON válido.' }, { status: 400 });
  }

  const parsed = presignSchema.safeParse(body);
  if (!parsed.success) {
    const mensaje = parsed.error.issues[0]?.message ?? 'Datos de la solicitud inválidos.';
    return NextResponse.json({ error: mensaje }, { status: 400 });
  }

  const { modalidad, nit, tipo, filename, contentType, sizeBytes } = parsed.data;
  const ext = getExtension(filename);

  const errorValidacion = validarArchivo(tipo, ext, contentType, sizeBytes);
  if (errorValidacion) {
    return NextResponse.json({ error: errorValidacion }, { status: 400 });
  }

  try {
    const key = buildKey({ modalidad, nit, tipo, ext });
    const uploadUrl = await getUploadUrl({ key, contentType });
    return NextResponse.json({ uploadUrl, key });
  } catch (error) {
    console.error('[uploads/presign] error generando URL prefirmada', error);
    return NextResponse.json(
      { error: 'No pudimos preparar la carga del archivo. Intenta de nuevo en unos minutos.' },
      { status: 500 },
    );
  }
}
