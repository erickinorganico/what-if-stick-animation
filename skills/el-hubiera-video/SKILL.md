> **OBSOLETA (29 oct 2026).** Usa `stickman-animation-video`, `stickman-animation-direccion` y `stickman-animation-salidas` (en esta misma carpeta). Se conserva como historial.

---
name: el-hubiera-video
description: Úsala para producir, corregir o re-renderizar un episodio del canal El Hubiera (@aquielhubierasiexiste, "¿Y si…?" animado por código), sus fragmentos, portadas y textos.
---

# El Hubiera · producción de episodios

El repo vive en la PC en `<LOCAL_PROJECT_PATH>`. Ya está configurado: tiene `.venv`, Playwright con Chromium y los modelos. Si estás en la nube de Cowork, pásalo a la nube con el puente o trabaja con la copia del proyecto.

## Lee primero

1. `README.md` y `AGENTS.md` del repo, que traen las reglas duras.
2. `docs/00-modus-operandi.md`, que explica el flujo completo y quién hace qué.
3. La ficha del episodio: `episodios/<slug>/episodio.json` y su `README.md`.

## Flujo

```text
idea → guion → voz (1 toma) → tiempos por palabra → tomas en el motor → probe/snap → audio por código → mezcla −14 LUFS
→ render 16:9 + 9:16 → final con grano → ligero → 3 partes + 2 Shorts → portadas + copys → aprobación → publicar
```

| Paso | Comando o skill |
| --- | --- |
| Episodio nuevo | `python herramientas/nuevo_episodio.py epNN-slug "¿Y si …?"` |
| Voz | Skill **`voz-elevenlabs`**: revisa el manifiesto y el candado, pide `generations_count=1` y no reintentes. Voz Joaquín `<APPROVED_VOICE_ID>`, `eleven_v4` |
| Tiempos | Scribe → `python herramientas/palabras_a_js.py revision/voz-palabras.json proyecto/src/words_ep.js` |
| Tomas | `proyecto/src/ep.js` con `S(t0, fn, vx)` y anclas `A3('frase')`. Guía en `docs/03-motor.md` |
| Revisión | `node herramientas/probe.mjs <ep> [--v]` · `node herramientas/snap.mjs <ep> out --hoja 6 [--v]` |
| Todo lo demás | `python herramientas/producir.py <ep>` (`--prueba 8` para una prueba; `--pasos …` para un tramo) |
| QA | `python herramientas/medir.py videos/<slug>/*.mp4`: −14 LUFS ±0.5 (pico de la mezcla ≤ −1 dBTP) |
| Textos | `episodios/<slug>/copys/copys.md` (skill `copy-redes-ai-lab`) |
| Publicar | Solo con aprobación y revisando lo ya programado. YouTube: trozos de 9.4 MB (`herramientas/trocear.py` + `herramientas/subida_youtube.js`) y la guía `docs/11-publicar-con-claude.md`. TikTok/IG/FB: skill `publicar-redes-ai-lab` con las cuentas de El Hubiera. Recibo en `publicacion/` |

## Reglas

- **No publiques ni programes sin aprobación explícita.** Revisa duplicados antes de programar.
- **No gastes créditos de ElevenLabs dos veces.** Si solo cambia la imagen, usa el audio maestro (`audio/mezcla-final.flac`).
- **Marca v3:**
  - un solo acento rosa #E4007C ("lo que no pasó"); negro #0D0D0F y hueso #EFE9DF;
  - Instrument Serif itálica, Instrument Sans y Geist Mono;
  - sin rayos, sin confeti y sin zooms de golpe repetidos.
- **CTA:** comentar y seguir. Adjunta siempre la portada (`videos/<slug>/portadas/`).
- **Puesta en escena:** dos personajes nunca se cruzan (corta a contraplano) y una idea por toma.
- **El narrador siempre se entiende;** los efectos nunca lo tapan.
- **Derechos:** no imites la voz de un artista real y marca los clips de terceros como riesgo de Content ID.
- **Puente nube → PC:** pasa directo por debajo de unos 25 MB; de 25 a 30 MB hay que mandarlo primero al chat (SendUserFile + `fileUuid`). Divide los completos en partes de 20 MB con `herramientas/partes.py dividir` (las partes llevan la cabecera `ELHUBIERA-PARTE` para que la carpeta de salidas no les inyecte C2PA) y en la PC únelos con `partes.py unir`.
- **Usa subagentes de menor razonamiento** para tareas mecánicas (QA, copiar, medir) y deja la dirección creativa al agente principal.

## Cuando termines

Anota los cambios en `revision/revision-vN.md`, actualiza el estado en `episodio.json` y en la tabla del `README.md` raíz, y entrega `videos/<slug>/` (en el chat van los ligeros y los fragmentos).
