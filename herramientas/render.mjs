// Render reanudable por bloques: cuadro a cuadro con Playwright → x264 (crf 17) → bloques de 5 s → un solo <formato>_raw.mp4
// v2 (29 oct 2026): los cuadros se codifican a JPEG dentro del navegador en lotes (canvas.toBlob) en vez de pantallazos,
// y x264 usa preset veryfast para el crudo (el final se recodifica igual). ~2.5× más rápido con la misma imagen.
// uso: node herramientas/render.mjs <episodio> [--formato h|v] [--workers N] [--bloque 150] [--hasta SEG] [--salida DIR] [--lote 10] [--preset veryfast] [--pantallazo]
//   --workers por defecto: la mitad de los núcleos (mínimo 2). --pantallazo usa el método anterior (page.screenshot).
//   <episodio>: "ep02", "episodios/ep02-mexico-campeon" o su carpeta proyecto/
//   Si se interrumpe, vuelve a correr el mismo comando: salta los bloques terminados (escritura atómica .tmp → .mp4).
import { spawn } from 'child_process'; import path from 'path'; import fs from 'fs'; import os from 'os';
import { chromium } from 'playwright';
import { RAIZ, resolverEpisodio, abrir, args } from './lib/pagina.mjs';

const { pos, op } = args();
const ep = resolverEpisodio(pos[0] || 'ep02');
const formato = op.formato === 'v' || op.v ? 'v' : 'h', V = formato === 'v';
const FPS = 30, CH = +(op.bloque || 150), NW = Math.max(1, +(op.workers || Math.max(2, Math.floor(os.cpus().length / 2)))), CRF = String(op.crf || 17);
const LOTE = +(op.lote || 10), PRESET = String(op.preset || 'veryfast'), PANT = !!op.pantallazo, Q = .93;
const hasta = op.hasta ? +op.hasta : null;
const base = op.salida ? path.resolve(op.salida) : path.join(RAIZ, 'render', ep.slug, hasta ? `prueba-${hasta}s` : '');
const dirBloques = path.join(base, `bloques-${formato}`); fs.mkdirSync(dirBloques, { recursive: true });
const final = path.join(base, `${formato}_raw.mp4`);

const nav = await chromium.launch();
const pags = []; for (let i = 0; i < NW; i++) pags.push(await abrir(ep.html, { vertical: V, navegador: nav }));
const errs = pags.flatMap(p => p.errores); if (errs.length) { console.error('Errores en la página:\n' + errs.join('\n')); await nav.close(); process.exit(1); }
const D = await pags[0].pagina.evaluate(() => window.DUR);
const N = Math.round((hasta ? Math.min(hasta, D) : D) * FPS), NC = Math.ceil(N / CH);
console.log(`${ep.slug} · ${V ? '9:16' : '16:9'} · ${(N / FPS).toFixed(2)} s · ${N} cuadros · ${NC} bloques · ${NW} workers`);

const t0 = Date.now(); let hechos = 0;
async function worker(wi, page) {
  for (let c = wi; c < NC; c += NW) {
    const out = path.join(dirBloques, `${formato}_${String(c).padStart(3, '0')}.mp4`);
    if (fs.existsSync(out)) { hechos++; continue; }
    const tmp = out.replace(/\.mp4$/, '.tmp.mp4'); const f0 = c * CH, f1 = Math.min(N, f0 + CH);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', PRESET, '-crf', CRF, '-pix_fmt', 'yuv420p', '-r', String(FPS), '-f', 'mp4', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });
    const cerrado = new Promise(r => ff.on('close', r));
    if (PANT) for (let f = f0; f < f1; f++) {
      await page.evaluate(t => window.render(t), f / FPS);
      const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    else for (let f = f0; f < f1; f += LOTE) {
      // lote de cuadros: render + JPEG dentro del navegador, una sola ida y vuelta
      const lote = await page.evaluate(async ([f, n, fps, q]) => {
        const cv = document.querySelector('canvas'), ps = [];
        for (let i = 0; i < n; i++) { window.render((f + i) / fps); ps.push(new Promise(r => cv.toBlob(b => b.arrayBuffer().then(r), 'image/jpeg', q))); }
        return (await Promise.all(ps)).map(ab => { const u = new Uint8Array(ab); let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); });
      }, [f, Math.min(LOTE, f1 - f), FPS, Q]);
      for (const b64 of lote) if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); const code = await cerrado; if (code !== 0) throw new Error(`ffmpeg falló en el bloque ${c}`);
    fs.renameSync(tmp, out); hechos++;
    const min = (Date.now() - t0) / 60000; console.log(`bloque ${c + 1}/${NC} listo · ${hechos}/${NC} · ${min.toFixed(1)} min`);
  }
}
await Promise.all(pags.map((p, i) => worker(i, p.pagina)));
await nav.close();

// unir bloques sin recomprimir
const lista = path.join(dirBloques, 'lista.txt');
fs.writeFileSync(lista, Array.from({ length: NC }, (_, c) => `file '${formato}_${String(c).padStart(3, '0')}.mp4'`).join('\n') + '\n');
const tmpF = final.replace(/\.mp4$/, '.tmp.mp4');
await new Promise((res, rej) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lista, '-c', 'copy', '-movflags', '+faststart', tmpF], { stdio: 'inherit' })
  .on('close', c => c === 0 ? res() : rej(new Error('concat falló'))));
fs.renameSync(tmpF, final);
console.log('LISTO', final);
