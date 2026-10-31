// Recorre la línea de tiempo llamando render(t) y lista los tiempos donde truena (antes de gastar un render largo).
// uso: node herramientas/probe.mjs <episodio> [--v] [desde=0] [hasta=DUR] [paso=0.1]
import { resolverEpisodio, abrir, args } from './lib/pagina.mjs';

const { pos, op } = args();
const ep = resolverEpisodio(pos[0] || 'ep02');
const { navegador, pagina, errores } = await abrir(ep.html, { vertical: !!(op.v || process.env.VERT) });
const D = await pagina.evaluate(() => window.DUR);
const [a, z, st] = [+(pos[1] ?? 0), +(pos[2] ?? D), +(pos[3] ?? 0.1)];
const malos = await pagina.evaluate(([a, z, st]) => { const bad = []; for (let t = a; t < z; t += st) { try { window.render(t); } catch (e) { bad.push(t.toFixed(2) + ' ' + String(e.message).slice(0, 140)); } } return bad; }, [a, z, st]);
console.log(`${ep.slug} · ${a}–${z.toFixed(2)} s cada ${st} s · errores de carga: ${errores.length} · cuadros con error: ${malos.length}`);
if (errores.length) console.log(errores.join('\n'));
if (malos.length) console.log(malos.slice(0, 40).join('\n'));
process.exitCode = errores.length || malos.length ? 1 : 0;
await navegador.close();
