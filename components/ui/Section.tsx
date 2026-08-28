import type { ReactNode } from 'react';

interface SectionProps {
  readonly id?: string;
  readonly bg: 'dark' | 'darker' | 'light' | 'light-alt';
  readonly className?: string;
  readonly children: ReactNode;
  /** Capa de fondo full-bleed (ej. <ParallaxBackground />), renderizada detrás
   * del contenido y por fuera del contenedor mx-auto max-w-6xl. */
  readonly background?: ReactNode;
}

const BG_CLASSES: Record<SectionProps['bg'], string> = {
  dark: 'bg-navy-900-textured text-white',
  darker: 'bg-navy-800-textured text-white',
  light: 'bg-cream-50-textured text-ink-900',
  'light-alt': 'bg-cream-100-textured text-ink-900',
};

export function Section({ id, bg, className = '', children, background }: SectionProps) {
  return (
    <section
      id={id}
      className={`${BG_CLASSES[bg]} py-12 md:py-16 ${background ? 'relative overflow-hidden' : ''} ${className}`}
    >
      {background}
      <div className={`mx-auto max-w-6xl px-6 lg:px-10 ${background ? 'relative z-10' : ''}`}>{children}</div>
    </section>
  );
}
