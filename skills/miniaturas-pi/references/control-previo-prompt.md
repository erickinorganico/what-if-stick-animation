# Control previo del prompt (antes de gastar créditos)

Pasa este control con el prompt y la lista de referencias **ya escritos** y antes de cotizar con `estimate_image_cost`. Cada punto que falla se corrige o se justifica por escrito en el registro. El objetivo es atrapar los errores que hacen inútil una generación pagada.

Responde cada pregunta con «sí», «no» o «n/a» y una línea de evidencia sacada del propio prompt.

## 1. Concepto
- [ ] ¿El bloque CONCEPTO describe **una sola** relación visual? Cuenta los sustantivos protagonistas: si hay más de 2 sujetos o símbolos independientes, falla.
- [ ] ¿La frase-concepto viene del **brief del video** (su tesis o tensión) y no de un objeto obvio del tema? Ejemplo: en un video sobre café, «una taza» sin más es tema, no concepto.
- [ ] ¿El texto en pantalla (si lo hay) añade algo que la imagen no dice?

## 2. Contradicciones
- [ ] ¿La familia declarada coincide con las referencias enviadas? (Por ejemplo, decir «familia C» y enviar 05c es una contradicción).
- [ ] ¿El tratamiento es compatible con la familia? Se contradicen, por ejemplo, «crisp studio product photo» + «film grain halftone», o «flat graphic» + «photoreal cinematic lighting».
- [ ] ¿Hay a la vez «fondo minimalista» y una lista de elementos de escena (mesa, ventana, reloj, papeles…)?
- [ ] ¿Se pide «un solo acento» y luego dos colores destacados o varios efectos?
- [ ] ¿El modo de texto es uno solo: (a) sin texto, (b) zona reservada o (c) texto exacto?
- [ ] Si hay texto exacto, ¿tiene como máximo 4 palabras (o 6 con justificación) y está escrito con tildes correctas?

## 3. Sobrecarga
- [ ] El prompt tiene menos de unas 180 palabras sin contar el bloque de rol. Más palabras suelen indicar más ideas, no más precisión.
- [ ] La lista EVITAR tiene de 3 a 6 elementos **específicos** de este encargo, no una lista genérica copiada.
- [ ] No se usan adjetivos vacíos que empujan al render de IA de género: «epic», «stunning», «ultra detailed», «8k», «cinematic masterpiece», «glowing», «neon», «dramatic sparks».
- [ ] Las referencias enviadas son entre 2 y 4 (+1 de tratamiento como mucho).

## 4. ¿Se está forzando una composición favorita?
Este control existe porque es fácil convertir una preferencia puntual en una regla (por ejemplo, «fondo oscuro minimalista» pedido para una pieza concreta).
- [ ] ¿El fondo, la posición del texto o el objeto vienen de **este** brief o de la costumbre? Si las tres últimas miniaturas del registro comparten fondo, familia y posición de texto, justifica la repetición o cambia algo.
- [ ] ¿El bloque COMPOSICIÓN deja decisiones abiertas al modelo donde no importan («choose the framing…»), en lugar de dictar cada coordenada?
- [ ] ¿El prompt pide algo que **contradice las referencias enviadas**? Por ejemplo, fondo negro con referencias de la familia A, que son de fondo claro. Si es intencional, se dice explícitamente («keep the language of the references but on black»), y entonces conviene enviar referencias de E o B1 con fondo oscuro.
- [ ] ¿Se repite literalmente una referencia (mismo sujeto, layout y palabra traducida)? Falla.

## 5. Antipatrones que ya fallaron (bloquean el envío)
- [ ] Ilustración brillante de un objeto simbólico dentro de otro (cerebro en taza, cerebro en cubo).
- [ ] Escena industrial con neón o chispas.
- [ ] Collage genérico de empleado cansado con taza.
- [ ] Varios titulares, círculos y flechas.
- [ ] Objeto de stock centrado sobre negro sin gesto, tensión ni tratamiento («la taza sobre negro»).

## 6. Consumo
- [ ] La persona responsable autorizó esta ronda (y su tamaño: número de prompts × `count`).
- [ ] Ya se obtuvo `estimate_image_cost` y se mostró el total de la ronda.
- [ ] No hay un envío anterior con resultado **incierto** para este mismo prompt (comprueba el registro).

**Resultado del control:** «LISTO», «LISTO CON JUSTIFICACIONES» (lista cuáles) o «CORREGIR» (lista qué). No existe «LISTO» automático: escribe la evidencia de cada punto.

## Variantes y formatos
- [ ] Se distingue imagen aprobada base de referencias de estilo; la captura anotada no se copiará.
- [ ] Está contado el total conceptos × formatos × count, sin rondas implícitas.
- [ ] Se preservan archivo aprobado y su hash; las nuevas derivadas conservan estado propuesta hasta elección humana.
- [ ] La vertical se recompone y su preview conserva9:16; la fuente real de esta pieza prevalece sobre defaults.
