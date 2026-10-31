#!/usr/bin/env python3
"""Orquestador de un episodio: del código del motor a los archivos listos para publicar.

Pasos (en orden; cada uno se puede correr solo con --pasos):
  timeline    exporta las anclas de la voz a proyecto/timeline.json
  audio       música y efectos (script del episodio) + mezcla a -14 LUFS  → render/<slug>/mezcla.wav
              (episodios en modo "maestro" usan audio/mezcla-final.flac y se saltan esto)
  render      16:9 y 9:16 cuadro a cuadro, reanudable                      → render/<slug>/h_raw.mp4, v_raw.mp4
  final       MP4 de publicación con grano y audio                         → videos/<slug>/<salida>-16x9.mp4, -9x16.mp4
  ligero      versiones ≤ 29 MB (2 pasadas)                                → videos/<slug>/<salida>-*-ligero.mp4
  cortes      si clips.json está vacío, sugiere y escribe 3 partes + 2 Shorts (cortes.py)  → clips.json, revision/cortes-sugeridos.json
  fragmentos  3 partes + 2 shorts verticales según clips.json (en paralelo) → videos/<slug>/fragmentos/
  qa          duración, LUFS, pico y peso de todo lo entregado             → videos/<slug>/qa.txt
  qa_render   congelados, destellos de un cuadro, negros y sincronía de voz (qa_render.py) → videos/<slug>/*.qa.json
  Cada paso anota su duración en videos/<slug>/tiempos.json.

uso:
  python herramientas/producir.py ep02                          (todo)
  python herramientas/producir.py ep02 --pasos render,final     (solo esos)
  python herramientas/producir.py ep02 --prueba 8               (8 s en ambos formatos, para revisar rápido; no toca videos/)
  python herramientas/producir.py ep02 --workers 4 --force      (más procesos; rehace fragmentos aunque existan)
  python herramientas/producir.py ep03 --animatic               (solo 16:9 con la voz: para aprobar el ritmo antes de animar)

Nunca genera voz: la voz (ElevenLabs) se hace antes con la skill voz-elevenlabs, una sola toma.
"""
import argparse
import json
import shutil
import sys
import time
from pathlib import Path

from comun import HERR, RAIZ, RENDER, VIDEOS, correr, episodio, node

PASOS = ['timeline', 'audio', 'render', 'final', 'ligero', 'cortes', 'fragmentos', 'qa', 'qa_render']


TIEMPOS = {}
_actual = [None, 0.0]


def paso(nombre: str):
    cerrar()
    _actual[:] = [nombre, time.time()]
    print(f'\n=== {nombre} · {time.strftime("%H:%M:%S")} ===', flush=True)


def cerrar():
    if _actual[0]:
        TIEMPOS[_actual[0]] = round(time.time() - _actual[1], 1)
        _actual[0] = None


