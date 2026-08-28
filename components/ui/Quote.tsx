interface QuoteProps {
  readonly children: string;
  readonly tone?: 'dark' | 'light';
  readonly className?: string;
}

const TONE_CLASSES: Record<NonNullable<QuoteProps['tone']>, string> = {
  dark: 'text-lilac-400/90',
  light: 'text-lilac-600',
};

export function Quote({ children, tone = 'dark', className = '' }: QuoteProps) {
  return (
    <p className={`mx-auto max-w-2xl text-center text-lg md:text-xl italic ${TONE_CLASSES[tone]} ${className}`}>
      &ldquo;{children}&rdquo;
    </p>
  );
}
