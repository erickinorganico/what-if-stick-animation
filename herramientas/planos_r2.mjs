// R2 · lista planos (BT) con duración y texto de la voz que cae en cada uno
import { resolverEpisodio, abrir, args } from './lib/pagina.mjs';
const { pos } = args(); const ep = resolverEpisodio(pos[0] || 'ep06');
const { navegador, pagina } = await abrir(ep.html);
const r = await pagina.evaluate(() => { const out = []; for (let i = 0; i < BT.length; i++) { const a = BT[i], b = i + 1 < BT.length ? BT[i + 1] : T.cierre; const ws = WORDS_EP.filter(w => VO + w.start >= a - .01 && VO + w.start < b - .01).map(w => w.text).join(' '); out.push(`B${i + 1}\t${a.toFixed(2)}\t${(b - a).toFixed(2)}\t${ws}`); } return out.join('\n') + `\nDUR ${window.DUR} VO ${VO}`; });
console.log(r); await navegador.close();
