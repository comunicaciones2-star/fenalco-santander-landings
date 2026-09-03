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
  tagline: 'Fenalco Santander — Reconocimiento a la pujanza santandereana.',
  tipo: 'gala',

  fecha: {
    inicio: '2026-11-26T17:00:00-05:00',
    textoDisplay: 'Jueves 26 de noviembre de 2026 · 5:00 p. m.',
    mostrarCountdown: true,
  },

  sede: {
    nombre: 'Centro de Convenciones Neomundo — Gran Salón',
    direccion: 'Calle 89 Transversal Oriental Metropolitana #69',
    ciudad: 'Bucaramanga',
    notas: 'Código de vestuario: blanco. Información sujeta a cambios.',
  },

  cta: {
    principal: { label: 'Postúlate', href: '#postulacion', tipo: 'ancla' },
    secundario: { label: 'Quiero patrocinar', href: '#patrocinio' },
    whatsapp: 'https://wa.me/573228491525',
  },

  hero: {
    titulo: 'La Noche de los Mejores 2026',
    subtitulo: 'Reconocimiento a la pujanza santandereana.',
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
    'reviveNDLM2025',
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

  // Nombres EXACTOS — deben coincidir carácter por carácter con el <select> de
  // categoriaPostulacion en Formulario.tsx (que los deriva de este mismo array,
  // ver categoria.nombre como value/key) y con CATEGORIAS_NOMBRE_PERSONAL en
  // lib/schemas/registro.ts, que compara por igualdad de string exacta contra
  // 'Mujer Insignia Empresarial' y 'Toda una Vida Dedicada al Fomento
  // Empresarial' para activar el campo Cédula obligatorio. Ninguna de las dos
  // cambió de nombre en esta actualización — solo "Apoyo Gremial" pasó a
  // "Apoyo y Gestión Gremial" (no es una de las 2 categorías con cédula).
  categorias: [
    {
      nombre: 'Mercurio de Oro',
      descripcion: 'Máxima condecoración que Fenalco Santander otorga a una organización destacada por su permanencia en el mercado, desarrollo comercial y social, considerada insignia del comercio santandereano a nivel regional, nacional e internacional.',
    },
    {
      nombre: 'Reconocimiento a la Santandereanidad',
      descripcion: 'Personalidad ilustre que se ha destacado por enaltecer con su trabajo y dedicación las banderas del departamento de Santander, contribuyendo de manera invaluable en el desarrollo y crecimiento regional, nacional e internacional.',
    },
    {
      nombre: 'Toda una Vida Dedicada al Fomento Empresarial',
      descripcion: 'Reconocemos a una personalidad ilustre del departamento, su compromiso, consagración y entrega a la labor empresarial durante años, promoviendo el desarrollo del departamento de Santander.',
    },
    {
      nombre: 'Mujer Insignia Empresarial',
      descripcion: 'Homenaje a aquellas mujeres ilustres del departamento que sobresalen por su liderazgo, perseverancia, compromiso y tenacidad en pro del desarrollo y fortalecimiento de Santander.',
    },
    {
      nombre: 'Innovación Tecnológica',
      descripcion: 'Empresa que a lo largo de su trayectoria ha obtenido reconocimiento por su destacada labor, ofreciendo servicios adecuados y responsables, incursionando en áreas de tecnología con el fin de mejorar la calidad de vida y el desarrollo social de la región.',
    },
    {
      nombre: 'Fidelidad Fenalquista',
      descripcion: 'Homenaje a una organización que durante muchos años ha pertenecido como miembro y afiliado activo, mostrando un compromiso constante con el gremio y contribuyendo al fortalecimiento del comercio en la región.',
    },
    {
      nombre: 'Emprendimiento Destacado',
      descripcion: 'Reconocimiento a la iniciativa, el emprendimiento, el compromiso y la innovación de aquellos nuevos empresarios santandereanos que se han destacado en el comercio organizado a nivel regional.',
    },
    {
      nombre: 'Responsabilidad Social Empresarial',
      descripcion: 'Reconocimiento al compromiso con la comunidad santandereana, el liderazgo y la destacada gestión en programas que beneficien a la sociedad y el medio ambiente, generando una contribución al departamento.',
    },
    {
      nombre: 'Apoyo y Gestión Gremial',
      descripcion: 'Reconocimiento a las empresas que han brindado un respaldo significativo al fortalecimiento del sector comercial y empresarial, promoviendo el crecimiento y desarrollo del gremio en la región.',
    },
    {
      nombre: 'Mérito Empresarial del Comercio',
      descripcion: 'Reconocimiento que se otorga a aquellas entidades que, a lo largo de los años, han demostrado una destacada trayectoria y liderazgo en el sector comercial, convirtiéndose en referentes para las nuevas generaciones de santandereanos. Estas empresas han desarrollado su actividad comercial de manera organizada, seria, eficiente y responsable, destacándose por su compromiso con el comercio formal y su capacidad para expandirse tanto a nivel regional como nacional.',
    },
  ],

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
      'Noche de gala que busca exaltar la labor de empresarios santandereanos a través de una gala de premiación y relacionamiento empresarial.',
    ogImage: '/og.jpg',
    canonical: 'https://nochedelosmejores.fenalcosantander.com.co',
  },

  analytics: { campaign: 'noche-mejores-2026' },
};
