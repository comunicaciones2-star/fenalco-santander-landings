export interface MaterialArchivo {
  key?: string;
  filename?: string;
  sizeBytes?: number;
  durationSec?: number;
  width?: number;
  height?: number;
  via?: 'upload' | 'enlace';
  url?: string;
  uploadedAt?: string;
}

export interface MaterialInventoryItem {
  tipo: 'postulante' | 'patrocinador';
  id: string;
  nombre: string;
  empresa?: string | null;
  nit: string | null;
  contactoEmail: string | null;
  categoria: string | null;
  material: {
    logo: MaterialArchivo | null;
    video: MaterialArchivo | null;
    estado: 'pendiente' | 'parcial' | 'completo';
  } | null;
}

interface FetchInventoryParams {
  estado?: string;
  tipo?: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}.`);
  return value;
}

// GET /:slug/material-inventario acepta tanto el slug de inscripciones como
// el de patrocinadores (Evento.slug o Evento.slugPatrocinadores) — cualquiera
// de los dos devuelve ambos tipos, ver routes/publicForms.js en fenalco-crm.
export async function fetchMaterialInventory(params: FetchInventoryParams = {}): Promise<MaterialInventoryItem[]> {
  const baseUrl = requireEnv('CRM_API_BASE_URL');
  const apiKey = requireEnv('CRM_API_KEY');
  const slug = process.env.CRM_EVENT_SLUG || process.env.CRM_SPONSOR_SLUG;
  if (!slug) throw new Error('Falta CRM_EVENT_SLUG o CRM_SPONSOR_SLUG.');

  const query = new URLSearchParams({ limit: '1000' });
  if (params.estado) query.set('estado', params.estado);
  if (params.tipo) query.set('tipo', params.tipo);

  const response = await fetch(`${baseUrl}/api/public-forms/${slug}/material-inventario?${query}`, {
    headers: { 'x-api-key': apiKey },
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`fenalco-crm (material-inventario) respondió ${response.status}: ${body}`);
  }

  const data = (await response.json()) as { items: MaterialInventoryItem[] };
  return data.items;
}

function normalizarTexto(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

// Búsqueda por empresa, contacto, NIT o categoría postulada: sin tildes ni
// mayúsculas; el NIT también coincide ignorando puntos, guiones y espacios.
export function coincideBusqueda(item: MaterialInventoryItem, consulta: string): boolean {
  const q = normalizarTexto(consulta);
  if (!q) return true;
  const texto = normalizarTexto([item.empresa, item.nombre, item.nit, item.categoria].filter(Boolean).join(' '));
  if (texto.includes(q)) return true;
  const digitosQ = q.replace(/\D/g, '');
  return digitosQ.length > 0 && (item.nit ?? '').replace(/\D/g, '').includes(digitosQ);
}
