import type { ReactNode } from 'react';

interface KickerProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Kicker({ children, className = '' }: KickerProps) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.14em] text-green ${className}`}>
      {children}
    </p>
  );
}
