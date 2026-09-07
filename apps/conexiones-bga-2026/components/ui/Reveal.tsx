'use client';

import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  readonly as?: ElementType;
  readonly delay?: number;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: RevealProps) {
  const [ref, isVisible] = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
