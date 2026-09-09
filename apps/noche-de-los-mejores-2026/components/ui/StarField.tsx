interface StarFieldProps {
  readonly density?: 'high' | 'medium' | 'low';
  readonly className?: string;
}

const DENSITY_COUNT: Record<NonNullable<StarFieldProps['density']>, number> = {
  high: 90,
  medium: 45,
  low: 20,
};

// Generador determinista (mismo resultado en cada build, sin Math.random()) —
// el starfield no debe cambiar entre despliegues ni arriesgar un desajuste de
// hidratación si algún día se consume desde un componente cliente.
function seededStars(count: number, seed: number) {
  let s = seed;
  const next = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    left: next() * 100,
    top: next() * 100,
    size: 1 + next() * 1.6,
    opacity: 0.25 + next() * 0.55,
  }));
}

// Cielo estrellado — capa puramente decorativa. Densidad controlada a propósito:
// más espacio negativo que ornamentación (brief 2026 §6 y §13). div+% en vez de
// SVG con viewBox cuadrado: evita que los puntos se deformen en óvalos cuando
// la sección es mucho más ancha que alta.
export function StarField({ density = 'medium', className = '' }: StarFieldProps) {
  const stars = seededStars(DENSITY_COUNT[density], 42);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-ivory"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
