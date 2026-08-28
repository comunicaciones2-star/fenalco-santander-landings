import Link from 'next/link';
import { ShieldCheck, Landmark, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { IconBadge } from '@/components/ui/IconBadge';
import type { ProgramasSelectorContent } from '@/content/fortaleza-legado';

interface ProgramasSelectorProps {
  readonly content: ProgramasSelectorContent;
}

const ICONS: readonly LucideIcon[] = [ShieldCheck, Landmark];

export function ProgramasSelector({ content }: ProgramasSelectorProps) {
  return (
    <Section bg="light">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{content.kicker}</Kicker>
        <Rule className="mx-auto" />
        <SectionTitle>{content.titulo}</SectionTitle>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {content.tarjetas.map((tarjeta, index) => (
          <Link
            key={tarjeta.nombre}
            href={tarjeta.href}
            className="group rounded-3xl border border-ink-900/10 bg-cream-100 p-8 transition-transform hover:-translate-y-1 hover:shadow-xl"
          >
            <IconBadge icon={ICONS[index] ?? ShieldCheck} tone="light" />
            <p className="kicker mt-4 text-lilac-600">{tarjeta.etiqueta}</p>
            <h3 className="mt-4 font-display text-2xl font-bold">{tarjeta.nombre}</h3>
            <p className="mt-3 text-ink-900/70">{tarjeta.descripcion}</p>
            <span className="mt-6 inline-block font-display font-semibold text-lilac-600 group-hover:underline">
              Conocer más →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
