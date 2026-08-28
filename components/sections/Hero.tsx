import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { Button } from '@/components/ui/Button';
import { ParallaxBackground } from '@/components/ui/ParallaxBackground';
import type { HeroContent } from '@/content/fortaleza-legado';

interface HeroProps {
  readonly content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  return (
    <Section
      bg="dark"
      id="hero"
      className="pt-28 md:pt-32"
      background={
        <ParallaxBackground
          src="/images/photography/hero-bg-skyline.jpg"
          overlay="none"
          imageOpacity={0.15}
          priority
        />
      }
    >
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="text-center lg:text-left">
          <Kicker className="lg:mx-0">{content.kicker}</Kicker>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.02em] md:text-6xl">
            {content.titulo}
          </h1>
          <p className="mt-6 text-lg text-white/90 md:text-xl">{content.subtitulo}</p>
          <p className="mt-4 text-base text-white/70">{content.parrafo}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button href={content.ctaPrimario.href} ariaLabel={content.ctaPrimario.label}>
              {content.ctaPrimario.label}
            </Button>
            <Button href={content.ctaSecundario.href} variant="ghost" ariaLabel={content.ctaSecundario.label}>
              {content.ctaSecundario.label}
            </Button>
          </div>
        </div>

        <div className="relative order-first flex w-full max-w-sm items-center justify-center lg:order-last lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-lilac-400/40 opacity-30 blur-3xl"
          />
          <Image
            src="/images/emblema.png"
            alt="Elemento visual del proyecto Fortaleza & Legado"
            width={455}
            height={701}
            priority
            unoptimized
            className="mx-auto h-auto w-full max-w-[260px] object-contain md:max-w-[300px]"
          />
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 text-center sm:grid-cols-3 sm:divide-x sm:divide-white/10">
        {content.datos.map((dato) => (
          <div key={dato.label}>
            <dt className="font-display text-5xl font-bold text-lilac-400">{dato.valor}</dt>
            <dd className="mt-2 text-xs uppercase tracking-wide text-white/70">{dato.label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
