'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { Handshake, Landmark, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { config } from '@/content/conexiones';
import {
  AGENDA,
  AGENDA_FECHA,
  AGENDA_TZ,
  FIN_EVENTO_MIN,
  INICIO_EVENTO,
  aMinutos,
  jornadaDe,
} from '@/data/agenda';
import type { Categoria, Item, Jornada } from '@/data/agenda';

// ---------------------------------------------------------------------------
// Hora "ahora" — SOLO en cliente. En SSR `ahora` es null: se renderiza la
// agenda sin estado "en curso" y el efecto la calcula tras la hidratación.
// ---------------------------------------------------------------------------

interface Ahora {
  readonly fecha: string; // YYYY-MM-DD en Bogotá
  readonly min: number; // minutos desde medianoche en Bogotá
}

// Simular la hora (?now=2026-10-08T10:05) solo fuera de producción o con flag.
const QA_HABILITADO = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_AGENDA_QA === '1';

const formateadorBogota = new Intl.DateTimeFormat('en-CA', {
  timeZone: AGENDA_TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function leerAhora(): Ahora {
  if (QA_HABILITADO) {
    const simulada = new URLSearchParams(window.location.search).get('now');
    const m = simulada?.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})$/);
    if (m) return { fecha: m[1], min: Number(m[2]) * 60 + Number(m[3]) };
  }
  const p = Object.fromEntries(formateadorBogota.formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { fecha: `${p.year}-${p.month}-${p.day}`, min: Number(p.hour) * 60 + Number(p.minute) };
}

type Estado = 'pasada' | 'en-curso' | 'proxima';

function estadoDe(item: Item, ahora: Ahora | null): Estado | null {
  if (!ahora || ahora.fecha !== AGENDA_FECHA) return null;
  if (ahora.min >= aMinutos(item.fin ?? item.inicio)) return 'pasada';
  if (ahora.min >= aMinutos(item.inicio)) return 'en-curso';
  return 'proxima';
}

function jornadaPorDefecto(ahora: Ahora | null): Jornada {
  if (!ahora || ahora.fecha !== AGENDA_FECHA) return 'manana';
  const actual = AGENDA.find((i) => estadoDe(i, ahora) !== 'pasada');
  return actual ? jornadaDe(actual) : 'tarde';
}

function etiqueta(item: Item): string {
  return item.ponente ? `${item.titulo} — ${item.ponente}` : item.titulo;
}

// ---------------------------------------------------------------------------
// Presentación por categoría
// ---------------------------------------------------------------------------

const CATEGORIAS: Record<
  Categoria,
  { readonly label: string; readonly Icon: LucideIcon; readonly tag: string; readonly nodo: string }
> = {
  institucional: { label: 'Institucional', Icon: Landmark, tag: 'bg-[#E9EEF0] text-navy', nodo: 'bg-navy' },
  citas: { label: 'Citas de negocios', Icon: Handshake, tag: 'bg-[#FFE98A] text-navy', nodo: 'bg-yellow' },
  exito: { label: 'Caso de éxito', Icon: Trophy, tag: 'bg-[#DFF0E3] text-[#0B6B2F]', nodo: 'bg-green' },
};

const TABS: readonly { readonly id: Jornada; readonly label: string }[] = [
  { id: 'manana', label: 'Mañana' },
  { id: 'tarde', label: 'Tarde' },
];

interface Grupo {
  readonly hora: string;
  readonly items: readonly Item[];
}

function agrupar(items: readonly Item[]): Grupo[] {
  const grupos: { hora: string; items: Item[] }[] = [];
  for (const item of items) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.items[0].inicio === item.inicio) ultimo.items.push(item);
    else grupos.push({ hora: item.hora, items: [item] });
  }
  return grupos;
}

// ---------------------------------------------------------------------------
// Banner "Ahora / Sigue"
// ---------------------------------------------------------------------------

