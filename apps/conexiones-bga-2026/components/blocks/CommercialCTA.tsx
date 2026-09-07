import Image from 'next/image';
import { config } from '@/content/conexiones';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { DotMotif } from '@/components/ui/DotMotif';

// Datos de contacto comercial (nombre/cargo/correo/teléfono) y enlace comercial:
// pendientes de confirmación (ver content/conexiones.ts → contactoComercial). El
// bloque se renderiza completo sin ellos y solo aparece cuando existan datos reales
// — nunca se muestra un placeholder visible en su lugar.
export function CommercialCTA() {
  const { commercialCta, contactoComercial } = config;
  const hasContact = Boolean(contactoComercial.email || contactoComercial.telefono);

  return (
    <section id="cta-comercial" className="relative overflow-hidden py-20 text-white md:py-28">
      <Image
        src="/images/commercial-cta.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: '65% 42%' }}
      />
      {/* rgba en línea, no bg-navy/72 ni bg-green/22: esas combinaciones de utilidad
          de opacidad de color no compilan de forma fiable en este pipeline de
          Tailwind/Turbopack (confirmado en el CSS de build limpio). */}
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: 'rgba(27, 58, 75, 0.72)' }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: 'rgba(14, 122, 60, 0.22)' }} />
      <DotMotif className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 opacity-10" />
      <div className="relative mx-auto flex max-w-content flex-col items-center gap-7 px-6 text-center lg:px-10">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{commercialCta.titulo}</h2>
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-3 sm:flex-row">
          <Button href={commercialCta.ctaPrincipal.href} variant="inverse" ariaLabel={commercialCta.ctaPrincipal.label}>
            {commercialCta.ctaPrincipal.label}
          </Button>
          <Button href={commercialCta.ctaSecundario.href} variant="ghost" ariaLabel={commercialCta.ctaSecundario.label}>
            {commercialCta.ctaSecundario.label}
          </Button>
        </Reveal>

        {hasContact && (
          <Reveal delay={140} className="mt-2 flex flex-col items-center gap-1 text-sm text-white/85">
            {contactoComercial.nombre && (
              <p className="font-semibold text-white">
                {contactoComercial.nombre}
                {contactoComercial.cargo ? ` · ${contactoComercial.cargo}` : ''}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
              {contactoComercial.email && (
                <a href={`mailto:${contactoComercial.email}`} className="underline-offset-4 hover:underline">
                  {contactoComercial.email}
                </a>
              )}
              {contactoComercial.telefono && (
                <a href={`tel:${contactoComercial.telefono.replace(/\s+/g, '')}`} className="underline-offset-4 hover:underline">
                  {contactoComercial.telefono}
                </a>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
