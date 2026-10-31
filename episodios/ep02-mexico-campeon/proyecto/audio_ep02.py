#!/usr/bin/env python3
"""YSS-20261025-02 · música sintetizada por cue + SFX anclados a la voz. Uso: python audio_ep02.py (lee timeline.json)"""
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


def gran(src, d, dens=14, pitch=(.92, 1.08), seed=1):
    """cama granular: muchas copias superpuestas con desfase y tono distinto"""
    r = np.random.default_rng(seed); out = np.zeros((int(d * SR), 2)); n = len(src)
    t = 0.0
    while t < d:
        p = r.uniform(*pitch); idx = np.arange(0, n - 1, p); g = src[idx.astype(int)]
        g = g * env(len(g), .15, .25)[:, None]; i = int(t * SR); j = min(len(out), i + len(g))
        out[i:j] += g[: j - i] * r.uniform(.5, 1.0); t += 1.0 / dens * r.uniform(.6, 1.4)
    return out / (dens ** .5)
TB_ = lambda k: T[k]
TC_ = lambda k: T[k]
# ======== EP 02 · cues ========
A2, B2, C3, D3, E3, F3, G3, A3, B3, C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, G5 = 110, 123.47, 130.81, 146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25, 587.33, 659.25, 783.99
I = [[C3, E3, G3], [G3 / 2, B3 / 2, D3], [A2, C3, E3], [F3 / 2, A2, C3]]   # C G Am F
Im = [[A2, C3, E3], [F3 / 2, A2, C3], [C3, E3, G3], [G3 / 2, B3 / 2, D3]]  # Am F C G
def chords(prog_, t0, t1, step, g, fc=1400, a=.4, r=.6, off=0):
    k = 0
    while t0 + k * step < t1 - .3: M.add(pad(prog_[(k + off) % len(prog_)], min(step + .6, t1 - (t0 + k * step) + .3), fc, a, r), t0 + k * step, g); k += 1
def melody(notes, t0, t1, step, g, d=1.5, pan=.2, skip=()):
    k = 0
    while t0 + k * step < t1 - .2:
        if k % 8 not in skip: M.add(piano(notes[k % len(notes)], d), t0 + k * step, g, pan=pan * (-1) ** k)
        k += 1
def accordion_tone(f, d):
    t = np.arange(int(d * SR)) / SR; vib = 1 + .004 * np.sin(2 * np.pi * 5.5 * t)
    x = sum(np.sign(np.sin(2 * np.pi * f * dt * np.cumsum(vib) / SR)) * w for dt, w in ((1, .5), (1.004, .35), (2.002, .2)))
    return lp(x, 2600) * env(len(t), .02, .08) * .4
