interface RuleProps {
  readonly className?: string;
  readonly tone?: 'green' | 'white';
}

// Divisor tipográfico simple (una línea corta) — distinto del isotipo oficial de
// puntos, que solo se usa a través de DotMotif con el asset real sin redibujar.
export function Rule({ className = '', tone = 'green' }: RuleProps) {
  return <span aria-hidden="true" className={`block h-1 w-12 rounded-full ${tone === 'green' ? 'bg-green' : 'bg-white/50'} ${className}`} />;
}
