'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { HeaderContent } from '@/content/fortaleza-legado';

interface HeaderProps {
  readonly content: HeaderContent;
}

export function Header({ content }: HeaderProps) {
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
        isScrolled ? 'bg-navy-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 md:gap-5 md:px-6 md:py-3 lg:px-10">
        <Link href="#" className="flex shrink-0 items-center gap-2 md:gap-4" aria-label="Vangelis y Fenalco Santander">
          <Image
            src="/logos/vangelis-blanco.svg"
            alt="Vangelis"
            width={165}
            height={40}
            priority
            className="h-8 w-auto md:h-10 lg:h-11"
            style={{ width: 'auto' }}
          />
          <span className="h-6 w-px bg-white/30 md:h-7 lg:h-8" aria-hidden="true" />
          <Image
            src="/logos/fs-logo-horizontal-blanco.svg"
            alt="Fenalco Santander"
            width={392}
            height={101}
            priority
            className="h-6 w-auto md:h-8 lg:h-9"
            style={{ width: 'auto' }}
          />
        </Link>

        <nav className="hidden items-center gap-8 xl:flex" aria-label="Navegación principal">
          {content.navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-white/85 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={content.ctaHref}
          aria-label={content.ctaLabel}
          className="btn-cta shrink-0 whitespace-nowrap !px-3 !py-2 text-xs md:!px-6 md:!py-3 md:text-sm"
        >
          {content.ctaLabel}
        </Link>
      </div>
    </header>
  );
}
