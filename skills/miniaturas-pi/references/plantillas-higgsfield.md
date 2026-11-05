# Plantillas para Higgsfield

Lee este archivo **solo después** de tener un concepto elegido y aprobado (paso 4 del flujo en `SKILL.md`) y de pasar el control previo (`control-previo-prompt.md`). Enviar algo a Higgsfield consume créditos: sigue también las reglas de consumo de `SKILL.md`.

## 1. Lo que el generador recibe de verdad

Un prompt de texto **no transmite las imágenes**. El generador solo «ve» las referencias si se suben (`media_upload` → PUT → `media_confirm`) y sus `media_id` se pasan en `params.medias`. Por eso:

- Anota en el registro qué `media_id` corresponde a cada archivo de `assets/referencias/`.
- Si el modelo elegido **no acepta imágenes de referencia**, o se decide no enviarlas, escribe en el registro «solo texto: el generador no recibió referencias visuales». No describas ese resultado como «basado en las referencias».
- No inventes los nombres de los `role`: cada modelo tiene los suyos. Consúltalos con `models_get` (`model_id`) antes del primer envío y anótalos. Esa consulta es de lectura.
- Reutiliza el modelo vigente del encargo; la herramienta describe `gpt_image_2_5` como default general. Consulta `models_get` cuando necesites sus ratios, parámetros o roles; no abras un catálogo innecesario ni cambies modelo por rutina.

## 2. Qué referencias enviar

- **De 2 a 4 de la misma familia** (más no ayuda: diluye el estilo y el modelo tiende a mezclar layouts).
- Como mucho **1 adicional de tratamiento** (por ejemplo, fv06 o fv12 para el texto con profundidad) si el concepto lo necesita, etiquetada como tal.
- **Nunca** 01a, 01b ni 01c (son antirreferencias), y nunca mezcles A con C o B2 en el mismo envío.
- Avisa en el prompt de que las referencias son **capturas de YouTube** con contador de duración, esquinas redondeadas y, a veces, la barra roja de progreso: eso no debe reproducirse.
- Selección sugerida por familia (puedes elegir otras si se justifica):

| Familia | Núcleo | Alternativas |
|---|---|---|
| A. Editorial claro | 03e, 04e, 03f | 03a, 04f, 03c |
| B1. Cine + nota limpia | 05c, 05g, 05b | 05e, 05i, vc4 |
| B2. Cine + rotulador | 05d, 05f | 05a |
| C. Plano + semitono | rk4, rk3, rk8 | rk6, rk5 |
| D. Collage de un gesto | 02 | (solo hay una; envíala con 1 de C o B1 como textura, y anótalo) |
| E. Negro + motivo gráfico | vc6, vc8 | fv06 (tratamiento) |

## 3. Estructura del prompt

Escribe el prompt en inglés (los modelos suelen seguirlo mejor) salvo el texto en pantalla, que va en español y entre comillas exactas. Cada bloque tiene un propósito: si un bloque no aporta nada al concepto, se omite.

```
[ROL DE LAS REFERENCIAS]
Images 1–{N} are YouTube thumbnail screenshots used ONLY as style references for family "{FAMILIA}".
Borrow from them: {2–4 rasgos concretos de la familia, p. ej. "flat single-color background, black-and-white halftone cut-out with torn-paper edge, one huge lowercase heavy grotesque word"}.
Do NOT copy their subjects, layouts, people, words, logos, duration badges, rounded corners or red progress bars.
{Si hay ref de tratamiento: "Image {k} is a reference ONLY for how text interlocks with the subject (letters partly behind the subject)."}

[CONCEPTO]
One idea: {frase de 6–10 palabras que describe la relación visual}.
{1–2 frases con el sujeto y la acción concretos; sin adjetivos de relleno.}

[COMPOSICIÓN — márgenes de decisión, no layout fijo]
16:9 YouTube thumbnail. One main subject. {Intención de espacio: p. ej. "large calm empty area that reads as {significado}"}.
{Solo si importa para la idea: posición o escala. Si no importa, escribir: "Choose the framing that makes the idea clearest at small size."}

[TRATAMIENTO]
{Tratamiento de la familia: p. ej. "real photograph with film grain and muted period color" / "crisp studio product photo on light grey with soft vignette" / "flat graphic, printed halftone texture"}.
Single accent: {un acento; por defecto el rojo PI: "one deep red (#D7261E) element only: ___"} — everything else neutral.

[TEXTO]
{Elige UNO. Por defecto (b): el texto final se compone con la fuente real mediante la herramienta local autorizada.}
(a) No text in the image.
(b) Leave a clean area {dónde/por qué} for a headline that will be added later; no letters in the image.
(c) Exact text: "{TEXTO}" — heavy grotesque sans, tight letter-spacing, {minúsculas/mayúsculas}, {color}; spelled exactly, including accents.

[EVITAR — específico a este encargo]
{3–6 negativos concretos derivados de errores previos o del riesgo de este concepto; no una lista genérica gigante.}
```

