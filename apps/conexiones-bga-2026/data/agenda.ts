// Fuente única de la agenda de CONEXIONES BGA 2026 (8 de octubre de 2026).
// `inicio`/`fin` en 'HH:mm', 24 h, zona horaria America/Bogota.

export type Categoria = 'institucional' | 'citas' | 'exito';

export type Item = {
  hora: string;
  inicio: string;
  fin?: string;
  titulo: string;
  ponente?: string;
  empresa?: string;
  categoria: Categoria;
  simultanea?: boolean;
};

export const AGENDA_FECHA = '2026-10-08';
export const AGENDA_TZ = 'America/Bogota';

// `fin` se completa en `AGENDA` a partir del inicio del siguiente bloque horario.
const BASE: readonly Item[] = [
  // Mañana
  { hora: '9:00 a. m.', inicio: '09:00', titulo: 'Apertura general', categoria: 'institucional' },
  { hora: '9:10 a. m.', inicio: '09:10', titulo: 'Bienvenida institucional', categoria: 'institucional' },
  { hora: '9:30 a. m.', inicio: '09:30', titulo: 'Orientación a los participantes', categoria: 'institucional' },
  { hora: '9:45 a. m.', inicio: '09:45', titulo: 'Llamado a la primera cita de negocios', categoria: 'citas' },
  { hora: '9:50 a. m.', inicio: '09:50', titulo: 'Cita de negocios 1', categoria: 'citas' },
  { hora: '10:00 a. m.', inicio: '10:00', titulo: 'Caso de Éxito #1', ponente: 'Gio Sosa', empresa: 'CEO, La Gloriosa', categoria: 'exito' },
  { hora: '10:30 a. m.', inicio: '10:30', titulo: 'Cita de negocios 2', categoria: 'citas' },
  { hora: '11:00 a. m.', inicio: '11:00', titulo: 'Caso de Éxito #2', ponente: 'Dora Najm', empresa: 'CEO, Zate', categoria: 'exito' },
  { hora: '11:10 a. m.', inicio: '11:10', titulo: 'Cita de negocios 3', categoria: 'citas' },
  { hora: '11:30 a. m.', inicio: '11:30', titulo: 'Caso de Éxito #3', ponente: 'Cristian Espinosa', empresa: 'CEO, Vekior Joyeros', categoria: 'exito' },
  { hora: '12:00 m.', inicio: '12:00', titulo: 'Continuidad de la jornada comercial', categoria: 'institucional' },
  // Tarde
  { hora: '2:00 p. m.', inicio: '14:00', titulo: 'Cita de negocios 4', categoria: 'citas' },
  { hora: '2:40 p. m.', inicio: '14:40', titulo: 'Cita de negocios 5', categoria: 'citas' },
  { hora: '3:00 p. m.', inicio: '15:00', titulo: 'Caso de Éxito #4', ponente: 'Liliana Caballero', empresa: 'Gerente, Hacienda Casablanca', categoria: 'exito' },
  { hora: '3:20 p. m.', inicio: '15:20', titulo: 'Cita de negocios 6', categoria: 'citas' },
  { hora: '4:00 p. m.', inicio: '16:00', titulo: 'Caso de Éxito #5', ponente: 'Octavio Llamas', empresa: 'CEO, Vangelis Happiness Partners', categoria: 'exito', simultanea: true },
  { hora: '4:00 p. m.', inicio: '16:00', titulo: 'Cita de negocios 7 (simultánea)', categoria: 'citas', simultanea: true },
  { hora: '4:40 p. m.', inicio: '16:40', titulo: 'Cita de negocios 8', categoria: 'citas' },
  { hora: '5:00 p. m.', inicio: '17:00', titulo: 'Caso de Éxito #6', ponente: 'Isabel Cristina Forero', empresa: 'CEO, C. C. La Quinta', categoria: 'exito' },
  { hora: '5:20 p. m.', inicio: '17:20', titulo: 'Cita de negocios 9', categoria: 'citas' },
  { hora: '5:30 p. m.', inicio: '17:30', titulo: 'Continuidad comercial y networking', categoria: 'institucional' },
  { hora: '6:00 p. m.', inicio: '18:00', titulo: 'Cita de negocios 10', categoria: 'citas' },
  { hora: '6:45 p. m.', inicio: '18:45', titulo: 'Aviso de cierre', categoria: 'institucional' },
  { hora: '7:00 p. m.', inicio: '19:00', titulo: 'Cierre oficial', categoria: 'institucional' },
];

const FIN_EVENTO = '19:30';

export const AGENDA: readonly Item[] = BASE.map((item, i) => {
  const siguiente = BASE.slice(i + 1).find((s) => s.inicio !== item.inicio);
  return { ...item, fin: siguiente?.inicio ?? FIN_EVENTO };
});

/** Minutos desde medianoche para un 'HH:mm'. */
export function aMinutos(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export const INICIO_EVENTO = aMinutos(AGENDA[0].inicio);
export const FIN_EVENTO_MIN = aMinutos(FIN_EVENTO);

export type Jornada = 'manana' | 'tarde';

/** Mañana: hasta las 12:xx (incluye "12:00 m."); tarde: desde las 14:00. */
export function jornadaDe(item: Item): Jornada {
  return aMinutos(item.inicio) < 13 * 60 ? 'manana' : 'tarde';
}
