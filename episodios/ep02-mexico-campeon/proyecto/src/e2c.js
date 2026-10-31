// ¿Y si sí? · EP 02 — parte C (121.6–193.6 s): corridos de sonetos, Foro Sol, Nezahualcóyotl, 2036, exportaciones, Tokio, la caída, la gente, la placa, lo real y el cierre
const TC = {
  cambian: A3('cambian', T.corridos), convoyes: A3('convoyes', T.armas), metaf: A3('metáforas', T.belico), prende: A3('prende', T.tokio), dice: A3('dice', T.tablet), deja: A3('nunca se deja', T.tequila),
};
// ---------- piezas ----------
function hatDraw(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, 78, 16, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(-44, -54, -10, -56); ctx.quadraticCurveTo(0, -46, 10, -56); ctx.quadraticCurveTo(44, -54, 40, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-40, -14, 80, 10); ctx.restore(); }
function hatOn(ctx, f, x, y, s, dir, col) { hatDraw(ctx, x + f.headC[0] * s * dir, y + (f.headC[1] - 34) * s, s * .95, col); }
function noteIcon(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(-6, 10, 10, 7, -.4, 0, TAU); ctx.fill(); ctx.fillRect(2, -24, 4, 34); ctx.beginPath(); ctx.moveTo(6, -24); ctx.quadraticCurveTo(20, -18, 16, -4); ctx.quadraticCurveTo(14, -14, 6, -14); ctx.fill(); ctx.restore(); }
function stageLights(ctx, t, cols, y = 120) { cols.forEach((c, i) => { const x = 300 + i * (1320 / Math.max(1, cols.length - 1)), sw = Math.sin(t * .9 + i * 1.7) * .35; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(x, y); ctx.rotate(sw); const g = ctx.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.globalAlpha = .5; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.lineTo(160, 900); ctx.lineTo(-160, 900); ctx.closePath(); ctx.fill(); ctx.restore(); glow(ctx, x, y, 60, c); }); }
function accordion(ctx, x, y, s, t) { const w = 40 + 12 * Math.sin(t * 5); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#b8232e'; rr(ctx, -w - 24, -40, 24, 80, 4); ctx.fill(); rr(ctx, w, -40, 24, 80, 4); ctx.fill(); ctx.fillStyle = '#f2efe8'; for (let i = 0; i < 6; i++) ctx.fillRect(-w + i * (2 * w / 6), -36, 2 * w / 6 - 3, 72); ctx.fillStyle = '#1a1a1a'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(-w - 12, -26 + i * 17, 4, 0, TAU); ctx.fill(); } ctx.restore(); }
function guitarDraw(ctx, x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = '#7a4a22'; ctx.beginPath(); ctx.ellipse(0, 0, 46, 34, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(-44, 0, 34, 28, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#1a1208'; ctx.beginPath(); ctx.arc(-12, 0, 11, 0, TAU); ctx.fill(); ctx.fillStyle = '#4a2c14'; ctx.fillRect(20, -6, 120, 12); ctx.fillRect(136, -10, 22, 20); ctx.restore(); }
function bassDraw(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#6a3a1a'; ctx.beginPath(); ctx.ellipse(0, -80, 60, 80, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -190, 46, 50, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#2a1a0c'; ctx.fillRect(-6, -380, 12, 220); ctx.fillStyle = '#1a1208'; ctx.fillRect(-14, -110, 4, 40); ctx.fillRect(10, -110, 4, 40); ctx.fillStyle = '#ccc'; ctx.fillRect(-3, 0, 6, 20); ctx.restore(); }
function bookDraw(ctx, x, y, s, open, col = '#7a2a2a') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (open) { ctx.fillStyle = '#f6efdc'; ctx.beginPath(); ctx.moveTo(0, 6); ctx.quadraticCurveTo(-24, -4, -48, 4); ctx.lineTo(-48, -36); ctx.quadraticCurveTo(-24, -44, 0, -34); ctx.quadraticCurveTo(24, -44, 48, -36); ctx.lineTo(48, 4); ctx.quadraticCurveTo(24, -4, 0, 6); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-40, -26 + i * 9); ctx.lineTo(-8, -24 + i * 9); ctx.moveTo(8, -24 + i * 9); ctx.lineTo(40, -26 + i * 9); ctx.stroke(); } } else { ctx.fillStyle = col; rr(ctx, -16, -60, 32, 60, 3); ctx.fill(); ctx.fillStyle = 'rgba(255,220,140,.6)'; ctx.fillRect(-10, -50, 20, 4); } ctx.restore(); }
function heart(ctx, x, y, s, col = '#ff4a6a') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 14); ctx.bezierCurveTo(-24, -2, -16, -22, 0, -10); ctx.bezierCurveTo(16, -22, 24, -2, 0, 14); ctx.fill(); ctx.restore(); }
function crownDraw(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(ctx, 0, -20, 90, 'rgba(255,210,90,.5)'); ctx.fillStyle = P.gold; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-44, -44); ctx.lineTo(-20, -20); ctx.lineTo(0, -54); ctx.lineTo(20, -20); ctx.lineTo(44, -44); ctx.lineTo(40, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = P.red; ctx.beginPath(); ctx.arc(0, -14, 6, 0, TAU); ctx.fill(); ctx.restore(); }
function magCover(ctx, x, y, w, rot, title, k) { if (k <= 0) return; const h = w * 1.3; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.fillStyle = '#f4f1ea'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = P.mex; ctx.fillRect(-w / 2, -h / 2, w, h * .2); text(ctx, 'FUTBOL HOY', 0, -h / 2 + h * .1, { size: w * .13, color: '#fff', ls: 2 }); ctx.fillStyle = '#0b0b10'; ctx.beginPath(); ctx.arc(0, h * .02, w * .2, 0, TAU); ctx.fill(); ctx.fillStyle = P.mex; rr(ctx, -w * .26, h * .14, w * .52, h * .2, 10); ctx.fill(); text(ctx, title, 0, h * .4, { size: w * .1, color: P.ink, ls: 1 }); ctx.restore(); }
function plaqueDraw(ctx, x, y, s, t, kWords) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.35)'; rr(ctx, -186, -106, 380, 228, 18); ctx.fill();
  const g = ctx.createLinearGradient(-180, -110, 180, 110); g.addColorStop(0, '#8a5a24'); g.addColorStop(.45, '#d9a85a'); g.addColorStop(.55, '#f0c878'); g.addColorStop(1, '#7a4a1c'); ctx.fillStyle = g; rr(ctx, -190, -110, 380, 220, 16); ctx.fill(); ctx.strokeStyle = '#5a3a14'; ctx.lineWidth = 6; rr(ctx, -176, -96, 352, 192, 10); ctx.stroke();
  ctx.fillStyle = '#5a3a14'; [[-166, -86], [166, -86], [-166, 86], [166, 86]].forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a, b, 6, 0, TAU); ctx.fill(); });
  text(ctx, '05 · 07 · 2026', 0, -62, { size: 22, font: 'Montserrat', weight: 900, color: '#4a2c0c', ls: 6 });
  if (kWords > 0) { ctx.save(); ctx.globalAlpha = kWords; text(ctx, '¿Y SI SÍ?', 2, 22, { size: 74, color: 'rgba(255,240,200,.45)', ls: 4 }); text(ctx, '¿Y SI SÍ?', 0, 20, { size: 74, color: '#3a2008', ls: 4 }); ctx.restore(); }
  else { ctx.fillStyle = 'rgba(74,44,12,.35)'; [-110, 0, 110].forEach(wx => { rr(ctx, wx - 44, 0, 88, 40, 8); ctx.fill(); }); }
  const sw = ((t * .5) % 1.6) - .3; ctx.save(); ctx.beginPath(); rr(ctx, -190, -110, 380, 220, 16); ctx.clip(); ctx.globalCompositeOperation = 'lighter'; const gs = ctx.createLinearGradient(-190 + sw * 380, -110, -130 + sw * 380, 110); gs.addColorStop(0, 'rgba(255,240,200,0)'); gs.addColorStop(.5, 'rgba(255,240,200,.35)'); gs.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = gs; ctx.fillRect(-190, -110, 380, 220); ctx.restore();
  ctx.restore(); }
