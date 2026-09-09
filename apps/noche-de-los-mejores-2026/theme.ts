// Dirección visual 2026: "Venecia Celestial" — noche, cosmos, constelaciones,
// arquitectura gótica veneciana y Mercurio dorado (ver public/reference/
// ndlm-2026-keyvisual.png.png, pieza de dirección de arte oficial).
//
// DESACOPLE DE TEMAS (FASE 2.6, §3): surfaceDark/surfaceDarkAlt/surfaceLight/
// surfaceLightAlt/ink/accent/accentText/accentSoft/borgona/cta/ctaInk son
// LEGACY — vuelven a sus valores originales de "La Serenísima" y los sigue
// consumiendo exclusivamente app/material/[token]/** (y la propia FileUpload
// en su variant="light"). La landing pública NO debe leer ninguno de estos.
// El sistema 2026 vive en bgPrimary…error, con dorado propio (gold/goldLight/
// goldDark) — nunca comparte hex con `accent`/`accentSoft` legacy, aunque hoy
// por coincidencia de la referencia sean visualmente casi idénticos.
export interface Theme {
  colors: {
    surfaceDark: string;
    surfaceDarkAlt: string;
    surfaceLight: string;
    surfaceLightAlt: string;
    ink: string;
    accent: string;
    accentText: string;
    accentSoft: string;
    borgona: string;
    cta: string;
    ctaInk: string;
    // Sistema 2026 — "Venecia Celestial"
    bgPrimary: string;
    bgSecondary: string;
    bgElevated: string;
    gold: string;
    goldLight: string;
    goldDark: string;
    ivory: string;
    textSecondary: string;
    blueCelestial: string;
    error: string;
  };
  fonts: { display: string; body: string };
  radius: 'sharp';
}

export const nocheTheme: Theme = {
  colors: {
    // LEGACY — exclusivo de app/material/[token]/** y FileUpload variant="light".
    // Valores originales, sin tocar desde antes de FASE 2.
    surfaceDark: '#080A09',
    surfaceDarkAlt: '#123A32',
    surfaceLight: '#F2EDE3',
    surfaceLightAlt: '#E8E1D3',
    ink: '#141310',
    accent: '#C7A45D',
    accentText: '#795F2A',
    accentSoft: '#E3D3B4',
    borgona: '#541F28',
    cta: '#C7A45D',
    ctaInk: '#080A09',

    // Sistema 2026 — "Venecia Celestial" (negro azulado → azul noche → azul
    // profundo). Tokens leídos de public/reference/ndlm-2026-keyvisual.png.png.
    // Exclusivo de la landing pública — nunca lo consume app/material/** ni /admin.
    bgPrimary: '#050A12',
    bgSecondary: '#0A1626',
    bgElevated: '#0F1E33',
    gold: '#C9A45C', // dorado principal NDLM 2026 — reemplaza a `accent` en la landing
    goldLight: '#E4C989', // hover/highlight — reemplaza a `accentSoft` en la landing
    goldDark: '#8F6E3A', // texto dorado legible sobre superficies claras puntuales
    ivory: '#F2ECDD', // texto principal sobre fondo oscuro
    textSecondary: '#B9AF9C', // texto secundario/muted sobre fondo oscuro
    blueCelestial: '#2C4A73', // nebulosa / constelaciones
    error: '#E5484D', // rojo con contraste verificado sobre fondos oscuros
  },
  fonts: { display: 'Bodoni Moda', body: 'Archivo' },
  radius: 'sharp',
};
