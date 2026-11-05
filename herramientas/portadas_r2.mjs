// R2 · portadas desde cuadros reales del episodio (?noui=1) + capa de marca v3 (remate serif itálica con punto rosa, etiqueta mono, sello de marca).
// uso: node herramientas/portadas_r2.mjs <ep> <salida_dir> <specs.json>
// specs: [{ "nombre": "...", "v": false, "t": 12.3, "remate": "No cabe", "tag": "24 HORAS", "y": 0.72, "lado": "izq" }]
import fs from 'fs'; import path from 'path';
import { resolverEpisodio, abrir, args } from './lib/pagina.mjs';
const { pos } = args(); const ep = resolverEpisodio(pos[0]); const out = path.resolve(pos[1]); fs.mkdirSync(out, { recursive: true });
const specs = JSON.parse(fs.readFileSync(pos[2], 'utf8'));
for (const V of [false, true]) {
  const lista = specs.filter(s => !!s.v === V); if (!lista.length) continue;
  const { navegador, pagina } = await abrir(ep.html, { vertical: V, qs: 'noui=1' });
  for (const s of lista) {
    const url = await pagina.evaluate(s => {
      window.sello = () => {}; window.render(s.t); const src = document.querySelector('canvas'), w = src.width, h = src.height;
      const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); if (s.v) x.drawImage(src, 0, 300, 1080, 1350, -228, 0, 1536, 1920); else x.drawImage(src, 0, 0);
      const g = x.createLinearGradient(0, h * .45, 0, h); g.addColorStop(0, 'rgba(8,8,12,0)'); g.addColorStop(1, 'rgba(8,8,12,.88)'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      const izq = s.lado !== 'der', X = s.v ? w / 2 : (izq ? 90 : w - 90), al = s.v ? 'center' : (izq ? 'left' : 'right'), Y = h * (s.y || .8), size = s.v ? 150 : 170;
      x.save(); x.font = `italic ${size}px "Instrument Serif"`; x.textAlign = al; x.textBaseline = 'alphabetic'; x.shadowColor = 'rgba(0,0,0,.8)'; x.shadowBlur = 30; x.fillStyle = '#efe9df';
      const lines = s.remate.split('|'); lines.forEach((ln, i) => x.fillText(ln, X, Y + i * size * .95)); x.shadowBlur = 0;
      const last = lines[lines.length - 1], wl = x.measureText(last).width, ly = Y + (lines.length - 1) * size * .95, dx = al === 'left' ? X + wl + 22 : al === 'right' ? X + 22 : X + wl / 2 + 22;
      x.fillStyle = '#e4007c'; x.beginPath(); x.arc(dx, ly - 12, size * .11, 0, Math.PI * 2); x.fill(); x.restore();
      if (s.tag) { x.save(); x.font = `400 ${s.v ? 34 : 34}px "Geist Mono"`; x.letterSpacing = '6px'; x.textAlign = al; x.fillStyle = 'rgba(239,233,223,.85)'; const ty = s.v ? h * (s.top || .12) + 120 : Y - size - 10; x.fillText(s.tag, X, ty); x.restore(); }
      x.save(); if (typeof brandTag === 'function') { x.setTransform(1, 0, 0, 1, 0, 0); brandTag(x, s.v ? w / 2 : (izq ? w - 150 : 150), s.v ? h * (s.top || .12) : 70, s.v ? 1.6 : 1.4, { align: 'center' }); } x.restore();
      return c.toDataURL('image/png');
    }, s);
    const f = path.join(out, s.nombre + '.png'); fs.writeFileSync(f, Buffer.from(url.split(',')[1], 'base64')); console.log('ok', f);
  }
  await navegador.close();
}
