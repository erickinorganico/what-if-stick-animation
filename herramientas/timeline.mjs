// Exporta las anclas de la voz (T, TB, TC…), DUR y los subtítulos (CAPS) a proyecto/timeline.json.
// El script de audio del episodio lee este archivo para clavar música y efectos a las palabras.
// uso: node herramientas/timeline.mjs <episodio>
import fs from 'fs'; import path from 'path';
import { resolverEpisodio, abrir, args } from './lib/pagina.mjs';

const { pos } = args();
const ep = resolverEpisodio(pos[0] || 'ep02');
const { navegador, pagina, errores } = await abrir(ep.html);
if (errores.length) { console.error(errores.join('\n')); process.exit(1); }
const o = await pagina.evaluate(() => {
  const extra = ['TB', 'TC', 'TD'].map(k => { try { return eval(k); } catch { return {}; } }); // anclas extra por parte del guion (const globales)
  return { T: Object.assign({}, window.T, ...extra), DUR: window.DUR, VO: typeof VO !== 'undefined' ? VO : 0.5, CAPS: window.CAPS };
});
const out = path.join(ep.proyecto, 'timeline.json');
fs.writeFileSync(out, JSON.stringify(o, null, 1));
console.log(`ok · ${Object.keys(o.T).length} anclas · DUR ${o.DUR.toFixed(2)} s → ${out}`);
await navegador.close();
