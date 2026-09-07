import type { ReactNode } from 'react';

interface SectionProps {
  readonly id?: string;
  readonly bg: 'white' | 'alt' | 'navy' | 'green';
  readonly className?: string;
  readonly children: ReactNode;
  /** Capa de fondo full-bleed (isotipo, ornamento), detrás del contenido. */
  readonly background?: ReactNode;
  readonly narrow?: boolean;
}

const BG_CLASSES: Record<SectionProps['bg'], string> = {
  white: 'bg-white text-ink',
  alt: 'bg-surface-alt text-ink',
  navy: 'bg-surface-navy text-white',
  green: 'bg-surface-green text-white',
};

export function Section({ id, bg, className = '', children, background, narrow = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`${BG_CLASSES[bg]} py-20 md:py-28 ${background ? 'relative overflow-hidden' : ''} ${className}`}
    >
      {background}
      <div
        className={`mx-auto px-6 lg:px-10 ${narrow ? 'max-w-3xl' : 'max-w-content'} ${
          background ? 'relative z-10' : ''
        }`}
      >
        {children}
      </div>
    </section>
  );
}
