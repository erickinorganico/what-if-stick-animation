// EL HUBIERA · ep04 «¿Y si Cristiano Ronaldo hubiera nacido en México?» — escenarios y utilería propios.
// Todo determinista (rnd/hash), cacheado con layer() cuando es fondo fijo. Coordenadas de mundo 1920×1080, piso ≈ 900.
const CR = {
  rojo: '#b8322a', rojoNino: '#cf3b2f', xolo: '#16161a', xoloRojo: 'rgba(200,16,46,.95)', mama: '#6f5a8f', visor: '#d8cfb8', traje: '#24262e',
  sporting: '#1f7a4a', tierra: '#7a5a3c', tierraOsc: '#4e3826',
};
KIT.XOL = { shirt: '#16161a', shorts: '#16161a', socks: '#c8102e', vstripes: 'rgba(200,16,46,.95)', gk: { shirt: '#e8a020', shorts: '#e8a020', socks: '#e8a020' } };
KIT.EUR = { shirt: '#e9e9ee', shorts: '#e9e9ee', socks: '#e9e9ee', numCol: '#22252e', gk: { shirt: '#3c8a5a', shorts: '#3c8a5a', socks: '#3c8a5a' } };
KIT.RIV = { shirt: '#f2c230', shorts: '#1d3f8a', socks: '#f2c230', numCol: '#1d3f8a', gk: { shirt: '#444', shorts: '#444', socks: '#444' } };

