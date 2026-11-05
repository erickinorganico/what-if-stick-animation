# Rúbrica detallada (qué significa cada calificación)

Para cada criterio: qué mirar, qué vale 1–3, 4–5, 6–7, 8–9, 10, y un ejemplo real del lote v3. Las notas se dan con cita y minuto; sin evidencia no hay nota.

## 1. Hook (0–3 s)

Mirar: las primeras 7–9 palabras habladas (145 ppm), no «la primera oración».
- **1–3:** abre con fecha, lugar, definición, «¿Y si…?», «En esta realidad» o «hoy en la vida real». Nada dibujable. («Diciembre de mil novecientos noventa y uno. Puerto de Manzanillo.»)
- **4–5:** hay acción pero sin absurdo ni riesgo hasta la segunda o tercera frase; o pose en vez de acción («capa abierta, puños listos»).
- **6–7:** acción y absurdo en la primera frase, pero la frase pasa de 14 palabras sin ser cita literal, o el absurdo está en la palabra 12.
- **8–9:** acción + absurdo o riesgo en las primeras 8 palabras; se dibuja sin contexto; abre una pregunta. («Tres policías asaltan un camión de refrescos…»)
- **10:** además es una línea citable que resulta ser el loop. («Págueme mi seis.»)

## 2. Promesa y primer pago (3–20 s)

Mirar: cuándo se entiende la premisa del título, cuándo llega el primer gag/revelación, si se siembra el loop.
- **1–3:** a los 20 s no se sabe de qué va, o el primer pago llega después de 30 s tras una explicación.
- **4–5:** premisa clara pero el primer pago es un chiste explicado o un dato.
- **6–7:** premisa antes de 12 s y pago antes de 20 s; sin loop sembrado.
- **8–9:** promesa ≤ 12 s, pago ≤ 15 s que se ve antes de decirse, loop sembrado ≤ 20 s. («La señora no la agarra. Entra a su casa, abre la llave. Sale agua.» a 0:12; cubeta → folder.)
- **10:** el pago y la siembra son la misma imagen.

## 3. Cadencia y re-ganchos

Mirar: cada ventana de 30 s (`medir_guion.py --ventanas`); tipo de cada pago; mecanismo de cada re-gancho.
- **1–3:** ventanas sin nada nuevo; fórmulas genéricas («pero eso no es lo peor», «lo que pasó después»).
- **4–5:** pagos cada 40 s o más; re-ganchos abstractos («las cosas se complican», «y eso fue solo el principio» con otras palabras).
- **6–7:** pagos cada 25–35 s; un solo tipo de pago repetido; re-gancho reconocible solo en uno o dos puntos.
- **8–9:** micro-pago cada 15–25 s, tipos variados; re-gancho específico cada 30–45 s por mecanismo: amenaza plantada, cuenta regresiva, personaje que entra, decisión inminente, objeto fuera de lugar, pregunta de un personaje. («Las elecciones están a ocho hojas.»)
- **10:** los re-ganchos son a la vez pagos (la cuenta regresiva del bolillo es rótulo, amenaza y ritmo).

## 4. Escalada causal

Mirar: conectores; si al intercambiar dos escenas algo se rompe; si la escala sube.
- **1–3:** lista de escenas intercambiables; «y luego»; la misma escala toda la pieza.
- **4–5:** sube de escala pero con saltos (persona → mundo) sin consecuencia en medio.
- **6–7:** causal en general, con uno o dos escalones repetidos o paralelos (dos beats que son «lo mismo en otro gremio»).
- **8–9:** cada golpe nace del anterior y sube o invierte: persona → cuadra → ciudad → país → imposible. (Corrupción: individuo → redes → instituciones → inversión → macro, con años 1, 3, 7, 10, 12, 15.)
- **10:** la escalada además invierte al final lo que parecía ganancia (Japón: el país seguro vuelve a llenarse de casetas).

## 5. Giro

Mirar: si hay una frase que reencuadra todo; dónde cae (ideal 40–60 %).
- **1–3:** no hay; la pieza es una lista de consecuencias.
- **4–5:** hay «revelación» pero necesita un párrafo para entenderse.
- **6–7:** giro claro pero cae después del 65 % o repite el del hermano.
- **8–9:** una frase cerca de la mitad cambia cómo se lee lo anterior. («Nunca vendió seguridad. Vendió plusvalía.»; «si el agua ya no escasea, que escasee otra cosa».)
- **10:** el giro además nace de un objeto ya plantado (la costra del bolillo vacío).

## 6. Remate y loop

Mirar: última frase; qué paga; qué hay después.
- **1–3:** moraleja, resumen, abrazo, o pregunta retórica; podría cerrar cualquier episodio.
- **4–5:** imagen final, pero no paga nada plantado; o hay texto después.
- **6–7:** paga el loop pero en más de 15 palabras, en dos frases o con la palabra clave en medio.
- **8–9:** ≤ 15 palabras, palabra clave al final, loop transformado, corte en seco. («Ahora se va la mañana.»; «…la grúa sigue poniendo pisos. Con lámpara.»)
- **10:** el remate es la línea del hook devuelta con otro sentido. («¡ALTO AHÍ! ¡ESO ES ILE—»; «Felicidades, Javier. Ya tiene su seis.»)

Nota: en los episodios de visitas, la pregunta de identificación va después del remate y debe tener una sola respuesta posible («Dinos sólo quién»). No la cuentes como «texto después».

## 7. Voz oral y datos

Mirar: largo de frases, verbos, ornamentos, bloques de datos, fuentes en voz, cifras en dígitos, diálogos.
- **1–3:** descripción de cámara o poses en la voz; adjetivos en cadena; un bloque de datos de más de 20 s; fuente y periodo leídos; sin diálogo.
- **4–5:** directa a ratos; dos párrafos explicativos seguidos; cifras sin la distinción que las hace legibles.
- **6–7:** oral y corta; un bloque de datos de 3–4 frases o un dato sin acción pegada.
- **8–9:** frases cortas, una idea por línea, verbos físicos, diálogos de 2–6 palabras actuados; cada cifra en su beat con acción o reacción entre cifras; fuente en rótulo; números con letra. («El licenciado lo ve y se lo regresa.»)
- **10:** la explicación de datos es en sí una escena con gag (la jefa del banco central en el micro de Lalo).

## 8. Tono y fidelidad a la premisa

Mirar: si el título gobierna; si cada exageración nace de la anterior; dial de tono; momento contenido; líneas literales; instituciones reales marcadas.
- **1–3:** cuento doméstico que esquiva el tema; absurdo aleatorio; cierre tierno; se cambió o faltó una línea literal del humano.
- **4–5:** la premisa aparece pero el motor es familiar; gags que no vienen de la regla; horror o distopía por inercia.
- **6–7:** premisa y motor correctos; uno o dos gags sueltos; sin momento contenido; nivel de tono no decidido.
- **8–9:** instituciones e incentivos; un escalón por beat; dial de tono elegido por la premisa y distinto al del hermano; al menos un momento seco; literales intactas; riesgos marcados con alternativa.
- **10:** la pieza podría ser contenida y aun así engancha solo por causa y pregunta.

## Cómo usar las notas

- Todo criterio < 8 lleva arreglo en la tabla de hallazgos y, si cabe, una reescritura puntual.
- Hook y remate pesan más: con cualquiera de los dos en ≤ 5, el veredicto es «necesita una pasada», aunque el promedio sea 8.
- No subas una nota porque el guion «está completo» o «cumple formato»: eso no es enganche.
