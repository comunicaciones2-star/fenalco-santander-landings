import { config } from '@/content/event.config';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { OgivalDivider } from '@/components/ui/OgivalDivider';
import { Reveal } from '@/components/ui/Reveal';

export function Contacto() {
  const { contacto } = config;

  return (
    <Section id="contacto" bg="secondary">
      <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-7 text-center">
        <OgivalDivider className="h-12 w-24 text-gold/60" />

        <SectionTitle>¿Tienes preguntas?</SectionTitle>

        <div>
          <p className="font-display text-2xl">{contacto.nombre}</p>
          <p className="mt-1 text-base text-text-secondary">{contacto.cargo}</p>
        </div>

        <div className="flex flex-col items-center gap-2 font-display text-lg text-ivory/90">
          <a
            href={`mailto:${contacto.email}`}
            className="hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {contacto.email}
          </a>
          <a
            href={`tel:${contacto.telefono.replace(/\s+/g, '')}`}
            className="hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {contacto.telefono}
          </a>
        </div>

        <a href={contacto.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-cta-gold mt-2">
          Escríbenos por WhatsApp
        </a>
      </Reveal>
    </Section>
  );
}
