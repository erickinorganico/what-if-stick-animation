// Tomas v3 · parte A (61–96.7 s): cuartos, penales vs Costa Rica, top 4, papá llora, semifinal, "míralo, mijo", tanda, a la final
// ---------- utilidades comunes ----------
function kitAcc(K, extra) { return Object.assign({}, K.vstripes ? { vstripes: K.vstripes } : {}, K.numCol ? { numCol: K.numCol } : {}, extra || {}); }
function pk(ctx, x, y, s, K, pose, face, dir, t, extra = {}) {
  return figure(ctx, Object.assign({ x, y, s, dir, shirt: K.shirt, sleeves: 'short', shorts: K.shorts, socks: K.socks, pose, face, t, seed: Math.round(y * 7 + x) % 97, rim: RIM_STADIUM, light: [-.6, -1] }, extra, { acc: kitAcc(K, extra.acc) }));
}
const DUMMY = (() => { const c = document.createElement('canvas'); c.width = 4; c.height = 4; return c.getContext('2d'); })();
const ease2 = (t, keys) => { // interpolación de valores por claves [[t, v], ...] con suavizado
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) { const [t0, v0] = keys[i], [t1, v1] = keys[i + 1]; if (t < t1) return lerp(v0, v1, E.inOut((t - t0) / (t1 - t0))); }
  return keys[keys.length - 1][1];
};
function uiText(ctx, s, x, y, o) { if (NOUI) return; ctx.save(); ui(ctx); text(ctx, s, x, y, o); ctx.restore(); }
// marcador de tanda de penales (arriba a la derecha)
function shootoutBug(ctx, a, b, ra, rb) { if (NOUI) return; // ra/rb: arrays con 1 gol, 0 fallo, null pendiente
  ctx.save(); ui(ctx); const x = uxR(1540), y = uyT(172); ctx.translate(x, y); if (V) ctx.scale(1.25, 1.25);
  ctx.fillStyle = 'rgba(10,12,20,.8)'; rr(ctx, 0, 0, 300, 92, 10); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.14)'; ctx.lineWidth = 1.5; rr(ctx, 0, 0, 300, 92, 10); ctx.stroke();
  [[a, ra, 28], [b, rb, 66]].forEach(([nm, r, yy]) => { text(ctx, nm, 46, yy, { size: 22, font: 'Montserrat', weight: 900, color: '#fff', ls: 2 });
    for (let i = 0; i < 5; i++) { const v = r[i], cx = 112 + i * 36; ctx.beginPath(); ctx.arc(cx, yy, 11, 0, TAU); if (v === 1) { ctx.fillStyle = '#2cc47a'; ctx.fill(); } else if (v === 0) { ctx.fillStyle = '#ff4a3a'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 5, yy - 5); ctx.lineTo(cx + 5, yy + 5); ctx.moveTo(cx + 5, yy - 5); ctx.lineTo(cx - 5, yy + 5); ctx.stroke(); } else { ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2.5; ctx.stroke(); } } });
  ctx.restore();
}
// ---------- penal visto desde atrás de la red (gol o atajada) ----------
function keeperT(t, t0, o) {
  const kk = ease(t, t0 + .03, t0 + .5, E.out), side = o.side, sh = t < t0 ? Math.sin(t * 8) * 12 : 0;
  return { kk, side, X: lerp(960 + sh, 960 + side * (o.reach || 400), kk), Y: 820 - Math.sin(kk * PI) * 110, R: D2R(side * 80 * kk) };
}
function keeperDraw(c, t, t0, o) {
  const k = keeperT(t, t0, o), K = o.keeper;
  c.save(); c.translate(k.X, k.Y); c.rotate(k.R);
  const pose = t < t0 ? mixPose(POSE.ready, Object.assign({}, POSE.ready, { shB: 62, shF: 70, elB: 30, elF: 30 }), .5 + .5 * Math.sin(t * 8)) : mixPose(POSE.ready, POSE.dive, k.kk);
  const r = figure(c, { x: 0, y: 90, s: 1.25, dir: k.side, pose, face: k.kk > .3 ? 'shout' : 'determined', t, seed: 77, shirt: K.shirt, shorts: K.shorts, socks: K.socks, acc: { gloves: '#e9f255' }, rim: RIM_STADIUM, light: [-.6, -1], noShadow: true });
  c.restore();
  const hx = r.hand[0] * 1.25 * k.side, hy = r.hand[1] * 1.25 + 90, cr = Math.cos(k.R), sr = Math.sin(k.R);
  return [k.X + hx * cr - hy * sr, k.Y + hx * sr + hy * cr];
}
function penaltyPOV(ctx, t, t0, o) { // o: {keeper, shooter, side, tx, ty, save, dur}
  const hit = t0 + (o.dur || .42), goal = !o.save;
  const [sx, sy] = goal && t > hit ? shakeV(t, 9 * (1 - prog(t, hit, hit + .8))) : [0, 0];
  ctx.save(); ctx.translate(sx, sy); cam(ctx, 960, 560, lerp(1.0, 1.05, prog(t, t0 - 1.2, t0 + 1.5)));
  pitchLevel(ctx, t, { camX: o.camX || 300, cheer: t > hit ? 1 : .25, crowdBlur: 6 });
  // tirador: carrera corta y disparo
  const ap = clamp((t - (t0 - .6)) / .6), shx = 960 + (o.shX || -300) - 170 * (1 - ap);
  pk(ctx, shx, 760, .62, o.shooter, t < t0 ? mixPose(runCycle(runPhase(170 * ap, .62)), POSE.kick, ease(t, t0 - .2, t0)) : (goal && t > hit + .2 ? mixPose(POSE.kick, POSE.cheer, ease(t, hit + .2, hit + .6)) : mixPose(POSE.kick, POSE.stand, ease(t, t0 + .3, t0 + 1))), goal && t > hit ? 'shout' : 'determined', 1, t);
  const glove = keeperDraw(ctx, t, t0, o);
  ctx.restore();
  // balón
  const b0 = [shx + 44, 742];
  if (goal) {
    if (t >= t0 - .02 && t < hit) { const kb = prog(t, t0 - .02, hit), e = kb * kb; ball2(ctx, lerp(b0[0], o.tx, e), lerp(b0[1], o.ty, e) - Math.sin(kb * PI) * 50, lerp(14, 70, e), t * 20, (o.tx - b0[0]) * .02, (o.ty - b0[1]) * .02); }
    netForeground(ctx, t, { bulge: t > hit ? 1.6 * Math.exp(-(t - hit) * 3) * (1 + .3 * Math.sin((t - hit) * 18)) : 0, bx: o.tx, by: o.ty, blur: 1.2, spacing: 110, post: [0, 0, 70, H] });
    if (t > hit) { const kb = prog(t, hit, hit + .6); ball2(ctx, o.tx + (o.tx - 960) * .05 * kb, o.ty + kb * 120, 70 - kb * 6, t * 4); }
    flash(ctx, t, hit, .25, '255,255,255', .6);
  } else {
    const gl = keeperDraw(DUMMY, hit, t0, o);
    if (t >= t0 - .02 && t < hit) { const kb = prog(t, t0 - .02, hit), e = E.in(kb) * .6 + kb * .4; ball2(ctx, lerp(b0[0], gl[0], e), lerp(b0[1], gl[1], e) - Math.sin(kb * PI) * 40, lerp(14, 27, e), t * 20, (gl[0] - b0[0]) * .02, (gl[1] - b0[1]) * .02); }
    else if (t >= hit) { const k2 = prog(t, hit, hit + .9); ball2(ctx, gl[0] + o.side * 700 * E.out(k2), gl[1] - 380 * E.out(k2) + 500 * k2 * k2, 27 + 20 * k2, t * 30, o.side * 14, -8); if (t < hit + .12) { glow(ctx, gl[0], gl[1], 160, 'rgba(255,255,230,.8)'); } }
    netForeground(ctx, t, { bulge: 0, bx: 960, by: 500, blur: 1.2, spacing: 110, post: [0, 0, 70, H] });
  }
}
// ---------- inserto: balón en el manchón penal ----------
function ballSpot(ctx, t, t0, o) {
  const k = prog(t, t0, t0 + 2.2);
  ctx.save(); cam(ctx, 960, 600, lerp(1.0, 1.08, E.out(k)));
  blurred(ctx, 'spotbg', 10, x => { pitchLevel(x, t, { camX: 900, cheer: .2, crowdBlur: 2 });
    x.fillStyle = '#f2f2f4'; x.fillRect(780, 400, 12, 170); x.fillRect(1128, 400, 12, 170); x.fillRect(780, 400, 360, 12);
    x.strokeStyle = 'rgba(230,230,240,.35)'; x.lineWidth = 2; for (let i = 0; i < 14; i++) { x.beginPath(); x.moveTo(790 + i * 25, 412); x.lineTo(800 + i * 25, 568); x.stroke(); }
    pk(x, 960 + Math.sin(t * 3) * 30, 572, .5, o.keeper, mixPose(POSE.ready, Object.assign({}, POSE.ready, { shB: 70, shF: 80 }), .5 + .5 * Math.sin(t * 6)), 'determined', -1, t, { noShadow: true }); });
  // pasto en primer plano (enfocado) y manchón
  const gl = layer('spotGrass', 1920, 600, (x, w, h) => { x.fillStyle = vg(x, [[0, 'rgba(25,90,48,0)'], [.25, '#1d6b3b'], [1, '#14502b']], 0, h); x.fillRect(0, 0, w, h); const r = rnd(5); x.lineCap = 'round';
    for (let i = 0; i < 2600; i++) { const yy = 80 + r() * (h - 80), xx = r() * w, l = 6 + (yy / h) * 26; x.strokeStyle = `rgba(${40 + r() * 50},${120 + r() * 70},${60 + r() * 40},${.6 + r() * .4})`; x.lineWidth = 1 + (yy / h) * 3; x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx + (r() - .5) * 6, yy - l); x.stroke(); } });
  ctx.drawImage(gl, 0, 560);
  ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.ellipse(960, 905, 150, 34, 0, 0, TAU); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(975, 905, 120, 24, 0, 0, TAU); ctx.fill();
  ball2(ctx, 960, 800, 112, .3);
  glow(ctx, 900, 740, 260, 'rgba(255,250,230,.25)');
  ctx.restore();
  grassForeground(ctx, t, 300, 10);
  grade(ctx, '#2a4a8a', .16); vignette(ctx, .75);
}
// ---------- tarjetas ----------
function flagDraw(ctx, code, x, y, w, h) {
  ctx.save(); ctx.translate(x, y); ctx.beginPath(); rr(ctx, 0, 0, w, h, 8); ctx.clip();
  if (code === 'MEX') { ['#0f7a43', '#f2efe8', '#c42b33'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(i * w / 3, 0, w / 3 + 1, h); }); ctx.fillStyle = '#8a5a2b'; ctx.beginPath(); ctx.arc(w / 2, h / 2, h * .14, 0, TAU); ctx.fill(); ctx.strokeStyle = '#2f7a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(w / 2, h / 2 + 4, h * .2, .2, PI - .2); ctx.stroke(); }
  else if (code === 'GER') { ['#111111', '#d62828', '#f2c12e'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(0, i * h / 3, w, h / 3 + 1); }); }
  else if (code === 'ARG') { ['#74b9e6', '#f4f6f8', '#74b9e6'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(0, i * h / 3, w, h / 3 + 1); }); ctx.fillStyle = '#f2b51e'; ctx.beginPath(); ctx.arc(w / 2, h / 2, h * .09, 0, TAU); ctx.fill(); }
  else if (code === 'BRA') { ctx.fillStyle = '#1e9a46'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#f7d116'; ctx.beginPath(); ctx.moveTo(w / 2, h * .1); ctx.lineTo(w * .92, h / 2); ctx.lineTo(w / 2, h * .9); ctx.lineTo(w * .08, h / 2); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#1f3c8c'; ctx.beginPath(); ctx.arc(w / 2, h / 2, h * .22, 0, TAU); ctx.fill(); }
  else if (code === 'CRC') { ['#1d3f8a', '#f4f4f4', '#c8102e', '#c8102e', '#f4f4f4', '#1d3f8a'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(0, i * h / 6, w, h / 6 + 1); }); }
  else if (code === 'NED') { ['#ae1c28', '#f4f4f4', '#21468b'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(0, i * h / 3, w, h / 3 + 1); }); }
  ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(0, 0, w, h * .45);
  ctx.restore();
}
function darkStadiumBG(ctx, t, key, kitB) { blurred(ctx, key, 12, x => { cam(x, 960, 560, 1.05); stadiumWide2(x, t, { sky: 'night', kitB }); }); ctx.save(); ctx.fillStyle = 'rgba(4,5,10,.7)'; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore(); }
function card(ctx, x, y, w, h, o = {}) { ctx.save(); ctx.translate(x, y); ctx.fillStyle = o.fill || 'rgba(14,16,26,.86)'; rr(ctx, -w / 2, -h / 2, w, h, 14); ctx.fill(); ctx.strokeStyle = o.stroke || 'rgba(255,255,255,.16)'; ctx.lineWidth = o.lw || 2; rr(ctx, -w / 2, -h / 2, w, h, 14); ctx.stroke(); ctx.restore(); }

