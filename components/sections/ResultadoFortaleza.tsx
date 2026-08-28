import { ShieldCheck, Building2, TrendingUp, LayoutDashboard, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { NumberedCard } from '@/components/ui/NumberedCard';
import { Quote } from '@/components/ui/Quote';
import { Reveal } from '@/components/ui/Reveal';
import { IconBadge } from '@/components/ui/IconBadge';
import { KenBurnsImage } from '@/components/ui/KenBurnsImage';
import type { ResultadoFortalezaContent } from '@/content/fortaleza-legado';

interface ResultadoFortalezaProps {
  readonly content: ResultadoFortalezaContent;
}

const ICONS: readonly LucideIcon[] = [ShieldCheck, Building2, TrendingUp, LayoutDashboard];

export function ResultadoFortaleza({ content }: ResultadoFortalezaProps) {
  return (
    <Section bg="light">
      {/* resultado-fortaleza-workspace.jpg es panorámica (16:9) — como franja
          horizontal de ancho completo en vez de columna alta, para no perder
          casi todo el encuadre al recortarla contra una columna angosta. */}
      <KenBurnsImage
        src="/images/photography/resultado-fortaleza-workspace.jpg"
        className="hidden aspect-[21/9] w-full md:block"
      />

      <div className="mx-auto mt-10 max-w-3xl text-center">
        <Kicker className="text-lilac-600">{content.kicker}</Kicker>
        <Rule className="mx-auto" />
        <SectionTitle>{content.titulo}</SectionTitle>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {content.tarjetas.map((tarjeta, index) => (
          <Reveal key={tarjeta.numero} delay={index * 80}>
            <IconBadge icon={ICONS[index] ?? ShieldCheck} tone="light" />
            <div className="mt-4">
              <NumberedCard numero={tarjeta.numero} titulo={tarjeta.titulo} descripcion={tarjeta.descripcion} />
            </div>
          </Reveal>
        ))}
      </div>

      <Quote tone="light" className="mt-10">{content.cita}</Quote>
    </Section>
  );
}
