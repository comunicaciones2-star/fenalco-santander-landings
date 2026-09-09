import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Kicker } from '@/components/ui/Kicker';
import { OgivalDivider } from '@/components/ui/OgivalDivider';
import { CompassRose } from '@/components/ui/CompassRose';

// Bloque editorial nuevo (kit): presenta el concepto de campaña. Ancho contenido,
// sin cards ni grid — es el único bloque donde la referencia histórica veneciana
// es explícita (regla del prompt de build, §2 y §4).
//
// FASE 2.6 §11: máximo 2 recursos ornamentales — se retiran StarField y
// ConstellationLayer (competían con el texto en captura real); quedan
// CompassRose (ambiental, muy tenue) + OgivalDivider (separador de contenido,
// no una capa atmosférica). La sección debe sentirse como pausa narrativa.
export function Narrativa() {
  return (
    <Section
      id="narrativa"
      bg="primary"
      background={
        <CompassRose className="pointer-events-none absolute -left-32 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 text-gold/[0.06]" />
      }
    >
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <Kicker>La Serenísima</Kicker>

        <OgivalDivider className="h-12 w-24 text-gold/60" />

        <div className="flex flex-col gap-6 font-display text-xl italic leading-relaxed text-surface-light/90 sm:text-2xl">
          <p>
            Venecia no fue una postal: fue una república de mercaderes. Sin tierras fértiles ni
            ejércitos numerosos, construyó su poder sobre el comercio, la banca y las rutas que
            conectaban oriente y occidente.
          </p>
          <p>
            Santander se levantó sobre la misma lógica: la del comerciante que arriesga, negocia
            y sostiene a su región con el trabajo diario del negocio propio.
          </p>
          <p className="not-italic text-gold">
            Los comerciantes construyeron Venecia. Los empresarios construyen Santander.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
