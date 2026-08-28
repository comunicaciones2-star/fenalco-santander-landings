import { Radar, Shield, Rocket, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Accordion, type AccordionItem } from '@/components/Accordion';
import { IconBadge } from '@/components/ui/IconBadge';
import type { FasesDetalleContent, FaseDetalle } from '@/content/fortaleza-legado';

const ICONS: readonly LucideIcon[] = [Radar, Shield, Rocket];

interface FasesDetalleProps {
  readonly content: FasesDetalleContent;
}

function FaseDetallePanel({ fase }: { readonly fase: FaseDetalle }) {
  const listado = fase.analiza ?? fase.palancas;

  return (
    <div>
      <p className="text-white/80">{fase.resumen}</p>

      {listado && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {listado.map((item) => (
            <li key={item} className="rounded-full border border-lilac-400/40 px-3 py-1 text-xs text-lilac-400">
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fase.entregables.map((entregable) => (
          <div key={entregable.titulo}>
            <h4 className="font-display font-semibold text-lilac-400">{entregable.titulo}</h4>
            <p className="mt-1 text-sm text-white/70">{entregable.descripcion}</p>
          </div>
        ))}
      </div>

      {fase.cierreListado && (
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
          {fase.cierreListado.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      )}

      <p className="mt-6 italic text-lilac-400/90">&ldquo;{fase.cita}&rdquo;</p>
    </div>
  );
}

export function FasesDetalle({ content }: FasesDetalleProps) {
  const items: AccordionItem[] = content.fases.map((fase, index) => ({
    id: fase.nombre,
    trigger: (
      <span className="flex items-center gap-3">
        <IconBadge icon={ICONS[index] ?? Radar} size="sm" />
        {fase.nombre} <span className="font-normal text-white/50">· {fase.duracion}</span>
      </span>
    ),
    content: <FaseDetallePanel fase={fase} />,
  }));

  return (
    <Section bg="dark">
      <Accordion items={items} defaultOpenId={content.fases[0]?.nombre} />
    </Section>
  );
}
