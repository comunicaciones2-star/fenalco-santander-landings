// Contenido editorial centralizado de la landing CONEXIONES BGA — 2.ª Edición.
// Ningún componente debe hardcodear copy, fechas, CTAs ni datos de contacto: todo
// vive aquí para poder editarlo sin tocar componentes.
//
// Datos de contacto comercial: aún no confirmados por el cliente. Se dejan como
// `undefined` a propósito (no strings vacíos ni placeholders tipo "Por definir")
// para que los componentes que los consumen (CommercialCTA, Footer) rendericen
// condicionalmente y nunca muestren un dato falso o un placeholder visible.

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface CtaLink {
  readonly label: string;
  readonly href: string;
}

export interface IconConcepto {
  readonly label: string;
  readonly icon: string;
}

export interface Paquete {
  readonly nombre: string;
  readonly resumen: string;
  readonly incluye: readonly string[];
}

export interface Panelista {
  readonly nombre: string;
  readonly cargo: string;
}

export const config = {
  // OJO: "conexiones-bga-2026" NO se usa aquí a propósito — en el CRM de Fenalco
  // (fenalco-crm / NEXO) ese slug ya pertenece a otro evento (la reunión interna
  // de Socialización, 10 sep). Este `slug` es solo identificador interno de esta
  // landing (analytics); el slug real del evento en el CRM es
  // CRM_EVENT_SLUG=conexiones-bga-evento-2026 (ver .env.example y lib/leads.ts).
  slug: 'conexiones-bga-landing-2026',
  nombre: 'CONEXIONES BGA',
  edicion: '2.ª Edición',
  descriptor: 'Innovación, Relacionamiento Empresarial y Emprendimiento',

  fecha: {
    textoDisplay: '8 de octubre de 2026',
    // Fecha ISO sin hora confirmada — se usa únicamente para JSON-LD (startDate),
    // no se muestra hora en la interfaz.
    iso: '2026-10-08',
  },

  sede: {
    nombre: 'Gran Salón',
    lugar: 'Centro de Convenciones Neomundo',
    ciudad: 'Bucaramanga',
    departamento: 'Santander',
  },

  nav: [
    { label: 'El evento', href: '#el-evento' },
    { label: 'Oportunidades', href: '#oportunidad' },
    { label: 'Patrocinio', href: '#patrocinio' },
    { label: 'Aliados', href: '#aliados' },
    { label: 'Contacto', href: '#contacto' },
  ] as readonly NavItem[],

  cta: {
    principal: { label: 'Quiero participar', href: '#contacto' } as CtaLink,
    secundario: { label: 'Conoce las oportunidades comerciales', href: '#oportunidad' } as CtaLink,
  },

  hero: {
    eyebrow: 'CONEXIONES BGA · 2.ª Edición',
    titulo: 'Donde las conexiones empresariales se convierten en oportunidades.',
    texto: 'Un punto de encuentro para empresas, emprendimiento, innovación e instituciones que buscan generar relaciones de valor, nuevas conversaciones y oportunidades comerciales.',
  },

  queEs: {
    id: 'el-evento',
    titulo: 'Un encuentro para conectar el ecosistema empresarial',
    intro: 'CONEXIONES BGA es una feria corporativa B2B y una plataforma de relacionamiento que articula empresas, emprendimiento, innovación e institucionalidad en un mismo espacio.',
    bloques: [
      {
        numero: '01',
        titulo: 'Feria corporativa B2B',
        texto: 'Un espacio para que marcas, empresas, productos y servicios se encuentren con públicos empresariales.',
      },
      {
        numero: '02',
        titulo: 'Relacionamiento empresarial',
        texto: 'Un entorno diseñado para facilitar conversaciones, alianzas y conexiones estratégicas.',
      },
      {
        numero: '03',
        titulo: 'Articulación del ecosistema',
        texto: 'Conecta sector privado, emprendimiento e instituciones alrededor del desarrollo empresarial.',
      },
    ],
  },

  oportunidad: {
    id: 'oportunidad',
    headline: 'Empresas. Ideas. Personas. Oportunidades.',
    copy: 'CONEXIONES BGA reúne actores con intereses complementarios y crea un entorno para activar relaciones empresariales de valor.',
    // Zonas de experiencia reales de la propuesta comercial (no conceptos genéricos).
    conceptos: [
      { label: 'Muestra Comercial', icon: 'Store' },
      { label: 'Agenda Académica', icon: 'GraduationCap' },
      { label: 'Zona Gastronómica', icon: 'UtensilsCrossed' },
      { label: 'Networking', icon: 'Users' },
      { label: 'Feria de Empleo', icon: 'Briefcase' },
    ] as readonly IconConcepto[],
    panelistas: {
      titulo: 'Conferencistas confirmados',
      disclaimer: 'Sujeto a cambios.',
      personas: [
        { nombre: 'Gio Sosa', cargo: 'CEO de La Gloriosa' },
        { nombre: 'Pablo Murillo', cargo: 'Gerente Canales de Distribución de HP Colombia' },
        { nombre: 'Valentina Hernández', cargo: 'CEO de Vaher' },
        { nombre: 'Antonio Planes', cargo: 'Presidente de Vangelis Happiness Partners' },
        { nombre: 'Liliana Caballero', cargo: 'Gerente de Hacienda Casablanca' },
      ] as readonly Panelista[],
    },
  },

  porQueParticipar: {
    titulo: 'Más que visibilidad: relaciones que pueden generar nuevas oportunidades.',
    beneficios: [
      'Posicionamiento frente a una audiencia empresarial relevante.',
      'Visibilidad asociada a un encuentro corporativo regional.',
      'Presencia dentro de una experiencia de networking.',
      'Oportunidad de vinculación con empresas e instituciones.',
      'Fortalecimiento de reputación y cercanía con el ecosistema empresarial.',
    ],
  },

  ecosistema: {
    titulo: 'Un ecosistema de activación antes, durante y después del evento.',
    disclaimer: 'Las posibilidades de participación, formatos, alcances y condiciones dependerán del paquete comercial definitivo.',
    // Plan de medios real de la propuesta comercial (no touchpoints genéricos).
    puntos: [
      { label: 'Rueda de prensa', icon: 'Mic' },
      { label: 'Pauta en valla digital', icon: 'MonitorPlay' },
      { label: 'Piezas y videos pregrabados con marcas', icon: 'Video' },
      { label: 'Cuñas radiales', icon: 'Radio' },
      { label: 'Plan de medios digitales', icon: 'Globe' },
      { label: 'Mensajes push', icon: 'Bell' },
    ] as readonly IconConcepto[],
  },

  patrocinio: {
    id: 'patrocinio',
    titulo: 'Haz parte del ecosistema CONEXIONES BGA',
    intro: 'Existen diferentes niveles de vinculación para marcas que buscan presencia, relacionamiento y participación dentro del evento.',
    // Paquetes reales de la propuesta comercial (sin precio a pedido explícito —
    // el valor de inversión se comparte directamente al solicitar información).
    paquetes: [
      {
        nombre: 'Stand Comercial',
        resumen: 'Presencia física de marca en el Gran Salón durante toda la jornada.',
        incluye: [
          'Stand comercial de 3x3, incluye mesa, dos sillas y punto de luz 110v',
          'Logo en backing de patrocinadores',
          'Logo en reel de patrocinadores',
        ],
      },
      {
        nombre: 'Mesa en Rueda de Negocios',
        resumen: 'Un espacio estratégico para conectar, negociar y generar oportunidades.',
        incluye: [
          'Mesa en la rueda de negocios',
          'Logo en backing de patrocinadores',
          'Logo en reel de patrocinadores',
        ],
      },
      {
        nombre: 'Espacio Exterior Zona Gastro',
        resumen: 'Presencia de marca en la zona gastronómica exterior del evento.',
        incluye: [
          '1 carpa 2x2, 2 sillas y 1 mesa, punto de luz 110v',
          'Logo en backing de patrocinadores',
          'Logo en reel de patrocinadores',
        ],
      },
      {
        nombre: 'Cabina Fotográfica',
        resumen: 'Activación de marca a través de una experiencia fotográfica para los asistentes.',
        incluye: [
          'Arte del marco de la foto enviado por la marca, fotografías ilimitadas',
          'Logo en backing de patrocinadores',
          'Logo en reel de patrocinadores',
        ],
      },
      {
        nombre: 'Espacio para Dummie',
        resumen: 'Presencia de marca mediante un espacio de activación con volanteo.',
        incluye: [
          'Espacio de 1x1 para la ubicación de un dummie',
          'Acceso a volanteo de 2 personas',
          'Logo en backing de patrocinadores',
          'Logo en reel de patrocinadores',
        ],
      },
    ] as readonly Paquete[],
    ctaLabel: 'Solicitar información',
    // Sectores económicos objetivo de la propuesta comercial — informa a la marca
    // patrocinadora a qué públicos llega el evento.
    sectoresTitulo: 'Sectores económicos que participan',
    sectores: [
      'Sector Financiero', 'Gastronómico', 'Consumo Masivo', 'Construcción', 'Sector Vehículos',
      'Electrodomésticos & Hogar', 'Hotelería & Turismo', 'Centros Comerciales', 'Logística & Transporte',
      'Grandes Superficies', 'Funerarias y Parques Cementerios', "TIC'S", 'Emprendimiento',
      'Instituciones Educativas', 'Sector Salud', 'Sector Motocicletas', 'Inmobiliarios',
    ],
  },

  casoUso: {
    titulo: 'Así podría vivir la experiencia una marca patrocinadora',
    texto: 'Una marca patrocinadora utiliza CONEXIONES BGA para generar reconocimiento antes del evento, presencia durante la jornada y conversaciones comerciales con públicos empresariales.',
    disclaimer: 'Ejemplo ilustrativo de experiencia comercial. No corresponde a un caso documentado ni garantiza resultados específicos.',
    pasos: [
      { fase: 'Antes', titulo: 'Generar reconocimiento', icon: 'Megaphone' },
      { fase: 'Durante', titulo: 'Estar presente', icon: 'MapPin' },
      { fase: 'Conexión', titulo: 'Crear conversaciones de valor', icon: 'MessageCircle' },
      { fase: 'Oportunidad', titulo: 'Abrir nuevas posibilidades', icon: 'TrendingUp' },
    ],
  },

  diferenciadores: {
    id: 'aliados',
    titulo: 'Un encuentro respaldado por actores que impulsan el desarrollo empresarial de la región.',
    pilares: [
      { numero: '01', titulo: 'Respaldo institucional', icon: 'ShieldCheck' },
      { numero: '02', titulo: 'Enfoque B2B', icon: 'Target' },
      { numero: '03', titulo: 'Relacionamiento empresarial', icon: 'Users' },
      { numero: '04', titulo: 'Integración de innovación y emprendimiento', icon: 'Sprout' },
    ],
  },

  // Lockup oficial vigente (confirmado sobre los assets auditados): Fenalco Santander
  // + La Feria Bonita de Colombia + IMEBU (su isotipo ya incluye el escudo de la
  // Alcaldía de Bucaramanga). No reconstruir ni recolorear estos archivos.
  // El logo IMEBU es el lockup institucional oficial (escudo Alcaldía + wordmark
  // completo) — la "Mosca" es la versión simplificada para redes sociales, no para
  // esta franja de aliados. Es un lockup mucho más ancho que los otros dos, así
  // que se renderiza a menor altura para que ninguno domine visualmente la franja.
  aliados: [
    { nombre: 'Fenalco Santander', src: '/brand/fenalco-santander-vertical-color.svg', width: 140, height: 140, heightClass: 'h-16 sm:h-20' },
    { nombre: 'La Feria Bonita de Colombia', src: '/brand/feria-bonita-logo.svg', width: 127, height: 140, heightClass: 'h-16 sm:h-20' },
    { nombre: 'IMEBU — Alcaldía de Bucaramanga', src: '/brand/imebu-institucional.svg', width: 201, height: 92, heightClass: 'h-12 sm:h-16' },
  ],

  eventDetails: {
    id: 'evento-datos',
  },

  commercialCta: {
    titulo: 'Conecta tu marca con nuevas oportunidades.',
    ctaPrincipal: { label: 'Solicita la propuesta de patrocinio', href: '#contacto' } as CtaLink,
    ctaSecundario: { label: 'Conoce el paquete comercial CONEXIONES BGA + La Noche de los Mejores', href: '#patrocinio' } as CtaLink,
  },

  // TODO PENDIENTE — datos reales del contacto comercial. Mientras no existan,
  // los componentes que los usan omiten el bloque en vez de mostrar un placeholder.
  contactoComercial: {
    nombre: undefined as string | undefined,
    cargo: undefined as string | undefined,
    email: undefined as string | undefined,
    telefono: undefined as string | undefined,
    commercialUrl: undefined as string | undefined,
  },

  formulario: {
    id: 'contacto',
    titulo: 'Solicita información',
    intro: 'Cuéntanos qué te interesa y el equipo de Fenalco Santander te contactará.',
    tiposInteres: [
      { id: 'participar', label: 'Participar en el evento' },
      { id: 'patrocinio', label: 'Patrocinio' },
      { id: 'expositor', label: 'Expositor / marca' },
      { id: 'alianza', label: 'Alianza institucional' },
      { id: 'comercial', label: 'Información comercial' },
    ],
    mensajeExito: 'Recibimos tu solicitud. El equipo de Fenalco Santander te contactará pronto.',
  },

  seo: {
    title: 'CONEXIONES BGA — 2.ª Edición | Fenalco Santander',
    description: 'Feria corporativa B2B de innovación, relacionamiento empresarial y emprendimiento. 8 de octubre de 2026 · Gran Salón, Centro de Convenciones Neomundo, Bucaramanga.',
    ogImage: '/brand/conexiones-bga-lockup.png',
  },

  analytics: { campaign: 'conexiones-bga-landing-2026' },
} as const;

export type ConexionesConfig = typeof config;
