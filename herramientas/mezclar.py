#!/usr/bin/env python3
"""Mezcla final: voz al frente, cama (música + efectos) con sidechain bajo la voz, master a -14 LUFS / -1.2 dBTP (2 pasadas).

La voz entra con 0.5 s de retraso (VO = 0.5 en el motor), así que todo queda alineado con timeline.json.

uso:
  python herramientas/mezclar.py --voz episodios/ep02-mexico-campeon/proyecto/assets/voz-v3.wav \\
      --musica episodios/ep02-mexico-campeon/proyecto/assets/audio/musica.wav \\
      --fx episodios/ep02-mexico-campeon/proyecto/assets/audio/fx.wav --dur 216.57 --salida render/ep02-mexico-campeon/mezcla.wav
"""
import argparse
import json
import os
import re
import subprocess
from pathlib import Path

from comun import correr, ffmpeg_bin

VO = 0.5


def mezclar(voz: Path, musica: Path, fx: Path, dur: float, salida: Path, vol_musica=0.24, vol_fx=0.45, lufs=-14.0, tp=-1.2) -> dict:
    salida.parent.mkdir(parents=True, exist_ok=True)
    cruda = salida.with_name(salida.stem + '-cruda.wav')
    ms = int(VO * 1000)
    fc = (f"[0:a]aformat=sample_rates=48000:channel_layouts=stereo,adelay={ms}|{ms},highpass=f=70,"
          f"acompressor=threshold=0.12:ratio=3:attack=5:release=120,apad=whole_dur={dur}[vo];"
          f"[1:a]volume={vol_musica}[mu];[2:a]volume={vol_fx}[fx];[mu][fx]amix=inputs=2:normalize=0[bed];"
          f"[vo]asplit=2[vk][vm];[bed][vk]sidechaincompress=threshold=0.015:ratio=10:attack=8:release=400:knee=4[duck];"
          f"[duck][vm]amix=inputs=2:normalize=0:duration=first[m]")
    correr([ffmpeg_bin(), '-y', '-v', 'error', '-i', voz, '-i', musica, '-i', fx, '-filter_complex', fc, '-map', '[m]',
            '-t', str(dur), '-ar', '48000', '-c:a', 'pcm_s16le', cruda])
    ln = f'loudnorm=I={lufs}:TP={tp}:LRA=11'
    r = subprocess.run([ffmpeg_bin(), '-v', 'info', '-i', str(cruda), '-af', ln + ':print_format=json', '-f', 'null', '-'],
                       capture_output=True, text=True, encoding='utf-8', errors='replace')
    m = json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}', r.stderr, re.S).group(0))
    correr([ffmpeg_bin(), '-y', '-v', 'error', '-i', cruda, '-af',
            f"{ln}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:"
            f"measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000",
            '-c:a', 'pcm_s16le', salida])
    os.remove(cruda)
    from medir import medir
    info = medir(salida)
    print(f"mezcla {salida.name}: {info['lufs']} LUFS · pico {info['pico_dbtp']} dBTP · {info['duracion']:.2f} s")
    return info


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--voz', type=Path, required=True); ap.add_argument('--musica', type=Path, required=True)
    ap.add_argument('--fx', type=Path, required=True); ap.add_argument('--dur', type=float, required=True)
    ap.add_argument('--salida', type=Path, required=True)
    ap.add_argument('--vol-musica', type=float, default=0.24); ap.add_argument('--vol-fx', type=float, default=0.45)
    a = ap.parse_args()
    mezclar(a.voz, a.musica, a.fx, a.dur, a.salida, a.vol_musica, a.vol_fx)
