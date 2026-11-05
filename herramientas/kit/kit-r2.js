// Kit R2 de El Hubiera v1.1 (ep06 R2, 31 oct 2026) · OPT-IN POR EPISODIO.
// Cargar DESPUÉS de direccion.js y ANTES del primer archivo de tomas. Sin opt-in no redefine nada del motor:
// sólo añade nombres nuevos (tramo, camTramos, dosManos, brazoInserto, fondoVivo) si no existen.
// Opt-in (en index.html del episodio, antes de cargar este archivo):
//   <script>window.KIT_R2 = { camara: true, deriva: true };</script>
//   camara: cam() acotado al mundo con z ≥ 1 (sin franjas negras laterales)
//   deriva: fondoVivo() deriva lento y ui()/uiCenter() reaplican la deriva (gráficos sin congelados)
// Episodios cerrados: no se tocan. Probado sin opt-in contra ep04 (cuadros idénticos byte a byte) — ver PRUEBAS.md.
(function () {
  const OPT = Object.assign({ camara: false, deriva: false }, window.KIT_R2 || {});
  const def = (n, f) => { if (typeof window[n] === 'undefined') window[n] = f; else console.warn('kit-r2: ya existe ' + n + ', no se redefine'); };
  if (OPT.camara) { const CAM0 = cam; cam = function (ctx, cx, cy, z, rot = 0) { if (z >= 1) { cx = clamp(cx, 960 / z, 1920 - 960 / z); cy = clamp(cy, 540 / z, 1080 - 540 / z); } return CAM0(ctx, cx, cy, z, rot); }; }
  def('fondoVivo', function (ctx, t, seed = 3, calido = .1) {
    fondoMarca(ctx, t, seed); bokeh(ctx, t, 10, seed + 5, 'rgba(255,220,180,1)', 8, 26, calido);
    if (!OPT.deriva) return;
    const z = 1 + .012 * Math.sin(t * .7), dx = 7 * Math.sin(t * .9 + seed), dy = 4 * Math.cos(t * .8 + seed);
    ctx.translate(960 + dx, 540 + dy); ctx.scale(z, z); ctx.translate(-960, -540); window.__drift = [dx, dy, z];
  });
  if (OPT.deriva) { const UI0 = ui; ui = function (ctx) { UI0(ctx); const d = window.__drift; if (d) { const cx = UW() / 2, cy = UH() / 2; ctx.translate(cx + d[0], cy + d[1]); ctx.scale(d[2], d[2]); ctx.translate(-cx, -cy); } }; }
  def('tramo', (t, cortes) => { let i = 0; cortes.forEach((c, j) => { if (t >= c) i = j + 1; }); return i; });
  def('camTramos', function (ctx, t, t0, t1, cortes, specs) { const i = tramo(t, cortes), a = i ? cortes[i - 1] : t0, b = i < cortes.length ? cortes[i] : t1; return camara(ctx, t, a, b, specs[Math.min(i, specs.length - 1)]); });
  def('dosManos', (base, o, f, b) => armTo(armTo({ ...base }, 'F', o, f), 'B', o, b));
  def('brazoInserto', function (ctx, x0, y0, x1, y1, manga = '#1d2230', piel = '#16141a', w = 54) {
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = manga; ctx.lineWidth = w; const mx = lerp(x0, x1, .55) + 60, my = lerp(y0, y1, .55) + 40;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(mx, my, x1, y1); ctx.stroke(); ctx.fillStyle = piel; ctx.beginPath(); ctx.arc(x1, y1, w * .42, 0, TAU); ctx.fill(); ctx.restore();
  });
  window.KIT_R2_ACTIVO = OPT;
})();
// Con deriva, el sh() del episodio debe limpiar la deriva al iniciar cada plano:
// const sh = (n, fn, vx = 960) => S(BT[n - 1], (ctx, t) => { window.__drift = null; fn(ctx, t, BT[n - 1], t1Of(n - 1)); }, …);
