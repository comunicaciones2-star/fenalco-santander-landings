import { z } from 'zod';

export const contactoSchema = z.object({
  nombre: z.string().trim().min(2, 'Ingresa tu nombre completo').max(120),
  empresa: z.string().trim().min(2, 'Ingresa el nombre de tu empresa').max(160),
  nit: z.string().trim().max(20).optional().or(z.literal('')),
  cargo: z.string().trim().min(2, 'Ingresa tu cargo').max(120),
  correo: z.string().trim().email('Ingresa un correo válido'),
  celular: z.string().trim().min(7, 'Ingresa un número de celular válido').max(20),
  programaInteres: z.enum(['fortaleza', 'legado', 'ambos', 'no-se']),
  mensaje: z.string().trim().max(2000).optional().or(z.literal('')),
  autorizacionDatos: z.literal(true, {
    error: 'Debes autorizar el tratamiento de datos personales',
  }),
  // Opt-in independiente del tratamiento de datos: autoriza contacto comercial/marketing.
  // No es obligatorio para poder enviar el formulario.
  autorizacionComercial: z.boolean().optional().default(false),
  // Honeypot: un bot suele rellenarlo. Debe llegar vacío en un envío legítimo.
  website: z.string().max(0).optional().or(z.literal('')),
  // Timestamp (ms) de cuándo se renderizó el formulario, para descartar envíos instantáneos.
  _ts: z.number(),
});

export type ContactoInput = z.infer<typeof contactoSchema>;
