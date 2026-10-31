#!/usr/bin/env python3
"""Esqueleto de un episodio a partir de la voz: beats de 2–5 s, anclas listas, storyboard y animatic con voz desde el día 1.

Lee los tiempos por palabra (proyecto/src/words_ep.js o revision/voz-palabras.json) y escribe:
  proyecto/src/beats.js      BEATS = [{id, t0, t1, texto, plano}] y B.b1, B.b2… (segundos ya con VO) para anclar tomas: S(B.b12, …)
  proyecto/src/animatic.js   tarjeta provisional para cada beat que todavía no tiene toma propia (se va apagando sola
                             conforme escribes tomas en ep.js); así probe/snap/render funcionan con el episodio entero
  revision/storyboard.md     tabla de beats: tiempo, duración, texto, plano sugerido y avisos (beats > 5 s)
  e inserta beats.js y animatic.js en proyecto/index.html (beats antes de ep.js, animatic justo antes de main2.js)

Reglas del canal que aplica: un cambio visual cada 3–5 s, cortes al inicio de una palabra, una idea por toma.

uso:
  python herramientas/esqueleto.py ep03                 # todo
  python herramientas/esqueleto.py ep03 --max 5 --min 2 # límites de duración por beat
  python herramientas/esqueleto.py ep03 --sin-html      # no toca index.html

Después: `node herramientas/snap.mjs ep03 animatic --hoja 4` y `python herramientas/producir.py ep03 --animatic`
(animatic con voz para aprobar ritmo antes de animar). Cada toma real que escribas con S(B.bN, …) reemplaza su tarjeta.
"""
import argparse
import json
import re
from pathlib import Path

from comun import episodio

FIN = re.compile(r'[.?!…:]["”»]?$')
PAUSA = re.compile(r'[,;—–]["”»]?$')


def leer_palabras(proy: Path, carpeta: Path):
    js = proy / 'src' / 'words_ep.js'
    if not js.exists():
        js = next((x for x in sorted((proy / 'src').glob('*.js')) if 'const WORDS_EP' in x.read_text(encoding='utf-8')), js)
    if js.exists():
        txt = js.read_text(encoding='utf-8')
        return json.loads(txt[txt.index('['): txt.rindex(']') + 1])
    j = carpeta / 'revision' / 'voz-palabras.json'
    d = json.loads(j.read_text(encoding='utf-8'))
    return d['words'] if isinstance(d, dict) else d


