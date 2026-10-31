// EL HUBIERA · ep04 — tomas, parte B (bisagra, escenarios 2 y 3, cierre)

// ===== b31–b32 · ¿y si no termina en una cancha abandonada, como al principio? =====
S(B.b31, (ctx, t) => {
  const t0 = B.b31, t1 = B.b33;
  camara(ctx, t, t0, t1, { a: [1100, 640, 1.25], b: [1040, 600, 1.08] });
  canchaAbandonada(ctx, t, { cielo: 'tarde' });
  const k = Math.sin((t - t0) * 4.2), bh = Math.abs(k) * 120;
  cr(ctx, { x: 1060, y: 905, s: 1.3, t, pose: mixPose(POSE.stand, { ...POSE.kick, hipF: 40 }, Math.max(0, -k)), face: 'neutral', look: [2, -6] });
  ball2(ctx, 1120, 860 - bh, 16, t * 6);
  fin(ctx); tono(ctx, 'atardecer'); velo(ctx, '#202630', .25 * ease(t, Wd('como al principio') - .3, Wd('como al principio') + .4));
  etiqueta(ctx, 'COMO AL PRINCIPIO', 1060, 470, t, Wd('como al principio') - .2, { dy: -70, dx: -60 });
  vignette(ctx, .55);
}, 1060);

// ===== b33 · ¿Y si la Liga MX lo ficha y llega a la Selección? (la rama rosa) =====
S(B.b33, (ctx, t) => {
  const t0 = B.b33; fondoMarca(ctx, t, 33); uiCenter(ctx, V ? 1.12 : 1);
  const X0 = V ? 560 : 260, XM = V ? 700 : 700, X1 = V ? 1380 : 1660, XA = V ? 1000 : 1200, XB = V ? 1360 : 1560;
  bifurcacion(ctx, t, t0 - .2, { y0: 700, x0: X0, xm: XM, x1: X1, dr: .3, ramas: [[[XM, 700], [XM + 220, 640], [XA, 520], [XB, 330]]] });
  const kg = ease(t, t0 + .4, t0 + .9, E.out);
  t3(ctx, 'EL LLANO', X1, 750, { size: 24, font: MONO3, align: 'right', color: '#8e909b', ls: 5, alpha: kg });
  t3(ctx, 'LIGA MX', XA + 30, 480, { size: 24, font: MONO3, align: 'right', color: B3V.rosaTxt, ls: 5, alpha: ease(t, Wd('liga', t0) , Wd('liga', t0) + .4) });
  t3(ctx, 'SELECCIÓN', XB + 40, 290, { size: 24, font: MONO3, align: 'right', color: B3V.rosaTxt, ls: 5, alpha: ease(t, Wd('selección', t0) - .1, Wd('selección', t0) + .3) });
}, 960);

// ===== b34 · ¿Y si sí? → Escenario dos: la Liga MX… y el viernes botanero =====
S(B.b34, (ctx, t) => {
  const t0 = B.b34; fondoMarca(ctx, t, 34); uiCenter(ctx, V ? 1.2 : 1);
  t3(ctx, '¿Y si sí?', 960, 540, { size: 140, italic: true, align: 'center', alpha: ease(t, t0, t0 + .35, E.out) * (1 - ease(t, Wd('escenario', t0) - .35, Wd('escenario', t0) - .05)) });
}, 960);
S(Wd('escenario dos') - .05, (ctx, t) => {
  const t0 = Wd('escenario dos') - .05; tarjetaEscenario(ctx, t, t0, 2, 'la Liga MX', { size: 120 });
  t3(ctx, '…y el viernes botanero', 960, 760, { size: 56, italic: true, align: 'center', color: B3V.huesoT, alpha: ease(t, Wd('viernes') - .1, Wd('viernes') + .4, E.out) });
}, 960);

// ===== b36 · Un visor lo ve. Debuta a los diecisiete con los Xolos y se vuelve ídolo =====
function estadioXolos(ctx, t, camX, cheer) { window.BOARD = 'XOLOS · TIJUANA'; pitchLevel(ctx, t, { camX, cheer, crowdBlur: 6 }); }
S(B.b36, (ctx, t) => {
  const t0 = B.b36, t1 = B.b37, td = Wd('debuta') - .1;
  if (t < td) { // en el llano, un visor de verdad toma nota
    camara(ctx, t, t0, td, { a: [900, 600, 1.15], b: [880, 600, 1.2] });
    cerros(ctx, 'tj', 'tarde'); llano(ctx, t, {});
    const ov = { x: 600, y: 905, s: 1.35, dir: 1 }, nod = Math.max(0, Math.sin((t - t0) * 7)) * 6;
    figure(ctx, { ...ov, t, seed: 141, shirt: '#2a2a2e', acc: { cap: '#c8102e' }, pose: agarre({ ...POSE.stand, head: 8 + nod, lean: 4 }, ov, 'F', [700, 700]), face: 'smile', look: [6, 2] });
    papel(ctx, 712, 700, 70, 90, .2, c => { c.strokeStyle = '#c8102e'; c.lineWidth = 4; c.beginPath(); c.moveTo(-14, 0); c.lineTo(-4, 12); c.lineTo(18, -16); c.stroke(); });
    const x = 1150 + Math.sin((t - t0) * 2.6) * 160; cr(ctx, { x, y: 880, s: .95, edad: 'joven', t, pose: corre(x * 2, .9), face: 'determined' }); ball2(ctx, x + 40, 868, 11, t * 10);
    fin(ctx); tono(ctx, 'atardecer'); etiqueta(ctx, 'VISOR · XOLOS', 600, 420, t, t0 + .2, { dy: -60, dx: -40 });
  } else { // el debut en el estadio, de noche
    const pan = (t - td) * 220; camara(ctx, t, td, t1, { a: [960, 600, 1.1], b: [960, 590, 1.14] });
    estadioXolos(ctx, t, 600 + pan, Wd('ídolo', B.b36) < t + .3 ? 1 : .5);
    const x = 820 + Math.sin((t - td) * 1.2) * 60;
    cr(ctx, { x, y: 975, s: 1.3, edad: 'joven', ropa: 'xolos', t, pose: t > Wd('ídolo', B.b36) - .2 ? mixPose(corre(pan + x, 1.3), POSE.cheer, ease(t, Wd('ídolo', B.b36) - .2, Wd('ídolo', B.b36) + .2)) : corre(pan + x, 1.3), face: t > Wd('ídolo', B.b36) - .2 ? 'shout' : 'determined' });
    ball2(ctx, x + 110 + Math.abs(Math.sin((t - td) * 5)) * 20, 965, 18, t * 8);
    grassForeground(ctx, t, 600 + pan * 1.3, 9);
    fin(ctx); tono(ctx, 'noche'); sello(ctx, 'TIJUANA · DEBUT · 17 AÑOS', t, td + .15, t1);
  }
  vignette(ctx, .5);
}, t => t < Wd('debuta') - .1 ? 800 : 900);
transicion(B.b36, 'dip', .4);

