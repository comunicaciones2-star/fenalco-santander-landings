import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ParallaxBackground } from '@/components/ui/ParallaxBackground';
import type { ProcesoLegadoContent } from '@/content/fortaleza-legado';

interface ProcesoLegadoProps {
  readonly content: ProcesoLegadoContent;
}

export function ProcesoLegado({ content }: ProcesoLegadoProps) {
  return (
    <Section
      bg="dark"
      background={<ParallaxBackground src="/images/photography/proceso-legado-reunion.jpg" overlay="dark" />}
    >
      <ol className="mx-auto max-w-3xl space-y-10 border-l border-white/10 pl-8">
        {content.fases.map((fase, index) => (
          <li key={fase.nombre} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-lilac-400"
            />
            <Reveal delay={index * 90}>
              <h3 className="font-display text-lg font-semibold">{fase.nombre}</h3>
              <p className="mt-2 text-white/80">{fase.descripcion}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-10 w-fit rounded-full border border-lilac-400/40 bg-navy-800/60 px-6 py-3 text-center">
        <p className="font-display font-bold text-lilac-400">{content.badgeDuracion.valor}</p>
        <p className="text-xs text-white/70">{content.badgeDuracion.descripcion}</p>
      </div>
    </Section>
  );
}
