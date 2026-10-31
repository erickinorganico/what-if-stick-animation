# Ep. 01 · ¿Y si no hubiera sido penal?

**Punto de quiebre:** 29·06·2014 · Octavos de final, Fortaleza. Robben cae en el área en el minuto 94… y el árbitro dice que sigan.
**Estado:** terminado, sin publicar · **Duración:** 3:00.7 · **ID:** YSS-20261024-01

## Historia

Vives desde tu sala, con tu papá, tu tío, tu abuelo y el perro, el Mundial que México nunca jugó:

- tiempo extra y gol en el 113';
- el quinto partido por fin existe (penales contra Costa Rica);
- semifinal contra Argentina ("Míralo, mijo. Esto no se ve dos veces.");
- final en el Maracaná contra Alemania, con el caño del 118' y México campeón.

Después: tú quieres ser árbitro, y una generación crece sin el "casi". Luego viene la realidad (rebobinado, "PERDIMOS") y el cierre con "¿Y si sí?".

## Archivos

| Ruta | Qué es |
| --- | --- |
| `episodio.json` | Ficha que lee `producir.py` (modo de audio `maestro`) |
| `proyecto/index.html` + `src/` | Motor v5 con identidad v3. Tomas en `shots2.js` (0–61 s) y `shots3a/b/c.js` (61 s–3:00) |
| `proyecto/src/words.js` | Tiempos por palabra de la voz (`WORDS`) |
| `proyecto/assets/` | Voz de ElevenLabs (Joaquín, eleven_v4, 1 toma, 3,009.7 créditos) y efectos fuente |
| `proyecto/audio_yss.py` + `timeline-v1.json` | Script de música y efectos de la v1 (referencia) |
| `audio/mezcla-final.flac` | **Audio maestro aprobado** (mezcla v1, −14 LUFS). Es el que usa la entrega |
| `guion/guion-voz-v1.txt` | Guion de voz |
| `copys/copys.md` | Título, descripción, capítulos y texto de cada fragmento |
| `clips.json` | Cortes de las 3 partes y los 2 Shorts |
| `revision/` | Notas v1 a v5, manifiesto y candado de voz, y tiempos de Scribe |

## Reproducir

```powershell
.\.venv\Scripts\python herramientas\producir.py ep01 --pasos render,final,ligero,fragmentos,qa
```

Como está en modo `maestro`, no regenera audio: usa `audio/mezcla-final.flac`.

## Historial

v1 voz y mezcla → v3 prueba de 60 s → v4 completo + vertical → v5 nombre "El Hubiera" → **identidad v3** (cromo, título y cierre con `endCard3` y el próximo episodio).
