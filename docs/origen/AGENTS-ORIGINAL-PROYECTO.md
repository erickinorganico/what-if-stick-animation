# Instrucciones para agentes (Claude Code, Cowork, Codex)

Estás en el repo del canal **El Hubiera** (@aquielhubierasiexiste). Aquí se producen episodios animados por código: guion, voz, tomas en canvas, audio por código, render, fragmentos y entrega. Lee esto antes de tocar nada.

## Antes de empezar

1. Lee `docs/00-modus-operandi.md` y la ficha del episodio (`episodios/<slug>/episodio.json` y su `README.md`).
2. Si el entorno es nuevo, corre el setup (`setup.ps1` en Windows, `setup.sh` en macOS/Linux). Es idempotente.
3. Python: usa el del `.venv` (`.venv\Scripts\python` o `.venv/bin/python`). Node: `node herramientas/...`.

## Reglas duras

- **No publiques, no programes y no subas nada sin aprobación explícita del usuario.** Antes de programar, revisa lo ya programado o publicado para no duplicar (skill `publicar-redes-ai-lab`).
- **ElevenLabs:** nunca generes voz dos veces.
  - Antes de generar, revisa `revision/voz-elevenlabs.json` (manifiesto) y `revision/voz-lock.json` (candado) con la skill `voz-elevenlabs`.
  - Pide `generations_count = 1`. Nunca repitas una llamada para "reintentar".
  - Si solo cambia la imagen, reutiliza el audio maestro.
- **No imites la voz de un artista real.** Si usas un fragmento de terceros, márcalo como riesgo de Content ID en `episodio.json`.
- **Mezcla:** −14 LUFS ±0.5 y pico ≤ −1 dBTP. El narrador siempre se entiende; los efectos nunca lo tapan.
- **Marca v3:**
  - un solo acento de color, rosa #E4007C, para "lo que no pasó";
  - fondos negro #0D0D0F y texto hueso #EFE9DF;
  - Instrument Serif itálica para frases, Instrument Sans para subtítulos, Geist Mono para fechas;
  - sin rayos, sin confeti y sin zooms de golpe repetidos.
- **Llamados a la acción:** comentar y seguir. Al subir un video, adjunta siempre su portada (`videos/<slug>/portadas/`).
- **Puesta en escena:** dos personajes nunca se atraviesan; si hace falta, corta a contraplano. Una idea por toma.
- **No reescribas archivos de otro con texto copiado de una salida de herramienta**: edita con scripts o con diffs.
- **Escritura atómica:** todo archivo largo se escribe a `.tmp` y luego se renombra. No sobrescribas un `*_raw.mp4` mientras otro proceso lo lee.
- **git:** no hagas push ni crees repos remotos sin aprobación. Los medios (`videos/**/*.mp4`, `render/`) no van a git (ver `.gitignore`).

## Comandos

```bash
node herramientas/probe.mjs ep02 [desde hasta paso]       # errores de JS en la línea de tiempo (vertical: --v)
node herramientas/snap.mjs ep02 out --hoja 6 [--v]        # hoja de cuadros para revisar
node herramientas/timeline.mjs ep02                       # anclas → proyecto/timeline.json
python herramientas/producir.py ep02 --prueba 8           # prueba de 8 s en ambos formatos
python herramientas/producir.py ep02 [--pasos a,b] [--workers 4] [--force]
python herramientas/medir.py videos/ep02-mexico-campeon/*.mp4
python herramientas/nuevo_episodio.py ep03-slug "¿Y si …?"
python herramientas/partes.py unir                        # reconstruye los completos divididos en partes
```

## Dónde está cada cosa

- **Motor:** `episodios/<slug>/proyecto/src/` (core, char, env2, pitch, room, marca, marca3 y main2). El ep. 02 es la referencia.
- **Tomas de un episodio:**
  - ep. 02: `e2a.js` a `e2d.js`;
  - ep. 01: `shots2.js` y `shots3a.js` a `shots3c.js`;
  - episodios nuevos: `ep.js`.
- **Tiempos por palabra:** `src/words*.js` (`WORDS` o `WORDS_EP`) y `revision/voz-palabras*.json`.
- **Audio:**
  - script del episodio: `proyecto/audio_*.py`;
  - mezcla: `herramientas/mezclar.py`;
  - maestro aprobado: `audio/mezcla-final.flac`.
- **Marca:** `marca/` (guía en `docs/07-marca.md`). Los overlays de fragmentos están en `herramientas/overlays/`.

## Cuando termines

- Corre `probe.mjs` en ambos formatos y revisa una hoja de `snap.mjs`.
- Corre `medir.py` sobre lo que entregues.
- Anota qué cambió en `episodios/<slug>/revision/revision-vN.md` y actualiza el estado en `episodio.json` y en la tabla del `README.md` raíz.
