#!/usr/bin/env python3
"""ep04 · ¿Y si Cristiano Ronaldo hubiera nacido en México? · música por cue + efectos por acción + ambientes, anclados a la voz (words_ep.js, beats.js, timeline.json)."""
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

# ======== EP 04 · ¿Y si Cristiano Ronaldo hubiera nacido en México? · cues ========
import re as _re
VO = tl.get('VO', .5)
_wtxt = open('src/words_ep.js', encoding='utf-8').read(); WORDS = json.loads(_wtxt[_wtxt.index('['): _wtxt.rindex(']') + 1])
def _n(s): import unicodedata; s = unicodedata.normalize('NFD', s.lower()); return _re.sub(r'[^a-z0-9ñ]', '', ''.join(c for c in s if unicodedata.category(c) != 'Mn'))
_NW = [_n(x['text']) for x in WORDS]
def w(frase, despues=0.0, fin=False):
    tg = [_n(p) for p in frase.split()]
    for i in range(len(_NW) - len(tg) + 1):
        if VO + WORDS[i]['start'] < despues: continue
        if _NW[i:i + len(tg)] == tg: return VO + (WORDS[i + len(tg) - 1]['end'] if fin else WORDS[i]['start'])
    raise SystemExit('sin ancla: ' + frase)
_bt = open('src/beats.js', encoding='utf-8').read(); BE = {b['id']: b['t0'] for b in json.loads(_bt[_bt.index('['): _bt.index('];') + 1])}
CIERRE = VO + WORDS[-1]['end'] + .35

# --- 1 · el llano, domingo (cálido pero melancólico)
chords(Im, 0, w('¿y si cristiano'), 3.2, .2, 1000, .8, .8)
M.add(pulse(A2 / 2, w('es cristiano') - 0.3, 84, 2, 500, 10), 0.3, .22)
M.add(boom(2.0, 60), w('goles') + .1, .35)
for k, f in enumerate([E4, C4, A3]): M.add(piano(f, 2.4), w('ese nombre') + k * .5, .12)
# --- 2 · título + ¿Y si sí?
M.add(pad([A2 / 2, E3 / 2, A2], w('y si sí') - w('¿y si cristiano') + .3, 500, .6, .3), w('¿y si cristiano'), .3)
M.add(riser(w('y si sí') - w('hubiera nacido') + .1), w('hubiera nacido'), .25)
M.add(boom(3.0, 46), w('y si sí') - .05, .55)
# --- 3 · la vida real en Madeira (gris, piano y pad) → los Balones de Oro (sube)
M.add(pad([A2, C3, E3], w('hoy tiene') - w('en la vida real') + .4, 700, 1.0, .6), w('en la vida real'), .24)
melody([E4, A4, C5, B4, A4, E4, G4, E4], w('en la vida real') + .4, w('hoy tiene') - .3, .9, .1, 2.2, .25, skip=(7,))
chords([[A2, C3, E3, A3], [F3 / 2, A2, C3, F3], [C3, E3, G3, C4], [G3 / 2, B3 / 2, D3, G3]], w('hoy tiene') - .1, w('ahora mismo'), 1.3, .26, 2000, .2, .5)
for k, f in enumerate([C5, E5, G5, C5 * 2, E5 * 2]): M.add(piano(f, 1.6), w('cinco balones') + k * .16, .12)
M.add(pad([A2, C3, E3, G3], w('escenario uno') - w('ahora mismo') + .3, 900, .8, .4), w('ahora mismo'), .24)
M.add(boom(2.2, 52), w('tijuana', w('ahora mismo')) + .25, .3)
# --- 4 · escenario uno: el llano (requinto en menor, lento)
def requinto(t0, d, g, notes=(E4, G4, B4, E5, D5, B4, G4, A4), step=.32):
    k = 0
    while k * step < d - .1:
        f = notes[k % len(notes)]; n = int(.7 * SR); tt = np.arange(n) / SR
        x = (np.sin(2 * np.pi * f * tt) + .5 * np.sin(4 * np.pi * f * tt) + .25 * np.sin(6 * np.pi * f * tt)) * np.exp(-tt * 6) * (1 - np.exp(-tt * 400))
        M.add(x * .5, t0 + k * step, g, pan=.2 * (-1) ** k); k += 1
