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
  // Empresa/NIT/Cargo/¿Afiliado?: obligatorios para postulación y patrocinio, NO para
  // "quiero asistir" (lead simple para quien no fue invitado — sin trámite comercial,
  // no pasa por fenalco-crm). Ver superRefine abajo.
  empresa: z.string().trim().max(160).optional().or(z.literal('')),
  nit: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v ? normalizarNit(v) : '')),
  cargo: z.string().trim().max(120).optional().or(z.literal('')),
  sector: z.string().trim().max(120).optional().or(z.literal('')),
  ciudad: z.string().trim().max(120).optional().or(z.literal('')),
  esAfiliado: z.enum(['si', 'no']).optional(),
  modalidad: z.enum(['postulacion', 'patrocinio', 'interes'], { error: 'Selecciona una modalidad' }),
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
  // Obligatorio (true) solo para postulación/patrocinio, que sí piden logotipo —
  // "quiero asistir" no tiene sección de material, no tiene sentido exigirlo. No se
  // puede usar z.literal(true) aquí porque el checkbox, cuando ni se renderiza,
  // manda `false` (no undefined) — z.literal(true).optional() seguiría rechazando
  // ese `false`. La obligatoriedad real vive en el superRefine de abajo.
  aceptaUsoMaterial: z.boolean().optional(),
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
  // Empresa/NIT/Cargo/¿Afiliado?/autorización de material: obligatorios para
  // postulación y patrocinio (ambos son trámites comerciales sobre una empresa),
  // no para "quiero asistir" (lead simple, ver arriba).
  if (data.modalidad === 'postulacion' || data.modalidad === 'patrocinio') {
    if (!data.empresa || data.empresa.length < 2) {
      ctx.addIssue({ code: 'custom', message: 'Ingresa el nombre de tu empresa', path: ['empresa'] });
    }
    if (!data.nit || data.nit.length < 5) {
      ctx.addIssue({ code: 'custom', message: 'Ingresa un NIT válido', path: ['nit'] });
    }
    if (!data.cargo || data.cargo.length < 2) {
      ctx.addIssue({ code: 'custom', message: 'Ingresa tu cargo', path: ['cargo'] });
    }
    if (!data.esAfiliado) {
      ctx.addIssue({ code: 'custom', message: 'Indica si tu empresa está afiliada a Fenalco', path: ['esAfiliado'] });
    }
    if (data.aceptaUsoMaterial !== true) {
      ctx.addIssue({
        code: 'custom',
        message: 'Debes autorizar el uso del logotipo y el material audiovisual',
        path: ['aceptaUsoMaterial'],
      });
    }
  }

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
