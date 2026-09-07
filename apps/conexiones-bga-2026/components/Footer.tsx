import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/content/conexiones';
import { InstitutionalPartners } from '@/components/blocks/InstitutionalPartners';

// Sin enlace a política de tratamiento de datos: no hay URL confirmada todavía
// (ver decisión §23 del brief — omitir en vez de inventar una ruta).
export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-surface-alt py-14 text-ink">
      <div className="mx-auto flex max-w-content flex-col items-center gap-8 px-6 text-center lg:px-10">
        <Image
          src="/brand/conexiones-bga-logo-vertical-claro.svg"
          alt={`${config.nombre} — ${config.edicion}`}
          width={378}
          height={310}
          className="h-16 w-auto"
        />

        <InstitutionalPartners align="center" />

        <nav aria-label="Navegación del pie de página" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
          {config.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-green">
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="max-w-md text-sm leading-relaxed text-ink-soft">
          Tus datos personales se tratan conforme a la Ley 1581 de 2012 y demás normas concordantes.
        </p>

        <p className="text-sm text-ink-soft">© {anio} Fenalco Santander</p>
      </div>
    </footer>
  );
}
