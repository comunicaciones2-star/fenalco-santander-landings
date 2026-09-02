import Image from 'next/image';
import { config } from '@/content/event.config';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';

// Copy aprobado (§3 del prompt de build), literal.
export function CtaFinal() {
  return (
    <section id="cta-final" className="relative overflow-hidden bg-surface-dark-alt py-24 text-surface-light md:py-32">
      <Image
        src="/hero/ndlm-mercurio-izq.png"
        alt=""
        width={226}
        height={1080}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-[14vw] max-w-[220px] object-cover object-left opacity-30 lg:block"
      />
      <Image
        src="/hero/ndlm-mercurio-der.png"
        alt=""
        width={226}
        height={1080}
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[14vw] max-w-[220px] object-cover object-right opacity-30 lg:block"
      />

      <Reveal className="relative mx-auto flex max-w-xl flex-col items-center gap-7 px-6 text-center">
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">Es momento de dar el paso</h2>
        <p className="max-w-md text-surface-light/85">
          Haz parte de los reconocimientos que exaltan la excelencia, la trayectoria y el liderazgo
          empresarial en Santander.
        </p>
        <Badge>Convocatoria abierta</Badge>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={config.cta.principal.href} ariaLabel={config.cta.principal.label}>
            {config.cta.principal.label}
          </Button>
          <Button href={config.cta.secundario.href} variant="ghost" ariaLabel={config.cta.secundario.label}>
            {config.cta.secundario.label}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
