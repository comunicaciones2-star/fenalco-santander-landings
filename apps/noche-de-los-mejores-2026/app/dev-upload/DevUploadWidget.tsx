'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/ui/FileUpload';

const NIT_PRUEBA = '900123456-7';

export function DevUploadWidget() {
  const [logoKey, setLogoKey] = useState<string | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);

  return (
    <div>
      <h1>Dev Upload — modalidad: postulantes — NIT: {NIT_PRUEBA}</h1>

      <h2>Logo</h2>
      <FileUpload
        tipo="logo"
        modalidad="postulantes"
        nit={NIT_PRUEBA}
        onUploaded={(key) => setLogoKey(key)}
        onCleared={() => setLogoKey(null)}
      />
      <p>key: {logoKey ?? '(sin subir)'}</p>

      <h2>Video</h2>
      <FileUpload
        tipo="video"
        modalidad="postulantes"
        nit={NIT_PRUEBA}
        onUploaded={(key) => setVideoKey(key)}
        onCleared={() => setVideoKey(null)}
      />
      <p>key: {videoKey ?? '(sin subir)'}</p>
    </div>
  );
}
