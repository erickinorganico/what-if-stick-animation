// Abre el index.html de un episodio en Chromium (Playwright) listo para render(t). Funciona en Windows, macOS y Linux.
import { chromium } from 'playwright';
import { pathToFileURL, fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

// Acepta: ruta a la carpeta del episodio, a su carpeta proyecto/, a un .html, o un prefijo ("ep02").
export function resolverEpisodio(ref = 'ep02') {
  let p = path.resolve(ref);
  if (!fs.existsSync(p)) {
    const base = path.join(RAIZ, 'episodios');
    const hit = fs.readdirSync(base).filter(d => d.startsWith(ref) && fs.existsSync(path.join(base, d, 'episodio.json'))).sort()[0];
    if (!hit) throw new Error(`No encuentro el episodio "${ref}"`);
    p = path.join(base, hit);
  }
  let html = p;
  if (fs.statSync(p).isDirectory()) html = fs.existsSync(path.join(p, 'proyecto', 'index.html')) ? path.join(p, 'proyecto', 'index.html') : path.join(p, 'index.html');
  const proyecto = path.dirname(html);
  const carpeta = path.basename(proyecto) === 'proyecto' ? path.dirname(proyecto) : proyecto;
  let cfg = {}; try { cfg = JSON.parse(fs.readFileSync(path.join(carpeta, 'episodio.json'), 'utf8')); } catch { }
  return { html, proyecto, carpeta, slug: cfg.slug || path.basename(carpeta), cfg };
}

export async function abrir(html, { vertical = false, qs = '', navegador = null } = {}) {
  const b = navegador || await chromium.launch();
  const p = await b.newPage({ viewport: vertical ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 } });
  const errores = []; p.on('pageerror', e => errores.push(String(e))); p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  const query = [vertical ? 'v=1' : '', qs].filter(Boolean).join('&');
  await p.goto(pathToFileURL(html).href + (query ? '?' + query : ''));
  await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 }).catch(() => errores.push('READY no llegó en 60 s (¿falta una fuente o hay un error de JS?)'));
  return { navegador: b, pagina: p, errores };
}

// argumentos estilo --clave valor / --bandera (las banderas conocidas nunca se comen el siguiente valor)
const BANDERAS = new Set(['v', 'vertical', 'force']);
export function args(argv = process.argv.slice(2)) {
  const pos = [], op = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { const k = a.slice(2); const v = argv[i + 1]; if (BANDERAS.has(k) || v === undefined || v.startsWith('--')) op[k] = true; else { op[k] = v; i++; } }
    else pos.push(a);
  }
  return { pos, op };
}
