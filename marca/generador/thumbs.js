// Miniaturas v2 y conceptos de marca (1920×1080, se exportan a 1280×720). window.thumb(nombre)
const ROSA = '#ff1f8e', ROSA2 = '#ff6ab4', AMA = '#ffd400', NEGRO = '#07070b', VERDE = '#18b36a';
function bgDark(ctx, col = ROSA, x = 1250, y = 520) { ctx.fillStyle = NEGRO; ctx.fillRect(0, 0, W, H); const g = ctx.createRadialGradient(x, y, 0, x, y, 1000); g.addColorStop(0, hexA(col, .55)); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function hexA(h, a) { const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
function punch(ctx, lines, x, y, o = {}) { // texto de miniatura: grueso, contorno negro, sombra dura
  const size = o.size || 230, lh = o.lh || size * .92; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  lines.forEach((ln, i) => { const [s, col] = Array.isArray(ln) ? ln : [ln, '#fff']; const yy = i * lh;
    text(ctx, s, 10, yy + 12, { size, color: 'rgba(0,0,0,.85)', align: o.align || 'left', ls: 2 });
    text(ctx, s, 0, yy, { size, color: col, align: o.align || 'left', ls: 2, stroke: 22, strokeCol: '#000' }); text(ctx, s, 0, yy, { size, color: col, align: o.align || 'left', ls: 2 }); });
  ctx.restore(); }
function eyeGlow(ctx, f, x, y, s, dir) { const ex = x + (f.headC[0] + 26) * s * dir, ey = y + (f.headC[1] - 6) * s; glow(ctx, ex, ey, 34 * s, 'rgba(255,255,255,.85)'); glow(ctx, ex, ey, 11 * s, 'rgba(255,255,255,1)'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 1.6 * s; ctx.beginPath(); ctx.moveTo(ex - 26 * s, ey); ctx.lineTo(ex + 26 * s, ey); ctx.moveTo(ex, ey - 13 * s); ctx.lineTo(ex, ey + 13 * s); ctx.stroke(); ctx.restore(); }
function sticker(ctx, s, x, y, col = ROSA, rot = -.06, size = 40) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.font = `900 ${size}px Montserrat`; ctx.letterSpacing = '3px'; const w = ctx.measureText(s).width + size * 1.2; ctx.fillStyle = col; rr(ctx, -w / 2, -size * .8, w, size * 1.6, 10); ctx.fill(); text(ctx, s, 0, 2, { size, font: 'Montserrat', weight: 900, color: '#fff', ls: 3 }); ctx.restore(); }
function tape(ctx, s, x, y, w, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = '#e31b23'; ctx.fillRect(-w / 2, -48, w, 96); ctx.fillStyle = 'rgba(0,0,0,.2)'; for (let i = -w / 2; i < w / 2; i += 40) ctx.fillRect(i, -48, 4, 96); text(ctx, s, 0, 4, { size: 72, color: '#fff', ls: 8 }); ctx.restore(); }
function brandBug(ctx, name, x = 1810, y = 990) { ctx.save(); ctx.translate(x, y); ctx.fillStyle = 'rgba(0,0,0,.6)'; rr(ctx, -150, -34, 300, 68, 34); ctx.fill(); ctx.strokeStyle = ROSA; ctx.lineWidth = 4; rr(ctx, -150, -34, 300, 68, 34); ctx.stroke(); text(ctx, name, 0, 3, { size: 34, color: '#fff', ls: 4 }); ctx.restore(); }
function confettiStatic(ctx, n, seed, cols = [ROSA, AMA, '#fff', VERDE]) { const r = rnd(seed); for (let i = 0; i < n; i++) { ctx.save(); ctx.translate(r() * W, r() * H); ctx.rotate(r() * 6); ctx.fillStyle = cols[i % cols.length]; ctx.fillRect(-8, -4, 16, 8); ctx.restore(); } }
const TH = {};
// ---- EP01 · A: "NO ERA." — penal en gris vs. campeón a color
TH.ep01a = ctx => {
  bgDark(ctx, ROSA, 1350, 560);
  ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(820, 0); ctx.lineTo(620, H); ctx.lineTo(0, H); ctx.closePath(); ctx.clip();
  ctx.fillStyle = '#1a1c22'; ctx.fillRect(0, 0, W, H); glow(ctx, 300, 300, 600, 'rgba(255,255,255,.18)');
  figure(ctx, { x: 360, y: 1500, s: 3.1, dir: 1, pose: Object.assign({}, POSE.point, { shF: 118, head: -12 }), face: 'shout', t: 1, seed: 3, shirt: '#bdbdbd', sleeves: 'short', shorts: '#222', acc: { whistle: 1 }, rim: 'rgba(255,255,255,.9)', light: [-.5, -1], noShadow: true, still: true });
  ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = '#808080'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(820, 0); ctx.lineTo(620, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.save(); ctx.strokeStyle = ROSA; ctx.lineWidth = 16; ctx.shadowColor = ROSA; ctx.shadowBlur = 40; ctx.beginPath(); ctx.moveTo(820, 0); ctx.lineTo(620, H); ctx.stroke(); ctx.restore();
  confettiStatic(ctx, 70, 9);
  const s = 3.0, x = 1370, y = 1330; const f = figure(ctx, { x, y, s, dir: -1, pose: Object.assign({}, POSE.lift, { lean: -6, head: -10, shB: 150, elB: 26, shF: 156, elF: 22 }), face: 'smug', t: 1, seed: 12, shirt: VERDE, hood: true, rim: 'rgba(255,170,220,1)', light: [-1, -.5], noShadow: true, still: true });
  trophyDraw(ctx, x - (f.hand[0] + f.handB[0]) / 2 * s, y + Math.min(f.hand[1], f.handB[1]) * s - 66 * 1.5, 1.5); eyeGlow(ctx, f, x, y, s, -1);
  punch(ctx, ['NO ERA.'], 70, 200, { size: 250, rot: -.03 }); tape(ctx, 'PENAL', 360, 420, 520, -.08);
  ctx.save(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(120, 430); ctx.lineTo(600, 400); ctx.stroke(); ctx.restore();
  sticker(ctx, '2014', 1700, 140, AMA, .08, 54);
};
// ---- EP01 · B: "MÍRALO, MIJO." — el abuelo y el niño frente a la tele
TH.ep01b = ctx => {
  ctx.fillStyle = '#05060c'; ctx.fillRect(0, 0, W, H); glow(ctx, 1500, 420, 900, 'rgba(120,190,255,.55)'); glow(ctx, 1500, 420, 300, 'rgba(255,255,255,.35)');
  ctx.fillStyle = '#0d1a2e'; rr(ctx, 1260, 220, 520, 360, 20); ctx.fill(); ctx.fillStyle = '#9fd4ff'; rr(ctx, 1290, 250, 460, 300, 10); ctx.fill(); ctx.fillStyle = '#2a8a4a'; ctx.fillRect(1290, 430, 460, 120); ball2(ctx, 1520, 470, 22, 1);
  const a = figure(ctx, { x: 560, y: 1480, s: 3.0, dir: 1, pose: Object.assign({}, POSE.stand, { shF: 70, elF: 20, shB: 30, elB: 30 }), face: 'tender', t: 1, seed: 14, shirt: P.abu, acc: { mustache: 1, glasses: 1, hairAbu: 1 }, rim: 'rgba(170,215,255,1)', light: [1, -.5], noShadow: true, still: true });
  const k = figure(ctx, { x: 1040, y: 1560, s: 2.7, dir: 1, pose: Object.assign({}, POSE.stand, { head: -8 }), face: 'cry', t: 1, seed: 12, shirt: VERDE, hood: true, rim: 'rgba(170,215,255,1)', light: [1, -.5], noShadow: true, still: true });
  punch(ctx, [['MÍRALO,', '#fff'], ['MIJO.', AMA]], 70, 190, { size: 210, rot: -.03 });
  sticker(ctx, '¿Y SI NO ERA PENAL?', 470, 1000, ROSA, -.02, 40);
};
// ---- EP02 · A: "CON PIÑA." — primer contacto con taco al pastor
TH.ep02a = ctx => {
  starfield(ctx, 0, 21); glow(ctx, 1300, 520, 1000, 'rgba(255,31,142,.45)'); earthDraw(ctx, 1550, 1250, 620, 0);
  const s = 3.2, x = 1340, y = 1420; const f = alien(ctx, x, y, s, -1, Object.assign({}, POSE.stand, { shF: 44, elF: 112, shB: 30, elB: 40, head: -6 }), 'happy', 1, { noShadow: true, still: true });
  const hx = x - f.hand[0] * s, hy = y + f.hand[1] * s; tacoDraw(ctx, hx - 20, hy - 30, 3.2, 1.6);
  for (let i = 0; i < 5; i++) heart(ctx, 1100 + i * 110, 230 + Math.sin(i * 2) * 40, 2.6 - (i % 2) * .6);
  punch(ctx, [['CON', '#fff'], ['PIÑA.', AMA]], 70, 230, { size: 260, rot: -.04 });
  sticker(ctx, 'PRIMER CONTACTO', 380, 920, ROSA, -.03, 44);
};
// ---- EP02 · B: "YA GANAMOS." — el campeón en Marte
TH.ep02b = ctx => {
  ctx.fillStyle = vg(ctx, [[0, '#2a0a1a'], [.55, '#c2185b'], [1, '#ff7a3a']], 0, 1080); ctx.fillRect(0, 0, W, H); earthDraw(ctx, 1560, 150, 70, 0);
  ctx.fillStyle = '#8a2a1a'; ctx.beginPath(); ctx.moveTo(0, 860); ctx.quadraticCurveTo(700, 760, 1400, 850); ctx.quadraticCurveTo(1700, 890, 1920, 830); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#ddd'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(1560, 900); ctx.lineTo(1560, 330); ctx.stroke(); flagWave(ctx, 1560, 330, 300, 190, .4, 1);
  const s = 3.0, x = 1180, y = 1380; const f = figure(ctx, { x, y, s, dir: -1, pose: Object.assign({}, POSE.lift, { lean: -6, head: -10, shB: 150, elB: 26, shF: 156, elF: 22 }), face: 'smug', t: 1, seed: 12, shirt: VERDE, hood: true, rim: 'rgba(255,200,150,1)', light: [-1, -.5], noShadow: true, still: true });
  trophyDraw(ctx, x - (f.hand[0] + f.handB[0]) / 2 * s, y + Math.min(f.hand[1], f.handB[1]) * s - 66 * 1.5, 1.5); eyeGlow(ctx, f, x, y, s, -1);
  punch(ctx, [['YA', '#fff'], ['GANAMOS.', AMA]], 70, 220, { size: 230, rot: -.03 });
  sticker(ctx, 'MÉXICO 2060', 330, 900, NEGRO, -.03, 44);
};
// ---- logos y avatar (conceptos de nombre)
function heroHead(ctx, x, y, s, face = 'smug') { const f = figure(ctx, { x, y, s, dir: 1, pose: Object.assign({}, POSE.stand, { head: -4 }), face, t: 1, seed: 12, shirt: VERDE, hood: true, rim: 'rgba(255,170,220,1)', light: [-1, -.5], noShadow: true, still: true }); eyeGlow(ctx, f, x, y, s, 1); return f; }
TH.logoHubiera = ctx => {
  ctx.fillStyle = NEGRO; ctx.fillRect(0, 0, W, H); glow(ctx, 960, 540, 900, 'rgba(255,31,142,.35)');
  text(ctx, 'EL', 640, 330, { size: 110, color: '#fff', ls: 10 }); punch(ctx, [['HUBIERA', '#fff']], 960, 540, { size: 300, align: 'center' });
  ctx.save(); ctx.translate(1290, 760); ctx.rotate(-.08); ctx.strokeStyle = ROSA; ctx.lineWidth = 10; rr(ctx, -230, -62, 460, 124, 16); ctx.stroke(); text(ctx, 'SÍ EXISTE', 0, 6, { size: 86, color: ROSA, ls: 8 }); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(560, 760); ctx.lineTo(980, 750); ctx.stroke(); ctx.restore(); text(ctx, 'NO', 770, 760, { size: 70, color: 'rgba(255,255,255,.5)', ls: 6 });
  text(ctx, 'NOMBRE PROPUESTO · @elhubieramx', 960, 980, { size: 30, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.6)', ls: 6 });
};
TH.logoPonte = ctx => {
  ctx.fillStyle = NEGRO; ctx.fillRect(0, 0, W, H); glow(ctx, 960, 540, 900, 'rgba(255,212,0,.25)');
  punch(ctx, [['PONTE', '#fff'], ['QUE...', AMA]], 960, 400, { size: 260, align: 'center', lh: 250 });
  ['#127a45', '#ffffff', '#c42b33'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(1180 + i * 70, 760, 22, 0, TAU); ctx.fill(); });
  text(ctx, 'NOMBRE ALTERNATIVO · @pontequemx', 960, 980, { size: 30, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.6)', ls: 6 });
};
TH.avatarHubiera = ctx => {
  ctx.fillStyle = ROSA; ctx.fillRect(0, 0, W, H); const r = rnd(5); ctx.save(); ctx.globalAlpha = .18; for (let i = 0; i < 18; i++) { ctx.fillStyle = '#000'; ctx.beginPath(); ctx.moveTo(960, 540); ctx.arc(960, 540, 1400, i / 18 * TAU, (i + .5) / 18 * TAU); ctx.closePath(); ctx.fill(); } ctx.restore();
  heroHead(ctx, 930, 1540, 3.6, 'smug');
  ctx.save(); ctx.translate(1290, 260); ctx.rotate(.12); ctx.fillStyle = NEGRO; ctx.beginPath(); ctx.arc(0, 0, 120, 0, TAU); ctx.fill(); text(ctx, 'H', 0, 8, { size: 150, color: AMA }); ctx.restore();
};
window.thumb = name => { const c = document.getElementById('c'); c.width = W; c.height = H; const ctx = c.getContext('2d'); ctx.setTransform(1, 0, 0, 1, 0, 0); BASE = [1, 0, 0, 1, 0, 0]; ctx.clearRect(0, 0, W, H); TH[name](ctx); return 'ok'; };
window.THUMBS = Object.keys(TH);
