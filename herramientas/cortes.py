#!/usr/bin/env python3
"""Sugiere los cortes de fragmentos (3 partes + 2 Shorts) a partir de los tiempos por palabra; solo corta en silencios.

- Parte 1: del inicio a justo antes del gancho («¿Y si sí?»), que abre la parte 2. Si no hay gancho, en el tercio.
- Las demás partes: en silencios de fin de oración; la siguiente empieza 1.5–3.5 s antes (traslape para recordar).
- Shorts: ventanas de oraciones completas de 18–33.2 s (35 s con el congelado), puntuadas por palabras clave y remate corto.
Escribe revision/cortes-sugeridos.json; con --escribir también llena clips.json (partes + los 2 mejores Shorts).
La elección final de los Shorts es creativa: revisa los candidatos.

uso: python herramientas/cortes.py ep03 [--partes 3] [--claves sobre,papá,…] [--fin-util 341.5] [--escribir]
"""
import argparse
import json
import math
import re
from pathlib import Path

from comun import episodio

FREEZE = 1.8
FIN = re.compile(r'[.?!…”"»]$')


def palabras(proy: Path, vo: float):
    f = proy / 'src' / 'words_ep.js'
    if not f.exists():  # episodios viejos: WORDS_EP vive en otro archivo (p. ej. words2.js)
        f = next(x for x in sorted((proy / 'src').glob('*.js')) if 'const WORDS_EP' in x.read_text(encoding='utf-8'))
    txt = f.read_text(encoding='utf-8')
    W = json.loads(txt[txt.index('['): txt.rindex(']') + 1])
    return [{'text': w['text'], 'start': w['start'] + vo, 'end': w['end'] + vo} for w in W]


def huecos(W, frase=True, min_gap=.06):
    return [(W[i]['end'], W[i + 1]['start'], i) for i in range(len(W) - 1)
            if W[i + 1]['start'] - W[i]['end'] >= min_gap and (not frase or FIN.search(W[i]['text']))]


def fin_en(g):
    return round(min(g[0] + .3, g[1] - .06), 2)


def ini_en(g):
    return round(max(g[0] + .04, g[1] - .14), 2)


