import Image from 'next/image';

interface GlassImageCardProps {
  readonly src: string;
  /** Ancho real del archivo (px) — evita forzar un aspecto equivocado vía object-cover. */
  readonly width?: number;
  /** Alto real del archivo (px). */
  readonly height?: number;
  readonly className?: string;
  /** 'glass' (default): vidrio translúcido, pensado para fondos oscuros.
   *  'dark-panel': panel navy opaco, para cuando la imagen se ve mejor sobre oscuro
   *  dentro de una sección clara. */
  readonly tone?: 'glass' | 'dark-panel';
}

export function GlassImageCard({
  src,
  width = 700,
  height = 875,
  className = '',
  tone = 'glass',
}: GlassImageCardProps) {
  const panelClasses =
    tone === 'dark-panel'
      ? 'border border-navy-700 bg-navy-900 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)]'
      : 'border border-white/10 bg-white/[0.06] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl';

  return (
    <div className={`relative rounded-3xl ${panelClasses} ${className}`}>
      <div className="relative overflow-hidden rounded-2xl">
        {/* Decorativa: rol presentacional, alt vacío a propósito. */}
        <Image src={src} alt="" width={width} height={height} className="h-auto w-full object-cover" />
      </div>
      {tone === 'glass' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-transparent"
        />
      )}
    </div>
  );
}
