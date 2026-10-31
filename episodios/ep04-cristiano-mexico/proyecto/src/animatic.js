// Animatic automático (herramientas/esqueleto.py): una tarjeta por beat que aún no tiene toma propia.
// Una toma real "cubre" un beat si empieza dentro de él o si empezó hace menos de ANIMATIC_MAX s. Para quitar el animatic: borra este <script>.
(function () {
  const MAX = window.ANIMATIC_MAX || 6, reales = SHOTS.map(s => s.t0).sort((a, b) => a - b);
  const card = b => (ctx, t) => {
    ctx.fillStyle = '#0d0d0f'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
    const k = ease(t, b.t0, b.t0 + .25, E.out), p = clamp((t - b.t0) / (b.t1 - b.t0));
    ctx.save(); ctx.globalAlpha = k;
    t3(ctx, `${b.id.toUpperCase()} · ${b.t0.toFixed(2)} s · ${b.dur.toFixed(1)} s`, 960, 330, { size: 26, font: MONO3, align: 'center', color: B3V.huesoT, ls: 4 });
    t3(ctx, b.plano.toUpperCase(), 960, 380, { size: 22, font: MONO3, align: 'center', color: B3V.rosaTxt, ls: 4 });
    const pal = b.texto.split(' '), lines = [[]]; let w = 0; ctx.font = 'italic 64px "Instrument Serif"';
    pal.forEach(x => { const pw = ctx.measureText(x + ' ').width; if (w + pw > 1300 && lines[lines.length - 1].length) { lines.push([]); w = 0; } lines[lines.length - 1].push(x); w += pw; });
    lines.forEach((l, i) => t3(ctx, l.join(' '), 960, 520 + i * 78 - (lines.length - 1) * 39, { size: 64, italic: true, align: 'center' }));
    ctx.fillStyle = 'rgba(239,233,223,.18)'; ctx.fillRect(560, 760, 800, 3); ctx.fillStyle = B3V.rosa; ctx.fillRect(560, 760, 800 * p, 3);
    ctx.restore();
  };
  BEATS.forEach(b => {
    const dentro = reales.some(r => r >= b.t0 - .05 && r < b.t1 - .05);
    const previa = reales.filter(r => r < b.t0 - .05).pop();
    const cubierta = dentro || (previa != null && b.t0 - previa < MAX && previa > 0.01);
    if (!cubierta) S(b.t0, card(b), 960);
  });
})();