def sugerir(W, slug, util, n=3, gancho='¿y si sí?', claves=()):
    G, Gall = huecos(W), huecos(W, frase=False)
    txt = [w['text'].lower() for w in W]
    gp = gancho.lower().split()
    gi = next((i for i in range(len(W) - len(gp)) if txt[i:i + len(gp)] == gp and 45 <= W[i]['start'] <= 95), None)  # solo si deja una parte 1 de 45–95 s
    bordes = []
    if gi is not None and n > 1:
        bordes.append(('gancho', next((g for g in Gall if g[2] == gi - 1), (W[gi - 1]['end'], W[gi]['start'], gi - 1))))
    while len(bordes) < n - 1:
        k = len(bordes) + 1
        obj = bordes[-1][1][0] + (util - bordes[-1][1][0]) / (n - k + 1) if bordes else util * k / n
        bordes.append(('tercio', min(G, key=lambda g: abs(g[0] - obj))))
    partes, a = [], 0.0
    for tipo, g in bordes:
        e = round((g[0] + g[1]) / 2, 2) if tipo == 'gancho' else fin_en(g)
        partes.append({'a': a, 'e': e})
        if tipo == 'gancho':
            a = round(g[0] + .12, 2)
        else:
            cand = [x for x in Gall if e - 3.6 <= x[1] <= e - 1.2] or [x for x in Gall if x[1] < e - .8][-1:]
            a = ini_en(min(cand, key=lambda x: abs(x[1] - (e - 2.5))))
    partes.append({'a': a, 'e': round(util, 2)})
    for k, p in enumerate(partes, 1):
        p.update(nombre=f'{slug}-parte-{k}-de-{n}', fin='fin-final' if k == n else f'fin-parte{k + 1}', dur=round(p['e'] - p['a'] + FREEZE, 2))
        if n == 3:
            p['badge'] = f'badge-{k}de3'
    cl = [c.lower() for c in claves]
    inicios = [W[0]['start']] + [W[g[2] + 1]['start'] for g in G]
    cands = []
    for s0 in inicios:
        if s0 < 10:
            continue
        for g in G:
            L = g[0] - s0
            if 18 <= L <= 33.2 and g[0] < util:
                seg = ' '.join(w['text'].lower() for w in W if s0 <= w['start'] < g[0])
                pts = sum(seg.count(c) for c in cl) * 2 + (-2 if re.match(r'^(y|pero|que|porque)\b', seg) else 1)
                pts += 1 if len(W[g[2]]['text']) <= 10 else 0
                cands.append({'a': round(s0 - .15, 2), 'e': fin_en(g), 'dur': round(fin_en(g) - s0 + .15 + FREEZE, 1), 'puntos': pts, 'texto': seg[:90]})
    cands.sort(key=lambda x: -x['puntos'])
    shorts = []
    for x in cands:
        if all(x['e'] <= y['a'] or x['a'] >= y['e'] for y in shorts):
            shorts.append(x)
        if len(shorts) == 6:
            break
    avisos = [f"{p['nombre']}: {p['dur']} s (> 90 s; con {math.ceil(util / 88)} partes quedarían de 60–90 s)" for p in partes if p['dur'] > 91.8]
    return partes, shorts, avisos


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('episodio')
    ap.add_argument('--partes', type=int, default=3)
    ap.add_argument('--claves', default='')
    ap.add_argument('--gancho', default='¿y si sí?')
    ap.add_argument('--fin-util', type=float, help='segundo en que empieza el cierre de marca (las partes terminan antes)')
    ap.add_argument('--vo', type=float, default=.5)
    ap.add_argument('--escribir', action='store_true', help='escribe clips.json con las partes y los 2 mejores Shorts')
    a = ap.parse_args()
    carpeta, cfg = episodio(a.episodio)
    proy = carpeta / cfg['proyecto']
    W = palabras(proy, a.vo)
    util = a.fin_util
    if util is None:
        tl = proy / 'timeline.json'
        T = json.loads(tl.read_text(encoding='utf-8'))['T'] if tl.exists() else {}
        util = T.get('cierre') or W[-1]['end'] + .3
    corto = cfg['slug'].split('-')[0]
    partes, shorts, avisos = sugerir(W, corto, util, a.partes, a.gancho, [c for c in a.claves.split(',') if c])
    (carpeta / 'revision').mkdir(exist_ok=True)
    out = carpeta / 'revision' / 'cortes-sugeridos.json'
    out.write_text(json.dumps({'partes': partes, 'shorts': shorts, 'avisos': avisos}, ensure_ascii=False, indent=1), encoding='utf-8')
    for p in partes:
        print(f"{p['nombre']}: {p['a']:.2f}–{p['e']:.2f} ({p['dur']} s)")
    for i, s in enumerate(shorts, 1):
        print(f"short {i}: {s['a']:.2f}–{s['e']:.2f} ({s['dur']} s) · {s['puntos']} pts · «{s['texto'][:60]}…»")
    for x in avisos:
        print('aviso:', x)
    if a.escribir:
        clips = [{k: p[k] for k in ('nombre', 'a', 'e', 'badge', 'fin') if k in p} for p in partes] + \
                [{'nombre': f'{corto}-short-{i}', 'a': s['a'], 'e': s['e'], 'fin': 'fin-completo'} for i, s in enumerate(shorts[:2], 1)]
        cj = carpeta / cfg.get('clips', 'clips.json')
        d = json.loads(cj.read_text(encoding='utf-8')) if cj.exists() else {}
        d['clips'] = clips
        cj.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8')
        print('clips.json escrito; renombra los Shorts por su tema (p. ej. -short-pollo).')


if __name__ == '__main__':
    main()
