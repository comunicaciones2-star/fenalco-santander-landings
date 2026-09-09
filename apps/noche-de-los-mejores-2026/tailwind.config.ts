import type { Config } from 'tailwindcss';
import { nocheTheme } from './theme';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Legacy — usados hoy por app/material/[token]/** y el hover de .btn-cta
        'surface-dark': nocheTheme.colors.surfaceDark,
        'surface-dark-alt': nocheTheme.colors.surfaceDarkAlt,
        'surface-light': nocheTheme.colors.surfaceLight,
        'surface-light-alt': nocheTheme.colors.surfaceLightAlt,
        ink: nocheTheme.colors.ink,
        accent: nocheTheme.colors.accent,
        'accent-text': nocheTheme.colors.accentText,
        'accent-soft': nocheTheme.colors.accentSoft,
        borgona: nocheTheme.colors.borgona,
        cta: nocheTheme.colors.cta,
        'cta-ink': nocheTheme.colors.ctaInk,
        // Sistema 2026 "Venecia Celestial" — landing pública (nunca legacy)
        'surface-primary': nocheTheme.colors.bgPrimary,
        'surface-secondary': nocheTheme.colors.bgSecondary,
        'surface-elevated': nocheTheme.colors.bgElevated,
        gold: nocheTheme.colors.gold,
        'gold-light': nocheTheme.colors.goldLight,
        'gold-dark': nocheTheme.colors.goldDark,
        ivory: nocheTheme.colors.ivory,
        'text-secondary': nocheTheme.colors.textSecondary,
        'blue-celestial': nocheTheme.colors.blueCelestial,
        error: nocheTheme.colors.error,
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        kicker: '0.16em',
      },
      borderRadius: {
        DEFAULT: '0px',
      },
    },
  },
  plugins: [],
} satisfies Config;
