import { config } from '@/content/event.config';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { OgivalDivider } from '@/components/ui/OgivalDivider';
import { Reveal } from '@/components/ui/Reveal';

export function Contacto() {
  const { contacto } = config;

  return (
    <Section id="contacto" bg="light">
      <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <OgivalDivider className="h-10 w-20 text-accent/60" />

        <SectionTitle>¿Tienes preguntas?</SectionTitle>

        <div>
          <p className="font-display text-lg">{contacto.nombre}</p>
          <p className="text-sm text-ink/60">{contacto.cargo}</p>
        </div>

        <div className="flex flex-col items-center gap-2 text-ink/80">
          <a
            href={`mailto:${contacto.email}`}
            className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {contacto.email}
          </a>
          <a
            href={`tel:${contacto.telefono.replace(/\s+/g, '')}`}
            className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {contacto.telefono}
          </a>
        </div>

        <a href={contacto.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-cta mt-2">
          Escríbenos por WhatsApp
        </a>
      </Reveal>
    </Section>
  );
}
