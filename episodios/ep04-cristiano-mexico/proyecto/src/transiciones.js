// Transiciones con intención (kit de El Hubiera, del R4). Se carga DESPUÉS de main2.js.
// En ep.js, después de registrar las tomas: transicion(B.b29, 'whip', .42) · 'dip' (fundido a negro: salto de tiempo) · 'dissolve'.
// El corte seco sigue siendo la norma: usa 1 transición por cada 8–10 cortes, y solo con razón (tiempo, lugar, mundo alterno).
(function () {
  window.transicion = function (t0, tipo = 'dissolve', d = .5) {
    const s = SHOTS.find(q => Math.abs(q.t0 - t0) < 1e-3); if (!s) throw Error('transicion: no hay toma en ' + t0); s.tr = { type: tipo, d }; return s;
  };
  (window.TRANS_PEND || []).forEach(a => transicion(...a));
  const ORIG = drawShot, mk = () => document.createElement('canvas'), A = mk(), Bc = mk(), TT = mk(), SM = mk();
  function fit(c) { for (const cv of [A, Bc, TT]) if (cv.width !== c.canvas.width || cv.height !== c.canvas.height) { cv.width = c.canvas.width; cv.height = c.canvas.height; } SM.height = c.canvas.height; }
  function snap(cv, s, t) { const x = cv.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; x.filter = 'none'; x.fillStyle = '#000'; x.fillRect(0, 0, cv.width, cv.height); ORIG(x, s, t); return cv; }
  drawShot = function (ctx, s, t) {
    const i = SHOTS.indexOf(s), pv = SHOTS[i - 1], nx = SHOTS[i + 1];
    let tr = null, prev, next, s0;
    if (s.tr && pv && t < s.t0 + s.tr.d / 2) { tr = s.tr; prev = pv; next = s; s0 = s.t0; }
    else if (nx && nx.tr && t >= nx.t0 - nx.tr.d / 2) { tr = nx.tr; prev = s; next = nx; s0 = nx.t0; }
    if (!tr) return ORIG(ctx, s, t);
    const k = clamp((t - (s0 - tr.d / 2)) / tr.d); fit(ctx); const cw = ctx.canvas.width, ch = ctx.canvas.height;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (tr.type === 'dissolve') { snap(A, prev, t); snap(Bc, next, t); ctx.drawImage(A, 0, 0); ctx.globalAlpha = E.inOut(k); ctx.drawImage(Bc, 0, 0); }
    else if (tr.type === 'dip') { ctx.drawImage(snap(A, k < .5 ? prev : next, t), 0, 0); ctx.fillStyle = '#000'; ctx.globalAlpha = 1 - Math.abs(k - .5) * 2; ctx.fillRect(0, 0, cw, ch); }
    else { // whip: empuje continuo con desenfoque horizontal real (sin copias fantasma)
      snap(A, prev, t); snap(Bc, next, t); const e = x => E.inOutQuint(clamp(x)), x0 = -cw * e(k), v = Math.abs(-cw * e(k + 1 / 30 / tr.d) - x0) * 1920 / cw;
      const tx = TT.getContext('2d'); tx.setTransform(1, 0, 0, 1, 0, 0); tx.fillStyle = '#000'; tx.fillRect(0, 0, cw, ch); tx.drawImage(A, x0, 0); tx.drawImage(Bc, x0 + cw, 0);
      if (v > 6) { const f = Math.min(24, v / 18), w = Math.max(48, Math.round(cw / f)), sx = SM.getContext('2d'); SM.width = w; sx.filter = 'blur(1.4px)'; sx.drawImage(TT, 0, 0, cw, ch, 0, 0, w, ch); sx.filter = 'none'; ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(SM, 0, 0, w, ch, 0, 0, cw, ch); }
      else ctx.drawImage(TT, 0, 0);
    }
    ctx.restore();
  };
})();
