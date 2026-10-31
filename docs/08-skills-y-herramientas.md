# 08 · Skills y herramientas

## Skills por paso

Las skills de video viven en `<LOCAL_PROJECT_PATH>`. El catálogo completo está en la skill `kit-video-ai-lab` y en el doc del proyecto `kit-video-catalogo`. Las de la cuenta de Claude (`voz-elevenlabs`, `copy-redes-ai-lab`, `estrategia-contenido`, `publicar-redes-ai-lab`…) se cargan solas en Cowork.

| Paso | Skill | Para qué la usamos |
| --- | --- | --- |
| Todo el flujo | **`el-hubiera-video`** (este repo, `skills/`) | Receta del canal: qué correr, en qué orden y con qué reglas |
| Dirección de tomas | **`el-hubiera-direccion`** (este repo, `skills/`) | Storyboard, actuación, cámara, luz, gráficos, transiciones y sonido por acción con el kit |
| Salidas | **`el-hubiera-salidas`** (este repo, `skills/`) | Cortes, fragmentos, portadas, copys y QA de un episodio aprobado |
| Elegir skills | `kit-video-ai-lab` | Mapa de las skills de video instaladas |
| Idea, serie, títulos | `estrategia-contenido`, `mk-content-strategy` | Temas, secuelas, títulos "¿Y si…?" |
| Guion | `video-storytelling`, `ai-lab-school-guiones`, `better-writing` | Estructura de gancho → escalada → giro → CTA |
| Voz | **`voz-elevenlabs`** | Candado y manifiesto: una sola toma, cero duplicados |
| Dirección de tomas | **`motion-studio-by-buck`**, `motion-design`, `director-de-foto-ia` | Anticipación, la cámara que aterriza, una idea por toma, sonido por acción |
| Efectos de sonido | **`sound-effects`** | Buscar o generar efectos (Freesound, Kenney, ElevenLabs) |
| QA y codificación | **`ffmpeg-skill`** | ebur128, blackdetect, hojas de contacto, recortes y concat |
| Fragmentos verticales | `short-form-video`, `short-form-edit` | Duración por red, ganchos y tarjetas de continuación |
| Marca y miniaturas | `canvas-design`, `brand-studio:brand-identity-system`, `brand-studio:brand-review`, `better-typography`, `better-colors` | Identidad v3 y revisión de consistencia |
| Textos para publicar | `copy-redes-ai-lab`, `mk-social`, `mk-copywriting` | Descripciones, CTA de comentar y seguir, hashtags |
| Publicar | **`publicar-redes-ai-lab`** | Programar sin duplicar ni romper el calendario |
| Alternativas de motor | `hyperframes*`, `remotion-*`, `manimgx` | Para piezas que no son del motor canvas (comerciales, explicadores) |

## Herramientas del repo

| Archivo | Lenguaje | Qué hace |
| --- | --- | --- |
| `herramientas/producir.py` | Python | Orquesta todo: timeline → audio → render → final → ligero → cortes → fragmentos → QA → QA de render. `--animatic` para el animatic con voz. Anota `tiempos.json` |
| `herramientas/esqueleto.py` | Python | De los tiempos por palabra a beats de 2–5 s (`B.bN`), `revision/storyboard.md` y el animatic; instala el kit |
| `herramientas/kit/direccion.js` · `kit/transiciones.js` | JS | Kit de dirección: poses, brazos sin rigidez, IK, cámara por plano, tonos, pozo de luz, sellos, etiquetas, habla, transiciones |
| `herramientas/cortes.py` | Python | Sugiere 3 partes + 2 Shorts en silencios (`--escribir` llena clips.json) |
| `herramientas/qa_render.py` | Python | Congelados, destellos de un cuadro, negros, loudness, pico y sincronía de la voz |
| `herramientas/render.mjs` | Node | Render reanudable por bloques, con varios workers, a `<formato>_raw.mp4`. v2: JPEG en el navegador por lotes (~1.8× más rápido); `--pantallazo` usa el método viejo |
| `herramientas/snap.mjs` | Node | Cuadros sueltos u hoja cada N segundos (16:9 / 9:16) |
| `herramientas/probe.mjs` | Node | Recorre la línea de tiempo y lista los errores de `render(t)` |
| `herramientas/timeline.mjs` | Node | Exporta las anclas, DUR y subtítulos a `proyecto/timeline.json` |
| `herramientas/mezclar.py` | Python | Voz + cama con sidechain → −14 LUFS / −1.2 dBTP (2 pasadas) |
| `herramientas/codificar.py` | Python | `final` (grano, crf 21, 6M, AAC 192k) y `ligero` (2 pasadas a ≤ N MB) |
| `herramientas/fragmentos.py` | Python | Partes y Shorts verticales con barra, etiqueta, tarjeta final y SFX. v2: PNG decodificados una vez y `--workers` (idéntico píxel a píxel) |
| `herramientas/overlays_fragmentos.mjs` | Node | Regenera los PNG de las tarjetas de fragmentos con la marca v3 |
| `herramientas/medir.py` | Python | Duración, resolución, MB, LUFS y pico real |
| `herramientas/partes.py` | Python | Divide en partes de 20 MB y une verificando SHA-256 |
| `herramientas/palabras_a_js.py` | Python | `voz-palabras.json` (Scribe) → `src/words_ep.js` |
| `herramientas/separar_voz.py` | Python | Voz e instrumental de un clip (MDX-Net Kim_Vocal_2, ONNX, CPU) |
| `herramientas/transcribir.py` | Python | Whisper base local: transcribir o ubicar el inicio y fin de una frase |
| `herramientas/nuevo_episodio.py` | Python | Crea un episodio nuevo con el motor, una toma inicial y el expediente |
| `marca/generador/kit3_export.mjs` | Node | Exporta el kit de identidad (27 piezas) |
| `marca/generador/tablero.py` | Python | Arma el tablero de identidad de 3×3 |

## Servicios externos

| Servicio | Uso | Notas |
| --- | --- | --- |
| **ElevenLabs** (conector de Claude) | Voz `eleven_v4`, Scribe (tiempos por palabra, 0 créditos), efectos de sonido v2 | Una sola toma. Desde la nube de Cowork no se puede bajar de storage.googleapis.com: si la voz ya existe, se reutiliza su `generation_id` |
| **GitHub releases** | Modelos locales (Whisper base, MDX-Net) | HuggingFace está bloqueado desde la nube de Cowork |
| **YouTube / TikTok / Meta Business Suite** | Publicación | Solo con aprobación, desde el navegador o el planificador |
| **Windsor.ai** (conector) | Métricas de YouTube, TikTok, Instagram y Facebook | Para decidir secuelas |

## Dónde corre cada cosa

- **Nube de Cowork:** sirve para todo. Sus límites: 2 núcleos, nada de HuggingFace ni de googleapis, y la entrega a la PC es por el puente (30 MB por archivo).
- **PC:** sirve para todo. Corre el render más rápido con `--workers` de 4 a 6. Ahí está el repo de verdad, y ahí lo usan Claude Code o Codex con `AGENTS.md`.
