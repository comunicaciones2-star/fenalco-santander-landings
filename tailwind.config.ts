import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0F0F2E',
          800: '#1A1640',
          700: '#262050',
        },
        lilac: {
          400: '#B79FE0',
          600: '#7C5FBF',
        },
        cream: {
          50: '#F7F3F2',
          100: '#EFE8E7',
        },
        ink: {
          900: '#14142B',
        },
        lime: {
          400: '#B5D334',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        kicker: '0.18em',
      },
    },
  },
  plugins: [],
} satisfies Config;
