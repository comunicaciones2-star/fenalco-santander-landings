import { Reveal } from '@/components/ui/Reveal';
import { StarField } from '@/components/ui/StarField';
import { GothicArch } from '@/components/ui/GothicArch';
import { CtaFinalClientside } from './CtaFinalClientside';

// Copy aprobado (§3 del prompt de build), literal.
//
// FASE 2.6 §21: se retiran ndlm-mercurio-izq.png / -der.png / ndlm-ctafinal-
// mercurio-verde.png (identidad legacy "Venecia Mercante") de esta sección —
// los archivos NO se borran, solo dejan de referenciarse aquí. Composición
// nueva: background-primary + StarField + GothicArch parcial, sin Mercurio
// (el brief pide preferir su ausencia a reutilizar el legacy incorrecto).
export function CtaFinal() {
  return (
    <section id="cta-final" className="relative overflow-hidden bg-surface-primary py-24 text-surface-light md:py-32">
      <StarField density="medium" />
      <GothicArch className="pointer-events-none absolute -right-16 bottom-0 hidden h-[480px] w-auto text-gold/15 lg:block" />

      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-8 px-6 text-center">
        <CtaFinalClientside />
      </Reveal>
    </section>
  );
}
