# Análisis visual de las referencias: inventario trazable

Lee este archivo cuando necesites justificar una decisión con evidencia o elegir qué referencias enviar al generador. Cada ejemplo tiene un ID que coincide con su archivo en `assets/referencias/`.

**Convenciones**
- **[O] Observación:** se ve en la imagen y otra persona podría comprobarlo.
- **[I] Interpretación:** lectura razonable de por qué funciona o falla, pero no es un hecho.
- **[D] Decisión propuesta:** regla que adoptamos y que la persona responsable puede cambiar.
- Las cifras L/S/sdL son la luminosidad media, la saturación media y la desviación de luminosidad (contraste global). Están en escala 0-100, se midieron con ImageMagick sobre el recorte excluyendo la franja derecha (12 %) y la inferior (14 %) para no contar el contador de duración. Solo se midieron 01-05 y algunos frames del PDF. Sirven para comparar, no para fijar objetivos.
- No forman parte del diseño y quedan fuera del análisis: el contador de duración, las esquinas redondeadas, las barras rojas de progreso, los botones «Remix» o los iconos de reloj, el panel de vidIQ, los títulos y las vistas. Tampoco el glifo «<» de la esquina inferior derecha de los frames del PDF, que parece un control del visor.

## 0. Procedencia, integridad y límites

| Archivo del manifiesto | ¿Recibido? | Hash | Notas |
|---|---|---|---|
| 01-canal-pensamientos-inorganicos.png | Sí, como webp de 1347×933 | No coincide (convertido al subirlo) | El contenido coincide con el nombre: canal PI, 3 miniaturas |
| 02-nothing-is-safe.png | Sí, png de 238×137 | **Coincide** (F672…94EBF8) | Resolución muy baja (ver §2) |
| 03-tecnologia-diseno-miniaturas.png | Sí, webp de 1352×756 | No coincide (convertido) | 6 miniaturas |
| 04-tecnologia-psicologia-miniaturas.png | Sí, webp de 1385×682 | No coincide (convertido) | 6 miniaturas; **04b es la misma miniatura que 03e** |
| 05-ensayos-cinematograficos.png | Sí, webp de 1405×1040 | No coincide (convertido) | 9 miniaturas |
| **06-risk-ambition.png** | **No recibido** | — | No se analizó. El PDF trae una captura del canal «riskambition» (IDs 07-rk*), pero no puedo confirmar que sea la misma imagen |
| 07-…MOODBOARD.pdf | Sí | **Coincide** (BD20…618E) | 1 página de 3276×2736 pt con 15 imágenes incrustadas, extraídas a resolución nativa |

Cada miniatura de las capturas mide unos 420×237 px; en 07-rk/vc/rh, unos 274×154. Eso basta para la composición, la paleta, la escala y el estilo del texto, pero no para identificar fuentes ni para afirmar detalles de textura fina, salvo donde se indica.

---

## 1. Captura 01: canal Pensamientos Inorgánicos (estado actual, no referencia de estilo)

Aparecen el nombre del canal, la descripción «Pensamiento crítico, sin filtros» y 362 videos. El panel de vidIQ es interfaz y no se analiza.

| ID | [O] Lo que se ve | Medidas |
|---|---|---|
| 01a | Cerebro realista dentro de un cubo de cristal con engranajes metálicos a la izquierda. Fondo negro. Aberración cromática en los bordes y viñeta. **Sin texto.** El protagonista ocupa más o menos el 80 % del cuadro. | L32 S20 |
| 01b | División vertical con un rayo: a la izquierda, bandera surcoreana agrietada entre fuego; a la derecha, mano de neón cian haciendo un corazón coreano y flores. Marco blanco. **Sin texto.** | L24 **S83** |
| 01c | Cyborg estilo anime en blanco con músculos expuestos, lluvia «Matrix» verde y cables. **Sin texto.** | L41 S31 |

- [I] Las tres usan un género visual reconocible de ilustración por IA (render brillante, neón, anime y Matrix) en lugar de una idea. Ninguna tiene palabra, y el concepto depende por completo del título. Los tres protagonistas llenan el cuadro: no hay aire ni un punto de tensión.
- [D] Sirven como **antirreferencia o línea base** («de aquí venimos»). Nunca se envían al generador como guía de estilo.

## 2. Captura 02: «nothing is safe.»

