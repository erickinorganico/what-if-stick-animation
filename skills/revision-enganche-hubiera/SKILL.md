---
name: revision-enganche-hubiera
description: "Audita en pocos pasos el enganche de un guion existente de El Hubiera («¿Y si…?» animado, español de México): mide hook, cadencia, escalada, giro, remate, voz y tono con una rúbrica de 8 criterios y entrega hallazgos con reescrituras puntuales, sin reescribir todo. Úsala cuando pidan revisar, calificar, auditar o «ver por qué no engancha» un guion o locución de ese canal, aunque no nombren la skill. Para escribir o reescribir un episodio completo usa guion-hubiera; las piezas AI Lab School de 55–70 s van con escritura-guiones-ai-lab."
---

# Revisión de enganche · El Hubiera

Auditoría rápida de un guion o locución ya escrito. El resultado es una tabla de hallazgos con evidencia y reescrituras puntuales (antes → después). No reescribas el guion entero salvo que lo pidan; el autor o la skill `guion-hubiera` lo harán con tus hallazgos.

## 1. Lo que lees (y solo eso)

Lee la locución, no el storyboard. Si viene en `.md`, usa la sección `## LOCUCION`. Antes de opinar, mide:

```
python3 scripts/medir_guion.py GUION.md [--txt GUION.txt] [--prev anterior.txt] [--literales literales.txt] --ventanas
```

Te da palabras, duración a 145 ppm, las primeras 8 palabras (el hook real), el remate, fórmulas prohibidas, párrafos largos, cifras en dígitos, presupuesto de palabras y el texto de cada ventana de 30 s. Luego lee en este orden y anota una línea por punto:

1. **Las 3 primeras frases.** ¿En las primeras 7–9 palabras ya pasa algo absurdo o en riesgo que se pueda dibujar? ¿Abre pregunta? ¿Hay fecha, lugar, definición o «En esta realidad» antes de la acción?
2. **Los primeros 20 s (≈ 48 palabras).** ¿Se confirmó la premisa del título? ¿Llegó un primer pago (gag, revelación, línea citable)? ¿Se sembró algo que pueda regresar al final?
3. **Cada ventana de 30 s.** En cada una debe ocurrir algo que no ocurría en la anterior: gag, cifra, diálogo, amenaza, decisión, cambio de escala. Marca las ventanas muertas (solo explicación o solo transición) y las que repiten el mismo tipo de pago tres veces seguidas.
4. **Las 3 últimas frases.** ¿La imagen más grande está cerca del final? ¿El remate paga algo plantado, termina en la palabra clave y corta en seco? ¿Cerraría otro episodio? ¿Hay algo después (moraleja, resumen, CTA que no sea la pregunta de identificación de los episodios de visitas)?

## 2. Rúbrica (8 criterios, 1–10)

Califica con evidencia (cita breve y minuto). Anclas rápidas; el detalle por criterio está en `references/rubrica.md`.

| # | Criterio | 3 | 6 | 9 |
|---|---|---|---|---|
| 1 | **Hook (3 s)** | Abre con contexto, fecha o definición; nada dibujable | Hay acción pero el absurdo llega después de 3 s o la frase pasa de 14 palabras sin ser cita | Acción + absurdo/riesgo en las primeras 8 palabras; abre una pregunta sin contexto |
| 2 | **Promesa y primer pago** | La premisa no se entiende en 20 s o el primer pago llega después de 30 s | Premisa a tiempo; primer pago tibio o explicado | Premisa confirmada antes de 12 s; pago antes de 15 s que se ve antes de decirse; loop sembrado antes de 20 s |
| 3 | **Cadencia y re-ganchos** | Ventanas de 30 s sin nada nuevo; fórmulas genéricas | Pagos cada 25–40 s; re-ganchos vagos («las cosas se complican») | Micro-pago cada 15–25 s; re-gancho específico de la historia cada 30–45 s (amenaza, cuenta regresiva, personaje, decisión, objeto fuera de lugar) |
| 4 | **Escalada causal** | Lista intercambiable de escenas; «y luego» | Sube de escala pero con saltos sin causa o escalones repetidos | Cada golpe nace del anterior («por eso»), sube persona → ciudad → país → imposible o invierte; nada se puede reordenar |
| 5 | **Giro** | No hay reencuadre | Hay giro pero necesita explicación o cae después del 65 % | Reencuadre en una frase cerca de la mitad; cambia cómo se lee todo lo anterior |
| 6 | **Remate y loop** | Moraleja, abrazo o resumen; podría cerrar otra pieza | Paga algo, pero largo (> 15 palabras) o con la palabra clave en medio | ≤ 15 palabras, clave al final, paga el loop transformado, corte en seco; nada después |
| 7 | **Voz oral y datos** | Ornamentos, cámara en la voz, bloques de datos > 3 frases, fuentes leídas, cifras en dígitos | Directa, pero con dos párrafos explicativos seguidos o un dato sin distinción | Frases cortas, verbos físicos, diálogos actuados; una cifra por beat con acción entre cifras; fuente en rótulo |
| 8 | **Tono y fidelidad a la premisa** | Cuento doméstico que esquiva el título; absurdo aleatorio o acumulado; mismo género que el último episodio | La premisa gobierna, pero hay gags que no nacen de ella o falta un momento contenido | Cada exageración nace de la anterior, un escalón por beat; dial de tono elegido por la premisa; al menos un momento seco; instituciones y líneas literales respetadas |

