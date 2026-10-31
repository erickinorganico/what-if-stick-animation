---
name: "stickman-animation-video"
description: "Úsala para producir de principio a fin un video de animación stickman 2D por código (canal El Hubiera, \"¿Y si…?\", y similares): guion, voz, storyboard, animatic, tomas, audio, render, QA y entrega."
---

# Stickman animation · video completo

Producción de un episodio animado por código, con personajes stickman 2D sobre un motor canvas determinista. El caso principal es el canal **Aquí el hubiera sí existe** (@aquielhubierasiexiste). El repo está en `<LOCAL_PROJECT_PATH>`, con `.venv`, Playwright y modelos listos. En la nube de Cowork, súbelo con el puente: solo lo que el paso necesita.

## Lee primero

`README.md` y `AGENTS.md` del repo, `docs/00-modus-operandi.md`, `docs/12-produccion-eficiente.md` y la ficha del episodio (`episodios/<slug>/episodio.json`).

## Flujo y tiempos medidos

Medidos en la nube de Cowork con 2 núcleos; en la PC, con más núcleos, es más rápido.

| # | Paso | Comando o skill | Tiempo |
|---|---|---|---|
| 1 | Idea y punto de quiebre | `estrategia-contenido` + investigación | — |
| 2 | Guion | `docs/02` (gancho con fecha → realidad → «¿y si sí?» → escalada → giro → vuelta → lo real y lo inventado → CTA) | — |
| 3 | Voz (1 sola toma) | Skill **`voz-elevenlabs`**: candado, `generations_count=1`, sin reintentos. Joaquín `<APPROVED_VOICE_ID>`, `eleven_v4` | 1–3 min |
| 4 | Tiempos por palabra | Scribe (0 créditos) → `palabras_a_js.py` → `src/words_ep.js` | 1 min |
| 5 | Episodio nuevo | `python herramientas/nuevo_episodio.py epNN-slug "¿Y si …?"` (instala el kit de dirección) | segundos |
| 6 | **Esqueleto** | `python herramientas/esqueleto.py <ep>`: beats de 2–5 s (`B.bN`), `revision/storyboard.md` y animatic | < 1 s |
| 7 | **Animatic con voz** | `python herramientas/producir.py <ep> --animatic`: aprobar ritmo antes de animar | ~6 min (5:46) |
| 8 | **Tomas** | Skill **`stickman-animation-direccion`**: bloques de 8–12 beats, con `probe` y `snap` en cada bloque | el trabajo grueso |
| 9 | Audio | `timeline.mjs` + `audio_episodio.py` (música por cue, efectos por acción, ambientes) | — |
| 10 | Todo lo demás | `python herramientas/producir.py <ep>`: timeline → audio → render 16:9 y 9:16 → final → ligero → cortes → fragmentos → QA → QA de render. Anota `tiempos.json` | ~27.5 min para 3:37 (antes ~54) |
| 11 | Salidas | Skill **`stickman-animation-salidas`** (cortes, portadas, copys) | ~1 min de máquina |
| 12 | Revisión y aprobación | `revision/revision-vN.md`; el usuario aprueba | — |
| 13 | Publicar | Solo con aprobación (`publicar-redes-ai-lab`) | — |

Prueba rápida antes del render largo: `producir.py <ep> --prueba 20`.

## Lo que hace rápido el flujo (no lo deshagas)

