import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadForm } from '@/components/blocks/LeadForm';

export default function InscripcionPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <LeadForm variant="inscripcion" />
      </main>
      <Footer />
    </>
  );
}
