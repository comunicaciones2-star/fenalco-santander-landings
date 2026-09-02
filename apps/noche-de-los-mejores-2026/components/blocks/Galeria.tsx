interface GaleriaProps {
  readonly imagenes?: ReadonlyArray<{ readonly src: string; readonly alt: string }>;
}

// Bloque nuevo (kit): condicional. Sin fotos de la edición anterior en public/galeria/,
// no se renderiza (regla §4 del prompt de build) — ver TODO PENDIENTE en el reporte.
export function Galeria({ imagenes }: GaleriaProps) {
  if (!imagenes || imagenes.length === 0) return null;

  return (
    <section id="galeria" className="bg-surface-light py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-6 sm:grid-cols-3 lg:px-10">
        {imagenes.map((imagen) => (
          <img key={imagen.src} src={imagen.src} alt={imagen.alt} className="aspect-square w-full object-cover" />
        ))}
      </div>
    </section>
  );
}