| ID | [O] Lo que se ve |
|---|---|
| 02 | División vertical cerca del 45 %: cielo azul claro a la izquierda y espacio negro con estrellas a la derecha. Un torso masculino, con aspecto de estatua o figura clásica en tono cálido, tiene una **nube que le tapa los ojos** y extiende el brazo cruzando el corte hasta sujetar la Tierra. El texto «nothing is safe.» va en minúsculas, blanco, con contorno o sombra oscura, **curvado siguiendo el brazo** y con punto final. |

- [O] Límite: el original mide 238×137 px. No se puede concluir nada sobre la fuente, el grano ni la calidad del recorte (se amplió ×4 con Lanczos solo para inspeccionarlo). Tampoco se sabe si el torso es una escultura, una pintura o una foto retocada.
- [I] La idea se apoya en **una sola acción física** (agarrar la Tierra) y en la ceguera literal (la nube). El texto no repite la imagen: añade amenaza. El contraste entre las dos mitades (día y vacío) hace la mitad del trabajo.
- [I] Es un collage surrealista más cargado que las familias A o C: tres elementos simbólicos (nube, brazo y Tierra) más el texto. Funciona porque los tres forman **un solo gesto**.

## 3. Capturas 03 y 04: canal(es) de tecnología, diseño y psicología (familia A, «editorial claro»)

[O] Rasgos comunes en 03a-f y 04a-f: fondo gris muy claro o blanco con viñeta suave más oscura en los bordes (L entre 63 y 81, la más alta del conjunto) y palabras grandes en sans geométrica o grotesca gruesa, con interletrado apretado, minúsculas casi siempre y un degradado azul marino a azul. El objeto protagonista es tecnológico (teléfono, burbuja de UI, letra o bisel de aluminio), está fotografiado o renderizado nítido y a menudo **se corta en el borde del cuadro**.

| ID | [O] Composición | [O] Texto | Medidas | [I] Lectura |
|---|---|---|---|---|
| 03a | Teléfono (Dynamic Island) entrando desde la derecha, recortado y ocupando ~55 % | «this is a lie», dos líneas a la izquierda, alineadas a la izquierda, ~30 % de la altura | L63 S29 | Mitad texto y mitad objeto. La flecha roja dentro de la UI es un único acento |
| 03b | Burbuja azul «I love you» centrada con resplandor | «Read 9:39» rodeado con un círculo rojo, más corchete rojo, flecha roja y tachón | L78 S57 | El texto ES la imagen (UI), pero lleva **4 anotaciones rojas**: es el más cargado de la familia |
| 03c | Letra «A» serif gigante con aberración RGB y pixelado, recortada | Sin titular; círculo y flecha rojos | L77 S34 | La tipografía como objeto. Un único sujeto |
| 03d | Barra de inventario pixel-art que se transforma en iconos de macOS, con corazones | Sin titular | L81 S28 | Concepto de metamorfosis en una franja horizontal; mucho aire arriba y abajo |
| 03e = 04b | Dos primeros planos de una esquina de aluminio, divididos por una línea blanca vertical | «cheap» (azul marino) / «luxury» (degradado rojo a violeta con un destello) | L64 **S11** | **El más sobrio del conjunto**: casi monocromo y casi idéntico a cada lado, con la diferencia puesta en la palabra. Requiere que el espectador mire |
| 03f | Teléfono inclinado abajo a la derecha, con una notificación roja «99» enorme | «lies.» arriba a la izquierda, con punto | L64 S52 | Palabra corta con punto, un objeto y un color de acento |
| 04a | Bill Gates recortado con una caja de cartón «ChatGPT» llena de billetes | «genius» | L66 S32 | Collage de personaje + utilería. Más literal y ruidoso |
| 04c | Logo de Notion en 3D a la derecha | «the secret psychology of Notion», 3 líneas | L78 S29 | Texto largo (5 palabras): legible, pero el texto domina |
| 04d | iPhone abajo, círculo blanco con «69 %» | Dos bloques: «this is not a circle» / «this is not true», más dos flechas naranjas | L63 S33 | **Recargado**: dos titulares, dos flechas y un círculo |
| 04e | Mano sosteniendo un iPhone fino como si fuera un cigarro, con humo | «uncool» gigante (~45 % de la altura), con el humo saliendo de la palabra | L73 S37 | **Muy bueno**: una metáfora visual (teléfono = cigarro) y una palabra; el humo une texto e imagen |
| 04f | Botón «New» de UI con anotaciones rojas de medidas | «218 hours to design a button.» | L78 S37 | Cifra concreta + objeto banal. Anotaciones de diseñador coherentes con el tema |

