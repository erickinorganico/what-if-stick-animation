#!/usr/bin/env python3
"""Crea la carpeta de un episodio nuevo a partir del motor del episodio más reciente.

Copia el motor (core, char, env2, pitch, room, marca, marca3, main2 y las tomas reutilizables del ep. 01), las fuentes y
los efectos; deja un archivo de tomas inicial (src/ep.js) con título, anclas de ejemplo y el cierre de marca, y la
estructura del expediente (guion/, revision/, copys/, audio/, episodio.json, clips.json, README.md).

uso: python herramientas/nuevo_episodio.py ep03-slug "¿Y si …?" [--base ep02] [--id YSS-AAAAMMDD-03]

Después:
  1. Escribe el guion en guion/guion-voz-v1.txt y genera la voz UNA vez (skill voz-elevenlabs).
  2. Pon los tiempos por palabra en proyecto/src/words_ep.js (const WORDS_EP = [...]) y la voz en proyecto/assets/.
  3. Escribe las tomas en proyecto/src/ep.js (ver docs/03-motor.md) y revisa con snap.mjs / probe.mjs.
  4. python herramientas/producir.py <slug>
"""
import argparse
import datetime as dt
import json
import shutil
import sys

from comun import EPISODIOS, episodio

MOTOR = ['core.js', 'char.js', 'env2.js', 'pitch.js', 'room.js', 'marca.js', 'marca3.js', 'main2.js',
         'words.js', 'shots2.js', 'shots3a.js', 'shots3b.js', 'shots3c.js']

EP_JS = r"""// EL HUBIERA · %(titulo)s — tomas del episodio
// El motor del ep. 01 se carga antes (shots2/3a/3b/3c registran sus tomas); aquí se reinician y se definen las nuevas.
SHOTS.length = 0; Object.keys(T).forEach(k => delete T[k]);
window.EP_TITLE = %(titulo_may)s; window.EP_TITLE3 = %(titulo_js)s;
// anclas a la voz: A3('frase exacta') devuelve el segundo en que empieza esa frase (busca en orden, después de la anterior)
const NW3 = WORDS_EP.map(w => norm(w.text)); let _cur3 = 0;
function A3(phrase) { const p = phrase.split(' ').map(norm); for (let i = _cur3; i < NW3.length; i++) { let ok = true; for (let j = 0; j < p.length; j++) if (NW3[i + j] !== p[j]) { ok = false; break; } if (ok) { _cur3 = i + 1; return VO + WORDS_EP[i].start; } } throw new Error('no encontré: ' + phrase); }
const lastW = WORDS_EP[WORDS_EP.length - 1];
window.DUR_EP = VO + lastW.end + 3.7; // 3.7 s para que respire el cierre
Object.assign(T, { inicio: VO + WORDS_EP[0].start, cierre: VO + lastW.start - .1 });
function cielo3(ctx, t, seed = 3) { ctx.fillStyle = '#04040c'; ctx.fillRect(-W, -H, 3 * W, 3 * H); const r = rnd(seed); for (let i = 0; i < 260; i++) { const x = r() * W * 1.4 - W * .2, y = r() * H * 1.4 - H * .2, a = .3 + .7 * r() * (.7 + .3 * Math.sin(t * 2 + i)); ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fillRect(x, y, 2, 2); } }

// ===== 1 · título: fecha del punto de quiebre en mono + pregunta en serif itálica =====
S(0, (ctx, t) => {
  ctx.fillStyle = '#0d0d0f'; ctx.fillRect(-W, -H, 3 * W, 3 * H); cielo3(ctx, t, 30); ctx.fillStyle = 'rgba(13,13,15,.6)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  uiCenter(ctx, V ? 1.28 : 1);
  const k = ease(t, .2, .9, E.out);
  t3(ctx, '00·00·0000', 960, 470, { size: 30, font: MONO3, align: 'center', color: B3V.huesoT, ls: 6, alpha: k });
  t3(ctx, window.EP_TITLE3, 960, 600, { size: 120, italic: true, align: 'center', alpha: k });
}, 960);

// ===== … tus tomas: S(B.bN, (ctx, t) => { … }, encuadreVertical) — una idea por toma, ancladas a los beats (esqueleto.py) =====
// Kit de dirección (src/direccion.js): camara(ctx,t,t0,t1,{a:[cx,cy,z],b:[…]}) · tono(ctx,'casa') · pozo(ctx,x,y,r) · sello(ctx,'JUEVES · 18:40',t,t0,t1)
// figure(ctx,{…, pose: agarre(POSE.stand, o, 'F', [x,y])}) · poses nuevas: explain, think, shrug, offer, crossed, sitLaugh… · habla(t) para la boca
// transicion(B.b30, 'dip', .7) para saltos de tiempo; 'whip' o 'dissolve' solo con razón. Ejemplo de toma:
// S(B.b4, (ctx, t) => {
//   const t1 = B.b5; camara(ctx, t, B.b4, t1, { a: [960, 560, 1.0], b: [930, 545, 1.06] });   // la cámara aterriza
//   drawRoom(ctx, t);                                                                           // fondo
//   const o = { x: 900, y: 900, s: 1.6, dir: 1, t, seed: 4, shirt: '#3a5bd0' };
//   figure(ctx, { ...o, pose: POSE.explain, face: 'smile' }); contacto(ctx, 900, 905, 90);
//   ctx.setTransform(1, 0, 0, 1, 0, 0); tono(ctx, 'casa'); pozo(ctx, 900, 600, 420, .4); sello(ctx, 'JUEVES · 18:40', t, B.b4 + .2, t1);
// }, 900);

// ===== cierre de marca =====
S(T.cierre, (ctx, t) => {
  const t0 = T.cierre; ctx.fillStyle = '#0d0d0f'; ctx.fillRect(-W, -H, 3 * W, 3 * H); cielo3(ctx, t, 44); ctx.fillStyle = 'rgba(13,13,15,.55)'; ctx.fillRect(-W, -H, 3 * W, 3 * H);
  glow(ctx, 960, 520, 900, 'rgba(239,233,223,.07)'); endCard3(ctx, t, t0, {});
  ctx.save(); ctx.fillStyle = `rgba(0,0,0,${prog(t, window.DUR_EP - .8, window.DUR_EP)})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.restore(); vignette(ctx, .6);
});
"""

