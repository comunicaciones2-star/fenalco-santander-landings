import Image from 'next/image';
import { Check } from 'lucide-react';
import { config } from '@/content/conexiones';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export function Patrocinio() {
  const { patrocinio } = config;

  return (
    <Section id={patrocinio.id} bg="white">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <Reveal>
          <Kicker>Patrocinio</Kicker>
          <SectionTitle className="mt-3">{patrocinio.titulo}</SectionTitle>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">{patrocinio.intro}</p>
        </Reveal>

        <Reveal
          delay={80}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-lg lg:ml-auto lg:max-w-sm"
        >
          <Image
            src="/images/sponsor-networking.png"
            alt="Empresarios saludándose de mano durante una jornada de relacionamiento comercial"
            fill
            sizes="(min-width: 1024px) 380px, 90vw"
            className="object-cover"
            style={{ objectPosition: '50% 22%' }}
          />
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-12 border-t border-ink/10 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">{patrocinio.sectoresTitulo}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {patrocinio.sectores.map((sector) => (
            <li
              key={sector}
              className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink-soft"
            >
              {sector}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {patrocinio.paquetes.map((paquete, index) => (
          <Reveal
            key={paquete.nombre}
            delay={index * 80}
            className="flex flex-col gap-5 rounded-lg border border-ink/10 p-8"
          >
            <div>
              <h3 className="text-xl font-bold text-navy">{paquete.nombre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{paquete.resumen}</p>
            </div>
            <ul className="flex-1 space-y-2.5">
              {paquete.incluye.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <Check size={16} className="mt-0.5 shrink-0 text-green" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              href="#contacto"
              variant="ghost-dark"
              ariaLabel={`${patrocinio.ctaLabel} — ${paquete.nombre}`}
            >
              {patrocinio.ctaLabel}
            </Button>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
