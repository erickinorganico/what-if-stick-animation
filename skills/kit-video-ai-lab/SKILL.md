---
name: "kit-video-ai-lab"
description: "Úsala en cualquier chat de contenido de AI Lab School o del proyecto 3D content (reels, stickman, Labi y Beto, ¿Y si sí?, piezas premium, comerciales, LEGO 3D, Hugo, podcast) para elegir y cargar las skills de video instaladas."
---

# Kit de video AI Lab School

Las skills viven en la PC de Erick: `<LOCAL_PROJECT_PATH><nombre>\SKILL.md`. Colecciones extra sin activar: `snapshot\global-skills\biblioteca-lote2.zip`. Índices: `docs\skills-video\LEEME.md` y `LEEME-lote2.md`. En el proyecto 3D content: `claude/kit-video-catalogo.md` y `claude/skills-por-linea-3d-content.md`.

## Cómo usarla
1. Ubica la línea del chat en "Sugeridas por línea" y carga primero esas skills.
2. Puedes usar **cualquier otra** del catálogo si encaja mejor. Las sugerencias son el punto de partida, no un límite.
3. Para cargar una skill, lee su SKILL.md (y solo las referencias que necesites) con las herramientas del dispositivo. Si la carpeta no está conectada, pide acceso a `<LOCAL_PROJECT_PATH>` una sola vez. Si la PC no responde, clona el repo de origen en el sandbox (lista de fuentes abajo).
4. Anota en `revision/` del expediente qué skills usaste.
5. Las reglas del proyecto mandan sobre las skills:
   - **ElevenLabs:** una sola toma y el candado de voz (skill `voz-elevenlabs`).
   - **Revisión:** sin pasos manuales para Erick.
   - **Branding:** se aplica en la pieza.
   - **Antes de publicar:** −14 LUFS.
6. **Renders 3D pesados (Blender):** usa la render farm por carpetas de la PC (`<LOCAL_PROJECT_PATH>`, ver la skill `animacion-lego-3d`). Así se renderiza con la GPU de Erick sin computer use.

## Sugeridas por línea
| Línea | Empieza con |
|---|---|
| Todas | `sound-effects` (SFX CC0; evita gastar créditos de ElevenLabs en efectos), `watch` (analizar referencias), `ffmpeg-skill` (QA y export a 5 destinos), `motion-graphics` (música original al beat) |
| Labi & Beto | `watch`, `hypit`, `short-form-edit`, `video-storytelling` |
| Stickman (Día N, El Agente, La Orden, Día 1 sin IA) | `gsap`, `hyperframes-video-beats`, `video-storytelling`, `sound-effects` |
| ¿Y si sí? (largo, YouTube) | `watch`, `remotion-maps`, `manimgx`, `archivo-internet-footage`, `lemo-opuscar`, `docs\skills-video\ESTRUCTURA.md` |
| LEGO 3D / brickfilm (Blender) | `animacion-lego-3d`, `sound-effects`, `motion-graphics` (música original con su sintetizador), `ffmpeg-skill`, `watch` |
| Piezas premium / sin marca | `motion-studio-by-buck`, `lemo-opuscar`, `archivo-internet-footage`, `manimgx` |
| Comerciales | `archivo-internet-footage`, `watch`, `motion-graphics`, `lemo-opuscar` |
| Sitio web a video / documental ST | `website-to-hyperframes`, `motion-showreel` |
| Hugo y podcast | `cut-silences`, `cut-mistakes`, `edit-video`, `motion-broll`, `explainer-default/engaging/high-energy` |
| V1 IA sorprendente | `hypit` + ideas de `awesome-viral-ai-videos` / `opus-video-prompts` |
| Copy y estrategia | `mk-*` |

## Catálogo completo
**Video hecho con código:**
- `hyperframes*`: motor principal.
- `remotion-*` (12): tienen licencia de empresa si AI Lab School pasa de 3 personas.
- `motion-design`, `lottie-motion-design`, `motion-graphics`, `motion-showreel`, `motion-studio-by-buck`, `lemo-opuscar` (59 estilos de cine), `manimgx` (matemáticas y 3D; `pip install manimgx`), `gsap`, `style-library`, `make-a-video`, `short-form-video`, `video-storytelling`, `hyperframes-video-beats`, `website-to-hyperframes`, `tesseract-motion`, `tesseract-video`, `camera-3d-captions`.
- `animacion-lego-3d`: Blender + LDraw + caras animadas + render farm en la GPU de la PC.

**Edición de video grabado:** `ffmpeg-skill`, `edit-video`, `short-form-edit`, `cut-silences`, `cut-mistakes`, `motion-broll`, `object-separation`, `explainer-*`, `media-use`.

**Análisis y clonado de referencias:**
- `watch`: necesita yt-dlp y whisper.
- `hypit`: necesita su runtime.
- `reverse-engineer-anything`: necesita `npx rea-agents setup`.

**Audio y material:** `sound-effects`, `archivo-internet-footage` (Prelinger y 78 rpm; verificar la licencia de cada item), `voz-elevenlabs`.

**Marketing:** `mk-*` y `ai-lab-school-guiones`.

**Fuera del video** (apps y web): `render-*`, `shadcn`, `better-*`, `frontend-design`, `emil-design-eng`.

## Fuentes (si hay que clonar)
lemomo-ai/lemo-opuscar · taoufik123-collab/claude-watch · kajisho5/ffmpeg-skill · howseen-ai/claude-motion-design · remotion-dev/skills · nateherkai/hyperframes-student-kit · Barty-Bart/motion-graphics · Mort1d/motion-graphics-skills · LottieFiles/motion-design-skill · hypit-ai/hypit · academa-labs/manimgx · JohnHeibel/ClaudeAnimationBase · Vincentwei1021/mg-styles-15 · jakubkrehel/skills · emilkowalski/skills · anthropics/skills · shadcn-ui/ui · render-oss/skills · morluto/rea · gkjohnson/ldraw-parts-library · TobyLobster/ImportLDraw.