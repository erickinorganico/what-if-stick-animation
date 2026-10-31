// Tomas v3 · parte C (127.3–180.7 s): lo imposible, la escuela, el árbitro, la generación, 2026, la realidad, ¿y si sí?
// ---------- escenarios ----------
function schoolBG() {
  return layer('school', W, H, (x) => {
    x.fillStyle = vg(x, [[0, '#5aa6e0'], [.6, '#a8d4f0'], [1, '#e8f2f4']], 0, 620); x.fillRect(0, 0, W, H);
    glow(x, 1650, 120, 500, 'rgba(255,240,200,.6)');
    // árboles al fondo
    const r = rnd(4); for (let i = 0; i < 9; i++) { const tx = i * 240 + r() * 80; x.fillStyle = '#2f6b3a'; x.beginPath(); x.arc(tx, 430 - r() * 40, 90 + r() * 40, 0, TAU); x.fill(); }
    // edificio de la escuela
    x.fillStyle = '#efe2c4'; x.fillRect(180, 250, 1560, 380); x.fillStyle = '#c9b48a'; x.fillRect(180, 250, 1560, 26); x.fillRect(180, 430, 1560, 14);
    for (let fl = 0; fl < 2; fl++) for (let i = 0; i < 12; i++) { const wx = 240 + i * 124, wy = 300 + fl * 170; x.fillStyle = '#3d6f99'; x.fillRect(wx, wy, 80, 100); x.fillStyle = 'rgba(255,255,255,.35)'; x.fillRect(wx + 6, wy + 6, 22, 88); x.fillStyle = '#e9dcbc'; x.fillRect(wx + 38, wy, 4, 100); }
    x.fillStyle = '#7a4a2a'; x.fillRect(900, 500, 120, 130);
    x.fillStyle = '#1e5a8a'; rr(x, 760, 200, 400, 62, 10); x.fill(); text(x, 'ESC. PRIMARIA', 960, 232, { size: 44, color: '#fff', ls: 6 });
    // asta con bandera
    x.fillStyle = '#ddd'; x.fillRect(1820, 120, 8, 520); ['#127a45', '#ece8e0', '#c42b33'].forEach((c, j) => { x.fillStyle = c; x.fillRect(1828 + j * 46, 130, 46, 96); });
    // patio de concreto con líneas pintadas
    x.fillStyle = vg(x, [[0, '#b9b4aa'], [1, '#8f8a80']], 630, 1080); x.fillRect(0, 630, W, 450);
    x.strokeStyle = 'rgba(255,215,60,.85)'; x.lineWidth = 5; x.beginPath(); x.moveTo(-200, 1080); x.lineTo(360, 660); x.lineTo(1560, 660); x.lineTo(2120, 1080); x.stroke(); x.beginPath(); x.moveTo(960, 660); x.lineTo(960, 1080); x.stroke(); x.beginPath(); x.ellipse(960, 820, 220, 70, 0, 0, TAU); x.stroke();
    x.fillStyle = 'rgba(0,0,0,.08)'; for (let i = 0; i < 400; i++) { x.fillRect(r() * W, 640 + r() * 440, 3, 2); }
  });
}
function standsBG() { // grada del estadio vista desde la cancha (gente sentada)
  return layer('stands26', W, H, (x) => {
    x.fillStyle = '#1c2230'; x.fillRect(0, 0, W, H);
    const r = rnd(26);
    for (let row = 0; row < 9; row++) { const y = 80 + row * 105, sc = .55 + row * .06;
      x.fillStyle = row % 2 ? '#2a3448' : '#253046'; x.fillRect(0, y + 60 * sc, W, 70);
      for (let i = 0; i < 24; i++) { const px = i * 84 + (row % 2) * 42 + r() * 10, col = ['#1f9e57', '#f2eee6', '#d33b44', '#1f9e57', '#2a6fb8'][Math.floor(r() * 5)];
        x.fillStyle = col; rr(x, px - 22 * sc, y + 10 * sc, 44 * sc, 54 * sc, 12 * sc); x.fill(); x.fillStyle = '#121218'; x.beginPath(); x.arc(px, y - 8 * sc, 18 * sc, 0, TAU); x.fill();
        if (r() < .2) { x.strokeStyle = '#121218'; x.lineWidth = 9 * sc; x.lineCap = 'round'; x.beginPath(); x.moveTo(px - 16 * sc, y + 14 * sc); x.lineTo(px - 30 * sc, y - 46 * sc); x.moveTo(px + 16 * sc, y + 14 * sc); x.lineTo(px + 30 * sc, y - 46 * sc); x.stroke(); } } }
    const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(255,230,190,.25)'); g.addColorStop(1, 'rgba(0,0,0,.3)'); x.fillStyle = g; x.fillRect(0, 0, W, H);
  }, 3);
}
function stopwatch(ctx, x, y, r, sec, a = 1) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  ctx.fillStyle = '#c9ced6'; rr(ctx, -26, -r - 60, 52, 40, 8); ctx.fill(); ctx.fillRect(-10, -r - 24, 20, 26);
  ctx.fillStyle = '#0d0f16'; ctx.beginPath(); ctx.arc(0, 0, r + 18, 0, TAU); ctx.fill(); ctx.strokeStyle = '#e8eaee'; ctx.lineWidth = 10; ctx.stroke();
  for (let i = 0; i < 60; i++) { const an = i / 60 * TAU, l = i % 5 ? 14 : 30; ctx.strokeStyle = i % 5 ? 'rgba(255,255,255,.4)' : '#fff'; ctx.lineWidth = i % 5 ? 3 : 6; ctx.beginPath(); ctx.moveTo(Math.sin(an) * (r - l), -Math.cos(an) * (r - l)); ctx.lineTo(Math.sin(an) * r, -Math.cos(an) * r); ctx.stroke(); }
  const an = clamp(sec) * TAU; ctx.fillStyle = 'rgba(255,59,48,.22)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r - 4, -PI / 2, -PI / 2 + an); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#ff3b30'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(an) * (r - 24), -Math.cos(an) * (r - 24)); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 12, 0, TAU); ctx.fill();
  text(ctx, clamp(sec).toFixed(2) + ' s', 0, r * .45, { size: 52, font: 'Montserrat', weight: 900, color: '#fff' });
  ctx.restore();
}
function refScene(ctx, t, t0, grey) { // contrapicado del árbitro marcando penal
  const k = ease(t, t0 + .05, t0 + .3, E.back), [sx, sy] = shakeV(t, 9 * (1 - prog(t, t0, t0 + .6)));
  ctx.save(); ctx.translate(sx, sy); cam(ctx, 960, 560, lerp(1.0, 1.05, prog(t, t0, t0 + 3)));
  ctx.fillStyle = vg(ctx, [[0, '#05070f'], [1, '#141a33']]); ctx.fillRect(-200, -200, W + 400, H + 400);
  floodBank(ctx, 520, 200, 200, t, 1.1); floodBank(ctx, 1480, 160, 200, t, 1.1);
  rays(ctx, 520, 200, 1200, 9, 1.2, 'rgba(255,248,225,.25)', .5, t, 2);
  bokeh(ctx, t, 12, 8, 'rgba(255,240,215,.8)', 20, 60, .35, [0, 0, W, 500]);
  figure(ctx, { x: 960, y: 1480, s: 3.2, dir: 1, pose: mixPose(POSE.whistle, Object.assign({}, POSE.point, { shF: 112, head: -10 }), k), face: 'shout', t, seed: 3, shirt: P.ref, sleeves: 'short', shorts: '#111111', acc: { whistle: k < .5 }, rim: RIM_STADIUM, light: [-.5, -1], noShadow: true });
  ctx.restore();
  if (grey) grade(ctx, '#808080', .85, 'saturation');
}
function famRoomNight(ctx, t, o) { // la sala después: tele apagada, solo tú y tu abuelo en el sofá
  drawRoom(ctx, t);
  crtSide(ctx, t, c => { c.fillStyle = '#05070a'; c.fillRect(0, 0, W, H); });
  ctx.fillStyle = 'rgba(4,6,16,.45)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  fam(ctx, 'kid', 975, 836, 1.12, o.kid, o.kidF, t, { rim: o.rim, look: o.kidLook || [0, 0] });
  seatFronts(ctx);
  fam(ctx, 'abu', 1150, 836, 1.16, o.abu, o.abuF, t, { rim: o.rim, look: [-5, 2] });
}

