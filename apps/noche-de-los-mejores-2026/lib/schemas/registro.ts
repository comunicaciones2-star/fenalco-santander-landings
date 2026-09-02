import { z } from 'zod';

// nit sin puntos, guiones ni dígito de verificación (regla §6 del prompt de build).
function normalizarNit(nit: string): string {
  const soloDigitos = nit.replace(/\D/g, '');
  // El DV es el último dígito cuando el usuario lo escribe separado por guion
  // (ej. "900123456-7"); si no hay guion, se asume que no lo incluyó.
  return nit.includes('-') ? soloDigitos.slice(0, -1) : soloDigitos;
}

export const registroSchema = z.object({
  nombre: z.string().trim().min(2, 'Ingresa tu nombre').max(120),
  apellido: z.string().trim().min(2, 'Ingresa tu apellido').max(120),
  email: z.string().trim().email('Ingresa un correo válido'),
  telefono: z.string().trim().min(7, 'Ingresa un número de celular válido').max(20),
  empresa: z.string().trim().min(2, 'Ingresa el nombre de tu empresa').max(160),
  nit: z.string().trim().max(20).optional().or(z.literal('')).transform((v) => (v ? normalizarNit(v) : '')),
  cargo: z.string().trim().min(2, 'Ingresa tu cargo').max(120),
  sector: z.string().trim().max(120).optional().or(z.literal('')),
  ciudad: z.string().trim().max(120).optional().or(z.literal('')),
  esAfiliado: z.enum(['si', 'no'], { error: 'Indica si tu empresa está afiliada a Fenalco' }),
  modalidad: z.enum(['postulacion', 'patrocinio'], { error: 'Selecciona una modalidad' }),
  categoriaPostulacion: z.string().trim().max(160).optional().or(z.literal('')),
  mensaje: z.string().trim().max(2000).optional().or(z.literal('')),
  aceptaHabeasData: z.literal(true, {
    error: 'Debes autorizar el tratamiento de datos personales',
  }),
  aceptaUsoMaterial: z.literal(true, {
    error: 'Debes autorizar el uso del logotipo y el material audiovisual',
  }),
  // Material promocional: opcional a nivel de submit (no bloquea el envío del formulario).
  logoKey: z.string().trim().max(500).optional().or(z.literal('')),
  logoFilename: z.string().trim().max(255).optional().or(z.literal('')),
  logoSizeBytes: z.number().nonnegative().optional(),
  logoUploadedAt: z.string().trim().max(60).optional().or(z.literal('')),
  videoKey: z.string().trim().max(500).optional().or(z.literal('')),
  videoFilename: z.string().trim().max(255).optional().or(z.literal('')),
  videoDurationSec: z.number().nonnegative().optional(),
  videoWidth: z.number().nonnegative().optional(),
  videoHeight: z.number().nonnegative().optional(),
  videoUploadedAt: z.string().trim().max(60).optional().or(z.literal('')),
  videoUrl: z.string().trim().max(2000).optional().or(z.literal('')),
  // Honeypot: un bot suele rellenarlo. Debe llegar vacío en un envío legítimo.
  website: z.string().max(0).optional().or(z.literal('')),
  // Timestamp (ms) de cuándo se renderizó el formulario, para descartar envíos instantáneos.
  _ts: z.number(),
  origen: z.string().trim().max(120).optional().or(z.literal('')),
  utm_source: z.string().trim().max(160).optional().or(z.literal('')),
  utm_medium: z.string().trim().max(160).optional().or(z.literal('')),
  utm_campaign: z.string().trim().max(160).optional().or(z.literal('')),
  utm_content: z.string().trim().max(160).optional().or(z.literal('')),
}).refine((data) => data.modalidad !== 'postulacion' || data.categoriaPostulacion, {
  message: 'Selecciona la categoría a la que te postulas',
  path: ['categoriaPostulacion'],
});

export type RegistroInput = z.infer<typeof registroSchema>;
