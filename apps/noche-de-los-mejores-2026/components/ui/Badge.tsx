import type { ReactNode } from 'react';

interface BadgeProps {
  readonly children: ReactNode;
  readonly className?: string;
}

// Insignia borgoña — eco directo de "Convocatoria abierta" en el arte de campaña
// oficial. Uso escaso: es el único lugar donde borgona funciona como color de
// superficie, nunca como color de sección (regla de theme.ts).
export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center border border-accent/40 bg-borgona px-4 py-1.5 font-display text-sm text-surface-light ${className}`}
    >
      {children}
    </span>
  );
}
