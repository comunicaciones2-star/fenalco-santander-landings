// Identidad visual fija de CONEXIONES BGA — no rediseñar. Paleta y radios definidos
// en el brief de marca del evento (2.ª edición, 2026).
export interface Theme {
  colors: {
    green: string;
    greenDark: string;
    lime: string;
    yellow: string;
    navy: string;
    navyAlt: string;
    surface: string;
    surfaceAlt: string;
    ink: string;
    inkSoft: string;
  };
  fonts: { body: string };
  radius: { sm: string; md: string; lg: string };
}

export const conexionesTheme: Theme = {
  colors: {
    green: '#0E7A3C', // verde principal — masas grandes, CTA
    greenDark: '#0B5F30', // hover/active del verde principal
    lime: '#8DC63F', // verde secundario — jerarquías de apoyo, nunca protagonista
    yellow: '#F5C518', // acento — uso limitado (kicker, detalles, foco)
    navy: '#1B3A4B', // azul oscuro — bloques institucionales
    navyAlt: '#132C39', // variante más oscura del navy para profundidad sutil
    surface: '#FFFFFF', // blanco — fondo dominante
    surfaceAlt: '#F5F7F5', // gris hueso muy sutil, para alternar sin salir del blanco
    ink: '#132320', // texto principal sobre fondos claros
    inkSoft: '#425650', // texto secundario sobre fondos claros
  },
  fonts: { body: 'Ubuntu' },
  radius: { sm: '10px', md: '18px', lg: '28px' },
};
