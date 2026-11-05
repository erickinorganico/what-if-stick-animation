# Registro de generaciones: miniaturas de PI

Copia este archivo a la carpeta del video (por ejemplo, `videos/<slug>/registro-generaciones.md`) y añade una fila **antes** de cada envío. Después, actualízala con el resultado. Nunca borres filas: si algo falló, se marca como fallido.

## Referencias subidas (una vez por sesión o cuenta)

| Archivo de assets/referencias | media_id | Fecha | Notas |
|---|---|---|---|
| | | | |

## Envíos

| # | Fecha y hora | Video / concepto | Familia | Modelo | Refs (IDs → media_id) | Role usado | count | Coste de estimate_image_cost | Autorizado por / cuándo | job_id(s) | Estado (ok / fallido / **incierto**) | Créditos antes → después (observados) | Resultado (ruta o URL) | Veredicto de revisión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | | | | |

Reglas:
- **Incierto** = hubo un tiempo de espera o un error de transporte sin `job_id`, o con `job_id` sin estado final. No se reenvía hasta resolverlo con `jobs_wait` o el historial.
- Los créditos «observados» se toman de `balance` antes y después. Si no se consultaron, escribe «no consultado» (no estimes).
- Si el generador no recibió imágenes, escribe «solo texto» en la columna Refs.
