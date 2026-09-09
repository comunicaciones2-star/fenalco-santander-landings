import Image from 'next/image';
import { CalendarDays, MapPin } from 'lucide-react';
import { config } from '@/content/event.config';
import { Button } from '@/components/ui/Button';
import { CompassRose } from '@/components/ui/CompassRose';
import { StarField } from '@/components/ui/StarField';
import { ConstellationLayer } from '@/components/ui/ConstellationLayer';
import { HeroNebulaVideo } from '@/components/ui/HeroNebulaVideo';

// Capas y z-index del Hero definidos en globals.css.
const LOCKUP_SRC = '/logos/Logo NDLM 2026.svg';
const MERCURY_SRC = '/hero/mercury-gold-2026-figure.png';

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-layers relative flex min-h-[82svh] items-center overflow-hidden bg-surface-primary text-surface-light lg:min-h-[88svh]"
    >
      {/* Semántica: el lockup de abajo es una imagen decorativa (aria-hidden),
          así que el título real de la página vive aquí, visualmente oculto. */}
      <h1 className="sr-only">{config.hero.titulo}</h1>

      {/* 1-2: video a la derecha y mascara de legibilidad. */}
      <HeroNebulaVideo />
      <div className="hero-nebula-overlay" aria-hidden="true" />

      {/* 3-4: cartografia del sistema web. */}
      <StarField density="high" className="hero-stars" />
      <ConstellationLayer density="medium" className="hero-constellations opacity-30" />

      {/* Figura protagonista: conserva el encuadre y la animacion. */}
      <div className="hero-mercury-visual" aria-hidden="true">
        <Image
          src={MERCURY_SRC}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 768px) 40vw, (min-width: 640px) 320px, 288px"
          className="hero-visual-image mercury-breathing"
        />
      </div>

      {/* 6: ornamentos detras de Mercurio. */}
      <CompassRose className="hero-ornament pointer-events-none absolute -right-20 -top-16 h-[26rem] w-[26rem] text-gold/[0.06] md:h-[32rem] md:w-[32rem]" />

      {/* 8: todo el contenido permanece por encima de las capas decorativas. */}
      <div className="hero-content relative mx-auto w-full max-w-7xl px-6 py-24 md:py-28 lg:px-10">
        <div className="flex max-w-2xl flex-col items-start gap-8">
          <Image
            src={LOCKUP_SRC}
            alt=""
            aria-hidden="true"
            width={4549}
            height={2006}
            loading="eager"
            className="h-auto w-full max-w-[520px]"
          />

          <p className="max-w-md font-display text-xl italic leading-relaxed text-surface-light/85 sm:text-2xl">
            {config.hero.subtitulo}
          </p>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            <Button href={config.cta.principal.href} ariaLabel={config.cta.principal.label} className="hero-action">
              {config.cta.principal.label}
            </Button>
            <Button
              href={config.cta.secundario.href}
              variant="ghost"
              ariaLabel={config.cta.secundario.label}
              className="hero-action"
            >
              {config.cta.secundario.label}
            </Button>
            <a
              href="?modalidad=interes#postulacion"
              className="btn-ghost hero-action"
            >
              Quiero asistir
            </a>
          </div>

          <div className="mt-2 flex flex-col gap-4 border-t border-surface-light/15 pt-6 sm:flex-row sm:items-center sm:gap-10">
            <div>
              <p className="flex items-center gap-2 text-sm text-surface-light/70"><CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />Fecha</p>
              <p className="font-display text-lg">{config.fecha.textoDisplay}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm text-surface-light/70"><MapPin className="h-4 w-4 text-gold" aria-hidden="true" />Lugar</p>
              <p className="font-display text-lg">{config.sede.nombre}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
