import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/blocks/Hero';
import { Countdown } from '@/components/blocks/Countdown';
import { Narrativa } from '@/components/blocks/Narrativa';
import { Categorias } from '@/components/blocks/Categorias';
import { Pasos } from '@/components/blocks/Pasos';
import { Formulario } from '@/components/blocks/Formulario';
import { Patrocinio } from '@/components/blocks/Patrocinio';
import { Sede } from '@/components/blocks/Sede';
import { Galeria } from '@/components/blocks/Galeria';
import { Faq } from '@/components/blocks/Faq';
import { Contacto } from '@/components/blocks/Contacto';
import { CtaFinal } from '@/components/blocks/CtaFinal';

// Bloque `galeria`: sin fotos de la edición anterior en public/galeria/, no se
// renderiza (Galeria retorna null sin `imagenes`) — ver TODO PENDIENTE en el reporte.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Countdown />
        <Narrativa />
        <Categorias />
        <Pasos />
        <Formulario />
        <Patrocinio />
        <Sede />
        <Galeria />
        <Faq />
        <Contacto />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
