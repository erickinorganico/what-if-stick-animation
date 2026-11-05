// R2 · hojas de revisión en mosaico (sin render de video). Se renderiza en el navegador y se compone allí mismo.
// uso: node herramientas/hoja_r2.mjs <ep> <salida_dir> [--v] [--planos 1-92] [--por 3] [--cols 6] [--filas 4] [--tiempos t1,t2,...] [--pref nombre]
//   --planos a-b: toma cada plano (BT) y saca --por cuadros (inicio+.12, medio(s), fin-.12)
//   --tiempos: lista explícita de tiempos
import fs from 'fs'; import path from 'path';
import { resolverEpisodio, abrir, args } from './lib/pagina.mjs';
const { pos, op } = args();
const ep = resolverEpisodio(pos[0] || 'ep06'); const out = path.resolve(pos[1] || 'hojas'); fs.mkdirSync(out, { recursive: true });
const V = !!op.v; const COLS = +(op.cols || (V ? 8 : 6)), ROWS = +(op.filas || (V ? 2 : 4)), POR = +(op.por || 3);
const { navegador, pagina, errores } = await abrir(ep.html, { vertical: V, qs: op.qs || '' });
const info = await pagina.evaluate(() => ({ D: window.DUR, BT: typeof BT !== 'undefined' ? BT : [], fin: T.cierre }));
let items = [];
if (op.tiempos) items = String(op.tiempos).split(',').map(Number).map(t => ({ t, lab: t.toFixed(2) + 's' }));
else {
  const [a, b] = String(op.planos || `1-${info.BT.length}`).split('-').map(Number);
  for (let n = a; n <= b; n++) {
    const t0 = info.BT[n - 1], t1 = n < info.BT.length ? info.BT[n] : info.D;
    for (let k = 0; k < POR; k++) { const t = POR === 1 ? (t0 + t1) / 2 : t0 + .12 + (t1 - t0 - .24) * k / (POR - 1); items.push({ t, lab: `B${n} ${t.toFixed(2)}` }); }
  }
}
const per = COLS * ROWS; let hoja = 0;
for (let i = 0; i < items.length; i += per) {
  const grupo = items.slice(i, i + per);
  const url = await pagina.evaluate(([grupo, COLS, ROWS, V]) => {
    const src = document.querySelector('canvas'); const tw = V ? 270 : 480, th = V ? 480 : 270;
    const m = document.createElement('canvas'); m.width = COLS * tw; m.height = ROWS * (th + 22); const c = m.getContext('2d'); c.fillStyle = '#111'; c.fillRect(0, 0, m.width, m.height);
    grupo.forEach((g, j) => { window.render(g.t); const x = (j % COLS) * tw, y = Math.floor(j / COLS) * (th + 22); c.drawImage(src, x, y + 22, tw, th); c.fillStyle = '#ff0'; c.font = '16px monospace'; c.fillText(g.lab, x + 4, y + 16); });
    return m.toDataURL('image/jpeg', .85);
  }, [grupo, COLS, ROWS, V]);
  const f = path.join(out, `${op.pref || (V ? 'v' : 'h')}_${String(hoja).padStart(2, '0')}.jpg`); fs.writeFileSync(f, Buffer.from(url.split(',')[1], 'base64')); hoja++;
}
console.log(`${items.length} cuadros · ${hoja} hojas en ${out}` + (errores.length ? '\nERRORES:\n' + errores.join('\n') : ''));
await navegador.close();
