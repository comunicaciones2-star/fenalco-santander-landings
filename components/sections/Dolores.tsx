import { Banknote, CreditCard, PieChart, FileWarning, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';
import { IconBadge } from '@/components/ui/IconBadge';
import type { DoloresContent } from '@/content/fortaleza-legado';

interface DoloresProps {
  readonly content: DoloresContent;
}

const ICONS: readonly LucideIcon[] = [Banknote, CreditCard, PieChart, FileWarning];

// Bento asimétrico: el primer dolor ocupa el doble de ancho (no de alto) —
// evita el patrón de tarjetas idénticas sin inflar la altura de la sección.
const SPAN_CLASSES = ['md:col-span-2', 'md:col-span-1', 'md:col-span-1', 'md:col-span-1'];

export function Dolores({ content }: DoloresProps) {
  return (
    <Section bg="dark">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{content.kicker}</Kicker>
        <Rule className="mx-auto" />
        <SectionTitle>{content.titulo}</SectionTitle>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-5">
        {content.dolores.map((dolor, index) => (
          <Reveal
            key={dolor.numero}
            delay={index * 80}
            className={`rounded-2xl border border-white/10 bg-navy-800/60 p-5 ${SPAN_CLASSES[index] ?? ''}`}
          >
            <IconBadge icon={ICONS[index] ?? FileWarning} />
            <h3 className="mt-4 font-display text-lg font-semibold">{dolor.titulo}</h3>
            <p className="mt-2 text-sm text-white/70">{dolor.descripcion}</p>
          </Reveal>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/60">{content.cierreLinea}</p>
    </Section>
  );
}
