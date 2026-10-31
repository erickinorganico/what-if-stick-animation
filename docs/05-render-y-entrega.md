# 05 · Render y entrega

## Render (`herramientas/render.mjs`)

```powershell
node herramientas\render.mjs ep02 --formato h --workers 4     # 16:9 → render\ep02-mexico-campeon\h_raw.mp4
node herramientas\render.mjs ep02 --formato v --workers 4     # 9:16 → v_raw.mp4
node herramientas\render.mjs ep02 --formato v --hasta 10      # prueba de 10 s → render\…\prueba-10s\
```

- **Cuadros:** 30 fps. **v2:** el navegador dibuja y codifica en JPEG (calidad 93) lotes de 10 cuadros en una sola ida y vuelta; luego van a x264 veryfast con crf 17 (casi sin pérdida) y se guardan en bloques de 150 cuadros (5 s). Es ~2.6× más rápido que el pantallazo por cuadro (`--pantallazo`), con PSNR 47 dB.
- **Reanudable:** cada bloque se escribe a `.tmp.mp4` y se renombra al terminar. Si se corta, vuelve a correr el mismo comando y salta los bloques listos.
- **Workers:** varias pestañas de Chromium que renderizan bloques alternos. Usa más o menos 1 por cada 2 núcleos.
- **Unión:** al final une los bloques sin recomprimir (`concat`) en `<formato>_raw.mp4`.
- **Antes de un render largo,** corre `probe.mjs` en ambos formatos. Un error de JS en el segundo 170 tira 40 minutos de render.

## Codificación final (`herramientas/codificar.py`)

```powershell
python herramientas\codificar.py final render\ep02-mexico-campeon\h_raw.mp4 render\ep02-mexico-campeon\mezcla.wav videos\ep02-mexico-campeon\elhubiera-ep02-mexico-campeon-16x9.mp4
python herramientas\codificar.py ligero videos\…\elhubiera-ep02-mexico-campeon-16x9.mp4 videos\…\elhubiera-ep02-mexico-campeon-16x9-ligero.mp4 --mb 29
```

| Versión | Video | Audio | Para qué |
| --- | --- | --- | --- |
| **final** | x264 veryfast (`--preset medium` o `producir --calidad` para la máxima calidad por MB), crf 21, tope 6 Mb/s (búfer 12M), yuv420p, `noise=alls=3:allf=t` (grano fino de película, parte de la marca), faststart | AAC 192k a 48 kHz | Subir a las redes |
| **ligero** | 2 pasadas, bitrate calculado para caber en `--mb` (29 por defecto) | AAC 128k | WhatsApp, Drive, revisión y la PC |

`--copiar-audio` copia el AAC de otro MP4 sin recomprimir. Se usaba cuando el audio aprobado vivía dentro de un MP4.

## Control de calidad

```powershell
python herramientas\medir.py videos\ep02-mexico-campeon\*.mp4      # duración, resolución, MB, LUFS, pico
node herramientas\snap.mjs ep02 qa --hoja 8 ; node herramientas\snap.mjs ep02 qa --hoja 8 --v
```

`producir.py` deja `videos/<slug>/qa.txt` con la medición de todo lo entregado. Antes de entregar se revisa:

- [ ] Duración igual en 16:9, 9:16 y el audio (±0.05 s).
- [ ] −14 LUFS ±0.5. El pico de la mezcla es ≤ −1 dBTP; tras codificar a AAC puede subir hasta unos −0.3 dBTP, y eso es normal.
- [ ] Hoja de cuadros en ambos formatos: nada encimado y subtítulos legibles.
- [ ] El cierre completo: "¿Y si sí?", la línea, el logotipo y el usuario, más la pregunta para comentar.
- [ ] Los ligeros pesan menos de 29 MB.

**QA de render:** `python herramientas/qa_render.py <mp4> [--voz <voz> --vo 0.5]` encuentra congelados de 0.4 s o más, destellos de un cuadro, negros, loudness, pico y desfase de la voz. Revisa la imagen en el crudo (`h_raw.mp4`), porque el grano esconde los congelados. `producir.py` lo corre solo (paso `qa_render`). Para lo demás está la skill `ffmpeg-skill`.

## Entrega

1. **`videos/<slug>/`** en este repo es la carpeta de entrega.
2. **Chat:** el ligero y los fragmentos se mandan al chat para revisarlos desde el teléfono.
3. **PC desde la nube de Cowork:** el puente acepta 100 MB y 50 archivos por llamada. Por archivo:
   - por debajo de unos 25 MB pasa directo desde la carpeta de salidas;
   - de 25 a 30 MB hay que mandarlo antes al chat (SendUserFile) y copiarlo con su `fileUuid`.
   - Los completos se dividen en partes de 20 MB con `python herramientas/partes.py dividir <mp4>`.
   - En la PC, `setup` o `partes.py unir` los reconstruye y verifica el SHA-256.
   - Si un fragmento pasa de 29 MB, `fragmentos.py` lo recomprime solo (crf 23, 4 Mb/s).
4. **Nombres:** `elhubiera-<slug>-16x9.mp4`, `-9x16.mp4`, `-16x9-ligero.mp4`, `-9x16-ligero.mp4` y `fragmentos/<slug-corto>-parte-N-de-3.mp4` / `-short-<tema>.mp4`.
