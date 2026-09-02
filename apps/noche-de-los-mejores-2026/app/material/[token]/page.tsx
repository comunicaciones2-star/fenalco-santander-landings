import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { verifyMaterialToken } from '@/lib/token';
import { MaterialUploadForm } from './MaterialUploadForm';

export const metadata: Metadata = {
  title: 'Material promocional | La Noche de los Mejores 2026',
  robots: { index: false, follow: false },
};

export default async function MaterialPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const payload = verifyMaterialToken(token);

  return (
    <main className="min-h-screen bg-surface-light px-6 py-16 text-ink">
      <div className="mx-auto max-w-2xl">
        <div className="flex justify-center">
          <Image
            src="/logos/fs-logo-horizontal-color.svg"
            alt="Fenalco Santander"
            width={280}
            height={72}
            priority
            className="h-9 w-auto md:h-10"
            style={{ width: 'auto' }}
          />
        </div>

        {!payload ? (
          <div className="mt-14 text-center">
            <h1 className="font-display text-3xl">Enlace no disponible</h1>
            <p className="mx-auto mt-4 max-w-md text-sm text-ink/70">
              Este enlace para enviar material promocional ya no es válido o venció. Si necesitas
              reenviarlo, escríbenos a través de la página del evento.
            </p>
            <Link href="/" className="btn-cta mt-8 inline-flex">
              Ir a la página del evento
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 text-center">
              {payload.empresa && (
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink/60">{payload.empresa}</p>
              )}
              <h1 className="mt-2 font-display text-3xl">Material promocional</h1>
              <p className="mt-2 text-sm text-ink/70">La Noche de los Mejores 2026</p>
            </div>

            <div className="mt-8 space-y-3 text-sm leading-relaxed text-ink/70">
              <p>
                Los postulantes y patrocinadores que no entreguen su logotipo no podrán aparecer en
                las piezas de comunicación, redes sociales ni impactos de marca del evento.
              </p>
              <p>
                El logotipo es obligatorio para figurar en el material promocional. El video de
                postulación es opcional, pero fortalece la sustentación ante el jurado.
              </p>
              <p className="text-xs text-ink/50">
                Especificaciones · Logotipo: vectorial .ai, .eps, .pdf o .png con fondo transparente
                en alta resolución. Video: vertical 1080 x 1920 px, máximo 1 minuto.
              </p>
            </div>

            <MaterialUploadForm token={token} modalidad={payload.modalidad} nit={payload.nit} />
          </>
        )}
      </div>
    </main>
  );
}
