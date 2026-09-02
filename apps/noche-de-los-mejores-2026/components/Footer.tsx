import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/content/event.config';

// TODO PENDIENTE: URL real de la política de tratamiento de datos de Fenalco Santander
// (no se enlaza a una ruta inventada — ver reporte de entrega).
const POLITICA_DATOS_HREF = 'https://www.fenalcosantander.com.co/';

export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark py-14 text-surface-light">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center lg:px-10">
        <Image
          src="/logos/fs-logo-horizontal-blanco.svg"
          alt="Fenalco Santander"
          width={392}
          height={101}
          className="h-9 w-auto md:h-11"
          style={{ width: 'auto' }}
        />

        <p className="max-w-xl font-display text-sm italic text-surface-light/70">{config.tagline}</p>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-surface-light/60">
          <Link href={config.cta.principal.href} className="hover:text-accent">
            {config.cta.principal.label}
          </Link>
          <Link href={config.cta.secundario.href} className="hover:text-accent">
            {config.cta.secundario.label}
          </Link>
          <Link href="#faq" className="hover:text-accent">
            Preguntas frecuentes
          </Link>
          <Link href={POLITICA_DATOS_HREF} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
            Política de tratamiento de datos
          </Link>
        </nav>

        <p className="max-w-md text-sm leading-relaxed text-surface-light/70">
          Tus datos personales se tratan conforme a la Ley 1581 de 2012 y demás normas concordantes.
          {' '}{config.sede.notas}
        </p>

        <p className="text-sm text-surface-light/70">© {anio} Fenalco Santander</p>
      </div>
    </footer>
  );
}
