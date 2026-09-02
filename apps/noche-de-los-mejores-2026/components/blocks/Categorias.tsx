import { config } from '@/content/event.config';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';

export function Categorias() {
  return (
    <Section id="categorias" bg="light">
      <Reveal className="mx-auto max-w-3xl text-center">
        <SectionTitle>Categorías de reconocimiento</SectionTitle>
        <Rule className="mx-auto my-6" />
        <p className="text-ink/70">
          Diez reconocimientos exaltan distintas formas de construir empresa, gremio y ciudad en Santander.
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-x-12 md:grid-cols-2">
        {config.categorias.map((categoria, index) => (
          <Reveal
            key={categoria.nombre}
            delay={(index % 5) * 60}
            className="flex items-baseline gap-4 border-b border-ink/10 py-5"
          >
            <span className="font-display text-sm text-accent">{String(index + 1).padStart(2, '0')}</span>
            <span className="font-display text-lg leading-snug">{categoria.nombre}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
