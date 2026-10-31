// ¿Y si sí? · EP 02 v2 — parte D: México no se detiene (2040–2060), primer contacto con taco al pastor y la final del primer Universal
KIT.AND = { shirt: '#6a2bb8', shorts: '#2a0d55', socks: '#6a2bb8', numCol: '#d8ff3a', gk: { shirt: '#ff9f1a', shorts: '#1a1a1a', socks: '#ff9f1a' } };
const ALIEN = '#6fd13d';
function asAlien(fn) { const o = P.ink; P.ink = ALIEN; try { return fn(); } finally { P.ink = o; } }
function antennae(ctx, f, x, y, s, dir) { const hx = x + f.headC[0] * s * dir, hy = y + f.headC[1] * s; ctx.save(); ctx.strokeStyle = ALIEN; ctx.lineWidth = 6 * s; ctx.lineCap = 'round';
  [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(hx + k * 14 * s, hy - 36 * s); ctx.quadraticCurveTo(hx + k * 34 * s, hy - 70 * s, hx + k * 24 * s, hy - 92 * s); ctx.stroke(); ctx.fillStyle = '#ffe14a'; ctx.beginPath(); ctx.arc(hx + k * 24 * s, hy - 92 * s, 8 * s, 0, TAU); ctx.fill(); }); ctx.restore(); }
function alien(ctx, x, y, s, dir, pose, face, t, extra = {}) { const f = asAlien(() => figure(ctx, Object.assign({ x, y, s, dir, pose, face, t, seed: 200 + Math.round(x) % 50, shirt: '#3a2a6a', rim: 'rgba(190,255,150,1)', light: [-1, -.6] }, extra))); antennae(ctx, f, x, y - (extra.jump || 0), s, dir); return f; }
function flagWave(ctx, x, y, w, h, t, k = 1) { ['#127a45', '#ece8e0', '#c42b33'].forEach((c, j) => { ctx.fillStyle = c; ctx.beginPath(); for (let q = 0; q <= 8; q++) { const xx = x + (j * w / 3 + q * w / 24) * k, yw = Math.sin(xx * .03 - t * 6) * 6 * k; q ? ctx.lineTo(xx, y + yw) : ctx.moveTo(xx, y + yw); } for (let q = 8; q >= 0; q--) { const xx = x + (j * w / 3 + q * w / 24) * k, yw = Math.sin(xx * .03 - t * 6) * 6 * k; ctx.lineTo(xx, y + h + yw); } ctx.fill(); }); ctx.fillStyle = '#8a5a2b'; ctx.beginPath(); ctx.arc(x + w / 2 * k, y + h / 2 + Math.sin((x + w / 2 * k) * .03 - t * 6) * 6 * k, h * .13, 0, TAU); ctx.fill(); }
function yearCounter(ctx, t, t0, t1, a, b, x, y, size) { const k = ease(t, t0, t1, E.inOut), yr = Math.round(lerp(a, b, k)); text(ctx, String(yr), x + 6, y + 8, { size, color: 'rgba(0,0,0,.5)', ls: 6 }); text(ctx, String(yr), x, y, { size, color: P.yel, ls: 6, stroke: 8, strokeCol: '#140d08' }); }
function earthDraw(ctx, x, y, r, t) { ctx.save(); glow(ctx, x, y, r * 1.35, 'rgba(90,170,255,.45)'); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); const g = ctx.createRadialGradient(x - r * .4, y - r * .4, r * .1, x, y, r); g.addColorStop(0, '#5ab4ff'); g.addColorStop(1, '#0b3a7a'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.fillStyle = '#3f9a4a'; const sp = t * 6; [[-.3, -.2, .35, .22], [.25, .15, .3, .4], [-.1, .45, .25, .14], [.5, -.4, .2, .15]].forEach(([u, v, a, b], i) => { ctx.beginPath(); ctx.ellipse(x + ((u * r + sp + r) % (2.4 * r)) - r, y + v * r, a * r, b * r, i, 0, TAU); ctx.fill(); });
  ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(x + Math.sin(i * 2 + t * .1) * r * .7, y + (i - 2) * r * .3, r * .3, r * .05, 0, 0, TAU); ctx.fill(); }
  ctx.restore(); ctx.save(); ctx.globalCompositeOperation = 'multiply'; const s2 = ctx.createRadialGradient(x - r * .5, y - r * .5, r * .2, x, y, r * 1.05); s2.addColorStop(0, 'rgba(255,255,255,1)'); s2.addColorStop(1, 'rgba(20,20,60,1)'); ctx.fillStyle = s2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore(); }
