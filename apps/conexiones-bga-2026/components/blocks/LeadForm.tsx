'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import { config } from '@/content/conexiones';
import { submitLead, type InterestType, type LeadPayload } from '@/lib/leads';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
type LeadFormVariant = 'commercial' | 'inscripcion';

interface LeadFormProps {
  readonly variant?: LeadFormVariant;
}

export function LeadForm({ variant = 'commercial' }: LeadFormProps) {
  const isInscripcion = variant === 'inscripcion';
  const content = isInscripcion ? config.formularioInscripcion : config.formularioComercial;
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const renderedAt = useRef<number | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === 'success') {
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);
    const payload: LeadPayload = {
      name: String(form.get('name') ?? '').trim(),
      company: String(form.get('company') ?? '').trim(),
      role: String(form.get('role') ?? '').trim() || undefined,
      email: String(form.get('email') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim() || undefined,
      nit: String(form.get('nit') ?? '').trim(),
      affiliated: String(form.get('affiliated') ?? '') as 'si' | 'no',
      interestType: isInscripcion
        ? 'participar'
        : (String(form.get('interestType') ?? '') as InterestType),
      privacyAccepted: form.get('privacyAccepted') === 'on',
      website: String(form.get('website') ?? ''),
      _ts: renderedAt.current ?? Date.now(),
    };

    const result = await submitLead(payload);
    if (result.ok) {
      setSubmittedName(payload.name);
      setSubmittedEmail(payload.email);
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(
        result.error === 'too_fast' || result.error === 'rate_limited'
          ? 'Intenta de nuevo en unos segundos.'
          : 'No pudimos procesar tu solicitud. Intenta de nuevo en unos minutos.',
      );
    }
  };

  return (
    <Section id={content.id} bg="white" narrow>
      <Reveal className="text-center">
        <Kicker>{content.eyebrow}</Kicker>
        <SectionTitle className="mt-3">{content.titulo}</SectionTitle>
        <p className="mt-4 text-ink-soft">{content.intro}</p>
        {isInscripcion && (
          <ul className="mt-6 space-y-3 text-left text-sm text-ink-soft md:text-base">
            {config.formularioInscripcion.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check size={17} className="mt-0.5 shrink-0 text-green" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      <Reveal delay={80} className="mt-10">
        {status === 'success' ? (
          <div
            ref={successRef}
            role="status"
            aria-live="polite"
            className="scroll-mt-28 rounded-lg border border-green/30 bg-green/5 p-8 text-center text-base font-medium text-navy"
          >
            {isInscripcion ? (
              <>
                <p className="text-lg font-bold">¡Listo, {submittedName}! Tu lugar está reservado.</p>
                <p className="mt-3 text-base font-normal text-ink-soft">
                  Enviamos la confirmación a {submittedEmail}. Si no la ves en unos minutos, revisa tu carpeta de
                  spam o promociones.
                </p>
                <p className="mt-4 font-semibold">Jueves 8 de octubre · 9:00 a. m. · Gran Salón, Neomundo.</p>
              </>
            ) : (
              <p>{config.formularioComercial.mensajeExito}</p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Honeypot: oculto por CSS, no display:none, para no delatarse ante bots simples. */}
            <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Sitio web</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <Field label="Nombre" name="name" required autoComplete="name" />
            <Field label="Empresa" name="company" required autoComplete="organization" />
            <Field label="NIT" name="nit" required />
            <Field label="Cargo" name="role" autoComplete="organization-title" />
            <Field label="Correo electrónico" name="email" type="email" required autoComplete="email" />
            <Field label="Teléfono / WhatsApp" name="phone" type="tel" autoComplete="tel" />

            <div>
              <label htmlFor="affiliated" className="mb-1.5 block text-sm font-medium text-navy">
                ¿Tu empresa está afiliada a Fenalco?<span className="text-green"> *</span>
              </label>
              <select id="affiliated" name="affiliated" required defaultValue="" className="input-field">
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            {!isInscripcion && (
              <div>
                <label htmlFor="interestType" className="mb-1.5 block text-sm font-medium text-navy">
                  Tipo de interés<span className="text-green"> *</span>
                </label>
                <select id="interestType" name="interestType" required defaultValue="" className="input-field">
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {config.formularioComercial.tiposInteres.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-start gap-3 sm:col-span-2">
              <input
                type="checkbox"
                id="privacyAccepted"
                name="privacyAccepted"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-green"
              />
              <label htmlFor="privacyAccepted" className="text-sm text-ink-soft">
                He leído y acepto la política de tratamiento de datos.
              </label>
            </div>

            {status === 'error' && errorMessage && (
              <p role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
                {errorMessage}
              </p>
            )}

            <button type="submit" disabled={status === 'sending'} className="btn-cta mt-2 sm:col-span-2">
              {status === 'sending' ? 'Enviando…' : content.cta}
            </button>
            {isInscripcion && (
              <p className="sm:col-span-2 -mt-1 text-center text-sm text-ink-soft">{config.formularioInscripcion.microcopy}</p>
            )}
          </form>
        )}
      </Reveal>
    </Section>
  );
}

interface FieldProps {
  readonly label: string;
  readonly name: string;
  readonly type?: string;
  readonly required?: boolean;
  readonly autoComplete?: string;
  readonly className?: string;
}

function Field({ label, name, type = 'text', required, autoComplete, className = '' }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="text-green"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="input-field"
      />
    </div>
  );
}
