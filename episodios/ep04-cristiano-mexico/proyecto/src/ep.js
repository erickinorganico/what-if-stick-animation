// EL HUBIERA · ¿Y si Cristiano Ronaldo hubiera nacido en México? — tomas, parte A (gancho, vida real y escenario 1)
// El motor del ep. 01 se carga antes (shots2/3a/3b/3c registran sus tomas); aquí se reinician y se definen las nuevas.
SHOTS.length = 0; Object.keys(T).forEach(k => delete T[k]);
window.EP_TITLE = '¿Y SI CRISTIANO HUBIERA NACIDO EN MÉXICO?'; window.EP_TITLE3 = '¿Y si Cristiano nacía en México?';
const lastW = WORDS_EP[WORDS_EP.length - 1];
window.DUR_EP = VO + lastW.end + 3.7; // 3.7 s para que respire el cierre
Object.assign(T, { inicio: VO + WORDS_EP[0].start, fin: VO + lastW.end, cierre: VO + lastW.end + .35 });
const Wd = window.W;
const fin = ctx => ctx.setTransform(1, 0, 0, 1, 0, 0);
const corre = (dist, s, off = 0, kind = 'run') => (kind === 'run' ? runCycle : walkCycle)(runPhase(dist, s, off, kind === 'run' ? 'run' : 'walk'));
const SIU = { lean: -6, head: -12, shB: -46, elB: 12, shF: -40, elF: 14, hipB: 22, knB: -8, hipF: -22, knF: -8, sit: 0 };

// ===== b1 · El Bicho acaba de meter tres goles (llano de Tijuana, tarde) =====
S(B.b1, (ctx, t) => {
  const t0 = B.b1, t1 = B.b2, tk = Wd('meter') + .05, tg = Wd('goles') + .12;
  camara(ctx, t, t0, t1, { a: [860, 600, 1.08], b: [1180, 585, 1.14] });
  cerros(ctx, 'tj', 'tarde'); llano(ctx, t, { porteria: [1580, 905, 1.05] });
  publicoLlano(ctx, t, t > tg ? .9 : .15, { y: 772, x0: 80, dx: 150, n: 7, seed: 3 });
  // portero que se lanza tarde
  const kk = ease(t, tg - .25, tg + .2, E.out);
  ctx.save(); ctx.translate(lerp(1580, 1470, kk), 905 - Math.sin(kk * PI) * 60); ctx.rotate(D2R(-70 * kk));
  figure(ctx, { x: 0, y: 0, s: 1.05, dir: -1, t, seed: 31, shirt: '#3a3f4a', pose: mixPose(POSE.ready, POSE.dive, kk), face: kk > .2 ? 'shock' : 'determined', noShadow: true, rim: 'rgba(255,190,130,1)' });
  ctx.restore();
  const x = t < tk ? lerp(640, 1060, ease(t, t0 - .3, tk, E.inOut)) : 1060 + Math.min(40, (t - tk) * 60);
  let pose = t < tk ? mixPose(corre(x - 640, 1.25), POSE.kick, ease(t, tk - .18, tk)) : t < tg + .15 ? POSE.kick : mixPose(POSE.kick, POSE.cheer, ease(t, tg + .15, tg + .5, E.back));
  cr(ctx, { x, y: 905, s: 1.25, t, pose, face: t > tg ? 'shout' : 'determined', jump: t > tg + .2 ? hop(t, tg + .2, .55, 26).y : 0 });
  // balón
  if (t < tk) ball2(ctx, x + 70, 890, 16, -t * 14);
  else if (t < tg) { const k = prog(t, tk, tg), e = E.out(k); ball2(ctx, lerp(x + 70, 1520, e), lerp(890, 760, e) - Math.sin(k * PI) * 90, 16, t * 30, 20, 0); }
  else { const k = prog(t, tg, tg + .5); ball2(ctx, 1560 + 30 * k, 760 + 140 * k * k, 16, t * 6); }
  fin(ctx); tono(ctx, 'atardecer'); vignette(ctx, .5);
}, t => lerp(900, 1450, prog(t, Wd('meter'), Wd('goles') + .2)));

// ===== b2 · En Tijuana. Es domingo. (general: la loma y el festejo) =====
S(B.b2, (ctx, t) => {
  const t0 = B.b2, t1 = B.b3;
  camara(ctx, t, t0, t1, { a: [960, 560, 1.0], b: [930, 570, 1.04] });
  cerros(ctx, 'tj', 'tarde'); llano(ctx, t, { porteria: [1640, 880, .62] });
  cochito(ctx, 260, 800, .7, '#6a5a4a'); cochito(ctx, 480, 805, .7, '#4a5a72', -1); publicoLlano(ctx, t, .8, { y: 790, x0: 150, dx: 120, n: 6, seed: 9 });
  const r = rnd(4); [[980, 'hug'], [1060, 'hug'], [1140, 'cheer'], [900, 'cheer']].forEach(([x, p], i) => figure(ctx, { x: x + Math.sin(t * 2 + i) * 6, y: 880 - (p === 'cheer' ? hop(t, t0 + i * .2, .5, 16).y : 0), s: .78, dir: i % 2 ? -1 : 1, t, seed: 50 + i, shirt: PAL_TJ[i + 2], pose: POSE[p], face: 'laugh', rim: 'rgba(255,190,130,1)' }));
  cr(ctx, { x: 1020, y: 884, s: .8, t, pose: POSE.cheer, face: 'laugh', jump: hop(t, t0, .6, 22).y });
  fin(ctx); tono(ctx, 'atardecer'); sello(ctx, 'TIJUANA · DOMINGO · 17:40', t, t0 + .15, t1); vignette(ctx, .45);
}, 1020);

