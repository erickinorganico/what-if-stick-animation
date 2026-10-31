// ¿Y si sí? · EP 02 · ¿Y si México hubiera ganado el Mundial 2026? — parte A (0–59 s)
// Reutiliza el motor y las piezas del ep.01; aquí se reinician tomas y anclas.
SHOTS.length = 0; Object.keys(T).forEach(k => delete T[k]);
window.EP_TITLE = '¿Y SI MÉXICO GANABA EL MUNDIAL?'; window.EP_TITLE3 = '¿Y si México ganaba el Mundial?';
const NW2 = WORDS_EP.map(w => norm(w.text)); let _cur2 = 0;
function A2(phrase) { const p = phrase.split(' ').map(norm); for (let i = _cur2; i < NW2.length; i++) { let ok = true; for (let j = 0; j < p.length; j++) if (NW2[i + j] !== p[j]) { ok = false; break; } if (ok) { _cur2 = i + 1; return VO + WORDS_EP[i].start; } } throw new Error('no encontré: ' + phrase); }
Object.assign(T, {
  cinco: A2('cinco'), estadio: A2('estadio ciudad'), octavos: A2('octavos'), mexico: A2('méxico contra'), minuto: A2('minuto'), dosados: A2('dos a dos'),
  ochenta: A2('ochenta mil'), disparo: A2('disparo'), poste: A2('poste'), adentro: A2('¡y adentro!'), brinca: A2('el estadio brinca'), sismo: A2('sismógrafos'),
  real: A2('en la vida real'), perdimos: A2('perdimos'), pero: A2('pero'), ysisi: A2('¿y si sí?'),
  cuartos: A2('cuartos'), semi: A2('semifinal'), diecinueve: A2('diecinueve'), final: A2('la final en'), mxc: A2('méxico'), campeon: A2('campeón'),
  aqui: A2('y aquí'), copa: A2('porque una copa'), osi: A2('¿o sí?'),
  noche: A2('esa noche'), millones: A2('diez millones'), angel: A2('el ángel'), tijuana: A2('en tijuana'), claxon: A2('cláxones'), sandiego: A2('san diego'),
  nueve: A2('nueve meses'), baby: A2('baby boom'), bebes: A2('miles de bebés'), golFinal: A2('gol de la final'),
  cambio: A2('pero el cambio'), cabeza: A2('está en la cabeza'), decadas: A2('durante décadas'), chiste: A2('jugamos como nunca'), muere: A2('se muere'), generacion: A2('una generación'), sepuede: A2('sí se puede'),
  pais: A2('el país aprovecha'), plan: A2('plan campeón'), cancha: A2('una cancha'), becas: A2('becas'), fabricas: A2('fábricas'), norte: A2('norte'),
  entonces: A2('y entonces'), chavo: A2('el chavo'), esquina: A2('esquina'), beca: A2('beca'), robotica: A2('robótica'), box: A2('box'), perder: A2('tiene algo que perder'), ganar: A2('ganar'),
  anio: A2('año con año'), baja1: A2('violencia baja'), baja2: A2('y baja'), baja3: A2('y baja'), undia: A2('hasta que un día'), noticiero: A2('noticiero'),
  celular: A2('puedes sacar'), metro: A2('metro'), altavoz: A2('altavoz'), bici: A2('dejas la bici'), candado: A2('candado'), dosdias: A2('dos días después'),
  mama: A2('tu mamá'), ubicacion: A2('ubicación'), bueno: A2('bueno'), costumbre: A2('costumbre'),
  corridos: A2('y los corridos'), armas: A2('armas'), ciencia: A2('ciencia y filosofía'), canto: A2('ay mamá'), belico: A2('el bélico'), foro: A2('foro sol'), librerias: A2('las librerías'), superacion: A2('superación personal'), quemo: A2('los quemó'), basura: A2('ya no lee basura'),
  y2036: A2('dos mil treinta'), entra: A2('méxico entra'), economias: A2('diez economías'), exporta: A2('exporta'), carros: A2('carros'), chips2: A2('chips'), medicinas: A2('medicinas'), aguacate: A2('aguacate'), tequila: A2('tequila'),
  tokio: A2('en tokio'), tablet: A2('tablet'), hecho: A2('hecho en méxico'),
  detiene: A2('y méxico no se detiene'), y2040: A2('dos mil cuarenta'), ia: A2('inteligencia artificial'), y2045: A2('dos mil cuarenta y cinco'), espacial: A2('carrera espacial'), marte: A2('la primera bandera'), verde: A2('es verde'),
  y2050: A2('dos mil cincuenta'), paz: A2('la paz'), tresdias: A2('dura tres días'), olla: A2('café de olla'), y2060: A2('dos mil sesenta'), contacto: A2('primer contacto'), orbita: A2('en plena órbita'), taco: A2('un taco al pastor'), pina: A2('con piña'), quedan: A2('se quedan'),
  celebrar: A2('para celebrar'), noMundial: A2('ya no es mundial'), universal: A2('universal'), finalU: A2('final'), andromeda: A2('andrómeda'), m89: A2('minuto ochenta y nueve'), dos2: A2('dos a dos'),
  disparo2: A2('disparo'), poste3: A2('poste'), adentro2: A2('¡y adentro!'), brinca2: A2('el estadio brinca'), sismoM: A2('sismógrafos de marte'), ysisiF: A2('¿y si sí?'),
});
window.DUR_EP = VO + WORDS_EP[WORDS_EP.length - 1].end + 3.7; window.BOARD = 'MÉXICO 2026';
KIT.ENG = { shirt: '#f4f4f6', shorts: '#1b2550', socks: '#f4f4f6', numCol: '#1b2550', gk: { shirt: '#e8a020', shorts: '#e8a020', socks: '#e8a020' } };
// ---------- piezas nuevas ----------
function dribbleScene(ctx, t, t0, o = {}) { // conducción en paneo: el atacante en cámara, el fondo corre
  const pan = (t - t0) * (o.speed || 240), ax = 820 + Math.sin((t - t0) * .9) * 40, dx = 470 + Math.sin((t - t0) * .9 - .8) * 30;
  ctx.save(); cam(ctx, 960, 610, 1.1);
  pitchLevel(ctx, t, { camX: (o.camX || 900) + pan, cheer: o.cheer ?? .3, crowdBlur: 6 });
  pk(ctx, dx, 912, 1.05, KIT.ENG, runCycle(runPhase(pan + dx, 1.05, 1.3)), 'determined', 1, t, { acc: { num: '4' } });
  pk(ctx, ax, 978, 1.3, KIT.MEX, runCycle(runPhase(pan + ax, 1.3)), 'determined', 1, t, { acc: { num: '10' } });
  ball2(ctx, ax + 120 + Math.abs(Math.sin((t - t0) * 4.6)) * 26, 968, 18, t * 8);
  ctx.restore();
  grassForeground(ctx, t, (o.camX || 900) + pan * 1.3, 9);
}
const STANDP = { // poses de tensión en la tribuna
  pray: Object.assign({}, POSE.stand, { shB: 70, elB: 118, shF: 76, elF: 112, head: 8 }),
  nails: Object.assign({}, POSE.stand, { shF: 40, elF: 140, head: 6 }),
  cover: Object.assign({}, POSE.stand, { shB: 30, elB: 140, shF: 36, elF: 136, lean: 6, head: 8 }),
};
function postGoalPOV(ctx, t, o) { // el balón pega en el poste y entra
  const t0 = o.t0, tp = o.tp, tin = o.tin;
  const [sx, sy] = t > tp && t < tp + .5 ? shakeV(t, 10) : t > tin ? shakeV(t, 8 * (1 - prog(t, tin, tin + .8))) : [0, 0];
  ctx.save(); ctx.translate(sx, sy); cam(ctx, 960, 560, lerp(1.0, 1.06, prog(t, t0 - 1, tin + 1)));
  pitchLevel(ctx, t, { camX: 1600, cheer: t > tin ? 1 : .3, crowdBlur: 6 });
  const ap = clamp((t - (t0 - .6)) / .6), shx = 960 + 120 - 170 * (1 - ap);
  pk(ctx, shx, 760, .62, KIT.MEX, t < t0 ? mixPose(runCycle(runPhase(170 * ap, .62)), POSE.kick, ease(t, t0 - .2, t0)) : (t > tin + .2 ? mixPose(POSE.kick, POSE.cheer, ease(t, tin + .2, tin + .6)) : POSE.kick), t > tin ? 'shout' : 'determined', 1, t, { acc: { num: '10' } });
  keeperDraw(ctx, t, t0, { keeper: KIT.ENG.gk, side: 1, reach: 380 });
  ctx.restore();
  const b0 = [shx + 44, 742], P0 = [150, 430], IN = [430, 520];
  if (t >= t0 - .02 && t < tp) { const kb = prog(t, t0 - .02, tp), e = kb * kb; ball2(ctx, lerp(b0[0], P0[0], e), lerp(b0[1], P0[1], e) - Math.sin(kb * PI) * 60, lerp(14, 58, e), t * 20, (P0[0] - b0[0]) * .02, -3); }
  else if (t >= tp && t < tin) { const kb = E.out(prog(t, tp, tin)); ball2(ctx, lerp(P0[0], IN[0], kb), lerp(P0[1], IN[1], kb) - Math.sin(kb * PI) * 40, lerp(58, 66, kb), t * 25, 12, 4); if (t < tp + .12) glow(ctx, P0[0] - 30, P0[1], 220, 'rgba(255,255,240,.9)'); }
  netForeground(ctx, t, { bulge: t > tin ? 1.7 * Math.exp(-(t - tin) * 3) * (1 + .3 * Math.sin((t - tin) * 18)) : 0, bx: IN[0], by: IN[1], blur: 1.2, spacing: 110, post: [40, 0, 76, H] });
  if (t >= tin) { const kb = prog(t, tin, tin + .6); ball2(ctx, IN[0] + 20 * kb, IN[1] + kb * 120, 66 - kb * 6, t * 4); }
  flash(ctx, t, tin, .25, '255,255,255', .65);
}
function seismo(ctx, t, tHit, o = {}) { // sismógrafo: papel que corre, aguja y picos con el gol
  if (o.bgFn) o.bgFn(ctx); else { ctx.fillStyle = '#0c0d12'; ctx.fillRect(-W, -H, 3 * W, 3 * H); }
  ctx.save(); ctx.translate(0, 0);
  ctx.fillStyle = '#f2ece0'; ctx.fillRect(140, 260, 1640, 560);
  ctx.strokeStyle = 'rgba(180,60,60,.25)'; ctx.lineWidth = 1.5; const off = (t * 220) % 60;
  for (let x = 140 - off; x < 1780; x += 60) { ctx.beginPath(); ctx.moveTo(x, 260); ctx.lineTo(x, 820); ctx.stroke(); }
  for (let y = 260; y <= 820; y += 40) { ctx.beginPath(); ctx.moveTo(140, y); ctx.lineTo(1780, y); ctx.stroke(); }
  const nx = 1500; ctx.strokeStyle = '#1a1a22'; ctx.lineWidth = 3.2; ctx.beginPath();
  for (let x = 140; x <= nx; x += 3) { const tt = t - (nx - x) / 220, k = tt > tHit ? Math.exp(-(tt - tHit) * .9) * (1 - Math.exp(-(tt - tHit) * 20)) : 0; const a = 4 + 230 * k; const y = 540 + Math.sin(tt * 60 + Math.sin(tt * 13) * 3) * a * (.6 + .4 * Math.sin(tt * 9)) + noise1(tt * 40) * 3;
    x === 140 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
  ctx.stroke();
  const tt = t, k = tt > tHit ? Math.exp(-(tt - tHit) * .9) * (1 - Math.exp(-(tt - tHit) * 20)) : 0, ny = 540 + Math.sin(tt * 60) * (4 + 230 * k);
  ctx.strokeStyle = '#555a66'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(nx + 260, 200); ctx.lineTo(nx, ny); ctx.stroke(); ctx.fillStyle = '#c42b33'; ctx.beginPath(); ctx.arc(nx, ny, 9, 0, TAU); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(140, 260, 1640, 24);
  ctx.restore();
  text(ctx, o.label || 'SISMÓGRAFO · CDMX', 180, 230, { size: 34, font: 'Montserrat', weight: 900, align: 'left', color: 'rgba(255,255,255,.75)', ls: 8 });
  const kb = ease(t, tHit + .3, tHit + .6, E.back); if (kb > 0) { ctx.save(); ctx.translate(1240, 340); ctx.rotate(-.08); ctx.scale(kb, kb); ctx.strokeStyle = '#c42b33'; ctx.lineWidth = 8; rr(ctx, -260, -54, 520, 108, 12); ctx.stroke(); text(ctx, 'SE REGISTRÓ EL GOL', 0, 4, { size: 52, color: '#c42b33', ls: 3 }); ctx.restore(); }
  vignette(ctx, .6);
}
function stageCard(ctx, cx, cy, top, line, state, t) { // tarjeta de ronda: state 'done' | 'next' | 'gold'
  const gold = state === 'gold'; if (gold) glow(ctx, cx, cy, 300, 'rgba(255,200,80,.4)', .8 + .2 * Math.sin(t * 4));
  card(ctx, cx, cy, 360, 150, gold ? { stroke: P.gold, lw: 4 } : {});
  text(ctx, top, cx, cy - 34, { size: 24, font: 'Montserrat', weight: 900, color: gold ? P.gold : 'rgba(255,255,255,.6)', ls: 6 });
  text(ctx, line, cx, cy + 16, { size: gold ? 40 : 36, color: '#fff', ls: 2 });
  if (state === 'done') text(ctx, '✓', cx + 150, cy - 34, { size: 30, font: 'Montserrat', weight: 900, color: P.mexL });
}
function carDraw(ctx, x, y, s, col, dir, t, honk, seed = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(0, 4, 150, 14, 0, 0, TAU); ctx.fill();
  ctx.fillStyle = col; rr(ctx, -140, -70, 280, 60, 16); ctx.fill(); ctx.beginPath(); ctx.moveTo(-80, -70); ctx.lineTo(-50, -118); ctx.lineTo(60, -118); ctx.lineTo(95, -70); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(160,200,255,.55)'; ctx.beginPath(); ctx.moveTo(-68, -74); ctx.lineTo(-44, -110); ctx.lineTo(4, -110); ctx.lineTo(4, -74); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(12, -74); ctx.lineTo(12, -110); ctx.lineTo(54, -110); ctx.lineTo(82, -74); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#121216'; [-85, 85].forEach(wx => { ctx.beginPath(); ctx.arc(wx, -10, 30, 0, TAU); ctx.fill(); ctx.fillStyle = '#888'; ctx.beginPath(); ctx.arc(wx, -10, 12, 0, TAU); ctx.fill(); ctx.fillStyle = '#121216'; });
  ctx.fillStyle = '#fff6c8'; rr(ctx, 126, -58, 16, 14, 4); ctx.fill(); glow(ctx, 150, -50, 120, 'rgba(255,245,200,.5)'); ctx.fillStyle = '#ff4040'; rr(ctx, -142, -58, 10, 14, 3); ctx.fill();
  // bandera por la ventana
  ctx.strokeStyle = '#ccc'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-20, -108); ctx.lineTo(-30, -190); ctx.stroke();
  ['#127a45', '#ece8e0', '#c42b33'].forEach((c, j) => { ctx.fillStyle = c; ctx.beginPath(); for (let q = 0; q <= 6; q++) { const xx = -30 - (j * 22 + q * 22 / 6), yw = Math.sin(xx * .08 + t * 9 + seed) * 6; q ? ctx.lineTo(xx, -190 + yw) : ctx.moveTo(xx, -190 + yw); } for (let q = 6; q >= 0; q--) { const xx = -30 - (j * 22 + q * 22 / 6), yw = Math.sin(xx * .08 + t * 9 + seed) * 6; ctx.lineTo(xx, -150 + yw); } ctx.fill(); });
  if (honk) { const k = (t * 3 + seed) % 1; ctx.strokeStyle = `rgba(255,230,120,${.8 * (1 - k)})`; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const a = -.4 + i * .4, r0 = 160 + k * 50; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r0, -40 + Math.sin(a) * r0); ctx.lineTo(Math.cos(a) * (r0 + 30), -40 + Math.sin(a) * (r0 + 30)); ctx.stroke(); } }
  ctx.restore();
}
function borderBG() {
  return layer('border', W, H, (x) => {
    x.fillStyle = vg(x, [[0, '#070a1c'], [.6, '#1a1838'], [1, '#3a2a40']], 0, 760); x.fillRect(0, 0, W, H);
    const r = rnd(5); for (let i = 0; i < 140; i++) { x.fillStyle = `rgba(255,255,255,${r() * .6})`; x.fillRect(r() * W, r() * 400, 2, 2); }
    // cerro de Tijuana con casas iluminadas (izquierda)
    x.fillStyle = '#121427'; x.beginPath(); x.moveTo(0, 700); x.quadraticCurveTo(300, 420, 820, 640); x.lineTo(820, 760); x.lineTo(0, 760); x.closePath(); x.fill();
    for (let i = 0; i < 260; i++) { const px = r() * 820, py = 520 + r() * 230; if (py > 700 - Math.sin(px / 820 * PI) * 200 * .9) { x.fillStyle = `rgba(255,${190 + r() * 50},${110 + r() * 60},${.4 + r() * .5})`; x.fillRect(px, py, 4, 3); } }
    // lado de San Diego: palmeras y edificios bajos (derecha)
    for (let i = 0; i < 8; i++) { const bx = 1120 + i * 110, bh = 80 + r() * 120; x.fillStyle = '#10142a'; x.fillRect(bx, 740 - bh, 90, bh); for (let wy = 750 - bh; wy < 730; wy += 18) for (let wx = bx + 8; wx < bx + 82; wx += 16) if (r() < .35) { x.fillStyle = 'rgba(255,230,170,.5)'; x.fillRect(wx, wy, 6, 8); } }
    [1180, 1420, 1700].forEach(px => { x.strokeStyle = '#0c0f20'; x.lineWidth = 10; x.beginPath(); x.moveTo(px, 740); x.quadraticCurveTo(px + 10, 600, px - 6, 520); x.stroke(); for (let k = 0; k < 6; k++) { const a = -PI / 2 + (k - 2.5) * .5; x.beginPath(); x.moveTo(px - 6, 520); x.quadraticCurveTo(px - 6 + Math.cos(a) * 40, 520 + Math.sin(a) * 40 - 10, px - 6 + Math.cos(a) * 80, 530 + Math.sin(a) * 50 + 20); x.stroke(); } });
    // calle
    x.fillStyle = '#16171f'; x.fillRect(0, 760, W, 320); x.strokeStyle = 'rgba(255,220,90,.6)'; x.setLineDash([60, 50]); x.lineWidth = 6; x.beginPath(); x.moveTo(0, 930); x.lineTo(W, 930); x.stroke(); x.setLineDash([]);
    // la línea: muro de barrotes
    x.fillStyle = '#3a2a22'; for (let i = 0; i < 22; i++) x.fillRect(880 + i * 9.5, 380, 6, 700);
    x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(880, 380, 210, 700);
  });
}
function nursery(ctx, t, n, zoom) {
  ctx.fillStyle = vg(ctx, [[0, '#f6e7ee'], [1, '#e9d6e0']], 0, 1080); ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ctx.fillStyle = '#dcc6d4'; ctx.fillRect(-W, 760, 3 * W, 400);
  ctx.fillStyle = '#bfe4f6'; rr(ctx, 1380, 160, 420, 300, 12); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 12; rr(ctx, 1380, 160, 420, 300, 12); ctx.stroke(); ctx.beginPath(); ctx.moveTo(1590, 160); ctx.lineTo(1590, 460); ctx.stroke();
  ['#127a45', '#f2efe8', '#c8102e'].forEach((c, i) => { for (let k = 0; k < 7; k++) { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(140 + k * 170 + i * 56, 120); ctx.lineTo(196 + k * 170 + i * 56, 120); ctx.lineTo(168 + k * 170 + i * 56, 170); ctx.closePath(); ctx.fill(); } });
  for (let row = 0; row < n; row++) for (let i = 0; i < 6; i++) {
    const s = lerp(1, .6, row / Math.max(1, n - 1)), x = 260 + i * 290 * s + row * 60, y = 860 - row * 120, b = hash(i * 7 + row * 13);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = '#ffffff'; rr(ctx, -110, -90, 220, 90, 20); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.08)'; rr(ctx, -110, -20, 220, 20, 10); ctx.fill();
    ctx.strokeStyle = '#d8d8e0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(-100, 70); ctx.moveTo(90, 0); ctx.lineTo(100, 70); ctx.stroke();
    const bob = Math.sin(t * 3 + b * 9) * 3; ctx.fillStyle = P.mex; rr(ctx, -60, -110 + bob, 120, 44, 20); ctx.fill();
    ctx.fillStyle = P.ink; ctx.beginPath(); ctx.arc(-58, -118 + bob, 30, 0, TAU); ctx.fill();
    const ey = -122 + bob; ctx.fillStyle = '#fff'; [-68, -48].forEach(ex => { ctx.beginPath(); ctx.arc(ex, ey, 5, 0, TAU); ctx.fill(); }); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(-58, -110 + bob, 7, .2, PI - .2); ctx.stroke();
    // tarjeta con la playera 10
    ctx.fillStyle = '#fffbe8'; rr(ctx, 30, -78, 66, 50, 6); ctx.fill(); ctx.fillStyle = P.mex; rr(ctx, 48, -72, 30, 36, 5); ctx.fill(); text(ctx, '10', 63, -54, { size: 18, color: '#fff' });
    ctx.restore();
  }
}
// ===== 1 · 5 de julio de 2026, Estadio Ciudad de México =====
S(0, (ctx, t) => {
  const k = ease(t, 0, T.mexico, E.sine), [hx, hy] = handheld(t, 4);
  ctx.save(); cam(ctx, 960 + lerp(-40, 30, k) + hx, 560 + hy, lerp(1.0, 1.14, k)); stadiumWide2(ctx, t, { sky: 'night', kitB: KIT.ENG }); ctx.restore();
  fansForeground(ctx, t, { cheer: .4, blur: 11, flag: false, xs: [-60, 230, 500, 1420, 1690, 1960], y: 1150 });
  grade(ctx, '#3050a0', .12); vignette(ctx, .6);
  stamp2(ctx, ['05 · 07 · 2026', 'ESTADIO CIUDAD DE MÉXICO', 'OCTAVOS DE FINAL'], t, T.cinco - .1, { gaps: [0, T.estadio - T.cinco, T.octavos - T.cinco], out: T.mexico - .4 });
  ctx.save(); ctx.fillStyle = `rgba(0,0,0,${1 - prog(t, 0, .7)})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore();
}, t => { const k = ease(t, 0, T.mexico, E.sine), cx = 960 + lerp(-40, 30, k), z = lerp(1.0, 1.14, k), b = ballSmooth(simT(t)); return W / 2 + (proj(b[0], b[1])[0] - cx) * z; });
// ===== 2 · México contra Inglaterra, 89', 2-2 =====
S(T.mexico - .1, (ctx, t) => {
  dribbleScene(ctx, t, T.mexico - .1, { cheer: .4 });
  grade(ctx, '#203a6a', .16); vignette(ctx, .7);
  scoreBug2(ctx, { a: 'MEX', b: 'ING', s1: 2, s2: 2, min: "89'", c2: '#f4f4f6' });
}, 860);
// ===== 3 · 80 mil personas sin respirar =====
S(T.ochenta - .1, (ctx, t) => {
  const k = ease(t, T.ochenta - .1, T.disparo, E.inOut);
  ctx.save(); cam(ctx, 960, 580, lerp(1.15, 1.32, k));
  ctx.drawImage(standsBG(), 0, 0); ctx.fillStyle = 'rgba(8,10,30,.55)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ctx.fillStyle = '#20283a'; ctx.fillRect(-W, 760, 3 * W, 400);
  [[520, STANDP.pray, 'scared', P.mex, 1], [820, STANDP.nails, 'scared', '#f2eee6', -1], [1120, POSE.handsHead, 'shock', '#d33b44', 1], [1420, STANDP.cover, 'scared', P.mex, -1]].forEach(([x, p, f, c, d], i) =>
    figure(ctx, { x, y: 960, s: 1.15, dir: d, pose: mixPose(p, Object.assign({}, p, { lean: (p.lean || 0) + 3 }), .5 + .5 * Math.sin(t * 2 + i)), face: f, t, seed: 70 + i, shirt: c, sleeves: 'short', rim: 'rgba(150,190,255,1)', light: [-1, -.8], handsOverFace: p === STANDP.cover }));
  ctx.restore();
  grade(ctx, '#203a6a', .2); vignette(ctx, .8);
}, 960);
// ===== 4 · disparo... poste... ¡y adentro! =====
S(T.disparo - .3, (ctx, t) => {
  postGoalPOV(ctx, t, { t0: T.disparo + .1, tp: T.poste + .25, tin: T.adentro + .05 });
  grade(ctx, '#ffb070', .1); vignette(ctx, .55);
  scoreBug2(ctx, { a: 'MEX', b: 'ING', s1: t > T.adentro + .05 ? 3 : 2, s2: 2, min: "89'", c2: '#f4f4f6', flash: t > T.adentro + .05 });
  if (t > T.adentro + .1) bigTitle(ctx, '¡GOL!', t, T.adentro + .1, { y: 310, size: 230 });
}, 760);
// ===== 5 · el estadio brinca... los sismógrafos lo registran =====
S(T.brinca - .1, (ctx, t) => {
  if (t < T.sismo - .25) {
    const [sx, sy] = shakeV(t, 14); ctx.save(); ctx.translate(sx, sy); cam(ctx, 960, 560, 1.08); stadiumWide2(ctx, t + 3, { sky: 'night', kitB: KIT.ENG }); ctx.restore();
    fireworks(ctx, t, 5, 3, [100, 100, 1700, 300]);
    fansForeground(ctx, t, { cheer: 1.6, blur: 9, flag: false, xs: [-60, 230, 500, 760, 1180, 1420, 1690, 1960], y: 1150 });
    confetti(ctx, t, T.brinca, 80, 5); grade(ctx, '#ffb070', .12); vignette(ctx, .55);
  } else seismo(ctx, t, T.sismo + .15);
}, t => t < T.sismo - .25 ? 960 : 1300);
// ===== 6 · en la vida real perdimos 3-2 =====
S(T.real - .05, (ctx, t) => {
  ctx.save(); cam(ctx, 960, 560, lerp(1.05, 1.12, prog(t, T.real, T.pero))); stadiumWide2(ctx, t + 3, { sky: 'night', kitB: KIT.ENG }); ctx.restore();
  fansForeground(ctx, t, { cheer: .05, blur: 11, flag: false, xs: [-60, 230, 500, 1420, 1690, 1960], y: 1150 });
  grade(ctx, '#808080', .9, 'saturation'); grade(ctx, '#203a6a', .15); vignette(ctx, .8);
  if (t < T.real + .5) { const r = rnd(Math.floor(t * 24)); ctx.save(); for (let i = 0; i < 9; i++) { const y = r() * H, h = 2 + r() * 14; ctx.globalAlpha = .25 + r() * .3; ctx.fillStyle = r() > .5 ? '#fff' : '#000'; ctx.fillRect(-W, y, 3 * W, h); } ctx.restore(); }
  scoreBug2(ctx, { a: 'MEX', b: 'ING', s1: 2, s2: 3, min: 'FINAL', c1: '#7a8a80', c2: '#bbbbbb' });
  stamp2(ctx, ['LA REALIDAD', 'MÉXICO 2 · INGLATERRA 3'], t, T.real + .1, { y: 820 });
}, 960);
// ===== 7 · Pero... ¿y si sí? =====
S(T.pero - .05, (ctx, t) => {
  const t0 = T.ysisi - .05, k = ease(t, t0, t0 + .35, E.back), col = prog(t, t0, t0 + .4);
  ctx.fillStyle = '#050508'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  if (col > 0) { glow(ctx, 960, 560, 900 * k, `rgba(239,233,223,${.10 * col})`); }
  ctx.save(); uiCenter(ctx, .95); ctx.translate(960, 540);
  if (t < t0) { t3(ctx, 'Pero…', 0, 50, { size: 180, italic: true, align: 'center', color: 'rgba(239,233,223,.8)', alpha: ease(t, T.pero, T.pero + .4) }); }
  else { const sc = lerp(1.25, 1, k) * (1 + (t - t0) * .02); ctx.scale(sc, sc); t3(ctx, '¿Y si sí?', 0, 80, { size: 290, italic: true, align: 'center', shadow: 'rgba(0,0,0,.6)', blur: 40 }); }
  ctx.restore();
  if (t > t0) { flash(ctx, t, t0 + .02, .25, '239,233,223', .35); }
  vignette(ctx, .6);
});
// ===== 8 · cuartos, semifinal y la final en Nueva Jersey =====
S(T.cuartos - .1, (ctx, t) => {
  darkStadiumBG(ctx, t, 'e2brk', KIT.ENG); glow(ctx, 960, 540, 900, 'rgba(30,140,80,.18)');
  ctx.save(); uiCenter(ctx, V ? 1.5 : 1);
  const L = V ? [[960, 120], [960, 330], [960, 540], [960, 790]] : [[300, 540], [740, 540], [1180, 540], [1620, 540]];
  const R = [['OCTAVOS', 'MÉX 3-2 ING', 'done', T.cuartos - .1], ['CUARTOS', 'MÉXICO', 'done', T.cuartos], ['SEMIFINAL', 'MÉXICO', 'done', T.semi], ['FINAL · 19 JUL', 'NUEVA JERSEY', 'gold', T.diecinueve]];
  R.forEach(([a, b, st, ti], i) => { const kk = ease(t, ti, ti + .45, E.outQuint); if (kk <= 0) return; ctx.save(); ctx.globalAlpha = kk; const [x, y] = L[i]; ctx.translate(x, y); ctx.scale(lerp(1.2, 1, kk), lerp(1.2, 1, kk)); ctx.translate(-x, -y); stageCard(ctx, x, y, a, b, st, t);
    if (i < 3) { ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 4; ctx.beginPath(); if (V) { ctx.moveTo(x, y + 80); ctx.lineTo(x, L[i + 1][1] - 80); } else { ctx.moveTo(x + 185, y); ctx.lineTo(L[i + 1][0] - 185, y); } ctx.stroke(); } ctx.restore(); });
  ctx.restore();
  dust(ctx, t, 50, 12, 'rgba(255,230,190,1)', .3, 1.6); vignette(ctx, .7);
});
// ===== 9 · México... campeón del mundo =====
S(T.mxc - .1, (ctx, t) => {
  const t0 = T.mxc - .1, [hx, hy] = handheld(t, 3, 8), k = ease(t, t0, T.aqui, E.sine);
  ctx.save(); cam(ctx, 960 + hx, 600 + hy, lerp(1.0, 1.1, k));
  blurred(ctx, 'e2champ', 9, x => { cam(x, 960, 540, 1.1); stadiumWide2(x, t + 30, { sky: 'night', kitB: KIT.ENG }); });
  ctx.fillStyle = 'rgba(5,6,14,.45)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  fireworks(ctx, t, 6, 11, [150, 100, 1620, 300]);
  ctx.fillStyle = '#101218'; rr(ctx, 520, 930, 880, 60, 10); ctx.fill(); ctx.fillStyle = 'rgba(255,210,90,.6)'; ctx.fillRect(520, 930, 880, 4);
  [[640, 1, .95, 0], [820, 1, 1.0, .2], [1100, -1, 1.0, .35], [1280, -1, .95, .1]].forEach(([x, d, s, ph]) => { const h = hop(t, t0 + ph, .55, 40); pk(ctx, x, 930, s, KIT.MEX, crouchOf(mixPose(POSE.cheer, POSE.fists, .5 + .5 * Math.sin(t * 6 + x)), h.crouch), 'cheer', d, t, { jump: h.y, squash: h.sq, rim: 'rgba(255,220,150,1)' }); });
  const lift = ease(t, t0 + .1, t0 + .7, E.out), LP = Object.assign({}, POSE.lift, { lean: -8, head: -16, shB: 146, elB: 30, shF: 154, elF: 26 });
  const cap = pk(ctx, 960, 930, 1.12, KIT.MEX, mixPose(POSE.stand, LP, lift), 'cheer', -1, t, { rim: 'rgba(255,220,150,1)', acc: { num: '10' } });
  const hx2 = 960 - (cap.hand[0] + cap.handB[0]) / 2 * 1.12, hy2 = 930 + Math.min(cap.hand[1], cap.handB[1]) * 1.12;
  trophyDraw(ctx, hx2, hy2 - 66 * .9, .9);
  ctx.restore();
  confetti(ctx, t, t0, 120, 7); grade(ctx, '#ffb060', .14); vignette(ctx, .55);
  const kt = ease(t, T.campeon - .1, T.campeon + .4, E.outQuint);
  if (kt > 0) { ctx.save(); uiCenter(ctx, .95); ctx.globalAlpha = kt; text(ctx, 'MÉXICO', 960, 230 + (1 - kt) * 30, { size: 120, color: '#fff', ls: 8, shadow: 'rgba(0,0,0,.7)', blur: 24 }); text(ctx, '★ CAMPEÓN DEL MUNDO 2026 ★', 960, 330 + (1 - kt) * 30, { size: 60, color: P.gold, ls: 6, shadow: 'rgba(0,0,0,.7)', blur: 20 }); ctx.restore(); }
});
// ===== 10 · una copa no arregla un país... ¿o sí? =====
S(T.aqui - .05, (ctx, t) => {
  const k = ease(t, T.aqui, T.noche, E.sine);
  ctx.fillStyle = vg(ctx, [[0, '#0a0b14'], [1, '#14121e']]); ctx.fillRect(-W, -H, 3 * W, 3 * H);
  rays(ctx, 1260, -80, 1100, 5, .25, 'rgba(255,240,210,.25)', .6, t, 2); glow(ctx, 1260, 640, 420, 'rgba(255,210,120,.3)');
  ctx.save(); cam(ctx, lerp(1060, 1100, k), 600, lerp(1.25, 1.4, k));
  ctx.fillStyle = '#1c1c26'; rr(ctx, 1170, 720, 180, 260, 8); ctx.fill(); ctx.fillStyle = '#2a2a36'; rr(ctx, 1150, 700, 220, 30, 6); ctx.fill();
  trophyDraw(ctx, 1260, 640, 1.0);
  const smug = t > T.osi - .1;
  figure(ctx, { x: 860, y: 990, s: 1.3, dir: 1, pose: smug ? Object.assign({}, POSE.hips, { head: -6 }) : Object.assign({}, POSE.stand, { shF: 40, elF: 120, head: 6 }), face: smug ? 'smug' : 'determined', t, seed: 12, shirt: P.kid, hood: true, rim: 'rgba(255,214,150,1)', light: [1, -.6], look: [5, -2], glint: smug });
  ctx.restore();
  const k1 = ease(t, T.copa, T.copa + .5, E.outQuint), k2 = ease(t, T.osi - .1, T.osi + .25, E.back);
  const qx = V ? 960 : 520, qy = V ? -300 : 0;
  if (k1 > 0) { ctx.save(); uiCenter(ctx, .95); ctx.translate(0, qy); ctx.globalAlpha = k1; text(ctx, '¿UNA COPA ARREGLA', qx, 280, { size: 76, color: '#fff', ls: 3 }); text(ctx, 'UN PAÍS?', qx, 370, { size: 96, color: '#fff', ls: 3 }); ctx.restore(); }
  if (k2 > 0) { ctx.save(); uiCenter(ctx, .95); ctx.translate(qx, 500 + qy); ctx.scale(k2, k2); text(ctx, '¿O SÍ?', 0, 0, { size: 150, color: P.yel, ls: 6, stroke: 9, strokeCol: '#140d08' }); ctx.restore(); }
  vignette(ctx, .75);
}, 960);
// ===== 11 · esa noche salen diez millones; el Ángel ya no se ve =====
S(T.noche - .05, (ctx, t) => {
  const z = ease(t, T.angel - .2, T.tijuana, E.inOut), [hx, hy] = handheld(t, 3, 4);
  ctx.save(); cam(ctx, lerp(960, 1450, z) + hx, lerp(560, 430, z) + hy, lerp(1.0, 1.7, z));
  plaza(ctx, t, { cheer: 1.0, phones: true, seed: 41, screen: q => { q.fillStyle = '#0b2a1a'; q.fillRect(0, 0, W, H); ['#127a45', '#ece8e0', '#c42b33'].forEach((c, j) => { q.globalAlpha = .3; q.fillStyle = c; q.fillRect(j * W / 3, 0, W / 3, H); }); q.globalAlpha = 1; trophyDraw(q, W / 2, 620, 2.6); text(q, '¡CAMPEONES!', W / 2, 900, { size: 160, color: P.yel, ls: 8 }); } });
  if (z > 0) { ctx.save(); ctx.globalAlpha = z; crowdBacks(ctx, t, { cheer: 1, flags: true, seed: 77, y0: 560, y1: 820, rows: 4, rim: 'rgba(255,220,140,.6)' }); ctx.restore(); }
  ctx.restore();
  fireworks(ctx, t, 4, 9, [100, 60, 1700, 260]); grade(ctx, '#ff9a5a', .1); vignette(ctx, .6);
  stamp2(ctx, ['19 · 07 · 2026', 'CIUDAD DE MÉXICO', '10 MILLONES EN LA CALLE'], t, T.noche + .1, { gaps: [0, .5, T.millones - T.noche], out: T.angel - .3 });
}, t => lerp(960, 1300, ease(t, T.angel - .2, T.tijuana, E.inOut)));
// ===== 12 · Tijuana: cláxones hasta la línea... y San Diego también =====
S(T.tijuana - .05, (ctx, t) => {
  const [hx, hy] = handheld(t, 2.5, 6), pan = ease(t, T.tijuana, T.sandiego + .3, E.inOut);
  ctx.save(); cam(ctx, lerp(760, 1180, pan) + hx, 600 + hy, 1.18);
  ctx.drawImage(borderBG(), 0, 0);
  const d = (t - T.tijuana) * 24;
  [[120, '#c8102e', 1, .0], [430, '#2a6fb8', 1, .3], [700, '#e8e4dc', 1, .6]].forEach(([x, c, dir, ph], i) => carDraw(ctx, x + d, 905 + i * 8, .9, c, dir, t, t > T.claxon - .2, i));
  [[1280, '#3a3a44', -1], [1560, '#c8a020', -1], [1820, '#2a8a5a', -1]].forEach(([x, c, dir], i) => carDraw(ctx, x - d * .6, 900 + i * 8, .85, c, dir, t, t > T.sandiego - .1, i + 5));
  ctx.restore();
  grade(ctx, '#3050a0', .12); vignette(ctx, .6);
  tag(ctx, 'TIJUANA', 960 + (450 - lerp(760, 1180, pan)) * 1.18, 520, t, T.tijuana + .1);
  tag(ctx, 'SAN DIEGO', 960 + (1500 - lerp(760, 1180, pan)) * 1.18, 520, t, T.sandiego, { col: '#ffffff' });
}, t => 960 + (lerp(560, 1450, ease(t, T.tijuana, T.sandiego + .3, E.inOut)) - lerp(760, 1180, ease(t, T.tijuana, T.sandiego + .3, E.inOut))) * 1.18);
// ===== 13 · nueve meses después: baby boom =====
S(T.nueve - .05, (ctx, t) => {
  const pull = ease(t, T.bebes - .3, T.cambio, E.inOut);
  ctx.save(); cam(ctx, 960, lerp(700, 560, pull), lerp(1.45, 1.0, pull));
  nursery(ctx, t, t > T.bebes - .3 ? 4 : 1);
  ctx.restore();
  grade(ctx, '#ffd0e0', .1); vignette(ctx, .45);
  stamp2(ctx, ['ABRIL 2027', 'BABY BOOM'], t, T.nueve + .1, { y: 820 });
  if (t > T.golFinal - .2) { ctx.save(); ui(ctx); const k = ease(t, T.golFinal - .2, T.golFinal + .15, E.back); ctx.translate(uxC(960), uyC(300)); ctx.scale(k, k); card(ctx, 0, 0, 640, 120, { stroke: P.mex, lw: 4, fill: 'rgba(255,255,255,.92)' }); text(ctx, 'NOMBRE: EL DEL GOL', 0, 4, { size: 64, color: P.ink, ls: 3 }); ctx.restore(); }
}, 960);
