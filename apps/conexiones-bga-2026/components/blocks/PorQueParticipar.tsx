import { config } from '@/content/conexiones';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';

export function PorQueParticipar() {
  const { porQueParticipar } = config;

  return (
    <Section bg="white">
      <Reveal className="max-w-2xl">
        <Kicker>Por qué participar</Kicker>
        <SectionTitle className="mt-3">{porQueParticipar.titulo}</SectionTitle>
      </Reveal>

      <ol className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {porQueParticipar.beneficios.map((beneficio, index) => (
          <Reveal as="li" key={beneficio} delay={index * 60} className="flex gap-4">
            <span className="text-sm font-semibold text-green" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="text-base leading-relaxed text-ink-soft">{beneficio}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
