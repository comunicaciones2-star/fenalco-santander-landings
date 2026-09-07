import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'ghost-dark' | 'inverse';

interface ButtonProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly ariaLabel?: string;
  readonly className?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'btn-cta',
  ghost: 'btn-ghost',
  'ghost-dark': 'btn-ghost-dark',
  inverse: 'btn-inverse',
};

export function Button({ href, children, variant = 'primary', ariaLabel, className = '' }: ButtonProps) {
  return (
    <Link href={href} aria-label={ariaLabel} className={`${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </Link>
  );
}
