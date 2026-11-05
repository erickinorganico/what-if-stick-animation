# 26 · Guiones: flujo eficiente (propuesta 5 nov 2026)

> PROPUESTA PENDIENTE DE ERICK. Sale de la reescritura de los 25 guiones (`guiones/propuestas/nuevos-v3`) y de la creación de las skills `guion-hubiera` y `revision-enganche-hubiera`. Es preferencia editorial y medición de costo, no dato de rendimiento del canal.

## Objetivo

Mejores guiones con menos vueltas y menos tokens. Lo caro no es escribir la locución: es releer guías largas, rehacer storyboards de locuciones que todavía van a cambiar y contar palabras «a ojo».

## Flujo por etapas

| Etapa | Qué se entrega | Quién decide | Herramienta |
|---|---|---|---|
| 1 · Idea | Ficha de 10 líneas + 3 hooks con 20–30 s de continuación | **Erick elige el hook** (o combina) | `guion-hubiera` |
| 2 · Locución | `NN-slug.md` (ficha, locución, mapa dopamínico, fuentes, checklist) + `NN-slug.txt` | **Erick aprueba la locución** | `guion-hubiera` + `scripts/medir_guion.py` |
| 2b · Voz | `episodios/<slug>/guion/guion-voz-v1.txt` con etiquetas y números con letra | — | docs/02 |
| 3 · Storyboard | Tabla de planos sobre la locución aprobada | Erick revisa el animatic | `guion-hubiera` → `esqueleto.py` → `stickman-animation-direccion` |
| Auditoría | Hallazgos + reescrituras puntuales | Erick decide qué aplicar | `revision-enganche-hubiera` |

Regla de ahorro: **no se escribe storyboard de una locución no aprobada.** En el lote v3 el storyboard fue la mayor parte del texto generado y se rehace completo cada vez que cambia la locución.

## Costo medido en este lote (5 nov 2026, Claude Cloud)

- 6 subagentes en paralelo, uno por serie, reescribieron 25 guiones **con storyboard completo**: unos 180–230 mil tokens por subagente (3–5 episodios cada uno) y ~10–16 min de reloj cada uno. Buena parte se fue en leer 4 documentos de guía y en rehacer storyboards.
- Crear las dos skills costó ~260 mil tokens adicionales.
- La etapa 1 de una premisa nueva («¿Y si el Metro de la CDMX fuera gratis para siempre?») se escribió leyendo solo `guion-hubiera/SKILL.md`. Su costo no se midió por separado.

Decisión de Erick (5 nov): para guiones **no se usa el modelo más grande** por rutina; basta el modelo habitual con estas skills.

## Qué modelo para qué

- **Etapas 1 y 2 (creativas):** el modelo habitual de razonamiento alto. El hook, el giro y el remate son decisiones de gusto.
- **Etapa 2b, etapa 3 y auditoría mecánica:** un modelo más económico sigue bien las convenciones del storyboard y de la versión para voz.
- **Medir, contar y verificar:** sin modelo. `medir_guion.py` y `qa_guiones.py` dan palabras, duración, hook, remate, bloques largos, cifras en dígitos, `.txt` = LOCUCION, líneas literales y presupuesto de palabras.

## Trabajo en lote (series y muchos episodios)

1. **Un agente por serie** (agua, PIB, visitas…), no por episodio: la tabla de hermanos (hook, motor, re-gancho, giro, género, remate) tiene que vivir en una sola cabeza para que no se repitan.
2. **Un brief común** para todos, con las líneas literales del humano en un `LITERALES.json` (ejemplo: `guiones/propuestas/nuevos-v3/LITERALES.json`).
3. **Archivos y temporales con nombre único por agente.** En el lote v3 un agente sobrescribió el script de tiempos de otro en una carpeta compartida.
4. **Al final, una sola pasada de control:**
   ```sh
   python3 herramientas/qa_guiones.py guiones/propuestas/<tema>/episodios --prev <versión previa> --literales <LITERALES.json>
   ```
5. **Entrega con hooks alternativos y dudas** por episodio; el humano elige antes de voz.

## Cómo aprenden las skills

- Cada rechazo o preferencia de Erick se anota con fecha y ámbito en `skills/guion-hubiera/references/antipatrones.md` (qué no, por qué y qué sí). Las líneas que él elige van al `LITERALES.json` de la pieza.
- Preferencia y rendimiento son evidencia distinta. **Propuesta:** cuando un episodio se publique, registrar en `guiones/metricas/` (CSV) el tipo de hook, el mecanismo de re-gancho y el género del remate junto con retención a 30 s y % visto (YouTube Studio / Windsor). Con 10–15 episodios se puede saber qué tipo de hook retiene más en este canal, en vez de suponerlo.
- No fabricar aprobación: un `OK` de los scripts o una autoevaluación de 9 no dicen que el guion sea bueno; lo dice Erick y, después, la retención.
