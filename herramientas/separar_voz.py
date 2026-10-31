#!/usr/bin/env python3
"""Separa la voz de una canción o clip (modelo MDX-Net Kim_Vocal_2 de UVR, ONNX, sin GPU ni créditos).

Sirve para rescatar una frase cantada o un grito de un clip (p. ej. el "¡Ay, mamá!" del ep. 02) y meterlo en la voz.
uso: python herramientas/separar_voz.py entrada.mp3 voz.wav instrumental.wav [--modelo modelos/Kim_Vocal_2.onnx]
El modelo lo descarga setup (GitHub: TRvlvr/model_repo, release all_public_uvr_models).
Ojo con derechos: un fragmento de una canción comercial puede activar Content ID.
"""
import argparse, subprocess, sys
import numpy as np, onnxruntime as ort, soundfile as sf
from comun import MODELOS, ffmpeg_bin
ap = argparse.ArgumentParser(); ap.add_argument('entrada'); ap.add_argument('voz'); ap.add_argument('instrumental')
ap.add_argument('--modelo', default=str(MODELOS / 'Kim_Vocal_2.onnx')); A = ap.parse_args()
src, out_voc, out_inst = A.entrada, A.voz, A.instrumental
N_FFT, HOP, DIM_F, DIM_T, COMP = 7680, 1024, 3072, 256, 1.009
CH = HOP * (DIM_T - 1); TRIM = N_FFT // 2; GEN = CH - 2 * TRIM
raw = subprocess.run([ffmpeg_bin(), '-v', 'error', '-i', src, '-ac', '2', '-ar', '44100', '-f', 'f32le', '-'], capture_output=True).stdout
mix = np.frombuffer(raw, np.float32).reshape(-1, 2).T.astype(np.float64)
n = mix.shape[1]; pad = GEN - n % GEN
mixp = np.concatenate([np.zeros((2, TRIM)), mix, np.zeros((2, pad)), np.zeros((2, TRIM))], 1)
win = np.hanning(N_FFT + 1)[:-1]  # periódica, como torch.hann_window
def stft(x):  # x: (L,) -> (F, T) complejo, center=True reflect
    xp = np.pad(x, N_FFT // 2, mode='reflect'); T = 1 + (len(xp) - N_FFT) // HOP
    fr = np.stack([xp[i * HOP:i * HOP + N_FFT] * win for i in range(T)], 1)
    return np.fft.rfft(fr, axis=0)
def istft(S, L):
    T = S.shape[1]; fr = np.fft.irfft(S, n=N_FFT, axis=0) * win[:, None]
    y = np.zeros(N_FFT + HOP * (T - 1)); wsum = np.zeros_like(y)
    for i in range(T): y[i * HOP:i * HOP + N_FFT] += fr[:, i]; wsum[i * HOP:i * HOP + N_FFT] += win ** 2
    y = y / np.maximum(wsum, 1e-8); return y[N_FFT // 2:N_FFT // 2 + L]
sess = ort.InferenceSession(A.modelo, providers=['CPUExecutionProvider'])
outs = []
for i in range(0, n + pad, GEN):
    w = mixp[:, i:i + CH]
    spec = [stft(w[c]) for c in range(2)]  # cada (F, T)
    inp = np.stack([spec[0].real, spec[0].imag, spec[1].real, spec[1].imag])[:, :DIM_F, :DIM_T][None].astype(np.float32)
    o = sess.run(None, {'input': inp})[0][0]
    F = N_FFT // 2 + 1; full = np.zeros((4, F, o.shape[-1])); full[:, :DIM_F] = o
    y = np.stack([istft(full[0] + 1j * full[1], CH), istft(full[2] + 1j * full[3], CH)])
    outs.append(y[:, TRIM:-TRIM])
voc = np.concatenate(outs, 1)[:, :n] * COMP
inst = mix - voc
sf.write(out_voc, voc.T, 44100, subtype='PCM_24'); sf.write(out_inst, inst.T, 44100, subtype='PCM_24')
print(f'ok · {n / 44100:.2f} s · voz → {out_voc} · instrumental → {out_inst}')
