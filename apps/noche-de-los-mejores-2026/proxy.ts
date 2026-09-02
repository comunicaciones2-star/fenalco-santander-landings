import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createHash, timingSafeEqual } from 'node:crypto';

// Next.js 16 renombró middleware.js -> proxy.js (misma funcionalidad, ver
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};

// Compara con hash de longitud fija para poder usar timingSafeEqual incluso
// cuando el usuario envía credenciales de otra longitud (evita el throw por
// buffers de tamaño distinto y sigue siendo insensible a temporización).
function compararSeguro(a: string, b: string): boolean {
  const bufA = createHash('sha256').update(a).digest();
  const bufB = createHash('sha256').update(b).digest();
  return timingSafeEqual(bufA, bufB);
}

function solicitarCredenciales(): NextResponse {
  return new NextResponse('Autenticación requerida.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Panel administrativo NDLM 2026"' },
  });
}

export function proxy(request: NextRequest): NextResponse {
  const usuarioEsperado = process.env.ADMIN_USER;
  const claveEsperada = process.env.ADMIN_PASSWORD;

  if (!usuarioEsperado || !claveEsperada) {
    console.error('[proxy] ADMIN_USER/ADMIN_PASSWORD no configurados');
    return solicitarCredenciales();
  }

  const header = request.headers.get('authorization');
  if (!header?.startsWith('Basic ')) {
    return solicitarCredenciales();
  }

  let usuarioRecibido = '';
  let claveRecibida = '';
  try {
    const decodificado = Buffer.from(header.slice(6), 'base64').toString('utf8');
    const separador = decodificado.indexOf(':');
    usuarioRecibido = separador === -1 ? decodificado : decodificado.slice(0, separador);
    claveRecibida = separador === -1 ? '' : decodificado.slice(separador + 1);
  } catch {
    return solicitarCredenciales();
  }

  if (!compararSeguro(usuarioRecibido, usuarioEsperado) || !compararSeguro(claveRecibida, claveEsperada)) {
    return solicitarCredenciales();
  }

  return NextResponse.next();
}
