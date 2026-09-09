'use client';

import { useEffect, useRef } from 'react';

export function HeroNebulaVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const media = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    const stop = () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
    const syncPlayback = () => {
      if (!media.matches) {
        stop();
        return;
      }
      video.src = '/hero/ndlm-celestial-nebula.mp4';
      video.muted = true;
      // El fondo est?tico permanece como fallback si el navegador bloquea autoplay.
      void video.play().catch(() => {});
    };

    syncPlayback();
    media.addEventListener('change', syncPlayback);
    return () => {
      media.removeEventListener('change', syncPlayback);
      stop();
    };
  }, []);

  return (
    <div className="hero-nebula-video" aria-hidden="true">
      <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />
    </div>
  );
}