def en_paralelo(tareas, n=2):
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(n) as ex:
        list(ex.map(lambda f: f(), tareas))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('episodio')
    ap.add_argument('--pasos', default=','.join(PASOS))
    ap.add_argument('--prueba', type=float, help='segundos a renderizar para una prueba rápida')
    ap.add_argument('--workers', type=int, default=0, help='workers de render (0 = la mitad de los núcleos)')
    ap.add_argument('--calidad', action='store_true', help='final y fragmentos con x264 medium (más lento, archivos ~20 %% más chicos)')
    ap.add_argument('--animatic', action='store_true', help='solo 16:9 con la voz, sin audio de efectos: para aprobar el ritmo')
    ap.add_argument('--force', action='store_true')
    ap.add_argument('--partes', action='store_true', help='además divide los completos en partes de 20 MB (para copiar por el puente)')
    a = ap.parse_args()

    carpeta, cfg = episodio(a.episodio)
    slug, salida, au = cfg['slug'], cfg['salida'], cfg['audio']
    pasos = [p.strip() for p in a.pasos.split(',') if p.strip()]
    malos = [p for p in pasos if p not in PASOS]
    if malos:
        sys.exit(f'Pasos desconocidos: {malos}. Válidos: {PASOS}')
    rend = RENDER / slug
    rend.mkdir(parents=True, exist_ok=True)
    vids = VIDEOS / slug
    py = sys.executable
    print(f'{cfg["titulo"]} · {slug} · pasos: {", ".join(pasos)}' + (f' · PRUEBA {a.prueba}s' if a.prueba else ''))

    mezcla = rend / 'mezcla.wav'
    def audio_entrega() -> Path:
        if au['modo'] == 'mezclar' and mezcla.exists():
            return mezcla
        return carpeta / au['maestro']

    if 'timeline' in pasos and au['modo'] == 'mezclar' and not a.prueba and not a.animatic:
        paso('timeline')
        correr([node(), HERR / 'timeline.mjs', carpeta])

    if 'audio' in pasos and au['modo'] == 'mezclar' and not a.prueba and not a.animatic:
        paso('audio')
        correr([py, au['script']], cwd=carpeta / cfg['proyecto'])
        dur = json.loads((carpeta / cfg['proyecto'] / 'timeline.json').read_text(encoding='utf-8'))['DUR']
        correr([py, HERR / 'mezclar.py', '--voz', carpeta / au['voz'], '--musica', carpeta / au['musica'], '--fx', carpeta / au['fx'],
                '--dur', f'{dur:.3f}', '--salida', mezcla])

    if a.animatic:
        paso('animatic render')
        base = rend / 'animatic'
        correr([node(), HERR / 'render.mjs', carpeta, '--formato', 'h', '--salida', base, *(['--workers', a.workers] if a.workers else [])])
        paso('animatic codificar')
        vids.mkdir(parents=True, exist_ok=True)
        dst = vids / f'{salida}-animatic.mp4'
        correr(['ffmpeg', '-y', '-v', 'error', '-i', base / 'h_raw.mp4', '-itsoffset', '0.5', '-i', carpeta / au['voz'], '-map', '0:v', '-map', '1:a',
                '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '26', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', '-shortest', dst])
        cerrar()
        (vids / 'tiempos-animatic.json').write_text(json.dumps(TIEMPOS, indent=1), encoding='utf-8')
        print(f'\nAnimatic listo: {dst} · {TIEMPOS}')
        return

    if a.prueba:
        base = rend / f'prueba-{a.prueba:g}s'
        if 'render' in pasos:
            for f in ('h', 'v'):
                paso(f'render prueba {f}')
                correr([node(), HERR / 'render.mjs', carpeta, '--formato', f, '--hasta', f'{a.prueba:g}', *(['--workers', a.workers] if a.workers else [])])
        for f, nom in (('h', '16x9'), ('v', '9x16')):
            raw = base / f'{f}_raw.mp4'
            if raw.exists():
                correr([py, HERR / 'codificar.py', 'final', raw, audio_entrega(), base / f'prueba-{nom}.mp4'])
        print(f'\nPrueba lista en {base}')
        return

    if 'render' in pasos:
        for f in ('h', 'v'):
            paso(f'render {"16:9" if f == "h" else "9:16"}')
            correr([node(), HERR / 'render.mjs', carpeta, '--formato', f, *(['--workers', a.workers] if a.workers else [])])

    completos = {'16x9': vids / f'{salida}-16x9.mp4', '9x16': vids / f'{salida}-9x16.mp4'}
    if 'final' in pasos:
        paso('final')
        en_paralelo([lambda f=f, nom=nom: correr([py, HERR / 'codificar.py', 'final', rend / f'{f}_raw.mp4', audio_entrega(), completos[nom], *(['--preset', 'medium'] if a.calidad else [])])
                      for f, nom in (('h', '16x9'), ('v', '9x16'))])
        if a.partes:
            correr([py, HERR / 'partes.py', 'dividir', *completos.values()])

    if 'ligero' in pasos:
        paso('ligero')
        en_paralelo([lambda nom=nom, src=src: correr([py, HERR / 'codificar.py', 'ligero', src, vids / f'{salida}-{nom}-ligero.mp4'])
                      for nom, src in completos.items()])

    if 'cortes' in pasos:
        cj = carpeta / cfg['clips']
        if not cj.exists() or not json.loads(cj.read_text(encoding='utf-8')).get('clips'):
            paso('cortes')
            correr([py, HERR / 'cortes.py', carpeta, '--escribir'])

    if 'fragmentos' in pasos:
        paso('fragmentos')
        cmd = [py, HERR / 'fragmentos.py', carpeta / cfg['clips'], '--video', rend / 'v_raw.mp4', '--audio', audio_entrega(),
               '--salida', vids / 'fragmentos', '--workers', max(2, a.workers or 2), *(['--preset', 'medium'] if a.calidad else [])]
        correr(cmd + (['--force'] if a.force else []))

    if 'qa' in pasos:
        paso('qa')
        from medir import medir
        lineas = []
        for p in sorted(vids.rglob('*.mp4')):
            i = medir(p)
            lineas.append(f"{p.relative_to(vids)}: {i['duracion']:.2f} s · {i['video']} · {i['mb']} MB · {i['lufs']} LUFS · pico {i['pico_dbtp']} dBTP")
        (vids / 'qa.txt').write_text('\n'.join(lineas) + '\n', encoding='utf-8')
        print('\n'.join(lineas))

    if 'qa_render' in pasos:
        paso('qa_render')
        crudo = rend / 'h_raw.mp4'
        if crudo.exists():  # la imagen se revisa en el crudo: el grano del final esconde los congelados
            correr([py, HERR / 'qa_render.py', crudo])
        if completos['16x9'].exists():
            correr([py, HERR / 'qa_render.py', completos['16x9'], '--voz', carpeta / au['voz'], '--vo', '0.5'])

    cerrar()
    tf = vids / 'tiempos.json'
    prev = json.loads(tf.read_text(encoding='utf-8')) if tf.exists() else {}
    prev.update(TIEMPOS)
    vids.mkdir(parents=True, exist_ok=True)
    tf.write_text(json.dumps(prev, indent=1), encoding='utf-8')
    print(f'\nTiempos (s): {TIEMPOS} · total {sum(TIEMPOS.values()):.0f} s')
    print(f'\nLISTO · {slug} · entrega en {vids}')


if __name__ == '__main__':
    main()