// ===== b37 · Un club de Europa pregunta por él (el teléfono que suena en la oficina del club) =====
S(B.b37, (ctx, t) => {
  const t0 = B.b37, t1 = B.b38;
  camara(ctx, t, t0, t1, { a: [960, 640, 1.5], b: [980, 640, 1.6] });
  cuarto(ctx, t, 'club', { lampara: [960, 300, 520] });
  mesa(ctx, 960, 760, 900, '#3a2a20');
  const suena = t < Wd('pregunta') + .3, j = suena ? Math.sin(t * 70) * 3 : 0;
  telefono(ctx, 960 + j, 730, .55, { rot: Math.PI / 2, pantalla: '#1d2a44', lineas: [] });
  ctx.save(); ctx.translate(960 + j, 730); ctx.rotate(Math.PI / 2); text(ctx, 'EUROPA', 0, -10, { font: 'Geist Mono', size: 12, color: '#efe9df' }); text(ctx, 'llamada entrante', 0, 12, { font: 'Geist Mono', size: 8, color: 'rgba(239,233,223,.6)' }); ctx.restore();
  if (suena) glow(ctx, 960, 730, 120, 'rgba(120,170,255,.25)');
  const oe = { x: 1340, y: 905, s: 1.4, dir: -1 };
  figure(ctx, { ...oe, t, seed: 151, shirt: CR.traje, pose: agarre({ ...POSE.sitFrontFwd, lean: 12 }, oe, 'F', [lerp(1120, 1000, ease(t, Wd('por él') - .2, Wd('por él') + .4)), 735]), face: 'smug', look: [-6, 6] });
  fin(ctx); tono(ctx, 'oficina'); pozo(ctx, 1000, 640, 420, .5); vignette(ctx, .55);
}, 1150);

// ===== b38 · su club pide una cifra que haría llorar al Real Madrid (la cifra; contraplano: Europa llora) =====
S(B.b38, (ctx, t) => {
  const t0 = B.b38, t1 = B.b39, tl = Wd('llorar') - .15;
  if (t < tl) {
    camara(ctx, t, t0, tl, { a: [960, 560, 1.0], b: [1060, 560, 1.06] });
    cuarto(ctx, t, 'club'); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
    const n = Math.floor(clamp((t - Wd('cifra') + .2) * 9, 0, 22));
    papel(ctx, 960, 560, 1500, 260, -.02, c => { text(c, '$ 9' + ' 000'.repeat(Math.ceil(n / 3)).slice(0, 4 * Math.ceil(n / 3)), V ? -330 : -700, 10, { font: 'Geist Mono', size: V ? 52 : 96, color: '#1a1a20', align: 'left' }); text(c, 'PRECIO DE VENTA', V ? -330 : -700, -90, { font: 'Geist Mono', size: 20, color: '#5a5a62', align: 'left', ls: 3 }); });
    fin(ctx); tono(ctx, 'oficina');
  } else { // contraplano: el directivo europeo, de traje claro, llora
    camara(ctx, t, tl, t1, { a: [960, 600, 1.45], b: [960, 595, 1.52] });
    cuarto(ctx, t, 'oficina');
    const o = { x: 960, y: 905, s: 1.5, dir: -1 };
    figure(ctx, { ...o, t, seed: 161, shirt: '#e9e9ee', pose: agarre({ ...POSE.stand, lean: 6, head: 10 }, o, 'F', [905, 560]), face: 'cry', look: [-2, 4] });
    telefono(ctx, 905, 548, .3, { rot: -.3 });
    fin(ctx); tono(ctx, 'dia'); etiqueta(ctx, 'CLUB EUROPEO', 1080, 420, t, tl + .1, { dy: -60, dx: 80 });
  }
  vignette(ctx, .5);
}, t => t < Wd('llorar') - .15 ? 1000 : 960);

