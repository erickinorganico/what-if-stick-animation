// EL HUBIERA · identidad v3 "Bifurcación" — una línea que se parte: gris = lo que pasó, rosa = lo que hubiera pasado
const B3 = { negro: '#0d0d0f', negro2: '#141417', hueso: '#efe9df', huesoT: 'rgba(239,233,223,.62)', gris: '#5f5e64', rosa: '#e4007c', verde: '#18b36a' };
const HANDLE3 = '@aquielhubierasiexiste';
const SERIF = 'Instrument Serif', SANS = 'Instrument Sans', MONO = 'Geist Mono';
function b3font(ctx, size, fam = SERIF, style = '', weight = '') { ctx.font = `${style} ${weight} ${size}px "${fam}"`.trim(); }
function b3text(ctx, s, x, y, o = {}) { ctx.save(); b3font(ctx, o.size || 40, o.font || SERIF, o.italic ? 'italic' : '', o.weight || ''); ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'alphabetic'; ctx.letterSpacing = (o.ls || 0) + 'px'; ctx.globalAlpha *= (o.alpha ?? 1); ctx.fillStyle = o.color || B3.hueso; ctx.fillText(s, x, y); const w = ctx.measureText(s).width; ctx.restore(); return w; }
// grano de película (sobre lienzo opaco)
function b3grain(ctx, w, h, a = .045, seed = 11) { const id = ctx.getImageData(0, 0, w, h), d = id.data; let s = seed; for (let i = 0; i < d.length; i += 4) { s = (s * 16807) % 2147483647; const n = ((s / 2147483647) - .5) * 255 * a; d[i] += n; d[i + 1] += n; d[i + 2] += n; } ctx.putImageData(id, 0, 0); }
function b3bg(ctx, w, h, o = {}) { ctx.fillStyle = o.col || B3.negro; ctx.fillRect(0, 0, w, h); if (o.light !== false) { const [lx, ly, lr, la] = o.light || [w * .5, h * .45, Math.max(w, h) * .7, .07]; const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr); g.addColorStop(0, `rgba(239,233,223,${la})`); g.addColorStop(1, 'rgba(239,233,223,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); } const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * .35, w / 2, h / 2, Math.hypot(w, h) * .62); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h); }
// ===== el símbolo: tronco → nodo → (gris recto | rosa cambia de vía) =====
// origen en el nodo; u = unidad de construcción; o.trunk/o.real = largo en u; o.rise = subida de la rama en u
function b3mark(ctx, x, y, u, o = {}) {
  const trunk = o.trunk ?? 4.5, real = o.real ?? 7.5, rise = o.rise ?? 4.6, run = o.run ?? 7.5, w = (o.w ?? 1) * u;
  const cT = o.mono ? (o.monoCol || B3.hueso) : (o.trunkCol || B3.hueso), cR = o.mono ? (o.monoCol || B3.hueso) : (o.realCol || B3.gris), cH = o.mono ? (o.monoCol || B3.hueso) : (o.hubCol || B3.rosa);
  ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = w;
  ctx.strokeStyle = cR; ctx.globalAlpha = o.mono ? .38 : 1; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(real * u, 0); ctx.stroke(); ctx.globalAlpha = 1;
  ctx.strokeStyle = cH; ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(run * .36 * u, 0, run * .56 * u, -rise * u, run * u, -rise * u); ctx.stroke();
  ctx.strokeStyle = cT; ctx.beginPath(); ctx.moveTo(-trunk * u, 0); ctx.lineTo(0, 0); ctx.stroke();
  ctx.fillStyle = cT; ctx.beginPath(); ctx.arc(0, 0, (o.node ?? 1.12) * u, 0, TAU); ctx.fill();
  if (o.endDot !== false) { ctx.fillStyle = cH; ctx.beginPath(); ctx.arc(run * u, -rise * u, (o.end ?? .95) * u, 0, TAU); ctx.fill(); }
  ctx.restore();
  return { x0: x - trunk * u, x1: x + Math.max(real, run) * u, yTop: y - rise * u, end: [x + run * u, y - rise * u] };
}
// ===== palabra: "el hubiera" — el (romana) + hubiera (itálica, el modo de lo que pudo ser); el punto de la i es el nodo rosa =====
const _dotCache = {};
function b3idot(size) { // localiza el punto de la "i" en "hub|i|era" itálica comparando con la i sin punto
  if (_dotCache[size]) return _dotCache[size];
  const W2 = Math.ceil(size * 5), H2 = Math.ceil(size * 2), c1 = document.createElement('canvas'), c2 = document.createElement('canvas'); c1.width = c2.width = W2; c1.height = c2.height = H2;
  const a = c1.getContext('2d'), b = c2.getContext('2d'); [a, b].forEach(q => { q.font = `italic ${size}px "${SERIF}"`; q.fillStyle = '#000'; q.textBaseline = 'alphabetic'; });
  a.fillText('hubiera', 10, size * 1.4); b.fillText('hubıera', 10, size * 1.4);
  const da = a.getImageData(0, 0, W2, H2).data, db = b.getImageData(0, 0, W2, H2).data; let sx = 0, sy = 0, n = 0, minx = 1e9, maxx = -1, miny = 1e9, maxy = -1;
  for (let y = 0; y < H2; y++) for (let x = 0; x < W2; x++) { const i = (y * W2 + x) * 4 + 3; if (da[i] - db[i] > 90) { sx += x; sy += y; n++; minx = Math.min(minx, x); maxx = Math.max(maxx, x); miny = Math.min(miny, y); maxy = Math.max(maxy, y); } }
  const r = { dx: sx / n - 10, dy: sy / n - size * 1.4, r: Math.max(maxx - minx, maxy - miny) / 2 }; _dotCache[size] = r; return r;
}
function b3wordmark(ctx, x, y, size, o = {}) { // y = línea base
  const col = o.color || B3.hueso, dotCol = o.dot || B3.rosa;
  ctx.save(); b3font(ctx, size, SERIF); ctx.letterSpacing = (-size * .012) + 'px'; const wEl = ctx.measureText('el').width; const gap = size * .2;
  b3font(ctx, size, SERIF, 'italic'); ctx.letterSpacing = (-size * .012) + 'px'; const wHub = ctx.measureText('hubıera').width; ctx.restore();
  const total = wEl + gap + wHub; let x0 = o.align === 'center' ? x - total / 2 : o.align === 'right' ? x - total : x;
  ctx.save(); ctx.fillStyle = col; ctx.textBaseline = 'alphabetic'; b3font(ctx, size, SERIF); ctx.letterSpacing = (-size * .012) + 'px'; ctx.fillText('el', x0, y);
  b3font(ctx, size, SERIF, 'italic'); ctx.letterSpacing = (-size * .012) + 'px'; ctx.fillText('hubıera', x0 + wEl + gap, y);
  const d = b3idot(Math.round(size)); const k = size / Math.round(size); ctx.fillStyle = dotCol; ctx.beginPath(); ctx.arc(x0 + wEl + gap + d.dx * k - (-size * .012) * 3 * 0, y + d.dy * k, d.r * k * 1.08, 0, TAU); ctx.fill(); ctx.restore();
  return { x0, x1: x0 + total, w: total };
}
// firma: símbolo + palabra en línea (alto del símbolo ≈ altura de x)
function b3lockup(ctx, x, y, size, o = {}) { const u = size * .082; const mw = (4.5 + 7.5) * u; const gap = size * .38; ctx.save(); b3font(ctx, size, SERIF); const wEl = ctx.measureText('el').width; b3font(ctx, size, SERIF, 'italic'); const wH = ctx.measureText('hubıera').width; ctx.restore(); const tw = wEl + size * .2 + wH; const total = mw + gap + tw; const x0 = o.align === 'center' ? x - total / 2 : x;
  b3mark(ctx, x0 + 4.5 * u, y - size * .1, u, o.mark || {}); b3wordmark(ctx, x0 + mw + gap, y, size, Object.assign({}, o, { align: 'left' })); return { x0, x1: x0 + total }; }
// ===== íconos de línea para destacadas =====
function b3icon(ctx, kind, cx, cy, s) { ctx.save(); ctx.translate(cx, cy); ctx.strokeStyle = B3.hueso; ctx.fillStyle = B3.hueso; ctx.lineWidth = 9 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 'episodios') { ctx.beginPath(); ctx.moveTo(-50 * s, -70 * s); ctx.lineTo(75 * s, 0); ctx.lineTo(-50 * s, 70 * s); ctx.closePath(); ctx.stroke(); }
  if (kind === 'mexico') { b3text(ctx, 'mx', 0, 40 * s, { size: 190 * s, italic: true, align: 'center' }); }
  if (kind === 'futbol') { ctx.beginPath(); ctx.arc(0, 0, 90 * s, 0, TAU); ctx.stroke(); const pts = [...Array(5)].map((_, i) => [Math.cos(-Math.PI / 2 + i * TAU / 5) * 34 * s, Math.sin(-Math.PI / 2 + i * TAU / 5) * 34 * s]); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fill(); pts.forEach(p => { ctx.beginPath(); ctx.moveTo(p[0] * 1.15, p[1] * 1.15); ctx.lineTo(p[0] * 2.62, p[1] * 2.62); ctx.stroke(); }); }
  if (kind === 'preguntas') { b3text(ctx, '¿?', 0, 62 * s, { size: 230 * s, italic: true, align: 'center' }); }
  if (kind === 'detras') { ctx.beginPath(); rr(ctx, -85 * s, -30 * s, 170 * s, 110 * s, 10 * s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-85 * s, -30 * s); ctx.lineTo(-72 * s, -78 * s); ctx.lineTo(82 * s, -78 * s); ctx.lineTo(85 * s, -30 * s); ctx.stroke(); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo((-40 + i * 45) * s, -78 * s); ctx.lineTo((-62 + i * 45) * s, -30 * s); ctx.stroke(); } }
  if (kind === 'campeones') { ctx.beginPath(); ctx.moveTo(-55 * s, -80 * s); ctx.lineTo(55 * s, -80 * s); ctx.bezierCurveTo(55 * s, 10 * s, 20 * s, 30 * s, 0, 32 * s); ctx.bezierCurveTo(-20 * s, 30 * s, -55 * s, 10 * s, -55 * s, -80 * s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 32 * s); ctx.lineTo(0, 66 * s); ctx.moveTo(-38 * s, 80 * s); ctx.lineTo(38 * s, 80 * s); ctx.stroke(); ctx.beginPath(); ctx.arc(-55 * s, -45 * s, 26 * s, Math.PI * .5, Math.PI * 1.5); ctx.stroke(); ctx.beginPath(); ctx.arc(55 * s, -45 * s, 26 * s, -Math.PI * .5, Math.PI * .5); ctx.stroke(); }
  ctx.restore(); }
