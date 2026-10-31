#!/usr/bin/env python3
"""Transcripción local en español (Whisper base de sherpa-onnx, CPU, sin créditos).

Dos modos:
  texto   transcribe todo el archivo en ventanas de 15 s (para revisar qué dice una toma o un clip)
  buscar  localiza con precisión dónde empieza o termina una frase deslizando el corte cada 50 ms
          espec = desde:hasta:ancla:modo   (modo s = buscar inicio, e = buscar fin)
          ej. "61.0:62.0:64.0:s" prueba cortes de inicio entre 61.0 y 62.0 s, transcribiendo hasta 64.0 s

uso:
  python herramientas/transcribir.py texto clip.mp3
  python herramientas/transcribir.py buscar voz.wav 61.0:62.0:64.0:s 70.0:71.0:66.0:e

Los tiempos por palabra de la voz principal salen de ElevenLabs Scribe (revision/voz-palabras.json); esta herramienta es
para lo que no pasa por ElevenLabs. El modelo lo descarga setup (GitHub: k2-fsa/sherpa-onnx, release asr-models).
"""
import argparse
import subprocess

import numpy as np

from comun import MODELOS, ffmpeg_bin

M = MODELOS / 'sherpa-onnx-whisper-base'


def reconocedor():
    import sherpa_onnx
    return sherpa_onnx.OfflineRecognizer.from_whisper(
        encoder=str(M / 'base-encoder.int8.onnx'), decoder=str(M / 'base-decoder.int8.onnx'), tokens=str(M / 'base-tokens.txt'),
        language='es', task='transcribe', num_threads=2)


def cargar(archivo: str) -> np.ndarray:
    raw = subprocess.run([ffmpeg_bin(), '-v', 'error', '-i', archivo, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768


def trozo(rec, x, a, b) -> str:
    s = rec.create_stream()
    s.accept_waveform(16000, x[int(a * 16000):int(b * 16000)])
    rec.decode_stream(s)
    return s.result.text.strip()


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('modo', choices=['texto', 'buscar']); ap.add_argument('archivo'); ap.add_argument('espec', nargs='*')
    a = ap.parse_args()
    rec, x = reconocedor(), cargar(a.archivo)
    if a.modo == 'texto':
        d = len(x) / 16000
        t = 0.0
        while t < d:
            print(f"[{t:7.2f}–{min(d, t + 15):7.2f}] {trozo(rec, x, t, min(d, t + 15))}")
            t += 15
    else:
        for spec in a.espec:
            a0, a1, e, modo = spec.split(':')
            a0, a1, e = float(a0), float(a1), float(e)
            print('---', spec)
            v = a0
            while v <= a1 + 1e-6:
                txt = trozo(rec, x, v, e) if modo == 's' else trozo(rec, x, e, v)
                print(f'  {"inicio" if modo == "s" else "fin"} {v:.2f}: {txt}')
                v += .05