// ===== b39 · existió el «pacto de caballeros» (mesa redonda de directivos) =====
function bombin(ctx, x, y, s) { ctx.fillStyle = '#121216'; ctx.beginPath(); ctx.ellipse(x, y, 52 * s, 10 * s, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(x, y - 22 * s, 32 * s, 30 * s, 0, PI, TAU); ctx.fill(); ctx.fillRect(x - 32 * s, y - 22 * s, 64 * s, 22 * s); }
S(B.b39, (ctx, t) => {
  const t0 = B.b39, t1 = B.b40;
  camara(ctx, t, t0, t1, { a: [960, 620, 1.05], b: [960, 610, 1.1] });
  cuarto(ctx, t, 'club', { lampara: [960, 260, 640] });
  const xs = [560, 760, 1160, 1360];
  xs.forEach((x, i) => { const dir = x < 960 ? 1 : -1, o = { x, y: 905, s: 1.35, dir }; const hh = i === 1 || i === 2;
    const r = figure(ctx, { ...o, t, seed: 170 + i, shirt: CR.traje, pose: hh ? agarre({ ...POSE.stand, lean: 6 }, o, 'F', [960 + Math.sin(t * 9) * 4 * (hh ? 1 : 0), 640 + Math.sin(t * 9) * 6]) : POSE.crossed, face: 'smug', look: [dir * 4, 0] });
    bombin(ctx, x + dir * 16 * 1.35, 905 - (144 + 86 + 50 + 30) * 1.35, 1.35); });
  mesa(ctx, 960, 780, 1100, '#2b1d14');
  fin(ctx); tono(ctx, 'frio'); pozo(ctx, 960, 620, 460, .5);
  etiqueta(ctx, 'PACTO DE CABALLEROS', 960, 560, t, Wd('pacto') - .1, { dy: -160, dx: 0 });
  vignette(ctx, .55);
}, 960);

// ===== b40 · aunque se te acabara el contrato, no te podías ir (la puerta con cadena) =====
S(B.b40, (ctx, t) => {
  const t0 = B.b40, t1 = B.b41;
  camara(ctx, t, t0, t1, { a: [900, 600, 1.12], b: [960, 595, 1.16] });
  cuarto(ctx, t, 'vestidor');
  ctx.fillStyle = '#5a4430'; ctx.fillRect(1300, 260, 300, 560); ctx.fillStyle = '#d0b070'; ctx.beginPath(); ctx.arc(1340, 560, 10, 0, TAU); ctx.fill();
  ctx.strokeStyle = '#a8acb4'; ctx.lineWidth = 8; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(1300 + i * 34, 540 + Math.sin(i * .6) * 6, 16, 9, 0, 0, TAU); ctx.stroke(); }
  ctx.fillStyle = '#b8b098'; rr(ctx, 1430, 560, 50, 56, 8); ctx.fill();
  const o = { x: 1040, y: 905, s: 1.35, dir: 1 }, kk = ease(t, Wd('no te podías') - .2, Wd('no te podías') + .3);
  cr(ctx, { ...o, ropa: 'xolos', t, pose: agarre({ ...POSE.stand, lean: 4 - kk * 8 }, { ...o, s: 1.35 }, 'B', [1010, 820]), face: kk > .5 ? 'sad' : 'neutral', look: [6, 0] });
  ctx.fillStyle = '#2a2a30'; rr(ctx, 930, 790, 150, 110, 10); ctx.fill(); ctx.fillStyle = '#4a4a52'; ctx.fillRect(985, 770, 40, 22); // maleta
  const od = { x: 560, y: 905, s: 1.4, dir: 1 };
  figure(ctx, { ...od, t, seed: 172, shirt: CR.traje, pose: { ...POSE.index, shF: 70 + Math.sin(t * 8) * 10 }, face: 'smug', look: [6, -2] }); bombin(ctx, 560 + 16 * 1.4, 905 - 310 * 1.4, 1.4);
  fin(ctx); tono(ctx, 'frio');
  etiqueta(ctx, 'CONTRATO VENCIDO', 1040, 380, t, Wd('contrato') - .1, { dy: -60, dx: 60 });
  etiqueta(ctx, 'SIN PERMISO', 1450, 520, t, Wd('permiso') - .1, { dy: -100, dx: 30 });
  vignette(ctx, .5);
}, 1040);

// ===== b41–b42 · en 2021, la autoridad de competencia multó a diecisiete clubes =====
S(B.b41, (ctx, t) => {
  const t0 = B.b41, t1 = B.b43;
  camara(ctx, t, t0, t1, { a: [960, 560, 1.0], b: [960, 556, 1.05] });
  fondoMarca(ctx, t, 41);
  const tm = Wd('multó') - .1;
  for (let i = 0; i < 17; i++) { const c = i % 6, r = Math.floor(i / 6), x = 560 + c * 160 + (r === 2 ? 160 : 0), y = 380 + r * 170, k = ease(t, t0 + .05 * i, t0 + .05 * i + .3, E.out);
    ctx.save(); ctx.globalAlpha = k; escudo(ctx, x, y, 1.1, ['#4a5060', '#5a4a40', '#3e5a50', '#5a5060'][i % 4], 'rgba(239,233,223,.25)');
    const ks = ease(t, tm + i * .07, tm + i * .07 + .18, E.back); if (ks > 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(-.2); ctx.scale(1.6 - .6 * ks, 1.6 - .6 * ks); ctx.globalAlpha = ks; ctx.strokeStyle = '#efe9df'; ctx.lineWidth = 3; ctx.strokeRect(-46, -16, 92, 32); text(ctx, 'MULTA', 0, 1, { font: 'Geist Mono', size: 20, color: '#efe9df', ls: 2 }); ctx.restore(); }
    ctx.restore(); }
  fin(ctx); uiCenter(ctx, V ? 1.15 : 1);
  const n = Math.round(clamp((t - Wd('diecisiete clubes') + .2) / 1.0, 0, 1) * 17);
  if (t > tm) t3(ctx, `${n} CLUBES`, 960, 900, { size: 30, font: MONO3, align: 'center', color: B3V.huesoT, ls: 6 });
  fin(ctx); sello(ctx, '2021 · AUTORIDAD DE COMPETENCIA', t, t0 + .15, t1);
}, 960);

// ===== b43 · Así que Cristiano se queda (desempaca en su casillero) =====
S(B.b43, (ctx, t) => {
  const t0 = B.b43, t1 = B.b44;
  camara(ctx, t, t0, t1, { a: [980, 600, 1.25], b: [960, 600, 1.3] });
  cuarto(ctx, t, 'vestidor');
  const o = { x: 980, y: 905, s: 1.35, dir: -1 };
  cr(ctx, { ...o, ropa: 'xolos', t, pose: mixPose(agarre({ ...POSE.stand, lean: 10 }, o, 'F', [820, 560]), POSE.shrug, ease(t, Wd('queda') - .1, Wd('queda') + .3)), face: 'neutral', look: [-4, 0] });
  ctx.fillStyle = KIT.XOL.shirt; rr(ctx, 780, 520, 90, 120, 10); ctx.fill(); ctx.fillStyle = KIT.XOL.vstripes; for (let i = 0; i < 4; i++) ctx.fillRect(792 + i * 20, 520, 7, 120);
  fin(ctx); tono(ctx, 'frio'); vignette(ctx, .5);
}, 960);

