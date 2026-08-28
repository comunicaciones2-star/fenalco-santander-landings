'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ParallaxBackgroundProps {
  readonly src: string;
  readonly overlay?: 'dark' | 'darker' | 'light' | 'none';
  readonly priority?: boolean;
  /** 0-1. Para capas muy tenues (ej. Hero, detrás del sujeto). Default: opaca. */
  readonly imageOpacity?: number;
  /** CSS object-position — para encuadrar bien fotos con el sujeto descentrado. */
  readonly objectPosition?: string;
  /** Difumina la imagen (y su overlay) a transparente en el borde superior, para que
   * se funda con el color plano de la sección anterior en vez de cortar en seco. */
  readonly fadeTop?: boolean;
}

export function ParallaxBackground({
  src,
  overlay = 'dark',
  priority = false,
  imageOpacity = 1,
  objectPosition = '50% 50%',
  fadeTop = false,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (prefersReduced || !el) return;

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const speed = 0.15; // desplazamiento sutil, no mareante
      const offset = rect.top * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.15)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fadeMask = fadeTop
    ? { WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 200px)', maskImage: 'linear-gradient(to bottom, transparent, black 200px)' }
    : undefined;

  return (
    <div className="absolute inset-0 overflow-hidden" style={fadeMask} aria-hidden="true">
      <div ref={ref} className="absolute inset-0 will-change-transform" style={{ opacity: imageOpacity }}>
        {/* Decorativa: rol presentacional, alt vacío a propósito. */}
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          quality={78}
          className="object-cover"
          style={{ objectPosition }}
          priority={priority}
        />
      </div>
      {overlay !== 'none' && (
        <>
          <div
            className={
              overlay === 'darker'
                ? 'absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/70 to-navy-900/95'
                : overlay === 'light'
                  ? 'absolute inset-0 bg-gradient-to-b from-navy-900/35 via-navy-900/25 to-navy-900/55'
                  : 'absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/50 to-navy-900/85'
            }
          />
          {/* Scrim horizontal: compensa detalle brillante (pantallas, ventanas) que
              suele concentrarse a la derecha de la foto — el degradado vertical solo
              no lo cubre. Se apila sobre el degradado vertical, no lo reemplaza. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                overlay === 'light'
                  ? 'linear-gradient(90deg, rgba(15,15,46,0.15) 0%, rgba(15,15,46,0.4) 100%)'
                  : 'linear-gradient(90deg, rgba(15,15,46,0.35) 0%, rgba(15,15,46,0.75) 100%)',
            }}
          />
        </>
      )}
    </div>
  );
}
