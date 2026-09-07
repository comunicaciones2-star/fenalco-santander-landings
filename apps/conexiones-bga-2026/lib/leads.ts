// Contrato de integración para el backend de captación de leads. La UI (ver
// components/blocks/LeadForm.tsx) solo depende de este módulo — nunca de una
// implementación de red concreta — para poder sustituir el mock por la
// integración real (API + persistencia + CRM + correo) sin tocar el componente.

export type InterestType = 'participar' | 'patrocinio' | 'expositor' | 'alianza' | 'comercial';

export interface LeadPayload {
  readonly name: string;
  readonly company: string;
  readonly role?: string;
  readonly email: string;
  readonly phone?: string;
  readonly interestType: InterestType;
  readonly privacyAccepted: boolean;
}

export interface SubmitLeadResult {
  readonly ok: boolean;
}

// TODO backend integration: reemplazar este mock por una llamada real (API route +
// persistencia + notificación) cuando exista el servicio. Mientras tanto simula
// latencia de red y no persiste nada — ver disclaimer honesto en LeadForm.tsx.
export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (process.env.NODE_ENV !== 'production') {
    console.info('[submitLead] modo demostración — payload listo para integración futura:', payload);
  }

  return { ok: true };
}