// ===== miniaturas: un remate en serif itálica que termina en punto rosa + fecha del punto de quiebre en mono =====
function b3punch(ctx, lines, x, y, size, o = {}) { // la última línea termina en "." rosa
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = size * .18; ctx.shadowOffsetY = size * .03;
  lines.forEach((ln, i) => { const isLast = i === lines.length - 1; const s = isLast && ln.endsWith('.') ? ln.slice(0, -1) : ln; const yy = y + i * size * .86; b3font(ctx, size, SERIF, 'italic'); ctx.letterSpacing = (-size * .015) + 'px'; ctx.fillStyle = o.color || B3.hueso; ctx.textAlign = 'left'; ctx.fillText(s, x, yy); if (isLast && ln.endsWith('.')) { const w = ctx.measureText(s).width; ctx.fillStyle = B3.rosa; ctx.beginPath(); ctx.arc(x + w + size * .1, yy - size * .055, size * .068, 0, TAU); ctx.fill(); } });
  ctx.restore(); }
function b3stamp(ctx, date, label, x, y, o = {}) { b3text(ctx, date, x, y, { size: o.size || 30, font: MONO, color: o.color || B3.hueso, ls: 2 }); ctx.save(); b3font(ctx, o.size || 30, MONO); ctx.letterSpacing = '2px'; const w = ctx.measureText(date).width; ctx.restore(); ctx.fillStyle = B3.rosa; ctx.beginPath(); ctx.arc(x + w + 22, y - (o.size || 30) * .32, 6, 0, TAU); ctx.fill(); b3text(ctx, label, x + w + 44, y, { size: o.size || 30, font: MONO, color: B3.huesoT, ls: 2 }); }
function b3sig(ctx, x, y, s = 1) { b3lockup(ctx, x, y, 44 * s, { align: 'left' }); }
function desat(ctx, path, a = 1) { ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = a; ctx.fillStyle = '#808080'; path(); ctx.fill(); ctx.restore(); }
const KIT3 = {};
const add = (name, w, h, fn) => KIT3[name] = [w, h, fn];
// ---- perfil
add('perfil/avatar-1080', 1080, 1080, ctx => { b3bg(ctx, 1080, 1080, { light: [600, 520, 700, .06] }); b3mark(ctx, 450, 640, 50, { trunk: 11, real: 14, rise: 4.8, run: 7.4, w: 1.05, node: 1.18, end: 1.05 }); b3grain(ctx, 1080, 1080, .04); });
add('perfil/avatar-alterno', 1080, 1080, ctx => { b3bg(ctx, 1080, 1080, { col: B3.hueso, light: false }); ctx.fillStyle = 'rgba(0,0,0,0)'; b3mark(ctx, 450, 640, 50, { trunk: 11, real: 14, rise: 4.8, run: 7.4, w: 1.05, node: 1.18, end: 1.05, trunkCol: B3.negro, realCol: '#b9b3a8' }); b3grain(ctx, 1080, 1080, .03); });
// ---- logos
add('logo/logo-horizontal-transparente', 2400, 700, ctx => { b3lockup(ctx, 1200, 430, 260, { align: 'center' }); });
add('logo/logo-horizontal-sobre-negro', 2400, 700, ctx => { b3bg(ctx, 2400, 700, { light: [1200, 350, 1100, .05] }); b3lockup(ctx, 1200, 430, 260, { align: 'center' }); b3grain(ctx, 2400, 700, .035); });
add('logo/logo-horizontal-sobre-hueso', 2400, 700, ctx => { ctx.fillStyle = B3.hueso; ctx.fillRect(0, 0, 2400, 700); b3lockup(ctx, 1200, 430, 260, { align: 'center', color: B3.negro, mark: { trunkCol: B3.negro, realCol: '#b9b3a8' } }); });
add('logo/simbolo-transparente', 1200, 1200, ctx => { b3mark(ctx, 430, 680, 52, {}); });
add('logo/palabra-transparente', 2000, 600, ctx => { b3wordmark(ctx, 1000, 400, 300, { align: 'center' }); });
// ---- YouTube
add('youtube/youtube-banner', 2560, 1440, ctx => { b3bg(ctx, 2560, 1440, { light: [1280, 700, 1300, .055] });
  const u = 26, ny = 850, nx = 1560; b3mark(ctx, nx, ny, u, { trunk: nx / u + 1, real: (2560 - nx) / u + 1, rise: 6.4, run: 12, w: .62, node: 1.05, end: .95 });
  b3wordmark(ctx, 640, 700, 196, {}); b3text(ctx, 'Historias de lo que pudo pasar', 648, 772, { size: 40, font: SANS, color: B3.huesoT, ls: .5 });
  b3text(ctx, HANDLE3, 2005, 902, { size: 28, font: MONO, color: B3.huesoT, align: 'right', ls: 1 }); /* dentro de la zona segura 1546x423 con margen */ b3grain(ctx, 2560, 1440, .035); });
