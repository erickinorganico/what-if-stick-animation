const BAR = 138;
const KEY = new Set(['méxico', 'gol', 'campeón', 'mundial', 'violencia', 'sí', 'inglaterra', 'potencia', 'sonetos', 'tijuana']);
const WORDS_CAP = (typeof WORDS_EP !== 'undefined') ? WORDS_EP : WORDS;
const CAPS = (() => { const out = []; let cur = [];
  const flush = () => { if (!cur.length) return; out.push({ t0: VO + cur[0].start, t1: VO + cur[cur.length - 1].end + .2, words: cur.map(w => w.text.replace(/["]/g, '')) }); cur = []; };
  WORDS_CAP.forEach((w, i) => { const prev = WORDS_CAP[i - 1]; if (cur.length && (cur.length >= 6 || (prev && w.start - prev.end > .4))) flush(); cur.push(w); if (/[.!?…:,]$/.test(w.text) && cur.length >= 3) flush(); else if (/[.!?…:]$/.test(w.text)) flush(); });
  flush(); for (let i = 0; i < out.length - 1; i++) out[i].t1 = Math.min(Math.max(out[i].t1, out[i].t0 + 1.0), out[i + 1].t0); return out; })();
function subtitles(ctx, t) {
  const c = CAPS.find(c => t >= c.t0 && t < c.t1); if (!c) return;
  ctx.save(); ctx.font = '700 40px "Instrument Sans"'; ctx.textBaseline = 'middle'; ctx.letterSpacing = '1.5px';
  const parts = c.words.map(w => w.toUpperCase()), sp = 13, ws = parts.map(p => ctx.measureText(p).width), total = ws.reduce((a, b) => a + b, 0) + sp * (parts.length - 1);
  let x = W / 2 - total / 2; const y = H - BAR / 2 + 2, k = ease(t, c.t0, c.t0 + .15, E.out);
  parts.forEach((p, i) => { ctx.fillStyle = KEY.has(norm(p)) ? B3V.rosaTxt : '#efe9df'; ctx.globalAlpha = k; ctx.fillText(p, x, y + (1 - k) * 6); x += ws[i] + sp; });
  ctx.restore();
}
function drawShot(ctx, s, t) { ctx.save(); setBase(ctx); ctx.filter = 'none'; ctx.globalAlpha = 1; s.fn(ctx, t); ctx.restore(); }
// ---------- vertical: bandas con la escena desenfocada, título de la serie y subtítulos grandes ----------
const SMALL = document.createElement('canvas'); SMALL.width = 36; SMALL.height = 45;
function wrapWords(ctx, parts, maxW, sp) { const lines = [[]]; let w = 0; parts.forEach(p => { const pw = ctx.measureText(p).width; if (lines[lines.length - 1].length && w + sp + pw > maxW) { lines.push([]); w = 0; } lines[lines.length - 1].push(p); w += (w ? sp : 0) + pw; }); return lines; }
function subtitlesV(ctx, t) {
  const c = CAPS.find(c => t >= c.t0 && t < c.t1); if (!c) return;
  ctx.save(); ctx.font = '700 60px "Instrument Sans"'; ctx.textBaseline = 'middle'; ctx.letterSpacing = '1px'; ctx.lineJoin = 'round';
  const parts = c.words.map(w => w.toUpperCase()), sp = 16, lines = wrapWords(ctx, parts, 960, sp), k = ease(t, c.t0, c.t0 + .15, E.out);
  lines.forEach((ln, li) => { const ws = ln.map(p => ctx.measureText(p).width), total = ws.reduce((a, b) => a + b, 0) + sp * (ln.length - 1); let x = 540 - total / 2; const y = 1500 - (lines.length - 1) * 38 + li * 76 + (1 - k) * 8;
    ln.forEach((p, i) => { ctx.globalAlpha = k; ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(0,0,0,.92)'; ctx.strokeText(p, x, y); ctx.fillStyle = KEY.has(norm(p)) ? B3V.rosaTxt : '#efe9df'; ctx.fillText(p, x, y); x += ws[i] + sp; }); });
  ctx.restore();
}
function chromeV(ctx, t) {
  const sx = SMALL.getContext('2d'); sx.clearRect(0, 0, 36, 45); sx.drawImage(ctx.canvas, 0, VTOP, 1080, 1350, 0, 0, 36, 45);
  ctx.save(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  [[0, 0, 1080, VTOP], [0, VTOP + 1350, 1080, 1920 - VTOP - 1350]].forEach(([x, y, w, h]) => { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.drawImage(SMALL, -60, -100, 1200, 2120); ctx.fillStyle = 'rgba(4,4,8,.72)'; ctx.fillRect(x, y, w, h); ctx.restore(); });
  const g1 = ctx.createLinearGradient(0, VTOP - 40, 0, VTOP + 30); g1.addColorStop(0, 'rgba(4,4,8,0)'); g1.addColorStop(1, 'rgba(4,4,8,0)'); 
  ctx.fillStyle = 'rgba(239,233,223,.22)'; ctx.fillRect(0, VTOP - 1, 1080, 1); ctx.fillRect(0, VTOP + 1350, 1080, 1);
  ctx.restore();
  brandTag(ctx, 540, 158, 1.35);
  t3(ctx, window.EP_TITLE3 || '¿Y si no hubiera sido penal?', 540, 252, { size: 70, italic: true, align: 'center', shadow: 'rgba(0,0,0,.7)', blur: 18 });
  ctx.save(); const pr = clamp(t / window.DUR); ctx.fillStyle = 'rgba(239,233,223,.16)'; ctx.fillRect(140, 1746, 800, 4); ctx.fillStyle = '#efe9df'; ctx.fillRect(140, 1746, 800 * pr, 4); ctx.fillStyle = B3V.rosa; ctx.beginPath(); ctx.arc(140 + 800 * pr, 1748, 9, 0, TAU); ctx.fill(); ctx.restore();
  subtitlesV(ctx, t);
}
SHOTS.sort((a, b) => a.t0 - b.t0); window.DUR = window.DUR_EP || DUR; { const cv = document.getElementById('c'); cv.width = CW; cv.height = CH; }
window.render = function (t) {
  const ctx = document.getElementById('c').getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, CW, CH);
  let i = 0; for (let k = 0; k < SHOTS.length; k++) if (t >= SHOTS[k].t0) i = k;
  const s = SHOTS[i];
  if (V) setView(typeof s.vx === 'function' ? s.vx(t) : s.vx);
  drawShot(ctx, s, t);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  if (CLEAN) return;
  if (V) { chromeV(ctx, t); return; }
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, BAR); ctx.fillRect(0, H - BAR, W, BAR);
  brandTag(ctx, W - 96, BAR / 2 + 2, 1.3, { align: 'right', alpha: .9 });
  subtitles(ctx, t);
};
window.T = T; window.CAPS = CAPS;
document.fonts.ready.then(() => Promise.all(['60px Anton', '800 10px Montserrat', '900 10px Montserrat', '40px "Instrument Serif"', 'italic 40px "Instrument Serif"', '700 40px "Instrument Sans"', '400 20px "Geist Mono"'].map(f => document.fonts.load(f))).then(() => { window.READY = true; }));
