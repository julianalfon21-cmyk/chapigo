/* ChapiGo — prototipo funcional, piloto en Lourdes (Chapinero, Bogotá).
   Toda la app vive en un estado; cada cambio vuelve a dibujar la vista.
   Los botones llevan data-act con el nombre de la acción que ejecutan. */
(function () {
  'use strict';
  const D = window.CHAPI_DATA;
  const G = window.CHAPI_GEO;
  const { ORIGIN, CATS, PLACES, DESTINOS, PHOTO, ZONES, HOME_ZONE, TYPES, TYPE_ICON, CORNER_EV, TOURS, NEWS, LANDMARKS, UNIVERSITIES, FAQ, RULES } = D;
  const MAPL = D.M;

  // ---------- Íconos ----------
  const ICON = {
    back: '<path d="M15 5l-7 7 7 7"/>',
    chevron: '<path d="M9 5l7 7-7 7"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    sliders: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17.5v.5"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/>',
    bookmark: '<path d="M6 3h12v18l-6-4.5L6 21z"/>',
    route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14a6 6 0 0 1 3.5 6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',
    up: '<path d="M12 20V5M6 11l6-6 6 6"/>',
    down: '<path d="M12 4v15M6 13l6 6 6-6"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    cup: '<path d="M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 9h2a3 3 0 0 1 0 6h-2"/><path d="M8 3v2M12 3v2"/>',
    food: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10"/><path d="M17 3c-2 2-2 6 0 8v10"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
    tree: '<path d="M12 3l6 9h-4l4 6H6l4-6H6z"/><path d="M12 18v3"/>',
    printer: '<path d="M7 8V3h10v5"/><rect x="4" y="8" width="16" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    plaza: '<path d="M12 2v4M10 4h4"/><path d="M6 21V11l6-5 6 5v10"/><path d="M10 21v-5h4v5"/>',
    bus: '<rect x="5" y="3" width="14" height="15" rx="3"/><path d="M5 11h14M8 21l1-3M16 21l-1-3"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    news: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h6"/>',
    store: '<path d="M3 9l1-5h16l1 5"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>',
    spark: '<path d="M12 3l1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
    send: '<path d="M4 12l16-8-6 16-2-7z"/>',
    expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    shrink: '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cone: '<path d="M9.5 3h5l3.5 15h-12z"/><path d="M4 21h16M8.2 9h7.6M7 14h10"/>',
    star: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14"/><path d="M12 17.5v.5"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    locate: '<circle cx="12" cy="12" r="3.5"/><circle cx="12" cy="12" r="8"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    logout: '<path d="M15 4h4v16h-4"/><path d="M10 8l-4 4 4 4M6 12h10"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    walk: '<circle cx="13" cy="4.5" r="2"/><path d="M9 21l3-7 3 3v4"/><path d="M8 11l3-4 3 2 3 3"/><path d="M11 7l-1 5"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 20h14"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    iosShare: '<path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11v9h12v-9"/>',
    plusSquare: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8v8M8 12h8"/>',
    dots: '<circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.5M14 21h3M20 18v3"/>'
  };
  const svg = (name, size = 22, sw = 2) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name] || ''}</svg>`;
  const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const on = (cond) => (cond ? 'on' : '');
  const EV = {
    commerce: { label: 'Comercio en tu ruta', icon: 'store' },
    notice: { label: 'Aviso', icon: 'alert' },
    news: { label: 'Noticia del sector', icon: 'news' },
    info: { label: 'ChapiGo', icon: 'check' }
  };
  const CAT_LABEL = Object.fromEntries(CATS.map((c) => [c.id, c.label]));
  const PRICE_LABEL = { '$': 'Hasta $15 mil', '$$': '$15 a 30 mil', '$$$': 'Más de $30 mil', 'Gratis': 'Gratis' };
  const PLACE = Object.fromEntries(PLACES.map((p) => [p.id, p]));
  const ZONE = Object.fromEntries(ZONES.map((z) => [z.id, z]));

  // ---------- Instalar la app ----------
  // En el celular se instala desde la página publicada: Android muestra su propio aviso de instalación
  // y en iPhone se agrega desde Compartir → Agregar a inicio.
  const SITE = window.CHAPI_SITE || '';
  const SHARE = window.CHAPI_SHARE || SITE;
  const UA = navigator.userAgent || '';
  const isIOS = /iphone|ipad|ipod/i.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/i.test(UA);
  const inAppBrowser = /FBAN|FBAV|Instagram|Line\/|WhatsApp|TikTok|Snapchat/i.test(UA);
  const embedded = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
  const standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  const install = { prompt: null, done: standalone };
  const showInstall = () => !install.done;

  // ---------- Horarios ----------
  const hourNow = () => { const d = new Date(); return d.getHours() + d.getMinutes() / 60; };
  const always = (p) => p.open[0] === 0 && p.open[1] === 24;
  function isOpen(p) {
    if (always(p)) return true;
    const [a, b] = p.open; const h = hourNow();
    return a < b ? h >= a && h < b : h >= a || h < b;
  }
  const fmtH = (h) => { const x = h % 24; if (x === 0) return '12 a. m.'; if (x === 12) return '12 m.'; return x < 12 ? `${x} a. m.` : `${x - 12} p. m.`; };
  const hoursLabel = (p) => (always(p) ? 'Abierto 24 h' : `${fmtH(p.open[0])} – ${fmtH(p.open[1])}`);
  const openLabel = (p) => (always(p) ? 'Abierto siempre' : isOpen(p) ? `Abierto · cierra a las ${fmtH(p.open[1])}` : `Cerrado · abre a las ${fmtH(p.open[0])}`);

  // ---------- Estado (lo personal se guarda en el celular) ----------
  const STORE = 'chapigo-v2';
  const PERSIST = ['interests', 'budget', 'freeTime', 'saved', 'savedTours', 'savedZones', 'zoneNotif', 'myTour', 'verified', 'notif', 'profile', 'contact', 'privacy', 'tripsDone', 'onboarded'];
  function loadTheme() { try { return localStorage.getItem('chapigo-theme') || 'system'; } catch (e) { return 'system'; } }
  function loadStore() { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { return {}; } }
  function defaults() {
    return {
      screen: 'launch', tab: 'explorar', sub: null,
      theme: loadTheme(),
      interests: ['comer', 'cafes'], editing: false, budget: 'b2', freeTime: 't2',
      q: '', cat: 'todas', filtersOpen: false, newsOpen: false, newsSeen: false,
      f: { abierto: false, cerca: false, wifi: false }, maxLevel: 3,
      layer: true, showMap: true, placeId: 'p1',
      saved: ['p3'], savedTours: ['r2'], savedZones: ['zplaza', 'z13'], zoneNotif: { zplaza: true, z13: true }, myTour: [],
      route: 'segura', vibrate: true, shareRoute: false, navStep: 0, trip: { kind: 'place', id: 'p1' },
      tourTime: 'all', tourId: 'r1',
      commType: 'todo', commScope: 'todo', postId: 'c1', votes: {}, flagged: [],
      posts: D.POSTS.map((p) => Object.assign({ expires: TYPES[p.type].expires }, p)),
      comments: JSON.parse(JSON.stringify(D.COMMENTS)),
      commentDraft: '', draftType: 'calle', draftZone: HOME_ZONE, draftPt: null, draftText: '', anon: true,
      savedSeg: 'lugares', verified: false, sheet: null, verifyEmail: '', verifyBusy: false,
      notif: { seguridad: true, obras: true, eventos: false },
      profile: { name: '', uni: '', program: '' }, contact: { name: '', phone: '' },
      privacy: { location: true, approx: true, history: false },
      tripsDone: 0, onboarded: false, welcomed: false,
      mapSel: null, mapCat: 'todas', mapQ: '', helpMsg: ''
    };
  }
  const state = Object.assign(defaults(), (() => { const s = loadStore(); const o = {}; PERSIST.forEach((k) => { if (s[k] !== undefined) o[k] = s[k]; }); return o; })());
  let saveTimer = null;
  function persist() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { const o = {}; PERSIST.forEach((k) => { o[k] = state[k]; }); localStorage.setItem(STORE, JSON.stringify(o)); } catch (e) { /* sin almacenamiento */ }
    }, 250);
  }

  // Dirección de la siguiente transición: forward, back o tab.
  let nextDir = 'forward';
  function set(patch, dir) {
    if (dir) nextDir = dir;
    Object.assign(state, typeof patch === 'function' ? patch(state) : patch);
    render();
    persist();
  }
  function applyTheme() {
    const root = document.documentElement;
    if (state.theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', state.theme);
    try { localStorage.setItem('chapigo-theme', state.theme); } catch (e) { /* sin almacenamiento */ }
  }

  // Historial para el botón Volver: cada pantalla nueva guarda dónde estabas.
  const hist = [];
  const LOC = ['tab', 'sub', 'placeId', 'tourId', 'postId', 'trip', 'mapSel'];
  const here = () => { const o = {}; LOC.forEach((k) => { o[k] = state[k]; }); return o; };
  function go(patch) {
    hist.push(here());
    set(Object.assign({ filtersOpen: false, newsOpen: false, sheet: null }, patch), 'forward');
  }
  function back() {
    closePush();
    const prev = hist.pop();
    set(Object.assign({ filtersOpen: false, newsOpen: false, sheet: null, navStep: 0 }, prev || { sub: null }), 'back');
  }

  // ---------- Notificaciones tipo celular ----------
  const layer = document.getElementById('layer');
  let pushTimer = null;
  function push(ev, ms = 4500) {
    clearTimeout(pushTimer);
    const k = EV[ev.kind] || EV.info;
    const action = ev.placeId ? `<button class="linkbtn" data-act="openPlace" data-id="${ev.placeId}">Ver</button>`
      : ev.postId ? `<button class="linkbtn" data-act="openPost" data-id="${ev.postId}">Ver</button>` : '';
    layer.innerHTML = `<div class="push ${ev.kind || 'info'}" role="status">
        <span class="ev-icon">${svg(k.icon, 20)}</span>
        <span class="grow">${ev.title ? `<small>${k.label}</small><b>${esc(ev.title)}</b>` : ''}<p>${esc(ev.text)}</p></span>
        ${action}<button class="round" data-act="closePush" aria-label="Cerrar aviso">${svg('x', 16, 2.5)}</button></div>`;
    pushTimer = setTimeout(closePush, ms);
  }
  function closePush() {
    clearTimeout(pushTimer);
    const el = layer.firstElementChild;
    if (!el) return;
    el.classList.add('leaving');
    setTimeout(() => { if (layer.firstElementChild === el) layer.innerHTML = ''; }, 300);
  }
  const toast = (text) => push({ kind: 'info', text }, 2600);

  // ---------- Respuestas de la IA en los comentarios ----------
  let sampleFn = null;
  try {
    if (window.claude && typeof window.claude.use === 'function') {
      window.claude.use('sample').then((s) => { sampleFn = s; }).catch(() => { sampleFn = null; });
    }
  } catch (e) { sampleFn = null; }
  function fallbackReply(text) {
    const t = text.toLowerCase();
    if (/robo|robaron|atrac|peligr|miedo|insegur|ladr/.test(t)) return 'Gracias por avisar. Si algo está pasando ahora, llama al 123; mientras tanto, la ruta segura te lleva por la Cra. 13, que tiene comercio abierto.';
    if (/obra|andén|anden|cerrad|hueco|luz|poste|oscur|metro/.test(t)) return 'Gracias, marcamos el punto en el mapa y las rutas seguras ya lo evitan.';
    if (/comida|almuerzo|café|cafe|precio|barato|menú|menu/.test(t)) return 'Buen dato. Lo sumamos a las recomendaciones de la zona para quienes buscan algo económico.';
    if (t.includes('?')) return 'Buena pregunta. Otros estudiantes de la zona pueden responderte aquí; también puedes buscar en Explorar con el filtro de presupuesto.';
    return 'Gracias por tu aporte. Lo sumamos a la publicación para que más estudiantes lo vean.';
  }
  async function aiReply(p, userText, onText) {
    if (!sampleFn) {
      await new Promise((r) => setTimeout(r, 900));
      return fallbackReply(userText);
    }
    const prompt = `Eres el asistente de la comunidad de ChapiGo, una app para estudiantes universitarios que caminan por Lourdes, en Chapinero (Bogotá), entre las calles 57 y 67, la Av. Caracas y la Cra. 7.
