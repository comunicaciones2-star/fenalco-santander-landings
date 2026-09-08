import Image from 'next/image';
import { config } from '@/content/conexiones';

interface InstitutionalPartnersProps {
  readonly align?: 'start' | 'center';
  readonly includeEventLogo?: boolean;
  readonly context?: 'default' | 'footer';
  readonly zoom?: 1 | 2;
}

// Lockup oficial vigente (Fenalco Santander + La Feria Bonita de Colombia + IMEBU,
// que ya incluye el escudo de la Alcaldía de Bucaramanga). Reutilizado en
// Diferenciadores (sección Aliados) y en el Footer — una sola fuente de verdad.
// Cada aliado trae su propio `heightClass` (ver content/conexiones.ts): sus
// proporciones intrínsecas son muy distintas, así que igualar solo la altura no
// bastaba para que se percibieran del mismo tamaño — se ajustó a mano.
const EVENT_LOGO = {
  nombre: `${config.nombre} — ${config.edicion}`,
  src: '/brand/conexiones-bga-logo-vertical-claro.svg',
  width: 378,
  height: 310,
  heightClass: 'h-14 sm:h-16',
} as const;

function getFooterHeightClass(nombre: string, fallback: string) {
  switch (nombre) {
    case 'Fenalco Santander':
      return 'h-14 sm:h-16';
    case 'La Feria Bonita de Colombia':
      return 'h-12 sm:h-14';
    case 'IMEBU — Alcaldía de Bucaramanga':
      return 'h-14 sm:h-16';
    default:
      return fallback;
  }
}

function getZoomedHeightClass(nombre: string, fallback: string) {
  switch (nombre) {
    case 'Fenalco Santander':
      return 'h-20 sm:h-24';
    case 'La Feria Bonita de Colombia':
      return 'h-[4.75rem] sm:h-[5.75rem]';
    case 'IMEBU — Alcaldía de Bucaramanga':
      return 'h-20 sm:h-24';
    default:
      return fallback;
  }
}

export function InstitutionalPartners({
  align = 'start',
  includeEventLogo = false,
  context = 'default',
  zoom = 1,
}: InstitutionalPartnersProps) {
  const logos = includeEventLogo ? [EVENT_LOGO, ...config.aliados] : config.aliados;

  return (
    <div
      className={`flex flex-wrap items-center ${zoom === 2 ? 'gap-x-16 gap-y-8 sm:gap-x-20 sm:gap-y-10' : 'gap-x-10 gap-y-6'} ${align === 'center' ? 'justify-center' : ''}`}
    >
      {logos.map((aliado) => (
        <Image
          key={aliado.nombre}
          src={aliado.src}
          alt={aliado.nombre}
          width={aliado.width}
          height={aliado.height}
          className={`w-auto object-contain ${
            context === 'footer'
              ? getFooterHeightClass(aliado.nombre, aliado.heightClass)
              : zoom === 2
                ? getZoomedHeightClass(aliado.nombre, aliado.heightClass)
                : aliado.heightClass
          }`}
        />
      ))}
    </div>
  );
}