add('youtube/youtube-marca-de-agua', 300, 300, ctx => { b3mark(ctx, 105, 175, 13, { mono: true }); });
// ---- Facebook
add('facebook/facebook-portada', 1640, 624, ctx => { b3bg(ctx, 1640, 624, { light: [820, 300, 900, .055] }); const u = 15, ny = 420, nx = 1000; b3mark(ctx, nx, ny, u, { trunk: nx / u + 1, real: (1640 - nx) / u + 1, rise: 7, run: 13, w: .62 });
  b3wordmark(ctx, 300, 310, 116, {}); b3text(ctx, 'Historias de lo que pudo pasar', 304, 352, { size: 24, font: SANS, color: B3.huesoT, ls: .3 }); b3text(ctx, HANDLE3, 1340, 470, { size: 18, font: MONO, color: B3.huesoT, align: 'right', ls: 1 }); b3grain(ctx, 1640, 624, .035); });
// ---- Instagram destacadas
for (const [k, label] of [['episodios', 'episodios'], ['mexico', 'méxico'], ['futbol', 'futbol'], ['preguntas', 'preguntas'], ['detras', 'detrás'], ['campeones', 'campeones']]) add('instagram/instagram-destacada-' + k, 1080, 1080, ctx => { b3bg(ctx, 1080, 1080, { light: [540, 500, 620, .06] }); b3icon(ctx, k, 540, 500, 1.55); ctx.fillStyle = B3.rosa; ctx.beginPath(); ctx.arc(540, 790, 11, 0, TAU); ctx.fill(); b3grain(ctx, 1080, 1080, .035); });
// ---- miniaturas
function thumbBase(ctx, light) { b3bg(ctx, 1920, 1080, { light }); }
add('miniaturas/ep01-miniatura-a', 1920, 1080, ctx => { thumbBase(ctx, [1360, 520, 900, .09]);
  // la línea: tronco desde la izquierda, la realidad sigue gris hacia el árbitro, el hubiera sube hacia el campeón
  b3mark(ctx, 900, 1000, 22, { trunk: 42, real: 46, rise: 5.2, run: 13, w: .55, node: 1.0, end: .9 });
  ctx.save(); ctx.globalAlpha = .9; const a = figure(ctx, { x: 520, y: 1430, s: 2.5, dir: 1, pose: Object.assign({}, POSE.point, { shF: 118, head: -12 }), face: 'shout', t: 1, seed: 3, shirt: '#bdbdbd', sleeves: 'short', shorts: '#222', acc: { whistle: 1 }, rim: 'rgba(239,233,223,.55)', light: [-.5, -1], noShadow: true, still: true }); ctx.restore();
  desat(ctx, () => { ctx.beginPath(); ctx.rect(0, 0, 900, 1080); }, 1);
  const s = 2.85, x = 1420, y = 1330; const f = figure(ctx, { x, y, s, dir: -1, pose: Object.assign({}, POSE.lift, { lean: -6, head: -10, shB: 150, elB: 26, shF: 156, elF: 22 }), face: 'smug', t: 1, seed: 12, shirt: B3.verde, hood: true, rim: 'rgba(255,190,225,1)', light: [-1, -.5], noShadow: true, still: true });
  trophyDraw(ctx, x - (f.hand[0] + f.handB[0]) / 2 * s, y + Math.min(f.hand[1], f.handB[1]) * s - 66 * 1.42, 1.42); eyeGlow(ctx, f, x, y, s, -1);
  b3punch(ctx, ['No era.'], 96, 330, 250); b3stamp(ctx, '29·06·2014', 'PUNTO DE QUIEBRE', 104, 86, { size: 26 }); b3grain(ctx, 1920, 1080, .04); });
