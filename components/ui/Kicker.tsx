interface KickerProps {
  readonly children: string;
  readonly className?: string;
}

export function Kicker({ children, className = '' }: KickerProps) {
  return <p className={`kicker ${className}`}>{children}</p>;
}
