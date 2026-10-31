// Escenarios v2: capas cacheadas, profundidad, luz y atmósfera
const CROWD_PAL = ['#2a8a5a', '#d9d4c8', '#b8414a', '#2a8a5a', '#e07a3a', '#3a5a9a', '#c9a24a', '#5a5a66'];
function crowdTexture(key, w, h, o = {}) {
  return layer(key, w, h, (x) => {
    const r = rnd(o.seed || 5), pal = o.pal || CROWD_PAL;
    x.fillStyle = o.base || '#15131c'; x.fillRect(0, 0, w, h);
    const rows = o.rows || 22;
    for (let row = 0; row < rows; row++) {
      const k = row / (rows - 1), y = lerp(h * .04, h * .98, k), sz = lerp(o.s0 || 5, o.s1 || 13, k);
      x.fillStyle = `rgba(0,0,0,${.35})`; x.fillRect(0, y + sz * .9, w, sz * .7);
      for (let px = -sz; px < w + sz; px += sz * (1.55 + r() * .5)) {
        const col = pal[Math.floor(r() * pal.length)], lit = .55 + .45 * (1 - k) * (o.lit ?? 1);
        x.globalAlpha = .55 + .45 * r();
        x.fillStyle = col; rr(x, px - sz * .62, y + sz * .35, sz * 1.24, sz * 1.25, sz * .35); x.fill();
        x.fillStyle = '#0d0c12'; x.beginPath(); x.arc(px, y, sz * .48, 0, TAU); x.fill();
        if (r() < .12) { x.strokeStyle = '#0d0c12'; x.lineWidth = sz * .28; x.beginPath(); x.moveTo(px - sz * .4, y + sz * .5); x.lineTo(px - sz * .7, y - sz * .9); x.moveTo(px + sz * .4, y + sz * .5); x.lineTo(px + sz * .7, y - sz * .9); x.stroke(); }
        x.globalAlpha = 1;
      }
    }
    // luz de reflectores desde arriba
    const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(255,240,215,.22)'); g.addColorStop(1, 'rgba(0,0,0,.35)'); x.fillStyle = g; x.fillRect(0, 0, w, h);
  }, o.blur || 0);
}
function crowdTwinkle(ctx, t, x0, y0, w, h, n, seed, a = .8) { // flashes de cámara y celulares
  const r = rnd(seed + Math.floor(t * 8)); ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const x = x0 + r() * w, y = y0 + r() * h, s = 2 + r() * 4; const g = ctx.createRadialGradient(x, y, 0, x, y, s * 5); g.addColorStop(0, `rgba(255,255,255,${a})`); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(x - s * 5, y - s * 5, s * 10, s * 10); }
  ctx.restore();
}
function floodBank(ctx, x, y, w, t, a = 1) { // batería de reflectores con halo
  ctx.save(); ctx.fillStyle = '#1b1c22'; rr(ctx, x - w / 2 - 8, y - 22, w + 16, 44, 6); ctx.fill();
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { ctx.fillStyle = '#fffbea'; rr(ctx, x - w / 2 + i * w / 6 + 3, y - 17 + j * 18, w / 6 - 6, 14, 3); ctx.fill(); }
  ctx.restore();
  glow(ctx, x, y, w * 2.2, 'rgba(255,246,222,.55)', a); glow(ctx, x, y, w * .9, 'rgba(255,255,245,.9)', a);
}
// ---------- estadio: plano general desde la tribuna (perspectiva real, 11 vs 11) ----------
function simT(t) { return t <= 9.5 ? t : .3 + ((t - 9.5) % 8.5); }
function stadiumWide2(ctx, t, o = {}) { stadiumMatch(ctx, simT(t), o); }
// primer plano de afición (silueta borrosa)
function fansForeground(ctx, t, o = {}) {
  blurred(ctx, 'fgfans', o.blur ?? 7, (x) => {
    const r = rnd(o.seed || 21), base = o.y || 1080;
    for (let i = 0; i < (o.xs ? o.xs.length : (o.n || 9)); i++) {
      const fx = o.xs ? o.xs[i] : -60 + i * 250 + r() * 90, s = 2.6 + r() * .8, j = Math.max(0, Math.sin(t * (2 + r()) + i)) * 26 * (o.cheer ?? .5);
      figure(x, { x: fx, y: base + 330 - j, s: s * .62, back: true, dir: r() > .5 ? 1 : -1, pose: r() > .4 ? mixPose(POSE.cheer, POSE.fists, (Math.sin(t * 3 + i) + 1) / 2) : POSE.relaxed, face: 'neutral', t, seed: 40 + i, shirt: [P.mex, '#e9e4dc', '#c03a3a', P.mex][i % 4], rim: o.rim || 'rgba(255,200,150,1)', noShadow: true, blink: false });
    }
    if (o.flag !== false) { // bandera ondeando
      const fx = o.flagX || 1500, fy = base - 250; x.save(); x.translate(fx, fy);
      const cols = ['#127a45', '#ece8e0', '#c42b33'];
      for (let k = 0; k < 3; k++) { x.fillStyle = cols[k]; x.beginPath(); for (let i = 0; i <= 12; i++) { const xx = k * 140 + i * 140 / 12, yy = Math.sin(xx * .012 - t * 4) * 26; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } for (let i = 12; i >= 0; i--) { const xx = k * 140 + i * 140 / 12, yy = 260 + Math.sin(xx * .012 - t * 4) * 26; x.lineTo(xx, yy); } x.fill(); }
      x.strokeStyle = '#ddd'; x.lineWidth = 8; x.beginPath(); x.moveTo(0, -20); x.lineTo(0, 520); x.stroke(); x.restore();
    }
  });
}
// ---------- cancha a ras de pasto ----------
function pitchLevel(ctx, t, o = {}) {
  const camX = o.camX || 0, night = o.sky !== 'dusk';
  ctx.fillStyle = vg(ctx, night ? [[0, '#05070f'], [1, '#1b1d33']] : [[0, '#1a1236'], [1, '#6a3550']], -300, 300); ctx.fillRect(-600, -600, W + 1200, 1000);
  // tribuna (borrosa: profundidad de campo)
  const crowd = crowdTexture('crowdNear', 3000, 420, { rows: 14, s0: 9, s1: 18, seed: 11, blur: o.crowdBlur ?? 5 });
  const px = -((camX * .35) % 1000) - 500;
  ctx.drawImage(crowd, px, 140, 3000, 420); ctx.drawImage(crowd, px + 3000, 140, 3000, 420);
  if (o.cheer) { ctx.save(); ctx.globalAlpha = .25 * o.cheer; const jy = 140 - Math.abs(Math.sin(t * 9)) * 8; ctx.drawImage(crowd, px, jy, 3000, 420); ctx.drawImage(crowd, px + 3000, jy, 3000, 420); ctx.restore(); }
  crowdTwinkle(ctx, t, -200, 150, W + 400, 380, 18, 3, .6);
  // reflectores desenfocados
  bokeh(ctx, t, 7, 31, 'rgba(255,248,225,.9)', 30, 70, .55, [-100, -120, W + 200, 260], 3);
  glow(ctx, 260 - camX * .1, 40, 520, 'rgba(255,245,220,.35)'); glow(ctx, 1660 - camX * .1, 40, 520, 'rgba(255,245,220,.35)');
  // vallas LED
  ctx.save(); const off = -((camX * .8) % 720);
  for (let i = -1; i < 5; i++) {
    const bx = off + i * 720; ctx.fillStyle = i % 2 ? '#0e1a3a' : '#0c2a1c'; ctx.fillRect(bx, 548, 720, 64);
    ctx.fillStyle = 'rgba(255,255,255,.06)'; for (let k = 0; k < 64; k += 4) ctx.fillRect(bx, 548 + k, 720, 1);
    text(ctx, i % 2 ? '¿Y SI SÍ?' : 'BRASIL 2014', bx + 360, 581, { size: 34, color: i % 2 ? 'rgba(255,214,90,.9)' : 'rgba(255,255,255,.75)', ls: 6 });
  }
  ctx.restore(); glow(ctx, W / 2, 580, 1100, 'rgba(120,180,255,.06)');
  // pasto
  const grass = layer('grassLevel', 2600, 520, (x, w, h) => {
    x.fillStyle = vg(x, [[0, '#17532f'], [.3, '#1f6e3d'], [1, '#2b8f4f']], 0, h); x.fillRect(0, 0, w, h);
    const vx = w / 2;
    for (let i = -14; i < 14; i++) { if (i % 2) continue; x.fillStyle = 'rgba(0,0,0,.1)'; const a = i * 200, b = a + 200; x.beginPath(); x.moveTo(vx + a * .5, 0); x.lineTo(vx + b * .5, 0); x.lineTo(vx + b * 2.6, h); x.lineTo(vx + a * 2.6, h); x.fill(); }
    const r = rnd(7); x.strokeStyle = 'rgba(160,220,150,.12)'; x.lineWidth = 1.2; for (let i = 0; i < 2500; i++) { const yy = r() * h, xx = r() * w, l = 2 + yy / h * 9; x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx + (r() - .5) * 3, yy - l); x.stroke(); }
    x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 40); x.lineTo(w, 40); x.stroke();
    const lg = x.createLinearGradient(0, 0, 0, h); lg.addColorStop(0, 'rgba(0,0,0,.25)'); lg.addColorStop(.25, 'rgba(255,250,220,.06)'); lg.addColorStop(1, 'rgba(0,0,0,.25)'); x.fillStyle = lg; x.fillRect(0, 0, w, h);
  });
  ctx.drawImage(grass, -340 - ((camX) % 400), 610, 2600, 520);
  haze(ctx, 470, 700, night ? 'rgba(180,200,255,.10)' : 'rgba(255,200,170,.12)');
}
function grassForeground(ctx, t, camX = 0, blur = 6) {
  blurred(ctx, 'grassfg', blur, (x) => { const r = rnd(77); x.strokeStyle = '#123d22'; x.lineCap = 'round';
    for (let i = 0; i < 160; i++) { const gx = ((r() * 2400 - camX * 1.3) % 2400 + 2400) % 2400 - 240, l = 40 + r() * 70, sw = Math.sin(t * 1.4 + i) * 6; x.lineWidth = 5 + r() * 5; x.beginPath(); x.moveTo(gx, H + 10); x.quadraticCurveTo(gx + sw, H - l * .6, gx + sw * 1.6 + (r() - .5) * 20, H - l); x.stroke(); } });
}
// red de portería en primer plano (diagonal), con abombamiento hacia cámara en (bx,by)
function netForeground(ctx, t, o = {}) {
  const bulge = o.bulge || 0, bx = o.bx ?? W / 2, by = o.by ?? H / 2, sp = o.spacing || 120;
  blurred(ctx, 'netfg', o.blur ?? 1.6, (x) => {
    x.strokeStyle = 'rgba(245,245,250,.82)'; x.lineWidth = o.lw || 5; x.lineCap = 'round';
    const disp = (px, py) => { const d = Math.hypot(px - bx, py - by), f = bulge * Math.exp(-(d * d) / (2 * 260 * 260)); return [px + (px - bx) * f * .35, py + (py - by) * f * .35]; };
    for (let dirn = -1; dirn <= 1; dirn += 2) {
      for (let k = -30; k < 30; k++) { x.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = k * sp + u * H * dirn * 1.0 + W / 2 - (dirn > 0 ? 0 : 0), py = u * H * 1.0; const q = disp(px, py); i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1]); } x.stroke(); }
    }
    if (o.post) { x.fillStyle = '#f1f1f4'; x.fillRect(o.post[0], o.post[1], o.post[2], o.post[3]); x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(o.post[0] + o.post[2] * .6, o.post[1], o.post[2] * .4, o.post[3]); }
  });
}
function ball2(ctx, x, y, r, rot = 0, vx = 0, vy = 0) {
  const sp = Math.hypot(vx, vy);
  if (sp > 2) { ctx.save(); ctx.globalAlpha = .25; for (let i = 1; i <= 4; i++) { ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x - vx * i * .25, y - vy * i * .25, r * (1 - i * .08), 0, TAU); ctx.fill(); } ctx.restore(); }
  ctx.save(); ctx.translate(x, y);
  const g = ctx.createRadialGradient(-r * .35, -r * .35, r * .1, 0, 0, r); g.addColorStop(0, '#ffffff'); g.addColorStop(.7, '#e8e8ec'); g.addColorStop(1, '#a9aab3');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
  ctx.clip(); ctx.rotate(rot); ctx.fillStyle = '#1c1d22';
  for (let i = 0; i < 5; i++) { const a = i * TAU / 5; ctx.beginPath(); for (let k = 0; k < 5; k++) { const b = a + k * TAU / 5 + .3; const px = Math.cos(a) * r * .75 + Math.cos(b) * r * .2, py = Math.sin(a) * r * .75 + Math.sin(b) * r * .2; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.fill(); }
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const b = k * TAU / 5 - PI / 2; const px = Math.cos(b) * r * .26, py = Math.sin(b) * r * .26; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.fill();
  ctx.restore();
}
// ---------- marcador TV y sellos ----------
function scoreBug2(ctx, o) { if (NOUI) return;
  const a = o.alpha ?? 1; if (a <= 0) return;
  ctx.save(); ui(ctx); const x = uxL(80), y = uyT(172); ctx.globalAlpha = a; ctx.translate(x, y); if (V) ctx.scale(1.25, 1.25);
  ctx.fillStyle = 'rgba(10,12,20,.78)'; rr(ctx, 0, 0, 380, 50, 8); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.14)'; ctx.lineWidth = 1.5; rr(ctx, 0, 0, 380, 50, 8); ctx.stroke();
  ctx.fillStyle = o.c1 || P.mex; rr(ctx, 8, 10, 6, 30, 3); ctx.fill(); ctx.fillStyle = o.c2 || P.ned; rr(ctx, 205, 10, 6, 30, 3); ctx.fill();
  text(ctx, o.a, 58, 26, { size: 24, font: 'Montserrat', weight: 900, color: '#fff', ls: 2 });
  ctx.fillStyle = o.flash ? 'rgba(255,210,63,.95)' : 'rgba(255,255,255,.1)'; rr(ctx, 104, 8, 86, 34, 6); ctx.fill();
  text(ctx, `${o.s1} - ${o.s2}`, 147, 26, { size: 26, font: 'Montserrat', weight: 900, color: o.flash ? '#111' : '#fff' });
  text(ctx, o.b, 254, 26, { size: 24, font: 'Montserrat', weight: 900, color: '#fff', ls: 2 });
  text(ctx, o.min, 336, 26, { size: 20, font: 'Montserrat', weight: 800, color: P.yel });
  ctx.restore();
}
function stamp2(ctx, lines, t, t0, o = {}) { if (NOUI) return;
  const k0 = ease(t, t0, t0 + .5, E.out); if (k0 <= 0) return;
  ctx.save(); ui(ctx); const x = uxL(o.x || 110), y = uyB(o.y || 790) - (V ? 40 * (lines.length - 1) : 0); if (V) { ctx.translate(x, y); ctx.scale(1.3, 1.3); ctx.translate(-x, -y); } ctx.globalAlpha = k0 * (o.out ? 1 - ease(t, o.out, o.out + .5) : 1);
  ctx.fillStyle = P.yel; ctx.fillRect(x, y - 30, lerp(0, 4, k0), 46 + (lines.length - 1) * 40);
  lines.forEach((ln, i) => {
    const ti = t0 + (o.gaps ? o.gaps[i] : i * .6); const n = Math.floor(clamp((t - ti) * 30, 0, ln.length)); if (n <= 0) return;
    text(ctx, ln.slice(0, n), x + 22, y + i * 42, { size: i === 0 ? 34 : 24, align: 'left', font: 'Montserrat', weight: i === 0 ? 900 : 800, color: i === 0 ? '#fff' : 'rgba(255,255,255,.75)', ls: i === 0 ? 4 : 6, shadow: 'rgba(0,0,0,.7)', blur: 16 });
  });
  ctx.restore();
}
function tag(ctx, s, x, y, t, t0, o = {}) { if (NOUI) return; // etiqueta con línea guía
  const k = ease(t, t0, t0 + .45, E.outQuint); if (k <= 0) return;
  ctx.save(); ctx.globalAlpha = k * (o.out ? 1 - ease(t, o.out, o.out + .4) : 1);
  const ly = y - 70 * k; ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, ly + 22); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill();
  ctx.font = '900 24px Montserrat'; ctx.letterSpacing = '4px'; const w = ctx.measureText(s).width + 34;
  ctx.fillStyle = 'rgba(10,12,18,.72)'; rr(ctx, x - w / 2, ly - 20, w, 42, 21); ctx.fill(); ctx.strokeStyle = o.col || P.yel; ctx.lineWidth = 2; rr(ctx, x - w / 2, ly - 20, w, 42, 21); ctx.stroke();
  text(ctx, s, x + 2, ly + 1, { size: 24, font: 'Montserrat', weight: 900, color: o.col || P.yel, ls: 4 });
  ctx.restore();
}
