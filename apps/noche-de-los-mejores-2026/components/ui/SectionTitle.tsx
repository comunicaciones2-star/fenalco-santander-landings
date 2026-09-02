import type { ReactNode } from 'react';

interface SectionTitleProps {
  readonly children: ReactNode;
  readonly as?: 'h1' | 'h2' | 'h3';
  readonly className?: string;
}

export function SectionTitle({ children, as: Tag = 'h2', className = '' }: SectionTitleProps) {
  return (
    <Tag className={`font-display text-3xl leading-tight md:text-4xl lg:text-5xl ${className}`}>
      {children}
    </Tag>
  );
}
