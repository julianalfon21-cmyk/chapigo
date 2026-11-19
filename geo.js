/* ChapiGo — calles, rutas y mapa interactivo de Lourdes.
   Las intersecciones salen del mapa real; las rutas se calculan sobre esa red de calles. */
window.CHAPI_GEO = (function () {
  'use strict';
  const M = window.LOURDES_MAP;
  const W = M.w; const H = M.h;

  // ---------- Red de calles ----------
  // Tipo de cada tramo: las avenidas con comercio y luz pesan menos en la ruta segura.
  function streetClass(kind, n, other) {
    if (kind === 'cra') {
      if (n === 14) return 'caracas';
      if (n === 13 || n === 7) return 'major';
      if (n === 11 && other >= 64) return 'major';
      if (n === 9) return 'mid';
      return 'minor';
    }
    if (n === 57 || n === 67) return 'major';
    if (n === 63 && other >= 13) return 'major';
    if (n === 64 && other <= 13) return 'major';
    if (n === 60 || n === 62 || n === 65) return 'mid';
    return 'minor';
  }
  const NODES = {}; // clave 'cra|calle' -> {k, c, x, y, adj: []}
  const seen = {};
  for (const [key, p] of Object.entries(M.X)) {
    const id = p[0] + ',' + p[1];
    if (seen[id]) continue; // dos nombres para la misma esquina
    seen[id] = key;
    const [k, c] = key.split('|').map(Number);
    NODES[key] = { key, k, c, x: p[0], y: p[1], adj: [] };
  }
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const EDGES = [];
  function link(a, b, kind, n, other) {
    const len = dist([a.x, a.y], [b.x, b.y]);
    const e = { a: a.key, b: b.key, len, kind, n, cls: streetClass(kind, n, other) };
    EDGES.push(e);
    a.adj.push(e); b.adj.push(e);
  }
  const byCra = {}; const byCl = {};
  for (const nd of Object.values(NODES)) {
    (byCra[nd.k] = byCra[nd.k] || []).push(nd);
    (byCl[nd.c] = byCl[nd.c] || []).push(nd);
  }
  for (const [k, list] of Object.entries(byCra)) {
    list.sort((a, b) => a.c - b.c);
    const max = Number(k) === 14 ? 400 : 240;
    for (let i = 0; i < list.length - 1; i++) {
      if (dist([list[i].x, list[i].y], [list[i + 1].x, list[i + 1].y]) <= max) link(list[i], list[i + 1], 'cra', Number(k), Math.min(list[i].c, list[i + 1].c));
    }
  }
  for (const [c, list] of Object.entries(byCl)) {
    list.sort((a, b) => a.k - b.k);
    for (let i = 0; i < list.length - 1; i++) {
      if (dist([list[i].x, list[i].y], [list[i + 1].x, list[i + 1].y]) <= 260) link(list[i], list[i + 1], 'cl', Number(c), Math.max(list[i].k, list[i + 1].k));
    }
  }

  const SAFE_FACTOR = { major: 1, mid: 1.35, minor: 1.7, caracas: 2.2 };
  function segDist(p, a, b) {
    const vx = b[0] - a[0]; const vy = b[1] - a[1];
    const l2 = vx * vx + vy * vy || 1;
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / l2));
    return dist(p, [a[0] + t * vx, a[1] + t * vy]);
  }
  const HAZARD_R = 45;
  function edgeCost(e, mode, hazards) {
    if (mode === 'fast') return e.len;
    let f = SAFE_FACTOR[e.cls];
    const A = [NODES[e.a].x, NODES[e.a].y]; const B = [NODES[e.b].x, NODES[e.b].y];
    for (const h of hazards) {
      if (segDist(h.pt, A, B) < HAZARD_R) f += h.type === 'seguridad' ? 1.6 : 0.8;
    }
    return e.len * f;
  }
  // Reportes que quedan sobre el trazado de una ruta.
  function hazardsOn(route, hazards) {
    return hazards.filter((h) => route.segs.some((sg) => sg.len > 1 && segDist(h.pt, sg.a, sg.b) < HAZARD_R));
  }
  // Qué tanto de la ruta va por cada tipo de calle.
  function mix(route) {
    const m = { major: 0, mid: 0, minor: 0, caracas: 0 };
    for (const sg of route.segs) m[sg.e.cls] += sg.len;
    const total = route.segs.reduce((a, sg) => a + sg.len, 0) || 1;
    for (const k of Object.keys(m)) m[k] /= total;
    return m;
  }

  // Proyección de un punto sobre el tramo más cercano.
  function snap(pt) {
    let best = null;
    for (const e of EDGES) {
      const A = NODES[e.a]; const B = NODES[e.b];
      const vx = B.x - A.x; const vy = B.y - A.y;
      const t = Math.max(0, Math.min(1, ((pt[0] - A.x) * vx + (pt[1] - A.y) * vy) / (vx * vx + vy * vy)));
      const q = [A.x + t * vx, A.y + t * vy];
      const d = dist(pt, q);
      if (!best || d < best.d) best = { e, t, q, d };
    }
    return best;
  }

  function dijkstra(startCosts, mode, hazards) {
    const D = {}; const prev = {}; const done = {};
    for (const [k, v] of Object.entries(startCosts)) D[k] = v;
    for (;;) {
      let u = null;
      for (const k of Object.keys(D)) if (!done[k] && (u === null || D[k] < D[u])) u = k;
      if (u === null) break;
      done[u] = true;
      for (const e of NODES[u].adj) {
        const v = e.a === u ? e.b : e.a;
        const nd = D[u] + edgeCost(e, mode, hazards);
        if (D[v] === undefined || nd < D[v]) { D[v] = nd; prev[v] = { u, e }; }
      }
    }
    return { D, prev };
  }

  // Ruta entre dos puntos cualesquiera: devuelve los puntos del trazado y los tramos recorridos.
  function routeBetween(fromPt, toPt, mode, hazards) {
    const s = snap(fromPt); const t = snap(toPt);
    const starts = {};
    for (const [key, frac] of [[s.e.a, s.t], [s.e.b, 1 - s.t]]) {
      const c = edgeCost(s.e, mode, hazards) * frac;
      if (starts[key] === undefined || c < starts[key]) starts[key] = c;
    }
    const { D, prev } = dijkstra(starts, mode, hazards);
    let best = null;
    for (const [key, frac] of [[t.e.a, t.t], [t.e.b, 1 - t.t]]) {
      if (D[key] === undefined) continue;
      const c = D[key] + edgeCost(t.e, mode, hazards) * frac;
      if (!best || c < best.c) best = { key, c };
    }
    // Mismo tramo de calle: camino directo.
    if (s.e === t.e) {
      const direct = Math.abs(s.t - t.t) * s.e.len;
      if (!best || (edgeCost(s.e, mode, hazards) / s.e.len) * direct <= best.c) {
        return finish([fromPt, s.q, t.q, toPt], [], [{ e: s.e, a: s.q, b: t.q, key: null }]);
      }
    }
    const keys = [];
    for (let k = best.key; k; k = prev[k] && prev[k].u) { keys.unshift(k); if (!prev[k]) break; }
    const np = (k) => [NODES[k].x, NODES[k].y];
    // Tramos: de la salida a la primera esquina, entre esquinas y de la última esquina al destino.
    const segs = [{ e: s.e, a: s.q, b: np(keys[0]), key: null }];
    for (let i = 1; i < keys.length; i++) segs.push({ e: prev[keys[i]].e, a: np(keys[i - 1]), b: np(keys[i]), key: keys[i - 1] });
    segs.push({ e: t.e, a: np(keys[keys.length - 1]), b: t.q, key: keys[keys.length - 1] });
    const pts = [fromPt, s.q].concat(keys.map(np), [t.q, toPt]);
    return finish(pts, keys, segs);
  }
  function finish(pts, keys, segs) {
    const clean = pts.filter((p, i) => i === 0 || dist(p, pts[i - 1]) > 0.5);
    let len = 0;
    for (let i = 1; i < clean.length; i++) len += dist(clean[i], clean[i - 1]);
    segs.forEach((sg) => { sg.len = dist(sg.a, sg.b); });
    return { pts: clean, keys, segs, len };
  }

  // ---------- Indicaciones paso a paso ----------
  const streetName = (e) => (e.kind === 'cra' ? (e.n === 14 ? 'Av. Caracas' : `Cra. ${e.n}`) : `Cl. ${e.n}`);
  const NOTE = { major: 'comercio abierto y buena luz', mid: 'calle con movimiento', minor: 'calle residencial, más sola', caracas: 'andén angosto junto a la obra del Metro' };
  function heading(a, b) { return [b[0] - a[0], b[1] - a[1]]; }
  function dirName(e, a, b) {
    if (e.kind === 'cra') return b[1] < a[1] ? 'el norte' : 'el sur';
    return b[0] > a[0] ? 'los cerros' : 'la Caracas';
  }
  function stepsFor(route) {
    // Agrupa los tramos seguidos de una misma calle en un solo paso.
    const groups = [];
    for (const sg of route.segs) {
      if (sg.len < 3) continue;
      const name = streetName(sg.e);
      const last = groups[groups.length - 1];
      if (last && last.name === name) {
        last.len += sg.len; last.b = sg.b; last.la = sg.a; last.lb = sg.b;
        if (sg.key) last.corners.push(sg.key);
        continue;
      }
      groups.push({ name, e: sg.e, len: sg.len, a: sg.a, b: sg.b, la: sg.a, lb: sg.b, corners: sg.key ? [sg.key] : [] });
    }
    return groups.map((g, i) => {
      const len = Math.max(10, Math.round(g.len / 10) * 10);
      let txt;
      if (i === 0) txt = `Camina por la ${g.name} hacia ${dirName(g.e, g.a, g.b)}`;
      else {
        const p = groups[i - 1];
        const v1 = heading(p.la, p.lb); const v2 = heading(g.a, g.b);
        const cross = v1[0] * v2[1] - v1[1] * v2[0];
        txt = `Gira a la ${cross > 0 ? 'derecha' : 'izquierda'} en la ${g.name}`;
      }
      return { txt, sub: `${len} m · ${NOTE[g.e.cls]}`, len, cls: g.e.cls, at: g.a, to: g.b, corners: g.corners, street: g.name };
    });
  }
  const minutes = (m) => Math.max(1, Math.round(m / 75));
  const fmtLen = (m) => (m >= 1000 ? `${(m / 1000).toFixed(1).replace('.', ',')} km` : `${Math.round(m / 10) * 10} m`);

  // ---------- Motor del mapa: arrastrar, acercar y tocar ----------
  const views = {};
  let BASE = null;
  function baseSvg() {
    if (BASE) return BASE.cloneNode(true);
    const L = M.layers;
    const html = `<svg class="gmap-base" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
      <rect class="m-land" width="${W}" height="${H}"/>
      <path class="m-campus" d="${L.campus}"/><path class="m-park" d="${L.park}"/><path class="m-pitch" d="${L.pitch}"/><path class="m-square" d="${L.square}"/>
      <path class="m-bldg" d="${L.bldg}"/><path class="m-worship" d="${L.worship}"/>
      <path class="m-case m-service" d="${L.service}"/><path class="m-case m-minor" d="${L.minor}"/><path class="m-case m-mid" d="${L.mid}"/><path class="m-case-major" d="${L.major}"/>
      <path class="m-foot" d="${L.foot}"/>
      <path class="m-road m-service" d="${L.service}"/><path class="m-road m-minor" d="${L.minor}"/><path class="m-road m-mid" d="${L.mid}"/><path class="m-road-major" d="${L.major}"/>
      <path class="m-metro" d="${L.metro}"/>
    </svg>`;
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    BASE = tpl.content.firstChild;
    return BASE.cloneNode(true);
  }
  const Z_MIN = 0.32; const Z_MAX = 2.6;
  function fitView(b, cw, ch, pad) {
    const w = Math.max(60, b[2] - b[0]); const h = Math.max(60, b[3] - b[1]);
    const z = Math.max(Z_MIN, Math.min(Z_MAX, Math.min((cw - pad * 2) / w, (ch - pad * 2) / h)));
    return { cx: (b[0] + b[2]) / 2, cy: (b[1] + b[3]) / 2, z };
  }
  function boundsOf(pts) {
    const xs = pts.map((p) => p[0]); const ys = pts.map((p) => p[1]);
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  }

  function mount(el, hooks) {
    const id = el.dataset.map;
    const opts = JSON.parse(el.dataset.opts || '{}');
    const world = el.querySelector('.gmap-world');
    const slot = world.querySelector('.gmap-base-slot');
    if (slot) slot.replaceWith(baseSvg());
    const cw = el.clientWidth || 340; const ch = el.clientHeight || 300;
    let v = views[id];
    if (!v || opts.reset) {
      v = opts.fit ? fitView(opts.fit, cw, ch, opts.pad || 36) : { cx: opts.cx || W / 2, cy: opts.cy || H / 2, z: opts.z || 0.6 };
      views[id] = v;
    }
    function apply() {
      v.cx = Math.max(0, Math.min(W, v.cx)); v.cy = Math.max(0, Math.min(H, v.cy));
      v.z = Math.max(Z_MIN, Math.min(Z_MAX, v.z));
      const ww = W * v.z; const wh = H * v.z;
      world.style.width = ww + 'px'; world.style.height = wh + 'px';
      world.style.transform = `translate3d(${Math.round(cw / 2 - v.cx * v.z)}px, ${Math.round(ch / 2 - v.cy * v.z)}px, 0)`;
      el.classList.toggle('z-far', v.z < 0.5);
      el.classList.toggle('z-near', v.z > 1.15);
    }
    apply();
    el._map = {
      zoom(f, px, py) {
        const ox = px === undefined ? cw / 2 : px; const oy = py === undefined ? ch / 2 : py;
        const wx = v.cx + (ox - cw / 2) / v.z; const wy = v.cy + (oy - ch / 2) / v.z;
        v.z = Math.max(Z_MIN, Math.min(Z_MAX, v.z * f));
        v.cx = wx - (ox - cw / 2) / v.z; v.cy = wy - (oy - ch / 2) / v.z;
        apply();
      },
      center(pt, z) { v.cx = pt[0]; v.cy = pt[1]; if (z) v.z = z; apply(); },
      toWorld(clientX, clientY) {
        const r = el.getBoundingClientRect();
        return [v.cx + (clientX - r.left - cw / 2) / v.z, v.cy + (clientY - r.top - ch / 2) / v.z];
      }
    };
    if (opts.still) return;

    const ptrs = new Map();
    let moved = false; let start = null; let pinch = null;
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (e.target.closest('.gmap-ctrl')) return;
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (ptrs.size === 1) { moved = false; start = { x: e.clientX, y: e.clientY, cx: v.cx, cy: v.cy }; }
      if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), z: v.z };
      }
    });
    el.addEventListener('pointermove', (e) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (ptrs.size >= 2 && pinch) {
        const [a, b] = [...ptrs.values()];
        const r = el.getBoundingClientRect();
        const f = (pinch.z * Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d) / v.z;
        el._map.zoom(f, (a[0] + b[0]) / 2 - r.left, (a[1] + b[1]) / 2 - r.top);
        moved = true;
        return;
      }
      if (!start) return;
      const dx = e.clientX - start.x; const dy = e.clientY - start.y;
      if (!moved && Math.hypot(dx, dy) < 6) return;
      if (!moved) { moved = true; try { el.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ } el.classList.add('dragging'); }
      v.cx = start.cx - dx / v.z; v.cy = start.cy - dy / v.z;
      apply();
    });
    const end = (e) => {
      ptrs.delete(e.pointerId);
      if (ptrs.size < 2) pinch = null;
      if (ptrs.size === 0) { start = null; el.classList.remove('dragging'); }
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    // Un arrastre no debe contar como toque sobre un punto del mapa.
    el.addEventListener('click', (e) => {
      if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; return; }
      if (opts.pick && !e.target.closest('button, a') && hooks && hooks.onPick) hooks.onPick(el._map.toWorld(e.clientX, e.clientY));
    }, true);
    el.addEventListener('dblclick', (e) => {
      if (e.target.closest('.gmap-ctrl')) return;
      const r = el.getBoundingClientRect();
      el._map.zoom(1.7, e.clientX - r.left, e.clientY - r.top);
    });
    el.addEventListener('wheel', (e) => {
      if (!opts.wheel && !e.ctrlKey) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      el._map.zoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });
  }
  function mountAll(root, hooks) { root.querySelectorAll('.gmap').forEach((el) => mount(el, hooks)); }
  function control(id, act) {
    const el = document.querySelector(`.gmap[data-map="${id}"]`);
    if (!el || !el._map) return;
    el.classList.add('glide');
    if (act === 'in') el._map.zoom(1.5);
    else if (act === 'out') el._map.zoom(1 / 1.5);
    clearTimeout(el._glide);
    el._glide = setTimeout(() => el.classList.remove('glide'), 450);
  }
  function centerOn(id, pt, z) {
    const el = document.querySelector(`.gmap[data-map="${id}"]`);
    if (el && el._map) {
      el.classList.add('glide');
      el._map.center(pt, z);
      clearTimeout(el._glide);
      el._glide = setTimeout(() => el.classList.remove('glide'), 450);
    } else views[id] = { cx: pt[0], cy: pt[1], z: z || 1 };
  }
  function zoomOf(id) { return views[id] ? views[id].z : 0; }
  function forget(id) { delete views[id]; }

  const pct = (pt) => `left:${((pt[0] / W) * 100).toFixed(3)}%;top:${((pt[1] / H) * 100).toFixed(3)}%`;

  return { W, H, NODES, EDGES, routeBetween, stepsFor, hazardsOn, mix, minutes, fmtLen, dist, snap, mountAll, control, centerOn, zoomOf, forget, pct, boundsOf };
})();
