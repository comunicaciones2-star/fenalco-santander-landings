import Image from 'next/image';
import { ShieldCheck, Sprout, Target, Users, type LucideIcon } from 'lucide-react';
import { config } from '@/content/conexiones';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { InstitutionalPartners } from '@/components/blocks/InstitutionalPartners';

const ICONS: Record<string, LucideIcon> = { ShieldCheck, Target, Users, Sprout };

export function Diferenciadores() {
  const { diferenciadores } = config;

  return (
    <Section id={diferenciadores.id} bg="white">
      <Reveal className="max-w-2xl">
        <Kicker>Diferenciadores</Kicker>
        <SectionTitle className="mt-3">{diferenciadores.titulo}</SectionTitle>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {diferenciadores.pilares.map((pilar, index) => {
          const Icon = ICONS[pilar.icon];
          return (
            <Reveal key={pilar.numero} delay={index * 70} className="border-t-2 border-green/30 pt-5">
              <Icon size={22} className="text-green" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold text-green">{pilar.numero}</p>
              <h3 className="mt-1 text-lg font-semibold text-navy">{pilar.titulo}</h3>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={diferenciadores.pilares.length * 70} className="relative mt-14 aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src="/images/institutional-ecosystem.png"
          alt="Directivos empresariales saludándose durante un encuentro institucional"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '50% 20%' }}
        />
      </Reveal>

      <Reveal className="mt-14 border-t border-ink/10 pt-10">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">Aliados institucionales</p>
        <InstitutionalPartners />
      </Reveal>
    </Section>
  );
}
