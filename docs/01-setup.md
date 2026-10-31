# 01 · Setup

## Requisitos

| Herramienta | Versión probada | Para qué |
| --- | --- | --- |
| Node.js | 20 o más (probado en 22 y 24) | Motor (Playwright + Chromium), render, cuadros |
| Python | 3.10 a 3.13 | Audio por código, mezcla, codificación, fragmentos |
| FFmpeg + ffprobe | 6 o más | Todo lo de video y audio |
| Playwright | 1.63.0 (en `package.json`) | Abre `index.html` y captura cada cuadro |
| numpy, scipy, soundfile, pillow | `requirements.txt` | Síntesis de música, efectos y tablero de marca |
| onnxruntime, sherpa-onnx | `requirements-opcional.txt` | Separar voz y transcribir en local (opcional) |

## Windows: un clic

Doble clic en `setup.cmd`, o en PowerShell:

```powershell
.\setup.ps1              # todo
.\setup.ps1 -SinModelos  # sin bajar los ~270 MB de modelos opcionales
```

El script:

1. Busca Node, Python y FFmpeg; si falta alguno, lo instala con `winget`.
2. Corre `npm install` y `npx playwright install chromium`.
3. Crea `.venv` e instala `requirements.txt`; los paquetes opcionales los intenta sin detenerse si fallan.
4. Baja los modelos a `modelos/`:
   - `Kim_Vocal_2.onnx`, del release `all_public_uvr_models` de GitHub TRvlvr/model_repo;
   - `sherpa-onnx-whisper-base`, del release `asr-models` de GitHub k2-fsa/sherpa-onnx.
5. Une los videos en calidad completa (`python herramientas/partes.py unir`) y verifica su SHA-256.
6. Hace una prueba del motor (`probe.mjs ep02`) y te dice si todo quedó bien.

Es idempotente: si lo vuelves a correr, solo hace lo que falte.

## macOS / Linux

```bash
./setup.sh               # requiere node, python3 y ffmpeg instalados (brew/apt)
```

## Verificación manual

```powershell
node herramientas\probe.mjs ep01
node herramientas\probe.mjs ep02 --v
node herramientas\snap.mjs ep02 revision-cuadros 5 100 214
.\.venv\Scripts\python herramientas\producir.py ep02 --prueba 4
.\.venv\Scripts\python herramientas\medir.py videos\ep02-mexico-campeon\elhubiera-ep02-mexico-campeon-16x9-ligero.mp4
```

Resultado esperado:

- `probe`: `cuadros con error: 0`;
- la prueba deja `render\ep02-mexico-campeon\prueba-4s\prueba-16x9.mp4` y `prueba-9x16.mp4`;
- `medir` da unos −14 LUFS.

## Problemas comunes

| Síntoma | Causa | Arreglo |
| --- | --- | --- |
| `READY no llegó en 60 s` | Falta una fuente en `proyecto/fonts/` o hay un error de JS | `node herramientas/probe.mjs <ep>` muestra el error; revisa `@font-face` en `index.html` |
| `browserType.launch: Executable doesn't exist` | Falta Chromium de Playwright | `npx playwright install chromium` |
| `No encuentro ffmpeg en el PATH` | FFmpeg no está instalado o la terminal no se reinició | `winget install Gyan.FFmpeg` y abre una terminal nueva |
| `python` abre la Microsoft Store | Es el alias de Windows | Usa `py -3` o el `.venv\Scripts\python` |
| Se bloquea la ejecución de scripts de PowerShell | Política de ejecución | Usa `setup.cmd` (corre con `-ExecutionPolicy Bypass` solo para ese script) |
| Un render se cortó | Se apagó la PC o se cerró la terminal | Vuelve a correr el mismo comando: salta los bloques terminados |
| `sherpa-onnx` u `onnxruntime` no instalan | Tu Python es muy nuevo para sus ruedas | Son opcionales; instala Python 3.12 si los necesitas |