- [I] La **elegancia** de esta familia viene de que el fondo neutro y claro no compite, el color se limita a un acento por pieza (rojo o degradado) y el objeto es real y nítido. El recorte del objeto sugiere escala.
- [I] El **ruido** aparece cuando se suman anotaciones (03b, 04d) o se recurre a un personaje con utilería (04a). Esas piezas siguen funcionando, pero se alejan de la prioridad de minimalismo.
- [O] Las anotaciones rojas a mano (círculo, flecha) aparecen en 03a, 03b, 03c, 04d (naranja) y 04f. En 03c y 04f son parte del tema (tipografía, diseño de UI) y no adorno genérico.

## 4. Captura 05: ensayos cinematográficos (familia B, «fotograma de cine»)

[O] Rasgos comunes: una fotografía de cine o de archivo (película, foto deportiva o de época), una o dos personas, grano visible o tramado o semitono en varios (05d, 05g, 05h y 05i son claros), color apagado o ligeramente amarillento, y texto **corto** de 1 a 4 palabras. Los títulos coinciden con la captura «Verse Creates» del PDF (07-vc1, vc2, vc3 y vc5 = 05e, 05i, 05b y 05g); no lo verifiqué fuera de las imágenes.

Dentro de la familia hay **dos subtipos de texto** con efectos opuestos:

**B1: texto limpio pequeño o mediano** (grotesca gruesa blanca o roja, interletrado apretado y a menudo con punto)

| ID | [O] | Medidas |
|---|---|---|
| 05b | Kobe Bryant riendo, cerrando el puño, a la derecha. «the truth» en blanco con **halo o desenfoque** a la izquierda, a media altura | L41 S20 |
| 05c | **Enorme campo verde**, hombre pequeño sentado ante un escritorio con un ordenador antiguo en el centro-derecha (la figura ocupa ~15 % de la altura). «STOP CHASING.» en blanco, mayúsculas gruesas, a la izquierda | L40 S36 **sdL 14** (el contraste global más bajo) |
| 05e | Steve Jobs joven recostado en un cubículo. «try again» en rojo con sombra, a la izquierda, sobre la escena | L48 S29 |
| 05g | Bezos en su oficina temprana de Amazon. «"humble"» blanco entre comillas, arriba a la derecha | L41 S17 |
| 05i | Hombre corriendo con barrido de movimiento intenso, entre rojo y azul. «DON'T TRY.» pequeño a la derecha | L44 S59 |

**B2: texto a mano o pincel, grande y expresivo**

| ID | [O] | Medidas |
|---|---|---|
| 05a | Anthony Bourdain haciendo un gesto obsceno. «AVERAGE» con rotulador rojo, con contorno blanco, cruzando el cuadro, más «is a lie» | L44 S34 |
| 05d | Fight Club en blanco y negro con semitono. «This isn't you» a mano en rojo | L62 S9 |
| 05f | Fondo casi negro, hombre apuntando con un cuchillo rojo. «who will you become» a mano en rojo, ocupando todo el cuadro | **L15** sdL 11 |
| 05h | Kanye en el estudio. «JUST START» con letras de pincel amarillo lima y rojo, enormes | L32 S44 |

- [I] B1 es **la versión elegante** de la familia: la foto lleva la emoción y el texto es una nota al pie afilada. 05c es el ejemplo más claro de espacio negativo como significado (la persona pequeña frente al vacío = «dejar de perseguir»).
- [I] B2 es **expresiva y agresiva**: funciona por actitud, pero el texto a mano tapa la foto y tiende a la saturación. Encaja con «personalidad», no con «minimalismo».
- [O] El tratamiento fotográfico nunca parece un render: hay grano, compresión y luz de época. [I] Esa imperfección es parte de la credibilidad del estilo.

## 5. PDF: moodboard de Pensamientos Inorgánicos

### 5.1 Notas de texto del PDF (citadas literalmente)
- «¿Cual fuente?» y debajo, en grande, **«Coolvetiva»** (así aparece en la capa de texto del PDF).
- «Recortes de peliculas» / «GIF: peliculas, deportes, series, juegos, etc.» / «Resaltar con texto conceptos importantes desde el guión.» / «Musicalización: soundtracks, sound fx.» / «¿Color característico? Ayuda a la identidad del canal».

