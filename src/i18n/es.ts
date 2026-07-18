import type { ToolContent } from './types';

// Español. Transcreación basada en el vocabulario que usan las herramientas de
// comparación de texto (diff) en español, no traducción literal. Sin palabras
// publicitarias (fácil / rápido / perfecto…); la privacidad se explica de forma
// estructural, no como promesa. Español pan-regional (España y Latinoamérica),
// registro «tú». htmlLang 'es'. QA por revisor independiente.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Comparar dos textos — diferencias por línea en tu navegador, sin subir nada | runlocally',
    description:
      'Pega dos textos y consulta las diferencias línea por línea: líneas añadidas, eliminadas y sin cambios resaltadas, con un recuento de líneas +/- en vivo. Funciona por completo en tu navegador. No se sube nada.',
    ogTitle: 'Comparar dos textos — diferencias por línea en tu navegador',
    ogDescription: 'Pega dos textos y consulta las diferencias línea por línea, directamente en tu navegador. No se sube nada.',
  },

  hero: {
    h1: 'Comparar texto',
    tagline:
      'Pega dos textos y consulta las diferencias línea por línea — líneas añadidas, eliminadas y sin cambios resaltadas. Nada sale de tu navegador.',
  },

  intro: {
    h2: 'Diferencias línea por línea, todo en tu navegador',
    paras: [
      'Pega una versión original y una modificada de cualquier texto —código, un contrato, notas, un archivo de configuración— y esta herramienta resalta qué líneas se añadieron, se eliminaron o se quedaron igual. La comparación es línea por línea, no por palabra ni por carácter, lo que hace que el resultado sea fácil de revisar en la mayoría de las ediciones cotidianas.',
      'Hay un recuento en vivo de las líneas añadidas y eliminadas, y puedes copiar todas las diferencias con un clic para pegarlas en otro sitio: un comentario de revisión de código, un correo o tus notas.',
    ],
  },

  privacy: {
    h2: 'Por qué tu texto no sale de tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay un paso de subida porque no hay ningún servidor al que subir nada:',
    points: [
      'La comparación se ejecuta por completo en tu navegador.',
      'La página se sirve como archivos estáticos y no envía ninguna petición con ninguno de los textos que pegas.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo tú mismo, abre el panel de Red de tu navegador mientras comparas: ninguna petición lleva tu texto.',
    sourceLinkText: 'Leer el código fuente.',
  },

  howto: {
    h2: 'Cómo se usa',
    steps: [
      {
        h3: 'Pega el original',
        p: 'Pega o escribe la versión inicial de tu texto en el cuadro «Original».',
      },
      {
        h3: 'Pega la versión modificada',
        p: 'Pega o escribe la versión actualizada en el cuadro «Modificado». Las diferencias se actualizan mientras escribes.',
      },
      {
        h3: 'Lee las diferencias resaltadas',
        p: 'Las líneas añadidas llevan un + al inicio sobre fondo verde; las eliminadas llevan un - al inicio sobre fondo rojo y tachado; las líneas sin cambios se muestran sin ningún resaltado.',
      },
      {
        h3: 'Copiar o vaciar',
        p: 'Copia todas las diferencias al portapapeles con un clic, o vacía ambos cuadros para empezar de nuevo.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se sube mi texto a algún sitio?',
      a: 'No. La comparación se ejecuta por completo en tu navegador. No hay ningún componente de servidor, así que tu texto no tiene forma de salir del dispositivo. El código es abierto y puedes confirmarlo en el panel de Red de tu navegador.',
    },
    {
      q: '¿Compara palabra por palabra o carácter por carácter?',
      a: 'No: esta herramienta compara únicamente línea por línea. Un solo cambio de palabra dentro de una línea larga muestra la línea entera como eliminada y vuelta a añadir, en lugar de resaltar solo esa palabra. Comparar por palabra o por carácter es una posible mejora futura, no forma parte de esta herramienta hoy.',
    },
    {
      q: '¿Hay un límite de tamaño?',
      a: 'No hay un límite fijo. Un texto muy grande (aproximadamente 5MB o más) muestra un aviso breve, porque comparar y mostrar tanto texto puede tardar un momento y la escritura puede sentirse menos fluida, pero la comparación sigue ejecutándose por completo en tu dispositivo.',
    },
    {
      q: '¿Puedo soltar un archivo en lugar de pegar el texto?',
      a: 'Sí: suelta un archivo de texto plano (.txt, .md, .log, .csv) sobre cualquiera de los dos cuadros y su contenido se cargará ahí. Es una comodidad adicional a pegar o escribir, no un requisito.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda guardada en la caché, de modo que funciona sin conexión a la red. También puedes instalarla en tu pantalla de inicio.',
    },
    {
      q: '¿Qué cuenta como línea «añadida» o «eliminada» en el resumen?',
      a: 'Cada línea que aparece en el texto modificado pero no en esa posición del original cuenta como añadida; cada línea que aparece en el original pero no en el texto modificado cuenta como eliminada. Las líneas presentes en ambos textos, en el mismo orden, no tienen cambios y no se cuentan en ningún lado.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— pequeñas herramientas que funcionan localmente en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código se escribe con ayuda de IA; la revisión y las decisiones son del responsable del proyecto.',
    securityText: 'Seguridad',
  },
};
