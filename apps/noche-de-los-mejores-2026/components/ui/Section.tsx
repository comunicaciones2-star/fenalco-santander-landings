import type { ReactNode } from 'react';

interface SectionProps {
  readonly id?: string;
  readonly bg: 'dark' | 'darker' | 'light' | 'light-alt';
  readonly className?: string;
  readonly children: ReactNode;
  /** Capa de fondo full-bleed (textura, ornamento), detrás del contenido. */
  readonly background?: ReactNode;
}

const BG_CLASSES: Record<SectionProps['bg'], string> = {
  dark: 'bg-surface-dark text-surface-light',
  darker: 'bg-surface-dark-alt text-surface-light',
  light: 'bg-surface-light text-ink',
  'light-alt': 'bg-surface-light-alt text-ink',
};

export function Section({ id, bg, className = '', children, background }: SectionProps) {
  return (
    <section
      id={id}
      className={`${BG_CLASSES[bg]} py-20 md:py-28 ${background ? 'relative overflow-hidden' : ''} ${className}`}
    >
      {background}
      <div className={`mx-auto max-w-6xl px-6 lg:px-10 ${background ? 'relative z-10' : ''}`}>{children}</div>
    </section>
  );
}
