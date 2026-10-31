// Tomas v2 (0–61 s): anclas a la voz
const VO = 0.5;
const norm = s => s.toLowerCase().replace(/[.,…!?¿¡":;]/g, '').trim();
const NW = WORDS.map(w => norm(w.text));
let _cur = 0;
function A(phrase) { const p = phrase.split(' ').map(norm); for (let i = _cur; i < NW.length; i++) { let ok = true; for (let j = 0; j < p.length; j++) if (NW[i + j] !== p[j]) { ok = false; break; } if (ok) { _cur = i + 1; return VO + WORDS[i].start; } } throw new Error('no encontré: ' + phrase); }
const T = {};
T.veinti = A('veintinueve'); T.fortaleza = A('fortaleza'); T.octavos = A('octavos');
T.mexGana = A('méxico le gana'); T.conGol = A('con gol'); T.santos = A('santos');
T.m88 = A('minuto ochenta y ocho'); T.empata = A('empata');
T.m94 = A('minuto noventa y cuatro'); T.robben = A('robben'); T.area = A('área'); T.cae = A('cae'); T.penal = A('penal');
T.frase = A('y una frase'); T.noEra = A('no era penal');
T.pero = A('pero'); T.ysi1 = A('y si el'); T.arbitro = A('árbitro no lo marca');
T.sinPenal = A('sin penal'); T.extra1 = A('tiempo extra'); T.version = A('esta versión'); T.tuHist = A('es tu historia');
T.doce = A('tienes doce años'); T.sala = A('sala'); T.papa = A('papá'); T.tio = A('tío'); T.abuelo = A('y tu abuelo');
T.nunca = A('tu abuelo nunca'); T.quinto = A('quinto partido');
T.sigan = A('el árbitro dice'); T.grita = A('tu tío grita'); T.perro = A('el perro'); T.mesa = A('mesa');
T.noPasaba = A('méxico no pasaba'); T.m86 = A('mil novecientos'); T.local = A('local');
T.m113 = A('minuto ciento trece'); T.esquina = A('tiro de esquina'); T.cabezazo = A('cabezazo'); T.gol113 = A('gol');
T.levanta = A('tu abuelo se levanta'); T.lleva = A('lleva treinta'); T.brinca = A('y brinca');
T.cuartos = A('cuartos de final'); T.costa = A('costa rica'); T.famoso = A('el famoso'); T.existe = A('existe');
T.penales1 = A('se va a penales'); T.vuela = A('vuela'); T.paraDos = A('y para dos');
T.top4 = A('méxico está entre'); T.llora = A('tu papá llora'); T.cebolla = A('cebolla'); T.noHay = A('no hay cebolla');
T.semi = A('semifinal'); T.m120 = A('ciento veinte'); T.ceroCero = A('cero a cero'); T.penales2 = A('otra vez penales');
T.tapas = A('te tapas'); T.quita = A('tu abuelo te quita'); T.miralo = A('míralo'); T.dosVeces = A('dos veces');
T.g1 = A('gol'); T.g2 = A('gol'); T.atajada = A('atajada'); T.g3 = A('gol');
T.enFinal = A('méxico está en la final');
T.trece = A('trece de julio'); T.maracana = A('estadio maracaná'); T.alemania = A('méxico contra alemania'); T.siete = A('siete');
T.nadie = A('nadie da'); T.m80 = A('minuto ochenta'); T.ale1 = A('alemania uno');
T.m89 = A('minuto ochenta y nueve'); T.centro = A('centro'); T.remate = A('remate'); T.gol89 = A('gol'); T.unoUno = A('uno a uno');
T.extra = A('tiempo extra otra vez'); T.pais = A('el país entero'); T.dePie = A('de pie');
T.m118 = A('minuto ciento dieciocho'); T.contra = A('contragolpe'); T.piernas = A('piernas');
T.gooool = A('gooool'); T.campeon = A('méxico campeón');
T.doce2 = A('tienes doce años y'); T.imposible = A('imposible'); T.escuela = A('en la escuela'); T.tuNo = A('tú no');
T.arbitro2 = A('tú quieres ser árbitro'); T.porque = A('porque aprendiste'); T.segundo = A('segundo'); T.historia = A('puede cambiar');
T.generacion = A('una generación'); T.casi = A('casi'); T.y2026 = A('y en dos mil'); T.campeon2 = A('como campeón');
T.baston = A('y tu abuelo ya'); T.tribuna = A('tribuna');
T.peroEse = A('pero ese penal'); T.marco = A('sí se marcó'); T.perdimos = A('perdimos');
T.aunAsi = A('y aun así'); T.doceDesp = A('doce años después'); T.misma = A('la misma frase');
T.ysisi = A('y si sí'); T.porqueMex = A('porque los mexicanos'); T.perder = A('perder un partido'); T.esperanza = A('esperanza');
T.donde = A('dónde estabas'); T.coment = A('comentarios'); T.duele = A('te duele'); T.like = A('dale like'); T.ysisi2 = A('y si sí');
const DUR = 180.7;

const SHOTS = []; const S = (t0, fn, vx = 960) => SHOTS.push({ t0, fn, vx });
const RIM_STADIUM = 'rgba(255,236,205,1)', RIM_TV = 'rgba(150,215,255,1)', RIM_WARM = 'rgba(255,186,120,1)';
const FAM = {
  dad: { shirt: P.dad, hood: false, seed: 11 }, kid: { shirt: P.kid, hood: true, seed: 12, s: .86 },
  tio: { shirt: P.tio, hood: false, seed: 13, acc: { cap: '#1f9e57' } }, abu: { shirt: P.abu, hood: false, seed: 14, acc: { mustache: 1, glasses: 1, hairAbu: 1 } },
};
function fam(ctx, who, x, y, s, pose, face, t, extra = {}) { const b = FAM[who]; return figure(ctx, Object.assign({ x, y, s: s * (b.s || 1), dir: -1, shirt: b.shirt, hood: b.hood, seed: b.seed, acc: b.acc, pose, face, t, rim: RIM_TV, light: [-1, -.4] }, extra)); }
function player(ctx, x, y, s, kit, pose, face, dir, t, extra = {}) { return figure(ctx, Object.assign({ x, y, s, dir, shirt: kit, sleeves: 'short', shorts: '#ffffff', socks: kit === P.ned ? P.ned : '#c4232f', pose, face, t, seed: Math.round(y * 7) % 97, rim: RIM_STADIUM, light: [-.6, -1] }, extra)); }
function bigTitle(ctx, s, t, t0, o = {}) { if (NOUI) return;
  const k = ease(t, t0, t0 + .28, E.back); if (k <= 0) return; const out = o.out ? 1 - ease(t, o.out, o.out + .25) : 1;
  ctx.save(); ui(ctx); ctx.globalAlpha = out; ctx.translate(uxC(o.x || W / 2), uyC(o.y || 330)); const sc = (o.from || 1.35) + (1 - (o.from || 1.35)) * k; ctx.scale(sc * (1 + (t - t0) * .02), sc * (1 + (t - t0) * .02));
  text(ctx, s, 6, 10, { size: o.size || 210, color: 'rgba(0,0,0,.55)', ls: 4 });
  text(ctx, s, 0, 0, { size: o.size || 210, color: o.color || P.yel, ls: 4, stroke: 10, strokeCol: '#140d08' });
  ctx.restore();
}
function flash(ctx, t, t0, d = .3, col = '255,255,255', a = .85) { const k = 1 - prog(t, t0, t0 + d); if (t >= t0 && k > 0) { ctx.save(); setBase(ctx); ctx.fillStyle = `rgba(${col},${k * a})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore(); } }

// ===== 1 · Fortaleza: plano general desde la tribuna =====
S(0, (ctx, t) => {
  const k = ease(t, 0, T.conGol + .3, E.sine), [hx, hy] = handheld(t, 4);
  ctx.save(); cam(ctx, 960 + lerp(-40, 30, k) + hx, 560 + hy, lerp(1.0, 1.14, k));
  stadiumWide2(ctx, t, { sky: 'dusk' });
  ctx.restore();
  fansForeground(ctx, t, { cheer: t > T.mexGana ? .9 : .35, blur: 11, flag: false, xs: [-60, 230, 500, 1420, 1690, 1960], y: 1150 });
  grade(ctx, '#ff9a5a', .12); vignette(ctx, .6);
  stamp2(ctx, ['29 · 06 · 2014', 'FORTALEZA, BRASIL', 'OCTAVOS DE FINAL'], t, T.veinti - .1, { gaps: [0, T.fortaleza - T.veinti, T.octavos - T.veinti], out: T.conGol - .5 });
  scoreBug2(ctx, { a: 'MEX', b: 'HOL', s1: 0, s2: 0, min: "47'", alpha: ease(t, T.mexGana - .2, T.mexGana + .3) });
  ctx.save(); ctx.fillStyle = `rgba(0,0,0,${1 - prog(t, 0, .7)})`; ctx.fillRect(0, 0, W, H); ctx.restore();
});
// ===== 2 · gol de México: POV detrás de la red =====
function goalPOV(ctx, t, t0, o) {
  const hit = t0 + (o.dur || .5), k = ease(t, t0, hit, E.out);
  const [sx, sy] = t > hit ? shakeV(t, 10 * (1 - prog(t, hit, hit + .8))) : [0, 0];
  ctx.save(); ctx.translate(sx, sy); cam(ctx, 960, 560, lerp(1.0, 1.06, prog(t, t0 - 1, t0 + 2)));
  pitchLevel(ctx, t, { camX: 300, cheer: t > hit ? 1 : .2, crowdBlur: 6 });
  // portero que se lanza
  const kk = ease(t, t0 + .02, t0 + .55, E.out), side = o.keeperSide || 1;
  ctx.save(); ctx.translate(lerp(960, 960 + side * 420, kk), 820 - Math.sin(kk * PI) * 110); ctx.rotate(D2R(side * 80 * kk));
  figure(ctx, { x: 0, y: 90, s: 1.25, dir: side, pose: mixPose(POSE.ready, POSE.dive, kk), face: kk > .3 ? 'shout' : 'shock', t, seed: 77, shirt: o.keeper, shorts: '#222222', acc: { gloves: '#e9f255' }, rim: RIM_STADIUM, light: [-.6, -1], noShadow: true });
  ctx.restore();
  // tirador al fondo
  if (o.shooter) { const ap = clamp((t - (t0 - .7)) / .7), sx0 = 960 + (o.shooterX || -60) - 200 * (1 - ap);
    player(ctx, sx0, 760, .62, o.shooter, t < t0 ? mixPose(runCycle(runPhase(200 * ap, .62)), POSE.kick, ease(t, t0 - .22, t0)) : mixPose(POSE.kick, POSE.stand, ease(t, t0 + .3, t0 + 1)), 'determined', 1, t); }
  ctx.restore();
  // balón hacia la cámara
  const bx0 = 960 + (o.shooterX || -60) + 40, by0 = 740;
  if (t >= t0 - .05 && t < hit) { const kb = prog(t, t0 - .05, hit); const e = kb * kb; ball2(ctx, lerp(bx0, o.tx, e), lerp(by0, o.ty, e) - Math.sin(kb * PI) * 60, lerp(14, 70, e), t * 20, (o.tx - bx0) * .02, (o.ty - by0) * .02); }
  netForeground(ctx, t, { bulge: t > hit ? 1.6 * Math.exp(-(t - hit) * 3) * (1 + .3 * Math.sin((t - hit) * 18)) : 0, bx: o.tx, by: o.ty, blur: 1.2, spacing: 110, post: [0, 0, 70, H] });
  if (t > hit) { const kb = prog(t, hit, hit + .6); ball2(ctx, o.tx + (o.tx - 960) * .05 * kb, o.ty + kb * 120, 70 - kb * 6, t * 4); }
  flash(ctx, t, hit, .25, '255,255,255', .7);
}
S(T.conGol, (ctx, t) => {
  const t0 = T.conGol + .2;
  goalPOV(ctx, t, t0, { keeper: P.ned, keeperSide: 1, shooter: P.mex, shooterX: -330, tx: 640, ty: 470, dur: .55 });
  grade(ctx, '#ffb070', .1); vignette(ctx, .55);
  scoreBug2(ctx, { a: 'MEX', b: 'HOL', s1: t > t0 + .55 ? 1 : 0, s2: 0, min: "48'", flash: t > t0 + .55 && t < t0 + 1.8 });
  if (t > t0 + .6) bigTitle(ctx, '¡GOL!', t, t0 + .6, { y: 310, size: 190 });
});
// ===== 3 · 88': empate =====
S(T.m88, (ctx, t) => {
  const k = prog(t, T.m88, T.m94), [hx, hy] = handheld(t, 5, 8);
  ctx.save(); cam(ctx, 960 + hx, 600 + hy, lerp(1.04, 1.14, k));
  pitchLevel(ctx, t, { camX: 900 + (t - T.m88) * 60, cheer: t > T.empata ? .9 : .15 });
  const tStop = T.empata - .15, vx = 250, tau = .28, dt3 = t - T.m88, dist = t < tStop ? vx * dt3 : vx * (tStop - T.m88) + vx * tau * (1 - Math.exp(-(t - tStop) / tau));
  const cel = ease(t, tStop, tStop + .35, E.out), hp = hop(t, tStop + .3, .62, 46);
  const celPose = crouchOf(mixPose(POSE.cheer, POSE.fists, .5 + .5 * Math.sin(t * 6)), hp.crouch);
  player(ctx, 520 + dist, 950, 1.55, P.ned, mixPose(runCycle(runPhase(Math.min(dist, vx * (tStop - T.m88)), 1.55)), celPose, cel), t > T.empata ? 'shout' : 'determined', 1, t, { sleeves: 'short', socks: P.ned, acc: { num: '10' }, jump: hp.y * 1.55, squash: hp.sq });
  player(ctx, 1290, 935, 1.4, P.mex, POSE.hips, 'sad', -1, t, { sleeves: 'short', socks: '#c4232f', acc: { num: '3' } });
  ctx.restore();
  // defensor en primer plano, desenfocado (sobre el hombro)
  blurred(ctx, 'fgdef', 16, (x) => { x.translate(0, 0); figure(x, { x: 1880, y: 1560, s: 3.6, dir: -1, pose: POSE.sad, face: 'sad', t, seed: 4, shirt: P.mex, shorts: '#ffffff', rim: RIM_STADIUM, light: [-.6, -1], noShadow: true }); });
  grade(ctx, '#3a5aa0', .14); vignette(ctx, .65);
  scoreBug2(ctx, { a: 'MEX', b: 'HOL', s1: 1, s2: t > T.empata + .25 ? 1 : 0, min: "88'", flash: t > T.empata + .25 && t < T.empata + 1.5 });
});
// ===== 4 · 90+4: entra al área y cae (cámara lenta) =====
const FALLP = {
  stumble: { lean: 34, head: -22, shB: 128, elB: 34, shF: 158, elF: 22, hipB: -38, knB: -86, hipF: 24, knF: -22, sit: 0, hipH: 132 },
  dive: { lean: 0, head: -48, shB: 150, elB: 40, shF: 166, elF: 30, hipB: -16, knB: -14, hipF: -6, knF: -26, sit: 0 },
  down: { lean: 0, head: -62, shB: 112, elB: 58, shF: 128, elF: 62, hipB: -10, knB: -34, hipF: -4, knF: -12, sit: 0 },
};
const SLIDE = { lean: -24, head: -6, shB: -36, elB: 26, shF: 36, elF: 42, hipB: 30, knB: -96, hipF: 74, knF: -4, sit: 0, hipH: 92 };
const PROTEST = { lean: -2, head: -6, shB: 62, elB: 18, shF: 70, elF: 14, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 };
function fallScene(ctx, t, u) { // u: 0..1 progreso de la jugada (cámara lenta)
  const S1 = 1.4, G = 975, run = clamp(u / .6), fall = clamp((u - .6) / .4);
  const ax = 240 + 520 * run; // carrera a velocidad constante
  ctx.save(); cam(ctx, lerp(700, 980, E.inOut(u)), 650, lerp(1.04, 1.2, E.inOut(u)));
  pitchLevel(ctx, t, { camX: 1200 + u * 500, cheer: .1, crowdBlur: 7 });
  ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1250, 650); ctx.lineTo(1120, 1100); ctx.stroke(); // línea del área
  // balón: conducción, se le adelanta, el defensor lo toca y sale desviado
  const bt = clamp((u - .58) / .08), bd = clamp((u - .66) / .34);
  const bx = u < .58 ? ax + 100 + Math.abs(Math.sin(u * 30)) * 14 : u < .66 ? lerp(240 + 520 * .58 / .6 + 100, 1170, bt) : lerp(1170, 1760, E.out(bd));
  const byG = u < .66 ? 952 : lerp(952, 862, E.out(bd)), by = byG - (u < .66 ? 0 : Math.abs(Math.sin(bd * PI * 2.2)) * 70 * (1 - bd));
  const drawBall = () => { ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(bx, byG + 14, 16, 5, 0, 0, TAU); ctx.fill(); ctx.restore(); ball2(ctx, bx, by, 17 * lerp(1, .9, u < .66 ? 0 : E.out(bd)), u * 30, u > .58 && u < .8 ? 8 : 0, 0); };
  if (byG < 905) drawBall();
  // defensor mexicano (más al fondo): llega trotando, se barre al balón, protesta
  const SD = 1.28, dy = 905, dJog = clamp((u - .25) / .3), dSl = clamp((u - .55) / .12), dRec = clamp((u - .78) / .2);
  const dx = 1560 - 140 * dJog - 70 * E.out(dSl);
  const dPose = u < .55 ? mixPose(POSE.ready, gait(140 * dJog / (gaitStride(GAITS.jog) * SD), 'jog'), Math.min(1, dJog * 4)) : u < .78 ? mixPose(gait(140 / (gaitStride(GAITS.jog) * SD), 'jog'), SLIDE, E.out(dSl)) : mixPose(SLIDE, PROTEST, E.inOut(dRec));
  player(ctx, dx, dy, SD, P.mex, dPose, u > .62 ? (u > .8 ? 'angry' : 'shock') : 'determined', -1, t, { acc: { num: '4' } });
  // atacante: corre, se tropieza solo, se lanza y cae (rotación alrededor de la cadera)
  if (fall <= 0) player(ctx, ax, G, S1, P.ned, runCycle(runPhase(ax - 240, S1)), 'determined', 1, t, { acc: { num: '11' } });
  else {
    const base = runCycle(runPhase(520, S1)), f1 = clamp(fall / .3), f2 = clamp((fall - .3) / .4), f3 = clamp((fall - .7) / .3);
    let pose = mixPose(base, FALLP.stumble, E.out(f1)); if (f2 > 0) pose = mixPose(pose, FALLP.dive, E.inOut(f2)); if (f3 > 0) pose = mixPose(pose, FALLP.down, E.out(f3));
    const ang = 86 * E.in(f2) + 4 * Math.sin(f3 * PI) * (1 - f3), hipStand = (pose.hipH ?? 144) * S1, hipLie = 30 * S1;
    const hx = 760 + 60 * E.out(f1) + 130 * E.out(f2) + 34 * E.out(f3);
    const hy = G - lerp(hipStand, hipLie, E.in(f2)) - Math.sin(f2 * PI) * 46 + Math.sin(f3 * PI) * -6;
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(D2R(ang)); ctx.translate(0, (pose.hipH ?? 144) * S1);
    player(ctx, 0, 0, S1, P.ned, pose, f1 > .2 ? 'shout' : 'determined', 1, t, { noShadow: true, acc: { num: '11' } });
    ctx.restore();
    ctx.save(); ctx.globalAlpha = .4; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(hx + 40 * E.in(f2), G, lerp(60, 210, E.in(f2)), 12, 0, 0, TAU); ctx.fill(); ctx.restore();
    if (f3 > 0) { const r = rnd(4); ctx.save(); for (let i = 0; i < 18; i++) { ctx.globalAlpha = .6 * (1 - f3); ctx.fillStyle = '#8fc47e'; ctx.beginPath(); ctx.arc(hx - 40 + r() * 260, G - 8 - r() * 50 * f3, 3 + r() * 5, 0, TAU); ctx.fill(); } ctx.restore(); }
  }
  if (byG >= 905) drawBall();
  ctx.restore();
}
S(T.m94, (ctx, t) => {
  const u = clamp((t - T.robben + .25) / (T.cae + .9 - T.robben + .25));
  fallScene(ctx, t, u);
  grassForeground(ctx, t, 1200 + u * 500, 8);
  grade(ctx, '#203a6a', .22); vignette(ctx, .75);
  scoreBug2(ctx, { a: 'MEX', b: 'HOL', s1: 1, s2: 1, min: "90+4'" });
});
// ===== 5 · ¡penal! (contrapicado del árbitro) =====
S(T.penal - .12, (ctx, t) => {
  const t0 = T.penal - .12, k = ease(t, t0 + .05, t0 + .3, E.back), [sx, sy] = shakeV(t, 9 * (1 - prog(t, t0, t0 + .6)));
  ctx.save(); ctx.translate(sx, sy); cam(ctx, 960, 560, lerp(1.0, 1.05, prog(t, t0, T.frase)));
  ctx.fillStyle = vg(ctx, [[0, '#05070f'], [1, '#141a33']]); ctx.fillRect(-200, -200, W + 400, H + 400);
  floodBank(ctx, 520, 200, 200, t, 1.1); floodBank(ctx, 1480, 160, 200, t, 1.1);
  rays(ctx, 520, 200, 1200, 9, 1.2, 'rgba(255,248,225,.25)', .5, t, 2);
  bokeh(ctx, t, 12, 8, 'rgba(255,240,215,.8)', 20, 60, .35, [0, 0, W, 500]);
  figure(ctx, { x: 960, y: 1480, s: 3.2, dir: 1, pose: mixPose(POSE.whistle, Object.assign({}, POSE.point, { shF: 112, head: -10 }), k), face: 'shout', t, seed: 3, shirt: P.ref, shorts: '#111111', acc: { whistle: k < .5 }, rim: RIM_STADIUM, light: [-.5, -1], noShadow: true });
  ctx.restore();
  flash(ctx, t, t0 + .08, .3, '255,60,60', .6);
  grade(ctx, '#ff4040', .12 * (1 - prog(t, t0, t0 + 1))); vignette(ctx, .7);
  bigTitle(ctx, 'PENAL', t, t0 + .1, { color: '#ff4a3a', y: 300, size: 230 });
});
// ===== 6 · "NO ERA PENAL" =====
S(T.frase, (ctx, t) => {
  ctx.fillStyle = '#050508'; ctx.fillRect(0, 0, W, H);
  // repetición fantasma de la caída al fondo
  softScene(ctx, 'ghost', 7, .14, x => fallScene(x, t, .62 + .38 * ((t - T.frase) % 2.2) / 2.2)); grade(ctx, '#808080', 1, 'saturation');
  rays(ctx, W / 2, -60, 1100, 7, .5, 'rgba(255,230,210,.25)', .5, t, 5);
  glow(ctx, W / 2, 540, 900, 'rgba(150,20,30,.35)');
  dust(ctx, t, 70, 9, 'rgba(255,230,210,1)', .35, 1.8);
  const k1 = ease(t, T.frase + .1, T.frase + .7, E.out);
  ctx.save(); ui(ctx); text(ctx, 'UNA FRASE QUE MÉXICO NUNCA OLVIDÓ', uxC(W / 2), uyC(360), { size: V ? 30 : 34, font: 'Montserrat', weight: 800, color: 'rgba(255,255,255,.75)', ls: (V ? 6 : 12) * (2 - k1), alpha: k1 }); ctx.restore();
  const k2 = ease(t, T.noEra - .05, T.noEra + .5, E.outQuint);
  if (k2 > 0) {
    const [tc, tx] = tmp('titlefx'); tx.translate(uxC(W / 2), uyC(560)); const sc2 = lerp(1.12, 1, k2) * (1 + (t - T.noEra) * .015); tx.scale(sc2, sc2);
    text(tx, 'NO ERA PENAL', 0, 0, { size: 240, color: '#f4efe8', ls: 6 });
    tx.globalCompositeOperation = 'source-atop'; const sw = lerp(-900, 900, prog(t, T.noEra + .1, T.noEra + 1.1)); const g = tx.createLinearGradient(sw - 140, 0, sw + 140, 0); g.addColorStop(0, 'rgba(255,200,150,0)'); g.addColorStop(.5, 'rgba(255,200,150,.95)'); g.addColorStop(1, 'rgba(255,200,150,0)'); tx.fillStyle = g; tx.fillRect(-1000, -160, 2000, 320);
    ctx.save(); ui(ctx); ctx.globalAlpha = k2; ctx.save(); ctx.translate(uxC(W / 2), uyC(568)); ctx.scale(sc2, sc2); text(ctx, 'NO ERA PENAL', 0, 0, { size: 240, color: 'rgba(0,0,0,.6)', ls: 6 }); ctx.restore(); ctx.drawImage(tc, 0, 0); ctx.restore();
    const kc = ease(t, T.noEra + .4, T.noEra + .75, E.outQuint); if (kc > 0) { // subrayado de pincel rojo (énfasis) bajo el título
      ctx.save(); ui(ctx); ctx.translate(uxC(W / 2), uyC(0)); ctx.scale(sc2, 1); ctx.fillStyle = '#ff3b30'; ctx.shadowColor = 'rgba(255,40,30,.6)'; ctx.shadowBlur = 22;
      const x0 = -560, x1 = lerp(-560, 560, kc); ctx.beginPath(); ctx.moveTo(x0, 700); for (let i = 0; i <= 30; i++) { const xx = lerp(x0, x1, i / 30), q = (xx + 560) / 1120; ctx.lineTo(xx, 694 - Math.sin(q * PI) * 10 - 9 * Math.sin(q * PI) ** .3); }
      for (let i = 30; i >= 0; i--) { const xx = lerp(x0, x1, i / 30), q = (xx + 560) / 1120; ctx.lineTo(xx, 700 - Math.sin(q * PI) * 10 + 7 * Math.sin(q * PI) ** .3); } ctx.fill(); ctx.restore(); }
    const kh = ease(t, T.noEra + .9, T.noEra + 1.25, E.back); if (kh > 0) { // se volvió frase nacional: #NoEraPenal
      ctx.save(); ui(ctx); ctx.translate(uxC(W / 2), uyC(790)); ctx.scale(kh, kh); ctx.font = '900 40px Montserrat'; ctx.letterSpacing = '3px'; const tw = ctx.measureText('#NoEraPenal').width + 64;
      ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, -tw / 2, -34, tw, 68, 34); ctx.fill(); text(ctx, '#NoEraPenal', 0, 2, { size: 40, font: 'Montserrat', weight: 900, color: '#d4241c', ls: 3 }); ctx.restore(); }
  }
  vignette(ctx, .8);
});
// ===== 7 · rebobinado: ¿y si el árbitro no lo marca? =====
S(T.pero, (ctx, t) => {
  const rw = prog(t, T.pero + .05, T.pero + 1.25), u = rw < 1 ? lerp(1, .52, E.inOut(rw)) : .52;
  fallScene(ctx, t, u); if (rw >= 1) grade(ctx, '#808080', .45 * prog(t, T.pero + 1.25, T.pero + 1.8), 'saturation');
  grade(ctx, '#203a6a', .2);
  if (rw < 1) { const r = rnd(Math.floor(t * 24)); ctx.save(); for (let i = 0; i < 9; i++) { const y = r() * H, h = 2 + r() * 14; ctx.globalAlpha = .25 + r() * .3; ctx.fillStyle = r() > .5 ? '#fff' : '#000'; ctx.fillRect(0, y, W, h); } ctx.restore();
    ctx.save(); ui(ctx); ctx.translate(0, uyT(0)); ctx.globalAlpha = .9; ctx.fillStyle = '#fff'; ctx.beginPath(); [0, 1].forEach(i => { ctx.moveTo(150 + i * 46, 190); ctx.lineTo(110 + i * 46, 215); ctx.lineTo(150 + i * 46, 240); }); ctx.fill(); text(ctx, 'REBOBINAR', 300, 216, { size: 34, font: 'Montserrat', weight: 900, align: 'left', ls: 6 }); ctx.restore(); }
  else { ctx.save(); ui(ctx); ctx.translate(0, uyT(0)); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(130, 194, 14, 44); ctx.fillRect(156, 194, 14, 44); text(ctx, 'PAUSA · 90+4', 200, 216, { size: 30, font: 'Montserrat', weight: 900, align: 'left', ls: 6 }); ctx.restore(); }
  const q = ease(t, T.ysi1 - .1, T.ysi1 + .5, E.outQuint), q2 = ease(t, T.arbitro, T.arbitro + .5, E.outQuint);
  if (q > 0) { ctx.save(); ctx.fillStyle = `rgba(0,0,0,${.35 * q})`; ctx.fillRect(0, 0, W, H); ctx.restore(); ctx.save(); ui(ctx); text(ctx, '¿Y SI EL ÁRBITRO', uxC(W / 2), uyC(400), { size: 110, color: '#fff', alpha: q, ls: 3, shadow: 'rgba(0,0,0,.6)' }); ctx.restore(); }
  if (q2 > 0) { ctx.save(); ui(ctx); text(ctx, 'NO LO MARCA?', uxC(W / 2), uyC(525), { size: 130, color: P.yel, alpha: q2, ls: 3, shadow: 'rgba(0,0,0,.6)' }); ctx.restore(); }
  vignette(ctx, .75);
});
// ===== 8 · título del episodio → entramos a la tele =====
S(T.sinPenal, (ctx, t) => {
  const zin = E.in(prog(t, T.tuHist + .25, T.doce + .05));
  ctx.save(); cam(ctx, 960, 560, lerp(1.06, 1.0, ease(t, T.sinPenal, T.tuHist)) * (1 + zin * 6));
  ctx.restore(); blurred(ctx, 'titlebg', 12, x => { cam(x, 960, 560, lerp(1.06, 1.0, ease(t, T.sinPenal, T.tuHist)) * (1 + zin * 6)); stadiumWide2(x, t, { sky: 'night' }); }); ctx.save(); cam(ctx, 960, 560, lerp(1.06, 1.0, ease(t, T.sinPenal, T.tuHist)) * (1 + zin * 6));
  ctx.fillStyle = 'rgba(5,6,12,.62)'; ctx.fillRect(-W, -H, W * 3, H * 3); ctx.restore();
  const k0 = ease(t, T.sinPenal, T.sinPenal + .6, E.out), k1 = ease(t, T.sinPenal + .3, T.sinPenal + .9, E.outQuint), k2 = ease(t, T.sinPenal + .6, T.sinPenal + 1.2, E.outQuint), k3 = ease(t, T.version, T.version + .6, E.out);
  const zz = lerp(1.06, 1.0, ease(t, T.sinPenal, T.tuHist)) * (1 + zin * 6), cx8 = uxC(960), cy8 = uyC(560);
  ctx.save(); ui(ctx); ctx.translate(cx8, cy8); ctx.scale(zz, zz); ctx.translate(-cx8, -cy8);
  brandTag(ctx, uxC(W / 2), uyC(296), 1.5, { alpha: k0 });
  
  t3(ctx, '¿Y si no hubiera', uxC(W / 2), uyC(500) + (1 - k1) * 30, { size: V ? 150 : 170, italic: true, align: 'center', alpha: k1, shadow: 'rgba(0,0,0,.6)', blur: 30 });
  t3(ctx, 'sido penal?', uxC(W / 2), uyC(680) + (1 - k2) * 30, { size: V ? 150 : 170, italic: true, align: 'center', alpha: k2, shadow: 'rgba(0,0,0,.6)', blur: 30 });
  text(ctx, 'ESTA VERSIÓN ES TU HISTORIA', uxC(W / 2), uyC(790), { size: 30, font: 'Montserrat', weight: 800, color: 'rgba(255,255,255,.75)', alpha: k3, ls: V ? 6 : 10 });
  ctx.restore();
  dust(ctx, t, 50, 6, 'rgba(255,230,190,1)', .3, 1.6);
  ctx.save(); ctx.fillStyle = `rgba(0,0,0,${prog(t, T.doce - .35, T.doce + .02)})`; ctx.fillRect(0, 0, W, H); ctx.restore();
  vignette(ctx, .7);
});
// ===== 9 · la sala (presentaciones) =====
function famSeated(ctx, t, o = {}) {
  const L = [];
  L.push(['dad', 760, o.dad || POSE.sitFront, o.dadF || 'neutral', { look: [-4, 0], mouth: o.dadM }]);
  L.push(['kid', 975, o.kid || POSE.sitFrontFwd, o.kidF || 'smile', { look: [-4, 0] }]);
  if (!o.noTio) L.push(['tio', 1185, o.tio || POSE.sitFront, o.tioF || 'neutral', { jump: o.tioJ || 0, squash: o.tioSq || 0, mouth: o.tioM }]);
  if (!o.noAbu) L.push(['abu', 1610, o.abu || POSE.sitFront, o.abuF || 'neutral', { jump: o.abuJ || 0 }]);
  const draw = (sitting) => L.forEach(([w, x, p, f, ex]) => { if ((p.sit > .5) === sitting) fam(ctx, w, x, 836, w === 'abu' ? 1.16 : 1.12, p, f, t, ex); });
  draw(true); seatFronts(ctx); draw(false);
}
function tvMatch(c, t, o = {}) { const pan = 260 * t; pitchLevel(c, t, { camX: 600 + pan, cheer: .3, crowdBlur: 2 });
  const mx = 1000 + Math.sin(t * .6) * 70, nx = 560 + Math.sin(t * .6 - .7) * 50;
  player(c, nx, 905, .92, P.ned, runCycle(runPhase(pan + nx, .92, 1.1)), 'determined', 1, t);
  player(c, mx, 950, 1.05, P.mex, runCycle(runPhase(pan + mx, 1.05)), 'determined', 1, t);
  ball2(c, mx + 110 + Math.abs(Math.sin(t * 4.2)) * 40, 948, 16, t * 8);
  scoreBug2(c, { a: 'MEX', b: 'HOL', s1: o.s1 ?? 1, s2: o.s2 ?? 1, min: o.min || "90+5'" }); if (o.label) { c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(0, 860, W, 220); text(c, o.label, W / 2, 970, { size: 130, color: o.labelCol || '#fff' }); } }
S(T.doce, (ctx, t) => {
  const k = ease(t, T.doce, T.nunca, E.sine), [hx, hy] = handheld(t, 3, 2);
  ctx.save(); cam(ctx, 1000 + hx + lerp(-30, 20, k), 560 + hy, lerp(1.0, 1.06, k));
  drawRoom(ctx, t); crtSide(ctx, t, c => tvMatch(c, t));
  famSeated(ctx, t, {});
  tvGlow(ctx, t); coffeeTable2(ctx, t);
  dog2(ctx, 1330, 975, .9, -1, t, 'sit');
  ctx.restore();
  // primer plano desenfocado: lámpara de mesa a la izquierda
  blurred(ctx, 'fgroom', 14, (x) => { x.fillStyle = '#120c08'; x.beginPath(); x.ellipse(-40, 1000, 260, 180, 0, 0, TAU); x.fill(); x.fillStyle = '#e8c890'; x.beginPath(); x.moveTo(-60, 560); x.lineTo(150, 560); x.lineTo(110, 420); x.lineTo(-20, 420); x.closePath(); x.fill(); glow(x, 50, 520, 400, 'rgba(255,190,110,.6)'); });
  grade(ctx, '#ffb070', .08); vignette(ctx, .65);
  tag(ctx, 'TÚ · 12 AÑOS', 975 + (975 - 1000) * .0, 470, t, T.doce + .25); tag(ctx, 'PAPÁ', 742, 455, t, T.papa); tag(ctx, 'TÍO', 1168, 455, t, T.tio); tag(ctx, 'ABUELO', 1590, 470, t, T.abuelo);
  stamp2(ctx, ['2014', 'TU SALA'], t, T.doce + .2, { y: 820, out: T.nunca - .6 });
  ctx.save(); ctx.fillStyle = `rgba(0,0,0,${1 - prog(t, T.doce, T.doce + .45)})`; ctx.fillRect(0, 0, W, H); ctx.restore();
});
function dog2(ctx, x, y, s, dir, t, mode, k = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const run = mode === 'run', bob = run ? Math.abs(Math.sin(t * 20)) * 7 : Math.sin(t * 2) * 1.2;
  ctx.save(); ctx.scale(1, .18); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.arc(0, 0, 60, 0, TAU); ctx.fill(); ctx.restore();
  ctx.translate(0, -bob);
  const body = '#6b4024', dark = '#3e2312';
  const legs = run ? [Math.sin(t * 20) * 35, -Math.sin(t * 20) * 35] : [0, 0];
  ctx.strokeStyle = dark; ctx.lineCap = 'round'; ctx.lineWidth = 10;
  [[-30, legs[1]], [28, legs[0]]].forEach(([lx, a]) => { ctx.beginPath(); ctx.moveTo(lx, -32); ctx.lineTo(lx + Math.sin(D2R(a)) * 30, -32 + Math.cos(D2R(a)) * 30); ctx.stroke(); });
  ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(0, -44, 46, 22, 0, 0, TAU); ctx.fill();
  ctx.strokeStyle = body; [[-20, legs[0]], [36, legs[1]]].forEach(([lx, a]) => { ctx.beginPath(); ctx.moveTo(lx, -32); ctx.lineTo(lx + Math.sin(D2R(a)) * 30, -32 + Math.cos(D2R(a)) * 30); ctx.stroke(); });
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-42, -50); ctx.quadraticCurveTo(-66, -66 + Math.sin(t * (run ? 22 : 9)) * 10, -64, -84); ctx.stroke();
  ctx.save(); ctx.translate(46, -64 + (run ? -4 : 0)); ctx.rotate(run ? -.15 : 0);
  ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(0, 0, 24, 21, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(20, 8, 15, 10, 0, 0, TAU); ctx.fill();
  ctx.fillStyle = dark; ctx.beginPath(); ctx.ellipse(-10, -6, 10, 19, .45 + Math.sin(t * 3) * .05, 0, TAU); ctx.fill();
  ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(33, 6, 5, 0, TAU); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(10, -4, 4.5, 0, TAU); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(11.5, -4, 2.4, 0, TAU); ctx.fill();
  ctx.restore();
  ctx.restore();
}
// ===== 10 · el abuelo (primer plano, luz de la tele) =====
S(T.nunca, (ctx, t) => {
  const k = prog(t, T.nunca, T.sigan), [hx, hy] = handheld(t, 2, 5);
  ctx.save(); cam(ctx, 1505 + hx, 600 + hy, lerp(2.15, 2.35, k));
  ctx.drawImage(roomBG(5), -140, -80);
  fam(ctx, 'abu', 1610, 836, 1.16, POSE.sitFrontFwd, 'neutral', t, { look: [-5, -1] }); seatFronts(ctx);
  ctx.restore();
  tvGlow(ctx, t, '120,190,255', 1.3);
  // la foto de 1986 enfocada al fondo-izquierda (rack focus sutil)
  const kq = ease(t, T.quinto - .1, T.quinto + .6, E.outQuint);
  if (kq > 0) { ctx.save(); ui(ctx); ctx.globalAlpha = kq; if (V) ctx.translate(uxC(960) - 470, uyB(780) - 470); text(ctx, 'QUINTO PARTIDO', 470, 470, { size: 96, color: 'rgba(255,255,255,0)', stroke: 3, strokeCol: P.yel, ls: 6 }); text(ctx, 'NUNCA LO HA VISTO', 470, 560, { size: 30, font: 'Montserrat', weight: 900, color: '#fff', ls: 10 }); ctx.restore(); }
  grade(ctx, '#4080c0', .08); vignette(ctx, .8);
});
// ===== 11 · la tele: ¡sigue el juego! =====
S(T.sigan, (ctx, t) => {
  const k = prog(t, T.sigan, T.grita);
  ctx.fillStyle = '#0d1113'; ctx.fillRect(0, 0, W, H);
  ctx.save(); cam(ctx, 960, 540, lerp(1.0, 1.08, k));
  ctx.fillStyle = '#26272c'; rr(ctx, 230, 110, 1460, 880, 60); ctx.fill(); ctx.fillStyle = '#1a1b1f'; rr(ctx, 270, 140, 1380, 820, 50); ctx.fill();
  const [c, x] = tmp('tvbig');
  pitchLevel(x, t, { camX: 1400, cheer: .4, crowdBlur: 4 });
  const w = ease(t, T.sigan + .25, T.sigan + .7, E.out);
  figure(x, { x: 960, y: 1150, s: 2.4, dir: 1, pose: mixPose(POSE.stand, { lean: -2, head: -4, shB: 78 + Math.sin(t * 7) * 6 * w, elB: 10, shF: 84 + Math.sin(t * 7 + .4) * 6 * w, elF: 8, hipB: 3, knB: -2, hipF: -3, knF: -2, sit: 0 }, w), face: 'determined', t, seed: 3, shirt: P.ref, shorts: '#111111', rim: RIM_STADIUM, light: [-.5, -1] });
  scoreBug2(x, { a: 'MEX', b: 'HOL', s1: 1, s2: 1, min: "90+4'" });
  x.fillStyle = 'rgba(0,0,0,.55)'; x.fillRect(0, 880, W, 200); text(x, w > .5 ? '¡SIGUE EL JUEGO!' : 'NO HAY PENAL', W / 2, 980, { size: 120, color: P.yel, ls: 4 });
  ctx.save(); rr(ctx, 300, 165, 1320, 770, 70); ctx.clip(); ctx.drawImage(c, 300, 165, 1320, 770 * (1080 / 1080) * 1.0);
  ctx.globalAlpha = .14; ctx.fillStyle = '#000'; for (let yy = 165; yy < 935; yy += 5) ctx.fillRect(300, yy, 1320, 2); ctx.globalAlpha = 1;
  const g = ctx.createRadialGradient(960, 550, 300, 960, 550, 900); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = g; ctx.fillRect(300, 165, 1320, 770);
  const g2 = ctx.createLinearGradient(300, 165, 1100, 900); g2.addColorStop(0, 'rgba(255,255,255,.16)'); g2.addColorStop(.3, 'rgba(255,255,255,0)'); ctx.fillStyle = g2; ctx.fillRect(300, 165, 1320, 770);
  // reflejo de la familia en el vidrio
  ctx.globalAlpha = .07; fam(ctx, 'tio', 1400, 1080, 1.4, POSE.sitFront, 'neutral', t, { dir: 1 }); fam(ctx, 'kid', 1150, 1080, 1.4, POSE.sitFrontFwd, 'neutral', t, { dir: 1 });
  ctx.restore(); ctx.restore();
  glow(ctx, 960, 540, 1000, 'rgba(120,190,255,.12)'); vignette(ctx, .7);
});
// ===== 12 · el tío grita, el perro se esconde =====
S(T.grita, (ctx, t) => {
  const hpT = t < T.mesa + .45 ? hop(t, T.grita + .28, .5, 58) : { y: 0, sq: 0, crouch: 0 }, j = hpT.y, [sx, sy] = shakeV(t, t < T.perro ? 6 : 1.2), [hx, hy] = handheld(t, 3, 4);
  ctx.save(); ctx.translate(sx, sy); cam(ctx, 1080 + hx, 610 + hy, 1.28);
  drawRoom(ctx, t); crtSide(ctx, t, c => tvMatch(c, t));
  const tioPose = poseAt(t, [[T.grita - .05, POSE.sitFront], [T.grita + .25, POSE.cheer], [T.mesa + .3, POSE.cheer], [T.mesa + .8, POSE.fists]]);
  famSeated(ctx, t, { tio: t > T.grita + .28 ? crouchOf(tioPose, hpT.crouch) : tioPose, tioF: 'shout', tioJ: j, tioSq: hpT.sq, dadF: 'shock', kidF: 'laugh', abuF: 'shock', dad: POSE.sitFrontFwd });
  tvGlow(ctx, t);
  const dk = ease(t, T.perro - .1, T.perro + .8, E.inOut);
  if (dk < .98) dog2(ctx, lerp(1330, 990, dk), 975, .9, -1, t, dk > 0 ? 'run' : 'sit');
  coffeeTable2(ctx, t);
  if (dk >= .98) { ctx.fillStyle = '#6b4024'; ctx.beginPath(); ctx.ellipse(1000, 968, 30, 12, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(988, 948, 5, 0, TAU); ctx.arc(1010, 948, 5, 0, TAU); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(987, 949, 2.6, 0, TAU); ctx.arc(1009, 949, 2.6, 0, TAU); ctx.fill(); }
  ctx.restore();
  // líneas de grito
  if (t < T.perro + .2) { const k = (t - T.grita) * 3 % 1; ctx.save(); ctx.strokeStyle = `rgba(255,255,255,${.7 * (1 - k)})`; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { const a = -PI / 2 + (i - 2) * .35; const r0 = 120 + k * 60, r1 = r0 + 40; ctx.beginPath(); ctx.moveTo(1185 + Math.cos(a) * r0 + 40, 330 - j * 1.28 + Math.sin(a) * r0); ctx.lineTo(1185 + Math.cos(a) * r1 + 40, 330 - j * 1.28 + Math.sin(a) * r1); ctx.stroke(); } ctx.restore(); }
  grade(ctx, '#ffb070', .08); vignette(ctx, .6);
});
// ===== 13 · el dato: el quinto partido =====
S(T.noPasaba, (ctx, t) => {
  blurred(ctx, 'databg', 14, x => { cam(x, 1000, 560, 1.1); drawRoom(x, t); }); ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.65)'; ctx.fillRect(0, 0, W, H); ctx.restore();
  glow(ctx, W / 2, 560, 900, 'rgba(30,140,80,.25)');
  ctx.save(); uiCenter(ctx, .97);
  const yrs = [['1986', 'CUARTOS', 1], ['1994', 'OCTAVOS', 0], ['1998', 'OCTAVOS', 0], ['2002', 'OCTAVOS', 0], ['2006', 'OCTAVOS', 0], ['2010', 'OCTAVOS', 0], ['2014', '?', 2]];
  const x0 = 260, x1 = 1660, y = 600;
  const kl = ease(t, T.noPasaba + .2, T.local + .4, E.inOut);
  text(ctx, 'EL QUINTO PARTIDO', W / 2, 300, { size: 92, color: '#fff', alpha: ease(t, T.noPasaba, T.noPasaba + .5), ls: 4, shadow: 'rgba(0,0,0,.6)' });
  text(ctx, 'MÉXICO EN LOS MUNDIALES', W / 2, 380, { size: 26, font: 'Montserrat', weight: 800, color: 'rgba(255,255,255,.6)', alpha: ease(t, T.noPasaba + .2, T.noPasaba + .7), ls: 10 });
  ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, kl), y); ctx.stroke();
  yrs.forEach(([yr, lab, st], i) => {
    const xi = lerp(x0, x1, i / (yrs.length - 1)), ti = T.noPasaba + .3 + i * ((T.local - T.noPasaba) / 7), k = ease(t, ti, ti + .35, E.back); if (k <= 0) return;
    const col = st === 1 ? P.mexL : st === 2 ? P.yel : '#ff4a3a';
    ctx.save(); ctx.translate(xi, y); ctx.scale(k, k);
    glow(ctx, 0, 0, 70, st === 2 ? 'rgba(255,210,63,.5)' : st === 1 ? 'rgba(44,196,122,.5)' : 'rgba(255,74,58,.35)', st === 2 ? .7 + .3 * Math.sin(t * 5) : 1);
    ctx.fillStyle = '#0d0f16'; ctx.beginPath(); ctx.arc(0, 0, 30, 0, TAU); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke();
    text(ctx, st === 1 ? '✓' : st === 2 ? '?' : '✕', 0, 2, { size: 30, font: 'Montserrat', weight: 900, color: col });
    text(ctx, yr, 0, -70, { size: 44, color: '#fff', ls: 2 }); text(ctx, lab, 0, 74, { size: 20, font: 'Montserrat', weight: 900, color: col, ls: 4 });
    ctx.restore();
  });
  const kk = ease(t, T.local - .2, T.local + .4); if (kk > 0) text(ctx, 'ÚLTIMO QUINTO PARTIDO: 1986, EN CASA', W / 2, 800, { size: 28, font: 'Montserrat', weight: 900, color: P.yel, alpha: kk, ls: 6 });
  ctx.restore();
  vignette(ctx, .7);
});
// ===== 14 · 113': tiro de esquina y cabezazo =====
const HEAD = {
  set: { lean: 10, head: -14, shB: -34, elB: 36, shF: -24, elF: 40, hipB: 18, knB: -30, hipF: -12, knF: -26, sit: 0 },
  air: { lean: -16, head: -26, shB: 112, elB: 48, shF: 82, elF: 60, hipB: -14, knB: -78, hipF: 26, knF: -70, sit: 0 },
  hit: { lean: 20, head: 16, shB: 70, elB: 40, shF: 40, elF: 70, hipB: -8, knB: -60, hipF: 18, knF: -50, sit: 0 },
  land: { lean: 10, head: 0, shB: 140, elB: 20, shF: 150, elF: 18, hipB: 10, knB: -12, hipF: -8, knF: -10, sit: 0 },
};
function jumpArc(t, tUp, tPeak, tDown, hgt) { // anticipación, despegue, cima en tPeak, aterrizaje con amortiguación
  if (t < tUp) { const c = smooth01((t - (tUp - .22)) / .22); return { y: 0, crouch: c, sq: -.06 * c }; }
  if (t < tDown) { const a = t < tPeak ? .5 * E.out((t - tUp) / (tPeak - tUp)) : .5 + .5 * E.in((t - tPeak) / (tDown - tPeak)); return { y: hgt * Math.sin(a * PI), crouch: 0, sq: .05 * (1 - Math.sin(a * PI)) }; }
  const c = Math.sin(clamp((t - tDown) / .3) * PI); return { y: 0, crouch: c * .8, sq: -.07 * c };
}
S(T.m113, (ctx, t) => {
  const [hx, hy] = handheld(t, 4, 6), k = prog(t, T.esquina + .1, T.cabezazo);
  const C = T.cabezazo;
  ctx.save(); cam(ctx, 1080 + hx, 600 + hy, lerp(1.06, 1.16, ease(t, T.m113, T.gol113)));
  pitchLevel(ctx, t, { camX: 1800, cheer: .3 });
  // dos jugadores al fondo (más chicos), separados de los protagonistas
  player(ctx, 560, 880, .9, P.ned, POSE.hips, 'determined', 1, t, { look: [3, -2] });
  player(ctx, 760, 872, .86, P.mex, POSE.relaxed, 'determined', 1, t, { look: [4, -3] });
  // defensor holandés (atrás, a la derecha): salta tarde y más bajo
  const jd = jumpArc(t, C - .2, C + .1, C + .42, 70);
  const dPose = crouchOf(t < C - .2 ? HEAD.set : t < C + .42 ? mixPose(HEAD.set, HEAD.air, E.out(clamp((t - C + .2) / .3))) : mixPose(HEAD.air, POSE.sad, E.out(clamp((t - C - .42) / .5))), jd.crouch);
  player(ctx, 1490, 915, 1.22, P.ned, dPose, t > C ? 'shock' : 'determined', -1, t, { jump: jd.y * 1.22, squash: jd.sq, look: [-4, -6] });
  // rematador mexicano: anticipación, salto, golpe de cabeza y festejo
  const ja = jumpArc(t, C - .38, C, C + .4, 96);
  const air = clamp((t - C + .38) / .38), hit = clamp((t - C + .06) / .14), land = clamp((t - C - .4) / .35);
  let aPose = t < C - .38 ? HEAD.set : mixPose(HEAD.set, HEAD.air, E.out(air)); if (hit > 0) aPose = mixPose(aPose, HEAD.hit, E.out(hit)); if (land > 0) aPose = mixPose(aPose, HEAD.land, E.inOut(land));
  aPose = crouchOf(aPose, ja.crouch);
  player(ctx, 1190, 975, 1.5, P.mex, aPose, hit > .3 ? 'shout' : 'determined', -1, t, { jump: ja.y * 1.5, squash: ja.sq, look: [-5, -6], acc: { num: '9' } });
  // balón: centro desde la esquina, golpe de cabeza, hacia la portería
  const headX = 1190 - 14 * 1.5, headY = 975 - 330 * 1.5 - ja.y * 1.5;
  if (t < C) { const bx = lerp(-80, headX - 40, k), by = lerp(870, headY - 10, k) - Math.sin(k * PI) * 380; ball2(ctx, bx, by, 18, t * 14, 10, -6); }
  else { const kb = prog(t, C, T.gol113); ball2(ctx, lerp(headX - 50, 2050, kb), lerp(headY, headY + 200, kb), 18, t * 14, 22, 3); }
  ctx.restore();
  grassForeground(ctx, t, 1800, 9);
  grade(ctx, '#203a6a', .16); vignette(ctx, .7);
  scoreBug2(ctx, { a: 'MEX', b: 'HOL', s1: 1, s2: 1, min: "113'" });
});
// ===== 15 · ¡gol! 2-1 =====
S(T.gol113 - .25, (ctx, t) => {
  const t0 = T.gol113 - .25;
  goalPOV(ctx, t, t0, { keeper: P.ned, keeperSide: -1, tx: 1320, ty: 430, dur: .28 });
  grade(ctx, '#ffb070', .1); vignette(ctx, .55);
  bigTitle(ctx, '¡GOL!', t, t0 + .3, { y: 310, size: 230 });
  scoreBug2(ctx, { a: 'MEX', b: 'HOL', s1: t > t0 + .28 ? 2 : 1, s2: 1, min: "113'", flash: t > t0 + .28 });
});
// ===== 16 · el abuelo brinca =====
S(T.levanta - .1, (ctx, t) => {
  const [hx, hy] = handheld(t, 3, 9), k = prog(t, T.levanta, T.cuartos);
  ctx.save(); cam(ctx, lerp(1300, 1440, ease(t, T.levanta, T.brinca)) + hx, 590 + hy, lerp(1.35, 1.6, ease(t, T.levanta, T.cuartos)));
  drawRoom(ctx, t); crtSide(ctx, t, c => tvMatch(c, t, { s1: 2, s2: 1, min: "114'" }));
  const st = ease(t, T.levanta + .1, T.levanta + 1.3, E.inOut);
  const jumping = t > T.brinca - .15, hpA = hop(t, T.brinca - .15, .56, 105), jb = jumping ? hpA.y : 0, hpTi = hop(t, T.levanta + .1, .5, 34);
  famSeated(ctx, t, { noAbu: true, dad: POSE.sitFrontCheer, kid: POSE.sitFrontCheer, dadF: 'shout', kidF: 'laugh', tioF: 'shout', tio: crouchOf(POSE.cheer, hpTi.crouch), tioJ: hpTi.y, tioSq: hpTi.sq });
  const abuPose = jumping ? crouchOf(POSE.cheer, hpA.crouch) : mixPose(POSE.sitFront, POSE.stand, st);
  if (st < .5) seatFronts(ctx); fam(ctx, 'abu', lerp(1610, 1590, st), 836, 1.16, abuPose, jumping ? 'laugh' : (st > .2 ? 'shock' : 'neutral'), t, { jump: jb, squash: jumping ? hpA.sq : 0, look: [-3, -2] });
  tvGlow(ctx, t); coffeeTable2(ctx, t);
  ctx.restore();
  if (jumping) { const r = rnd(3); ctx.save(); for (let i = 0; i < 90; i++) { const x = r() * W + Math.sin(t * 2 + i) * 40, y = (r() * H * 1.5 + (t - T.brinca) * (240 + r() * 200)) % (H + 100) - 50, rot = t * (2 + r() * 3) + i; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, Math.abs(Math.sin(rot * 1.3)) + .2); ctx.fillStyle = ['#1f9e57', '#f2eee6', '#d33b44', '#ffcf3f'][i % 4]; ctx.fillRect(-9, -5, 18, 10); ctx.restore(); } ctx.restore(); }
  grade(ctx, '#ffb070', .12); vignette(ctx, .55);
});
