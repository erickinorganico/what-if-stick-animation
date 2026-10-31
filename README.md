# What If Stick Animation

Sistema de producción de animación stickman 2D mediante Canvas y herramientas locales. Conserva las skills y el código utilizados por el canal Aquí el hubiera sí existe, bajo un nombre de repositorio reutilizable.

## Qué incluye

- `skills/`: seis skills vigentes de guion, voz, dirección, producción y salidas; la anterior se conserva marcada obsoleta.
- `herramientas/`: motor de producción, esqueleto, animatic, tomas, mezcla, render horizontal/vertical, fragmentos y QA.
- `episodios/`: código, guiones, storyboard, tiempos y configuración histórica de ep01, ep02 y ep04 como referencias editables.
- `docs/`: método, diseño, audio, eficiencia y lecciones de producción.
- `marca/` y `personaje/`: documentación de identidad y fuentes tipográficas con sus licencias.

Los estados dentro de las fichas históricas describen su snapshot, **no** el estado actual de publicación del canal. La carpeta operativa del canal y sus recibos originales siguen siendo la autoridad. Esta copia no modifica producciones activas, cuentas ni calendarios.

## Instalar en otra computadora

Estas instrucciones son para **Claude Code y Codex con acceso al sistema de archivos local**. Clonar el repo no instala automáticamente sus skills. Los repositorios son públicos: no hace falta un token para descargarlos.

### 1. Descargar el proyecto

Instala Git, Node.js >=20, Python >=3.10 y FFmpeg/ffprobe. Instala y autentica Claude Code o Codex por sus canales oficiales, según el agente que vayas a usar.

```sh
git clone https://github.com/erickinorganico/what-if-stick-animation.git
cd what-if-stick-animation
```

Puedes descargar **Code → Download ZIP** y descomprimirlo si no utilizas Git. Conserva esta carpeta: las skills necesitan sus herramientas, documentación y episodios de referencia, no sólo el texto de `SKILL.md`.

### 2. Instalar las seis skills en el proyecto

Ejecuta **un solo bloque**, según tu terminal, desde la raíz del clon. Crea ambas ubicaciones para poder usar los dos agentes; si utilizas sólo uno, deja únicamente su ruta en la lista. Las carpetas existentes se omiten para no sobrescribir tus personalizaciones. No instales `el-hubiera-video`: es la versión obsoleta.

**Windows · PowerShell:**

```powershell
$skillNames = @('kit-video-ai-lab', 'escritura-guiones-ai-lab', 'voz-elevenlabs', 'stickman-animation-video', 'stickman-animation-direccion', 'stickman-animation-salidas')
foreach ($base in @('.claude/skills', '.agents/skills')) {
    New-Item -ItemType Directory -Path $base -Force | Out-Null
    foreach ($skillName in $skillNames) {
        $target = Join-Path $base $skillName
        if (Test-Path -LiteralPath $target) {
            Write-Host "Ya existe; se conserva: $target"
        } else {
            Copy-Item -LiteralPath "skills/$skillName" -Destination $target -Recurse
        }
    }
}
```

**macOS/Linux · bash o zsh:**

```sh
for base in .claude/skills .agents/skills; do
  mkdir -p "$base"
  for name in kit-video-ai-lab escritura-guiones-ai-lab voz-elevenlabs stickman-animation-video stickman-animation-direccion stickman-animation-salidas; do
    if [ -e "$base/$name" ]; then
      printf 'Ya existe; se conserva: %s\n' "$base/$name"
    else
      cp -R "skills/$name" "$base/$name"
    fi
  done
done
```

Ubicaciones de descubrimiento: Claude Code usa `.claude/skills/<nombre>/SKILL.md`; Codex usa `.agents/skills/<nombre>/SKILL.md`. Para disponibilidad personal en todos tus proyectos, puedes copiar las mismas carpetas a `~/.claude/skills/` y `~/.agents/skills/`, respectivamente. El alcance por proyecto es la opción de estos comandos y evita afectar otros trabajos. En Windows, `~` corresponde a tu carpeta de usuario.

### 3. Abrir e invocar las skills

**Claude Code:** inicia `claude` desde la raíz del clon o abre esa carpeta como proyecto local. Usa `/stickman-animation-video` en el chat; para guion usa `/escritura-guiones-ai-lab` y para una escena `/stickman-animation-direccion`. Abre una sesión nueva si no aparecen en el menú `/`. Pídele leer también `AGENTS.md`, porque este repo no incluye un `CLAUDE.md` raíz.

**Codex:** abre la carpeta del clon en la app, extensión o CLI. En CLI/extensión puedes consultar `/skills` o escribir `$stickman-animation-video`; también puedes pedir la skill por su nombre. Si no se detecta, reinicia la sesión/app y comprueba que el archivo no quedó anidado como `.../nombre/nombre/SKILL.md`.

Prompt de prueba para cualquiera de los dos:

