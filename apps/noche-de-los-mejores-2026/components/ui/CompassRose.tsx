interface CompassRoseProps {
  readonly className?: string;
}

// Recurso ornamental 1/2: rosa de los vientos, línea fina. Cartografía marítima
// veneciana — se usa como textura ambiental discreta, nunca como protagonista.
export function CompassRose({ className = '' }: CompassRoseProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
      <g stroke="currentColor" strokeWidth="0.5">
        <line x1="100" y1="4" x2="100" y2="196" />
        <line x1="4" y1="100" x2="196" y2="100" />
        <line x1="27" y1="27" x2="173" y2="173" />
        <line x1="173" y1="27" x2="27" y2="173" />
      </g>
      <path
        d="M100 20 L110 100 L100 180 L90 100 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M20 100 L100 90 L180 100 L100 110 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <circle cx="100" cy="100" r="4" fill="currentColor" />
      <text x="100" y="16" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="serif">
        N
      </text>
    </svg>
  );
}
