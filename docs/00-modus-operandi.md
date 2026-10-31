# 00 · Modus operandi

Cómo se hace un episodio de **El Hubiera**, de la idea a la publicación. La animación, el audio y la entrega salen del código del repo. Las únicas piezas externas son la voz (ElevenLabs) y, si hacen falta, algunos efectos de sonido.

## La idea del canal

- **Premisa:** un momento real de la historia de México, el punto de quiebre, se parte en dos. La línea gris es lo que pasó; la rosa es lo que hubiera pasado.
- **Tono:** segunda persona ("Tienes doce años…"), humor mexicano, nostalgia y un remate que duele un poquito.
- **Cierre:** siempre "¿Y si sí?", seguido de una pregunta para comentar y de la invitación a seguir.
- **Líneas de contenido:**
  - **El hubiera:** lo que pudo pasar (un penal, una final, la historia de México).
  - **¿Y si sí?:** México potencia, como el ep. 02.
- **Títulos:** "¿Y si…?" para el buscador. Lo que distingue al canal es el nombre, no el título.

## Flujo completo

| # | Paso | Qué sale | Herramienta o skill | Quién |
| --- | --- | --- | --- | --- |
| 1 | **Idea y punto de quiebre** | Fecha, lugar, hecho real y qué cambia | `estrategia-contenido`, investigación web | Claude propone, el usuario elige |
| 2 | **Guion** (2:30–3:40 por ahora; la meta es 6–10 min) | `guion/guion-voz-v1.txt` con etiquetas de emoción | [02-guion-y-voz](02-guion-y-voz.md) | Claude |
| 3 | **Voz**, una sola toma | `proyecto/assets/voz-elevenlabs.mp3` + manifiesto | Conector ElevenLabs + skill `voz-elevenlabs` | Claude |
| 4 | **Tiempos por palabra** | `revision/voz-palabras.json` → `src/words_ep.js` | ElevenLabs Scribe (0 créditos) o `transcribir.py` | Claude |
| 5a | **Esqueleto y animatic** | Beats `B.bN`, `revision/storyboard.md`, animatic con voz | `esqueleto.py`, `producir.py --animatic` | Claude; el usuario aprueba el ritmo |
| 5 | **Tomas** en el motor, ancladas a la voz | `proyecto/src/ep.js` (o e2a…e2d) | [03-motor](03-motor.md), [13-direccion](13-direccion.md), kit de dirección, skill `stickman-animation-direccion` | Claude |
| 6 | **Revisión sin render** | Hojas de cuadros en 16:9 y 9:16, cero errores | `probe.mjs`, `snap.mjs` | Claude |
| 7 | **Audio por código** | `musica.wav` + `fx.wav` anclados a `timeline.json` | `timeline.mjs` + `audio_*.py`, `sound-effects` | Claude |
| 8 | **Mezcla** | `render/<slug>/mezcla.wav` a −14 LUFS | `mezclar.py` | Claude |
| 9 | **Render** 16:9 y 9:16 | `render/<slug>/h_raw.mp4`, `v_raw.mp4` | `render.mjs` (reanudable) | Claude |
| 10 | **Final + ligero** | `videos/<slug>/…-16x9.mp4`, `-9x16.mp4` y sus `-ligero` | `codificar.py`, `ffmpeg-skill` | Claude |
| 11 | **Fragmentos** | 3 partes (60–90 s) + 2 Shorts (20–35 s) | `fragmentos.py` + `clips.json` | Claude |
| 12 | **Portadas y textos** | Miniaturas A/B, portada vertical, `copys/copys.md` | Generador de marca, `copy-redes-ai-lab` | Claude |
| 13 | **Revisión** | `revision/revision-vN.md` con lo que cambió | `medir.py`, hojas de cuadros | Claude entrega, **el usuario aprueba** |
| 14 | **Publicación** | Programado en las 4 redes sin duplicar | `publicar-redes-ai-lab` | Solo con aprobación |
| 15 | **Medición** | Qué pegó y qué sigue (secuela, parte 2) | Windsor / YouTube Studio | Claude reporta |

Del paso 7 al 11, un solo comando lo hace todo: `python herramientas/producir.py <episodio>`.

## Tiempos de referencia

Medidos con los eps. 01 y 02, de unos 3 minutos cada uno.

- **Voz:** de 1 a 3 minutos de generación y entre 3,000 y 3,100 créditos por episodio completo. Cambiar unas líneas cuesta unos 1,100.
- **Tomas:** es el trabajo grueso. Unas 40 tomas por cada 2 minutos.
- **Render v2 (29 oct 2026):** en 2 núcleos, 1 minuto de video tarda ~1.4 min en 16:9 y ~1.5 min en 9:16. Antes tardaba ~3.5–4 min. En la PC, `--workers` sale solo (núcleos / 2).
- **Final, ligero y fragmentos:** ~15 min para 3:37 (antes ~26). El episodio completo, del render a la entrega, pasó de ~54 a ~27.5 min. Detalle en [12 · Producción eficiente](12-produccion-eficiente.md).

## Principios de dirección

Vienen del análisis de Ifverse y de las skills de motion.

- **Una idea por toma.** La cámara aterriza; nada se mueve sin razón.
- **Siluetas negras con luz de borde cálida.** Extremidades curvas y afiladas, ojos con mirada y 15 expresiones (`EXPR`).
- **Cine:** profundidad de campo, tomas sobre el hombro, POV detrás de la red, cenital tipo CCTV e insertos macro.
- **Dos personajes nunca se atraviesan.** Si la acción lo pide, se corta a contraplano.
- **Anticipación y amortiguación** en saltos y golpes. No se repiten zooms de golpe; se reservan para 1 o 2 momentos.
- **El sonido acompaña la acción:** silbato, red, pop de etiqueta, whoosh de título. La voz siempre manda.

## Qué se entrega por episodio

```text
videos/<slug>/
├── elhubiera-<slug>-16x9.mp4           YouTube (largo)
├── elhubiera-<slug>-9x16.mp4           vertical completo (respaldo, o Facebook)
├── elhubiera-<slug>-16x9-ligero.mp4    < 29 MB (WhatsApp, Drive, revisión)
├── elhubiera-<slug>-9x16-ligero.mp4
├── fragmentos/                         parte 1, 2 y 3 de 3 + 2 shorts
├── portadas/                           miniatura A y B (1280×720) + portada vertical
├── partes/                             los completos divididos en partes de 20 MB (setup los une)
└── qa.txt                              duración, LUFS, pico y peso de cada archivo
```

## Dónde se trabaja

- **Nube de Cowork.** Tiene el mejor ancho de banda para modelos. Desde ahí la entrega a la PC pasa por el puente: máximo 30 MB por archivo (por debajo de unos 25 MB pasa directo) y 100 MB por llamada, por eso existe `partes.py`. Allí no hay acceso a HuggingFace ni a googleapis, así que los modelos se bajan de GitHub.
- **PC (Claude Code, Codex o Cowork con shell).** Es el mismo repo: `setup.ps1` y los mismos comandos. El render es más rápido con más núcleos.
- **Siempre:** el repo es la fuente de verdad. La copia en `produccion\YSS-*` de la carpeta Automatizacion es histórica (versiones v1 a v5 y sus notas).
