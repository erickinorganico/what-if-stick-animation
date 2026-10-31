#!/usr/bin/env python3
"""Fragmentos verticales a partir del render 9:16 (sin volver a renderizar).

v2 (29 oct 2026): los PNG fijos (badge, punto) se decodifican una sola vez (overlay repite el último cuadro) y la tarjeta final
se repite con el filtro loop; el resultado es idéntico píxel a píxel y ~35 % más rápido. --workers N codifica N fragmentos a la vez.

Cada fragmento: recorte [a, e] → barra de progreso propia (hueso + punto rosa) → etiqueta "PARTE N/3" opcional
→ congelado final de 1.8 s con tarjeta (continúa en la parte N / ¿y tú qué harías? / mira cómo termina) + woosh y pop.

uso:
  python herramientas/fragmentos.py episodios/ep02-mexico-campeon/clips.json \\
      --video render/ep02-mexico-campeon/v_raw.mp4 --audio render/ep02-mexico-campeon/mezcla.wav \\
      --salida videos/ep02-mexico-campeon/fragmentos [--force] [--max-mb 29]

clips.json: {"clips": [{"nombre": "ep02-parte-1-de-3", "a": 0, "e": 62.68, "badge": "badge-1de3", "fin": "fin-parte2"}, ...]}
  fin:   fin-parte2 | fin-parte3 | fin-final | fin-completo   (PNG en herramientas/overlays/)
  badge: badge-1de3 | badge-2de3 | badge-3de3 (opcional)
"""
import argparse
import json
import os
from pathlib import Path

from comun import HERR, correr, ffmpeg_bin

FREEZE = 1.8
OV = HERR / 'overlays'
SFX = HERR / 'sfx'


def un_clip(c: dict, video: Path, audio: Path, out: Path, crf: int = 20, maxrate: str = '8M', preset: str = 'veryfast') -> None:
    a, e = float(c['a']), float(c['e'])
    L = round(e - a, 3)
    D = round(L + FREEZE, 3)
    inputs = ['-ss', str(a), '-t', str(L), '-i', video, '-ss', str(a), '-t', str(L), '-i', audio,
              '-i', OV / f"{c['fin']}.png",
              '-i', SFX / 'woosh.ogg', '-i', SFX / 'pop.mp3', '-i', OV / 'punto.png']
    vf = (f"[0:v]setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration={FREEZE},"
          f"drawbox=x=100:y=1736:w=880:h=24:color=0x0b0b0f@1:t=fill,drawbox=x=140:y=1746:w=800:h=4:color=0x2e2d2e@1:t=fill[v1];"
          f"color=c=0xefe9df:s=800x4:r=30:d={D}[bar];[5:v]format=rgba[pd];"
          f"[v1][bar]overlay=x='140-800+800*min(t/{L}\\,1)':y=1746,drawbox=x=0:y=1746:w=140:h=4:color=0x0b0b0f@1:t=fill[v1b];"
          f"[v1b][pd]overlay=x='131+800*min(t/{L}\\,1)':y=1739[v2];")
    last = 'v2'
    if c.get('badge'):
        inputs += ['-i', OV / f"{c['badge']}.png"]
        vf += f"[6:v]format=rgba[bd];[{last}][bd]overlay=0:0[v3];"
        last = 'v3'
    vf += f"[2:v]format=rgba,loop=loop=-1:size=1,setpts=N/30/TB,trim=duration={D},fade=in:st={L}:d=0.25:alpha=1[ec];[{last}][ec]overlay=0:0:enable='gte(t,{L})',format=yuv420p[vout];"
    ms = int(L * 1000)
    af = (f"[1:a]aresample=48000,aformat=channel_layouts=stereo,afade=t=in:d=0.08,afade=t=out:st={max(0, L - 0.15)}:d=0.15,apad=whole_dur={D}[a0];"
          f"[3:a]aresample=48000,aformat=channel_layouts=stereo,volume=0.35,adelay={max(0, ms - 120)}|{max(0, ms - 120)}[a1];"
          f"[4:a]aresample=48000,aformat=channel_layouts=stereo,volume=0.45,adelay={ms + 150}|{ms + 150}[a2];"
          f"[a0][a1][a2]amix=inputs=3:normalize=0:duration=first[aout]")
    tmp = out.with_name(out.stem + '.tmp.mp4')
    correr([ffmpeg_bin(), '-v', 'error', '-y', *inputs, '-filter_complex', vf + af, '-map', '[vout]', '-map', '[aout]', '-t', str(D),
            '-c:v', 'libx264', '-preset', preset, '-crf', str(crf), '-maxrate', maxrate, '-bufsize', '16M', '-r', '30',
            '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-f', 'mp4', tmp])
    os.replace(tmp, out)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('spec', type=Path); ap.add_argument('--video', type=Path, required=True); ap.add_argument('--audio', type=Path, required=True)
    ap.add_argument('--salida', type=Path, required=True); ap.add_argument('--force', action='store_true')
    ap.add_argument('--max-mb', type=float, default=29.0, help='si un fragmento pasa de esto se recomprime (crf 23, 4 Mb/s)')
    ap.add_argument('--solo', help='nombre de un fragmento')
    ap.add_argument('--workers', type=int, default=2, help='fragmentos en paralelo')
    ap.add_argument('--preset', default='veryfast', help='preset de x264 (medium = archivos ~20 %% más chicos, ~3× más lento)')
    a = ap.parse_args()
    a.salida.mkdir(parents=True, exist_ok=True)
    def uno(c):
        out = a.salida / f"{c['nombre']}.mp4"
        if out.exists() and not a.force:
            return f'salto (ya existe) {out.name}'
        un_clip(c, a.video, a.audio, out, preset=a.preset)
        if out.stat().st_size / 1e6 > a.max_mb:
            un_clip(c, a.video, a.audio, out, crf=23, maxrate='4M', preset=a.preset)
        return f"ok {out.name}  {round(float(c['e']) - float(c['a']) + FREEZE, 2)} s  {out.stat().st_size / 1e6:.1f} MB"

    clips = [c for c in json.loads(a.spec.read_text(encoding='utf-8'))['clips'] if not a.solo or c['nombre'] == a.solo]
    clips.sort(key=lambda c: -(float(c['e']) - float(c['a'])))  # los largos primero
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max(1, a.workers)) as ex:
        for msg in ex.map(uno, clips):
            print(msg, flush=True)

if __name__ == '__main__':
    main()
