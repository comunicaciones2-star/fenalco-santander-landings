import { config } from '@/content/event.config';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';
import { CompassRose } from '@/components/ui/CompassRose';

export function Sede() {
  return (
    <Section
      id="sede"
      bg="primary"
      background={
        <CompassRose className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 text-gold/[0.04]" />
      }
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionTitle>Lugar y fecha</SectionTitle>
        <Rule className="mx-auto my-7" />

        <p className="font-display text-3xl">{config.sede.nombre}</p>
        <p className="mt-2 text-lg text-text-secondary">{config.sede.ciudad}</p>
        {config.sede.direccion ? (
          <p className="text-lg text-text-secondary">{config.sede.direccion}</p>
        ) : (
          <p className="text-sm text-text-secondary">Dirección: sujeto a cambios.</p>
        )}

        <p className="mt-8 font-display text-2xl text-gold">{config.fecha.textoDisplay}</p>
        <p className="mt-4 text-sm text-text-secondary">{config.sede.notas}</p>
      </Reveal>
    </Section>
  );
}
