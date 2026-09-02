interface OgivalDividerProps {
  readonly className?: string;
}

// Recurso ornamental 2/2: arco ojival + cuadrifolio, línea fina — eco directo del
// arte de campaña oficial (public/hero). Se usa como separador entre bloques,
// nunca como marco pesado.
export function OgivalDivider({ className = '' }: OgivalDividerProps) {
  return (
    <svg viewBox="0 0 120 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 58 C4 22 30 4 60 4 C90 4 116 22 116 58"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M52 20 a8 8 0 1 1 16 0 a8 8 0 1 1 -16 0"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
      <path d="M60 4 L60 16 M52 12 L68 12" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}