WORDS_DEMO = 'const WORDS_EP = [{"text": "¿Y", "start": 0.2, "end": 0.4}, {"text": "si", "start": 0.45, "end": 0.6}, {"text": "sí?", "start": 0.65, "end": 1.2}];\n'


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('slug'); ap.add_argument('titulo'); ap.add_argument('--base', default='ep02'); ap.add_argument('--id')
    a = ap.parse_args()
    dst = EPISODIOS / a.slug
    if dst.exists():
        sys.exit(f'Ya existe {dst}')
    base, cfg_b = episodio(a.base)
    pb = base / cfg_b['proyecto']
    num = int(''.join(ch for ch in a.slug.split('-')[0] if ch.isdigit()) or 0)
    p = dst / 'proyecto'
    (p / 'src').mkdir(parents=True)
    for f in MOTOR:
        shutil.copy2(pb / 'src' / f, p / 'src' / f)
    shutil.copytree(pb / 'fonts', p / 'fonts')
    (p / 'assets' / 'audio').mkdir(parents=True)
    for f in (pb / 'assets' / 'audio').iterdir():
        if f.suffix in ('.mp3', '.ogg') or f.name == 'latido.wav':
            shutil.copy2(f, p / 'assets' / 'audio' / f.name)
    shutil.copy2(pb / cfg_b['audio']['script'], p / 'audio_episodio.py')
    (p / 'src' / 'words_ep.js').write_text(WORDS_DEMO, encoding='utf-8')
    titulo_may = a.titulo.upper()
    (p / 'src' / 'ep.js').write_text(EP_JS % {'titulo': a.titulo, 'titulo_js': json.dumps(a.titulo, ensure_ascii=False),
                                              'titulo_may': json.dumps(titulo_may, ensure_ascii=False)}, encoding='utf-8')
    html = (pb / 'index.html').read_text(encoding='utf-8')
    cab = html[:html.index('<script')]
    scripts = ''.join(f'<script src="src/{f}"></script>' for f in
                      ['words.js', 'core.js', 'marca.js', 'marca3.js', 'char.js', 'env2.js', 'pitch.js', 'room.js',
                       'shots2.js', 'shots3a.js', 'shots3b.js', 'shots3c.js', 'words_ep.js', 'ep.js', 'main2.js'])
    (p / 'index.html').write_text(cab + scripts + '\n</body></html>\n', encoding='utf-8')
    from esqueleto import instalar_kit
    instalar_kit(p)  # kit de dirección (poses, brazos sin rigidez, IK, cámara, luz, sellos) y transiciones
    for d in ('guion', 'revision', 'copys', 'audio'):
        (dst / d).mkdir()
    (dst / 'guion' / 'guion-voz-v1.txt').write_text('# Guion de voz v1 · ' + a.titulo + '\n# Una línea por frase. Etiquetas de ElevenLabs v4 permitidas: [pause], [excited]…\n', encoding='utf-8')
    hoy = dt.date.today().strftime('%Y%m%d')
    cfg = {'id': a.id or f'YSS-{hoy}-{num:02d}', 'slug': a.slug, 'numero': num, 'titulo': a.titulo, 'punto_de_quiebre': 'DD·MM·AAAA · ...',
           'estado': 'en producción', 'duracion_s': None, 'proyecto': 'proyecto',
           'audio': {'modo': 'mezclar', 'script': 'audio_episodio.py', 'voz': 'proyecto/assets/voz-elevenlabs.mp3',
                     'musica': 'proyecto/assets/audio/musica.wav', 'fx': 'proyecto/assets/audio/fx.wav', 'maestro': 'audio/mezcla-final.flac'},
           'salida': f'elhubiera-{a.slug}', 'clips': 'clips.json', 'portadas': [], 'notas': ''}
    (dst / 'episodio.json').write_text(json.dumps(cfg, indent=1, ensure_ascii=False), encoding='utf-8')
    (dst / 'clips.json').write_text(json.dumps({'video': f'render/{a.slug}/v_raw.mp4', 'clips': []}, indent=1), encoding='utf-8')
    (dst / 'README.md').write_text(f'# {a.titulo}\n\nEstado: en producción. Ver `episodio.json` y docs/09-checklist-episodio.md.\n', encoding='utf-8')
    print(f'Listo: {dst}\nOJO: audio_episodio.py es una copia del script de {a.base}; reescribe sus cues con las anclas nuevas.')


if __name__ == '__main__':
    main()
