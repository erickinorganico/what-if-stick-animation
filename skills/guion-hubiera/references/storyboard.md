# Convenciones de storyboard (etapa 3)

Solo se hace sobre una locución aprobada. El storyboard es donde viven cámara, poses, texturas, rótulos y pausas; si algo de eso está en la voz, sácalo de la voz. Produce el episodio un motor 2D stickman por código, así que cada fila debe ser dibujable con figuras de palitos, fondos simples y texto.

## Tabla

`| # | Intervalo | Cita inicial → final | Plano/acción/acting | Texto en pantalla | Sonido |`

- **Intervalo:** estimado a 145 palabras/min más las pausas que indiques («Pausa de 1 s», «Silencio de 2 s»). Cierra con una nota técnica: «intervalos estimados desde N palabras a 145 ppm y X s de pausas; sin audio cronometrado». Después se retima sobre la voz real.
- **Cita inicial → final:** las 4–5 primeras y últimas palabras del tramo de locución que cubre la fila, para anclar la toma a la voz.
- **Plano/acción/acting:** un plano, un encuadre y una idea por fila. Verbo físico para cada personaje: nadie posa mientras habla el narrador. Un gag visual se anima **antes** de que la voz lo diga y se deja una reacción de 0.5–1.5 s antes de explicarlo. Tras una frase con peso, pausa de 1 s.
- **Texto en pantalla:** solo lo que no cabe en la voz. Tipos: `Sello "20 años"` (mono, abajo a la izquierda; en vertical, arriba), `Rosa "…"` (lo que no pasó: la cifra del mundo hipotético), `Gris "…"` (lo que sí pasó: fuente, periodo, glosa de un localismo), `Diegético "MOLLETES PANCHO"` (letreros dentro de la escena), `strike` sobre la palabra exacta que se tacha. **Nunca rótulos arriba.** Sin escudos, logotipos ni colores de partido.
- **Sonido:** un efecto por acción visible y un ambiente por lugar. Música original o genérica; nunca clips de películas.

## Reglas de puesta en escena

- **Narrador dibujado (DrV10):** aparece en **un solo plano puntual** por episodio, normalmente para la explicación de datos (tacha, pega una calcomanía, parte un pastel). No lo uses de muletilla.
- **Único zoom de golpe** (máximo 1–2 por episodio): resérvalo para el giro o el clímax y dilo en la fila («Único zoom de golpe al folder»).
- **Transiciones:** el corte seco es la norma. `dip` para saltos de tiempo («una hora antes», «Año diez»), `whip` para cambio de lugar con energía, `dissolve` solo con encuadres alineados. Una transición por cada 8–10 cortes.
- **Color y marca:** frío y pozo de luz para lo que pasó; cálido para lo que no pasó. Un acento rosa por cuadro (es la marca: lo que no pasó). Sin rayos ni confeti. Recuerdos desaturados con fundidos de 0.3 s.
- **Variedad de planos:** general, medio, cercano, inserto, sobre el hombro, cenital; no repitas el mismo frontal diez veces. Busca rimas visuales: el remate suele reusar el encuadre del hook con un cambio (callback de encuadre).
- **Personajes reales** (políticos, deportistas, marcas): silueta genérica, sin rostro, sin frases atribuidas, sin partido. Instituciones reales solo si la locución las nombra y están marcadas en riesgos.
- **Horror o violencia:** por sugerencia (silencio, cuenta regresiva, objeto fuera de lugar, vapor). Sin sangre ni regodeo. Gráficas de caída de población «a gis, sin cuerpos».
- **Dos personajes nunca se cruzan** en cuadro: corta a contraplano.
- **Vertical (9:16):** la ventana ve ~40 % del ancho; los gráficos anchos (trípticos, tablas) necesitan versión apilada. Anota «V: apilado» en la fila si aplica.

## Ejemplo de filas (Agua CDMX)

| # | Intervalo | Cita inicial → final | Plano/acción/acting | Texto en pantalla | Sonido |
|---|---|---|---|---|---|
| 2 | 0:06–0:12 | "Le extiende la cubeta a" → "señora. Flash en tres, dos..." | El diputado extiende la cubeta; la señora la mira. El fotógrafo levanta tres dedos y baja uno. | Sello "3… 2…" | Conteo del fotógrafo |
| 3 | 0:12–0:19 | "La señora no la agarra." → "llave del lavadero. Sale agua." | El gag se ve antes de decirse: la señora da media vuelta, entra, abre la llave y cae un chorro fuerte. | Rosa "sí hay" | Chorro; un pájaro |
| 5 | 0:27–0:41 | "En esta realidad, el agua" → "de hasta arriba del cerro." | Mapa de gis: tres trazos (pozos, Lerma, Cutzamala) convergen y se ramifican. DrV10 tacha la palabra "tandeo". | Gris "pozos · Lerma · Cutzamala" | Un clic por trazo; gis |
| 12 | 2:14–2:22 | "Y regresa el diputado. Posa" → "folder a la misma señora." | Callback exacto del encuadre de la fila 1: el retrato ahora está en una carpeta y la señora, en la fila. Único zoom de golpe: al folder extendido. | — | Obturador cargando |

## Antes de entregar el storyboard

- Cada beat del mapa dopamínico tiene una fila; cada fila tiene algo que se mueve.
- Un beat sin acción dibujable es señal de que la locución está en adjetivos: avísalo, no lo rellenes con poses.
- El loop se paga con un callback de encuadre u objeto, no solo con la palabra.
- Cuenta los `dip`/`whip`, el zoom de golpe y los planos de DrV10: deben caber en los límites de arriba.
