import { ShieldCheck, Wallet, Workflow, TrendingUp, Radar, Shield, Rocket, Users, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Quote } from '@/components/ui/Quote';
import { Reveal } from '@/components/ui/Reveal';
import { IconBadge } from '@/components/ui/IconBadge';
import type { FortalezaQueEsContent, MetodologiaRemContent, WarRoomNotaContent } from '@/content/fortaleza-legado';

interface FortalezaProps {
  readonly queEs: FortalezaQueEsContent;
  readonly metodo: MetodologiaRemContent;
  readonly warRoomNota: WarRoomNotaContent;
}

const PILAR_ICONS: readonly LucideIcon[] = [ShieldCheck, Wallet, Workflow, TrendingUp];
const REM_ICONS: readonly LucideIcon[] = [Radar, Shield, Rocket];

export function Fortaleza({ queEs, metodo, warRoomNota }: FortalezaProps) {
  return (
    <Section bg="dark" id="fortaleza">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{queEs.kicker}</Kicker>
        <Rule className="mx-auto" />
        <SectionTitle>{queEs.titulo}</SectionTitle>
        <p className="mt-6 text-white/80">{queEs.bajada}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {queEs.pilares.map((pilar, index) => (
          <Reveal key={pilar.titulo} delay={index * 80} className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <IconBadge icon={PILAR_ICONS[index] ?? ShieldCheck} />
            <h3 className="mt-4 font-display text-lg font-semibold text-lilac-400">{pilar.titulo}</h3>
            <p className="mt-2 text-sm text-white/70">{pilar.descripcion}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-12">
        <div className="mx-auto max-w-3xl text-center">
          <Kicker>{metodo.kicker}</Kicker>
          <Rule className="mx-auto" />
          <SectionTitle>{metodo.titulo}</SectionTitle>
          <p className="mt-4 text-white/80">{metodo.bajada}</p>
        </div>

        <div className="rounded-3xl border border-lilac-400/10 bg-navy-900-textured p-6 md:p-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {metodo.fases.map((fase, index) => {
              const FaseIcon = REM_ICONS[index] ?? Radar;
              return (
                <Reveal key={fase.letra} delay={index * 100}>
                  <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-lilac-400/40 bg-navy-900-textured">
                      <FaseIcon size={22} strokeWidth={1.5} className="text-lilac-400" />
                    </span>
                    <span className="mt-3 block font-display text-4xl font-bold text-lilac-400">{fase.letra}</span>
                    <h3 className="mt-1 font-display text-lg font-semibold">
                      {fase.nombre} <span className="font-normal text-white/50">· {fase.dia}</span>
                    </h3>
                    <p className="mt-1 text-sm text-white/70">{fase.descripcion}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Quote className="mt-8">{metodo.cierre}</Quote>
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl items-center gap-4 rounded-2xl border border-lilac-400/20 bg-navy-800/40 p-5">
        <IconBadge icon={Users} size="sm" />
        <p className="text-sm text-white/80">{warRoomNota.texto}</p>
      </div>
    </Section>
  );
}