// ---------- cielo ----------
const SKY = {
  tarde: [[0, '#2a3a6a'], [.45, '#c26a5a'], [.8, '#f0a860'], [1, '#f8d090']],
  dia: [[0, '#5c94cc'], [.6, '#a9cbe6'], [1, '#e4eef2']],
  alba: [[0, '#2c3456'], [.5, '#8a6f8f'], [.85, '#e8a27a'], [1, '#f6cf9c']],
  noche: [[0, '#05070f'], [.6, '#121a33'], [1, '#2a2440']],
  gris: [[0, '#5d6670'], [.6, '#8c949b'], [1, '#b8bcbe']],
};
function cieloCR(x, w, h, tipo) {
  x.fillStyle = vg(x, SKY[tipo] || SKY.dia, 0, h * .78); x.fillRect(0, 0, w, h);
  if (tipo === 'tarde') { glow(x, w * .78, h * .6, 520, 'rgba(255,200,120,.55)'); x.fillStyle = 'rgba(255,226,160,.95)'; x.beginPath(); x.arc(w * .78, h * .6, 46, 0, TAU); x.fill(); }
  if (tipo === 'alba') { glow(x, w * .2, h * .66, 480, 'rgba(255,190,130,.5)'); }
  if (tipo === 'dia') { glow(x, w * .82, h * .12, 380, 'rgba(255,250,230,.6)'); }
  if (tipo === 'noche') { const r = rnd(5); for (let i = 0; i < 180; i++) { x.fillStyle = `rgba(255,255,255,${.2 + r() * .6})`; x.fillRect(r() * w, r() * h * .6, 2, 2); } }
}
// casitas en una ladera: lado = curva de la loma; pal = colores
function casitas(x, r, pts, n, s, pal, o = {}) {
  for (let i = 0; i < n; i++) {
    const u = r(), k = Math.floor(u * (pts.length - 1)), f = u * (pts.length - 1) - k, base = [lerp(pts[k][0], pts[k + 1][0], f), lerp(pts[k][1], pts[k + 1][1], f)];
    const yy = base[1] + r() * (o.prof || 220), sc = s * (.7 + .6 * r()) * lerp(.8, 1.2, (yy - base[1]) / (o.prof || 220));
    const w = (34 + r() * 30) * sc, hh = (24 + r() * 26) * sc; x.fillStyle = pal[Math.floor(r() * pal.length)]; x.fillRect(base[0], yy - hh, w, hh);
    if (o.techo) { x.fillStyle = o.techo; x.beginPath(); x.moveTo(base[0] - 3 * sc, yy - hh); x.lineTo(base[0] + w / 2, yy - hh - 12 * sc); x.lineTo(base[0] + w + 3 * sc, yy - hh); x.fill(); }
    else if (r() < .55) { x.fillStyle = '#1a1a1a'; x.fillRect(base[0] + w * .62, yy - hh - 9 * sc, 9 * sc, 9 * sc); } // tinaco
    x.fillStyle = 'rgba(30,24,30,.55)'; x.fillRect(base[0] + w * .2, yy - hh * .62, w * .18, hh * .3); if (w > 40 * sc) x.fillRect(base[0] + w * .58, yy - hh * .62, w * .16, hh * .3);
  }
}
const PAL_TJ = ['#d9a066', '#c96e4f', '#e6d3a8', '#8fb3a6', '#d77f8a', '#e8c06a', '#b9a58b', '#9a7fb0', '#7aa0c4'];
const PAL_MAD = ['#f1ece2', '#efe6d4', '#e9e2d6', '#f4efe6', '#e2d8c4'];
// fondo de cerros: lugar 'tj' (Tijuana: tierra, casas de colores, tinacos, postes) o 'mad' (Madeira: verde, casas blancas de techo naranja y mar)
function cerros(ctx, lugar = 'tj', cielo = 'tarde') {
  ctx.drawImage(layer('cerros-' + lugar + '-' + cielo, W, H, (x, w, h) => {
    cieloCR(x, w, h, cielo); const r = rnd(lugar === 'tj' ? 31 : 47);
    const tj = lugar === 'tj';
    // loma lejana
    x.fillStyle = tj ? 'rgba(120,96,92,.55)' : 'rgba(70,110,96,.55)'; x.beginPath(); x.moveTo(0, 520);
    for (let i = 0; i <= 12; i++) x.lineTo(i * 160, 470 - Math.sin(i * .9 + 1) * 60 - (i > 6 ? 40 : 0)); x.lineTo(w, h); x.lineTo(0, h); x.fill();
    if (!tj) { x.fillStyle = vg(x, [[0, '#3a7ab0'], [1, '#1d4f7e']], 600, 1080); x.fillRect(0, 640, 760, 440); x.fillStyle = 'rgba(255,255,255,.18)'; for (let i = 0; i < 40; i++) x.fillRect(r() * 760, 650 + r() * 300, 20 + r() * 40, 2); }
    const lomaA = tj ? [[0, 560], [400, 520], [900, 560], [1400, 500], [1920, 540]] : [[620, 600], [1000, 520], [1400, 470], [1920, 430]];
    casitas(x, r, lomaA, tj ? 140 : 90, .9, tj ? PAL_TJ : PAL_MAD, { prof: 230, techo: tj ? null : '#c4602e' });
    x.fillStyle = tj ? 'rgba(90,62,42,.85)' : 'rgba(46,92,60,.85)'; x.beginPath(); x.moveTo(tj ? 0 : 600, 760);
    for (let i = 0; i <= 10; i++) x.lineTo((tj ? 0 : 600) + i * (tj ? 192 : 132), 720 - Math.sin(i * 1.3) * 26); x.lineTo(w, h); x.lineTo(tj ? 0 : 600, h); x.fill();
    casitas(x, r, tj ? [[0, 700], [700, 690], [1920, 700]] : [[640, 700], [1920, 660]], tj ? 46 : 30, 1.4, tj ? PAL_TJ : PAL_MAD, { prof: 80, techo: tj ? null : '#c4602e' });
    if (tj) { x.strokeStyle = 'rgba(30,22,26,.7)'; x.lineWidth = 2; for (let p = 0; p < 5; p++) { const px = 120 + p * 420; x.fillStyle = 'rgba(30,22,26,.8)'; x.fillRect(px, 470, 6, 300); if (p < 4) { x.beginPath(); x.moveTo(px + 3, 480); x.quadraticCurveTo(px + 213, 520, px + 423, 480); x.stroke(); x.beginPath(); x.moveTo(px + 3, 496); x.quadraticCurveTo(px + 213, 540, px + 423, 496); x.stroke(); } } }
    const tint = cielo === 'tarde' ? 'rgba(255,150,80,.12)' : cielo === 'alba' ? 'rgba(255,170,140,.1)' : cielo === 'noche' ? 'rgba(4,8,24,.55)' : 'rgba(0,0,0,0)';
    x.fillStyle = tint; x.fillRect(0, 0, w, h);
  }), 0, 0);
}
// piso de tierra del llano (con portería de tubo opcional)
function llano(ctx, t, o = {}) {
  ctx.drawImage(layer('llano-' + (o.cielo || 'tarde'), W, 420, (x, w, h) => {
    x.fillStyle = vg(x, [[0, '#8a6744'], [1, '#5e432b']], 0, h); x.fillRect(0, 0, w, h);
    const r = rnd(12); for (let i = 0; i < 900; i++) { x.fillStyle = r() < .5 ? 'rgba(40,26,16,.25)' : 'rgba(220,180,130,.12)'; const yy = r() * h; x.fillRect(r() * w, yy, 2 + yy / h * 8, 1 + yy / h * 2); }
    x.strokeStyle = 'rgba(235,220,190,.28)'; x.lineWidth = 4; x.beginPath(); x.moveTo(-50, 70); x.lineTo(w + 50, 50); x.stroke(); // raya de cal gastada
    for (let i = 0; i < 14; i++) { x.fillStyle = 'rgba(70,100,40,.5)'; const gx = r() * w, gy = r() * h; for (let k = 0; k < 7; k++) x.fillRect(gx + k * 3, gy - r() * 14, 2, 14); }
    if (o.cielo === 'noche') { x.fillStyle = 'rgba(4,8,24,.55)'; x.fillRect(0, 0, w, h); }
  }), 0, 760);
  if (o.porteria) porteriaTubo(ctx, o.porteria[0], o.porteria[1], o.porteria[2] || 1, o.red);
  if (o.polvo !== false) dust(ctx, t, 26, 9, 'rgba(255,220,170,1)');
}
function porteriaTubo(ctx, x, y, s = 1, red = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (red) { ctx.strokeStyle = 'rgba(230,230,230,.35)'; ctx.lineWidth = 1.5; for (let i = 0; i <= 14; i++) { ctx.beginPath(); ctx.moveTo(-170 + i * 24, -230); ctx.lineTo(-150 + i * 22 + (red > 1 ? Math.sin(i) * 8 : 0), -10); ctx.stroke(); } for (let j = 0; j < 9; j++) { ctx.beginPath(); ctx.moveTo(-170, -230 + j * 26); ctx.lineTo(170, -230 + j * 26); ctx.stroke(); } }
  ctx.strokeStyle = '#b9b2a6'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-180, 0); ctx.lineTo(-180, -250); ctx.lineTo(180, -250); ctx.lineTo(180, 0); ctx.stroke();
  ctx.strokeStyle = 'rgba(120,60,30,.55)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-180, -120); ctx.lineTo(-180, -60); ctx.moveTo(60, -250); ctx.lineTo(120, -250); ctx.stroke(); // óxido
  ctx.restore();
}
// cancha abandonada (rima del gancho y del cierre): concreto agrietado, rayas despintadas, portería sin red, maleza y barda con grafiti
function canchaAbandonada(ctx, t, o = {}) {
  const cielo = o.cielo || 'tarde';
  cerros(ctx, 'tj', cielo);
  ctx.drawImage(layer('cancha-ab-' + cielo, W, 520, (x, w, h) => {
    // barda
    x.fillStyle = '#8f8576'; x.fillRect(0, 0, w, 110); x.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < w; i += 64) x.fillRect(i, 0, 3, 110);
    x.font = 'italic 60px "Instrument Serif"'; x.fillStyle = 'rgba(40,110,150,.55)'; x.fillText('la loma fc', 240, 76); x.fillStyle = 'rgba(160,60,40,.5)'; x.font = '46px Anton'; x.fillText('EL BICHO 7', 1260, 78);
    x.fillStyle = vg(x, [[0, '#9b948a'], [1, '#6f6a62']], 110, h); x.fillRect(0, 110, w, h - 110);
    const r = rnd(77); x.strokeStyle = 'rgba(30,26,22,.5)'; x.lineWidth = 2;
    for (let i = 0; i < 26; i++) { let px = r() * w, py = 120 + r() * (h - 120); x.beginPath(); x.moveTo(px, py); for (let k = 0; k < 5; k++) { px += (r() - .5) * 120; py += (r() - .3) * 40; x.lineTo(px, py); } x.stroke(); }
    x.strokeStyle = 'rgba(235,230,215,.3)'; x.lineWidth = 5; x.setLineDash([60, 30, 10, 40]); x.beginPath(); x.moveTo(-40, 180); x.lineTo(w + 40, 170); x.stroke(); x.beginPath(); x.ellipse(w / 2, 330, 260, 70, 0, 0, TAU); x.stroke(); x.setLineDash([]);
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(${60 + r() * 30},${90 + r() * 40},40,.7)`; const gx = r() * w, gy = 112 + r() * 30; for (let k = 0; k < 6; k++) x.fillRect(gx + k * 4, gy - 10 - r() * 18, 2.5, 28); }
    if (cielo === 'noche') { x.fillStyle = 'rgba(4,8,24,.5)'; x.fillRect(0, 0, w, h); }
    if (cielo === 'tarde') { x.fillStyle = 'rgba(255,140,70,.1)'; x.fillRect(0, 0, w, h); }
  }), 0, 560);
  porteriaTubo(ctx, o.gx ?? 1520, 900, o.gs || 1, 0);
  // lámpara rota
  ctx.fillStyle = '#2a2a30'; ctx.fillRect(250, 360, 10, 330); ctx.fillRect(220, 360, 70, 14);
  if (o.polvo !== false) dust(ctx, t, 22, 13, 'rgba(255,220,170,1)');
}
// cuarto genérico: pared, piso, ventana y luz de lámpara; tipo decide la utilería de fondo
function cuarto(ctx, t, tipo = 'cocina', o = {}) {
  ctx.drawImage(layer('cuarto-' + tipo, W, H, (x, w, h) => {
    const pared = { cocina: '#c9a77a', taller: '#5f6066', oficina: '#4d5562', cantina: '#7a4a2c', gym: '#3b3f48', vestidor: '#2c3340', club: '#46505e', recamara: '#8a7aa0', academia: '#d2cdbf', hospital: '#cfd8d6' }[tipo] || '#8a7a6a';
    x.fillStyle = pared; x.fillRect(0, 0, w, h); x.fillStyle = vg(x, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.35)']], 0, 800); x.fillRect(0, 0, w, 800);
    const piso = { cocina: '#7e5f45', taller: '#3a3a3e', cantina: '#3f2a1c', gym: '#22252c', vestidor: '#3a4048', hospital: '#b7c2c0', academia: '#9a8c74' }[tipo] || '#4a4038';
    x.fillStyle = piso; x.fillRect(0, 800, w, h - 800); x.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < w; i += 120) x.fillRect(i, 800, 2, h);
    const win = (wx, wy, ww, wh, col) => { x.fillStyle = col; x.fillRect(wx, wy, ww, wh); x.strokeStyle = 'rgba(30,24,20,.8)'; x.lineWidth = 10; x.strokeRect(wx, wy, ww, wh); x.beginPath(); x.moveTo(wx + ww / 2, wy); x.lineTo(wx + ww / 2, wy + wh); x.stroke(); };
    if (tipo === 'cocina') { win(1240, 240, 360, 260, '#2a3550'); x.fillStyle = '#e8e2d6'; x.fillRect(120, 380, 220, 420); x.fillStyle = '#d0c8b8'; x.fillRect(120, 560, 220, 6); x.fillStyle = '#6a4a32'; x.fillRect(420, 520, 500, 280); x.fillStyle = '#3a2a1e'; for (let i = 0; i < 3; i++) x.fillRect(440 + i * 165, 540, 140, 230); x.fillStyle = '#9aa0a6'; x.fillRect(470, 470, 160, 50); }
    if (tipo === 'taller') { x.fillStyle = '#2a2b30'; x.fillRect(0, 140, w, 40); x.fillStyle = '#45464c'; for (let i = 0; i < 7; i++) { x.fillRect(120 + i * 250, 260, 180, 30); } x.strokeStyle = '#8a8c92'; x.lineWidth = 6; for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(1300 + i * 40, 300); x.lineTo(1300 + i * 40, 420 + (i % 3) * 20); x.stroke(); } x.fillStyle = '#b24a2a'; x.fillRect(1500, 600, 280, 200); x.fillStyle = '#2a2b30'; x.font = '40px Anton'; x.fillText('LLANTERA Y TALLER', 320, 120); }
    if (tipo === 'oficina' || tipo === 'club') { win(1260, 200, 480, 340, '#16203a'); x.fillStyle = 'rgba(255,220,150,.5)'; for (let i = 0; i < 30; i++) x.fillRect(1280 + (i * 37) % 440, 300 + (i * 53) % 220, 6, 6); x.fillStyle = '#2b2018'; x.fillRect(340, 300, 340, 220); x.fillStyle = '#d9b44a'; x.fillRect(372, 330, 60, 90); x.fillRect(460, 350, 50, 70); x.fillRect(540, 340, 56, 80); }
    if (tipo === 'cantina') { x.fillStyle = '#2a180e'; x.fillRect(0, 560, w, 240); x.fillStyle = 'rgba(255,200,120,.25)'; for (let i = 0; i < 16; i++) x.fillRect(120 + i * 110, 320 + (i % 2) * 30, 34, 100); x.fillStyle = '#c94a3a'; x.font = '64px Anton'; x.fillText('VIERNES BOTANERO', 600, 200); x.fillStyle = 'rgba(255,230,160,.5)'; x.fillRect(560, 140, 720, 6); }
    if (tipo === 'gym') { x.fillStyle = '#15171c'; for (let i = 0; i < 6; i++) x.fillRect(200 + i * 280, 420, 20, 380); x.fillStyle = '#5a5e68'; x.fillRect(160, 420, 1600, 14); win(1400, 160, 380, 200, '#1a2240'); }
    if (tipo === 'vestidor') { for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? '#3a4452' : '#34404d'; x.fillRect(80 + i * 200, 180, 180, 620); x.fillStyle = 'rgba(0,0,0,.3)'; x.fillRect(150 + i * 200, 280, 40, 8); } x.fillStyle = '#6a5038'; x.fillRect(0, 720, w, 50); }
    if (tipo === 'academia') { win(220, 200, 380, 280, '#7fb2d8'); win(1300, 200, 380, 280, '#7fb2d8'); x.fillStyle = '#5a4a38'; x.fillRect(760, 520, 400, 24); x.fillRect(780, 544, 18, 256); x.fillRect(1122, 544, 18, 256); }
    if (tipo === 'hospital') { win(700, 200, 520, 340, '#2a3a5a'); x.fillStyle = 'rgba(255,220,150,.5)'; for (let i = 0; i < 40; i++) x.fillRect(720 + (i * 43) % 480, 300 + (i * 61) % 220, 5, 5); }
  }), 0, 0);
  if (o.lampara) { glow(ctx, o.lampara[0], o.lampara[1], o.lampara[2] || 520, 'rgba(255,200,130,.35)'); ctx.fillStyle = '#1a1410'; ctx.fillRect(o.lampara[0] - 2, 0, 4, o.lampara[1] - 30); ctx.beginPath(); ctx.moveTo(o.lampara[0] - 50, o.lampara[1]); ctx.lineTo(o.lampara[0] + 50, o.lampara[1]); ctx.lineTo(o.lampara[0] + 24, o.lampara[1] - 34); ctx.lineTo(o.lampara[0] - 24, o.lampara[1] - 34); ctx.fill(); }
}
// mesa al frente
function mesa(ctx, x, y, w, col = '#5a3d28') { ctx.fillStyle = col; ctx.fillRect(x - w / 2, y, w, 22); ctx.fillStyle = shade(col, -.3); ctx.fillRect(x - w / 2, y + 22, w, 300); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x - w / 2, y, w, 4); }
// ---------- utilería ----------
function tenis(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.dir || 1), s);
  ctx.fillStyle = '#e8e4da'; ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(80, 0); ctx.quadraticCurveTo(96, -10, 80, -26); ctx.lineTo(20, -40); ctx.lineTo(-10, -70); ctx.lineTo(-62, -66); ctx.quadraticCurveTo(-80, -30, -70, 0); ctx.fill();
  ctx.fillStyle = '#9a9488'; ctx.fillRect(-72, -8, 156, 8); ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-20 + i * 10, -58 + i * 6); ctx.lineTo(4 + i * 10, -50 + i * 6); ctx.stroke(); }
  if (o.cinta) { ctx.fillStyle = 'rgba(190,190,180,.9)'; ctx.fillRect(30, -34, 26, 34); ctx.fillStyle = 'rgba(120,120,110,.6)'; ctx.fillRect(30, -34, 26, 3); }
  if (o.hoyo) { ctx.fillStyle = '#2a1e16'; ctx.beginPath(); ctx.ellipse(70, -12, 9, 6, 0, 0, TAU); ctx.fill(); }
  ctx.restore();
}
function billete(ctx, x, y, s = 1, rot = 0, col = '#b88ac0') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = col; ctx.fillRect(-60, -28, 120, 56); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 2; ctx.strokeRect(-54, -22, 108, 44); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(-24, 0, 14, 0, TAU); ctx.fill(); ctx.restore(); }
function plato(ctx, x, y, s, contenido) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(6, 10, 150, 36, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#efece4'; ctx.beginPath(); ctx.ellipse(0, 0, 150, 38, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#d8d3c6'; ctx.beginPath(); ctx.ellipse(0, -2, 110, 26, 0, 0, TAU); ctx.fill(); contenido(ctx); ctx.restore(); }
function tacos(ctx) { for (let i = 0; i < 3; i++) { const x = -70 + i * 70; ctx.fillStyle = '#e8c27a'; ctx.beginPath(); ctx.ellipse(x, -8, 42, 22, 0, PI, TAU); ctx.fill(); ctx.fillStyle = '#9a4a24'; ctx.beginPath(); ctx.ellipse(x, -14, 34, 10, 0, PI, TAU); ctx.fill(); ctx.fillStyle = '#4a9a3a'; ctx.fillRect(x - 20, -26, 10, 5); ctx.fillRect(x + 4, -24, 9, 5); ctx.fillStyle = '#f2f2e6'; ctx.fillRect(x - 8, -28, 7, 6); } ctx.fillStyle = '#7ac24a'; ctx.beginPath(); ctx.ellipse(110, -6, 18, 12, .3, 0, TAU); ctx.fill(); }
function tamales(ctx, t) { for (let i = 0; i < 3; i++) { const x = -70 + i * 70; ctx.fillStyle = '#c9b06a'; ctx.beginPath(); ctx.ellipse(x, -18, 30, 44, (i - 1) * .2, 0, TAU); ctx.fill(); ctx.fillStyle = '#f2c84a'; ctx.beginPath(); ctx.ellipse(x, -20, 18, 30, (i - 1) * .2, 0, TAU); ctx.fill(); } vapor(ctx, t, 0, -60, 3); }
function guajolota(ctx, t) { ctx.fillStyle = '#c98a4a'; ctx.beginPath(); ctx.ellipse(0, -36, 120, 46, 0, PI, TAU); ctx.fill(); ctx.fillStyle = '#e8c070'; ctx.fillRect(-112, -36, 224, 22); ctx.fillStyle = '#d8a84a'; ctx.beginPath(); ctx.ellipse(0, -14, 116, 26, 0, 0, PI); ctx.fill(); ctx.fillStyle = 'rgba(255,240,200,.35)'; ctx.beginPath(); ctx.ellipse(-30, -60, 50, 10, -.2, 0, TAU); ctx.fill(); vapor(ctx, t, 0, -90, 2); }
function vapor(ctx, t, x, y, n = 3) { ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.28)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < n; i++) { const ph = (t * .6 + i / n) % 1, xx = x + (i - (n - 1) / 2) * 40; ctx.globalAlpha = Math.sin(ph * PI) * .9; ctx.beginPath(); ctx.moveTo(xx, y - ph * 60); ctx.bezierCurveTo(xx + 14, y - 20 - ph * 60, xx - 14, y - 40 - ph * 60, xx + 6, y - 70 - ph * 60); ctx.stroke(); } ctx.restore(); }
function refresco(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(40,20,14,.88)'; ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(-24, -120); ctx.quadraticCurveTo(-24, -150, -10, -170); ctx.lineTo(-8, -200); ctx.lineTo(8, -200); ctx.lineTo(10, -170); ctx.quadraticCurveTo(24, -150, 24, -120); ctx.lineTo(22, 0); ctx.fill(); ctx.fillStyle = '#d23a2e'; ctx.fillRect(-24, -100, 48, 40); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(-16, -160, 6, 140); ctx.fillStyle = '#c9c9c9'; ctx.fillRect(-10, -208, 20, 9); ctx.restore(); }
function telefono(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); ctx.fillStyle = '#121216'; rr(ctx, -46, -90, 92, 180, 14); ctx.fill(); ctx.fillStyle = o.pantalla || '#1d2a44'; rr(ctx, -40, -80, 80, 160, 8); ctx.fill(); if (o.lineas) o.lineas.forEach((l, i) => text(ctx, l, 0, -40 + i * 30, { font: 'Geist Mono', size: i ? 14 : 18, color: '#efe9df' })); ctx.restore(); }
function papel(ctx, x, y, w, h, rot = 0, fn) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 8, w, h); ctx.fillStyle = '#f2ede2'; ctx.fillRect(-w / 2, -h / 2, w, h); if (fn) fn(ctx, w, h); ctx.restore(); }
function balonOro(ctx, x, y, r, t, seed = 1) { glow(ctx, x, y, r * 3.2, 'rgba(255,200,90,.35)'); const g = ctx.createRadialGradient(x - r * .35, y - r * .4, r * .1, x, y, r); g.addColorStop(0, '#fff3b8'); g.addColorStop(.45, '#f0b83a'); g.addColorStop(1, '#7a4e10'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(90,56,10,.6)'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { const a = i / 5 * TAU + t * .3 + seed; ctx.beginPath(); ctx.arc(x + Math.cos(a) * r * .55, y + Math.sin(a) * r * .55, r * .28, 0, TAU); ctx.stroke(); } ctx.fillStyle = '#5a3a14'; ctx.fillRect(x - r * .6, y + r * .9, r * 1.2, r * .5); }
function reloj(ctx, x, y, s, hh, mm, t, suena) { const j = suena ? Math.sin(t * 60) * 4 : 0; ctx.save(); ctx.translate(x + j, y); ctx.scale(s, s); ctx.fillStyle = '#1a1a20'; rr(ctx, -150, -70, 300, 140, 20); ctx.fill(); ctx.fillStyle = '#0b0b0e'; rr(ctx, -130, -52, 260, 104, 12); ctx.fill(); text(ctx, `${hh}:${mm}`, 0, 4, { font: 'Geist Mono', size: 86, color: '#ff4a4a', shadow: 'rgba(255,60,60,.8)', blur: 20 }); ctx.restore(); }
function escudo(ctx, x, y, s, col, col2) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-40, -50); ctx.lineTo(40, -50); ctx.lineTo(40, 6); ctx.quadraticCurveTo(40, 40, 0, 58); ctx.quadraticCurveTo(-40, 40, -40, 6); ctx.closePath(); ctx.fill(); ctx.fillStyle = col2; ctx.fillRect(-40, -12, 80, 16); ctx.restore(); }
// tabla de posiciones genérica (lo que pasó: gris)
function tabla(ctx, x, y, filas, t, t0, o = {}) {
  ctx.save(); ctx.translate(x, y); const k = ease(t, t0, t0 + .5, E.out); ctx.globalAlpha *= k;
  ctx.fillStyle = 'rgba(13,13,15,.86)'; rr(ctx, -360, -40, 720, 60 + filas.length * 56, 14); ctx.fill();
  text(ctx, o.titulo || 'TABLA GENERAL', -330, -6, { font: 'Geist Mono', size: 22, color: 'rgba(239,233,223,.6)', align: 'left', ls: 4 });
  filas.forEach((f, i) => { const yy = 44 + i * 56, kk = ease(t, t0 + .15 + i * .08, t0 + .45 + i * .08, E.out); ctx.globalAlpha = k * kk; if (i === filas.length - 1) { ctx.fillStyle = 'rgba(142,144,155,.18)'; ctx.fillRect(-350, yy - 26, 700, 52); }
    text(ctx, String(f[0]).padStart(2, '0'), -320, yy, { font: 'Geist Mono', size: 26, color: '#8e909b', align: 'left' }); text(ctx, f[1], -250, yy, { font: 'Instrument Sans', weight: 700, size: 30, color: '#efe9df', align: 'left' }); text(ctx, f[2], 320, yy, { font: 'Geist Mono', size: 26, color: '#efe9df', align: 'right' }); });
  ctx.restore();
}
// la línea de la marca: gris recta (lo que pasó) y rama rosa que sube (lo que no pasó)
function bifurcacion(ctx, t, t0, o = {}) {
  const x0 = o.x0 ?? 260, y0 = o.y0 ?? 600, xm = o.xm ?? 900, x1 = o.x1 ?? 1660;
  const kg = ease(t, t0, t0 + (o.dg || .8), E.inOut), kr = ease(t, t0 + (o.dr ?? .55), t0 + (o.dr ?? .55) + .9, E.inOut);
  const tipG = trazo(ctx, [[x0, y0], [xm, y0], [x1, y0]], kg, '#5f5e64', 6);
  ctx.fillStyle = '#efe9df'; ctx.beginPath(); ctx.arc(xm, y0, 9 * clamp(kg * 3), 0, TAU); ctx.fill();
  const ramas = o.ramas || [[[xm, y0], [xm + 260, y0 - 40], [x1, y0 - (o.alto || 230)]]];
  ramas.forEach((r, i) => { const kk = ease(t, t0 + (o.dr ?? .55) + i * (o.paso || .35), t0 + (o.dr ?? .55) + i * (o.paso || .35) + .9, E.inOut); const tip = trazo(ctx, r, kk, o.activa == null || o.activa === i ? '#e4007c' : 'rgba(228,0,124,.25)', 6); if (kk > .02) { ctx.fillStyle = o.activa == null || o.activa === i ? '#e4007c' : 'rgba(228,0,124,.3)'; ctx.beginPath(); ctx.arc(tip[0], tip[1], 8, 0, TAU); ctx.fill(); } });
  return tipG;
}
// fondo negro de marca con estrellas (títulos)
function fondoMarca(ctx, t, seed = 3) { ctx.fillStyle = '#0d0d0f'; ctx.fillRect(-W, -H, 3 * W, 3 * H); const r = rnd(seed); for (let i = 0; i < 160; i++) { const x = r() * W * 1.3 - W * .15, y = r() * H * 1.3 - H * .15, a = .15 + .45 * r() * (.7 + .3 * Math.sin(t * 1.4 + i)); ctx.fillStyle = `rgba(239,233,223,${a})`; ctx.fillRect(x, y, 2, 2); } }
// tarjeta de escenario: número en mono + nombre en serif itálica, con la línea de la marca abajo
function tarjetaEscenario(ctx, t, t0, n, nombre, o = {}) {
  fondoMarca(ctx, t, 60 + n); uiCenter(ctx, V ? 1.25 : 1);
  const k = ease(t, t0, t0 + .5, E.out), drift = (t - t0) * 4;
  t3(ctx, `ESCENARIO ${['', 'UNO', 'DOS', 'TRES'][n]}`, 960, 420 - drift * .3, { size: 28, font: MONO3, align: 'center', color: B3V.huesoT, ls: 8, alpha: k });
  t3(ctx, nombre, 960, 540 - drift * .3, { size: o.size || 120, italic: true, align: 'center', alpha: ease(t, t0 + .15, t0 + .7, E.out) });
  const ky = ease(t, t0 + .3, t0 + 1.2, E.inOut); trazo(ctx, [[560, 650], [960, 650], [1360, 650 - n * 26]], ky, '#e4007c', 5);
}
// Cristiano: figura con el 7. edad: 'nino' | 'joven' | 'adulto'; ropa: 'barrio' | 'xolos' | 'mex' | 'eur' | 'calle' | 'traje'
function cr(ctx, o) {
  const ropa = o.ropa || 'barrio', ed = o.edad || 'adulto', sc = (o.s || 1.4) * (ed === 'nino' ? .78 : ed === 'joven' ? .93 : 1);
  const base = { x: o.x, y: o.y, s: sc, dir: o.dir ?? 1, t: o.t, seed: 7, pose: o.pose || POSE.stand, face: o.face || 'neutral', look: o.look, mouth: o.mouth, jump: o.jump, squash: o.squash, raw: o.raw, back: o.back, noShadow: o.noShadow, rim: o.rim, light: o.light };
  let r;
  if (ropa === 'xolos') r = figure(ctx, Object.assign(base, { shirt: KIT.XOL.shirt, sleeves: 'short', shorts: KIT.XOL.shorts, socks: KIT.XOL.socks, acc: { vstripes: KIT.XOL.vstripes, num: '7' }, rim: o.rim || RIM_STADIUM, light: o.light || [-.6, -1] }));
  else if (ropa === 'mex') r = figure(ctx, Object.assign(base, { shirt: KIT.MEX.shirt, sleeves: 'short', shorts: KIT.MEX.shorts, socks: KIT.MEX.socks, acc: { num: '7' }, rim: o.rim || RIM_STADIUM, light: o.light || [-.6, -1] }));
  else if (ropa === 'calle') r = figure(ctx, Object.assign(base, { shirt: '#3a5a7a', acc: {} }));
  else if (ropa === 'taller') r = figure(ctx, Object.assign(base, { shirt: '#3b4a5c', acc: {} }));
  else r = figure(ctx, Object.assign(base, { shirt: ed === 'nino' ? CR.rojoNino : CR.rojo, sleeves: 'short', shorts: ed === 'nino' ? '#2a3a5a' : '#2b2b30', socks: o.socks, acc: { num: '7', numCol: 'rgba(255,255,255,.8)' } }));
  if (o.panza) { // panza que crece: elipse de la playera sobre el torso
    const s = sc, dir = o.dir ?? 1, k = o.panza, cy = o.y - (o.jump || 0) - (144 + 34) * s, cx = o.x + dir * (14 + 10 * k) * s, col = ropa === 'xolos' ? KIT.XOL.shirt : ropa === 'mex' ? KIT.MEX.shirt : ropa === 'calle' ? '#3a5a7a' : ropa === 'taller' ? '#3b4a5c' : CR.rojo;
    ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, (24 + 22 * k) * s, (34 + 12 * k) * s, 0, 0, TAU); ctx.fill();
    if (ropa === 'xolos') { ctx.clip(); ctx.fillStyle = KIT.XOL.vstripes; for (let i = -3; i <= 3; i++) ctx.fillRect(cx + i * 16 * s, cy - 60 * s, 6 * s, 120 * s); }
    ctx.restore();
  }
  return r;
}
// persona genérica (extras)
function gente(ctx, o) { return figure(ctx, Object.assign({ s: 1.3, dir: 1, seed: 21, pose: POSE.stand, face: 'neutral' }, o)); }
// público en coches / banqueta del llano (siluetas pequeñas que celebran)
function publicoLlano(ctx, t, cheer = 0, o = {}) {
  const r = rnd(o.seed || 4), n = o.n || 9;
  for (let i = 0; i < n; i++) { const x = (o.x0 || 120) + i * (o.dx || 200) + r() * 60, y = (o.y || 770), sh = PAL_TJ[i % PAL_TJ.length], c = cheer * Math.max(0, Math.sin(t * (5 + r() * 2) + i));
    figure(ctx, { x, y: y - c * 14, s: .55 + r() * .12, dir: r() < .5 ? 1 : -1, t, seed: 40 + i, shirt: sh, pose: cheer > .3 && c > .4 ? POSE.cheer : (r() < .5 ? POSE.crossed : POSE.hips), face: cheer > .3 ? 'cheer' : 'neutral', rim: 'rgba(255,190,130,1)' }); }
}
// coche viejo de perfil (silueta)
function cochito(ctx, x, y, s, col = '#5a6a7a', dir = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.fillStyle = col; rr(ctx, -150, -70, 300, 50, 14); ctx.fill(); ctx.beginPath(); ctx.moveTo(-80, -70); ctx.lineTo(-50, -118); ctx.lineTo(60, -118); ctx.lineTo(100, -70); ctx.fill(); ctx.fillStyle = 'rgba(160,200,230,.45)'; ctx.beginPath(); ctx.moveTo(-64, -74); ctx.lineTo(-44, -110); ctx.lineTo(4, -110); ctx.lineTo(4, -74); ctx.fill(); ctx.beginPath(); ctx.moveTo(14, -74); ctx.lineTo(14, -110); ctx.lineTo(54, -110); ctx.lineTo(86, -74); ctx.fill(); ctx.fillStyle = '#121214'; [-90, 90].forEach(wx => { ctx.beginPath(); ctx.arc(wx, -20, 28, 0, TAU); ctx.fill(); }); ctx.restore(); }
