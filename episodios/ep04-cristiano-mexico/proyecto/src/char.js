// Personaje v3: silueta negra con extremidades curvas y afiladas, luz de borde, ropa (sudadera / uniforme),
// cara con párpados, cejas afiladas y bocas rellenas; ciclos de carrera y caminata con pies que no patinan.
// Convención de ángulos: 0 = hacia abajo, + = hacia adelante (hacia donde mira). Codos: + = flexión natural.
const POSE = {
  stand: { lean: 0, head: 0, shB: 6, elB: 10, shF: -4, elF: 12, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
  relaxed: { lean: 2, head: 2, shB: 10, elB: 16, shF: -2, elF: 20, hipB: 6, knB: -4, hipF: -5, knF: -3, sit: 0 },
  sit: { lean: -4, head: 2, shB: 20, elB: 60, shF: 26, elF: 66, hipB: 86, knB: -84, hipF: 92, knF: -90, sit: 1 },
  sitFront: { lean: 0, head: 0, shB: 14, elB: 42, shF: 18, elF: 48, hipB: 22, knB: -22, hipF: -14, knF: 14, sit: 1, thighK: .35 },
  sitFrontFwd: { lean: 10, head: 4, shB: 24, elB: 62, shF: 30, elF: 70, hipB: 22, knB: -22, hipF: -14, knF: 14, sit: 1, thighK: .35 },
  sitFrontSad: { lean: 18, head: 18, shB: 28, elB: 80, shF: 34, elF: 86, hipB: 22, knB: -22, hipF: -14, knF: 14, sit: 1, thighK: .35 },
  sitFrontCheer: { lean: -6, head: -10, shB: 158, elB: 16, shF: 166, elF: 14, hipB: 22, knB: -22, hipF: -14, knF: 14, sit: 1, thighK: .35 },
  cheer: { lean: -6, head: -10, shB: 160, elB: 14, shF: 168, elF: 12, hipB: 8, knB: -4, hipF: -8, knF: -4, sit: 0 },
  fists: { lean: -4, head: -8, shB: 110, elB: 60, shF: 120, elF: 65, hipB: 8, knB: -4, hipF: -8, knF: -4, sit: 0 },
  point: { lean: 0, head: 0, shB: 6, elB: 12, shF: 90, elF: 4, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
  whistle: { lean: -2, head: -4, shB: 6, elB: 12, shF: 30, elF: 128, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
  sad: { lean: 12, head: 20, shB: 2, elB: 8, shF: -2, elF: 8, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
  hips: { lean: 2, head: 6, shB: -30, elB: 104, shF: -24, elF: 108, hipB: 6, knB: -2, hipF: -6, knF: -2, sit: 0 },
  header: { lean: -26, head: -30, shB: 115, elB: 30, shF: 95, elF: 25, hipB: 35, knB: -70, hipF: -25, knF: -55, sit: 0 },
  dive: { lean: 0, head: -10, shB: 172, elB: 6, shF: 168, elF: 6, hipB: 14, knB: -18, hipF: -12, knF: -22, sit: 0 },
  ready: { lean: 12, head: -6, shB: 40, elB: 50, shF: 48, elF: 56, hipB: 22, knB: -36, hipF: -16, knF: -32, sit: 0 },
  fall: { lean: 72, head: -24, shB: 150, elB: 20, shF: 120, elF: 30, hipB: -25, knB: -15, hipF: 30, knF: -25, sit: 0 },
  kick: { lean: -12, head: -6, shB: -40, elB: 30, shF: 55, elF: 40, hipB: -22, knB: -6, hipF: 75, knF: -8, sit: 0 },
  tackle: { lean: -18, head: -8, shB: -30, elB: 30, shF: 40, elF: 30, hipB: 18, knB: -40, hipF: 70, knF: -4, sit: 0 },
  hug: { lean: 6, head: 6, shB: 72, elB: 62, shF: 80, elF: 58, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
  handsHead: { lean: 6, head: 10, shB: 165, elB: 150, shF: 168, elF: 146, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
  airplane: { lean: -10, head: -8, shB: -88, elB: 6, shF: 92, elF: 6, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 },
  lift: { lean: -8, head: -18, shB: 172, elB: 34, shF: 176, elF: 30, hipB: 4, knB: -2, hipF: -4, knF: -2, sit: 0 },
  cane: { lean: 8, head: 4, shB: 8, elB: 14, shF: 26, elF: 40, hipB: 4, knB: -6, hipF: -2, knF: -6, sit: 0 },
  coverEyes: { lean: 8, head: 8, shB: 30, elB: 140, shF: 36, elF: 136, hipB: 22, knB: -22, hipF: -14, knF: 14, sit: 1, thighK: .35 },
};
function mixPose(a, b, k) { const o = {}; for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) { const d = key === 'thighK' ? 1 : key === 'hipH' ? 144 : 0; o[key] = lerp(a[key] ?? d, b[key] ?? d, k); } return o; }
function poseAt(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) { const [t0, p0] = keys[i], [t1, p1] = keys[i + 1]; if (t < t1) return mixPose(p0, p1, E.inOut((t - t0) / (t1 - t0))); }
  return keys[keys.length - 1][1];
}
// ---------- marcha con cinemática inversa (pies plantados sin patinar) ----------
// fase φ∈[0,1): 0 = contacto del talón adelante; el pie de apoyo se mueve en línea recta hacia atrás a velocidad
// constante (igual a la del cuerpo), así que no patina. Pierna de 74+72; rodilla siempre hacia adelante.
const LEG1 = 74, LEG2 = 72;
const GAITS = {
  run: { st: .38, xc: 38, xt: 86, H: 124, Hamp: 5, flight: 9, lift: 16, swingUp: 96, lean: 13, head: -8, arm: 46, elb: 84 },
  jog: { st: .45, xc: 30, xt: 62, H: 132, Hamp: 3, flight: 4, lift: 10, swingUp: 60, lean: 8, head: -4, arm: 30, elb: 78 },
  walk: { st: .62, xc: 34, xt: 40, H: 141, Hamp: 2, flight: 0, lift: 6, swingUp: 18, lean: 3, head: 0, arm: 16, elb: 16 },
};
function gaitStride(g) { return (g.xc + g.xt) / g.st; } // distancia por ciclo a escala 1
const STRIDE = gaitStride(GAITS.run);
function ik2(dx, dy) { // devuelve [ángulo muslo, flexión rodilla] (convención del rig)
  let d = Math.hypot(dx, dy); d = clamp(d, 20, LEG1 + LEG2 - .5);
  const a = Math.atan2(dx, dy), al = Math.acos(clamp((LEG1 * LEG1 + d * d - LEG2 * LEG2) / (2 * LEG1 * d), -1, 1));
  const th = a + al, kx = Math.sin(th) * LEG1, ky = Math.cos(th) * LEG1;
  const sh = Math.atan2(dx - kx, dy - ky); return [th * 180 / PI, (sh - th) * 180 / PI];
}
function smooth01(k) { k = clamp(k); return k * k * (3 - 2 * k); }
// trayectoria del tobillo respecto a la cadera (x adelante, y hacia abajo) y giro del pie (+ = punta abajo)
function footPath(ph, g, H) {
  ph = ((ph % 1) + 1) % 1;
  if (ph < g.st) { const k = ph / g.st, heel = smooth01((k - .55) / .45); return [lerp(g.xc, -g.xt, k), H - heel * g.lift, heel * 32]; }
  const k = (ph - g.st) / (1 - g.st); // balanceo: talón hacia el glúteo, rodilla al frente, extensión y caída
  const x = -g.xt + (g.xc + g.xt) * smooth01((k - .12) / .8) + Math.sin(PI * smooth01((k - .3) / .65)) * 14;
  const up = Math.sin(PI * Math.pow(k, .8)) * g.swingUp * (1 - .55 * smooth01((k - .55) / .45)) + g.lift * (1 - smooth01(k / .25));
  const rot = lerp(32 + 25 * Math.sin(PI * clamp(k / .5)), -12, smooth01((k - .55) / .4)) * (1 - smooth01((k - .9) / .1));
  return [x, H - up, rot];
}
function gait(ph, kind = 'run', amp = 1) {
  const g = typeof kind === 'string' ? GAITS[kind] : kind;
  ph = ((ph % 1) + 1) % 1;
  // altura de cadera: más baja a media pisada (rodilla flexionada), más alta en la fase de vuelo
  const half = (ph % .5) / .5, fl = g.st < .5 ? clamp((half - 2 * g.st) / (1 - 2 * g.st)) : 0;
  const H = g.H - g.Hamp * Math.cos(TAU * (half - g.st)) + g.flight * Math.sin(PI * fl);
  const [xf, yf, rf] = footPath(ph, g, H), [xb, yb, rb] = footPath(ph + .5, g, H);
  const [hF, kF] = ik2(xf, yf), [hB, kB] = ik2(xb, yb);
  const sw = Math.cos(TAU * (ph + .5 - .97)); // brazo delantero opuesto a la pierna delantera
  return { lean: g.lean * amp, head: g.head * amp, hipF: hF, knF: kF, hipB: hB, knB: kB, ftF: rf, ftB: rb,
    shF: g.arm * sw - 6, elF: g.elb + 14 * Math.max(0, sw), shB: -g.arm * sw - 6, elB: g.elb + 14 * Math.max(0, -sw),
    hipH: H + 9, bob: 0, sit: 0, gait: 1 };
}
function runCycle(ph, amp = 1) { return gait(ph / TAU, 'run', amp); }
function walkCycle(ph, amp = 1) { return gait(ph / TAU, 'walk', amp); }
// fase de carrera a partir de la distancia recorrida (pies sin patinar): devuelve radianes para runCycle
function runPhase(dist, s, off = 0, kind = 'run') { return dist / (gaitStride(GAITS[kind]) * s) * TAU + off; }
function blinkAt(t, seed) { const per = 3.0 + hash(seed) * 2.4, ph = ((t + hash(seed + 3) * 5) % per); return ph < .14 ? Math.sin(ph / .14 * PI) : 0; }

function tube(ctx, p0, p1, p2, w0, w2, col, grow = 0) {
  const c = [2 * p1[0] - (p0[0] + p2[0]) / 2, 2 * p1[1] - (p0[1] + p2[1]) / 2];
  const N = 14, L = [], R = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, d = t * t;
    const x = a * p0[0] + b * c[0] + d * p2[0], y = a * p0[1] + b * c[1] + d * p2[1];
    const dx = 2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p2[0] - c[0]), dy = 2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p2[1] - c[1]);
    const len = Math.hypot(dx, dy) || 1, w = (lerp(w0, w2, t) + grow) / 2;
    L.push([x - dy / len * w, y + dx / len * w]); R.push([x + dy / len * w, y - dx / len * w]);
  }
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]); L.forEach(p => ctx.lineTo(p[0], p[1])); for (let i = R.length - 1; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(p0[0], p0[1], (w0 + grow) / 2, 0, TAU); ctx.arc(p2[0], p2[1], (w2 + grow) / 2, 0, TAU); ctx.fill();
}
function seg(p, ang, len) { return [p[0] + Math.sin(D2R(ang)) * len, p[1] + Math.cos(D2R(ang)) * len]; }
function pt(a, b, k) { return [lerp(a[0], b[0], k), lerp(a[1], b[1], k)]; }
function shade(col, k) {
  let r, g, b; if (col[0] === '#') { if (col.length === 4) col = '#' + col[1] + col[1] + col[2] + col[2] + col[3] + col[3]; const n = parseInt(col.slice(1), 16); r = n >> 16; g = (n >> 8) & 255; b = n & 255; } else { [r, g, b] = col.match(/\d+/g).map(Number); }
  if (k < 0) { r *= 1 + k; g *= 1 + k; b *= 1 + k; } else { r += (255 - r) * k; g += (255 - g) * k; b += (255 - b) * k; }
  return `rgb(${r | 0},${g | 0},${b | 0})`;
}

