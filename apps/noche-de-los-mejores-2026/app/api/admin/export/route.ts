import { NextRequest, NextResponse } from 'next/server';
import { fetchMaterialInventory } from '@/lib/materialInventory';

export const runtime = 'nodejs';

const ETIQUETA_MODALIDAD: Record<string, string> = { postulante: 'Postulación', patrocinador: 'Patrocinio' };

function csvEscape(valor: string): string {
  return /[",\n]/.test(valor) ? `"${valor.replace(/"/g, '""')}"` : valor;
}

export async function GET(request: NextRequest) {
  const estado = request.nextUrl.searchParams.get('estado') ?? undefined;
  const modalidad = request.nextUrl.searchParams.get('modalidad') ?? undefined;

  try {
    const items = await fetchMaterialInventory({ estado, tipo: modalidad });

    const encabezado = ['Empresa', 'NIT', 'Modalidad', 'Categoría', 'Logo', 'Video', 'Estado'];
    const filas = items.map((item) => [
      item.nombre,
      item.nit ?? '',
      ETIQUETA_MODALIDAD[item.tipo] ?? item.tipo,
      item.categoria ?? '',
      item.material?.logo?.key || item.material?.logo?.filename ? 'Sí' : 'No',
      item.material?.video?.key || item.material?.video?.url ? 'Sí' : 'No',
      item.material?.estado ?? 'pendiente',
    ]);

    const csv = [encabezado, ...filas].map((fila) => fila.map(csvEscape).join(',')).join('\n');

    // BOM inicial para que Excel detecte UTF-8 y no rompa las tildes/ñ.
    return new NextResponse(String.fromCharCode(0xfeff) + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="inventario-material-ndlm-2026.csv"',
      },
    });
  } catch (error) {
    console.error('[admin/export] error generando CSV', error);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
