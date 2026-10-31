// Estadio en perspectiva real (cámara alta en tribuna) + partido simulado 11 vs 11 sin encimarse.
// Coordenadas de cancha: u = largo 0–105 m (izq→der), v = profundidad 0–68 m (0 = banda cercana), z = altura.
// uniformes
const KIT = {
  MEX: { shirt: '#15975a', shorts: '#ffffff', socks: '#c4232f', gk: { shirt: '#f2d23a', shorts: '#111111', socks: '#f2d23a' } },
  NED: { shirt: '#ff7a1f', shorts: '#ffffff', socks: '#ff7a1f', gk: { shirt: '#2a2a33', shorts: '#2a2a33', socks: '#2a2a33' } },
  CRC: { shirt: '#c8102e', shorts: '#1d3f8a', socks: '#ffffff', gk: { shirt: '#3c3c46', shorts: '#3c3c46', socks: '#3c3c46' } },
  ARG: { shirt: '#8cc8f0', shorts: '#111827', socks: '#ffffff', vstripes: 'rgba(255,255,255,.92)', gk: { shirt: '#4a4f5c', shorts: '#4a4f5c', socks: '#4a4f5c' } },
  GER: { shirt: '#f2f2f2', shorts: '#111111', socks: '#f2f2f2', numCol: '#111111', gk: { shirt: '#2fa84f', shorts: '#2fa84f', socks: '#2fa84f' } },
  REF: { shirt: '#e8ff47', shorts: '#111111', socks: '#111111' }, GK: { shirt: '#444', shorts: '#444', socks: '#444' },
};
const PC = { D: 40, h: 42, F: 1000, cx: 960, cy: 545, boost: 1.35 };
PC.th = Math.atan(PC.h / (34 + PC.D)); PC.c = Math.cos(PC.th); PC.s = Math.sin(PC.th);
function proj(u, v, z = 0) {
  const zc = (v + PC.D) * PC.c + (PC.h - z) * PC.s, yc = (v + PC.D) * PC.s + (z - PC.h) * PC.c;
  return [PC.cx + PC.F * (u - 52.5) / zc, PC.cy - PC.F * yc / zc, zc];
}
function figScale(u, v) { const [, , zc] = proj(u, v); return PC.boost * PC.F * 1.8 / zc / 324; }
function polyW(x, pts, res) { x.beginPath(); pts.forEach((p, i) => { const q = proj(p[0], p[1], p[2] || 0); i ? x.lineTo(q[0] * res, q[1] * res) : x.moveTo(q[0] * res, q[1] * res); }); }
// ---------- capa estática del estadio ----------
const BOWL = { x0: -120, y0: -80, w: 2160, h: 1240, res: 1.2 };
function stadiumBowl(night) { return [bowlStands(night), bowlPitch(night)]; }
function bowlStands(night) {
  return layer('bowlS' + (night ? 'N' : 'D'), Math.ceil(BOWL.w * BOWL.res), Math.ceil(BOWL.h * BOWL.res), (x) => {
    const r = BOWL.res; x.translate(-BOWL.x0 * r, -BOWL.y0 * r);
    const P2 = (u, v, z) => { const q = proj(u, v, z); return [q[0] * r, q[1] * r]; };
    // fondo del tazón
    x.fillStyle = vg(x, night ? [[0, '#07060c'], [1, '#141224']] : [[0, '#120c1c'], [1, '#2a1a2a']], BOWL.y0 * r, (BOWL.y0 + BOWL.h) * r); x.fillRect(BOWL.x0 * r, BOWL.y0 * r, BOWL.w * r, BOWL.h * r);
    // tribunas: filas de público dibujadas en perspectiva (lejana, laterales y cercana)
    const pal = ['#1f9e57', '#e9e4dc', '#c8343c', '#1f9e57', '#e9e4dc', '#2a6fb8', '#d8c04a', '#1f9e57'], palNED = ['#ff7a1f', '#ff8d3a', '#f2f0ea', '#ff7a1f'];
    const rr2 = rnd(31);
    const person = (u, v, z, k) => { const q = proj(u, v, z), q2 = proj(u, v, z + .55), hgt = (q[1] - q2[1]) * r; if (hgt < .6) return; const px = q[0] * r, py = q[1] * r, lit = .55 + .45 * k;
      const ned = u > 84 && v > 70; const col = (ned ? palNED : pal)[Math.floor(rr2() * (ned ? palNED : pal).length)];
      x.globalAlpha = lit * (.7 + .3 * rr2()); x.fillStyle = col; x.fillRect(px - hgt * .38, py - hgt * .62, hgt * .76, hgt * .62);
      x.fillStyle = '#0d0c12'; x.beginPath(); x.arc(px, py - hgt * .82, hgt * .26, 0, TAU); x.fill();
      if (rr2() < .08) { x.strokeStyle = '#0d0c12'; x.lineWidth = hgt * .14; x.beginPath(); x.moveTo(px - hgt * .3, py - hgt * .5); x.lineTo(px - hgt * .45, py - hgt * 1.15); x.moveTo(px + hgt * .3, py - hgt * .5); x.lineTo(px + hgt * .45, py - hgt * 1.15); x.stroke(); } };
    x.fillStyle = '#100e16';
    [[[-30, 74, 0], [135, 74, 0], [150, 118, 34], [-45, 118, 34]], [[-8, -14, 0], [-8, 82, 0], [-48, 100, 30], [-48, -30, 30]], [[113, -14, 0], [113, 82, 0], [153, 100, 30], [153, -30, 30]]].forEach(st => { polyW(x, st, r); x.closePath(); x.fill(); });
    for (let k = 0; k < 44; k++) { const v = 74.6 + k * .95, z = .4 + k * .74, f = 1 - k / 44; for (let u = -44 + (k % 2) * .3; u < 150; u += .62) person(u, v, z, f); }
    for (let k = 0; k < 40; k++) { const z = .4 + k * .74, f = 1 - k / 40; for (let v = -30; v < 100; v += .62) { person(-9 - k * .95, v, z, f); person(114 + k * .95, v, z, f); } }
    x.globalAlpha = 1;
    // sombra del techo sobre las filas altas y pasillos
    x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 3 * r; for (let k = 1; k < 4; k++) { polyW(x, [[-40, 74 + k * 10.5, k * 8.2], [145, 74 + k * 10.5, k * 8.2]], r); x.stroke(); }
    // techo
    x.fillStyle = '#07070b'; x.beginPath(); x.moveTo(BOWL.x0 * r, BOWL.y0 * r); x.lineTo((BOWL.x0 + BOWL.w) * r, BOWL.y0 * r); x.lineTo((BOWL.x0 + BOWL.w) * r, 70 * r); x.quadraticCurveTo(960 * r, 10 * r, BOWL.x0 * r, 70 * r); x.closePath(); x.fill();
  }, 1.6);
}
function bowlPitch(night) {
  return layer('bowlP' + (night ? 'N' : 'D'), Math.ceil(BOWL.w * BOWL.res), Math.ceil(BOWL.h * BOWL.res), (x) => {
    const r = BOWL.res; x.translate(-BOWL.x0 * r, -BOWL.y0 * r);
    const P2 = (u, v, z) => { const q = proj(u, v, z); return [q[0] * r, q[1] * r]; };
    // explanada y pista alrededor
    x.fillStyle = night ? '#163b26' : '#1a4a2c'; polyW(x, [[-8, -8], [113, -8], [113, 76], [-8, 76]], r); x.closePath(); x.fill();
    // cancha a franjas
    for (let i = 0; i < 20; i++) { x.fillStyle = i % 2 ? (night ? '#226a3e' : '#2a7c46') : (night ? '#1e5f38' : '#246f3f'); polyW(x, [[i * 5.25, 0], [(i + 1) * 5.25, 0], [(i + 1) * 5.25, 68], [i * 5.25, 68]], r); x.closePath(); x.fill(); }
    // líneas reglamentarias
    x.strokeStyle = 'rgba(255,255,255,.82)'; x.lineJoin = 'round';
    const line = (pts, w = 2.4) => { x.lineWidth = w * r; polyW(x, pts, r); x.stroke(); };
    const circ = (cu, cv, rad, a0 = 0, a1 = TAU) => { const pts = []; for (let i = 0; i <= 48; i++) { const a = lerp(a0, a1, i / 48); pts.push([cu + Math.cos(a) * rad, cv + Math.sin(a) * rad]); } line(pts); };
    line([[0, 0], [105, 0], [105, 68], [0, 68], [0, 0]], 2.8); line([[52.5, 0], [52.5, 68]]); circ(52.5, 34, 9.15);
    [0, 1].forEach(sd => { const g = sd ? 105 : 0, d = sd ? -1 : 1;
      line([[g, 13.84], [g + d * 16.5, 13.84], [g + d * 16.5, 54.16], [g, 54.16]]); line([[g, 24.84], [g + d * 5.5, 24.84], [g + d * 5.5, 43.16], [g, 43.16]]);
      const a = Math.acos(5.5 / 9.15); circ(g + d * 11, 34, 9.15, sd ? PI - a : -a, sd ? PI + a : a);
      const q = P2(g + d * 11, 34); x.fillStyle = '#fff'; x.beginPath(); x.ellipse(q[0], q[1], 3 * r, 1.6 * r, 0, 0, TAU); x.fill(); });
    [[0, 0, 0, PI / 2], [105, 0, PI / 2, PI], [105, 68, PI, PI * 1.5], [0, 68, PI * 1.5, TAU]].forEach(([cu, cv, a0, a1]) => circ(cu, cv, 1, a0, a1));
    // luz de reflectores sobre el pasto (centro más claro, orillas oscuras)
    const c0 = P2(52.5, 34), lg = x.createRadialGradient(c0[0], c0[1], 80 * r, c0[0], c0[1], 1100 * r); lg.addColorStop(0, 'rgba(255,248,220,.16)'); lg.addColorStop(.6, 'rgba(0,0,0,0)'); lg.addColorStop(1, 'rgba(0,0,0,.4)');
    x.save(); polyW(x, [[-8, -8], [113, -8], [113, 76], [-8, 76]], r); x.closePath(); x.clip(); x.fillStyle = lg; x.fillRect(-4000, -4000, 8000, 8000); x.restore();
    // vallas LED (lejana y cabeceras)
    const board = (pts, col) => { polyW(x, pts, r); x.closePath(); x.fillStyle = col; x.fill(); };
    for (let i = 0; i < 12; i++) board([[-3 + i * 9.5, 71.5, 0], [-3 + (i + 1) * 9.5 - .3, 71.5, 0], [-3 + (i + 1) * 9.5 - .3, 71.5, 1], [-3 + i * 9.5, 71.5, 1]], i % 2 ? '#1d3f8a' : '#c99a2a');
    [[-5, 1], [110, -1]].forEach(([bu]) => { for (let i = 0; i < 7; i++) board([[bu, 2 + i * 9.4, 0], [bu, 2 + (i + 1) * 9.4 - .3, 0], [bu, 2 + (i + 1) * 9.4 - .3, 1], [bu, 2 + i * 9.4, 1]], i % 2 ? '#1d3f8a' : '#0f6a3c'); });
    for (let i = 0; i < 12; i++) board([[-3 + i * 9.5, -3.5, 0], [-3 + (i + 1) * 9.5 - .3, -3.5, 0], [-3 + (i + 1) * 9.5 - .3, -3.5, 1], [-3 + i * 9.5, -3.5, 1]], i % 2 ? '#0f6a3c' : '#1d3f8a');
    // porterías (postes, travesaño y red)
    [0, 105].forEach(g => { const d = g ? 1 : -1, v0 = 34 - 3.66, v1 = 34 + 3.66, dp = 2.2;
      x.strokeStyle = 'rgba(235,235,240,.55)'; x.lineWidth = 1 * r;
      for (let k = 0; k <= 8; k++) { const vv = lerp(v0, v1, k / 8); polyW(x, [[g, vv, 2.44], [g + d * dp, vv, 2], [g + d * dp, vv, 0]], r); x.stroke(); }
      for (let k = 0; k <= 4; k++) { const zz = k * .5; polyW(x, [[g + d * dp, v0, Math.min(zz, 2)], [g + d * dp, v1, Math.min(zz, 2)]], r); x.stroke(); }
      x.strokeStyle = '#ffffff'; x.lineWidth = 2.6 * r; polyW(x, [[g, v0, 0], [g, v0, 2.44], [g, v1, 2.44], [g, v1, 0]], r); x.stroke(); });
  });
}
// ---------- simulación del partido ----------
// formación de México (4-3-3) y Holanda (5-3-2, como en 2014). a = fracción del largo desde su propia portería.
const FORM = {
  MEX: [[.04, 34], [.22, 9], [.2, 26], [.2, 42], [.22, 59], [.38, 20], [.35, 34], [.38, 48], [.55, 12], [.58, 34], [.55, 56]],
  NED: [[.04, 34], [.2, 6], [.18, 21], [.17, 34], [.18, 47], [.2, 62], [.36, 22], [.33, 34], [.36, 46], [.5, 27], [.5, 41]],
};
const NUMS = { MEX: ['1', '2', '4', '3', '23', '18', '6', '16', '19', '9', '7'], NED: ['1', '2', '3', '4', '5', '15', '20', '6', '8', '11', '10'] };
// jugada de México: tramos de conducción (carrier) y pases (carrier null)
const PLAY = [
  { t0: 0, t1: 1.6, a: [30, 30], b: [36, 28], c: ['MEX', 2] },
  { t0: 1.6, t1: 2.5, a: [36, 28], b: [48, 37], c: null, to: ['MEX', 6] },
  { t0: 2.5, t1: 3.9, a: [48, 37], b: [54, 41], c: ['MEX', 6], press: ['NED', 7] },
  { t0: 3.9, t1: 4.7, a: [54, 41], b: [64, 17], c: null, to: ['MEX', 8] },
  { t0: 4.7, t1: 6.1, a: [64, 17], b: [72, 15], c: ['MEX', 8], press: ['NED', 5] },
  { t0: 6.1, t1: 6.9, a: [72, 15], b: [67, 27], c: null, to: ['MEX', 5] },
  { t0: 6.9, t1: 8.1, a: [67, 27], b: [71, 31], c: ['MEX', 5], press: ['NED', 6] },
  { t0: 8.1, t1: 9.0, a: [71, 31], b: [81, 35], c: null, to: ['MEX', 9] },
  { t0: 9.0, t1: 20, a: [81, 35], b: [83, 35], c: ['MEX', 9], press: ['NED', 3] },
];
function playAt(t) { const p = PLAY.find(s => t < s.t1) || PLAY[PLAY.length - 1]; const k = clamp((t - p.t0) / (p.t1 - p.t0)); const e = p.c ? k : E.out(k); return { seg: p, k, ball: [lerp(p.a[0], p.b[0], e), lerp(p.a[1], p.b[1], e)], air: p.c ? 0 : Math.sin(k * PI) * (Math.hypot(p.b[0] - p.a[0], p.b[1] - p.a[1]) > 14 ? 1.6 : .3) }; }
function ballSmooth(t) { let u = 0, v = 0, n = 0; for (let i = -6; i <= 6; i++) { const w = 1 - Math.abs(i) / 7, b = playAt(Math.max(0, t + i * .12)).ball; u += b[0] * w; v += b[1] * w; n += w; } return [u / n, v / n]; }
// peso de "rol" (conducir/recibir/presionar) de un jugador en t, suave
function roleW(t, team, i) {
  let best = { w: 0, p: null };
  PLAY.forEach((s, si) => {
    const isC = s.c && s.c[0] === team && s.c[1] === i, isTo = s.to && s.to[0] === team && s.to[1] === i, isP = s.press && s.press[0] === team && s.press[1] === i;
    if (!isC && !isTo && !isP) return;
    let w = 0, tgt = null;
    if (isC) { w = smooth01((t - (s.t0 - .5)) / .5) * (1 - smooth01((t - s.t1) / 1.4)); const k = clamp((t - s.t0) / (s.t1 - s.t0)); tgt = [lerp(s.a[0], s.b[0], k) - .9, lerp(s.a[1], s.b[1], k) + .3]; }
    if (isTo) { w = smooth01((t - (s.t0 - .4)) / (s.t1 - s.t0 + .4)); tgt = [s.b[0] - .9, s.b[1] + .3]; }
    if (isP) { w = smooth01((t - s.t0 + .3) / 1.0) * (1 - smooth01((t - s.t1) / 1.2)) * .9; const b = playAt(t).ball; tgt = [b[0] + 3.2, b[1] + (b[1] > 34 ? 1.6 : -1.6)]; }
    if (w > best.w) best = { w, p: tgt };
  });
  return best;
}
function matchPositions(t) {
  const bs = ballSmooth(t), out = [];
  ['MEX', 'NED'].forEach(team => FORM[team].forEach(([a, v0], i) => {
    const gk = i === 0, home = team === 'MEX', baseU = home ? a * 105 : 105 - a * 105;
    const shU = (bs[0] - 52.5) * (gk ? .1 : .55) + (home ? 4 : 0), shV = (bs[1] - 34) * (gk ? .15 : .28);
    const wob = [noise1(t * .35 + i * 7 + (home ? 0 : 50)) * 1.6, noise1(t * .3 + i * 11 + (home ? 9 : 70)) * 1.4];
    let u = baseU + shU + wob[0], v = clamp(v0 + shV + wob[1], 2, 66);
    if (gk) u = home ? clamp(u, 1, 9) : clamp(u, 96, 104);
    const r = roleW(t, team, i); if (r.p) { u = lerp(u, r.p[0], r.w); v = lerp(v, r.p[1], r.w); }
    out.push({ team, i, u, v, gk, role: r.w });
  }));
  out.push({ team: 'REF', i: 0, u: bs[0] - 9 + noise1(t * .3) * 2, v: clamp(bs[1] + 11, 4, 64), role: 0 });
  // separación suave (nadie se enciman: radio mínimo 2.4 m)
  for (let it = 0; it < 3; it++) for (let a = 0; a < out.length; a++) for (let b = a + 1; b < out.length; b++) {
    const A = out[a], B = out[b], du = B.u - A.u, dv = B.v - A.v, d = Math.hypot(du, dv) || .01, m = 2.4;
    if (d < m) { const push = (m - d) / 2, nu = du / d, nv = dv / d; const wa = A.role > .5 ? .25 : 1, wb = B.role > .5 ? .25 : 1, s = wa + wb;
      A.u -= nu * push * 2 * wa / s; A.v -= nv * push * 2 * wa / s; B.u += nu * push * 2 * wb / s; B.v += nv * push * 2 * wb / s; }
  }
  return out;
}
// integra distancia recorrida -> fase de marcha (pies sin patinar) y velocidad actual
const STRIDE_M = { run: gaitStride(GAITS.run) * PC.boost * 1.8 / 324, jog: gaitStride(GAITS.jog) * PC.boost * 1.8 / 324, walk: gaitStride(GAITS.walk) * PC.boost * 1.8 / 324 };
function gaitMix(sp) { return { run: smooth01((sp - 3.0) / 1.4), walk: 1 - smooth01((sp - 1.0) / 1.0) }; }
function matchState(t) {
  const dt = 1 / 15, n = Math.ceil(t / dt), ph = new Array(23).fill(0);
  let prev = matchPositions(0);
  for (let k = 1; k <= n; k++) {
    const tt = Math.min(t, k * dt), cur = matchPositions(tt), h = tt - (k - 1) * dt;
    cur.forEach((p, j) => { const d = Math.hypot(p.u - prev[j].u, p.v - prev[j].v), sp = d / Math.max(h, 1e-3), m = gaitMix(sp);
      const st = lerp(lerp(STRIDE_M.jog, STRIDE_M.run, m.run), STRIDE_M.walk, m.walk); ph[j] += d / st; });
    if (k === n) { cur.forEach((p, j) => { p.vu = (p.u - prev[j].u) / Math.max(h, 1e-3); p.vv = (p.v - prev[j].v) / Math.max(h, 1e-3); p.ph = ph[j]; }); return cur; }
    prev = cur;
  }
  prev.forEach((p, j) => { p.vu = 0; p.vv = 0; p.ph = 0; }); return prev;
}
function matchPose(p, t) {
  const sp = Math.hypot(p.vu, p.vv), m = gaitMix(sp);
  const idle = mixPose(POSE.relaxed, POSE.ready, .35 + .2 * Math.sin(t * 1.3 + p.i));
  if (sp < .25) return idle;
  const g = mixPose(mixPose(gait(p.ph, 'jog'), gait(p.ph, 'run'), m.run), gait(p.ph, 'walk'), m.walk);
  return sp < .6 ? mixPose(idle, g, (sp - .25) / .35) : g;
}
// dibuja jugadores, árbitro y balón ordenados por profundidad
function drawMatch(ctx, t, o = {}) {
  const st = matchState(t), pl = playAt(t), b = pl.ball, items = [];
  st.forEach(p => items.push({ v: p.v, draw: () => {
    const [x, y] = proj(p.u, p.v), s = figScale(p.u, p.v);
    const towardBall = Math.sign(b[0] - p.u) || 1, sp = Math.hypot(p.vu, p.vv), dir = sp > .6 ? (Math.sign(p.vu) || towardBall) : towardBall;
    const K = p.team === 'MEX' ? (o.kitA || KIT.MEX) : p.team === 'NED' ? (o.kitB || KIT.NED) : KIT.REF, G = p.gk ? (K.gk || KIT.GK) : K;
    figure(ctx, { x, y, s, dir, pose: matchPose(p, t), face: 'determined', t, seed: p.i + (p.team === 'NED' ? 30 : 0), shirt: G.shirt, sleeves: 'short', shorts: G.shorts, socks: G.socks, rim: o.rim || 'rgba(255,240,215,1)', light: [-.6, -1], blink: false, acc: Object.assign({}, p.gk ? { gloves: '#e9f255' } : {}, G.vstripes && !p.gk ? { vstripes: G.vstripes } : {}) });
  } }));
  items.push({ v: b[1] - .01, draw: () => { const [x, y] = proj(b[0], b[1]), [, y2] = proj(b[0], b[1], pl.air + .22), s = figScale(b[0], b[1]);
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(x, y, 9 * s * 3, 3 * s * 3, 0, 0, TAU); ctx.fill(); ball2(ctx, x, y2, Math.max(2.2, 11 * s * 2.2), t * 9); } });
  items.sort((a, c) => c.v - a.v).forEach(it => it.draw());
}
function stadiumMatch(ctx, t, o = {}) {
  const night = o.sky === 'night';
  stadiumBowl(night).forEach(L => ctx.drawImage(L, BOWL.x0, BOWL.y0, BOWL.w, BOWL.h));
  glow(ctx, 260, 60, 700, 'rgba(255,235,200,.28)'); glow(ctx, 1660, 60, 700, 'rgba(255,235,200,.28)');
  crowdTwinkle(ctx, t, -100, 0, 2100, 330, 30, 7, .7);
  [[180, 40], [700, 18], [1220, 18], [1740, 40]].forEach(([x, y]) => floodBank(ctx, x, y, 110, t, .8));
  rays(ctx, 260, 40, 900, 7, .9, 'rgba(255,240,215,.16)', .5, t, 3); rays(ctx, 1660, 40, 900, 7, .9, 'rgba(255,240,215,.16)', .5, t, 9);
  drawMatch(ctx, t, o);
  haze(ctx, 300, 640, night ? 'rgba(170,190,255,.10)' : 'rgba(255,220,190,.14)');
  dust(ctx, t, 50, 4, 'rgba(255,240,215,1)', .3, 1.5);
}
