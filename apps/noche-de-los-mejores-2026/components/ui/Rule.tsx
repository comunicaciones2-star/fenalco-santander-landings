interface RuleProps {
  readonly className?: string;
}

// Línea dorada fina — nunca marco pesado (regla de composición del prompt de build).
export function Rule({ className = '' }: RuleProps) {
  return <div className={`h-px w-16 bg-accent/70 ${className}`} />;
}
