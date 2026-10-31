// ¿Y si sí? v2 — núcleo: utilidades, caché de capas, atmósfera (todo función de t)
const W = 1920, H = 1080;
// modo de salida: 'h' = 16:9 (1920x1080) · 'v' = 9:16 (1080x1920). El mundo siempre mide W×H;
// BASE lleva del mundo al lienzo, VIEW es la ventana visible del mundo, ui() da un espacio de interfaz UW×UH.
const QS = new URLSearchParams(location.search), MODE = QS.get('v') ? 'v' : 'h', V = MODE === 'v', NOUI = !!QS.get('noui'), CLEAN = !!QS.get('clean') || NOUI;
const CW = V ? 1080 : 1920, CH = V ? 1920 : 1080;
const VS = 1.35, VTOP = 300, VWIN = 800, VHGT = 1000; // escala y caja de la escena en vertical
let BASE = [1, 0, 0, 1, 0, 0]; const VIEW = { x0: 0, y0: 0, w: 1920, h: 1080 }; const UIK = V ? .56 : 1;
function setView(cx) {
  if (!V) return; cx = Math.max(VWIN / 2, Math.min(1920 - VWIN / 2, cx));
  VIEW.x0 = cx - VWIN / 2; VIEW.y0 = 40; VIEW.w = VWIN; VIEW.h = VHGT;
  BASE = [VS, 0, 0, VS, -VIEW.x0 * VS, VTOP - VIEW.y0 * VS];
}
function setBase(ctx) { ctx.setTransform(BASE[0], BASE[1], BASE[2], BASE[3], BASE[4], BASE[5]); }
function ui(ctx) { setBase(ctx); ctx.translate(VIEW.x0, VIEW.y0); ctx.scale(UIK, UIK); }
const UW = () => VIEW.w / UIK, UH = () => VIEW.h / UIK;
// coloca el lienzo de diseño 1920×1080 centrado dentro del espacio UI (tarjetas de título); k = escala extra en vertical
function uiCenter(ctx, k = 1) { ui(ctx); if (!V) return; ctx.translate(UW() / 2, UH() / 2); ctx.scale(k, k); ctx.translate(-960, -540); }
// anclas de interfaz: diseño en 16:9 (franja visible 138–942) → espacio UI del modo actual
const uxC = x => V ? UW() / 2 + (x - 960) : x, uxL = x => V ? x * .7 : x, uxR = x => V ? UW() - (1920 - x) * .7 : x;
const uyC = y => V ? UH() / 2 + (y - 540) : y, uyT = y => V ? 60 + (y - 138) : y, uyB = y => V ? UH() - 330 - (942 - y) : y;
const PI = Math.PI, TAU = PI * 2, D2R = d => d * PI / 180;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const E = {
  lin: k => k, inOut: k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
  out: k => 1 - Math.pow(1 - k, 3), in: k => k * k * k, sine: k => -(Math.cos(PI * k) - 1) / 2,
  back: k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
  outQuint: k => 1 - Math.pow(1 - k, 5), inOutQuint: k => k < .5 ? 16 * k ** 5 : 1 - Math.pow(-2 * k + 2, 5) / 2,
};
const ease = (t, a, b, f = E.inOut) => f(prog(t, a, b));
function rnd(seed) { let s = (seed * 2654435761) >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function hash(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function noise1(x) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i), hash(i + 1), u) * 2 - 1; }
const P = {
  ink: '#0b0b10', mex: '#15975a', mexL: '#2cc47a', ned: '#ff7a1f', gold: '#ffc94a', yel: '#ffd23f', red: '#ff3b3b',
  kid: '#2fbf5b', dad: '#3466c9', tio: '#d1453b', abu: '#7d6a5b', ref: '#e8ff47',
};
// ---------- caché de capas estáticas (se pintan una vez) ----------
const CACHE = {};
function layer(key, w, h, fn, blur = 0) {
  if (CACHE[key]) return CACHE[key];
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  fn(x, w, h);
  if (blur > 0) { const c2 = document.createElement('canvas'); c2.width = w; c2.height = h; const x2 = c2.getContext('2d'); x2.filter = `blur(${blur}px)`; x2.drawImage(c, 0, 0); CACHE[key] = c2; return c2; }
  CACHE[key] = c; return c;
}
// lienzo temporal reutilizable para desenfocar capas dinámicas
const TMP = {};
function tmp(key) { if (!TMP[key]) { const c = document.createElement('canvas'); c.width = W; c.height = H; TMP[key] = c; } const c = TMP[key]; const x = c.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-over'; x.clearRect(0, 0, W, H); x.filter = 'none'; x.globalAlpha = 1; return [c, x]; }
const LOW = {};
function blurred(ctx, key, px, fn) { // desenfoque barato: dibuja a baja resolución y escala (sin ctx.filter)
  const f = Math.max(1, px / 1.5);
  if (f <= 1.05) { ctx.save(); setBase(ctx); fn(ctx); ctx.restore(); return; }
  const w = Math.ceil(W / f), h = Math.ceil(H / f), k = key + '_' + w;
  if (!LOW[k]) { const cv = document.createElement('canvas'); cv.width = w; cv.height = h; LOW[k] = cv; }
  const cv = LOW[k], x = cv.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-over'; x.clearRect(0, 0, w, h); x.globalAlpha = 1; x.filter = 'none';
  x.scale(w / W, h / H); fn(x);
  ctx.save(); setBase(ctx); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(cv, 0, 0, W, H); ctx.restore();
}
// escena completa desenfocada (mismo truco) con alfa opcional
function softScene(ctx, key, px, alpha, fn) { ctx.save(); ctx.globalAlpha = alpha; blurred(ctx, key, px, fn); ctx.restore(); }
// ---------- utilidades de dibujo ----------
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function vg(ctx, stops, y0 = 0, y1 = H, x0 = 0, x1 = 0) { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; }
function glow(ctx, x, y, r, col, a = 1) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.save(); ctx.globalAlpha *= a; ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore();
}
function rays(ctx, x, y, len, n, spread, col, a, t, seed = 1) { // rayos de luz volumétricos
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const ang = -PI / 2 + (i / (n - 1) - .5) * spread + noise1(t * .2 + i * 7 + seed) * .03, w = .012 + hash(i + seed) * .03;
    const g = ctx.createLinearGradient(x, y, x + Math.cos(ang) * len, y + Math.sin(ang) * len); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = a * (.4 + .6 * hash(i * 3 + seed)) * (.8 + .2 * Math.sin(t * .7 + i));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ang - w) * len, y + Math.sin(ang - w) * len); ctx.lineTo(x + Math.cos(ang + w) * len, y + Math.sin(ang + w) * len); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}
