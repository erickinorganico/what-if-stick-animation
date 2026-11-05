# Antipatrones: lo que se rechazó y por qué

Cada entrada: el defecto, por qué se rechazó y el arreglo. Léelo antes de reescribir un guion existente; la mitad de estos errores vienen de «mejorar» sin cortar.

## A. Rechazados por el humano (lote del 4 de noviembre de 2026)

| Defecto | Ejemplo real | Por qué se rechazó | Arreglo |
|---|---|---|---|
| **Cuento doméstico que esquiva el título** | Batman con una tía que invade su privacidad; la inflación explicada con la compra de una lavadora | El espectador vino por las consecuencias nacionales del «y si»; la familia tapaba corrupción, violencia o economía | El personaje es vehículo para recorrer instituciones e incentivos: Batman contra policías que asaltan; Lalo y su micro como tablero del banco central |
| **Cierre tierno por defecto** | Café, abrazo, reconciliación, moraleja | Mismo final para cualquier pieza; explica el chiste; no paga la premisa | Remate con riesgo elegido por la premisa (sátira negra, distopía, horror, optimismo ganado); imagen, no lección |
| **Clase explicativa** | Tres párrafos de banco central seguidos | La explicación le ganó al relato | Cada idea montada en una acción sobre un objeto ya plantado, con gag al cerrar; máximo 2–3 frases por bloque |
| **Movimiento ornamental en la voz** | «lo alisa con la palma», «capa abierta, puños listos» | Frena la locución y no produce gag | Verbo que produce el gag («lo ve y se lo regresa»); lo demás al storyboard |
| **Disclaimer narrado** | «esta ley no existe, la inventamos hoy» | Rompe el mundo hipotético que el título ya declara | «En esta realidad, …» una vez; fuentes y límites en rótulo gris y FUENTES |
| **Mismo género en todas** | Horror cósmico o distopía exportados a cada tema | Se vuelve fórmula; el remate deja de sorprender | Dial de tono por premisa; no repetir el género del último episodio que gustó |
| **Mutilar la escalada por la duración** | Cortar un final de varios minutos para conservar 90 s | La duración es propuesta, no regla | Ampliar si el recorrido lo exige, pero con presupuesto: +10 % de palabras o justificar |
| **Fabricar aprobación** | «Pasó formato, fuentes y timing» presentado como listo | Lo técnico no acredita gusto ni retención | Entregar riesgos y dudas; decir «pendiente de revisión humana» |
| **Nombres vetados** | Rocío, Ofe | Preferencia puntual del canal | Nombres comunes; doña Mary en quesadillas |

## B. Problemas del lote v3 (control de calidad)

| Defecto | Dato | Arreglo en el método |
|---|---|---|
| **Inflación de palabras** | 22 de 25 crecieron; total +7 %; algunos +25–35 % (Agua CDMX +33 %, Japón +26 %, Canal +35 %) | Presupuesto explícito (+10 % máx.); cada gag nuevo paga con un corte; `medir_guion.py --prev` lo mide |
| **Bloques de datos largos** | Visitas 100 mil y 1 millón: 30–38 s de cifras por respetar parches literales | Una cifra por beat con acción entre cifras; las frases literales se reparten, no se leen seguidas |
| **Instituciones reales dentro del absurdo** | «La NASA pide la receta»; «súper chino» | No se prohíben; se marcan como riesgo para que decida el humano, con alternativa lista |
| **Dependencias entre episodios** | Canal 10 mil usa personajes de otros cinco episodios | Declararlo en riesgos: si cambian esos guiones, cambia este |
| **Medición del hook** | Contar palabras hasta el primer punto falla con citas y con frases de 5 palabras seguidas de contexto | El hook es lo que se oye en 3 s (7–9 palabras); `medir_guion.py` imprime esas palabras |
| **Tono «muy over the top»** | Comentario del usuario sobre el lote | Escalera de un escalón por beat; prueba del gag («¿viene de la premisa?»); un momento contenido por pieza; dial declarado en la ficha |
| **Costo del proceso** | 180–230 mil tokens por 3–5 episodios: releer 4 guías, rehacer storyboards, cada agente con su script | Esta skill destila las guías; storyboard solo en etapa 3; script único en `scripts/` |

## C. Errores de escritura que se corrigieron en v3 (lista rápida)

- Abrir con fecha, lugar, «Mayo de dos mil veintiséis», «Alfombra roja en Los Ángeles», «Aeropuerto de…». → Acción primero; el lugar en la segunda frase o en un sello.
- «Y luego…», «Luego, con el clima. Luego, con un perro». → «Por eso / entonces / y por lo tanto», o frases cortas sin conector.
- Fórmula genérica escondida: «Y en el año quince pasa lo que nadie hubiera apostado». → «Año quince. El noticiero pone dos líneas en pantalla.»
- Explicar el gag: «hace lo único que puede», «Sin monitos no hay animación. Sin animación, el canal…». → Se ve, no se dice.
- Adjetivos sin imagen: «Repetida. Paciente.» → Cuenta regresiva real (cada nueve, ocho, cinco, dos segundos).
- Dos «En esta realidad» en la misma pieza. → Uno; el segundo es «Aquí» o «Por eso».
- Transición vacía: «Antes de explicar cómo llegamos aquí:», «Y también hay que elegir sin elegir». → Se borra.
- Remate de dos frases o 17 palabras. → Una frase, ≤ 15 palabras, clave al final («…Con lámpara.», «…el país.»).
- Pregunta final doble en episodios de visitas («¿A quién tendrías que explicarle…? Dinos cómo le dices»). → Una sola respuesta posible: «Dinos sólo quién.»
- Lista de clichés locales (tacos, churros, «la línea»). → Un detalle que solo alguien de ahí diría («como quien ve un clásico»; «hay un compadre que te lo consigue»).
- Fuente leída en voz: «según la estimación publicada en enero de 2025». → Rótulo gris; en voz solo la distinción necesaria («el año completo contra el anterior»).
- Hook repetido entre hermanos (dos episodios de PIB abriendo con un político cortando un listón). → Tabla de hermanos antes de escribir; cada celda distinta.
- Redundancia con el storyboard: «con la carpeta pegada al pecho», «se queda parado justo en la línea». → Al storyboard.
- Giro que cae al 60–65 %. → Si no cabe moverlo, poner un reencuadre previo cerca de la mitad («el cero tiene gemelos»).
