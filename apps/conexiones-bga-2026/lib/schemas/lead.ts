import { z } from 'zod';

export const TIPOS_INTERES = ['participar', 'patrocinio', 'expositor', 'alianza', 'comercial'] as const;

// nit sin puntos, guiones ni dígito de verificación — mismo patrón que
// noche-de-los-mejores-2026 (lib/schemas/registro.ts) para consistencia con lo
// que ya espera fenalco-crm.
function normalizarNit(nit: string): string {
  const soloDigitos = nit.replace(/\D/g, '');
  return nit.includes('-') ? soloDigitos.slice(0, -1) : soloDigitos;
}

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa tu nombre').max(120),
  company: z.string().trim().min(2, 'Ingresa el nombre de tu empresa').max(160),
  role: z.string().trim().max(120).optional().or(z.literal('')),
  email: z.string().trim().email('Ingresa un correo válido'),
  phone: z.string().trim().max(20).optional().or(z.literal('')),
  nit: z
    .string()
    .trim()
    .min(1, 'Ingresa el NIT de tu empresa')
    .max(20)
    .transform(normalizarNit)
    .refine((v) => v.length >= 5, 'Ingresa un NIT válido'),
  affiliated: z.enum(['si', 'no'], { error: 'Indica si tu empresa está afiliada a Fenalco' }),
  interestType: z.enum(TIPOS_INTERES, { error: 'Selecciona un tipo de interés' }),
  privacyAccepted: z.literal(true, { error: 'Debes autorizar el tratamiento de datos personales' }),
  // Honeypot: un bot suele rellenarlo, un usuario real nunca lo toca (está oculto
  // por CSS, no por display:none). A propósito SIN max(0): si aquí se rechazara
  // por longitud, zod respondería 400 antes de que el handler llegue al chequeo
  // `if (data.website)` que responde éxito falso — el bot vería un 400 en vez del
  // 200 fingido, revelando justo lo que este honeypot busca ocultar.
  website: z.string().optional().or(z.literal('')),
  // Timestamp (ms) de cuándo se renderizó el formulario, para descartar envíos instantáneos.
  _ts: z.number(),
});

export type LeadInput = z.infer<typeof leadSchema>;
