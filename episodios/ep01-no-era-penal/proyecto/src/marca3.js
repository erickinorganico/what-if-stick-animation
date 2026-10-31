// EL HUBIERA · identidad v3 "Bifurcación" aplicada a los videos (cromo, título y cierre). Compartido por ep01 y ep02.
const B3V = { hueso: '#efe9df', huesoT: 'rgba(239,233,223,.62)', gris: '#5f5e64', rosa: '#e4007c', rosaTxt: '#ff3d9a' };
const SERIF3 = 'Instrument Serif', SANS3 = 'Instrument Sans', MONO3 = 'Geist Mono';
window.HANDLE3 = window.HANDLE3 || '@aquielhubierasiexiste';
function f3(ctx, size, fam = SERIF3, italic = false, weight = '') { ctx.font = `${italic ? 'italic ' : ''}${weight ? weight + ' ' : ''}${size}px "${fam}"`; }
function t3(ctx, s, x, y, o = {}) { ctx.save(); f3(ctx, o.size || 40, o.font || SERIF3, !!o.italic, o.weight || ''); ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'alphabetic'; ctx.letterSpacing = (o.ls || 0) + 'px'; ctx.globalAlpha *= (o.alpha ?? 1); if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = o.blur || 20; } ctx.fillStyle = o.color || B3V.hueso; ctx.fillText(s, x, y); const w = ctx.measureText(s).width; ctx.restore(); return w; }
// símbolo con dibujo progresivo p (0..1): tronco → nodo → ramas
function mark3(ctx, x, y, u, o = {}) {
  const trunk = o.trunk ?? 4.5, real = o.real ?? 7.5, rise = o.rise ?? 4.6, run = o.run ?? 7.5, p = o.p ?? 1, a = o.alpha ?? 1;
  if (p <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = (o.w ?? 1) * u;
  const pt = Math.min(1, p / .42), pb = Math.max(0, (p - .42) / .58);
  if (pb > 0) { ctx.strokeStyle = o.mono ? B3V.hueso : B3V.gris; ctx.globalAlpha = a * (o.mono ? .38 : 1); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(real * u * pb, 0); ctx.stroke(); ctx.globalAlpha = a;
    ctx.strokeStyle = o.mono ? B3V.hueso : B3V.rosa; ctx.beginPath(); ctx.moveTo(0, 0); const N = 40, P0 = [0, 0], P1 = [run * .36 * u, 0], P2 = [run * .56 * u, -rise * u], P3 = [run * u, -rise * u];
    for (let i = 1; i <= N * pb; i++) { const s = i / N, m = 1 - s; ctx.lineTo(m * m * m * P0[0] + 3 * m * m * s * P1[0] + 3 * m * s * s * P2[0] + s * s * s * P3[0], m * m * m * P0[1] + 3 * m * m * s * P1[1] + 3 * m * s * s * P2[1] + s * s * s * P3[1]); } ctx.stroke();
    if (pb >= 1 && o.endDot !== false) { ctx.fillStyle = o.mono ? B3V.hueso : B3V.rosa; ctx.beginPath(); ctx.arc(run * u, -rise * u, (o.end ?? .95) * u, 0, TAU); ctx.fill(); } }
  ctx.strokeStyle = B3V.hueso; ctx.beginPath(); ctx.moveTo(-trunk * u, 0); ctx.lineTo(-trunk * u + trunk * u * pt, 0); ctx.stroke();
  if (pt >= 1) { ctx.fillStyle = B3V.hueso; ctx.beginPath(); ctx.arc(0, 0, (o.node ?? 1.12) * u * Math.min(1, (p - .42) * 12 + .2), 0, TAU); ctx.fill(); }
  ctx.restore();
}
const _dot3 = {};
function idot3(size) { size = Math.max(8, Math.round(size)); if (_dot3[size]) return _dot3[size]; const W2 = size * 5, H2 = size * 2, c1 = document.createElement('canvas'), c2 = document.createElement('canvas'); c1.width = c2.width = W2; c1.height = c2.height = H2; const a = c1.getContext('2d'), b = c2.getContext('2d'); [a, b].forEach(q => { q.font = `italic ${size}px "${SERIF3}"`; q.fillStyle = '#000'; }); a.fillText('hubiera', 10, size * 1.4); b.fillText('hubıera', 10, size * 1.4);
  const da = a.getImageData(0, 0, W2, H2).data, db = b.getImageData(0, 0, W2, H2).data; let sx = 0, sy = 0, n = 0, mnx = 1e9, mxx = -1; for (let y = 0; y < H2; y++) for (let x = 0; x < W2; x++) { const i = (y * W2 + x) * 4 + 3; if (da[i] - db[i] > 90) { sx += x; sy += y; n++; mnx = Math.min(mnx, x); mxx = Math.max(mxx, x); } }
  return (_dot3[size] = n ? { dx: sx / n - 10, dy: sy / n - size * 1.4, r: (mxx - mnx) / 2 } : { dx: 0, dy: -size * .7, r: size * .06 }); }
function word3(ctx, x, y, size, o = {}) { const ls = -size * .012; ctx.save(); f3(ctx, size); ctx.letterSpacing = ls + 'px'; const wEl = ctx.measureText('el').width; f3(ctx, size, SERIF3, true); ctx.letterSpacing = ls + 'px'; const wH = ctx.measureText('hubıera').width; ctx.restore(); const gap = size * .2, total = wEl + gap + wH; const x0 = o.align === 'center' ? x - total / 2 : o.align === 'right' ? x - total : x;
  ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1); if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = o.blur || 16; } ctx.fillStyle = o.color || B3V.hueso; f3(ctx, size); ctx.letterSpacing = ls + 'px'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText('el', x0, y); f3(ctx, size, SERIF3, true); ctx.letterSpacing = ls + 'px'; ctx.fillText('hubıera', x0 + wEl + gap, y);
  const d = idot3(size), k = size / Math.max(8, Math.round(size)); ctx.shadowBlur = 0; ctx.fillStyle = B3V.rosa; ctx.beginPath(); ctx.arc(x0 + wEl + gap + d.dx * k, y + d.dy * k, d.r * k * 1.08, 0, TAU); ctx.fill(); ctx.restore(); return total; }