// ===== 17 · cuartos de final (llave del torneo) =====
function cardOct(ctx, cx, cy) { card(ctx, cx, cy, 340, 130); flagDraw(ctx, 'MEX', cx - 140, cy - 40, 60, 40); flagDraw(ctx, 'NED', cx - 140, cy + 12, 60, 26);
  text(ctx, 'MÉXICO  2', cx - 60, cy - 18, { size: 34, align: 'left', color: '#fff', ls: 2 }); text(ctx, 'HOLANDA  1', cx - 60, cy + 26, { size: 28, align: 'left', color: 'rgba(255,255,255,.55)', ls: 2 }); text(ctx, '✓', cx + 140, cy, { size: 40, font: 'Montserrat', weight: 900, color: P.mexL }); }
function cardQF(ctx, cx, cy, t) { glow(ctx, cx, cy, 260, 'rgba(255,210,63,.35)', .8 + .2 * Math.sin(t * 4)); card(ctx, cx, cy, 340, 150, { stroke: P.yel, lw: 3 });
  flagDraw(ctx, 'MEX', cx - 145, cy - 46, 60, 40); flagDraw(ctx, 'CRC', cx - 145, cy + 6, 60, 40); text(ctx, 'MÉXICO', cx - 65, cy - 26, { size: 36, align: 'left', color: '#fff', ls: 2 }); text(ctx, 'COSTA RICA', cx - 65, cy + 26, { size: 36, align: 'left', color: '#fff', ls: 2 }); }
