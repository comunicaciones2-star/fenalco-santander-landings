// Contrato de integración para el backend de captación de leads. La UI (ver
// components/blocks/LeadForm.tsx) solo depende de este módulo — nunca de una
// implementación de red concreta.
//
// submitLead() llama a POST /api/leads (app/api/leads/route.ts), que valida el
// payload y lo entrega por dos canales independientes según qué variables de
// entorno estén configuradas: correo (Resend) y persistencia real en el CRM de
// Fenalco Santander (NEXO / fenalco-crm, evento "conexiones-bga-evento-2026").
// Mientras esas variables no estén configuradas en el entorno de despliegue, el
// endpoint sigue respondiendo ok pero no entrega el lead a ningún lado — ver
// .env.example para la lista completa.

export type InterestType = 'participar' | 'patrocinio' | 'expositor' | 'alianza' | 'comercial';

export interface LeadPayload {
  readonly name: string;
  readonly company: string;
  readonly role?: string;
  readonly email: string;
  readonly phone?: string;
  readonly nit: string;
  readonly affiliated: 'si' | 'no';
  readonly interestType: InterestType;
  readonly privacyAccepted: boolean;
  /** Honeypot anti-bot: debe llegar vacío en un envío legítimo. */
  readonly website?: string;
  /** Timestamp (ms) de cuándo se renderizó el formulario, anti-bot. */
  readonly _ts: number;
}

export interface SubmitLeadResult {
  readonly ok: boolean;
  readonly error?: string;
  /** Mensajes de validación del servidor, por campo (respuesta 400 de /api/leads). */
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
}

interface LeadResponseBody {
  readonly ok?: boolean;
  readonly error?: string;
  readonly errors?: { readonly fieldErrors?: Record<string, string[]> };
}

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as LeadResponseBody | null;

    if (!response.ok || !data?.ok) {
      const fieldErrors = data?.errors?.fieldErrors;
      return {
        ok: false,
        error: data?.error ?? (fieldErrors ? 'validation_error' : 'server_error'),
        fieldErrors,
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: 'network_error' };
  }
}
