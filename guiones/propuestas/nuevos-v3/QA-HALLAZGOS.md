# Hallazgos del control de calidad · v3

Control automático sobre los 25 guiones v3: estructura, .txt = LOCUCION, líneas literales de Erick, fórmulas prohibidas, largo del hook y conteo de palabras. Se complementó con lectura puntual de hooks, remates y datos.

## Lo que salió bien

- **Hooks:** los 25 abren en acción, con una imagen dibujable y sin contexto previo. Varios son una línea de diálogo («Págueme mi seis», «Si esta cuenta llega a cien mil...»). Funcionan bien y conviene permitirlos de forma explícita.
- **Líneas literales de Erick:** se conservaron todas. Algunas cambiaron solo la puntuación para la actuación, por ejemplo «¡ALTO AHÍ! ¡ESO ES ILEGAL!» frente a «ALTO AHÍ, ESO ES ILEGAL». La regla debería decir: mismas palabras, en el mismo orden; la puntuación puede servir a la actuación.
- **Datos reales:** se usaron los de FUENTES.json, con unidad y periodo (Japón 2021 0.23/100 mil, INDEC sep-2026 +1.9% mensual, Banxico 3% ±1).
- **Fórmulas genéricas:** ninguna de las prohibidas aparece.
- **Series:** los hermanos (agua, PIB, visitas) diferencian hooks, re-ganchos, giros y remates con una tabla mental previa. La tabla funcionó y debe quedar en el método.

## Problemas y riesgos para el método

1. **Inflación de palabras.** El brief pedía «normalmente igual o más corto», pero el total pasó de 11,597 a ~12,400 palabras (+7%). 22 de 25 crecieron, algunos +25–35% (08, 16, 21, 22). Al añadir re-ganchos y gags se tiende a sumar sin cortar. **La skill necesita un presupuesto explícito:** máximo +10% sobre la versión anterior, o justificar. Cada gag nuevo paga con un corte.
2. **Bloques de datos largos.** En 23 y 24 quedan bloques de cifras de 30–38 s, por respetar parches de precisión. Hace falta una técnica para trocear datos obligatorios en acción: una cifra por beat, con un gag o una reacción entre cifras.
3. **Instituciones reales y expresiones sensibles dentro del absurdo:** «La NASA pide la receta» (05) y «súper chino» (26). La skill debería pedir marcarlos siempre como riesgo para el humano, sin prohibirlos.
4. **Dependencias entre episodios:** 21 usa nombres de personajes de 03/04/05/06/16. Hay que marcarlo cuando una pieza depende de que el público haya visto otras.
5. **Medición del hook.** Contar palabras hasta el primer punto falla cuando el hook es una cita. Hay que definir el hook como «lo que se dice en los primeros 3 s» (unas 7–9 palabras habladas a 145 ppm), no como «la primera oración».
6. **Tono («over the top»).** El usuario comentó que el resultado fue «muy over the top». Está pendiente aclarar si se refería al modelo usado o al tono. La skill debe incluir calibración: el absurdo escala por causa y un paso a la vez, no por acumulación. Debe haber al menos un momento contenido o seco por pieza.
7. **Eficiencia del proceso.**
   - Cada subagente gastó ~180–230 mil tokens por 3–5 episodios, en buena parte por releer documentación larga y rehacer storyboards completos.
   - La skill debe destilar las reglas para no tener que leer 4 documentos cada vez, y separar el storyboard en una etapa posterior.
   - Un script incluido en la skill (`scripts/`) que cuente palabras, estime duración y verifique .txt = LOCUCION ahorraría tiempo. Los subagentes escribieron cada uno su propio script, y uno sobrescribió el de otro en una carpeta compartida.
