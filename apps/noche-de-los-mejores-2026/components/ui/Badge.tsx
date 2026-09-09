import type { ReactNode } from 'react';

interface BadgeProps {
  readonly children: ReactNode;
  readonly className?: string;
}

// Insignia dorada sobre fondo oscuro — el borgoña del arte de campaña anterior
// desaparece como color decorativo (brief 2026 §11); queda solo borde + texto
// dorado sobre un panel muy sutil, nunca un bloque de color sólido.
export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center border border-gold/50 bg-surface-elevated/60 px-4 py-1.5 font-display text-sm text-gold ${className}`}
    >
      {children}
    </span>
  );
}
