const HANDLE_KIT = '@aquielhubierasiexiste';
// Kit de marca v2 · "El Hubiera" (rosa mexicano + amarillo + negro). window.kit(nombre) devuelve [w,h] y dibuja en #c
const NAME = (new URLSearchParams(location.search).get('name') || 'hubiera');
function rays2(ctx, w, h, cx, cy, n, col, a) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; const R = Math.hypot(w, h); for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, i / n * TAU, (i + .5) / n * TAU); ctx.closePath(); ctx.fill(); } ctx.restore(); }
function stamp(ctx, s, x, y, size, col, rot = -.08, fill = false) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.font = `${size}px Anton`; ctx.letterSpacing = size * .08 + 'px'; const w = ctx.measureText(s).width + size * .7, hh = size * 1.35; if (fill) { ctx.fillStyle = col; rr(ctx, -w / 2, -hh / 2, w, hh, size * .18); ctx.fill(); text(ctx, s, 0, size * .06, { size, color: '#fff', ls: size * .08 }); } else { ctx.strokeStyle = col; ctx.lineWidth = size * .1; rr(ctx, -w / 2, -hh / 2, w, hh, size * .18); ctx.stroke(); text(ctx, s, 0, size * .06, { size, color: col, ls: size * .08 }); } ctx.restore(); }
function wordmark(ctx, cx, cy, k = 1, o = {}) { // EL / HUBIERA / ~NO~ SÍ EXISTE
  const ink = o.dark ? '#0b0b10' : '#fff';
  if (NAME === 'ponte') { punchK(ctx, [['PONTE', ink], ['QUE...', AMA]], cx, cy - 150 * k, 250 * k, o.dark); return; }
  text(ctx, 'EL', cx - 350 * k, cy - 205 * k, { size: 96 * k, color: ink, ls: 10 * k, align: 'left' });
  punchK(ctx, [['HUBIERA', ink]], cx, cy, 300 * k, o.dark);
  if (!o.noTag) { text(ctx, 'NO', cx - 120 * k, cy + 205 * k, { size: 66 * k, color: o.dark ? 'rgba(0,0,0,.45)' : 'rgba(255,255,255,.5)', ls: 6 * k }); ctx.save(); ctx.strokeStyle = o.dark ? '#0b0b10' : '#fff'; ctx.lineWidth = 8 * k; ctx.beginPath(); ctx.moveTo(cx - 190 * k, cy + 205 * k); ctx.lineTo(cx - 50 * k, cy + 198 * k); ctx.stroke(); ctx.restore(); stamp(ctx, 'SÍ EXISTE', cx + 190 * k, cy + 200 * k, 74 * k, ROSA, -.08, !!o.fillStamp); }
}
function punchK(ctx, lines, x, y, size, dark) { lines.forEach(([s, col], i) => { const yy = y + i * size * .92; if (!dark) text(ctx, s, x + size * .04, yy + size * .05, { size, color: 'rgba(0,0,0,.85)', ls: 2 }); text(ctx, s, x, yy, { size, color: col, ls: 2, stroke: dark ? 0 : size * .09, strokeCol: '#000' }); text(ctx, s, x, yy, { size, color: col, ls: 2 }); }); }
function hero(ctx, x, y, s, face = 'smug', dir = 1, extra = {}) { const f = figure(ctx, Object.assign({ x, y, s, dir, pose: Object.assign({}, POSE.stand, { head: -4 }), face, t: 1, seed: 12, shirt: VERDE, hood: true, rim: 'rgba(255,170,220,1)', light: [-1, -.5], noShadow: true, still: true }, extra)); eyeGlow(ctx, f, x, y, s, dir); return f; }
function avatarDraw(ctx, S) { ctx.fillStyle = ROSA; ctx.fillRect(0, 0, S, S); rays2(ctx, S, S, S / 2, S * .42, 20, '#000', .14); glow(ctx, S / 2, S * .42, S * .6, 'rgba(255,255,255,.25)'); hero(ctx, S * .47, S * 1.42, S * .0034, 'smug'); }
function iconGlyph(ctx, kind, cx, cy, r) { ctx.save(); ctx.translate(cx, cy); ctx.fillStyle = NEGRO; ctx.strokeStyle = NEGRO; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 'episodios') { ctx.beginPath(); ctx.moveTo(-r * .35, -r * .5); ctx.lineTo(r * .55, 0); ctx.lineTo(-r * .35, r * .5); ctx.closePath(); ctx.fill(); }
  if (kind === 'mexico') { ctx.scale(r / 120, r / 120); flagDraw(ctx, 'MEX', -110, -72, 220, 144); }
  if (kind === 'futbol') { ball2(ctx, 0, 0, r * .62, .4); }
  if (kind === 'preguntas') { text(ctx, '¿?', 0, r * .05, { size: r * 1.3, color: NEGRO }); }
  if (kind === 'detras') { ctx.lineWidth = r * .12; ctx.strokeRect(-r * .55, -r * .2, r * 1.1, r * .75); ctx.beginPath(); ctx.moveTo(-r * .55, -r * .2); ctx.lineTo(-r * .45, -r * .6); ctx.lineTo(r * .55, -r * .6); ctx.lineTo(r * .55, -r * .2); ctx.stroke(); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-r * .4 + i * r * .28, -r * .6); ctx.lineTo(-r * .28 + i * r * .28, -r * .2); ctx.stroke(); } }
  if (kind === 'campeones') { trophyDraw(ctx, 0, r * .55, r / 110); }
  ctx.restore(); }
