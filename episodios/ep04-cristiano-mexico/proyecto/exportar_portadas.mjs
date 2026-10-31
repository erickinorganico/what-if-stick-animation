// Exporta las portadas del ep04 (src/portadas.js) a videos/<slug>/portadas/. uso: node exportar_portadas.mjs [salida]
import { chromium } from 'playwright'; import path from 'path'; import fs from 'fs'; import { pathToFileURL, fileURLToPath } from 'url';
const aqui = path.dirname(fileURLToPath(import.meta.url)), out = path.resolve(process.argv[2] || path.join(aqui, '..', '..', '..', 'videos', 'ep04-cristiano-mexico', 'portadas'));
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = []; p.on('pageerror', e => errs.push(String(e)));
await p.goto(pathToFileURL(path.join(aqui, 'index.html')).href + '?clean=1'); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
await p.addScriptTag({ path: path.join(aqui, 'src', 'portadas.js') });
const piezas = JSON.parse(process.env.PIEZAS || '[["A",[],"miniatura-a"],["B",[],"miniatura-b"],["V",[],"portada-vertical"]]');
for (const [n, a, nombre] of piezas) {
  await p.evaluate(([n, a]) => window.portada(n, ...a), [n, a]);
  const [png, jpg] = await p.evaluate(() => { const c = document.getElementById('p'); let j = null; if (c.width === 1920) { const s = document.createElement('canvas'); s.width = 1280; s.height = 720; const x = s.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(c, 0, 0, 1280, 720); j = s.toDataURL('image/jpeg', .9); } else j = c.toDataURL('image/jpeg', .9); return [c.toDataURL('image/png'), j]; });
  fs.writeFileSync(path.join(out, `${nombre}.png`), Buffer.from(png.split(',')[1], 'base64'));
  fs.writeFileSync(path.join(out, `${nombre}${nombre.includes('miniatura') ? '-1280x720' : ''}.jpg`), Buffer.from(jpg.split(',')[1], 'base64'));
}
console.log(errs.join('\n') || 'ok', piezas.length, '→', out); await b.close();
