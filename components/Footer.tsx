import Image from 'next/image';
import Link from 'next/link';
import type { FooterContent } from '@/content/fortaleza-legado';

interface FooterProps {
  readonly content: FooterContent;
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-navy-800-textured py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Image
            src="/logos/vangelis-blanco.svg"
            alt="Vangelis"
            width={165}
            height={40}
            className="h-8 w-auto md:h-12 lg:h-20"
            style={{ width: 'auto' }}
          />
          <span className="h-6 w-px bg-white/30 md:h-10 lg:h-16" aria-hidden="true" />
          <Image
            src="/logos/fs-logo-horizontal-blanco.svg"
            alt="Fenalco Santander"
            width={392}
            height={101}
            className="h-6 w-auto md:h-10 lg:h-16"
            style={{ width: 'auto' }}
          />
        </div>

        <p className="font-display italic text-lilac-400">{content.frase}</p>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
          {content.enlaces.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-white/50">© {content.anio} Vangelis Happiness Partners · Fenalco Santander</p>
      </div>
    </footer>
  );
}
