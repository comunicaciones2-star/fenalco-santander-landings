import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Archivo } from 'next/font/google';
import { config } from '@/content/event.config';
import './globals.css';

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL(config.seo.canonical),
  title: config.seo.title,
  description: config.seo.description,
  openGraph: {
    title: config.seo.title,
    description: config.seo.description,
    url: config.seo.canonical,
    siteName: config.nombre,
    locale: 'es_CO',
    type: 'website',
    images: [{ url: config.seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.seo.title,
    description: config.seo.description,
    images: [config.seo.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: '#080A09',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `${config.nombre} ${config.edicion}`,
  description: config.seo.description,
  startDate: config.fecha.inicio,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: config.sede.nombre,
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.sede.ciudad,
      addressCountry: 'CO',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Fenalco Santander',
    url: 'https://www.fenalcosantander.com.co',
  },
  image: [`${config.seo.canonical}${config.seo.ogImage}`],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${bodoniModa.variable} ${archivo.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
