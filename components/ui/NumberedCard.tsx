interface NumberedCardProps {
  readonly numero: string | number;
  readonly titulo: string;
  readonly descripcion: string;
  readonly className?: string;
}

export function NumberedCard({ numero, titulo, descripcion, className = '' }: NumberedCardProps) {
  const label = typeof numero === 'number' ? String(numero).padStart(2, '0') : numero;

  return (
    <div className={className}>
      <span className="font-display text-3xl font-bold text-lilac-400">{label}</span>
      <h3 className="mt-3 font-display text-xl font-semibold">{titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed opacity-80">{descripcion}</p>
    </div>
  );
}