add('miniaturas/ep01-miniatura-b', 1920, 1080, ctx => { thumbBase(ctx, [1480, 420, 800, .12]);
  ctx.fillStyle = '#16181c'; rr(ctx, 1240, 230, 520, 340, 18); ctx.fill(); const g = ctx.createLinearGradient(0, 260, 0, 540); g.addColorStop(0, '#2c4a3c'); g.addColorStop(1, '#183528'); ctx.fillStyle = g; rr(ctx, 1266, 256, 468, 288, 8); ctx.fill(); ctx.save(); ctx.strokeStyle = 'rgba(239,233,223,.45)'; ctx.lineWidth = 3; ctx.strokeRect(1290, 280, 420, 240); ctx.beginPath(); ctx.moveTo(1500, 280); ctx.lineTo(1500, 520); ctx.stroke(); ctx.beginPath(); ctx.arc(1500, 400, 44, 0, TAU); ctx.stroke(); ctx.restore(); glow(ctx, 1500, 400, 520, 'rgba(160,230,200,.18)');
  figure(ctx, { x: 640, y: 1480, s: 2.8, dir: 1, pose: Object.assign({}, POSE.stand, { shF: 70, elF: 20, shB: 30, elB: 30 }), face: 'tender', t: 1, seed: 14, shirt: P.abu, acc: { mustache: 1, glasses: 1, hairAbu: 1 }, rim: 'rgba(200,235,220,.9)', light: [1, -.5], noShadow: true, still: true });
  figure(ctx, { x: 1080, y: 1560, s: 2.55, dir: 1, pose: Object.assign({}, POSE.stand, { head: -8 }), face: 'cry', t: 1, seed: 12, shirt: B3.verde, hood: true, rim: 'rgba(200,235,220,.9)', light: [1, -.5], noShadow: true, still: true });
  b3punch(ctx, ['Míralo,', 'mijo.'], 96, 320, 220); b3stamp(ctx, '29·06·2014', 'TIEMPO EXTRA', 104, 86, { size: 26 }); b3grain(ctx, 1920, 1080, .04); });
