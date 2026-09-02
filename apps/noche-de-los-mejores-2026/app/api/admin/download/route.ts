import { NextRequest, NextResponse } from 'next/server';
import { getDownloadUrl } from '@/lib/r2';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key');
  if (!key) {
    return NextResponse.json({ error: 'Falta el parámetro key.' }, { status: 400 });
  }

  try {
    const url = await getDownloadUrl(key);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('[admin/download] error generando URL firmada', error);
    return NextResponse.json({ error: 'No se pudo generar el enlace de descarga.' }, { status: 500 });
  }
}
