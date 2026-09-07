import { config } from '@/content/conexiones';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Kicker } from '@/components/ui/Kicker';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';

// Resolución editorial de los 3 bloques (no cards idénticas): desfase vertical
// progresivo entre columnas para romper la cuadrícula plana.
const OFFSET_CLASSES = ['', 'sm:mt-8', 'sm:mt-16'];

export function QueEs() {
  const { queEs } = config;

  return (
    <Section id={queEs.id} bg="white">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <Kicker>El evento</Kicker>
          <SectionTitle className="mt-3">{queEs.titulo}</SectionTitle>
          <Rule className="my-6" />
          <p className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg">{queEs.intro}</p>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-3 lg:gap-8">
          {queEs.bloques.map((bloque, index) => (
            <Reveal
              key={bloque.numero}
              delay={index * 80}
              className={`border-t-2 border-green/30 pt-5 ${OFFSET_CLASSES[index]}`}
            >
              <span className="text-sm font-bold text-green">{bloque.numero}</span>
              <h3 className="mt-2 text-lg font-semibold text-navy">{bloque.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{bloque.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