add('miniaturas/ep02-miniatura-a', 1920, 1080, ctx => { thumbBase(ctx, [1340, 560, 900, .08]); starfield(ctx, 0, 21); earthDraw(ctx, 1560, 1290, 640, 0);
  const s = 3.0, x = 1360, y = 1400; const f = alien(ctx, x, y, s, -1, Object.assign({}, POSE.stand, { shF: 44, elF: 112, shB: 30, elB: 40, head: -6 }), 'happy', 1, { noShadow: true, still: true }); const hx = x - f.hand[0] * s, hy = y + f.hand[1] * s; tacoDraw(ctx, hx - 20, hy - 30, 3.0, 1.5);
  b3punch(ctx, ['Con piña.'], 96, 330, 250); b3stamp(ctx, '14·03·2060', 'PRIMER CONTACTO', 104, 86, { size: 26 }); b3grain(ctx, 1920, 1080, .04); });
add('miniaturas/ep02-miniatura-b', 1920, 1080, ctx => { thumbBase(ctx, [1300, 500, 900, .07]);
  const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, 'rgba(120,30,40,0)'); g.addColorStop(1, 'rgba(150,50,40,.55)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
  ctx.fillStyle = '#3a1712'; ctx.beginPath(); ctx.moveTo(0, 900); ctx.quadraticCurveTo(800, 820, 1920, 880); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.closePath(); ctx.fill(); earthDraw(ctx, 1640, 170, 60, 0);
  ctx.strokeStyle = '#cfc9bf'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(1600, 920); ctx.lineTo(1600, 360); ctx.stroke(); flagWave(ctx, 1600, 360, 280, 176, .4, 1);
  const s = 2.85, x = 1220, y = 1400; const f = figure(ctx, { x, y, s, dir: -1, pose: Object.assign({}, POSE.lift, { lean: -6, head: -10, shB: 150, elB: 26, shF: 156, elF: 22 }), face: 'smug', t: 1, seed: 12, shirt: B3.verde, hood: true, rim: 'rgba(255,205,170,1)', light: [-1, -.5], noShadow: true, still: true });
  trophyDraw(ctx, x - (f.hand[0] + f.handB[0]) / 2 * s, y + Math.min(f.hand[1], f.handB[1]) * s - 66 * 1.42, 1.42); eyeGlow(ctx, f, x, y, s, -1);
  b3punch(ctx, ['Ya', 'ganamos.'], 96, 320, 230); b3stamp(ctx, '05·07·2026', 'PUNTO DE QUIEBRE', 104, 86, { size: 26 }); b3grain(ctx, 1920, 1080, .04); });
