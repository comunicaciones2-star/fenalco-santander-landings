import { Briefcase, GraduationCap, Store, UtensilsCrossed, Users, type LucideIcon } from 'lucide-react';
import { config } from '@/content/conexiones';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';

const ICONS: Record<string, LucideIcon> = { Store, GraduationCap, UtensilsCrossed, Users, Briefcase };

export function Oportunidad() {
  const { oportunidad } = config;

  return (
    <Section id={oportunidad.id} bg="alt">
      <Reveal className="max-w-2xl">
        <Kicker>La oportunidad</Kicker>
        <SectionTitle className="mt-3">{oportunidad.headline}</SectionTitle>
        <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">{oportunidad.copy}</p>
      </Reveal>

      <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {oportunidad.conceptos.map((concepto, index) => {
          const Icon = ICONS[concepto.icon];
          return (
            <Reveal
              as="li"
              key={concepto.label}
              delay={index * 60}
              className="flex items-center gap-4 border-b border-ink/10 pb-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="text-base font-medium text-navy">{concepto.label}</span>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={oportunidad.conceptos.length * 60} className="mt-14 border-t border-ink/10 pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
          {oportunidad.panelistas.titulo}
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {oportunidad.panelistas.personas.map((persona) => (
            <li key={persona.nombre}>
              <p className="font-semibold text-navy">{persona.nombre}</p>
              <p className="text-sm text-ink-soft">{persona.cargo}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ink-soft">{oportunidad.panelistas.disclaimer}</p>
      </Reveal>
    </Section>
  );
}
