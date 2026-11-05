---
name: guion-hubiera
description: "Escribe o reescribe un episodio «¿Y si...?» del canal animado El Hubiera (@aquielhubierasiexiste): ficha, hooks, locución con estructura dopamínica y, solo si se pide, storyboard. Úsala siempre que el encargo mencione El Hubiera, un «¿y si…?» hipotético sobre México o un guion para ese canal, aunque no pida explícitamente la skill. No la uses para piezas AI Lab School de 55–70 s con CTA de agente (eso va con escritura-guiones-ai-lab) ni para producir voz, animación o render (stickman-animation-video)."
---

# Guion El Hubiera

Episodio animado de sátira hipotética: una regla cambia («¿Y si México creciera al 10 %?») y el país la obedece hasta las últimas consecuencias. Español de México, oral, 2–5 min (más solo si la escalada lo exige). Este archivo contiene todo lo necesario para escribir; abre `references/` solo cuando el paso lo pida.

## 1. Flujo por etapas (para no gastar de más)

Trabaja por etapas y **para al final de cada una** a esperar al humano, salvo que te pidan todo de una vez.

| Etapa | Entregas | Carga antes |
|---|---|---|
| **1 · Idea** | Ficha de 10 líneas + 3 hooks, cada uno con 20–30 s de continuación (50–70 palabras). Tabla de hermanos si es serie. **Para.** | nada más |
| **2 · Locución** | LOCUCION completa + mapa dopamínico + `.txt` idéntico + FUENTES-Y-SUPUESTOS + riesgos para el humano + salida de `scripts/medir_guion.py`. **Para.** | `references/ejemplos-v3.md` si dudas del tono o de cómo trocear datos |
| **2b · Versión para voz** | Solo con la locución aprobada y si trabajas en el repo: `episodios/<slug>/guion/guion-voz-v1.txt` con etiqueta de emoción solo donde cambia el registro, números con letra y **sin cambiar palabras** (son las anclas `A3('…')` del motor). Reglas en `docs/02-guion-y-voz.md`. | nada más |
| **3 · Storyboard** | Tabla de planos sobre la locución aprobada. Solo cuando lo pidan o aprueben la voz. | `references/storyboard.md` |

Por qué: en el lote v3 cada agente gastó la mayor parte de los tokens releyendo guías y rehaciendo storyboards de locuciones que luego cambiaban. La etapa 1 cuesta poco y es donde el humano más decide.

La etapa 1 se entrega en el chat, salvo que pidan archivo. El nombre del episodio (`NN-slug`) lo da el humano; si no, deriva el slug del título y deja `NN` pendiente.

Si reescribes un guion existente: conserva premisa, motor y espíritu del remate; lee la versión previa una sola vez y anota sus líneas literales obligatorias antes de tocar nada.

## 2. Estructura dopamínica (con números)

Calcula a 145 palabras/min: 3 s ≈ 7 palabras, 20 s ≈ 48, 30 s ≈ 72, 1 min ≈ 145. Suma ~0.5 s por párrafo de pausas de reacción.

