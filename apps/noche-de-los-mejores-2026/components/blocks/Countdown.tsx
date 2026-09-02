'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';
import { config } from '@/content/event.config';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calcularTiempoRestante(): TimeLeft {
  const diff = new Date(config.fecha.inicio).getTime() - Date.now();
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 };

  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

function useCountdown(): TimeLeft | null {
  // null hasta el primer tick en cliente: evita desajuste de hidratación entre
  // el render del servidor y el momento real de carga en el navegador.
  const cache = useRef<TimeLeft | null>(null);

  const subscribe = useCallback((onStoreChange: () => void) => {
    cache.current = calcularTiempoRestante();
    const id = setInterval(() => {
      cache.current = calcularTiempoRestante();
      onStoreChange();
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const getSnapshot = useCallback(() => cache.current, []);
  const getServerSnapshot = useCallback(() => null, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function Unidad({ valor, etiqueta }: { readonly valor: number; readonly etiqueta: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-display text-3xl tabular-nums tracking-tight sm:text-4xl">
        {String(valor).padStart(2, '0')}
      </span>
      <span className="text-[11px] text-current/60">{etiqueta}</span>
    </div>
  );
}

interface CountdownProps {
  /** Fila compacta para insertar dentro del Hero, sin envolver en <Section>. */
  readonly compact?: boolean;
}

export function Countdown({ compact = false }: CountdownProps) {
  const tiempo = useCountdown();
  const valores = tiempo ?? { dias: 0, horas: 0, minutos: 0, segundos: 0 };

  const fila = (
    <div className="flex items-center gap-5 sm:gap-8" aria-live="off">
      <Unidad valor={valores.dias} etiqueta="Días" />
      <span className="text-accent/50">·</span>
      <Unidad valor={valores.horas} etiqueta="Horas" />
      <span className="text-accent/50">·</span>
      <Unidad valor={valores.minutos} etiqueta="Min" />
      <span className="text-accent/50">·</span>
      <Unidad valor={valores.segundos} etiqueta="Seg" />
    </div>
  );

  if (compact) {
    return (
      <div className="mt-2">
        <p className="mb-3 text-sm text-surface-light/50">Faltan</p>
        {fila}
      </div>
    );
  }

  return (
    <Section id="countdown" bg="light-alt">
      <Reveal className="flex flex-col items-center gap-6 text-center">
        <Badge>Convocatoria abierta</Badge>
        {fila}
        <p className="max-w-md text-sm text-ink/60">{config.fecha.textoDisplay}</p>
      </Reveal>
    </Section>
  );
}
