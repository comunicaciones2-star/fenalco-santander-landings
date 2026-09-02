import { config } from '@/content/event.config';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';

export function Sede() {
  return (
    <Section id="sede" bg="light">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionTitle>Lugar y fecha</SectionTitle>
        <Rule className="mx-auto my-6" />

        <p className="font-display text-xl">{config.sede.nombre}</p>
        <p className="mt-1 text-ink/70">{config.sede.ciudad}</p>
        {config.sede.direccion ? (
          <p className="text-ink/70">{config.sede.direccion}</p>
        ) : (
          <p className="text-sm text-ink/70">Dirección: sujeto a cambios.</p>
        )}

        <p className="mt-6 font-display text-lg">{config.fecha.textoDisplay}</p>
        <p className="mt-4 text-sm text-ink/60">{config.sede.notas}</p>
      </Reveal>
    </Section>
  );
}