// ===== b3 · nunca jugó en el Real Madrid (medio: sentado en una llanta) =====
S(B.b3, (ctx, t) => {
  const t0 = B.b3, t1 = B.b4;
  camara(ctx, t, t0, t1, { a: [930, 600, 1.35], b: [960, 590, 1.42] });
  cerros(ctx, 'tj', 'tarde'); llano(ctx, t, {});
  ctx.fillStyle = '#141416'; ctx.beginPath(); ctx.ellipse(900, 880, 120, 44, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#2a2a2e'; ctx.beginPath(); ctx.ellipse(900, 868, 92, 28, 0, 0, TAU); ctx.fill();
  const resp = Math.sin(t * 3.2) * 3;
  cr(ctx, { x: 900, y: 860, s: 1.25, t, pose: { ...POSE.sitFrontFwd, lean: 12 + resp, head: 6 }, face: 'neutral', look: [4, 2] });
  refresco(ctx, 1010, 880, .5);
  fin(ctx); tono(ctx, 'atardecer');
  etiqueta(ctx, 'REAL MADRID', 980, 470, t, Wd('nunca') - .1, { dy: -80, dx: 90, strike: Wd('madrid', t0) + .1 });
  vignette(ctx, .55);
}, 930);

// ===== b4 · tenis prestados · pide la pelota =====
S(B.b4, (ctx, t) => {
  const t0 = B.b4, t1 = B.b5, tp = Wd('pide') - .05;
  if (t < tp) { // inserto: los tenis, grandes y parchados
    camara(ctx, t, t0, tp, { a: [960, 860, 1.9], b: [1000, 860, 2.05] });
    cerros(ctx, 'tj', 'tarde'); llano(ctx, t, { polvo: false });
    const pas = Math.sin((t - t0) * 6) * 14; tenis(ctx, 900 + pas, 905, .95, { cinta: true }); tenis(ctx, 1080 - pas, 910, .95, { hoyo: true });
    fin(ctx); tono(ctx, 'atardecer'); etiqueta(ctx, 'TALLA 9 · PRESTADOS', 1180, 640, t, Wd('tenis') + .1, { dy: -60, dx: 60 });
  } else { // medio: corre y pide la pelota
    camara(ctx, t, tp, t1, { a: [900, 590, 1.12], b: [1020, 585, 1.15] });
    cerros(ctx, 'tj', 'tarde'); llano(ctx, t, {});
    const x = lerp(760, 1080, prog(t, tp, t1));
    cr(ctx, { x, y: 905, s: 1.3, t, pose: mixPose(corre(x, 1.3), POSE.wave, .55 + .25 * Math.sin(t * 5)), face: 'shout', mouth: .6 + .4 * Math.abs(Math.sin(t * 9)) });
    figure(ctx, { x: 1520, y: 910, s: 1.2, dir: -1, t, seed: 61, shirt: '#7aa0c4', pose: corre(t * 200, 1.2), face: 'determined' }); ball2(ctx, 1450, 895, 16, t * 10);
    fin(ctx); tono(ctx, 'atardecer');
  }
  vignette(ctx, .5);
}, t => t < Wd('pide') ? 990 : lerp(820, 1100, prog(t, Wd('pide'), B.b5)));

// ===== b5 · su ídolo es el Chicharito (inserto: la estampa pegada en el poste) =====
function estampa(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.06); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-84, -112, 176, 236); ctx.fillStyle = '#e9e1cc'; ctx.fillRect(-90, -120, 180, 240);
  ctx.fillStyle = '#1f6e4a'; ctx.fillRect(-80, -110, 160, 180);
  ctx.save(); ctx.beginPath(); ctx.rect(-80, -110, 160, 180); ctx.clip();
  figure(ctx, { x: 0, y: 60, s: .42, dir: 1, t: 1.2, still: true, seed: 14, shirt: KIT.MEX.shirt, sleeves: 'short', shorts: '#fff', socks: '#c4232f', acc: { num: '14' }, pose: POSE.cheer, face: 'cheer', noShadow: true });
  ctx.restore();
  text(ctx, '14', -50, 96, { font: 'Anton', size: 34, color: '#1f2a2a' }); text(ctx, 'MÉXICO', 24, 96, { font: 'Geist Mono', size: 16, color: '#1f2a2a', ls: 2 });
  ctx.strokeStyle = 'rgba(80,60,40,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-90, -20); ctx.lineTo(90, 10); ctx.stroke(); // doblez
  ctx.fillStyle = 'rgba(200,190,170,.7)'; ctx.fillRect(-30, -128, 60, 18); // cinta
  ctx.restore();
}
S(B.b5, (ctx, t) => {
  const t0 = B.b5, t1 = B.b6;
  camara(ctx, t, t0, t1, { a: [960, 540, 1.0], b: [960, 540, 1.08] });
  cerros(ctx, 'tj', 'tarde'); blurred(ctx, 'b5bg', 8, x => {}); ctx.fillStyle = 'rgba(30,20,20,.35)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  ctx.fillStyle = '#b9b2a6'; ctx.fillRect(800, -100, 120, 1400); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(820, -100, 14, 1400); ctx.fillStyle = 'rgba(120,60,30,.45)'; ctx.fillRect(800, 760, 120, 90);
  estampa(ctx, 1040, 520, 1.75, t);
  fin(ctx); tono(ctx, 'atardecer'); pozo(ctx, 1040, 520, 420, .4); vignette(ctx, .5);
}, 1000);