[O] Sobre la tipografía: el PDF *escribe* «Coolvetiva», casi seguro en referencia a **Coolvetica** (tipografía de Typodermic Fonts). **No está verificado** que ese rótulo esté compuesto en Coolvetica (el PDF no lo declara y no comprobé las fuentes incrustadas), que el texto de alguna referencia sea Coolvetica, ni la licencia o disponibilidad de la fuente para este uso. [I] Visualmente, el texto limpio de 05c, 05e, 05g, 07-fv08 y 07-rk* es de la misma *clase* (grotesca o neo-grotesca muy gruesa, interletrado negativo y minúsculas), compatible con Coolvetica o Helvetica Bold condensada, pero la resolución no permite identificarla. [D] En los prompts se describe la *clase* («heavy grotesque, tight letter-spacing»). La fuente del canal se decidió en `direccion-de-arte.md` §3 (Coolvetica Regular, con licencia de escritorio de Typodermic revisada en su web; sustituta, Inter Display Black).

### 5.2 Frames de video (07-fv01 a fv12): son lenguaje de edición, NO miniaturas
| ID | [O] |
|---|---|
| fv01 | Fondo rojo plano, «WHERE YOU ARE» abajo a la izquierda, línea blanca a mano que sube hasta «WHERE YOU WANT TO BE» con un óvalo |
| fv02 / fv03 | Fondo crema (L95), texto rojo **diminuto** centrado: «(Part One)», «RECOGNISE REALITY» |
| fv04 / fv05 | Joven en la máquina de escribir (película); «want your» / «life to go» en blanco a media altura (texto palabra a palabra) |
| fv06 | Fondo negro (L11, S0), resonancia magnética de un cerebro; «POINTLESS» blanco gigante donde **el cerebro se superpone a algunas letras** (texto entretejido con la imagen) |
| fv07 | Plano muy cálido y posterizado; «we / overthink / it» escalonado |
| fv08 | Habitación desordenada en un plano amplio; «your» pequeño sobre «environment» gigante, en el tercio inferior |
| fv09 / fv10 | Gimnasio visto de espaldas / Keanu Reeves sonriendo, sin texto |
| fv11 | Dos personajes en un sofá; «rule» blanco en el centro |
| fv12 | Hombre ante una pizarra; «that by doing a» pequeño, más «bad job» enorme **con la palabra detrás del hombro del sujeto** (profundidad) |

- [I] Estos frames enseñan **jerarquía tipográfica** (palabra clave enorme y palabras auxiliares diminutas: fv08, fv12), **texto con profundidad** (letras detrás o entre capas de la imagen: fv06, fv12) y **paleta de canal posible** (rojo + crema + negro: fv01 a fv03). Son útiles para el tratamiento del texto, pero **su composición no es de miniatura**: muchos tienen texto pequeño ilegible a 168 px.
- [D] Pueden enviarse al generador solo como referencia de *integración del texto*, nunca como layout.

### 5.3 Canal «riskambition» (07-rk1 a rk8): familia C, «fondo plano + recorte en semitono»
[O] Patrón: fondo de color plano (blanco, negro, rojo, gris claro o amarillo), **una palabra o dos en minúsculas, grotesca muy gruesa, arriba al centro**, que ocupa casi todo el ancho (~20-25 % de la altura), y debajo un recorte fotográfico en blanco y negro con aspecto de grabado o semitono.

| ID | [O] | [I] |
|---|---|---|
| rk1 «8 habits» / rk2 «polymath» | Fila de 3 a 5 productos (libro, auriculares, cámara, libreta) | Catálogo: se lee como lista de compras, no como idea |
| rk3 «high performer» | Fondo rojo, montaña en semitono abajo y **figura diminuta en la cima** | Escala como significado; muy limpio |
| rk4 «hyperfocus» | Fondo rojo, ojo en grabado recortado con borde de papel rasgado; la palabra se superpone al recorte | Un objeto, un color y una palabra: **referencia central de minimalismo con impacto** |
| rk5 «peak performance» | Piloto con casco recortado; las letras pasan *detrás* del casco | Profundidad texto-imagen |
| rk6 «flow state» | Gris claro, ordenador antiguo con un ojo en la pantalla, subrayado rojo bajo el texto | Surrealismo sutil |
| rk7 «creative.» | Retrato con glitch de colores que corta la palabra roja en dos | Texto interrumpido por la figura |
| rk8 (sin texto) | Ojos en semitono sobre amarillo, a sangre | Solo imagen; el color es la marca |

- [I] La familia C consigue una identidad de canal fuerte con muy pocos recursos: un color plano, una textura (semitono) y una tipografía. Es la familia **más fácil de reproducir de forma coherente** y la más cercana al «minimalismo con personalidad».