function starfield(ctx, t, seed = 3) { ctx.fillStyle = '#04040c'; ctx.fillRect(-W, -H, 3 * W, 3 * H); const r = rnd(seed); for (let i = 0; i < 260; i++) { const x = r() * W * 1.4 - W * .2, y = r() * H * 1.4 - H * .2, a = .3 + .7 * r() * (.7 + .3 * Math.sin(t * 2 + i)); ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fillRect(x, y, 2, 2); } }
function ufoDraw(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(ctx, 0, 30, 260, 'rgba(160,255,140,.35)'); ctx.fillStyle = 'rgba(170,255,190,.55)'; ctx.beginPath(); ctx.ellipse(0, -30, 70, 50, 0, PI, TAU); ctx.fill(); ctx.fillStyle = '#9aa4b8'; ctx.beginPath(); ctx.ellipse(0, 0, 180, 40, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#5a6278'; ctx.beginPath(); ctx.ellipse(0, 12, 120, 20, 0, 0, TAU); ctx.fill(); for (let i = 0; i < 7; i++) { const a = i / 7 * TAU + t * 2; ctx.fillStyle = Math.sin(a * 3 + t * 6) > 0 ? '#ffe14a' : '#7bff6a'; ctx.beginPath(); ctx.arc(Math.cos(a) * 150, Math.sin(a) * 18 + 4, 9, 0, TAU); ctx.fill(); } ctx.restore(); }
function tacoDraw(ctx, x, y, s, pina) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#f2d27a'; ctx.beginPath(); ctx.arc(0, 0, 40, PI * 1.05, TAU * .98); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#c8501e'; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(-26 + i * 9, -12 - Math.sin(i) * 4, 8, 0, TAU); ctx.fill(); } ctx.fillStyle = '#3fa83a'; for (let i = 0; i < 6; i++) ctx.fillRect(-22 + i * 9, -22 + (i % 2) * 4, 4, 4); ctx.fillStyle = '#f6efe0'; ctx.fillRect(-14, -24, 10, 4); if (pina > 0) { ctx.save(); ctx.translate(6, -30); ctx.scale(pina, pina); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.moveTo(-10, 6); ctx.lineTo(10, 6); ctx.lineTo(0, -10); ctx.closePath(); ctx.fill(); ctx.restore(); } ctx.restore(); }
function helmet(ctx, f, x, y, s, dir) { const hx = x + f.headC[0] * s * dir, hy = y + f.headC[1] * s; ctx.save(); ctx.strokeStyle = 'rgba(220,235,255,.9)'; ctx.lineWidth = 4 * s; ctx.fillStyle = 'rgba(170,210,255,.18)'; ctx.beginPath(); ctx.arc(hx, hy, 62 * s, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.ellipse(hx - 24 * s * dir, hy - 28 * s, 14 * s, 7 * s, -.6 * dir, 0, TAU); ctx.fill(); ctx.restore(); }
function ponytail(ctx, f, x, y, s, dir) { const hx = x + f.headC[0] * s * dir, hy = y + f.headC[1] * s; ctx.save(); ctx.fillStyle = P.ink; ctx.beginPath(); ctx.ellipse(hx - 46 * s * dir, hy + 6 * s, 16 * s, 30 * s, .5 * dir, 0, TAU); ctx.fill(); ctx.fillStyle = '#c42b33'; ctx.beginPath(); ctx.arc(hx - 38 * s * dir, hy - 14 * s, 6 * s, 0, TAU); ctx.fill(); ctx.restore(); }
function skylineFuture(ctx, t, grow) { ctx.fillStyle = vg(ctx, [[0, '#ff9a6a'], [.5, '#ffcf8a'], [1, '#8fd0ff']], 0, 760); ctx.fillRect(-W, -H, 3 * W, 3 * H); glow(ctx, 1500, 520, 500, 'rgba(255,230,170,.6)');
  const r = rnd(66); for (let i = 0; i < 18; i++) { const bx = -100 + i * 120 + r() * 30, bw = 70 + r() * 70, h0 = 120 + r() * 160, h1 = h0 + 120 + r() * 380, k = clamp(grow * 1.4 - r() * .4), bh = lerp(h0, h1, E.out(k));
    ctx.fillStyle = i % 3 ? '#2a3f6a' : '#1f6a52'; ctx.fillRect(bx, 760 - bh, bw, bh); ctx.fillStyle = 'rgba(180,230,255,.35)'; for (let wy = 760 - bh + 12; wy < 750; wy += 22) ctx.fillRect(bx + 8, wy, bw - 16, 6); if (i % 4 === 1 && k > .9) { ctx.fillStyle = '#ffd23f'; ctx.fillRect(bx + bw / 2 - 2, 760 - bh - 40, 4, 40); } }
  ctx.fillStyle = '#c9a24a'; ctx.fillRect(1450, 380, 30, 380); ctx.beginPath(); ctx.arc(1465, 360, 18, 0, TAU); ctx.fill();
  ctx.fillStyle = '#1a2238'; ctx.fillRect(-W, 760, 3 * W, 400); ctx.strokeStyle = 'rgba(120,220,255,.6)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-200, 820); ctx.lineTo(2200, 790); ctx.stroke(); }
function robot(ctx, x, y, s, col, ink, ph, mx, t) { const o = P.ink; P.ink = ink; const f = figure(ctx, { x, y, s, dir: 1, pose: runCycle(ph), face: 'determined', t, seed: 300 + Math.round(y), shirt: col, sleeves: 'short', rim: 'rgba(200,240,255,1)', light: [-1, -.7] }); P.ink = o; const hx = x + f.headC[0] * s, hy = y + f.headC[1] * s;
  ctx.fillStyle = '#d8e4f0'; rr(ctx, hx - 6 * s, hy - 60 * s, 12 * s, 18 * s, 4); ctx.fill(); ctx.fillStyle = mx ? '#2cc47a' : '#ff5a5a'; ctx.beginPath(); ctx.arc(hx, hy - 64 * s, 7 * s, 0, TAU); ctx.fill(); if (mx) { ctx.save(); flagDraw(ctx, 'MEX', x - 60 * s, y - 230 * s, 46 * s, 30 * s); ctx.restore(); } return f; }
// ===== D1 · Y México no se detiene =====
S(T.detiene - .05, (ctx, t) => {
  const t0 = T.detiene - .05, g = ease(t, t0, T.y2040, E.inOut), [hx, hy] = handheld(t, 2, 61);
  ctx.save(); cam(ctx, 960 + hx, 560 + hy, lerp(1.0, 1.08, g)); skylineFuture(ctx, t, g);
  for (let i = 0; i < 3; i++) { const k = ((t - t0) * .35 + i * .33) % 1; ctx.save(); ctx.translate(lerp(-200, 2100, k), 300 + i * 70); ctx.fillStyle = '#e8eef6'; rr(ctx, -40, -8, 80, 16, 8); ctx.fill(); ctx.fillStyle = '#2cc47a'; ctx.fillRect(-10, -14, 20, 6); ctx.restore(); }
  ctx.restore(); grade(ctx, '#ffb070', .1); vignette(ctx, .5);
  if (!NOUI) { ctx.save(); uiCenter(ctx, .95); yearCounter(ctx, t, t0 + .3, T.y2040 + .1, 2036, 2040, 960, 520, 260); ctx.restore(); }
});
// ===== D2 · 2040: gana la carrera de la inteligencia artificial =====
S(T.y2040 - .05, (ctx, t) => {
  const t0 = T.y2040 - .05, tF = T.ia + .55, d = (t - t0) * 560, cx = 960 + Math.min(d, (tF - t0) * 560) * 0;
  ctx.fillStyle = vg(ctx, [[0, '#06121f'], [1, '#0c2a3a']]); ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ctx.save(); ctx.strokeStyle = 'rgba(80,200,255,.12)'; ctx.lineWidth = 2; const off = (d * .3) % 80; for (let x = -off; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 640); ctx.stroke(); } ctx.restore();
  text(ctx, 'CARRERA DE LA IA', 960, 220, { size: 120, color: 'rgba(80,200,255,.10)', ls: 20 });
  ctx.fillStyle = '#14324a'; ctx.fillRect(-W, 640, 3 * W, 500); [700, 820, 960].forEach(y => { ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(-W, y, 3 * W, 4); });
  const fx = 1040 + (tF - t) * 504; ctx.save(); for (let i = 0; i < 15; i++) { ctx.fillStyle = i % 2 ? '#111' : '#fff'; ctx.fillRect(fx, 640 + i * 30, 26, 30); } ctx.restore();
  const brk = t > tF ? ease(t, tF, tF + .6, E.out) : 0;
  robot(ctx, 560 - brk * 60, 770, .78, '#8a94a6', '#5a6474', runPhase(d, .78, 1.1), false, t);
  robot(ctx, 640 - brk * 60, 880, .9, '#a86a3a', '#5a6474', runPhase(d, .9, 2.3), false, t);
  const mxF = robot(ctx, 960 + brk * 80, 1010, 1.05, P.mex, '#20262e', runPhase(d, 1.05), true, t);
  ctx.save(); ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 6; if (t < tF) { ctx.beginPath(); ctx.moveTo(fx + 13, 1000); ctx.lineTo(fx + 13, 760); ctx.stroke(); } else { const kb = ease(t, tF, tF + .5, E.out); ctx.beginPath(); ctx.moveTo(fx + 13, 760); ctx.quadraticCurveTo(fx + 13 - 40 * kb, 820, fx + 13 - 70 * kb, 860 + 40 * kb); ctx.moveTo(fx + 13, 1000); ctx.quadraticCurveTo(fx + 13 + 40 * kb, 960, fx + 13 + 80 * kb, 900 - 30 * kb); ctx.stroke(); } ctx.restore();
  if (t > tF) { confetti(ctx, t, tF, 70, 13); flash(ctx, t, tF, .2, '255,240,200', .5); }
  vignette(ctx, .6);
  stamp2(ctx, ['2040', 'CARRERA DE LA INTELIGENCIA ARTIFICIAL'], t, t0 + .15);
  if (t > tF && !NOUI) { ctx.save(); ui(ctx); const k = ease(t, tF, tF + .35, E.back); ctx.translate(uxC(960), uyT(V ? 220 : 250)); ctx.scale(k, k); card(ctx, 0, 0, 640, 110, { stroke: P.gold, lw: 4 }); text(ctx, '1.er LUGAR · MÉXICO', 0, 4, { size: 64, color: P.gold, ls: 4 }); ctx.restore(); }
}, V ? 840 : 960);
// ===== D3 · 2045: gana la carrera espacial; la primera bandera en Marte =====
S(T.y2045 - .05, (ctx, t) => {
  const t0 = T.y2045 - .05, tM = T.marte - .15;
  if (t < tM) {
    const k = ease(t, t0 + .3, tM, E.in), ry = lerp(760, -400, k), [sx, sy] = shakeV(t, 10 * (1 - k));
    ctx.save(); ctx.translate(sx, sy); cam(ctx, 960, lerp(560, 420, k), 1.0);
    ctx.fillStyle = vg(ctx, [[0, '#0a1430'], [1, '#ff9a6a']], 0, 900); ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.fillStyle = '#1a2030'; ctx.fillRect(-W, 900, 3 * W, 300);
    ctx.fillStyle = '#3a4050'; ctx.fillRect(1180, 300, 30, 600); for (let y = 320; y < 900; y += 60) ctx.fillRect(1100, y, 100, 6);
    const smoke = rnd(9); for (let i = 0; i < 26; i++) { const a = smoke() * TAU, rr2 = 60 + smoke() * 260 * (.5 + k); ctx.fillStyle = `rgba(230,230,235,${.5 - smoke() * .3})`; ctx.beginPath(); ctx.arc(960 + Math.cos(a) * rr2 * 1.6, 900 - Math.abs(Math.sin(a)) * rr2 * .5, 50 + smoke() * 70, 0, TAU); ctx.fill(); }
    ctx.save(); ctx.translate(960, ry); glow(ctx, 0, 240, 260, 'rgba(255,170,60,.8)'); ctx.fillStyle = '#ffb030'; ctx.beginPath(); ctx.moveTo(-34, 160); ctx.quadraticCurveTo(0, 320 + Math.sin(t * 40) * 30, 34, 160); ctx.fill(); ctx.fillStyle = '#fff3c0'; ctx.beginPath(); ctx.moveTo(-18, 160); ctx.quadraticCurveTo(0, 250, 18, 160); ctx.fill();
    ctx.fillStyle = '#f4f4f6'; rr(ctx, -48, -180, 96, 340, 20); ctx.fill(); ctx.fillStyle = '#c42b33'; ctx.beginPath(); ctx.moveTo(-48, -170); ctx.quadraticCurveTo(0, -300, 48, -170); ctx.fill(); ctx.fillStyle = '#127a45'; ctx.fillRect(-48, 40, 96, 26); ctx.fillStyle = '#c42b33'; ctx.fillRect(-48, 66, 96, 14); ctx.fillStyle = '#2a3a5a'; ctx.beginPath(); ctx.arc(0, -90, 22, 0, TAU); ctx.fill(); ctx.fillStyle = '#9aa0aa'; [-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(48 * d, 90); ctx.lineTo(90 * d, 170); ctx.lineTo(48 * d, 160); ctx.closePath(); ctx.fill(); }); text(ctx, 'MX', 0, -10, { size: 40, color: '#127a45' }); ctx.restore();
    ctx.restore(); vignette(ctx, .55);
  } else {
    const k = ease(t, tM, T.y2050, E.sine), plant = ease(t, T.verde - .9, T.verde - .2, E.out), up = ease(t, T.verde - .2, T.verde + .5, E.back);
    ctx.save(); cam(ctx, 960, 580, lerp(1.05, 1.15, k));
    ctx.fillStyle = vg(ctx, [[0, '#3a1a20'], [.6, '#c96a3f'], [1, '#e9a37a']], 0, 700); ctx.fillRect(-W, -H, 3 * W, 3 * H); earthDraw(ctx, 420, 230, 50, t);
    ctx.fillStyle = '#a8482a'; ctx.beginPath(); ctx.moveTo(-200, 760); ctx.quadraticCurveTo(500, 640, 1100, 740); ctx.quadraticCurveTo(1600, 800, 2200, 700); ctx.lineTo(2200, 1200); ctx.lineTo(-200, 1200); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#8a3a22'; ctx.fillRect(-W, 900, 3 * W, 400);
    const r = rnd(4); for (let i = 0; i < 18; i++) { ctx.fillStyle = 'rgba(70,30,20,.5)'; ctx.beginPath(); ctx.ellipse(r() * 2000, 800 + r() * 260, 20 + r() * 40, 8 + r() * 10, 0, 0, TAU); ctx.fill(); }
    const px = 1080, poleTop = lerp(560, 640, 1 - plant); ctx.strokeStyle = '#d8d8e0'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(px, 920); ctx.lineTo(px, poleTop); ctx.stroke(); if (up > 0) flagWave(ctx, px, poleTop, 210 * up, 130 * up, t, 1);
    const f = figure(ctx, { x: 900, y: 930, s: 1.15, dir: 1, pose: mixPose(Object.assign({}, POSE.stand, { shF: 70, elF: 30, shB: 60, elB: 40 }), POSE.cheer, up > .8 ? ease(t, T.verde + .4, T.verde + .8) : 0), face: up > .5 ? 'cheer' : 'determined', t, seed: 71, shirt: '#f2f2f4', shorts: '#e2e2e8', rim: 'rgba(255,190,140,1)', light: [-1, -.6] });
    helmet(ctx, f, 900, 930, 1.15, 1);
    ctx.restore(); grade(ctx, '#ff8a50', .1); vignette(ctx, .55);
  }
  stamp2(ctx, t < tM ? ['2045', 'CARRERA ESPACIAL'] : ['2045 · MARTE', 'PRIMERA BANDERA'], t, t < tM ? t0 + .15 : tM + .15);
}, 960);
// ===== D4 · 2050: la paz en Medio Oriente... termina con café de olla =====
function cafeOlla(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#a8562e'; ctx.beginPath(); ctx.moveTo(-20, -40); ctx.quadraticCurveTo(-28, 0, -14, 6); ctx.lineTo(14, 6); ctx.quadraticCurveTo(28, 0, 20, -40); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#a8562e'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(24, -20, 10, -PI / 2, PI / 2); ctx.stroke(); ctx.fillStyle = '#e8c890'; ctx.fillRect(-14, -34, 28, 6);
  ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 3; for (let i = 0; i < 2; i++) { ctx.beginPath(); for (let q = 0; q < 12; q++) { const yy = -44 - q * 5, xx = (i * 10 - 5) + Math.sin(q * .8 + t * 4 + i) * 5; q ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore(); }
function dove(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const fl = Math.sin(t * 12); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(0, 0, 40, 16, -.1, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(36, -8, 11, 0, TAU); ctx.fill(); ctx.fillStyle = '#ffb030'; ctx.beginPath(); ctx.moveTo(46, -8); ctx.lineTo(56, -5); ctx.lineTo(46, -3); ctx.fill(); ctx.fillStyle = '#f0f4f8'; ctx.beginPath(); ctx.moveTo(-6, -6); ctx.quadraticCurveTo(-20, -50 * fl, -40, -60 * fl); ctx.quadraticCurveTo(-10, -20 * fl, 14, -4); ctx.fill(); ctx.fillStyle = '#5a8a3a'; ctx.fillRect(48, -2, 18, 4); ctx.restore(); }
S(T.y2050 - .05, (ctx, t) => {
  const t0 = T.y2050 - .05, k = ease(t, t0, T.y2060, E.sine), kO = ease(t, T.olla - .1, T.olla + .4, E.back), shake = ease(t, T.olla + .8, T.olla + 1.4);
  ctx.save(); cam(ctx, 960, 580, lerp(1.0, 1.06, k));
  ctx.fillStyle = vg(ctx, [[0, '#1e2a44'], [1, '#2e3e5e']]); ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ctx.fillStyle = '#e8e4dc'; rr(ctx, 560, 250, 800, 120, 12); ctx.fill(); text(ctx, 'CUMBRE POR LA PAZ', 960, 296, { size: 54, color: '#1e2a44', ls: 4 }); text(ctx, 'CIUDAD DE MÉXICO · 2050', 960, 344, { size: 24, font: 'Montserrat', weight: 900, color: '#127a45', ls: 8 });
  const day = t < T.tresdias + .3 ? 1 : Math.min(3, 1 + Math.floor((t - T.tresdias - .3) / .45) + 1); ctx.fillStyle = '#f6f2ea'; rr(ctx, 1500, 300, 170, 190, 10); ctx.fill(); ctx.fillStyle = '#c42b33'; ctx.fillRect(1500, 300, 170, 50); text(ctx, 'DÍA', 1585, 326, { size: 30, color: '#fff', ls: 4 }); text(ctx, String(day), 1585, 420, { size: 110, color: '#1e2a44' });
  const xs = V ? [700, 830, 960, 1090, 1220] : [560, 760, 960, 1160, 1360], cols = ['#4a5a7a', '#6a4a3a', '#2a3a5a', '#5a6a4a', '#7a5a6a'];
  xs.forEach((x, i) => { const pose = shake > 0 && (i === 1 || i === 3) ? mixPose(Object.assign({}, POSE.sitFront, { shF: 30, elF: 60 }), Object.assign({}, POSE.sitFront, { shF: 80, elF: 10 }), shake) : Object.assign({}, POSE.sitFront, { shF: 26, elF: 64, head: Math.sin(t + i) * 4 });
    figure(ctx, { x, y: 900, s: 1.0, dir: i < 2 ? 1 : i > 2 ? -1 : 1, pose, face: kO > .5 ? 'happy' : 'neutral', t, seed: 400 + i, shirt: i === 2 ? '#1f4a36' : cols[i], rim: 'rgba(255,230,190,1)', light: [-1, -.8] }); });
  ctx.fillStyle = '#5a3a24'; ctx.fillRect(360, 800, 1200, 40); ctx.fillStyle = '#3a2614'; ctx.fillRect(380, 840, 1160, 260); ctx.fillStyle = '#e8e4dc'; ctx.fillRect(360, 796, 1200, 6);
  if (kO > 0) xs.forEach((x, i) => cafeOlla(ctx, x + 40, 798, kO * (V ? .9 : 1), t + i));
  if (t > T.olla + 1.2) { const kd = prog(t, T.olla + 1.2, T.y2060); dove(ctx, lerp(300, 1700, kd), 420 - Math.sin(kd * PI) * 120, 1.3, t); }
  ctx.restore(); grade(ctx, '#ffd8a0', .08); vignette(ctx, .55);
  stamp2(ctx, ['2050', 'PAZ EN MEDIO ORIENTE'], t, t0 + .15);
  tag(ctx, 'CAFÉ DE OLLA', 960 + 40, 650, t, T.olla + .3, { col: '#ffd23f' });
}, 960);
// ===== D5 · 2060: primer contacto. En plena órbita... un taco al pastor. Con piña. Se quedan. =====
function stationInterior(ctx, t) { ctx.fillStyle = '#d8dde4'; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.fillStyle = '#b8c0ca'; ctx.fillRect(-W, 0, 3 * W, 120); ctx.fillRect(-W, 900, 3 * W, 300); for (let i = 0; i < 8; i++) { ctx.fillStyle = '#aab2be'; ctx.fillRect(i * 280, 120, 8, 780); }
  ctx.save(); ctx.beginPath(); ctx.arc(1460, 430, 210, 0, TAU); ctx.clip(); starfield(ctx, t, 8); earthDraw(ctx, 1560, 640, 260, t); ctx.restore(); ctx.strokeStyle = '#8a929e'; ctx.lineWidth = 26; ctx.beginPath(); ctx.arc(1460, 430, 222, 0, TAU); ctx.stroke(); flagDraw(ctx, 'MEX', 200, 200, 120, 80); text(ctx, 'ESTACIÓN TONATIUH', 420, 236, { size: 30, font: 'Montserrat', weight: 900, color: '#4a5260', ls: 6, align: 'left' }); }
S(T.y2060 - .05, (ctx, t) => {
  const t0 = T.y2060 - .05, tA = T.orbita - .1, tQ = T.quedan - .15;
  if (t < tA) {
    const k = ease(t, t0, tA, E.sine), u = ease(t, T.contacto - .6, T.contacto + .6, E.out);
    ctx.save(); cam(ctx, 960, 540, lerp(1.0, 1.1, k)); starfield(ctx, t, 21); earthDraw(ctx, 960, 1500, 900, t);
    ctx.save(); ctx.translate(760, 430); ctx.fillStyle = '#c8ccd4'; ctx.fillRect(-160, -30, 320, 60); ctx.fillStyle = '#2a4a8a'; [-1, 1].forEach(d => { for (let i = 0; i < 3; i++) ctx.fillRect(d * (190 + i * 70) - 30, -90, 60, 180); }); flagDraw(ctx, 'MEX', -40, -20, 60, 40); ctx.restore();
    ufoDraw(ctx, lerp(2300, 1300, u), lerp(120, 380, u), .9, t);
    ctx.restore(); vignette(ctx, .55);
    stamp2(ctx, ['2060', 'PRIMER CONTACTO'], t, t0 + .2);
  } else if (t < tQ) {
    const k = ease(t, tA, tQ, E.sine), give = ease(t, T.taco - .5, T.taco + .1, E.out), eat = ease(t, T.pina + .7, T.pina + 1.0);
    ctx.save(); cam(ctx, 960, 600, lerp(1.12, 1.2, k)); stationInterior(ctx, t);
    const fl = Math.sin(t * 1.6) * 8;
    const a = figure(ctx, { x: 720, y: 960 + fl, s: 1.2, dir: 1, pose: mixPose(Object.assign({}, POSE.stand, { shF: 30, elF: 60 }), Object.assign({}, POSE.stand, { shF: 88, elF: 8 }), give), face: 'smile', t, seed: 72, shirt: '#f2f2f4', shorts: '#e2e2e8', rim: 'rgba(200,220,255,1)', light: [1, -.6], noShadow: true });
    ponytail(ctx, a, 720, 960 + fl, 1.2, 1); flagDraw(ctx, 'MEX', 720 + 4, 960 + fl - 230 * 1.2, 30, 20);
    const al = alien(ctx, 1220, 960 - fl, 1.2, -1, eat > 0 ? Object.assign({}, POSE.stand, { shF: 40, elF: 110 }) : Object.assign({}, POSE.stand, { shF: 70 * give, elF: 20 }), eat > 0 ? 'happy' : 'shock', t, { noShadow: true });
    const hx = 720 + a.hand[0] * 1.2, hy = 960 + fl + a.hand[1] * 1.2; if (eat < 1) { ctx.fillStyle = '#f6f6f6'; ctx.beginPath(); ctx.ellipse(hx + 20, hy - 6, 50, 10, 0, 0, TAU); ctx.fill(); tacoDraw(ctx, hx + 20, hy - 14, 1.1, ease(t, T.pina - .1, T.pina + .25, E.back)); }
    if (eat > 0) { for (let h = 0; h < 4; h++) { const kh = ((t - T.pina - .7) * .8 + h / 4) % 1; heart(ctx, 1220 - 40 + h * 30, 960 - fl - 380 - kh * 120, 1.4, `rgba(255,74,106,${1 - kh})`); } }
    ctx.restore(); vignette(ctx, .5);
    tag(ctx, 'TACO AL PASTOR', 960 + (900 - 960) * 1.15, 400, t, T.taco + .1, { col: '#ffd23f', out: tQ - .3 });
  } else {
    const k = ease(t, tQ, T.celebrar, E.sine);
    ctx.save(); cam(ctx, 960, 600, lerp(1.05, 1.1, k)); stationInterior(ctx, t);
    ctx.fillStyle = '#c42b33'; rr(ctx, 260, 360, 520, 90, 12); ctx.fill(); text(ctx, 'TAQUERÍA ORBITAL', 520, 406, { size: 52, color: '#fff', ls: 3 });
    ctx.fillStyle = '#8a5a2b'; ctx.fillRect(300, 620, 440, 300); ctx.fillStyle = '#c8501e'; ctx.beginPath(); ctx.moveTo(470, 610); ctx.lineTo(570, 610); ctx.lineTo(540, 470); ctx.lineTo(500, 470); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(520, 462, 18, 0, TAU); ctx.fill();
    const xs = V ? [860, 1010, 1160] : [900, 1110, 1320];
    xs.forEach((x, i) => alien(ctx, x, 960 + Math.sin(t * 1.4 + i) * 6, 1.0 - i * .04, -1, Object.assign({}, POSE.stand, { shB: 20, elB: 40, head: Math.sin(t * 2 + i) * 5 }), 'happy', t, { noShadow: true, seed: 210 + i }));
    ctx.fillStyle = '#5a3a6a'; rr(ctx, xs[2] + 50, 870, 90, 60, 8); ctx.fill(); ctx.fillStyle = '#3a2a4a'; ctx.fillRect(xs[2] + 82, 860, 26, 10);
    ctx.restore(); vignette(ctx, .5);
    tag(ctx, 'SE QUEDAN', 960 + (xs[1] - 960) * 1.08, 420, t, T.quedan + .1, { col: '#7bff6a' });
  }
}, t => (t > T.orbita - .1 && t < T.quedan - .15) ? 980 : (t >= T.quedan - .15 ? (V ? 900 : 960) : 960));
// ===== D6 · ya no es Mundial... es el primer Universal =====
S(T.celebrar - .05, (ctx, t) => {
  const t0 = T.celebrar - .05;
  starfield(ctx, t, 31); glow(ctx, 960, 520, 700, 'rgba(120,80,255,.25)');
  const pl = [[160, '#c96a3f', 28, .9], [250, '#5ab4ff', 36, .6], [340, '#e8c070', 50, .45], [430, '#7bd13a', 30, .35]];
  pl.forEach(([r2, c, s, w], i) => { ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(960, 520, r2 * 1.5, r2 * .42, 0, 0, TAU); ctx.stroke(); const a = t * w + i * 1.7; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(960 + Math.cos(a) * r2 * 1.5, 520 + Math.sin(a) * r2 * .42, s, 0, TAU); ctx.fill(); });
  trophyDraw(ctx, 960, 560, 1.15);
  if (!NOUI) { ctx.save(); uiCenter(ctx, .95);
    const k1 = ease(t, t0 + .1, t0 + .5, E.outQuint), ks = ease(t, T.noMundial + .5, T.noMundial + .8), k2 = ease(t, T.universal - .1, T.universal + .3, E.back);
    if (k1 > 0) { ctx.save(); ctx.globalAlpha = k1 * (1 - .5 * ks); text(ctx, 'COPA MUNDIAL', 960, 190, { size: 96, color: '#fff', ls: 6 }); ctx.restore(); if (ks > 0) { ctx.strokeStyle = P.red; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(660, 196); ctx.lineTo(660 + 600 * ks, 186); ctx.stroke(); } }
    if (k2 > 0) { ctx.save(); ctx.translate(960, 790); ctx.scale(k2, k2); text(ctx, 'COPA UNIVERSAL', 0, 0, { size: 130, color: P.yel, ls: 6, stroke: 9, strokeCol: '#140d08' }); text(ctx, '2060', 0, 90, { size: 52, font: 'Montserrat', weight: 900, color: '#fff', ls: 14 }); ctx.restore(); }
    ctx.restore(); }
  vignette(ctx, .6);
});
// ===== D7 · Final: México contra Andrómeda, minuto 89, 2-2 =====
function dribbleAlien(ctx, t, t0) {
  const pan = (t - t0) * 240, ax = 820 + Math.sin((t - t0) * .9) * 40, dx = 470 + Math.sin((t - t0) * .9 - .8) * 30;
  ctx.save(); cam(ctx, 960, 610, 1.1);
  pitchLevel(ctx, t, { camX: 900 + pan, cheer: .5, crowdBlur: 6 });
  const fd = asAlien(() => pk(ctx, dx, 912, 1.05, KIT.AND, runCycle(runPhase(pan + dx, 1.05, 1.3)), 'determined', 1, t, { acc: { num: '7' } })); antennae(ctx, fd, dx, 912, 1.05, 1);
  pk(ctx, ax, 978, 1.3, KIT.MEX, runCycle(runPhase(pan + ax, 1.3)), 'determined', 1, t, { acc: { num: '10' } });
  ball2(ctx, ax + 120 + Math.abs(Math.sin((t - t0) * 4.6)) * 26, 968, 18, t * 8);
  ctx.restore();
  grassForeground(ctx, t, 900 + pan * 1.3, 9);
}
function planetsSky(ctx, t) { ctx.save(); setBase(ctx); glow(ctx, 1500, 150, 300, 'rgba(200,140,255,.35)'); ctx.fillStyle = '#b07ae8'; ctx.beginPath(); ctx.arc(1500, 150, 90, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(255,230,190,.7)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(1500, 150, 160, 30, -.2, 0, TAU); ctx.stroke(); ctx.fillStyle = '#e9a37a'; ctx.beginPath(); ctx.arc(380, 120, 40, 0, TAU); ctx.fill(); ctx.restore(); }
S(T.finalU - .05, (ctx, t) => {
  const t0 = T.finalU - .05, tD = T.m89 - .1;
  if (t < tD) {
    const k = ease(t, t0, tD, E.sine), [hx, hy] = handheld(t, 3, 77);
    ctx.save(); cam(ctx, 960 + hx, 560 + hy, lerp(1.0, 1.1, k)); stadiumWide2(ctx, t + 120, { sky: 'night', kitB: KIT.AND }); ctx.restore();
    planetsSky(ctx, t); fansForeground(ctx, t, { cheer: .6, blur: 11, flag: true, xs: [-60, 230, 500, 1420, 1690, 1960], y: 1150 });
    grade(ctx, '#6040c0', .14); vignette(ctx, .6);
    stamp2(ctx, ['FINAL · COPA UNIVERSAL 2060', 'MÉXICO VS ANDRÓMEDA'], t, t0 + .1, { gaps: [0, T.andromeda - t0 - .1] });
  } else {
    dribbleAlien(ctx, t, tD); grade(ctx, '#3a2a7a', .16); vignette(ctx, .7);
    scoreBug2(ctx, { a: 'MEX', b: 'AND', s1: 2, s2: 2, min: "89'", c2: '#6a2bb8' });
  }
}, t => t < T.m89 - .1 ? 960 : 760);
// ===== D8 · Disparo... poste... ¡y adentro! (el mismo poste, con su placa de 2026) =====
function postePlaque(ctx, t) { ctx.save(); setBase(ctx); ctx.translate(78, 600); const g = ctx.createLinearGradient(-70, -40, 70, 40); g.addColorStop(0, '#8a5a24'); g.addColorStop(.5, '#f0c878'); g.addColorStop(1, '#7a4a1c'); ctx.fillStyle = g; rr(ctx, -70, -44, 140, 88, 8); ctx.fill(); ctx.strokeStyle = '#5a3a14'; ctx.lineWidth = 3; rr(ctx, -62, -36, 124, 72, 5); ctx.stroke(); text(ctx, '05·07·2026', 0, -16, { size: 13, font: 'Montserrat', weight: 900, color: '#4a2c0c', ls: 2 }); text(ctx, '¿Y SI SÍ?', 0, 12, { size: 30, color: '#3a2008', ls: 2 }); ctx.restore(); }
S(T.disparo2 - .3, (ctx, t) => {
  const t0 = T.disparo2 + .1, tp = T.poste3 + .2, tin = T.adentro2 + .05;
  const old = KIT.ENG.gk, kd0 = keeperDraw; KIT.ENG.gk = KIT.AND.gk; keeperDraw = (c, tt, t1, o) => asAlien(() => kd0(c, tt, t1, o));
  try { postGoalPOV(ctx, t, { t0, tp, tin }); } finally { KIT.ENG.gk = old; keeperDraw = kd0; }
  postePlaque(ctx, t); if (t > tp - .05 && t < tp + .4) glow(ctx, 90, 600, 200, `rgba(255,230,160,${.9 * (1 - prog(t, tp, tp + .4))})`);
  grade(ctx, '#7050ff', .08); vignette(ctx, .55);
  scoreBug2(ctx, { a: 'MEX', b: 'AND', s1: t > tin ? 3 : 2, s2: 2, min: "89'", c2: '#6a2bb8', flash: t > tin });
  if (t > tin + .05) bigTitle(ctx, '¡GOL!', t, tin + .05, { y: 310, size: 230 });
}, t => { const k = ease(t, T.poste3 - .5, T.poste3 + .1, E.inOut); return lerp(760, 400, k * (1 - ease(t, T.adentro2 + .2, T.adentro2 + .8, E.inOut))) + 0; });
// ===== D9 · el estadio brinca... y lo registran los sismógrafos de Marte =====
function seismoMars(ctx, t, tHit) {
  seismo(ctx, t, tHit, { label: 'SISMÓGRAFO · MARTE', bgFn: c => { c.fillStyle = vg(c, [[0, '#3a1a20'], [.6, '#a8482a'], [1, '#c96a3f']], 0, 1080); c.fillRect(-W, -H, 3 * W, 3 * H); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-W, -H, 3 * W, 3 * H); } });
}
S(T.brinca2 - .1, (ctx, t) => {
  if (t < T.sismoM - .25) {
    const [sx, sy] = shakeV(t, 14); ctx.save(); ctx.translate(sx, sy); cam(ctx, 960, 560, 1.08); stadiumWide2(ctx, t + 123, { sky: 'night', kitB: KIT.AND }); ctx.restore();
    planetsSky(ctx, t); fireworks(ctx, t, 5, 3, [100, 100, 1700, 300]);
    fansForeground(ctx, t, { cheer: 1.6, blur: 9, flag: true, xs: [-60, 230, 500, 760, 1180, 1420, 1690, 1960], y: 1150 });
    confetti(ctx, t, T.brinca2, 80, 5); grade(ctx, '#ffb070', .12); vignette(ctx, .55);
  } else seismoMars(ctx, t, T.sismoM + .15);
}, t => t < T.sismoM - .25 ? 960 : 1250);
// ===== D10 · ¿Y si sí? (fin) =====
S(T.ysisiF - .08, (ctx, t) => {
  const t0 = T.ysisiF - .08;
  ctx.fillStyle = '#0d0d0f'; ctx.fillRect(-W, -H, 3 * W, 3 * H); starfield(ctx, t, 44); ctx.fillStyle = 'rgba(13,13,15,.55)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  glow(ctx, 960, 520, 900, 'rgba(239,233,223,.07)'); endCard3(ctx, t, t0, {});
  ctx.save(); ctx.fillStyle = `rgba(0,0,0,${prog(t, window.DUR_EP - .8, window.DUR_EP)})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore();
  vignette(ctx, .6);
});
