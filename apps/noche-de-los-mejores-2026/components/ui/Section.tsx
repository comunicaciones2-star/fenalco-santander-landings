import type { ReactNode } from 'react';

interface SectionProps {
  readonly id?: string;
  /** Sistema 2026 "Venecia Celestial": negro azulado → azul noche → azul profundo. */
  readonly bg: 'primary' | 'secondary' | 'elevated';
  readonly className?: string;
  readonly children: ReactNode;
  /** Capa de fondo full-bleed (textura, ornamento), detrás del contenido. */
  readonly background?: ReactNode;
}

const BG_CLASSES: Record<SectionProps['bg'], string> = {
  primary: 'bg-surface-primary text-ivory',
  secondary: 'bg-surface-secondary text-ivory',
  elevated: 'bg-surface-elevated text-ivory',
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
