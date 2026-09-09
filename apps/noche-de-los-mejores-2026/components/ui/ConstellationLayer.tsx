interface ConstellationLayerProps {
  readonly density?: 'high' | 'medium' | 'low';
  readonly className?: string;
}

const NODE_COUNT: Record<NonNullable<ConstellationLayerProps['density']>, number> = {
  high: 22,
  medium: 12,
  low: 7,
};

// Generador determinista — mismo motivo que en StarField.tsx: build reproducible,
// sin Math.random(). Semilla distinta (7) para que ambas capas no coincidan.
function seededSequence(count: number, seed: number): number[] {
  let s = seed;
  const next = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, next);
}

// Constelaciones — red de nodos dorados unidos por líneas finas, densidad
// controlada (brief 2026 §6: Hero máxima densidad, resto del sitio mucho menor).
// viewBox fijo + preserveAspectRatio="xMidYMid slice": cubre secciones de
// cualquier proporción sin deformar los nodos en óvalos (a diferencia de
// "none"), igual que un fondo con background-size:cover.
export function ConstellationLayer({ density = 'medium', className = '' }: ConstellationLayerProps) {
  const count = NODE_COUNT[density];
  const rnd = seededSequence(count * 2, 7);
  const nodes = Array.from({ length: count }, (_, i) => ({
    x: rnd[i * 2] * 1600,
    y: rnd[i * 2 + 1] * 900,
  }));

  // Cada nodo se une con su vecino más cercano dentro de un radio — evita tanto
  // una maraña de líneas cruzadas como puntos flotando aislados.
  const lines: Array<[number, number]> = [];
  nodes.forEach((node, i) => {
    let nearest = -1;
    let nearestDist = Infinity;
    nodes.forEach((other, j) => {
      if (i === j) return;
      const dist = (node.x - other.x) ** 2 + (node.y - other.y) ** 2;
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = j;
      }
    });
    if (nearest !== -1 && nearestDist < 500 ** 2) lines.push([i, nearest]);
  });

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full text-gold ${className}`}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.5">
        {lines.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map((node, i) => (
          <circle key={i} cx={node.x} cy={node.y} r={i % 5 === 0 ? 3 : 1.6} opacity={i % 5 === 0 ? 0.9 : 0.6} />
        ))}
      </g>
    </svg>
  );
}