// ===== 44 · tienes doce años y acabas de ver lo imposible =====
S(T.doce2, (ctx, t) => {
  const k = ease(t, T.doce2, T.escuela, E.sine), [hx, hy] = handheld(t, 1.5, 4);
  ctx.save(); cam(ctx, 960 + hx, 600 + hy, lerp(2.3, 2.6, k));
  drawRoom(ctx, t); crtSide(ctx, t, c => tvMatch(c, t, { s1: 2, s2: 1, min: 'FINAL' }));
  famSeated(ctx, t, { kid: Object.assign({}, POSE.sitFront, { head: -6 }), kidF: t < T.imposible ? 'shock' : 'tender', dad: POSE.sitFrontCheer, dadF: 'cry', tioF: 'cheer', tio: POSE.sitFrontCheer });
  tvGlow(ctx, t, '150,210,255', 1.2 + .3 * noise1(t * 7));
  ctx.restore();
  confetti(ctx, t, T.doce2, 50, 13);
  bokeh(ctx, t, 12, 51, 'rgba(255,220,160,.7)', 30, 90, .25);
  grade(ctx, '#4080c0', .1); vignette(ctx, .75);
}, 960);
// ===== 45 · en la escuela todos quieren ser futbolistas. Tú no. =====
S(T.escuela - .15, (ctx, t) => {
  const t0 = T.escuela - .15, [hx, hy] = handheld(t, 2.5, 2), k = ease(t, t0, T.arbitro2, E.sine);
  ctx.save(); cam(ctx, 960 + hx, 580 + hy, lerp(1.04, 1.1, k));
  ctx.drawImage(schoolBG(), 0, 0);
  const d = (t - t0) * 150;
  [[300, '10', 0], [560, '9', 1.4], [820, '14', 2.6]].forEach(([x0, n, ph], i) => pk(ctx, x0 + d, 860 + i * 6, .72, KIT.MEX, runCycle(runPhase(d, .72, ph)), 'happy', 1, t, { acc: { num: n }, rim: 'rgba(255,245,220,1)', light: [1, -1] }));
  ball2(ctx, 820 + d + 120 + Math.abs(Math.sin(t * 6)) * 20, 850, 13, t * 9);
  const shake = t > T.tuNo ? Math.sin((t - T.tuNo) * 16) * 10 * (1 - prog(t, T.tuNo, T.tuNo + .8)) : 0;
  fam(ctx, 'kid', 1600, 990, 1.25, Object.assign({}, POSE.relaxed, { head: shake }), t > T.tuNo ? 'smug' : 'neutral', t, { dir: -1, look: [-4, 0], rim: 'rgba(255,245,220,1)', light: [1, -1] });
  ctx.restore();
  grade(ctx, '#ffd090', .1); vignette(ctx, .5);
  stamp2(ctx, ['EN LA ESCUELA'], t, T.escuela, {});
  tag(ctx, 'TÚ NO', 960 + (1600 - 960) * 1.08 - 20, 520, t, T.tuNo, { col: '#ffffff' });
}, 1450);
// ===== 46 · tú quieres ser árbitro =====
S(T.arbitro2, (ctx, t) => {
  const [hx, hy] = handheld(t, 2.5, 5), k = ease(t, T.arbitro2, T.segundo, E.sine);
  ctx.save(); cam(ctx, lerp(1120, 1180, k) + hx, 560 + hy, lerp(1.35, 1.45, k));
  ctx.drawImage(schoolBG(), 0, 0);
  [[560, '10', -1], [760, '9', 1]].forEach(([x, n, d]) => pk(ctx, x, 860, .72, KIT.MEX, POSE.relaxed, 'shock', 1, t, { acc: { num: n }, rim: 'rgba(255,245,220,1)', light: [1, -1], look: [5, -2] }));
  const card = ease(t, T.porque - .9, T.porque - .5, E.out);
  const pose = t < T.porque - .9 ? POSE.whistle : mixPose(POSE.whistle, Object.assign({}, POSE.point, { shF: 158, elF: 6, head: -8 }), card);
  const r = figure(ctx, { x: 1300, y: 990, s: 1.1, dir: -1, pose, face: t < T.porque - .9 ? 'determined' : 'smug', t, seed: 12, shirt: P.ref, sleeves: 'short', shorts: '#111111', socks: '#111111', acc: { whistle: t < T.porque - .9 }, rim: 'rgba(255,245,220,1)', light: [1, -1] });
  if (card > .3) { const hx2 = 1300 - r.hand[0] * 1.1, hy2 = 990 + r.hand[1] * 1.1; ctx.save(); ctx.translate(hx2, hy2 - 30); ctx.rotate(.1); ctx.fillStyle = '#ffd400'; rr(ctx, -22, -34, 44, 64, 5); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(-16, -28, 8, 50); ctx.restore(); glow(ctx, hx2, hy2 - 30, 90, 'rgba(255,220,60,.5)'); }
  ctx.restore();
  grade(ctx, '#ffd090', .1); vignette(ctx, .55);
}, 1160);
// ===== 47 · una decisión de un segundo puede cambiar la historia =====
S(T.porque + 1.5, (ctx, t) => {
  const t0 = T.porque + 1.5;
  softScene(ctx, 'ghost2', 6, .5, x => fallScene(x, t, .6 + .03 * Math.sin(t * 2)));
  grade(ctx, '#808080', .9, 'saturation'); ctx.save(); ctx.fillStyle = 'rgba(4,5,10,.55)'; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore();
  const sec = prog(t, T.segundo - .5, T.segundo + .5), ks = ease(t, t0, t0 + .35, E.back);
  ctx.save(); uiCenter(ctx, .9); ctx.translate(960, 500); ctx.scale(ks, ks); stopwatch(ctx, 0, 0, 200, sec); ctx.restore();
  const kh = ease(t, T.historia - .1, T.historia + .4, E.outQuint);
  if (kh > 0) { ctx.save(); uiCenter(ctx, .9); ctx.globalAlpha = kh; text(ctx, 'PUEDE CAMBIAR LA HISTORIA', 960, 800 + (1 - kh) * 30, { size: 84, color: '#fff', ls: 4, shadow: 'rgba(0,0,0,.7)', blur: 20 }); text(ctx, 'DE UN PAÍS', 960, 880 + (1 - kh) * 30, { size: 60, color: P.yel, ls: 8 }); ctx.restore(); }
  vignette(ctx, .8);
});
// ===== 48 · una generación entera crece sin el "casi" =====
S(T.generacion, (ctx, t) => {
  ctx.fillStyle = vg(ctx, [[0, '#0b1020'], [.7, '#16203a'], [1, '#0a0d18']]); ctx.fillRect(-W, -H, 3 * W, 3 * H);
  glow(ctx, 960, 820, 900, 'rgba(60,140,100,.35)'); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(-W, 800, 3 * W, 3);
  rays(ctx, 960, -80, 1200, 7, .6, 'rgba(255,240,215,.14)', .5, t, 7);
  const ages = [['2014', .78, false], ['2018', .9, false], ['2022', 1.0, false], ['2026', 1.08, true]];
  ages.forEach(([yr, s, jersey], i) => { const x = V ? 680 + i * 186 : 480 + i * 320, ti = T.generacion + .2 + i * .45, k = ease(t, ti, ti + .4, E.out); if (k <= 0) return;
    ctx.save(); ctx.globalAlpha = k; figure(ctx, { x, y: 800 + (1 - k) * 20, s: s * 1.05, dir: 1, pose: i === 3 ? mixPose(POSE.relaxed, POSE.hips, .7) : POSE.relaxed, face: i === 3 ? 'smile' : 'neutral', t, seed: 12 + i, shirt: jersey ? P.mex : P.kid, hood: !jersey, sleeves: jersey ? 'short' : 'long', shorts: jersey ? '#ffffff' : null, acc: jersey ? { num: '12' } : {}, rim: 'rgba(160,230,190,1)', light: [-1, -.6] });
    ctx.restore(); text(ctx, yr, x, 850, { size: 40, color: i === 3 ? P.yel : 'rgba(255,255,255,.7)', ls: 4, alpha: k }); });
  ctx.save(); uiCenter(ctx, V ? 1.3 : .95); if (V) ctx.translate(0, 60);
  const k1 = ease(t, T.generacion, T.generacion + .5, E.out);
  text(ctx, 'UNA GENERACIÓN SIN EL', 960, 230, { size: 64, color: '#fff', ls: 4, alpha: k1 });
  const kc = ease(t, T.casi - .3, T.casi + .1, E.out); text(ctx, '“CASI”', 960, 330, { size: 110, color: P.yel, ls: 6, alpha: kc });
  const ks = ease(t, T.casi + .1, T.casi + .4, E.outQuint); if (ks > 0) { ctx.strokeStyle = '#ff3b30'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.shadowColor = 'rgba(255,40,30,.6)'; ctx.shadowBlur = 18; ctx.beginPath(); ctx.moveTo(800, 350); ctx.lineTo(lerp(800, 1120, ks), lerp(350, 300, ks)); ctx.stroke(); }
  ctx.restore();
  vignette(ctx, .7);
});
// ===== 49 · 2026: México llega a su Mundial en casa como campeón =====
const KIT_OPP = { shirt: '#f4f4f4', shorts: '#1d3f8a', socks: '#f4f4f4', numCol: '#1d3f8a', gk: { shirt: '#6a3ab0', shorts: '#6a3ab0', socks: '#6a3ab0' } };
S(T.y2026, (ctx, t) => {
  const k = ease(t, T.y2026, T.baston, E.sine), [hx, hy] = handheld(t, 4, 3);
  ctx.save(); cam(ctx, 960 + lerp(-40, 40, k) + hx, 560 + hy, lerp(1.0, 1.12, k));
  stadiumWide2(ctx, t + 120, { sky: 'dusk', kitB: KIT_OPP });
  ctx.restore();
  fansForeground(ctx, t, { cheer: .7, blur: 11, flag: false, xs: [-60, 230, 500, 1420, 1690, 1960], y: 1150 });
  grade(ctx, '#ffb070', .14); vignette(ctx, .55);
  stamp2(ctx, ['11 · 06 · 2026', 'ESTADIO AZTECA', 'MUNDIAL EN CASA'], t, T.y2026 + .1, { gaps: [0, .6, 1.2], out: T.campeon2 - .4 });
  const kb = ease(t, T.campeon2 - .1, T.campeon2 + .35, E.back);
  if (kb > 0) { ctx.save(); ui(ctx); ctx.translate(uxC(960), uyC(330)); ctx.scale(kb, kb); glow(ctx, 0, 0, 420, 'rgba(255,200,80,.4)'); card(ctx, 0, 0, 760, 150, { stroke: P.gold, lw: 5, fill: 'rgba(14,12,6,.85)' }); text(ctx, '★', -300, 2, { size: 90, font: 'Montserrat', weight: 900, color: P.gold }); text(ctx, 'CAMPEÓN DEL MUNDO', 40, -16, { size: 60, color: P.gold, ls: 4 }); text(ctx, 'LLEGA COMO MONARCA · 2014', 40, 40, { size: 22, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.7)', ls: 6 }); ctx.restore(); }
}, t => { const k = ease(t, T.y2026, T.baston, E.sine), cx = 960 + lerp(-40, 40, k), z = lerp(1.0, 1.12, k), b = ballSmooth(simT(t + 120)); return W / 2 + (proj(b[0], b[1])[0] - cx) * z; });
// ===== 50 · tu abuelo, ya con bastón, en la tribuna =====
S(T.baston, (ctx, t) => {
  const k = ease(t, T.baston, T.peroEse, E.sine), [hx, hy] = handheld(t, 2.5, 6);
  ctx.save(); cam(ctx, lerp(1000, 1030, k) + hx, 600 + hy, lerp(1.25, 1.33, k));
  ctx.drawImage(standsBG(), 0, 0);
  ctx.fillStyle = '#20283a'; ctx.fillRect(-W, 760, 3 * W, 400); ctx.fillStyle = '#2c3650'; ctx.fillRect(-W, 760, 3 * W, 14);
  // fila: aficionados, el abuelo con bastón y tú (24 años)
  const fanP = q => mixPose(POSE.cheer, POSE.fists, .5 + .5 * Math.sin(t * 3 + q));
  [[500, P.mex, 1], [740, '#f2eee6', 2], [1500, '#d33b44', 3]].forEach(([x, c, q]) => figure(ctx, { x, y: 900, s: .95, dir: 1, pose: fanP(q), face: 'happy', t, seed: 60 + q, shirt: c, sleeves: 'short', rim: 'rgba(255,230,190,1)', light: [-1, -.8] }));
  const abuP = Object.assign({}, POSE.sitFront, { shF: 30, elF: 34, head: -4 });
  fam(ctx, 'abu', 990, 900, 1.12, abuP, 'tender', t, { dir: 1, look: [4, -3], acc: { mustache: 1, glasses: 1, hairAbu: 1, cane: 1 }, rim: 'rgba(255,230,190,1)', light: [-1, -.8] });
  const hpY = hop(t, T.baston + .4, .6, 26);
  figure(ctx, { x: 1210, y: 900, s: 1.15, dir: -1, pose: crouchOf(mixPose(POSE.cheer, POSE.fists, .5 + .5 * Math.sin(t * 5)), hpY.crouch), face: 'laugh', t, seed: 12, shirt: P.mex, sleeves: 'short', shorts: '#ffffff', acc: { num: '12' }, jump: hpY.y, squash: hpY.sq, rim: 'rgba(255,230,190,1)', light: [-1, -.8] });
  ctx.fillStyle = 'rgba(120,130,150,.9)'; ctx.fillRect(-W, 915, 3 * W, 10); for (let i = -10; i < 30; i++) ctx.fillRect(i * 140, 915, 8, 200);
  ctx.restore();
  grade(ctx, '#ffb070', .12); vignette(ctx, .6);
  tag(ctx, 'TU ABUELO', 960 + (990 - 1015) * 1.29, 430, t, T.baston + .1);
  tag(ctx, 'TÚ · 24 AÑOS', 960 + (1210 - 1015) * 1.29, 360, t, T.baston + .9);
}, 1020);
// ===== 51 · pero ese penal sí se marcó. Perdimos. =====
S(T.peroEse, (ctx, t) => {
  const rw = prog(t, T.peroEse, T.marco - .3);
  if (t < T.marco - .3) {
    fallScene(ctx, t, lerp(.62, 1, E.inOut(rw))); grade(ctx, '#808080', .7, 'saturation');
    const r = rnd(Math.floor(t * 24)); ctx.save(); for (let i = 0; i < 10; i++) { const y = r() * H, h = 2 + r() * 14; ctx.globalAlpha = .25 + r() * .3; ctx.fillStyle = r() > .5 ? '#fff' : '#000'; ctx.fillRect(-W, y, 3 * W, h); } ctx.restore();
    ctx.save(); ui(ctx); ctx.translate(0, uyT(0)); ctx.globalAlpha = .9; ctx.fillStyle = '#fff'; ctx.beginPath(); [0, 1].forEach(i => { ctx.moveTo(110 + i * 46, 190); ctx.lineTo(150 + i * 46, 215); ctx.lineTo(110 + i * 46, 240); }); ctx.fill(); text(ctx, 'LO QUE PASÓ DE VERDAD', 260, 216, { size: 30, font: 'Montserrat', weight: 900, align: 'left', ls: 6 }); ctx.restore();
  } else {
    refScene(ctx, t, T.marco - .3, true);
    bigTitle(ctx, 'PENAL', t, T.marco - .2, { color: '#d0d0d0', y: 300, size: 220, out: T.perdimos - .2 });
    scoreBug2(ctx, { a: 'MEX', b: 'HOL', s1: 1, s2: t > T.perdimos - .2 ? 2 : 1, min: t > T.perdimos - .2 ? 'FINAL' : "90+4'", alpha: 1, c1: '#7a8a80', c2: '#9a8a7a' });
    if (t > T.perdimos - .3) { ctx.save(); ctx.fillStyle = `rgba(0,0,0,${.55 * ease(t, T.perdimos - .3, T.perdimos + .3)})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore(); }
    if (t > T.perdimos - .1) uiText(ctx, 'PERDIMOS.', uxC(960), uyC(560), { size: 150, color: '#e8e8e8', ls: 8, alpha: ease(t, T.perdimos - .1, T.perdimos + .5), shadow: 'rgba(0,0,0,.8)', blur: 30 });
  }
  vignette(ctx, .8);
}, t => t < T.marco - .3 ? 1000 : 1060);
// ===== 52 · doce años después, un país entero dice la misma frase =====
S(T.aunAsi, (ctx, t) => {
  const k = ease(t, T.aunAsi, T.ysisi, E.inOut), [hx, hy] = handheld(t, 2.5, 9);
  ctx.save(); cam(ctx, 960 + hx, 520 + hy, lerp(1.0, 1.22, k));
  plaza(ctx, t, { cheer: .35 + .4 * k, phones: true, seed: 33, rim: 'rgba(255,220,120,.6)', screen: q => { q.fillStyle = vg(q, [[0, '#0b3a24'], [1, '#062014']], 0, H); q.fillRect(0, 0, W, H); ['#127a45', '#ece8e0', '#c42b33'].forEach((c, j) => { q.globalAlpha = .25; q.fillStyle = c; q.fillRect(j * W / 3, 0, W / 3, H); }); q.globalAlpha = 1; const g = ease(t, T.misma, T.ysisi, E.inOut); text(q, '¿Y SI SÍ?', W / 2, H / 2, { size: 300, color: P.yel, ls: 10, alpha: .35 + .65 * g, shadow: 'rgba(255,210,63,.8)', blur: 40 * g }); text(q, 'MUNDIAL 2026', W / 2, H / 2 + 220, { size: 70, font: 'Montserrat', weight: 900, color: '#fff', ls: 20, alpha: .8 }); } });
  ctx.restore();
  grade(ctx, '#ff9a5a', .12); vignette(ctx, .65);
  stamp2(ctx, ['2026', 'DOCE AÑOS DESPUÉS'], t, T.doceDesp - .1, { y: 820, out: T.ysisi - .4 });
});
// ===== 53 · ¿Y SI SÍ? =====
S(T.ysisi - .08, (ctx, t) => {
  const t0 = T.ysisi - .08, k = ease(t, t0, t0 + .35, E.back);
  ctx.fillStyle = '#050508'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  rays(ctx, 960, 540, 1400, 16, TAU, 'rgba(255,210,63,.16)', .6, t, 3);
  glow(ctx, 960, 540, 900 * k, 'rgba(255,190,60,.4)');
  const ring = prog(t, t0 + .05, t0 + .9); ctx.save(); ui(ctx); ctx.strokeStyle = `rgba(255,220,120,${.8 * (1 - ring)})`; ctx.lineWidth = 12 * (1 - ring); ctx.beginPath(); ctx.arc(uxC(960), uyC(540), 120 + ring * 900, 0, TAU); ctx.stroke(); ctx.restore();
  ctx.save(); uiCenter(ctx, .95); ctx.translate(960, 540); const sc = lerp(1.5, 1, k) * (1 + (t - t0) * .03); ctx.scale(sc, sc);
  text(ctx, '¿Y SI SÍ?', 8, 14, { size: 300, color: 'rgba(0,0,0,.6)', ls: 8 }); text(ctx, '¿Y SI SÍ?', 0, 0, { size: 300, color: P.yel, ls: 8, stroke: 12, strokeCol: '#140d08' });
  ctx.restore();
  confetti(ctx, t, t0, 70, 21); flash(ctx, t, t0 + .02, .3, '255,230,150', .7);
  vignette(ctx, .6);
});
// ===== 54 · lo que no perdemos es la esperanza =====
S(T.porqueMex, (ctx, t) => {
  const k = ease(t, T.porqueMex, T.donde, E.sine), [hx, hy] = handheld(t, 1.5, 7), dawn = ease(t, T.esperanza - .6, T.donde, E.inOut);
  ctx.save(); cam(ctx, lerp(1050, 1065, k) + hx, 600 + hy, lerp(2.0, 2.2, k));
  const up = ease(t, T.perder, T.perder + .8, E.inOut);
  famRoomNight(ctx, t, { kid: Object.assign({}, POSE.sitFrontSad, { head: lerp(22, -6, up), lean: lerp(18, 4, up) }), kidF: up > .5 ? 'tender' : 'sad', kidLook: [4, -3 * up], abu: Object.assign({}, POSE.sitFront, { shF: 72, elF: 36, lean: 6 }), abuF: 'tender', rim: dawn > .1 ? `rgba(255,${190 + 30 * dawn},${130 + 40 * dawn},1)` : 'rgba(150,180,255,1)' });
  ctx.restore();
  glow(ctx, 1500, 380, 900, `rgba(255,170,90,${.5 * dawn})`); rays(ctx, 1600, 200, 1500, 8, .9, `rgba(255,200,140,${.25 * dawn})`, .6, t, 4);
  grade(ctx, '#4060a0', .16 * (1 - dawn)); grade(ctx, '#ffa060', .16 * dawn); vignette(ctx, .75);
  const kt = ease(t, T.esperanza - .2, T.esperanza + .4, E.outQuint);
  if (kt > 0) { ctx.save(); uiCenter(ctx, .95); ctx.globalAlpha = kt; text(ctx, 'LO QUE NO PERDEMOS', 960, 250 + (1 - kt) * 25, { size: 80, color: '#fff', ls: 4, shadow: 'rgba(0,0,0,.7)', blur: 20 }); text(ctx, 'ES LA ESPERANZA', 960, 345 + (1 - kt) * 25, { size: 96, color: P.yel, ls: 6, shadow: 'rgba(0,0,0,.7)', blur: 20 }); ctx.restore(); }
}, 1000);
// ===== 55 · ¿dónde estabas tú cuando no era penal? (comentarios y like) =====
function bubble(ctx, x, y, k, t, typed) {
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = '#ffffff'; rr(ctx, -330, -90, 660, 160, 30); ctx.fill(); ctx.beginPath(); ctx.moveTo(-220, 66); ctx.lineTo(-250, 120); ctx.lineTo(-170, 66); ctx.fill();
  ctx.fillStyle = P.mex; ctx.beginPath(); ctx.arc(-260, -10, 42, 0, TAU); ctx.fill(); text(ctx, '¿?', -260, -8, { size: 40, font: 'Montserrat', weight: 900, color: '#fff' });
  const s = 'Yo estaba en la sala con mi abuelo…', n = Math.floor(clamp(typed) * s.length);
  ctx.save(); ctx.font = '800 30px Montserrat'; ctx.fillStyle = '#1a1a22'; ctx.textBaseline = 'middle'; ctx.fillText(s.slice(0, n), -195, -20); if (Math.floor(t * 3) % 2 && typed < 1) { const w = ctx.measureText(s.slice(0, n)).width; ctx.fillRect(-195 + w + 4, -38, 3, 36); } ctx.restore();
  for (let i = 0; i < 3; i++) { ctx.fillStyle = `rgba(30,30,40,${.25 + .5 * Math.max(0, Math.sin(t * 8 - i))})`; ctx.beginPath(); ctx.arc(-180 + i * 26, 34, 8, 0, TAU); ctx.fill(); }
  ctx.restore();
}
function likeBtn(ctx, x, y, k, press, t) {
  ctx.save(); ctx.translate(x, y); const sc = k * (1 - .15 * Math.sin(clamp(press) * PI)); ctx.scale(sc, sc);
  const on = press > .5; if (on) glow(ctx, 0, 0, 260, 'rgba(255,80,90,.45)');
  ctx.fillStyle = on ? '#ff3b4a' : 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.arc(0, 0, 110, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, 50); ctx.bezierCurveTo(-80, -5, -55, -75, 0, -35); ctx.bezierCurveTo(55, -75, 80, -5, 0, 50); ctx.fill();
  if (on) { const b = prog(press, .5, 1); ctx.strokeStyle = `rgba(255,220,120,${1 - b})`; ctx.lineWidth = 6; for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; ctx.beginPath(); ctx.moveTo(Math.cos(a) * (130 + b * 30), Math.sin(a) * (130 + b * 30)); ctx.lineTo(Math.cos(a) * (150 + b * 70), Math.sin(a) * (150 + b * 70)); ctx.stroke(); } }
  ctx.restore();
}
S(T.donde - .1, (ctx, t) => {
  blurred(ctx, 'ctabg', 14, x => { cam(x, 1000, 560, 1.1); drawRoom(x, t); }); ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.66)'; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore();
  glow(ctx, 960, 520, 900, 'rgba(255,190,90,.14)');
  ctx.save(); uiCenter(ctx, .92);
  const k1 = ease(t, T.donde - .1, T.donde + .4, E.outQuint), k2 = ease(t, T.donde + .6, T.donde + 1.1, E.outQuint);
  text(ctx, '¿DÓNDE ESTABAS TÚ', 960, 220 + (1 - k1) * 30, { size: 96, color: '#fff', ls: 4, alpha: k1, shadow: 'rgba(0,0,0,.6)' });
  text(ctx, 'CUANDO NO ERA PENAL?', 960, 330 + (1 - k2) * 30, { size: 96, color: P.yel, ls: 4, alpha: k2, shadow: 'rgba(0,0,0,.6)' });
  const kb = ease(t, T.coment - .1, T.coment + .25, E.back); if (kb > 0) bubble(ctx, V ? 960 : 760, 580, kb, t, prog(t, T.coment + .3, T.duele + .2));
  const kl = ease(t, T.duele - .1, T.duele + .25, E.back); if (kl > 0) likeBtn(ctx, V ? 960 : 1400, V ? 860 : 600, kl, prog(t, T.like, T.like + .5), t);
  ctx.restore();
  vignette(ctx, .7);
});
// ===== 56 · cierre: ¿Y SI SÍ? =====
S(T.ysisi2 - .08, (ctx, t) => {
  const t0 = T.ysisi2 - .08;
  ctx.fillStyle = '#0d0d0f'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  glow(ctx, 960, 520, 900, 'rgba(239,233,223,.07)'); endCard3(ctx, t, t0, { next: '¿Y si México ganaba el Mundial?' });
  ctx.save(); ctx.fillStyle = `rgba(0,0,0,${prog(t, DUR - .7, DUR)})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore();
  vignette(ctx, .6);
});
// ===== encuadre vertical de las tomas de la parte 1 =====
function setVX(t0, fn) { const s = SHOTS.find(q => Math.abs(q.t0 - t0) < 1e-6); if (s) s.vx = fn; }
setVX(0, t => { const k = ease(t, 0, T.conGol + .3, E.sine), z = lerp(1.0, 1.14, k), cx = 960 + lerp(-40, 30, k), b = ballSmooth(simT(t)); return W / 2 + (proj(b[0], b[1])[0] - cx) * z; });
setVX(T.conGol, 860);
setVX(T.m88, t => { const tStop = T.empata - .15, d = t < tStop ? 250 * (t - T.m88) : 250 * (tStop - T.m88); return lerp(960 + (520 + d - 960) * 1.08 + 120, 1080, ease(t, T.empata, T.empata + 1)); });
function fallVX(u) { const cx = lerp(700, 980, E.inOut(u)), z = lerp(1.04, 1.2, E.inOut(u)), ax = u < .6 ? 240 + 867 * u : 760 + 190 * clamp((u - .6) / .4), tgt = u < .5 ? ax + 240 : lerp(ax + 240, (ax + 1400) / 2, smooth01((u - .5) / .15)); return 960 + (tgt - cx) * z; }
setVX(T.m94, t => fallVX(clamp((t - T.robben + .25) / (T.cae + .9 - T.robben + .25))));
setVX(T.pero, t => { const rw = prog(t, T.pero + .05, T.pero + 1.25); return fallVX(rw < 1 ? lerp(1, .52, E.inOut(rw)) : .52); });
setVX(T.doce, t => ease2(t, [[T.doce, 975], [T.papa - .3, 975], [T.papa + .2, 790], [T.tio - .3, 790], [T.tio + .2, 1170], [T.abuelo - .3, 1170], [T.abuelo + .3, 1560], [T.nunca, 1560]]));
setVX(T.nunca, 1180);
setVX(T.grita, t => lerp(1094, 900, ease(t, T.perro - .1, T.perro + .7)));
setVX(T.m113, 1210);
setVX(T.gol113 - .25, 1150);
setVX(T.levanta - .1, t => { const cx = lerp(1300, 1440, ease(t, T.levanta, T.brinca)), z = lerp(1.35, 1.6, ease(t, T.levanta, T.cuartos)); return 960 + (1590 - cx) * z - 60; });
