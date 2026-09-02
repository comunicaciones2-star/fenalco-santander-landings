import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';

// Contenido de respaldo/prueba social de la edición anterior — se ubica después
// de Narrativa (que plantea el concepto) y antes de Categorías (el llamado a
// postularse), para que quien llegó hasta acá vea evidencia real del evento
// antes de decidir aplicar. bg="light-alt" continúa la alternancia de fondos
// ya establecida entre secciones (Narrativa es la única "dark" del cuerpo).
export function ReviveNDLM2025() {
  return (
    <Section id="revive-ndlm-2025" bg="light-alt">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionTitle>Revive NDLM 2025</SectionTitle>
        <Rule className="mx-auto my-6" />
        <p className="text-ink/70">
          Revive los mejores momentos de NDLM 2025: una gala donde celebramos la pujanza
          santandereana, reconocimos el talento que mueve la región y exaltamos a quienes, con
          trabajo incansable, están transformando el futuro empresarial de Santander. Una noche
          de emoción, liderazgo y orgullo por lo nuestro.
        </p>
        <p className="mt-4 text-ink/70">
          Vuelve a sentir la magia. Vuelve a vivir la noche que honra a quienes hacen grande a
          Santander.
        </p>
      </Reveal>

      <Reveal delay={80} className="mx-auto mt-14 max-w-3xl">
        <div className="relative aspect-video w-full overflow-hidden border border-accent/25">
          <iframe
            src="https://www.youtube.com/embed/uBbtgaiuIOE"
            title="Revive NDLM 2025"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </Reveal>
    </Section>
  );
}
