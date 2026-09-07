import Image from 'next/image';
import { Bell, Globe, Mic, MonitorPlay, Radio, Video, type LucideIcon } from 'lucide-react';
import { config } from '@/content/conexiones';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { DotMotif } from '@/components/ui/DotMotif';

const ICONS: Record<string, LucideIcon> = { Mic, MonitorPlay, Video, Radio, Globe, Bell };

export function Ecosistema() {
  const { ecosistema } = config;
  const total = ecosistema.puntos.length;

  return (
    <Section
      bg="navy"
      background={
        <>
          <Image
            src="/images/activation-event_2.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: '50% 28%' }}
          />
          {/* Gradiente en línea, no bg-gradient-to-b + from/via/to-navy/NN: esa
              combinación de utilidad de opacidad de color no compila de forma
              fiable en este pipeline de Tailwind/Turbopack (confirmado en el CSS
              de build limpio) — sin ella el scrim quedaba prácticamente ausente. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, rgba(27,58,75,0.93) 0%, rgba(27,58,75,0.9) 50%, rgba(27,58,75,0.95) 100%)',
            }}
          />
          <DotMotif className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-[0.1]" />
        </>
      }
    >
      <Reveal className="max-w-2xl">
        <Kicker className="text-lime">Ecosistema de activación</Kicker>
        <SectionTitle className="mt-3">{ecosistema.titulo}</SectionTitle>
      </Reveal>

      <ol className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
        {ecosistema.puntos.map((punto, index) => {
          const Icon = ICONS[punto.icon];
          const isLast = index === total - 1;
          return (
            <Reveal
              as="li"
              key={punto.label}
              delay={index * 60}
              className="relative flex items-start gap-4 lg:flex-1 lg:flex-col lg:items-center lg:text-center"
            >
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-[21px] top-11 h-[calc(100%-1rem)] w-px bg-white/15 lg:left-1/2 lg:top-[22px] lg:h-px lg:w-full lg:translate-x-[26px]"
                />
              )}
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-lime">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="pt-1 text-sm font-medium text-white lg:px-2">{punto.label}</span>
            </Reveal>
          );
        })}
      </ol>

      <Reveal delay={total * 60} className="mt-14 border-t border-white/15 pt-6">
        <p className="text-xs leading-relaxed text-white/60">{ecosistema.disclaimer}</p>
      </Reveal>
    </Section>
  );
}
