import type { ReactNode } from 'react';

interface SectionTitleProps {
  readonly children: ReactNode;
  readonly as?: 'h1' | 'h2' | 'h3';
  readonly className?: string;
}

export function SectionTitle({ children, as: Tag = 'h2', className = '' }: SectionTitleProps) {
  return (
    <Tag className={`font-display text-[clamp(2.4rem,1.6rem+2.2vw,4rem)] leading-[1.05] ${className}`}>
      {children}
    </Tag>
  );
}