const KIT2 = {
  'perfil/avatar-1080': [1080, 1080, ctx => avatarDraw(ctx, 1080)],
  'perfil/avatar-alterno': [1080, 1080, ctx => { ctx.fillStyle = NEGRO; ctx.fillRect(0, 0, 1080, 1080); glow(ctx, 540, 540, 700, 'rgba(255,31,142,.45)'); wordmark(ctx, 560, 560, .9, { noTag: false }); }],
  'logo/logo-transparente': [2000, 900, ctx => wordmark(ctx, 1000, 420, 1.3)],
  'logo/logo-fondo-oscuro': [2000, 900, ctx => { ctx.fillStyle = NEGRO; ctx.fillRect(0, 0, 2000, 900); glow(ctx, 1000, 450, 900, 'rgba(255,31,142,.35)'); wordmark(ctx, 1000, 420, 1.3); }],
  'logo/logo-claro': [2000, 900, ctx => { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 2000, 900); wordmark(ctx, 1000, 420, 1.3, { dark: true, fillStamp: true }); }],
  'youtube/youtube-banner': [2560, 1440, ctx => { ctx.fillStyle = NEGRO; ctx.fillRect(0, 0, 2560, 1440); glow(ctx, 1500, 720, 1400, 'rgba(255,31,142,.45)'); rays2(ctx, 2560, 1440, 1600, 720, 28, ROSA, .08); confettiStatic2(ctx, 2560, 1440, 120, 4);
    wordmark(ctx, 1110, 662, .6); hero(ctx, 1720, 1260, 1.9, 'smug', -1); text(ctx, 'HISTORIAS DE LO QUE PUDO PASAR', 1110, 858, { size: 34, font: 'Montserrat', weight: 900, color: AMA, ls: 8 }); text(ctx, HANDLE_KIT, 1110, 902, { size: 30, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.85)', ls: 4 }); }],
  'youtube/youtube-marca-de-agua': [150, 150, ctx => { ctx.fillStyle = ROSA; ctx.beginPath(); ctx.arc(75, 75, 75, 0, TAU); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(75, 75, 72, 0, TAU); ctx.clip(); hero(ctx, 70, 262, .66, 'smug'); ctx.restore(); }],
  'facebook/facebook-portada': [1640, 624, ctx => { ctx.fillStyle = NEGRO; ctx.fillRect(0, 0, 1640, 624); glow(ctx, 1000, 312, 900, 'rgba(255,31,142,.45)'); rays2(ctx, 1640, 624, 1100, 312, 24, ROSA, .08); confettiStatic2(ctx, 1640, 624, 70, 7);
    wordmark(ctx, 640, 300, .5); hero(ctx, 1130, 830, 1.45, 'smug', -1); text(ctx, 'HISTORIAS DE LO QUE PUDO PASAR', 640, 462, { size: 24, font: 'Montserrat', weight: 900, color: AMA, ls: 6 }); text(ctx, HANDLE_KIT, 640, 500, { size: 22, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.85)', ls: 3 }); }],
};
['episodios', 'mexico', 'futbol', 'preguntas', 'detras', 'campeones'].forEach(k => { KIT2['instagram/instagram-destacada-' + k] = [1080, 1080, ctx => { ctx.fillStyle = ROSA; ctx.fillRect(0, 0, 1080, 1080); rays2(ctx, 1080, 1080, 540, 540, 20, '#000', .1); ctx.fillStyle = AMA; ctx.beginPath(); ctx.arc(540, 540, 330, 0, TAU); ctx.fill(); iconGlyph(ctx, k, 540, 540, 240); }]; });
function confettiStatic2(ctx, w, h, n, seed) { const r = rnd(seed), cols = [ROSA, AMA, '#fff', VERDE]; for (let i = 0; i < n; i++) { ctx.save(); ctx.translate(r() * w, r() * h); ctx.rotate(r() * 6); ctx.fillStyle = cols[i % 4]; ctx.globalAlpha = .7; ctx.fillRect(-9, -4, 18, 8); ctx.restore(); } }
// miniaturas 16:9 (de thumbs.js) y portadas verticales
['ep01a', 'ep01b', 'ep02a', 'ep02b'].forEach(k => { KIT2['miniaturas/' + k.replace('ep0', 'ep0').replace(/([ab])$/, '-miniatura-$1')] = [1920, 1080, ctx => TH[k](ctx)]; });
KIT2['miniaturas/ep01-portada-vertical'] = [1080, 1920, ctx => { ctx.fillStyle = NEGRO; ctx.fillRect(0, 0, 1080, 1920); glow(ctx, 540, 1100, 1000, 'rgba(255,31,142,.5)'); confettiStatic2(ctx, 1080, 1920, 80, 9);
  const s = 3.4, x = 560, y = 2050; const f = figure(ctx, { x, y, s, dir: -1, pose: Object.assign({}, POSE.lift, { lean: -6, head: -10, shB: 150, elB: 26, shF: 156, elF: 22 }), face: 'smug', t: 1, seed: 12, shirt: VERDE, hood: true, rim: 'rgba(255,170,220,1)', light: [-1, -.5], noShadow: true, still: true }); trophyDraw(ctx, x - (f.hand[0] + f.handB[0]) / 2 * s, y + Math.min(f.hand[1], f.handB[1]) * s - 66 * 1.6, 1.6); eyeGlow(ctx, f, x, y, s, -1);
  punch(ctx, ['NO ERA.'], 540, 430, { size: 250, align: 'center', rot: -.03 }); tape(ctx, 'PENAL', 540, 640, 520, -.06); ctx.save(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(300, 650); ctx.lineTo(780, 625); ctx.stroke(); ctx.restore(); }];
KIT2['miniaturas/ep02-portada-vertical'] = [1080, 1920, ctx => { starfield(ctx, 0, 21); glow(ctx, 540, 1100, 1000, 'rgba(255,31,142,.45)'); earthDraw(ctx, 700, 1950, 620, 0);
  const s = 3.0, x = 600, y = 1900; const f = alien(ctx, x, y, s, -1, Object.assign({}, POSE.stand, { shF: 44, elF: 112, shB: 30, elB: 40, head: -6 }), 'happy', 1, { noShadow: true, still: true }); tacoDraw(ctx, x - f.hand[0] * s - 20, y + f.hand[1] * s - 30, 3.0, 1.6);
  for (let i = 0; i < 4; i++) heart(ctx, 330 + i * 140, 780 + Math.sin(i * 2) * 40, 2.4);
  punch(ctx, [['CON', '#fff'], ['PIÑA.', AMA]], 540, 300, { size: 250, align: 'center', rot: -.03 }); }];
window.kit = name => { const [w, h, fn] = KIT2[name]; const c = document.getElementById('c'); c.width = w; c.height = h; c.style.width = w + 'px'; c.style.height = h + 'px'; const ctx = c.getContext('2d'); ctx.setTransform(1, 0, 0, 1, 0, 0); BASE = [1, 0, 0, 1, 0, 0]; ctx.clearRect(0, 0, w, h); fn(ctx); return [w, h]; };
window.KITS = Object.keys(KIT2);
