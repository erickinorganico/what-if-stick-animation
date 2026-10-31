# YSS-20261025-02 · v3: cambio de marca a "El Hubiera" (25 oct 2026)

Es la v2 aprobada más el nombre nuevo del canal, **El Hubiera** (@elhubieramx). "¿Y si sí?" se queda como frase de cierre.

## Qué cambió
- **Cromo:** la pastilla rosa "EL HUBIERA" reemplaza a "¿Y SI SÍ?". En 16:9 va en la barra superior derecha; en 9:16, sobre el título.
- **Cierre:**
  - después de "¿Y SI SÍ?", la frase sube;
  - entra el logo EL HUBIERA: "NO" tachado y el sello rosa "SÍ EXISTE";
  - después, la pastilla amarilla "SÍGUENOS · @ELHUBIERAMX".
- **Duración:** el video dura 1.5 s más, 3:36.6 en total (`DUR_EP` = fin de la voz + 3.7 s).
- **Audio:**
  - música y FX regenerados con `audio_ep02.py`, con un woosh, un clic del sello y un pop de la pastilla;
  - mezcla con `mezcla_ep02.sh 216.57`: −14 LUFS y pico real de −1.0 dBFS después de AAC;
  - no se gastaron créditos de ElevenLabs.
- **Código nuevo:** `src/marca.js` con `brandTag`, `mkWordmark` y `mkStamp`, compartido con el ep. 01.

## Archivos
- **Calidad completa (en el chat):** `yss-02-mexico-campeon-v3-16x9.mp4` y `-9x16.mp4`.
- **En la carpeta:** las versiones `-ligero.mp4` (2 pasadas, 940k) y el `.srt` (los tiempos son los mismos de la v2).
