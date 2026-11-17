import { config } from '@/content/event.config';

export type Modalidad = 'postulacion' | 'patrocinio' | 'asistentes';

export function useCierreModalidad(modalidad: Modalidad) {
  const cierre = config.cierres.find((c) => c.id === modalidad);
  if (!cierre) return { cerrado: false, nombre: '', mensaje: '' };

  // Si el config marca explícitamente como cerrado, respeta eso (testing/manual override)
  if (cierre.cerrado) {
    return {
      cerrado: true,
      nombre: cierre.nombre,
      mensaje: `${cierre.nombre} ya está cerrada. Gracias por tu interés.`,
    };
  }

  // Si no tiene fecha de cierre configurada, está abierta indefinidamente
  if (!cierre.cierreFecha) {
    return { cerrado: false, nombre: cierre.nombre, mensaje: '' };
  }

  const ahora = new Date();
  const fechaCierre = new Date(cierre.cierreFecha);
  const esCerrada = ahora >= fechaCierre;

  return {
    cerrado: esCerrada,
    nombre: cierre.nombre,
    mensaje: esCerrada
      ? `La ${cierre.nombre} ya está cerrada. Gracias por tu interés.`
      : '',
  };
}
