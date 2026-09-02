'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { config } from '@/content/event.config';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        isScrolled ? 'bg-surface-dark/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-3 lg:px-10">
        <Link href="#" aria-label="Fenalco Santander" className="shrink-0">
          <Image
            src="/logos/fs-logo-horizontal-blanco.svg"
            alt="Fenalco Santander"
            width={392}
            height={101}
            priority
            className="h-7 w-auto md:h-8"
            style={{ width: 'auto' }}
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href={config.cta.secundario.href}
            aria-label={config.cta.secundario.label}
            className="hidden text-xs font-semibold uppercase tracking-[0.08em] text-surface-light/80 transition-colors hover:text-accent sm:inline"
          >
            {config.cta.secundario.label}
          </Link>
          <Link
            href={config.cta.principal.href}
            aria-label={config.cta.principal.label}
            className="btn-cta !px-4 !py-2.5 text-xs md:!px-6 md:!py-3 md:text-sm"
          >
            {config.cta.principal.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