// ===== b44 · Gana bien. Y en una liga donde desde 2020 nadie desciende =====
S(B.b44, (ctx, t) => {
  const t0 = B.b44, t1 = B.b45, ty = Wd('y en una liga') - .05;
  if (t < ty) { // inserto: la nómina
    camara(ctx, t, t0, ty, { a: [960, 560, 1.1], b: [960, 560, 1.16] });
    cuarto(ctx, t, 'oficina'); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
    papel(ctx, 960, 560, 900, 300, .02, c => { text(c, 'NÓMINA · DELANTERO', -400, -90, { font: 'Geist Mono', size: 22, color: '#5a5a62', align: 'left', ls: 3 }); text(c, '$ $ $ $', 0, 20, { font: 'Anton', size: 120, color: '#2b6a3a' }); });
    fin(ctx); tono(ctx, 'oficina');
  } else { // la tabla: el último lugar no baja
    camara(ctx, t, ty, t1, { a: [960, 540, 1.0], b: [960, 540, 1.03] });
    fondoMarca(ctx, t, 44); fin(ctx); uiCenter(ctx, V ? 1.1 : 1);
    tabla(ctx, 960, 340, [[1, 'Xolos', '34'], [2, 'Equipo B', '31'], [3, 'Equipo C', '29'], [16, '…', '…'], [18, 'Último lugar', '9']], t, ty);
    etiqueta(ctx, 'DESCENSO', 1320, 690, t, Wd('desde', ty) - .1, { dy: 90, dx: 0, strike: Wd('desciende') + .05 });
  }
  vignette(ctx, .4);
}, 960);

// ===== b45 · nadie le exige nada (en el sillón) =====
S(B.b45, (ctx, t) => {
  const t0 = B.b45, t1 = B.b46;
  camara(ctx, t, t0, t1, { a: [960, 640, 1.25], b: [960, 630, 1.3] });
  cuarto(ctx, t, 'recamara', { lampara: [1300, 300, 420] });
  ctx.fillStyle = '#4a3a5a'; rr(ctx, 660, 680, 600, 160, 30); ctx.fill(); ctx.fillStyle = '#5a4a6a'; rr(ctx, 640, 600, 640, 100, 30); ctx.fill();
  cr(ctx, { x: 960, y: 905, s: 1.35, ropa: 'calle', t, pose: { ...POSE.sitBack, lean: -18 }, face: 'smile', look: [6, -4], panza: .2 });
  telefono(ctx, 1070, 640, .3, { rot: .2, pantalla: '#4a6aa8' });
  fin(ctx); tono(ctx, 'casa'); vignette(ctx, .5);
}, 960);

// ===== b46 · Llega el viernes botanero (cantina) =====
S(B.b46, (ctx, t) => {
  const t0 = B.b46, t1 = B.b47;
  camara(ctx, t, t0, t1, { a: [960, 600, 1.1], b: [960, 600, 1.15] });
  cuarto(ctx, t, 'cantina', { lampara: [960, 340, 520] });
  [[640, 1, 'sitLaugh'], [1280, -1, 'sitBack']].forEach(([x, d, p], i) => figure(ctx, { x, y: 905, s: 1.25, dir: d, t, seed: 180 + i, shirt: PAL_TJ[i + 1], pose: POSE[p], face: 'laugh' }));
  cr(ctx, { x: 960, y: 905, s: 1.3, ropa: 'calle', t, pose: POSE.sitLaugh, face: 'laugh', panza: .3 });
  mesa(ctx, 960, 790, 760, '#3a2414'); plato(ctx, 960, 784, .5, c => { c.fillStyle = '#e8c070'; for (let i = 0; i < 12; i++) { c.beginPath(); c.arc(-80 + (i % 6) * 32, -10 - Math.floor(i / 6) * 14, 12, 0, TAU); c.fill(); } });
  fin(ctx); tono(ctx, 'casa'); vignette(ctx, .55);
}, 960);

// ===== b47 · Luego, los tamales de elote  ·  b48 · Luego, las guajolotas (insertos) =====
S(B.b47, (ctx, t) => {
  const t0 = B.b47; camara(ctx, t, t0, B.b48, { a: [960, 600, 1.0], b: [960, 600, 1.08] });
  cuarto(ctx, t, 'cantina'); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-W, -H, 3 * W, 3 * H); mesa(ctx, 960, 700, 1600, '#3a2414');
  plato(ctx, 960, 690, 1.4, c => tamales(c, t));
  fin(ctx); tono(ctx, 'casa'); vignette(ctx, .5);
}, 960);
S(B.b48, (ctx, t) => {
  const t0 = B.b48; camara(ctx, t, t0, B.b49, { a: [960, 600, 1.0], b: [960, 600, 1.08] });
  cuarto(ctx, t, 'cantina'); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-W, -H, 3 * W, 3 * H); mesa(ctx, 960, 700, 1600, '#3a2414');
  plato(ctx, 960, 690, 1.4, c => guajolota(c, t));
  fin(ctx); tono(ctx, 'casa'); vignette(ctx, .5);
}, 960);

// ===== b49 · A los veintiséis, el abdomen de cuadritos ya es un solo cuadro (frente al espejo) =====
S(B.b49, (ctx, t) => {
  const t0 = B.b49, t1 = B.b50;
  camara(ctx, t, t0, t1, { a: [960, 560, 1.35], b: [960, 560, 1.42] });
  cuarto(ctx, t, 'vestidor');
  ctx.fillStyle = '#9fb2c0'; ctx.fillRect(640, 120, 640, 760); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(660, 140, 60, 720);
  const kp = ease(t, t0 + .3, Wd('un solo') + .2, E.inOut);
  const o = { x: 960, y: 905, s: 1.35, dir: 1 };
  cr(ctx, { ...o, ropa: 'xolos', t, pose: { ...POSE.stand, head: 14, lean: -2 }, face: kp > .6 ? 'shock' : 'neutral', look: [2, 8], panza: kp });
  // cuadritos → un solo cuadro (sobre la panza)
  const cx = 960 + (14 + 10 * kp) * 1.35, cy = 905 - 178 * 1.35, ks = ease(t, Wd('un solo') - .1, Wd('un solo') + .4);
  ctx.save(); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 3;
  if (ks < 1) { ctx.globalAlpha = 1 - ks; for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) ctx.strokeRect(cx - 30 + j * 30, cy - 46 + i * 30, 26, 26); }
  if (ks > 0) { ctx.globalAlpha = ks; ctx.strokeStyle = 'rgba(239,233,223,.85)'; ctx.strokeRect(cx - 52, cy - 52, 104, 104); }
  ctx.restore();
  fin(ctx); tono(ctx, 'frio'); sello(ctx, '26 AÑOS', t, t0 + .15, t1); vignette(ctx, .5);
}, 960);