### Parámetros

```json
{
  "model": "<verificado según el esquema vigente>",
  "prompt": "<prompt de arriba>",
  "aspect_ratio": "16:9",
  "count": 1,
  "medias": [
    {"value": "<media_id ref 1>", "role": "<role verificado>"},
    {"value": "<media_id ref 2>", "role": "<role verificado>"}
  ]
}
```

1. Pasa el objeto como `estimate_image_cost({params: ...})`; no genera nada. Muestra coste unitario y total por conceptos/formatos/cantidad.
2. Con autorización vigente para ese alcance, llama `generate_image({params: ...})`. No existe un parámetro universal `get_cost`: usa el esquema actual. El rol canónico `image` se mapea al backend cuando la herramienta lo indique; conserva los ajustes devueltos.
3. Una referencia aprobada editada es imagen1, seguida de las referencias de estilo. El prompt diferencia sus funciones. No uses capturas anotadas de la UI como arte base.
4. Para conceptos distintos usa prompts separados; un batch es opcional si está disponible. Registra cada job. `count` es cantidad del mismo prompt, no formatos diferentes.
5. Si `generate_image` ya muestra widget autoactualizable, no abras otro para refrescarlo. Usa `jobs_wait` con espera máxima15s y respeta `poll_after_seconds`; un batch sin widget sigue su pauta de visualización.
6. Upload local: reserva URL, PUT donde están los bytes y confirma sólo después de200. No retransmitas archivos entre entornos como base64. Para adjunto de ChatGPT usa el helper de adjuntos cuando corresponda; consulta las instrucciones devueltas. Reutiliza IDs confirmados.

## 4. Variantes por familia (rellenar; no son prompts cerrados)

Cada línea de «Borrow» resume lo observado en `analisis-visual.md`. No añadas rasgos que no estén en las referencias enviadas.

- **A:** Borrow: light grey/white seamless background with soft vignette; one real everyday object shot crisp, allowed to bleed off the frame edge; dark heavy grotesque word(s); one accent color.
- **B1:** Borrow: candid cinematic still, film grain, muted/aged color; one person in a real place; a naturally calm area where one or two clean heavy words sit; optional final period.
- **B2:** Borrow: grainy or B&W halftone film still; one large hand-drawn red marker word gesture. Pide aún más sobriedad en la foto para compensar.
- **C:** Borrow: flat single-color background; one black-and-white halftone/engraving cut-out (torn-paper edge optional); one or two huge lowercase heavy words, top, which may pass behind the cut-out.
- **D:** Borrow: two contrasting background halves; classical/statue-like figure; every element forms ONE physical gesture; short text following a shape.
- **E:** Borrow: true black background; one flat graphic symbol (two-tone, x-ray or posterized), no gloss, no particles; no text or one word.

## 5. Después de generar

- Guarda los `job_id`, URLs, modelo, parámetros completos, `media_id` enviados y créditos observados en el registro (`assets/registro-generaciones.md`).
- Descarga el resultado y pasa `scripts/preview_movil.sh` con las mismas referencias enviadas.
- Haz la revisión (`revision-miniatura.md`) **antes** de proponer otra ronda.
- Si hay un tiempo de espera agotado o un error de transporte, **no reenvíes**. Consulta `jobs_wait` o el historial con los IDs conocidos hasta saber si el trabajo existe.