Responde en español de Colombia, en máximo dos frases cortas, con un tono cercano y útil.
Reglas: no describas ni señales personas por su apariencia; si hay peligro inmediato, recomienda llamar a la línea 123; no inventes datos oficiales; si preguntan cómo llegar, sugiere usar la ruta segura de la app.
Publicación (${TYPES[p.type].label}, zona ${ZONE[p.zone] ? ZONE[p.zone].name : 'Lourdes'}, ${p.time}): "${p.text}"
Comentario del estudiante: "${userText}"
Escribe solo el texto de tu respuesta.`;
    try {
      const res = await sampleFn(prompt, { modelTier: 'quick', cache: false, onText: ({ text }) => onText(text) });
      return ((res && res.text) || '').trim() || fallbackReply(userText);
    } catch (e) {
      return fallbackReply(userText);
    }
  }
  function updateComment(postId, id, patch, rerender) {
    const list = (state.comments[postId] || []).map((c) => (c.id === id ? Object.assign({}, c, patch) : c));
    state.comments = Object.assign({}, state.comments, { [postId]: list });
    if (rerender) render();
  }
  function sendComment() {
    const text = state.commentDraft.trim();
    if (!text) return toast('Escribe tu comentario');
    const p = post();
    const stamp = Date.now();
    const aiId = 'a' + stamp;
    const me = state.profile.name && !state.anon ? state.profile.name : 'Tú';
    const list = (state.comments[p.id] || []).concat(
      { id: 'm' + stamp, who: me, initials: initials(state.profile.name), text, time: 'Ahora', mine: true },
      { id: aiId, who: 'ChapiGo IA', initials: 'IA', ai: true, pending: true, text: '', time: 'Ahora' });
    set({ comments: Object.assign({}, state.comments, { [p.id]: list }), commentDraft: '' });
    aiReply(p, text, (partial) => {
      const el = document.getElementById('txt-' + aiId);
      if (el) el.textContent = partial;
      updateComment(p.id, aiId, { text: partial }, false);
    }).then((final) => updateComment(p.id, aiId, { text: final, pending: false }, true));
  }

  // ---------- Consultas ----------
  const place = () => PLACE[state.placeId] || PLACES[0];
  const post = () => state.posts.find((p) => p.id === state.postId) || state.posts[0];
  const initials = (n) => ((n || '').trim() ? n.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase() : 'TÚ');
  const visiblePost = (id) => { const p = state.posts.find((x) => x.id === id); return p && !state.flagged.includes(id) && p.yes >= p.no; };
  const livePosts = () => state.posts.filter((p) => !state.flagged.includes(p.id));
  function hazards() { return livePosts().filter((p) => (p.type === 'seguridad' || p.type === 'calle') && p.pt && p.yes >= p.no); }
  const mapAlerts = () => hazards();
  let hzVer = 0;
  const rcache = {};
  function route(a, b, mode) {
    const k = `${a.join(',')}>${b.join(',')}|${mode}|${hzVer}`;
    return rcache[k] || (rcache[k] = G.routeBetween(a, b, mode, hazards()));
  }
  const doorOf = (p) => p.door || p.pt;
  const placeRoute = (id, mode) => route(ORIGIN.pt, doorOf(PLACE[id]), mode);
  const walkMin = (id) => G.minutes(placeRoute(id, 'safe').len);
  function mineTour() {
    const stops = state.myTour.filter((id) => PLACE[id]);
    const lv = Math.max(0, ...stops.map((id) => PLACE[id].level));
    return { id: 'mine', name: 'Mi recorrido', stops, price: ['Gratis', '$', '$$', '$$$'][lv], note: 'Armado por ti', mine: true };
  }
  const tourById = (id) => (id === 'mine' ? mineTour() : TOURS.find((t) => t.id === id) || TOURS[0]);
  const tour = () => tourById(state.tourId);

  // Plan de un viaje: un lugar (ruta segura o rápida) o un recorrido con varias paradas.
  function tripPlan(trip, mode) {
    if (trip.kind === 'tour') {
      const t = tourById(trip.id);
      const stops = t.stops.filter((id) => PLACE[id]);
      let from = ORIGIN.pt; let pts = []; let len = 0; let steps = []; const legs = [];
      stops.forEach((id, i) => {
        const p = PLACE[id];
        const r = route(from, doorOf(p), 'safe');
        legs.push(r); pts = pts.concat(r.pts); len += r.len;
        steps = steps.concat(G.stepsFor(r));
        if (i < stops.length - 1) steps.push({ txt: `Parada ${i + 1}: ${p.name}`, sub: `${p.addr} · cuando quieras seguir, toca Siguiente`, stop: id, at: p.pt, corners: [] });
        from = doorOf(p);
      });
      return { legs, pts, len, steps, dest: PLACE[stops[stops.length - 1]], stops, tour: t };
    }
    const p = PLACE[trip.id];
    const r = route(ORIGIN.pt, doorOf(p), mode);
    return { legs: [r], pts: r.pts, len: r.len, steps: G.stepsFor(r), dest: p, stops: [p.id] };
  }
  const tripMode = () => (state.route === 'rapida' ? 'fast' : 'safe');

  function visiblePlaces() {
    const s = state;
    const q = s.q.trim().toLowerCase();
    return PLACES.filter((p) => !p.hidden)
      .filter((p) => s.cat === 'todas' || p.cat === s.cat)
      .filter((p) => p.level <= s.maxLevel)
      .filter((p) => !s.f.abierto || isOpen(p))
      .filter((p) => !s.f.wifi || p.tags.includes('Wifi'))
      .filter((p) => !s.f.cerca || walkMin(p.id) <= 5)
      .filter((p) => !q || `${p.name} ${CAT_LABEL[p.cat]} ${p.addr} ${p.tags.join(' ')}`.toLowerCase().includes(q))
      .sort((a, b) => walkMin(a.id) - walkMin(b.id));
  }
  const countLabel = (n) => (n === 1 ? '1 lugar' : `${n} lugares`);
  const nearPlaces = (p, n) => PLACES.filter((o) => o.id !== p.id && !o.hidden).sort((a, b) => G.dist(a.pt, p.pt) - G.dist(b.pt, p.pt)).slice(0, n);
  const zonePosts = (zid) => livePosts().filter((p) => p.zone === zid);
  const zoneAlerts = (zid) => hazards().filter((p) => p.zone === zid);

  // ---------- Piezas ----------
  function greet() {
    const h = new Date().getHours();
    return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
  }
  const bell = () => `<button class="round" data-act="openNews" aria-label="Novedades del sector">${svg('bell')}${state.newsSeen ? '' : '<span class="badge">3</span>'}</button>`;
  const firstName = () => (state.profile.name || '').trim().split(/\s+/)[0];
  const homeHeader = () => `<div class="header"><button class="avatar" data-act="tab" data-v="perfil" aria-label="Tu perfil">${initials(state.profile.name)}</button>
      <div class="hello grow"><span>${greet()}</span><b>Hola, ${esc(firstName() || 'estudiante')}</b></div>${installPill()}${bell()}</div>`;
  const tabHeader = (eyebrow, title, right) => `<div class="header"><div class="grow"><span class="label">${eyebrow}</span><h1 class="display t-l" style="margin-top:2px">${title}</h1></div>${right || bell()}</div>`;
  const topbar = (title, right = '<span style="width:46px"></span>') =>
    `<div class="between topbar"><button class="round" data-act="back" aria-label="Volver">${svg('back')}</button><span class="label">${title}</span>${right}</div>`;
  const themeSeg = () => `<div class="seg">${[['light', 'Claro'], ['dark', 'Oscuro'], ['system', 'Auto']]
    .map(([id, label]) => `<button class="${on(state.theme === id)}" data-act="theme" data-v="${id}">${label}</button>`).join('')}</div>`;
  const swBtn = (act, k, isOn, label) => `<button class="sw ${on(isOn)}" data-act="${act}" data-k="${k}" role="switch" aria-checked="${!!isOn}" aria-label="${esc(label)}"><span></span></button>`;
  const sw = (act, k, isOn, label, hint) => `<div class="swrow"><span>${label}${hint ? `<small>${hint}</small>` : ''}</span>${swBtn(act, k, isOn, label)}</div>`;
  const action = (icon, label, attrs, variant = '') => `<button class="action ${variant}" ${attrs}><span class="circle">${svg(icon)}</span>${label}</button>`;
  const placeImg = (id) => `<img src="assets/places/${id}-thumb.jpg" alt="" loading="lazy">`;
  const stateBadge = (open) => `<span class="state ${open ? 'ok' : 'no'}" title="${open ? 'Abierto ahora' : 'Cerrado ahora'}" aria-label="${open ? 'Abierto ahora' : 'Cerrado ahora'}">${svg(open ? 'check' : 'clock', 14, 2.6)}</span>`;
  const txPlace = (p, extra = '') => `<button class="tx cat-${p.cat}" data-act="openPlace" data-id="${p.id}" ${extra}>
      <span class="ava">${placeImg(p.id)}</span>
      <span class="info"><b>${esc(p.name)}</b><span><span class="catlabel">${CAT_LABEL[p.cat]}</span> · ${walkMin(p.id)} min a pie</span></span>
      <span class="end"><span class="amt">${p.price}</span>${stateBadge(isOpen(p))}</span></button>`;
  const personPlace = (p) => `<button class="person cat-${p.cat}" data-act="openPlace" data-id="${p.id}"><span class="ring">${placeImg(p.id)}</span><span>${esc(p.name)}</span></button>`;
  function eventCard(ev) {
    const k = EV[ev.kind];
    const act = ev.placeId ? `<button class="linkbtn" data-act="openPlace" data-id="${ev.placeId}">Ver lugar</button>`
      : ev.postId ? `<button class="linkbtn" data-act="openPost" data-id="${ev.postId}">Ver reporte</button>` : '';
    return `<div class="event ev-${ev.kind}"><span class="ev-icon">${svg(k.icon, 20)}</span>
      <span class="grow"><span class="tag ${ev.kind}">${k.label}</span><b style="display:block;margin-top:6px">${esc(ev.title)}</b><span class="small muted">${esc(ev.text)}</span>${act ? `<br>${act}` : ''}</span></div>`;
  }
  const brand = (w) => `<img class="brand logo-light" src="assets/logo-light.png" alt="ChapiGo, Chapinero Central" style="width:${w}px">
      <img class="brand logo-dark" src="assets/logo-dark.png" alt="ChapiGo, Chapinero Central" style="width:${w}px">`;
  const postMeta = (p) => `${esc(ZONE[p.zone] ? ZONE[p.zone].name : 'Lourdes')} · ${p.time}${p.anon ? ' · Anónimo' : ''}`;
  const listrow = (act, icon, label, sub, attrs = '') => `<button class="listrow" data-act="${act}" ${attrs}><span class="round" aria-hidden="true">${svg(icon, 19)}</span><span class="grow">${label}${sub ? `<small>${sub}</small>` : ''}</span>${svg('chevron', 18)}</button>`;

  // ---------- Mapa ----------
  function mapHtml(id, o) {
    const opts = { reset: !!o.reset || !!o.still, still: !!o.still, pick: !!o.pick, wheel: !!o.wheel, pad: o.pad || 36 };
    if (o.fit) opts.fit = o.fit.map((v) => Math.round(v));
    else { opts.cx = Math.round(o.c[0]); opts.cy = Math.round(o.c[1]); opts.z = o.z || 0.8; }
    const labels = MAPL.labels.map((l) => `<span class="m-lbl${l.m ? ' major' : ''}" style="${G.pct([l.x, l.y])};--a:${l.a}deg">${l.t}</span>`).join('');
    const pois = o.pois === false ? '' : LANDMARKS.map((l) => `<span class="m-poi ${l.kind}" style="${G.pct(l.pt)}"><i>${svg(l.icon, 11, 2.4)}</i>${l.label}</span>`).join('');
    const zones = (o.zones || []).map((z) => `<span class="m-zone" style="${G.pct(z.pt)};width:${((z.r * 2) / G.W * 100).toFixed(2)}%;height:${((z.r * 2) / G.H * 100).toFixed(2)}%"></span>`).join('');
    const routes = (o.routes || []).length ? `<svg class="gmap-route" viewBox="0 0 ${G.W} ${G.H}" preserveAspectRatio="none" aria-hidden="true">${o.routes.map((r) => {
      const pts = r.pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
      return `<polyline class="r-case ${r.cls || ''}" points="${pts}"/><polyline class="r-line ${r.cls || ''}" points="${pts}"/>`;
    }).join('')}</svg>` : '';
    const markers = (o.markers || []).map((m) => `<span class="marker ${m.cls || ''}" style="${G.pct(m.pt)}">${m.text}</span>`).join('');
    const sel = o.sel || {};
    const alerts = (o.alerts || []).map((p) => `<button class="malert ${p.type}${sel.kind === 'post' && sel.id === p.id ? ' sel' : ''}${p.mine ? ' mine' : ''}" style="${G.pct(p.pt)}" data-act="${o.alertAct || 'mapSel'}" data-kind="post" data-id="${p.id}" aria-label="${esc(TYPES[p.type].label + ': ' + p.text)}">${svg(TYPE_ICON[p.type], 13, 2.6)}</button>`).join('');
    const pins = (o.pins || []).map((p) => {
      const isSel = sel.kind === 'place' && sel.id === p.id;
      return `<button class="mpin cat-${p.cat}${isSel ? ' sel' : ''}" style="${G.pct(p.pt)}" data-act="${o.pinAct || 'mapSel'}" data-kind="place" data-id="${p.id}" aria-label="${esc(p.name)}"><span class="mpin-b">${svg(p.icon, 15, 2.2)}</span>${isSel || o.names ? `<span class="mpin-name">${esc(p.name)}</span>` : ''}</button>`;
    }).join('');
    const you = o.you ? `<span class="you" style="${G.pct(o.you)}" aria-label="Tu ubicación"></span>` : '';
    const ctrl = o.controls ? `<div class="gmap-ctrl"><button data-act="mapZoom" data-id="${id}" data-v="in" aria-label="Acercar">${svg('plus', 18)}</button><button data-act="mapZoom" data-id="${id}" data-v="out" aria-label="Alejar">${svg('minus', 18)}</button>${o.locate ? `<button data-act="mapLocate" data-id="${id}" aria-label="Centrar en tu ubicación">${svg('locate', 18)}</button>` : ''}</div>` : '';
    const overlay = o.overlay ? `<button class="gmap-open" ${o.overlay} aria-label="${o.overlayLabel || 'Abrir el mapa'}"><span>${svg('map', 16)}${o.overlayLabel || 'Abrir mapa'}</span></button>` : '';
    return `<div class="gmap${opts.still ? ' still' : ''}${o.cls ? ' ' + o.cls : ''}" data-map="${id}" data-opts='${JSON.stringify(opts)}' style="height:${o.h}">
      <div class="gmap-world"><div class="gmap-base-slot"></div>${zones}${routes}${labels}${pois}${markers}${alerts}${pins}${you}</div>
      ${o.extra || ''}${ctrl}<span class="gmap-credit">© OpenStreetMap</span>${overlay}</div>`;
  }
  const fitPts = (pts, pad = 0) => { const b = G.boundsOf(pts); return [b[0] - pad, b[1] - pad, b[2] + pad, b[3] + pad]; };

  // ---------- Primer ingreso ----------
  // Qué ofrece la pantalla de apertura: instalar, pantalla completa o avanzar sola.
  function launchMode() {
    if (standalone || window.CHAPI_NATIVE) return 'auto';
    if (showInstall() && (!embedded || SITE)) return 'install';
    if (fsSupported()) return 'fs';
    return 'auto';
  }
  function launch() {
    const mode = launchMode();
    const actions = mode === 'install'
      ? `<button class="btn orange" data-act="installApp">${svg('download', 20)}Instalar app</button>
        <button class="btn launch-ghost" data-act="continueLaunch">Usar en el navegador</button>
        <p class="launch-note">Gratis · ${embedded ? 'Se instala desde la página de ChapiGo' : isIOS ? 'Se agrega desde Safari, sin App Store' : 'Sin tienda de apps ni permisos extra'}</p>`
      : mode === 'fs'
        ? `<button class="btn orange" data-act="openFs">${svg('expand', 20)}Abrir en pantalla completa</button>
        <button class="btn launch-ghost" data-act="continueLaunch">Continuar aquí</button>`
        : '<div class="launch-bar"><span></span></div>';
    return `<section class="page launch">
      <img class="launch-logo" src="assets/logo-dark.png" alt="ChapiGo, Chapinero Central">
      <p class="launch-tag">Descubre, explora y conecta con Chapinero Central.</p>
      <div class="stack launch-actions">${actions}</div></section>`;
  }
  const installPill = () => (showInstall() ? `<button class="install-pill" data-act="installApp" aria-label="Instalar ChapiGo">${svg('download', 17, 2.4)}Instalar</button>` : '');
  const fsButton = () => (fsSupported() && !standalone
    ? `<button class="round" data-act="toggleFs" aria-label="${fsEl() ? 'Salir de pantalla completa' : 'Pantalla completa'}" title="${fsEl() ? 'Salir de pantalla completa' : 'Pantalla completa'}">${svg(fsEl() ? 'shrink' : 'expand', 20)}</button>`
    : '');
  function welcome() {
    return `<section class="page onb">
      <div class="row" style="justify-content:flex-end;min-height:46px">${installPill()}${fsButton()}</div>
      <div class="onb-hero center">
        ${brand(210)}
        <p class="muted" style="font-size:17px;line-height:1.45;max-width:300px">Descubre Lourdes caminando, por calles que se sienten seguras.</p>
        <div class="row-wrap" style="justify-content:center"><span class="tag recomienda">Descubre</span><span class="tag accent">Explora</span><span class="tag recomienda">Conecta</span></div>
      </div>
      <div class="stack">
        <button class="btn" data-act="start">Empezar</button>
        <button class="btn ghost" data-act="guest">Explorar sin cuenta</button>
      </div>
      <div class="stack-sm"><span class="label">Apariencia</span>${themeSeg()}</div>
    </section>`;
  }
  function onbTop(step) {
    return `<div class="between">
      <button class="round" data-act="backOnb" aria-label="Volver">${svg('back')}</button>
      <div class="progress"><span style="width:${step === 1 ? 50 : 100}%"></span></div>
      <span class="label">${step} de 2</span></div>`;
  }
  function interests() {
    const chips = CATS.filter((c) => c.id !== 'todas')
      .map((c) => `<button class="chip lg cat-${c.id} ${on(state.interests.includes(c.id))}" data-act="interest" data-id="${c.id}"><span class="cdot"></span>${c.label}</button>`).join('');
    return `<section class="page onb">${onbTop(1)}
      <h2 class="display t-l">¿Qué te interesa?</h2>
      <p class="muted">Elige las que quieras. Cada categoría tiene su color en la app.</p>
      <div class="row-wrap">${chips}</div>
      <div class="grow"></div>
      <button class="btn" data-act="interestsNext">Continuar</button></section>`;
  }
  function budget() {
    const opts = [['b1', 'Hasta $15.000'], ['b2', 'De $15.000 a $30.000'], ['b3', 'Más de $30.000']]
      .map(([id, label]) => `<button class="chip lg ${on(state.budget === id)}" data-act="budget" data-v="${id}">${label}</button>`).join('');
    const times = [['t1', '< 1 h'], ['t2', '1 a 2 h'], ['t3', '> 2 h']]
      .map(([id, label]) => `<button class="${on(state.freeTime === id)}" data-act="freeTime" data-v="${id}">${label}</button>`).join('');
    return `<section class="page onb">${onbTop(2)}
      <h2 class="display t-l">Tu presupuesto</h2>
      <p class="muted">¿Cuánto sueles gastar por salida?</p>
      <div class="stack">${opts}</div>
      <h2 class="display t-s">Tiempo libre entre clases</h2>
      <div class="seg">${times}</div>
      <div class="grow"></div>
      <button class="btn" data-act="toLocation">${state.editing ? 'Guardar' : 'Continuar'}</button></section>`;
  }
  function locationScreen() {
    const item = (t) => `<li><span class="check">${svg('check', 14, 3)}</span>${t}</li>`;
    return `<section class="page onb">
      <div class="onb-hero">
        <div class="logo-badge"><img src="assets/logo-mark.png" alt="" style="width:46px"></div>
        <h2 class="display t-l">Tu ubicación, solo mientras usas la app</h2>
        <ul class="checklist">${item('No guardamos tu historial')}${item('En Comunidad solo se ve tu zona')}${item('Lo cambias cuando quieras en Perfil')}</ul>
      </div>
      <button class="btn" data-act="allowLoc">Permitir</button>
      <button class="btn ghost" data-act="skipLoc">Ahora no</button></section>`;
  }

  // ---------- Explorar ----------
  function explorar() {
    const s = state;
    const vis = visiblePlaces();
    const openNow = vis.filter(isOpen).length;
    const activeFilters = ['abierto', 'cerca', 'wifi'].filter((k) => s.f[k]).length + (s.maxLevel < 3 ? 1 : 0) + (s.cat !== 'todas' ? 1 : 0);
    const people = DESTINOS.map((id) => personPlace(PLACE[id])).join('');
    const list = vis.length ? vis.map((p) => txPlace(p)).join('') : `<div class="card empty">${svg('search', 26)}<b>No encontramos lugares${s.q ? ` para “${esc(s.q)}”` : ''}</b><span class="muted small">Prueba con otra palabra o quita algunos filtros.</span><button class="btn sm soft" data-act="clearFilters">Quitar filtros</button></div>`;
    // El mapa de inicio enfoca los lugares más cercanos; deja aire arriba para los pines.
    const homeFit = fitPts(vis.slice(0, 5).map((p) => p.pt).concat([ORIGIN.pt]), 30);
    homeFit[1] -= 95;
    const map = s.showMap ? mapHtml('home', {
      h: '250px', fit: homeFit, still: true, pad: 22,
      pins: vis, alerts: s.layer ? mapAlerts() : [], you: ORIGIN.pt, pois: false,
      overlay: 'data-act="openMap"', overlayLabel: 'Abrir mapa',
      extra: `<button class="maptoggle ${on(s.layer)}" data-act="toggleLayer" aria-pressed="${s.layer}">${svg('layers', 16)}Reportes</button>`
    }) : '';
    return `<div class="page screen">
      ${homeHeader()}
      <div class="hero-card">
        <div class="between"><span class="eyebrow">Cerca de ti · Lourdes</span>
          <button class="round glass" data-act="toggleMap" aria-label="${s.showMap ? 'Ocultar mapa' : 'Mostrar mapa'}" aria-pressed="${s.showMap}">${svg('map', 20)}</button></div>
        <span class="display t-xxl">${vis.length} lugares</span>
        <span class="sub">${openNow} abiertos ahora · a pie desde ${ORIGIN.label}</span>
        <button class="pill" data-act="safeReturn" style="color:#fff;cursor:pointer">${svg('shield', 14, 2.4)}Regreso seguro: ${walkMin('tm')} min a TransMilenio</button>
      </div>
      <div class="actions">
        ${action('shield', 'Regreso seguro', 'data-act="safeReturn"', 'main')}
        ${action('map', 'Mapa', 'data-act="openMap"')}
        ${action('route', 'Recorridos', 'data-act="tab" data-v="recorridos"')}
        ${action('alert', 'Reportar', 'data-act="goPublicar" data-type="calle"')}
      </div>
      <div class="section-head"><h3 class="h3">¿A dónde quieres ir?</h3><button class="seeall" data-act="seeAll">Ver todos</button></div>
      <div class="people"><button class="person" data-act="focusSearch"><span class="ring add">${svg('search')}</span><span>Buscar</span></button>${people}</div>
      <div class="row">
        <label class="search" for="buscar">${svg('search', 20)}<input id="buscar" type="search" placeholder="Café, almuerzo, librería…" autocomplete="off" value="${esc(s.q)}"></label>
        <button class="round ${on(activeFilters)}" data-act="openFilters" aria-label="Filtros">${svg('sliders')}${activeFilters ? `<span class="badge">${activeFilters}</span>` : ''}</button>
      </div>
      ${map}
      <div class="section-head"><h3 class="h3">Cerca de ti</h3><span class="muted small">${countLabel(vis.length)}</span></div>
      <div class="list" id="placeList">${list}</div>
    </div>`;
  }
  function filtersSheet() {
    const s = state;
    const chips = [[3, 'Todos'], [1, 'Hasta $15 mil'], [2, 'Hasta $30 mil']]
      .map(([lv, label]) => `<button class="chip ${on(s.maxLevel === lv)}" data-act="maxLevel" data-v="${lv}">${label}</button>`).join('');
    const switches = [['abierto', 'Abierto ahora'], ['cerca', 'A 5 minutos o menos'], ['wifi', 'Wifi y enchufes']]
      .map(([k, label]) => sw('toggleF', k, s.f[k], label)).join('');
    const cats = CATS.map((c) => c.id === 'todas'
      ? `<button class="chip ${on(s.cat === c.id)}" data-act="cat" data-id="${c.id}">${c.label}</button>`
      : `<button class="chip cat-${c.id} ${on(s.cat === c.id)}" data-act="cat" data-id="${c.id}"><span class="cdot"></span>${c.label}</button>`).join('');
    return `<div class="overlay"><button class="scrim" data-act="closeSheets" aria-label="Cerrar filtros"></button>
      <div class="sheet" role="dialog" aria-label="Filtros"><span class="handle"></span>
        <h2 class="display t-s">Filtros</h2>
        <span class="label">Categoría</span><div class="row-wrap">${cats}</div>
        <span class="label">Presupuesto</span><div class="row-wrap">${chips}</div>
        <div>${switches}</div>
        <div class="grid2"><button class="btn ghost" data-act="clearFilters">Limpiar</button><button class="btn" data-act="closeSheets">Ver ${countLabel(visiblePlaces().length)}</button></div>
      </div></div>`;
  }
  function newsSheet() {
    const items = NEWS.map((n) => {
      const k = EV[n.kind];
      const pl = n.placeId && PLACE[n.placeId];
      const act = n.placeId ? `data-act="openPlace" data-id="${n.placeId}"` : n.postId ? `data-act="openPost" data-id="${n.postId}"` : 'data-act="closeSheets"';
      return `<button class="tx ${pl ? 'cat-' + pl.cat : n.kind}" ${act}>
        <span class="${pl ? 'ava' : 'ev-icon'}">${pl ? placeImg(pl.id) : svg(k.icon, 20)}</span>
        <span class="info"><b>${esc(n.title)}</b><span>${esc(n.text)}</span></span>
        <span class="end"><span class="small muted">${n.time}</span></span></button>`;
    }).join('');
    return `<div class="overlay"><button class="scrim" data-act="closeSheets" aria-label="Cerrar novedades"></button>
      <div class="sheet" role="dialog" aria-label="Novedades"><span class="handle"></span>
        <h2 class="display t-s">Novedades de Lourdes</h2><div class="list">${items}</div></div></div>`;
  }

  // Mapa completo, al estilo de un mapa de celular.
  function mapa() {
    const s = state;
    const places = PLACES.filter((p) => !p.hidden && (s.mapCat === 'todas' || p.cat === s.mapCat));
    const sel = s.mapSel;
    const q = s.mapQ.trim().toLowerCase();
    const results = q ? PLACES.filter((p) => `${p.name} ${CAT_LABEL[p.cat]} ${p.addr} ${p.tags.join(' ')}`.toLowerCase().includes(q)).slice(0, 5) : [];
    const resultsHtml = q ? `<div class="map-results">${results.length ? results.map((p) => `<button class="cat-${p.cat}" data-act="mapSel" data-kind="place" data-id="${p.id}" data-clear="1"><span class="ava">${placeImg(p.id)}</span><span class="grow"><b>${esc(p.name)}</b><small>${CAT_LABEL[p.cat]} · ${p.addr}</small></span></button>`).join('') : '<p class="muted small" style="padding:14px 16px">Sin resultados en Lourdes.</p>'}</div>` : '';
    const chips = `<button class="chip ${on(s.layer)}" data-act="toggleLayer">${svg('alert', 15)}Reportes</button>` + CATS.map((c) => c.id === 'todas'
      ? `<button class="chip ${on(s.mapCat === c.id)}" data-act="mapCat" data-id="todas">Todo</button>`
      : `<button class="chip cat-${c.id} ${on(s.mapCat === c.id)}" data-act="mapCat" data-id="${c.id}"><span class="cdot"></span>${c.label}</button>`).join('');
    let card;
    if (sel && sel.kind === 'place' && PLACE[sel.id]) {
      const p = PLACE[sel.id]; const saved = s.saved.includes(p.id);
      card = `<div class="mapcard cat-${p.cat}">
        <div class="row" style="align-items:flex-start"><span class="thumb">${placeImg(p.id)}</span>
          <div class="grow stack-sm" style="gap:3px"><b style="font-size:17px">${esc(p.name)}</b>
            <span class="small"><span class="catlabel">${CAT_LABEL[p.cat]}</span> · ${walkMin(p.id)} min a pie · ${p.price}</span>
            <span class="openline ${isOpen(p) ? 'ok' : 'no'}">${openLabel(p)}</span></div>
          <button class="round ${on(saved)}" data-act="toggleSave" data-id="${p.id}" aria-label="Guardar" aria-pressed="${saved}">${svg('bookmark', 19)}</button></div>
        <div class="grid2"><button class="btn sm" data-act="goRoute" data-id="${p.id}">${svg('route', 18)}Cómo llegar</button><button class="btn sm ghost" data-act="openPlace" data-id="${p.id}">Ver ficha</button></div></div>`;
    } else if (sel && sel.kind === 'post') {
      const p = s.posts.find((x) => x.id === sel.id);
      card = p ? `<div class="mapcard">
        <div class="post-head"><span class="type-ava ${p.type}">${svg(TYPE_ICON[p.type], 20)}</span>
          <span class="grow"><span class="tag ${p.type}">${TYPES[p.type].label}</span><span class="muted small" style="display:block;margin-top:4px">${postMeta(p)}</span></span></div>
        <b style="font-size:16px;line-height:1.35">${esc(p.text)}</b>
        <div class="grid2"><button class="btn sm" data-act="openPost" data-id="${p.id}">Ver reporte</button><button class="btn sm ghost" data-act="vote" data-id="${p.id}" data-k="no">${TYPES[p.type].no}</button></div></div>` : '';
    } else {
      card = `<div class="mapcard hint"><span class="ev-icon">${svg('map', 20)}</span><span class="grow"><b>Lourdes, Chapinero</b><span class="muted small" style="display:block">Toca un lugar o un reporte. Arrastra para moverte y usa + y − para acercar.</span></span></div>`;
    }
    return `<div class="page mapscreen">
      ${mapHtml('full', { h: '100%', c: ORIGIN.pt, z: 0.85, wheel: true, controls: true, locate: true, pins: places, alerts: s.layer ? mapAlerts() : [], you: ORIGIN.pt, sel, cls: 'full' })}
      <div class="map-top">
        <div class="row"><button class="round" data-act="back" aria-label="Volver">${svg('back')}</button>
          <label class="search grow" for="mapq">${svg('search', 20)}<input id="mapq" type="search" placeholder="Buscar en Lourdes" autocomplete="off" value="${esc(s.mapQ)}"></label></div>
        ${resultsHtml}
        <div class="hscroll map-chips">${chips}</div>
      </div>
      <div class="map-bottom">${card}</div>
    </div>`;
  }

  function ficha() {
    const p = place();
    const saved = state.saved.includes(p.id);
    const inMine = state.myTour.includes(p.id);
    const ph = PHOTO[p.id];
    const posts = zonePosts(p.zone).slice(0, 2);
    const community = posts.length
      ? posts.map((x) => `<button class="row comm-row" data-act="openPost" data-id="${x.id}"><span class="type-ava ${x.type}">${svg(TYPE_ICON[x.type], 18)}</span><span class="grow small" style="text-align:left"><b style="display:block">${esc(x.text)}</b><span class="muted">${x.time}</span></span>${svg('chevron', 16)}</button>`).join('')
      : '<p class="muted small">Sin reportes recientes en esta zona.</p>';
    return `<div class="page screen cat-${p.cat}">
      <div class="hero-photo">
        <img src="assets/places/${p.id}.jpg" alt="${p.real ? esc(p.name) : `Foto ilustrativa: ${esc(CAT_LABEL[p.cat].toLowerCase())}`}">
        <div class="bar"><button class="round glass" data-act="back" aria-label="Volver">${svg('back')}</button>
          <button class="round glass ${on(saved)}" data-act="toggleSave" data-id="${p.id}" aria-label="Guardar lugar" aria-pressed="${saved}">${svg('bookmark', 20)}</button></div>
        <div class="caption"><span class="tag glass" style="align-self:flex-start">${CAT_LABEL[p.cat]} · ${esc(ZONE[p.zone].name)}</span>
          <h1 class="display t-m">${esc(p.name)}</h1><span style="font-size:14px;opacity:.9">${p.addr}</span></div>
      </div>
      ${ph ? `<p class="credit">${p.real ? 'Foto' : 'Foto ilustrativa'}: ${esc(ph.author)} · ${ph.license} · <a href="${ph.page}" target="_blank" rel="noopener">Wikimedia Commons</a></p>` : ''}
      <div class="grid3"><div class="stat-pill">Precio<b>${PRICE_LABEL[p.price]}</b></div><div class="stat-pill">Horario<b>${hoursLabel(p)}</b></div><div class="stat-pill">A pie<b>${walkMin(p.id)} min</b></div></div>
      <div class="stack-sm"><span class="openline ${isOpen(p) ? 'ok' : 'no'}">${openLabel(p)}</span><p class="about">${esc(p.about)}</p></div>
      <div class="actions">
        ${action('route', 'Cómo llegar', `data-act="goRoute" data-id="${p.id}"`, 'main')}
        ${action('bookmark', saved ? 'Guardado' : 'Guardar', `data-act="toggleSave" data-id="${p.id}"`, saved ? 'on' : '')}
        ${action(inMine ? 'check' : 'plus', inMine ? 'En mi recorrido' : 'Mi recorrido', `data-act="mineToggle" data-id="${p.id}"`, inMine ? 'on' : '')}
        ${action('alert', 'Reportar', 'data-act="goPublicar" data-type="calle"')}
      </div>
      <div class="row-wrap">${p.tags.map((t) => `<span class="tag cat">${t}</span>`).join('')}</div>
      ${mapHtml('mini-' + p.id, { h: '170px', c: p.pt, z: 1.15, still: true, pins: [p], sel: { kind: 'place', id: p.id }, alerts: mapAlerts(), overlay: `data-act="openMap" data-kind="place" data-id="${p.id}"`, overlayLabel: 'Ver en el mapa' })}
      <div class="card">
        <div class="between"><h3 class="h3">En la zona: ${esc(ZONE[p.zone].short)}</h3><span class="tag recomienda">${zonePosts(p.zone).length}</span></div>
        ${community}
      </div>
      <div class="section-head"><h3 class="h3">Cerca para combinar</h3></div>
      <div class="list">${nearPlaces(p, 3).map((o) => txPlace(o)).join('')}</div>
    </div>`;
  }

  function reasonsFor(r, other, isSafe) {
    const hz = hazards();
    const mine = G.hazardsOn(r, hz); const theirs = G.hazardsOn(other, hz);
    const m = G.mix(r); const mo = G.mix(other);
    const out = [];
    if (isSafe) {
      if (m.major >= 0.5) out.push(['Comercio abierto y buena luz', 'ok']);
      else if (m.major + m.mid >= 0.6) out.push(['Calles con movimiento', 'ok']);
      if (theirs.length > mine.length) out.push([`Evita ${theirs.length - mine.length === 1 ? 'un reporte' : `${theirs.length - mine.length} reportes`}`, 'ok']);
      if (mo.caracas > 0.2 && m.caracas < 0.2) out.push(['Evita la obra del Metro', 'ok']);
      if (mine.length) out.push([`Pasa por ${mine.length === 1 ? 'un reporte' : `${mine.length} reportes`}: te avisamos`, 'bad']);
      if (!out.length) out.push(['La más concurrida', 'ok']);
    } else {
      if (m.caracas > 0.2) out.push(['Andén junto a la obra del Metro', 'bad']);
      if (m.minor > 0.35) out.push(['Calles residenciales, más solas', 'bad']);
      const sec = mine.filter((h) => h.type === 'seguridad').length; const st = mine.length - sec;
      if (sec) out.push(['Pasa por un reporte de seguridad', 'bad']);
      if (st) out.push([st === 1 ? 'Pasa por un reporte de calle' : `Pasa por ${st} reportes de calle`, 'bad']);
      if (!out.length) out.push(['Menos comercio abierto', 'bad']);
    }
    return out;
  }
  function ruta() {
    const p = place();
    const safeR = placeRoute(p.id, 'safe'); const fastR = placeRoute(p.id, 'fast');
    const same = safeR.keys.join() === fastR.keys.join() || fastR.len >= safeR.len - 5;
    const pick = same ? 'segura' : state.route;
    const options = [{ id: 'segura', name: same ? 'Ruta segura · también la más corta' : 'Ruta segura', r: safeR, reasons: reasonsFor(safeR, fastR, true) }]
      .concat(same ? [] : [{ id: 'rapida', name: 'Ruta rápida', r: fastR, reasons: reasonsFor(fastR, safeR, false) }])
      .map((o) => `<button class="option ${on(pick === o.id)}" data-act="pickRoute" data-v="${o.id}" aria-pressed="${pick === o.id}">
        <span class="radio">${pick === o.id ? svg('check', 14, 3) : ''}</span>
        <span class="grow stack-sm"><span class="between"><b style="font-size:16px">${o.name}</b><span class="small muted nowrap">${G.minutes(o.r.len)} min · ${G.fmtLen(o.r.len)}</span></span>
        <span class="row-wrap">${o.reasons.map(([l, k]) => `<span class="reason ${k}">${l}</span>`).join('')}</span></span></button>`).join('');
    const routes = same ? [{ pts: safeR.pts, cls: 'safe' }]
      : pick === 'segura' ? [{ pts: fastR.pts, cls: 'alt' }, { pts: safeR.pts, cls: 'safe' }] : [{ pts: safeR.pts, cls: 'alt' }, { pts: fastR.pts, cls: 'fast' }];
    return `<div class="page screen">
      ${topbar('Cómo llegar')}
      <div><h1 class="display t-m">${same ? 'Tu ruta' : 'Elige tu ruta'}</h1><p class="muted" style="margin-top:4px">De ${ORIGIN.label} a ${esc(p.name)}</p></div>
      ${mapHtml('route-' + p.id, { h: '240px', fit: fitPts(safeR.pts.concat(fastR.pts), 10), controls: true, routes, markers: [{ pt: ORIGIN.pt, text: 'A' }], pins: [p], sel: { kind: 'place', id: p.id }, alerts: mapAlerts(), pinAct: 'noop', alertAct: 'openPost' })}
      <div class="list">${options}</div>
      <p class="muted small">${new Date().getHours() >= 18 || new Date().getHours() < 6 ? 'Es de noche: te sugerimos la ruta segura.' : 'De noche te sugerimos siempre la ruta segura.'}</p>
      <button class="btn" data-act="goPreview">Ver indicaciones</button>
    </div>`;
  }
  function preview() {
    const s = state;
    const plan = tripPlan(s.trip, tripMode());
    const isTour = s.trip.kind === 'tour';
    const safe = isTour || s.route === 'segura';
    const stepsHtml = plan.steps.map((x, i) => `<li class="${x.stop ? 'stopstep' : ''}"><span class="num">${x.stop ? svg('star', 14, 2.4) : i + 1}</span><span><b>${esc(x.txt)}</b><br><span class="muted small">${esc(x.sub)}</span></span></li>`).join('')
      + `<li><span class="num end">${svg('check', 14, 3)}</span><span><b>Llegas a ${esc(plan.dest.name)}</b><br><span class="muted small">${plan.dest.addr}</span></span></li>`;
    const share = s.contact.name
      ? sw('toggleShare', '', s.shareRoute, `Compartir mi ruta con ${esc(s.contact.name)}`, 'Recibe tu recorrido y la hora en que llegas')
      : `<button class="listrow" data-act="goSub" data-v="contacto" style="padding-left:0"><span class="round" aria-hidden="true">${svg('share', 18)}</span><span class="grow">Agrega un contacto de confianza<small>Para compartirle tu ruta cuando camines</small></span>${svg('chevron', 18)}</button>`;
    const tourMap = isTour ? mapHtml('trip-' + plan.tour.id, { h: '220px', fit: fitPts(plan.pts, 10), controls: true, routes: [{ pts: plan.pts, cls: 'safe' }], markers: [{ pt: ORIGIN.pt, text: 'A' }].concat(plan.stops.map((id, i) => ({ pt: PLACE[id].pt, text: String(i + 1), cls: 'end' }))), pinAct: 'noop' }) : '';
    return `<div class="page screen">
      ${topbar('Antes de salir')}
      <div class="hero-card ${isTour && (plan.tour.safe || plan.tour.night) ? 'orange' : ''}"><span class="eyebrow">${isTour ? `Recorrido · ${esc(plan.tour.name)}` : `${safe ? 'Ruta segura' : 'Ruta rápida'} · hacia ${esc(plan.dest.name)}`}</span>
        <span class="display t-xxl">${G.minutes(plan.len)} min</span><span class="sub">${G.fmtLen(plan.len)} a pie · ${plan.steps.length + 1} pasos</span></div>
      ${tourMap}
      <div class="card"><ol class="steps">${stepsHtml}</ol></div>
      <div class="card flat">${sw('toggleVibrate', '', s.vibrate, 'Avisos por vibración')}${share}</div>
      <p class="muted small">Guarda el celular: te avisamos antes de cada giro y cuando pases por algo de interés.</p>
      <button class="btn" data-act="startNav">Empezar</button>
    </div>`;
  }
  function eventFor(step) {
    if (!step) return null;
    if (step.stop && PLACE[step.stop].ev) return Object.assign({ placeId: step.stop }, PLACE[step.stop].ev);
    for (const c of step.corners || []) {
      const ev = CORNER_EV[c];
      if (!ev) continue;
      if (ev.postId && !visiblePost(ev.postId)) continue;
      return ev;
    }
    return null;
  }
  function nav() {
    const s = state;
    const plan = tripPlan(s.trip, tripMode());
    const steps = plan.steps;
    const p = plan.dest;
    if (s.navStep >= steps.length) {
      return `<div class="page screen no-bar center cat-${p.cat}" style="min-height:100%">
        <span class="person" style="width:auto;pointer-events:none"><span class="ring" style="width:120px;height:120px">${placeImg(p.id)}</span></span>
        <div class="bigicon" style="width:56px;height:56px;margin-top:-34px">${svg('check', 28, 3)}</div>
        <h1 class="display t-l">Llegaste</h1>
        <p class="muted">${esc(p.name)} · ${p.addr}</p>
        ${s.shareRoute && s.contact.name ? `<span class="tag recomienda">${svg('share', 13)}Le avisamos a ${esc(s.contact.name)} que llegaste</span>` : ''}
        <button class="btn" data-act="finishNav">Listo</button>
        <button class="btn orange" data-act="report">Contar algo a la comunidad</button></div>`;
    }
    const cur = steps[s.navStep];
    const isLast = s.navStep === steps.length - 1;
    const ev = eventFor(cur);
    const stopPins = plan.stops.map((id) => PLACE[id]);
    return `<div class="page screen no-bar" style="min-height:100%">
      <div class="hero-card ${cur.stop ? 'orange' : ''}">
        <div class="between"><span class="eyebrow">Paso ${s.navStep + 1} de ${steps.length} · hacia ${esc(p.name)}</span><span class="round glass" aria-hidden="true">${svg(cur.stop ? 'star' : 'up', 22, 2.6)}</span></div>
        <span class="display t-s">${esc(cur.txt)}</span><span class="sub">${esc(cur.sub)}</span>
      </div>
      ${mapHtml('nav', { h: '260px', c: cur.at, z: 1.3, reset: true, controls: true, routes: [{ pts: plan.pts, cls: tripMode() === 'fast' ? 'fast' : 'safe' }], pins: stopPins, sel: { kind: 'place', id: p.id }, you: cur.at, alerts: mapAlerts(), pinAct: 'noop', alertAct: 'openPost', pois: false })}
      ${ev ? eventCard(ev) : ''}
      <div class="row"><button class="round" data-act="report" aria-label="Reportar algo en la calle">${svg('alert')}</button>
        <a class="round" href="tel:123" aria-label="Llamar al 123" style="color:var(--danger-text)">${svg('phone')}</a>
        <button class="btn grow" data-act="nextStep">${isLast ? 'Llegué' : 'Siguiente paso'}</button></div>
      <button class="btn ghost" data-act="back">Salir de la navegación</button>
    </div>`;
  }

  // ---------- Recorridos ----------
  function tourCard(t, extra = '') {
    const plan = t.stops.length ? tripPlan({ kind: 'tour', id: t.id }, 'safe') : null;
    const d = PLACE[t.stops[t.stops.length - 1]] || PLACES[0];
    return `<button class="tx cat-${d.cat}" data-act="openTour" data-id="${t.id}" ${extra}><span class="ava">${placeImg(d.id)}</span>
        <span class="info"><b>${esc(t.name)}</b><span>${t.stops.length} ${t.stops.length === 1 ? 'parada' : 'paradas'} · ${plan ? G.fmtLen(plan.len) + ' a pie' : 'sin paradas'}</span></span>
        <span class="end"><span class="amt">${t.time || (plan ? G.minutes(plan.len) + ' min' : '')}</span>${t.safe || t.night ? `<span class="state no" aria-label="Recomendado de noche">${svg('shield', 13, 2.6)}</span>` : ''}</span></button>`;
  }
  function recorridos() {
    const s = state;
    const times = [['all', 'Todos'], ['30', '30 min'], ['60', '1 h'], ['120', '2 h']]
      .map(([id, label]) => `<button class="chip ${on(s.tourTime === id)}" data-act="tourTime" data-v="${id}">${label}</button>`).join('');
    const list = TOURS.filter((t) => s.tourTime === 'all' || t.tf === s.tourTime).map((t) => tourCard(t)).join('');
    const mine = mineTour();
    const mineHtml = mine.stops.length
      ? `<button class="mine-card" data-act="openTour" data-id="mine">
          <span class="thumbs">${mine.stops.slice(0, 4).map((id) => placeImg(id)).join('')}</span>
          <span class="grow"><b>Mi recorrido</b><small>${mine.stops.length} ${mine.stops.length === 1 ? 'parada' : 'paradas'} · ${G.fmtLen(tripPlan({ kind: 'tour', id: 'mine' }, 'safe').len)} a pie</small></span>${svg('chevron', 18)}</button>`
      : `<div class="card mine-empty"><div class="row"><span class="ev-icon">${svg('route', 20)}</span><span class="grow"><b>Arma tu recorrido</b><span class="muted small" style="display:block">Junta tus lugares favoritos y ChapiGo los une por calles seguras.</span></span></div>
          <button class="btn sm soft" data-act="openTour" data-id="mine">${svg('plus', 18)}Armar ahora</button></div>`;
    const tm = placeRoute('tm', 'safe');
    return `<div class="page screen">
      ${tabHeader('Planes armados', 'Recorridos')}
      <div class="hero-card orange">
        <span class="eyebrow">De noche te recomendamos</span>
        <span class="display t-l">Regreso seguro</span>
        <span class="sub">${G.minutes(tm.len)} min hasta la Estación Calle 57 por la Cra. 13 y la Cl. 57, con comercio y luz.</span>
        <button class="btn sm" data-act="safeReturn" style="margin-top:6px">Empezar ahora</button>
      </div>
      ${mineHtml}
      <div class="section-head"><h3 class="h3">Planes para ti</h3></div>
      <div class="hscroll">${times}</div>
      <div class="list">${list || '<div class="card muted">No hay planes con ese tiempo.</div>'}</div></div>`;
  }
  function tourDetail() {
    const t = tour();
    const isMine = t.id === 'mine';
    const saved = state.savedTours.includes(t.id);
    const plan = t.stops.length ? tripPlan({ kind: 'tour', id: t.id }, 'safe') : null;
    const stops = t.stops.map((id, i) => {
      const p = PLACE[id];
      const leg = plan ? plan.legs[i] : null;
      const tools = isMine ? `<span class="stop-tools">
          <button class="round" data-act="mineMove" data-id="${id}" data-v="-1" aria-label="Subir" ${i === 0 ? 'disabled' : ''}>${svg('up', 16)}</button>
          <button class="round" data-act="mineMove" data-id="${id}" data-v="1" aria-label="Bajar" ${i === t.stops.length - 1 ? 'disabled' : ''}>${svg('down', 16)}</button>
          <button class="round" data-act="mineToggle" data-id="${id}" aria-label="Quitar">${svg('x', 16)}</button></span>` : '';
      return `${leg ? `<div class="leg">${svg('walk', 15)}${G.minutes(leg.len)} min caminando · ${G.fmtLen(leg.len)}</div>` : ''}
        <div class="stop cat-${p.cat}"><span class="num">${i + 1}</span>
          <button class="stop-main" data-act="openPlace" data-id="${id}"><span class="ava">${placeImg(id)}</span><span class="grow"><b>${esc(p.name)}</b><small><span class="catlabel">${CAT_LABEL[p.cat]}</span> · ${p.price}</small></span></button>${tools}</div>`;
    }).join('');
    const suggestions = isMine ? PLACES.filter((p) => !p.hidden && !t.stops.includes(p.id)).map((p) => `<div class="saved-row">${txPlace(p)}<button class="round add" data-act="mineToggle" data-id="${p.id}" aria-label="Agregar ${esc(p.name)}">${svg('plus', 18)}</button></div>`).join('') : '';
    const right = isMine ? '<span style="width:46px"></span>' : `<button class="round ${on(saved)}" data-act="toggleTour" aria-label="Guardar recorrido" aria-pressed="${saved}">${svg('bookmark', 20)}</button>`;
    return `<div class="page screen">
      ${topbar(isMine ? 'Tu recorrido' : 'Recorrido', right)}
      <div class="hero-card ${t.safe || t.night ? 'orange' : ''}"><span class="eyebrow">${t.stops.length} ${t.stops.length === 1 ? 'parada' : 'paradas'} · ${t.price}</span>
        <span class="display t-l">${esc(t.name)}</span><span class="sub">${plan ? `${G.minutes(plan.len)} min caminando · ${G.fmtLen(plan.len)} · ` : ''}${esc(t.note)}</span></div>
      ${plan ? mapHtml('tour-' + t.id + '-' + t.stops.join('_'), { h: '210px', fit: fitPts(plan.pts, 10), controls: true, routes: [{ pts: plan.pts, cls: 'safe' }], markers: [{ pt: ORIGIN.pt, text: 'A' }].concat(t.stops.map((id, i) => ({ pt: PLACE[id].pt, text: String(i + 1), cls: 'end' }))), pinAct: 'noop' }) : ''}
      ${t.stops.length ? `<div class="stops">${stops}</div>` : '<div class="card empty">' + svg('route', 26) + '<b>Todavía no hay paradas</b><span class="muted small">Agrega lugares de la lista de abajo o desde la ficha de cada lugar.</span></div>'}
      ${t.stops.length ? `<button class="btn" data-act="startTour">Empezar recorrido</button>` : ''}
      ${isMine ? `<div class="section-head"><h3 class="h3">Agrega lugares</h3></div><div class="list">${suggestions}</div>` : ''}
    </div>`;
  }

  // ---------- Comunidad ----------
  function voteButtons(p, big) {
    const v = state.votes[p.id];
    const T = TYPES[p.type];
    return `<button class="vote ${big ? 'lg' : ''} ${on(v === 'yes')}" data-act="vote" data-id="${p.id}" data-k="yes">${T.yes} · ${p.yes}</button>
      <button class="vote ${big ? 'lg' : ''} ${on(v === 'no')}" data-act="vote" data-id="${p.id}" data-k="no">${T.no} · ${p.no}</button>`;
  }
  function feed() {
    const s = state;
    return livePosts().filter((p) => s.commType === 'todo' || p.type === s.commType)
      .filter((p) => s.commScope === 'todo' || (s.commScope === 'cerca' ? p.zone === HOME_ZONE || (p.pt && G.dist(p.pt, ORIGIN.pt) < 320) : s.savedZones.includes(p.zone)));
  }
  function comunidad() {
    const s = state;
    const types = [['todo', 'Todo']].concat(Object.keys(TYPES).map((k) => [k, TYPES[k].label]))
      .map(([id, label]) => `<button class="chip ${on(s.commType === id)}" data-act="commType" data-v="${id}">${label}</button>`).join('');
    const scope = [['todo', 'Todo Lourdes'], ['cerca', 'Cerca de mí'], ['zonas', 'Mis zonas']]
      .map(([id, label]) => `<button class="${on(s.commScope === id)}" data-act="commScope" data-v="${id}">${label}</button>`).join('');
    const list = feed();
    const active = hazards().length;
    const cards = list.length ? list.map((p) => {
      const n = (s.comments[p.id] || []).length;
      return `<article class="post">
        <div class="post-head"><span class="type-ava ${p.type}">${svg(TYPE_ICON[p.type], 20)}</span>
          <span class="grow"><span class="tag ${p.type}">${TYPES[p.type].label}</span><span class="muted small" style="display:block;margin-top:4px">${postMeta(p)}</span></span>
          ${p.mine ? '<span class="tag recomienda">Tuya</span>' : ''}</div>
        <button class="post-text" data-act="openPost" data-id="${p.id}">${esc(p.text)}</button>
        <div class="row-wrap" style="align-items:center">${voteButtons(p)}
          <button class="linkbtn" data-act="openPost" data-id="${p.id}" style="margin-left:auto">${n} ${n === 1 ? 'comentario' : 'comentarios'}</button></div>
      </article>`;
    }).join('') : `<div class="card empty">${svg('users', 26)}<b>Nada por aquí todavía</b><span class="muted small">${s.commScope === 'zonas' ? 'Guarda zonas en la pestaña Guardados para ver lo que pasa en ellas.' : 'Sé el primero en contar algo de esta zona.'}</span></div>`;
    return `<div class="page screen">
      ${tabHeader('Lo que pasa ahora', 'Comunidad')}
      <div class="hero-card">
        <span class="eyebrow">Reportes activos en Lourdes</span>
        <span class="display t-xxl">${active} avisos</span>
        <span class="sub">de seguridad y estado de las calles · confirma o desmiente</span>
        <div class="row-wrap"><button class="pill" data-act="openMap" style="color:#fff;cursor:pointer">${svg('map', 14, 2.4)}Ver en el mapa</button>
          <a class="pill" href="tel:123" style="color:#fff;text-decoration:none">${svg('phone', 14, 2.4)}Emergencia: 123</a></div>
      </div>
      <div class="actions">
        ${action('plus', 'Publicar', 'data-act="goPublicar" data-type="recomienda"', 'main')}
        ${action('cone', 'Calle', 'data-act="goPublicar" data-type="calle"')}
        ${action('alert', 'Seguridad', 'data-act="goPublicar" data-type="seguridad"')}
        ${action('question', 'Preguntar', 'data-act="goPublicar" data-type="pregunta"')}
      </div>
      <div class="seg">${scope}</div>
      <div class="hscroll">${types}</div>
      <div class="list">${cards}</div></div>`;
  }
  function commentHtml(c) {
    const cls = c.ai ? 'ai' : c.mine ? 'mine' : '';
    const body = c.pending && !c.text ? '<span class="typing" aria-label="Escribiendo"><i></i><i></i><i></i></span>' : esc(c.text);
    return `<div class="comment ${cls}"><span class="who">${c.ai ? svg('spark', 18) : esc(c.initials)}</span>
      <div class="bubble"><div class="meta"><b style="color:var(--text)">${esc(c.who)}</b>${c.ai ? '<span class="tag ai">Respuesta automática</span>' : ''}<span>${c.time}</span></div>
      <div id="txt-${c.id}">${body}</div></div></div>`;
  }
  function alerta() {
    const p = post();
    const list = state.comments[p.id] || [];
    const z = ZONE[p.zone];
    const watching = state.savedZones.includes(p.zone);
    const linked = p.placeId && PLACE[p.placeId];
    return `<div class="page screen">
      ${topbar('Publicación', `<button class="round" data-act="flagPost" aria-label="Reportar publicación">${svg('flag', 19)}</button>`)}
      <div class="post">
        <div class="post-head"><span class="type-ava ${p.type}">${svg(TYPE_ICON[p.type], 20)}</span>
          <span class="grow"><span class="tag ${p.type}">${TYPES[p.type].label}</span><span class="muted small" style="display:block;margin-top:4px">${postMeta(p)}</span></span></div>
        <h1 class="display t-m">${esc(p.text)}</h1>
        <div class="grid2">${voteButtons(p, true)}</div><span class="muted small">${p.expires}${p.yes < p.no ? ' · La mayoría dice que ya no pasa' : ''}</span>
      </div>
      ${p.pt ? mapHtml('post-' + p.id, { h: '160px', c: p.pt, z: 1.3, still: true, alerts: [p], sel: { kind: 'post', id: p.id }, overlay: `data-act="openMap" data-kind="post" data-id="${p.id}"`, overlayLabel: 'Ver en el mapa' }) : ''}
      <div class="card zone-line"><div class="row"><span class="ev-icon">${svg('target', 20)}</span><span class="grow"><b>${esc(z.name)}</b><span class="muted small" style="display:block">${zoneAlerts(z.id).length} avisos activos en la zona</span></span>
        <button class="chip ${on(watching)}" data-act="zoneToggle" data-id="${z.id}">${watching ? svg('check', 15, 2.6) + 'Siguiendo' : svg('bell', 15) + 'Avisarme'}</button></div></div>
      ${linked ? txPlace(linked) : ''}
      <div class="card">
        <div class="between"><h3 class="h3">Comentarios</h3><span class="tag ai">${svg('spark', 14)}Con respuesta de IA</span></div>
        <div class="comments">${list.length ? list.map(commentHtml).join('') : '<p class="muted small">Sé el primero en comentar.</p>'}</div>
        <div class="composer"><label for="commentInput" class="grow" style="display:flex">
          <textarea id="commentInput" class="field" rows="1" maxlength="240" placeholder="Escribe un comentario…" aria-label="Tu comentario">${esc(state.commentDraft)}</textarea></label>
          <button class="round" data-act="sendComment" aria-label="Enviar comentario">${svg('send', 20)}</button></div>
      </div>
      <p class="muted small">Sin fotos ni descripciones de personas. Si es una emergencia, llama al 123.</p></div>`;
  }
  function publicar() {
    const s = state;
    const types = Object.keys(TYPES).map((k) => `<button class="typeopt ${on(s.draftType === k)}" data-act="draftType" data-v="${k}"><span class="type-ava ${k}">${svg(TYPE_ICON[k], 22)}</span>${TYPES[k].label}<span class="muted small" style="font-weight:500">${TYPES[k].hint}</span></button>`).join('');
    const zones = ZONES.map((z) => `<button class="chip ${on(s.draftZone === z.id)}" data-act="draftZone" data-v="${z.id}">${z.id === HOME_ZONE ? svg('locate', 15) : ''}${esc(z.short)}</button>`).join('');
    const z = ZONE[s.draftZone];
    const pt = s.draftPt || z.pt;
    const ready = s.verified && s.draftText.trim();
    return `<div class="page screen">
      ${topbar('Publicar')}
      ${s.verified ? '' : `<div class="card notice"><b>Verifica tu correo universitario para publicar</b><span class="small">Así la comunidad sabe que lo que se cuenta viene de estudiantes.</span><button class="btn sm orange" data-act="openVerify">Verificar ahora</button></div>`}
      <h3 class="h3">¿Qué quieres compartir?</h3><div class="grid3">${types}</div>
      <h3 class="h3">¿Dónde?</h3><div class="hscroll">${zones}</div>
      ${mapHtml('pick', { h: '210px', c: z.pt, z: 1.1, pick: true, controls: true, zones: [z], markers: [{ pt, text: svg('pin', 14, 2.6), cls: 'end pickmark' }], pois: false })}
      <p class="muted small" style="margin-top:-8px">${s.draftPt ? 'Punto marcado. Puedes tocar otro lugar del mapa para cambiarlo.' : 'Toca el mapa para marcar el punto exacto (opcional).'}</p>
      <div class="stack-sm"><label for="draft" class="h3">Cuéntalo en pocas palabras</label>
        <input id="draft" class="field" maxlength="80" value="${esc(s.draftText)}" placeholder="Ej.: obra cierra el andén" autocomplete="off">
        <span class="muted small" id="draftCount" style="text-align:right">${s.draftText.length}/80</span></div>
      <div class="card flat">${sw('toggleAnon', '', s.anon, 'Publicar como anónimo', 'Los demás solo ven la zona')}</div>
      <p class="muted small">No subas fotos ni describas personas. <button class="linkbtn" data-act="goSub" data-v="reglas" data-tab="perfil">Ver reglas</button></p>
      <button class="btn orange ${ready ? '' : 'off'}" id="publishBtn" data-act="publish">Publicar</button></div>`;
  }
  function verifySheet() {
    const s = state;
    return `<div class="overlay"><button class="scrim" data-act="closeSheets" aria-label="Cerrar"></button>
      <div class="sheet" role="dialog" aria-label="Verificar correo"><span class="handle"></span>
        <div class="row"><span class="ev-icon">${svg('mail', 20)}</span><h2 class="display t-s grow">Verifica tu correo universitario</h2></div>
        <p class="muted small">Solo lo usamos para confirmar que eres estudiante. No se muestra en tus publicaciones.</p>
        <input id="vEmail" class="field" type="email" inputmode="email" placeholder="tunombre@universidad.edu.co" autocomplete="off" value="${esc(s.verifyEmail)}">
        <button class="btn" data-act="doVerify" ${s.verifyBusy ? 'disabled' : ''}>${s.verifyBusy ? '<span class="spinner"></span>Verificando…' : 'Verificar'}</button>
      </div></div>`;
  }
  // El código QR es el diseño original de ChapiGo y lleva al enlace para compartir.
  const qrBox = () => (SHARE ? `<div class="qrbox"><img src="assets/qr-chapigo.png" alt="Código QR de ChapiGo"></div><p class="linkline" id="siteLink">${esc(SHARE)}</p>` : '');
  const installUrl = () => `${SITE}#instalar`;
  function installSheet() {
    const step = (icon, html) => `<li><span class="num">${svg(icon, 15, 2.4)}</span><span>${html}</span></li>`;
    let title = 'Instala ChapiGo';
    let body;
    if (embedded) {
      body = `<ol class="steps">${step('compass', 'Toca el botón de abajo: se abre la página de ChapiGo en tu navegador')}${step('download', `Allí toca <b>Instalar app</b>${isIOS ? ' y sigue los pasos de Safari' : ''}`)}${step('check', 'Listo: ChapiGo queda con su ícono en tu pantalla de inicio')}</ol>
        ${SITE ? `<a class="btn orange" href="${esc(installUrl())}" target="_blank" rel="noopener">${svg('download', 19)}Abrir ChapiGo para instalar</a><p class="linkline">${esc(SITE)}</p>` : ''}`;
    } else if (inAppBrowser) {
      body = `<p class="muted">Estás dentro de otra app. Para instalar ChapiGo ábrela en el navegador del celular:</p>
        <ol class="steps">${step('dots', 'Toca el menú <b>⋯</b> o <b>⋮</b> de arriba')}${step('compass', `Elige <b>Abrir en ${isIOS ? 'Safari' : 'Chrome'}</b>`)}${step('download', 'Allí toca <b>Instalar app</b>')}</ol>`;
    } else if (isIOS) {
      title = 'Agrégala a tu iPhone';
      body = `<ol class="steps">${step('iosShare', 'Toca <b>Compartir</b> en la barra de Safari')}${step('plusSquare', 'Busca y toca <b>Agregar a inicio</b>')}${step('check', 'Toca <b>Agregar</b>. ChapiGo queda con su ícono y se abre a pantalla completa')}</ol>`;
    } else if (isAndroid) {
      body = `<ol class="steps">${step('dots', 'Abre el menú <b>⋮</b> del navegador')}${step('download', 'Toca <b>Instalar app</b> o <b>Agregar a pantalla principal</b>')}${step('check', 'Confirma. ChapiGo queda en tu pantalla de inicio')}</ol>`;
    } else {
      title = 'Instálala en tu celular';
      body = `<p class="muted">Escanea el código con la cámara del celular, abre ChapiGo y toca <b>Instalar app</b>. En el computador también puedes instalarla con el ícono de instalar de la barra de direcciones de Chrome o Edge.</p>${qrBox()}`;
    }
    return `<div class="overlay"><button class="scrim" data-act="closeSheets" aria-label="Cerrar"></button>
      <div class="sheet" role="dialog" aria-label="${title}"><span class="handle"></span>
        <div class="row"><span class="app-ico"><img src="icons/icon-192.png" alt=""></span><span class="grow"><h2 class="display t-s">${title}</h2><span class="muted small">Gratis · funciona en Android y iPhone</span></span></div>
        ${body}
        <button class="btn ghost" data-act="closeSheets">Entendido</button>
      </div></div>`;
  }
  function shareSheet() {
    return `<div class="overlay"><button class="scrim" data-act="closeSheets" aria-label="Cerrar"></button>
      <div class="sheet" role="dialog" aria-label="Compartir ChapiGo"><span class="handle"></span>
        <h2 class="display t-s">Comparte ChapiGo</h2>
        <p class="muted small">Quien escanee el código puede usar la app en el navegador o instalarla en su celular.</p>
        ${qrBox()}
        <button class="btn" data-act="copyLink">${svg('copy', 18)}Copiar enlace</button>
      </div></div>`;
  }
  function resetSheet() {
    return `<div class="overlay"><button class="scrim" data-act="closeSheets" aria-label="Cerrar"></button>
      <div class="sheet" role="dialog" aria-label="Borrar mis datos"><span class="handle"></span>
        <h2 class="display t-s">¿Borrar tus datos?</h2>
        <p class="muted">Se borran de este celular tus guardados, tu recorrido, tu perfil, tus zonas y tus preferencias. No se puede deshacer.</p>
        <div class="grid2"><button class="btn ghost" data-act="closeSheets">Cancelar</button><button class="btn danger" data-act="doReset">Borrar</button></div>
      </div></div>`;
  }

  // ---------- Guardados ----------
  function guardados() {
    const s = state;
    const seg = [['lugares', 'Lugares'], ['recorridos', 'Recorridos'], ['zonas', 'Zonas']].map(([id, label]) => `<button class="${on(s.savedSeg === id)}" data-act="savedSeg" data-v="${id}">${label}</button>`).join('');
    let body;
    if (s.savedSeg === 'lugares') {
      const ps = s.saved.map((id) => PLACE[id]).filter(Boolean);
      body = ps.length ? ps.map((p) => `<div class="saved-row">${txPlace(p)}<button class="round" data-act="toggleSave" data-id="${p.id}" aria-label="Quitar ${esc(p.name)}">${svg('x', 17)}</button></div>`).join('')
        : `<div class="card empty">${svg('bookmark', 26)}<b>Aún no guardas lugares</b><span class="muted small">Toca el marcador en la ficha de un lugar para tenerlo a mano.</span><button class="btn sm soft" data-act="tab" data-v="explorar">Explorar lugares</button></div>`;
    } else if (s.savedSeg === 'recorridos') {
      const ts = (state.myTour.length ? [mineTour()] : []).concat(TOURS.filter((t) => s.savedTours.includes(t.id)));
      body = ts.length ? ts.map((t) => tourCard(t)).join('')
        : `<div class="card empty">${svg('route', 26)}<b>Aún no guardas recorridos</b><span class="muted small">Guarda un plan desde su detalle o arma el tuyo.</span><button class="btn sm soft" data-act="tab" data-v="recorridos">Ver recorridos</button></div>`;
    } else {
      const mine = ZONES.filter((z) => s.savedZones.includes(z.id));
      const others = ZONES.filter((z) => !s.savedZones.includes(z.id));
      body = (mine.length ? mine.map((z) => {
        const al = zoneAlerts(z.id).length; const pl = PLACES.filter((p) => p.zone === z.id && !p.hidden).length;
        return `<div class="card zone-card">
          <div class="row"><span class="ev-icon">${svg('target', 20)}</span><span class="grow"><b>${esc(z.name)}</b><span class="muted small" style="display:block">${al} ${al === 1 ? 'aviso activo' : 'avisos activos'} · ${pl} ${pl === 1 ? 'lugar' : 'lugares'}</span></span>
            ${swBtn('zoneNotif', z.id, !!s.zoneNotif[z.id], 'Avisos de ' + z.name)}</div>
          <div class="grid2"><button class="btn sm soft" data-act="zoneMap" data-id="${z.id}">${svg('map', 17)}Ver mapa</button><button class="btn sm ghost" data-act="zoneToggle" data-id="${z.id}">Dejar de seguir</button></div></div>`;
      }).join('') : `<div class="card empty">${svg('target', 26)}<b>Sigue las zonas por donde pasas</b><span class="muted small">Te avisamos cuando alguien reporte algo en ellas.</span></div>`)
        + (others.length ? `<div class="section-head"><h3 class="h3">Zonas de Lourdes</h3></div><div class="row-wrap">${others.map((z) => `<button class="chip" data-act="zoneToggle" data-id="${z.id}">${svg('plus', 15)}${esc(z.name)}</button>`).join('')}</div>` : '');
    }
    return `<div class="page screen">${tabHeader('Tu lista', 'Guardados')}
      <div class="seg">${seg}</div><div class="list">${body}</div></div>`;
  }

  // ---------- Perfil ----------
  function perfil() {
    const s = state;
    const aportes = s.posts.filter((p) => p.mine).length + Object.values(s.comments).flat().filter((c) => c.mine).length;
    const notifs = [['seguridad', 'Seguridad en mis zonas'], ['obras', 'Obras en mi ruta'], ['eventos', 'Planes y eventos']]
      .map(([k, label]) => sw('notif', k, s.notif[k], label)).join('');
    const name = s.profile.name.trim() || 'Estudiante';
    return `<div class="page screen">
      ${tabHeader('Tu cuenta', 'Perfil', '<span style="width:46px"></span>')}
      <div class="hero-card">
        <div class="row" style="gap:14px"><span class="avatar lg">${initials(s.profile.name)}</span>
          <span class="stack-sm grow" style="align-items:flex-start;gap:6px"><b style="font-size:19px">${esc(name)}</b>
          <span class="small" style="opacity:.9">${esc(s.profile.uni || 'Agrega tu universidad')}${s.profile.program ? ' · ' + esc(s.profile.program) : ''}</span>
          ${s.verified ? `<span class="tag glass">${svg('check', 13, 3)}Estudiante verificado</span>` : '<button class="pill" data-act="openVerify" style="color:#fff;cursor:pointer">Verificar correo universitario</button>'}</span>
          <button class="round glass" data-act="goSub" data-v="editar" aria-label="Editar perfil">${svg('edit', 19)}</button></div>
        <div class="hero-stats"><div><b>${aportes}</b>Aportes</div><div><b>${s.saved.length + s.savedTours.length + s.savedZones.length}</b>Guardados</div><div><b>${s.tripsDone}</b>Recorridos</div></div>
      </div>
      <div class="card" style="gap:2px;padding:8px">
        ${listrow('goSub', 'edit', 'Editar perfil', 'Nombre, universidad y carrera', 'data-v="editar"')}
        ${listrow('editInterests', 'star', 'Intereses y presupuesto', `${s.interests.length} intereses · ${{ b1: 'hasta $15 mil', b2: '$15 a 30 mil', b3: 'más de $30 mil' }[s.budget]}`)}
        ${listrow('goSub', 'shield', 'Contacto de confianza', s.contact.name ? esc(s.contact.name) : 'Para compartir tu ruta', 'data-v="contacto"')}
        ${listrow('openZones', 'target', 'Mis zonas', `${s.savedZones.length} ${s.savedZones.length === 1 ? 'zona' : 'zonas'} con avisos`)}
      </div>
      ${showInstall() || SHARE ? `<div class="card" style="gap:2px;padding:8px">
        ${showInstall() ? listrow('installApp', 'download', 'Instalar ChapiGo', isIOS ? 'Agrégala a tu pantalla de inicio' : 'Úsala como app, a pantalla completa') : ''}
        ${SHARE ? listrow('openShare', 'qr', 'Compartir ChapiGo', 'Código QR y enlace para tus amigos') : ''}
      </div>` : ''}
      <div class="card"><h3 class="h3">Apariencia</h3>${themeSeg()}${fsSupported() && !standalone ? sw('toggleFs', '', !!fsEl(), 'Pantalla completa') : ''}</div>
      <div class="card flat"><h3 class="h3" style="padding-top:12px">Avisos</h3>${notifs}</div>
      <div class="card" style="gap:2px;padding:8px">
        ${listrow('goSub', 'lock', 'Ubicación y privacidad', s.privacy.location ? 'Ubicación activa mientras usas la app' : 'Ubicación desactivada', 'data-v="privacidad"')}
        ${listrow('goSub', 'users', 'Reglas de la comunidad', 'Cómo cuidarnos entre todos', 'data-v="reglas"')}
        ${listrow('goSub', 'question', 'Ayuda', 'Preguntas frecuentes y contacto', 'data-v="ayuda"')}
        ${listrow('goSub', 'info', 'Acerca de ChapiGo', 'Piloto Lourdes · versión 1.0', 'data-v="acerca"')}
      </div>
      <button class="btn ghost" data-act="logout">${svg('logout', 19)}Cerrar sesión</button>
      <div class="row" style="justify-content:center"><img src="assets/logo-mark.png" alt="" style="width:28px"><span class="muted small">ChapiGo · Chapinero Central</span></div>
    </div>`;
  }
  function editarPerfil() {
    const s = state;
    const unis = UNIVERSITIES.map((u) => `<button class="chip ${on(s.profile.uni === u)}" data-act="pfUni" data-v="${esc(u)}">${esc(u)}</button>`).join('');
    return `<div class="page screen">
      ${topbar('Editar perfil')}
      <div class="center stack-sm" style="display:flex"><span class="avatar lg" style="box-shadow:var(--shadow)">${initials(s.profile.name)}</span></div>
      <div class="stack-sm"><label class="flabel" for="pfName">Nombre</label><input id="pfName" class="field" maxlength="40" autocomplete="off" placeholder="Cómo quieres que te llamemos" value="${esc(s.profile.name)}"></div>
      <div class="stack-sm"><span class="flabel">Universidad</span><div class="row-wrap">${unis}</div></div>
      <div class="stack-sm"><label class="flabel" for="pfProgram">Carrera o programa</label><input id="pfProgram" class="field" maxlength="50" autocomplete="off" placeholder="Ej.: Diseño Industrial" value="${esc(s.profile.program)}"></div>
      <p class="muted small">Tu nombre solo aparece en tus comentarios cuando no publicas como anónimo.</p>
      <button class="btn" data-act="saveProfile">Guardar cambios</button>
    </div>`;
  }
  function contacto() {
    const c = state.contact;
    return `<div class="page screen">
      ${topbar('Contacto de confianza')}
      <div class="card"><div class="row" style="align-items:flex-start"><span class="ev-icon">${svg('shield', 20)}</span><span class="grow small" style="line-height:1.5">Cuando uses <b>Regreso seguro</b> o cualquier ruta, puedes compartirle tu recorrido y avisarle cuando llegues.</span></div></div>
      <div class="stack-sm"><label class="flabel" for="ctName">Nombre</label><input id="ctName" class="field" maxlength="30" autocomplete="off" placeholder="Ej.: Mamá, Andrea" value="${esc(c.name)}"></div>
      <div class="stack-sm"><label class="flabel" for="ctPhone">Celular</label><input id="ctPhone" class="field" type="tel" inputmode="tel" maxlength="15" autocomplete="off" placeholder="300 123 4567" value="${esc(c.phone)}"></div>
      <button class="btn" data-act="saveContact">Guardar contacto</button>
      ${c.name ? '<button class="btn danger" data-act="removeContact">Quitar contacto</button>' : ''}
    </div>`;
  }
  function privacidad() {
    const p = state.privacy;
    const item = (t) => `<li><span class="check">${svg('check', 14, 3)}</span>${t}</li>`;
    return `<div class="page screen">
      ${topbar('Ubicación y privacidad')}
      <div class="card flat">
        ${sw('privacy', 'location', p.location, 'Usar mi ubicación', 'Solo mientras la app está abierta')}
        ${sw('privacy', 'approx', p.approx, 'Mostrar solo mi zona', 'En Comunidad nadie ve tu punto exacto')}
        ${sw('privacy', 'history', p.history, 'Guardar historial de recorridos', 'Apagado: no queda registro de por dónde caminas')}
      </div>
      <div class="card"><h3 class="h3">Lo que guarda ChapiGo</h3>
        <ul class="checklist">${item('Tus guardados y preferencias, solo en este celular')}${item('Tus publicaciones, sin tu nombre si eliges anónimo')}${item('Nunca vendemos ni compartimos tu ubicación')}</ul></div>
      <button class="btn danger" data-act="askReset">${svg('trash', 19)}Borrar mis datos de la app</button>
    </div>`;
  }
  function reglas() {
    return `<div class="page screen">
      ${topbar('Reglas de la comunidad')}
      <div><h1 class="display t-m">Nos cuidamos entre todos</h1><p class="muted" style="margin-top:6px">La comunidad de ChapiGo funciona porque lo que se publica es útil, verdadero y respetuoso.</p></div>
      <div class="rules">${RULES.map(([icon, t, d]) => `<div class="rule"><span class="ico">${svg(icon, 20)}</span><span><b>${t}</b><span>${d}</span></span></div>`).join('')}</div>
      <p class="muted small">Cuando varias personas reportan una publicación, se oculta mientras la revisamos.</p>
    </div>`;
  }
  function ayuda() {
    return `<div class="page screen">
      ${topbar('Ayuda')}
      <h1 class="display t-m">¿En qué te ayudamos?</h1>
      <div class="faq">${FAQ.map(([q, a]) => `<details><summary>${q}${svg('chevron', 18)}</summary><p>${a}</p></details>`).join('')}</div>
      <div class="card"><div class="row"><span class="ev-icon">${svg('compass', 20)}</span><span class="grow"><b>Ver la introducción otra vez</b><span class="muted small" style="display:block">Vuelve a elegir intereses y presupuesto.</span></span></div>
        <button class="btn sm soft" data-act="replayIntro">Ver introducción</button></div>
      <div class="card"><h3 class="h3">Escríbenos</h3>
        <textarea id="helpMsg" class="field" rows="3" maxlength="400" placeholder="Cuéntanos qué pasó o qué te gustaría ver en la app" style="padding:14px 18px;min-height:96px;resize:none;line-height:1.4">${esc(state.helpMsg)}</textarea>
        <button class="btn sm" data-act="sendHelp">${svg('send', 18)}Enviar mensaje</button></div>
    </div>`;
  }
  function acerca() {
    const photos = Object.entries(PHOTO).map(([id, ph]) => `<li>${esc(PLACE[id].name)}: ${esc(ph.author)}, ${ph.license}</li>`).join('');
    return `<div class="page screen">
      ${topbar('Acerca de ChapiGo')}
      <div class="center stack" style="display:flex;padding:8px 0">${brand(190)}<span class="tag recomienda">Piloto Lourdes · versión 1.0</span></div>
      <p class="about">ChapiGo es un sistema de orientación y descubrimiento para Chapinero Central. Ayuda a los estudiantes a moverse a pie por calles que se sienten seguras, encontrar planes según su tiempo y presupuesto, y avisarse entre todos lo que pasa en la calle.</p>
      <p class="about">Esta versión es un piloto en el barrio Lourdes, entre las calles 57 y 67, la Av. Caracas y la Cra. 7.</p>
      <div class="card credits"><h3 class="h3">Créditos</h3>
        <p><b>Mapa:</b> datos © colaboradores de <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>, licencia ODbL.</p>
        <p><b>Fotos:</b> Wikimedia Commons, con licencias libres.</p><ul>${photos}</ul>
        <p>Los comercios, publicaciones y avisos de esta versión son de ejemplo, ubicados en calles reales del barrio.</p></div>
    </div>`;
  }

  // ---------- Estructura general ----------
  function dock() {
    const tabs = [['explorar', 'Explorar', 'compass'], ['recorridos', 'Recorridos', 'route'], ['comunidad', 'Comunidad', 'users'], ['guardados', 'Guardados', 'bookmark'], ['perfil', 'Perfil', 'user']];
    return `<nav class="dock" aria-label="Secciones">${tabs.map(([id, label, icon]) =>
      `<button class="dock-btn ${on(state.tab === id)}" data-act="tab" data-v="${id}" aria-label="${label}" ${state.tab === id ? 'aria-current="page"' : ''}>${svg(icon)}<span>${label}</span></button>`).join('')}</nav>`;
  }
  const PERFIL_SUB = { editar: editarPerfil, contacto, privacidad, reglas, ayuda, acerca };
  function appScreen() {
    const s = state;
    if (PERFIL_SUB[s.sub]) return PERFIL_SUB[s.sub]();
    if (s.tab === 'explorar') {
      if (s.sub === 'mapa') return mapa();
      if (s.sub === 'ficha') return ficha();
      if (s.sub === 'ruta') return ruta();
      if (s.sub === 'preview') return preview();
      if (s.sub === 'nav') return nav();
      return explorar();
    }
    if (s.tab === 'recorridos') return s.sub === 'detalle' ? tourDetail() : recorridos();
    if (s.tab === 'comunidad') {
      if (s.sub === 'detalle') return alerta();
      if (s.sub === 'publicar') return publicar();
      return comunidad();
    }
    if (s.tab === 'guardados') return guardados();
    if (PERFIL_SUB[s.sub]) return PERFIL_SUB[s.sub]();
    return perfil();
  }
  function view() {
    const s = state;
    if (s.screen === 'launch') return launch() + looseSheet();
    if (s.screen === 'welcome') return welcome() + looseSheet();
    if (s.screen === 'interests') return interests();
    if (s.screen === 'budget') return budget();
    if (s.screen === 'location') return locationScreen();
    const full = s.tab === 'explorar' && (s.sub === 'nav' || s.sub === 'mapa');
    const home = s.tab === 'explorar' && !s.sub;
    return `<div class="shell"><div class="scroll${s.sub === 'mapa' ? ' fixed' : ''}" id="scroll">${appScreen()}</div>
        ${full ? '' : dock()}
        ${home && s.filtersOpen ? filtersSheet() : ''}
        ${s.newsOpen ? newsSheet() : ''}
        ${s.sheet === 'verify' ? verifySheet() : ''}
        ${s.sheet === 'reset' ? resetSheet() : ''}
        ${s.sheet === 'install' ? installSheet() : ''}
        ${s.sheet === 'share' ? shareSheet() : ''}</div>`;
  }
  // Las hojas de instalar y compartir también se abren desde la bienvenida.
  const looseSheet = () => (state.sheet === 'install' ? installSheet() : state.sheet === 'share' ? shareSheet() : '');

  // ---------- Dibujo, transiciones y barra que se oculta ----------
  const app = document.getElementById('app');
  const viewEl = document.getElementById('view');
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastKey = '';
  let barHidden = false;
  let lastY = 0;

  function makeGhost() {
    const oldPage = viewEl.querySelector('.page');
    if (!oldPage) return null;
    const scroller = document.getElementById('scroll');
    const host = scroller || viewEl;
    const a = app.getBoundingClientRect();
    const r = host.getBoundingClientRect();
    const ghost = document.createElement('div');
    ghost.className = 'screen-ghost';
    ghost.style.cssText = `top:${r.top - a.top}px;left:${r.left - a.left}px;width:${r.width}px;height:${r.height}px`;
    const inner = oldPage.cloneNode(true);
    inner.classList.remove('in-forward', 'in-back', 'in-tab', 'in-fade');
    inner.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
    inner.querySelectorAll('.rv').forEach((n) => { n.classList.remove('rv'); n.removeAttribute('data-rv'); });
    inner.style.transform = `translateY(${-(scroller ? scroller.scrollTop : 0)}px)`;
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0';
    wrap.appendChild(inner);
    ghost.appendChild(wrap);
    return ghost;
  }
  function onScroll(e) {
    const el = e.currentTarget;
    const y = el.scrollTop;
    const dy = y - lastY;
    if (y < 40) setBar(false);
    else if (dy > 6) setBar(true);
    else if (dy < -6) setBar(false);
    lastY = y;
  }
  function setBar(hidden) {
    if (hidden === barHidden) return;
    barHidden = hidden;
    const shell = viewEl.querySelector('.shell');
    if (shell) shell.classList.toggle('bar-hidden', hidden);
  }
  // Aparición escalonada: la tarjeta principal sube primero, los botones redondos
  // aparecen con un pequeño rebote y luego llegan las filas, con pausas cada vez más cortas.
  const REVEAL_GROUPS = '.actions, .people, .list, .grid2, .grid3, .stack, .checklist, .stops, .rules, .faq';
  const OWN_ANIMATION = '.event, .bigicon';
  function revealTargets(page) {
    const out = [];
    for (const el of page.children) {
      if (el.matches(REVEAL_GROUPS) && el.children.length) out.push(...el.children);
      else out.push(el);
    }
    return out;
  }
  function reveal(page, slow) {
    const host = document.getElementById('scroll') || viewEl;
    const box = host.getBoundingClientRect();
    const limit = box.bottom;
    const cap = slow ? 560 : 340;
    let i = 0;
    for (const el of revealTargets(page)) {
      if (el.matches(':empty') || el.matches(OWN_ANIMATION)) continue;
      const r = el.getBoundingClientRect();
      if (r.top > limit) break; // Lo que está fuera de la vista no se anima.
      if (r.left > box.right) continue;
      let kind = 'rise';
      if (el.matches('.hero-card, .hero-photo, .onb-hero')) kind = 'lead';
      else if (el.matches('.action, .person')) kind = 'pop';
      else if (el.matches('.header, .topbar') || (el.matches('.between') && el === page.firstElementChild)) kind = 'fade';
      el.style.setProperty('--d', Math.round(cap * (1 - Math.pow(0.8, i))) + 'ms');
      el.dataset.rv = kind;
      el.classList.add('rv');
      const done = (e) => {
        if (e.target !== el) return;
        el.classList.remove('rv');
        el.removeAttribute('data-rv');
        el.style.removeProperty('--d');
        el.removeEventListener('animationend', done);
      };
      el.addEventListener('animationend', done);
      i++;
    }
  }
  function onPick(pt) {
    if (state.tab === 'comunidad' && state.sub === 'publicar') set({ draftPt: [Math.round(pt[0]), Math.round(pt[1])] });
  }
  function render() {
    const s = state;
    const arrived = s.sub === 'nav' && s.navStep >= tripPlan(s.trip, tripMode()).steps.length;
    const key = [s.screen, s.tab, s.sub, s.placeId, s.tourId, s.postId, s.trip.kind + s.trip.id, arrived].join('|');
    const changed = key !== lastKey;
    const animate = changed && lastKey !== '' && !reduceMotion();
    const dir = nextDir;
    nextDir = 'forward';

    // Foco y posición del texto, para no perderlos al redibujar.
    const ae = document.activeElement;
    const focusId = ae && ae.id && viewEl.contains(ae) ? ae.id : null;
    const sel = focusId && typeof ae.selectionStart === 'number' ? [ae.selectionStart, ae.selectionEnd] : null;
    const oldScroller = document.getElementById('scroll');
    const keep = !changed && oldScroller ? oldScroller.scrollTop : 0;
    const ghost = animate ? makeGhost() : null;

    viewEl.innerHTML = view();
    G.mountAll(viewEl, { onPick });

    const scroller = document.getElementById('scroll');
    if (scroller) {
      scroller.scrollTop = keep;
      lastY = keep;
      scroller.addEventListener('scroll', onScroll, { passive: true });
    }
    if (changed) barHidden = false;
    const shell = viewEl.querySelector('.shell');
    if (shell) shell.classList.toggle('bar-hidden', barHidden);

    if (focusId) {
      const el = document.getElementById(focusId);
      if (el) {
        el.focus({ preventScroll: true });
        if (sel && el.setSelectionRange) { try { el.setSelectionRange(sel[0], sel[1]); } catch (e) { /* campo sin selección */ } }
      }
    }
    if (animate) {
      const page = viewEl.querySelector('.page');
      // Al volver atrás la pantalla ya es conocida: solo se desliza, sin aparición.
      const staged = page && dir !== 'back' && !page.classList.contains('launch') && !page.classList.contains('mapscreen');
      if (staged) reveal(page, s.screen !== 'app');
      // Entre secciones el contenido ya entra escalonado, así que la página no se mueve dos veces.
      if (page && !(staged && (dir === 'tab' || dir === 'fade'))) page.classList.add('in-' + dir);
      if (ghost) {
        ghost.classList.add('out-' + dir);
        app.appendChild(ghost);
        setTimeout(() => ghost.remove(), 450);
      }
    }
    lastKey = key;
  }

  // ---------- Acciones ----------
  function vote(id, kind) {
    set((st) => {
      const prev = st.votes[id];
      const posts = st.posts.map((p) => {
        if (p.id !== id) return p;
        let yes = p.yes; let no = p.no;
        if (prev === 'yes') yes -= 1;
        if (prev === 'no') no -= 1;
        if (prev !== kind) { if (kind === 'yes') yes += 1; else no += 1; }
        return Object.assign({}, p, { yes, no });
      });
      const votes = Object.assign({}, st.votes);
      if (prev === kind) delete votes[id]; else votes[id] = kind;
      hzVer++;
      return { posts, votes };
    });
  }
  function publish() {
    const s = state;
    if (!s.verified) { set({ sheet: 'verify' }); return toast('Primero verifica tu correo universitario'); }
    const text = s.draftText.trim();
    if (!text) return toast('Escribe qué pasó');
    const z = ZONE[s.draftZone];
    const jitter = () => Math.round((Math.random() - 0.5) * 40);
    const pt = s.draftPt || [z.pt[0] + jitter(), z.pt[1] + jitter()];
    const p = { id: 'u' + Date.now(), type: s.draftType, text, zone: z.id, time: 'Ahora', expires: TYPES[s.draftType].expires,
      yes: 1, no: 0, mine: true, anon: s.anon, pt };
    hzVer++;
    state.posts = [p].concat(state.posts);
    state.votes = Object.assign({}, state.votes, { [p.id]: 'yes' });
    state.draftText = ''; state.draftPt = null; state.commType = 'todo'; state.commScope = 'todo';
    const mapable = p.type === 'seguridad' || p.type === 'calle';
    back();
    toast(mapable ? 'Publicado. Ya aparece en el mapa y las rutas seguras lo tienen en cuenta.' : 'Publicado en Comunidad.');
  }
  function stepEvents() {
    const steps = tripPlan(state.trip, tripMode()).steps;
    if (state.vibrate && navigator.vibrate) { try { navigator.vibrate(60); } catch (e) { /* sin vibración */ } }
    if (state.navStep >= steps.length) {
      const d = tripPlan(state.trip, tripMode()).dest;
      if (d.ev) setTimeout(() => push(Object.assign({ placeId: d.id }, d.ev)), 600);
      return;
    }
    const ev = eventFor(steps[state.navStep]);
    if (ev) setTimeout(() => push(ev), 450);
  }
  function enterApp(msg) {
    hist.length = 0;
    set({ screen: 'app', tab: 'explorar', sub: null, onboarded: true });
    if (msg) toast(msg);
    if (!state.welcomed) {
      state.welcomed = true;
      setTimeout(() => { if (state.screen === 'app') push(NEWS[1], 5200); }, msg ? 2800 : 1000);
    }
  }
  const startScreen = () => (state.onboarded ? enterApp() : set({ screen: 'welcome' }));
  function selectOnMap(kind, id, clear) {
    const pt = kind === 'place' ? PLACE[id] && PLACE[id].pt : (state.posts.find((p) => p.id === id) || {}).pt;
    set(Object.assign({ mapSel: { kind, id } }, clear ? { mapQ: '' } : {}));
    if (pt) G.centerOn('full', [pt[0], pt[1] + 60 / Math.max(0.5, G.zoomOf('full') || 1)], Math.max(G.zoomOf('full') || 1, 1));
  }

  // ---------- Pantalla completa ----------
  function fsEl() { return document.fullscreenElement || document.webkitFullscreenElement || null; }
  function fsSupported() {
    const el = document.documentElement;
    return !!(el.requestFullscreen || el.webkitRequestFullscreen) && !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  }
  async function enterFs() {
    const el = document.documentElement;
    try {
      if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' });
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      return true;
    } catch (e) { toast('Este navegador no permite la pantalla completa aquí'); return false; }
  }
  async function exitFs() {
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } catch (e) { /* ya estaba fuera */ }
  }
  function onFsChange() {
    document.documentElement.classList.toggle('fs', !!fsEl());
    render();
  }
  document.addEventListener('fullscreenchange', onFsChange);
  document.addEventListener('webkitfullscreenchange', onFsChange);

  async function installApp() {
    if (install.prompt) {
      const ev = install.prompt;
      install.prompt = null;
      try {
        ev.prompt();
        const choice = await ev.userChoice;
        if (choice && choice.outcome === 'accepted') { install.done = true; render(); return; }
      } catch (e) { /* el navegador no dejó instalar directo */ }
      render();
      return;
    }
    set({ sheet: 'install' });
  }
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); install.prompt = e; });
  window.addEventListener('appinstalled', () => {
    install.prompt = null; install.done = true;
    if (state.screen === 'launch') startScreen(); else render();
    toast('ChapiGo quedó instalada. Ábrela desde tu pantalla de inicio.');
  });

  const ACTIONS = {
    noop: () => {},
    installApp,
    openShare: () => set({ sheet: 'share' }),
    copyLink: () => {
      const url = SHARE || location.href;
      const fallback = () => {
        const el = document.getElementById('siteLink');
        if (el) { const r = document.createRange(); r.selectNodeContents(el); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); }
        toast('Mantén presionado el enlace para copiarlo');
      };
      try { navigator.clipboard.writeText(url).then(() => toast('Enlace copiado'), fallback); } catch (e) { fallback(); }
    },
    openFs: async () => { await enterFs(); startScreen(); },
    continueLaunch: () => startScreen(),
    toggleFs: () => (fsEl() ? exitFs() : enterFs()),
    theme: (d) => { state.theme = d.v; applyTheme(); render(); },
    start: () => set({ screen: 'interests', editing: false }),
    guest: () => enterApp(),
    backOnb: () => {
      nextDir = 'back';
      if (state.screen === 'budget') return set({ screen: 'interests' });
      if (state.screen === 'location') return set({ screen: 'budget' });
      set(state.editing ? { screen: 'app', editing: false } : { screen: 'welcome' });
    },
    interest: (d) => set((st) => ({ interests: st.interests.includes(d.id) ? st.interests.filter((x) => x !== d.id) : st.interests.concat(d.id) })),
    interestsNext: () => (state.editing ? set({ screen: 'budget' }) : set({ screen: 'budget' })),
    budget: (d) => set({ budget: d.v }),
    freeTime: (d) => set({ freeTime: d.v }),
    toLocation: () => {
      if (state.editing) { set({ screen: 'app', tab: 'perfil', sub: null, editing: false }, 'back'); return toast('Intereses y presupuesto guardados'); }
      set({ screen: 'location' });
    },
    allowLoc: () => { state.privacy = Object.assign({}, state.privacy, { location: true }); enterApp('Ubicación activada'); },
    skipLoc: () => { state.privacy = Object.assign({}, state.privacy, { location: false }); enterApp(); },
    tab: (d) => {
      if (d.v === state.tab && !state.sub) return;
      hist.length = 0;
      set({ tab: d.v, sub: null, filtersOpen: false, newsOpen: false, sheet: null, navStep: 0 }, 'tab');
    },
    goSub: (d) => go(Object.assign({ sub: d.v }, d.tab ? { tab: d.tab } : {})),
    cat: (d) => set({ cat: d.id }),
    openFilters: () => set({ filtersOpen: true, newsOpen: false }),
    openNews: () => set({ newsOpen: true, filtersOpen: false, newsSeen: true }),
    closeSheets: () => set({ filtersOpen: false, newsOpen: false, sheet: null }),
    clearFilters: () => set({ f: { abierto: false, cerca: false, wifi: false }, maxLevel: 3, cat: 'todas', q: '' }),
    maxLevel: (d) => set({ maxLevel: Number(d.v) }),
    toggleF: (d) => set((st) => ({ f: Object.assign({}, st.f, { [d.k]: !st.f[d.k] }) })),
    toggleLayer: () => set({ layer: !state.layer }),
    openPlace: (d) => { closePush(); go({ tab: 'explorar', sub: 'ficha', placeId: d.id }); },
    openMap: (d) => {
      closePush();
      const sel = d && d.kind ? { kind: d.kind, id: d.id } : null;
      go({ tab: 'explorar', sub: 'mapa', mapSel: sel, mapQ: '' });
      if (sel) selectOnMap(sel.kind, sel.id);
    },
    mapSel: (d) => selectOnMap(d.kind, d.id, d.clear),
    mapCat: (d) => set({ mapCat: d.id, mapSel: null }),
    mapZoom: (d) => G.control(d.id, d.v),
    mapLocate: (d) => G.centerOn(d.id, ORIGIN.pt),
    zoneMap: (d) => { const z = ZONE[d.id]; go({ tab: 'explorar', sub: 'mapa', mapSel: null, mapQ: '' }); G.centerOn('full', z.pt, 1.1); },
    back,
    closePush,
    toggleSave: (d) => {
      const id = d.id || place().id; const was = state.saved.includes(id);
      set((st) => ({ saved: was ? st.saved.filter((x) => x !== id) : st.saved.concat(id) }));
      toast(was ? 'Quitado de guardados' : 'Guardado en tu lista');
    },
    mineToggle: (d) => {
      const was = state.myTour.includes(d.id);
      set((st) => ({ myTour: was ? st.myTour.filter((x) => x !== d.id) : st.myTour.concat(d.id) }));
      toast(was ? 'Quitado de tu recorrido' : `Agregado a tu recorrido (${state.myTour.length} ${state.myTour.length === 1 ? 'parada' : 'paradas'})`);
    },
    mineMove: (d) => set((st) => {
      const a = st.myTour.slice(); const i = a.indexOf(d.id); const j = i + Number(d.v);
      if (i < 0 || j < 0 || j >= a.length) return {};
      [a[i], a[j]] = [a[j], a[i]];
      return { myTour: a };
    }),
    goRoute: (d) => { const id = d.id || place().id; go({ tab: 'explorar', sub: 'ruta', placeId: id, trip: { kind: 'place', id }, route: 'segura' }); },
    pickRoute: (d) => set({ route: d.v }),
    goPreview: () => go({ sub: 'preview' }),
    toggleVibrate: () => set({ vibrate: !state.vibrate }),
    toggleShare: () => set({ shareRoute: !state.shareRoute }),
    startNav: () => {
      go({ tab: 'explorar', sub: 'nav', navStep: 0 });
      if (state.shareRoute && state.contact.name) toast(`Compartiendo tu ruta con ${state.contact.name}`);
      stepEvents();
    },
    nextStep: () => { set((st) => ({ navStep: st.navStep + 1 })); stepEvents(); },
    finishNav: () => {
      while (hist.length && ['nav', 'preview', 'ruta'].includes(hist[hist.length - 1].sub)) hist.pop();
      state.tripsDone += 1;
      back();
      toast('Recorrido terminado. ¡Buen plan!');
    },
    report: () => { closePush(); go({ tab: 'comunidad', sub: 'publicar', draftType: 'calle', draftZone: HOME_ZONE, draftPt: null }); },
    tourTime: (d) => set({ tourTime: d.v }),
    openTour: (d) => go({ tab: 'recorridos', sub: 'detalle', tourId: d.id }),
    toggleTour: () => {
      const id = tour().id; const was = state.savedTours.includes(id);
      set((st) => ({ savedTours: was ? st.savedTours.filter((x) => x !== id) : st.savedTours.concat(id) }));
      toast(was ? 'Quitado de guardados' : 'Recorrido guardado');
    },
    startTour: () => {
      const t = tour();
      if (t.stops.length === 1) return go({ tab: 'explorar', sub: 'ruta', placeId: t.stops[0], trip: { kind: 'place', id: t.stops[0] }, route: 'segura' });
      go({ tab: 'explorar', sub: 'preview', trip: { kind: 'tour', id: t.id } });
    },
    commType: (d) => set({ commType: d.v }),
    commScope: (d) => set({ commScope: d.v }),
    vote: (d) => vote(d.id, d.k),
    openPost: (d) => { closePush(); go({ tab: 'comunidad', sub: 'detalle', postId: d.id, commentDraft: '' }); },
    flagPost: () => {
      const id = state.postId;
      state.flagged = state.flagged.concat(id);
      hzVer++;
      back();
      toast('Gracias. Ocultamos la publicación mientras la revisamos.');
    },
    goPublicar: (d) => { closePush(); go({ tab: 'comunidad', sub: 'publicar', draftType: d.type || state.draftType, draftPt: null }); },
    toggleMap: () => set({ showMap: !state.showMap }),
    safeReturn: () => go({ tab: 'explorar', sub: 'ruta', placeId: 'tm', trip: { kind: 'place', id: 'tm' }, route: 'segura' }),
    focusSearch: () => { const el = document.getElementById('buscar'); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.focus({ preventScroll: true }); } },
    seeAll: () => { const el = document.getElementById('placeList'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); },
    draftType: (d) => set({ draftType: d.v }),
    draftZone: (d) => { G.forget('pick'); set({ draftZone: d.v, draftPt: null }); },
    toggleAnon: () => set({ anon: !state.anon }),
    openVerify: () => set({ sheet: 'verify', verifyBusy: false }),
    doVerify: () => {
      const email = (state.verifyEmail || '').trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return toast('Escribe un correo válido');
      set({ verifyBusy: true });
      setTimeout(() => { set({ verified: true, verifyBusy: false, sheet: null }); toast('Correo universitario verificado'); }, 1200);
    },
    publish,
    sendComment,
    savedSeg: (d) => set({ savedSeg: d.v }),
    zoneToggle: (d) => {
      const was = state.savedZones.includes(d.id);
      set((st) => ({ savedZones: was ? st.savedZones.filter((x) => x !== d.id) : st.savedZones.concat(d.id), zoneNotif: Object.assign({}, st.zoneNotif, { [d.id]: !was }) }));
      toast(was ? 'Dejaste de seguir la zona' : `Te avisaremos de lo que pase en ${ZONE[d.id].name}`);
    },
    zoneNotif: (d) => set((st) => ({ zoneNotif: Object.assign({}, st.zoneNotif, { [d.k]: !st.zoneNotif[d.k] }) })),
    openZones: () => { hist.length = 0; set({ tab: 'guardados', sub: null, savedSeg: 'zonas' }, 'tab'); },
    notif: (d) => set((st) => ({ notif: Object.assign({}, st.notif, { [d.k]: !st.notif[d.k] }) })),
    privacy: (d) => set((st) => ({ privacy: Object.assign({}, st.privacy, { [d.k]: !st.privacy[d.k] }) })),
    editInterests: () => set({ screen: 'interests', editing: true }),
    pfUni: (d) => set((st) => ({ profile: Object.assign({}, st.profile, { uni: st.profile.uni === d.v ? '' : d.v }) })),
    saveProfile: () => { back(); toast('Perfil actualizado'); },
    saveContact: () => {
      const c = state.contact;
      if (!c.name.trim()) return toast('Escribe el nombre de tu contacto');
      if (c.phone.replace(/\D/g, '').length < 7) return toast('Revisa el número de celular');
      back();
      toast(`${c.name.trim()} es tu contacto de confianza`);
    },
    removeContact: () => { set({ contact: { name: '', phone: '' }, shareRoute: false }); back(); toast('Contacto quitado'); },
    askReset: () => set({ sheet: 'reset' }),
    doReset: () => {
      try { localStorage.removeItem(STORE); } catch (e) { /* sin almacenamiento */ }
      const theme = state.theme;
      Object.assign(state, defaults(), { theme, screen: 'welcome' });
      hist.length = 0; hzVer++;
      nextDir = 'back';
      render(); persist();
      toast('Tus datos se borraron de este celular');
    },
    replayIntro: () => { hist.length = 0; set({ screen: 'interests', editing: false, tab: 'explorar', sub: null }); },
    sendHelp: () => {
      if (!state.helpMsg.trim()) return toast('Escribe tu mensaje');
      set({ helpMsg: '' });
      toast('Recibimos tu mensaje. Te respondemos al correo verificado.');
    },
    logout: () => { hist.length = 0; set({ screen: 'welcome', tab: 'explorar', sub: null }, 'back'); }
  };

  app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el || !app.contains(el) || el.disabled) return;
    const fn = ACTIONS[el.dataset.act];
    if (fn) fn(el.dataset);
  });
  const FIELDS = {
    buscar: (v) => { state.q = v; render(); },
    mapq: (v) => { state.mapQ = v; render(); },
    commentInput: (v) => { state.commentDraft = v.slice(0, 240); },
    vEmail: (v) => { state.verifyEmail = v; },
    pfName: (v) => { state.profile = Object.assign({}, state.profile, { name: v.slice(0, 40) }); persist(); },
    pfProgram: (v) => { state.profile = Object.assign({}, state.profile, { program: v.slice(0, 50) }); persist(); },
    ctName: (v) => { state.contact = Object.assign({}, state.contact, { name: v.slice(0, 30) }); persist(); },
    ctPhone: (v) => { state.contact = Object.assign({}, state.contact, { phone: v.slice(0, 15) }); persist(); },
    helpMsg: (v) => { state.helpMsg = v.slice(0, 400); },
    draft: (v) => {
      state.draftText = v.slice(0, 80);
      const count = document.getElementById('draftCount');
      if (count) count.textContent = `${state.draftText.length}/80`;
      const btn = document.getElementById('publishBtn');
      if (btn) btn.classList.toggle('off', !(state.verified && state.draftText.trim()));
    }
  };
  app.addEventListener('input', (e) => {
    const fn = FIELDS[e.target.id];
    if (fn) fn(e.target.value);
  });
  app.addEventListener('keydown', (e) => {
    if (e.target.id === 'commentInput' && e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendComment(); }
    if (e.target.id === 'vEmail' && e.key === 'Enter') { e.preventDefault(); ACTIONS.doVerify(); }
    if (e.key === 'Escape' && (state.sheet || state.filtersOpen || state.newsOpen)) ACTIONS.closeSheets();
  });

  // Si llega desde "Abrir ChapiGo para instalar", en iPhone se muestran de una vez los pasos de Safari.
  if (location.hash === '#instalar' && !standalone && !embedded && isIOS) state.sheet = 'install';
  applyTheme();
  render();
  // Instalada o sin nada que elegir, la apertura avanza sola como en una app.
  if (launchMode() === 'auto') setTimeout(() => { if (state.screen === 'launch') startScreen(); }, 1400);
  // Funciona sin conexión y se puede instalar (solo desde la página publicada, no dentro de otra vista).
  if ('serviceWorker' in navigator && !embedded && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    // Algunos navegadores rechazan el registro mientras la página termina de cargar: se reintenta.
    const registerSW = (tries) => navigator.serviceWorker.register('sw.js')
      .then(() => { window.__chapiSW = 'ok'; })
      .catch((err) => { window.__chapiSW = String(err); if (tries > 0) setTimeout(() => registerSW(tries - 1), 2500); });
    window.__chapiSW = 'pendiente';
    if (document.readyState === 'complete') registerSW(3);
    else window.addEventListener('load', () => setTimeout(() => registerSW(3), 800));
    // También al primer toque, por si el navegador lo rechazó durante la carga.
    app.addEventListener('pointerdown', () => { if (window.__chapiSW !== 'ok') registerSW(0); }, { once: true });
  }
})();
