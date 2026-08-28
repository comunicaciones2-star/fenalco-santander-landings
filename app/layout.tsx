import type { Metadata, Viewport } from 'next';
import { Baloo_2, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

const SITE_URL = 'https://fortaleza-legado.fenalcosantander.com.co';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Proyecto Fortaleza & Legado · Vangelis × Fenalco Santander',
  description:
    'Proyecto ejecutivo de 100 días para proteger tu EBITDA y sistema de sucesión empresarial para que tu empresa sobreviva a su fundador.',
  openGraph: {
    title: 'Proyecto Fortaleza & Legado · Vangelis × Fenalco Santander',
    description:
      'Proyecto ejecutivo de 100 días para proteger tu EBITDA y sistema de sucesión empresarial para que tu empresa sobreviva a su fundador.',
    url: SITE_URL,
    siteName: 'Proyecto Fortaleza & Legado',
    locale: 'es_CO',
    type: 'website',
    images: [{ url: '/og-fortaleza-legado.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyecto Fortaleza & Legado · Vangelis × Fenalco Santander',
    description:
      'Proyecto ejecutivo de 100 días para proteger tu EBITDA y sistema de sucesión empresarial para que tu empresa sobreviva a su fundador.',
    images: ['/og-fortaleza-legado.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0F0F2E',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Proyecto Fortaleza & Legado',
  description:
    'Proyecto ejecutivo de 100 días para proteger el EBITDA (Fortaleza) y sistema de sucesión empresarial (Legado) para empresas familiares y PYME.',
  provider: {
    '@type': 'Organization',
    name: 'Vangelis Happiness Partners',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Colombia',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${baloo2.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
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
