'use client';

import { config } from '@/content/event.config';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCierreModalidad } from '@/hooks/useCierreModalidad';

export function CtaFinalClientside() {
  const cierrePostulacion = useCierreModalidad('postulacion');

  if (cierrePostulacion.cerrado) {
    return (
      <>
        <h2 className="font-display text-5xl leading-tight sm:text-6xl">
          Postulaciones cerradas
        </h2>
        <p className="max-w-md text-lg text-surface-light/85">
          La convocatoria a las categorías de reconocimiento de La Noche de los Mejores 2026 ha finalizado.
        </p>
        <p className="max-w-md text-lg text-surface-light/85">
          Agradecemos a todas las empresas y líderes que participaron en esta edición.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button
            href={config.cta.secundario.href}
            variant="ghost"
            ariaLabel={config.cta.secundario.label}
            className="!px-9 !py-4 !text-base"
          >
            {config.cta.secundario.label}
          </Button>
          <a
            href="?modalidad=interes#postulacion"
            className="btn-ghost !px-9 !py-4 !text-base"
          >
            Quiero asistir
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="font-display text-5xl leading-tight sm:text-6xl">Es momento de dar el paso</h2>
      <p className="max-w-md text-lg text-surface-light/85">
        Haz parte de los reconocimientos que exaltan la excelencia, la trayectoria y el liderazgo
        empresarial en Santander.
      </p>
      <Badge>Convocatoria abierta</Badge>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Button href={config.cta.principal.href} ariaLabel={config.cta.principal.label} className="!px-9 !py-4 !text-base">
          {config.cta.principal.label}
        </Button>
        <Button
          href={config.cta.secundario.href}
          variant="ghost"
          ariaLabel={config.cta.secundario.label}
          className="!px-9 !py-4 !text-base"
        >
          {config.cta.secundario.label}
        </Button>
      </div>
    </>
  );
}