// ===== b50 · Sigue metiendo goles… pero puros de penal =====
S(B.b50, (ctx, t) => {
  const t0 = B.b50, tk = Wd('penal') - .25;
  window.BOARD = 'XOLOS · TIJUANA'; penaltyPOV(ctx, t, tk, { keeper: KIT.RIV.gk, shooter: KIT.XOL, side: -1, tx: 420, ty: 470, camX: 300 });
  fin(ctx); tono(ctx, 'noche'); etiqueta(ctx, 'PENAL', 960, 640, t, Wd('puros') - .1, { dy: -110, dx: 0 }); vignette(ctx, .45);
}, 960);

// ===== b51 · Escenario tres: el Cristiano disciplinado =====
S(B.b51, (ctx, t) => tarjetaEscenario(ctx, t, B.b51, 3, 'el Cristiano disciplinado', { size: 96 }), 960);

// ===== b52 · Nada de guajolotas. Gimnasio a las cinco de la mañana =====
S(B.b52, (ctx, t) => {
  const t0 = B.b52, t1 = B.b53, tg = Wd('gimnasio') - .1, tr = Wd('cinco', tg) - .15;
  if (t < tg) {
    camara(ctx, t, t0, tg, { a: [960, 600, 1.0], b: [960, 600, 1.05] });
    cuarto(ctx, t, 'cantina'); ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(-W, -H, 3 * W, 3 * H); mesa(ctx, 960, 700, 1600, '#3a2414');
    const kx = ease(t, t0 + .1, t0 + .5, E.out); ctx.save(); ctx.globalAlpha = 1 - .6 * kx; plato(ctx, 960, 690, 1.4, c => guajolota(c, t)); ctx.restore();
    fin(ctx); tono(ctx, 'casa'); etiqueta(ctx, 'GUAJOLOTA', 960, 520, t, t0, { dy: -110, dx: 0, strike: Wd('guajolotas', t0) + .1 });
  } else if (t < tr) {
    camara(ctx, t, tg, tr, { a: [960, 560, 1.2], b: [960, 560, 1.26] });
    cuarto(ctx, t, 'gym'); ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
    reloj(ctx, 960, 560, 1.6, '5', '00', t, true);
    fin(ctx); tono(ctx, 'noche');
  } else {
    camara(ctx, t, tr, t1, { a: [960, 600, 1.15], b: [960, 590, 1.2] });
    cuarto(ctx, t, 'gym');
    ctx.fillStyle = '#7a7e88'; ctx.fillRect(700, 330, 520, 14);
    const up = .5 + .5 * Math.sin((t - tr) * 4.4 - PI / 2), y = 790 - up * 70;
    cr(ctx, { x: 960, y, s: 1.35, ropa: 'xolos', t, raw: true, noShadow: true, pose: { ...POSE.lift, shB: 176, elB: 30 + up * 60, shF: 178, elF: 26 + up * 60, hipB: 10, knB: -30, hipF: -6, knF: -40 }, face: 'determined', look: [0, -6] });
    fin(ctx); tono(ctx, 'frio'); sello(ctx, '05:00 · LUNES A SÁBADO', t, tr + .1, t1);
  }
  vignette(ctx, .5);
}, 960);

// ===== b53 · Con él, los Xolos por fin vuelven a ser campeones =====
S(B.b53, (ctx, t) => {
  const t0 = B.b53, t1 = B.b54, tc = Wd('campeones') - .2;
  camara(ctx, t, t0, t1, { a: [960, 620, 1.1], b: [960, 600, 1.16] });
  estadioXolos(ctx, t, 900, 1);
  const lift = ease(t, tc - .3, tc + .3, E.back);
  [[520, 1], [690, 1], [1230, -1], [1400, -1]].forEach(([x, d], i) => pk(ctx, x, 935 - hop(t, t0 + i * .15, .5, 18).y, 1.0, KIT.XOL, POSE.cheer, 'cheer', d, t, { acc: { num: String(3 + i * 2) } }));
  cr(ctx, { x: 960, y: 975, s: 1.35, ropa: 'xolos', t, pose: mixPose(POSE.cheerBent, POSE.lift, lift), face: 'shout' });
  trophyDraw(ctx, 960 + lerp(110, 10, lift), lerp(800, 400, lift), .9);
  fin(ctx); tono(ctx, 'oro'); sello(ctx, 'XOLOS · CAMPEÓN', t, t0 + .2, t1); vignette(ctx, .5);
}, 960);

// ===== b54 · Su único título de liga había sido en 2012 (la vitrina) =====
S(B.b54, (ctx, t) => {
  const t0 = B.b54, t1 = B.b55;
  camara(ctx, t, t0, t1, { a: [900, 560, 1.15], b: [940, 560, 1.2] });
  cuarto(ctx, t, 'club'); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ctx.fillStyle = 'rgba(160,190,210,.12)'; ctx.fillRect(500, 200, 920, 600); ctx.strokeStyle = 'rgba(200,220,235,.4)'; ctx.lineWidth = 4; ctx.strokeRect(500, 200, 920, 600); ctx.fillStyle = '#3a2a1e'; ctx.fillRect(500, 700, 920, 20);
  trophyDraw(ctx, 760, 700, .8);
  const kn = ease(t, t0 + 1.8, t0 + 2.5, E.back); if (kn > 0) { ctx.save(); ctx.globalAlpha = kn; trophyDraw(ctx, 1160, 700, .8 * kn); ctx.restore(); }
  fin(ctx); tono(ctx, 'oficina');
  etiqueta(ctx, 'APERTURA 2012', 760, 400, t, Wd('único') - .1, { dy: -70, dx: 0 });
  etiqueta(ctx, 'EL SEGUNDO', 1160, 400, t, t0 + 2.2, { rosa: true, dy: -70, dx: 0 });
  vignette(ctx, .5);
}, 960);

