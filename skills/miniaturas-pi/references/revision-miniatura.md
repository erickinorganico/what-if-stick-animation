# Revisión de una miniatura generada

Úsala con cada resultado (y también con bocetos o composiciones hechas a mano). Antes, genera la hoja de revisión:

```bash
scripts/preview_movil.sh <resultado.png> <hoja.png> <ref1> <ref2> [<ref3>]
```

Pasa como referencias las mismas que se enviaron al generador. Mira la hoja, no solo la imagen grande: el público ve la miniatura pequeña.

## Cómo puntuar

Cada eje se puntúa con **0 = falla, 1 = aceptable o 2 = sólido**, y siempre va con:
1. **Evidencia:** lo que se ve, con su posición en la imagen.
2. **Defecto concreto** (si lo hay).
3. **Corrección propuesta**, que puede ser de composición (recorte, texto o color en edición, sin gastar créditos) o un cambio de prompt para una ronda futura.

No existe aprobación automática. Si todos los ejes salen en 2, explica igualmente qué mejorarías. La puntuación sirve para decidir, no para predecir rendimiento.

| Eje | Pregunta | 0 (falla) si… |
|---|---|---|
| 1. Parecido de familia | Colocada junto a las referencias a 246×138, ¿pertenece a la misma familia? | El tratamiento es otro (render brillante frente a foto con grano), la paleta o el tipo de fondo no corresponde, o solo se parece a la antirreferencia 01* |
| 2. Minimalismo | ¿Hay un sujeto, un acento y de 0 a 4 palabras? | Hay dos o más ideas, varios acentos o elementos de relleno (partículas, humo, objetos de escena sin función) |
| 3. Elegancia | ¿Hay espacio vacío con intención, un recorte limpio y una textura coherente? | Hay bordes de recorte visibles o halos, brillo plástico, degradados sucios, tipografía deformada o un marco decorativo |
| 4. Legibilidad móvil | A 168×94: ¿se distinguen la silueta y la palabra principal? ¿En gris sigue leyéndose? | La palabra no se lee, el sujeto se funde con el fondo o en la versión desenfocada no queda una masa clara |
| 5. Claridad del concepto | ¿Alguien que no conoce el video puede decir la idea en una frase? | Hay que explicarla, o la imagen solo nombra el tema (taza = café) sin tensión |
| 6. Coherencia con el video | ¿Promete algo que el video cumple? ¿El tono coincide? | Exagera o tergiversa la tesis, o el tono es otro (épico cuando el video es íntimo) |
| 7. Texto correcto | Ortografía, tildes, «ñ», kerning, que no haya letras inventadas y que la fuente sea la humana vigente de la pieza, o Coolvetica Regular / sustituta si no hay override | Cualquier error de texto (se corrige en edición, no regenerando) |
| 8. Originalidad frente a la referencia | ¿Usa el lenguaje de la referencia sin copiarla? | Mismo sujeto, layout y palabra traducida que alguna referencia |

## Defectos frecuentes y su corrección

| Defecto | Corrección sin gastar créditos | Corrección de prompt (ronda futura) |
|---|---|---|
| El generador copió el contador de duración o las esquinas redondeadas | Recortar o retocar | Reforzar «Do NOT copy duration badges…» |
| Texto con errores | Borrar el texto y componerlo con `scripts/componer_texto.py` | Usar el modo de texto (b): zona reservada |
| Objeto centrado sin tensión | Reencuadrar: llevarlo a un borde, cortarlo o cambiar la escala | Describir la relación (escala, corte, gesto), no solo el objeto |
| Brillo o aspecto de render IA | Añadir grano o semitono en edición, desaturar | Pedir el tratamiento de la familia («halftone print», «film still») y quitar adjetivos épicos |
| Dos acentos de color | Desaturar uno | Nombrar el único acento permitido |
| Fondo cargado | Aclarar u oscurecer, desenfocar o rellenar plano | Pedir «seamless/flat background» o un encuadre con zona de calma natural |
| Texto ilegible a 168 px | Agrandar, recortar palabras o aumentar contraste | Pedir zona reservada y componer después |
| Mezcla de familias | Elegir una y retocar hacia ella | Enviar referencias de una sola familia |

## Formato del informe

```
Resultado: <archivo o job_id>   Familia: <X>   Refs enviadas: <IDs>
Hoja de revisión: <ruta>   L/S/contraste: <valores del script>
1 Parecido de familia: n — evidencia — defecto — corrección
… (8 ejes)
Veredicto: USAR / USAR TRAS RETOQUE (lista) / DESCARTAR (motivo) / NUEVA RONDA PROPUESTA (qué cambia y por qué; requiere autorización)
```

Para verticales revisa a168px de ancho conservando9:16; no uses168×94. Contrasta también con el formato horizontal cuando sea una adaptación. Distingue composición con oclusión real de texto separado, sin inventar profundidad. Ver direccion-y-variantes.md para el caso aprobado y límites de generalización.
