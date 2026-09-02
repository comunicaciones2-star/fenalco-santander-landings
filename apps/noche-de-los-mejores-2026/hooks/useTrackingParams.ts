'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';

export interface TrackingParams {
  origen: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}

const EMPTY: TrackingParams = { origen: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '' };
const STORAGE_KEY = 'ndlm2026_tracking';

// Captura utm_source/medium/campaign/content + origen del primer acceso y los
// persiste en sessionStorage para que sobrevivan a la navegación por ancla
// dentro de la misma landing (regla §6: "conserva... en todos los CTA y en el
// payload del formulario").
function subscribeNoop(): () => void {
  return () => {};
}

export function useTrackingParams(): TrackingParams {
  const cache = useRef<TrackingParams | null>(null);

  const getSnapshot = useCallback((): TrackingParams => {
    if (cache.current) return cache.current;

    const search = new URLSearchParams(window.location.search);
    const fromUrl: TrackingParams = {
      origen: search.get('origen') ?? '',
      utm_source: search.get('utm_source') ?? '',
      utm_medium: search.get('utm_medium') ?? '',
      utm_campaign: search.get('utm_campaign') ?? '',
      utm_content: search.get('utm_content') ?? '',
    };

    const hasUrlValues = Object.values(fromUrl).some(Boolean);
    if (hasUrlValues) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      cache.current = fromUrl;
      return fromUrl;
    }

    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        cache.current = JSON.parse(stored) as TrackingParams;
      } catch {
        cache.current = EMPTY;
      }
    } else {
      cache.current = EMPTY;
    }

    return cache.current;
  }, []);

  const getServerSnapshot = useCallback(() => EMPTY, []);

  return useSyncExternalStore(subscribeNoop, getSnapshot, getServerSnapshot);
}