M.add(stab([E3, B3, E4], .6), w('escenario uno') - .02, .2)
M.add(pad([E3 / 2, B2, E3], w('pero', w('refresco')) - w('cristiano tiene doce') + .3, 600, .8, .5), w('cristiano tiene doce'), .22)
requinto(w('cristiano tiene doce'), w('su mamá hace') - w('cristiano tiene doce'), .2)
requinto(w('a los quince'), w('pero', w('refresco')) - w('a los quince'), .2, (E4, B4, A4, G4, E4, D4, E4, B3), .36)
for k, f in enumerate([G4, B4, D5]): M.add(piano(f, 1.2), w('tacos') + .2 + k * .15, .12)
# --- 5 · bisagra: pero… ¿y si no termina…? → ¿Y si sí?
M.add(pad([A2 / 2, E3 / 2, A2, C3], w('y si sí', w('selección')) - w('pero', w('refresco')) + .2, 500, .5, .2), w('pero', w('refresco')), .32)
M.add(riser(w('y si sí', w('selección')) - w('y si la liga')), w('y si la liga'), .3)
M.add(boom(3.0, 46), w('y si sí', w('selección')) - .05, .6)
# --- 6 · escenario dos: Liga MX (fiesta) → pacto (oscuro) → viernes botanero (polka)
t_e2 = w('escenario dos'); t_deb = w('debuta'); t_pac = w('además'); t_bot = w('llega el viernes'); t_e3 = w('escenario tres')
M.add(stab([C4, E4, G4], .6), t_e2 - .02, .2)
chords(I, t_e2 + .3, t_deb, 2.0, .2, 1500, .3, .4)
chords(I, t_deb - .05, t_pac, 1.9, .3, 2200, .2, .5)
M.add(drum(t_pac - t_deb, 118, .5), t_deb - .05, .45)
M.add(boom(2.4, 50), w('ídolo', t_deb) + .05, .5)
M.add(pad([D3, F3, A3], w('y su club') - w('un club de europa') + .2, 900, .3, .2), w('un club de europa'), .24)
for k, f in enumerate([D5, F4 * 2, A5 if False else A4 * 2, D5 * 2]): M.add(piano(f, 1.0), w('llorar') + k * .14, .1)
M.add(pad([A2 / 2, E3 / 2, A2], t_bot - t_pac + .3, 450, .6, .4), t_pac, .32)
M.add(pulse(A2 / 2, w('así que') - t_pac, 76, 2, 450, 9), t_pac, .32)
M.add(boom(2.2, 48), w('multó') - .05, .4)
chords([[A2, C3, E3], [E3 / 2, G3 / 2, B2]], w('así que') - .1, t_bot, 1.9, .16, 800, .3, .4)
polka(t_bot - .05, w('sigue metiendo'), .42)
M.add(pad([A2, C3, E3], t_e3 - w('sigue metiendo') + .2, 700, .2, .3), w('sigue metiendo'), .2)
M.add(stab([A3, C4, E4], .4), w('penal') + .15, .18)
# --- 7 · escenario tres: disciplina (pulso épico) → gol → ¡Siuuu!
t_gim = w('gimnasio'); t_gol = w('gol', w('mete') - .1); t_siu = w('siuuu'); t_pero = w('pero ni así')
M.add(stab([D3, A3, D4], .7), t_e3 - .02, .22)
M.add(pulse(D3 / 2, t_gol - t_gim, 120, 4, 900, 14), t_gim, .28)
epi = [[D3, F3, A3, D4], [A2, C3, E3, A3], [F3 / 2, A2, C3, F3], [C3, E3, G3, C4]]
chords(epi, t_gim, t_gol, 2.0, .26, 2000, .3, .5)
M.add(drum(t_gol - w('con él'), 120, .55), w('con él'), .5)
M.add(boom(2.6, 50), w('campeones') + .35, .45)
M.add(riser(t_gol - w('llega al mundial')), w('llega al mundial'), .3)
M.add(boom(3.0, 44), t_gol + .1, .75)
chords(I, t_gol + .2, t_pero - .1, 1.6, .32, 2400, .1, .5)
M.add(drum(t_pero - t_gol - .3, 128, .55), t_gol + .2, .5)
M.add(boom(3.4, 40), t_siu, .85)
# --- 8 · ni así pasamos de cuartos → reflexión (piano)
M.add(pad([A2, C3, E3], w('el talento de') - t_pero + .5, 500, .1, .8), t_pero, .3)
for k, f in enumerate([E4, D4, C4, B3, A3]): M.add(piano(f, 2.6), t_pero + .3 + k * .55, .14)
chords([[A2, C3, E3], [F3 / 2, A2, C3], [C3, E3, G3], [G3 / 2, B3 / 2, D3]], w('el talento de'), w('y este domingo') - .6, 2.6, .2, 1300, .8, .9)
melody([A4, C5, E5, D5, C5, A4, G4, E4], w('el talento de') + .3, w('ya nació') + .4, .9, .1, 2.6, .2, skip=(3, 7))
# silencio antes del punch: nada nuevo entre «ya nació aquí» y «y este domingo»
M.add(pad([A2 / 2, E3 / 2, A2, C3], CIERRE - w('y este domingo') + .3, 450, 1.2, 1.0), w('y este domingo'), .26)
for k, f in enumerate([E4, A3, C4, B3, A3]): M.add(piano(f, 3.4), w('y este domingo') + .2 + k * 2.2, .13)
M.add(boom(2.6, 44), w('mundial', CIERRE - 3) + .3, .4)
# --- 9 · cierre de marca
M.add(pad([C3, G3, E4, C4 * 2], DUR - CIERRE + .2, 1600, .3, 1.2), CIERRE - .05, .3)
for k, f in enumerate([C5, E5, G5, C5 * 2]): M.add(piano(f, 2.4), CIERRE + .1 + k * .12, .12)
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
bell, tri, data, cimp, woosh, click2 = A('fs-571513-soft-notifications-bell-ding-d.ogg'), A('fs-349504-triangle-open-04.ogg'), A('fs-511418-data-reveal-sound.ogg'), A('fs-177242-cinematic-impact.ogg'), A('fs-683096-woosh.ogg'), A('kenney-interface-click-001.ogg')
# ---------------- EFECTOS POR ACCIÓN Y AMBIENTES ----------------
perro, patada, silbato, rebob, whoosh_, pop = A('perro.mp3'), A('patada-red.mp3'), A('silbato.mp3'), A('rebobinado.mp3'), A('whoosh.mp3'), A('pop.mp3')
def viento(t0, t1, g=.5):  # ambiente exterior: aire y polvo
    d = t1 - t0; x = lp(hp(rng.standard_normal((int(d * SR), 2)), 180), 1200) * .08 * (1 + .4 * np.sin(np.arange(int(d * SR)) / SR * 1.3))[:, None]; X.add(x * env(len(x), .4, .4)[:, None], t0, g)
