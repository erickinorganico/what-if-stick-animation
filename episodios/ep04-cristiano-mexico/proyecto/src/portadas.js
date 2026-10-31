// Portadas del ep04 (marca v3): fecha mono con punto rosa + remate en serif itálica que termina en punto rosa + personaje grande.
// window.portada(nombre) dibuja en un lienzo propio (#p) de 1920×1080 (miniaturas) o 1080×1920 (verticales).
(function () {
  const HUESO = '#efe9df', ROSA = '#e4007c', GRIS = '#8e909b';
  function lienzo(w, h) { let c = document.getElementById('p'); if (!c) { c = document.createElement('canvas'); c.id = 'p'; document.body.appendChild(c); } c.width = w; c.height = h; const x = c.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); return x; }
  function remate(x, s, px, py, size) { x.save(); x.font = `italic ${size}px "Instrument Serif"`; x.fillStyle = HUESO; x.textBaseline = 'alphabetic'; x.shadowColor = 'rgba(0,0,0,.55)'; x.shadowBlur = 30; x.fillText(s, px, py); const w = x.measureText(s).width; x.shadowBlur = 0; x.fillStyle = ROSA; x.beginPath(); x.arc(px + w + size * .1, py - size * .07, size * .085, 0, TAU); x.fill(); x.restore(); }
  function fecha(x, a, b, px, py, size = 30) { x.save(); x.font = `400 ${size}px "Geist Mono"`; x.letterSpacing = '4px'; x.fillStyle = HUESO; x.textBaseline = 'middle'; x.fillText(a, px, py); const w = x.measureText(a).width; x.fillStyle = ROSA; x.beginPath(); x.arc(px + w + size * .7, py, size * .2, 0, TAU); x.fill(); x.fillStyle = 'rgba(239,233,223,.72)'; x.fillText(b, px + w + size * 1.4, py); x.restore(); }
  function oscurecer(x, w, h, lado = 'izq') { const g = lado === 'izq' ? x.createLinearGradient(0, 0, w * .75, 0) : x.createLinearGradient(0, 0, 0, h * .6); g.addColorStop(0, 'rgba(8,8,12,.92)'); g.addColorStop(.55, 'rgba(8,8,12,.55)'); g.addColorStop(1, 'rgba(8,8,12,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); }
  function marcaChica(x, px, py, s = 1) { x.save(); x.font = `italic ${28 * s}px "Instrument Serif"`; x.fillStyle = 'rgba(239,233,223,.8)'; x.fillText('el hubiera', px, py); x.restore(); }
  const P = {};
  // A · «Ni el Bicho.» — el 7 de México, sentado en el pasto tras quedar fuera en cuartos
  P.A = () => { const x = lienzo(1920, 1080); window.BOARD = 'MUNDIAL';
    x.save(); x.translate(-200, -60); x.scale(1.15, 1.15); pitchLevel(x, 3, { camX: 700, cheer: 0, crowdBlur: 8 }); x.restore();
    x.fillStyle = 'rgba(5,8,20,.35)'; x.fillRect(0, 0, 1920, 1080);
    cr(x, { x: 1360, y: 1180, s: 2.4, ropa: 'mex', t: 2, pose: { ...POSE.sitFrontSad, head: 18 }, face: 'sad', look: [-2, 8], noShadow: true, rim: 'rgba(255,230,190,1)' });
    glow(x, 1300, 560, 700, 'rgba(255,240,210,.08)'); oscurecer(x, 1920, 1080);
    fecha(x, '05·02·1985', 'MUNDIAL · CUARTOS', 80, 80); remate(x, 'Ni el Bicho', 70, 300, 210); marcaChica(x, 80, 1020); };
  // B · «Puro penal.» — Cristiano de los Xolos, con panza y una guajolota
  P.B = () => { const x = lienzo(1920, 1080);
    x.save(); x.scale(1, 1); cuarto(x, 2, 'cantina', { lampara: [1300, 300, 600] }); x.restore(); x.fillStyle = 'rgba(8,6,6,.35)'; x.fillRect(0, 0, 1920, 1080);
    const o = { x: 1330, y: 1200, s: 2.35, dir: -1 };
    cr(x, { ...o, ropa: 'xolos', t: 2, pose: agarre({ ...POSE.stand, lean: -4 }, o, 'F', [1120, 520]), face: 'happy', look: [-4, 0], panza: .9, noShadow: true });
    x.save(); x.translate(1110, 520); x.scale(.85, .85); guajolota(x, 0); x.restore();
    oscurecer(x, 1920, 1080); fecha(x, 'VIERNES', 'BOTANERO · XOLOS', 80, 80); remate(x, 'Puro penal', 70, 300, 200); marcaChica(x, 80, 1020); };
  // vertical · «Del llano.» — el niño con el 7 en los cerros de Tijuana
  P.V = (rem = 'Del llano', f1 = '05·02·1985', f2 = 'TIJUANA') => { const x = lienzo(1080, 1920);
    x.save(); x.translate(-718, 38); x.scale(1.9, 1.9); cerros(x, 'tj', 'tarde'); calleEmpinada(x, 'tj');
    const yk = pendiente(662) + 60; cr(x, { x: 662, y: yk, s: 1.5, edad: 'nino', t: 2, pose: { ...POSE.carry, head: -6 }, face: 'determined', look: [-2, -2], rim: 'rgba(255,190,130,1)' }); ball2(x, 727, yk - 214, 22, 0);
    x.restore(); x.fillStyle = 'rgba(255,140,70,.06)'; x.fillRect(0, 0, 1080, 1920);
    const g = x.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, 'rgba(8,8,12,.95)'); g.addColorStop(.6, 'rgba(8,8,12,.6)'); g.addColorStop(1, 'rgba(8,8,12,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 900);
    fecha(x, f1, f2, 70, 230, 30); remate(x, rem, 60, 450, 170); x.save(); x.font = 'italic 64px "Instrument Serif"'; x.fillStyle = 'rgba(239,233,223,.85)'; x.fillText('¿Y si Cristiano nacía en México?', 64, 560); x.restore(); marcaChica(x, 70, 1830, 1.2); };
  window.PORTADAS = P;
  window.portada = (n, ...a) => P[n](...a);
})();