Umbral: todo lo que quede bajo 8 lleva arreglo. Un promedio alto no compensa un 4 en hook o remate: esos dos deciden si el video se ve.

## 3. Diagnóstico y arreglo por tipo de defecto

| Síntoma | Causa típica | Arreglo puntual (no reescribir todo) |
|---|---|---|
| El absurdo llega tarde | Contexto, fecha o pose antes de la acción | Mueve la imagen absurda a las 8 primeras palabras; el lugar a la segunda frase o a un sello; la pose al storyboard |
| Hook bueno, caída a los 15 s | Explicación del mundo justo después del hook | Mete el primer pago antes de «En esta realidad»; la explicación, en 1–2 frases, después del pago |
| Ventana muerta | Párrafo explicativo o transición | Inserta un re-gancho por mecanismo (sección 2, criterio 3) con algo que ya está en escena, o corta la ventana |
| Tres pagos iguales seguidos | Lista de gags del mismo tipo | Cambia el tipo: tras dos gags, un diálogo o un silencio; tras dos cifras, una acción |
| Bloque de datos de 30 s | Parche de precisión leído de corrido | Una cifra por beat; entre cifras una acción o reacción; las frases literales se reparten, no se recortan; fuente a rótulo gris |
| «Y luego…» | Secuencia sin causa | Reescribe el conector como consecuencia («por eso», «entonces») o descubre que la escena no escala y córtala |
| Giro tardío o inexistente | La idea del episodio se guarda para el final | Pon un reencuadre en una frase cerca de la mitad; si el final ya lo tiene, siembra un «gemelo» antes |
| Remate genérico | Cierra con lección, resumen o pregunta retórica | Cierra en la imagen que paga el loop; palabra clave al final; borra todo lo que viene después |
| Over the top | Dos escalones de absurdo sin consecuencia entre ellos; cada beat quiere ser gag | Quita el escalón que no viene de la premisa; pon la consecuencia en medio; añade un momento contenido (silencio, frase seca) |
| Más largo que la versión previa (> +10 %) | Se añadió sin cortar | Por cada gag nuevo, señala el corte que lo paga: transiciones, segunda explicación, gag que no paga nada después |
| Hermanos parecidos | Misma apertura, mismo motor o mismo remate que otro de la serie | Propón la celda distinta (hook, motor, re-gancho, giro, género, remate) |
| Riesgos sin marcar | Instituciones reales dentro del absurdo, estereotipos, dolor, dependencia de otro episodio | No prohíbas: lista cada uno con una alternativa de igual fuerza |

## 4. Formato de salida

```
# Revisión de enganche · [título]
Medición: [n] palabras · ~[m:ss] · hook (3 s): «…» · remate: «…» · [presupuesto si hay previa] · avisos de medir_guion.py: [n]

## Hallazgos
| # | Criterio | Nota | Evidencia (cita + minuto) | Arreglo |
|---|---|---|---|---|
(8 filas; los criterios < 8 primero)

## Reescrituras puntuales
1. [m:ss] Antes: «…» → Después: «…» (por qué, en una línea)
2. …
(3–8 reescrituras; cada una cambia una frase o un beat, no un acto)

## Riesgos para el humano
- …

## Veredicto
[Lista para voz / Necesita una pasada sobre X y Y / Reescribir desde la ficha]. Palabras: [n] ([+x %] vs previa). Promedio: [x]; mínimos: [criterio: nota].
```

Reglas del formato: toda nota lleva cita; toda reescritura conserva las líneas literales del humano palabra por palabra; no inventes datos reales al proponer frases (si una cifra falta, pide la fuente); no sumes palabras netas sin decir qué se corta. Si te piden la reescritura completa, cambia a la skill `guion-hubiera` (etapa 2) y usa estos hallazgos como entrada.

## 5. Lo que no es esta revisión

No verifica fuentes ni calcula timing real, no aprueba producción ni voz, y un buen promedio no es evidencia de retención: es preferencia editorial del canal convertida en criterios. Dilo en el veredicto cuando haga falta.
