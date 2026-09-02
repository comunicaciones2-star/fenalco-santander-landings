import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

// Bloque nuevo (kit): comercial. Cada beneficio responde "qué gana mi marca", nunca
// "cómo se produce el evento" — prohibidas fichas técnicas, tarifas o niveles de
// patrocinio (regla §4 y §5 del prompt de build). Termina en formulario, no en precios.
const BENEFICIOS = [
  {
    titulo: 'Acceso directo',
    descripcion: 'Presencia frente a empresarios, emprendedores y líderes gremiales de Santander.',
  },
  {
    titulo: 'Relacionamiento',
    descripcion: 'Un espacio para construir y fortalecer conexiones comerciales de alto nivel.',
  },
  {
    titulo: 'Asociación de marca',
    descripcion: 'Vincula tu marca al reconocimiento de la pujanza empresarial santandereana.',
  },
  {
    titulo: 'Visibilidad',
    descripcion: 'Un escenario comercial con proyección regional para tu marca.',
  },
] as const;

export function Patrocinio() {
  return (
    <Section id="patrocinio" bg="light-alt">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionTitle>Quiero patrocinar</SectionTitle>
        <Rule className="mx-auto my-6" />
        <p className="text-ink/70">
          Vincula tu marca a la gala que reconoce a quienes construyen el comercio de Santander.
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
        {BENEFICIOS.map((beneficio, index) => (
          <Reveal key={beneficio.titulo} delay={index * 70} className="border-t border-accent/30 pt-5">
            <h3 className="font-display text-lg">{beneficio.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">{beneficio.descripcion}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <Button href="#postulacion" variant="ghost-dark" ariaLabel="Ir al formulario de contacto comercial">
          Quiero patrocinar
        </Button>
      </Reveal>
    </Section>
  );
}
