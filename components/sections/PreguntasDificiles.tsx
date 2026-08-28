import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { Rule } from '@/components/ui/Rule';
import { Accordion, type AccordionItem } from '@/components/Accordion';
import type { PreguntasDificilesContent } from '@/content/fortaleza-legado';

interface PreguntasDificilesProps {
  readonly content: PreguntasDificilesContent;
}

export function PreguntasDificiles({ content }: PreguntasDificilesProps) {
  const items: AccordionItem[] = content.preguntas.map((qa) => ({
    id: qa.pregunta,
    trigger: qa.pregunta,
    content: <p className="text-ink-900/70">{qa.respuesta}</p>,
  }));

  return (
    <Section bg="light-alt">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker className="text-lilac-600">{content.kicker}</Kicker>
        <Rule className="mx-auto" />
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <Accordion items={items} defaultOpenId={undefined} />
      </div>
    </Section>
  );
}
