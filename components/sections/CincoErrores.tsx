import { Clock, HandMetal, Users, AlertTriangle, UserX, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';
import { ParallaxBackground } from '@/components/ui/ParallaxBackground';
import type { CincoErroresContent } from '@/content/fortaleza-legado';

interface CincoErroresProps {
  readonly content: CincoErroresContent;
}

const ICONS: readonly LucideIcon[] = [Clock, HandMetal, Users, AlertTriangle, UserX];

export function CincoErrores({ content }: CincoErroresProps) {
  return (
    <Section bg="dark" background={<ParallaxBackground src="/images/photography/errores-corredor-transicion.jpg" overlay="dark" />}>
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{content.kicker}</Kicker>
        <Rule className="mx-auto" />
        <SectionTitle>{content.titulo}</SectionTitle>
      </div>

      <ol className="relative mx-auto mt-10 max-w-3xl">
        <div aria-hidden="true" className="timeline-connector absolute left-6 top-2 h-[calc(100%-2rem)] w-px" />
        {content.errores.map((error, index) => {
          const Icon = ICONS[index] ?? AlertTriangle;
          return (
            <li key={error.numero} className="relative border-b border-white/10 py-5 last:border-b-0">
              <Reveal delay={index * 70} className="flex gap-6 pl-0">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-lilac-400/40 bg-navy-900-textured">
                  <Icon size={22} strokeWidth={1.5} className="text-lilac-400" />
                </span>
                <div className="relative flex-1">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 right-0 select-none font-display text-7xl font-bold text-lilac-400/20"
                  >
                    {error.numero}
                  </span>
                  <h3 className="relative font-display text-lg font-semibold">{error.titulo}</h3>
                  <p className="relative mt-2 max-w-xl text-sm text-white/70">{error.descripcion}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
