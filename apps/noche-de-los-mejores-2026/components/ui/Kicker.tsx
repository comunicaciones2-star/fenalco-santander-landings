import type { ReactNode } from 'react';

interface KickerProps {
  readonly children: ReactNode;
  readonly className?: string;
}

// Un único kicker en toda la página (regla tipográfica del prompt de build) — se usa
// solo en Narrativa, el bloque editorial donde la referencia histórica es explícita.
export function Kicker({ children, className = '' }: KickerProps) {
  return <p className={`font-body text-xs uppercase tracking-kicker text-accent ${className}`}>{children}</p>;
}
