#!/usr/bin/env python3
"""Codificación de entrega.

  final   render crudo + audio maestro → MP4 de publicación (grano fino de película, crf 21, tope 6 Mb/s, AAC 192k)
          v2: preset veryfast por defecto (~2.6× más rápido; el grano se ve casi igual y YouTube recodifica); --preset medium para máxima calidad
  ligero  versión 2 pasadas que cabe en un límite (por defecto 29 MB) para WhatsApp, Drive o la PC

uso:
  python herramientas/codificar.py final  render/ep02-mexico-campeon/h_raw.mp4 render/ep02-mexico-campeon/mezcla.wav videos/ep02-mexico-campeon/elhubiera-ep02-mexico-campeon-16x9.mp4
  python herramientas/codificar.py final  RAW AUDIO SALIDA --copiar-audio      (AUDIO es un MP4/M4A cuyo AAC se copia tal cual)
  python herramientas/codificar.py ligero ENTRADA SALIDA [--mb 29]
"""
import argparse
import os
import tempfile
from pathlib import Path

from comun import correr, duracion, ffmpeg_bin


def final(raw: Path, audio: Path, salida: Path, copiar_audio: bool = False, grano: int = 3, preset: str = 'veryfast') -> None:
    salida.parent.mkdir(parents=True, exist_ok=True)
    tmp = salida.with_name(salida.stem + '.tmp.mp4')
    vf = f'noise=alls={grano}:allf=t' if grano > 0 else 'null'
    acod = ['-c:a', 'copy'] if copiar_audio else ['-c:a', 'aac', '-b:a', '192k', '-ar', '48000']
    correr([ffmpeg_bin(), '-y', '-v', 'error', '-i', raw, '-i', audio, '-map', '0:v:0', '-map', '1:a:0', '-vf', vf,
            '-c:v', 'libx264', '-preset', preset, '-crf', '21', '-maxrate', '6M', '-bufsize', '12M', '-pix_fmt', 'yuv420p',
            *acod, '-movflags', '+faststart', '-shortest', tmp])
    os.replace(tmp, salida)
    print(f'final  {salida.name}  {salida.stat().st_size / 1e6:.1f} MB  {duracion(salida):.2f} s')


def ligero(entrada: Path, salida: Path, mb: float = 29.0, audio_k: int = 128) -> None:
    salida.parent.mkdir(parents=True, exist_ok=True)
    d = duracion(entrada)
    video_k = int(min(2500, (mb * 8 * 1000 * 0.97) / d - audio_k))  # 3 % de margen para el contenedor
    tmp = salida.with_name(salida.stem + '.tmp.mp4')
    with tempfile.TemporaryDirectory() as td:
        log = str(Path(td) / 'pase')
        correr([ffmpeg_bin(), '-y', '-v', 'error', '-i', entrada, '-c:v', 'libx264', '-preset', 'medium', '-b:v', f'{video_k}k',
                '-pass', '1', '-passlogfile', log, '-an', '-f', 'null', '-'])
        correr([ffmpeg_bin(), '-y', '-v', 'error', '-i', entrada, '-c:v', 'libx264', '-preset', 'medium', '-b:v', f'{video_k}k',
                '-pass', '2', '-passlogfile', log, '-c:a', 'aac', '-b:a', f'{audio_k}k', '-movflags', '+faststart', tmp])
    os.replace(tmp, salida)
    print(f'ligero {salida.name}  {salida.stat().st_size / 1e6:.1f} MB  ({video_k} kb/s)')


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='modo', required=True)
    f = sub.add_parser('final'); f.add_argument('raw', type=Path); f.add_argument('audio', type=Path); f.add_argument('salida', type=Path)
    f.add_argument('--copiar-audio', action='store_true'); f.add_argument('--grano', type=int, default=3)
    f.add_argument('--preset', default='veryfast', help='x264: veryfast (~2.6× más rápido, grano casi igual) o medium (máxima calidad por MB)')
    l = sub.add_parser('ligero'); l.add_argument('entrada', type=Path); l.add_argument('salida', type=Path); l.add_argument('--mb', type=float, default=29.0)
    a = ap.parse_args()
    if a.modo == 'final':
        final(a.raw, a.audio, a.salida, a.copiar_audio, a.grano, a.preset)
    else:
        ligero(a.entrada, a.salida, a.mb)
