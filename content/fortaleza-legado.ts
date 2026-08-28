// Fuente única de verdad del copy de la landing. Cero texto hardcodeado en componentes.

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface HeaderContent {
  readonly navLinks: readonly NavLink[];
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

export interface HeroDato {
  readonly valor: string;
  readonly label: string;
}

export interface HeroContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly subtitulo: string;
  readonly parrafo: string;
  readonly ctaPrimario: { readonly label: string; readonly href: string };
  readonly ctaSecundario: { readonly label: string; readonly href: string };
  readonly datos: readonly HeroDato[];
}

export interface ProblemaColumna {
  readonly titulo: string;
  readonly descripcion: string;
}

export interface ProblemaContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly columnas: readonly ProblemaColumna[];
  readonly cita: string;
}

export interface DolorItem {
  readonly numero: number;
  readonly titulo: string;
  readonly descripcion: string;
}

export interface DoloresContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly dolores: readonly DolorItem[];
  readonly cierreLinea: string;
}

export interface VideoConfig {
  readonly src: string;
  readonly poster: string;
  readonly width: number;
  readonly height: number;
  readonly durationLabel: string;
  readonly title: string;
}

export interface VideoContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly parrafo: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly video: VideoConfig;
}

export interface ProgramaTarjeta {
  readonly nombre: string;
  readonly descripcion: string;
  readonly etiqueta: string;
  readonly href: string;
}

export interface ProgramasSelectorContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly tarjetas: readonly ProgramaTarjeta[];
}

export interface Pilar {
  readonly titulo: string;
  readonly descripcion: string;
}

export interface FortalezaQueEsContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly bajada: string;
  readonly pilares: readonly Pilar[];
}

export interface FaseRem {
  readonly letra: 'R' | 'E' | 'M';
  readonly nombre: string;
  readonly dia: string;
  readonly descripcion: string;
}

export interface MetodologiaRemContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly bajada: string;
  readonly fases: readonly FaseRem[];
  readonly cierre: string;
}

export interface Entregable {
  readonly titulo: string;
  readonly descripcion: string;
}

export interface FaseDetalle {
  readonly nombre: string;
  readonly duracion: string;
  readonly resumen: string;
  readonly analiza?: readonly string[];
  readonly palancas?: readonly string[];
  readonly entregables: readonly Entregable[];
  readonly cierreListado?: readonly string[];
  readonly cita: string;
}

export interface FasesDetalleContent {
  readonly fases: readonly FaseDetalle[];
}

export interface WarRoomNotaContent {
  readonly texto: string;
}

export interface TarjetaNumerada {
  readonly numero: string;
  readonly titulo: string;
  readonly descripcion: string;
}

export interface ResultadoFortalezaContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly tarjetas: readonly TarjetaNumerada[];
  readonly cita: string;
}

export interface CifraGrande {
  readonly valor: string;
  readonly descripcion: string;
}

export interface LegadoAperturaContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly cifras: readonly CifraGrande[];
  readonly texto: string;
  readonly contraste: {
    readonly herencia: { readonly titulo: string; readonly texto: string };
    readonly sucesion: { readonly titulo: string; readonly texto: string };
  };
  readonly cierre: string;
}

export interface Capa {
  readonly numero: string;
  readonly titulo: string;
  readonly subtitulo: string;
  readonly descripcion: string;
}

export interface TresCapasContent {
  readonly titulo: string;
  readonly bajada: string;
  readonly capas: readonly Capa[];
  readonly notaPie: string;
}

export interface ErrorItem {
  readonly numero: string;
  readonly titulo: string;
  readonly descripcion: string;
}

export interface CincoErroresContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly errores: readonly ErrorItem[];
}

export interface FaseProceso {
  readonly nombre: string;
  readonly descripcion: string;
}

export interface ProcesoLegadoContent {
  readonly fases: readonly FaseProceso[];
  readonly badgeDuracion: { readonly valor: string; readonly descripcion: string };
}

export interface PreguntaRespuesta {
  readonly pregunta: string;
  readonly respuesta: string;
}

export interface PreguntasDificilesContent {
  readonly kicker: string;
  readonly preguntas: readonly PreguntaRespuesta[];
}

export interface ResultadoItem {
  readonly titulo: string;
  readonly descripcion: string;
}

export interface ResultadoLegadoContent {
  readonly items: readonly ResultadoItem[];
  readonly cita: string;
}