def beats_de(W, vo, mn, mx):
    # 1) oraciones
    frases, cur = [], []
    for i, w in enumerate(W):
        cur.append(i)
        if FIN.search(w['text']) or i == len(W) - 1:
            frases.append(cur)
            cur = []
    # 2) parte oraciones largas en comas o pausas (≥ .3 s), buscando trozos de mn..mx s
    trozos = []
    for f in frases:
        ini = 0
        while ini < len(f):
            s0 = W[f[ini]]['start']
            if W[f[-1]]['end'] - s0 <= mx:
                trozos.append(f[ini:])
                break
            cand = [k for k in range(ini, len(f) - 1)
                    if (PAUSA.search(W[f[k]]['text']) or W[f[k + 1]]['start'] - W[f[k]]['end'] >= .3)
                    and mn <= W[f[k]]['end'] - s0 <= mx]
            if not cand:  # sin pausa útil: corta en la palabra más cercana a mx
                cand = [max((k for k in range(ini, len(f) - 1) if W[f[k]]['end'] - s0 <= mx), default=ini)]
            resto = lambda k: W[f[-1]]['end'] - W[f[k + 1]]['start']  # que no quede una cola huérfana de < mn
            buenos = [k for k in cand if resto(k) >= mn] or [k for k in range(ini, len(f) - 1) if resto(k) >= mn and W[f[k]]['end'] - s0 >= mn * .6]
            k = (buenos or cand)[-1]
            trozos.append(f[ini:k + 1])
            ini = k + 1
    # 3) une trozos muy cortos con el siguiente si cabe
    out = []
    for t in trozos:
        if out and (W[out[-1][-1]]['end'] - W[out[-1][0]]['start']) < mn * .8 and W[t[-1]]['end'] - W[out[-1][0]]['start'] <= mx:
            out[-1] = out[-1] + t
        else:
            out.append(t)
    B = []
    for n, t in enumerate(out, 1):
        t0 = round(vo + W[t[0]]['start'], 3)
        texto = ' '.join(W[i]['text'] for i in t)
        gap_antes = W[t[0]]['start'] - W[t[0] - 1]['end'] if t[0] > 0 else 9
        B.append({'id': f'b{n}', 't0': t0, 'texto': texto, 'gap': round(gap_antes, 2)})
    for i, b in enumerate(B):
        b['t1'] = B[i + 1]['t0'] if i + 1 < len(B) else round(vo + W[-1]['end'] + 3.7, 3)
        b['dur'] = round(b['t1'] - b['t0'], 2)
    # 4) plano sugerido (variedad: general → medio → cercano/inserto; diálogo → cercano; pausa larga → nuevo lugar)
    ciclo = ['medio', 'cercano', 'inserto', 'general']
    k = 0
    for i, b in enumerate(B):
        if i == 0:
            b['plano'] = 'título / gancho'
        elif b['gap'] >= .8:
            b['plano'] = 'general (nuevo lugar o salto de tiempo)'
        elif re.search(r'[“"«]', b['texto']):
            b['plano'] = 'cercano (diálogo, reacción)'
        elif re.search(r'¿', b['texto']):
            b['plano'] = 'cercano (pregunta, reacción)'
        elif re.search(r'\d|\b(mil|millones|cien|doce|veinte|quince)\b', b['texto'].lower()):
            b['plano'] = 'inserto (dato u objeto)'
        else:
            b['plano'] = ciclo[k % len(ciclo)]
            k += 1
    return B


ANIMATIC_JS = r"""// Animatic automático (herramientas/esqueleto.py): una tarjeta por beat que aún no tiene toma propia.
// Una toma real "cubre" un beat si empieza dentro de él o si empezó hace menos de ANIMATIC_MAX s. Para quitar el animatic: borra este <script>.
(function () {
  const MAX = window.ANIMATIC_MAX || 6, reales = SHOTS.map(s => s.t0).sort((a, b) => a - b);
  const card = b => (ctx, t) => {
    ctx.fillStyle = '#0d0d0f'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
    const k = ease(t, b.t0, b.t0 + .25, E.out), p = clamp((t - b.t0) / (b.t1 - b.t0));
    ctx.save(); ctx.globalAlpha = k;
    t3(ctx, `${b.id.toUpperCase()} · ${b.t0.toFixed(2)} s · ${b.dur.toFixed(1)} s`, 960, 330, { size: 26, font: MONO3, align: 'center', color: B3V.huesoT, ls: 4 });
    t3(ctx, b.plano.toUpperCase(), 960, 380, { size: 22, font: MONO3, align: 'center', color: B3V.rosaTxt, ls: 4 });
    const pal = b.texto.split(' '), lines = [[]]; let w = 0; ctx.font = 'italic 64px "Instrument Serif"';
    pal.forEach(x => { const pw = ctx.measureText(x + ' ').width; if (w + pw > 1300 && lines[lines.length - 1].length) { lines.push([]); w = 0; } lines[lines.length - 1].push(x); w += pw; });
    lines.forEach((l, i) => t3(ctx, l.join(' '), 960, 520 + i * 78 - (lines.length - 1) * 39, { size: 64, italic: true, align: 'center' }));
    ctx.fillStyle = 'rgba(239,233,223,.18)'; ctx.fillRect(560, 760, 800, 3); ctx.fillStyle = B3V.rosa; ctx.fillRect(560, 760, 800 * p, 3);
    ctx.restore();
  };
  BEATS.forEach(b => {
    const dentro = reales.some(r => r >= b.t0 - .05 && r < b.t1 - .05);
    const previa = reales.filter(r => r < b.t0 - .05).pop();
    const cubierta = dentro || (previa != null && b.t0 - previa < MAX && previa > 0.01);
    if (!cubierta) S(b.t0, card(b), 960);
  });
})();
"""


