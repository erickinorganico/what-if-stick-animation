#!/usr/bin/env python3
"""YSS-20261024-01 · música sintetizada por cue + cama de estadio granular + SFX + mezcla con la voz al frente.
Uso: python audio_yss.py  (lee timeline.json y assets/) → assets/audio/musica.wav, assets/audio/fx.wav"""
import json, wave, subprocess, os
import numpy as np
from scipy.signal import butter, lfilter

SR = 48000
tl = json.load(open('timeline.json', encoding='utf-8'))
T, DUR = tl['T'], tl['DUR']
N = int(SR * DUR)
rng = np.random.default_rng(7)

def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).copy()
def lp(x, fc, o=2): b, a = butter(o, min(fc, SR / 2 - 100) / (SR / 2), 'low'); return lfilter(b, a, x, axis=0)
def hp(x, fc, o=2): b, a = butter(o, fc / (SR / 2), 'high'); return lfilter(b, a, x, axis=0)
def env(n, a, r):
    e = np.ones(n); na = min(n // 2, int(a * SR)); nr = min(n // 2, int(r * SR))
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e
class Bus:
    def __init__(s): s.x = np.zeros((N, 2))
    def add(s, sig, t0, g=1.0, pan=0.0):
        if sig.ndim == 1: sig = np.stack([sig * (1 - max(0, pan)), sig * (1 + min(0, pan))], 1)
        i0 = int(t0 * SR); i1 = min(N, i0 + len(sig))
        if i1 > i0 and i0 >= 0: s.x[i0:i1] += sig[: i1 - i0] * g
def wav(path, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.89
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes())

# ---------------- MÚSICA ----------------
M = Bus()
def tone(f, d, kind='saw', det=(0,)):
    t = np.arange(int(d * SR)) / SR; out = 0
    for dt in det:
        ph = t * f * (1 + dt)
        out = out + ((2 * (ph % 1) - 1) if kind == 'saw' else np.sin(2 * np.pi * ph))
    return out / len(det)
def pad(fs, d, fc=1000, a=1.2, r=1.2):
    x = sum(tone(f, d, 'saw', (-.004, 0, .005)) for f in fs) / len(fs)
    return lp(x, fc) * env(len(x), a, r)
def piano(f, d=2.2):
    t = np.arange(int(d * SR)) / SR
    return (np.sin(2 * np.pi * f * t) + .45 * np.sin(4 * np.pi * f * t) * np.exp(-t * 2) + .2 * np.sin(6 * np.pi * f * t) * np.exp(-t * 4)) * np.exp(-t * 2.4) * (1 - np.exp(-t * 200))
def boom(d=2.4, f0=55):
    t = np.arange(int(d * SR)) / SR; f = f0 * (1 + 1.6 * np.exp(-t * 12))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.2) + lp(rng.standard_normal(len(t)), 300) * np.exp(-t * 18) * .6
    return np.tanh(1.6 * x)
def pulse(f, d, bpm, sub=2, fc=800, dec=14):
    step = 60 / bpm / sub; out = np.zeros(int(d * SR)); k = 0
    while k * step < d - .02:
        n = int(min(step, d - k * step) * SR); t = np.arange(n) / SR
        note = (2 * ((t * f) % 1) - 1) * np.exp(-t * dec); i = int(k * step * SR); out[i:i + n] += note[: len(out) - i]; k += 1
    return lp(out, fc)
def drum(d, bpm, gain=1.0):
    step = 60 / bpm; out = np.zeros(int(d * SR)); k = 0
    while k * step < d - .05:
        i = int(k * step * SR); n = int(.35 * SR); t = np.arange(n) / SR
        kick = np.sin(2 * np.pi * (50 + 90 * np.exp(-t * 30)) * t) * np.exp(-t * 9)
        out[i:i + n] += kick[: len(out) - i]
        if k % 2 == 1:
            sn = hp(rng.standard_normal(int(.2 * SR)), 1500) * np.exp(-np.arange(int(.2 * SR)) / SR * 22) * .5
            out[i:i + len(sn)] += sn[: len(out) - i]
        k += 1
    return out * gain
def riser(d):
    t = np.arange(int(d * SR)) / SR
    return hp(rng.standard_normal(len(t)), 900) * (t / d) ** 2.2 * .6 + .35 * np.sin(2 * np.pi * np.cumsum(200 + 1500 * (t / d) ** 2) / SR) * (t / d) ** 2

