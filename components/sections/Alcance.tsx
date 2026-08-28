import { Search, Shield, Rocket, Package, Users, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Button } from '@/components/ui/Button';
import { IconBadge } from '@/components/ui/IconBadge';
import type { AlcanceContent } from '@/content/fortaleza-legado';

interface AlcanceProps {
  readonly content: AlcanceContent;
}

const ICONS: readonly LucideIcon[] = [Search, Shield, Rocket, Package, Users];

function slugify(modalidad: string): string {
  const withoutAccents = modalidad
    .normalize('NFD')
    .split('')
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code < 0x0300 || code > 0x036f;
    })
    .join('');

  return withoutAccents.toLowerCase().trim().replace(/\s+/g, '-');
}

export function Alcance({ content }: AlcanceProps) {
  return (
    <Section bg="dark" id="alcance">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{content.kicker}</Kicker>
        <Rule className="mx-auto" />
        <SectionTitle>{content.titulo}</SectionTitle>
        <p className="mt-6 text-white/80">{content.bajada}</p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="mx-auto w-full max-w-4xl border-collapse text-left">
          <thead>
            <tr className="border-b border-white/20 text-sm uppercase tracking-wide text-white/60">
              <th className="py-3 pr-4">Modalidad</th>
              <th className="py-3 pr-4">Alcance</th>
              <th className="py-3 pr-4">Duración</th>
              <th className="py-3" />
            </tr>
          </thead>
          <tbody>
            {content.modalidades.map((fila, index) => (
              <tr
                key={fila.modalidad}
                className={`border-b border-white/10 ${fila.destacado ? 'bg-lilac-400/10' : ''}`}
              >
                <td className="py-3 pr-4 font-display font-semibold">
                  <span className="inline-flex items-center gap-3">
                    <IconBadge icon={ICONS[index] ?? Search} size="sm" />
                    {fila.modalidad}
                  </span>
                  {fila.destacado && (
                    <span className="ml-2 rounded-full bg-lilac-400 px-2 py-0.5 text-[10px] font-bold text-navy-900">
                      RECOMENDADO
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4 text-white/80">{fila.alcance}</td>
                <td className="py-3 pr-4 text-white/80">{fila.duracion}</td>
                <td className="py-3 text-right">
                  <Button
                    href={`/?modalidad=${slugify(fila.modalidad)}${content.cierre.ctaHref}`}
                    ariaLabel={`${content.cierre.ctaLabel} — ${fila.modalidad}`}
                    variant="ghost"
                    className="!px-4 !py-2 text-xs"
                  >
                    {content.cierre.ctaLabel}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-lilac-400/30 bg-navy-800/50 p-6 text-center">
        <h3 className="font-display text-xl font-semibold">{content.cierre.titulo}</h3>
        <p className="mt-2 text-white/80">{content.cierre.texto}</p>
        <Button href={content.cierre.ctaHref} ariaLabel={content.cierre.ctaLabel} className="mt-6">
          {content.cierre.ctaLabel}
        </Button>
      </div>
    </Section>
  );
}
