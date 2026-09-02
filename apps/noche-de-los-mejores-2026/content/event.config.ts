export interface CtaLink {
  readonly label: string;
  readonly href: string;
  readonly tipo?: 'ancla';
}

export interface EventConfig {
  readonly slug: string;
  readonly nombre: string;
  readonly edicion: string;
  readonly tagline: string;
  readonly tipo: string;
  readonly fecha: {
    readonly inicio: string;
    readonly textoDisplay: string;
    readonly mostrarCountdown: boolean;
  };
  readonly sede: {
    readonly nombre: string;
    readonly direccion: string;
    readonly ciudad: string;
    readonly notas: string;
  };
  readonly cta: {
    readonly principal: CtaLink;
    readonly secundario: CtaLink;
    readonly whatsapp: string;
  };
  readonly hero: {
    readonly titulo: string;
    readonly subtitulo: string;
    readonly media: { readonly tipo: 'imagen'; readonly src: string; readonly alt: string };
  };
  readonly bloques: readonly string[];
  readonly contacto: {
    readonly nombre: string;
    readonly cargo: string;
    readonly email: string;
    readonly telefono: string;
    readonly whatsapp: string;
  };
  readonly categorias: ReadonlyArray<{ readonly nombre: string; readonly descripcion: string }>;
  readonly formulario: {
    readonly campos: readonly string[];
    readonly modalidades: ReadonlyArray<{ readonly id: string; readonly label: string }>;
    readonly destinoEmail: string;
    readonly mensajeExito: string;
  };
  readonly seo: {
    readonly title: string;
    readonly description: string;
    readonly ogImage: string;
    readonly canonical: string;
  };
  readonly analytics: { readonly campaign: string };
}

export const config: EventConfig = {
  slug: 'noche-de-los-mejores-2026',
  nombre: 'La Noche de los Mejores',
  edicion: '2026',
  tagline: 'El poder de quienes transforman el comercio en legado.',
  tipo: 'gala',

  fecha: {
    inicio: '2026-11-26T17:00:00-05:00',
    textoDisplay: 'Jueves 26 de noviembre de 2026 · 5:00 p. m.',
    mostrarCountdown: true,
  },

  sede: {
    nombre: 'Centro de Convenciones Neomundo — Gran Salón',
    direccion: '', // TODO PENDIENTE: dirección exacta de Neomundo
    ciudad: 'Bucaramanga',
    notas: 'Código de vestuario: blanco. Información sujeta a cambios.',
  },

  cta: {
    principal: { label: 'Postúlate', href: '#postulacion', tipo: 'ancla' },
    secundario: { label: 'Quiero patrocinar', href: '#patrocinio' },
    whatsapp: '', // TODO PENDIENTE: contacto comercial definitivo
  },

  hero: {
    titulo: 'La Noche de los Mejores 2026',
    subtitulo: 'Los comerciantes construyeron Venecia. Los empresarios construyen Santander.',
    media: {
      tipo: 'imagen',
      src: '/hero/ndlm-hero-mercurio-negro.png',
      alt: 'Mercurio dorado con caduceo bajo un arco ojival, pieza gráfica oficial de La Noche de los Mejores 2026',
    },
  },

  bloques: [
    'hero',
    'countdown',
    'narrativa',
    'categorias',
    'pasos',
    'formulario',
    'patrocinio',
    'sede',
    'galeria',
    'faq',
    'contacto',
    'ctaFinal',
  ],

  contacto: {
    nombre: 'Carolina Chacón',
    cargo: 'Gerente Comercial',
    email: 'gerentenegocios@fenalcosantander.com.co',
    telefono: '322 849 1525',
    whatsapp: 'https://wa.me/573228491525',
  },

  categorias: [
    { nombre: 'Mercurio de Oro', descripcion: '' },
    { nombre: 'Reconocimiento a la Santandereanidad', descripcion: '' },
    { nombre: 'Toda una Vida Dedicada al Fomento Empresarial', descripcion: '' },
    { nombre: 'Mujer Insignia Empresarial', descripcion: '' },
    { nombre: 'Innovación Tecnológica', descripcion: '' },
    { nombre: 'Fidelidad Fenalquista', descripcion: '' },
    { nombre: 'Emprendimiento Destacado', descripcion: '' },
    { nombre: 'Responsabilidad Social Empresarial', descripcion: '' },
    { nombre: 'Apoyo Gremial', descripcion: '' },
    { nombre: 'Mérito Empresarial del Comercio', descripcion: '' },
  ],
  // TODO PENDIENTE: descripción y requisitos de cada categoría.

  formulario: {
    campos: [
      'nombre',
      'apellido',
      'email',
      'telefono',
      'empresa',
      'nit',
      'cargo',
      'sector',
      'ciudad',
      'esAfiliado',
      'modalidad',
      'categoriaPostulacion',
      'mensaje',
      'aceptaHabeasData',
    ],
    modalidades: [
      { id: 'postulacion', label: 'Quiero postularme' },
      { id: 'patrocinio', label: 'Quiero patrocinar' },
    ],
    destinoEmail: '', // TODO PENDIENTE — usa LEADS_TO_EMAIL en .env.local
    mensajeExito: 'Recibimos tu postulación. El equipo de Fenalco Santander te contactará.',
  },

  seo: {
    title: 'La Noche de los Mejores 2026 | Fenalco Santander',
    description:
      'Convocatoria abierta a los reconocimientos que exaltan la excelencia, la trayectoria y el liderazgo empresarial en Santander. 26 de noviembre, Centro de Convenciones Neomundo, Bucaramanga.',
    ogImage: '/og.jpg',
    canonical: 'https://nochedelosmejores.fenalcosantander.com.co',
  },

  analytics: { campaign: 'noche-mejores-2026' },
};
