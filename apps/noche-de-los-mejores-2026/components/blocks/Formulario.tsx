'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ChangeEvent, type FormEvent } from 'react';
import { config } from '@/content/event.config';
import { registroSchema, CATEGORIAS_NOMBRE_PERSONAL } from '@/lib/schemas/registro';
import { useTrackingParams } from '@/hooks/useTrackingParams';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';
import { FileUpload } from '@/components/ui/FileUpload';
import type { Modalidad as ModalidadArchivo } from '@/lib/upload-rules';

type Modalidad = 'postulacion' | 'patrocinio';
type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface LogoInfo {
  key: string;
  filename: string;
  sizeBytes: number;
  uploadedAt: string;
}

interface VideoInfo {
  key: string;
  filename: string;
  durationSec?: number;
  width?: number;
  height?: number;
  uploadedAt: string;
}

function toModalidadArchivo(modalidad: Modalidad): ModalidadArchivo {
  return modalidad === 'postulacion' ? 'postulantes' : 'patrocinadores';
}

function subscribeNoop(): () => void {
  return () => {};
}

function getModalidadFromUrl(): Modalidad | null {
  const modalidadUrl = new URLSearchParams(window.location.search).get('modalidad');
  return modalidadUrl === 'postulacion' || modalidadUrl === 'patrocinio' ? modalidadUrl : null;
}

function getModalidadFromUrlServerSnapshot(): Modalidad | null {
  return null;
}