function BannerEstado({ ahora }: { readonly ahora: Ahora }) {
  let contenido: React.ReactNode;

  if (ahora.min < INICIO_EVENTO) {
    contenido = <p className="text-base font-medium">El evento inicia hoy a las 9:00 a. m.</p>;
  } else if (ahora.min >= FIN_EVENTO_MIN) {
    contenido = <p className="text-base font-medium">Gracias por participar</p>;
  } else {
    const enCurso = AGENDA.filter((i) => estadoDe(i, ahora) === 'en-curso');
    const primeraProxima = AGENDA.find((i) => estadoDe(i, ahora) === 'proxima');
    const siguientes = primeraProxima ? AGENDA.filter((i) => i.inicio === primeraProxima.inicio) : [];
    contenido = (
      <>
        <p className="text-base">
          <span className="font-bold text-yellow">Ahora: </span>
          <span className="font-medium">{enCurso.map(etiqueta).join(' + ')}</span>
        </p>
        {siguientes.length > 0 && (
          <p className="text-base">
            <span className="font-bold text-lime">Sigue: </span>
            <span>
              {siguientes[0].hora} {siguientes.map(etiqueta).join(' + ')}
            </span>
          </p>
        )}
      </>
    );
  }

  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-1 px-5 py-3">
      {contenido}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sección
// ---------------------------------------------------------------------------

export function Programacion() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [ahora, setAhora] = useState<Ahora | null>(null);
  const [tabElegida, setTabElegida] = useState<Jornada | null>(null);

  const refrescar = useCallback(() => setAhora(leerAhora()), []);

  // Hora en vivo: tras hidratar, cada 60 s y al volver a la pestaña (celular dormido).
  useEffect(() => {
    const inicial = window.setTimeout(refrescar, 0);
    const id = window.setInterval(refrescar, 60_000);
    document.addEventListener('visibilitychange', refrescar);
    return () => {
      window.clearTimeout(inicial);
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', refrescar);
    };
  }, [refrescar]);

  // Jornada por defecto = la del bloque en curso o el próximo (hasta que el usuario elija).
  const tab: Jornada = tabElegida ?? jornadaPorDefecto(ahora);

  // Llegada desde el QR del gafete (?ref=gafete) o con #programacion: scroll + analytics.
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref');
    const desdeGafete = ref === 'gafete';
    if (desdeGafete || window.location.hash === '#programacion') {
      const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      sectionRef.current?.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
    }
    try {
      track('agenda_view', { source: desdeGafete ? 'gafete' : 'organico' });
    } catch {
      // analytics nunca debe romper la agenda
    }
  }, []);

  const hoyEsElEvento = ahora?.fecha === AGENDA_FECHA;
  const grupos = useMemo(() => agrupar(AGENDA.filter((i) => jornadaDe(i) === tab)), [tab]);

  return (
    <section
      id="programacion"
      ref={sectionRef}
      aria-labelledby="programacion-titulo"
      className="bg-surface-alt pb-14 pt-10 text-ink md:pb-20 md:pt-16"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-green">
          {config.fecha.textoDisplay}
        </p>
        <h2 id="programacion-titulo" className="mt-2 text-3xl font-bold leading-tight text-navy md:text-4xl">
          Programación del evento
        </h2>

        {/* Banner: se reserva la altura mientras no hay hora (evita CLS) y se oculta fuera del 8 de octubre. */}
        {(ahora === null || hoyEsElEvento) && (
          <div className="sticky top-[3.75rem] z-30 mt-5 min-h-[5.25rem] rounded-3xl bg-navy text-white shadow-lg md:top-[4.25rem]">
            {ahora && <BannerEstado ahora={ahora} />}
          </div>
        )}

        <div
          role="tablist"
          aria-label="Jornada"
          className="mt-6 inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-ink/10"
        >
          {TABS.map(({ id, label }) => {
            const activa = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={activa}
                aria-controls="panel-agenda"
                onClick={() => {
                  setTabElegida(id);
                }}
                className={`min-h-[44px] rounded-full px-7 text-base font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green ${
                  activa ? 'bg-green text-white' : 'text-navy hover:bg-surface-alt'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div id="panel-agenda" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-6">
          <ol className="m-0 list-none p-0">
            {grupos.map((grupo) => (
              <li key={grupo.items[0].inicio} className="grid grid-cols-[5.5rem_1.25rem_minmax(0,1fr)] gap-x-2 sm:grid-cols-[6.5rem_1.5rem_minmax(0,1fr)] sm:gap-x-3">
                <div className="pt-3">
                  <span className="inline-flex min-h-[36px] items-center whitespace-nowrap rounded-full bg-white px-3 text-base font-bold text-navy ring-1 ring-ink/10">
                    {grupo.hora}
                  </span>
                </div>

                <div className="relative flex justify-center" aria-hidden="true">
                  <span className="absolute inset-y-0 w-0.5 bg-ink/10" />
                  <span
                    className={`relative mt-[1.1rem] h-4 w-4 rounded-full ring-4 ring-surface-alt ${CATEGORIAS[grupo.items[0].categoria].nodo}`}
                  />
                </div>

                <ul className="m-0 flex list-none flex-col gap-2 p-0 pb-3">
                  {grupo.items.map((item) => {
                    const { Icon, label, tag } = CATEGORIAS[item.categoria];
                    const estado = estadoDe(item, ahora);
                    return (
                      <li
                        key={`${item.inicio}-${item.titulo}`}
                        aria-current={estado === 'en-curso' ? 'step' : undefined}
                        className={`flex min-h-[44px] flex-col gap-2 rounded-3xl bg-white px-4 py-3 ring-1 transition-opacity ${
                          estado === 'en-curso' ? 'ring-2 ring-green' : 'ring-ink/10'
                        } ${estado === 'pasada' ? 'opacity-60' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon size={22} className="mt-0.5 shrink-0 text-green" aria-hidden="true" />
                          <p className="text-base leading-snug text-navy">
                            {item.ponente ? (
                              <>
                                {item.titulo} — <strong className="font-bold">{item.ponente}</strong>
                                <span className="block text-ink-soft">{item.empresa}</span>
                              </>
                            ) : (
                              item.titulo
                            )}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-sm font-medium ${tag}`}>{label}</span>
                          {estado === 'en-curso' && (
                            <span className="rounded-full bg-green px-3 py-1 text-sm font-bold uppercase tracking-wide text-white">
                              En curso
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <footer className="mt-4 flex flex-col gap-1 border-t border-ink/10 pt-5 text-base text-ink-soft">
          <p className="font-medium text-navy">
            {config.fecha.textoDisplay} · {config.sede.nombre} · Neomundo
          </p>
          <p>Programación sujeta a cambios</p>
        </footer>
      </div>
    </section>
  );
}