// ===== b55 · Llega a la Selección. Llega al Mundial =====
function camisetaColgada(ctx, x, y, s, col, num) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#8a8c92'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(0, -130); ctx.moveTo(-70, -110); ctx.lineTo(0, -130); ctx.lineTo(70, -110); ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-70, -110); ctx.lineTo(-130, -60); ctx.lineTo(-100, -20); ctx.lineTo(-74, -40); ctx.lineTo(-74, 110); ctx.lineTo(74, 110); ctx.lineTo(74, -40); ctx.lineTo(100, -20); ctx.lineTo(130, -60); ctx.lineTo(70, -110); ctx.lineTo(24, -110); ctx.quadraticCurveTo(0, -84, -24, -110); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-74, 80, 148, 30); text(ctx, num, 0, 10, { font: 'Anton', size: 110, color: 'rgba(255,255,255,.9)' }); ctx.restore(); }
S(B.b55, (ctx, t) => {
  const t0 = B.b55, t1 = B.b56, tm = Wd('llega al mundial') - .1;
  if (t < tm) {
    camara(ctx, t, t0, tm, { a: [960, 560, 1.1], b: [960, 560, 1.18] });
    cuarto(ctx, t, 'vestidor'); camisetaColgada(ctx, 960, 520, 1.6, KIT.MEX.shirt, '7');
    fin(ctx); tono(ctx, 'frio'); pozo(ctx, 960, 520, 420, .45);
  } else { // el túnel: camina hacia la luz del estadio
    camara(ctx, t, tm, t1, { a: [960, 560, 1.0], b: [960, 560, 1.12] });
    ctx.fillStyle = '#0c0d12'; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.fillStyle = vg(ctx, [[0, '#fff6dc'], [1, '#a8c8f0']], 200, 900); ctx.beginPath(); ctx.moveTo(720, 900); ctx.lineTo(720, 380); ctx.quadraticCurveTo(960, 240, 1200, 380); ctx.lineTo(1200, 900); ctx.fill();
    glow(ctx, 960, 560, 700, 'rgba(255,245,220,.45)');
    const k = prog(t, tm, t1 + .5), y = lerp(1000, 905, k), s = lerp(1.6, 1.1, k);
    cr(ctx, { x: 960, y, s, ropa: 'mex', t, back: true, pose: corre(k * 900, s, 0, 'walk'), face: 'determined', rim: 'rgba(255,245,220,1)', light: [0, -1] });
    fin(ctx); tono(ctx, 'dia'); sello(ctx, 'MUNDIAL', t, tm + .15, t1);
  }
  vignette(ctx, .55);
}, 960);

// ===== b56 · Mete gol, corre a la esquina, brinca, gira…  ·  b57 · ¡Siuuu! =====
function banderin(ctx, x, y, s, t) { ctx.fillStyle = '#e8e8ea'; ctx.fillRect(x - 3 * s, y - 220 * s, 6 * s, 220 * s); ctx.fillStyle = '#e4a020'; ctx.beginPath(); ctx.moveTo(x + 3 * s, y - 220 * s); ctx.lineTo(x + (70 + Math.sin(t * 6) * 6) * s, y - 196 * s); ctx.lineTo(x + 3 * s, y - 170 * s); ctx.fill(); }
S(B.b56, (ctx, t) => {
  const t0 = B.b56, tg = Wd('gol', t0 - .1) + .1, tc = Wd('corre', t0) - .1, tb = Wd('brinca') - .05, tgi = Wd('gira') - .05, t1 = B.b57;
  if (t < tc) { // el gol: remate y red
    window.BOARD = 'MUNDIAL'; goalPOV(ctx, t, tg - .5, { keeper: '#e9e9ee', shooter: KIT.MEX.shirt, tx: 1480, ty: 430, keeperSide: -1 });
    fin(ctx); tono(ctx, 'noche');
  } else { // corre a la esquina, brinca y gira
    camara(ctx, t, tc, t1, { a: [900, 620, 1.1], b: [1090, 600, 1.16] });
    window.BOARD = 'MUNDIAL'; pitchLevel(ctx, t, { camX: 1400 + (t - tc) * 120, cheer: 1, crowdBlur: 6 }); banderin(ctx, 1500, 980, 1.2, t);
    const x = Math.min(1380, lerp(700, 1380, prog(t, tc, tb)));
    const jy = t > tb ? Math.sin(clamp((t - tb) / (tgi + .6 - tb)) * PI) * 170 : 0, spin = t > tgi ? ((t - tgi) * 5) % 2 < 1 ? 1 : -1 : 1;
    const pose = t < tb ? corre(x * 1.1, 1.3) : t < tgi ? mixPose(POSE.cheer, { ...POSE.header, lean: -6 }, .4) : { ...POSE.cheer, shB: 120, shF: 120 };
    cr(ctx, { x, y: 975, s: 1.3, ropa: 'mex', t, pose, face: 'shout', dir: spin, jump: jy, squash: t > tb && t < tb + .12 ? -.08 : 0 });
    fin(ctx); tono(ctx, 'noche');
  }
  vignette(ctx, .45);
}, t => t < Wd('corre', B.b56) - .1 ? 960 : Math.min(1380, lerp(700, 1380, prog(t, Wd('corre', B.b56), Wd('brinca')))));
S(B.b57, (ctx, t) => { // ¡Siuuu! contrapicado, la tribuna explota (el único empuje de cámara del acto)
  const t0 = B.b57, t1 = B.b58;
  camara(ctx, t, t0, t1, { a: [960, 640, 1.05], b: [960, 600, 1.22], e: E.out });
  window.BOARD = 'MUNDIAL'; pitchLevel(ctx, t, { camX: 1500, cheer: 1, crowdBlur: 4 });
  const land = ease(t, t0 - .05, t0 + .25, E.out);
  cr(ctx, { x: 960, y: 990, s: 1.7, ropa: 'mex', t, pose: mixPose({ ...POSE.cheer, shB: 120, shF: 120 }, SIU, land), face: 'shout', squash: t < t0 + .2 ? -.06 * (1 - land) : 0 });
  fin(ctx); tono(ctx, 'noche'); vignette(ctx, .5);
}, 960);

