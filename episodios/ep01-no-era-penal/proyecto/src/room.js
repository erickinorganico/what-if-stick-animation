// La sala de 2014: fondo cacheado (nítido y desenfocado), tele CRT, luz de tele + lámpara
function roomBG(blur = 0) {
  return layer('room' + blur, 2200, 1240, (x, w, h) => {
    x.translate(140, 80);
    // pared con papel tapiz
    x.fillStyle = vg(x, [[0, '#24302f'], [.7, '#2e3b38'], [1, '#26302d']], -80, 760); x.fillRect(-140, -80, w, 860);
    x.globalAlpha = .07; x.fillStyle = '#c9d6c8'; for (let i = -140; i < w; i += 46) { x.fillRect(i, -80, 3, 860); x.fillRect(i + 22, -80, 1, 860); } x.globalAlpha = 1;
    for (let i = -140; i < w; i += 92) for (let j = 0; j < 760; j += 92) { x.globalAlpha = .05; x.fillStyle = '#e0e8d8'; x.beginPath(); x.arc(i + 46, j + 46, 6, 0, TAU); x.fill(); } x.globalAlpha = 1;
    // zoclo
    x.fillStyle = '#3a2a20'; x.fillRect(-140, 730, w, 30);
    // ventana con ciudad (bokeh)
    x.save(); rr(x, 1290, 150, 420, 330, 6); x.clip();
    x.fillStyle = vg(x, [[0, '#0a0e26'], [1, '#2a2052']], 150, 480); x.fillRect(1290, 150, 420, 330);
    const r = rnd(12); for (let i = 0; i < 60; i++) { const bx = 1290 + r() * 420, by = 300 + r() * 180, rad = 4 + r() * 12; const g = x.createRadialGradient(bx, by, 0, bx, by, rad); const c = r() > .3 ? '255,210,140' : '170,200,255'; g.addColorStop(0, `rgba(${c},.9)`); g.addColorStop(1, `rgba(${c},0)`); x.fillStyle = g; x.fillRect(bx - rad, by - rad, rad * 2, rad * 2); }
    x.fillStyle = 'rgba(10,12,30,.55)'; for (let i = 0; i < 9; i++) { const bh = 70 + r() * 120; x.fillRect(1290 + i * 48, 480 - bh, 44, bh); }
    x.restore();
    x.strokeStyle = '#4a3528'; x.lineWidth = 16; rr(x, 1290, 150, 420, 330, 6); x.stroke(); x.lineWidth = 8; x.beginPath(); x.moveTo(1500, 150); x.lineTo(1500, 480); x.moveTo(1290, 315); x.lineTo(1710, 315); x.stroke();
    x.fillStyle = '#6b2a2a'; x.fillRect(1250, 130, 60, 380); x.fillRect(1690, 130, 60, 380); // cortinas
    x.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 4; i++) { x.fillRect(1256 + i * 14, 130, 4, 380); x.fillRect(1696 + i * 14, 130, 4, 380); }
    // repisa con trofeo y foto 1986
    x.fillStyle = '#4b3324'; x.fillRect(820, 300, 360, 16); x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(820, 316, 360, 10);
    x.fillStyle = '#5a3b26'; rr(x, 850, 186, 150, 114, 4); x.fill(); x.fillStyle = '#d9c9a2'; x.fillRect(862, 198, 126, 90);
    x.fillStyle = '#7a6a4a'; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(878 + i * 19, 236, 7, 0, TAU); x.fill(); x.fillRect(872 + i * 19, 244, 12, 26); }
    x.font = '22px Anton'; x.fillStyle = '#6b5636'; x.textAlign = 'center'; x.fillText('MÉXICO 86', 925, 284);
    const tg = x.createLinearGradient(1060, 0, 1110, 0); tg.addColorStop(0, '#8a6a1a'); tg.addColorStop(.5, '#f2d27a'); tg.addColorStop(1, '#8a6a1a'); x.fillStyle = tg;
    x.beginPath(); x.moveTo(1060, 210); x.quadraticCurveTo(1062, 262, 1080, 270); x.lineTo(1080, 288); x.lineTo(1068, 300); x.lineTo(1102, 300); x.lineTo(1090, 288); x.lineTo(1090, 270); x.quadraticCurveTo(1108, 262, 1110, 210); x.closePath(); x.fill();
    // banderín
    x.fillStyle = P.mex; x.beginPath(); x.moveTo(560, 180); x.lineTo(760, 210); x.lineTo(560, 250); x.fill(); x.fillStyle = '#eee'; x.beginPath(); x.moveTo(560, 196); x.lineTo(700, 212); x.lineTo(560, 234); x.fill(); x.fillStyle = '#c42b33'; x.beginPath(); x.moveTo(560, 205); x.lineTo(640, 213); x.lineTo(560, 224); x.fill();
    // piso de madera
    x.fillStyle = vg(x, [[0, '#4a3324'], [1, '#2a1c13']], 760, 1160); x.fillRect(-140, 760, w, 500);
    x.strokeStyle = 'rgba(0,0,0,.25)'; x.lineWidth = 2; for (let i = 0; i < 12; i++) { const yy = 760 + i * i * 4.2; x.beginPath(); x.moveTo(-140, yy); x.lineTo(w, yy); x.stroke(); }
    x.fillStyle = 'rgba(120,30,30,.55)'; x.beginPath(); x.ellipse(1000, 935, 720, 120, 0, 0, TAU); x.fill();
    x.strokeStyle = 'rgba(230,190,120,.25)'; x.lineWidth = 6; x.beginPath(); x.ellipse(1000, 935, 680, 105, 0, 0, TAU); x.stroke();
    // sillón del abuelo
    x.fillStyle = '#5e3324'; rr(x, 1440, 490, 330, 280, 54); x.fill(); x.fillStyle = 'rgba(255,255,255,.06)'; rr(x, 1462, 505, 140, 130, 44); x.fill();
    x.fillStyle = '#7c4632'; rr(x, 1480, 650, 260, 110, 24); x.fill();
    x.fillStyle = '#6e3c2b'; rr(x, 1412, 600, 92, 220, 32); x.fill(); rr(x, 1706, 600, 92, 220, 32); x.fill();
    x.fillStyle = '#2a1a12'; x.fillRect(1450, 815, 16, 22); x.fillRect(1750, 815, 16, 22);
    // sofá
    x.fillStyle = '#263f5c'; rr(x, 590, 480, 760, 290, 54); x.fill(); x.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 3; i++) { rr(x, 630 + i * 232, 500, 214, 130, 40); x.fill(); }
    x.fillStyle = '#33557a'; rr(x, 640, 650, 660, 110, 26); x.fill(); x.fillStyle = 'rgba(0,0,0,.22)'; x.fillRect(860, 652, 4, 106); x.fillRect(1080, 652, 4, 106);
    x.fillStyle = '#2d4a6b'; rr(x, 556, 600, 100, 220, 36); x.fill(); rr(x, 1284, 600, 100, 220, 36); x.fill();
    x.fillStyle = '#1a120c'; x.fillRect(606, 815, 16, 22); x.fillRect(1318, 815, 16, 22);
    // sombra general de esquinas
    const vg2 = x.createRadialGradient(1100, 520, 200, 1100, 520, 1300); vg2.addColorStop(0, 'rgba(0,0,0,0)'); vg2.addColorStop(1, 'rgba(0,0,0,.55)'); x.fillStyle = vg2; x.fillRect(-140, -80, w, h);
  }, blur);
}
function drawRoom(ctx, t, o = {}) {
  ctx.drawImage(roomBG(o.blur || 0), -140, -80);
  // papel picado (dinámico, suave)
  for (let i = 0; i < 18; i++) {
    const x = 380 + i * 72, sw = Math.sin(t * 1.6 + i * .7) * 4, col = ['#1f9e57', '#eeeae2', '#d33b44'][i % 3];
    ctx.save(); ctx.translate(x, 92 + Math.sin(i * 1.3) * 6); ctx.rotate(D2R(sw * .5));
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(62, 0); ctx.lineTo(62, 58); ctx.lineTo(48, 70); ctx.lineTo(31, 60); ctx.lineTo(14, 70); ctx.lineTo(0, 58); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.arc(20, 24, 6, 0, TAU); ctx.arc(42, 24, 6, 0, TAU); ctx.fill(); ctx.fillRect(16, 40, 30, 5);
    ctx.restore();
  }
  ctx.strokeStyle = 'rgba(220,220,220,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(360, 92); ctx.quadraticCurveTo(1000, 108, 1700, 92); ctx.stroke();
  // lámpara de pie (izquierda del sillón)
  ctx.fillStyle = '#1a1a1c'; ctx.fillRect(1838, 360, 8, 470); ctx.fillStyle = '#e8cf98'; ctx.beginPath(); ctx.moveTo(1780, 370); ctx.lineTo(1904, 370); ctx.lineTo(1874, 280); ctx.lineTo(1810, 280); ctx.closePath(); ctx.fill();
  glow(ctx, 1842, 360, 620, 'rgba(255,190,110,.32)'); glow(ctx, 1842, 330, 140, 'rgba(255,220,160,.6)');
}
function tvGlow(ctx, t, col = '120,190,255', a = 1) { // parpadeo de tele sobre la escena (desde la izquierda)
  const fl = .75 + .25 * noise1(t * 7) * noise1(t * 3 + 4);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(150, 520, 50, 150, 520, 1500); g.addColorStop(0, `rgba(${col},${.30 * fl * a})`); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(-500, -500, W + 1000, H + 1000); ctx.restore();
}
// tele CRT de lado (izquierda, mirando a la familia); fn pinta la imagen 1920x1080
function crtSide(ctx, t, fn) {
  ctx.save();
  ctx.fillStyle = '#3a2a1e'; ctx.fillRect(40, 610, 420, 220); ctx.fillStyle = '#2a1c13'; ctx.fillRect(60, 640, 180, 160); ctx.fillRect(260, 640, 180, 160);
  ctx.fillStyle = '#2a2b31'; ctx.beginPath(); ctx.moveTo(70, 330); ctx.lineTo(420, 300); ctx.lineTo(440, 610); ctx.lineTo(60, 610); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#1b1c20'; ctx.beginPath(); ctx.moveTo(110, 360); ctx.lineTo(400, 335); ctx.lineTo(410, 575); ctx.lineTo(100, 580); ctx.closePath(); ctx.fill();
  // pantalla con perspectiva
  ctx.save(); ctx.beginPath(); ctx.moveTo(122, 372); ctx.lineTo(388, 350); ctx.lineTo(396, 562); ctx.lineTo(114, 566); ctx.closePath(); ctx.clip();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // dibujado sin cámara: se compone luego
  ctx.restore();
  ctx.restore();
  // contenido: render a lienzo temporal y pegar con transformación
  const [c, x] = tmp('tvc'); fn(x);
  ctx.save(); ctx.beginPath(); ctx.moveTo(122, 372); ctx.lineTo(388, 350); ctx.lineTo(396, 562); ctx.lineTo(114, 566); ctx.closePath(); ctx.clip();
  ctx.transform(276 / W, -22 / W, -8 / H, 194 / H, 118, 372); ctx.drawImage(c, 0, 0); ctx.restore();
  ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#000'; for (let yy = 350; yy < 570; yy += 4) ctx.fillRect(100, yy, 300, 1.5); ctx.restore();
  const g = ctx.createLinearGradient(120, 350, 400, 570); g.addColorStop(0, 'rgba(255,255,255,.18)'); g.addColorStop(.35, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(122, 372); ctx.lineTo(388, 350); ctx.lineTo(396, 562); ctx.lineTo(114, 566); ctx.fill();
  glow(ctx, 260, 460, 360, 'rgba(140,200,255,.35)', .8 + .2 * noise1(t * 6));
}
function coffeeTable2(ctx, t, extra) {
  ctx.fillStyle = '#5a3b26'; rr(ctx, 740, 838, 460, 34, 10); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.08)'; rr(ctx, 750, 840, 440, 8, 4); ctx.fill();
  ctx.fillStyle = '#3a2618'; ctx.fillRect(770, 870, 18, 120); ctx.fillRect(1152, 870, 18, 120);
  // tazón de papitas y refrescos
  ctx.fillStyle = '#c94a2a'; ctx.beginPath(); ctx.ellipse(880, 832, 60, 20, 0, 0, PI); ctx.fill(); ctx.fillStyle = '#f2c14a'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.ellipse(842 + i * 11, 826 - (i % 3) * 3, 9, 5, i, 0, TAU); ctx.fill(); }
  [[1040, '#7a2a1a'], [1080, '#2a5a2a']].forEach(([bx, c]) => { ctx.fillStyle = c; rr(ctx, bx - 11, 760, 22, 78, 6); ctx.fill(); ctx.fillRect(bx - 5, 744, 10, 18); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(bx - 7, 770, 4, 50); });
  if (extra) extra();
}

// frente de cojines (va encima de las caderas de quien está sentado)
function seatFronts(ctx) {
  ctx.fillStyle = '#33557a'; rr(ctx, 632, 712, 676, 66, 22); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.08)'; rr(ctx, 640, 714, 660, 10, 5); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(860, 716, 4, 58); ctx.fillRect(1080, 716, 4, 58);
  ctx.fillStyle = '#2d4a6b'; rr(ctx, 556, 640, 100, 180, 36); ctx.fill(); rr(ctx, 1284, 640, 100, 180, 36); ctx.fill();
  ctx.fillStyle = '#7c4632'; rr(ctx, 1474, 712, 272, 66, 22); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.08)'; rr(ctx, 1482, 714, 256, 10, 5); ctx.fill();
  ctx.fillStyle = '#6e3c2b'; rr(ctx, 1412, 640, 92, 180, 32); ctx.fill(); rr(ctx, 1706, 640, 92, 180, 32); ctx.fill();
}