1. **Hook, 0–3 s.** El hook es **lo que se oye en los primeros 3 s (7–9 palabras)**, no «la primera oración». En esas palabras ya debe verse una acción con algo absurdo o en riesgo, dibujable sin contexto. Primera frase ≤ 14 palabras salvo cita literal. Puede ser una línea de diálogo («Págueme mi seis.»). Nunca fecha, lugar, definición, «En esta realidad» ni «¿Y si…?». Prueba: tapa todo menos las 8 primeras palabras; ¿se abre una pregunta en la cabeza?
2. **Promesa, 3–12 s.** Se confirma que vamos a ver la premisa del título. «En esta realidad, …» va aquí, una sola vez en toda la pieza. Primer pago (gag, revelación, línea citable) antes de 15 s.
3. **Loop principal, antes de 20 s.** Un objeto, frase o gesto que el final devuelve transformado (la cubeta rechazada → el folder aceptado; «Yo cuento luces» → la única luz es la suya). Anótalo en la ficha con minuto de siembra y de pago.
4. **Cadencia.** Un micro-pago cada 15–25 s: gag visual, cifra absurda, inversión, diálogo citable, silencio de reacción. Un re-gancho específico cada 30–45 s (sección 3). Prueba: en cada ventana de 30 s debe pasar algo que no pasaba en la anterior; `medir_guion.py --ventanas` te las imprime.
5. **Escalada causal.** Conecta con «por eso», «entonces», «y por lo tanto»; nunca «y luego». Cada golpe sube de escala (persona → cuadra → ciudad → país → mundo o lo imposible) o invierte el anterior. Prueba: si intercambias dos escenas y nada se rompe, no escala.
6. **Giro a la mitad (40–60 %).** Un reencuadre que se entiende en una frase: la ley produce progreso; el neutral se vuelve sospechoso; «Nunca vendió seguridad. Vendió plusvalía». Si necesita explicación, no es giro.
7. **Interrupciones de patrón.** Varía el largo (corta, corta, larga). Mete diálogos de 2–6 palabras que el narrador actúa, un silencio tras cada frase con peso, saltos de lugar o escala. Nunca dos párrafos explicativos seguidos.
8. **Clímax y remate.** La imagen más grande va cerca del final. Remate ≤ 15 palabras, palabra clave al final, paga el loop y corta en seco. Nada después, salvo la pregunta de identificación de los episodios de visitas. Prueba: ¿el remate podría cerrar otro episodio? Entonces no es el remate.

## 3. Re-ganchos: mecanismos, no frases

Un re-gancho es algo de la historia que obliga a ver lo que sigue. Elige por mecanismo y concrétalo con lo que ya está en escena:

- **Amenaza plantada:** el cable único que se balancea; «La industria del miedo no se rinde. Se organiza.»
- **Cuenta regresiva:** «Las elecciones están a ocho hojas»; la señal cada nueve, ocho, cinco, dos segundos; «Se vota en tres días. El tren tarda tres días.»
- **Personaje que entra:** la jefa del banco central sube a los senadores al micro; el inspector de la puerta tres.
- **Decisión inminente:** «cambiar el reparto o cambiar la app»; «Entonces compruébelo.»
- **Objeto fuera de lugar:** una patrulla estacionada en el muelle de una nave a tres años luz. Nadie la comenta.
- **Pregunta de un personaje:** «¿Y quién lo rebanó así?»; «¿Esto lo cobro?»
- **Inversión anunciada por acción:** Germán vende el marro; doña Mary saca su plumón sin que nadie se lo pida.

**Prohibido** (fórmulas genéricas, también sus variantes): «pero eso no es lo peor», «lo que pasó después…», «spoiler», «quédate hasta el final», «nadie se lo esperaba», «lo que nadie imaginaba», «y entonces pasó lo impensable», «¿sabías que…?». `medir_guion.py` las detecta.

## 4. Calibración de tono

El absurdo es fuerte pero **causal y legible**: cada exageración nace de la anterior, un escalón a la vez. «Over the top» no es tener ideas grandes; es acumular sin causa.

- **Dial de tono (decídelo en la ficha, no por inercia):** 1 contenido y seco (Japón, visitas, Italia) · 2 sátira institucional (corrupción, inflación, agua) · 3 género (horror cósmico del bolillo, distopía de la quesadilla). El nivel lo pide la premisa; no exportes el horror ni la distopía a todas las piezas y no repitas el género del último episodio que gustó.
- **Prueba del gag:** «¿Este gag viene de la regla del título o solo es gracioso?» Si no viene de la premisa, sobra. «Si lo quito, ¿se cae algo después?» Si no, es relleno.
- **Un escalón por beat:** persona → cuadra → ciudad → país. Saltar dos escalones sin una consecuencia en medio es lo que se siente recargado.
- **Al menos un momento contenido por pieza:** una frase seca, un silencio, una reacción sin chiste («Germán se queda con el marro en el aire»). Una pieza entera puede ser contenida y aun así enganchar; el enganche viene de la causa y la pregunta, no del volumen.
- **Hipérbole legible:** la cifra absurda vive en el mundo animado (70 % de CDMX por desnutrición) y se lee como hipérbole; nunca se respalda con una encuesta o fuente inventada.

## 5. Voz

