import { Landmark, UserCog, Gavel, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Quote } from '@/components/ui/Quote';
import { Reveal } from '@/components/ui/Reveal';
import { IconBadge } from '@/components/ui/IconBadge';
import { GlassImageCard } from '@/components/ui/GlassImageCard';
import { TiltWrapper } from '@/components/ui/TiltWrapper';
import type { LegadoAperturaContent, TresCapasContent } from '@/content/fortaleza-legado';

interface LegadoAperturaProps {
  readonly content: LegadoAperturaContent;
  readonly tresCapas: TresCapasContent;
}

const CAPA_ICONS: readonly LucideIcon[] = [Landmark, UserCog, Gavel];

export function LegadoApertura({ content, tresCapas }: LegadoAperturaProps) {
  return (
    <Section bg="light-alt" id="legado">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <Kicker className="text-lilac-600">{content.kicker}</Kicker>
          <Rule />
          <SectionTitle>{content.titulo}</SectionTitle>

          <div className="mt-8 grid grid-cols-2 gap-8">
            {content.cifras.map((cifra) => {
              const porcentaje = Math.min(100, Math.max(0, parseFloat(cifra.valor)));
              return (
                <div key={cifra.valor}>
                  <p className="font-display text-6xl font-bold text-lilac-600">{cifra.valor}</p>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-lilac-400/20">
                    <div className="h-full rounded-full bg-lilac-600" style={{ width: `${porcentaje}%` }} />
                  </div>
                  <p className="mt-2 text-ink-900/70">{cifra.descripcion}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-ink-900/80">{content.texto}</p>
        </div>

        <TiltWrapper className="hidden md:block">
          <GlassImageCard src="/images/photography/legado-vision-lider.png" tone="dark-panel" />
        </TiltWrapper>
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-ink-900/10 bg-cream-50 px-8 py-5 sm:flex-row sm:divide-x sm:divide-ink-900/10">
        <p className="text-sm sm:pr-6">
          <span className="font-display font-semibold">{content.contraste.herencia.titulo}:</span>{' '}
          <span className="text-ink-900/70">{content.contraste.herencia.texto}</span>
        </p>
        <p className="text-sm sm:pl-6">
          <span className="font-display font-semibold text-lilac-600">{content.contraste.sucesion.titulo}:</span>{' '}
          <span className="text-ink-900/70">{content.contraste.sucesion.texto}</span>
        </p>
      </div>

      <Quote tone="light" className="mt-8">{content.cierre}</Quote>

      <div className="mt-12">
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle as="h3" className="text-3xl md:text-4xl">
            {tresCapas.titulo}
          </SectionTitle>
          <p className="mt-4 text-ink-900/70">{tresCapas.bajada}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {tresCapas.capas.map((capa, index) => (
            <Reveal key={capa.numero} delay={index * 90} className="text-center">
              <IconBadge icon={CAPA_ICONS[index] ?? Landmark} tone="light" className="mx-auto" />
              <h4 className="mt-4 font-display text-lg font-semibold">
                {capa.titulo} <span className="font-normal text-ink-900/50">— {capa.subtitulo}</span>
              </h4>
              <p className="mt-2 text-sm text-ink-900/70">{capa.descripcion}</p>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink-900/60">{tresCapas.notaPie}</p>
      </div>
    </Section>
  );
}
