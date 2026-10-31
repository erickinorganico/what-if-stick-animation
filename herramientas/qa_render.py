#!/usr/bin/env python3
"""QA fino de un render: lo que el ojo pierde en una revisión rápida.

Detecta, sin verlo cuadro por cuadro:
  - congelados (≥ --congelado s sin cambio de imagen): poses muertas o tomas que se quedaron sin animar
  - destellos de un cuadro (un cuadro distinto a sus dos vecinos, que entre sí sí se parecen): glitches de transición
  - negros (≥ 0.1 s) fuera del inicio y el final
  - loudness integrado y pico real (−14 LUFS ±0.5, pico ≤ −1 dBTP)
  - sincronía de la voz: desfase entre la voz original y el audio del video (correlación de envolventes)
Escribe <video>.qa.json y una hoja con los cuadros sospechosos (<video>.qa.png).

uso:
  python herramientas/qa_render.py videos/<slug>/<salida>-16x9.mp4 [--voz proyecto/assets/voz.mp3 --vo 0.5] [--congelado 0.4]
"""
import argparse
import json
import re
import subprocess
from pathlib import Path

import numpy as np

from comun import ffmpeg_bin

FPS = 30


def lumas(video: Path) -> np.ndarray:
    """Luma media por cuadro y diferencia media con el cuadro anterior, en miniatura de 96×54 (rápido)."""
    p = subprocess.run([ffmpeg_bin(), '-v', 'error', '-i', str(video), '-vf', 'scale=96:54,format=gray', '-f', 'rawvideo', '-'],
                       capture_output=True, check=True)
    a = np.frombuffer(p.stdout, np.uint8).reshape(-1, 54, 96).astype(np.int16)
    return a


def audio_mono(src: Path, rate=8000) -> np.ndarray:
    p = subprocess.run([ffmpeg_bin(), '-v', 'error', '-i', str(src), '-vn', '-ac', '1', '-ar', str(rate), '-f', 's16le', '-'],
                       capture_output=True, check=True)
    x = np.frombuffer(p.stdout, np.int16).astype(np.float32) / 32768
    st = subprocess.run([ffmpeg_bin('ffprobe'), '-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=start_time', '-of', 'csv=p=0', str(src)],
                        capture_output=True, text=True).stdout.strip()
    try:  # un MP4 cuyo audio empieza después de 0 (p. ej. -itsoffset) se decodifica sin ese hueco: lo reponemos
        st = float(st)
    except ValueError:
        st = 0.0
    return np.concatenate([np.zeros(int(round(st * rate)), np.float32), x]) if st > 0 else x