def polka(t0, t1, g, bpm=124):
    beat = 60 / bpm; bass = [C3 / 2, G3 / 4, F3 / 2, G3 / 4]; prog_ = [[C4, E4, G4], [B3, D4, G4], [C4, F4, A4], [B3, D4, G4]]
    mel = [E5, D5, C5, D5, E5, E5, G5, E5, D5, C5, D5, G4, C5, E5, D5, C5]
    k = 0
    while t0 + k * beat < t1 - .2:
        tk = t0 + k * beat; bar = (k // 4) % 4
        if k % 2 == 0: M.add(lp(tone(bass[bar], .26, 'saw'), 500) * env(int(.26 * SR), .005, .1) * .9, tk, g)
        else:
            for f in prog_[bar]: M.add(accordion_tone(f, .2) * .5, tk, g * .7)
        if k % 2 == 0: M.add(accordion_tone(mel[(k // 2) % len(mel)], beat * .9), tk, g * .55, pan=.15)
        k += 1
def tinkle(d=1.6, n=40, seed=5):
    r = np.random.default_rng(seed); out = np.zeros(int(d * SR))
    for i in range(n):
        t0 = r.uniform(0, d * .6) * (r.uniform() ** 1.5); f = r.uniform(2200, 7000); L = int(r.uniform(.05, .3) * SR); t = np.arange(L) / SR
        s = np.sin(2 * np.pi * f * t) * np.exp(-t * r.uniform(12, 30)); j = int(t0 * SR); out[j:j + L] += s[: len(out) - j] * r.uniform(.2, .6)
    burst = hp(rng.standard_normal(int(.25 * SR)), 2500) * np.exp(-np.arange(int(.25 * SR)) / SR * 14)
    out[:len(burst)] += burst * .8
    return out
def stab(fs, d=.5): x = sum(tone(f, d, 'saw', (-.006, .006)) for f in fs) / len(fs); return lp(x, 3000) * env(len(x), .005, .3)
def rain(d): x = hp(lp(rng.standard_normal((int(d * SR), 2)), 6000), 900) * .12; return x * env(len(x), 1.0, 1.0)[:, None]

# 1 · noche del 5 de julio: tensión que crece hasta el disparo
chords(Im, 0, T['mexico'], 3.4, .26, 900, 1.0, .8)
M.add(pulse(A2 / 2, T['ochenta'] - T['mexico'], 92, 2, 600), T['mexico'], .45)
M.add(pad([A2 / 2, E3 / 2, A2], T['disparo'] - T['ochenta'] + .2, 400, .4, .2), T['ochenta'], .4)
M.add(riser(T['adentro'] - T['disparo'] + .1), T['disparo'] - .1, .35)
M.add(boom(3.0, 46), T['adentro'] + .05, .7)
chords(I, T['adentro'] + .3, T['real'] - .2, 2.4, .3, 2000, .2, .5)
M.add(drum(T['real'] - T['adentro'] - .5, 112, .55), T['adentro'] + .3, .5)
M.add(boom(3.2, 40), T['sismo'] + .15, .7)
# 2 · la realidad: piano triste → pero... ¿y si sí?
M.add(pad([A2, C3, E3], T['pero'] - T['real'] + .4, 500, .2, .5), T['real'], .3)
for k, f in enumerate([E4, D4, C4, B3, A3]): M.add(piano(f, 2.4), T['real'] + .3 + k * .6, .14)
M.add(pad([D3, G3, A3], T['ysisi'] - T['pero'] + .2, 1300, .5, .1), T['pero'], .3)
M.add(boom(3, 46), T['ysisi'] - .05, .55)
# 3 · el camino a la final y campeón
chords(I, T['cuartos'] - .1, T['mxc'] - .2, 2.2, .28, 1800, .2, .4)
M.add(drum(T['mxc'] - T['cuartos'], 108, .55), T['cuartos'] - .1, .5)
M.add(riser(T['mxc'] - T['final']), T['final'], .3)
M.add(boom(3.4, 44), T['mxc'] - .1, 1.0)
chords([[C3, E3, G3, C4], [F3 / 2, A2, C3, F3], [A2, C3, E3, A3], [G3 / 2, B3 / 2, D3, G3]], T['mxc'], T['aqui'], 2.6, .32, 2200, .3, .7)
melody([G4, C5, E5, D5, C5, G4, A4, C5], T['campeon'], T['aqui'] - .3, .45, .2, 2.0)
# 4 · y aquí empieza lo interesante
chords([[C3, E3, G3], [A2, C3, E3]], T['aqui'], T['noche'], 2.2, .2, 900, .5, .5)
melody([E4, G4, A4, G4], T['aqui'] + .3, T['osi'] - .2, .55, .1, 1.4)
M.add(piano(G5, 1.0), T['osi'], .2); M.add(piano(C5 * 2, 1.0), T['osi'] + .18, .16)
# 5 · fiesta en la calle (CDMX y Tijuana)
chords(I, T['noche'], T['nueve'], 1.95, .3, 2200, .1, .4)
M.add(drum(T['nueve'] - T['noche'], 122, .6), T['noche'], .55)
melody([C5, E5, G5, E5, D5, C5, D5, E5], T['noche'] + .2, T['nueve'] - .4, .49, .12, 1.2, skip=(3, 7))
# 6 · baby boom: cajita musical
melody([C5 * 2, G5, E5, G5, C5 * 2, D5 * 2 if False else E5 * 2, D5, G5], T['nueve'], T['cambio'] - .2, .38, .1, 1.2, .3)
chords([[C4, E4, G4], [F3, A3, C4]], T['nueve'], T['cambio'], 1.5, .14, 1600, .3, .5)
# 7 · el cambio en la cabeza
chords([[F3 / 2, A2, C3, E3], [C3, E3, G3, B3]], T['cambio'], T['decadas'], 2.1, .24, 1200, .6, .6)
M.add(piano(E5, 3.0), T['cabeza'] + .2, .22); M.add(piano(B4, 3.0), T['cabeza'] + .45, .16)
# 8 · el chiste de siempre (cantina) → se muere
chords([[A2, C3, E3], [E3 / 2, G3 / 2, B2]], T['decadas'], T['muere2'], 1.9, .18, 700, .3, .4)
melody([A4, C5, B4, A4, E4, A4, G4, E4], T['decadas'] + .3, T['muere2'] - .3, .63, .09, 1.6, .25, skip=(7,))
M.add(boom(2.6, 50), T['muere2'] - .02, .5)
# 9 · generación del sí se puede
chords(I, T['generacion'], T['pais'], 1.8, .24, 1600, .6, .5)
M.add(riser(T['sepuede'] - T['generacion']), T['generacion'], .25)
M.add(boom(2.6, 52), T['sepuede'], .5)
# 10 · Plan Campeón: pulso optimista
chords(I, T['pais'], T['entonces'], 2.4, .24, 1800, .3, .5)
M.add(pulse(C3, T['entonces'] - T['pais'], 100, 4, 1200, 16), T['pais'], .22)
M.add(drum(T['entonces'] - T['cancha'], 100, .4), T['cancha'], .4)
for key in ('plan', 'cancha', 'becas', 'fabricas'): M.add(stab([C4, E4, G4, C5], .5), T[key], .14)
# 11 · lo que nadie creía posible: la esquina
M.add(pad([A2 / 2, E3 / 2, A2, C3], TB_('ahora') - T['entonces'] + .3, 450, .8, .3), T['entonces'], .4)
M.add(pulse(A2 / 2, TB_('ahora') - T['chavo'], 70, 1, 400, 8), T['chavo'], .45)
chords([[C3, E3, G3, C4], [G3 / 2, B3 / 2, D3, G3], [A2, C3, E3, A3], [F3 / 2, A2, C3, F3]], TB_('ahora') - .1, T['anio'], 1.8, .28, 1900, .4, .5)
M.add(drum(T['anio'] - T['perder'], 100, .4), T['perder'], .4)
# 12 · la violencia baja (tres pasos) y el noticiero
M.add(pad([F3 / 2, A2, C3, E3], T['undia'] - T['anio'] + .2, 900, .4, .4), T['anio'], .26)
for k, key in enumerate(('baja1', 'baja2', 'baja3')):
    for j, f in enumerate([[E5, D5], [C5, B4], [A4, G4]][k]): M.add(piano(f, 1.8), T[key] + .25 + j * .25, .18)
M.add(stab([C4, G4, C5, E5], .35), T['noticiero'] - .05, .2); M.add(stab([D4, A4, D5, F4 * 2], .5), T['noticiero'] + .3, .2)
chords([[C3, E3, G3], [F3 / 2, A2, C3]], TB_('nada'), T['celular'], 1.2, .2, 1600, .2, .4)
# 13 · vida diaria: groove ligero (Metro, bici, mamá)
chords([[C3, E3, G3], [A2, C3, E3], [F3 / 2, A2, C3], [G3 / 2, B3 / 2, D3]], T['celular'], T['corridos'], 2.5, .2, 1500, .2, .4)
M.add(drum(T['corridos'] - T['celular'], 96, .35), T['celular'], .35)
M.add(pulse(C3 / 2, T['corridos'] - T['celular'], 96, 2, 500, 10), T['celular'], .3)
# 14 · corridos de ciencia y filosofía: polka norteña → canto estilo tumbado → Foro Sol
def requinto(t0, d, g):
    notes = [E4, G4, B4, E5, D5, B4, G4, A4]; k = 0
    while k * .2 < d - .1:
        f = notes[k % len(notes)]; n = int(.5 * SR); tt = np.arange(n) / SR
        x = (np.sin(2 * np.pi * f * tt) + .5 * np.sin(4 * np.pi * f * tt) + .25 * np.sin(6 * np.pi * f * tt)) * np.exp(-tt * 7) * (1 - np.exp(-tt * 400))
        M.add(x * .5, t0 + k * .2, g, pan=.25); k += 1
def tumbado(t0, t1, g):
    beat = 60 / 76; k = 0
    while t0 + k * beat / 2 < t1 - .1:
        tk = t0 + k * beat / 2
        if k % 4 in (0, 3): M.add(lp(tone([E3 / 2, B2 / 2][(k // 8) % 2], .4, 'saw'), 300) * env(int(.4 * SR), .005, .25) * 1.2, tk, g)
        if k % 2 == 1: sn = hp(rng.standard_normal(int(.12 * SR)), 2000) * np.exp(-np.arange(int(.12 * SR)) / SR * 30) * .4; M.add(sn, tk, g * .6)
        k += 1
    requinto(t0, t1 - t0, g * .9)
polka(T['corridos'], T['canto'] - .25, .5)
for k, f in enumerate([C5, E5, G5, C5 * 2, E5 * 2]): M.add(piano(f, 1.6), T['ciencia'] + .3 + k * .06, .12)
tumbado(T['canto'] - .35, T['belico'] - .05, .5)
polka(T['belico'] - .05, T['librerias'] + .3, .42)
# 15 · librerías: superación personal agotada → la hoguera
chords([[F3 / 2, A2, C3], [C3, E3, G3]], T['librerias'] + .3, T['quemo'] - .1, 1.3, .16, 1200, .3, .4)
melody([C5, B4, G4, E4], T['quemo'], T['y2036'] - .3, .45, .1, 1.0, .3)
M.add(piano(G4, 1.2), T['basura'] + .2, .14); M.add(piano(C4, 1.6), T['basura'] + .45, .14)
M.add(boom(3.2, 44), T['y2036'] - .05, .5)
chords([[A2, C3, E3, A3], [F3 / 2, A2, C3, F3], [C3, E3, G3, C4], [G3 / 2, B3 / 2, D3, G3]], T['y2036'] + .2, T['tokio'], 2.0, .3, 2200, .3, .5)
M.add(drum(T['tokio'] - T['entra'], 116, .5), T['entra'], .5)
M.add(boom(2.4, 52), T['economias'] + .4, .6)
# 16 · Tokio: ciudad de noche
M.add(pad([D3, F3, A3, C4], T['detiene'] - T['tokio'] + .3, 1100, .6, .3), T['tokio'], .26)
melody([A4, C5, D5, F4 * 2, E5, C5], T['tokio'] + .3, T['hecho'] - .2, .42, .08, 1.0, .35)
M.add(boom(2.2, 56), T['hecho'] - .05, .55)
chords(I, T['hecho'], T['detiene'] + .2, 1.6, .22, 1800, .1, .2)
# 17 · México no se detiene: montaje épico 2040–2050
epi = [[A2, C3, E3, A3], [F3 / 2, A2, C3, F3], [C3, E3, G3, C4], [G3 / 2, B3 / 2, D3, G3]]
chords(epi, T['detiene'] - .05, T['y2060'], 1.9, .3, 2200, .2, .5)
M.add(drum(T['y2060'] - T['detiene'], 126, .55), T['detiene'], .5)
for key in ('y2040', 'y2045', 'y2050'): M.add(boom(1.8, 54), T[key] - .05, .5)
M.add(riser(T['ia'] + .5 - T['y2040'] - .5), T['y2040'] + .5, .22); M.add(boom(2.2, 50), T['ia'] + .55, .55)
melody([G4, C5, E5, D5, C5, G4, A4, C5], T['verde'] - .1, T['y2050'] - .2, .4, .16, 1.6)
melody([E5, D5, C5, G4], T['olla'] + .1, T['y2060'] - .3, .5, .12, 1.4)
# 18 · 2060: primer contacto y el taco al pastor
M.add(pad([D3, A3, E4, F4], T['orbita'] - T['y2060'] + .3, 900, 1.2, .4), T['y2060'] - .1, .3)
for k, f in enumerate([A4, E5, D5, A4, F4 * 2, E5]): M.add(piano(f, 2.6), T['contacto'] + k * .3, .1, pan=.3 * (-1) ** k)
chords([[C3, E3, G3], [F3 / 2, A2, C3], [G3 / 2, B3 / 2, D3], [C3, E3, G3]], T['orbita'] - .1, T['celebrar'], 1.6, .22, 1700, .2, .4)
melody([C5, D5, E5, G5, E5, D5, C5, G4], T['orbita'], T['celebrar'] - .3, .4, .1, 1.0, .3, skip=(7,))
M.add(drum(T['celebrar'] - T['taco'], 104, .35), T['taco'], .35)
# 19 · el primer Universal y la final contra Andrómeda
chords([[C3, E3, G3, C4], [F3 / 2, A2, C3, F3], [G3 / 2, B3 / 2, D3, G3]], T['celebrar'] - .05, T['finalU'], 1.6, .3, 2200, .2, .5)
for k in range(4): M.add(stab([C4, E4, G4, C5], .45), T['celebrar'] + k * .55, .16)
M.add(boom(3.0, 46), T['universal'] - .05, .8)
M.add(pad([A2 / 2, E3 / 2, A2], T['disparo2'] - T['finalU'] + .2, 500, .4, .2), T['finalU'], .35)
M.add(pulse(A2 / 2, T['disparo2'] - T['m89'], 96, 2, 600), T['m89'], .45)
M.add(riser(T['adentro2'] - T['disparo2'] + .1), T['disparo2'] - .1, .35)
M.add(boom(3.0, 46), T['adentro2'] + .05, .7)
chords(I, T['adentro2'] + .3, T['ysisiF'] - .1, 1.9, .3, 2200, .2, .5)
M.add(drum(T['sismoM'] - T['adentro2'] - .4, 120, .5), T['adentro2'] + .3, .5)
M.add(boom(3.2, 40), T['sismoM'] + .15, .6)
# 20 · ¿Y si sí? final
M.add(boom(3, 48), T['ysisiF'] - .05, .45)
M.add(pad([C3, G3, E4, C4 * 2], DUR - T['ysisiF'] + .2, 1600, .3, 1.2), T['ysisiF'] - .05, .3)
for k, f in enumerate([C5, E5, G5, C5 * 2]): M.add(piano(f, 2.4), T['ysisiF'] + .1 + k * .12, .12)
fade = np.ones(N); nf = int(2.0 * SR); fade[-nf:] = np.linspace(1, 0, nf)
M.x *= fade[:, None]
wav('assets/audio/musica.wav', M.x)

# ---------------- FX ----------------
X = Bus()
A = lambda n: load('assets/audio/' + n)
estadio, rugido, canto = A('estadio.mp3'), A('rugido.mp3'), A('canto.mp3')
bed_noise = lp(hp(rng.standard_normal((N, 2)), 250), 2500) * .05
def amb(t0, t1, g=.35, src=estadio, dens=10):
    d = t1 - t0
    if d <= 0: return
    x = gran(src, d, dens); x *= env(len(x), .25, .35)[:, None]; X.add(x, t0, g)
    nz = bed_noise[int(t0 * SR): int(t1 * SR)]; X.add(nz * env(len(nz), .2, .3)[:, None], t0, g * 1.4)
def roar(t0, d=4.5, g=.9):
    x = gran(rugido, d, 18, (.9, 1.12), seed=int(t0 * 10)); x *= np.linspace(1, .25, len(x))[:, None]; X.add(x, t0, g)
def clip(x, d, fi=.05, fo=.4): x = x[: int(d * SR)].copy(); return x * env(len(x), fi, fo)[:, None]
E_ = lambda n: load('assets/sfx_el/' + n)
claxon, poste, metro, bebe = E_('claxon.mp3'), E_('poste.mp3'), E_('metro.mp3'), E_('bebe.mp3')
bell, tri, data, cimp, woosh, click2 = A('fs-571513-soft-notifications-bell-ding-d.ogg'), A('fs-349504-triangle-open-04.ogg'), A('fs-511418-data-reveal-sound.ogg'), A('fs-177242-cinematic-impact.ogg'), A('fs-683096-woosh.ogg'), A('kenney-interface-click-001.ogg')
# estadios
amb(0, T['real'] - .1, .34)
amb(T['mxc'] - .2, T['aqui'], .38)
amb(T['noche'], T['tijuana'], .26, canto, 8)
amb(TC_('metaf'), T['librerias'], .35, canto, 8)
amb(T['finalU'], T['disparo2'] - .3, .38, estadio, 10)
amb(T['brinca2'], T['sismoM'] - .2, .4, canto, 8)
for key, d in (('adentro', 6.0), ('mxc', 4.5), ('sepuede', 3.0), ('foro', 3.0), ('adentro2', 6.0)):
    roar(T[key] + .1, d, .8 if key in ('adentro', 'mxc', 'adentro2') else .4)
# el gol: patada, poste y red
X.add(A('patada-red.mp3'), T['disparo'] + .05, .6)
X.add(clip(poste, 2.5), T['poste'] + .22, .75)
for k in range(3): X.add(A('latido.wav'), T['ochenta'] + .2 + k * .8, .35)
X.add(A('silbato.mp3'), T['real'] - .3, .3)
X.add(A('rebobinado.mp3'), T['real'] - .15, .4)
# cláxones y bebés
X.add(clip(claxon, 5.2, .1, 1.2), T['claxon'] - .4, .35)
X.add(clip(claxon[int(6 * SR):], 3.5, .2, 1.0), T['sandiego'] - .1, .28)
X.add(bebe, T['bebes'] + .1, .5); X.add(bebe, T['golFinal'] + .2, .45)
# cabeza, chiste roto, sí se puede
X.add(tri, T['cabeza'] + .15, .4)
neon = np.sin(2 * np.pi * 120 * np.arange(int((T['muere2'] - T['chiste']) * SR)) / SR) * .03
X.add(neon * env(len(neon), .05, .05), T['chiste'] - .05, 1.0)
X.add(tinkle(1.8, 60, 7), T['muere2'] - .02, .25); X.add(cimp, T['muere2'] - .02, .3)
# Plan Campeón: flashes de cámara y pops
for k in range(6): X.add(click2, T['pais'] + .3 + k * .55 + (k % 2) * .17, .35)
for key in ('cancha', 'becas', 'fabricas', 'beca', 'robotica', 'box'): X.add(A('pop.mp3'), T[key], .35)
X.add(A('pop.mp3'), TB_('escuela'), .25); X.add(A('pop.mp3'), TB_('autos'), .25)
# noticiero, Metro, bici, mamá
X.add(clip(metro, 2.0, .1, .5), T['metro'] - .2, .5)
X.add(bell, TB_('sigue') + .2, .35)
for tt in (T['mama'] + .45, T['bueno'] + 1.2, TB_('pero3') + .15, T['costumbre'] + .25): X.add(bell, tt, .3)
X.add(A('whoosh.mp3'), T['dosdias'] - .2, .45)
# corridos: tachones y aplausos
for tt in (T['armas'] + .15, TC_('convoyes') + .15): X.add(A('whoosh.mp3'), tt, .3)
X.add(tri, T['ciencia'] + .3, .35)
roar(T['belico'] + .6, 3.0, .25)
X.add(cimp, T['superacion'] + .4, .35)
crack = np.zeros(int((T['y2036'] - T['quemo'] + .2) * SR)); r_ = np.random.default_rng(3)
for i in range(int(len(crack) / SR * 30)):
    j = r_.integers(0, len(crack) - 400); crack[j:j + 400] += r_.standard_normal(400) * np.exp(-np.arange(400) / 60) * r_.uniform(.2, 1)
crack = hp(crack, 1500) * .5 + lp(rng.standard_normal(len(crack)), 300) * .15
X.add(crack * env(len(crack), .2, .4), T['quemo'] - .1, .5)
# 2036 y exportaciones
X.add(cimp, T['y2036'] - .05, .45)
for k in range(9): X.add(click2, T['entra'] + k * .05, .18)
X.add(data, T['economias'] - .1, .4)
for key in ('carros', 'chips2', 'medicinas', 'aguacate', 'tequila'): X.add(A('pop.mp3'), T[key], .32)
X.add(bell, TC_('prende') + .2, .35); X.add(cimp, T['hecho'] - .05, .35)
# 2040–2060
rumble = lp(rng.standard_normal(int((T['marte'] - T['y2045']) * SR)), 180) * .9
X.add(rumble * env(len(rumble), .3, .5), T['y2045'] + .25, .6)
X.add(tri, T['verde'], .4)
for k in range(3): X.add(click2, T['tresdias'] + .3 + k * .45, .3)
for k in range(5): X.add(A('pop.mp3'), T['olla'] + k * .05, .18)
X.add(bell, T['olla'] + 1.3, .25)
hum = np.sin(2 * np.pi * (90 + 8 * np.sin(2 * np.pi * 3 * np.arange(int(2.5 * SR)) / SR)) * np.arange(int(2.5 * SR)) / SR) * .3
X.add(hum * env(len(hum), .4, .8), T['contacto'] - .8, .5)
X.add(A('pop.mp3'), T['pina'] + .05, .4); X.add(bell, T['pina'] + .75, .3); X.add(A('pop.mp3'), T['quedan'] + .1, .3)
X.add(A('patada-red.mp3'), T['disparo2'] + .05, .6)
X.add(clip(poste, 2.5), T['poste3'] + .18, .7)
X.add(A('silbato.mp3'), T['finalU'] + .1, .3)
# la placa y el cierre
X.add(tri, T['ysisiF'] - .05, .4)
X.add(woosh, T['ysisiF'] + .9, .25); X.add(A('kenney-interface-click-001.ogg'), T['ysisiF'] + 1.95, .45); X.add(A('pop.mp3'), T['ysisiF'] + 2.1, .3)
for key in ('ysisi', 'cuartos', 'cambio', 'decadas', 'generacion', 'pais', 'cancha', 'entonces', 'anio', 'undia', 'celular', 'bici', 'mama', 'corridos', 'canto', 'belico', 'librerias', 'quemo', 'exporta', 'tokio', 'detiene', 'y2040', 'y2045', 'marte', 'y2050', 'y2060', 'orbita', 'quedan', 'celebrar', 'finalU', 'm89', 'ysisiF'):
    X.add(woosh, T[key] - .25, .3)
wav('assets/audio/fx.wav', X.x)
print('ok', DUR)
