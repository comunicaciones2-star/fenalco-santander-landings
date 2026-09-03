'use client';

/**
 * Galería / Carrusel — La Noche de los Mejores
 * ------------------------------------------------
 * Carrusel principal de arrastre (mouse + touch) con autoplay, controles
 * y una fila de thumbnails clicables debajo para navegar directo a cada foto.
 *
 * Imágenes en public/images/galeria/ndlm-2025-01.jpg ... -11.jpg
 * (fotos de la gala 2025, en el mismo orden que abajo).
 */

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Section } from '@/components/ui/Section';

type Slide = {
  src: string;
  alt: string;
  eyebrow: string;
  caption: string;
};

const SLIDES: Slide[] = [
  {
    src: '/images/galeria/ndlm-2025-01.jpg',
    alt: 'Ganadores de La Noche de los Mejores 2025 en el escenario del Centro de Convenciones Neomundo',
    eyebrow: 'La Noche de los Mejores 2025',
    caption:
      'Santander dejó claro que el progreso se construye en equipo, con visión de futuro y una pasión indomable.',
  },
  {
    src: '/images/galeria/ndlm-2025-02.jpg',
    alt: 'Entrega del galardón Fidelidad Fenalquista',
    eyebrow: 'Fidelidad Fenalquista',
    caption: 'Inmobiliaria Esteban Ríos',
  },
  {
    src: '/images/galeria/ndlm-2025-03.jpg',
    alt: 'Entrega del galardón Emprendimiento Destacado',
    eyebrow: 'Emprendimiento Destacado',
    caption: 'Container Food Company',
  },
  {
    src: '/images/galeria/ndlm-2025-04.jpg',
    alt: 'Entrega del galardón Apoyo y Gestión Gremial',
    eyebrow: 'Apoyo y Gestión Gremial',
    caption: 'Juridcid S.A.S.',
  },
  {
    src: '/images/galeria/ndlm-2025-05.jpg',
    alt: 'Entrega del galardón Innovación Tecnológica',
    eyebrow: 'Innovación Tecnológica',
    caption: 'Best English Institute',
  },
  {
    src: '/images/galeria/ndlm-2025-06.jpg',
    alt: 'Entrega del galardón Responsabilidad Social Empresarial',
    eyebrow: 'Responsabilidad Social Empresarial',
    caption: 'Universidad Pontificia Bolivariana — UPB',
  },
  {
    src: '/images/galeria/ndlm-2025-07.jpg',
    alt: 'Entrega del galardón Mujer Insignia Empresarial',
    eyebrow: 'Mujer Insignia Empresarial',
    caption: 'María Eugenia Rueda — Carnes & Carnes',
  },
  {
    src: '/images/galeria/ndlm-2025-08.jpg',
    alt: 'Entrega del galardón Santandereanidad',
    eyebrow: 'Reconocimiento a la Santandereanidad',
    caption: 'Teres S.A.S.',
  },
  {
    src: '/images/galeria/ndlm-2025-09.jpg',
    alt: 'Entrega del galardón Mérito Empresarial al Comercio',
    eyebrow: 'Mérito Empresarial del Comercio',
    caption: 'Jardines La Colina',
  },
  {
    src: '/images/galeria/ndlm-2025-10.jpg',
    alt: 'Entrega del galardón Toda una Vida al Fomento Empresarial',
    eyebrow: 'Toda una Vida Dedicada al Fomento Empresarial',
    caption: 'Víctor Di Marco & Margarita Gómez — Dimarco',
  },
  {
    src: '/images/galeria/ndlm-2025-11.jpg',
    alt: 'Entrega del galardón Mercurio de Oro',
    eyebrow: 'Mercurio de Oro',
    caption: 'Disfarma',
  },
];

const AUTOPLAY_MS = 5500;

export function Galeria() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragState = useRef<{ startX: number; delta: number; dragging: boolean }>({
    startX: 0,
    delta: 0,
    dragging: false,
  });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const prefersReducedMotion = useRef(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (isPaused || prefersReducedMotion.current) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  // Mantener el thumbnail activo visible al navegar
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion.current ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [index]);

  // Arrastre (mouse + touch) vía Pointer Events, sobre el slide principal
  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, delta: 0, dragging: true };
    setIsPaused(true);
    setIsDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    dragState.current.delta = e.clientX - dragState.current.startX;
    setDragOffset(dragState.current.delta);
  };

  const endDrag = () => {
    if (!dragState.current.dragging) return;
    const threshold = 60;
    if (dragState.current.delta > threshold) prev();
    else if (dragState.current.delta < -threshold) next();
    dragState.current = { startX: 0, delta: 0, dragging: false };
    setDragOffset(0);
    setIsDragging(false);
    setIsPaused(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  const current = SLIDES[index];

  return (
    <Section id="galeria" bg="dark">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="font-display text-sm italic text-accent">Edición 2025</p>
          <h2 className="mt-2 font-display text-3xl text-surface-light sm:text-4xl">
            Así se vivió la última Noche
          </h2>
        </div>
        <div className="hidden font-display text-sm text-surface-light/50 sm:block">
          {String(index + 1).padStart(2, '0')} — {String(SLIDES.length).padStart(2, '0')}
        </div>
      </div>

      {/* Marco veneciano — slide principal */}
      <div
        className="group relative overflow-hidden border border-accent/40 bg-black/40 shadow-[0_0_0_1px_rgba(199,164,93,0.08)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <span className="pointer-events-none absolute left-3 top-3 z-10 h-6 w-6 border-l border-t border-accent/70" />
        <span className="pointer-events-none absolute right-3 top-3 z-10 h-6 w-6 border-r border-t border-accent/70" />
        <span className="pointer-events-none absolute bottom-3 left-3 z-10 h-6 w-6 border-b border-l border-accent/70" />
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 h-6 w-6 border-b border-r border-accent/70" />

        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="relative aspect-[16/10] w-full cursor-grab select-none touch-pan-y active:cursor-grabbing sm:aspect-[16/8]"
        >
          <div
            className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{
              transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
              transitionDuration: isDragging ? '0ms' : undefined,
            }}
          >
            {SLIDES.map((slide, i) => (
              <div key={slide.src} className="relative h-full w-full shrink-0">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 1152px"
                  className="object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
          <p className="font-display text-xs uppercase tracking-[0.15em] text-accent">{current.eyebrow}</p>
          <p className="mt-1 max-w-xl font-display text-lg text-surface-light sm:text-xl">{current.caption}</p>
        </div>

        {/* Flechas */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 border border-surface-light/20 bg-black/40 p-2 text-surface-light opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:border-accent focus-visible:opacity-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={next}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 border border-surface-light/20 bg-black/40 p-2 text-surface-light opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:border-accent focus-visible:opacity-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div
        role="tablist"
        aria-label="Seleccionar foto"
        className="mt-4 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Ir a la imagen ${i + 1}: ${slide.eyebrow}`}
            onClick={() => goTo(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden border transition-all duration-200 sm:h-20 sm:w-28 ${
              i === index ? 'border-accent opacity-100' : 'border-surface-light/10 opacity-50 hover:opacity-80'
            }`}
          >
            <Image src={slide.src} alt="" fill sizes="112px" className="object-cover" draggable={false} />
            {i === index && <span className="absolute inset-0 ring-1 ring-inset ring-accent" />}
          </button>
        ))}
      </div>
    </Section>
  );
}
