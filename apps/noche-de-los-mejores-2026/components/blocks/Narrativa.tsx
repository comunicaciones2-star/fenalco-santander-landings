import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';

// Activar cuando se entregue el asset aprobado, sin Mercurio.
const EXPERIENCE_IMAGE = {
  src: '/sections/ndlm-experiencia-2026.png',
  available: false,
};

export function Narrativa() {
  return (
    <Section id="narrativa" bg="primary">
      <div className={`mx-auto grid items-center gap-10 lg:gap-16 ${EXPERIENCE_IMAGE.available ? 'lg:grid-cols-2' : 'max-w-3xl'}`}>
        <Reveal>
          <Rule className="mb-7" />
          <SectionTitle>Una noche para reconocer a quienes construyen región</SectionTitle>
          <p className="mt-7 text-lg leading-relaxed text-text-secondary sm:text-xl">
            Una experiencia empresarial de alto nivel que reúne liderazgo, trayectoria y excelencia para exaltar a quienes impulsan Santander.
          </p>
        </Reveal>
        {EXPERIENCE_IMAGE.available && (
          <Reveal className="relative aspect-[4/3] overflow-hidden border border-gold/20">
            <Image
              src={EXPERIENCE_IMAGE.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        )}
      </div>
    </Section>
  );
}