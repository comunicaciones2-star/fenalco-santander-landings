import Image from 'next/image';
import { config } from '@/content/event.config';
import { Button } from '@/components/ui/Button';
import { CompassRose } from '@/components/ui/CompassRose';
import { StarField } from '@/components/ui/StarField';
import { ConstellationLayer } from '@/components/ui/ConstellationLayer';
import { GothicArch } from '@/components/ui/GothicArch';

// Hero construido por capas (brief 2026 §4/§12) — nada de panel raster único.
// LAYER 0 bg-surface-primary · 1 nebulosa · 2 starfield · 3 constelaciones ·
// 4 GothicArch · 5 CompassRose puntual · 6 contenido (lockup + CTAs + fecha/lugar)
// · 7 Mercurio.
//
// LOGO OFICIAL (FASE 2.6 §2): /public/logos/Logo NDLM 2026.svg referencia 3 PNG
// externos (xlink:href relativo) que NO existían en public/ — sin ellos el SVG
// se renderiza incompleto. Los ubiqué en la carpeta fuente del estudio
// ("10 EVENTOS 2026/06 NDLM 2026/01 Logo NDLM 2026/") junto a un PNG ya
// aplanado del mismo lockup y, crucialmente, el Mercurio YA AISLADO sobre
// fondo transparente que ese SVG usa como su propio contenido — es decir, el
// asset mercury-gold-2026.png pendiente desde FASE 2 ya existía, solo que en
// otra carpeta. Usé el PNG aplanado (no el SVG con dependencias externas) por
// robustez y porque next/image SÍ puede optimizarlo (recortar/reformatear por
// breakpoint); el SVG con sus 3 PNG internos no se beneficiaría de eso y
// pesaría ~6 MB sin que Next pueda intervenir. Ver reporte de entrega.
const LOCKUP_SRC = '/logos/ndlm-2026-lockup.png';
const MERCURY_SRC = '/hero/mercury-gold-2026.png';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[82svh] items-center overflow-hidden bg-surface-primary text-surface-light lg:min-h-[88svh]"
    >
      {/* Semántica: el lockup de abajo es una imagen decorativa (aria-hidden),
          así que el título real de la página vive aquí, visualmente oculto. */}
      <h1 className="sr-only">{config.hero.titulo}</h1>

      {/* LAYER 1 — nebulosa azul, CSS puro */}
      <div className="bg-nebula pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* LAYER 2 — starfield */}
      <StarField density="high" />

      {/* LAYER 3 — constelaciones. Densidad media (no "high"): a la densidad
          original competía visualmente con el lockup (brief §6 y §11 — prioridad
          texto/logo > Mercurio > nebulosa > constelaciones > ornamentos). */}
      <ConstellationLayer density="medium" className="opacity-50" />

      {/* LAYER 4 — arco gótico, marco izquierdo, parcialmente fuera del canvas
          para que se lea como arquitectura y no como ícono centrado. */}
      <GothicArch className="pointer-events-none absolute -left-10 bottom-0 hidden h-[560px] w-auto text-gold/20 xl:block" />

      {/* LAYER 5 — cartografía celeste puntual, una sola, muy tenue */}
      <CompassRose className="pointer-events-none absolute -right-20 -top-16 h-[26rem] w-[26rem] text-gold/[0.06] md:h-[32rem] md:w-[32rem]" />

      {/* LAYER 7 — Mercurio, tercio derecho en desktop. Fondo transparente real
          (asset final, no placeholder): se integra al starfield sin necesitar
          máscara de fundido. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] max-w-2xl md:block">
        <Image
          src={MERCURY_SRC}
          alt=""
          fill
          aria-hidden="true"
          sizes="(min-width: 1024px) 40vw, 45vw"
          className="object-contain object-[65%_center]"
        />
      </div>
      {/* Mobile: presencia reducida y detrás del contenido — nunca cubre texto. */}
      <div className="pointer-events-none absolute -right-6 bottom-0 h-72 w-72 opacity-30 sm:h-80 sm:w-80 md:hidden">
        <Image src={MERCURY_SRC} alt="" fill aria-hidden="true" sizes="60vw" className="object-contain object-bottom" />
      </div>

      {/* LAYER 6 — contenido real */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:py-28 lg:px-10">
        <div className="flex max-w-2xl flex-col items-start gap-8">
          {/* Recorte del lockup oficial: ventana más ancha que el bloque de texto
              real (holgura deliberada — ver comentario superior) anclada arriba-
              izquierda, para no depender de medir el pixel exacto donde empieza
              Mercurio dentro del PNG. Puede dejar asomar una porción mínima de
              Mercurio por el borde derecho: es intencional como anticipo de la
              figura completa a la derecha, no un error de recorte. */}
          <div className="relative h-[190px] w-[300px] overflow-hidden sm:h-[240px] sm:w-[380px] lg:h-[320px] lg:w-[510px]">
            <Image
              src={LOCKUP_SRC}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="(min-width: 1024px) 510px, (min-width: 640px) 380px, 300px"
              className="object-cover object-left-top"
            />
          </div>

          <p className="max-w-md font-display text-xl italic leading-relaxed text-surface-light/85 sm:text-2xl">
            {config.hero.subtitulo}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={config.cta.principal.href} ariaLabel={config.cta.principal.label} className="!px-9 !py-4 !text-base">
              {config.cta.principal.label}
            </Button>
            <Button
              href={config.cta.secundario.href}
              variant="ghost"
              ariaLabel={config.cta.secundario.label}
              className="!px-9 !py-4 !text-base"
            >
              {config.cta.secundario.label}
            </Button>
          </div>

          <div className="mt-2 flex flex-col gap-4 border-t border-surface-light/15 pt-6 sm:flex-row sm:items-center sm:gap-10">
            <div>
              <p className="text-sm text-surface-light/50">Fecha</p>
              <p className="font-display text-lg">{config.fecha.textoDisplay}</p>
            </div>
            <div>
              <p className="text-sm text-surface-light/50">Lugar</p>
              <p className="font-display text-lg">{config.sede.nombre}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