/**
 * Fila de la tabla de alcance (§18). Deliberadamente NO tiene campo
 * price/amount/cost: la landing no publica precios. No añadas ese campo.
 */
export interface AlcanceFila {
  readonly modalidad: string;
  readonly alcance: string;
  readonly duracion: string;
  readonly destacado?: boolean;
}

export interface AlcanceContent {
  readonly kicker: string;
  readonly titulo: string;
  readonly bajada: string;
  readonly modalidades: readonly AlcanceFila[];
  readonly cierre: {
    readonly titulo: string;
    readonly texto: string;
    readonly ctaLabel: string;
    readonly ctaHref: string;
  };
}

export interface OpcionPrograma {
  readonly value: string;
  readonly label: string;
}

export interface ContactoContent {
  readonly titulo: string;
  readonly bajada: string;
  readonly campos: {
    readonly nombre: string;
    readonly empresa: string;
    readonly nit: string;
    readonly cargo: string;
    readonly correo: string;
    readonly celular: string;
    readonly programaInteres: string;
    readonly mensaje: string;
    readonly consentimiento: string;
  };
  readonly opcionesPrograma: readonly OpcionPrograma[];
  readonly submitLabel: string;
  readonly mensajeExito: string;
  readonly politicaHref: string;
}

export interface FooterContent {
  readonly frase: string;
  readonly anio: number;
  readonly enlaces: readonly NavLink[];
}

export interface FortalezaLegadoContent {
  readonly header: HeaderContent;
  readonly hero: HeroContent;
  readonly problema: ProblemaContent;
  readonly dolores: DoloresContent;
  readonly video: VideoContent;
  readonly programasSelector: ProgramasSelectorContent;
  readonly fortalezaQueEs: FortalezaQueEsContent;
  readonly metodologiaRem: MetodologiaRemContent;
  readonly fasesDetalle: FasesDetalleContent;
  readonly warRoomNota: WarRoomNotaContent;
  readonly resultadoFortaleza: ResultadoFortalezaContent;
  readonly legadoApertura: LegadoAperturaContent;
  readonly tresCapas: TresCapasContent;
  readonly cincoErrores: CincoErroresContent;
  readonly procesoLegado: ProcesoLegadoContent;
  readonly preguntasDificiles: PreguntasDificilesContent;
  readonly resultadoLegado: ResultadoLegadoContent;
  readonly alcance: AlcanceContent;
  readonly contacto: ContactoContent;
  readonly footer: FooterContent;
}

