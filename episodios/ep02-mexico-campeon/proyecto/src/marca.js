// Marca del canal: EL HUBIERA (rosa mexicano + amarillo + negro). Compartido por ep01 y ep02.
window.HANDLE = window.HANDLE || '@AQUIELHUBIERASIEXISTE'; // handle del canal (una sola línea para cambiarlo)
const MK_ROSA = '#ff1f8e';
// sello (contorno o relleno)
function mkStamp(ctx, s, x, y, size, col, rot = -.08, fill = false, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.font = `${size}px Anton`; ctx.letterSpacing = size * .08 + 'px';
  const w = ctx.measureText(s).width + size * .7, hh = size * 1.35;
  if (fill) { ctx.fillStyle = col; rr(ctx, -w / 2, -hh / 2, w, hh, size * .18); ctx.fill(); text(ctx, s, 0, size * .06, { size, color: '#fff', ls: size * .08 }); }
  else { ctx.strokeStyle = col; ctx.lineWidth = size * .1; rr(ctx, -w / 2, -hh / 2, w, hh, size * .18); ctx.stroke(); text(ctx, s, 0, size * .06, { size, color: col, ls: size * .08 }); }
  ctx.restore();
}
// pastilla rosa "EL HUBIERA" para el cromo (x = centro, o borde derecho con align:'right')
function brandTag(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1);
  const size = 30 * s; ctx.font = `${size}px Anton`; ctx.letterSpacing = 3 * s + 'px';
  const pw = ctx.measureText('EL HUBIERA').width + 30 * s, ph = 46 * s, cx = o.align === 'right' ? x - pw / 2 : x;
  ctx.translate(cx, y); ctx.rotate(o.rot ?? -.025);
  ctx.fillStyle = MK_ROSA; rr(ctx, -pw / 2, -ph / 2, pw, ph, 8 * s); ctx.fill();
  text(ctx, 'EL HUBIERA', 1.5 * s, 2 * s, { size, color: '#ffffff', ls: 3 * s });
  ctx.restore();
}
// logotipo completo: EL / HUBIERA / ~NO~ SÍ EXISTE (k = escala, kTag = aparición del sello)
function mkWordmark(ctx, cx, cy, k = 1, alpha = 1, kTag = 1) {
  ctx.save(); ctx.globalAlpha *= alpha;
  text(ctx, 'EL', cx - 350 * k, cy - 205 * k, { size: 96 * k, color: '#fff', ls: 10 * k, align: 'left' });
  const size = 300 * k;
  text(ctx, 'HUBIERA', cx + size * .04, cy + size * .05, { size, color: 'rgba(0,0,0,.85)', ls: 2 });
  text(ctx, 'HUBIERA', cx, cy, { size, color: '#fff', ls: 2, stroke: size * .09, strokeCol: '#000' });
  text(ctx, 'HUBIERA', cx, cy, { size, color: '#fff', ls: 2 });
  text(ctx, 'NO', cx - 120 * k, cy + 205 * k, { size: 66 * k, color: 'rgba(255,255,255,.5)', ls: 6 * k });
  if (kTag > 0) {
    ctx.save(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 8 * k; ctx.beginPath(); ctx.moveTo(cx - 190 * k, cy + 205 * k); ctx.lineTo(cx - 190 * k + 140 * k * Math.min(1, kTag * 2), cy + 205 * k - 7 * k * Math.min(1, kTag * 2)); ctx.stroke(); ctx.restore();
    const ks = Math.max(0, Math.min(1, kTag * 2 - 1)); if (ks > 0) { ctx.save(); ctx.translate(cx + 190 * k, cy + 200 * k); const sc = 1 + (1 - ks) * .8; ctx.scale(sc, sc); mkStamp(ctx, 'SÍ EXISTE', 0, 0, 74 * k, MK_ROSA, -.08, true, ks); ctx.restore(); }
  }
  ctx.restore();
}
