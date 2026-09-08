'use client';

import { useRef, useState } from 'react';
import { CalendarDays, MapPin, Volume2, VolumeX } from 'lucide-react';
import { config } from '@/content/conexiones';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { DotMotif } from '@/components/ui/DotMotif';

// Sección de mayor prioridad visual de la landing: composición editorial dividida.
// El panel derecho no es un rectángulo plano — fotografía real de networking
// empresarial con un velo verde/navy de marca, esquina curva grande y el isotipo
// desbordando el límite entre panel blanco y foto generan profundidad por composición.
export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleAudio = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    if (!nextMuted) video.volume = 1;

    const playPromise = video.play();
    if (playPromise) {
      void playPromise
        .then(() => setIsMuted(nextMuted))
        .catch((error: unknown) => {
          console.error('No se pudo cambiar el audio del video del hero.', error);
          video.muted = true;
          setIsMuted(true);
        });
      return;
    }

    setIsMuted(nextMuted);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-content grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center gap-6 px-6 py-14 sm:px-10 md:py-20 lg:py-24 lg:pl-10 lg:pr-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green">{config.hero.eyebrow}</p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="text-4xl font-bold leading-[1.1] text-navy sm:text-5xl lg:text-[3.35rem]">
              {config.hero.titulo}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">{config.hero.texto}</p>
          </Reveal>

          <Reveal delay={180}>
            <dl className="flex flex-wrap gap-x-6 gap-y-3 border-y border-ink/10 py-5 text-sm text-ink">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="shrink-0 text-green" aria-hidden="true" />
                <span>{config.fecha.textoDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="shrink-0 text-green" aria-hidden="true" />
                <span>
                  {config.sede.nombre} · {config.sede.lugar}
                </span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span>{config.sede.ciudad}</span>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={240} className="flex flex-col gap-3 sm:flex-row">
            <Button href={config.cta.principal.href} ariaLabel={config.cta.principal.label}>
              {config.cta.principal.label}
            </Button>
            <Button href={config.cta.secundario.href} variant="ghost-dark" ariaLabel={config.cta.secundario.label}>
              {config.cta.secundario.label}
            </Button>
          </Reveal>
        </div>

        <div className="relative isolate min-h-[320px] overflow-hidden bg-surface-green lg:rounded-bl-[110px]">
          <video
            ref={videoRef}
            aria-hidden="true"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            poster="/images/hero-networking.png"
            className="object-cover"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectPosition: '68% 38%' }}
          >
            <source src="/videos/01vd-conexiones-bga-2026.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy/85 via-green/55 to-green/20"
          />
          <DotMotif
            className="absolute -right-12 -top-12 h-56 w-56 opacity-90 sm:h-64 sm:w-64 lg:h-80 lg:w-80"
          />
          <DotMotif
            flip
            className="absolute -bottom-20 -left-20 h-48 w-48 opacity-20 sm:h-56 sm:w-56"
          />
          <button
            type="button"
            onClick={handleToggleAudio}
            className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-lg transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy/40"
            aria-label={isMuted ? 'Activar sonido del video' : 'Silenciar video'}
          >
            {isMuted ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
            {isMuted ? 'Activar sonido' : 'Silenciar'}
          </button>
        </div>
      </div>
    </section>
  );
}
