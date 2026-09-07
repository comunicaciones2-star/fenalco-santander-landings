import Image from 'next/image';
import { config } from '@/content/conexiones';

interface InstitutionalPartnersProps {
  readonly align?: 'start' | 'center';
}

// Lockup oficial vigente (Fenalco Santander + La Feria Bonita de Colombia + IMEBU,
// que ya incluye el escudo de la Alcaldía de Bucaramanga). Reutilizado en
// Diferenciadores (sección Aliados) y en el Footer — una sola fuente de verdad.
// Cada aliado trae su propio `heightClass` (ver content/conexiones.ts): sus
// proporciones intrínsecas son muy distintas, así que igualar solo la altura no
// bastaba para que se percibieran del mismo tamaño — se ajustó a mano.
export function InstitutionalPartners({ align = 'start' }: InstitutionalPartnersProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-12 gap-y-6 ${align === 'center' ? 'justify-center' : ''}`}
    >
      {config.aliados.map((aliado) => (
        <Image
          key={aliado.nombre}
          src={aliado.src}
          alt={aliado.nombre}
          width={aliado.width}
          height={aliado.height}
          className={`w-auto object-contain ${aliado.heightClass}`}
        />
      ))}
    </div>
  );
}