function bokeh(ctx, t, n, seed, col, rmin, rmax, a, area = [0, 0, W, H], drift = 6) {
  const r = rnd(seed); ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const x = area[0] + r() * area[2] + Math.sin(t * .3 + i) * drift, y = area[1] + r() * area[3] + Math.cos(t * .25 + i * 2) * drift, rad = lerp(rmin, rmax, r());
    const g = ctx.createRadialGradient(x, y, rad * .2, x, y, rad); g.addColorStop(0, col); g.addColorStop(.75, col); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = a * (.35 + .65 * r()) * (.85 + .15 * Math.sin(t * 1.3 + i)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad, 0, TAU); ctx.fill();
  }
  ctx.restore();
}
function dust(ctx, t, n, seed, col = 'rgba(255,230,190,1)', a = .5, size = 2.2) {
  const r = rnd(seed); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = col;
  for (let i = 0; i < n; i++) {
    const sp = .2 + r() * .6, x = (r() * W + t * 14 * sp + noise1(t * .3 + i) * 30) % W, y = (r() * H - t * 9 * sp + noise1(t * .25 + i * 3) * 30 + H * 4) % H, s = size * (.4 + r());
    ctx.globalAlpha = a * (.3 + .7 * r()) * (.6 + .4 * Math.sin(t * 2 + i)); ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.fill();
  }
  ctx.restore();
}
function haze(ctx, y0, y1, col, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = vg(ctx, [[0, 'rgba(0,0,0,0)'], [.5, col], [1, 'rgba(0,0,0,0)']], y0, y1); ctx.fillRect(-W, y0, W * 3, y1 - y0); ctx.restore(); }
function vignette(ctx, a = .7, cx, cy) {
  if (cx == null) { cx = VIEW.x0 + VIEW.w / 2; cy = VIEW.y0 + VIEW.h / 2; } const R = V ? VIEW.h * .95 : H;
  const g = ctx.createRadialGradient(cx, cy, R * .32, cx, cy, R * 1.0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`);
  ctx.save(); setBase(ctx); ctx.fillStyle = g; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore();
}
function grade(ctx, col, a, mode = 'soft-light') { ctx.save(); setBase(ctx); ctx.globalCompositeOperation = mode; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore(); }
function text(ctx, s, x, y, o = {}) {
  ctx.save(); ctx.font = `${o.weight || ''} ${o.size || 60}px ${o.font || 'Anton'}`;
  ctx.textAlign = o.align || 'center'; ctx.textBaseline = o.base || 'middle'; if (o.ls) ctx.letterSpacing = o.ls + 'px';
  ctx.globalAlpha *= (o.alpha ?? 1);
  if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = o.blur || 24; ctx.shadowOffsetY = o.sy || 0; }
  if (o.stroke) { ctx.lineWidth = o.stroke; ctx.strokeStyle = o.strokeCol || '#000'; ctx.lineJoin = 'round'; ctx.strokeText(s, x, y); }
  ctx.fillStyle = o.color || '#fff'; ctx.fillText(s, x, y); ctx.restore();
}
// cámara: centra (cx,cy) con zoom z
function cam(ctx, cx, cy, z, rot = 0) { ctx.translate(W / 2, H / 2); ctx.rotate(rot); ctx.scale(z, z); ctx.translate(-cx, -cy); }
function shakeV(t, amp, seed = 1) { return [noise1(t * 22 + seed) * amp, noise1(t * 19 + seed + 50) * amp]; }
// deriva suave de cámara "a mano"
function handheld(t, amp = 3, seed = 3) { return [noise1(t * .6 + seed) * amp, noise1(t * .5 + seed + 9) * amp]; }
