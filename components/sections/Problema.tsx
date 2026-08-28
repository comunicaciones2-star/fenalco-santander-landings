import { TrendingDown, Wallet, Workflow, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Quote } from '@/components/ui/Quote';
import { Reveal } from '@/components/ui/Reveal';
import { IconBadge } from '@/components/ui/IconBadge';
import { ParallaxBackground } from '@/components/ui/ParallaxBackground';
import type { ProblemaContent } from '@/content/fortaleza-legado';

interface ProblemaProps {
  readonly content: ProblemaContent;
}

const ICONS: readonly LucideIcon[] = [TrendingDown, Wallet, Workflow];

export function Problema({ content }: ProblemaProps) {
  return (
    <Section bg="darker" background={<ParallaxBackground src="/images/photography/problema-bg-dashboards.jpg" overlay="dark" fadeTop />}>
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{content.kicker}</Kicker>
        <Rule className="mx-auto" />
        <SectionTitle>{content.titulo}</SectionTitle>
      </div>

      {/* Scrim local: protege el contraste sin depender del brillo exacto del
          fondo en este punto (monitores del escritorio ejecutivo). */}
      <div className="mt-10 rounded-2xl bg-navy-900/50 p-8 backdrop-blur-sm">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.columnas.map((columna, index) => (
            <Reveal key={columna.titulo} delay={index * 90} className="flex flex-col items-center text-center">
              <IconBadge icon={ICONS[index] ?? Workflow} />
              <h3 className="mt-4 font-display text-xl font-semibold">{columna.titulo}</h3>
              <p className="mt-2 text-sm text-white/70">{columna.descripcion}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Quote className="mt-10">{content.cita}</Quote>
    </Section>
  );
}
