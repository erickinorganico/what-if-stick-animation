#!/usr/bin/env python3
"""Parte un video en trozos de ~9.4 MB con cabecera, para subirlo desde Claude in Chrome.

Por qué: `file_upload` de Claude in Chrome acepta como máximo 10 MB por llamada, y la
carpeta de salidas de Cowork puede inyectar metadatos en archivos de medios. Cada trozo
lleva la cabecera `ELHUBIERA-CHUNK\\n` (16 bytes); el JS de la página la valida y la quita
antes de rearmar el archivo (ver docs/11-publicar-con-claude.md).

uso:  python herramientas/trocear.py <video.mp4> <carpeta_salida> [MB=9.4]
      → carpeta_salida/c00.bin, c01.bin, …  e imprime el SHA-256 del original
"""
import hashlib
import os
import sys
from pathlib import Path

CAB = b'ELHUBIERA-CHUNK\n'

src, dst = Path(sys.argv[1]), Path(sys.argv[2])
tam = int(float(sys.argv[3]) * 1e6) if len(sys.argv) > 3 else 9_400_000
dst.mkdir(parents=True, exist_ok=True)
for f in dst.glob('c*.bin'):
    f.unlink()

sha = hashlib.sha256()
i = 0
with open(src, 'rb') as fh:
    while True:
        b = fh.read(tam)
        if not b:
            break
        sha.update(b)
        tmp = dst / f'c{i:02d}.bin.tmp'
        tmp.write_bytes(CAB + b)
        tmp.rename(dst / f'c{i:02d}.bin')
        i += 1
print(f'{src.name}: {os.path.getsize(src)} bytes → {i} trozos en {dst}')
print(f'sha256 {sha.hexdigest()}  (compáralo con __ccSha16() en la página: primeros 16)')