// ===== b58 · Pero ni así pasamos de Cuartos, ni con el mismísimo Bicho =====
S(B.b58, (ctx, t) => {
  const t0 = B.b58, t1 = B.b59, tn = Wd('ni con') - .1;
  if (t < tn) { // el cuadro de eliminación: la línea rosa sube hasta cuartos y ahí se corta
    fondoMarca(ctx, t, 58); uiCenter(ctx, V ? 1.12 : 1);
    const et = ['GRUPOS', 'DIECISEISAVOS', 'OCTAVOS', 'CUARTOS', 'SEMIFINAL', 'FINAL'];
    et.forEach((s, i) => t3(ctx, s, 380 + i * 235, 760, { size: 20, font: MONO3, align: 'center', color: i < 4 ? B3V.huesoT : 'rgba(239,233,223,.25)', ls: 3 }));
    const pts = et.map((s, i) => [380 + i * 235, 680 - i * 70]), k = ease(t, t0 + .1, Wd('cuartos', t0) + .1, E.inOut);
    trazo(ctx, pts.slice(0, 4), k, '#e4007c', 6); trazo(ctx, pts.slice(3), 1, 'rgba(95,94,100,.5)', 4, [10, 14]);
    const kx = ease(t, Wd('cuartos', t0) + .1, Wd('cuartos', t0) + .4, E.back);
    if (kx > 0) { ctx.save(); ctx.translate(pts[3][0], pts[3][1]); ctx.scale(kx, kx); ctx.strokeStyle = '#efe9df'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-22, -22); ctx.lineTo(22, 22); ctx.moveTo(22, -22); ctx.lineTo(-22, 22); ctx.stroke(); ctx.restore(); }
  } else { // sentado en el pasto, la tribuna se vacía
    camara(ctx, t, tn, t1, { a: [960, 640, 1.3], b: [960, 650, 1.36] });
    window.BOARD = 'MUNDIAL'; pitchLevel(ctx, t, { camX: 700, cheer: 0, crowdBlur: 7 });
    cr(ctx, { x: 960, y: 980, s: 1.45, ropa: 'mex', t, pose: { ...POSE.sitFrontSad, head: 24 }, face: 'sad', look: [0, 8] });
    fin(ctx); tono(ctx, 'noche'); velo(ctx, '#0b1322', .25); pozo(ctx, 960, 700, 420, .5);
  }
  vignette(ctx, .55);
}, 960);

// ===== b59 · El talento de Cristiano es de uno en un millón =====
S(B.b59, (ctx, t) => {
  const t0 = B.b59, t1 = B.b60;
  const z = lerp(1.0, 3.2, ease(t, t0, t1, E.inOut)); camara(ctx, t, t0, t1, { a: [1251, 541, 1.0], b: [1251, 541, 3.2], e: E.inOut });
  fondoMarca(ctx, t, 59); const r = rnd(59);
  ctx.fillStyle = 'rgba(239,233,223,.22)'; for (let i = 0; i < 4200; i++) ctx.fillRect(r() * 1920, r() * 1080, 2.2, 2.2);
  glow(ctx, 1251, 541, 60, 'rgba(255,240,200,.8)'); ctx.fillStyle = '#efe9df'; ctx.beginPath(); ctx.arc(1251, 541, 5, 0, TAU); ctx.fill();
  fin(ctx); uiCenter(ctx, V ? 1.15 : 1); t3(ctx, 'UNO EN UN MILLÓN', 960, 900, { size: 26, font: MONO3, align: 'center', color: B3V.huesoT, ls: 6, alpha: ease(t, Wd('uno en un millón') - .1, Wd('uno en un millón') + .4) });
}, 960);

// ===== b60 · en Portugal, a los doce, alguien lo vio y alguien le apostó (recuerdo, desaturado) =====
S(B.b60, (ctx, t) => {
  const t0 = B.b60, t1 = B.b61;
  camara(ctx, t, t0, t1, { a: [700, 600, 1.35], b: [720, 600, 1.4] });
  canchaVerde(ctx, t); conos(ctx, [900, 1040, 1180], 900);
  const x = 980 + Math.sin((t - t0) * 2) * 120; cr(ctx, { x, y: 905, s: 1.1, edad: 'nino', t, pose: corre(x * 1.6, .86), face: 'determined' }); ball2(ctx, x + 50, 892, 13, t * 12);
  const oc = { x: 520, y: 905, s: 1.3, dir: 1 }, ta = Wd('apostó') - .2, nod = t > Wd('vio') ? Math.max(0, Math.sin((t - Wd('vio')) * 7)) * 8 : 0;
  figure(ctx, { ...oc, t, seed: 91, shirt: CR.sporting, pose: agarre({ ...POSE.stand, head: 6 + nod }, oc, 'F', [610, 690]), face: 'smile', look: [6, 2] });
  papel(ctx, 622, 690, 70, 92, .15, c => { if (t > ta) { const k = prog(t, ta, ta + .3); c.strokeStyle = '#1f7a4a'; c.lineWidth = 5; c.beginPath(); c.moveTo(-16, 0); c.lineTo(-16 + 12 * Math.min(1, k * 2), 12 * Math.min(1, k * 2)); if (k > .5) c.lineTo(-4 + 24 * (k - .5) * 2, 12 - 32 * (k - .5) * 2); c.stroke(); } });
  fin(ctx); tono(ctx, 'recuerdo'); sello(ctx, 'LISBOA · 1997', t, t0 + .2, t1);
  velo(ctx, '#000', 1 - ease(t, t0, t0 + .3) + ease(t, t1 - .3, t1)); vignette(ctx, .55);
}, 760);

// ===== b61 · En México, el talento sí nace (los cerros de Tijuana al amanecer, llenos de niños jugando) =====
S(B.b61, (ctx, t) => {
  const t0 = B.b61, t1 = B.b62;
  camara(ctx, t, t0, t1, { a: [960, 560, 1.0], b: [940, 560, 1.05] });
  cerros(ctx, 'tj', 'alba'); llano(ctx, t, { porteria: [1620, 870, .5] });
  const r = rnd(61);
  for (let i = 0; i < 14; i++) { const bx = 120 + i * 125 + r() * 40, by = 800 + r() * 90, s = .45 + (by - 800) / 90 * .2, x = bx + Math.sin(t * 2 + i) * 30;
    figure(ctx, { x, y: by, s, dir: Math.cos(t * 2 + i) > 0 ? 1 : -1, t, seed: 200 + i, shirt: PAL_TJ[i % PAL_TJ.length], pose: corre(x * 2 + i * 50, s), face: 'happy', rim: 'rgba(255,200,150,1)' }); if (i % 3 === 0) ball2(ctx, x + 30 * s * 2, by - 8, 7 * s * 2, t * 8); }
  fin(ctx); tono(ctx, 'oro'); vignette(ctx, .45);
}, 960);