Oral, mexicana, directa. Frases cortas; una idea por línea; una sola acción por frase. Verbos físicos: «El licenciado lo ve y se lo regresa» (no «lo alisa con la palma»). Sin adjetivos ornamentales, sin transiciones vacías («antes de explicar cómo llegamos aquí»), sin explicar el chiste ni la moraleja. Cámara, poses, texturas, rótulos y pausas van al storyboard, no a la voz. Los números se escriben con letra («cero punto veintitrés») para el TTS. Los diálogos los actúa el narrador: cortos, con la cadencia de quien lo diría. Localismos sí, desfile de clichés (tacos, churros, «la línea») no.

## 6. Datos reales

- Usa **solo** datos que te den (archivo de fuentes del proyecto) o que ya traiga el guion. No inventes estadísticas reales ni cifras «aproximadas» de memoria, ni siquiera las «que todo el mundo sabe» (una tarifa, una población). Si no hay archivo de fuentes, el episodio se escribe sin cifras reales («lo que costaba el boleto») y en riesgos pides la fuente de las que sí convendría decir.
- En la voz va lo mínimo para entender: la cifra y la distinción que la hace legible («Usó, no necesariamente tiene»; «el año completo contra el anterior»). Fuente, edición, periodo y universo van a un rótulo gris y a FUENTES-Y-SUPUESTOS.
- **Troceo obligatorio:** una cifra por beat; entre cifra y cifra, una acción, reacción o gag; ningún bloque de datos de más de 2–3 frases cortas (~12 s). Si un parche de precisión exige frases literales, repártelas en beats con acción en medio en vez de leerlas seguidas. Ejemplo anotado en `references/ejemplos-v3.md`.
- Sin disclaimers narrados («esta ley no existe, la inventamos»). Basta «En esta realidad…».
- FUENTES-Y-SUPUESTOS separa en tres etiquetas: **HECHO** (con fuente, unidad, periodo), **SUPUESTO** (la regla del «y si») y **CONSECUENCIA (sátira)** (todo lo inventado, incluidas cifras absurdas y nombres de instituciones usados dentro del absurdo).

## 7. Series: tabla de hermanos

Si la premisa tiene hermanos (agua Tijuana/CDMX/Monterrey/Guadalajara; PIB 10/20/30; visitas 10 mil/100 mil/millón), antes de escribir llena esta tabla y no repitas ninguna celda:

| Episodio | Hook (imagen) | Motor | Re-gancho dominante | Giro | Género del remate | Remate (tipo) |
|---|---|---|---|---|---|---|

Si un episodio depende de que el público haya visto otro (reusa personajes de otras piezas), decláralo en riesgos.

**En lote (varios episodios a la vez):** un solo agente por serie (para que la tabla de hermanos viva en una cabeza), el mismo brief para todos, entregas en etapa 2 sin storyboard y, al final, `python3 herramientas/qa_guiones.py <carpeta> --prev <carpeta_previa> --literales <literales.json>` si trabajas en el repo. Guía completa: `docs/26-guiones-flujo-eficiente.md`.

## 8. Preferencias del humano (ámbito: solo El Hubiera)

1. **La premisa del título gobierna.** Un personaje es vehículo para recorrer instituciones, incentivos y contradicciones; nunca esconder corrupción, economía o violencia detrás de un cuento doméstico con cierre tierno.
2. **Humor de instituciones e incentivos** con progresión causal: de una regla chica a un cambio social, político o tecnológico.
3. **Remates con riesgo**, elegidos por la premisa: sátira negra, distopía, horror, optimismo. Ternura, café, abrazos y moralejas no son salidas por defecto.
4. **Líneas literales:** si el humano eligió una frase, van las mismas palabras en el mismo orden; la puntuación puede servir a la actuación («¡ALTO AHÍ! ¡ESO ES ILEGAL!»). Verifícalas con `--literales`.
5. **Nombres comunes;** no Rocío ni Ofe. Nada de voces, imágenes, publicación ni gasto: solo texto.
6. **La duración sirve a la historia.** No mutilar una escalada por una cifra previa, pero tampoco inflar: **presupuesto de +10 % de palabras sobre la versión anterior**, o justificarlo por escrito. Cada gag nuevo paga con un corte.
7. **Marca como riesgo, sin prohibir:** instituciones o marcas reales dentro del absurdo («La NASA pide la receta»), expresiones locales que puedan leerse como estereotipo, gags físicos con dolor, temas sensibles que la sátira roza (pobreza, víctimas, salud) y dependencias entre episodios. Siempre con una alternativa de igual fuerza. El humano decide.
8. Pasar el script **no es aprobación editorial**. Una pieza puede estar completa, correcta y aburrida.

