---
name: miniaturas-pi
description: Diseña, genera y revisa miniaturas de YouTube y portadas verticales de Pensamientos Inorgánicos con referencias visuales, metáfora editorial, tipografía legible y aprobación por archivo. Incluye prompts y edición en Higgsfield; no activa publicación ni edición del video por sí sola.
---

# Miniaturas de Pensamientos Inorgánicos

Prioridad: minimalismo, elegancia, personalidad y una idea que se entienda en pequeño. La imagen debe mostrar una tensión; un rostro reconocible con una palabra que lo acusa no basta. Las referencias enseñan lenguaje, no una receta de objetos o posiciones.

## Retomar el encargo

Lee continuidad y expediente existentes: tesis/guion, título disponible, tono, formatos, feedback, archivos aprobados y alcance autorizado. Recupera esa información antes de preguntar. Si el título sigue pendiente, avanza el concepto y registra el cotejo pendiente; no inventes uno definitivo.

Conserva originales, IDs, herramientas, fuente humana vigente, versiones, calendario y aprobaciones. Una preferencia específica prevalece sobre los defaults de esta skill. La aprobación del video no aprueba su portada; una horizontal aprobada tampoco aprueba automáticamente cada adaptación vertical.

## Ver antes de dirigir

1. Lee `references/direccion-de-arte.md` para escoger familia y `references/analisis-visual.md` para localizar ejemplos.
2. Abre las imágenes reales pertinentes de `assets/referencias/` y el moodboard original cuando esté disponible. Al explorar por primera vez, compara las familias candidatas; al corregir una opción, mira sus referencias concretas y el rechazo humano. Un catálogo textual no sustituye el visionado.
3. Elige 2–3 referencias de la misma familia y explica qué rasgo toma cada una: escala, textura, fondo, relación tipográfica. Los frames fv* sólo sirven para tratamiento de edición/oclusión, no como layouts de miniatura. Nunca uses 01a/b/c como guía.

## Concepto y ejecución

- Resume tesis, tensión, tono, texto y restricciones. Describe la relación visible: quién depende de quién, qué contradice la promesa, qué cambia la escala. Comprueba si la imagen transmite algo sin su rótulo y si remite al tema concreto.
- En exploración abierta, ofrece 3–5 conceptos distintos y al menos dos familias. C, B1 y E son prioritarias; A sobria también sirve. No hagas un catálogo nuevo si el humano ya eligió concepto o pidió dos variantes concretas.
- Presenta la comparación antes de una elección que aún falte. Si el usuario ya encargó producir una dirección o sus variantes dentro de un alcance claro, avanza ese trabajo; no repitas la aprobación por rutina. Proponer una prueba A/B no autoriza subirla a YouTube.
- Lee `references/direccion-y-variantes.md` para resolver rechazos, vacío, oclusión o paso a vertical. Incluye Dune como caso aprobado con límites; no reutilices sus manos, salvador, rojo o arena por defecto en otros temas.
- Las maquetas locales sirven para decidir composición. No las llames acabado final con máscaras poligonales, halos, posterización destructiva o sombras aplastadas. Tras un rechazo conceptual cambia la relación o fuente visual; retocar exposición y mover el titular no resuelve el mismo problema.

## Claude y Higgsfield

Cuando Erick pida ayuda a Claude, usa `codex-claude-collaboration` y su puente existente: brief acotado, feedback y rasgos observados, salida de dirección/prompts, cuenta/modelo/esfuerzo vigentes y recibo real. No atribuyas visionado a Claude si el adaptador sólo le transmitió texto. No lo actives para cada ajuste ni hagas revisiones recursivas.

Cuando se encargue generación o edición en Higgsfield, lee `references/plantillas-higgsfield.md` y pasa `references/control-previo-prompt.md`. Envía las imágenes reales, no sólo descripciones. En una derivada referencia primero la versión aprobada limpia y después las referencias de estilo pertinentes. Las anotaciones del usuario localizan cambios; no copies sus trazos ni uses una captura de interfaz como arte base.

Consulta coste con `estimate_image_cost`, muestra el total y ejecuta sólo la ronda autorizada. Cuenta conceptos × formatos × variantes: dos conceptos en horizontal y vertical son cuatro imágenes; distingue acabado local sin coste. Reutiliza autorización humana vigente dentro de su alcance, sin duplicar el permiso. Una ronda nueva requiere autorización propia.

Guarda prompts/parámetros, refs/media IDs, job IDs, URLs, originales y consumo observado antes/después. Si el envío queda incierto, concilia sus mismos IDs antes de repetir. No cambies cuenta, plan, modelo o preferencias ni uses `use_unlim`/`use_free_gens` sin petición expresa. Las herramientas vigentes y sus esquemas prevalecen sobre ejemplos antiguos del paquete.

## Tipografía, formatos y revisión

- Por defecto, imagen sin letras y texto compuesto aparte. Si la integración exige letras entre capas, admite texto generado provisional y cotéjalo/recompón después. Pedir “Montserrat look” no garantiza la fuente real.
- Usa el archivo autorizado de fuente y conserva licencia. Identidad propuesta: Coolvetica Regular de escritorio, sustituta Inter Display Black; una elección humana como Montserrat Black 900 para Dune prevalece sólo en su ámbito. No identifiques la fuente de las referencias por parecido.
- Texto breve, normalmente 0–4 palabras. Una palabra da margen pero no arregla una imagen sin idea. Oclusión real con máscara del sujeto correspondiente, sin esconder letras necesarias. Una sombra/extrusión no sustituye esa profundidad. No texto sobre caras ni zona de duración.
- Exporta horizontal1280×720 y vertical1080×1920 cuando se pidan; recompón jerarquía y márgenes, sin estirar ni recortar a ciegas. No inventes oclusión si texto y figura quedaron separados. Conserva originales y receta de acabado.
- Usa composición local permitida por herramientas y alcance actual. `scripts/componer_texto.py` y `scripts/preview_movil.sh` son recursos opcionales con dependencias, no una obligación de usar Python para editar imágenes. Respeta las restricciones del entorno.
- Abre finales y previews168px de ancho, compara con 2–3 referencias y aplica `references/revision-miniatura.md`. En vertical conserva proporción9:16, no la deformes a168×94. Revisa título/silueta, contraste, anatomía, halos, bordes, texto residual e identificación temática. No certifiques contraste por elegir paleta: mide donde importa o registra el límite.

## Entrega y aprobación

Muestra opciones con nombres/archivos inequívocos; recomienda por criterios visuales sin prometer clics. Corrige defectos locales viables antes de proponer otro gasto. No abras otra ronda para obtener un widget o refrescar un resultado generado.

Registra por archivo ruta, formato, versión, SHA256 y estado humano real: propuesta, aprobada, rechazada o no elegida. Al elegir una versión, actualiza el manifiesto final y conserva la historia. Mapea portadas a IDs de clips existentes sólo cuando el alcance lo permita; no inventes portadas diferenciadas o aprobación por clip.

La entrega visual no programa por sí sola. Si otro responsable/chat ya programa, deja rutas/hashes y autorización en el expediente compartido; no dupliques subidas, scheduler ni mensajes sin autorización. No declares programado hasta verificar IDs, fecha/hora y estado reales.
