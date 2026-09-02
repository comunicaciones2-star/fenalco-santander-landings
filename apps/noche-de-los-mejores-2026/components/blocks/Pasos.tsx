import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';

// Bloque nuevo (kit): cronograma exacto pendiente del cliente — ver TODO PENDIENTE
// en el reporte de entrega. La numeración se justifica porque es un proceso (§4).
const PASOS = [
  {
    numero: '01',
    titulo: 'Postúlate',
    descripcion: 'Completa el formulario con los datos de tu empresa y la categoría a la que aspiras.',
  },
  {
    numero: '02',
    titulo: 'Cierre de convocatoria',
    descripcion: 'El comité de Fenalco Santander recibe y organiza las postulaciones.',
  },
  {
    numero: '03',
    titulo: 'Evaluación',
    descripcion: 'El comité revisa cada postulación frente a los criterios de la categoría.',
  },
  {
    numero: '04',
    titulo: 'La Noche de los Mejores',
    descripcion: 'Los ganadores se conocen en la gala del 26 de noviembre.',
  },
] as const;

export function Pasos() {
  return (
    <Section id="pasos" bg="light-alt">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionTitle>Cómo postularte</SectionTitle>
        <Rule className="mx-auto my-6" />
        <p className="text-ink/70">Fechas de cierre y anuncio de ganadores: sujeto a cambios.</p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {PASOS.map((paso, index) => (
          <Reveal key={paso.numero} delay={index * 80} className="flex flex-col gap-3">
            <span className="font-display text-3xl text-accent">{paso.numero}</span>
            <h3 className="font-display text-xl">{paso.titulo}</h3>
            <p className="text-sm leading-relaxed text-ink/65">{paso.descripcion}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
