// Reglas compartidas cliente/servidor para la carga de archivos a R2.
// Deben coincidir exactamente entre la validación local (FileUpload.tsx) y la
// validación del endpoint (/api/uploads/presign): un límite ajustado en un solo
// lado deja al usuario con un archivo aceptado en el navegador y rechazado en el servidor.

export type TipoArchivo = 'logo' | 'video';
export type Modalidad = 'postulantes' | 'patrocinadores';

interface ReglaLogo {
  extensiones: readonly ['ai', 'eps', 'pdf', 'svg', 'png'];
  mimes: readonly string[];
  maxBytes: number;
  minPixelsPngLadoLargo: number;
}

interface ReglaVideo {
  extensiones: readonly ['mp4', 'mov'];
  mimes: readonly string[];
  maxBytes: number;
  maxDurationSec: number;
  ratioEsperado: number;
  toleranciaRatio: number;
}

export const LOGO: ReglaLogo = {
  extensiones: ['ai', 'eps', 'pdf', 'svg', 'png'],
  mimes: [
    'application/postscript', // .ai y .eps
    'application/illustrator', // .ai (algunos navegadores/SO)
    'application/pdf',
    'image/svg+xml',
    'image/png',
  ],
  maxBytes: 25 * 1024 * 1024,
  minPixelsPngLadoLargo: 2000,
};

export const VIDEO: ReglaVideo = {
  extensiones: ['mp4', 'mov'],
  mimes: ['video/mp4', 'video/quicktime'],
  maxBytes: 300 * 1024 * 1024,
  maxDurationSec: 65,
  ratioEsperado: 9 / 16,
  toleranciaRatio: 0.05,
};

export function sanitizeNit(nit: string): string {
  return nit.replace(/[^0-9-]/g, '');
}

export function buildKey({
  modalidad,
  nit,
  tipo,
  ext,
}: {
  modalidad: Modalidad;
  nit: string;
  tipo: TipoArchivo;
  ext: string;
}): string {
  return `ndlm-2026/${modalidad}/${sanitizeNit(nit)}/${tipo}.${ext}`;
}
