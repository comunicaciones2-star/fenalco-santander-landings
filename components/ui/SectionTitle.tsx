import type { ReactNode } from 'react';

interface SectionTitleProps {
  readonly children: ReactNode;
  readonly as?: 'h1' | 'h2' | 'h3';
  readonly className?: string;
}

export function SectionTitle({ children, as: Tag = 'h2', className = '' }: SectionTitleProps) {
  return (
    <Tag
      className={`font-display font-bold tracking-[-0.02em] text-3xl md:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </Tag>
  );
}
