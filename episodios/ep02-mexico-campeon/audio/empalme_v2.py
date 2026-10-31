#!/usr/bin/env python3
"""Empalma la voz v2: toma aprobada + fragmentos nuevos (narrador y cantante). Genera assets/voz-v2.wav y revision/voz-palabras-v2.json"""
import json, subprocess, numpy as np, re
SR = 48000
def load(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()
O = load('proyecto/assets/voz-elevenlabs.mp3'); N = load('revision/v2/narr-v2.mp3'); C = load('revision/v2/canto-v2.mp3')
C *= 10 ** ((-20.5 + 25.5) / 20)  # cantante a ~-20.5 LUFS
def quiet(x, t, w=.12):
    i0, i1 = int((t - w) * SR), int((t + w) * SR); fr = int(.01 * SR)
    best, bt = 1e9, t
    for i in range(max(0, i0), min(len(x) - fr, i1), fr // 2):
        e = float(np.mean(x[i:i + fr] ** 2))
        if e < best: best, bt = e, i / SR
    return bt
def seg(x, a, b, f=.012):
    s = x[int(a * SR):int(b * SR)].copy(); n = int(f * SR)
    s[:n] *= np.linspace(0, 1, n); s[-n:] *= np.linspace(1, 0, n); return s
sil = lambda d: np.zeros(int(d * SR), dtype=np.float32)
ow = json.load(open('revision/voz-palabras.json'))['words']
nw = [w for w in json.load(open('revision/v2/narr-v2-palabras-raw.json')) if not re.match(r'^\[|^\w+\]$', w['text'])]
c1 = quiet(O, 124.94, .03); c2 = quiet(O, 127.32, .03); c3 = quiet(O, 130.46, .03); c4 = quiet(O, 133.645, .03); c5 = quiet(O, 149.85, .07)
a0 = quiet(N, .12, .05); a1 = quiet(N, 3.66, .08); b0 = quiet(N, 3.71, .04); b1 = quiet(N, 10.70, .03); d0 = quiet(N, 10.70, .03)
print('cortes', [round(v, 3) for v in (c1, c2, c3, c4, c5, a0, a1, b0, b1, d0)])
plan = [('O', 0, c1), ('S', .12), ('N', a0, a1), ('S', .35), ('C', 0, len(C) / SR), ('S', .3), ('O', c2, c3), ('S', .1), ('N', b0, b1), ('S', .14), ('O', c4, c5), ('S', .25), ('N', d0, len(N) / SR), ('S', .6)]
out, words, t = [], [], 0.0
src = {'O': (O, ow), 'N': (N, nw), 'C': (C, None)}
for p in plan:
    if p[0] == 'S': out.append(sil(p[1])); t += p[1]; continue
    k, a, b = p; x, ws = src[k]; s = seg(x, a, b) if a > 0 or k != 'C' else x.copy(); out.append(s)
    if ws:
        for w in ws:
            if a - .02 <= w['start'] < b - .02: words.append({'text': w['text'], 'start': round(t + w['start'] - a, 3), 'end': round(t + min(w['end'], b) - a, 3)})
    else:  # cantante: palabras aproximadas por la envolvente
        for txt, st, en in [('♪', 0.0, .05), ('¡Ay,', .10, .55), ('mamá!', .60, 1.25), ('Pura', 1.45, 1.80), ('ciencia...', 1.85, 2.70), ('y', 2.95, 3.05), ('filosofía.', 3.10, 4.30), ('♪', 4.31, 4.4)]:
            words.append({'text': txt, 'start': round(t + st, 3), 'end': round(t + en, 3), 'canto': True})
    t += len(s) / SR
y = np.concatenate(out); y = y / max(1e-9, np.max(np.abs(y))) * .95
import wave
with wave.open('proyecto/assets/voz-v2.wav', 'wb') as f: f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR); f.writeframes((y * 32767).astype(np.int16).tobytes())
json.dump({'duration': round(len(y) / SR, 3), 'fuente': 'empalme v2 (toma 9Cfx0YmfIRjdYzpJvlpw + 04rS4SiZheNrC1kb8Fbm + canto dm6GgLcEgdvpWWy3Xbjw)', 'words': words}, open('revision/voz-palabras-v2.json', 'w'), ensure_ascii=False, indent=0)
print('dur', round(len(y) / SR, 2), 'palabras', len(words))
