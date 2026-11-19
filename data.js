/* ChapiGo — datos del piloto en Lourdes (Chapinero, Bogotá).
   Las calles, la plaza, la iglesia, el Parque de los Hippies y las estaciones son reales (OpenStreetMap).
   Los comercios, publicaciones y avisos son de ejemplo, ubicados en calles reales. */
window.CHAPI_DATA = (function () {
  'use strict';
  const M = window.LOURDES_MAP;
  const X = M.X;

  const ORIGIN = { label: 'Cra. 13 con Cl. 60', key: '13|60', pt: X['13|60'] };

  const CATS = [
    { id: 'todas', label: 'Todas' }, { id: 'comer', label: 'Comer' }, { id: 'cafes', label: 'Cafés para estudiar' },
    { id: 'noche', label: 'Planes de noche' }, { id: 'aire', label: 'Aire libre' }, { id: 'practico', label: 'Lo práctico' },
    { id: 'cultura', label: 'Cultura' }, { id: 'compras', label: 'Compras locales' }
  ];

  // open: [hora de apertura, hora de cierre]; si cierra después de medianoche, la segunda es menor.
  const PLACES = [
    { id: 'p1', door: [627, 535], name: 'Café Grano & Apunte', cat: 'cafes', icon: 'cup', zone: 'z65', addr: 'Cra. 11 # 64-38', price: '$$', level: 2,
      open: [7, 20], tags: ['Wifi', 'Enchufes', 'Accesible'], pt: [640, 541],
      about: 'Mesas largas con enchufe en cada puesto. Hasta las 5 p. m. es zona de silencio para estudiar.',
      ev: { kind: 'commerce', title: 'Café Grano & Apunte', text: 'Tinto + pandebono a $6.500 mostrando tu carné.' } },
    { id: 'p2', door: [483, 1101], name: 'La Sazón de la 59', cat: 'comer', icon: 'food', zone: 'z13', addr: 'Cl. 59 # 12-31', price: '$', level: 1,
      open: [11, 16], tags: ['Menú del día', 'Económico'], pt: [489, 1090],
      about: 'Corrientazo con sopa, seco y jugo natural. El menú cambia todos los días.',
      ev: { kind: 'commerce', title: 'Menú del día a $14.000', text: 'Hoy: ajiaco o pechuga a la plancha, con jugo de mora.' } },
    { id: 'p3', door: [733, 659], name: 'Librería La Hoja Suelta', cat: 'cultura', icon: 'book', zone: 'zplaza', addr: 'Cl. 64 # 9-62', price: '$$', level: 2,
      open: [10, 20], tags: ['Wifi', 'Zona de lectura', 'Libros usados'], pt: [739, 648],
      about: 'Libros nuevos y de segunda, con un rincón de lectura abierto al público y café de cortesía.',
      ev: { kind: 'news', title: 'Lectura abierta hoy', text: 'A las 7 p. m., entrada libre. Cupo para 30 personas.' } },
    { id: 'p4', door: [937, 676], name: 'Galería Muro Abierto', cat: 'cultura', icon: 'image', zone: 'z65', addr: 'Cl. 65 # 7-48', price: 'Gratis', level: 0,
      open: [10, 18], tags: ['Entrada libre', 'Arte local'], pt: [943, 666],
      about: 'Exposiciones de artistas jóvenes de Bogotá. Cambia de muestra cada mes.',
      ev: { kind: 'news', title: 'Nueva exposición', text: '“Calles que hablan”: fotografía de Chapinero. Entrada libre.' } },
    { id: 'p5', door: [675, 1090], name: 'Parque de los Hippies', cat: 'aire', icon: 'tree', zone: 'zhip', addr: 'Cra. 7 con Cl. 60', price: 'Gratis', level: 0,
      open: [0, 24], tags: ['Bancas', 'Iluminado', 'Mercado de pulgas'], pt: M.ref.hippies, real: true,
      about: 'El Parque Sucre, conocido como de los Hippies. Los fines de semana hay mercado de pulgas y música.',
      ev: { kind: 'news', title: 'En el parque', text: 'Los domingos hay mercado de pulgas desde las 10 a. m.' } },
    { id: 'p6', door: [492, 711], name: 'Punto Copia Lourdes', cat: 'practico', icon: 'printer', zone: 'zplaza', addr: 'Cra. 13 # 62-45', price: '$', level: 1,
      open: [7, 19], tags: ['Impresión', 'Papelería', 'Escáner'], pt: [480, 709],
      about: 'Impresión, fotocopias y anillados. Puedes enviar el archivo por correo y recogerlo listo.',
      ev: { kind: 'commerce', title: 'Punto Copia Lourdes', text: 'Impresión en blanco y negro a $300 la hoja.' } },
    { id: 'p7', door: [594, 460], name: 'Bar La Tarima', cat: 'noche', icon: 'music', zone: 'z65', addr: 'Cl. 65 # 12-20', price: '$$$', level: 3,
      open: [18, 2], tags: ['Música en vivo', 'Jueves de rock'], pt: [589, 471],
      about: 'Bandas en vivo de jueves a sábado. La calle tiene comercio abierto hasta tarde.',
      ev: { kind: 'commerce', title: 'Bar La Tarima', text: 'Jueves: cover gratis antes de las 9 p. m.' } },
    { id: 'p8', door: [509, 606], name: 'Plaza de Lourdes', cat: 'aire', icon: 'plaza', zone: 'zplaza', addr: 'Cra. 13 con Cl. 63', price: 'Gratis', level: 0,
      open: [0, 24], tags: ['Punto de encuentro', 'Iglesia de Lourdes'], pt: M.ref.plaza, real: true,
      about: 'La plaza frente a la Iglesia de Nuestra Señora de Lourdes, el punto de encuentro del sector.',
      ev: { kind: 'notice', title: 'Hora pico en la plaza', text: 'Hay mucha gente: guarda el celular en un bolsillo delantero.' } },
    { id: 'p9', door: [458, 918], name: 'Tienda Segunda Vuelta', cat: 'compras', icon: 'bag', zone: 'z13', addr: 'Cra. 13 # 60-58', price: '$$', level: 2,
      open: [10, 19], tags: ['Segunda mano', 'Diseño local'], pt: [469, 920],
      about: 'Ropa de segunda seleccionada y marcas de diseñadores de la ciudad.',
      ev: { kind: 'commerce', title: 'Tienda Segunda Vuelta', text: 'Hoy: 20 % de descuento en chaquetas.' } },
    { id: 'tm', door: [288, 1135], name: 'Estación Calle 57', cat: 'practico', icon: 'bus', zone: 'z57', addr: 'Av. Caracas con Cl. 58', price: 'Gratis', level: 0,
      open: [4, 23], tags: ['TransMilenio', 'Estación temporal'], pt: M.ref.tm57, real: true, hidden: true,
      about: 'Estación temporal de TransMilenio mientras avanzan las obras del Metro en la Caracas.',
      ev: { kind: 'news', title: 'TransMilenio', text: 'Ten lista tu tarjeta TuLlave antes del torniquete.' } }
  ];
  const DESTINOS = ['p1', 'p8', 'p3', 'p5', 'p2', 'p9', 'p4', 'p7', 'p6'];

  // Fotos con licencia libre de Wikimedia Commons. Los lugares reales llevan su propia foto;
  // los comercios de ejemplo usan una foto ilustrativa.
  const PHOTO = {
    p1: { author: 'Takeaway', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:2019_02_Awesome_Coffee_Shop_in_Korat.jpg' },
    p2: { author: 'Jdvillalobos', license: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Ajiaco-santafere%C3%B1o.JPG' },
    p3: { author: 'Simon Williams-Im', license: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Bookstore%2C_Haifa_(23306600434).jpg' },
    p4: { author: 'Chongkian', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Melaka_Art_Gallery_-_Exhibition_Hall.jpg' },
    p5: { author: 'Felipe Restrepo Acosta', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Parque_Sucre_de_los_Hippies.JPG' },
    p6: { author: 'Friedrich Haag', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:001_2019_12_03_Bueromaterial.jpg' },
    p7: { author: 'Brian McNeil', license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Bannermans%2C_vaulted_cellar_stage_02.jpeg' },
    p8: { author: 'Felipe Restrepo Acosta', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Torre_central_de_la_iglesia_de_Lourdes_en_Bogot%C3%A1.JPG' },
    p9: { author: 'MAKY.OREL', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Clothing_racks_in_second_hand_shop%2C_Prague.jpg' },
    tm: { author: 'Felipe Restrepo Acosta', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Bogot%C3%A1_estaci%C3%B3n_calle_57_Transmilenio.JPG' }
  };

  // Zonas del piloto: sirven para publicar, filtrar la comunidad y recibir avisos.
  const ZONES = [
    { id: 'zplaza', name: 'Plaza de Lourdes', short: 'Plaza', pt: [585, 650], r: 130 },
    { id: 'z13', name: 'Cra. 13 · Calles 59 a 62', short: 'Cra. 13', pt: [468, 905], r: 150 },
    { id: 'zhip', name: 'Parque de los Hippies', short: 'Hippies', pt: [690, 1105], r: 120 },
    { id: 'z65', name: 'Cra. 11 · Calle 65', short: 'Calle 65', pt: [655, 500], r: 140 },
    { id: 'z63', name: 'Caracas · Estación Calle 63', short: 'Caracas 63', pt: [360, 770], r: 120 },
    { id: 'z57', name: 'Caracas · Estación Calle 57', short: 'Caracas 57', pt: [300, 1170], r: 130 }
  ];
  const HOME_ZONE = 'z13';

  const TYPES = {
    seguridad: { label: 'Seguridad', hint: 'Robo o intento', yes: 'Sigue pasando', no: 'Ya no', expires: 'Caduca en 6 h' },
    calle: { label: 'Calle', hint: 'Obra, luz, andén', yes: 'Sigue así', no: 'Ya no', expires: 'Hasta que se confirme' },
    recomienda: { label: 'Recomienda', hint: 'Un lugar o dato', yes: 'Útil', no: 'No útil', expires: 'Permanente' },
    evento: { label: 'Evento', hint: 'Algo que pasa hoy', yes: 'Me interesa', no: 'No', expires: 'Hasta el evento' },
    pregunta: { label: 'Pregunta', hint: 'Pide un dato', yes: 'Útil', no: 'No útil', expires: 'Caduca en 7 días' }
  };
  const TYPE_ICON = { seguridad: 'alert', calle: 'cone', recomienda: 'star', evento: 'calendar', pregunta: 'question' };

  const POSTS = [
    { id: 'c1', type: 'seguridad', text: 'Intento de robo de celular en la Cra. 13 con Cl. 62', zone: 'z13', time: 'Hace 15 min', yes: 4, no: 0, pt: [496, 748] },
    { id: 'c2', type: 'calle', text: 'Obra cierra el andén de la Cl. 61 entre Cras. 11 y 13', zone: 'z13', time: 'Hace 1 h', yes: 7, no: 1, pt: [507, 874] },
    { id: 'c7', type: 'calle', text: 'Andén angosto junto a la obra del Metro en la Caracas con Cl. 60', zone: 'z63', time: 'Hace 2 h', yes: 11, no: 0, pt: [330, 930] },
    { id: 'c6', type: 'calle', text: 'Poste sin luz en la Cl. 64 con Cra. 10', zone: 'zplaza', time: 'Hace 3 h', yes: 5, no: 0, pt: [692, 634] },
    { id: 'c3', type: 'recomienda', text: 'Almuerzo con sopa y jugo a $14.000 en la Cl. 59', zone: 'z13', time: 'Hace 3 h', yes: 12, no: 1, pt: [489, 1090], placeId: 'p2' },
    { id: 'c4', type: 'evento', text: 'Lectura abierta esta noche en La Hoja Suelta', zone: 'zplaza', time: 'Hoy, 7 p. m.', yes: 9, no: 0, pt: [739, 648], placeId: 'p3' },
    { id: 'c5', type: 'pregunta', text: '¿Dónde imprimir barato cerca de la plaza?', zone: 'zplaza', time: 'Hace 2 h', yes: 3, no: 0, pt: [585, 650] },
    { id: 'c8', type: 'evento', text: 'Domingo de mercado de pulgas en el Parque de los Hippies', zone: 'zhip', time: 'Domingo', yes: 15, no: 0, pt: M.ref.hippies, placeId: 'p5' }
  ];
  const COMMENTS = {
    c1: [
      { id: 'k1', who: 'Estudiante · Cra. 13', initials: 'EC', text: 'Pasé hace un rato y ya había policía en la esquina.', time: 'Hace 10 min' },
      { id: 'k2', who: 'ChapiGo IA', initials: 'IA', ai: true, text: 'Gracias por confirmar. Si vas hacia la plaza, sigue por la Cra. 13, que tiene comercio abierto, y guarda el celular.', time: 'Hace 9 min' }
    ],
    c2: [{ id: 'k3', who: 'Vecina del sector', initials: 'VS', text: 'Sigue cerrado, toca pasar por el andén del frente.', time: 'Hace 30 min' }],
    c7: [{ id: 'k6', who: 'Estudiante · Caracas', initials: 'EC', text: 'De noche ese tramo queda muy oscuro, mejor bajar por la 13.', time: 'Hace 1 h' }],
    c3: [{ id: 'k4', who: 'Estudiante · Cra. 13', initials: 'EC', text: 'Confirmo, y el jugo es de fruta natural.', time: 'Hace 2 h' }],
    c5: [{ id: 'k5', who: 'Estudiante · Plaza', initials: 'EP', text: 'En Punto Copia Lourdes, sobre la 13, la hoja sale a $300.', time: 'Hace 1 h' }]
  };

  // Avisos que aparecen al pasar por ciertas esquinas durante una ruta.
  const CORNER_EV = {
    '13|62': { kind: 'notice', title: 'Reporte reciente', text: 'Intento de robo reportado hace 15 min en esta esquina. Guarda el celular.', postId: 'c1' },
    '13|61': { kind: 'notice', title: 'Andén cerrado', text: 'La obra de la Cl. 61 cierra el andén. Cruza por el costado norte.', postId: 'c2' },
    '13|63': { kind: 'commerce', title: 'Punto Copia Lourdes', text: 'Impresión a $300 la hoja, a media cuadra.', placeId: 'p6' },
    '13|64': { kind: 'news', title: 'Plaza de Lourdes', text: 'Estás junto a la plaza: punto de encuentro con buena luz y gente.', placeId: 'p8' },
    '14|60': { kind: 'notice', title: 'Obras del Metro', text: 'El andén de la Caracas es angosto en este tramo. Ve con cuidado.', postId: 'c7' },
    '9|60': { kind: 'news', title: 'Parque de los Hippies', text: 'A una cuadra: los domingos hay mercado de pulgas.', placeId: 'p5' },
    '10|64': { kind: 'notice', title: 'Poste sin luz', text: 'Esta esquina está oscura de noche. Hay más luz sobre la Cl. 64 hacia la 13.', postId: 'c6' },
    '11|64': { kind: 'commerce', title: 'Café Grano & Apunte', text: 'A media cuadra: tinto + pandebono a $6.500.', placeId: 'p1' },
    '13|59': { kind: 'commerce', title: 'La Sazón de la 59', text: 'Menú del día a $14.000, a media cuadra de tu ruta.', placeId: 'p2' },
    '13|57': { kind: 'notice', title: 'Cruce de la Cl. 57', text: 'Cruza en el semáforo: hay mucho tráfico hacia la Caracas.' },
    '14|57': { kind: 'news', title: 'Estación temporal', text: 'Por las obras del Metro, entra por el acceso peatonal del costado norte.' }
  };

  const TOURS = [
    { id: 'r1', name: 'Entre clases', time: '30 min', tf: '30', price: '$', note: 'Imprimir y estudiar cerca de la plaza', stops: ['p6', 'p1'] },
    { id: 'r2', name: 'Ruta cultural', time: '1 h', tf: '60', price: 'Gratis', note: 'Plaza, librería y galería', stops: ['p8', 'p3', 'p4'] },
    { id: 'r3', name: 'Tarde en Lourdes', time: '2 h', tf: '120', price: '$$', note: 'Almuerzo, compras y parque', stops: ['p2', 'p9', 'p5'] },
    { id: 'r5', name: 'Noche tranquila', time: '1 h', tf: '60', price: '$$$', note: 'Por calles con gente hasta el bar', stops: ['p8', 'p7'], night: true },
    { id: 'r4', name: 'Regreso seguro', time: '15 min', tf: '30', price: 'Gratis', note: 'Hasta TransMilenio por calles con gente', stops: ['tm'], safe: true }
  ];

  const NEWS = [
    { kind: 'notice', title: 'Reporte de la comunidad', text: 'Intento de robo de celular en la Cra. 13 con Cl. 62. Toma la ruta segura.', time: 'Hace 15 min', postId: 'c1' },
    { kind: 'notice', title: 'Obras del Metro en la Caracas', text: 'Andenes angostos entre las calles 57 y 63. Si vas a TransMilenio, baja por la Cra. 13.', time: 'Hoy', postId: 'c7' },
    { kind: 'commerce', title: 'Menú del día a $14.000', text: 'La Sazón de la 59, hasta las 3 p. m.', time: 'Hace 1 h', placeId: 'p2' },
    { kind: 'news', title: 'Lectura abierta esta noche', text: 'A las 7 p. m. en Librería La Hoja Suelta, Cl. 64.', time: 'Hoy', placeId: 'p3' },
    { kind: 'news', title: 'Mercado de pulgas', text: 'Domingo en el Parque de los Hippies, desde las 10 a. m.', time: 'Domingo', placeId: 'p5' }
  ];

  const LANDMARKS = [
    { id: 'iglesia', label: 'Iglesia de Lourdes', icon: 'plaza', pt: M.ref.iglesia, kind: 'worship' },
    { id: 'tm63', label: 'TM Calle 63', icon: 'bus', pt: M.ref.tm63, kind: 'bus' },
    { id: 'tm57', label: 'TM Calle 57', icon: 'bus', pt: M.ref.tm57, kind: 'bus' },
    { id: 'lasalle', label: 'U. de La Salle', icon: 'book', pt: M.ref.lasalle, kind: 'campus' }
  ];

  const UNIVERSITIES = ['Universidad de La Salle', 'Universidad Pedagógica Nacional', 'Universidad Santo Tomás', 'Pontificia Universidad Javeriana', 'Universidad Católica de Colombia', 'Otra'];

  const FAQ = [
    ['¿Cómo elige ChapiGo la ruta segura?', 'Prefiere calles con comercio abierto y buena luz, como la Cra. 13, y evita los tramos con reportes recientes de la comunidad o con obras. Por eso a veces tarda un par de minutos más que la ruta rápida.'],
    ['¿Quién puede publicar en Comunidad?', 'Cualquier estudiante que verifique su correo universitario. Puedes publicar como anónimo: los demás solo ven la zona aproximada.'],
    ['¿Cuánto dura un reporte?', 'Los de seguridad caducan a las 6 horas. Los de calle siguen visibles hasta que otros estudiantes confirmen que ya no pasa.'],
    ['¿Qué pasa con mi ubicación?', 'Solo se usa mientras la app está abierta para calcular rutas. No guardamos tu historial de recorridos.'],
    ['¿Funciona fuera de Lourdes?', 'Esta versión es un piloto en Lourdes, entre las calles 57 y 67. La idea es crecer a todo Chapinero Central.']
  ];

  const RULES = [
    ['shield', 'Cuida a las personas', 'No describas ni señales a nadie por su apariencia. Reporta lo que pasa, no a quién.'],
    ['image', 'Sin fotos de personas', 'Las publicaciones no llevan fotos. Así nadie queda expuesto.'],
    ['check', 'Datos que sirvan', 'Di dónde y cuándo, en pocas palabras. Si ya no pasa, márcalo para que otros lo sepan.'],
    ['users', 'Respeto siempre', 'Nada de insultos, discriminación ni publicidad. Lo que no cumpla se oculta.'],
    ['phone', 'Emergencias al 123', 'ChapiGo no reemplaza a la Policía. Si estás en peligro, llama primero al 123.']
  ];

  return { M, X, ORIGIN, CATS, PLACES, DESTINOS, PHOTO, ZONES, HOME_ZONE, TYPES, TYPE_ICON, POSTS, COMMENTS, CORNER_EV, TOURS, NEWS, LANDMARKS, UNIVERSITIES, FAQ, RULES };
})();
