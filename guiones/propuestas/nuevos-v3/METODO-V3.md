# Método v3 · brief usado para la pasada de enganche

> PROPUESTA PENDIENTE DE ERICK. Es el encargo exacto que recibieron los subagentes que escribieron `nuevos-v3` (5 nov 2026). Se conserva como procedencia; el método vigente propuesto está destilado en `skills/guion-hubiera/`.

**Encargo del usuario (textual):** «Mejora cada uno de estos guiones para que sean más enganchantes de principio a fin, que tengan hooks poderosos, estructura de guion dopamínica y sean realmente entretenidos de seguir.»

Esto es una **pasada de enganche y ritmo** sobre la edición v2. No es un cambio de concepto. Conserva la premisa, el motor central y el espíritu del remate de cada episodio. Puedes reordenar, cortar, afilar, añadir gags, diálogos, giros y re-ganchos, y fortalecer un remate débil, siempre que no traiciones lo que Erick pidió.

## Rutas

- Fuente (solo lectura, no la modifiques): `guiones/nuevos-v2/` (el ZIP de continuidad del 4 nov incluía además `REVISION-EDITORIAL.json`, `notas-*.json` y `PARCHES-24-*.json`)
  - `episodios/NN-slug.md` (ficha, locución, storyboard, fuentes, checklist) y `episodios/NN-slug.txt` (solo locución).
  - `FEEDBACK-HUMANO.md`: **obligatorio**. Preferencias de Erick y las cinco instrucciones concretas.
  - `EXTRACTO-SKILL-ACTUALIZADA.md`: **obligatorio**. Reglas transferibles y la prueba de rechazo.
  - `FUENTES.json`: datos reales permitidos. `REVISION-EDITORIAL.json`, `notas-*.json`, `PARCHES-24-*.json`: lee las entradas de tus episodios.
- Guía del canal: `skills/stickman-animation-video/references/guion-enganche-hubiera.md`. **Obligatoria.**
- Salida: `guiones/propuestas/nuevos-v3/episodios/` y `guiones/propuestas/nuevos-v3/notas/`. Usa el mismo nombre de archivo que en la fuente.

## Restricciones duras (de Erick, no negociables)

- Mantén **literales** las líneas que Erick eligió:
  - Batman: «México es como Gótica, pero con menos agua y mejores tacos». Le ofrecen Guadalajara, no quiere, «Cosas de gente de Ciudad Gótica». Sin tía ni familia como motor.
  - Corrupción: «¿Eso fue un soborno? Aquí no hacemos eso.» / «Ayúdeme, oficial, ya se la sabe» / «Pues si no soy perro» (y le pone la multa). Termina creciendo más que China, con mecanismos y tiempo.
  - Bolillo: «ALTO AHÍ, ESO ES ILEGAL». «En esta realidad, en México está prohibido meter comida dentro de un bolillo». Molletes permitidos, 70% absurdo, torta de jamón como daño colateral, nave gótica-industrial (premisa de Event Horizon resumida, sin clips ni frases de la película), máquina con forma de torta de tamal, glitch y corte. Años luz miden distancia.
  - Quesadillas: doña Mary, INICIATIVA QUESADILLA, neolengua/1984, los capitalinos deben pedir «taco de guisado». Cierre: «Hay progreso en México, pero ¿a qué costo?».
  - Inflación: incluye estanflación y por qué se prefieren metas bajas positivas, con imágenes. El cero puede coexistir con actividad sana o floja. Sin la lavadora como historia central.
- No usar Rocío ni Ofe. No narrar disclaimers tipo «esta ley no existe, la inventamos». Basta «En esta realidad...».
- **Datos reales:** solo los de FUENTES.json o los que ya traía el guion, con unidad, periodo y universo correctos. No inventes estadísticas reales. Las cifras absurdas solo valen dentro del mundo animado y deben leerse como hipérbole.
- Sin moralejas, abrazos, café ni ternura por defecto. Sátira negra, distopía u horror solo si nacen de la premisa, y no el mismo género en todos.
- La locución es oral y directa. Cámara, poses y textura van en el storyboard.
- No generes voces ni imágenes, no publiques, no uses red. Solo texto.

## Estructura dopamínica (lo que hay que lograr)

