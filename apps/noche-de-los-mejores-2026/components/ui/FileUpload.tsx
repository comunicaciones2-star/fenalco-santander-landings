'use client';

import { useCallback, useRef, useState, type DragEvent, type KeyboardEvent } from 'react';
import { LOGO, VIDEO, type Modalidad, type TipoArchivo } from '@/lib/upload-rules';

type Estado = 'vacio' | 'validando' | 'subiendo' | 'cargado' | 'error';

interface FileUploadProps {
  readonly tipo: TipoArchivo;
  readonly modalidad: Modalidad;
  readonly nit: string;
  readonly onUploaded: (key: string, meta: Record<string, unknown>) => void;
  readonly onCleared: () => void;
  readonly required?: boolean;
  readonly disabled?: boolean;
}

// Algunos navegadores/SO no reportan un MIME útil para .ai/.eps (file.type llega vacío),
// así que el contentType enviado al presign —y usado como header del PUT— se resuelve
// por extensión cuando el navegador no lo provee, para que coincida con lib/upload-rules.
const MIME_POR_EXTENSION: Record<string, string> = {
  ai: 'application/postscript',
  eps: 'application/postscript',
  pdf: 'application/pdf',
  svg: 'image/svg+xml',
  png: 'image/png',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
};

function getExtension(filename: string): string {
  const partes = filename.toLowerCase().split('.');
  return partes.length > 1 ? partes[partes.length - 1] : '';
}

function resolverContentType(file: File, ext: string): string {
  return file.type || MIME_POR_EXTENSION[ext] || 'application/octet-stream';
}

interface ResultadoValidacionVideo {
  error: string | null;
  durationSec?: number;
  width?: number;
  height?: number;
}

function validarVideo(file: File): Promise<ResultadoValidacionVideo> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = url;

    video.onloadedmetadata = () => {
      const { duration, videoWidth, videoHeight } = video;
      URL.revokeObjectURL(url);

      if (duration > VIDEO.maxDurationSec) {
        resolve({ error: `Este video dura ${Math.round(duration)} segundos y el máximo es 60.` });
        return;
      }

      if (videoWidth > 0 && videoHeight > 0) {
        if (videoWidth >= videoHeight) {
          resolve({
            error: `Este video es horizontal (${videoWidth} x ${videoHeight} px). Debe ser vertical, formato 1080 x 1920 px, tipo historia.`,
          });
          return;
        }
        const ratio = videoWidth / videoHeight;
        const diferencia = Math.abs(ratio - VIDEO.ratioEsperado) / VIDEO.ratioEsperado;
        if (diferencia > VIDEO.toleranciaRatio) {
          resolve({
            error: `Este video mide ${videoWidth} x ${videoHeight} px. Debe tener proporción vertical 9:16 (1080 x 1920 px).`,
          });
          return;
        }
      }

      resolve({ error: null, durationSec: Math.round(duration), width: videoWidth, height: videoHeight });
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ error: 'No pudimos leer el video. Verifica que el archivo no esté dañado.' });
    };
  });
}

