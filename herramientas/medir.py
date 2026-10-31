#!/usr/bin/env python3
"""QA rápido de audio/video: duración, sonoridad integrada (LUFS), pico real (dBTP), resolución y peso.

uso: python herramientas/medir.py archivo1.mp4 [archivo2.wav ...]
Objetivo de entrega: -14 LUFS ±0.5 y pico ≤ -1 dBTP.
"""
import re
import subprocess
import sys
from pathlib import Path

from comun import duracion, ffmpeg_bin


def medir(archivo: Path) -> dict:
    archivo = Path(archivo)
    r = subprocess.run([ffmpeg_bin(), '-hide_banner', '-nostats', '-i', str(archivo), '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True, encoding='utf-8', errors='replace')
    resumen = r.stderr[r.stderr.rfind('Summary:'):] if 'Summary:' in r.stderr else ''
    lufs = re.search(r'I:\s+(-?[\d.]+) LUFS', resumen)
    pico = re.search(r'Peak:\s+(-?[\d.]+|-inf) dBFS', resumen)
    v = subprocess.run([ffmpeg_bin('ffprobe'), '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height',
                        '-of', 'csv=p=0', str(archivo)], capture_output=True, text=True).stdout.strip()
    return {'archivo': archivo.name, 'duracion': duracion(archivo), 'lufs': float(lufs.group(1)) if lufs else None,
            'pico_dbtp': pico.group(1) if pico else None, 'video': v or '-', 'mb': round(archivo.stat().st_size / 1e6, 1)}


if __name__ == '__main__':
    import glob
    archivos = [f for a in sys.argv[1:] for f in (sorted(glob.glob(a)) if any(c in a for c in '*?[') else [a])]  # PowerShell no expande comodines
    for a in archivos:
        i = medir(Path(a))
        ok = i['lufs'] is not None and abs(i['lufs'] + 14) <= 0.6
        print(f"{i['archivo']}: {i['duracion']:.2f} s · {i['video']} · {i['mb']} MB · {i['lufs']} LUFS · pico {i['pico_dbtp']} dBTP {'OK' if ok else 'REVISAR'}")
