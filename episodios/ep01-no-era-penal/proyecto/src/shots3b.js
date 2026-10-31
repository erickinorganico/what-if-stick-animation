// Tomas v3 · parte B (96.7–127.3 s): la final en el Maracaná contra Alemania
// ---------- piezas ----------
function fireworks(ctx, t, n, seed, area = [200, 120, 1520, 420]) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const per = 1.6 + hash(i + seed) * 1.2, ph = (t + hash(i * 3 + seed) * per) % per / per, cyc = Math.floor((t + hash(i * 3 + seed) * per) / per), r = rnd(i * 31 + cyc * 7 + seed);
    const cx = area[0] + r() * area[2], cy = area[1] + r() * area[3], col = ['255,210,90', '120,230,150', '255,110,110', '255,255,255'][Math.floor(r() * 4)], R = 120 + r() * 120;
    if (ph < .12) { ctx.fillStyle = `rgba(${col},.8)`; ctx.beginPath(); ctx.arc(cx, cy + (1 - ph / .12) * 300, 3, 0, TAU); ctx.fill(); continue; }
    const k = (ph - .12) / .88, rad = R * E.out(k);
    for (let j = 0; j < 26; j++) { const a = j / 26 * TAU + r() * .1, px = cx + Math.cos(a) * rad, py = cy + Math.sin(a) * rad + k * k * 60; ctx.globalAlpha = (1 - k) * .9; ctx.fillStyle = `rgba(${col},1)`; ctx.beginPath(); ctx.arc(px, py, 3.2 * (1 - k * .5), 0, TAU); ctx.fill(); }
    if (k < .2) glow(ctx, cx, cy, 220, `rgba(${col},.5)`, 1 - k * 5); }
  ctx.restore();
}
function confetti(ctx, t, t0, n = 90, seed = 3) { const r = rnd(seed); ctx.save(); for (let i = 0; i < n; i++) { const x = r() * W + Math.sin(t * 2 + i) * 40, y = (r() * H * 1.5 + (t - t0) * (240 + r() * 200)) % (H + 100) - 50, rot = t * (2 + r() * 3) + i; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, Math.abs(Math.sin(rot * 1.3)) + .2); ctx.fillStyle = ['#1f9e57', '#f2eee6', '#d33b44', '#ffcf3f'][i % 4]; ctx.fillRect(-9, -5, 18, 10); ctx.restore(); } ctx.restore(); }
function trophyDraw(ctx, x, y, s) { // copa genérica dorada (asas, copa, tallo y base)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  glow(ctx, 0, -40, 220, 'rgba(255,210,90,.55)');
  const g = ctx.createLinearGradient(-60, 0, 60, 0); g.addColorStop(0, '#8a5a12'); g.addColorStop(.35, '#ffe08a'); g.addColorStop(.6, '#f2b632'); g.addColorStop(1, '#7a4a0c');
  ctx.fillStyle = '#1d5a35'; rr(ctx, -46, 40, 92, 26, 6); ctx.fill(); ctx.fillStyle = g; rr(ctx, -54, 62, 108, 16, 5); ctx.fill(); rr(ctx, -40, 30, 80, 12, 4); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-14, 30); ctx.lineTo(-10, -20); ctx.lineTo(10, -20); ctx.lineTo(14, 30); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-62, -120); ctx.quadraticCurveTo(-64, -30, 0, -18); ctx.quadraticCurveTo(64, -30, 62, -120); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = g; ctx.lineWidth = 11; ctx.beginPath(); ctx.arc(-66, -88, 26, PI * .5, PI * 1.5); ctx.stroke(); ctx.beginPath(); ctx.arc(66, -88, 26, -PI * .5, PI * .5); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.ellipse(-26, -84, 8, 26, -.1, 0, TAU); ctx.fill();
  ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.ellipse(0, -120, 62, 10, 0, 0, TAU); ctx.fill();
  ctx.restore();
}
function coinDraw(ctx, x, y, r, spin) {
  const sx = Math.cos(spin), edge = Math.abs(sx) < .12;
  ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(.06, Math.abs(sx)), 1);
  ctx.fillStyle = '#7a6a3a'; ctx.beginPath(); ctx.arc(4, 4, r, 0, TAU); ctx.fill();
  const g = ctx.createRadialGradient(-r * .3, -r * .3, r * .1, 0, 0, r); g.addColorStop(0, '#fff2b0'); g.addColorStop(.7, '#d8b24a'); g.addColorStop(1, '#8a6a1a');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
  const g2 = ctx.createRadialGradient(-r * .2, -r * .2, 2, 0, 0, r * .62); g2.addColorStop(0, '#ffffff'); g2.addColorStop(1, '#9aa0aa'); ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(0, 0, r * .62, 0, TAU); ctx.fill();
  if (!edge && sx > 0) text(ctx, '$1', 0, 4, { size: r * .7, font: 'Montserrat', weight: 900, color: '#4a4f58' });
  ctx.restore();
}
function ledBoard(ctx, x, y, w, h, lines) { // marcador de puntos LED
  ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#07080c'; rr(ctx, -w / 2, -h / 2, w, h, 16); ctx.fill(); ctx.strokeStyle = '#2a2d36'; ctx.lineWidth = 6; rr(ctx, -w / 2, -h / 2, w, h, 16); ctx.stroke();
  ctx.save(); ctx.beginPath(); rr(ctx, -w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 10); ctx.clip();
  lines.forEach(([s, yy, size, col]) => { ctx.shadowColor = col; ctx.shadowBlur = 24; text(ctx, s, 0, yy, { size, color: col, ls: 6 }); });
  ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(0,0,0,.55)'; for (let i = -w / 2; i < w / 2; i += 7) ctx.fillRect(i, -h / 2, 2.4, h); for (let j = -h / 2; j < h / 2; j += 7) ctx.fillRect(-w / 2, j, w, 2.4);
  ctx.restore(); ctx.restore();
}
// plaza pública de noche con pantalla gigante (el país de pie)
function plazaBG(night = 1) {
  return layer('plaza', W, H, (x) => {
    x.fillStyle = vg(x, [[0, '#060a1c'], [.55, '#1a1838'], [1, '#3a2240']], 0, 760); x.fillRect(0, 0, W, H);
    const r = rnd(12);
    for (let i = 0; i < 26; i++) { const bw = 60 + r() * 140, bh = 140 + r() * 360, bx = i * 80 - 60 + r() * 30, by = 700 - bh; x.fillStyle = `rgb(${14 + r() * 10},${14 + r() * 10},${26 + r() * 12})`; x.fillRect(bx, by, bw, bh);
      for (let wy = by + 14; wy < 690; wy += 18) for (let wx = bx + 8; wx < bx + bw - 8; wx += 14) if (r() < .32) { x.fillStyle = `rgba(255,${200 + r() * 40},${120 + r() * 60},${.35 + r() * .5})`; x.fillRect(wx, wy, 6, 8); } }
    // columna con ángel dorado
    x.fillStyle = '#1a1a26'; x.fillRect(1530, 250, 46, 470); x.fillRect(1500, 690, 106, 40); x.fillRect(1516, 240, 74, 18);
    x.fillStyle = '#c99a3a'; x.beginPath(); x.moveTo(1553, 150); x.lineTo(1540, 240); x.lineTo(1566, 240); x.closePath(); x.fill(); x.beginPath(); x.ellipse(1530, 190, 34, 10, -.5, 0, TAU); x.fill(); x.beginPath(); x.ellipse(1576, 190, 34, 10, .5, 0, TAU); x.fill(); x.beginPath(); x.arc(1553, 146, 9, 0, TAU); x.fill();
    x.fillStyle = vg(x, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(10,8,20,.9)']], 560, 1080); x.fillRect(0, 560, W, 520);
  });
}
function crowdBacks(ctx, t, o = {}) { // filas de público de espaldas, iluminadas por la pantalla
  const r = rnd(o.seed || 8), rows = o.rows || 6;
  for (let row = 0; row < rows; row++) { const k = row / (rows - 1), y = lerp(o.y0 || 700, o.y1 || 1120, k), sc = lerp(.35, 1.25, k), n = Math.round(lerp(26, 9, k));
    for (let i = 0; i < n; i++) { const x = (i + r() * .6 - .3) / (n - 1) * (W + 200) - 100, ph = r() * TAU, jump = (o.cheer || 0) * Math.max(0, Math.sin(t * (5 + r() * 2) + ph)) * 26 * sc, green = r() < .45;
      const yy = y - jump; ctx.fillStyle = green ? '#0f5a36' : '#0b0b12';
      ctx.beginPath(); ctx.ellipse(x, yy, 62 * sc, 44 * sc, 0, PI, TAU); ctx.lineTo(x + 62 * sc, yy + 200 * sc); ctx.lineTo(x - 62 * sc, yy + 200 * sc); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#0b0b12'; ctx.beginPath(); ctx.arc(x, yy - 66 * sc, 34 * sc, 0, TAU); ctx.fill();
      ctx.strokeStyle = o.rim || 'rgba(150,200,255,.55)'; ctx.lineWidth = 2.5 * sc; ctx.beginPath(); ctx.arc(x, yy - 66 * sc, 34 * sc, PI * 1.1, PI * 1.9); ctx.stroke();
      if (r() < (o.arms ?? .18)) { const up = Math.sin(t * 4 + ph) * .3; ctx.strokeStyle = '#0b0b12'; ctx.lineWidth = 16 * sc; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 40 * sc, yy - 10 * sc); ctx.lineTo(x - 70 * sc, yy - 150 * sc + up * 30); ctx.moveTo(x + 40 * sc, yy - 10 * sc); ctx.lineTo(x + 70 * sc, yy - 150 * sc - up * 30); ctx.stroke(); }
      if (o.phones && r() < .12) { ctx.fillStyle = 'rgba(230,240,255,.9)'; ctx.fillRect(x + 50 * sc, yy - 170 * sc, 10 * sc, 18 * sc); glow(ctx, x + 55 * sc, yy - 160 * sc, 40 * sc, 'rgba(200,220,255,.6)'); }
      if (o.flags && r() < .07) { const fx = x - 20 * sc, fy = yy - 260 * sc; ctx.strokeStyle = '#ccc'; ctx.lineWidth = 4 * sc; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, yy); ctx.stroke(); ['#127a45', '#ece8e0', '#c42b33'].forEach((c, j) => { ctx.fillStyle = c; ctx.beginPath(); for (let q = 0; q <= 8; q++) { const xx = fx + j * 40 * sc + q * 5 * sc, yw = Math.sin(xx * .02 - t * 5) * 8 * sc; q ? ctx.lineTo(xx, fy + yw) : ctx.moveTo(xx, fy + yw); } for (let q = 8; q >= 0; q--) { const xx = fx + j * 40 * sc + q * 5 * sc, yw = Math.sin(xx * .02 - t * 5) * 8 * sc; ctx.lineTo(xx, fy + 80 * sc + yw); } ctx.fill(); }); }
    } }
}
function plaza(ctx, t, o = {}) {
  ctx.drawImage(plazaBG(), 0, 0);
  // pantalla gigante
  const [c, x] = tmp('plazascr'); (o.screen || (q => tvMatch(q, t, { s1: 1, s2: 1, min: "105'" })))(x);
  ctx.fillStyle = '#05060a'; ctx.fillRect(470, 190, 980, 520); ctx.drawImage(c, 490, 205, 940, 490);
  ctx.save(); ctx.globalAlpha = .16; ctx.fillStyle = '#000'; for (let yy = 205; yy < 695; yy += 5) ctx.fillRect(490, yy, 940, 2); ctx.restore();
  glow(ctx, 960, 450, 900, 'rgba(120,180,255,.22)'); ctx.fillStyle = '#15161c'; ctx.fillRect(930, 710, 60, 120);
  crowdBacks(ctx, t, { cheer: o.cheer ?? .6, flags: true, phones: o.phones, seed: o.seed || 8, rim: o.rim });
  haze(ctx, 520, 820, 'rgba(160,190,255,.10)');
}

