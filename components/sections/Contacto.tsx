import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from '@/components/ContactForm';
import { ParallaxBackground } from '@/components/ui/ParallaxBackground';
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from '@/lib/contactChannels';
import type { ContactoContent } from '@/content/fortaleza-legado';

interface ContactoProps {
  readonly content: ContactoContent;
  readonly defaultPrograma?: string;
}

export function Contacto({ content, defaultPrograma }: ContactoProps) {
  const hasAlternativeChannels = Boolean(WHATSAPP_NUMBER || CONTACT_EMAIL);

  return (
    <Section
      bg="darker"
      id="contacto"
      background={
        <ParallaxBackground
          src="/images/photography/cta-contemplacion-final.jpg"
          overlay="light"
          objectPosition="78% 45%"
        />
      }
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionTitle>{content.titulo}</SectionTitle>
        <p className="mt-4 text-white/80">{content.bajada}</p>
      </div>

      <div className="relative mx-auto mt-10 max-w-2xl rounded-3xl border border-white/10 bg-navy-900/50 p-6 backdrop-blur-md md:p-10">
        {/* key fuerza remount cuando cambia la modalidad precargada (navegación
            cliente-a-cliente no re-aplica defaultValue en un <select> no controlado) */}
        <ContactForm key={defaultPrograma ?? 'no-se'} content={content} defaultPrograma={defaultPrograma} />

        {hasAlternativeChannels && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            {WHATSAPP_NUMBER && (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Escríbenos por WhatsApp
              </a>
            )}
            {CONTACT_EMAIL && (
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
                {CONTACT_EMAIL}
              </a>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
