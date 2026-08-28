'use client';

import { useRef, useState } from 'react';

interface VideoVerticalProps {
  readonly src: string;
  readonly poster: string;
  readonly title: string;
}

// TODO: subtítulos .vtt pendientes — agregar <track kind="subtitles"> cuando estén disponibles.
export function VideoVertical({ src, poster, title }: VideoVerticalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = () => {
    setHasStarted(true);
    videoRef.current?.play();
  };

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-3xl border border-navy-700 bg-navy-800 shadow-xl md:max-w-[360px]">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={title}
        preload="none"
        controls={hasStarted}
        playsInline
        className="h-full w-full object-cover"
      />
      {!hasStarted && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Reproducir video"
          className="absolute inset-0 flex items-center justify-center bg-navy-900/20 transition-colors hover:bg-navy-900/10"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lilac-400 text-navy-900 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
