// Exporta el kit de identidad v3 (logos, perfiles, banners, destacadas, miniaturas y paneles de guía) a PNG.
// uso (desde marca/generador): node kit3_export.mjs [salida=../identidad-v3] [filtro]
//   filtro: solo los nombres que lo contengan, p. ej. "miniaturas/ep03" o "perfil"
import { chromium } from 'playwright'; import path from 'path'; import fs from 'fs'; import { pathToFileURL, fileURLToPath } from 'url';
const aqui = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(process.argv[2] || path.join(aqui, '..', 'identidad-v3')); const filt = process.argv[3] || '';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
const errs = []; p.on('pageerror', e => errs.push(String(e)));
await p.goto(pathToFileURL(path.join(aqui, 'brand3.html')).href + '?clean=1'); await p.waitForFunction(() => window.READY === true);
await p.evaluate(async () => { await Promise.all(['italic 100px "Instrument Serif"', '100px "Instrument Serif"', '400 40px "Instrument Sans"', '700 40px "Instrument Sans"', '400 30px "Geist Mono"'].map(f => document.fonts.load(f))); });
const names = (await p.evaluate(() => Object.keys(KIT3))).filter(n => n.includes(filt));
for (const n of names) {
  try { await p.evaluate(n => window.kit3(n), n); const d = await p.evaluate(() => document.getElementById('c').toDataURL('image/png'));
    const f = path.join(out, `${n}.png`); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, Buffer.from(d.split(',')[1], 'base64'));
    // YouTube rechaza banners de más de 6 MB y el grano hace pesado el PNG: se entregan en JPG (2560x1440 y el mínimo de 2048x1152)
    if (n === 'youtube/youtube-banner') {
      const jpgs = await p.evaluate(() => { const c = document.getElementById('c'); const s = document.createElement('canvas'); s.width = 2048; s.height = 1152; const x = s.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(c, 0, 0, 2048, 1152);
        return [c.toDataURL('image/jpeg', .93), s.toDataURL('image/jpeg', .93)]; });
      fs.writeFileSync(path.join(out, 'youtube', 'youtube-banner-2560x1440.jpg'), Buffer.from(jpgs[0].split(',')[1], 'base64'));
      fs.writeFileSync(path.join(out, 'youtube', 'youtube-banner-2048x1152.jpg'), Buffer.from(jpgs[1].split(',')[1], 'base64'));
    } }
  catch (e) { errs.push(n + ': ' + e.message.slice(0, 300)); }
}
console.log(errs.join('\n') || 'ok', names.length, '→', out); await b.close();
