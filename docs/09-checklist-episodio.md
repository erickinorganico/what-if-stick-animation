# 09 · Checklist por episodio

Copia esta lista a `episodios/<slug>/revision/checklist.md` y márcala conforme avances.

## Preproducción

- [ ] Punto de quiebre con fecha, lugar y hecho real verificado (fuente anotada).
- [ ] Título "¿Y si…?" y remate de miniatura de 1 a 3 palabras.
- [ ] `python herramientas/nuevo_episodio.py epNN-slug "¿Y si …?"`
- [ ] Guion en `guion/guion-voz-v1.txt` con la fórmula de [02](02-guion-y-voz.md): gancho con fecha, la realidad, "¿y si sí?", escalada, giro, vuelta al quiebre, lo real y lo inventado, y CTA para comentar y seguir.
- [ ] Números escritos con letra y nombres raros en forma fonética.

## Voz

- [ ] Revisé `revision/voz-elevenlabs.json` y `voz-lock.json`: no existe una toma para este guion.
- [ ] Candado tomado, `generations_count = 1`, sin reintentos.
- [ ] Audio en `proyecto/assets/voz-elevenlabs.mp3` + manifiesto con créditos.
- [ ] Tiempos de Scribe en `revision/voz-palabras.json` → `palabras_a_js.py` → `src/words_ep.js`.
- [ ] Candado liberado.

## Animación

- [ ] `python herramientas/esqueleto.py <ep>`: beats, `revision/storyboard.md` (llenar lugar, plano, acción, luz y sonido por beat) y animatic.
- [ ] `python herramientas/producir.py <ep> --animatic` revisado con la voz (ritmo aprobado antes de animar).
- [ ] Tomas ancladas a `B.bN` o `W('…')`, con el kit de dirección (docs/13): nadie posa, nada de brazos rígidos, cámara por plano y tono frío o cálido.
- [ ] Anclas `A3('…')` para cada momento clave; nada de segundos sueltos.
- [ ] Una idea por toma, encuadre vertical (`vx`) en cada una.
- [ ] Nadie se atraviesa; los zooms de golpe, máximo 1 o 2.
- [ ] Un solo acento rosa por cuadro; palabras de `KEY` ajustadas en `main2.js`.
- [ ] Cierre con `endCard3()` (y `next` si ya hay próximo episodio).
- [ ] `probe.mjs` en 16:9 y 9:16, con 0 errores.
- [ ] Hojas de `snap.mjs` en ambos formatos revisadas: nada encimado ni tapado por los subtítulos.

## Audio

- [ ] `timeline.mjs` → script de audio con un cue por bloque y efectos clavados a `T`.
- [ ] `mezclar.py` da −14 LUFS ±0.5 y pico ≤ −1 dBTP.
- [ ] Escucha completa: el narrador se entiende siempre.

## Render y entrega

- [ ] `producir.py <ep> --prueba 8` revisada.
- [ ] `producir.py <ep>`: completos, ligeros, cortes (si clips.json está vacío), fragmentos, `qa.txt`, `*.qa.json` y `tiempos.json`.
- [ ] `qa_render`: 0 congelados no intencionales, 0 destellos y la voz a ±40 ms.
- [ ] Duraciones iguales; ligeros y fragmentos de menos de 29 MB.
- [ ] Portadas A, B y vertical en `videos/<slug>/portadas/`.
- [ ] `copys/copys.md`: título, descripción con capítulos, etiquetas, texto por fragmento y comentario fijado.
- [ ] `revision/revision-vN.md` con qué cambió; el estado actualizado en `episodio.json` y en el README raíz.

## Publicación (solo con aprobación)

- [ ] El usuario aprobó archivo, texto, portada, red, fecha y hora.
- [ ] Revisé lo programado y lo publicado en cada red: sin duplicados.
- [ ] El largo en YouTube con su miniatura A (B en "Probar y comparar").
- [ ] Shorts enlazados al largo ("Video relacionado").
- [ ] Partes 1, 2 y 3 en TikTok y Reels en días seguidos, con portada vertical.
- [ ] Anoté el ID de programación de cada red.
- [ ] A las 24–72 h: métricas y decisión de secuela.
