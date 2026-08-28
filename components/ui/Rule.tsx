interface RuleProps {
  readonly className?: string;
}

export function Rule({ className = '' }: RuleProps) {
  return <div className={`rule my-6 ${className}`} aria-hidden="true" />;
}