def instalar_kit(proy: Path):
    """Copia herramientas/kit/*.js a proyecto/src y los carga: direccion.js antes de las tomas, transiciones.js después de main2.js."""
    import shutil
    from comun import HERR
    for f in (HERR / 'kit').glob('*.js'):
        shutil.copy2(f, proy / 'src' / f.name)
    h = proy / 'index.html'
    html = h.read_text(encoding='utf-8')
    if 'src/direccion.js' not in html:
        for ancla in ('<script src="src/beats.js"></script>', '<script src="src/ep.js"></script>', '<script src="src/e2a.js"></script>'):
            if ancla in html:
                html = html.replace(ancla, '<script src="src/direccion.js"></script>' + ancla, 1)
                break
    if 'src/transiciones.js' not in html:
        html = html.replace('<script src="src/main2.js"></script>', '<script src="src/main2.js"></script><script src="src/transiciones.js"></script>', 1)
    h.write_text(html, encoding='utf-8')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('episodio')
    ap.add_argument('--min', type=float, default=2.0)
    ap.add_argument('--max', type=float, default=5.0)
    ap.add_argument('--vo', type=float, default=0.5)
    ap.add_argument('--sin-html', action='store_true')
    a = ap.parse_args()
    carpeta, cfg = episodio(a.episodio)
    proy = carpeta / cfg['proyecto']
    W = leer_palabras(proy, carpeta)
    B = beats_de(W, a.vo, a.min, a.max)
    src = proy / 'src'
    (src / 'beats.js').write_text(
        '// generado por herramientas/esqueleto.py — no editar a mano (vuelve a correrlo si cambia la voz)\n'
        f'const BEATS = {json.dumps([{k: b[k] for k in ("id", "t0", "t1", "dur", "texto", "plano")} for b in B], ensure_ascii=False, indent=0)};\n'
        'const B = Object.fromEntries(BEATS.map(b => [b.id, b.t0])); window.BEATS = BEATS; window.B = B;\n', encoding='utf-8')
    (src / 'animatic.js').write_text(ANIMATIC_JS, encoding='utf-8')
    largos = [b for b in B if b['dur'] > a.max + .5]
    L = [f"# Storyboard · {cfg['titulo']}", '',
         f"{len(B)} beats · duración media {sum(b['dur'] for b in B) / len(B):.1f} s · {len(largos)} de más de {a.max:g} s.",
         'Ancla cada toma con `S(B.bN, (ctx, t) => …, vx)`. El plano es una sugerencia para variar; la dirección manda.', '',
         '| Beat | Inicio | Dura | Texto | Plano sugerido | Toma (llenar) |', '|---|---|---|---|---|---|']
    for b in B:
        m, s = divmod(b['t0'], 60)
        aviso = ' ⚠' if b['dur'] > a.max + .5 else ''
        L.append(f"| {b['id']} | {int(m)}:{s:05.2f} | {b['dur']:.1f}{aviso} | {b['texto']} | {b['plano']} | |")
    (carpeta / 'revision').mkdir(exist_ok=True)
    (carpeta / 'revision' / 'storyboard.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
    if not a.sin_html:
        instalar_kit(proy)
        h = proy / 'index.html'
        html = h.read_text(encoding='utf-8')
        if 'src/beats.js' not in html:
            ancla = '<script src="src/ep.js"></script>' if 'src/ep.js' in html else '<script src="src/main2.js"></script>'
            html = html.replace(ancla, '<script src="src/beats.js"></script>' + ancla, 1)
        if 'src/animatic.js' not in html:
            html = html.replace('<script src="src/main2.js"></script>', '<script src="src/animatic.js"></script><script src="src/main2.js"></script>', 1)
        h.write_text(html, encoding='utf-8')
    print(f"ok · {len(B)} beats ({len(largos)} > {a.max:g} s) · src/beats.js, src/animatic.js, revision/storyboard.md")


if __name__ == '__main__':
    main()
