# What If Stick Animation

Sistema privado de producción de animación stickman 2D mediante Canvas y herramientas locales. Conserva las skills y el código utilizados por el canal Aquí el hubiera sí existe, bajo un nombre de repositorio reutilizable.

## Qué incluye

- `skills/`: seis skills vigentes de guion, voz, dirección, producción y salidas; la anterior se conserva marcada obsoleta.
- `herramientas/`: motor de producción, esqueleto, animatic, tomas, mezcla, render horizontal/vertical, fragmentos y QA.
- `episodios/`: código, guiones, storyboard, tiempos y configuración histórica de ep01, ep02 y ep04 como referencias editables.
- `docs/`: método, diseño, audio, eficiencia y lecciones de producción.
- `marca/` y `personaje/`: documentación de identidad y fuentes tipográficas con sus licencias.

Los estados dentro de las fichas históricas describen su snapshot, **no** el estado actual de publicación del canal. La carpeta operativa del canal y sus recibos originales siguen siendo la autoridad. Esta copia no modifica producciones activas, cuentas ni calendarios.

## Inicio

Requisitos: Node >=20, Python >=3.10 y FFmpeg/ffprobe en PATH.

```sh
npm ci
npx playwright install chromium
python -m venv .venv
# Activar .venv según tu sistema operativo
python -m pip install -r requirements.txt
```

Lee `AGENTS.md`, `skills/README.md` y `docs/00-modus-operandi.md` antes de producir.

```sh
node herramientas/probe.mjs ep04 0 8 0.5
node herramientas/probe.mjs ep04 --v 0 8 0.5
node herramientas/snap.mjs ep04 render/prueba --hoja 6
python herramientas/producir.py ep04 --prueba 8
```

**Restaurar primero el audio local aprobado** para mezclar o renderizar una entrega con voz: los masters, música y efectos grabados no están en Git. Su ausencia no autoriza regenerar voces. `nuevo_episodio.py` también necesita los medios externos del episodio base.

## Reglas conservadas

Estructura editorial: hook → contexto → bifurcación clara y «¿y si sí?» → desarrollo → conclusión → CTA. Una idea por plano, cambios visuales con intención aproximadamente cada 3–5 segundos, contacto físico y continuidad espacial; QA por formato y revisión con audio. Dr. narrador en momentos puntuales, no presente permanentemente.

Voz: una sola toma autorizada, manifiesto y candado antes de cualquier servicio pagado. No duplicar llamadas inciertas. Modelos, cuentas y voces requieren configuración del propietario: este repositorio no concede permisos de gasto ni publicación.

Distribución: copias limpias y SHA-256 vigentes, portada específica por fragmento, copys por red, conservar IDs e interacciones. No activar etiquetas manuales opcionales por defecto; mantener declaraciones obligatorias y no prometer ausencia de etiquetas automáticas. Si el editor no permite cambiar una portada publicada, registrar el pendiente y no borrar/resubir para simular una corrección.

## Exclusiones y procedencia

Sin credenciales, cookies, tokens, datos operativos de cuentas, audios, renders, modelos descargados ni imágenes de producción. Las rutas personales se sustituyeron por `<LOCAL_PROJECT_PATH>`. El código de ejemplo conserva nombres e identidad del canal para documentar su procedencia; el repositorio tiene un nombre independiente.

`SNAPSHOT.json` documenta archivos fuente y huellas. Las fuentes conservan sus licencias OFL. No se asigna una licencia de software nueva ni se concede permiso de redistribución de recursos de terceros. No se ha ejecutado producción, síntesis de voz ni publicación al preparar esta copia.
