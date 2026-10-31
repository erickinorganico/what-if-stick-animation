// ¿Y si sí? · EP 02 — parte B (60–121.6 s): la cabeza, el chiste que muere, la generación, Plan Campeón, el chavo, la violencia baja y la vida diaria
function A3(phrase, after = 0) { const p = phrase.split(' ').map(norm); for (let i = 0; i < NW2.length; i++) { if (VO + WORDS_EP[i].start < after - .01) continue; let ok = true; for (let j = 0; j < p.length; j++) if (NW2[i + j] !== p[j]) { ok = false; break; } if (ok) return VO + WORDS_EP[i].start; } throw new Error('no encontré: ' + phrase); }
const TB = {
  noCalle: A3('no está en la calle', T.cambio), perd1: A3('perdimos como siempre', T.chiste), muere2: A3('muere', T.muere), crece: A3('crece', T.generacion),
  escuela: A3('escuela', T.cancha), colonia: A3('colonia', T.cancha), autos: A3('autos', T.fabricas), nadie: A3('nadie creía', T.entonces),
  quince: A3('quince', T.chavo), opcion: A3('una sola opción', T.chavo), ahora: A3('ahora tiene', T.esquina), ganar2: A3('y algo que ganar', T.perder),
  nada: A3('nada que contar', T.noticiero), contestar: A3('contestar', T.metro), sigue: A3('sigue ahí', T.dosdias), si2: A3('sí', T.bueno), pero3: A3('pero por costumbre', T.bueno),
};
const POSE2 = {
  shrug: Object.assign({}, POSE.stand, { shB: 22, elB: 88, shF: 28, elF: 82, head: 12, lean: -2 }),
  phoneChest: Object.assign({}, POSE.sitFront, { shF: 18, elF: 104, head: 10 }),
  phoneTalk: Object.assign({}, POSE.sitFront, { shF: 44, elF: 104, head: 2 }),
  lean: Object.assign({}, POSE.relaxed, { shF: 70, elF: 40, lean: 6 }),
};
// ---------- piezas ----------
function neonLayer(key, s, col) { return layer(key, 1500, 220, x => {
  x.font = '110px Anton'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '8px';
  x.shadowColor = col; x.shadowBlur = 36; x.fillStyle = col; x.fillText(s, 750, 110); x.shadowBlur = 14; x.fillText(s, 750, 110);
  x.shadowBlur = 0; x.lineWidth = 3; x.strokeStyle = 'rgba(255,255,255,.85)'; x.strokeText(s, 750, 110);
}); }
function shatterDraw(ctx, img, cx, cy, sk, dt, seed) { // el letrero se rompe en pedazos que caen
  const tw = 75, th = 55, cols = img.width / tw, rows = Math.ceil(img.height / th);
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const h1 = hash(seed + i * 13 + j * 7), h2 = hash(seed + i * 5 + j * 17 + 3), h3 = hash(seed + i * 11 + j * 3 + 9);
    const x0 = cx + (i * tw - img.width / 2 + tw / 2) * sk, y0 = cy + (j * th - img.height / 2 + th / 2) * sk;
    const vx = (h1 - .5) * 620 + (x0 - cx) * .7, vy = -180 - h2 * 380, x = x0 + vx * dt, y = y0 + vy * dt + 1300 * dt * dt;
    if (y > 1300) continue;
    ctx.save(); ctx.translate(x, y); ctx.rotate((h3 - .5) * 10 * dt); ctx.globalAlpha = clamp(1 - dt * .55); ctx.drawImage(img, i * tw, j * th, tw, th, -tw * sk / 2, -th * sk / 2, tw * sk, th * sk); ctx.restore();
  }
}
function barBG() { return layer('e2bar', W, H, x => {
  x.fillStyle = '#2a1a1a'; x.fillRect(0, 0, W, H);
  const r = rnd(9); for (let row = 0; row < 40; row++) for (let i = -1; i < 25; i++) { const v = 30 + r() * 22; x.fillStyle = `rgb(${v + 44},${v + 14},${v + 8})`; x.fillRect(i * 84 + (row % 2) * 42 + 2, row * 28 + 2, 80, 24); }
  x.fillStyle = 'rgba(0,0,0,.58)'; x.fillRect(0, 0, W, H);
  x.fillStyle = '#5a3a22'; x.fillRect(0, 800, W, 30); x.fillStyle = '#3a2416'; x.fillRect(0, 830, W, 250); x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(0, 830, W, 20);
  for (let i = 0; i < 9; i++) { x.fillStyle = '#2a1a10'; x.fillRect(80 + i * 220, 860, 6, 220); }
}); }
function mugDraw(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(255,200,90,.85)'; rr(ctx, -26, -70, 52, 70, 6); ctx.fill(); ctx.fillStyle = '#fff8e8'; rr(ctx, -28, -82, 56, 18, 8); ctx.fill(); ctx.strokeStyle = 'rgba(255,240,210,.8)'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(30, -36, 16, -PI / 2, PI / 2); ctx.stroke(); ctx.restore(); }
function streetBG(night) { return layer(night ? 'e2st_n' : 'e2st_d', W, H, x => {
  x.fillStyle = night ? vg(x, [[0, '#05071a'], [1, '#1c2140']], 0, 760) : vg(x, [[0, '#6fb0e6'], [1, '#d6ecf6']], 0, 760); x.fillRect(0, 0, W, H);
  const r = rnd(31), cols = night ? ['#151a2c', '#1a1f33', '#121626', '#1c1a2a'] : ['#e8c9a0', '#d9a07a', '#c7d6c0', '#e6dcc8', '#b8c8d8'];
  let bx = -40, n = 0; while (bx < W) { const bw = 230 + r() * 170, bh = 380 + r() * 200, c = cols[n++ % cols.length]; x.fillStyle = c; x.fillRect(bx, 760 - bh, bw, bh);
    for (let wy = 760 - bh + 40; wy < 600; wy += 90) for (let wx = bx + 30; wx < bx + bw - 60; wx += 80) { x.fillStyle = night ? (r() < .3 ? 'rgba(255,200,120,.75)' : 'rgba(8,10,18,.92)') : 'rgba(70,110,150,.75)'; x.fillRect(wx, wy, 44, 56); }
    x.fillStyle = night ? '#262a34' : '#9aa4ae'; x.fillRect(bx + 28, 640, bw - 56, 120); x.strokeStyle = 'rgba(0,0,0,.25)'; x.lineWidth = 2; for (let yy = 650; yy < 760; yy += 10) { x.beginPath(); x.moveTo(bx + 28, yy); x.lineTo(bx + bw - 28, yy); x.stroke(); }
    bx += bw + 6; }
  x.fillStyle = night ? '#23252e' : '#b9b5ad'; x.fillRect(0, 760, W, 100); x.fillStyle = night ? '#3a3c46' : '#dedad2'; x.fillRect(0, 760, W, 8);
  x.fillStyle = night ? '#121319' : '#5a5c63'; x.fillRect(0, 860, W, 220); x.strokeStyle = night ? 'rgba(255,220,90,.25)' : 'rgba(255,220,90,.8)'; x.setLineDash([70, 60]); x.lineWidth = 6; x.beginPath(); x.moveTo(0, 990); x.lineTo(W, 990); x.stroke(); x.setLineDash([]);
}); }
function lampPost(ctx, x, t, on) { ctx.fillStyle = '#22252e'; ctx.fillRect(x - 7, 300, 14, 560); ctx.fillRect(x - 7, 296, 90, 10); ctx.fillStyle = '#2c303a'; rr(ctx, x + 60, 300, 60, 22, 6); ctx.fill();
  if (on) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(0, 320, 0, 880); g.addColorStop(0, 'rgba(255,214,140,.38)'); g.addColorStop(1, 'rgba(255,214,140,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x + 70, 320); ctx.lineTo(x + 110, 320); ctx.lineTo(x + 300, 880); ctx.lineTo(x - 120, 880); ctx.closePath(); ctx.fill(); ctx.restore(); glow(ctx, x + 90, 320, 140, 'rgba(255,220,150,.8)'); } }
function iconDiploma(ctx, k, t) { ctx.save(); ctx.scale(k, k); ctx.rotate(-.2); ctx.fillStyle = '#f6efdc'; rr(ctx, -70, -22, 140, 44, 20); ctx.fill(); ctx.fillStyle = '#e0d4b4'; ctx.beginPath(); ctx.ellipse(-70, 0, 12, 22, 0, 0, TAU); ctx.fill(); ctx.fillStyle = P.red; ctx.fillRect(-8, -24, 16, 48); ctx.beginPath(); ctx.moveTo(-8, 22); ctx.lineTo(-20, 52); ctx.lineTo(-4, 44); ctx.lineTo(0, 22); ctx.fill(); ctx.beginPath(); ctx.moveTo(8, 22); ctx.lineTo(20, 52); ctx.lineTo(4, 44); ctx.lineTo(0, 22); ctx.fill(); ctx.restore(); }
function iconRobot(ctx, k, t) { ctx.save(); ctx.scale(k, k); const a = Math.sin(t * 2.4) * .25, g = .3 + .3 * Math.max(0, Math.sin(t * 4)); ctx.fillStyle = '#5a6577'; rr(ctx, -50, 34, 100, 22, 6); ctx.fill(); ctx.strokeStyle = '#ffb030'; ctx.lineCap = 'round'; ctx.lineWidth = 16;
  const j1 = [-20, 34], j2 = [j1[0] + Math.sin(-.5 + a) * 60, j1[1] - Math.cos(-.5 + a) * 60], j3 = [j2[0] + Math.sin(1.2 - a) * 54, j2[1] - Math.cos(1.2 - a) * 54];
  ctx.beginPath(); ctx.moveTo(...j1); ctx.lineTo(...j2); ctx.lineTo(...j3); ctx.stroke(); ctx.fillStyle = '#2a3140'; [j1, j2].forEach(j => { ctx.beginPath(); ctx.arc(j[0], j[1], 11, 0, TAU); ctx.fill(); });
  ctx.strokeStyle = '#cfd6e0'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(j3[0], j3[1]); ctx.lineTo(j3[0] + 14, j3[1] - 12 - g * 10); ctx.moveTo(j3[0], j3[1]); ctx.lineTo(j3[0] + 18, j3[1] + 6 + g * 10); ctx.stroke(); ctx.restore(); }
function iconGlove(ctx, k, t) { ctx.save(); ctx.scale(k, k); ctx.rotate(-.15 + Math.sin(t * 5) * .05); ctx.fillStyle = '#d6262e'; ctx.beginPath(); ctx.moveTo(-40, 40); ctx.quadraticCurveTo(-58, -30, -10, -48); ctx.quadraticCurveTo(52, -60, 50, 0); ctx.quadraticCurveTo(50, 36, 20, 40); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.ellipse(-44, 0, 18, 26, -.3, 0, TAU); ctx.fill();
  ctx.fillStyle = '#f2f2f2'; rr(ctx, -42, 38, 64, 26, 6); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.ellipse(10, -30, 22, 9, -.3, 0, TAU); ctx.fill(); ctx.restore(); }
function signPost(ctx, x, label, icon, k, t, w, lit) { if (k <= 0) return; const h = w * .78, y = 560;
  ctx.save(); ctx.globalAlpha *= clamp(k * 1.5); ctx.translate(x, y + (1 - k) * 40); ctx.fillStyle = '#3a3f4a'; ctx.fillRect(-6, h / 2, 12, 860 - y - h / 2);
  if (lit) glow(ctx, 0, 0, w * 1.3, 'rgba(255,214,90,.35)');
  ctx.fillStyle = 'rgba(14,16,26,.9)'; rr(ctx, -w / 2, -h / 2, w, h, 16); ctx.fill(); ctx.strokeStyle = P.yel; ctx.lineWidth = 4; rr(ctx, -w / 2, -h / 2, w, h, 16); ctx.stroke();
  ctx.save(); ctx.translate(0, -h * .1); icon(ctx, w / 230, t); ctx.restore();
  text(ctx, label, 0, h / 2 - 22, { size: w * .15, font: 'Montserrat', weight: 900, color: '#fff', ls: 2 });
  ctx.restore(); }
function arrowGround(ctx, x0, y0, x1, y1, col, k, w = 26) { if (k <= 0) return; const xe = lerp(x0, x1, k), ye = lerp(y0, y1, k), a = Math.atan2(ye - y0, xe - x0);
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.setLineDash([w * 1.4, w * 1.2]); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(xe - Math.cos(a) * w, ye - Math.sin(a) * w); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(xe + Math.cos(a) * w * 1.4, ye + Math.sin(a) * w * 1.4); ctx.lineTo(xe + Math.cos(a + 2.3) * w * 1.6, ye + Math.sin(a + 2.3) * w * 1.6); ctx.lineTo(xe + Math.cos(a - 2.3) * w * 1.6, ye + Math.sin(a - 2.3) * w * 1.6); ctx.closePath(); ctx.fill(); ctx.restore(); }
function bikeDraw(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(0, 4, 140, 10, 0, 0, TAU); ctx.fill();
  ctx.strokeStyle = '#1a1c22'; ctx.lineWidth = 9; [-80, 80].forEach(wx => { ctx.beginPath(); ctx.arc(wx, -60, 58, 0, TAU); ctx.stroke(); }); ctx.strokeStyle = 'rgba(200,200,210,.5)'; ctx.lineWidth = 2; [-80, 80].forEach(wx => { for (let i = 0; i < 8; i++) { const a = i / 8 * PI; ctx.beginPath(); ctx.moveTo(wx + Math.cos(a) * 52, -60 + Math.sin(a) * 52); ctx.lineTo(wx - Math.cos(a) * 52, -60 - Math.sin(a) * 52); ctx.stroke(); } });
  ctx.strokeStyle = col; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(-80, -60); ctx.lineTo(-10, -60); ctx.lineTo(48, -132); ctx.lineTo(-34, -132); ctx.lineTo(-80, -60); ctx.moveTo(-10, -60); ctx.lineTo(-44, -150); ctx.moveTo(80, -60); ctx.lineTo(40, -160); ctx.stroke();
  ctx.strokeStyle = '#1a1c22'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(40, -160); ctx.lineTo(18, -176); ctx.moveTo(40, -160); ctx.lineTo(62, -168); ctx.stroke(); ctx.fillStyle = '#1a1c22'; rr(ctx, -70, -162, 52, 16, 8); ctx.fill();
  ctx.beginPath(); ctx.arc(-10, -60, 14, 0, TAU); ctx.fill(); ctx.restore(); }
function pigeon(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const bob = Math.abs(Math.sin(t * 3)) * 4; ctx.fillStyle = '#8a8f9c'; ctx.beginPath(); ctx.ellipse(0, -18, 26, 16, -.2, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(22, -36 + bob, 11, 0, TAU); ctx.fill(); ctx.fillStyle = '#e8a030'; ctx.beginPath(); ctx.moveTo(32, -36 + bob); ctx.lineTo(42, -33 + bob); ctx.lineTo(32, -30 + bob); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(26, -38 + bob, 2.4, 0, TAU); ctx.fill(); ctx.strokeStyle = '#d06030'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-2, -4); ctx.lineTo(-2, 4); ctx.moveTo(6, -4); ctx.lineTo(6, 4); ctx.stroke(); ctx.restore(); }
function phoneDraw(ctx, x, y, s, rot, glowOn) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); if (glowOn) glow(ctx, 0, 0, 60, 'rgba(180,220,255,.5)'); ctx.fillStyle = '#15171d'; rr(ctx, -12, -22, 24, 44, 5); ctx.fill(); ctx.fillStyle = glowOn ? '#bfe0ff' : '#2a3040'; rr(ctx, -9, -18, 18, 36, 3); ctx.fill(); ctx.restore(); }
function soundWaves(ctx, x, y, t, a = 1) { ctx.save(); ctx.strokeStyle = `rgba(255,214,90,${.9 * a})`; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const k = ((t * 1.6 + i / 3) % 1); ctx.globalAlpha = a * (1 - k); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, 20 + k * 60, -.7, .7); ctx.stroke(); } ctx.restore(); }
function metroBG() { return layer('e2metro', W, H, x => {
  x.fillStyle = '#c9cdd2'; x.fillRect(0, 0, W, H); x.fillStyle = '#e4e6e8'; x.fillRect(0, 0, W, 140); x.fillStyle = '#f4f4f0'; for (let i = 0; i < 6; i++) rr(x, 60 + i * 320, 40, 240, 30, 10), x.fill();
  for (let i = 0; i < 4; i++) { const wx = 70 + i * 480; x.fillStyle = '#1a1d24'; rr(x, wx, 230, 380, 260, 26); x.fill(); x.strokeStyle = '#9aa0a8'; x.lineWidth = 10; rr(x, wx, 230, 380, 260, 26); x.stroke(); }
  x.fillStyle = '#e07b22'; x.fillRect(0, 560, W, 26); x.fillStyle = '#b8bcc2'; x.fillRect(0, 586, W, 160);
  x.fillStyle = '#f08a24'; for (let i = 0; i < 12; i++) { rr(x, 20 + i * 160, 640, 150, 120, 18); x.fill(); } x.fillStyle = 'rgba(0,0,0,.12)'; for (let i = 0; i < 12; i++) x.fillRect(20 + i * 160, 740, 150, 20);
  x.fillStyle = '#d9772a'; x.fillRect(0, 760, W, 40); x.fillStyle = '#7d8088'; x.fillRect(0, 800, W, 280); x.fillStyle = 'rgba(0,0,0,.15)'; for (let i = 0; i < 40; i++) x.fillRect(i * 60, 800, 3, 280);
  x.fillStyle = '#c0c4ca'; [330, 960, 1590].forEach(px => { x.fillRect(px - 8, 0, 16, 800); }); x.fillStyle = '#2a7a4a'; rr(x, 760, 160, 400, 40, 8); x.fill(); text(x, 'LÍNEA 3 · UNIVERSIDAD', 960, 181, { size: 22, font: 'Montserrat', weight: 900, color: '#fff', ls: 4 });
}); }
function chatBubble(ctx, x, y, w, h, mine, k) { ctx.save(); ctx.translate(x, y); ctx.scale(lerp(.6, 1, k), lerp(.6, 1, k)); ctx.globalAlpha *= k; ctx.fillStyle = mine ? '#d6f7c6' : '#ffffff'; rr(ctx, mine ? -w : 0, -h / 2, w, h, 22); ctx.fill(); ctx.beginPath(); if (mine) { ctx.moveTo(-20, h / 2 - 6); ctx.lineTo(8, h / 2 + 6); ctx.lineTo(-4, h / 2 - 24); } else { ctx.moveTo(20, h / 2 - 6); ctx.lineTo(-8, h / 2 + 6); ctx.lineTo(4, h / 2 - 24); } ctx.fill(); ctx.restore(); }
function pinIcon(ctx, x, y, s, col = P.red) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, -24, 20, PI, 0); ctx.quadraticCurveTo(20, -8, 0, 14); ctx.quadraticCurveTo(-20, -8, -20, -24); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, -24, 8, 0, TAU); ctx.fill(); ctx.restore(); }
// ===== 14 · el cambio no está en la calle: está en la cabeza =====
S(T.cambio - .05, (ctx, t) => {
  const t0 = T.cambio - .05, tStop = T.cabeza - .45, push = ease(t, T.cabeza - .35, T.cabeza + .6, E.inOut);
  const dist = 150 * (Math.min(t, tStop) - t0) / (tStop - t0), kx = 790 + dist, ky = 1010, ks = 1.55, stop = ease(t, tStop - .1, tStop + .3);
  blurred(ctx, 'e2calle', 12, x => plaza(x, t, { cheer: .8, phones: true, seed: 52, screen: q => { q.fillStyle = '#0b2a1a'; q.fillRect(0, 0, W, H); trophyDraw(q, W / 2, 640, 2.4); } }));
  ctx.save(); ctx.fillStyle = `rgba(6,8,18,${lerp(.35, .8, push)})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore();
  ctx.save(); cam(ctx, lerp(960, kx, push), lerp(540, ky - 280 * ks, push), lerp(1.0, 2.9, push));
  const pose = mixPose(walkCycle(runPhase(dist, ks, 0, 'walk')), Object.assign({}, POSE.stand, { head: -4 }), stop);
  const f = figure(ctx, { x: kx, y: ky, s: ks, dir: 1, pose, face: push > .6 ? 'determined' : 'neutral', t, seed: 12, shirt: P.kid, hood: true, rim: 'rgba(255,214,150,1)', light: [1, -.6], look: push > .5 ? [6, -2] : [0, 0] });
  if (push > .3) { const hx = kx + f.headC[0] * ks, hy = ky + f.headC[1] * ks, g = ease(t, T.cabeza + .1, T.cabeza + .7, E.out);
    ctx.save(); ctx.beginPath(); ctx.arc(hx, hy, 43 * ks, 0, TAU); ctx.clip(); const rg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 44 * ks); rg.addColorStop(0, `rgba(255,210,90,${.55 * g})`); rg.addColorStop(1, 'rgba(255,210,90,0)'); ctx.fillStyle = rg; ctx.fillRect(hx - 80 * ks, hy - 80 * ks, 160 * ks, 160 * ks);
    text(ctx, 'SÍ', hx - 4, hy + 4, { size: 46 * ks * g, color: P.yel, ls: 2, shadow: 'rgba(255,200,60,.9)', blur: 20 }); ctx.restore();
    if (g > 0) rays(ctx, hx, hy, 260 * ks, 12, TAU, 'rgba(255,210,90,.18)', g * .6, t, 7); }
  ctx.restore();
  grade(ctx, '#ff9a5a', .08); vignette(ctx, .7);
  tag(ctx, 'LA CALLE', 1300, 640, t, t0 + .5, { out: T.cabeza - .6, col: '#ffffff' });
  tag(ctx, 'LA CABEZA', 960, 300, t, T.cabeza + .35);
}, t => lerp(1000, 960, ease(t, T.cabeza - .35, T.cabeza + .6, E.inOut)));
// ===== 15 · "jugamos como nunca, perdimos como siempre"... ese chiste se muere =====
S(T.decadas - .05, (ctx, t) => {
  const sk = V ? .55 : 1, bwH = V ? 620 : 720, cy = 385, tS = TB.muere2 - .02, [hx, hy] = handheld(t, 2, 15), z = lerp(1.0, 1.06, prog(t, T.decadas, T.generacion));
  const [sx, sy] = t > tS && t < tS + .5 ? shakeV(t, 12) : [0, 0];
  ctx.save(); ctx.translate(sx, sy); cam(ctx, 960 + hx, 560 + hy, z);
  ctx.drawImage(barBG(), 0, 0);
  ctx.save(); ctx.translate(960, cy); ctx.scale(sk, sk); ctx.fillStyle = '#0d0c10'; rr(ctx, -bwH, -200, 2 * bwH, 400, 24); ctx.fill(); ctx.strokeStyle = '#2a2830'; ctx.lineWidth = 8; rr(ctx, -bwH, -200, 2 * bwH, 400, 24); ctx.stroke(); ctx.fillStyle = '#55545c'; [[30 - bwH, -170], [bwH - 30, -170], [30 - bwH, 170], [bwH - 30, 170]].forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a, b, 9, 0, TAU); ctx.fill(); }); ctx.restore();
  const L = [[neonLayer('neo1', 'JUGAMOS COMO NUNCA', '#38e8ff'), T.chiste - .05, cy - 85 * sk], [neonLayer('neo2', 'PERDIMOS COMO SIEMPRE', '#ff3d8b'), TB.perd1 - .05, cy + 85 * sk]];
  L.forEach(([img, tOn, y], i) => {
    if (t < tS) { const fl = t < tOn ? .1 : (t < tOn + .45 ? (hash(Math.floor(t * 24) + i * 7) > .35 ? 1 : .25) : .92 + .08 * Math.sin(t * 30 + i)); ctx.save(); ctx.globalAlpha = fl; ctx.drawImage(img, 960 - 750 * sk, y - 110 * sk, 1500 * sk, 220 * sk); ctx.restore(); if (fl > .5) glow(ctx, 960, y, 700 * sk, i ? 'rgba(255,61,139,.16)' : 'rgba(56,232,255,.16)'); }
    else shatterDraw(ctx, img, 960, y, sk, t - tS, 30 + i * 100);
  });
  if (t > tS && t < tS + 1.2) { const r = rnd(77), dt = t - tS; ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 40; i++) { const a = r() * TAU, v = 300 + r() * 700, px = 960 + Math.cos(a) * v * dt, py = cy + Math.sin(a) * v * dt + 900 * dt * dt; ctx.fillStyle = `rgba(255,${200 + r() * 55},120,${1 - dt / 1.2})`; ctx.fillRect(px, py, 5, 5); } ctx.restore(); }
  const tx = V ? 1260 : 1500, shock = t > tS ? ease(t, tS, tS + .25) : 0, smile = ease(t, tS + 1.2, tS + 1.6);
  mugDraw(ctx, tx - 140, 800, 1.0);
  fam(ctx, 'tio', tx, 1010, 1.18, mixPose(mixPose(POSE2.lean, POSE.shrug || POSE2.shrug, t > TB.perd1 + .3 && t < tS ? ease(t, TB.perd1 + .3, TB.perd1 + .7) : 0), POSE.handsHead, shock * (1 - smile)), smile > .5 ? 'laugh' : shock > .3 ? 'shock' : 'sad', t, { dir: -1, rim: 'rgba(255,120,180,1)', light: [-1, -.8], look: [-4, -6] });
  ctx.restore();
  flash(ctx, t, tS, .25, '255,240,220', .6);
  grade(ctx, '#401838', .18); vignette(ctx, .75);
  stamp2(ctx, ['1970 – 2026', 'EL CHISTE DE SIEMPRE'], t, T.decadas + .05, { out: T.chiste + 1.2 });
}, t => V ? 1000 : 960);
// ===== 16 · una generación entera crece viendo que sí se puede =====
S(T.generacion - .05, (ctx, t) => {
  const t0 = T.generacion - .05, k = ease(t, t0, T.pais, E.sine), sp = ease(t, T.sepuede - .12, T.sepuede + .25, E.back);
  ctx.save(); cam(ctx, 960, V ? 640 : 560, lerp(1.04, 1.12, k));
  ctx.drawImage(schoolBG(), 0, 0);
  const bw = V ? 700 : 760; ctx.fillStyle = '#f7f3ea'; rr(ctx, 960 - bw / 2, 290, bw, 130, 10); ctx.fill(); ctx.strokeStyle = '#d9cfba'; ctx.lineWidth = 6; rr(ctx, 960 - bw / 2, 290, bw, 130, 10); ctx.stroke();
  if (sp > 0) { ctx.save(); ctx.translate(960, 356); ctx.scale(sp, sp); const r = rnd(6); ctx.fillStyle = 'rgba(21,151,90,.28)'; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc((r() - .5) * bw * .9, (r() - .5) * 90, 14 + r() * 26, 0, TAU); ctx.fill(); } text(ctx, 'SÍ SE PUEDE', 0, 4, { size: V ? 96 : 104, color: P.mex, ls: 6, stroke: 6, strokeCol: '#0b5a35' }); ctx.restore(); }
  const xs = V ? [660, 810, 960, 1110, 1260] : [580, 770, 960, 1150, 1340];
  xs.forEach((x, i) => { const g = ease(t, t0 + .2 + i * .12, TB.crece + 1.0 + i * .1, E.inOut), s = lerp(.62, 1.0, g), hp = hop(t, T.sepuede + .05 + i * .07, .6, 34);
    const pose = t > T.sepuede ? crouchOf(mixPose(POSE.cheer, POSE.fists, .5 + .5 * Math.sin(t * 5 + i)), hp.crouch) : Object.assign({}, POSE.stand, { head: -8 });
    figure(ctx, { x, y: 940, s, dir: i < 2 ? 1 : -1, pose, face: t > T.sepuede ? 'cheer' : 'smile', t, seed: 80 + i, shirt: i % 2 ? '#ffffff' : P.mex, sleeves: 'short', shorts: i % 2 ? P.mex : '#ffffff', acc: { num: String([10, 7, 9, 11, 4][i]), numCol: i % 2 ? P.mex : '#ffffff' }, jump: hp.y, squash: hp.sq, rim: 'rgba(255,240,200,1)', light: [1, -.8], look: [0, -4] }); });
  ctx.restore();
  if (t > T.sepuede) confetti(ctx, t, T.sepuede, 60, 33);
  grade(ctx, '#ffd890', .1); vignette(ctx, .45);
  stamp2(ctx, ['2027 – 2040', 'LA GENERACIÓN DEL SÍ'], t, t0 + .15, { out: T.sepuede - .3 });
});
// ===== 17 · el país aprovecha: le llaman Plan Campeón =====
S(T.pais - .05, (ctx, t) => {
  const t0 = T.pais - .05, k = ease(t, t0, T.cancha, E.sine), lit = ease(t, T.plan - .1, T.plan + .35, E.back);
  ctx.save(); cam(ctx, 960, 540, lerp(1.0, 1.08, k));
  ctx.fillStyle = '#0d1018'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ['#0f6b3c', '#ece8e0', '#b8232e'].forEach((c, j) => { ctx.fillStyle = c; ctx.fillRect(240 + j * 480, 120, 480, 620); }); ctx.fillStyle = 'rgba(6,8,14,.55)'; ctx.fillRect(240, 120, 1440, 620);
  if (lit > 0) { ctx.save(); ctx.translate(960, 330); ctx.scale(lit * (V ? .6 : 1), lit * (V ? .6 : 1)); glow(ctx, 0, 0, 600, 'rgba(255,200,80,.35)'); text(ctx, '★', 0, -110, { size: 80, color: P.gold }); text(ctx, 'PLAN CAMPEÓN', 0, 0, { size: 150, color: '#fff', ls: 8, shadow: 'rgba(0,0,0,.6)', blur: 20 }); text(ctx, 'MÉXICO 2027 – 2036', 0, 96, { size: 36, font: 'Montserrat', weight: 900, color: P.gold, ls: 10 }); ctx.restore(); }
  flagDraw(ctx, 'MEX', 300, 560, 150, 100); flagDraw(ctx, 'MEX', 1470, 560, 150, 100);
  figure(ctx, { x: 960, y: 960, s: 1.25, dir: 1, pose: t > T.plan ? mixPose(POSE.point, Object.assign({}, POSE.point, { shF: 120 }), .5 + .5 * Math.sin(t * 2)) : Object.assign({}, POSE.stand, { shF: 40, elF: 70 }), face: 'smile', t, seed: 44, shirt: '#2a2f44', shorts: '#1e2232', rim: 'rgba(255,230,190,1)', light: [-1, -.8], look: [-6, 0] });
  ctx.fillStyle = '#3a2a1e'; ctx.beginPath(); ctx.moveTo(860, 760); ctx.lineTo(1060, 760); ctx.lineTo(1040, 1080); ctx.lineTo(880, 1080); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#4a3828'; rr(ctx, 840, 740, 240, 34, 8); ctx.fill();
  ctx.fillStyle = '#c99a3a'; ctx.beginPath(); ctx.arc(960, 860, 34, 0, TAU); ctx.fill(); ctx.fillStyle = '#1a1208'; ctx.beginPath(); ctx.arc(960, 860, 24, 0, TAU); ctx.fill(); ctx.strokeStyle = '#22252e'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(940, 740); ctx.lineTo(925, 690); ctx.moveTo(980, 740); ctx.lineTo(995, 690); ctx.stroke();
  crowdBacks(ctx, t, { cheer: 0, phones: true, seed: 91, y0: 980, y1: 1180, rows: 2, arms: .05, rim: 'rgba(255,230,190,.5)' });
  ctx.restore();
  const r = rnd(Math.floor(t * 7)); for (let i = 0; i < 2; i++) if (r() < .55) { const fx = 200 + r() * 1520, fy = 820 + r() * 160; glow(ctx, fx, fy, 160, 'rgba(255,255,255,.9)'); }
  vignette(ctx, .6);
  if (lit > 0 && !NOUI) { ctx.save(); ui(ctx); text(ctx, 'ESCENARIO FICTICIO', uxR(1780), uyT(180), { size: 22, font: 'Montserrat', weight: 900, align: 'right', color: 'rgba(255,255,255,.7)', ls: 6, alpha: lit }); ctx.restore(); }
});
// ===== 18 · cancha y escuela en cada colonia · becas · fábricas en el norte =====
function iconField(ctx, s, t, kSchool) { ctx.save(); ctx.scale(s, s); ctx.fillStyle = '#1f8a4c'; rr(ctx, -120, -70, 170, 120, 8); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 3; rr(ctx, -112, -62, 154, 104, 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-35, -62); ctx.lineTo(-35, 42); ctx.stroke(); ctx.beginPath(); ctx.arc(-35, -10, 18, 0, TAU); ctx.stroke(); ctx.strokeRect(-112, -30, 22, 40); ctx.strokeRect(20, -30, 22, 40);
  if (kSchool > 0) { ctx.save(); ctx.translate(90, 10); ctx.scale(kSchool, kSchool); ctx.fillStyle = '#efe2c4'; ctx.fillRect(-46, -40, 92, 74); ctx.fillStyle = '#c94a3a'; ctx.beginPath(); ctx.moveTo(-54, -40); ctx.lineTo(0, -78); ctx.lineTo(54, -40); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#3d6f99'; [-28, 10].forEach(wx => ctx.fillRect(wx, -26, 18, 18)); ctx.fillStyle = '#7a4a2a'; ctx.fillRect(-8, 6, 16, 28); ctx.fillStyle = '#ddd'; ctx.fillRect(28, -96, 3, 40); ctx.fillStyle = P.mex; ctx.fillRect(31, -96, 18, 12); ctx.restore(); }
  ctx.restore(); }
function iconCap(ctx, s, t) { ctx.save(); ctx.scale(s, s); ctx.fillStyle = '#1a1c26'; ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(110, -20); ctx.lineTo(0, 20); ctx.lineTo(-110, -20); ctx.closePath(); ctx.fill(); ctx.fillRect(-60, -6, 120, 50); ctx.beginPath(); ctx.ellipse(0, 44, 60, 16, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = P.gold; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(80, 0); ctx.lineTo(80, 50); ctx.stroke(); ctx.fillStyle = P.gold; ctx.beginPath(); ctx.arc(80, 56, 9, 0, TAU); ctx.fill();
  ctx.save(); ctx.translate(-70, 60); ctx.rotate(t * 1.2); ctx.fillStyle = '#7d8aa0'; for (let i = 0; i < 8; i++) { ctx.rotate(TAU / 8); ctx.fillRect(-7, -38, 14, 14); } ctx.beginPath(); ctx.arc(0, 0, 28, 0, TAU); ctx.fill(); ctx.fillStyle = '#141824'; ctx.beginPath(); ctx.arc(0, 0, 11, 0, TAU); ctx.fill(); ctx.restore(); ctx.restore(); }
function iconChipCar(ctx, s, t, kCar) { ctx.save(); ctx.scale(s, s); ctx.save(); ctx.translate(-50, -20); ctx.fillStyle = '#1a1c26'; rr(ctx, -50, -50, 100, 100, 10); ctx.fill(); ctx.strokeStyle = '#ffc94a'; ctx.lineWidth = 4; for (let i = 0; i < 5; i++) { const o = -36 + i * 18; [[o, -50, o, -66], [o, 50, o, 66], [-50, o, -66, o], [50, o, 66, o]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); }); } ctx.fillStyle = '#2cc47a'; rr(ctx, -26, -26, 52, 52, 6); ctx.fill(); text(ctx, 'MX', 0, 2, { size: 26, font: 'Montserrat', weight: 900, color: '#0b2a1a' }); ctx.restore();
  if (kCar > 0) { ctx.save(); ctx.translate(60, 52); ctx.scale(kCar * .55, kCar * .55); ctx.fillStyle = '#e8e4dc'; rr(ctx, -120, -60, 240, 52, 16); ctx.fill(); ctx.beginPath(); ctx.moveTo(-70, -60); ctx.lineTo(-40, -100); ctx.lineTo(50, -100); ctx.lineTo(84, -60); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(120,180,240,.7)'; ctx.beginPath(); ctx.moveTo(-56, -64); ctx.lineTo(-34, -94); ctx.lineTo(44, -94); ctx.lineTo(70, -64); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#121216'; [-72, 72].forEach(wx => { ctx.beginPath(); ctx.arc(wx, -8, 24, 0, TAU); ctx.fill(); }); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.moveTo(10, -50); ctx.lineTo(-14, -26); ctx.lineTo(2, -26); ctx.lineTo(-8, -6); ctx.lineTo(18, -32); ctx.lineTo(2, -32); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.restore(); }
S(T.cancha - .1, (ctx, t) => {
  ctx.fillStyle = '#0a1830'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ctx.save(); ctx.strokeStyle = 'rgba(120,170,255,.12)'; ctx.lineWidth = 1.5; const off = (t * 12) % 60; for (let x = -off; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = -off; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore();
  glow(ctx, 960, 540, 900, 'rgba(60,140,255,.12)');
  ctx.save(); ui(ctx);
  const items = [[T.cancha, 'CANCHA + ESCUELA', 'TIEMPO COMPLETO · EN CADA COLONIA', (c, s) => iconField(c, s, t, ease(t, TB.escuela, TB.escuela + .4, E.back))], [T.becas, 'BECAS', 'PARA INGENIEROS', (c, s) => iconCap(c, s, t)], [T.fabricas, 'FÁBRICAS', 'CHIPS Y AUTOS ELÉCTRICOS · NORTE', (c, s) => iconChipCar(c, s, t, ease(t, TB.autos, TB.autos + .4, E.back))]];
  text(ctx, 'PLAN CAMPEÓN', uxC(960), uyT(V ? 150 : 200), { size: V ? 64 : 54, color: P.gold, ls: 8, alpha: ease(t, T.cancha - .1, T.cancha + .3) });
  items.forEach(([ti, a, b, ic], i) => { const k = ease(t, ti - .1, ti + .35, E.back); if (k <= 0) return; ctx.save();
    if (V) { const cx = UW() / 2, cy = 340 + i * 420; ctx.translate(cx, cy); ctx.scale(k, k); card(ctx, 0, 0, 1260, 390, { stroke: 'rgba(255,201,74,.6)', lw: 3 }); ctx.save(); ctx.translate(-400, 0); ic(ctx, 1.4); ctx.restore(); text(ctx, a, -150, -44, { size: 84, color: '#fff', ls: 3, align: 'left' }); text(ctx, b, -150, 56, { size: 27, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.7)', ls: 1, align: 'left' }); }
    else { const cx = 380 + i * 580, cy = 560; ctx.translate(cx, cy); ctx.scale(k, k); card(ctx, 0, 0, 540, 600, { stroke: 'rgba(255,201,74,.6)', lw: 3 }); ctx.save(); ctx.translate(0, -90); ic(ctx, 1.2); ctx.restore(); text(ctx, a, 0, 150, { size: 60, color: '#fff', ls: 3 }); text(ctx, b, 0, 214, { size: 22, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.7)', ls: 2 }); }
    ctx.restore(); });
  ctx.restore();
  vignette(ctx, .6);
});
// ===== 19 · y entonces pasa lo que nadie creía posible =====
S(T.entonces - .05, (ctx, t) => {
  const t0 = T.entonces - .05, k = ease(t, t0, T.chavo, E.sine);
  ctx.save(); cam(ctx, lerp(1000, 900, k), 600, lerp(1.0, 1.15, k));
  ctx.drawImage(streetBG(true), 0, 0); ctx.save(); ctx.fillStyle = vg(ctx, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.85)']], 0, 0, 1240, 1700); ctx.fillRect(1240, 0, 700, 860); ctx.restore(); lampPost(ctx, 700, t, true);
  ctx.restore();
  dust(ctx, t, 30, 19, 'rgba(255,220,170,1)', .25, 1.4); grade(ctx, '#2040a0', .18); vignette(ctx, .8);
  if (!NOUI) { const s = 'LO QUE NADIE CREÍA POSIBLE', n = Math.floor(clamp((t - TB.nadie + .1) * 22, 0, s.length)); if (n > 0) { ctx.save(); uiCenter(ctx, .9); text(ctx, s.slice(0, n), 960, 300, { size: 90, color: '#fff', ls: 4, shadow: 'rgba(0,0,0,.8)', blur: 20 }); ctx.restore(); } }
}, t => lerp(1000, 900, ease(t, T.entonces - .05, T.chavo, E.sine)));
// ===== 20 · el chavo de quince años: antes una sola opción... ahora beca, robótica y box =====
S(T.chavo - .05, (ctx, t) => {
  const day = ease(t, TB.ahora - .2, TB.ahora + .7, E.inOut), kx = V ? 760 : 820, SX = V ? [970, 1120, 1270] : [1150, 1390, 1630], sw = V ? 140 : 210, SHX = V ? 1260 : 1480, AEX = V ? 1200 : 1380, CX = V ? 900 : 980;
  ctx.save(); cam(ctx, CX, 600, 1.15);
  ctx.drawImage(streetBG(true), 0, 0); if (day > 0) { ctx.save(); ctx.globalAlpha = day; ctx.drawImage(streetBG(false), 0, 0); ctx.restore(); }
  ctx.save(); ctx.globalAlpha = 1 - day; ctx.fillStyle = vg(ctx, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.85)']], 0, 0, 1240, 1700); ctx.fillRect(1240, 0, 700, 860); ctx.restore();
  lampPost(ctx, 700, t, day < .6);
  const sh = (1 - day) * ease(t, TB.opcion - .4, TB.opcion + .2); if (sh > 0) { ctx.save(); ctx.globalAlpha = sh; figure(ctx, { x: SHX, y: 860, s: 1.0, dir: -1, pose: Object.assign({}, POSE.relaxed, { lean: -6 }), face: 'neutral', t, seed: 99, shirt: '#0c0c12', hood: true, rim: 'rgba(120,60,60,.6)', light: [-1, -.2], ink: '#050507' }); ctx.restore(); }
  arrowGround(ctx, kx + 90, 905, AEX, 905, `rgba(255,70,70,${.8 * (1 - day)})`, ease(t, TB.opcion, TB.opcion + .6), 18);
  const kS = [T.beca, T.robotica, T.box].map(ti => ease(t, ti - .1, ti + .35, E.back));
  [[iconDiploma, 'BECA'], [iconRobot, 'ROBÓTICA'], [iconGlove, 'BOX']].forEach(([ic, lb], i) => { arrowGround(ctx, kx + 90, 920, SX[i] - 10, 880 + (i - 1) * 10, 'rgba(255,214,63,.9)', ease(t, [T.beca, T.robotica, T.box][i] - .3, [T.beca, T.robotica, T.box][i] + .2) * day, 12); signPost(ctx, SX[i], lb, ic, kS[i] * day, t, sw, t > T.perder); });
  const look = t > TB.ahora ? 1 : 0, win = ease(t, TB.ganar2, TB.ganar2 + .4, E.back);
  const pose = t > T.perder ? mixPose(Object.assign({}, POSE.stand, { head: -4 }), POSE.fists, ease(t, TB.ganar2, TB.ganar2 + .4)) : Object.assign({}, POSE.stand, { head: t < TB.ahora ? 14 : -4, shB: 4, shF: -2 });
  const f = figure(ctx, { x: kx, y: 905, s: 1.25, dir: 1, pose, face: t < TB.ahora ? 'sad' : t < T.perder ? 'shock' : 'smile', t, seed: 15, shirt: '#4a505c', hood: true, rim: day > .5 ? 'rgba(255,240,200,1)' : 'rgba(255,200,130,1)', light: [-1, -.6], look: [6 * look, -2] });
  if (win > 0) { const hx = kx + f.headC[0] * 1.25, hy = 905 + f.headC[1] * 1.25 - 110; ctx.save(); ctx.translate(hx, hy); ctx.scale(win, win); glow(ctx, 0, 0, 120, 'rgba(255,200,80,.6)'); ctx.fillStyle = '#2a6fb8'; ctx.beginPath(); ctx.moveTo(-18, -60); ctx.lineTo(0, -10); ctx.lineTo(18, -60); ctx.closePath(); ctx.fill(); ctx.fillStyle = P.gold; ctx.beginPath(); ctx.arc(0, 8, 30, 0, TAU); ctx.fill(); text(ctx, '1', 0, 10, { size: 32, color: '#7a5a10' }); ctx.restore(); }
  ctx.restore();
  dust(ctx, t, 30, 19, 'rgba(255,220,170,1)', .25 * (1 - day), 1.4); grade(ctx, '#2040a0', .18 * (1 - day)); grade(ctx, '#ffd890', .1 * day); vignette(ctx, .7);
  tag(ctx, '15 AÑOS', 960 + (kx - CX) * 1.15, 540 + (905 - 280 * 1.25 - 600) * 1.15 - 90, t, TB.quince, { out: TB.ahora - .3 });
  tag(ctx, 'UNA SOLA OPCIÓN', 960 + (AEX - CX) * 1.15, 690, t, TB.opcion + .2, { out: TB.ahora - .3, col: '#ff6a6a' });
  if (!NOUI) { const k1 = ease(t, T.perder, T.perder + .4, E.outQuint), k2 = ease(t, TB.ganar2, TB.ganar2 + .4, E.outQuint); ctx.save(); ui(ctx);
    if (k1 > 0) text(ctx, 'ALGO QUE PERDER', V ? uxC(960) : uxC(560), uyT(V ? 120 : 200), { size: V ? 84 : 72, color: '#fff', ls: 3, alpha: k1, shadow: 'rgba(0,0,0,.7)', blur: 18 });
    if (k2 > 0) text(ctx, 'Y ALGO QUE GANAR', V ? uxC(960) : uxC(1360), uyT(V ? 230 : 200), { size: V ? 84 : 72, color: P.yel, ls: 3, alpha: k2, shadow: 'rgba(0,0,0,.7)', blur: 18 });
    ctx.restore(); }
}, t => V ? 1090 : 960);
// ===== 21 · año con año la violencia baja, y baja, y baja =====
S(T.anio - .05, (ctx, t) => {
  ctx.fillStyle = vg(ctx, [[0, '#0b0d16'], [1, '#141826']]); ctx.fillRect(-W, -H, 3 * W, 3 * H);
  bokeh(ctx, t, 26, 61, 'rgba(255,200,140,.8)', 6, 22, .25, [0, 760, W, 300]);
  ctx.save(); uiCenter(ctx, V ? 1.05 : 1);
  const X0 = 360, X1 = 1600, Y0 = 820, Y1 = 260, yr = y => lerp(X0, X1, (y - 2027) / 9), vv = v => lerp(Y0, Y1, v / 100);
  text(ctx, 'VIOLENCIA EN MÉXICO', X0, 170, { size: 56, color: '#fff', ls: 3, align: 'left' }); text(ctx, 'ÍNDICE · ESCENARIO FICTICIO', X0, 222, { size: 22, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.55)', ls: 6, align: 'left' });
  ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 2; [0, 25, 50, 75, 100].forEach(v => { ctx.beginPath(); ctx.moveTo(X0, vv(v)); ctx.lineTo(X1, vv(v)); ctx.stroke(); text(ctx, String(v), X0 - 24, vv(v), { size: 20, font: 'Montserrat', weight: 800, color: 'rgba(255,255,255,.4)', align: 'right' }); });
  [2027, 2030, 2033, 2036].forEach(y => text(ctx, String(y), yr(y), Y0 + 40, { size: 22, font: 'Montserrat', weight: 800, color: 'rgba(255,255,255,.55)' }));
  const PTS = [[2027, 100, T.anio], [2028.5, 94, T.anio + 1.0], [2029.5, 66, T.baja1 + .55], [2031, 62, T.baja2 - .2], [2032.5, 38, T.baja2 + .45], [2033.5, 35, T.baja3 - .2], [2035, 12, T.baja3 + .45]];
  ctx.strokeStyle = '#ff7a6b'; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); let last = null;
  for (let i = 0; i < PTS.length; i++) { const [y, v, ti] = PTS[i]; if (i === 0) { ctx.moveTo(yr(y), vv(v)); last = [yr(y), vv(v)]; continue; } const [py, pv, pt0] = PTS[i - 1], k = ease(t, pt0, ti, E.inOut); if (k <= 0) break; const x = lerp(yr(py), yr(y), k), yy = lerp(vv(pv), vv(v), k); ctx.lineTo(x, yy); last = [x, yy]; if (k < 1) break; }
  ctx.stroke(); if (last) { ctx.fillStyle = '#ff7a6b'; ctx.beginPath(); ctx.arc(last[0], last[1], 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#141826'; ctx.lineWidth = 3; ctx.stroke(); }
  [[T.baja1, 2029.5, 66], [T.baja2, 2032.5, 38], [T.baja3, 2035, 12]].forEach(([ti, y, v]) => { const k = ease(t, ti + .3, ti + .7, E.back); if (k <= 0) return; ctx.save(); ctx.translate(yr(y) + 70, vv(v) - 50); ctx.scale(k, k); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-74, -12); ctx.lineTo(-50, -12); ctx.lineTo(-62, 8); ctx.closePath(); ctx.fill(); text(ctx, 'BAJA', 0, 0, { size: 34, color: '#fff', ls: 3 }); ctx.restore(); });
  ctx.restore();
  vignette(ctx, .6);
});
// ===== 22 · hasta que un día el noticiero no tiene nada que contar =====
S(T.undia - .05, (ctx, t) => {
  const t0 = T.undia - .05, k = ease(t, t0, T.celular, E.sine), calm = t > TB.nada - .1;
  ctx.save(); cam(ctx, 960, 560, lerp(1.0, 1.08, k));
  ctx.fillStyle = vg(ctx, [[0, '#0a1430'], [1, '#162a5a']]); ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ctx.fillStyle = '#0c1222'; rr(ctx, 520, 110, 880, 500, 16); ctx.fill(); ctx.save(); ctx.beginPath(); rr(ctx, 540, 130, 840, 460, 10); ctx.clip();
  ctx.fillStyle = calm ? vg(ctx, [[0, '#7fc4f0'], [1, '#d8f0ff']], 130, 590) : '#3a0a10'; ctx.fillRect(540, 130, 840, 460);
  if (calm) { glow(ctx, 1220, 230, 160, 'rgba(255,240,170,.9)'); ctx.fillStyle = '#ffe680'; ctx.beginPath(); ctx.arc(1220, 230, 50, 0, TAU); ctx.fill(); ctx.fillStyle = '#6fbf6a'; ctx.beginPath(); ctx.ellipse(960, 640, 600, 160, 0, 0, TAU); ctx.fill(); text(ctx, 'TODO TRANQUILO', 960, 360, { size: 84, color: '#0b2a4a', ls: 4 }); }
  else { const bl = Math.floor(t * 3) % 2; ctx.fillStyle = bl ? '#c8102e' : '#9a0c22'; ctx.fillRect(540, 300, 840, 120); text(ctx, 'ÚLTIMA HORA', 960, 362, { size: 90, color: '#fff', ls: 6 }); }
  ctx.restore();
  const shrug = ease(t, TB.nada, TB.nada + .4);
  figure(ctx, { x: 960, y: 1000, s: 1.5, dir: 1, pose: mixPose(Object.assign({}, POSE.stand, { shF: 50, elF: 60, shB: 40, elB: 60 }), POSE2.shrug, shrug), face: shrug > .5 ? 'smile' : 'determined', t, seed: 47, shirt: '#2a3350', rim: 'rgba(180,210,255,1)', light: [-1, -.8], look: [-4, 0] });
  ctx.fillStyle = '#1e2a48'; ctx.beginPath(); ctx.moveTo(560, 800); ctx.lineTo(1360, 800); ctx.lineTo(1420, 1100); ctx.lineTo(500, 1100); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#3a5aa0'; ctx.fillRect(560, 800, 800, 12); text(ctx, 'NOTICIAS 24/7', 960, 900, { size: 44, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.75)', ls: 8 });
  mugDraw(ctx, 1240, 800, .7);
  ctx.restore();
  vignette(ctx, .55);
  if (!NOUI) { ctx.save(); ui(ctx); const y = uyB(870), x0 = uxL(60), x1 = uxR(1860); ctx.fillStyle = '#c8102e'; ctx.fillRect(x0, y - 34, 190, 68); text(ctx, 'EN VIVO', x0 + 95, y, { size: 30, font: 'Montserrat', weight: 900, color: '#fff', ls: 4 }); ctx.fillStyle = 'rgba(8,12,24,.88)'; ctx.fillRect(x0 + 190, y - 34, x1 - x0 - 190, 68);
    ctx.save(); ctx.beginPath(); ctx.rect(x0 + 200, y - 34, x1 - x0 - 210, 68); ctx.clip(); const msg = calm ? '  NADA QUE REPORTAR  ·  CLIMA: SOLEADO  ·  NADA QUE REPORTAR  ·  TODO EN ORDEN  ·' : '  ALERTA  ·  ÚLTIMA HORA  ·  ALERTA  ·  ÚLTIMA HORA  ·'; ctx.font = '900 30px Montserrat'; const mw = ctx.measureText(msg).width; let xx = x0 + 200 - (t * 160) % mw; while (xx < x1) { text(ctx, msg, xx, y, { size: 30, font: 'Montserrat', weight: 900, color: '#fff', align: 'left' }); xx += mw; } ctx.restore();
    text(ctx, '2035', x1 - 10, uyT(180), { size: 30, font: 'Montserrat', weight: 900, color: 'rgba(255,255,255,.7)', align: 'right', ls: 4 }); ctx.restore(); }
});
// ===== 23 · sacas el celular en el Metro... y contestas con altavoz =====
S(T.celular - .05, (ctx, t) => {
  const t0 = T.celular - .05, [sx, sy] = shakeV(t, 2.2, 4), out = ease(t, TB.contestar - .9 + .3, TB.contestar - .2), talk = ease(t, T.altavoz - .5, T.altavoz - .1);
  ctx.save(); ctx.translate(sx, sy); cam(ctx, 960, 560, 1.12);
  ctx.drawImage(metroBG(), 0, 0);
  for (let i = 0; i < 4; i++) { const wx = 70 + i * 480; ctx.save(); ctx.beginPath(); rr(ctx, wx + 5, 235, 370, 250, 22); ctx.clip(); for (let j = 0; j < 3; j++) { const lx = wx + 380 - ((t * 1400 + j * 160 + i * 90) % 520); ctx.fillStyle = 'rgba(255,230,170,.55)'; ctx.fillRect(lx, 300 + j * 50, 90, 5); } ctx.restore(); }
  const xs = V ? [700, 960, 1220] : [560, 960, 1360];
  figure(ctx, { x: xs[0], y: 800, s: 1.05, dir: 1, pose: Object.assign({}, POSE.sitFront, { head: 4 }), face: talk > .5 ? 'smile' : 'neutral', t, seed: 71, shirt: '#8a5a9a', acc: { glasses: 1, hairAbu: 1 }, rim: 'rgba(255,255,255,1)', light: [-1, -.8], look: [5, 0] });
  figure(ctx, { x: xs[2], y: 800, s: 1.05, dir: -1, pose: Object.assign({}, POSE.sitFront, { shF: 26, elF: 70 }), face: talk > .5 ? 'smile' : 'neutral', t, seed: 73, shirt: '#c98a2a', acc: { cap: '#2a4a7a' }, rim: 'rgba(255,255,255,1)', light: [-1, -.8], look: [5, 0] });
  const pose = mixPose(mixPose(Object.assign({}, POSE.sitFront, { head: 2 }), POSE2.phoneChest, out), POSE2.phoneTalk, talk);
  const f = figure(ctx, { x: xs[1], y: 800, s: 1.1, dir: 1, pose, face: talk > .5 ? 'laugh' : out > .5 ? 'smile' : 'neutral', t, seed: 12, shirt: P.kid, hood: true, rim: 'rgba(255,255,255,1)', light: [-1, -.8], look: [4, out > .5 && talk < .5 ? 5 : 0] });
  if (out > 0) { const hx = xs[1] + f.hand[0] * 1.1, hy = 800 + f.hand[1] * 1.1; phoneDraw(ctx, hx + 4, hy - 6, 1.5 * out, talk > .5 ? -1.4 : -.2, true); if (talk > .6) soundWaves(ctx, hx + 50, hy - 10, t, talk); }
  ctx.restore();
  grade(ctx, '#ffe0b0', .06); vignette(ctx, .5);
  stamp2(ctx, ['METRO · CDMX', '2035'], t, t0 + .2, { out: T.altavoz - .4 });
  tag(ctx, 'CON ALTAVOZ', 960 + 120, 330, t, T.altavoz + .1);
});
// ===== 24 · dejas la bici sin candado... y dos días después sigue ahí =====
S(T.bici - .05, (ctx, t) => {
  const t0 = T.bici - .05, tl = prog(t, T.dosdias - .1, TB.sigue - .3), cyc = tl > 0 && tl < 1 ? (Math.sin(tl * TAU * 2 - PI / 2) * .5 + .5) : 0;
  ctx.save(); cam(ctx, 960, 580, 1.08);
  ctx.drawImage(streetBG(false), 0, 0); if (cyc > 0) { ctx.save(); ctx.globalAlpha = cyc; ctx.drawImage(streetBG(true), 0, 0); ctx.restore(); }
  lampPost(ctx, 760, t, cyc > .5);
  bikeDraw(ctx, 860, 850, .95, '#15975a');
  if (t > T.dosdias + .4) pigeon(ctx, 830, 700, 1.1, t);
  const pxL = 1010 + 210 * (Math.min(t, T.dosdias) - t0) + (t > T.dosdias ? 2600 * (t - T.dosdias) : 0);
  if (pxL < 1950) figure(ctx, { x: pxL, y: 870, s: 1.1, dir: 1, pose: walkCycle(runPhase(pxL - 1010, 1.1, 0, 'walk')), face: 'smile', t, seed: 12, shirt: P.kid, hood: true, rim: 'rgba(255,240,200,1)', light: [-1, -.8] });
  if (t > TB.sigue - 1.2) { const px = t < TB.sigue - .5 ? lerp(1900, 1350, prog(t, TB.sigue - 1.2, TB.sigue - .5)) : lerp(1350, 1150, ease(t, TB.sigue - .5, TB.sigue + .2, E.out)), done = t > TB.sigue + .2;
    figure(ctx, { x: px, y: 870, s: 1.1, dir: -1, pose: done ? mixPose(POSE.stand, Object.assign({}, POSE.point, { shF: 70 }), ease(t, TB.sigue + .2, TB.sigue + .5)) : walkCycle(runPhase(1900 - px, 1.1, 0, 'walk')), face: done ? 'happy' : 'neutral', t, seed: 12, shirt: P.kid, hood: true, rim: 'rgba(255,240,200,1)', light: [-1, -.8] }); }
  ctx.restore();
  if (tl > 0 && tl < 1) { ctx.save(); setBase(ctx); ctx.fillStyle = `rgba(0,0,0,${.15 * Math.sin(tl * PI)})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore(); }
  grade(ctx, '#ffd890', .08 * (1 - cyc)); grade(ctx, '#2040a0', .2 * cyc); vignette(ctx, .5);
  if (!NOUI) { const k = ease(t, T.candado - .1, T.candado + .3, E.back), out = 1 - ease(t, T.dosdias - .2, T.dosdias + .1); if (k > 0 && out > 0) { ctx.save(); ctx.globalAlpha = out; ctx.translate(960 + (860 - 960) * 1.08, 300); ctx.scale(k, k); ctx.fillStyle = 'rgba(10,12,18,.8)'; ctx.beginPath(); ctx.arc(0, 0, 70, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(0, -10, 22, PI, 0); ctx.stroke(); ctx.fillStyle = '#fff'; rr(ctx, -30, -10, 60, 44, 8); ctx.fill(); ctx.strokeStyle = P.red; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-50, -50); ctx.lineTo(50, 50); ctx.stroke(); ctx.restore(); } }
  stamp2(ctx, ['2 DÍAS DESPUÉS'], t, T.dosdias + .1, { y: 820 });
  tag(ctx, 'AHÍ SIGUE', 960 + (860 - 960) * 1.08, 560, t, TB.sigue + .2);
}, t => t < T.dosdias ? lerp(1000, 1150, prog(t, T.bici, T.candado + .6)) : 1000);
// ===== 25 · tu mamá ya no te pide ubicación... bueno, sí, pero por costumbre =====
S(T.mama - .05, (ctx, t) => {
  const t0 = T.mama - .05, kp = ease(t, t0, t0 + .5, E.outQuint);
  blurred(ctx, 'e2momroom', 14, x => { cam(x, 1000, 560, 1.1); drawRoom(x, t); }); ctx.save(); ctx.fillStyle = 'rgba(8,10,20,.6)'; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore();
  ctx.save(); ui(ctx);
  const px = V ? UW() / 2 : 1180, py = V ? uyC(560) : 540, s = V ? 1.25 : 1.0;
  if (!V) { const laugh = t > T.costumbre; figure(ctx, { x: 560, y: 1030, s: 1.5, dir: 1, pose: laugh ? Object.assign({}, POSE.stand, { shF: 60, elF: 110, shB: 40, elB: 40, lean: -6, head: -10 }) : Object.assign({}, POSE.stand, { shF: 40, elF: 100, head: 8 }), face: laugh ? 'laugh' : t > TB.si2 ? 'smug' : 'smile', t, seed: 12, shirt: P.kid, hood: true, rim: 'rgba(190,220,255,1)', light: [1, -.6], look: [6, 2] }); }
  ctx.save(); ctx.translate(px, py + (1 - kp) * 300); ctx.scale(s, s); ctx.rotate(V ? 0 : .04); ctx.globalAlpha = kp;
  ctx.fillStyle = '#0d0e12'; rr(ctx, -230, -420, 460, 840, 54); ctx.fill(); ctx.fillStyle = '#ece5dc'; rr(ctx, -210, -400, 420, 800, 40); ctx.fill(); ctx.save(); ctx.beginPath(); rr(ctx, -210, -400, 420, 800, 40); ctx.clip();
  ctx.fillStyle = '#1f7a52'; ctx.fillRect(-210, -400, 420, 120); ctx.fillStyle = '#f2c6a0'; ctx.beginPath(); ctx.arc(-140, -330, 32, 0, TAU); ctx.fill(); ctx.fillStyle = '#5a3a2a'; ctx.beginPath(); ctx.arc(-140, -342, 30, PI, TAU); ctx.fill();
  text(ctx, 'MAMÁ', -92, -344, { size: 34, font: 'Montserrat', weight: 900, color: '#fff', align: 'left', ls: 2 }); text(ctx, t > TB.si2 && t < TB.si2 + .9 ? 'escribiendo...' : 'en línea', -92, -308, { size: 20, font: 'Montserrat', weight: 800, color: 'rgba(255,255,255,.8)', align: 'left' });
  const k1 = ease(t, t0 + .4, t0 + .7, E.back); if (k1 > 0) { chatBubble(ctx, -190, -200, 300, 70, false, k1); if (k1 > .5) text(ctx, '¿Ya comiste, mijo?', -170, -200, { size: 24, font: 'Montserrat', weight: 800, color: '#1a1a22', align: 'left' }); }
  const kG = ease(t, T.ubicacion - .1, T.ubicacion + .3), gOut = 1 - ease(t, T.bueno - .3, T.bueno); if (kG > 0 && gOut > 0) { ctx.save(); ctx.globalAlpha *= kG * gOut * .55; chatBubble(ctx, -190, -100, 330, 70, false, 1); text(ctx, 'Mándame tu ubicación', -170, -100, { size: 24, font: 'Montserrat', weight: 800, color: '#1a1a22', align: 'left' }); ctx.restore(); ctx.save(); ctx.globalAlpha *= gOut; ctx.strokeStyle = P.red; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-180, -100); ctx.lineTo(lerp(-180, 130, ease(t, T.ubicacion + .3, T.ubicacion + .7)), -100); ctx.stroke(); ctx.restore(); }
  if (t > TB.si2 - .1 && t < TB.si2 + .8) { chatBubble(ctx, -190, -100, 110, 60, false, 1); for (let i = 0; i < 3; i++) { ctx.fillStyle = `rgba(30,30,40,${.3 + .6 * Math.max(0, Math.sin(t * 9 - i))})`; ctx.beginPath(); ctx.arc(-160 + i * 24, -100, 7, 0, TAU); ctx.fill(); } }
  const k2 = ease(t, TB.si2 + .8, TB.si2 + 1.1, E.back); if (k2 > 0) { chatBubble(ctx, -190, -100, 330, 70, false, k2); if (k2 > .5) text(ctx, 'Mándame tu ubicación', -170, -100, { size: 24, font: 'Montserrat', weight: 800, color: '#1a1a22', align: 'left' }); }
  const k3 = ease(t, TB.pero3 + .1, TB.pero3 + .4, E.back); if (k3 > 0) { chatBubble(ctx, 190, 40, 300, 150, true, k3); if (k3 > .5) { ctx.fillStyle = '#cfe8d0'; rr(ctx, -100, -16, 270, 100, 12); ctx.fill(); ctx.strokeStyle = 'rgba(80,140,90,.5)'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-100, 4 + i * 24); ctx.lineTo(170, 14 + i * 20); ctx.stroke(); } pinIcon(ctx, 35, 50, 1.0); text(ctx, 'Ubicación en tiempo real', -96, 104, { size: 18, font: 'Montserrat', weight: 800, color: '#2a4a2a', align: 'left' }); } }
  const k4 = ease(t, T.costumbre + .2, T.costumbre + .5, E.back); if (k4 > 0) { chatBubble(ctx, -190, 230, 250, 70, false, k4); if (k4 > .5) text(ctx, 'Por costumbre', -170, 230, { size: 24, font: 'Montserrat', weight: 800, color: '#1a1a22', align: 'left' }); }
  ctx.restore(); ctx.restore();
  ctx.restore();
  vignette(ctx, .55);
});
