'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';

// Criterios de evaluación por categoría y términos legales de postulación: TODO
// PENDIENTE (ver reporte de entrega, §5.4 del prompt de build).
const PREGUNTAS = [
  {
    pregunta: '¿Quién puede postularse?',
    respuesta:
      'Empresarios y empresas de Santander que quieran hacer parte de los reconocimientos que exaltan la excelencia, la trayectoria y el liderazgo empresarial en la región.',
  },
  {
    pregunta: '¿Necesito estar afiliado a Fenalco Santander?',
    respuesta:
      'El formulario pregunta por tu afiliación para fines de registro. Si tienes dudas sobre tu categoría, el equipo de Fenalco Santander te orienta al recibir tu postulación.',
  },
  {
    pregunta: '¿Cuáles son los criterios de evaluación por categoría?',
    respuesta:
      'Cada una de las diez categorías tiene sus propios criterios. Se publicarán junto con el cronograma de la convocatoria. Sujeto a cambios.',
  },
  {
    pregunta: '¿Cómo sé que mi postulación fue recibida?',
    respuesta: 'Recibirás una confirmación y el equipo de Fenalco Santander te contactará.',
  },
  {
    pregunta: '¿Hay código de vestuario?',
    respuesta: 'Sí, blanco. Información sujeta a cambios.',
  },
] as const;

export function Faq() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <Section id="faq" bg="light-alt">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionTitle>Preguntas frecuentes</SectionTitle>
        <Rule className="mx-auto my-6" />
      </Reveal>

      <div className="mx-auto mt-12 max-w-2xl divide-y divide-ink/10">
        {PREGUNTAS.map((item, index) => {
          const estaAbierta = abierta === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-boton-${index}`;

          return (
            <div key={item.pregunta}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={estaAbierta}
                  aria-controls={panelId}
                  onClick={() => setAbierta(estaAbierta ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.pregunta}
                  <span aria-hidden="true" className="shrink-0 text-accent">
                    {estaAbierta ? '−' : '+'}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!estaAbierta}
                className="pb-5 text-sm leading-relaxed text-ink/70"
              >
                {item.respuesta}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
