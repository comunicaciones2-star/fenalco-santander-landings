'use client';

import { useState, type FormEvent } from 'react';
import { config } from '@/content/conexiones';
import { submitLead, type InterestType, type LeadPayload } from '@/lib/leads';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function LeadForm() {
  const { formulario } = config;
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const form = new FormData(event.currentTarget);
    const payload: LeadPayload = {
      name: String(form.get('name') ?? '').trim(),
      company: String(form.get('company') ?? '').trim(),
      role: String(form.get('role') ?? '').trim() || undefined,
      email: String(form.get('email') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim() || undefined,
      interestType: String(form.get('interestType') ?? '') as InterestType,
      privacyAccepted: form.get('privacyAccepted') === 'on',
    };

    try {
      const result = await submitLead(payload);
      setStatus(result.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id={formulario.id} bg="white" narrow>
      <Reveal className="text-center">
        <Kicker>Contacto</Kicker>
        <SectionTitle className="mt-3">{formulario.titulo}</SectionTitle>
        <p className="mt-4 text-ink-soft">{formulario.intro}</p>
      </Reveal>

      <Reveal delay={80} className="mt-10">
        {status === 'success' ? (
          <p
            role="status"
            aria-live="polite"
            className="rounded-lg border border-green/30 bg-green/5 p-8 text-center text-base font-medium text-navy"
          >
            {formulario.mensajeDemo}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Nombre" name="name" required autoComplete="name" />
            <Field label="Empresa" name="company" required autoComplete="organization" />
            <Field label="Cargo" name="role" autoComplete="organization-title" />
            <Field label="Correo electrónico" name="email" type="email" required autoComplete="email" />
            <Field label="Teléfono / WhatsApp" name="phone" type="tel" autoComplete="tel" className="sm:col-span-2" />

            <div className="sm:col-span-2">
              <label htmlFor="interestType" className="mb-1.5 block text-sm font-medium text-navy">
                Tipo de interés<span className="text-green"> *</span>
              </label>
              <select id="interestType" name="interestType" required defaultValue="" className="input-field">
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {formulario.tiposInteres.map((opcion) => (
                  <option key={opcion.id} value={opcion.id}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>

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

            {status === 'error' && (
              <p role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
                No pudimos procesar tu solicitud. Intenta de nuevo en unos minutos.
              </p>
            )}

            <button type="submit" disabled={status === 'sending'} className="btn-cta mt-2 sm:col-span-2">
              {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
            </button>
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
