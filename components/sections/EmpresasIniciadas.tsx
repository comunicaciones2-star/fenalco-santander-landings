import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import type { EmpresasIniciadasContent } from '@/content/fortaleza-legado';

interface EmpresasIniciadasProps {
  readonly content: EmpresasIniciadasContent;
}

export function EmpresasIniciadas({ content }: EmpresasIniciadasProps) {
  return (
    <Section bg="darker">
      <div className="text-center">
        <Kicker className="mx-auto">{content.kicker}</Kicker>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {content.empresas.map((empresa) => (
          <Image
            key={empresa.nombre}
            src={empresa.logo}
            alt={empresa.nombre}
            width={empresa.width}
            height={empresa.height}
            unoptimized
            className="h-8 w-auto opacity-80 md:h-9"
            style={{ width: 'auto' }}
          />
        ))}
      </div>
    </Section>
  );
}
