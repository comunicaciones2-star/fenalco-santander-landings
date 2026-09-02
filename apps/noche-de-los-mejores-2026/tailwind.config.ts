import type { Config } from 'tailwindcss';
import { nocheTheme } from './theme';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'surface-dark': nocheTheme.colors.surfaceDark,
        'surface-dark-alt': nocheTheme.colors.surfaceDarkAlt,
        'border-dark': nocheTheme.colors.borderDark,
        'surface-light': nocheTheme.colors.surfaceLight,
        'surface-light-alt': nocheTheme.colors.surfaceLightAlt,
        ink: nocheTheme.colors.ink,
        accent: nocheTheme.colors.accent,
        'accent-soft': nocheTheme.colors.accentSoft,
        borgona: nocheTheme.colors.borgona,
        cta: nocheTheme.colors.cta,
        'cta-ink': nocheTheme.colors.ctaInk,
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