def cuarto_tono(t0, t1, g=.4):  # interior: zumbido de refri / lámpara
    d = t1 - t0; tt = np.arange(int(d * SR)) / SR; x = (np.sin(2 * np.pi * 60 * tt) * .02 + lp(rng.standard_normal(len(tt)), 400) * .03); X.add(x * env(len(x), .3, .3), t0, g)
def beep(f, d=.12): tt = np.arange(int(d * SR)) / SR; return np.sign(np.sin(2 * np.pi * f * tt)) * .2 * env(len(tt), .005, .02)
def timbre(t0, t1, g=.35):  # teléfono
    k = 0
    while t0 + k * 1.1 < t1:
        for j in range(8): X.add(np.sin(2 * np.pi * (1300 if j % 2 else 1600) * np.arange(int(.05 * SR)) / SR) * .25, t0 + k * 1.1 + j * .05, g)
        k += 1
B_ = BE
# llano (gancho y escenario 1)
viento(0, w('¿y si cristiano'), .6); amb(0, w('¿y si cristiano') - .3, .08, canto, 6)
X.add(patada, w('meter') + .05, .55); roar(w('goles') + .15, 2.5, .22)
X.add(clip(perro, 1.5), w('domingo') + .2, .18)
for tt in (w('tenis') + .1, w('real madrid') + .2, w('aunque'), w('tres', w('aunque')) + .1): X.add(pop, tt, .22)
X.add(woosh, w('¿y si cristiano') - .3, .3); X.add(tri, w('y si sí') - .05, .35)
# Madeira y Lisboa
viento(w('en la vida real'), w('su familia'), .5)
cuarto_tono(w('su familia'), w('su papá'))
viento(w('su papá'), w('y lo ficha'), .45); X.add(silbato, w('a los doce') + .3, .18)
for tt in (w('dos días', 0) if False else w('tres días') , w('días')): X.add(pop, tt, .18)
X.add(click2, w('ficha') + .1, .35)
X.add(lp(rng.standard_normal((int(2.5 * SR), 2)), 500) * .12, w('se va solo'), .5)  # motor del ferry
for tt in (w('escuela'), w('casa'), w('entrenadores')): X.add(pop, tt, .25)
for i in range(5): X.add(bell, w('cinco balones') + i * .16, .12)
X.add(data, w('novecientos') - .1, .3)
viento(w('ahora mismo'), w('escenario uno'), .5); X.add(woosh, w('pero', w('ahora mismo')) - .2, .3)
# escenario 1
X.add(woosh, w('escenario uno') - .25, .3)
viento(w('cristiano tiene doce'), w('su mamá hace'), .5); X.add(clip(perro, 1.2), w('visoría') + .3, .14)
X.add(click2, w('cobra') + .2, .3); X.add(click2, w('la segunda') + .2, .3)
for tt in (w('inscripción'), w('alguien')): X.add(pop, tt, .22)
cuarto_tono(w('su mamá hace'), w('a los quince'))
for tt in (w('gas'), w('renta'), w('tenis', w('renta'))): X.add(pop, tt, .25)
for k in range(8): X.add(np.sin(2 * np.pi * 2400 * np.arange(int(.03 * SR)) / SR) * .3 * np.exp(-np.arange(int(.03 * SR)) / SR * 80), w('a los quince') + .4 + k * .26, .2)  # llave
viento(w('los domingos'), w('pero', w('refresco')), .5); amb(w('los domingos'), w('pero', w('refresco')), .14, canto, 6); roar(w('leyenda') + .1, 2.0, .2)
X.add(pop, w('tacos') - .05, .25)
# bisagra
X.add(rebob, w('pero', w('refresco')) - .1, .35); viento(w('pero', w('refresco')), w('y si la liga'), .4)
X.add(tri, w('y si sí', w('selección')) - .05, .35); X.add(woosh, t_e2 - .25, .3)
# escenario 2
viento(w('un visor'), t_deb, .4); X.add(click2, w('lo ve', w('un visor')) + .1, .3)
amb(t_deb - .05, w('un club de europa') - .1, .3); roar(w('ídolo', t_deb), 3.0, .45); X.add(silbato, t_deb + .1, .2)
cuarto_tono(w('un club de europa'), w('además')); timbre(w('un club de europa'), w('por él') + .3, .2)
for k in range(10): X.add(click2, w('cifra') + k * .12, .15)
X.add(woosh, w('llorar') - .2, .25)
cuarto_tono(t_pac, w('así que'))
for tt in (w('pacto') - .05, w('contrato'), w('permiso')): X.add(pop, tt, .22)
X.add(lp(rng.standard_normal((int(.6 * SR), 2)), 2500) * .3 * env(int(.6 * SR), .01, .4)[:, None], w('no te podías') - .1, .5)  # cadena
for i in range(17): X.add(click2, w('multó') - .1 + i * .07, .22)
X.add(cimp, w('diecisiete clubes') - .05, .3)
X.add(woosh, w('y en una liga') - .2, .2); X.add(pop, w('desciende') + .05, .25)
cuarto_tono(w('nadie le exige'), t_e3)
amb(t_bot - .1, w('a los veintiséis'), .12, canto, 6)
for tt in (w('tamales'), w('guajolotas', t_bot)): X.add(pop, tt - .05, .22)
X.add(tri, w('un solo') + .1, .25)
amb(w('sigue metiendo'), t_e3 - .2, .26); X.add(silbato, w('pero', w('sigue metiendo')) - .3, .2); X.add(patada, w('penal') - .2, .5); roar(w('penal') + .3, 2.0, .3)
# escenario 3
X.add(woosh, t_e3 - .25, .3)
X.add(pop, w('guajolotas', t_e3), .25)
for k in range(8): X.add(beep(1900), w('cinco', t_gim) - .1 + k * .25, .4)
for k in range(4): X.add(lp(rng.standard_normal(int(.25 * SR)), 300) * .4 * env(int(.25 * SR), .01, .2), w('mañana', t_gim) + .3 + k * 1.43, .4)  # respiración
amb(w('con él') - .1, w('su único'), .34); roar(w('campeones') + .1, 3.5, .4)
X.add(pop, w('su único') + .1, .2); X.add(bell, w('doce', w('su único')) + .8, .2)
X.add(woosh, w('llega al mundial') - .2, .3)
amb(w('llega al mundial'), t_pero - .2, .38); X.add(patada, t_gol - .4, .6); roar(t_gol + .1, 4.0, .75)
X.add(whoosh_, w('gira') - .05, .35); roar(t_siu, 3.5, .9)
X.add(A('silbato.mp3'), t_pero + .4, .25)
amb(w('ni con'), w('el talento de') - .2, .08, estadio, 6)
X.add(A('latido.wav'), w('ni con') + .1, .3)
# reflexión y cierre
X.add(tri, w('uno en un millón') + .2, .25)
viento(w('pero en portugal'), w('en méxico el'), .35); X.add(click2, w('apostó') - .1, .3)
viento(w('en méxico el'), w('y a lo mejor'), .5); amb(w('en méxico el'), w('lo que tiene') - .1, .1, canto, 5)
cuarto_tono(w('y a lo mejor'), w('y este domingo') - .3, .5)
viento(w('y este domingo'), CIERRE, .55)
for k in range(5): X.add(patada[: int(.4 * SR)] * env(int(.4 * SR), .002, .2)[:, None], w('y este domingo') + .4 + k * 1.54, .2)  # el balón contra la barda
X.add(clip(perro, 1.5), w('condiciones') + .4, .12)
X.add(tri, CIERRE - .05, .35); X.add(woosh, CIERRE + .9, .22); X.add(A('kenney-interface-click-001.ogg'), CIERRE + 1.95, .4); X.add(pop, CIERRE + 2.1, .28)
wav('assets/audio/fx.wav', X.x)
print('ok', DUR)
