import { z } from 'zod';

// nit sin puntos, guiones ni dígito de verificación (regla §6 del prompt de build).
function normalizarNit(nit: string): string {
  const soloDigitos = nit.replace(/\D/g, '');
  // El DV es el último dígito cuando el usuario lo escribe separado por guion
  // (ej. "900123456-7"); si no hay guion, se asume que no lo incluyó.
  return nit.includes('-') ? soloDigitos.slice(0, -1) : soloDigitos;
}

// Categorías que se otorgan a nombre de una persona (no de la empresa): en la
// premiación se nombra también a la persona, así que estas exigen cédula.
// Los valores deben coincidir EXACTO con content/event.config.ts → categorias[].nombre.
export const CATEGORIAS_NOMBRE_PERSONAL = [
  'Mujer Insignia Empresarial',
  'Toda una Vida Dedicada al Fomento Empresarial',
] as const;

export const registroSchema = z.object({
  nombre: z.string().trim().min(2, 'Ingresa tu nombre').max(120),
  apellido: z.string().trim().min(2, 'Ingresa tu apellido').max(120),
  email: z.string().trim().email('Ingresa un correo válido'),
  telefono: z.string().trim().min(7, 'Ingresa un número de celular válido').max(20),
  empresa: z.string().trim().min(2, 'Ingresa el nombre de tu empresa').max(160),
  nit: z
    .string()
    .trim()
    .min(1, 'Ingresa el NIT de tu empresa')
    .max(20)
    .transform(normalizarNit)
    .refine((v) => v.length >= 5, 'Ingresa un NIT válido'),
  cargo: z.string().trim().min(2, 'Ingresa tu cargo').max(120),
  sector: z.string().trim().max(120).optional().or(z.literal('')),
  ciudad: z.string().trim().max(120).optional().or(z.literal('')),
  esAfiliado: z.enum(['si', 'no'], { error: 'Indica si tu empresa está afiliada a Fenalco' }),
  modalidad: z.enum(['postulacion', 'patrocinio'], { error: 'Selecciona una modalidad' }),
  categoriaPostulacion: z.string().trim().max(160).optional().or(z.literal('')),
  // Solo obligatoria cuando categoriaPostulacion es una categoría a nombre personal
  // (ver superRefine abajo). Se normaliza a solo dígitos, igual que el NIT.
  cedula: z
    .string()
    .trim()
    .max(15)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v ? v.replace(/\D/g, '') : '')),
  // 4 preguntas para el jurado (sustentación) — obligatorias para las 10 categorías,
  // incluidas las 2 a nombre personal (el premio sigue siendo sobre la trayectoria
  // dentro de una organización). Solo aplican a postulación, nunca a patrocinio —
  // por eso quedan .optional() aquí y la obligatoriedad real vive en el superRefine
  // de abajo, mismo patrón que categoriaPostulacion/cedula.
  aniosFundacion: z.string().trim().max(50).optional().or(z.literal('')),
  // Sin z.url(): a propósito no se bloquea el envío por un formato imperfecto
  // (ej. sin "https://"), solo se exige que no esté vacío — decisión explícita.
  paginaWeb: z.string().trim().max(300).optional().or(z.literal('')),
  numeroEmpleados: z.string().trim().max(20).optional().or(z.literal('')),
  recibioPremioAnterior: z.enum(['si', 'no']).optional(),
  // Una sola respuesta libre (categoría + año en el mismo texto, ej. "Mercurio de
  // Oro, 2023") — obligatorio solo si recibioPremioAnterior === 'si', ver superRefine.
  detallePremioAnterior: z.string().trim().max(300).optional().or(z.literal('')),
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
}).superRefine((data, ctx) => {
  if (data.modalidad !== 'postulacion') return;

  if (!data.categoriaPostulacion) {
    ctx.addIssue({
      code: 'custom',
      message: 'Selecciona la categoría a la que te postulas',
      path: ['categoriaPostulacion'],
    });
    return;
  }

  const esCategoriaPersonal = (CATEGORIAS_NOMBRE_PERSONAL as readonly string[]).includes(
    data.categoriaPostulacion,
  );
  if (esCategoriaPersonal && data.cedula.length < 5) {
    ctx.addIssue({
      code: 'custom',
      message: 'Esta categoría se otorga a nombre personal: ingresa tu cédula',
      path: ['cedula'],
    });
  }

  // 4 preguntas del jurado — obligatorias para las 10 categorías por igual.
  if (!data.aniosFundacion) {
    ctx.addIssue({
      code: 'custom',
      message: 'Indica cuántos años tiene de fundada la empresa',
      path: ['aniosFundacion'],
    });
  }
  if (!data.paginaWeb) {
    ctx.addIssue({
      code: 'custom',
      message: 'Ingresa la página web de tu empresa',
      path: ['paginaWeb'],
    });
  }
  if (!data.numeroEmpleados) {
    ctx.addIssue({
      code: 'custom',
      message: 'Indica el número de empleados generados por la empresa',
      path: ['numeroEmpleados'],
    });
  }
  if (!data.recibioPremioAnterior) {
    ctx.addIssue({
      code: 'custom',
      message: 'Indica si ha recibido un premio en ediciones pasadas de La Noche de los Mejores',
      path: ['recibioPremioAnterior'],
    });
  } else if (data.recibioPremioAnterior === 'si' && !data.detallePremioAnterior) {
    ctx.addIssue({
      code: 'custom',
      message: 'Indica en qué categoría y en qué año',
      path: ['detallePremioAnterior'],
    });
  }
});

export type RegistroInput = z.infer<typeof registroSchema>;