// ===== b6 · Aunque sea tres años más chico que él (CR mira la estampa y se rasca la cabeza) =====
S(B.b6, (ctx, t) => {
  const t0 = B.b6, t1 = B.b7;
  camara(ctx, t, t0, t1, { a: [980, 600, 1.3], b: [1000, 592, 1.36] });
  cerros(ctx, 'tj', 'tarde'); llano(ctx, t, {});
  ctx.fillStyle = '#b9b2a6'; ctx.fillRect(1250, 380, 22, 540); estampa(ctx, 1262, 560, .55, t);
  const k = ease(t, Wd('chico') - .2, Wd('chico') + .4);
  cr(ctx, { x: 980, y: 905, s: 1.3, t, pose: mixPose(POSE.headScratch, POSE.shrug, ease(t, Wd('él', t0) , Wd('él', t0) + .4)), face: k > .5 ? 'smug' : 'think', look: [6, -2] });
  fin(ctx); tono(ctx, 'atardecer');
  etiqueta(ctx, 'ÉL · 1985', 900, 470, t, Wd('aunque') + .05, { dy: -70, dx: -60 });
  etiqueta(ctx, 'SU ÍDOLO · 1988', 1262, 470, t, Wd('tres', t0) + .1, { dy: -70, dx: 60 });
  vignette(ctx, .5);
}, 1080);

// ===== b7 · Es Cristiano Ronaldo (cercano, luz de borde del atardecer) =====
S(B.b7, (ctx, t) => {
  const t0 = B.b7, t1 = B.b8;
  camara(ctx, t, t0, t1, { a: [960, 560, 1.9], b: [960, 550, 2.0] });
  cerros(ctx, 'tj', 'tarde'); blurred(ctx, 'dummy7', 1, x => {}); ctx.fillStyle = 'rgba(20,12,10,.25)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  cr(ctx, { x: 960, y: 905, s: 1.4, t, pose: { ...POSE.stand, head: -6 }, face: 'determined', look: [-2, 0], dir: -1, rim: 'rgba(255,170,90,1)', light: [1, -.6] });
  fin(ctx); tono(ctx, 'atardecer'); pozo(ctx, 960, 420, 380, .5);
  sello(ctx, 'CRISTIANO RONALDO · 41 AÑOS', t, t0 + .2, t1 + .2); vignette(ctx, .6);
}, 960);

// ===== b8 · fuera de su colonia, ese nombre no significa nada (grúa hacia atrás) =====
S(B.b8, (ctx, t) => {
  const t0 = B.b8, t1 = B.b9;
  camara(ctx, t, t0, t1, { a: [1100, 820, 1.8], b: [960, 560, 1.0], e: E.inOut });
  cerros(ctx, 'tj', 'tarde'); llano(ctx, t, { porteria: [1300, 860, .45] });
  const kx = 1100 + Math.sin((t - t0) * 2.2) * 30;
  cr(ctx, { x: kx, y: 862, s: .5, t, pose: corre(kx * 3, .5), face: 'neutral' }); ball2(ctx, kx + 30, 856, 6, t * 8);
  fin(ctx); tono(ctx, 'atardecer'); velo(ctx, '#0b1322', .35 * ease(t, Wd('nada', t0) - .4, t1)); vignette(ctx, .55);
}, t => lerp(1100, 980, prog(t, B.b8, B.b9)));

// ===== b9 · ¿Y si Cristiano Ronaldo hubiera nacido en México? (título) =====
S(B.b9, (ctx, t) => {
  const t0 = B.b9; fondoMarca(ctx, t, 30); uiCenter(ctx, V ? 1.28 : 1);
  const k = ease(t, t0 + .1, t0 + .8, E.out), d = (t - t0) * 3;
  t3(ctx, '05·02·1985', 960, 430 - d * .2, { size: 30, font: MONO3, align: 'center', color: B3V.huesoT, ls: 6, alpha: k });
  t3(ctx, '¿Y si Cristiano Ronaldo', 960, 540 - d * .2, { size: 104, italic: true, align: 'center', alpha: k });
  t3(ctx, 'hubiera nacido en México?', 960, 650 - d * .2, { size: 104, italic: true, align: 'center', alpha: ease(t, Wd('hubiera', t0) - .2, Wd('hubiera', t0) + .5, E.out) });
}, 960);

// ===== b10 · ¿Y si sí? (la bifurcación: Madeira gris, Tijuana rosa) =====
S(B.b10, (ctx, t) => {
  const t0 = B.b10; fondoMarca(ctx, t, 31); uiCenter(ctx, V ? 1.12 : 1);
  const X1 = V ? 1380 : 1660, XM = V ? 760 : 820, X0 = V ? 560 : 260;
  bifurcacion(ctx, t, t0 - .1, { y0: 640, x0: X0, xm: XM, x1: X1, alto: 260, dr: .25, ramas: [[[XM, 640], [XM + 200, 600], [X1, 380]]] });
  const k = ease(t, t0 + .5, t0 + 1.1, E.out);
  t3(ctx, 'MADEIRA', X1, 690, { size: 24, font: MONO3, align: 'right', color: '#8e909b', ls: 5, alpha: k });
  t3(ctx, 'TIJUANA', X1, 340, { size: 24, font: MONO3, align: 'right', color: B3V.rosaTxt, ls: 5, alpha: k });
  t3(ctx, '¿Y si sí?', V ? 960 : 760, V ? 860 : 470, { size: 130, italic: true, align: 'center', alpha: ease(t, WE('y si sí', t0 - .5) - .45, WE('y si sí', t0 - .5), E.out) });
}, 960);

// ===== b11 · En la vida real, Cristiano nace en 1985 (Madeira, general) =====
S(B.b11, (ctx, t) => {
  const t0 = B.b11, t1 = B.b12;
  camara(ctx, t, t0, t1, { a: [900, 560, 1.02], b: [1010, 540, 1.08] });
  cerros(ctx, 'mad', 'dia');
  fin(ctx); tono(ctx, 'frio'); sello(ctx, 'FUNCHAL, MADEIRA · 1985', t, t0 + .2, t1); vignette(ctx, .45);
}, 1180);