## 9. Formatos de salida

**Etapa 1 · Ficha de 10 líneas** (una línea cada una): 1 Título «¿Y si…?» · 2 Regla del mundo en una frase · 3 Motor: qué voluntad choca con la regla · 4 Vehículo (persona, institución o recorrido) · 5 Escalada en 4–6 pasos causales con escala creciente · 6 Giro a la mitad · 7 Loop: qué se siembra y cómo regresa · 8 Dial de tono y género del remate · 9 Datos reales necesarios (id de fuente) o «ninguno» · 10 Duración objetivo y riesgos para el humano.
**Hooks:** tres, numerados; cada uno = primera frase (≤ 14 palabras, en acción) + 50–70 palabras de continuación (20–30 s) que lleguen al primer pago, y al cierre, entre paréntesis, «primer pago: … (~m:ss); loop sembrado: …». Que abran por imágenes distintas (en el hecho, en el objeto, en el diálogo, in medias res desde el final). Recomienda uno y di por qué en una línea. Cuenta las palabras (`medir_guion.py` sobre la continuación pegada en un .txt sirve): pasarse de 70 es la primera señal de que estás explicando.

**Etapa 2 · Archivo `NN-slug.md`** con secciones `## FICHA` (ficha + hook elegido + loop → pago + mapa dopamínico), `## LOCUCION`, `## FUENTES-Y-SUPUESTOS`, `## CHECKLIST`, y `NN-slug.txt` con solo la locución. Mapa dopamínico = tabla `Tiempo | Beat | Tipo` con tipos: gancho, promesa, pago, re-gancho (mecanismo), giro, interrupción, clímax, remate. Plantillas completas en `references/plantillas.md`.

**Etapa 3 · `## STORYBOARD`:** tabla `# | Intervalo | Cita inicial → final | Plano/acción/acting | Texto en pantalla | Sonido`. Convenciones en `references/storyboard.md`.

## 10. Control antes de entregar (etapa 2)

1. Corre `python3 scripts/medir_guion.py NN-slug.md --txt NN-slug.txt [--prev anterior.txt] [--literales literales.txt] --ventanas`. Corrige cada aviso o explica por qué no.
2. Lee en voz escrita: las 3 primeras frases, los primeros 20 s, cada ventana de 30 s, las 3 últimas frases. Si en una ventana no pasa nada nuevo, arréglala.
3. Prueba de rechazo (una respuesta «sí» obliga a reescribir): ¿el título promete una transformación nacional y entregamos una anécdota familiar? ¿El primer absurdo tarda más de 3 s? ¿El final cerraría otra pieza? ¿Hay ornamento que frena la voz? ¿La explicación de datos le ganó al relato? ¿Un gag no nace de la premisa? ¿Copiamos el género del último episodio que gustó? ¿Dos escalones de absurdo sin consecuencia en medio?
4. Autoevalúa 1–10: hook, cadencia, escalada, gags, giro, remate, voz oral, fidelidad al humano. Lo que quede bajo 8 se reescribe, máximo 2 pasadas. Para auditar un guion ajeno usa la skill `revision-enganche-hubiera`.
5. Entrega con una lista corta de **riesgos para el humano** (sección 8.7) y las palabras antes → después.

## Referencias

- `references/ejemplos-v3.md`: pares de hook antes/después y fragmentos anotados con su mapa dopamínico (incluye datos troceados en acción). Léelo si es tu primer episodio o si el tono no te sale.
- `references/antipatrones.md`: lo que el humano rechazó y por qué, más los problemas del lote v3. Léelo antes de reescribir un guion existente.
- `references/storyboard.md`: convenciones de planos, rótulos, marca y transiciones. Solo en etapa 3.
- `references/plantillas.md`: plantillas completas de ficha, episodio y notas.
