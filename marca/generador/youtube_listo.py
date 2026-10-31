#!/usr/bin/env python3
"""Deja la carpeta youtube/ del kit lista para subir y verifica los límites de YouTube Studio.

Límites (YouTube Studio, oct 2026):
  banner        ≥ 2048×1152 px, ≤ 6 MB; texto y logo dentro de la zona segura central (1546×423 en 2560×1440)
  foto perfil   ≥ 98×98 px, ≤ 4 MB, PNG o GIF sin animación
  marca de agua 150×150 px recomendado, ≤ 1 MB (PNG con transparencia)
  miniaturas    1280×720 px, ≤ 2 MB (JPG/PNG)

Qué hace:
  - el banner PNG que sale del canvas es RGBA y pesa más de 6 MB por el grano → lo guarda RGB optimizado (sin pérdida, ~4 MB)
  - copia el avatar de 800 px como youtube/youtube-perfil-800.png
  - revisa tamaños y pesos de todo

uso (después de `node kit3_export.mjs`):  python youtube_listo.py [kit=../identidad-v3]
"""
import os
import shutil
import sys
from pathlib import Path

from PIL import Image

KIT = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / 'identidad-v3')
YT = KIT / 'youtube'

banner = YT / 'youtube-banner.png'
im = Image.open(banner)
if im.mode != 'RGB':
    im.convert('RGB').save(banner, optimize=True)
shutil.copy2(KIT / 'perfil' / 'avatar-youtube-800.png', YT / 'youtube-perfil-800.png')

REGLAS = {
    'youtube-banner.png': ((2048, 1152), 6.0),
    'youtube-banner-2560x1440.jpg': ((2048, 1152), 6.0),
    'youtube-banner-2048x1152.jpg': ((2048, 1152), 6.0),
    'youtube-perfil-800.png': ((98, 98), 4.0),
    'youtube-marca-de-agua.png': ((150, 150), 1.0),
}
mal = 0
for nombre, ((mw, mh), mb) in REGLAS.items():
    p = YT / nombre
    if not p.exists():
        print(f'FALTA {nombre}')
        mal += 1
        continue
    w, h = Image.open(p).size
    peso = os.path.getsize(p) / 1e6
    ok = w >= mw and h >= mh and peso <= mb
    mal += not ok
    print(f"{'OK ' if ok else 'MAL'} {nombre}: {w}×{h}, {peso:.2f} MB (mín {mw}×{mh}, máx {mb:g} MB)")
for p in sorted((KIT / 'miniaturas').glob('*-1280x720.jpg')):
    peso = os.path.getsize(p) / 1e6
    ok = Image.open(p).size == (1280, 720) and peso <= 2
    mal += not ok
    print(f"{'OK ' if ok else 'MAL'} miniaturas/{p.name}: {peso:.2f} MB")
print('LISTO para subir' if not mal else f'{mal} archivo(s) fuera de los límites')
sys.exit(1 if mal else 0)
