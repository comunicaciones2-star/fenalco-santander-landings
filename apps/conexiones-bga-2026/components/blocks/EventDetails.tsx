import { config } from '@/content/conexiones';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { DotMotif } from '@/components/ui/DotMotif';

// Bloque de alta jerarquía para fecha/sede. Sin fotografía de Neomundo (no existe
// asset oficial aprobado) — se resuelve con navy, tipografía y el isotipo de marca.
export function EventDetails() {
  const { eventDetails, fecha, sede } = config;

  return (
    <Section
      id={eventDetails.id}
      bg="navy"
      background={<DotMotif className="pointer-events-none absolute -bottom-24 -right-24 h-[26rem] w-[26rem] opacity-[0.08]" />}
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <Kicker className="text-lime">Fecha y sede</Kicker>
        <p className="mt-5 text-4xl font-bold text-white sm:text-5xl">{fecha.textoDisplay}</p>
        <span aria-hidden="true" className="mx-auto mt-8 block h-px w-16 bg-white/25" />
        <p className="mt-8 text-xl font-semibold text-white">{sede.nombre}</p>
        <p className="mt-1 text-white/80">{sede.lugar}</p>
        <p className="mt-1 text-white/60">
          {sede.ciudad}, {sede.departamento}
        </p>
      </Reveal>
    </Section>
  );
}
