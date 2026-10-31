#!/usr/bin/env python3
"""Divide archivos grandes en partes de ≤ 20 MB y los vuelve a unir verificando SHA-256.

Existe porque la copia a la PC desde la nube acepta archivos chicos (por debajo de ~25 MB va directo).
  dividir  ARCHIVO [--mb 20]      → partes/ARCHIVO.part01, .part02… + partes/ARCHIVO.partes.json
  unir     [CARPETA=videos]       → reconstruye cada ARCHIVO a partir de sus partes (setup lo hace solo)

uso:
  python herramientas/partes.py unir
  python herramientas/partes.py dividir videos/ep02-mexico-campeon/elhubiera-ep02-mexico-campeon-16x9.mp4
"""
import argparse
import hashlib
import json
import os
from pathlib import Path

from comun import VIDEOS

# Cada parte empieza con esta cabecera para que ningún sistema la confunda con un MP4 y la "repare" o le inyecte metadatos
# (la carpeta de salidas de la nube de Cowork agrega credenciales C2PA a todo archivo que parezca video, imagen o audio).
CABECERA = b'ELHUBIERA-PARTE\n'


def sha256(p: Path) -> str:
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for b in iter(lambda: f.read(1 << 20), b''):
            h.update(b)
    return h.hexdigest()


def dividir(archivo: Path, mb: float = 20.0) -> None:
    tam = int(mb * 1_000_000)
    dpart = archivo.parent / 'partes'
    dpart.mkdir(exist_ok=True)
    partes = []
    with open(archivo, 'rb') as f:
        i = 1
        while True:
            b = f.read(tam)
            if not b:
                break
            p = dpart / f'{archivo.name}.part{i:02d}'
            p.write_bytes(CABECERA + b)
            partes.append({'archivo': p.name, 'bytes': len(b) + len(CABECERA)})
            i += 1
    man = {'archivo': archivo.name, 'bytes': archivo.stat().st_size, 'sha256': sha256(archivo), 'cabecera': CABECERA.decode().strip(), 'partes': partes}
    (dpart / (archivo.name + '.partes.json')).write_text(json.dumps(man, indent=1, ensure_ascii=False), encoding='utf-8')
    print(f'{archivo.name}: {len(partes)} partes')


def unir(carpeta: Path = VIDEOS) -> int:
    hechos = 0
    for man_p in sorted(carpeta.rglob('*.partes.json')):
        man = json.loads(man_p.read_text(encoding='utf-8'))
        destino = (man_p.parent.parent if man_p.parent.name == 'partes' else man_p.parent) / man['archivo']
        if destino.exists() and destino.stat().st_size == man['bytes'] and sha256(destino) == man['sha256']:
            print(f'ya está unido: {destino.name}')
            continue
        faltan = [p['archivo'] for p in man['partes'] if not (man_p.parent / p['archivo']).exists()]
        if faltan:
            print(f'FALTAN partes de {destino.name}: {", ".join(faltan)}')
            continue
        tmp = destino.with_name(destino.name + '.tmp')
        with open(tmp, 'wb') as out:
            for p in man['partes']:
                b = (man_p.parent / p['archivo']).read_bytes()
                out.write(b[len(CABECERA):] if b.startswith(CABECERA) else b)
        if sha256(tmp) != man['sha256']:
            tmp.unlink()
            print(f'ERROR: el hash de {destino.name} no coincide; vuelve a copiar sus partes')
            continue
        os.replace(tmp, destino)
        hechos += 1
        print(f'unido y verificado: {destino.name} ({man["bytes"] / 1e6:.1f} MB)')
    return hechos


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='modo', required=True)
    d = sub.add_parser('dividir'); d.add_argument('archivos', nargs='+', type=Path); d.add_argument("--mb", type=float, default=20.0)
    u = sub.add_parser('unir'); u.add_argument('carpeta', nargs='?', type=Path, default=VIDEOS)
    a = ap.parse_args()
    if a.modo == 'dividir':
        for x in a.archivos:
            dividir(x, a.mb)
    else:
        unir(a.carpeta)