// ===== b62–b63 · Lo que tiene que salir a buscarse… es la oportunidad (la silla vacía del visor) =====
S(B.b62, (ctx, t) => {
  const t0 = B.b62, t1 = Wd('y a lo mejor') - .1;
  camara(ctx, t, t0, t1, { a: [640, 740, 1.55], b: [620, 730, 1.7] });
  cerros(ctx, 'tj', 'alba'); llano(ctx, t, {});
  ctx.fillStyle = '#d8d0bc'; ctx.fillRect(320, 760, 160, 14); ctx.fillRect(330, 774, 10, 140); ctx.fillRect(460, 774, 10, 140); ctx.fillRect(330, 620, 140, 12); ctx.fillRect(330, 620, 10, 150); ctx.fillRect(460, 620, 10, 150);
  fin(ctx); tono(ctx, 'oro'); etiqueta(ctx, 'OPORTUNIDAD', 400, 600, t, Wd('oportunidad') - .1, { rosa: true, dy: -80, dx: 40 }); vignette(ctx, .55);
}, 600);

// ===== b63b · el próximo Cristiano ya nació aquí (cunero, de noche, Tijuana) =====
S(Wd('y a lo mejor') - .1, (ctx, t) => {
  const t0 = Wd('y a lo mejor') - .1, t1 = B.b64;
  camara(ctx, t, t0, t1, { a: [960, 600, 1.15], b: [960, 600, 1.22] });
  cuarto(ctx, t, 'hospital'); ctx.fillStyle = 'rgba(10,14,30,.35)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ctx.fillStyle = 'rgba(200,225,240,.35)'; rr(ctx, 760, 640, 400, 150, 30); ctx.fill(); ctx.strokeStyle = 'rgba(220,235,245,.6)'; ctx.lineWidth = 4; rr(ctx, 760, 640, 400, 150, 30); ctx.stroke(); ctx.fillStyle = '#c8c8cc'; ctx.fillRect(800, 790, 12, 110); ctx.fillRect(1110, 790, 12, 110);
  ctx.fillStyle = '#efe2e8'; ctx.beginPath(); ctx.ellipse(960, 690, 120, 40, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#16161a'; ctx.beginPath(); ctx.arc(860, 676 + Math.sin(t * 1.5) * 1.5, 30, 0, TAU); ctx.fill();
  ball2(ctx, 1080, 668, 22, Math.sin(t) * .3);
  fin(ctx); tono(ctx, 'casa'); sello(ctx, 'TIJUANA · HOY', t, t0 + .2, t1); vignette(ctx, .6);
}, 960);

// ===== b64–b66 · Y este domingo… quizá juega en una cancha abandonada (rima con el gancho, al anochecer) =====
function canchaFinal(ctx, t, t0, t1, cielo, o = {}) {
  camara(ctx, t, t0, t1, o.cam);
  canchaAbandonada(ctx, t, { cielo });
  const ph = (t - t0) * 1.3, k = Math.sin(ph * TAU * .5), x = 820 + (o.x || 0);
  cr(ctx, { x, y: 905, s: 1.2, edad: 'nino', t, pose: o.pose || mixPose(POSE.stand, { ...POSE.kick, hipF: 50 }, Math.max(0, k)), face: o.face || 'determined', look: o.look });
  if (o.balon !== false) { const b = Math.abs(Math.cos(ph * TAU * .5)); ball2(ctx, x + 90 + b * 300, 892, 14, t * 6); }
}
S(B.b64, (ctx, t) => {
  const t0 = B.b64, t1 = B.b65;
  canchaFinal(ctx, t, t0, t1, 'tarde', { cam: { a: [900, 700, 1.5], b: [960, 560, 1.0], e: E.inOut } });
  // a lo lejos, en los cerros, más canchas con más niños (como muchos otros)
  const k = ease(t, Wd('como muchos otros') - .3, Wd('como muchos otros') + .8);
  if (k > 0) { ctx.save(); ctx.globalAlpha = k; [[300, 700], [700, 690], [1300, 700], [1650, 705]].forEach(([x, y], i) => { ctx.fillStyle = 'rgba(120,90,60,.8)'; ctx.fillRect(x - 70, y, 140, 10); figure(ctx, { x: x + Math.sin(t * 2 + i) * 30, y, s: .22, t, seed: 220 + i, shirt: PAL_TJ[i], pose: corre(t * 200 + i * 40, .22), face: 'neutral', noShadow: true }); }); ctx.restore(); }
  fin(ctx); tono(ctx, 'atardecer'); vignette(ctx, .55);
}, 900);
S(B.b65, (ctx, t) => { // el sol se va: el talento no va a brillar
  const t0 = B.b65, t1 = B.b66;
  canchaFinal(ctx, t, t0, t1, 'tarde', { cam: { a: [880, 640, 1.25], b: [880, 650, 1.32] }, pose: mixPose(POSE.stand, { ...POSE.sitFrontSad, head: 10 }, ease(t, t0 + .5, t0 + 1.4)), face: 'sad', balon: false, look: [4, 4] });
  if (t > t0) ball2(ctx, 930, 892, 14, 0);
  fin(ctx); tono(ctx, 'atardecer'); velo(ctx, '#05070f', .55 * ease(t, t0, t1 + .5)); vignette(ctx, .6);
}, 880);
S(B.b66, (ctx, t) => { // y así, no vamos a ganar un Mundial — el último tiro contra la barda, de noche
  const t0 = B.b66, t1 = T.cierre;
  canchaFinal(ctx, t, t0, t1, 'noche', { cam: { a: [960, 600, 1.1], b: [960, 610, 1.05] }, face: 'neutral' });
  fin(ctx); tono(ctx, 'noche'); velo(ctx, '#000', ease(t, t1 - .6, t1)); vignette(ctx, .65);
}, 900);

// ===== cierre de marca =====
S(T.cierre, (ctx, t) => {
  const t0 = T.cierre; fondoMarca(ctx, t, 44); glow(ctx, 960, 520, 900, 'rgba(239,233,223,.07)');
  endCard3(ctx, t, t0, {});
  ctx.save(); ctx.fillStyle = `rgba(0,0,0,${prog(t, window.DUR_EP - .8, window.DUR_EP)})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore(); vignette(ctx, .6);
});
