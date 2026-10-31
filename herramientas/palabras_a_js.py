#!/usr/bin/env python3
"""Convierte los tiempos por palabra (revision/voz-palabras.json, de ElevenLabs Scribe) al archivo que lee el motor.

uso: python herramientas/palabras_a_js.py episodios/ep03-slug/revision/voz-palabras.json episodios/ep03-slug/proyecto/src/words_ep.js
- Quita las etiquetas de ElevenLabs ([excited], [pause]…) y las palabras vacías.
- Conserva "canto": true (líneas cantadas) para que el motor y los subtítulos puedan tratarlas aparte.
- Escribe `const WORDS_EP = [...]` (una sola línea, como words2.js del ep. 02).
"""
import json
import re
import sys
from pathlib import Path

ETIQUETA = re.compile(r'^\[[^\]]*\]$')


def convertir(src: Path, dst: Path) -> int:
    d = json.loads(src.read_text(encoding='utf-8'))
    palabras = d['words'] if isinstance(d, dict) else d
    out = []
    for w in palabras:
        txt = (w.get('text') or '').strip()
        if not txt or ETIQUETA.match(txt) or w.get('type') in ('spacing', 'audio_event'):
            continue
        item = {'text': txt, 'start': round(float(w['start']), 3), 'end': round(float(w['end']), 3)}
        if w.get('canto'):
            item['canto'] = True
        out.append(item)
    dst.write_text('const WORDS_EP = ' + json.dumps(out, ensure_ascii=False) + ';\n', encoding='utf-8')
    return len(out)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    n = convertir(Path(sys.argv[1]), Path(sys.argv[2]))
    print(f'ok · {n} palabras → {sys.argv[2]}')
