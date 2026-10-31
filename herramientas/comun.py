"""Utilidades compartidas por las herramientas de El Hubiera (Windows, macOS y Linux).

Todas las herramientas se corren desde la raíz del repo o desde cualquier carpeta:
las rutas se resuelven contra la raíz (`RAIZ`).
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
HERR = RAIZ / 'herramientas'
EPISODIOS = RAIZ / 'episodios'
VIDEOS = RAIZ / 'videos'
RENDER = RAIZ / 'render'
MODELOS = RAIZ / 'modelos'

# La consola de Windows puede no ser UTF-8: no queremos que un acento tumbe un proceso de 40 minutos.
for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass


def ffmpeg_bin(nombre: str = 'ffmpeg') -> str:
    ruta = shutil.which(nombre)
    if not ruta:
        sys.exit(f'No encuentro {nombre} en el PATH. Corre setup.ps1 (Windows) o setup.sh, o instala FFmpeg.')
    return ruta


def correr(cmd: list, **kw) -> subprocess.CompletedProcess:
    """Ejecuta un comando y truena con un mensaje legible si falla."""
    cmd = [str(c) for c in cmd]
    r = subprocess.run(cmd, **kw)
    if r.returncode != 0:
        sys.exit(f'Falló ({r.returncode}): {" ".join(cmd[:6])} ...')
    return r


def duracion(archivo: Path) -> float:
    r = subprocess.run([ffmpeg_bin('ffprobe'), '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(archivo)],
                       capture_output=True, text=True)
    return float(r.stdout.strip() or 0)


def reemplazo_atomico(tmp: Path, final: Path) -> None:
    os.replace(tmp, final)


def episodio(ref: str | Path) -> tuple[Path, dict]:
    """Acepta 'ep02', 'ep02-mexico-campeon' o una ruta. Devuelve (carpeta, episodio.json)."""
    p = Path(ref)
    if not p.is_absolute() and not p.exists():
        cands = sorted(EPISODIOS.glob(f'{ref}*'))
        cands = [c for c in cands if (c / 'episodio.json').exists()]
        if not cands:
            sys.exit(f'No encuentro el episodio "{ref}" en {EPISODIOS}')
        p = cands[0]
    p = p.resolve()
    if p.name == 'proyecto':
        p = p.parent
    cfg = json.loads((p / 'episodio.json').read_text(encoding='utf-8'))
    return p, cfg


def node() -> str:
    ruta = shutil.which('node')
    if not ruta:
        sys.exit('No encuentro Node.js en el PATH. Corre setup.ps1 / setup.sh.')
    return ruta