function lockup3(ctx, x, y, size, o = {}) { const u = size * .082, mw = 12 * u, gap = size * .38; ctx.save(); f3(ctx, size); const wEl = ctx.measureText('el').width; f3(ctx, size, SERIF3, true); const wH = ctx.measureText('hubıera').width; ctx.restore(); const total = mw + gap + wEl + size * .2 + wH; const x0 = o.align === 'center' ? x - total / 2 : o.align === 'right' ? x - total : x;
  mark3(ctx, x0 + 4.5 * u, y - size * .1, u, { alpha: o.alpha ?? 1 }); word3(ctx, x0 + mw + gap, y, size, { alpha: o.alpha, shadow: o.shadow }); return total; }
// cromo: firma pequeña (reemplaza la pastilla rosa). x = centro, o borde derecho con align:'right'; y = centro óptico
function brandTag(ctx, x, y, s = 1, o = {}) { const size = 30 * s; lockup3(ctx, x, y + size * .3, size, { align: o.align === 'right' ? 'right' : 'center', alpha: o.alpha ?? .92, shadow: 'rgba(0,0,0,.5)' }); }
// cierre de cada video: "¿Y si sí?" → la línea se dibuja y se parte → firma → usuario (→ próximo episodio)
function endCard3(ctx, t, t0, o = {}) { const tau = t - t0; ctx.save(); uiCenter(ctx, V ? 1.28 : 1);
  const k = ease(t, t0, t0 + .45, E.out), m = ease(t, t0 + 1.0, t0 + 1.5, E.inOut);
  ctx.save(); ctx.translate(960, lerp(V ? 470 : 470, V ? 300 : 300, m)); const sc = lerp(1.12, 1, k) * lerp(1, .52, m); ctx.scale(sc, sc); t3(ctx, '¿Y si sí?', 0, 0, { size: 210, italic: true, align: 'center', alpha: k, shadow: 'rgba(0,0,0,.6)', blur: 30 }); ctx.restore();
  const pl = clamp((tau - 1.15) / .9); if (pl > 0) mark3(ctx, 900, 560, 22, { trunk: 15, real: 22, rise: 4.8, run: 11, w: .7, node: 1.15, end: 1, p: E.inOut(pl) });
  const kw = ease(t, t0 + 1.9, t0 + 2.3, E.out); if (kw > 0) { word3(ctx, 960, 690 + (1 - kw) * 14, 84, { align: 'center', alpha: kw, shadow: 'rgba(0,0,0,.5)' }); }
  const kh = ease(t, t0 + 2.25, t0 + 2.6, E.out); if (kh > 0) t3(ctx, (window.HANDLE3 || '').toUpperCase(), 960, 752, { size: 24, font: MONO3, align: 'center', color: B3V.huesoT, ls: 3, alpha: kh });
  if (o.next) { const kn = ease(t, t0 + 2.5, t0 + 2.9, E.out); if (kn > 0) { t3(ctx, 'PRÓXIMO EPISODIO', 960, 850, { size: 20, font: MONO3, align: 'center', color: B3V.huesoT, ls: 4, alpha: kn }); t3(ctx, o.next, 960, 905, { size: 46, italic: true, align: 'center', alpha: kn }); } }
  ctx.restore(); }
