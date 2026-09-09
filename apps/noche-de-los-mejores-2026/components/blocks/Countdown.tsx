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

// Bordes en vez de separadores "·": un <span> extra por separador no encaja en
// un grid de 4 columnas iguales (que es lo que garantiza que 4 unidades nunca
// desborden un viewport de 375px — grid-cols-4 siempre reparte el ancho
// disponible en partes iguales, a diferencia de flex con gaps fijos).
function Unidad({ valor, etiqueta, primero }: { readonly valor: number; readonly etiqueta: string; readonly primero: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-2 px-2 ${primero ? '' : 'border-l border-gold/20'}`}>
      <span className="font-display text-[clamp(2rem,7vw,4.5rem)] tabular-nums leading-none tracking-tight">
        {String(valor).padStart(2, '0')}
      </span>
      <span className="text-xs uppercase tracking-[0.1em] text-current/70 sm:text-sm">{etiqueta}</span>
    </div>
  );
}

// Antes existía un modo `compact` para insertar una segunda fila del contador
// dentro del Hero, además de esta sección — mostraba el mismo tiempo restante
// dos veces seguidas en la página. Se eliminó (ver Hero.tsx): esta sección,
// con el badge "Convocatoria abierta", es el único contador de la landing.
export function Countdown() {
  const tiempo = useCountdown();
  const valores = tiempo ?? { dias: 0, horas: 0, minutos: 0, segundos: 0 };

  return (
    <Section id="countdown" bg="secondary">
      <Reveal className="flex flex-col items-center gap-8 text-center">
        <Badge>Convocatoria abierta</Badge>
        <div className="grid w-full max-w-3xl grid-cols-4" aria-live="off">
          <Unidad valor={valores.dias} etiqueta="Días" primero />
          <Unidad valor={valores.horas} etiqueta="Horas" primero={false} />
          <Unidad valor={valores.minutos} etiqueta="Min" primero={false} />
          <Unidad valor={valores.segundos} etiqueta="Seg" primero={false} />
        </div>
        <p className="max-w-md text-base text-text-secondary">{config.fecha.textoDisplay}</p>
      </Reveal>
    </Section>
  );
}