### 5.4 Canal «Verse Creates» (07-vc1 a vc8): confirma la familia B
[O] vc1, vc2, vc3 y vc5 = 05e, 05i, 05b y 05g. Las nuevas: **vc4** «the ambition *paradox*» (dos cabezas recortadas sobre negro; «paradox» en serif cursiva roja frente a sans blanca), **vc6** (cerebro rojo dentro de una cabeza azul tipo resonancia sobre negro, sin texto), **vc7** (una tarjeta de YouTube con un cursor de mano sobre negro, sin texto) y **vc8** (primer plano de ojos en rojo profundo, sin texto).
- [I] vc6 a vc8 muestran que **sin texto** también funciona cuando la imagen es una sola idea sobre negro. vc6 es justo la clase de motivo (cerebro) que PI ya usa: la diferencia con 01a está en el tratamiento (plano y gráfico frente a render brillante con engranajes y cristal).

### 5.5 Canal «Reflejo Humano» (07-rh1 a rh4)
[O] Fotos de personalidades deportivas o mediáticas, a menudo en tríptico (rh2, rh3), oscurecidas, con una frase blanca centrada con punto («Mentalidad ganadora.», «Manifiesta.», «Tu vs Tu», «real»).
- [I] Es la referencia en español del conjunto, pero visualmente la más genérica: varias caras, texto centrado sobre caras y poca jerarquía. [D] Úsala como referencia de **registro del texto** (frase corta en español con punto final), no de composición.

---

## 6. Síntesis: familias visuales

| Familia | IDs principales | Fondo | Texto | Imagen | Grado de minimalismo |
|---|---|---|---|---|---|
| **A. Editorial claro** | 03a, 03e, 03f, 04e, 04f (y 03c, 03d sin texto) | Gris o blanco con viñeta | 1 a 5 palabras, grotesca gruesa azul marino o en degradado | Objeto real nítido, recortado | Alto en 03e/04e/03f; bajo en 03b/04a/04d |
| **B1. Fotograma de cine + nota limpia** | 05b, 05c, 05e, 05g, 05i, vc4 | La propia foto | 1 a 3 palabras, sans gruesa, blanco o rojo | Foto de cine o archivo con grano | Alto, sobre todo 05c |
| **B2. Fotograma + rotulador o pincel** | 05a, 05d, 05f, 05h | La propia foto | Gesto a mano, grande y rojo o amarillo | Foto de cine | Bajo; alta personalidad |
| **C. Plano + recorte en semitono** | rk3, rk4, rk5, rk6, rk7, rk8 | Color plano (rojo, amarillo, gris, blanco) | 1 o 2 palabras gigantes, arriba | Recorte en blanco y negro con semitono o grabado | Muy alto en rk3, rk4 y rk8 |
| **D. Collage surrealista** | 02 | Partido (cielo y espacio) | Frase corta que sigue la forma | Figura clásica + elementos simbólicos | Medio |
| **E. Negro + motivo gráfico único** | vc6, vc7, vc8 (y fv06 como tratamiento) | Negro | Ninguno o una palabra | Un símbolo plano y gráfico | Alto |
| *Antirreferencia* | 01a, 01b, 01c | — | Ninguno | Render IA de género | — |

**Semejanzas transversales [O]:** 1 a 5 palabras (casi nunca más), una sola idea visual, una figura principal y sin marcos decorativos (salvo 01b, que es antirreferencia). El texto principal va en sans gruesa (minúsculas, o mayúsculas en 05c/05i/05a) y nunca va en serif decorativa, salvo como contraste puntual (vc4 «paradox», 03c «A»).

**Diferencias que deben mantenerse [O]:** la luminosidad va de L15 (05f) a L81 (03d) y de L95 en el crema de fv02 hasta L11 en fv06. La saturación va de S9 (05d) a S59 (05i). El texto puede ser enorme (04e, rk4) o diminuto (05i, fv02); estar limpio (05c) o a mano (05f); ir arriba (C), a la izquierda (A, B1) o curvado (02). **No hay un fondo, una posición de texto ni un color universales.**

**Encaje con la prioridad «minimalismo y elegancia» [D]:** primer nivel C (rk3, rk4, rk8), B1 (05c, 05g, 05b), A sobria (03e, 04e, 03f) y E (vc6, vc8). Segundo nivel D (02). Usar solo con justificación: B2 (personalidad sin minimalismo), A con anotaciones (03b, 04d) y collages de personaje (04a, rh*).
