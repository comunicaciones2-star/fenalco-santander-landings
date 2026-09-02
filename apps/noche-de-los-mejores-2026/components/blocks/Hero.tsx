import Image from 'next/image';
import { config } from '@/content/event.config';
import { Button } from '@/components/ui/Button';
import { CompassRose } from '@/components/ui/CompassRose';
import { Countdown } from '@/components/blocks/Countdown';

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-surface-dark text-surface-light">
      <CompassRose className="pointer-events-none absolute -right-24 -top-24 h-[32rem] w-[32rem] text-accent/[0.07] md:h-[40rem] md:w-[40rem]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-32 md:pb-24 md:pt-40 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10">
        <div className="order-2 flex flex-col items-start gap-7 lg:order-1">
          <h1 className="font-display text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
            {config.hero.titulo}
          </h1>

          <p className="max-w-md font-display text-lg italic leading-relaxed text-surface-light/85 sm:text-xl">
            {config.hero.subtitulo}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={config.cta.principal.href} ariaLabel={config.cta.principal.label}>
              {config.cta.principal.label}
            </Button>
            <Button href={config.cta.secundario.href} variant="ghost" ariaLabel={config.cta.secundario.label}>
              {config.cta.secundario.label}
            </Button>
          </div>

          <div className="mt-2 flex flex-col gap-4 border-t border-surface-light/15 pt-6 sm:flex-row sm:items-center sm:gap-8">
            <div>
              <p className="text-sm text-surface-light/50">Fecha</p>
              <p className="font-display text-base">{config.fecha.textoDisplay}</p>
            </div>
            <div>
              <p className="text-sm text-surface-light/50">Lugar</p>
              <p className="font-display text-base">{config.sede.nombre}</p>
            </div>
          </div>

          {config.fecha.mostrarCountdown && <Countdown compact />}
        </div>

        <div className="order-1 lg:order-2">
          {/* aspect-[1122/1262]: recorta el 10% inferior de la pieza original (panel sin
              terminar reservado para logo) — deja visible solo el arte final. */}
          <div className="relative mx-auto aspect-[1122/1262] w-full max-w-xs overflow-hidden border border-accent/25 sm:max-w-sm lg:max-w-md">
            <Image
              src={config.hero.media.src}
              alt={config.hero.media.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 380px, 320px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
