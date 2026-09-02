import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { signMaterialToken } from '@/lib/token';
import { sendMaterialEmail } from '@/lib/materialEmail';

export const runtime = 'nodejs';

const recordatorioSchema = z.object({
  tipo: z.enum(['postulante', 'patrocinador']),
  id: z.string().min(1),
  nombre: z.string().min(1),
  nit: z.string().optional().default(''),
  email: z.string().email(),
});

// El botón "Reenviar recordatorio" de app/admin/page.tsx envía un <form>
// nativo (application/x-www-form-urlencoded), no JSON.
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const parsed = recordatorioSchema.safeParse({
    tipo: form.get('tipo'),
    id: form.get('id'),
    nombre: form.get('nombre'),
    nit: form.get('nit') ?? '',
    email: form.get('email'),
  });

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'datos_invalidos' }, { status: 400 });
  }

  const { tipo, id, nombre, nit, email } = parsed.data;
  const modalidad = tipo === 'postulante' ? 'postulacion' : 'patrocinio';

  try {
    const token = signMaterialToken({ modalidad, nit, registroId: id });
    await sendMaterialEmail({ nombre, email, modalidad, token });
  } catch (error) {
    console.error('[admin/recordatorio] fallo al reenviar', error);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }

  return NextResponse.redirect(new URL('/admin', request.url), { status: 303 });
}