export function Formulario() {
  const tracking = useTrackingParams();
  const modalidadUrl = useSyncExternalStore(subscribeNoop, getModalidadFromUrl, getModalidadFromUrlServerSnapshot);
  const [modalidadManual, setModalidadManual] = useState<Modalidad | null>(null);
  const modalidad = modalidadManual ?? modalidadUrl ?? 'postulacion';
  const modalidadFijada = modalidadManual === null && modalidadUrl !== null;
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nit, setNit] = useState('');
  const [categoriaPostulacion, setCategoriaPostulacion] = useState('');
  const requiereCedula = (CATEGORIAS_NOMBRE_PERSONAL as readonly string[]).includes(categoriaPostulacion);
  const [logoInfo, setLogoInfo] = useState<LogoInfo | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const renderedAt = useRef<number | null>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const handleLogoUploaded = (key: string, meta: Record<string, unknown>) => {
    setLogoInfo({
      key,
      filename: String(meta.filename ?? ''),
      sizeBytes: Number(meta.sizeBytes ?? 0),
      uploadedAt: new Date().toISOString(),
    });
  };

  const handleVideoUploaded = (key: string, meta: Record<string, unknown>) => {
    setVideoInfo({
      key,
      filename: String(meta.filename ?? ''),
      durationSec: typeof meta.durationSec === 'number' ? meta.durationSec : undefined,
      width: typeof meta.width === 'number' ? meta.width : undefined,
      height: typeof meta.height === 'number' ? meta.height : undefined,
      uploadedAt: new Date().toISOString(),
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      nombre: String(form.get('nombre') ?? ''),
      apellido: String(form.get('apellido') ?? ''),
      email: String(form.get('email') ?? ''),
      telefono: String(form.get('telefono') ?? ''),
      empresa: String(form.get('empresa') ?? ''),
      nit: String(form.get('nit') ?? ''),
      cargo: String(form.get('cargo') ?? ''),
      sector: String(form.get('sector') ?? ''),
      ciudad: String(form.get('ciudad') ?? ''),
      esAfiliado: String(form.get('esAfiliado') ?? ''),
      modalidad,
      categoriaPostulacion: String(form.get('categoriaPostulacion') ?? ''),
      cedula: String(form.get('cedula') ?? ''),
      mensaje: String(form.get('mensaje') ?? ''),
      aceptaHabeasData: form.get('aceptaHabeasData') === 'on',
      aceptaUsoMaterial: form.get('aceptaUsoMaterial') === 'on',
      logoKey: logoInfo?.key ?? '',
      logoFilename: logoInfo?.filename ?? '',
      logoSizeBytes: logoInfo?.sizeBytes,
      logoUploadedAt: logoInfo?.uploadedAt ?? '',
      videoKey: videoInfo?.key ?? '',
      videoFilename: videoInfo?.filename ?? '',
      videoDurationSec: videoInfo?.durationSec,
      videoWidth: videoInfo?.width,
      videoHeight: videoInfo?.height,
      videoUploadedAt: videoInfo?.uploadedAt ?? '',
      videoUrl: String(form.get('videoUrl') ?? ''),
      website: String(form.get('website') ?? ''),
      _ts: renderedAt.current ?? Date.now(),
      origen: tracking.origen,
      utm_source: tracking.utm_source,
      utm_medium: tracking.utm_medium,
      utm_campaign: tracking.utm_campaign,
      utm_content: tracking.utm_content,
    };

    const parsed = registroSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus('error');
      setErrorMessage(parsed.error.issues[0]?.message ?? 'Revisa los campos del formulario.');
      return;
    }

    try {
      const response = await fetch('/api/registro', {
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

  return (
    <Section id="postulacion" bg="light">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionTitle>Postúlate</SectionTitle>
        <Rule className="mx-auto my-6" />
        <p className="text-ink/70">
          Haz parte de los reconocimientos que exaltan la excelencia, la trayectoria y el liderazgo
          empresarial en Santander.
        </p>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-3xl">
        {status === 'success' ? (
          <p role="status" aria-live="polite" className="border border-accent/30 bg-surface-light-alt p-8 text-center font-display text-lg">
            {config.formulario.mensajeExito}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Honeypot: oculto por CSS, no display:none, para no delatarse ante bots simples. */}
            <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Sitio web</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {!modalidadFijada && (
              <fieldset className="md:col-span-2">
                <legend className="mb-2 text-sm font-medium">¿Qué quieres hacer?</legend>
                <div className="flex flex-wrap gap-4">
                  {config.formulario.modalidades.map((opcion) => (
                    <label key={opcion.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="modalidad-selector"
                        value={opcion.id}
                        checked={modalidad === opcion.id}
                        onChange={() => setModalidadManual(opcion.id as Modalidad)}
                        className="h-4 w-4 accent-cta"
                      />
                      {opcion.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <Field label="Nombre" name="nombre" required autoComplete="given-name" />
            <Field label="Apellido" name="apellido" required autoComplete="family-name" />
            <Field label="Correo electrónico" name="email" type="email" required autoComplete="email" />
            <Field label="Celular" name="telefono" type="tel" required autoComplete="tel" />
            <Field label="Empresa" name="empresa" required autoComplete="organization" />
            <Field label="NIT" name="nit" required onChange={(e) => setNit(e.target.value)} />
            <Field label="Cargo" name="cargo" required autoComplete="organization-title" />
            <Field label="Sector" name="sector" />
            <Field label="Ciudad" name="ciudad" autoComplete="address-level2" />

            <div>
              <label htmlFor="esAfiliado" className="mb-1.5 block text-sm font-medium">
                ¿Tu empresa está afiliada a Fenalco?
              </label>
              <select id="esAfiliado" name="esAfiliado" required defaultValue="" className="input-field">
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            {modalidad === 'postulacion' && (
              <div>
                <label htmlFor="categoriaPostulacion" className="mb-1.5 block text-sm font-medium">
                  Categoría a la que te postulas
                </label>
                <select
                  id="categoriaPostulacion"
                  name="categoriaPostulacion"
                  required
                  defaultValue=""
                  className="input-field"
                  onChange={(e) => setCategoriaPostulacion(e.target.value)}
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {config.categorias.map((categoria) => (
                    <option key={categoria.nombre} value={categoria.nombre}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {modalidad === 'postulacion' && requiereCedula && (
              <div>
                <label htmlFor="cedula" className="mb-1.5 block text-sm font-medium">
                  Cédula<span className="text-borgona"> *</span>
                </label>
                <input
                  id="cedula"
                  name="cedula"
                  type="text"
                  inputMode="numeric"
                  required
                  className="input-field"
                />
                <p className="mt-1.5 text-xs text-ink/50">
                  Esta categoría se otorga a nombre personal. Necesitamos tu cédula para el acta de
                  premiación.
                </p>
              </div>
            )}

            <div className="md:col-span-2">
              <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium">
                Mensaje (opcional)
              </label>
              <textarea id="mensaje" name="mensaje" rows={3} className="input-field" />
            </div>

            <div className="bg-surface-light p-6 md:col-span-2 md:p-8">
              <Rule className="w-6" />
              <h3 className="mt-4 font-display text-xl">Material promocional</h3>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/70">
                <p>
                  Los postulantes y patrocinadores que no entreguen su logotipo no podrán aparecer en las
                  piezas de comunicación, redes sociales ni impactos de marca del evento.
                </p>
                <p>
                  El logotipo es obligatorio para figurar en el material promocional. El video de
                  postulación es opcional, pero fortalece la sustentación ante el jurado.
                </p>
                <p className="text-xs text-ink/50">
                  Especificaciones · Logotipo: vectorial .ai, .eps, .pdf o .png con fondo transparente en
                  alta resolución. Video: vertical 1080 x 1920 px, máximo 1 minuto.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-sm font-medium">Logotipo de la empresa</p>
                  <FileUpload
                    tipo="logo"
                    modalidad={toModalidadArchivo(modalidad)}
                    nit={nit}
                    required
                    disabled={!nit.trim()}
                    onUploaded={handleLogoUploaded}
                    onCleared={() => setLogoInfo(null)}
                  />
                  {!nit.trim() && (
                    <p className="mt-1.5 text-xs text-ink/50">Ingresa el NIT para habilitar la carga</p>
                  )}
                </div>

                {modalidad === 'postulacion' && (
                  <div>
                    <p className="mb-1.5 text-sm font-medium">Video de postulación (opcional)</p>
                    <FileUpload
                      tipo="video"
                      modalidad={toModalidadArchivo(modalidad)}
                      nit={nit}
                      disabled={!nit.trim()}
                      onUploaded={handleVideoUploaded}
                      onCleared={() => setVideoInfo(null)}
                    />
                  </div>
                )}
              </div>

              {modalidad === 'postulacion' && (
                <div className="mt-5">
                  <label htmlFor="videoUrl" className="mb-1.5 block text-sm font-medium">
                    Enlace alterno al video
                  </label>
                  <input id="videoUrl" name="videoUrl" type="url" className="input-field" />
                  <p className="mt-1.5 text-xs text-ink/50">
                    Si el archivo pesa demasiado o la carga falla, pega aquí el enlace (Drive, WeTransfer).
                    Verifica que tenga permiso de acceso público.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 md:col-span-2">
              <input
                type="checkbox"
                id="aceptaHabeasData"
                name="aceptaHabeasData"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-cta"
              />
              <label htmlFor="aceptaHabeasData" className="text-sm text-ink/75">
                Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012.
              </label>
            </div>

            <div className="flex items-start gap-3 md:col-span-2">
              <input
                type="checkbox"
                id="aceptaUsoMaterial"
                name="aceptaUsoMaterial"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-cta"
              />
              <label htmlFor="aceptaUsoMaterial" className="text-sm text-ink/75">
                Autorizo a Fenalco Santander a usar el logotipo, el material audiovisual y la información
                de mi empresa en piezas de comunicación, material impreso, digital y redes sociales
                asociadas a La Noche de los Mejores 2026, y declaro que cuento con los derechos sobre el
                material entregado.
              </label>
            </div>

            {status === 'error' && errorMessage && (
              <p role="alert" className="border border-borgona/40 bg-borgona/5 px-4 py-3 text-sm text-borgona md:col-span-2">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              aria-label={config.formulario.modalidades.find((m) => m.id === modalidad)?.label ?? 'Enviar'}
              className="btn-cta mt-2 disabled:opacity-60 md:col-span-2"
            >
              {status === 'sending' ? 'Enviando…' : config.formulario.modalidades.find((m) => m.id === modalidad)?.label}
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
  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Field({ label, name, type = 'text', required, autoComplete, onChange }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="text-borgona"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
}