// o: {x,y,s,dir,pose,face,t,seed, shirt, sleeves:'long'|'short', shorts, socks, hood, acc:{cap,glasses,mustache,hairAbu,whistle,gloves,stripe,num}, rim, light, mouth, look, jump, squash, back}
function figure(ctx, o) {
  const s = o.s || 1, dir = o.dir || 1, p = Object.assign({}, POSE.stand, o.pose || {}), t = o.t || 0, seed = o.seed || 1, ink = o.ink || P.ink;
  const breath = Math.sin(t * 2.1 + seed) * (o.still ? 0 : 1);
  const rim = o.rim || 'rgba(255,186,120,1)', L = o.light || [-1, -.7], acc = o.acc || {};
  const short = o.sleeves === 'short';
  ctx.save(); ctx.translate(o.x, o.y - (o.jump || 0)); ctx.scale(s * dir, s);
  if (!o.noShadow) { const sh = o.jump ? clamp(1 - o.jump / 300, .2, 1) : 1; ctx.save(); ctx.translate(0, (o.jump || 0) / s); ctx.scale(1, .16); ctx.fillStyle = `rgba(0,0,0,${.45 * sh})`; ctx.beginPath(); ctx.arc(p.sit ? 20 : 0, 0, 56 * sh, 0, TAU); ctx.fill(); ctx.restore(); }
  const hipH = p.hipH != null && !p.sit ? p.hipH : lerp(144, (p.thighK ?? 1) < .99 ? lerp(84, 94, clamp((1 - (p.thighK ?? 1)) / .65)) : 84, clamp(p.sit || 0));
  const hip = [0, -hipH - (p.bob || 0)];
  const up = [Math.sin(D2R(p.lean)), -Math.cos(D2R(p.lean))], perp = [-up[1], up[0]];
  const torsoLen = 86 * (1 + .012 * breath);
  const neck = [hip[0] + up[0] * torsoLen, hip[1] + up[1] * torsoLen];
  const shoulderB = [neck[0] - perp[0] * 14 - up[0] * 13, neck[1] - perp[1] * 14 - up[1] * 13];
  const shoulderF = [neck[0] + perp[0] * 14 - up[0] * 13, neck[1] + perp[1] * 14 - up[1] * 13];
  const headAng = p.lean + (p.head || 0) + Math.sin(t * 1.3 + seed) * 1.2 * (o.still ? 0 : 1);
  const headC = [neck[0] + Math.sin(D2R(headAng)) * 50, neck[1] - Math.cos(D2R(headAng)) * 50 + breath * .6];
  const R = 44;
  const leg = (side) => { const h = [hip[0] + (side === 'B' ? -3 : 3), hip[1]]; const k = seg(h, p['hip' + side], 74 * (p.thighK ?? 1)); const a = seg(k, p['hip' + side] + p['kn' + side], 72); return [h, k, a]; };
  const arm = (side) => { const sh = side === 'B' ? shoulderB : shoulderF; const e = seg(sh, p['sh' + side], 58); const w = seg(e, p['sh' + side] + p['el' + side], 54); return [sh, e, w]; };
  const LB = leg('B'), LF = leg('F'), AB = arm('B'), AF = arm('F');
  // pie: plano sobre el piso cuando apoya, sigue a la espinilla cuando está en el aire
  const footFn = (Lg, side) => (c, g) => {
    const a = Lg[2], shin = p['hip' + side] + p['kn' + side], air = clamp(-(a[1]) / 40, 0, 1);
    ctx.save(); ctx.translate(a[0], a[1]); ctx.rotate(p['ft' + side] != null ? D2R(p['ft' + side]) : -D2R(shin) * air * .85);
    ctx.beginPath(); ctx.moveTo(-7 - g, -6 - g); ctx.quadraticCurveTo(14, -10 - g, 25 + g, 2); ctx.quadraticCurveTo(27 + g, 9 + g, 18, 9 + g); ctx.lineTo(-8 - g, 9 + g); ctx.quadraticCurveTo(-12 - g, 2, -7 - g, -6 - g); ctx.fill();
    if (!c && o.socks) { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(2, 0, 14, 2.5); }
    ctx.restore();
  };
  const parts = [], add = fn => parts.push(fn);
  const LW = [15.5, 11], AW = [12.5, 9.5];
  const back = (col) => shade(col, -.3);
  // --- capa trasera: pierna y brazo de atrás
  add((c, g) => { tube(ctx, LB[0], LB[1], LB[2], LW[0], LW[1], c || '#08080c', g); ctx.fillStyle = c || '#06060a'; footFn(LB, 'B')(c, g); });
  if (o.socks) add((c) => { if (c) return; tube(ctx, pt(LB[1], LB[2], .45), pt(LB[1], LB[2], .7), LB[2], 12.5, 12, back(o.socks)); });
  add((c, g) => { tube(ctx, AB[0], AB[1], AB[2], AW[0], AW[1], c || '#08080c', g); ctx.beginPath(); ctx.fillStyle = c || acc.gloves || '#08080c'; ctx.arc(AB[2][0], AB[2][1], (acc.gloves ? 12 : 8) + g / 2, 0, TAU); ctx.fill(); });
  if (o.shirt) add((c) => { if (c) return; if (short) tube(ctx, AB[0], pt(AB[0], AB[1], .3), pt(AB[0], AB[1], .55), 21, 19, back(o.shirt)); else tube(ctx, AB[0], AB[1], pt(AB[1], AB[2], .86), 19, 15, back(o.shirt)); });
  if (o.hood) add((c, g) => { ctx.fillStyle = c || shade(o.shirt, -.18); ctx.beginPath(); ctx.ellipse(neck[0] - perp[0] * 10 - up[0] * 2, neck[1] - perp[1] * 10 - up[1] * 2, 21 + g, 13 + g, D2R(p.lean), 0, TAU); ctx.fill(); });
  // --- pierna de adelante
  add((c, g) => { tube(ctx, LF[0], LF[1], LF[2], LW[0], LW[1], c || ink, g); ctx.fillStyle = c || '#0b0b10'; footFn(LF, 'F')(c, g); });
  if (o.socks) add((c) => { if (c) return; tube(ctx, pt(LF[1], LF[2], .45), pt(LF[1], LF[2], .7), LF[2], 13, 12.5, o.socks); });
  // short (una sola prenda que cubre cadera y arranque de muslos)
  if (o.shorts) add((c, g) => {
    if (c) return; const col = o.shorts;
    tube(ctx, LB[0], pt(LB[0], LB[1], .25), pt(LB[0], LB[1], .5), 25, 23, back(col));
    tube(ctx, LF[0], pt(LF[0], LF[1], .25), pt(LF[0], LF[1], .5), 26, 24, col);
    ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(hip[0], hip[1] - 2, 22, 14, D2R(p.lean), 0, TAU); ctx.fill();
  });
  // --- torso (sudadera, playera o silueta)
  add((c, g) => {
    const top = [neck[0] - up[0] * 4, neck[1] - up[1] * 4];
    const Q = (a, b) => [top[0] + perp[0] * a - up[0] * b, top[1] + perp[1] * a - up[1] * b];
    const clothed = !!o.shirt, wS = (clothed ? 23 : 14) + g, wC = (clothed ? 23 : 12) + g, wH = (clothed ? 21 : 10) + g, Lt = torsoLen - 2;
    ctx.fillStyle = c || (o.shirt || ink); ctx.beginPath();
    let q = Q(-wS * .55, -g); ctx.moveTo(q[0], q[1]);
    let cp = Q(0, -6 - g); q = Q(wS * .55, -g); ctx.quadraticCurveTo(cp[0], cp[1], q[0], q[1]);
    cp = Q(wS + 2, 2); q = Q(wS, 16); ctx.quadraticCurveTo(cp[0], cp[1], q[0], q[1]);
    cp = Q(wC + 1, Lt * .55); q = Q(wH, Lt + g); ctx.quadraticCurveTo(cp[0], cp[1], q[0], q[1]);
    cp = Q(0, Lt + 5 + g); q = Q(-wH, Lt + g); ctx.quadraticCurveTo(cp[0], cp[1], q[0], q[1]);
    cp = Q(-wC - 1, Lt * .55); q = Q(-wS, 16); ctx.quadraticCurveTo(cp[0], cp[1], q[0], q[1]);
    cp = Q(-wS - 2, 2); q = Q(-wS * .55, -g); ctx.quadraticCurveTo(cp[0], cp[1], q[0], q[1]);
    ctx.closePath(); ctx.fill();
    if (!c && clothed) {
      ctx.save(); ctx.clip();
      const a = Q(-wS, 0), b = Q(wS, 0), gr = ctx.createLinearGradient(a[0], a[1], b[0], b[1]);
      gr.addColorStop(0, 'rgba(0,0,0,.36)'); gr.addColorStop(.45, 'rgba(0,0,0,.06)'); gr.addColorStop(.85, 'rgba(255,255,255,.08)'); gr.addColorStop(1, 'rgba(255,255,255,.16)');
      ctx.fillStyle = gr; ctx.fillRect(-300, -500, 600, 600);
      const line = (pts, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); pts.forEach((pp, i) => { const qq = Q(pp[0], pp[1]); i ? ctx.lineTo(qq[0], qq[1]) : ctx.moveTo(qq[0], qq[1]); }); ctx.stroke(); };
      const poly = (pts, col) => { ctx.fillStyle = col; ctx.beginPath(); pts.forEach((pp, i) => { const qq = Q(pp[0], pp[1]); i ? ctx.lineTo(qq[0], qq[1]) : ctx.moveTo(qq[0], qq[1]); }); ctx.fill(); };
      if (o.hood) { // sudadera: dobladillo, bolsa canguro y cordones con vaivén
        poly([[-40, Lt - 9], [40, Lt - 9], [40, Lt + 20], [-40, Lt + 20]], 'rgba(0,0,0,.2)');
        line([[-15, Lt - 11], [-11, Lt - 33], [11, Lt - 33], [15, Lt - 11]], 'rgba(0,0,0,.22)', 2);
        const sw = Math.sin(t * 2.4 + seed) * 2 + p.lean * .15;
        line([[4, 4], [5 + sw, 30]], 'rgba(255,255,255,.85)', 2.2); line([[12, 4], [13 + sw, 26]], 'rgba(255,255,255,.85)', 2.2);
      } else if (short) { // uniforme: cuello en V, costuras, número
        poly([[-9, -1], [9, -1], [0, 13]], 'rgba(0,0,0,.35)'); line([[-11, -1], [0, 15], [11, -1]], 'rgba(255,255,255,.55)', 2.4);
        poly([[-40, Lt - 7], [40, Lt - 7], [40, Lt + 20], [-40, Lt + 20]], 'rgba(0,0,0,.14)');
        if (acc.num) { const q2 = Q(2, Lt * .5); ctx.save(); ctx.translate(q2[0], q2[1]); ctx.rotate(D2R(p.lean)); ctx.scale(dir, 1); text(ctx, acc.num, 0, 0, { size: 24, color: acc.numCol || 'rgba(255,255,255,.88)' }); ctx.restore(); }
      } else { poly([[-40, Lt - 8], [40, Lt - 8], [40, Lt + 20], [-40, Lt + 20]], 'rgba(0,0,0,.14)'); line([[-9, 0], [0, 8], [9, 0]], 'rgba(0,0,0,.25)', 2); }
      if (acc.stripe) poly([[-40, 30], [40, 30], [40, 40], [-40, 40]], acc.stripe);
      if (acc.vstripes) [-20, -7, 6, 19].forEach(a => poly([[a, -6], [a + 6.5, -6], [a + 6.5, Lt + 22], [a, Lt + 22]], acc.vstripes));
      ctx.restore();
    }
  });
  // --- cabeza (con estiramiento/aplastamiento)
  const sq = o.squash || 0;
  add((c, g) => {
    ctx.save(); ctx.translate(headC[0], headC[1]); ctx.scale(1 - sq * .5, 1 + sq);
    if (!c && acc.hairAbu) { ctx.fillStyle = '#dcd8d0'; ctx.beginPath(); ctx.ellipse(-27, 8, 13, 22, .1, 0, TAU); ctx.fill(); }
    ctx.fillStyle = c || ink; ctx.beginPath(); ctx.arc(0, 0, R + g, 0, TAU); ctx.fill();
    if (!c) { const hg = ctx.createRadialGradient(-14, -18, 4, 0, 0, R); hg.addColorStop(0, 'rgba(255,255,255,.07)'); hg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fill(); }
    if (acc.cap) { ctx.fillStyle = c || acc.cap; ctx.beginPath(); ctx.arc(0, -4, R + 3 + g, PI * 1.05, PI * 1.95); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.ellipse(36, -14, 34 + g, 9 + g, -.08, 0, TAU); ctx.fill();
      if (!c) { ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.arc(-4, -24, 24, PI * 1.15, PI * 1.6); ctx.lineTo(-4, -20); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-R, -10, 2 * R, 4); } }
    ctx.restore();
  });
  // --- brazo de adelante
  add((c, g) => { tube(ctx, AF[0], AF[1], AF[2], AW[0], AW[1], c || ink, g); ctx.beginPath(); ctx.fillStyle = c || acc.gloves || ink; ctx.arc(AF[2][0], AF[2][1], (acc.gloves ? 13 : 8.5) + g / 2, 0, TAU); ctx.fill(); });
  if (o.shirt) add((c) => { if (c) return; if (short) { tube(ctx, AF[0], pt(AF[0], AF[1], .3), pt(AF[0], AF[1], .58), 22, 20, o.shirt); const e = pt(AF[0], AF[1], .58); ctx.fillStyle = shade(o.shirt, -.25); ctx.beginPath(); ctx.arc(e[0], e[1], 10, 0, TAU); ctx.fill(); }
    else { const cuff = pt(AF[1], AF[2], .86); tube(ctx, AF[0], AF[1], cuff, 20, 16, o.shirt); ctx.fillStyle = shade(o.shirt, -.22); ctx.beginPath(); ctx.arc(cuff[0], cuff[1], 8.5, 0, TAU); ctx.fill(); } });
  // borde de luz (todo desplazado hacia la luz y engrosado) y luego el relleno
  ctx.save(); ctx.translate(L[0] * 2.2 * dir, L[1] * 2.2); parts.forEach(fn => fn(rim, 2.6)); ctx.restore();
  parts.forEach(fn => fn(null, 0));
  if (!o.back) { ctx.save(); ctx.translate(headC[0], headC[1]); ctx.scale(1 - sq * .5, 1 + sq); face(ctx, [0, 0], R, o, t, seed); ctx.restore(); }
  if (o.handsOverFace) { const fa = parts.slice(-(o.shirt ? 2 : 1)); ctx.save(); ctx.translate(L[0] * 2.2 * dir, L[1] * 2.2); fa.forEach(fn => fn(rim, 2.6)); ctx.restore(); fa.forEach(fn => fn(null, 0)); }
  if (acc.cane) { const hnd = AF[2]; ctx.save(); ctx.strokeStyle = '#5a3a22'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hnd[0] + 4, hnd[1]); ctx.lineTo(hnd[0] + 16, 0); ctx.stroke(); ctx.beginPath(); ctx.arc(hnd[0] - 4, hnd[1] - 2, 9, PI * 1.05, PI * 2.05); ctx.stroke(); ctx.restore(); }
  if (acc.whistle) { ctx.fillStyle = '#c9ced6'; rr(ctx, headC[0] + 20, headC[1] + 20, 20, 10, 4); ctx.fill(); }
  ctx.restore();
  return { headC, hand: AF[2], handB: AB[2], footF: LF[2], footB: LB[2] };
}