function bubble2(ctx, x, y, k, t, typed, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = '#ffffff'; rr(ctx, -330, -90, 660, 160, 30); ctx.fill(); ctx.beginPath(); ctx.moveTo(-220, 66); ctx.lineTo(-250, 120); ctx.lineTo(-170, 66); ctx.fill();
  ctx.fillStyle = P.mex; ctx.beginPath(); ctx.arc(-260, -10, 42, 0, TAU); ctx.fill(); text(ctx, '¿?', -260, -8, { size: 40, font: 'Montserrat', weight: 900, color: '#fff' });
  const n = Math.floor(clamp(typed) * s.length);
  ctx.save(); ctx.font = '800 30px Montserrat'; ctx.fillStyle = '#1a1a22'; ctx.textBaseline = 'middle'; ctx.fillText(s.slice(0, n), -195, -20); if (Math.floor(t * 3) % 2 && typed < 1) { const w = ctx.measureText(s.slice(0, n)).width; ctx.fillRect(-195 + w + 4, -38, 3, 36); } ctx.restore();
  for (let i = 0; i < 3; i++) { ctx.fillStyle = `rgba(30,30,40,${.25 + .5 * Math.max(0, Math.sin(t * 8 - i))})`; ctx.beginPath(); ctx.arc(-180 + i * 26, 34, 8, 0, TAU); ctx.fill(); }
  ctx.restore();
}
function rainFx(ctx, t, a = 1) { const r = rnd(13); ctx.save(); ctx.strokeStyle = `rgba(180,200,230,${.35 * a})`; ctx.lineWidth = 2; for (let i = 0; i < 160; i++) { const x = (r() * (W + 400) - 200 + t * 300) % (W + 200) - 100, y = (r() * H + t * 1800 * (.7 + r() * .3)) % (H + 100) - 50; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 10, y + 40); ctx.stroke(); } ctx.restore(); }
// iconos de exportación (centrados en 0,0, ~200 px)
function exCar(ctx, t) { ctx.fillStyle = '#c8102e'; rr(ctx, -90, -30, 180, 44, 14); ctx.fill(); ctx.beginPath(); ctx.moveTo(-50, -30); ctx.lineTo(-28, -64); ctx.lineTo(40, -64); ctx.lineTo(64, -30); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(160,210,255,.8)'; ctx.beginPath(); ctx.moveTo(-40, -34); ctx.lineTo(-24, -58); ctx.lineTo(10, -58); ctx.lineTo(10, -34); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(18, -34); ctx.lineTo(18, -58); ctx.lineTo(36, -58); ctx.lineTo(54, -34); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#121216'; [-52, 52].forEach(wx => { ctx.beginPath(); ctx.arc(wx, 14, 20, 0, TAU); ctx.fill(); }); ctx.fillStyle = '#888'; [-52, 52].forEach(wx => { ctx.beginPath(); ctx.arc(wx, 14, 8, 0, TAU); ctx.fill(); }); }
function exChip(ctx, t) { ctx.fillStyle = '#1a1c26'; rr(ctx, -50, -50, 100, 100, 10); ctx.fill(); ctx.strokeStyle = '#ffc94a'; ctx.lineWidth = 5; for (let i = 0; i < 5; i++) { const o = -36 + i * 18; [[o, -50, o, -68], [o, 50, o, 68], [-50, o, -68, o], [50, o, 68, o]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); }); } ctx.fillStyle = '#2cc47a'; rr(ctx, -28, -28, 56, 56, 6); ctx.fill(); text(ctx, 'MX', 0, 2, { size: 28, font: 'Montserrat', weight: 900, color: '#0b2a1a' }); }
function exMed(ctx, t) { ctx.save(); ctx.rotate(-.6); ctx.fillStyle = '#ffffff'; rr(ctx, -70, -26, 70, 52, 26); ctx.fill(); ctx.fillStyle = '#2a8ad8'; rr(ctx, 0, -26, 70, 52, 26); ctx.fill(); ctx.fillRect(0, -26, 20, 52); ctx.restore(); ctx.fillStyle = P.red; ctx.fillRect(34, 20, 44, 14); ctx.fillRect(49, 5, 14, 44); }
function exAvo(ctx, t) { ctx.save(); ctx.rotate(-.25); ctx.fillStyle = '#2f5a22'; ctx.beginPath(); ctx.ellipse(0, 6, 54, 70, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#cfe08a'; ctx.beginPath(); ctx.ellipse(0, 10, 44, 58, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#7a4a22'; ctx.beginPath(); ctx.arc(0, 22, 24, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.arc(-8, 14, 7, 0, TAU); ctx.fill(); ctx.restore(); }
function exTeq(ctx, t) { ctx.fillStyle = 'rgba(200,230,255,.55)'; ctx.beginPath(); ctx.moveTo(-14, -80); ctx.lineTo(14, -80); ctx.lineTo(14, -40); ctx.quadraticCurveTo(42, -30, 42, 0); ctx.lineTo(42, 66); ctx.lineTo(-42, 66); ctx.lineTo(-42, 0); ctx.quadraticCurveTo(-42, -30, -14, -40); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(255,214,120,.8)'; ctx.fillRect(-40, 0, 80, 64); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-16, -96, 32, 18); ctx.fillStyle = '#f4f1ea'; rr(ctx, -30, 10, 60, 40, 4); ctx.fill(); ctx.fillStyle = '#2f7a3a'; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 6, 44); ctx.lineTo(i * 12, 18); ctx.lineTo(i * 6 + 3, 44); ctx.fill(); } }
function shipScene(ctx, t) {
  ctx.fillStyle = vg(ctx, [[0, '#f0a060'], [.55, '#f6c890'], [1, '#7fb0d0']], 0, 760); ctx.fillRect(-W, -H, 3 * W, 3 * H);
  glow(ctx, 1500, 560, 400, 'rgba(255,220,150,.7)'); ctx.fillStyle = '#ffe2a0'; ctx.beginPath(); ctx.arc(1500, 600, 80, 0, TAU); ctx.fill();
  ctx.fillStyle = '#2a5a7a'; ctx.fillRect(-W, 720, 3 * W, 400);
  const bob = Math.sin(t * 1.4) * 6, sx = 960 + Math.sin(t * .2) * 20;
  ctx.save(); ctx.translate(sx, 800 + bob); ctx.rotate(Math.sin(t * 1.1) * .01);
  const cols = ['#c8102e', '#127a45', '#e8e4dc', '#2a6fb8', '#e8a020', '#127a45', '#c8102e', '#e8e4dc'];
  for (let r = 0; r < 2; r++) for (let i = 0; i < 8; i++) { ctx.fillStyle = cols[(i + r * 3) % 8]; ctx.fillRect(-560 + i * 130, -150 - r * 74, 124, 70); ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let q = 0; q < 6; q++) ctx.fillRect(-552 + i * 130 + q * 20, -146 - r * 74, 3, 62); }
  ctx.fillStyle = '#e8e4dc'; ctx.fillRect(470, -260, 130, 190); ctx.fillStyle = '#2a3a4a'; for (let i = 0; i < 3; i++) ctx.fillRect(486 + i * 38, -240, 26, 22);
  ctx.fillStyle = '#1e2a3a'; ctx.beginPath(); ctx.moveTo(-680, -80); ctx.lineTo(700, -80); ctx.lineTo(620, 40); ctx.lineTo(-620, 40); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#b8232e'; ctx.fillRect(-640, 10, 1250, 30);
  text(ctx, 'HECHO EN MÉXICO', -40, -36, { size: 44, color: '#fff', ls: 8 });
  ctx.restore();
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3; for (let i = 0; i < 14; i++) { const y = 860 + i * 18, o = (t * 40 + i * 37) % 160; ctx.beginPath(); for (let x = -o; x < W + 160; x += 160) { ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 40, y - 6, x + 80, y); } ctx.stroke(); }
}
function tokyoRoom(ctx, t, light) {
  ctx.fillStyle = '#16142a'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ctx.fillStyle = '#0a0a18'; rr(ctx, 980, 140, 760, 520, 10); ctx.fill(); ctx.save(); ctx.beginPath(); rr(ctx, 1000, 160, 720, 480, 6); ctx.clip();
  ctx.fillStyle = vg(ctx, [[0, '#14103a'], [1, '#3a1a4a']], 160, 640); ctx.fillRect(1000, 160, 720, 480);
  const r = rnd(81); for (let i = 0; i < 18; i++) { const bx = 1000 + i * 44 + r() * 20, bh = 120 + r() * 300; ctx.fillStyle = '#0c0a1c'; ctx.fillRect(bx, 640 - bh, 40, bh); for (let wy = 640 - bh + 10; wy < 630; wy += 16) for (let wx = bx + 5; wx < bx + 36; wx += 10) if (r() < .4) { ctx.fillStyle = `rgba(${200 + r() * 55},${140 + r() * 100},255,.6)`; ctx.fillRect(wx, wy, 4, 6); } }
  [['#ff3d8b', 1080, 300], ['#38e8ff', 1380, 360], ['#ffd23f', 1600, 280]].forEach(([c, x, y], i) => { ctx.fillStyle = c; ctx.globalAlpha = .7 + .3 * Math.sin(t * 3 + i); rr(ctx, x, y, 22, 80, 4); ctx.fill(); glow(ctx, x + 11, y + 40, 80, c); ctx.globalAlpha = 1; });
  ctx.restore(); ctx.strokeStyle = '#3a3050'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(1360, 150); ctx.lineTo(1360, 650); ctx.moveTo(990, 400); ctx.lineTo(1730, 400); ctx.stroke();
  ctx.fillStyle = '#2a2236'; ctx.fillRect(-W, 760, 3 * W, 400); ctx.fillStyle = '#8a6a4a'; rr(ctx, 520, 830, 640, 40, 8); ctx.fill(); ctx.fillStyle = '#5a4430'; ctx.fillRect(560, 870, 20, 90); ctx.fillRect(1100, 870, 20, 90);
  if (light > 0) glow(ctx, 760, 700, 260, `rgba(150,200,255,${.5 * light})`);
}
// ===== 26 · los corridos cambian: ya no hablan de armas ni de convoyes... ahora de ciencia y filosofía =====
S(T.corridos - .05, (ctx, t) => {
  const t0 = T.corridos - .05, BX = V ? [770, 960, 1150] : [300, 560, 820], bs = V ? .95 : 1.1;
  ctx.fillStyle = vg(ctx, [[0, '#0a0614'], [1, '#2a0e22']]); ctx.fillRect(-W, -H, 3 * W, 3 * H);
  stageLights(ctx, t, ['rgba(255,80,160,.7)', 'rgba(80,200,255,.7)', 'rgba(255,210,80,.7)', 'rgba(255,80,160,.7)']);
  ctx.save(); if (V) ctx.translate(0, -120);
  ctx.fillStyle = '#1a1018'; ctx.fillRect(-W, 900, 3 * W, 420); ctx.fillStyle = '#3a2030'; ctx.fillRect(-W, 900, 3 * W, 12);
  const sway = Math.sin(t * 4.2) * 3, P1 = Object.assign({}, POSE.stand, { shB: 40, elB: 70, shF: 52, elF: 58, lean: sway * .5 }), P2 = Object.assign({}, POSE.stand, { shB: 64, elB: 60, shF: 26 + Math.sin(t * 10) * 10, elF: 96, lean: sway * .4 }), P3 = Object.assign({}, POSE.stand, { shB: 6, elB: 10, shF: 150, elF: 20, lean: -sway * .4 });
  const f1 = figure(ctx, { x: BX[0], y: 900, s: bs, dir: 1, pose: P1, face: 'happy', t, seed: 31, shirt: '#e8e4dc', rim: 'rgba(255,120,200,1)', light: [-1, -.8] }); hatOn(ctx, f1, BX[0], 900, bs, 1, '#e8d8b0');
  accordion(ctx, BX[0] + 50 * bs, 900 - 205 * bs, bs, t);
  const f2 = figure(ctx, { x: BX[1], y: 900, s: bs, dir: 1, pose: P2, face: 'laugh', t, seed: 32, shirt: '#1a1a22', rim: 'rgba(120,200,255,1)', light: [-1, -.8] }); hatOn(ctx, f2, BX[1], 900, bs, 1, '#1a1a1a');
  guitarDraw(ctx, BX[1] + 20 * bs, 900 - 170 * bs, bs, -.35);
  bassDraw(ctx, BX[2] + 70 * bs, 900, bs * 1.0);
  const f3 = figure(ctx, { x: BX[2], y: 900, s: bs, dir: 1, pose: P3, face: 'happy', t, seed: 33, shirt: '#7a1a2a', rim: 'rgba(255,210,120,1)', light: [-1, -.8] }); hatOn(ctx, f3, BX[2], 900, bs, 1, '#e8d8b0');
  for (let i = 0; i < 5; i++) { const k = ((t * .6 + i * .2) % 1); noteIcon(ctx, (BX[0] + BX[2]) / 2 + Math.sin(i * 2.3 + t) * 220, 560 - k * 300, 1.6, `rgba(255,214,90,${.8 * Math.sin(k * PI)})`); }
  ctx.restore();
  vignette(ctx, .6);
  if (NOUI) return;
  ctx.save(); ui(ctx);
  const kc = ease(t, TC.cambian - .2, TC.cambian + .3, E.back); if (kc > 0) {
    const cx = V ? UW() / 2 : 1380, cy = V ? 400 : 520, sc = V ? 1.0 : 1; ctx.translate(cx, cy); ctx.scale(kc * sc, kc * sc); ctx.rotate(V ? 0 : .03);
    ctx.fillStyle = '#f4ecd8'; rr(ctx, -300, -300, 600, 600, 12); ctx.fill(); ctx.fillStyle = 'rgba(120,80,40,.12)'; for (let i = 0; i < 12; i++) ctx.fillRect(-270, -200 + i * 40, 540, 2);
    text(ctx, 'CANCIONERO', 0, -236, { size: 64, color: '#3a1a0a', ls: 6 });
    const L = [['ARMAS', T.armas + .15], ['CONVOYES', TC.convoyes + .15]];
    L.forEach(([w, ts], i) => { const y = -110 + i * 110; noteIcon(ctx, -200, y, 1.4, '#6a4a2a'); text(ctx, w, -150, y, { size: 70, color: '#5a3a1a', align: 'left', ls: 3 }); const ks = ease(t, ts, ts + .3); if (ks > 0) { ctx.strokeStyle = '#c42b33'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-170, y + 4); ctx.lineTo(-170 + ks * 400, y - 6); ctx.stroke(); } });
    const kn = ease(t, T.ciencia + .3, T.ciencia + .65, E.back); if (kn > 0) { ctx.save(); ctx.translate(0, 168); ctx.scale(kn, kn); glow(ctx, 0, 0, 280, 'rgba(255,200,80,.55)'); noteIcon(ctx, -240, -36, 1.5, '#b8860b'); text(ctx, 'CIENCIA', 20, -38, { size: 84, color: '#b8860b', ls: 4 }); text(ctx, 'Y FILOSOFÍA', 0, 44, { size: 66, color: '#b8860b', ls: 4 }); ctx.restore(); }
  }
  ctx.restore();
}, 960);
// ===== 27 · ♪ ¡Ay, mamá! Pura ciencia y filosofía ♪ → "El Bélico de las Metáforas" llena el Foro Sol =====
function foroStage(ctx, t, sing) {
  ctx.fillStyle = '#05040c'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  stageLights(ctx, t, ['rgba(255,210,80,.8)', 'rgba(120,200,255,.7)', 'rgba(255,80,160,.7)', 'rgba(120,200,255,.7)', 'rgba(255,210,80,.8)'], 90);
  ctx.fillStyle = '#0c0a14'; rr(ctx, 460, 150, 1000, 420, 10); ctx.fill(); ctx.save(); ctx.beginPath(); rr(ctx, 476, 166, 968, 388, 6); ctx.clip(); ctx.fillStyle = vg(ctx, [[0, '#2a0a2a'], [1, '#0a0a2a']], 166, 554); ctx.fillRect(476, 166, 968, 388);
  text(ctx, 'EL BÉLICO', 960, 250, { size: 120, color: P.yel, ls: 8, shadow: 'rgba(255,200,60,.8)', blur: 30 }); text(ctx, 'DE LAS METÁFORAS', 960, 352, { size: 74, color: '#fff', ls: 6 });
  const ka = ease(t, T.foro - .1, T.foro + .3, E.back); if (ka > 0) { ctx.save(); ctx.translate(V ? 1180 : 1270, 505); ctx.rotate(-.08); ctx.scale(ka * (V ? .8 : 1), ka * (V ? .8 : 1)); ctx.fillStyle = '#c8102e'; rr(ctx, -260, -32, 520, 64, 10); ctx.fill(); text(ctx, 'FORO SOL · AGOTADO', 0, 2, { size: 40, font: 'Montserrat', weight: 900, color: '#fff', ls: 4 }); ctx.restore(); }
  ctx.restore();
  ctx.fillStyle = '#16121e'; ctx.fillRect(360, 620, 1200, 40); ctx.fillStyle = '#0c0a12'; ctx.fillRect(360, 660, 1200, 120);
  const pose = sing ? Object.assign({}, POSE.stand, { shF: 36, elF: 122 + Math.sin(t * 6) * 4, shB: 62 + Math.sin(t * 3) * 8, elB: 56, head: -10 + Math.sin(t * 6) * 3, lean: Math.sin(t * 3) * 3 }) : Object.assign({}, POSE.stand, { shF: 60, elF: 60, shB: 50, elB: 70, head: 14 });
  const fs = figure(ctx, { x: 960, y: 625, s: .62, dir: 1, pose, face: sing ? 'shout' : 'tender', t, seed: 35, shirt: '#e8e4dc', rim: 'rgba(255,220,150,1)', light: [-1, -1] }); hatOn(ctx, fs, 960, 625, .62, 1, '#1a1a1a');
  if (sing) { const mx = 960 + fs.hand[0] * .62, my = 625 + fs.hand[1] * .62; ctx.save(); ctx.translate(mx, my); ctx.rotate(-.5); ctx.fillStyle = '#2a2a30'; rr(ctx, -3, -2, 6, 22, 3); ctx.fill(); ctx.fillStyle = '#9aa0aa'; ctx.beginPath(); ctx.arc(0, -6, 7, 0, TAU); ctx.fill(); ctx.restore(); bookDraw(ctx, 960 + fs.handB[0] * .62 - 4, 625 + fs.handB[1] * .62, .7, true); }
  else bookDraw(ctx, 960 + fs.hand[0] * .62 + 6, 625 + fs.hand[1] * .62 - 4, .75, true);
  crowdBacks(ctx, t, { cheer: sing ? .9 : .35, phones: true, flags: false, seed: 44, y0: 720, y1: 1160, rows: 6, arms: sing ? .45 : .3, rim: 'rgba(255,200,140,.6)' });
}
S(T.canto - .2, (ctx, t) => {
  const tW = T.belico - .1, sing = t < tW;
  if (sing) { const k = ease(t, T.canto - .2, tW, E.sine), [hx, hy] = handheld(t, 2, 44); ctx.save(); cam(ctx, 960 + hx, lerp(522, 512, k) + hy, lerp(2.05, 2.2, k)); foroStage(ctx, t, true); ctx.restore(); }
  else { const k = ease(t, tW, T.librerias, E.sine); ctx.save(); cam(ctx, 960, 520, lerp(1.0, 1.06, k)); foroStage(ctx, t, false); ctx.restore(); }
  if (sing) { for (let i = 0; i < 6; i++) { const kk = ((t * .7 + i / 6) % 1); noteIcon(ctx, 960 + Math.sin(i * 2.1 + t) * 420, 640 - kk * 380, 2.2, `rgba(255,214,90,${.85 * Math.sin(kk * PI)})`); } }
  vignette(ctx, .6);
  stamp2(ctx, ['FORO SOL · CDMX', '65,000 PERSONAS'], t, T.foro + .1, { y: 820 });
}, 960);
// ===== 28 · se quedan sin libros de superación personal genérica... porque la gente los quemó. Ya no lee basura. =====
function flames(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(ctx, 0, -60, 320, 'rgba(255,150,50,.55)');
  [['#c8321e', 1.0, 0], ['#ff7a1f', .78, 1.7], ['#ffd23f', .5, 3.1]].forEach(([c, k, ph]) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-110 * k, 0);
    for (let i = 0; i <= 6; i++) { const u = i / 6, xx = lerp(-110 * k, 110 * k, u), hgt = (160 + 90 * Math.sin(u * PI)) * k * (.8 + .25 * noise1(t * 6 + i * 3 + ph)); ctx.quadraticCurveTo(xx - 18 * k, -hgt * .55, xx, -hgt); ctx.quadraticCurveTo(xx + 12 * k, -hgt * .5, xx + 18 * k, -20 * k); }
    ctx.lineTo(110 * k, 0); ctx.closePath(); ctx.fill(); });
  const r = rnd(Math.floor(t * 10)); ctx.fillStyle = '#ffd890'; for (let i = 0; i < 10; i++) { const kk = (t * 1.3 + i / 10) % 1; ctx.globalAlpha = 1 - kk; ctx.fillRect(Math.sin(i * 7.3) * 90 + Math.sin(t * 3 + i) * 20, -120 - kk * 260, 5, 5); }
  ctx.restore(); }