```text
Trabaja desde la raíz de este clon. Lee AGENTS.md, README.md y las skills
stickman-animation-video y stickman-animation-direccion. Identifica las
dependencias y assets disponibles. Usa docs/ y herramientas/ de ESTE clon;
no sigas rutas personales de la documentación histórica.
Revisa los primeros 8 segundos de ep04 en horizontal y vertical con probe.
No generes voz, no gastes créditos ni publiques. Dime el resultado real.
```

Las skills son instrucciones; **no instalan MCP, credenciales ni comandos de proveedores**. Las menciones a herramientas de Claude dentro de una skill deben adaptarse a las capacidades disponibles en Codex. Una llamada a una herramienta inexistente no se considera ejecutada.

### 4. Preparar y comprobar el motor local

Desde la raíz, en ambos sistemas:

```sh
npm ci
npx playwright install chromium
```

**Windows · PowerShell (sin modificar la política de ejecución):**

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
ffmpeg -version
ffprobe -version
node herramientas/probe.mjs ep04 0 8 0.5
node herramientas/probe.mjs ep04 --v 0 8 0.5
```

**macOS/Linux:**

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
ffmpeg -version
ffprobe -version
node herramientas/probe.mjs ep04 0 8 0.5
node herramientas/probe.mjs ep04 --v 0 8 0.5
```

Los probes prueban ejecución del motor, no una entrega terminada con audio. Los scripts de setup antiguos mencionados en algunos documentos no están incluidos: usa los comandos anteriores. Si Chromium pide dependencias del sistema, sigue el diagnóstico de Playwright para tu sistema operativo.

### 5. Antes de producir con voz o crear otro episodio

- Recupera por un canal privado los masters aprobados, música, efectos y sus manifiestos/alineaciones. Ponlos en las rutas que indica `episodios/<slug>/episodio.json`; no están en Git. No los regeneres por faltar en el clon.
- `nuevo_episodio.py` también copia medios del episodio base: restáuralos primero. No presupongas que un clon sin audio produce un episodio completo.
- Sustituye referencias históricas `<LOCAL_PROJECT_PATH>` y configura rutas de referencia de tu computadora. No reutilices nombres de cuenta, IDs o proveedores sin verificar tu entorno.
- Si necesitas ElevenLabs, Claude Ai Lab School u otro servicio, configura el acceso por separado con autorización. Las skills externas citadas —por ejemplo `publicar-redes-ai-lab` o estrategia de contenido— no se incluyen ni se instalan con este repo.
- Claude Cowork y sesiones de nube no heredan las skills de tu disco: habilítalas en la configuración de skills de tu cuenta cuando esa modalidad lo requiera, y proporciona los archivos de proyecto pertinentes. No subas secretos o el repositorio completo por rutina.

### Actualizar una instalación

Ejecuta `git pull --ff-only` en el clon si no tiene cambios propios. Las copias instaladas en `.claude/skills/` o `.agents/skills/` **no se actualizan solas**: compara con `skills/`, respalda personalizaciones y reemplaza sólo las carpetas que decidas actualizar. No instales la misma skill en varios alcances sin revisar cuál está cargando el agente.

Documentación de referencia: [skills en Claude Code](https://code.claude.com/docs/en/skills) y [skills en Codex](https://developers.openai.com/codex/skills/).

## Reglas conservadas

Estructura editorial: hook → contexto → bifurcación clara y «¿y si sí?» → desarrollo → conclusión → CTA. Una idea por plano, cambios visuales con intención aproximadamente cada 3–5 segundos, contacto físico y continuidad espacial; QA por formato y revisión con audio. Dr. narrador en momentos puntuales, no presente permanentemente.

Voz: una sola toma autorizada, manifiesto y candado antes de cualquier servicio pagado. No duplicar llamadas inciertas. Modelos, cuentas y voces requieren configuración del propietario: este repositorio no concede permisos de gasto ni publicación.

Distribución: copias limpias y SHA-256 vigentes, portada específica por fragmento, copys por red, conservar IDs e interacciones. No activar etiquetas manuales opcionales por defecto; mantener declaraciones obligatorias y no prometer ausencia de etiquetas automáticas. Si el editor no permite cambiar una portada publicada, registrar el pendiente y no borrar/resubir para simular una corrección.

## Exclusiones y procedencia

Sin credenciales, cookies, tokens, datos operativos de cuentas, audios, renders, modelos descargados ni imágenes de producción. Las rutas personales se sustituyeron por `<LOCAL_PROJECT_PATH>`. El código de ejemplo conserva nombres e identidad del canal para documentar su procedencia; el repositorio tiene un nombre independiente.

`SNAPSHOT.json` documenta archivos fuente y huellas. Las fuentes conservan sus licencias OFL. No se asigna una licencia de software nueva ni se concede permiso de redistribución de recursos de terceros. No se ha ejecutado producción, síntesis de voz ni publicación al preparar esta copia.