def envolvente(x, rate=8000, hop=80):
    n = len(x) // hop
    e = np.sqrt((x[: n * hop].reshape(n, hop) ** 2).mean(1) + 1e-9)
    return np.log(e)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('video', type=Path)
    ap.add_argument('--voz', type=Path)
    ap.add_argument('--vo', type=float, default=0.5, help='segundos de entrada de la voz en el video')
    ap.add_argument('--congelado', type=float, default=0.4)
    ap.add_argument('--ignorar', default='', help='rangos a ignorar en congelados, p. ej. "0-1.5,340-344" (títulos quietos a propósito)')
    a = ap.parse_args()
    v = a.video
    F = lumas(v)
    n = len(F)
    d = np.abs(np.diff(F, axis=0)).mean((1, 2))  # cambio entre cuadros consecutivos
    ign = [tuple(map(float, r.split('-'))) for r in a.ignorar.split(',') if r]
    fuera = lambda t: not any(x <= t <= y for x, y in ign)
    # congelados
    cong, i = [], 0
    while i < len(d):
        if d[i] < .02:
            j = i
            while j < len(d) and d[j] < .02:
                j += 1
            L = (j - i + 1) / FPS
            if L >= a.congelado and fuera(i / FPS):
                cong.append({'t': round(i / FPS, 2), 'dur': round(L, 2)})
            i = j
        else:
            i += 1
    # destellos de un cuadro
    fl = []
    for k in range(1, n - 1):
        a1 = np.abs(F[k] - F[k - 1]).mean()
        a2 = np.abs(F[k] - F[k + 1]).mean()
        b = np.abs(F[k + 1] - F[k - 1]).mean()
        if a1 > 6 and a2 > 6 and b < min(a1, a2) * .35:
            fl.append(round(k / FPS, 3))
    # negros
    m = F.mean((1, 2))
    neg, i = [], 0
    while i < n:
        if m[i] < 6:
            j = i
            while j < n and m[j] < 6:
                j += 1
            if (j - i) / FPS >= .1 and i > 3 and j < n - 3:
                neg.append({'t': round(i / FPS, 2), 'dur': round((j - i) / FPS, 2)})
            i = j
        else:
            i += 1
    # loudness
    r = subprocess.run([ffmpeg_bin(), '-nostats', '-vn', '-i', str(v), '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    Is, pks = re.findall(r'I:\s+(-?[\d.]+) LUFS', r), re.findall(r'Peak:\s+(-?[\d.]+) dBFS', r)
    I, pk = (float(Is[-1]), float(pks[-1])) if Is else (None, None)  # el crudo del render no trae audio
    res = {'video': v.name, 'cuadros': n, 'segundos': round(n / FPS, 2), 'lufs': I, 'pico_dbtp': pk,
           'congelados': cong, 'destellos': fl, 'negros': neg}
    # sincronía
    if a.voz:
        ev = envolvente(audio_mono(a.voz))
        ea = envolvente(audio_mono(v))
        off = int(round(a.vo * 100))
        seg = ev[: min(len(ev), 6000)]  # primeros 60 s de voz
        best, lag = -9, 0
        for L in range(off - 30, off + 31):  # ±300 ms alrededor de lo esperado
            if L < 0 or L + len(seg) > len(ea):
                continue
            c = np.corrcoef(seg, ea[L: L + len(seg)])[0, 1]
            if c > best:
                best, lag = c, L
        res['sincronia_ms'] = (lag - off) * 10
        res['sincronia_corr'] = round(float(best), 3)
    prob = []
    if I is not None and abs(I + 14) > .5:
        prob.append(f'loudness {I}')
    if pk is not None and pk > -1:
        prob.append(f'pico {pk} dBTP')
    if cong:
        prob.append(f'{len(cong)} congelados')
    if fl:
        prob.append(f'{len(fl)} destellos de un cuadro')
    if [x for x in neg if x['dur'] > .5]:
        prob.append(f"{len([x for x in neg if x['dur'] > .5])} negros largos a mitad (los de < 0.5 s suelen ser fundidos a negro)")
    if a.voz and abs(res['sincronia_ms']) > 40:
        prob.append(f"voz desfasada {res['sincronia_ms']} ms")
    res['problemas'] = prob
    out = v.with_suffix('.qa.json')
    out.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding='utf-8')
    # hoja de sospechosos
    ts = [c['t'] + .1 for c in cong[:8]] + fl[:8] + [x['t'] for x in neg[:4]]
    if ts:
        from PIL import Image, ImageDraw
        ims = []
        for t in ts:
            p = subprocess.run([ffmpeg_bin(), '-v', 'error', '-ss', f'{t:.3f}', '-i', str(v), '-frames:v', '1', '-vf', 'scale=480:-2', '-f', 'image2pipe', '-c:v', 'png', '-'],
                               capture_output=True)
            if p.stdout:
                import io
                ims.append((t, Image.open(io.BytesIO(p.stdout)).convert('RGB')))
        if ims:
            w, h = ims[0][1].size
            cols = 4
            S = Image.new('RGB', (cols * w, ((len(ims) + cols - 1) // cols) * h), (13, 13, 15))
            dr = ImageDraw.Draw(S)
            for i, (t, im) in enumerate(ims):
                x, y = (i % cols) * w, (i // cols) * h
                S.paste(im, (x, y))
                dr.rectangle([x, y, x + 110, y + 24], fill=(0, 0, 0))
                dr.text((x + 6, y + 5), f'{t:.2f}s', fill=(255, 61, 154))
            S.save(v.with_suffix('.qa.png'))
    print(json.dumps({k: res[k] for k in ('video', 'segundos', 'lufs', 'pico_dbtp', 'problemas')} | ({'sincronia_ms': res['sincronia_ms']} if a.voz else {}), ensure_ascii=False))
    print('congelados:', cong[:12], '…' if len(cong) > 12 else '')
    print('destellos:', fl[:12])


if __name__ == '__main__':
    main()
