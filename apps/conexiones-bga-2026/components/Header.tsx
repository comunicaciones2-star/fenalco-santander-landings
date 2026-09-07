'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { config } from '@/content/conexiones';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-shadow ${
        isScrolled ? 'border-ink/10 shadow-sm' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-6 py-3 lg:px-10">
        <Link href="#top" aria-label={`${config.nombre} — inicio`} className="shrink-0">
          <Image
            src="/brand/conexiones-bga-logo-horizontal-claro.svg"
            alt={`${config.nombre} — ${config.edicion}`}
            width={647}
            height={155}
            priority
            className="h-9 w-auto md:h-10"
            style={{ width: 'auto' }}
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          {config.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink transition-colors hover:text-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href={config.cta.principal.href} className="btn-cta hidden !px-5 !py-2.5 text-sm lg:inline-flex">
          {config.cta.principal.label}
        </Link>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setIsMenuOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green lg:hidden"
        >
          {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-nav" hidden={!isMenuOpen} className="border-t border-ink/10 bg-white px-6 py-4 lg:hidden">
        <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
          {config.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-surface-alt"
            >
              {item.label}
            </Link>
          ))}
          <Link href={config.cta.principal.href} onClick={closeMenu} className="btn-cta mt-3 justify-center">
            {config.cta.principal.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