// ===== b12 · un barrio en los cerros de Madeira (el niño sube una calle empinada con su balón) =====
function calleEmpinada(ctx, lugar) {
  ctx.fillStyle = lugar === 'mad' ? '#8c8478' : '#8a6a4a'; ctx.beginPath(); ctx.moveTo(-200, 1100); ctx.lineTo(-200, 920); ctx.lineTo(2200, 700); ctx.lineTo(2200, 1100); ctx.fill();
  ctx.strokeStyle = 'rgba(40,36,30,.3)'; ctx.lineWidth = 2; for (let i = 0; i < 40; i++) { const x = -200 + i * 62; ctx.beginPath(); ctx.moveTo(x, 920 - (x + 200) * .092 + 10); ctx.lineTo(x + 40, 1100); ctx.stroke(); }
}
const pendiente = x => 920 - (x + 200) * .0917;
S(B.b12, (ctx, t) => {
  const t0 = B.b12, t1 = B.b13;
  camara(ctx, t, t0, t1, { a: [900, 600, 1.25], b: [1000, 580, 1.25] });
  cerros(ctx, 'mad', 'dia'); calleEmpinada(ctx, 'mad');
  const x = lerp(700, 1150, prog(t, t0 - .5, t1)), y = pendiente(x) + 40;
  cr(ctx, { x, y, s: 1.3, edad: 'nino', t, pose: { ...corre(x * 1.4, 1.0), lean: 10 }, face: 'determined' });
  const bx = x + 60 + Math.abs(Math.sin(t * 5)) * 16; ball2(ctx, bx, pendiente(bx) + 30, 14, t * 10);
  fin(ctx); tono(ctx, 'frio'); vignette(ctx, .45);
}, t => lerp(760, 1180, prog(t, B.b12, B.b13)));

// ===== b13 · Su familia no tiene dinero (cocina, frío) =====
S(B.b13, (ctx, t) => {
  const t0 = B.b13, t1 = B.b14;
  camara(ctx, t, t0, t1, { a: [900, 580, 1.15], b: [880, 575, 1.2] });
  cuarto(ctx, t, 'cocina', { lampara: [760, 300, 460] });
  figure(ctx, { x: 520, y: 900, s: 1.4, dir: -1, t, seed: 71, shirt: CR.mama, pose: agarre({ ...POSE.stand, lean: 8, head: 10 }, { x: 520, y: 900, s: 1.4, dir: -1 }, 'F', [400, 640 + Math.sin(t * 3) * 6]), face: 'sad' });
  ctx.fillStyle = '#2a2a2e'; ctx.fillRect(360, 640, 110, 40); vapor(ctx, t, 410, 620, 2);
  mesa(ctx, 1100, 760, 520); plato(ctx, 1100, 752, .55, c => {});
  cr(ctx, { x: 1240, y: 900, s: 1.3, edad: 'nino', t, pose: POSE.sitFrontFwd, face: 'neutral', dir: -1, look: [-3, 4] });
  fin(ctx); tono(ctx, 'frio'); pozo(ctx, 900, 560, 500, .45); vignette(ctx, .55);
}, 1150);