function bookCover(ctx, x, y, w, rot, title, col) { const h = w * 1.35; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-w / 2, -h / 2, w * .1, h); const words = title.split(' '); words.forEach((wd, i) => text(ctx, wd, 4, -h * .25 + i * w * .2, { size: w * .17, color: '#fff', ls: 1 })); ctx.restore(); }
S(T.librerias - .05, (ctx, t) => {
  const t0 = T.librerias - .05, tB = T.quemo - .1;
  if (t < tB) {
    const k = ease(t, t0, tB, E.sine), sk = V ? .8 : 1;
    ctx.save(); cam(ctx, 960, 560, lerp(1.0, 1.06, k));
    ctx.fillStyle = '#e8dcc6'; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.fillStyle = '#b89870'; ctx.fillRect(-W, 820, 3 * W, 400);
    const r = rnd(28), bcols = ['#7a2a2a', '#2a4a7a', '#2a6a4a', '#c8902a', '#5a3a6a', '#3a3a3a', '#a84a2a'];
    for (let sh = 0; sh < 3; sh++) { const sx = 360 + sh * 600; ctx.fillStyle = '#7a5434'; ctx.fillRect(sx - 270, 160, 540, 660); ctx.fillStyle = '#5a3a20'; ctx.fillRect(sx - 250, 180, 500, 620);
      for (let row = 0; row < 4; row++) { const y = 330 + row * 150; ctx.fillStyle = '#8a6440'; ctx.fillRect(sx - 250, y, 500, 14); if (sh === 1) continue; let x = sx - 240; while (x < sx + 230) { const w = 18 + r() * 16, h = 100 + r() * 30; ctx.fillStyle = bcols[Math.floor(r() * bcols.length)]; ctx.fillRect(x, y - h, w, h); x += w + 2; } } }
    ctx.fillStyle = '#7a2a5a'; rr(ctx, 960 - 230 * sk, 240, 460 * sk, 90, 10); ctx.fill(); text(ctx, 'SUPERACIÓN PERSONAL', 960, 274, { size: 40 * sk, color: '#fff', ls: 2 }); text(ctx, 'GENÉRICA', 960, 312, { size: 20, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.75)', ls: 8 });
    const ka = ease(t, T.superacion + .4, T.superacion + .7, E.back); if (ka > 0) { ctx.save(); ctx.translate(960, 560); ctx.rotate(-.12); ctx.scale(ka, ka); ctx.strokeStyle = '#c42b33'; ctx.lineWidth = 10; rr(ctx, -210, -60, 420, 120, 14); ctx.stroke(); text(ctx, 'AGOTADO', 0, 4, { size: 90, color: '#c42b33', ls: 8 }); ctx.restore(); }
    const xs = V ? [700, 1230] : [560, 1360];
    figure(ctx, { x: xs[0], y: 980, s: 1.15, dir: 1, pose: POSE2.shrug, face: 'smile', t, seed: 51, shirt: '#2a6a4a', acc: { glasses: 1 }, rim: 'rgba(255,240,210,1)', light: [-1, -.8], look: [0, -2] });
    figure(ctx, { x: xs[1], y: 980, s: 1.15, dir: -1, pose: Object.assign({}, POSE.stand, { shF: 30, elF: 100, head: 6 }), face: 'shock', t, seed: 52, shirt: '#c98a2a', rim: 'rgba(255,240,210,1)', light: [-1, -.8] });
    ctx.restore();
    grade(ctx, '#ffd8a0', .08); vignette(ctx, .5);
    stamp2(ctx, ['LIBRERÍA · CDMX'], t, t0 + .2, { out: tB - .3 });
  } else {
    const k = ease(t, tB, T.y2036, E.sine), [hx, hy] = handheld(t, 2, 18);
    ctx.save(); cam(ctx, 960 + hx, 600 + hy, lerp(1.08, 1.16, k));
    ctx.drawImage(streetBG(true), 0, 0); ctx.fillStyle = 'rgba(10,6,20,.35)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
    ctx.fillStyle = '#3a3a44'; rr(ctx, 870, 800, 180, 120, 10); ctx.fill(); ctx.fillStyle = '#2a2a30'; ctx.fillRect(870, 830, 180, 8);
    [['MINDSET DE TIBURÓN', '#c8102e', 880, 790, -.3], ['TU MEJOR VERSIÓN 3.0', '#2a6fb8', 1010, 786, .35], ['SÉ MILLONARIO YA', '#e8a020', 950, 770, .1]].forEach(([tt, c, x, y, r2]) => bookCover(ctx, x, y, 90, r2, tt, c));
    flames(ctx, 960, 800, .9, t);
    const toss = ((t - tB) % 2.4) / 2.4, armUp = toss < .35 ? E.out(toss / .35) : 1 - E.inOut(clamp((toss - .35) / .4));
    const tx = V ? 1180 : 1300; const f = figure(ctx, { x: tx, y: 940, s: 1.1, dir: -1, pose: mixPose(Object.assign({}, POSE.stand, { shF: 20, elF: 40 }), Object.assign({}, POSE.stand, { shF: 150, elF: 30, lean: -6 }), armUp), face: 'laugh', t, seed: 53, shirt: '#3a6ac9', rim: 'rgba(255,170,90,1)', light: [-1, -.4] });
    if (toss > .3 && toss < .7) { const kk = (toss - .3) / .4; bookCover(ctx, lerp(tx - 60, 990, kk), lerp(640, 760, kk) - Math.sin(kk * PI) * 140, 60, kk * 6, 'DESPIERTA TU ALFA', '#5a3a6a'); }
    const mx = V ? 740 : 620; const g = figure(ctx, { x: mx, y: 940, s: 1.1, dir: 1, pose: Object.assign({}, POSE.stand, { shF: 70, elF: 20 }), face: 'happy', t, seed: 54, shirt: '#2fbf5b', hood: true, rim: 'rgba(255,170,90,1)', light: [1, -.4] });
    const sx = mx + g.hand[0] * 1.1, sy = 940 + g.hand[1] * 1.1; ctx.strokeStyle = '#8a6a4a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + 170, sy - 30); ctx.stroke(); ctx.fillStyle = '#fff4e0'; rr(ctx, sx + 160, sy - 44, 30, 26, 8); ctx.fill();
    ctx.restore();
    grade(ctx, '#ff8a40', .12); vignette(ctx, .7);
    tag(ctx, 'YA NO LEE BASURA', 960, 360, t, T.basura + .1, { col: '#ffd23f' });
  }
}, 960);
// ===== 29 · 2036: México entra a las diez economías más grandes del mundo =====
S(T.y2036 - .1, (ctx, t) => {
  const t0 = T.y2036 - .1;
  ctx.fillStyle = vg(ctx, [[0, '#071a12'], [1, '#0b1020']]); ctx.fillRect(-W, -H, 3 * W, 3 * H); glow(ctx, 960, 540, 900, 'rgba(40,180,110,.12)');
  dust(ctx, t, 40, 29, 'rgba(180,255,210,1)', .25, 1.6);
  ctx.save(); uiCenter(ctx, V ? 1.12 : 1);
  const ky = ease(t, t0, t0 + .35, E.back), list = ease(t, T.entra - .2, T.entra + .4, E.outQuint), lx = V ? 960 : 1180;
  if (list < 1) { ctx.save(); ctx.globalAlpha = 1 - list; ctx.translate(960, 540); ctx.scale(lerp(1.4, 1, ky), lerp(1.4, 1, ky)); text(ctx, '2036', 0, 0, { size: 320, color: P.yel, ls: 10, stroke: 10, strokeCol: '#081008', alpha: ky }); ctx.restore(); }
  if (list > 0) { ctx.save(); ctx.globalAlpha = list;
    if (!V) { text(ctx, '2036', 470, 470, { size: 230, color: P.yel, ls: 8 }); text(ctx, 'TOP 10', 470, 640, { size: 90, color: '#fff', ls: 8 }); text(ctx, 'ECONOMÍAS DEL MUNDO', 470, 720, { size: 30, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.7)', ls: 4 }); text(ctx, 'ESCENARIO FICTICIO', 470, 770, { size: 20, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.45)', ls: 6 }); }
    else { text(ctx, '2036 · TOP 10 ECONOMÍAS', 960, 60, { size: 60, color: P.yel, ls: 4 }); text(ctx, 'ESCENARIO FICTICIO', 960, 110, { size: 22, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.5)', ls: 6 }); }
    const y0 = V ? 170 : 205, rh = V ? 86 : 70;
    for (let i = 0; i < 9; i++) { const y = y0 + i * rh, ki = ease(t, T.entra + i * .05, T.entra + .3 + i * .05, E.out); ctx.save(); ctx.globalAlpha *= ki; card(ctx, lx, y, 640, rh - 12, {}); text(ctx, String(i + 1), lx - 280, y + 2, { size: 34, color: 'rgba(255,255,255,.5)' }); ctx.fillStyle = 'rgba(255,255,255,.12)'; rr(ctx, lx - 230, y - 12, 220 + (9 - i) * 22, 24, 12); ctx.fill(); ctx.restore(); }
    const km = ease(t, T.economias - .2, T.economias + .5, E.inOut), my = lerp(y0 + 13 * rh, y0 + 9 * rh, km), num = km < 1 ? Math.round(lerp(14, 10, km)) : 10;
    ctx.save(); glow(ctx, lx, my, 300, `rgba(255,201,74,${.35 * km})`); card(ctx, lx, my, 680, rh - 6, { stroke: P.gold, lw: 4, fill: 'rgba(14,40,26,.95)' }); text(ctx, String(num), lx - 290, my + 2, { size: 40, color: P.gold }); flagDraw(ctx, 'MEX', lx - 240, my - 22, 66, 44); text(ctx, 'MÉXICO', lx - 150, my + 2, { size: 48, color: '#fff', align: 'left', ls: 4 }); if (km >= 1) text(ctx, '▲', lx + 280, my, { size: 36, color: P.mexL }); ctx.restore();
    ctx.restore(); }
  ctx.restore();
  vignette(ctx, .6);
});
// ===== 30 · exporta carros, chips, medicinas... y aguacate y tequila =====
S(T.exporta - .05, (ctx, t) => {
  const t0 = T.exporta - .05, k = ease(t, t0, T.tokio, E.sine);
  ctx.save(); cam(ctx, 960, 560, lerp(1.0, 1.06, k)); shipScene(ctx, t); ctx.restore();
  grade(ctx, '#ffb070', .08); vignette(ctx, .5);
  if (NOUI) return;
  ctx.save(); ui(ctx);
  const IT = [[exCar, 'CARROS', T.carros], [exChip, 'CHIPS', T.chips2], [exMed, 'MEDICINAS', T.medicinas], [exAvo, 'AGUACATE', T.aguacate], [exTeq, 'TEQUILA', T.tequila]];
  IT.forEach(([ic, lb, ti], i) => { const kk = ease(t, ti - .1, ti + .3, E.back); if (kk <= 0) return; const love = i >= 3 ? ease(t, TC.deja, TC.deja + .4, E.back) : 0;
    const [x, y] = V ? [UW() / 2 + ((i < 3 ? i - 1 : i - 3.5)) * 420, i < 3 ? 260 : 690] : [uxC(360 + i * 300), uyT(330)];
    ctx.save(); ctx.translate(x, y + Math.sin(t * 2 + i) * 6); ctx.scale(kk * (V ? 1.25 : 1), kk * (V ? 1.25 : 1)); if (love > 0) glow(ctx, 0, 0, 200, 'rgba(255,90,120,.45)', love); card(ctx, 0, 0, 240, 280, { stroke: love > 0 ? '#ff6a8a' : 'rgba(255,255,255,.2)', lw: love > 0 ? 4 : 2 }); ctx.save(); ctx.translate(0, -26); ctx.rotate(love * Math.sin(t * 8) * .08); ic(ctx, t); ctx.restore(); text(ctx, lb, 0, 104, { size: 36, color: '#fff', ls: 3 });
    if (love > 0) for (let h = 0; h < 3; h++) { const kh = ((t - TC.deja) * .8 + h / 3) % 1; heart(ctx, -60 + h * 60, -130 - kh * 90, 1.2 * love, `rgba(255,74,106,${1 - kh})`); }
    ctx.restore(); });
  ctx.restore();
});
// ===== 31 · en Tokio, una niña prende su tablet... "Hecho en México" =====
S(T.tokio - .05, (ctx, t) => {
  const t0 = T.tokio - .05, on = ease(t, TC.prende + .2, TC.prende + .5), close = ease(t, TC.dice - .25, TC.dice + .25, E.inOut);
  if (close < 1) {
    ctx.save(); cam(ctx, lerp(900, 800, close), lerp(600, 700, close), lerp(1.08, 2.4, close)); tokyoRoom(ctx, t, on);
    const pose = Object.assign({}, POSE.sitFront, { shF: 40, elF: 96, shB: 36, elB: 100, head: 12 });
    const f = figure(ctx, { x: 760, y: 900, s: 1.1, dir: 1, pose, face: on > .5 ? 'shock' : 'smile', t, seed: 61, shirt: '#ff8ab0', rim: on > .2 ? 'rgba(160,210,255,1)' : 'rgba(255,140,200,1)', light: [1, -.4], look: [4, 6] });
    const hx = 760 + f.headC[0] * 1.1, hy = 900 + f.headC[1] * 1.1; ctx.fillStyle = P.ink; [[-44, -10], [42, -16]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(hx + dx, hy + dy, 18, 0, TAU); ctx.fill(); }); ctx.fillStyle = '#ff3d8b'; [[-36, -18], [34, -24]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(hx + dx, hy + dy, 6, 0, TAU); ctx.fill(); });
    const tx = 760 + f.hand[0] * 1.1, ty = 900 + f.hand[1] * 1.1; ctx.save(); ctx.translate(tx + 10, ty - 30); ctx.rotate(-.2); ctx.fillStyle = '#1a1c22'; rr(ctx, -60, -44, 120, 88, 10); ctx.fill(); ctx.fillStyle = on > 0 ? `rgba(170,215,255,${on})` : '#0a0c10'; rr(ctx, -54, -38, 108, 76, 6); ctx.fill(); ctx.restore(); if (on > 0) glow(ctx, tx, ty - 50, 180, 'rgba(160,210,255,.45)', on);
    ctx.restore();
  }
  if (close > 0) { ctx.save(); ctx.globalAlpha = close; ctx.fillStyle = '#0d0c16'; ctx.fillRect(-W, -H, 3 * W, 3 * H); glow(ctx, 960, 500, 700, 'rgba(160,210,255,.18)');
    ctx.translate(960, 520); ctx.scale(lerp(.8, 1, close) * (V ? .85 : 1), lerp(.8, 1, close) * (V ? .85 : 1)); ctx.fillStyle = '#c9ced6'; rr(ctx, -420, -300, 840, 600, 46); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.25)'; rr(ctx, -400, -280, 800, 120, 36); ctx.fill();
    ctx.fillStyle = '#9aa0aa'; ctx.beginPath(); ctx.arc(-330, -210, 34, 0, TAU); ctx.fill(); ctx.fillStyle = '#20232a'; ctx.beginPath(); ctx.arc(-330, -210, 20, 0, TAU); ctx.fill();
    flagDraw(ctx, 'MEX', -90, -60, 180, 120); text(ctx, 'HECHO EN MÉXICO', 0, 130, { size: 84, color: '#3a3f4a', ls: 6 }); text(ctx, 'MODELO MX-36', 0, 210, { size: 26, font: 'Montserrat', weight: 900, color: '#6a707a', ls: 8 });
    ctx.restore(); }
  vignette(ctx, .55);
  stamp2(ctx, ['TOKIO · 2036'], t, t0 + .2, { out: TC.dice - .4 });
}, t => lerp(V ? 900 : 960, 960, ease(t, TC.dice - .25, TC.dice + .25, E.inOut)));