export function FileUpload({ tipo, modalidad, nit, onUploaded, onCleared, required, disabled }: FileUploadProps) {
  const [estado, setEstado] = useState<Estado>('vacio');
  const [nombreArchivo, setNombreArchivo] = useState<string | null>(null);
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const regla = tipo === 'logo' ? LOGO : VIDEO;
  const aceptar = regla.extensiones.map((e) => `.${e}`).join(',');
  const bloqueado = disabled || estado === 'validando' || estado === 'subiendo';
  const videoMetaRef = useRef<{ durationSec: number; width: number; height: number } | null>(null);

  const reset = useCallback(() => {
    setEstado('vacio');
    setNombreArchivo(null);
    setProgreso(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
    onCleared();
  }, [onCleared]);

  const validarLocal = async (file: File, ext: string): Promise<string | null> => {
    if (!(regla.extensiones as readonly string[]).includes(ext)) {
      return tipo === 'logo'
        ? 'El logo debe ser un archivo .ai, .eps, .pdf, .svg o .png.'
        : 'El video debe ser un archivo .mp4 o .mov.';
    }

    if (file.size > regla.maxBytes) {
      const tamanoMb = (file.size / (1024 * 1024)).toFixed(1);
      const maxMb = Math.round(regla.maxBytes / (1024 * 1024));
      return `Este archivo pesa ${tamanoMb} MB y el máximo es ${maxMb} MB.`;
    }

    if (tipo === 'logo' && ext === 'png') {
      try {
        const bitmap = await createImageBitmap(file);
        const { width, height } = bitmap;
        const ladoLargo = Math.max(width, height);
        bitmap.close();
        if (ladoLargo < LOGO.minPixelsPngLadoLargo) {
          return `Este PNG mide ${width} x ${height} px y necesitamos al menos ${LOGO.minPixelsPngLadoLargo} px de lado para impresión. Sube el archivo vectorial (.ai, .eps o .pdf) o pide a tu diseñador el PNG en alta resolución.`;
        }
      } catch {
        return 'No pudimos leer la imagen. Verifica que el archivo no esté dañado.';
      }
    }

    if (tipo === 'video') {
      const resultado = await validarVideo(file);
      videoMetaRef.current =
        !resultado.error && resultado.durationSec !== undefined && resultado.width !== undefined && resultado.height !== undefined
          ? { durationSec: resultado.durationSec, width: resultado.width, height: resultado.height }
          : null;
      return resultado.error;
    }

    return null;
  };

  const subirArchivo = async (file: File) => {
    setEstado('validando');
    setError(null);

    const ext = getExtension(file.name);
    const errorLocal = await validarLocal(file, ext);
    if (errorLocal) {
      setEstado('error');
      setError(errorLocal);
      return;
    }

    const contentType = resolverContentType(file, ext);

    try {
      const respuestaPresign = await fetch('/api/uploads/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modalidad,
          nit,
          tipo,
          filename: file.name,
          contentType,
          sizeBytes: file.size,
        }),
      });

      const dataPresign = await respuestaPresign.json();

      if (!respuestaPresign.ok) {
        setEstado('error');
        setError(dataPresign.error ?? 'No pudimos preparar la carga del archivo.');
        return;
      }

      const { uploadUrl, key } = dataPresign as { uploadUrl: string; key: string };

      setEstado('subiendo');
      setProgreso(0);

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', contentType);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setProgreso(Math.round((event.loaded / event.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`R2 respondió ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error('Error de red al subir el archivo'));
        xhr.send(file);
      });

      setEstado('cargado');
      setNombreArchivo(file.name);
      const metaVideo = tipo === 'video' && videoMetaRef.current ? videoMetaRef.current : {};
      onUploaded(key, { filename: file.name, sizeBytes: file.size, contentType, ...metaVideo });
    } catch (err) {
      console.error('[FileUpload] fallo al subir archivo', err);
      setEstado('error');
      setError('No pudimos subir el archivo. Intenta de nuevo en unos minutos.');
    }
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file || bloqueado) return;
    void subirArchivo(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const abrirSelector = () => {
    if (!bloqueado) inputRef.current?.click();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      abrirSelector();
    }
  };

  const etiqueta = tipo === 'logo' ? 'Logo' : 'Video';
  const ayuda =
    tipo === 'logo'
      ? `Formatos .ai, .eps, .pdf, .svg o .png · máx. ${Math.round(LOGO.maxBytes / (1024 * 1024))} MB`
      : `Formatos .mp4 o .mov · vertical 9:16 · máx. ${VIDEO.maxDurationSec}s · máx. ${Math.round(VIDEO.maxBytes / (1024 * 1024))} MB`;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={aceptar}
        className="sr-only"
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {estado === 'cargado' ? (
        <div className="flex items-center justify-between gap-4 border border-accent/40 bg-surface-light px-4 py-3 font-body">
          <span className="truncate text-sm text-ink">{nombreArchivo}</span>
          <button
            type="button"
            onClick={reset}
            disabled={disabled}
            className="shrink-0 text-sm font-semibold uppercase tracking-[0.08em] text-accent hover:text-borgona focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Reemplazar
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={bloqueado ? -1 : 0}
          aria-disabled={bloqueado}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={abrirSelector}
          onKeyDown={handleKeyDown}
          className={`flex flex-col items-center justify-center gap-2 border border-dashed border-accent/40 bg-surface-light px-4 py-8 text-center font-body transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            bloqueado ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-accent'
          }`}
        >
          {estado === 'validando' && <p className="text-sm text-ink/70">Validando archivo…</p>}

          {estado === 'subiendo' && (
            <div className="w-full max-w-xs">
              <p className="mb-2 text-sm text-ink/70">Subiendo… {progreso}%</p>
              <div className="h-1.5 w-full bg-ink/10">
                <div className="h-1.5 bg-accent transition-all" style={{ width: `${progreso}%` }} />
              </div>
            </div>
          )}

          {estado === 'vacio' && (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                {etiqueta} {required ? '*' : '(opcional)'}
              </p>
              <p className="text-xs text-ink/60">Arrastra el archivo aquí o haz clic para seleccionarlo</p>
              <p className="text-xs text-ink/40">{ayuda}</p>
            </>
          )}

          {estado === 'error' && (
            <>
              <p role="alert" className="text-sm text-borgona">
                {error}
              </p>
              <p className="text-xs text-ink/50">Haz clic para intentar de nuevo</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