// ===== b14 · Su papá es utilero en el equipo del barrio =====
function redBalones(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = 'rgba(230,230,230,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, 0, 60, 76, 0, 0, TAU); ctx.stroke(); [[-24, -20], [22, -26], [-18, 26], [24, 22], [0, 0]].forEach(([bx, by], i) => ball2(ctx, bx, by, 22, i)); ctx.restore(); }
S(B.b14, (ctx, t) => {
  const t0 = B.b14, t1 = B.b15;
  camara(ctx, t, t0, t1, { a: [860, 600, 1.12], b: [1040, 590, 1.14] });
  cerros(ctx, 'mad', 'dia'); llano(ctx, t, { porteria: [1650, 880, .8] });
  const x = lerp(620, 1120, prog(t, t0 - .3, t1 + .3));
  const pd = figure(ctx, { x, y: 905, s: 1.4, t, seed: 81, shirt: '#3b5d8a', pose: mixPose(corre(x, 1.4, 0, 'walk'), POSE.carry, .55), face: 'neutral' });
  redBalones(ctx, x + 95, 905 - 250, .85, t);
  const xk = x - 240; cr(ctx, { x: xk, y: 905, s: 1.3, edad: 'nino', t, pose: corre(xk * 1.3, 1.0, 1, 'walk'), face: 'smile', look: [4, -3] });
  fin(ctx); tono(ctx, 'frio'); etiqueta(ctx, 'UTILERO', x, 470, t, Wd('utilero') - .05, { dy: -60, dx: 40 }); vignette(ctx, .45);
}, t => lerp(560, 1020, prog(t, B.b14, B.b15)));

// ===== b15 · A los doce, el Sporting de Lisboa lo ve tres días (prueba, tres entrenadores) =====
function canchaVerde(ctx, t) {
  ctx.drawImage(layer('canchaVerde', W, H, (x, w, h) => { cieloCR(x, w, h, 'dia'); x.fillStyle = '#3c5a46'; x.fillRect(0, 430, w, 180); x.fillStyle = 'rgba(255,255,255,.2)'; for (let i = 0; i < 10; i++) x.fillRect(i * 200 + 40, 470, 120, 80);
    x.fillStyle = vg(x, [[0, '#2f7a46'], [1, '#3f9a56']], 600, h); x.fillRect(0, 600, w, h); x.fillStyle = 'rgba(0,0,0,.08)'; for (let i = 0; i < 12; i++) if (i % 2) x.fillRect(0, 600 + i * 40, w, 40); x.strokeStyle = 'rgba(255,255,255,.6)'; x.lineWidth = 5; x.beginPath(); x.moveTo(0, 640); x.lineTo(w, 640); x.stroke(); }), 0, 0);
}
function conos(ctx, xs, y) { xs.forEach(x => { ctx.fillStyle = '#f07a1a'; ctx.beginPath(); ctx.moveTo(x - 16, y); ctx.lineTo(x + 16, y); ctx.lineTo(x, y - 40); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(x - 8, y - 22, 16, 5); }); }
S(B.b15, (ctx, t) => {
  const t0 = B.b15, t1 = B.b16;
  camara(ctx, t, t0, t1, { a: [960, 600, 1.08], b: [980, 590, 1.13] });
  canchaVerde(ctx, t); conos(ctx, [760, 900, 1040, 1180], 900);
  const ph = (t - t0) * 1.2, x = 700 + ((ph % 1) * 560), zig = Math.sin(ph * TAU * 2) * 24;
  cr(ctx, { x, y: 905 + zig * .3, s: 1.1, edad: 'nino', t, pose: corre(x * 1.5, .86), face: 'determined' }); ball2(ctx, x + 50, 890 + zig * .3, 13, t * 12);
  [[230, 'crossed'], [430, 'think'], [620, 'crossed']].forEach(([cx, p], i) => figure(ctx, { x: cx, y: 900, s: 1.2, t, seed: 90 + i, shirt: CR.sporting, pose: POSE[p], face: 'neutral', look: [6, 0] }));
  fin(ctx); tono(ctx, 'frio');
  const dia = t < Wd('tres', t0) ? 1 : t < Wd('días…') ? 2 : 3; sello(ctx, `LISBOA · 1997 · DÍA ${dia}`, t, t0 + .2, t1);
  vignette(ctx, .45);
}, t => 700 + ((((t - B.b15) * 1.2) % 1) * 560) - 120);

// ===== b16 · y lo ficha. Se va solo a otra ciudad =====
S(B.b16, (ctx, t) => {
  const t0 = B.b16, t1 = B.b17, tv = Wd('se va') - .1;
  if (t < tv) { // inserto: la firma
    camara(ctx, t, t0, tv, { a: [960, 560, 1.0], b: [960, 560, 1.05] });
    cuarto(ctx, t, 'oficina'); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
    papel(ctx, 960, 560, 620, 760, -.03, (c, w, h) => { for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(40,40,46,.35)'; c.fillRect(-250, -300 + i * 36, 500 - (i % 3) * 80, 10); } text(c, 'CONTRATO DE FORMACIÓN', 0, -340, { font: 'Geist Mono', size: 22, color: '#2a2a30', ls: 3 });
      const k = prog(t, Wd('ficha') - .2, Wd('ficha') + .5); c.strokeStyle = '#1b2a6a'; c.lineWidth = 4; c.beginPath(); for (let i = 0; i <= 40 * k; i++) { const u = i / 40; c.lineTo(-120 + u * 240, 250 + Math.sin(u * 22) * 18 * (1 - u * .4)); } c.stroke(); });
    fin(ctx); tono(ctx, 'frio'); pozo(ctx, 960, 600, 420, .5);
  } else { // ventana del ferry: se va solo
    camara(ctx, t, tv, t1, { a: [960, 540, 1.1], b: [940, 540, 1.14] });
    ctx.fillStyle = '#d9dde0'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
    ctx.save(); ctx.beginPath(); ctx.ellipse(1180, 470, 300, 230, 0, 0, TAU); ctx.clip();
    ctx.fillStyle = vg(ctx, [[0, '#9cc4e4'], [1, '#e8f0f4']], 240, 560); ctx.fillRect(860, 220, 640, 500); ctx.fillStyle = '#2d6a9a'; ctx.fillRect(860, 560, 640, 200);
    const mx = ((t - tv) * 80) % 640; ctx.fillStyle = 'rgba(255,255,255,.7)'; for (let i = 0; i < 4; i++) ctx.fillRect(860 + ((i * 190 + 700 - mx) % 640), 600 + i * 30, 90, 3);
    ctx.restore(); ctx.strokeStyle = '#9aa2a8'; ctx.lineWidth = 24; ctx.beginPath(); ctx.ellipse(1180, 470, 300, 230, 0, 0, TAU); ctx.stroke();
    cr(ctx, { x: 780, y: 940, s: 1.75, edad: 'nino', t, pose: { ...POSE.sitFront, head: 6 }, face: 'sad', look: [8, -2] });
    fin(ctx); tono(ctx, 'frio'); sello(ctx, 'MADEIRA → LISBOA · 12 AÑOS', t, tv + .2, t1); vignette(ctx, .5);
  }
}, t => t < Wd('se va') - .1 ? 960 : 900);

// ===== b17 · con escuela, casa y entrenadores pagados por el club (academia) =====
S(B.b17, (ctx, t) => {
  const t0 = B.b17, t1 = B.b18;
  camara(ctx, t, t0, t1, { a: [960, 580, 1.08], b: [960, 570, 1.12] });
  cuarto(ctx, t, 'academia');
  cr(ctx, { x: 960, y: 800, s: 1.25, edad: 'nino', t, pose: agarre({ ...POSE.sitFrontFwd }, { x: 960, y: 800, s: .975, dir: 1 }, 'F', [1040, 525 + Math.sin(t * 6) * 3]), face: 'neutral', look: [4, 6] });
  papel(ctx, 1040, 520, 120, 20, .05);
  fin(ctx); tono(ctx, 'frio');
  etiqueta(ctx, 'ESCUELA', 760, 520, t, t0 - .7, { dy: -90, dx: -70 });
  etiqueta(ctx, 'CASA', 960, 340, t, Wd('casa') - .05, { dy: -60, dx: 0 });
  etiqueta(ctx, 'ENTRENADORES', 1180, 520, t, Wd('entrenadores') - .05, { dy: -90, dx: 90 });
  vignette(ctx, .45);
}, 960);

// ===== b18 · cinco Balones de Oro y más de novecientos goles =====
S(B.b18, (ctx, t) => {
  const t0 = B.b18, t1 = B.b19;
  camara(ctx, t, t0, t1, { a: [960, 560, 1.0], b: [960, 550, 1.06] });
  fondoMarca(ctx, t, 18); ctx.fillStyle = '#2a2018'; ctx.fillRect(300, 700, 1320, 26); ctx.fillStyle = 'rgba(255,220,140,.12)'; ctx.fillRect(300, 700, 1320, 4);
  for (let i = 0; i < 5; i++) { const ti = Wd('cinco', t0) + i * .16, k = ease(t, ti, ti + .35, E.back); if (k <= 0) continue; balonOro(ctx, 520 + i * 220, 640 - (1 - k) * 40, 46 * k, t, i); }
  fin(ctx); uiCenter(ctx, V ? 1.2 : 1);
  const tn = Wd('novecientos') - .1, kn = ease(t, tn, tn + .9, E.out), n = Math.round(lerp(0, 900, kn));
  if (t > tn) { t3(ctx, (n >= 900 ? '+' : '') + n, 960, 300, { size: 110, font: MONO3, align: 'center', alpha: ease(t, tn, tn + .3) }); t3(ctx, 'GOLES OFICIALES', 960, 380, { size: 24, font: MONO3, align: 'center', color: B3V.huesoT, ls: 6, alpha: ease(t, tn + .3, tn + .7) }); }
}, 960);

// ===== b19–b20 · mismo niño, mismo talento… pero en los cerros de Tijuana (rima: disolvencia del fondo con el niño alineado) =====
S(B.b19, (ctx, t) => {
  const t0 = B.b19, t1 = B.b21, tc = Wd('pero', t0) - .2;
  camara(ctx, t, t0, t1, { a: [960, 640, 1.18], b: [960, 610, 1.3] });
  const k = ease(t, tc, tc + .9, E.inOut);
  if (k < 1) { cerros(ctx, 'mad', 'dia'); calleEmpinada(ctx, 'mad'); }
  if (k > 0) { ctx.save(); ctx.globalAlpha = k; cerros(ctx, 'tj', 'tarde'); calleEmpinada(ctx, 'tj'); ctx.restore(); }
  const o = { x: 960, y: pendiente(960) + 60, s: 1.4, edad: 'nino', t };
  cr(ctx, { ...o, pose: { ...POSE.carry, lean: 0, head: -4 }, face: 'determined', look: [-2, -2] }); ball2(ctx, 1020, o.y - 200, 20, 0);
  fin(ctx); if (k < 1) { ctx.save(); ctx.globalAlpha = 1 - k; tono(ctx, 'frio'); ctx.restore(); } tono(ctx, k > .5 ? 'atardecer' : 'dia');
  etiqueta(ctx, 'TIJUANA · 1997', 1180, 520, t, tc + .6, { rosa: true, dy: -80, dx: 80 });
  vignette(ctx, .5);
}, 960);

// ===== b21 · Escenario uno: el llano =====
S(B.b21, (ctx, t) => tarjetaEscenario(ctx, t, B.b21, 1, 'el llano'), 960);

// ===== b22 · quiere una prueba en un equipo profesional (el volante pegado en el poste de luz) =====
S(B.b22, (ctx, t) => {
  const t0 = B.b22, t1 = B.b23;
  camara(ctx, t, t0, t1, { a: [1000, 540, 1.25], b: [1060, 530, 1.32] });
  cerros(ctx, 'tj', 'dia'); calleEmpinada(ctx, 'tj');
  ctx.fillStyle = '#4a3a2e'; ctx.fillRect(1180, 120, 34, 900);
  papel(ctx, 1197, 470, 210, 280, .04, (c) => { c.fillStyle = '#e4007c00'; text(c, 'VISORÍAS', 0, -96, { font: 'Anton', size: 46, color: '#1a1a1e' }); text(c, 'FUERZAS BÁSICAS', 0, -50, { font: 'Geist Mono', size: 15, color: '#1a1a1e', ls: 2 }); text(c, 'INSCRIPCIÓN', 0, 30, { font: 'Geist Mono', size: 17, color: '#1a1a1e' }); text(c, '$ 800', 0, 70, { font: 'Anton', size: 40, color: '#b8322a' }); for (let i = 0; i < 5; i++) c.fillRect(-90 + i * 40, 112, 4, 24); });
  cr(ctx, { x: 860, y: pendiente(860) + 60, s: 1.45, edad: 'nino', t, pose: agarre({ ...POSE.stand, lean: -4, head: -10 }, { x: 860, y: pendiente(860) + 60, s: 1.13, dir: 1 }, 'B', [900, 860]), face: 'smile', look: [8, -6] });
  ball2(ctx, 905, pendiente(905) - 10, 18, 0);
  fin(ctx); tono(ctx, 'dia'); sello(ctx, 'TIJUANA · 1997 · 12 AÑOS', t, t0 + .2, t1); vignette(ctx, .45);
}, 1050);

// ===== b23–b25 · visorías que cobran (la misma composición dos veces: rima) =====
function visoria(ctx, t, t0, t1, o = {}) {
  camara(ctx, t, t0, t1, o.cam || { a: [1000, 600, 1.12], b: [1040, 595, 1.16] });
  cerros(ctx, 'tj', 'dia'); llano(ctx, t, { cielo: 'dia', porteria: [1700, 860, .55] });
  // carpa y mesa
  ctx.fillStyle = o.carpa || '#2a4a8a'; ctx.beginPath(); ctx.moveTo(980, 520); ctx.lineTo(1540, 520); ctx.lineTo(1500, 580); ctx.lineTo(1020, 580); ctx.fill(); ctx.fillStyle = '#d8d8d8'; ctx.fillRect(1000, 580, 8, 320); ctx.fillRect(1510, 580, 8, 320);
  figure(ctx, { x: 1360, y: 905, s: 1.25, dir: -1, t, seed: 101, shirt: CR.visor, acc: { cap: '#3a3a40' }, pose: o.poseV || POSE.sitFrontFwd, face: o.caraV || 'smug', look: o.lookV || [-4, 2] });
  mesa(ctx, 1260, 760, 360, '#cfcac0');
  if (o.billetes) { const k = ease(t, o.billetes, o.billetes + .5, E.out); billete(ctx, lerp(1080, 1230, k), 752, .7, -.1); billete(ctx, lerp(1060, 1215, k), 748, .7, .15, '#9ac08a'); }
  const om = { x: 980, y: 905, s: 1.35, dir: 1 };
  figure(ctx, { ...om, t, seed: 72, shirt: CR.mama, pose: o.billetes ? agarre({ ...POSE.stand, lean: 8 }, om, 'F', [lerp(1090, 1180, ease(t, o.billetes, o.billetes + .5)), 752]) : POSE.stand, face: 'sad' });
  cr(ctx, { x: 820, y: 905, s: 1.3, edad: 'nino', t, pose: POSE.shy, face: 'neutral', look: [6, -2] });
  [180, 300, 420].forEach((x, i) => figure(ctx, { x: x + Math.sin(t + i) * 4, y: 880, s: .8, t, seed: 110 + i, shirt: PAL_TJ[i + 4], pose: POSE.pockets, face: 'neutral' }));
}
S(B.b23, (ctx, t) => { visoria(ctx, t, B.b23, B.b24, {}); fin(ctx); tono(ctx, 'dia'); vignette(ctx, .4); }, 1080);
S(B.b24, (ctx, t) => { // inserto: la inscripción
  const t0 = B.b24, t1 = B.b25; visoria(ctx, t, t0, t1, { billetes: Wd('cobra') - .05, cam: { a: [1180, 700, 1.9], b: [1200, 700, 2.0] } });
  fin(ctx); tono(ctx, 'dia'); etiqueta(ctx, 'INSCRIPCIÓN', 1160, 600, t, Wd('inscripción') - .05, { dy: -80, dx: 0 }); vignette(ctx, .45);
}, 1180);
S(B.b25, (ctx, t) => {
  const t0 = B.b25, t1 = B.b26; visoria(ctx, t, t0, t1, { billetes: t0 + .1, carpa: '#8a2a2a', cam: { a: [1060, 620, 1.2], b: [1080, 615, 1.24] }, caraV: 'smile' });
  fin(ctx); tono(ctx, 'dia'); sello(ctx, 'OTRA VISORÍA · 3 MESES DESPUÉS', t, t0 + .05, t1); vignette(ctx, .4);
}, 1080);
// ===== b26 · en ninguna aparece alguien que de verdad pueda ficharlo (la silla del visor, vacía) =====
S(B.b26, (ctx, t) => {
  const t0 = B.b26, t1 = B.b27;
  camara(ctx, t, t0, t1, { a: [900, 600, 1.1], b: [880, 600, 1.14] });
  cerros(ctx, 'tj', 'dia'); llano(ctx, t, { cielo: 'dia', porteria: [1650, 890, .75] });
  // la silla vacía al frente
  ctx.fillStyle = '#d8d0bc'; ctx.fillRect(320, 760, 160, 14); ctx.fillRect(330, 774, 10, 140); ctx.fillRect(460, 774, 10, 140); ctx.fillRect(330, 620, 140, 12); ctx.fillRect(330, 620, 10, 150); ctx.fillRect(460, 620, 10, 150);
  // el "visor" de la mesa, en el celular
  figure(ctx, { x: 640, y: 905, s: 1.2, t, seed: 101, shirt: CR.visor, acc: { cap: '#3a3a40' }, pose: agarre({ ...POSE.stand, lean: 10, head: 22 }, { x: 640, y: 905, s: 1.2, dir: 1 }, 'F', [700, 640]), face: 'neutral', look: [2, 8] });
  telefono(ctx, 708, 640, .32, { rot: .3, pantalla: '#3a6aa8' });
  // Cristiano se lleva a tres
  const x = lerp(900, 1480, prog(t, t0, t1));
  cr(ctx, { x, y: 905, s: 1.2, edad: 'nino', t, pose: corre(x * 1.3, .94), face: 'determined' }); ball2(ctx, x + 52, 892, 13, t * 12);
  [[1060, 0], [1220, 1], [1380, 2]].forEach(([dx, i]) => { const kf = ease(t, t0 + (dx - 900) / 580 * (t1 - t0) - .2, t0 + (dx - 900) / 580 * (t1 - t0) + .3); figure(ctx, { x: dx + 50 * kf, y: 862, s: .92, dir: -1, t, seed: 120 + i, shirt: '#e8c06a', pose: mixPose(POSE.ready, POSE.fall, kf * .7), face: kf > .3 ? 'shock' : 'determined' }); });
  fin(ctx); tono(ctx, 'dia');
  etiqueta(ctx, 'VISOR PROFESIONAL', 400, 600, t, Wd('alguien') - .4, { dy: -80, dx: 20, strike: Wd('ficharlo') - .1 });
  vignette(ctx, .45);
}, t => lerp(760, 1300, prog(t, B.b26, B.b27)));

// ===== b27 · Su mamá hace cuentas. El gas, la renta, los tenis (cocina de noche) =====
S(B.b27, (ctx, t) => {
  const t0 = B.b27, t1 = B.b28;
  camara(ctx, t, t0, t1, { a: [960, 600, 1.15], b: [940, 590, 1.22] });
  cuarto(ctx, t, 'cocina', { lampara: [960, 300, 520] });
  mesa(ctx, 960, 760, 700);
  papel(ctx, 900, 750, 200, 34, .03); billete(ctx, 1100, 752, .6, .2); billete(ctx, 1150, 748, .6, -.1, '#9ac08a');
  const om = { x: 760, y: 900, s: 1.4, dir: 1 };
  figure(ctx, { ...om, t, seed: 72, shirt: CR.mama, pose: agarre({ ...POSE.sitFrontFwd, lean: 16, head: 18 }, om, 'F', [900 + Math.sin(t * 7) * 10, 748]), face: 'sad', look: [4, 8] });
  cr(ctx, { x: 1500, y: 900, s: 1.3, edad: 'nino', t, dir: -1, pose: POSE.shy, face: 'sad', look: [-6, 2] });
  fin(ctx); tono(ctx, 'noche'); pozo(ctx, 900, 640, 460, .5);
  etiqueta(ctx, 'GAS', 860, 600, t, Wd('gas') - .05, { dy: -110, dx: -120 });
  etiqueta(ctx, 'RENTA', 960, 600, t, Wd('renta') - .05, { dy: -150, dx: 0 });
  etiqueta(ctx, 'TENIS', 1060, 600, t, Wd('tenis', t0) - .05, { dy: -110, dx: 120, strike: Wd('tenis', t0) + .6 });
  vignette(ctx, .55);
}, 1000);

// ===== b28 · A los quince entra a trabajar a un taller =====
S(B.b28, (ctx, t) => {
  const t0 = B.b28, t1 = B.b29;
  camara(ctx, t, t0, t1, { a: [960, 600, 1.1], b: [1000, 590, 1.16] });
  cuarto(ctx, t, 'taller');
  cochito(ctx, 1200, 900, 2.4, '#6a7a6a');
  const o = { x: 760, y: 905, s: 1.4, dir: 1 }, k = Math.sin(t * 8) * 8;
  cr(ctx, { ...o, edad: 'joven', ropa: 'taller', t, pose: agarre({ ...POSE.crouch }, { ...o, s: 1.3 }, 'F', [980 + k, 840]), face: 'neutral', look: [6, 4] });
  ctx.strokeStyle = '#a0a4ac'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(960 + k, 830); ctx.lineTo(1010 + k, 846); ctx.stroke();
  fin(ctx); tono(ctx, 'oficina'); pozo(ctx, 900, 700, 460, .5); sello(ctx, 'TALLER · 15 AÑOS', t, t0 + .2, t1); vignette(ctx, .55);
}, 900);
transicion(B.b28, 'dip', .6);

// ===== b29 · Los domingos es leyenda de la liga de su colonia =====
S(B.b29, (ctx, t) => {
  const t0 = B.b29, t1 = B.b30, pan = (t - t0) * 160;
  camara(ctx, t, t0, t1, { a: [900 + 0, 600, 1.12], b: [1100, 595, 1.12] });
  cerros(ctx, 'tj', 'tarde'); llano(ctx, t, {});
  cochito(ctx, 200, 790, .7, '#7a3a3a'); cochito(ctx, 420, 795, .7, '#3a5a7a', -1); publicoLlano(ctx, t, .9, { y: 785, x0: 100, dx: 170, n: 9, seed: 21 });
  const x = 820 + pan;
  cr(ctx, { x, y: 905, s: 1.25, edad: 'joven', t, pose: corre(x * 1.2, 1.16), face: 'determined' }); ball2(ctx, x + 60 + Math.abs(Math.sin(t * 6)) * 10, 890, 15, t * 12);
  [1080, 1260].forEach((dx, i) => { const tf = t0 + (dx - 880) / 160, kf = ease(t, tf - .1, tf + .4); figure(ctx, { x: dx + 50 * kf, y: 865, s: .92, dir: -1, t, seed: 130 + i, shirt: '#e8c06a', pose: mixPose(POSE.ready, POSE.fall, kf * .8), face: kf > .2 ? 'shock' : 'determined' }); });
  fin(ctx); tono(ctx, 'atardecer'); sello(ctx, 'LIGA DE LA COLONIA · DOMINGO', t, t0 + .2, t1); vignette(ctx, .45);
}, t => 820 + (t - B.b29) * 160 + 40);

// ===== b30 · Le pagan con tacos y refresco =====
S(B.b30, (ctx, t) => {
  const t0 = B.b30, t1 = B.b31;
  camara(ctx, t, t0, t1, { a: [960, 640, 1.3], b: [960, 630, 1.36] });
  cerros(ctx, 'tj', 'tarde'); llano(ctx, t, {}); cochito(ctx, 980, 905, 2.2, '#7a3a3a');
  ctx.fillStyle = '#3a5a8a'; ctx.fillRect(820, 820, 170, 90); ctx.fillStyle = '#e8e8ea'; ctx.fillRect(820, 820, 170, 16); // hielera
  const o = { x: 900, y: 905, s: 1.3, dir: 1 }, mord = Math.max(0, Math.sin((t - t0) * 5));
  cr(ctx, { ...o, edad: 'joven', t, pose: agarre({ ...POSE.sitFront }, { ...o, s: 1.21 }, 'F', [1000, 640 + mord * 30]), face: mord > .5 ? 'happy' : 'smile', look: [6, 2] });
  plato(ctx, 1060, 760, .5, tacos); refresco(ctx, 1210, 905, .55);
  fin(ctx); tono(ctx, 'atardecer');
  etiqueta(ctx, 'SUELDO', 1060, 720, t, Wd('tacos') - .1, { dy: -90, dx: 60 });
  vignette(ctx, .5);
}, 960);