// ---------- cara v3 ----------
const EXPR = { // párpado superior (interior, exterior) en px que baja; cejas (interior, exterior) en px hacia arriba; boca; pupilas
  neutral: { lid: [2, 2], brow: [0, 0], mouth: 'flat' },
  smile: { lid: [2, 3], brow: [1, 1], mouth: 'smile' },
  happy: { eyes: 'arc', brow: [3, 2], mouth: 'smile' },
  laugh: { eyes: 'arc', brow: [5, 3], mouth: 'grin' },
  shout: { lid: [5, 0], brow: [-5, 3], mouth: 'shout', pupil: 1 },
  cheer: { eyes: 'arc', brow: [6, 4], mouth: 'shout' },
  shock: { lid: [-1, -1], brow: [7, 6], mouth: 'o', pupil: 1, big: 1 },
  scared: { lid: [0, 0], brow: [8, 2], mouth: 'wobble', pupil: 1, big: 1 },
  determined: { lid: [7, 2], brow: [-6, 2], mouth: 'flat' },
  angry: { lid: [8, 1], brow: [-8, 2], mouth: 'frown' },
  sad: { lid: [1, 6], brow: [6, -3], mouth: 'frown' },
  cry: { eyes: 'closed', brow: [7, -3], mouth: 'wobble', tears: 1 },
  smug: { lid: [9, 9], brow: [-2, 3], mouth: 'smirk', glint: 1 },
  closed: { eyes: 'closed', brow: [0, 0], mouth: 'flat' },
  tender: { eyes: 'arc', brow: [4, -1], mouth: 'smile' },
};
function face(ctx, hc, R, o, t, seed) {
  const ex = EXPR[o.face] || EXPR.neutral, bl = o.blink === false ? 0 : blinkAt(t, seed), look = o.look || [0, 0];
  const fx = hc[0] + 13 + look[0] * .6, fy = hc[1] - 3 + look[1] * .6;
  const W2 = '#ffffff';
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // ojos: cercano (adelante, +x) y lejano (atrás, -x, un poco más chico por la vista 3/4)
  const eyes = [{ x: fx + 12, y: fy, k: 1, inner: -1 }, { x: fx - 11, y: fy + .5, k: .86, inner: 1 }];
  const big = ex.big ? 1.18 : 1;
  eyes.forEach(e => {
    const rx = 7.6 * e.k * big, ry = 10.6 * e.k * big;
    if (ex.eyes === 'arc') { ctx.strokeStyle = W2; ctx.lineWidth = 4.6 * e.k; ctx.beginPath(); ctx.arc(e.x, e.y + 5, rx + 1, PI * 1.12, PI * 1.88); ctx.stroke(); return; }
    if (ex.eyes === 'closed' || bl > .85) { ctx.strokeStyle = W2; ctx.lineWidth = 4 * e.k; ctx.beginPath(); ctx.moveTo(e.x - rx, e.y + 1); ctx.quadraticCurveTo(e.x, e.y + 5, e.x + rx, e.y + 1); ctx.stroke(); return; }
    ctx.save(); ctx.beginPath(); ctx.ellipse(e.x, e.y, rx, ry, 0, 0, TAU); ctx.fillStyle = W2; ctx.fill(); ctx.clip();
    { // sombra del párpado (profundidad) + pupila siempre presente (mirada), más chica en sorpresa
      const sg = ctx.createLinearGradient(0, e.y - ry, 0, e.y + ry); sg.addColorStop(0, 'rgba(40,30,60,.35)'); sg.addColorStop(.35, 'rgba(40,30,60,0)'); sg.addColorStop(1, 'rgba(120,110,140,.18)'); ctx.fillStyle = sg; ctx.fillRect(e.x - rx, e.y - ry, 2 * rx, 2 * ry);
      const pr = (ex.big ? 2.6 : ex.pupil ? 3.9 : 4.6) * e.k, px = e.x + 1.6 + look[0] * .35, py = e.y + 1.5 + look[1] * .35;
      ctx.fillStyle = P.ink; ctx.beginPath(); ctx.ellipse(px, py, pr, pr * 1.18, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px + pr * .35, py - pr * .45, Math.max(1, pr * .32), 0, TAU); ctx.fill(); }
    // párpado superior (corta el ojo con una línea inclinada) + parpadeo
    const lidIn = (ex.lid ? ex.lid[0] : 2) + bl * ry * 2, lidOut = (ex.lid ? ex.lid[1] : 2) + bl * ry * 2;
    const yIn = e.y - ry + lidIn, yOut = e.y - ry + lidOut, xIn = e.x + e.inner * (rx + 2), xOut = e.x - e.inner * (rx + 2);
    ctx.fillStyle = P.ink; ctx.beginPath(); ctx.moveTo(xIn, yIn); ctx.lineTo(xOut, yOut); ctx.lineTo(xOut, e.y - ry - 8); ctx.lineTo(xIn, e.y - ry - 8); ctx.closePath(); ctx.fill();
    ctx.restore();
  });
  // cejas afiladas (más gruesas al centro)
  const br = ex.brow || [0, 0];
  eyes.forEach(e => {
    const w = 9 * e.k, y0 = e.y - 17 * e.k;
    const xi = e.x + e.inner * w, xo = e.x - e.inner * w, yi = y0 - br[0] * .8, yo = y0 - br[1] * .8;
    const mx = (xi + xo) / 2, my = (yi + yo) / 2 - 1.5;
    ctx.fillStyle = W2; ctx.beginPath(); ctx.moveTo(xi, yi + 1); ctx.quadraticCurveTo(mx, my - 2.6, xo, yo + .6); ctx.quadraticCurveTo(mx, my + 2.2, xi, yi + 1); ctx.fill();
  });
  // boca
  const mx = fx + 3, my = hc[1] + 22, open = o.mouth ?? 0, mt = open > .25 && (ex.mouth === 'flat' || ex.mouth === 'smile') ? 'talk' : ex.mouth;
  ctx.fillStyle = W2; ctx.strokeStyle = W2;
  if (mt === 'flat') { ctx.lineWidth = 3.8; ctx.beginPath(); ctx.moveTo(mx - 7, my); ctx.quadraticCurveTo(mx, my + 1, mx + 7, my - .5); ctx.stroke(); }
  else if (mt === 'smile') { ctx.beginPath(); ctx.moveTo(mx - 12, my - 4); ctx.quadraticCurveTo(mx, my + 10, mx + 12, my - 5); ctx.quadraticCurveTo(mx, my + 4, mx - 12, my - 4); ctx.fill(); }
  else if (mt === 'grin') { ctx.beginPath(); ctx.moveTo(mx - 13, my - 4); ctx.lineTo(mx + 13, my - 5); ctx.quadraticCurveTo(mx + 11, my + 14, mx, my + 14); ctx.quadraticCurveTo(mx - 11, my + 14, mx - 13, my - 4); ctx.fill(); ctx.fillStyle = '#5a1a22'; ctx.beginPath(); ctx.ellipse(mx, my + 8, 7, 3.6, 0, 0, TAU); ctx.fill(); }
  else if (mt === 'shout' || mt === 'talk') {
    const h = mt === 'shout' ? 15 : 5 + open * 9, w = mt === 'shout' ? 12 : 9;
    ctx.fillStyle = '#2a0c12'; ctx.beginPath(); ctx.moveTo(mx - w, my - 3); ctx.quadraticCurveTo(mx, my - 6, mx + w, my - 3); ctx.quadraticCurveTo(mx + w - 1, my + h, mx, my + h + 1); ctx.quadraticCurveTo(mx - w + 1, my + h, mx - w, my - 3); ctx.fill();
    ctx.save(); ctx.clip(); ctx.fillStyle = W2; ctx.fillRect(mx - w - 2, my - 8, 2 * w + 4, 6.5); ctx.fillStyle = '#c4525e'; ctx.beginPath(); ctx.ellipse(mx + 1, my + h, w * .6, h * .32, 0, 0, TAU); ctx.fill(); ctx.restore();
    ctx.lineWidth = 2.4; ctx.strokeStyle = W2; ctx.beginPath(); ctx.moveTo(mx - w, my - 3); ctx.quadraticCurveTo(mx, my - 6, mx + w, my - 3); ctx.quadraticCurveTo(mx + w - 1, my + h, mx, my + h + 1); ctx.quadraticCurveTo(mx - w + 1, my + h, mx - w, my - 3); ctx.stroke();
  }
  else if (mt === 'o') { ctx.fillStyle = '#2a0c12'; ctx.beginPath(); ctx.ellipse(mx, my + 2, 5.5, 7.5, 0, 0, TAU); ctx.fill(); ctx.lineWidth = 2.6; ctx.stroke(); }
  else if (mt === 'frown') { ctx.beginPath(); ctx.moveTo(mx - 11, my + 5); ctx.quadraticCurveTo(mx, my - 6, mx + 11, my + 5); ctx.quadraticCurveTo(mx, my - 1, mx - 11, my + 5); ctx.fill(); }
  else if (mt === 'smirk') { ctx.beginPath(); ctx.moveTo(mx - 9, my + 1); ctx.quadraticCurveTo(mx + 3, my + 6, mx + 13, my - 5); ctx.quadraticCurveTo(mx + 3, my + 2, mx - 9, my + 1); ctx.fill(); }
  else if (mt === 'wobble') { ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(mx - 10, my + 2); for (let i = 1; i <= 6; i++) ctx.lineTo(mx - 10 + i * 3.4, my + 2 + (i % 2 ? -2.5 : 2.5)); ctx.stroke(); }
  if (ex.glint || o.glint) { glow(ctx, eyes[0].x + 3, eyes[0].y - 4, 18, 'rgba(255,240,200,.9)'); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(eyes[0].x + 3, eyes[0].y - 4, 2.3, 0, TAU); ctx.fill(); }
  const acc = o.acc || {};
  if (acc.mustache) { ctx.fillStyle = '#ebe8e2'; ctx.beginPath(); ctx.moveTo(mx - 16, my - 3); ctx.quadraticCurveTo(mx - 10, my - 16, mx, my - 10); ctx.quadraticCurveTo(mx + 10, my - 16, mx + 17, my - 4); ctx.quadraticCurveTo(mx + 8, my - 6, mx, my - 5); ctx.quadraticCurveTo(mx - 8, my - 6, mx - 16, my - 3); ctx.fill(); }
  if (acc.glasses) { ctx.strokeStyle = 'rgba(232,232,238,.92)'; ctx.lineWidth = 2.6; eyes.forEach(e => { ctx.beginPath(); rr(ctx, e.x - 11 * e.k, e.y - 10 * e.k, 22 * e.k, 19 * e.k, 6); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(eyes[1].x + 11 * .86, fy - 2); ctx.lineTo(eyes[0].x - 11, fy - 2); ctx.stroke(); }
  if (ex.tears) { ctx.fillStyle = '#8fd6ff'; [0, 1].forEach(i => { const k = (t * 1.1 + i * .5) % 1; ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.ellipse(eyes[i].x + (i ? -2 : 2), fy + 8 + k * 36, 3.4, 5.4, 0, 0, TAU); ctx.fill(); }); ctx.globalAlpha = 1; }
  ctx.restore();
}
// salto con anticipación (agacharse), vuelo parabólico y aterrizaje con amortiguación
function hop(t, t0, per, hgt) {
  if (t < t0) return { y: 0, sq: 0, crouch: 0 };
  const k = ((t - t0) % per) / per; let y = 0, c = 0, sq = 0;
  if (k < .2) { c = Math.sin(k / .2 * PI * .5); sq = -.07 * c; }
  else if (k < .86) { const a = (k - .2) / .66; y = hgt * 4 * a * (1 - a); c = Math.max(0, 1 - a * 6) * .6; sq = .06 * (1 - Math.abs(2 * a - 1)) * 0 + .05 * Math.max(0, 1 - a * 4) - .0; }
  else { const a = (k - .86) / .14; c = Math.sin(a * PI) * .8 + Math.max(0, 1 - a * 3) * 0; sq = -.08 * Math.sin(a * PI); }
  return { y, sq, crouch: c };
}
// versión agachada de una pose (rodillas flexionadas y cadera más baja, pies en el piso)
function crouchOf(pose, c) {
  if (c <= 0) return pose;
  return mixPose(pose, Object.assign({}, pose, { lean: (pose.lean || 0) + 12, hipB: 48, knB: -88, hipF: 40, knF: -84, hipH: 106 }), c);
}