1. **Hook, 0–3 s.** La primera frase de la locución es el gancho: máximo unas 14 palabras, en plena acción y con algo absurdo o en riesgo que se pueda dibujar. Debe abrir una pregunta en la cabeza del espectador. Nunca abre con contexto, definición, fecha ni «En esta realidad».
2. **Promesa confirmada, 3–12 s.** Queda claro que vamos a ver la premisa del título. El primer pago (gag, revelación o giro) llega antes de los 15–20 s.
3. **Loop principal.** Antes de los 20 s, planta un objeto, frase o pregunta que el final paga transformado (callback). Anótalo en la ficha.
4. **Cadencia.** Un micro-pago cada 15–25 s: gag visual, revelación, cifra absurda, línea de diálogo citable o inversión. Cada 30–45 s, un re-gancho que haga necesitar lo que sigue.
   - El re-gancho debe ser **específico de la historia** (una amenaza, una cuenta regresiva, un personaje que entra, una decisión a punto de tomarse).
   - Prohibidas las fórmulas genéricas: «pero eso no es lo peor», «lo que pasó después...», «spoiler», «quédate hasta el final», «nadie se lo esperaba».
5. **Escalada causal.** Usa «por eso», «entonces» o «y por lo tanto», nunca «y luego». Cada golpe sube la escala (persona → ciudad → país → mundo o lo imposible) o invierte el anterior. Cerca de la mitad va un **giro** que reencuadra todo.
6. **Interrupciones de patrón.** Varía el largo de las frases (corta, corta, larga). Mete diálogos cortos que el narrador actúa, silencios de reacción y saltos de escala o lugar.
   - Nunca dos párrafos explicativos seguidos.
   - Una explicación de datos ocupa máximo 2–3 frases cortas, montada sobre una imagen o metáfora y con un gag pegado.
7. **Clímax y remate.** La imagen más grande va cerca del final. El remate tiene máximo unas 15 palabras, con la palabra clave al final, paga el loop principal y corta en seco. Nada después del remate, salvo el CTA o pregunta de identificación de los episodios de visitas, que ya la traen.
8. **Cero paja.** Cada línea muestra algo dibujable. Borra frases redundantes, transiciones vacías y explicaciones del chiste. Si una línea no hace reír, no tensa ni avanza, se va.

Duración: la historia manda. Normalmente quedará igual o más corta, por ser más densa. Calcula 145 palabras/min más pausas de reacción.

## Entregables por episodio

1. `episodios/NN-slug.md` con las mismas secciones que la fuente:
   - `## FICHA`: añade **Hook principal**, **2 hooks alternativos** (cada uno con 1–2 frases de continuación, para que Erick elija), **Loop principal → dónde se paga** y un **Mapa dopamínico**: tabla con tiempo aproximado, beat y tipo (gancho / pago / re-gancho / giro / interrupción / clímax / remate).
   - `## LOCUCION`
   - `## STORYBOARD`: rehecho para la nueva locución, con las mismas columnas y convenciones de la fuente (DrV10 puntual, `dip`, un solo zoom de golpe, acento rosa, etc.) e intervalos recalculados.
   - `## FUENTES-Y-SUPUESTOS`: conserva lo de la fuente y actualiza.
   - `## CHECKLIST`
2. `episodios/NN-slug.txt` con **solo** la locución, idéntica a la sección LOCUCION.
3. `notas/NN-slug.md` con:
   - El hook antes y después.
   - Qué cortaste y qué añadiste (viñetas).
   - Palabras antes → después (`wc -w` sobre los .txt) y duración estimada.
   - Autoevaluación 1–10: hook, cadencia, escalada, gags, giro, remate, voz oral, fidelidad al feedback de Erick.
   - Dudas o riesgos para que decida Erick.

## Proceso

1. Lee los tres documentos obligatorios y luego cada episodio completo (.md).
2. Reescribe. Lee la locución en voz alta mentalmente: si en algún tramo de 20 s no pasa nada nuevo, arréglalo.
3. Autoevalúate. Todo lo que quede por debajo de 8 se reescribe, con máximo 2 pasadas extra.
4. Si tus episodios son de la misma serie (agua, PIB, visitas), **diferéncialos**: ningún hook, re-gancho, estructura ni remate puede repetirse entre hermanos.
5. Al final responde en ≤ 15 líneas: archivos escritos, palabras antes → después por episodio y una línea con el cambio más fuerte de cada uno.
