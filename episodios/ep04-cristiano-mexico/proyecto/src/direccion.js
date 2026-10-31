// Kit de dirección de El Hubiera (nacido en el R4 de «¿Y si México acabara con el narco?»).
// Se carga DESPUÉS de char.js/core.js/marca3.js y ANTES de ep.js. No modifica el rig: añade poses, envuelve figure()
// contra brazos rígidos, da alcance con codo doblado (IK), cámara por plano, luz/color de pantalla completa y gráficos de marca.
// Todo funciona en 16:9 y en 9:16 (usa BASE/VIEW del núcleo).
(function () {
  // ---------- anclas a palabras (con VO) ----------
  const NW = (typeof WORDS_EP !== 'undefined' ? WORDS_EP : []), nrm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
  const WC = {};
  // W('frase', despuesDe) → segundo (ya con VO) en que empieza la frase; WE() → en que termina. Lanzan error si no existe.
  window.W = function (frase, despues = 0) {
    const key = frase + '|' + despues; if (key in WC) return WC[key]; const tg = frase.split(' ').map(nrm);
    for (let i = 0; i < NW.length - tg.length + 1; i++) { if (VO + NW[i].start < despues) continue; if (tg.every((w, j) => nrm(NW[i + j].text) === w)) return WC[key] = VO + NW[i].start; }
    throw Error('W sin ancla: ' + frase);
  };
  window.WE = function (frase, despues = 0) { const t = window.W(frase, despues), n = frase.split(' ').length, i = NW.findIndex(w => Math.abs(VO + w.start - t) < 1e-6); return VO + NW[i + n - 1].end; };
  // habla(t): 0..1 mientras suena una palabra (para boca de un personaje que dice el diálogo del narrador)
  window.habla = function (t, t0 = 0, t1 = 1e9) {
    if (t < t0 || t > t1) return 0; const w = NW.find(w => t >= VO + w.start && t <= VO + w.end); if (!w) return 0;
    const k = (t - VO - w.start) / Math.max(.05, w.end - w.start); return clamp(Math.sin(k * PI) * (.6 + .4 * Math.abs(Math.sin(t * 19))));
  };

  // transiciones: se anotan aquí y las aplica kit/transiciones.js (cargado después de main2.js)
  window.TRANS_PEND = []; window.transicion = (t0, tipo = 'dissolve', d = .5) => TRANS_PEND.push([t0, tipo, d]);

  // ---------- poses nuevas (convención del rig: 0 = abajo, + = adelante; codo + = flexión) ----------
  Object.assign(POSE, {
    pockets: { lean: 2, head: 4, shB: -8, elB: 62, shF: -6, elF: 66, hipB: 4, knB: -3, hipF: -4, knF: -2, sit: 0 },
    shy: { lean: 4, head: 10, shB: 4, elB: 30, shF: 22, elF: 96, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
    offer: { lean: 4, head: 2, shB: 8, elB: 22, shF: 38, elF: 52, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
    explain: { lean: 1, head: -2, shB: 10, elB: 30, shF: 30, elF: 88, hipB: 4, knB: -3, hipF: -4, knF: -2, sit: 0 },
    think: { lean: 5, head: 8, shB: 24, elB: 96, shF: 20, elF: 142, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
    neck: { lean: 9, head: 14, shB: 6, elB: 16, shF: 150, elF: 132, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
    crossed: { lean: -3, head: -4, shB: 40, elB: 118, shF: 46, elF: 112, hipB: 5, knB: -3, hipF: -5, knF: -2, sit: 0 },
    shrug: { lean: -2, head: -8, shB: -34, elB: 96, shF: -26, elF: 100, hipB: 4, knB: -2, hipF: -4, knF: -2, sit: 0 },
    facepalm: { lean: 10, head: 16, shB: 6, elB: 18, shF: 118, elF: 138, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
    wave: { lean: -2, head: -4, shB: 8, elB: 20, shF: 128, elF: 58, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
    index: { lean: -3, head: -6, shB: 10, elB: 24, shF: 62, elF: 70, hipB: 4, knB: -2, hipF: -4, knF: -2, sit: 0 },
    open: { lean: -4, head: -6, shB: 52, elB: 44, shF: 58, elF: 40, hipB: 6, knB: -3, hipF: -6, knF: -2, sit: 0 },
    carry: { lean: -4, head: 0, shB: 36, elB: 74, shF: 42, elF: 70, hipB: 4, knB: -4, hipF: -4, knF: -4, sit: 0 },
    slump: { lean: 16, head: 20, shB: 10, elB: 14, shF: 8, elF: 12, hipB: 5, knB: -6, hipF: -4, knF: -6, sit: 0 },
    crouch: { lean: 30, head: 4, shB: 40, elB: 30, shF: 50, elF: 36, hipB: 76, knB: -104, hipF: 60, knF: -100, sit: 0, hipH: 96 },
    sitBack: { lean: -12, head: -4, shB: -14, elB: 74, shF: 6, elF: 104, hipB: 22, knB: -22, hipF: -14, knF: 14, sit: 1, thighK: .35 },
    sitLaugh: { lean: -8, head: -14, shB: 30, elB: 92, shF: 36, elF: 100, hipB: 22, knB: -22, hipF: -14, knF: 14, sit: 1, thighK: .35 },
    sitReach: { lean: 14, head: 6, shB: 20, elB: 56, shF: 58, elF: 44, hipB: 22, knB: -22, hipF: -14, knF: 14, sit: 1, thighK: .35 },
    cheerBent: { lean: -6, head: -12, shB: 150, elB: 38, shF: 158, elF: 34, hipB: 8, knB: -4, hipF: -8, knF: -4, sit: 0 },
    cheerSit: { lean: -6, head: -12, shB: 146, elB: 40, shF: 156, elF: 36, hipB: 22, knB: -22, hipF: -14, knF: 14, sit: 1, thighK: .35 },
    headScratch: { lean: 4, head: 10, shB: 8, elB: 16, shF: 158, elF: 122, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
  });

  // ---------- brazos sin rigidez ----------
  // Brazo extendido al frente sin contacto (hombro 40–140°, codo < 35°) → gesto con codo flexionado y vaivén leve.
  // Las poses con _ik (agarres) o o.raw se respetan tal cual.
  function relax(p, t, seed) {
    const q = { ...p };
    for (const s of ['F', 'B']) {
      const sh = q['sh' + s], el = q['el' + s]; if (sh == null) continue;
      if (sh > 40 && sh < 140 && el < 35) { q['sh' + s] = 26 + (sh - 40) * .22 + Math.sin(t * 1.3 + seed + (s === 'B' ? 2 : 0)) * 3; q['el' + s] = 82 + Math.sin(t * 1.7 + seed) * 6; }
      else if (sh >= 140 && el < 30) q['el' + s] = 34;
      else if (Math.abs(sh) < 18 && el < 8 && !q.gait) q['el' + s] = 12 + Math.sin(t * 1.1 + seed + (s === 'B' ? 1.4 : 0)) * 3;
    }
    return q;
  }
  const FIG = figure; window.FIGURE_ORIGINAL = FIG;
  figure = function (ctx, o) { if (o.pose && !o.pose._ik && !o.raw) o = { ...o, pose: relax(o.pose, o.t || 0, o.seed || 1) }; return FIG(ctx, o); };

  // ---------- agarre: la mano llega al objetivo (mundo) con el codo doblado ----------
  // armTo(pose, 'F'|'B', o, [x, y]) fija sh/el por IK de dos huesos; agarre(base, o, lado, objetivo) devuelve la pose lista.
  window.armTo = function (p, side, o, target) {
    const up = [Math.sin(D2R(p.lean || 0)), -Math.cos(D2R(p.lean || 0))], perp = [-up[1], up[0]], neck = [up[0] * 86, -144 + up[1] * 86];
    const q = side === 'F' ? 14 : -14, sh = [neck[0] + perp[0] * q - up[0] * 13, neck[1] + perp[1] * q - up[1] * 13];
    const dx = (target[0] - o.x) / (o.s * o.dir) - sh[0], dy = (target[1] - o.y) / o.s - sh[1], d = clamp(Math.hypot(dx, dy), 5, 111.95), th = Math.atan2(dx, dy);
    const al = Math.acos(clamp((58 * 58 + d * d - 54 * 54) / (116 * d), -1, 1)), bend = Math.acos(clamp((d * d - 58 * 58 - 54 * 54) / (2 * 58 * 54), -1, 1));
    p['sh' + side] = (th - al) * 180 / PI; p['el' + side] = bend * 180 / PI; p._ik = true; return p;
  };
  window.agarre = function (base, o, lado, objetivo) { return armTo({ ...base }, lado, o, objetivo); };
  // alcance(o, lado, objetivo): mueve el cuerpo (x) e inclina el torso hasta que la mano llegue con ~80 % de extensión
  window.alcance = function (o, side, target, maxK = .82, maxLean = 20) {
    const s = o.s, dir = o.dir, R = 112 * maxK;
    for (let lean = 0; lean <= maxLean; lean += 2) {
      const up = [Math.sin(D2R(lean)), -Math.cos(D2R(lean))], perp = [-up[1], up[0]], neck = [up[0] * 86, -144 + up[1] * 86];
      const q = side === 'F' ? 14 : -14, sh = [neck[0] + perp[0] * q - up[0] * 13, neck[1] + perp[1] * q - up[1] * 13];
      const dy = (target[1] - (o.y + s * sh[1])) / s; if (Math.abs(dy) > R) continue;
      const need = Math.sqrt(R * R - dy * dy), dx = (target[0] - (o.x + s * dir * sh[0])) * dir / s;
      if (dx <= need && dx >= -need * .3) return { lean, x: o.x };
      const want = dx > need ? need * .96 : -need * .25; return { lean, x: o.x + dir * (dx - want) * s };
    }
    return { lean: maxLean, x: o.x };
  };

  // ---------- cámara por plano: aterriza, no rebota ----------
  // camara(ctx, t, t0, t1, {a:[cx,cy,z,rot°], b:[…], e:E.sine, d:retraso, hh:amplitudAMano}) — de a a b a lo largo del plano.
  window.camPlano = function (t, t0, t1, spec = {}) {
    const a = spec.a || [960, 540, 1], b = spec.b || [a[0], a[1], a[2] * 1.02], d = spec.d || 0;
    const k = (spec.e || E.sine)(clamp((t - t0 - d) / Math.max(.1, (t1 - t0) - d)));
    let cx = lerp(a[0], b[0], k), cy = lerp(a[1], b[1], k), z = lerp(a[2], b[2], k), r = lerp(a[3] || 0, b[3] || 0, k);
    if (spec.hh) { const h = handheld(t, spec.hh, t0 | 0); cx += h[0]; cy += h[1]; }
    return [cx, cy, z, r];
  };
  window.camara = function (ctx, t, t0, t1, spec) { const v = camPlano(t, t0, t1, spec); cam(ctx, v[0], v[1], v[2], D2R(v[3])); return v; };
  window.aPantalla = (v, x, y) => [960 + (x - v[0]) * v[2], 540 + (y - v[1]) * v[2]];

  // ---------- luz y color (pantalla completa, después de dibujar la escena) ----------
  const full = c => { c.setTransform(BASE[0], BASE[1], BASE[2], BASE[3], BASE[4], BASE[5]); };
  window.velo = function (c, col, a) { c.save(); full(c); c.globalAlpha = a; c.fillStyle = col; c.fillRect(-W, -H, 3 * W, 3 * H); c.restore(); };
  // pozo de luz: oscurece todo menos un radio alrededor del punto de atención (coordenadas de pantalla 16:9)
  window.pozo = function (c, x, y, r, oscuro = .45, col = '5,7,11') { c.save(); full(c); const g = c.createRadialGradient(x, y, r * .25, x, y, r * 1.6); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(.55, `rgba(${col},${oscuro * .45})`); g.addColorStop(1, `rgba(${col},${oscuro})`); c.fillStyle = g; c.fillRect(-W, -H, 3 * W, 3 * H); c.restore(); };
  window.tinte = function (c, col, a, modo = 'soft-light') { c.save(); full(c); c.globalCompositeOperation = modo; c.globalAlpha = a; c.fillStyle = col; c.fillRect(-W, -H, 3 * W, 3 * H); c.restore(); };
  // paletas por tono de escena (gris = lo que pasó, cálido = lo que no pasó); [modo, color, alfa]
  window.TONOS = {
    frio: [['soft-light', '#3d5a7a', .35], ['multiply', '#1b2533', .18]], noche: [['multiply', '#0b1322', .35], ['soft-light', '#28406a', .3]],
    atardecer: [['soft-light', '#ff9a5c', .32], ['multiply', '#3a2230', .12]], calido: [['soft-light', '#ffb877', .34]], casa: [['soft-light', '#ffc58a', .3], ['multiply', '#2a1d14', .08]],
    dia: [['soft-light', '#fff0d6', .2]], oro: [['soft-light', '#ffcf6b', .38]], oficina: [['soft-light', '#9fb6c9', .25]], recuerdo: [['saturation', '#808080', .8], ['soft-light', '#4a5a6e', .25]],
  };
  window.tono = function (c, nombre) { for (const [m, col, a] of (TONOS[nombre] || [])) tinte(c, col, a, m); };
  window.contacto = function (c, x, y, w, a = .35) { c.save(); c.fillStyle = `rgba(0,0,0,${a})`; c.beginPath(); c.ellipse(x, y, w, w * .14, 0, 0, TAU); c.fill(); c.restore(); };
  window.primerPlano = function (c, draw, px = 10, a = .92) { c.save(); full(c); c.globalAlpha = a; c.filter = `blur(${px}px)`; draw(c); c.filter = 'none'; c.restore(); };

  // ---------- gráficos de marca integrados (nunca rótulos arriba) ----------
  // sello de lugar/tiempo abajo a la izquierda del cuadro: línea gris, nodo hueso y texto mono que se escribe
  window.sello = function (c, s, t, t0, t1) {
    const k = ease(t, t0, t0 + .45, E.out) * (1 - ease(t, t1 - .4, t1)); if (k <= 0) return; c.save(); full(c); c.globalAlpha = k;
    const x = (V ? VIEW.x0 + 40 : 72), y = V ? VIEW.y0 + 150 : 892; // en vertical va arriba: abajo están los subtítulos
    c.strokeStyle = '#5f5e64'; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + lerp(0, 34, k), y); c.stroke();
    c.fillStyle = '#efe9df'; c.beginPath(); c.arc(x + 38, y, 4.5, 0, TAU); c.fill();
    const n = Math.floor(clamp((t - t0) * 34, 0, s.length)); text(c, s.slice(0, n), x + 56, y + 1, { font: 'Geist Mono', size: 22, align: 'left', color: 'rgba(239,233,223,.88)', ls: 3 }); c.restore();
  };
  // etiqueta diegética con línea guía (gris = lo que pasó, rosa = lo que no pasó); o.strike tacha en ese segundo
  window.etiqueta = function (c, s, x, y, t, t0, o = {}) {
    const k = ease(t, t0, t0 + .4, E.out) * (o.t1 ? 1 - ease(t, o.t1 - .35, o.t1) : 1); if (k <= 0) return; c.save(); c.globalAlpha *= k;
    const col = o.rosa ? '#e4007c' : '#8e909b', dx = o.dx ?? 0, dy = o.dy ?? -70; c.strokeStyle = col; c.lineWidth = 2.5; c.beginPath(); c.moveTo(x, y); c.lineTo(x + dx * k, y + dy * k); c.stroke();
    c.fillStyle = col; c.beginPath(); c.arc(x, y, 5, 0, TAU); c.fill();
    text(c, s, x + dx, y + dy - 18, { font: 'Geist Mono', size: Math.max(24, o.size || 24), color: o.color || '#efe9df', ls: 3, align: o.align || 'center' });
    if (o.strike) { const w = s.length * (o.size || 22) * .68, sk = ease(t, o.strike, o.strike + .3); c.strokeStyle = '#efe9df'; c.lineWidth = 3; c.beginPath(); c.moveTo(x + dx - w / 2, y + dy - 18); c.lineTo(x + dx - w / 2 + w * sk, y + dy - 18); c.stroke(); }
    c.restore();
  };
  // trazo que se dibuja (la línea de la marca); devuelve la punta
  window.trazo = function (c, pts, k, col, w = 6, dash) {
    if (k <= 0) return pts[0]; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    let rem = L * clamp(k); c.save(); c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; if (dash) c.setLineDash(dash); c.beginPath(); c.moveTo(...pts[0]);
    let tip = pts[0]; for (let i = 1; i < pts.length && rem > 0; i++) { const f = Math.min(1, rem / seg[i - 1]); tip = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; c.lineTo(...tip); rem -= seg[i - 1]; }
    c.stroke(); c.restore(); return tip;
  };
})();
