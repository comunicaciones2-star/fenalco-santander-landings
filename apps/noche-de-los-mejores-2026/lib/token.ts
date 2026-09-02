import { createHmac, timingSafeEqual } from 'node:crypto';

// Vigencia del enlace de material promocional: 60 días desde el registro o el
// último reenvío del recordatorio (services/materialService en fenalco-crm
// fusiona logo/video de forma independiente, así que el token solo necesita
// identificar el registro, no acompañar cada archivo).
const VIGENCIA_MS = 60 * 24 * 60 * 60 * 1000;

export interface MaterialTokenInput {
  modalidad: 'postulacion' | 'patrocinio';
  nit: string;
  registroId: string;
  // Opcional: solo para mostrar el nombre de la empresa en la cabecera de
  // /material/[token] sin tener que volver a consultar el CRM.
  empresa?: string;
}

export interface MaterialTokenPayload extends MaterialTokenInput {
  exp: number;
}

function requireSecret(): string {
  const secret = process.env.UPLOAD_TOKEN_SECRET;
  if (!secret) {
    throw new Error('Falta la variable de entorno UPLOAD_TOKEN_SECRET.');
  }
  return secret;
}

function firmar(payloadB64: string): string {
  return createHmac('sha256', requireSecret()).update(payloadB64).digest('base64url');
}

export function signMaterialToken({ modalidad, nit, registroId, empresa }: MaterialTokenInput): string {
  const payload: MaterialTokenPayload = {
    modalidad,
    nit,
    registroId,
    empresa,
    exp: Date.now() + VIGENCIA_MS,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const firma = firmar(payloadB64);
  return `${payloadB64}.${firma}`;
}

export function verifyMaterialToken(token: string): MaterialTokenPayload | null {
  if (!token || typeof token !== 'string') return null;

  const separador = token.lastIndexOf('.');
  if (separador === -1) return null;

  const payloadB64 = token.slice(0, separador);
  const firmaRecibida = token.slice(separador + 1);

  let firmaEsperada: string;
  try {
    firmaEsperada = firmar(payloadB64);
  } catch {
    return null;
  }

  const bufRecibida = Buffer.from(firmaRecibida);
  const bufEsperada = Buffer.from(firmaEsperada);
  if (bufRecibida.length !== bufEsperada.length || !timingSafeEqual(bufRecibida, bufEsperada)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as MaterialTokenPayload;

    if (payload.modalidad !== 'postulacion' && payload.modalidad !== 'patrocinio') return null;
    if (typeof payload.nit !== 'string' || typeof payload.registroId !== 'string') return null;
    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}
