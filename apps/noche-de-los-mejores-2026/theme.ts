// Dirección visual: "La Serenísima — Venecia Mercante" (60% lujo contemporáneo / 30% referencia
// histórica veneciana / arte de campaña oficial ya producido). Ver public/hero para las piezas
// aprobadas que fijaron esta paleta (verde laguna + negro + oro + borgoña puntual).
export interface Theme {
  colors: {
    surfaceDark: string;
    surfaceDarkAlt: string;
    borderDark: string;
    surfaceLight: string;
    surfaceLightAlt: string;
    ink: string;
    accent: string;
    accentSoft: string;
    borgona: string;
    cta: string;
    ctaInk: string;
  };
  fonts: { display: string; body: string };
  radius: 'sharp';
  rhythm: Array<'dark' | 'light'>;
}

export const nocheTheme: Theme = {
  colors: {
    surfaceDark: '#080A09', // negro laguna — hero y momentos ceremoniales
    surfaceDarkAlt: '#123A32', // verde veneciano profundo — superficie elevada
    borderDark: '#1C4A41',
    surfaceLight: '#F2EDE3', // blanco hueso — fondo dominante
    surfaceLightAlt: '#E8E1D3',
    ink: '#141310',
    accent: '#C7A45D', // oro viejo / champán
    accentSoft: '#E3D3B4', // mezcla 35% accent sobre surfaceLight
    borgona: '#541F28', // acento opcional y escaso — nunca color de sección
    cta: '#C7A45D',
    ctaInk: '#080A09',
  },
  fonts: { display: 'Bodoni Moda', body: 'Archivo' },
  radius: 'sharp',
  rhythm: ['dark', 'light', 'light', 'dark', 'light', 'light', 'light', 'light', 'dark'],
};
