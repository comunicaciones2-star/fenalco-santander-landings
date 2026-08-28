'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contactoSchema } from '@/lib/schemas/contacto';
import type { ContactoContent } from '@/content/fortaleza-legado';

interface ContactFormProps {
  readonly content: ContactoContent;
  readonly defaultPrograma?: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm({ content, defaultPrograma }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const renderedAt = useRef<number | null>(null);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      nombre: String(form.get('nombre') ?? ''),
      empresa: String(form.get('empresa') ?? ''),
      nit: String(form.get('nit') ?? ''),
      cargo: String(form.get('cargo') ?? ''),
      correo: String(form.get('correo') ?? ''),
      celular: String(form.get('celular') ?? ''),
      programaInteres: String(form.get('programaInteres') ?? 'no-se'),
      mensaje: String(form.get('mensaje') ?? ''),
      autorizacionDatos: form.get('autorizacionDatos') === 'on',
      autorizacionComercial: form.get('autorizacionComercial') === 'on',
      website: String(form.get('website') ?? ''),
      _ts: renderedAt.current ?? Date.now(),
    };

    const parsed = contactoSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus('error');
      setErrorMessage(parsed.error.issues[0]?.message ?? 'Revisa los campos del formulario.');
      return;
    }

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        setStatus('error');
        setErrorMessage('No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.');
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.');
    }
  };

  if (status === 'success') {
    return (
      <p role="status" aria-live="polite" className="rounded-xl bg-lilac-400/10 p-6 text-center text-lilac-400">
        {content.mensajeExito}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2" noValidate>
      {/* Honeypot: oculto por CSS (no display:none) para no delatarse ante bots simples */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label={content.campos.nombre} name="nombre" required autoComplete="name" />
      <Field label={content.campos.empresa} name="empresa" required autoComplete="organization" />
      <Field label={content.campos.nit} name="nit" />
      <Field label={content.campos.cargo} name="cargo" required autoComplete="organization-title" />
      <Field label={content.campos.correo} name="correo" type="email" required autoComplete="email" />
      <Field label={content.campos.celular} name="celular" type="tel" required autoComplete="tel" />

      <div className="md:col-span-2">
        <label htmlFor="programaInteres" className="mb-1 block text-sm font-medium">
          {content.campos.programaInteres}
        </label>
        <select
          id="programaInteres"
          name="programaInteres"
          defaultValue={defaultPrograma ?? 'no-se'}
          className="w-full rounded-lg border border-white/20 bg-navy-800 px-4 py-2.5 text-white"
        >
          {content.opcionesPrograma.map((opcion) => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="mensaje" className="mb-1 block text-sm font-medium">
          {content.campos.mensaje}
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          className="w-full rounded-lg border border-white/20 bg-navy-800 px-4 py-2.5 text-white"
        />
      </div>

      <div className="flex items-start gap-3 md:col-span-2">
        <input
          type="checkbox"
          id="autorizacionDatos"
          name="autorizacionDatos"
          required
          className="mt-1 h-4 w-4 shrink-0"
        />
        <label htmlFor="autorizacionDatos" className="text-sm text-white/80">
          {content.campos.consentimiento}
        </label>
      </div>

      <div className="flex items-start gap-3 md:col-span-2">
        <input
          type="checkbox"
          id="autorizacionComercial"
          name="autorizacionComercial"
          className="mt-1 h-4 w-4 shrink-0"
        />
        <label htmlFor="autorizacionComercial" className="text-sm text-white/80">
          {content.campos.consentimientoComercial}
        </label>
      </div>

      {status === 'error' && errorMessage && (
        <p role="alert" className="md:col-span-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        aria-label={content.submitLabel}
        className="btn-cta md:col-span-2 disabled:opacity-60"
      >
        {status === 'sending' ? 'Enviando…' : content.submitLabel}
      </button>
    </form>
  );
}

interface FieldProps {
  readonly label: string;
  readonly name: string;
  readonly type?: string;
  readonly required?: boolean;
  readonly autoComplete?: string;
}

function Field({ label, name, type = 'text', required, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-white/20 bg-navy-800 px-4 py-2.5 text-white"
      />
    </div>
  );
}