// portadas verticales (1080x1920): misma idea, remate arriba
add('miniaturas/ep01-portada-vertical', 1080, 1920, ctx => { b3bg(ctx, 1080, 1920, { light: [560, 1080, 900, .09] }); const s = 2.7, x = 600, y = 1900; const f = figure(ctx, { x, y, s, dir: -1, pose: Object.assign({}, POSE.lift, { lean: -6, head: -10, shB: 150, elB: 26, shF: 156, elF: 22 }), face: 'smug', t: 1, seed: 12, shirt: B3.verde, hood: true, rim: 'rgba(255,190,225,1)', light: [-1, -.5], noShadow: true, still: true }); trophyDraw(ctx, x - (f.hand[0] + f.handB[0]) / 2 * s, y + Math.min(f.hand[1], f.handB[1]) * s - 66 * 1.35, 1.35); eyeGlow(ctx, f, x, y, s, -1); b3punch(ctx, ['No era.'], 90, 520, 230); b3stamp(ctx, '29·06·2014', 'PUNTO DE QUIEBRE', 96, 230, { size: 28 }); b3grain(ctx, 1080, 1920, .04); });
add('miniaturas/ep02-portada-vertical', 1080, 1920, ctx => { b3bg(ctx, 1080, 1920, { light: [560, 1100, 900, .08] }); starfield(ctx, 0, 21); earthDraw(ctx, 700, 2150, 700, 0); const s = 2.8, x = 640, y = 1880; const f = alien(ctx, x, y, s, -1, Object.assign({}, POSE.stand, { shF: 44, elF: 112, shB: 30, elB: 40, head: -6 }), 'happy', 1, { noShadow: true, still: true }); const hx = x - f.hand[0] * s, hy = y + f.hand[1] * s; tacoDraw(ctx, hx - 20, hy - 30, 2.8, 1.5); b3punch(ctx, ['Con piña.'], 90, 520, 230); b3stamp(ctx, '14·03·2060', 'PRIMER CONTACTO', 96, 230, { size: 28 }); b3grain(ctx, 1080, 1920, .04); });
window.kit3 = name => { const [w, h, fn] = KIT3[name]; const c = document.getElementById('c'); c.width = w; c.height = h; const ctx = c.getContext('2d'); ctx.setTransform(1, 0, 0, 1, 0, 0); BASE = [1, 0, 0, 1, 0, 0]; ctx.clearRect(0, 0, w, h); fn(ctx); return 'ok'; };
window.KIT3_NAMES = Object.keys(KIT3);
// ===== paneles de la guía (960x630) =====
function b3label(ctx, n, t, w) { b3text(ctx, n, 40, 56, { size: 20, font: MONO, color: B3.huesoT, ls: 2 }); b3text(ctx, t.toUpperCase(), 96, 56, { size: 20, font: MONO, color: B3.huesoT, ls: 2 }); }
add('guia/p-construccion', 960, 630, ctx => { b3bg(ctx, 960, 630, { light: [480, 330, 520, .04] }); const u = 34, nx = 330, ny = 400;
  ctx.save(); ctx.strokeStyle = 'rgba(239,233,223,.07)'; ctx.lineWidth = 1; for (let i = -10; i <= 18; i++) { ctx.beginPath(); ctx.moveTo(nx + i * u, 90); ctx.lineTo(nx + i * u, 590); ctx.stroke(); } for (let j = -9; j <= 5; j++) { ctx.beginPath(); ctx.moveTo(30, ny + j * u); ctx.lineTo(930, ny + j * u); ctx.stroke(); } ctx.restore();
  ctx.save(); ctx.strokeStyle = 'rgba(228,0,124,.35)'; ctx.setLineDash([6, 8]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(nx, ny, 1.12 * u * 2.2, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(nx + 7.5 * u, ny - 4.6 * u); ctx.lineTo(nx + 7.5 * u, ny + 1.6 * u); ctx.stroke(); ctx.beginPath(); ctx.moveTo(nx, ny + 1.6 * u); ctx.lineTo(nx, ny + 2.6 * u); ctx.stroke(); ctx.restore();
  b3mark(ctx, nx, ny, u, {});
  const lab = (s, x, y, al = 'left') => b3text(ctx, s, x, y, { size: 17, font: MONO, color: B3.huesoT, ls: 1, align: al });
  lab('punto de quiebre', nx - 70, ny + 74, 'left'); lab('lo que pasó', nx + 4 * u, ny + 34); lab('lo que hubiera', nx + 2.2 * u, ny - 5.3 * u); lab('trazo 1u · nodo 1.12u · subida 4.6u', 40, 590); lab('u = módulo', 920, 590, 'right'); b3label(ctx, '02', 'símbolo · construcción'); });
add('guia/p-esencia', 960, 630, ctx => { ctx.fillStyle = B3.hueso; ctx.fillRect(0, 0, 960, 630); b3text(ctx, 'Aquí el hubiera', 70, 300, { size: 104, italic: true, color: B3.negro, ls: -1 }); b3text(ctx, 'sí existe', 70, 404, { size: 104, italic: true, color: B3.negro, ls: -1 }); ctx.save(); b3font(ctx, 104, SERIF, 'italic'); ctx.letterSpacing = '-1px'; const w = ctx.measureText('sí existe').width; ctx.restore(); ctx.fillStyle = B3.rosa; ctx.beginPath(); ctx.arc(70 + w + 12, 398, 8, 0, TAU); ctx.fill(); b3text(ctx, '03', 40, 56, { size: 20, font: MONO, color: 'rgba(13,13,15,.55)', ls: 2 }); b3text(ctx, 'ESENCIA', 96, 56, { size: 20, font: MONO, color: 'rgba(13,13,15,.55)', ls: 2 }); b3grain(ctx, 960, 630, .025); });
add('guia/p-color', 960, 630, ctx => { b3bg(ctx, 960, 630, { light: false }); const cols = [['Negro sala', '#0D0D0F', 'fondos', B3.negro, 300], ['Hueso', '#EFE9DF', 'texto · tronco', B3.hueso, 250], ['Gris realidad', '#5F5E64', 'lo que pasó', B3.gris, 200], ['Rosa mexicano', '#E4007C', 'lo que hubiera', B3.rosa, 130]]; let x = 40;
  cols.forEach(([n, hex, role, c, w]) => { ctx.fillStyle = c; ctx.fillRect(x, 100, w - 12, 380); if (c === B3.negro) { ctx.strokeStyle = 'rgba(239,233,223,.18)'; ctx.lineWidth = 1.5; ctx.strokeRect(x + .75, 100.75, w - 13.5, 378.5); } b3text(ctx, n, x, 516, { size: 22, font: SANS, color: B3.hueso }); b3text(ctx, hex, x, 548, { size: 18, font: MONO, color: B3.huesoT, ls: 1 }); b3text(ctx, role, x, 576, { size: 18, font: MONO, color: B3.huesoT, ls: 1 }); x += w; });
  b3label(ctx, '04', 'color · un solo acento'); b3grain(ctx, 960, 630, .025); });
add('guia/p-tipografia', 960, 630, ctx => { b3bg(ctx, 960, 630, { light: [300, 300, 600, .04] }); b3text(ctx, 'Aa', 50, 380, { size: 300, italic: true, color: B3.hueso, ls: -6 });
  b3text(ctx, 'Instrument Serif', 470, 230, { size: 46, italic: true }); b3text(ctx, 'títulos y remates', 470, 262, { size: 18, font: MONO, color: B3.huesoT, ls: 1 });
  b3text(ctx, 'Instrument Sans', 470, 350, { size: 36, font: SANS }); b3text(ctx, 'textos y subtítulos', 470, 380, { size: 18, font: MONO, color: B3.huesoT, ls: 1 });
  b3text(ctx, '29·06·2014', 470, 466, { size: 34, font: MONO, ls: 2 }); b3text(ctx, 'Geist Mono · fechas y datos', 470, 496, { size: 18, font: MONO, color: B3.huesoT, ls: 1 }); b3label(ctx, '05', 'tipografía'); b3grain(ctx, 960, 630, .025); });
add('guia/p-cierre', 960, 630, ctx => { b3bg(ctx, 960, 630, { light: [480, 320, 500, .03] }); const px = 345, py = 90, pw = 270, ph = 480; ctx.save(); ctx.beginPath(); rr(ctx, px, py, pw, ph, 26); ctx.clip(); b3bg(ctx, 960, 630, { light: [480, 300, 300, .06] });
  b3text(ctx, '¿Y si sí?', 480, 230, { size: 44, italic: true, align: 'center' }); b3mark(ctx, 430, 330, 9, { trunk: 12, real: 14, rise: 4.6, run: 7.5, w: .9 }); b3lockup(ctx, 480, 420, 30, { align: 'center' }); b3text(ctx, HANDLE3.toUpperCase(), 480, 470, { size: 10, font: MONO, color: B3.huesoT, align: 'center', ls: 1 }); ctx.restore();
  ctx.strokeStyle = 'rgba(239,233,223,.25)'; ctx.lineWidth = 2; rr(ctx, px, py, pw, ph, 26); ctx.stroke(); b3label(ctx, '09', 'cierre de cada video'); b3text(ctx, 'la línea se dibuja, se parte y sube', 920, 590, { size: 17, font: MONO, color: B3.huesoT, align: 'right', ls: 1 }); b3grain(ctx, 960, 630, .025); });