# notas
A2, C3, D3, E3, F3, G3, A3, B3, C4, D4, E4, F4, G4, A4, C5, D5, E5, G5 = 110, 130.81, 146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440, 523.25, 587.33, 659.25, 783.99
# 1 · intro nostálgica (Am - F - C - G)
seg = (T['m94'] - 0.0) / 4
for k, ch in enumerate([[A2, C3, E3], [F3 / 2, A2, C3], [C3, E3, G3], [G3 / 2, B3 / 2, D3]]):
    M.add(pad(ch, seg + .8, 900, 1.0, .8), k * seg, .3)
for k, f in enumerate([E4, C4, A3, C4, D4, C4, B3, G3]):
    M.add(piano(f), .6 + k * seg / 2, .16, pan=-.2 if k % 2 else .2)
# 2 · 90+4 tensión: pulso + latido, silencio antes de "penal"
M.add(pulse(A2 / 2, T['penal'] - T['m94'] - .25, 100, 2, 600) * env(int((T['penal'] - T['m94'] - .25) * SR), .2, .05), T['m94'], .5)
M.add(riser(T['penal'] - T['robben'] - .2), T['robben'], .2)
M.add(boom(2.8, 48), T['penal'] - .05, 1.0)
# 3 · "no era penal": acorde menor oscuro
M.add(pad([A2 / 2, A2, C3, E3], T['pero'] - T['frase'] + .5, 600, .4, .8), T['frase'], .45)
M.add(boom(3, 44), T['noEra'], .55)
# 4 · ¿y si...? misterio (suspendido) → título
M.add(pad([D3, G3, A3], T['doce'] - T['pero'], 1300, .6, .6), T['pero'] + .9, .3)
for k, f in enumerate([A4, E4, D5, A4, G4, E5]): M.add(piano(f, 2.6), T['pero'] + 1.2 + k * .55, .12, pan=.3 * (-1) ** k)
M.add(boom(2.6, 52), T['sinPenal'], .6)
# 5 · sala: tema cálido (C - Am - F - G) con melodía
sala0, sala1 = T['doce'], T['m113']
L = sala1 - sala0; prog_ = [[C3, E3, G3], [A2, C3, E3], [F3 / 2, A2, C3], [G3 / 2, B3 / 2, D3]]
for k in range(int(L // 3) + 1):
    M.add(pad(prog_[k % 4], 3.6, 1400, .5, .7), sala0 + k * 3, .22)
mel = [E4, G4, A4, G4, E4, D4, C4, D4, E4, G4, C5, A4, G4, E4, D4, C4]
for k in range(int(L / .75)):
    if k % 8 in (3, 7): continue
    M.add(piano(mel[k % len(mel)], 1.4), sala0 + .4 + k * .75, .1, pan=.25)
# 6 · 113': riser y golpe
M.add(pulse(A2, T['gol113'] - T['m113'], 120, 4, 900, 18), T['m113'], .3)
M.add(riser(T['gol113'] - T['esquina']), T['esquina'], .25)
M.add(boom(2.6, 52), T['gol113'] + .05, 1.0)
# 7 · celebración y cuartos/penales: tema heroico con batería
hero0 = T['levanta'] + .2; hero1 = T['llora']
prog_h = [[C3, E3, G3], [G3 / 2, B3 / 2, D3], [A2, C3, E3], [F3 / 2, A2, C3]]
for k in range(int((hero1 - hero0) // 2.4) + 1): M.add(pad(prog_h[k % 4], 2.9, 1800, .2, .5), hero0 + k * 2.4, .26)
M.add(drum(hero1 - hero0, 100, .55), hero0, .5)
# 8 · papá llora: respiro ligero
for k, f in enumerate([C4, E4, G4, E4, F4, A4, G4, E4]): M.add(piano(f, 1.6), T['llora'] + k * .5, .12)
# 9 · semifinal: tensión grave y silencio, "míralo mijo" tierno
M.add(pad([A2 / 2, E3 / 2, A2], T['tapas'] - T['semi'] + .5, 500, .8, .4), T['semi'], .45)
M.add(pulse(A2 / 2, T['tapas'] - T['semi'], 70, 1, 400, 8), T['semi'], .5)
M.add(pad([F3 / 2, A2, C3, E3], T['g1'] - T['tapas'], 1200, .6, .4), T['tapas'], .28)
for k, f in enumerate([C5, A4, F4, E4]): M.add(piano(f, 2.4), T['miralo'] + k * .7, .14)
for key in ('g1', 'g2', 'atajada', 'g3'): M.add(boom(1.2 if key != 'g3' else 2.6, 56), T[key] + .1, .55 if key != 'g3' else 1.0)
# 10 · final: épico (Am - F - C - G) con batería, crece hasta el gol
ep0, ep1 = T['enFinal'], T['gooool']
prog_e = [[A2, C3, E3, A3], [F3 / 2, A2, C3, F3], [C3, E3, G3, C4], [G3 / 2, B3 / 2, D3, G3]]
for k in range(int((ep1 - ep0) // 3.2) + 1): M.add(pad(prog_e[k % 4], 3.8, 1500, .4, .6), ep0 + k * 3.2, .3)
M.add(drum(T['m118'] - ep0, 84, .45), ep0, .45)
M.add(boom(2.4, 50), T['ale1'], .5); M.add(boom(2.6, 52), T['gol89'], .9)
M.add(pulse(A2 / 2, T['gooool'] - T['m118'], 60, 1, 300, 6), T['m118'], .55)  # latido lento en cámara lenta
M.add(riser(T['gooool'] - T['piernas'] + .4), T['piernas'] - .4, .35)
# 11 · ¡campeones!: triunfal mayor
tr0, tr1 = T['gooool'], T['peroEse']
M.add(boom(3.2, 46), tr0, 1.0)
prog_t = [[C3, E3, G3, C4], [F3 / 2, A2, C3, F3], [A2, C3, E3, A3], [G3 / 2, B3 / 2, D3, G3]]
for k in range(int((tr1 - tr0) // 2.8) + 1): M.add(pad(prog_t[k % 4], 3.4, 2000, .3, .7), tr0 + .3 + k * 2.8, .3)
M.add(drum(T['doce2'] - tr0, 100, .5), tr0 + .3, .5)
melt = [G4, C5, E5, D5, C5, G4, A4, C5]
for k, f in enumerate(melt): M.add(piano(f, 2.0), T['campeon'] + k * .45, .2)
for k in range(int((tr1 - T['doce2']) / .9)): M.add(piano([E4, G4, C5, G4, A4, F4, G4, E4][k % 8], 1.6), T['doce2'] + .3 + k * .9, .1, pan=.2)
# 12 · la realidad: corte a casi silencio + piano triste
M.add(pad([A2, C3, E3], T['aunAsi'] - T['peroEse'] + .4, 500, .3, .6), T['peroEse'] + .1, .3)
for k, f in enumerate([E4, D4, C4, B3, A3]): M.add(piano(f, 2.6), T['peroEse'] + .3 + k * .8, .14)
# 13 · esperanza → ¿y si sí?
M.add(riser(T['ysisi'] - T['aunAsi']), T['aunAsi'], .3)
M.add(pad([C3, G3, E4], T['ysisi'] - T['aunAsi'], 1400, 1.5, .1), T['aunAsi'], .3)
M.add(boom(3, 46), T['ysisi'] - .05, 1.0)
end0 = T['ysisi'] + .3
for k in range(int((DUR - end0) // 2.8) + 1): M.add(pad(prog_t[k % 4], 3.4, 1700, .5, .9), end0 + k * 2.8, .28)
M.add(drum(T['donde'] - end0, 96, .35), end0, .4)
for k in range(int((DUR - end0) / .9)): M.add(piano([C4, E4, G4, E4, A4, G4, F4, E4][k % 8], 1.6), end0 + k * .9, .1)
M.add(boom(3, 50), T['ysisi2'] - .05, .8)
fade = np.ones(N); nf = int(2.0 * SR); fade[-nf:] = np.linspace(1, 0, nf)
M.x *= fade[:, None]
wav('assets/audio/musica.wav', M.x)

# ---------------- FX ----------------
X = Bus()
A = lambda n: load('assets/audio/' + n)
def gran(src, d, dens=14, pitch=(.92, 1.08), seed=1):
    """cama granular: muchas copias superpuestas con desfase y tono distinto"""
    r = np.random.default_rng(seed); out = np.zeros((int(d * SR), 2)); n = len(src)
    t = 0.0
    while t < d:
        p = r.uniform(*pitch); idx = np.arange(0, n - 1, p); g = src[idx.astype(int)]
        g = g * env(len(g), .15, .25)[:, None]; i = int(t * SR); j = min(len(out), i + len(g))
        out[i:j] += g[: j - i] * r.uniform(.5, 1.0); t += 1.0 / dens * r.uniform(.6, 1.4)
    return out / (dens ** .5)
estadio, rugido, canto = A('estadio.mp3'), A('rugido.mp3'), A('canto.mp3')
bed_noise = lp(hp(rng.standard_normal((N, 2)), 250), 2500) * .05
def amb(t0, t1, g=.35, src=estadio, dens=10):
    d = t1 - t0
    if d <= 0: return
    x = gran(src, d, dens)
    x *= env(len(x), .25, .35)[:, None]; X.add(x, t0, g)
    nz = bed_noise[int(t0 * SR): int(t1 * SR)]
    X.add(nz * env(len(nz), .2, .3)[:, None], t0, g * 1.4)
def roar(t0, d=4.5, g=.9):
    x = gran(rugido, d, 18, (.9, 1.12), seed=int(t0 * 10)); x *= np.linspace(1, .25, len(x))[:, None]; X.add(x, t0, g)
# estadios
amb(0, T['frase'], .45)
amb(T['m113'], T['levanta'], .45)
amb(T['penales1'], T['top4'], .4)
amb(T['semi'], T['tapas'], .35)
amb(T['g1'] - .2, T['enFinal'], .4)
amb(T['trece'], T['extra'], .45)
amb(T['m118'], T['doce2'], .4)
amb(T['y2026'], T['peroEse'], .35, canto, 8)
amb(T['aunAsi'], DUR - 1, .32, canto, 8)
# rugidos de gol
for key in ('santos', 'gol113', 'vuela', 'paraDos', 'g1', 'g2', 'g3', 'gol89'):
    roar(T[key] + (.1 if key not in ('vuela', 'paraDos') else .25), 3.5, .8)
roar(T['gooool'] + .1, 6.0, .85); roar(T['ysisi'] - .05, 4, .7)
# patadas y red
X.add(A('patada-red.mp3'), T['conGol'] + .1, .7)
X.add(A('patada-red.mp3'), T['cabezazo'] - .1, .6); X.add(A('patada-red.mp3'), T['remate'] - .1, .6)
X.add(A('patada-red.mp3'), T['gooool'] - .5, .7)
for key in ('g1', 'g2', 'g3'): X.add(A('patada-red.mp3'), T[key] - .2, .5)
# silbatos
X.add(A('silbato.mp3'), T['penal'] - .05, .9)
X.add(A('silbato.mp3'), T['sigan'] + .3, .6)
X.add(A('silbato.mp3'), T['arbitro2'] + .1, .55)
# rebobinado VHS
X.add(A('rebobinado.mp3'), T['pero'] + .1, .7)
X.add(A('rebobinado.mp3'), T['peroEse'] - .1, .5)
# perro
X.add(A('perro.mp3'), T['perro'] - .1, .6)
# latido en cámara lenta
lat = A('latido.wav')
for k in range(5): X.add(lat, T['piernas'] - .5 + k * .9, .55)
for k in range(3): X.add(lat, T['robben'] + k * .8, .45)
# whooshes en cortes de título
for key in ('frase', 'sinPenal', 'noPasaba', 'cuartos', 'top4', 'enFinal', 'generacion', 'donde'):
    X.add(A('whoosh.mp3'), T[key] - .25, .45)
X.add(A('whoosh-cinematic.mp3'), T['doce'] - 1.2, .35)
# pops de etiquetas
for key in ('doce', 'papa', 'tio', 'abuelo', 'escuela', 'tuNo', 'baston', 'coment', 'like'):
    X.add(A('pop.mp3'), T[key], .35)
# impactos
X.add(A('impact-bass-1.mp3'), T['noEra'], .6); X.add(A('impact-bass-1.mp3'), T['existe'], .5); X.add(A('impact-bass-1.mp3'), T['casi'] + .3, .5)
wav('assets/audio/fx.wav', X.x)
print('ok', DUR)