S(T.cuartos, (ctx, t) => {
  darkStadiumBG(ctx, t, 'brkbg', KIT.CRC);
  glow(ctx, 960, 540, 900, 'rgba(30,140,80,.18)');
  ctx.save(); uiCenter(ctx, V ? 1.55 : 1);
  // posiciones: en 16:9 la llave va de izquierda a derecha; en 9:16 de arriba a abajo
  const L = V ? { lab: [[960, 15], [960, 325], [960, 600], [960, 750]], oct: [960, 115], qf: [960, 455], q: [[960, 640], [960, 790]], line: [[960, 185], [960, 365]], badge: [960, 770] }
              : { lab: [[330, 330], [800, 330], [1270, 330], [1640, 330]], oct: [330, 540], qf: [800, 540], q: [[1270, 540], [1640, 540]], line: [[500, 540], [630, 540]], badge: [1060, 790] };
  ['OCTAVOS', 'CUARTOS', 'SEMIFINAL', 'FINAL'].forEach((nm, i) => { if (V && i > 1) return; const k = ease(t, T.cuartos + i * .12, T.cuartos + .5 + i * .12, E.out); text(ctx, nm, L.lab[i][0], L.lab[i][1], { size: 24, font: 'Montserrat', weight: 900, color: i === 1 ? P.yel : 'rgba(255,255,255,.55)', ls: 8, alpha: k }); });
  const k1 = ease(t, T.cuartos + .1, T.cuartos + .6, E.outQuint), k2 = ease(t, T.costa - .2, T.costa + .3, E.outQuint), kl = ease(t, T.cuartos + .5, T.costa, E.inOut);
  ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(L.line[0][0], L.line[0][1]); ctx.lineTo(lerp(L.line[0][0], L.line[1][0], kl), lerp(L.line[0][1], L.line[1][1], kl)); ctx.stroke();
  ctx.save(); ctx.globalAlpha = k1; ctx.translate(V ? 0 : lerp(-80, 0, k1), V ? lerp(-60, 0, k1) : 0); cardOct(ctx, L.oct[0], L.oct[1]); ctx.restore();
  ctx.save(); ctx.globalAlpha = k2; const sc = lerp(1.2, 1, k2); ctx.translate(L.qf[0], L.qf[1]); ctx.scale(sc, sc); ctx.translate(-L.qf[0], -L.qf[1]); cardQF(ctx, L.qf[0], L.qf[1], t); ctx.restore();
  L.q.forEach(([x, y], i) => { const k = ease(t, T.costa + .3 + i * .15, T.costa + .8 + i * .15, E.out); ctx.save(); ctx.globalAlpha = k * .6; card(ctx, x, y, i ? 220 : 300, V ? 90 : 110); text(ctx, V ? (i ? 'FINAL  ?' : 'SEMIFINAL  ?') : '?', x, y, { size: V ? 34 : 60, color: 'rgba(255,255,255,.5)', ls: V ? 3 : 0 }); ctx.restore(); });
  const kq = ease(t, T.existe - .15, T.existe + .2, E.back);
  if (kq > 0) { ctx.save(); ctx.translate(L.badge[0], L.badge[1]); ctx.rotate(-.08); ctx.scale(kq * (V ? .62 : 1), kq * (V ? .62 : 1)); glow(ctx, 0, 0, 380, 'rgba(255,200,80,.45)'); ctx.strokeStyle = P.gold; ctx.lineWidth = 9; rr(ctx, -360, -80, 720, 160, 18); ctx.stroke(); text(ctx, 'QUINTO PARTIDO', 0, 0, { size: 96, color: P.gold, ls: 4 }); ctx.restore(); }
  ctx.restore();
  flash(ctx, t, T.existe - .1, .25, '255,220,140', .4);
  dust(ctx, t, 50, 12, 'rgba(255,230,190,1)', .3, 1.6); vignette(ctx, .7);
});
// ===== 18 · "se va a penales" (inserto del balón) =====
S(T.penales1, (ctx, t) => { ballSpot(ctx, t, T.penales1, { keeper: KIT.CRC.gk }); scoreBug2(ctx, { a: 'MEX', b: 'CRC', s1: 0, s2: 0, min: "120'", c2: KIT.CRC.shirt }); });
// ===== 19 · el portero vuela: primera atajada =====
S(T.vuela - .85, (ctx, t) => {
  penaltyPOV(ctx, t, T.vuela - .42, { keeper: KIT.MEX.gk, shooter: KIT.CRC, side: 1, save: true, reach: 380, shX: -280 });
  grade(ctx, '#ffb070', .08); vignette(ctx, .55);
  shootoutBug(ctx, 'MEX', 'CRC', [1, 1], [1, t > T.vuela ? 0 : null]);
}, 1060);
// ===== 20 · ...y para dos =====
S(T.paraDos - .45, (ctx, t) => {
  const t0 = T.paraDos - .2;
  penaltyPOV(ctx, t, t0, { keeper: KIT.MEX.gk, shooter: KIT.CRC, side: -1, save: true, reach: 390, shX: -240, camX: 520 });
  grade(ctx, '#ffb070', .08); vignette(ctx, .55);
  shootoutBug(ctx, 'MEX', 'CRC', [1, 1, 1], [1, 0, t > t0 + .42 ? 0 : null]);
  if (t > t0 + .5) bigTitle(ctx, '¡PARA DOS!', t, t0 + .5, { y: 320, size: 190 });
}, 860);
// ===== 21 · los cuatro mejores del mundo =====
S(T.top4, (ctx, t) => {
  darkStadiumBG(ctx, t, 'top4bg', KIT.CRC);
  ctx.save(); uiCenter(ctx, V ? 1.45 : .78);
  const kt = ease(t, T.top4, T.top4 + .5, E.out);
  text(ctx, 'LOS 4 MEJORES DEL MUNDO', 960, V ? 60 : 300, { size: 78, color: '#fff', ls: 4, alpha: kt, shadow: 'rgba(0,0,0,.6)' });
  text(ctx, 'MUNDIAL 2014 · SEMIFINALISTAS', 960, V ? 130 : 368, { size: 22, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.55)', ls: 8, alpha: kt });
  [['BRA', 'BRASIL'], ['GER', 'ALEMANIA'], ['ARG', 'ARGENTINA'], ['MEX', 'MÉXICO']].forEach(([c, nm], i) => {
    const x = V ? 780 + (i % 2) * 360 : 435 + i * 350, ti = T.top4 + .35 + i * .28, k = ease(t, ti, ti + .45, E.back); if (k <= 0) return; const mx = c === 'MEX', y = V ? 400 + Math.floor(i / 2) * 360 : 600;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    if (mx) glow(ctx, 0, 0, 300, 'rgba(255,210,63,.45)', .8 + .2 * Math.sin(t * 5));
    card(ctx, 0, 0, 300, 300, mx ? { stroke: P.yel, lw: 4 } : {});
    flagDraw(ctx, c, -110, -110, 220, 146); text(ctx, nm, 0, 92, { size: 44, color: mx ? P.yel : '#fff', ls: 2 });
    ctx.restore(); });
  ctx.restore();
  dust(ctx, t, 50, 21, 'rgba(255,230,190,1)', .3, 1.6); vignette(ctx, .7);
});
// ===== 22 · tu papá llora ("es la cebolla") =====
const WIPE = Object.assign({}, POSE.sitFrontFwd, { shF: 142, elF: 134, head: 10 });
S(T.llora, (ctx, t) => {
  const tTable = T.noHay - .25;
  if (t < tTable) {
    const k = ease(t, T.llora, T.cebolla + .4, E.sine), [hx, hy] = handheld(t, 2.5, 7);
    ctx.save(); cam(ctx, lerp(820, 860, k) + hx, 560 + hy, lerp(1.7, 1.85, k));
    drawRoom(ctx, t); crtSide(ctx, t, c => tvMatch(c, t, { s1: 4, s2: 2, min: 'PENALES' }));
    const dadP = t < T.cebolla ? WIPE : mixPose(WIPE, Object.assign({}, POSE.sitFront, { shF: 60, elF: 30 }), ease(t, T.cebolla, T.cebolla + .35));
    famSeated(ctx, t, { dad: dadP, dadF: t < T.cebolla + .2 ? 'cry' : 'smile', dadM: t > T.cebolla && t < T.noHay ? .5 + .5 * Math.sin(t * 16) : 0, kid: POSE.sitFrontFwd, kidF: 'tender', tioF: 'happy', abuF: 'tender' });
    tvGlow(ctx, t); coffeeTable2(ctx, t);
    ctx.restore();
    grade(ctx, '#ffb070', .08); vignette(ctx, .6);
    tag(ctx, 'PAPÁ', 816, 480, t, T.llora + .2, { out: T.cebolla });
  } else { // inserto de la mesa: no hay cebolla
    const k = ease(t, tTable, T.semi, E.out);
    ctx.save(); cam(ctx, 960, 790, lerp(2.6, 2.75, k));
    drawRoom(ctx, t); famSeated(ctx, t, { dad: POSE.sitFront, dadF: 'smile', kidF: 'laugh' }); tvGlow(ctx, t); coffeeTable2(ctx, t);
    ctx.restore();
    const kq = ease(t, T.noHay, T.noHay + .3, E.back);
    if (kq > 0) { ctx.save(); ui(ctx); ctx.translate(uxC(960), uyC(330)); ctx.scale(kq, kq); card(ctx, 0, 0, 560, 120, { stroke: '#ff4a3a', lw: 4 }); text(ctx, 'CEBOLLA: 0', -40, 2, { size: 72, color: '#fff', ls: 3 }); text(ctx, '✕', 210, 2, { size: 70, font: 'Montserrat', weight: 900, color: '#ff4a3a' }); ctx.restore(); }
    grade(ctx, '#ffb070', .1); vignette(ctx, .65);
  }
}, t => t < T.noHay - .25 ? 900 : 960);
// ===== 23 · semifinal: 120 minutos, 0-0 =====
S(T.semi, (ctx, t) => {
  const k = ease(t, T.semi, T.penales2, E.sine), [hx, hy] = handheld(t, 4);
  ctx.save(); cam(ctx, 960 + lerp(20, -20, k) + hx, 560 + hy, lerp(1.04, 1.16, k));
  stadiumWide2(ctx, t + 40, { sky: 'night', kitB: KIT.ARG });
  ctx.restore();
  fansForeground(ctx, t, { cheer: .3, blur: 11, flag: false, xs: [-60, 230, 500, 1420, 1690, 1960], y: 1150 });
  grade(ctx, '#3a5aa0', .14); vignette(ctx, .65);
  stamp2(ctx, ['09 · 07 · 2014', 'SEMIFINAL · SÃO PAULO', 'MÉXICO VS ARGENTINA'], t, T.semi + .1, { gaps: [0, .5, 1.0], out: T.m120 - .2 });
  scoreBug2(ctx, { a: 'MEX', b: 'ARG', s1: 0, s2: 0, min: t > T.m120 ? "120'" : "117'", c2: KIT.ARG.shirt, flash: t > T.ceroCero && t < T.ceroCero + 1.2 });
  if (t > T.ceroCero) bigTitle(ctx, '0 - 0', t, T.ceroCero, { y: 330, size: 210, color: '#fff' });
}, t => { const k = ease(t, T.semi, T.penales2, E.sine), cx = 960 + lerp(20, -20, k), z = lerp(1.04, 1.16, k), b = ballSmooth(simT(t + 40)); return W / 2 + (proj(b[0], b[1])[0] - cx) * z; });
// ===== 24 · otra vez penales =====
S(T.penales2, (ctx, t) => { ballSpot(ctx, t, T.penales2, { keeper: KIT.ARG.gk }); scoreBug2(ctx, { a: 'MEX', b: 'ARG', s1: 0, s2: 0, min: "120'", c2: KIT.ARG.shirt }); });
// ===== 25 · te tapas los ojos / tu abuelo te quita las manos =====
const LEANR = { lean: 24, head: 10, shB: 20, elB: 30, shF: 62, elF: 24, hipB: 6, knB: -8, hipF: -4, knF: -8, sit: 0 };
const TIOHH = Object.assign({}, POSE.sitFront, { shB: 165, elB: 150, shF: 168, elF: 146 });
function abuKidScene(ctx, t, o) { // abuelo de pie junto al sofá, inclinado hacia ti
  drawRoom(ctx, t); crtSide(ctx, t, c => tvMatch(c, t, { s1: 0, s2: 0, min: 'PENALES' }));
  const L = [['dad', 760, POSE.sitFrontFwd, o.dadF || 'scared'], ['kid', 975, o.kid, o.kidF], ['tio', 1610, TIOHH, 'scared']];
  L.forEach(([w, x, p, f]) => fam(ctx, w, x, 836, w === 'tio' ? 1.12 : 1.12, p, f, t, Object.assign({ look: [-4, 0] }, w === 'kid' ? { handsOverFace: o.cover } : {})));
  seatFronts(ctx);
  fam(ctx, 'abu', 1118, 836, 1.16, o.abu, o.abuF, t, { look: [-3, 2], mouth: o.abuM || 0 });
}
S(T.tapas, (ctx, t) => {
  const k = ease(t, T.tapas, T.miralo, E.sine), [hx, hy] = handheld(t, 2.5, 3);
  const q = ease(t, T.quita + .1, T.quita + .8, E.inOut);
  const kidP = q < .02 ? POSE.coverEyes : mixPose(POSE.coverEyes, Object.assign({}, POSE.sitFrontFwd, { shF: 40, elF: 60 }), q);
  const abuP = mixPose(Object.assign({}, POSE.stand, { lean: 10 }), LEANR, ease(t, T.quita - .4, T.quita + .1, E.inOut));
  ctx.save(); cam(ctx, lerp(1010, 1040, k) + hx, 600 + hy, lerp(1.55, 1.7, k));
  abuKidScene(ctx, t, { kid: kidP, kidF: q > .5 ? 'shock' : 'scared', cover: q < .5, abu: abuP, abuF: 'tender' });
  tvGlow(ctx, t); coffeeTable2(ctx, t);
  ctx.restore();
  grade(ctx, '#4080c0', .1); vignette(ctx, .65);
}, 1020);
// ===== 26 · "Míralo, mijo. Esto no se ve dos veces." =====
S(T.miralo - .2, (ctx, t) => {
  const k = ease(t, T.miralo - .2, T.g1, E.sine), [hx, hy] = handheld(t, 2, 6);
  ctx.save(); cam(ctx, lerp(1010, 1022, k) + hx, 560 + hy, lerp(2.4, 2.55, k));
  const talk = t > T.miralo && t < T.dosVeces + .5 ? .5 + .5 * Math.sin(t * 15) : 0;
  abuKidScene(ctx, t, { kid: Object.assign({}, POSE.sitFrontFwd, { head: -6 }), kidF: 'tender', abu: Object.assign({}, LEANR, { shF: 40, elF: 50, head: 14 }), abuF: 'tender', abuM: talk });
  tvGlow(ctx, t, '120,190,255', 1.2);
  ctx.restore();
  bokeh(ctx, t, 10, 41, 'rgba(160,200,255,.7)', 30, 80, .25);
  grade(ctx, '#4080c0', .1); vignette(ctx, .8);
}, 1000);
// ===== 27–30 · la tanda: gol, gol, atajada, ¡gol! =====
S(T.g1 - .47, (ctx, t) => { penaltyPOV(ctx, t, T.g1 - .3, { keeper: KIT.ARG.gk, shooter: KIT.MEX, side: -1, tx: 1330, ty: 420, dur: .3 }); grade(ctx, '#ffb070', .08); vignette(ctx, .55); shootoutBug(ctx, 'MEX', 'ARG', [t > T.g1 ? 1 : null], []); }, 1100);
S(T.g2 - .44, (ctx, t) => { penaltyPOV(ctx, t, T.g2 - .3, { keeper: KIT.MEX.gk, shooter: KIT.ARG, side: 1, tx: 600, ty: 440, dur: .3, camX: 650 }); grade(ctx, '#80a0ff', .08); vignette(ctx, .55); shootoutBug(ctx, 'MEX', 'ARG', [1], [t > T.g2 ? 1 : null]); }, 820);
S(T.atajada - .42, (ctx, t) => { penaltyPOV(ctx, t, T.atajada - .4, { keeper: KIT.MEX.gk, shooter: KIT.ARG, side: 1, save: true, reach: 380, camX: 800 }); grade(ctx, '#ffb070', .08); vignette(ctx, .55); shootoutBug(ctx, 'MEX', 'ARG', [1, 1, 1], [1, 1, t > T.atajada ? 0 : null]);
  if (t > T.atajada + .05) bigTitle(ctx, '¡ATAJADA!', t, T.atajada + .05, { y: 320, size: 170, out: T.g3 - .6 }); }, 1080);
S(T.g3 - .48, (ctx, t) => { const t0 = T.g3 - .3; penaltyPOV(ctx, t, t0, { keeper: KIT.ARG.gk, shooter: KIT.MEX, side: 1, tx: 620, ty: 400, dur: .3, camX: 960 }); grade(ctx, '#ffb070', .1); vignette(ctx, .55);
  shootoutBug(ctx, 'MEX', 'ARG', [1, 1, 1, t > t0 + .3 ? 1 : null], [1, 1, 0, 0]); if (t > t0 + .35) bigTitle(ctx, '¡GOL!', t, t0 + .35, { y: 310, size: 230 }); }, 840);
// ===== 31 · México está en la final =====
S(T.enFinal, (ctx, t) => {
  const [hx, hy] = handheld(t, 3, 9), k = ease(t, T.enFinal, T.trece, E.sine);
  ctx.save(); cam(ctx, 1150 + hx, 580 + hy, lerp(1.2, 1.32, k));
  drawRoom(ctx, t); crtSide(ctx, t, c => tvMatch(c, t, { s1: 4, s2: 3, min: 'PENALES' }));
  const h1 = hop(t, T.enFinal, .52, 50), h2 = hop(t, T.enFinal + .17, .55, 40), h3 = hop(t, T.enFinal + .31, .5, 34);
  fam(ctx, 'dad', 790, 836, 1.12, crouchOf(POSE.cheer, h1.crouch), 'shout', t, { jump: h1.y, squash: h1.sq, dir: 1 });
  fam(ctx, 'tio', 1340, 836, 1.12, crouchOf(mixPose(POSE.cheer, POSE.fists, .5 + .5 * Math.sin(t * 7)), h2.crouch), 'cheer', t, { jump: h2.y, squash: h2.sq });
  fam(ctx, 'abu', 1150, 836, 1.16, mixPose(POSE.cheer, POSE.fists, .6 + .4 * Math.sin(t * 5)), 'laugh', t, { look: [-4, -2] });
  fam(ctx, 'kid', 965, 836, 1.0, crouchOf(POSE.cheer, h3.crouch), 'laugh', t, { jump: h3.y * .8, squash: h3.sq, dir: 1 });
  tvGlow(ctx, t); coffeeTable2(ctx, t);
  ctx.restore();
  const r = rnd(9); ctx.save(); for (let i = 0; i < 80; i++) { const x = r() * W + Math.sin(t * 2 + i) * 40, y = (r() * H * 1.5 + (t - T.enFinal) * (240 + r() * 200)) % (H + 100) - 50, rot = t * (2 + r() * 3) + i; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, Math.abs(Math.sin(rot * 1.3)) + .2); ctx.fillStyle = ['#1f9e57', '#f2eee6', '#d33b44', '#ffcf3f'][i % 4]; ctx.fillRect(-9, -5, 18, 10); ctx.restore(); } ctx.restore();
  grade(ctx, '#ffb070', .12); vignette(ctx, .55);
  if (t > T.enFinal + .25) bigTitle(ctx, '¡A LA FINAL!', t, T.enFinal + .25, { y: 300, size: 180 });
}, 1100);