// ===== 32 · 13 de julio, Maracaná =====
S(T.trece, (ctx, t) => {
  const k = ease(t, T.trece, T.alemania, E.sine), [hx, hy] = handheld(t, 4);
  ctx.save(); cam(ctx, 960 + lerp(-30, 30, k) + hx, 560 + hy, lerp(1.0, 1.12, k));
  stadiumWide2(ctx, t + 80, { sky: 'night', kitB: KIT.GER });
  ctx.restore();
  fireworks(ctx, t, 3, 5, [100, 140, 1700, 160]);
  fansForeground(ctx, t, { cheer: .6, blur: 11, flag: false, xs: [-60, 230, 500, 1420, 1690, 1960], y: 1150 });
  grade(ctx, '#3a5aa0', .1); vignette(ctx, .6);
  stamp2(ctx, ['13 · 07 · 2014', 'ESTADIO MARACANÁ', 'FINAL DEL MUNDIAL'], t, T.trece + .05, { gaps: [0, T.maracana - T.trece, T.maracana - T.trece + .8] });
  ctx.save(); ctx.fillStyle = `rgba(0,0,0,${1 - prog(t, T.trece, T.trece + .5)})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore();
}, t => { const k = ease(t, T.trece, T.alemania, E.sine), cx = 960 + lerp(-30, 30, k), z = lerp(1.0, 1.12, k), b = ballSmooth(simT(t + 80)); return W / 2 + (proj(b[0], b[1])[0] - cx) * z; });
// ===== 33 · salen los equipos: México contra Alemania =====
S(T.alemania - .3, (ctx, t) => {
  const t0 = T.alemania - .3, sp = 120, dist = (t - t0) * sp, camx = 900 + dist * .9;
  ctx.save(); cam(ctx, camx, 590, 1.12);
  pitchLevel(ctx, t, { camX: camx * 1.4, cheer: .5, crowdBlur: 6 });
  for (let i = 0; i < 5; i++) { const x = 420 + i * 340 + dist; pk(ctx, x - 170, 885, .86, KIT.GER, walkCycle(runPhase(dist, .95, i * 1.3, 'walk')), 'determined', 1, t, { acc: { num: ['1', '16', '5', '20', '7', '13'][i] } }); }
  for (let i = 0; i < 5; i++) { const x = 420 + i * 340 + dist; pk(ctx, x, 975, 1.1, KIT.MEX, walkCycle(runPhase(dist, 1.1, i * 1.7, 'walk')), 'determined', 1, t, { acc: { num: ['4', '3', '7', '10', '14', '18'][i] } }); }
  ctx.restore();
  grade(ctx, '#3a5aa0', .14); vignette(ctx, .65);
  tag(ctx, 'ALEMANIA', 960 + (420 + 2 * 340 - 170 + dist - camx) * 1.12, 540, t, T.alemania + .1, { col: '#ffffff', out: T.siete - .4 });
  tag(ctx, 'MÉXICO', 960 + (420 + 2 * 340 + dist - camx) * 1.12, 560, t, T.alemania + .5, { out: T.siete - .4 });
}, 1000);
// ===== 34 · el 7-1 a Brasil =====
S(T.siete - .35, (ctx, t) => {
  darkStadiumBG(ctx, t, 'sietebg', KIT.GER);
  const k = ease(t, T.siete - .3, T.siete + .2, E.back);
  ctx.save(); uiCenter(ctx, .9); ctx.translate(960, 560); ctx.scale(k, k); ctx.translate(-960, -560);
  ledBoard(ctx, 960, 560, 1100, 420, [['BRASIL', -120, 70, '#ffb84a'], ['1 - 7', 30, 200, '#ffd25a'], ['ALEMANIA', 168, 70, '#ffb84a']]);
  ctx.restore();
  uiText(ctx, 'SEMIFINAL · 8 DE JULIO', uxC(960), uyC(850), { size: 26, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.6)', ls: 8, alpha: ease(t, T.siete, T.siete + .4) });
  const [sx, sy] = shakeV(t, 8 * (1 - prog(t, T.siete, T.siete + .5))); ctx.translate(sx, sy);
  vignette(ctx, .75);
});
// ===== 35 · nadie da un peso por México =====
S(T.nadie, (ctx, t) => {
  darkStadiumBG(ctx, t, 'pesobg', KIT.GER);
  const ft = clamp((t - T.nadie) / 1.25), y = lerp(200, 520, E.in(ft)), spin = (t - T.nadie) * 14 * (1 - ft * .6), land = t > T.nadie + 1.25 ? Math.exp(-(t - T.nadie - 1.25) * 4) : 1;
  ctx.save(); uiCenter(ctx, 1);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(960, 580, 120 * (.4 + .6 * ft), 18, 0, 0, TAU); ctx.fill();
  if (ft < 1) coinDraw(ctx, 960, y, 120, spin); else { ctx.save(); ctx.translate(960, 556); ctx.scale(1, .18 + .1 * land * Math.sin((t - T.nadie) * 30)); coinDraw(ctx, 0, 0, 120, 0); ctx.restore(); }
  text(ctx, 'NADIE DA UN PESO', 960, 730, { size: 96, color: '#fff', ls: 4, alpha: ease(t, T.nadie + .2, T.nadie + .6), shadow: 'rgba(0,0,0,.6)' });
  text(ctx, 'POR MÉXICO', 960, 820, { size: 60, color: P.yel, ls: 6, alpha: ease(t, T.nadie + .5, T.nadie + .9) });
  ctx.restore();
  vignette(ctx, .75);
});
// ===== 36 · minuto 80: Alemania 1, México 0 =====
S(T.m80, (ctx, t) => {
  const [hx, hy] = handheld(t, 4, 2), dist = (t - T.m80) * 260, pan = dist * .6;
  ctx.save(); cam(ctx, 960 + hx, 600 + hy, 1.1);
  pitchLevel(ctx, t, { camX: 2400 + pan, cheer: .2 });
  pk(ctx, 1700 - pan, 905, 1.0, KIT.MEX.gk, Object.assign({}, POSE.sit, { head: 14, lean: 10 }), 'sad', -1, t, { acc: { gloves: '#e9f255' } });
  const run = runCycle(runPhase(dist, 1.45)), air = Object.assign({}, run, { shB: POSE.airplane.shB, elB: 6, shF: POSE.airplane.shF, elF: 6, lean: 8 });
  pk(ctx, 500 + dist - pan, 975, 1.45, KIT.GER, air, 'shout', 1, t, { acc: { num: '13' } });
  pk(ctx, 640 - pan, 915, 1.05, KIT.MEX, POSE.handsHead, 'sad', 1, t, { acc: { num: '3' } });
  ctx.restore();
  grassForeground(ctx, t, 2400 + pan * 1.3, 9);
  grade(ctx, '#3a5aa0', .18); grade(ctx, '#808080', .25, 'saturation'); vignette(ctx, .7);
  scoreBug2(ctx, { a: 'MEX', b: 'ALE', s1: 0, s2: t > T.ale1 ? 1 : 0, min: "80'", c2: '#f2f2f2', flash: t > T.ale1 && t < T.ale1 + 1.4 });
}, t => { const d = (t - T.m80) * 260; return 960 + (500 + d * .4 - 960) * 1.1 + 150; });
// ===== 37 · minuto 89: centro... remate... =====
S(T.m89, (ctx, t) => {
  const [hx, hy] = handheld(t, 4, 5), C = T.centro, R = T.remate;
  const pan = ease(t, T.m89, R, E.inOut);
  ctx.save(); cam(ctx, lerp(1250, 920, pan) + hx, 600 + hy, lerp(1.08, 1.16, pan));
  pitchLevel(ctx, t, { camX: 3000 - pan * 400, cheer: .4 });
  // extremo: conduce por la derecha y manda el centro
  const wd = clamp((t - T.m89) / (C - T.m89)) * 360, wx = 1150 + wd;
  pk(ctx, wx, 960, 1.25, KIT.MEX, t < C - .15 ? runCycle(runPhase(wd, 1.25)) : mixPose(POSE.kick, POSE.stand, ease(t, C + .2, C + .9)), 'determined', 1, t, { acc: { num: '22' } });
  // defensa alemán (atrás) que salta tarde
  const jd = jumpArc(t, R - .2, R + .05, R + .4, 60);
  pk(ctx, 1200, 885, .98, KIT.GER, crouchOf(t < R - .2 ? POSE.ready : mixPose(POSE.ready, HEAD.air, E.out(clamp((t - R + .2) / .3))), jd.crouch), 'shock', -1, t, { jump: jd.y * .98, squash: jd.sq, acc: { num: '5' } });
  // delantero: entra y remata de volea
  const sd = clamp((t - T.m89) / (R - .25 - T.m89)) * 300, sx = 470 + sd, js = jumpArc(t, R - .25, R, R + .35, 70);
  const kickP = Object.assign({}, POSE.kick, { lean: -24, hipF: 95, knF: -4, hipB: -10, knB: -40 });
  pk(ctx, sx, 985, 1.35, KIT.MEX, t < R - .25 ? runCycle(runPhase(sd, 1.35)) : crouchOf(mixPose(POSE.kick, kickP, E.out(clamp((t - R + .25) / .25))), js.crouch), t > R ? 'shout' : 'determined', 1, t, { jump: js.y * 1.35, squash: js.sq, acc: { num: '14' } });
  // balón
  const footR = [sx + 120, 985 - 160 - js.y * 1.35];
  if (t < C) ball2(ctx, wx + 70, 948, 17, t * 12);
  else if (t < R) { const kb = prog(t, C, R); ball2(ctx, lerp(wx + 70, footR[0], kb), lerp(948, footR[1], kb) - Math.sin(kb * PI) * 300, 17, t * 12, -10, -4); }
  else { const kb = prog(t, R, R + .5); ball2(ctx, lerp(footR[0], -400, kb), lerp(footR[1], 700, kb), 17, t * 30, -30, 0); }
  ctx.restore();
  grassForeground(ctx, t, 3000, 9);
  grade(ctx, '#3a5aa0', .14); vignette(ctx, .7);
  scoreBug2(ctx, { a: 'MEX', b: 'ALE', s1: 0, s2: 1, min: "89'", c2: '#f2f2f2' });
}, t => t < T.centro ? 1250 : 980);
// ===== 38 · ¡gol! uno a uno =====
S(T.gol89 - .13, (ctx, t) => {
  const t0 = T.gol89 - .25;
  penaltyPOV(ctx, t, t0, { keeper: KIT.GER.gk, shooter: KIT.MEX, side: 1, tx: 640, ty: 430, dur: .3, shX: -420, camX: 1400 });
  grade(ctx, '#ffb070', .1); vignette(ctx, .55);
  scoreBug2(ctx, { a: 'MEX', b: 'ALE', s1: t > t0 + .3 ? 1 : 0, s2: 1, min: "89'", c2: '#f2f2f2', flash: t > T.unoUno - .2 });
  if (t > t0 + .32) bigTitle(ctx, '¡GOL!', t, t0 + .32, { y: 310, size: 230 });
  if (t > T.unoUno - .1) uiText(ctx, '1 - 1', uxC(960), uyC(470), { size: 120, color: '#fff', ls: 6, alpha: ease(t, T.unoUno - .1, T.unoUno + .2), shadow: 'rgba(0,0,0,.7)', blur: 20 });
}, 860);
// ===== 39 · tiempo extra otra vez =====
S(T.extra, (ctx, t) => {
  darkStadiumBG(ctx, t + 80, 'extrabg', KIT.GER);
  const k = ease(t, T.extra, T.extra + .4, E.back);
  ctx.save(); uiCenter(ctx, .95); ctx.translate(960, 520); ctx.scale(k, k); ctx.translate(-960, -520);
  glow(ctx, 960, 520, 500, 'rgba(255,210,63,.25)');
  text(ctx, 'TIEMPO EXTRA', 960, 470, { size: 170, color: P.yel, ls: 4, stroke: 10, strokeCol: '#140d08' });
  text(ctx, 'OTRA VEZ', 960, 330, { size: 40, font: 'Montserrat', weight: 900, color: '#fff', ls: 14 });
  card(ctx, 960, 650, 420, 90); text(ctx, 'MEX  1 - 1  ALE', 960, 652, { size: 54, color: '#fff', ls: 4 });
  ctx.restore();
  dust(ctx, t, 50, 31, 'rgba(255,230,190,1)', .3, 1.6); vignette(ctx, .7);
});
// ===== 40 · el país entero de pie =====
S(T.pais, (ctx, t) => {
  const k = ease(t, T.pais, T.m118, E.sine), [hx, hy] = handheld(t, 3, 4);
  ctx.save(); cam(ctx, 960 + hx, 560 + hy, lerp(1.0, 1.08, k)); plaza(ctx, t, { cheer: .8 }); ctx.restore();
  grade(ctx, '#3050a0', .12); vignette(ctx, .65);
  stamp2(ctx, ['CIUDAD DE MÉXICO', 'TODO EL PAÍS, DE PIE'], t, T.pais + .1, { y: 820 });
});
// ===== 41 · minuto 118: contragolpe y caño (cámara lenta) =====
const WIDE = { lean: 6, head: -10, shB: 40, elB: 40, shF: 30, elF: 44, hipB: -30, knB: -12, hipF: 34, knF: -16, sit: 0, hipH: 128 };
function counterScene(ctx, t) {
  const t0 = T.m118, P1 = T.piernas, CUT = P1 + .25, vx = 180;
  ctx.save(); cam(ctx, 960, 610, 1.12);
  if (t < CUT) { // conducción y caño: el balón pasa entre las piernas; el atacante aún no llega al defensa
    const xw = 200 + (t - t0) * vx, off = Math.max(0, xw - 720), X = w => w - off;
    pitchLevel(ctx, t, { camX: 4000 + off, cheer: .3, crowdBlur: 7 });
    const dxw = 1250, dk = ease(t, P1 - 1.2, P1 - .6, E.out), turn = ease(t, P1 + .02, P1 + .25, E.inOut);
    const dPose = mixPose(mixPose(POSE.ready, WIDE, dk), Object.assign({}, WIDE, { head: 22, lean: -6 }), turn);
    const touch = P1 - .7, axT = 200 + (touch - t0) * vx;
    let bxw, by;
    if (t < touch) { bxw = xw + 90 + Math.abs(Math.sin((t - t0) * 4.4)) * 18; by = 967; }
    else if (t < P1) { const k = E.inOut(prog(t, touch, P1)); bxw = lerp(axT + 90, dxw, k); by = lerp(967, 905, k); }
    else { const k = E.out(prog(t, P1, P1 + .6)); bxw = lerp(dxw, dxw + 260, k); by = lerp(905, 930, k); }
    pk(ctx, X(dxw), 925, 1.18, KIT.GER, dPose, turn > .3 ? 'shock' : 'determined', -1, t, { look: turn > .3 ? [6, 4] : [-4, 2], acc: { num: '5' } });
    ball2(ctx, X(bxw), by, 18, (t - t0) * 9, 6, 0);
    pk(ctx, X(xw), 985, 1.3, KIT.MEX, runCycle(runPhase(xw - 200, 1.3)), 'determined', 1, t, { acc: { num: '10' } });
    ctx.restore(); return off;
  }
  // contraplano: ya lo dejó atrás; el defensa gira y persigue de lejos
  const u = t - CUT, off = 3000 + u * 260, ax = 860 + u * 40;
  pitchLevel(ctx, t, { camX: 4000 + off, cheer: .4, crowdBlur: 7 });
  const dxs = 380 + u * 120, tr = ease(t, CUT, CUT + .35, E.out);
  pk(ctx, dxs, 900, 1.0, KIT.GER, mixPose(Object.assign({}, WIDE, { head: 22 }), runCycle(runPhase(u * 380, 1.0)), tr), 'shock', 1, t, { acc: { num: '5' } });
  ball2(ctx, ax + 110 + Math.abs(Math.sin(u * 5)) * 14, 968, 18, t * 9, 6, 0);
  pk(ctx, ax, 985, 1.3, KIT.MEX, runCycle(runPhase(off + u * 40, 1.3)), 'determined', 1, t, { acc: { num: '10' } });
  ctx.restore(); return off;
}
S(T.m118, (ctx, t) => {
  const off = counterScene(ctx, t);
  grassForeground(ctx, t, 4000 + off * 1.3, 9);
  grade(ctx, '#203a6a', .2); grade(ctx, '#808080', .3, 'saturation'); vignette(ctx, .8);
  scoreBug2(ctx, { a: 'MEX', b: 'ALE', s1: 1, s2: 1, min: "118'", c2: '#f2f2f2' });
  if (t > T.piernas - .1 && t < T.piernas + 1.2) { ctx.save(); ui(ctx); const k = ease(t, T.piernas - .1, T.piernas + .2, E.back); ctx.translate(uxC(960), uyC(330)); ctx.scale(k, k); text(ctx, '¡CAÑO!', 0, 0, { size: 130, color: P.yel, ls: 4, stroke: 8, strokeCol: '#140d08', alpha: 1 - prog(t, T.piernas + .9, T.piernas + 1.2) }); ctx.restore(); }
}, t => { if (t >= T.piernas + .25) return 840; const xw = 200 + (t - T.m118) * 180, off = Math.max(0, xw - 720); return 960 + (xw - off + 240 - 960) * 1.12; });
// ===== 42 · ¡gooool! =====
S(T.gooool - .42, (ctx, t) => {
  const t0 = T.gooool - .35;
  penaltyPOV(ctx, t, t0, { keeper: KIT.GER.gk, shooter: KIT.MEX, side: -1, tx: 1300, ty: 460, dur: .32, shX: -200, camX: 2000 });
  grade(ctx, '#ffb070', .12); vignette(ctx, .55);
  scoreBug2(ctx, { a: 'MEX', b: 'ALE', s1: t > t0 + .32 ? 2 : 1, s2: 1, min: "118'", c2: '#f2f2f2', flash: t > t0 + .32 });
  if (t > t0 + .34) bigTitle(ctx, '¡GOOOOL!', t, t0 + .34, { y: 310, size: 220 });
}, 1100);
// ===== 43 · México, campeón del mundo =====
S(T.campeon - .1, (ctx, t) => {
  const t0 = T.campeon - .1, [hx, hy] = handheld(t, 3, 8), k = ease(t, t0, T.doce2, E.sine);
  ctx.save(); cam(ctx, 960 + hx, 600 + hy, lerp(1.0, 1.1, k));
  blurred(ctx, 'champbg', 9, x => { cam(x, 960, 540, 1.1); stadiumWide2(x, t + 80, { sky: 'night', kitB: KIT.GER }); });
  ctx.fillStyle = 'rgba(5,6,14,.45)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  fireworks(ctx, t, 6, 11, [150, 100, 1620, 300]);
  // escenario y campeones (separados, sin encimarse)
  ctx.fillStyle = '#101218'; rr(ctx, 520, 930, 880, 60, 10); ctx.fill(); ctx.fillStyle = 'rgba(255,210,90,.6)'; ctx.fillRect(520, 930, 880, 4);
  [[640, 1, .95, 0], [820, 1, 1.0, .2], [1100, -1, 1.0, .35], [1280, -1, .95, .1]].forEach(([x, d, s, ph]) => { const h = hop(t, t0 + ph, .55, 40); pk(ctx, x, 930, s, KIT.MEX, crouchOf(mixPose(POSE.cheer, POSE.fists, .5 + .5 * Math.sin(t * 6 + x)), h.crouch), 'cheer', d, t, { jump: h.y, squash: h.sq, rim: 'rgba(255,220,150,1)' }); });
  const lift = ease(t, t0 + .1, t0 + .7, E.out);
  const cap = pk(ctx, 960, 930, 1.12, KIT.MEX, mixPose(POSE.stand, POSE.lift, lift), 'cheer', 1, t, { rim: 'rgba(255,220,150,1)', acc: { num: '4' } });
  const hx2 = 960 + (cap.hand[0] + cap.handB[0]) / 2 * 1.12, hy2 = 930 + Math.min(cap.hand[1], cap.handB[1]) * 1.12;
  trophyDraw(ctx, hx2, hy2 - 10, .9);
  ctx.restore();
  confetti(ctx, t, t0, 120, 7);
  grade(ctx, '#ffb060', .14); vignette(ctx, .55);
  const kt = ease(t, T.campeon + .2, T.campeon + .7, E.outQuint);
  if (kt > 0 && !NOUI) { ctx.save(); uiCenter(ctx, .95); ctx.globalAlpha = kt; text(ctx, 'MÉXICO', 960, 230 + (1 - kt) * 30, { size: 120, color: '#fff', ls: 8, shadow: 'rgba(0,0,0,.7)', blur: 24 }); text(ctx, '★ CAMPEÓN DEL MUNDO ★', 960, 330 + (1 - kt) * 30, { size: 64, color: P.gold, ls: 6, shadow: 'rgba(0,0,0,.7)', blur: 20 }); ctx.restore(); }
});
