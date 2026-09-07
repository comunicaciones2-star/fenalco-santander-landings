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
}

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

    if (!response.ok || !data?.ok) {
      return { ok: false, error: data?.error ?? 'server_error' };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: 'network_error' };
  }
}
