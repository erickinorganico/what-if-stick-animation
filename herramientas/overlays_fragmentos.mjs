// PNG transparentes de los fragmentos con la identidad v3: etiqueta "PARTE N/3", tarjetas finales y punto de progreso.
// Son genéricos del canal: ya vienen generados en herramientas/overlays/. Regenera solo si cambias el diseño.
// uso: node herramientas/overlays_fragmentos.mjs [episodio_con_marca3=ep02] [salida=herramientas/overlays]
import fs from 'fs'; import path from 'path';
import { RAIZ, resolverEpisodio, abrir, args } from './lib/pagina.mjs';
const { pos } = args();
const ep = resolverEpisodio(pos[0] || 'ep02'); const out = path.resolve(pos[1] || path.join(RAIZ, 'herramientas', 'overlays')); fs.mkdirSync(out, { recursive: true });
const { navegador, pagina } = await abrir(ep.html, { vertical: true });
const items = {
  'badge-1de3': { kind: 'badge', n: 1 }, 'badge-2de3': { kind: 'badge', n: 2 }, 'badge-3de3': { kind: 'badge', n: 3 },
  'fin-parte2': { kind: 'next', n: 2 }, 'fin-parte3': { kind: 'next', n: 3 }, 'fin-final': { kind: 'final' }, 'fin-completo': { kind: 'full' }, 'punto': { kind: 'dot' },
};
for (const [name, it] of Object.entries(items)) {
  const data = await pagina.evaluate(it => {
    const c = document.createElement('canvas'); const ctx = c.getContext('2d');
    if (it.kind === 'dot') { c.width = 18; c.height = 18; ctx.fillStyle = B3V.rosa; ctx.beginPath(); ctx.arc(9, 9, 9, 0, TAU); ctx.fill(); return c.toDataURL('image/png'); }
    c.width = 1080; c.height = 1920;
    const dim = () => { ctx.fillStyle = 'rgba(13,13,15,.84)'; ctx.fillRect(0, 301, 1080, 1349); const g = ctx.createRadialGradient(540, 930, 40, 540, 930, 640); g.addColorStop(0, 'rgba(239,233,223,.07)'); g.addColorStop(1, 'rgba(239,233,223,0)'); ctx.fillStyle = g; ctx.fillRect(0, 301, 1080, 1349); };
    const end = (txt, x, y, size) => { ctx.save(); f3(ctx, size, SERIF3, true); ctx.letterSpacing = (-size * .015) + 'px'; const w = ctx.measureText(txt).width; ctx.restore(); return x + w / 2 + size * .1; };
    const big = (lines, y0, size, dotLast = true) => { lines.forEach((ln, i) => { const y = y0 + i * size * .9; ctx.save(); f3(ctx, size, SERIF3, true); ctx.letterSpacing = (-size * .015) + 'px'; ctx.textAlign = 'center'; ctx.fillStyle = B3V.hueso; const s = dotLast && i === lines.length - 1 ? ln : ln; ctx.fillText(s, 540, y); if (dotLast && i === lines.length - 1) { const w = ctx.measureText(s).width; ctx.fillStyle = B3V.rosa; ctx.beginPath(); ctx.arc(540 + w / 2 + size * .1, y - size * .055, size * .068, 0, TAU); ctx.fill(); } ctx.restore(); }); };
    if (it.kind === 'badge') { t3(ctx, `PARTE ${it.n}/3`, 1030, 166, { size: 24, font: MONO3, align: 'right', color: 'rgba(239,233,223,.78)', ls: 3 }); ctx.save(); f3(ctx, 24, MONO3); ctx.letterSpacing = '3px'; const w = ctx.measureText(`PARTE ${it.n}/3`).width; ctx.restore(); ctx.fillStyle = B3V.rosa; ctx.beginPath(); ctx.arc(1030 - w - 18, 158, 6, 0, TAU); ctx.fill(); }
    if (it.kind === 'next') { dim(); t3(ctx, 'Continúa en la', 540, 760, { size: 76, italic: true, align: 'center', color: 'rgba(239,233,223,.8)' }); big([`parte ${it.n}`], 960, 230); mark3(ctx, 470, 1130, 10, { trunk: 9, real: 14, rise: 4.6, run: 7.5, w: .9 }); t3(ctx, 'EN EL PERFIL', 540, 1220, { size: 26, font: MONO3, align: 'center', color: B3V.huesoT, ls: 5 }); }
    if (it.kind === 'final') { dim(); big(['¿Y tú qué', 'harías?'], 820, 170, false); mark3(ctx, 470, 1130, 10, { trunk: 9, real: 14, rise: 4.6, run: 7.5, w: .9 }); t3(ctx, 'COMÉNTALO · SÍGUENOS', 540, 1220, { size: 26, font: MONO3, align: 'center', color: B3V.huesoT, ls: 5 }); }
    if (it.kind === 'full') { dim(); big(['Mira cómo', 'termina'], 820, 180); mark3(ctx, 470, 1130, 10, { trunk: 9, real: 14, rise: 4.6, run: 7.5, w: .9 }); t3(ctx, 'VIDEO COMPLETO EN EL CANAL', 540, 1220, { size: 26, font: MONO3, align: 'center', color: B3V.huesoT, ls: 5 }); }
    return c.toDataURL('image/png');
  }, it);
  fs.writeFileSync(path.join(out, `${name}.png`), Buffer.from(data.split(',')[1], 'base64'));
}
await navegador.close(); console.log('ok', Object.keys(items).length, '→', out);
