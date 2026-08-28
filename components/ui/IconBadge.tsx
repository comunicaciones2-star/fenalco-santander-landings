import type { LucideIcon } from 'lucide-react';

interface IconBadgeProps {
  readonly icon: LucideIcon;
  readonly tone?: 'dark' | 'light';
  readonly size?: 'sm' | 'md';
  readonly className?: string;
}

const TONE_CLASSES: Record<NonNullable<IconBadgeProps['tone']>, string> = {
  dark: 'bg-lilac-400/10 text-lilac-400',
  light: 'bg-lilac-600/10 text-lilac-600',
};

const SIZE_CLASSES: Record<NonNullable<IconBadgeProps['size']>, { wrapper: string; icon: number }> = {
  sm: { wrapper: 'p-2', icon: 20 },
  md: { wrapper: 'p-3', icon: 28 },
};

export function IconBadge({ icon: Icon, tone = 'dark', size = 'md', className = '' }: IconBadgeProps) {
  const sizing = SIZE_CLASSES[size];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${sizing.wrapper} ${TONE_CLASSES[tone]} ${className}`}
      aria-hidden="true"
    >
      <Icon size={sizing.icon} strokeWidth={1.5} />
    </span>
  );
}
