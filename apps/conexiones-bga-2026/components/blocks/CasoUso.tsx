import { Megaphone, MapPin, MessageCircle, TrendingUp, type LucideIcon } from 'lucide-react';
import { config } from '@/content/conexiones';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';

const ICONS: Record<string, LucideIcon> = { Megaphone, MapPin, MessageCircle, TrendingUp };

export function CasoUso() {
  const { casoUso } = config;

  return (
    <Section bg="alt">
      <Reveal className="max-w-2xl">
        <Kicker>Caso de uso</Kicker>
        <SectionTitle className="mt-3">{casoUso.titulo}</SectionTitle>
        <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">{casoUso.texto}</p>
      </Reveal>

      <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {casoUso.pasos.map((paso, index) => {
          const Icon = ICONS[paso.icon];
          return (
            <Reveal
              as="li"
              key={paso.fase}
              delay={index * 70}
              className="flex flex-col gap-3 border-l-2 border-green/40 pl-5 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green/10 text-green">
                <Icon size={18} aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-green">{paso.fase}</p>
              <p className="text-base font-medium text-navy">{paso.titulo}</p>
            </Reveal>
          );
        })}
      </ol>

      <Reveal className="mt-10 border-t border-ink/10 pt-5">
        <p className="text-xs leading-relaxed text-ink-soft">{casoUso.disclaimer}</p>
      </Reveal>
    </Section>
  );
}
