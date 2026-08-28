'use client';

import Image from 'next/image';
import { useReveal } from '@/hooks/useReveal';

interface KenBurnsImageProps {
  readonly src: string;
  readonly className?: string;
}

// Variante de Reveal.tsx para una imagen de contenido: mismo hook
// (IntersectionObserver), zoom-in sutil en vez de fade+translate.
// Usa `fill` (no width/height fijos) para poder estirarse al alto real de la
// columna vecina en un grid con items-stretch, en vez de quedar como
// miniatura flotando con espacio vacío alrededor.
export function KenBurnsImage({ src, className = '' }: KenBurnsImageProps) {
  const [ref, isVisible] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`relative min-h-[320px] overflow-hidden rounded-3xl ${className}`}>
      {/* Decorativa: rol presentacional, alt vacío a propósito. */}
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`kenburns-in object-cover ${isVisible ? 'is-visible' : ''}`}
      />
    </div>
  );
}
