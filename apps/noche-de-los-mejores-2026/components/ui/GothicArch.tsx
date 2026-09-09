interface GothicArchProps {
  readonly className?: string;
}

// Arco ojival veneciano (ss. XIII-XV) — marco arquitectónico, nunca protagonista
// (brief 2026 §8: gótico esbelto y vertical, no barroco/rococó/fantasía medieval).
// Extiende el mismo lenguaje de curvas que OgivalDivider a proporciones altas,
// con doble línea de tracería y un cuadrifolio simple en el remate.
export function GothicArch({ className = '' }: GothicArchProps) {
  return (
    <svg viewBox="0 0 200 600" fill="none" className={className} aria-hidden="true">
      {/* Arco apuntado — línea exterior e interior */}
      <path d="M14 600 C14 260 60 70 100 70 C140 70 186 260 186 600" stroke="currentColor" strokeWidth="1.25" />
      <path d="M34 600 C34 280 66 96 100 96 C134 96 166 280 166 600" stroke="currentColor" strokeWidth="0.6" />

      {/* Cuadrifolio en el remate */}
      <circle cx="100" cy="46" r="15" stroke="currentColor" strokeWidth="0.6" />
      <path d="M100 33 a13 13 0 1 1 -0.02 0" stroke="currentColor" strokeWidth="0.5" />
      <path d="M100 30 L100 62 M84 46 L116 46" stroke="currentColor" strokeWidth="0.5" />

      {/* Fuste / basa de columna */}
      <path d="M14 600 V480 M186 600 V480" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4 480 H24 M176 480 H196" stroke="currentColor" strokeWidth="0.75" />
      <path d="M4 600 H24 M176 600 H196" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}
