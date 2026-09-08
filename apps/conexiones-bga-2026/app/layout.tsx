import type { Metadata, Viewport } from 'next';
import { Ubuntu } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { config } from '@/content/conexiones';
import './globals.css';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ubuntu',
});

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  openGraph: {
    title: config.seo.title,
    description: config.seo.description,
    siteName: config.nombre,
    locale: 'es_CO',
    type: 'website',
    images: [{ url: config.seo.ogImage, width: 1080, height: 1080 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.seo.title,
    description: config.seo.description,
    images: [config.seo.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: '#1B3A4B',
};

// Solo campos confirmados por el brief (fecha, sede, ciudad, organizador real).
// Sin `image`/`url` propios del evento: no hay dominio confirmado todavía — se
// omite en vez de inventar una URL (ver decisión §30 del brief).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `${config.nombre} — ${config.edicion}`,
  description: config.seo.description,
  startDate: config.fecha.iso,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: `${config.sede.nombre} — ${config.sede.lugar}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.sede.ciudad,
      addressRegion: config.sede.departamento,
      addressCountry: 'CO',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Fenalco Santander',
    url: 'https://www.fenalcosantander.com.co',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={ubuntu.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
