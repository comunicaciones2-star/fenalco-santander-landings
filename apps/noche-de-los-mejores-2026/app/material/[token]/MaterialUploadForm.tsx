'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/ui/FileUpload';
import type { Modalidad as ModalidadArchivo } from '@/lib/upload-rules';

type Modalidad = 'postulacion' | 'patrocinio';
type EstadoGuardado = 'idle' | 'guardando' | 'guardado' | 'error';

interface MaterialUploadFormProps {
  readonly token: string;
  readonly modalidad: Modalidad;
  readonly nit: string;
}

function toModalidadArchivo(modalidad: Modalidad): ModalidadArchivo {
  return modalidad === 'postulacion' ? 'postulantes' : 'patrocinadores';
}

export function MaterialUploadForm({ token, modalidad, nit }: MaterialUploadFormProps) {
  const [estadoLogo, setEstadoLogo] = useState<EstadoGuardado>('idle');
  const [estadoVideo, setEstadoVideo] = useState<EstadoGuardado>('idle');
  const modalidadArchivo = toModalidadArchivo(modalidad);

  const guardarMaterial = async (
    parte: { logo: Record<string, unknown> } | { video: Record<string, unknown> },
    setEstado: (estado: EstadoGuardado) => void,
  ) => {
    setEstado('guardando');
    try {
      const response = await fetch('/api/registro/material', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, material: parte }),
      });
      setEstado(response.ok ? 'guardado' : 'error');
    } catch {
      setEstado('error');
    }
  };

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="bg-white/60 p-6">
        <p className="mb-1.5 text-sm font-medium">Logotipo de la empresa</p>
        <FileUpload
          tipo="logo"
          modalidad={modalidadArchivo}
          nit={nit}
          required
          onUploaded={(key, meta) =>
            guardarMaterial(
              {
                logo: {
                  key,
                  filename: meta.filename,
                  sizeBytes: meta.sizeBytes,
                  uploadedAt: new Date().toISOString(),
                },
              },
              setEstadoLogo,
            )
          }
          onCleared={() => setEstadoLogo('idle')}
        />
        <AvisoGuardado estado={estadoLogo} />
      </div>

      <div className="bg-white/60 p-6">
        <p className="mb-1.5 text-sm font-medium">Video de postulación (opcional)</p>
        <FileUpload
          tipo="video"
          modalidad={modalidadArchivo}
          nit={nit}
          onUploaded={(key, meta) =>
            guardarMaterial(
              {
                video: {
                  key,
                  filename: meta.filename,
                  durationSec: meta.durationSec,
                  width: meta.width,
                  height: meta.height,
                  via: 'upload',
                  uploadedAt: new Date().toISOString(),
                },
              },
              setEstadoVideo,
            )
          }
          onCleared={() => setEstadoVideo('idle')}
        />
        <AvisoGuardado estado={estadoVideo} />
      </div>
    </div>
  );
}

function AvisoGuardado({ estado }: { estado: EstadoGuardado }) {
  if (estado === 'guardando') return <p className="mt-2 text-sm text-ink/70">Guardando en el CRM…</p>;
  if (estado === 'guardado') return <p className="mt-2 text-sm text-accent-text">Guardado correctamente.</p>;
  if (estado === 'error')
    return (
      <p role="alert" className="mt-2 text-xs text-borgona">
        No pudimos guardar el archivo. Intenta de nuevo en unos minutos.
      </p>
    );
  return null;
}
