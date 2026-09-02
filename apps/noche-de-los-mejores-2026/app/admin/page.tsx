import type { Metadata } from 'next';
import { fetchMaterialInventory, type MaterialArchivo, type MaterialInventoryItem } from '@/lib/materialInventory';

export const metadata: Metadata = {
  title: 'Inventario de material · Admin NDLM 2026',
  robots: { index: false, follow: false },
};

const ETIQUETA_MODALIDAD: Record<MaterialInventoryItem['tipo'], string> = {
  postulante: 'Postulación',
  patrocinador: 'Patrocinio',
};

const ETIQUETA_ESTADO: Record<string, string> = {
  pendiente: 'Pendiente',
  parcial: 'Parcial',
  completo: 'Completo',
};

function coincideFiltros(item: MaterialInventoryItem, estado: string | null, tipo: string | null): boolean {
  if (estado && (item.material?.estado ?? 'pendiente') !== estado) return false;
  if (tipo && item.tipo !== tipo) return false;
  return true;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string; modalidad?: string }>;
}) {
  const { estado, modalidad } = await searchParams;
  const estadoFiltro = ['pendiente', 'parcial', 'completo'].includes(estado ?? '') ? (estado as string) : null;
  const tipoFiltro = ['postulante', 'patrocinador'].includes(modalidad ?? '') ? (modalidad as string) : null;

  let items: MaterialInventoryItem[] = [];
  let error: string | null = null;
  try {
    items = await fetchMaterialInventory();
  } catch (err) {
    error = err instanceof Error ? err.message : 'No se pudo cargar el inventario.';
  }

  const total = items.length;
  const completos = items.filter((item) => item.material?.estado === 'completo').length;
  const filtrados = items.filter((item) => coincideFiltros(item, estadoFiltro, tipoFiltro));

  const queryExport = new URLSearchParams();
  if (estadoFiltro) queryExport.set('estado', estadoFiltro);
  if (tipoFiltro) queryExport.set('modalidad', tipoFiltro);

  return (
    <main className="min-h-screen bg-neutral-50 p-6 text-neutral-900 md:p-10">
      <h1 className="text-xl font-semibold">Inventario de material promocional — La Noche de los Mejores 2026</h1>

      {error ? (
        <p className="mt-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-neutral-600">
              <strong>{completos}</strong> de <strong>{total}</strong> con material completo
            </p>
            <a
              href={`/api/admin/export?${queryExport.toString()}`}
              className="border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-neutral-100"
            >
              Exportar CSV
            </a>
          </div>

          <form className="mt-4 flex flex-wrap gap-3 text-sm" action="/admin" method="get">
            <select
              name="estado"
              defaultValue={estadoFiltro ?? ''}
              className="border border-neutral-300 bg-white px-2 py-1.5"
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="parcial">Parcial</option>
              <option value="completo">Completo</option>
            </select>
            <select
              name="modalidad"
              defaultValue={tipoFiltro ?? ''}
              className="border border-neutral-300 bg-white px-2 py-1.5"
            >
              <option value="">Todas las modalidades</option>
              <option value="postulante">Postulación</option>
              <option value="patrocinador">Patrocinio</option>
            </select>
            <button
              type="submit"
              className="border border-neutral-300 bg-neutral-900 px-3 py-1.5 font-medium text-white hover:bg-neutral-700"
            >
              Filtrar
            </button>
          </form>

          <div className="mt-6 overflow-x-auto border border-neutral-200 bg-white">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-100 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-2">Empresa</th>
                  <th className="px-4 py-2">NIT</th>
                  <th className="px-4 py-2">Modalidad</th>
                  <th className="px-4 py-2">Categoría</th>
                  <th className="px-4 py-2">Logo</th>
                  <th className="px-4 py-2">Video</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((item) => (
                  <FilaInventario key={`${item.tipo}-${item.id}`} item={item} />
                ))}
                {filtrados.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-6 text-center text-neutral-500">
                      No hay registros con estos filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}

function FilaInventario({ item }: { item: MaterialInventoryItem }) {
  const estado = item.material?.estado ?? 'pendiente';
  return (
    <tr className="border-b border-neutral-100 last:border-0">
      <td className="px-4 py-2">{item.nombre}</td>
      <td className="px-4 py-2">{item.nit ?? '—'}</td>
      <td className="px-4 py-2">{ETIQUETA_MODALIDAD[item.tipo]}</td>
      <td className="px-4 py-2">{item.categoria ?? '—'}</td>
      <td className="px-4 py-2">
        <IndicadorArchivo archivo={item.material?.logo ?? null} />
      </td>
      <td className="px-4 py-2">
        <IndicadorArchivo archivo={item.material?.video ?? null} />
      </td>
      <td className="px-4 py-2">{ETIQUETA_ESTADO[estado]}</td>
      <td className="px-4 py-2">
        <form action="/api/admin/recordatorio" method="post">
          <input type="hidden" name="tipo" value={item.tipo} />
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="nombre" value={item.nombre} />
          <input type="hidden" name="nit" value={item.nit ?? ''} />
          <input type="hidden" name="email" value={item.contactoEmail ?? ''} />
          <button
            type="submit"
            disabled={!item.contactoEmail}
            className="border border-neutral-300 px-2 py-1 text-xs font-medium hover:bg-neutral-100 disabled:opacity-40"
          >
            Reenviar recordatorio
          </button>
        </form>
      </td>
    </tr>
  );
}

function IndicadorArchivo({ archivo }: { archivo: MaterialArchivo | null }) {
  if (archivo?.key) {
    return (
      <a href={`/api/admin/download?key=${encodeURIComponent(archivo.key)}`} className="text-blue-700 underline">
        ✓ Descargar
      </a>
    );
  }
  if (archivo?.url) {
    return (
      <a href={archivo.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
        ✓ Enlace
      </a>
    );
  }
  return <span className="text-neutral-400">—</span>;
}
