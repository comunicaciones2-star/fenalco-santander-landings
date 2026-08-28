import { Building2, Heart, Award, Repeat, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Quote } from '@/components/ui/Quote';
import { Reveal } from '@/components/ui/Reveal';
import { IconBadge } from '@/components/ui/IconBadge';
import type { ResultadoLegadoContent } from '@/content/fortaleza-legado';

interface ResultadoLegadoProps {
  readonly content: ResultadoLegadoContent;
}

const ICONS: readonly LucideIcon[] = [Building2, Heart, Award, Repeat];

export function ResultadoLegado({ content }: ResultadoLegadoProps) {
  return (
    <Section bg="light">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((item, index) => (
          <Reveal key={item.titulo} delay={index * 70} className="text-center">
            <IconBadge icon={ICONS[index] ?? Building2} tone="light" className="mx-auto" />
            <h3 className="mt-4 font-display font-semibold">{item.titulo}</h3>
            <p className="mt-2 text-sm text-ink-900/70">{item.descripcion}</p>
          </Reveal>
        ))}
      </div>

      <Quote tone="light" className="mt-10">{content.cita}</Quote>
    </Section>
  );
}