export const fortalezaLegadoContent: FortalezaLegadoContent = {
  header: {
    navLinks: [
      { label: 'Diagnóstico', href: '#contacto' },
      { label: 'Fortaleza', href: '#fortaleza' },
      { label: 'Legado', href: '#legado' },
      { label: 'Alcance', href: '#alcance' },
    ],
    ctaLabel: 'Agenda tu diagnóstico',
    ctaHref: '#contacto',
  },

  hero: {
    kicker: 'PROYECTO EJECUTIVO · VANGELIS × FENALCO SANTANDER',
    titulo: 'Proyecto Fortaleza & Legado',
    subtitulo:
      'Dos proyectos, una misma decisión: que tu empresa resista hoy y sobreviva a su fundador.',
    parrafo:
      'Fortaleza protege y mejora tu EBITDA en 100 días. Legado convierte tu empresa en una institución que no depende de ti.',
    ctaPrimario: { label: 'Agenda tu diagnóstico', href: '#contacto' },
    ctaSecundario: { label: 'Ver el proyecto', href: '#video' },
    datos: [
      { valor: '100 días', label: 'Metodología REM' },
      { valor: '12–18 meses', label: 'Sistema de sucesión' },
      { valor: '70%', label: 'de las empresas familiares no llegan a la 2ª generación' },
    ],
  },

  problema: {
    kicker: 'EL PROBLEMA',
    titulo:
      'Las empresas no caen cuando suben los costos. Caen cuando no tienen estructura para absorberlos.',
    columnas: [
      { titulo: 'El margen', descripcion: 'Presión directa sobre la rentabilidad por unidad' },
      { titulo: 'La caja', descripcion: 'Impacto inmediato en la liquidez operativa' },
      {
        titulo: 'La ejecución operativa',
        descripcion: 'Decisiones sin datos ni estructura de respuesta',
      },
    ],
    cita:
      'Las empresas que sobreviven no son las que reaccionan, son las que profesionalizan su estructura.',
  },

  dolores: {
    kicker: 'LOS DOLORES DE LA PYME EN 2026',
    titulo: 'Los dolores de la PYME en 2026',
    dolores: [
      {
        numero: 1,
        titulo: 'Falta de flujo de caja',
        descripcion:
          'Pagos diferidos a 30, 60 y 90 días, gastos fijos altos, mala planeación de tesorería, dependencia de pocos clientes e inventario quieto.',
      },
      {
        numero: 2,
        titulo: 'Endeudamiento mal estructurado',
        descripcion:
          "Uso excesivo de crédito rotativo y tarjetas, créditos de corto plazo para inversiones de largo plazo y dependencia del 'gota a gota'.",
      },
      {
        numero: 3,
        titulo: 'Baja rentabilidad',
        descripcion: 'Se vende más y se gana menos: el margen se erosiona sin que nadie lo mida.',
      },
      {
        numero: 4,
        titulo: 'Cartera morosa',
        descripcion: 'El ingreso está en la factura, no en la caja.',
      },
    ],
    cierreLinea:
      'Y detrás de estos, tres fugas silenciosas: mezclar finanzas personales con las del negocio, decidir sin datos y operar con tecnología de hace veinte años.',
  },

  video: {
    kicker: 'EL PROYECTO EN 46 SEGUNDOS',
    titulo: 'Míralo en menos de un minuto.',
    parrafo:
      'Una explicación corta de cómo Fortaleza protege tu margen y cómo Legado asegura la continuidad de tu empresa.',
    ctaLabel: 'Agenda tu diagnóstico',
    ctaHref: '#contacto',
    video: {
      src: '/video/vd-vangelis-001.mp4',
      poster: '/video/poster-vangelis.jpg',
      width: 576,
      height: 1024,
      durationLabel: '46 s',
      title: 'Proyecto Fortaleza & Legado',
    },
  },

  programasSelector: {
    kicker: 'DOS PROYECTOS',
    titulo: 'Un problema distinto en cada etapa de la empresa.',
    tarjetas: [
      {
        nombre: 'Proyecto Fortaleza',
        descripcion: 'Proyecto ejecutivo de 100 días para proteger y mejorar tu EBITDA.',
        etiqueta: 'PARA LA EMPRESA QUE ESTÁ BAJO PRESIÓN DE COSTOS',
        href: '#fortaleza',
      },
      {
        nombre: 'Proyecto Legado',
        descripcion:
          'Proyecto de sucesión empresarial para que la empresa sobreviva a su fundador.',
        etiqueta: 'PARA LA EMPRESA FAMILIAR QUE ENFRENTA EL RELEVO',
        href: '#legado',
      },
    ],
  },

  fortalezaQueEs: {
    kicker: 'BLOQUE 1 · PROYECTO FORTALEZA',
    titulo: '¿Qué es Proyecto Fortaleza?',
    bajada:
      'Proyecto de transformación empresarial en 100 días orientado a proteger y mejorar el EBITDA. Convierte presión económica en ventaja competitiva.',
    pilares: [
      { titulo: 'Proteger margen', descripcion: 'Defender la rentabilidad frente al shock de costos' },
      { titulo: 'Estabilizar caja', descripcion: 'Controlar el flujo sin destruir operaciones' },
      {
        titulo: 'Rediseñar operación',
        descripcion: 'Profesionalizar la estructura para absorber presión',
      },
      {
        titulo: 'Crecer con rentabilidad',
        descripcion: 'Convertir eficiencia operativa en crecimiento real',
      },
    ],
  },

  metodologiaRem: {
    kicker: 'METODOLOGÍA REM',
    titulo: 'El Método Fortaleza',
    bajada: 'Tres fases ejecutivas. Un resultado: control y crecimiento sostenible.',
    fases: [
      {
        letra: 'R',
        nombre: 'RADAR',
        dia: 'Día 28',
        descripcion: 'Medimos el impacto real sobre margen y caja.',
      },
      {
        letra: 'E',
        nombre: 'ESCUDO',
        dia: 'Día 45',
        descripcion: 'Neutralizamos el impacto sobre la rentabilidad.',
      },
      {
        letra: 'M',
        nombre: 'MOTOR',
        dia: 'Día 100',
        descripcion: 'Activamos crecimiento rentable.',
      },
    ],
    cierre: 'De preocupación a control. De control a crecimiento sostenible.',
  },

  fasesDetalle: {
    fases: [
      {
        nombre: 'RADAR',
        duracion: '28 días',
        resumen: 'Entender con precisión dónde impacta el shock de costos.',
        analiza: ['P&G', 'Caja', 'Unit Economics', 'Productividad operativa', 'Estructura de costos'],
        entregables: [
          {
            titulo: 'Mapa de exposición',
            descripcion: 'Heatmap por línea de negocio y grupo de costo. Identifica dónde duele más.',
          },
          {
            titulo: 'Unit Economics',
            descripcion: 'Costo real por unidad, productividad laboral y efecto PxQ.',
          },
          {
            titulo: 'EBITDA Bridge',
            descripcion:
              'Tres escenarios —conservador, base y agresivo— para proteger el margen.',
          },
          {
            titulo: 'Sensibilidades',
            descripcion:
              'Precio, volumen, productividad y rotación: las variables dominantes sobre el punto de equilibrio.',
          },
          {
            titulo: 'Plan de acción',
            descripcion:
              'Top 5 quick wins en menos de 30 días y top 10 iniciativas estratégicas con impacto estimado.',
          },
        ],
        cita: 'De preocupación a decisiones concretas.',
      },
      {
        nombre: 'ESCUDO',
        duracion: '45 días',
        resumen: 'Neutralizar el impacto en margen y caja sin destruir ingresos.',
        palancas: [
          'Productividad',
          'Costo de servir',
          'Compras e indirectos',
          'Performance del equipo',
          'Pricing defensivo',
        ],
        entregables: [
          {
            titulo: 'Plan de iniciativas ejecutado',
            descripcion:
              'Acciones concretas con impacto económico, responsables y calendario de ejecución.',
          },
          {
            titulo: 'Tablero de control mensual',
            descripcion:
              'Métricas de productividad, costo unitario, margen de contribución e impacto en caja.',
          },
          {
            titulo: 'EBITDA Bridge actualizado',
            descripcion:
              'Seguimiento del impacto real de las palancas activadas durante la fase.',
          },
        ],
        cita: 'De la preocupación al control operativo.',
      },
      {
        nombre: 'MOTOR',
        duracion: '100 días',
        resumen: 'Transformar la mejora operativa en crecimiento rentable.',
        entregables: [
          {
            titulo: 'Arquitectura de precios',
            descripcion: 'Definición de precio por cliente, por canal y por paquetes de valor.',
          },
          {
            titulo: 'Rediseño de mix',
            descripcion:
              'Eliminamos lo que destruye margen. Impulsamos lo que genera contribución positiva.',
          },
          {
            titulo: 'Growth Plays',
            descripcion:
              'Entre 5 y 8 acciones comerciales medibles: ticket, conversión, retención y canal.',
          },
        ],
        cierreListado: ['Plan comercial 30/60/90', 'Tablero de crecimiento rentable', 'KPI por iniciativa'],
        cita: 'Crecimiento que financia la nueva estructura de costos.',
      },
    ],
  },

  warRoomNota: {
    texto:
      'La diferencia entre consultoría y resultados es la gobernanza: por eso Fortaleza incluye un War Room mensual — seguimiento de palancas, revisión de margen y caja, y decisiones ejecutivas con datos.',
  },

  resultadoFortaleza: {
    kicker: 'RESULTADO FINAL DEL PROYECTO',
    titulo: 'Al finalizar, la empresa obtiene:',
    tarjetas: [
      {
        numero: '01',
        titulo: 'EBITDA protegido',
        descripcion: 'El margen resistió el shock. La caja, también.',
      },
      {
        numero: '02',
        titulo: 'Estructura operativa profesionalizada',
        descripcion: 'La operación funciona sin depender de la improvisación.',
      },
      {
        numero: '03',
        titulo: 'Sistema de crecimiento rentable',
        descripcion: 'El crecimiento financia la nueva estructura de costos.',
      },
      {
        numero: '04',
        titulo: 'Gobernanza financiera instalada',
        descripcion: 'Decisiones ejecutivas basadas en datos, cada mes.',
      },
    ],
    cita: 'Fortaleza no es el final. Es la base desde donde creces.',
  },

  legadoApertura: {
    kicker: 'PROYECTO LEGADO · SUCESIÓN EMPRESARIAL',
    titulo:
      'El verdadero legado de un fundador no es la empresa que construyó. Es la empresa que logra sobrevivirle.',
    cifras: [
      { valor: '70%', descripcion: 'de las empresas familiares no llegan a la segunda generación' },
      { valor: '10%', descripcion: 'solo el 10% alcanza la tercera generación' },
    ],
    texto:
      'Las empresas familiares no desaparecen por el mercado. Desaparecen cuando no transfieren liderazgo, gobierno y continuidad. La causa rara vez es económica: es la ausencia de un sistema de sucesión.',
    contraste: {
      herencia: {
        titulo: 'Herencia patrimonial',
        texto: 'Una empresa puede repartir patrimonio.',
      },
      sucesion: {
        titulo: 'Sucesión empresarial',
        texto: 'Pero si divide mal el poder, destruye la empresa.',
      },
    },
    cierre:
      'La sucesión empresarial no es un acto legal. Es un proceso estratégico, emocional y organizativo.',
  },

  tresCapas: {
    titulo: 'La sucesión no consiste en elegir heredero.',
    bajada: 'Consiste en rediseñar tres elementos fundamentales de la empresa.',
    capas: [
      {
        numero: '01',
        titulo: 'Propiedad',
        subtitulo: '¿Quién es dueño?',
        descripcion:
          'Define quién posee las acciones y activos, evitando disputas familiares por el patrimonio.',
      },
      {
        numero: '02',
        titulo: 'Dirección',
        subtitulo: '¿Quién gestiona?',
        descripcion:
          'Establece quién lidera el día a día, separando la capacidad profesional del vínculo familiar.',
      },
      {
        numero: '03',
        titulo: 'Gobernanza',
        subtitulo: '¿Quién decide?',
        descripcion:
          'Determina cómo se toman las decisiones clave, con reglas que evitan bloqueos y conflictos.',
      },
    ],
    notaPie:
      'Cuando estos tres elementos no están definidos aparecen: conflictos familiares, pérdida de liderazgo y destrucción de valor.',
  },

  cincoErrores: {
    kicker: '5 ERRORES QUE DESTRUYEN LAS SUCESIONES',
    titulo: 'No son errores financieros. Son errores de sistema.',
    errores: [
      {
        numero: '01',
        titulo: 'Empezar demasiado tarde',
        descripcion:
          'Iniciar el relevo con 3 a 7 años de anticipación. Esperar a los 65–70 años debilita la transición y es el error más costoso.',
      },
      {
        numero: '02',
        titulo: 'El fundador no suelta el poder',
        descripcion:
          'Retiene el poder real, destruyendo la legitimidad del sucesor y paralizando la organización.',
      },
      {
        numero: '03',
        titulo: 'Elegir por sangre, no por capacidad',
        descripcion:
          'La pregunta correcta no es cuál de los hijos será el sucesor, sino qué tipo de líder necesita esta empresa para sobrevivir los próximos 20 años. Primero se define el puesto, después se evalúan las personas.',
      },
      {
        numero: '04',
        titulo: 'Ausencia total de gobernanza',
        descripcion:
          'Los conflictos sobre roles, dividendos y poder estallan sin mecanismos para resolverlos. La gobernanza no se crea cuando aparece el conflicto: se crea antes de que aparezca.',
      },
      {
        numero: '05',
        titulo: 'Equipo directivo no preparado',
        descripcion:
          'Si el equipo no reconoce al sucesor como líder real, la transición fracasa sin importar el título.',
      },
    ],
  },

  procesoLegado: {
    fases: [
      {
        nombre: 'Fase 1 · Diagnóstico integral',
        descripcion:
          'Estructura de propiedad, dinámica familiar, situación del fundador y perfil de candidatos.',
      },
      {
        nombre: 'Fase 2 · Perfil del sucesor',
        descripcion:
          'Primero el puesto, luego las personas. Capacidades requeridas, experiencia profesional como criterio objetivo, legitimidad ante el equipo directivo y plan de formación por brechas.',
      },
      {
        nombre: 'Fase 3 · Creación de gobernanza',
        descripcion:
          'Separación estructural familia / gestión, Consejo de Familia y Consejo Asesor, y Protocolo Familiar con reglas de decisión, dividendos y acceso a cargos directivos.',
      },
      {
        nombre: 'Fase 4 · Plan de transición',
        descripcion:
          'Transferencia progresiva de responsabilidades, capacitación de líderes operativos, plan estratégico gradual y relación con el equipo directivo.',
      },
      {
        nombre: 'Fase 5 · Transferencia de poder',
        descripcion:
          'El equipo reconoce al sucesor. Los clientes confían en el nuevo liderazgo. La organización funciona sin dependencia del fundador.',
      },
    ],
    badgeDuracion: {
      valor: '12 a 18 meses',
      descripcion: 'para una sucesión consolidada y perdurable.',
    },
  },

  preguntasDificiles: {
    kicker: 'PREGUNTAS DIFÍCILES QUE RESOLVER',
    preguntas: [
      {
        pregunta: '¿Y si ningún hijo está preparado?',
        respuesta:
          'Evaluamos candidatos y diseñamos planes de formación acelerada o liderazgo externo.',
      },
      {
        pregunta: '¿Qué pasa si los hermanos no están de acuerdo?',
        respuesta: 'Protocolos familiares y mecanismos de votación para evitar parálisis por desacuerdo.',
      },
      {
        pregunta: '¿Es demasiado tarde si el fundador tiene 65 años?',
        respuesta: 'Protocolo de sucesión acelerada para transiciones ordenadas en plazos reducidos.',
      },
    ],
  },

  resultadoLegado: {
    items: [
      {
        titulo: 'Continuidad empresarial garantizada',
        descripcion:
          'La empresa opera con independencia del fundador, asegurando su permanencia más allá de una sola generación.',
      },
      {
        titulo: 'Liderazgo legitimado',
        descripcion: 'El sucesor es reconocido por equipo, clientes y socios como líder real.',
      },
      {
        titulo: 'Empresa transferible y sistematizada',
        descripcion:
          'El negocio deja de depender de personas clave y se convierte en un sistema replicable.',
      },
      {
        titulo: 'Legado del fundador convertido en institución',
        descripcion: 'La empresa se convierte en una institución con identidad y cultura propias.',
      },
    ],
    cita:
      'Las empresas familiares que sobreviven generaciones no son las que tienen mejores herederos. Son las que construyen los mejores sistemas de continuidad.',
  },

  alcance: {
    kicker: 'ALCANCE Y MODALIDADES',
    titulo: 'Elige cómo empezar.',
    bajada:
      'Puedes contratar una fase o el proyecto completo. La propuesta económica se construye según el tamaño y la complejidad de tu empresa.',
    modalidades: [
      { modalidad: 'RADAR', alcance: 'Diagnóstico financiero y operacional', duracion: '28 días' },
      { modalidad: 'ESCUDO', alcance: 'Protección de margen y caja', duracion: '45 días' },
      { modalidad: 'MOTOR', alcance: 'Crecimiento rentable y sostenible', duracion: 'hasta el día 100' },
      {
        modalidad: 'PACK COMPLETO',
        alcance: 'RADAR + ESCUDO + MOTOR',
        duracion: '100 días',
        destacado: true,
      },
      { modalidad: 'WAR ROOM', alcance: 'Sistema de dirección mensual', duracion: 'Renovable' },
    ],
    cierre: {
      titulo: 'Solicita la propuesta económica',
      texto: 'Te enviamos el alcance detallado y la inversión ajustada a tu empresa.',
      ctaLabel: 'Solicitar propuesta',
      ctaHref: '#contacto',
    },
  },

  contacto: {
    titulo: 'Hablemos antes de que sea tarde.',
    bajada: 'Lo que construiste merece un plan.',
    campos: {
      nombre: 'Nombre y apellido',
      empresa: 'Empresa',
      nit: 'NIT (opcional)',
      cargo: 'Cargo',
      correo: 'Correo corporativo',
      celular: 'Celular (WhatsApp)',
      programaInteres: 'Proyecto de interés',
      mensaje: 'Mensaje (opcional)',
      consentimiento:
        'Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012.',
    },
    opcionesPrograma: [
      { value: 'fortaleza', label: 'Fortaleza' },
      { value: 'legado', label: 'Legado' },
      { value: 'ambos', label: 'Ambos' },
      { value: 'no-se', label: 'Aún no lo sé' },
    ],
    submitLabel: 'Agenda tu diagnóstico',
    mensajeExito: 'Recibimos tu solicitud. Te contactamos en menos de 24 horas hábiles.',
    politicaHref: '/politica-tratamiento-datos',
  },

  footer: {
    frase: 'Happiness, seriously.',
    anio: 2026,
    enlaces: [
      { label: 'Política de tratamiento de datos', href: '/politica-tratamiento-datos' },
      { label: 'Términos y condiciones', href: '/terminos' },
    ],
  },
};
