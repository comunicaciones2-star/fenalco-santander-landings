import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/blocks/Hero';
import { QueEs } from '@/components/blocks/QueEs';
import { Oportunidad } from '@/components/blocks/Oportunidad';
import { PorQueParticipar } from '@/components/blocks/PorQueParticipar';
import { Ecosistema } from '@/components/blocks/Ecosistema';
import { Patrocinio } from '@/components/blocks/Patrocinio';
import { CasoUso } from '@/components/blocks/CasoUso';
import { Diferenciadores } from '@/components/blocks/Diferenciadores';
import { EventDetails } from '@/components/blocks/EventDetails';
import { CommercialCTA } from '@/components/blocks/CommercialCTA';
import { LeadForm } from '@/components/blocks/LeadForm';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <QueEs />
        <Oportunidad />
        <PorQueParticipar />
        <Ecosistema />
        <Patrocinio />
        <CasoUso />
        <Diferenciadores />
        <EventDetails />
        <CommercialCTA />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
