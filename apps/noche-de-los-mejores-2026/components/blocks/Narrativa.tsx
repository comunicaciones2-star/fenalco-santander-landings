import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Kicker } from '@/components/ui/Kicker';
import { OgivalDivider } from '@/components/ui/OgivalDivider';
import { CompassRose } from '@/components/ui/CompassRose';

// Bloque editorial nuevo (kit): presenta el concepto de campaña. Ancho contenido,
// sin cards ni grid — es el único bloque donde la referencia histórica veneciana
// es explícita (regla del prompt de build, §2 y §4).
export function Narrativa() {
  return (
    <Section id="narrativa" bg="dark" background={<CompassRose className="pointer-events-none absolute -left-32 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 text-accent/[0.06]" />}>
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <Kicker>La Serenísima</Kicker>

        <OgivalDivider className="h-12 w-24 text-accent/60" />

        <div className="flex flex-col gap-5 font-display text-lg italic leading-relaxed text-surface-light/90 sm:text-xl">
          <p>
            Venecia no fue una postal: fue una república de mercaderes. Sin tierras fértiles ni
            ejércitos numerosos, construyó su poder sobre el comercio, la banca y las rutas que
            conectaban oriente y occidente.
          </p>
          <p>
            Santander se levantó sobre la misma lógica: la del comerciante que arriesga, negocia
            y sostiene a su región con el trabajo diario del negocio propio.
          </p>
          <p className="not-italic text-accent">
            Los comerciantes construyeron Venecia. Los empresarios construyen Santander.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
