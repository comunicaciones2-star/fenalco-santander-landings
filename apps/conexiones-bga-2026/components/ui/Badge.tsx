import type { ReactNode } from 'react';

interface BadgeProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-yellow/60 bg-yellow/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-navy ${className}`}
    >
      {children}
    </span>
  );
}