- **Render v2:** JPEG en el navegador por lotes, x264 veryfast y workers = núcleos / 2. Es ~2.6× más rápido con la misma imagen (PSNR ~47 dB). `--pantallazo` solo para depurar.
- **Final:** veryfast por defecto (~2.6× más rápido, grano casi igual); `producir --calidad` usa medium.
- **Fragmentos v2:** PNG decodificados una vez, idéntico píxel a píxel y en paralelo (`--workers`).
- **Esqueleto y animatic:** el episodio se ve completo desde el día 1. Cada toma reemplaza su tarjeta.
- **QA automático (`qa_render.py`):** congelados, destellos de un cuadro, negros, −14 LUFS, pico y sincronía de voz. La imagen se revisa en el crudo, porque el grano del final esconde los congelados.
- **Comandos largos** con `nohup` y sondeo del log (el límite por comando es 10 min). No uses `pkill -f` con un patrón que aparezca en tu propio comando; si matas un proceso, verifica que no queden ffmpeg huérfanos que roben CPU.
- **Subagentes de menor razonamiento** para tareas mecánicas (QA, medir, copiar). La dirección creativa no se delega.

## Reglas

- **No publiques ni programes sin aprobación explícita.** Antes, revisa duplicados.
- **No gastes créditos de ElevenLabs dos veces.** Si solo cambia la imagen, usa el audio maestro. Para cambiar unas líneas, empalma (`empalme_v2.py`).
- **Marca v3:** un acento rosa #E4007C (lo que no pasó), negro #0D0D0F y hueso #EFE9DF; Instrument Serif itálica, Instrument Sans y Geist Mono. Sin rayos, confeti ni rótulos arriba.
- **El narrador siempre se entiende.** −14 LUFS; pico de la mezcla ≤ −1 dBTP (`loudnorm TP=-2.0`, porque el AAC sube el pico).
- **Correcciones de un episodio existente:** versión nueva (`rN+1`); conserva la anterior para comparar; sin cambiar guion ni voz si no te lo piden.
- **Puente nube → PC:**
  - Sin shell en Windows.
  - Máximo 7 niveles de carpeta.
  - Por llamada, ≤ 50 archivos y ~100 MB.
  - Menos de ~25 MB pasa directo; los completos van en partes de 20 MB (`partes.py`).
- **Honestidad:** revisa el MP4 exportado con sonido, y no afirmes haber visto o escuchado lo que no revisaste.

## Al terminar

Anota los cambios en `revision/revision-vN.md`, actualiza `episodio.json` y la tabla del README, deja `tiempos.json` y entrega `videos/<slug>/` (ligeros y fragmentos también al chat). Responde con las rutas.
## En la nube de Cowork (aprendido en ep04)

- **Repo:** súbelo con el puente por partes (≤ 50 archivos por llamada): raíz, `docs/`, `herramientas/` (con `overlays/` y `sfx/`), `marca/fuentes` y `marca/generador`, y del episodio base `proyecto/src`, `fonts`, `assets/audio`, `index.html`, `audio_*.py`, `episodio.json`. No subas `.venv`, `modelos/` ni `videos/`.
- **Playwright en ESM:** `render.mjs` importa `playwright`; crea `node_modules/playwright` como enlace a `$(npm root -g)/playwright` en la raíz del repo. Python: `pip install numpy scipy soundfile pillow --break-system-packages`.
- **Voz entregada desde fuera** (p. ej. Codex con la cuenta de AI Lab School): usa su WAV maestro (`episodio.json → audio.voz`) y su alineación por palabra (`voz-palabras-final.json`) con `palabras_a_js.py`; no hace falta Scribe ni gastar créditos.
- **Audio por código:** el `audio_episodio.py` copiado del ep02 trae sus cues; reescríbelo con una función `w('frase', despues)` que lea `src/words_ep.js` y `src/beats.js` (así no dependes de `T`). Revisa la relación voz/cama por medio segundo (≥ 8 dB antes del sidechain) y baja los efectos que la rompan.
- **Mientras renderiza:** prepara portadas (`proyecto/src/portadas.js` + `exportar_portadas.mjs`), copys y documentación; el render de 16:9 y 9:16 toma ~9–10 min cada uno para 3:30 con 2 núcleos (más si compites por CPU).

## Tiempos medidos · ep04 «¿Y si Cristiano Ronaldo hubiera nacido en México?» (3:30, 2 núcleos)

Ver `archivo/casos/ep04-cristiano-mexico-pipeline.md` del kit.
