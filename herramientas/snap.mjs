// Cuadros fijos para revisar sin renderizar: tiempos sueltos o una hoja cada N segundos.
// uso: node herramientas/snap.mjs <episodio> <carpeta_salida> [--v] [--qs "noui=1"] t1 t2 ...
//      node herramientas/snap.mjs <episodio> <carpeta_salida> [--v] --hoja 4      (un cuadro cada 4 s)
import fs from 'fs'; import path from 'path';
import { resolverEpisodio, abrir, args } from './lib/pagina.mjs';

const { pos, op } = args();
const ep = resolverEpisodio(pos[0] || 'ep02'); const out = path.resolve(pos[1] || 'revision-cuadros'); fs.mkdirSync(out, { recursive: true });
const V = !!(op.v || process.env.VERT);
const { navegador, pagina, errores } = await abrir(ep.html, { vertical: V, qs: op.qs || '' });
const D = await pagina.evaluate(() => window.DUR);
let lista = pos.slice(2).map(Number);
if (op.hoja) { lista = []; for (let t = 0.25; t < D; t += +op.hoja) lista.push(+t.toFixed(2)); }
for (const t of lista) {
  try { await pagina.evaluate(t => window.render(t), t); } catch (e) { errores.push(`t=${t}: ${e.message}`); continue; }
  await pagina.screenshot({ path: path.join(out, `${V ? 'v' : 'h'}_t${t.toFixed(2).padStart(7, '0')}.jpg`), type: 'jpeg', quality: 82 });
}
console.log(`duración ${D.toFixed(2)} s · ${lista.length} cuadros en ${out}`);
if (errores.length) { console.log('ERRORES:\n' + errores.join('\n')); process.exitCode = 1; }
await navegador.close();
