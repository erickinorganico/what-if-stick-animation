# Ep. 02 · ¿Y si México ganaba el Mundial?

**Punto de quiebre:** 05·07·2026 · Octavos contra Inglaterra, Estadio Ciudad de México, minuto 89, 2-2. Disparo… poste… ¡y adentro!
**Estado:** terminado, sin publicar · **Duración:** 3:36.6 · **ID:** YSS-20261025-02

## Historia

México campeón del mundo, y la cadena de consecuencias:

- diez millones en la calle, cláxones de Tijuana a San Diego y un baby boom;
- el chiste de "jugamos como nunca" que se muere;
- el Plan Campeón (canchas, becas, fábricas) y la violencia que baja hasta que el noticiero no tiene nada que contar;
- los corridos que ahora hablan de ciencia y filosofía ("El Bélico de las Metáforas"), con canto tumbado y el "¡Ay, mamá!", y la quema de libros de superación personal;
- 2036, México potencia;
- time-lapse 2040–2060: Marte, primer contacto con un taco al pastor con piña y la Copa UNIVERSAL contra Andrómeda, con el poste y el sismógrafo de Marte.

Cierra con "¿Y si sí?".

## Archivos

| Ruta | Qué es |
| --- | --- |
| `episodio.json` | Ficha que lee `producir.py` (modo de audio `mezclar`) |
| `proyecto/index.html` + `src/` | Motor de referencia. Tomas del episodio en `e2a.js`, `e2b.js`, `e2c.js` y `e2d.js` (reutiliza helpers de las tomas del ep. 01) |
| `proyecto/src/words2.js` | `WORDS_EP`: tiempos por palabra de la voz v2/v3 |
| `proyecto/assets/voz-v3.wav` | **Voz final:** toma aprobada + líneas nuevas + "¡Ay, mamá!" del clip del usuario |
| `proyecto/assets/voz-elevenlabs.mp3` | Toma original de ElevenLabs (base del empalme) |
| `proyecto/audio_ep02.py` + `timeline.json` | Música por cue y efectos anclados (regenera la cama de forma idéntica) |
| `audio/mezcla-final.flac` | Mezcla aprobada (−14 LUFS, −1.2 dBTP) |
| `audio/empalme_v2.py`, `audio/aymama_v3.py` | Cómo se armaron la voz v2 (líneas nuevas) y la v3 ("¡Ay, mamá!") |
| `guion/` | Guion v1, cambios v2 y línea del cantante |
| `copys/copys.md` | Título, descripción, capítulos, texto de cada fragmento y aviso de Content ID |
| `clips.json` | Cortes de las 3 partes y los 2 Shorts |
| `revision/` | Notas v1 a v4, manifiesto de voz (1,126 créditos en cambios v2), Scribe, `aymama/` (clip original, voz aislada y frases) y `v2/` (tomas nuevas) |

## Reproducir

```powershell
.\.venv\Scripts\python herramientas\producir.py ep02              # todo (unos 60–90 min según la PC)
.\.venv\Scripts\python herramientas\producir.py ep02 --prueba 8   # prueba rápida
```

## Riesgos

El "¡Ay, mamá!" sale de un clip de terceros y puede activar Content ID. En `copys/copys.md` está cómo volver a la voz v2, con cantante genérico y sin créditos.
