'use client';

import { config } from '@/content/event.config';
import { Button } from '@/components/ui/Button';
import { useCierreModalidad } from '@/hooks/useCierreModalidad';

export function HeroCtaClientside() {
  const cierrePostulacion = useCierreModalidad('postulacion');

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
      <Button href={config.cta.principal.href} ariaLabel={config.cta.principal.label} className="hero-action">
        {config.cta.principal.label}
      </Button>
      <Button
        href={config.cta.secundario.href}
        variant="ghost"
        ariaLabel={config.cta.secundario.label}
        className="hero-action"
      >
        {config.cta.secundario.label}
      </Button>
    </div>
  );
}
