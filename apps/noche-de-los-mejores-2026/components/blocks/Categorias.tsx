import { config } from '@/content/event.config';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';

export function Categorias() {
  return (
    <Section id="categorias" bg="primary">
      <Reveal className="mx-auto max-w-3xl text-center">
        <SectionTitle>Categorías de reconocimiento</SectionTitle>
        <Rule className="mx-auto my-6" />
        <p className="text-lg text-text-secondary">
          Diez reconocimientos exaltan distintas formas de construir empresa, gremio y ciudad en Santander.
        </p>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-[1150px] grid-cols-1 gap-x-16 gap-y-2 md:grid-cols-2">
        {config.categorias.map((categoria, index) => (
          <Reveal
            key={categoria.nombre}
            delay={(index % 5) * 60}
            className="flex items-start gap-5 border-b border-gold/20 py-7"
          >
            <span className="font-display text-base text-gold">{String(index + 1).padStart(2, '0')}</span>
            <div className="flex flex-col gap-2">
              <span className="font-display text-2xl leading-snug">{categoria.nombre}</span>
              <p className="text-base leading-relaxed text-text-secondary">{categoria.descripcion}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
