import { fortalezaLegadoContent as content } from '@/content/fortaleza-legado';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { Problema } from '@/components/sections/Problema';
import { Dolores } from '@/components/sections/Dolores';
import { VideoSection } from '@/components/sections/VideoSection';
import { ProgramasSelector } from '@/components/sections/ProgramasSelector';
import { Fortaleza } from '@/components/sections/Fortaleza';
import { FasesDetalle } from '@/components/sections/FasesDetalle';
import { ResultadoFortaleza } from '@/components/sections/ResultadoFortaleza';
import { LegadoApertura } from '@/components/sections/LegadoApertura';
import { CincoErrores } from '@/components/sections/CincoErrores';
import { ProcesoLegado } from '@/components/sections/ProcesoLegado';
import { PreguntasDificiles } from '@/components/sections/PreguntasDificiles';
import { ResultadoLegado } from '@/components/sections/ResultadoLegado';
import { Alcance } from '@/components/sections/Alcance';
import { Contacto } from '@/components/sections/Contacto';

interface HomeProps {
  readonly searchParams: Promise<{ readonly modalidad?: string }>;
}

// Todas las modalidades de §18 (Alcance) pertenecen al programa Fortaleza —
// por eso cualquier "Solicitar propuesta" desde esa tabla precarga ese valor.
export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const defaultPrograma = params.modalidad ? 'fortaleza' : undefined;

  return (
    <>
      <Header content={content.header} />
      <main>
        <Hero content={content.hero} />
        <Problema content={content.problema} />
        <Dolores content={content.dolores} />
        <VideoSection content={content.video} />
        <ProgramasSelector content={content.programasSelector} />
        <Fortaleza
          queEs={content.fortalezaQueEs}
          metodo={content.metodologiaRem}
          warRoomNota={content.warRoomNota}
        />
        <FasesDetalle content={content.fasesDetalle} />
        <ResultadoFortaleza content={content.resultadoFortaleza} />
        <LegadoApertura content={content.legadoApertura} tresCapas={content.tresCapas} />
        <CincoErrores content={content.cincoErrores} />
        <ProcesoLegado content={content.procesoLegado} />
        <PreguntasDificiles content={content.preguntasDificiles} />
        <ResultadoLegado content={content.resultadoLegado} />
        <Alcance content={content.alcance} />
        <Contacto content={content.contacto} defaultPrograma={defaultPrograma} />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
