import { AlertCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

interface CierreAvisoProps {
  readonly titulo: string;
  readonly descripcion?: string;
  readonly fondo?: 'primary' | 'secondary';
}

export function CierreAviso({ titulo, descripcion, fondo = 'primary' }: CierreAvisoProps) {
  return (
    <Section id="postulacion" bg={fondo}>
      <Reveal className="mx-auto max-w-2xl">
        <div className="rounded-lg border border-gold/30 bg-surface-elevated px-8 py-10 text-center">
          <div className="mb-4 flex justify-center">
            <AlertCircle className="h-10 w-10 text-gold" aria-hidden="true" />
          </div>
          <h2 className="font-display text-2xl text-ivory mb-3">{titulo}</h2>
          {descripcion && <p className="text-lg text-text-secondary">{descripcion}</p>}
        </div>
      </Reveal>
    </Section>
  );
}
