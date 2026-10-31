# El Hubiera

> *Aquí el hubiera sí existe.* Historias de "¿y si…?" de México, animadas 100 % por código.

**Canal:** El Hubiera · **Usuario:** @aquielhubierasiexiste (YouTube, TikTok, Instagram y Facebook)
**Cierre de cada episodio:** "¿Y si sí?"

Este repo tiene todo lo necesario para producir un episodio de principio a fin:

- el motor de animación (canvas + Playwright);
- el código de cada episodio;
- las herramientas de audio, render, fragmentos y entrega;
- la identidad visual v3 "Bifurcación";
- el modo de trabajo documentado;
- los videos terminados.

## Episodios

| # | Título | Duración | Estado | Carpeta |
| --- | --- | --- | --- | --- |
| 01 | ¿Y si no hubiera sido penal? | 3:00.7 | Programado en YouTube: 26 oct, 12:00 | [`episodios/ep01-no-era-penal`](episodios/ep01-no-era-penal) |
| 02 | ¿Y si México ganaba el Mundial? | 3:36.6 | Programado en YouTube: 29 oct, 12:00 | [`episodios/ep02-mexico-campeon`](episodios/ep02-mexico-campeon) |

Cada episodio se entrega en 16:9 y 9:16, cada uno con versión ligera de menos de 29 MB. Además lleva 3 partes para TikTok y Reels, 2 Shorts y portadas. Todo está en [`videos/`](videos/README.md).

## Arranque rápido (Windows)

1. Doble clic en **`setup.cmd`**. También puedes abrir PowerShell en esta carpeta y correr `.\setup.ps1`. El setup:
   - revisa o instala Node, Python y FFmpeg;
   - instala Playwright con Chromium y crea el `.venv` con las librerías;
   - baja los modelos locales;
   - une los videos en calidad completa y hace una prueba.
2. Prueba el motor sin renderizar:

```powershell
node herramientas\probe.mjs ep02                                  # recorre la línea de tiempo buscando errores
node herramientas\snap.mjs ep02 revision-cuadros --hoja 6         # un cuadro cada 6 s (agrega --v para vertical)
```

3. Produce un episodio completo o una prueba corta:

```powershell
.\.venv\Scripts\python herramientas\producir.py ep02 --prueba 8   # 8 s en ambos formatos, en render\
.\.venv\Scripts\python herramientas\producir.py ep02              # todo: audio → render → final → ligero → fragmentos → QA
```

En macOS o Linux se usa `./setup.sh` y `.venv/bin/python`.

## Cómo está organizado

```text
el-hubiera/
├── README.md · AGENTS.md (reglas para agentes) · CLAUDE.md
├── setup.cmd · setup.ps1 · setup.sh · package.json · requirements*.txt
├── docs/                    modo de trabajo completo (empieza por 00-modus-operandi.md)
├── episodios/
│   ├── ep01-no-era-penal/   episodio.json · clips.json · proyecto/ (motor + tomas) · audio/ · guion/ · copys/ · revision/
│   └── ep02-mexico-campeon/
├── herramientas/            producir · render · snap · probe · timeline · mezclar · codificar · fragmentos · medir
│                            partes · separar_voz · transcribir · nuevo_episodio · overlays/ · sfx/
├── marca/                   identidad v3: kit (logos, perfiles, banners, miniaturas), guía, generador y fuentes
├── skills/el-hubiera-video/ skill de Claude/Codex con este flujo
├── videos/                  entregas por episodio: completos, ligeros, fragmentos y portadas
├── render/                  (se crea solo) renders crudos y pruebas · no va a git
└── modelos/                 (lo llena setup) Whisper base y MDX-Net · no va a git
```

## El flujo en una línea

```text
idea → guion → voz (1 toma) → tiempos por palabra → tomas en el motor → probe/snap → audio por código → mezcla -14 LUFS
→ render 16:9 + 9:16 → final con grano → ligero → 3 partes + 2 Shorts → portadas + copys → aprobación → publicar
```

Los detalles están en [docs/00-modus-operandi.md](docs/00-modus-operandi.md). Las guías por tema:

| Documento | Para qué |
| --- | --- |
| [00 · Modus operandi](docs/00-modus-operandi.md) | El proceso completo, quién hace qué y cuánto tarda |
| [01 · Setup](docs/01-setup.md) | Instalación, verificación y problemas comunes |
| [02 · Guion y voz](docs/02-guion-y-voz.md) | Fórmula del guion, ElevenLabs sin gastar doble, tiempos por palabra |
| [03 · Motor](docs/03-motor.md) | Cómo funciona el motor y cómo se escribe una toma |
| [04 · Audio](docs/04-audio.md) | Música y efectos por código, mezcla y sonoridad |
| [05 · Render y entrega](docs/05-render-y-entrega.md) | Render reanudable, codificación, QA y copia a la PC |
| [06 · Fragmentos y distribución](docs/06-fragmentos-y-distribucion.md) | Partes, Shorts, textos, calendario y publicación |
| [11 · Publicar con Claude](docs/11-publicar-con-claude.md) | Subir y programar en YouTube, TikTok, Instagram y Facebook desde Claude in Chrome |
| [07 · Marca](docs/07-marca.md) | Identidad v3 "Bifurcación" y cómo aplicarla |
| [08 · Skills y herramientas](docs/08-skills-y-herramientas.md) | Qué skill o herramienta se usa en cada paso |
| [09 · Checklist por episodio](docs/09-checklist-episodio.md) | Lista para no saltarse nada |
| [10 · Lecciones](docs/10-lecciones.md) | Errores que ya pasaron y cómo evitarlos |

## Reglas que no se rompen

- **Nada se publica sin aprobación.** Antes de programar, se revisa lo que ya está programado o publicado para no duplicar.
- **Voz de ElevenLabs: una sola toma.** Antes de generar se revisa `revision/voz-elevenlabs.json` y `voz-lock.json` (skill `voz-elevenlabs`). Si solo cambia la imagen, se reutiliza el audio.
- **El narrador siempre al frente.** La mezcla va a −14 LUFS y los efectos nunca lo tapan.
- **Un solo acento de color** (rosa mexicano #E4007C): lo que no pasó. Sin rayos, sin confeti, sin zooms de golpe repetidos.
- **Llamados a la acción:** comentar y seguir. Al subir cualquier video se adjunta su portada.
- No se imita la voz de un artista real. Los clips de terceros se marcan como riesgo de Content ID.

## Git

Esta carpeta vive dentro de `Automatizacion\`, pero el `.gitignore` de esa carpeta (que funciona como lista permitida) la deja fuera. Así que es un repo independiente:

```powershell
git init -b main; git add .; git commit -m "El Hubiera: motor, episodios 01-02, herramientas y marca v3"
gh repo create el-hubiera --private --source . --push     # solo cuando decidas subirlo
```

Los medios pesados (`videos/**/*.mp4`, `render/`, `modelos/`) no entran a git. Para versionarlos, usa Git LFS (`.gitattributes`).

## Licencias

- **Código:** privado, de Ai Lab School.
- **Fuentes:** Instrument Serif, Instrument Sans y Geist Mono con licencia SIL OFL 1.1 (en `marca/fuentes/`); Anton y Montserrat (OFL), dentro de cada proyecto.
- **Efectos de sonido:** Freesound (el número de `fs-<id>` lleva a su página y licencia), Kenney (CC0) y ElevenLabs (generados con la cuenta del canal).
