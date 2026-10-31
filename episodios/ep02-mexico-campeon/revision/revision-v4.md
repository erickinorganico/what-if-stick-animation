# YSS-20261025-02 · v4: "¡Ay, mamá!" del clip del usuario (25 oct 2026)

La imagen es la misma de la v3 (marca El Hubiera); solo cambia el audio del canto.

## Qué se hizo
- **Clip:** el usuario subió `Ay mamá.mp3` (11.3 s). Se guarda tal cual en `revision/aymama/original.mp3`.
- **Separación:** la voz se separó de la música con un modelo MDX-Net de UVR (Kim_Vocal_2, ONNX) que corre local (`proyecto/separar_voz_mdx.py`) → `revision/aymama/voz-aislada.wav` y `musica-sin-voz.wav`.
- **Frases:** el clip repite "ay mamá" 6 veces. Se localizaron con energía de la voz aislada y Whisper base (sherpa-onnx, local, sin costo). Están recortadas en `revision/aymama/frases/` (`-voz` y `-con-musica`).
- **Se usó la frase 1** (0.87–2.14 s del clip original, la más clara). Reemplaza el "¡Ay, mamá!" del cantante genérico en 129.0 s de la voz.
- **"Pura ciencia… y filosofía"** sigue con el cantante genérico de la v2.
- **Nivel:** igual al "¡Ay, mamá!" de la v3.
- **Script:** `proyecto/aymama_v3.py` → `proyecto/assets/voz-v3.wav`. La mezcla es `VOZ=voz-v3.wav bash mezcla_ep02.sh 216.57`: −14 LUFS y −1.2 dBTP.
- **Videos:** se volvieron a armar copiando el video de la v3 con el audio nuevo, sin re-render.
- **Costo:** no se gastaron créditos de ElevenLabs.

## Ojo
Si el clip viene de una canción comercial, YouTube podría marcarlo con Content ID aunque dure poco más de 1 s. Si pasa, se regresa a la v3, con el canto genérico.

## Archivos
- **En el chat:** `yss-02-mexico-campeon-v4-16x9.mp4` y `-9x16.mp4`, en calidad completa.
- **En la carpeta:** `-ligero.mp4` y `.srt`.
