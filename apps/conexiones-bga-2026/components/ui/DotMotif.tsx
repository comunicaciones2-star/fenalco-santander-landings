import Image from 'next/image';

interface DotMotifProps {
  readonly className?: string;
  readonly opacity?: number;
  readonly flip?: boolean;
}

// Envuelve el isotipo oficial de puntos (public/brand/conexiones-bga-isotipo.png)
// para usarlo como firma visual recurrente en esquinas, transiciones y separadores.
// Solo se permite escalar, recortar (vía overflow-hidden del contenedor padre),
// reposicionar y ajustar opacidad — nunca redibujar ni alterar el símbolo.
export function DotMotif({ className = '', opacity = 1, flip = false }: DotMotifProps) {
  return (
    <Image
      src="/brand/conexiones-bga-isotipo.png"
      alt=""
      aria-hidden="true"
      width={500}
      height={500}
      className={`pointer-events-none select-none object-contain ${flip ? 'scale-x-[-1]' : ''} ${className}`}
      style={{ opacity }}
    />
  );
}
