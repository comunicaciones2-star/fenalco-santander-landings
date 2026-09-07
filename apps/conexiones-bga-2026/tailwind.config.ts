import type { Config } from 'tailwindcss';
import { conexionesTheme } from './theme';

export default {
  // `content/` incluido a propósito: content/conexiones.ts trae clases de Tailwind
  // en datos (ej. `heightClass` de los aliados) — sin escanear ese archivo, esas
  // clases nunca se generan y el elemento queda sin tamaño.
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: conexionesTheme.colors.green,
        'green-dark': conexionesTheme.colors.greenDark,
        lime: conexionesTheme.colors.lime,
        yellow: conexionesTheme.colors.yellow,
        navy: conexionesTheme.colors.navy,
        'navy-alt': conexionesTheme.colors.navyAlt,
        surface: conexionesTheme.colors.surface,
        'surface-alt': conexionesTheme.colors.surfaceAlt,
        ink: conexionesTheme.colors.ink,
        'ink-soft': conexionesTheme.colors.inkSoft,
      },
      fontFamily: {
        sans: ['var(--font-ubuntu)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: conexionesTheme.radius.sm,
        DEFAULT: conexionesTheme.radius.sm,
        md: conexionesTheme.radius.md,
        lg: conexionesTheme.radius.lg,
        xl: conexionesTheme.radius.lg,
      },
      maxWidth: {
        content: '1360px',
        prose: '68ch',
      },
    },
  },
  plugins: [],
} satisfies Config;
