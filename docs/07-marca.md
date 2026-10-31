# 07 · Marca: identidad v3 "Bifurcación"

Aprobada el 25 de octubre de 2026. Reemplaza a la v1 (azul, "sosa") y a la v2 (rosa con rayos y confeti, "no adecuada"). El usuario pidió una marca "bien cuidada, con identidad, memorable, premium y hasta minimalista".

## La idea

Todo empieza en una sola línea. En un punto exacto, un día con fecha, la línea **se parte en dos**:

- **gris:** sigue recta; es lo que pasó;
- **rosa:** cambia de vía con una curva suave y termina en un punto; es lo que hubiera pasado.

La identidad entera sale de ese momento. El texto completo está en [`marca/filosofia-bifurcacion.md`](../marca/filosofia-bifurcacion.md).

## Sistema

| Elemento | Especificación |
| --- | --- |
| **Símbolo** | Tronco hueso → nodo → rama gris recta (realidad) + rama rosa en curva con punto final (el hubiera). Grosor constante y extremos redondos. `mark3(ctx, x, y, u, {trunk, real, rise, run, w, node, end, p})`, donde `p` dibuja de forma progresiva |
| **Logotipo** | "el *hubiera*": "el" en Instrument Serif romana y "hubiera" en itálica, con interletrado −1.2 %. El punto de la i es rosa (se ubica comparando contra la ı sin punto). `word3()` / `lockup3()` |
| **Negro** | `#0D0D0F`: fondos, sala de cine |
| **Hueso** | `#EFE9DF`: texto, tronco del símbolo |
| **Gris** | `#5F5E64`: lo que pasó |
| **Rosa mexicano** | `#E4007C`, **el único acento**: lo que no pasó. Para texto pequeño sobre negro usa `#FF3D9A` |
| **Tipografías** | Instrument Serif para títulos y remates (itálica), Instrument Sans para textos y subtítulos (Bold 700) y Geist Mono para fechas, datos y el usuario |
| **Textura** | Grano fino de película (`noise=alls=3` en la codificación final) |

## Reglas

- **Un solo acento por pieza.** Si hay dos cosas rosas, una sobra.
- **Gana el vacío.** Fondos casi negros, sin ruido, sin rayos y sin confeti.
- **Contraste de escala:** una frase grande en serif itálica junto a etiquetas mínimas en mono (`29·06·2014`). Nada en medio.
- **Jerarquía:** primero la línea, después la palabra, al final el dato.
- **Las fechas** van con punto medio: `DD·MM·AAAA`.
- **El usuario** (`@AQUIELHUBIERASIEXISTE`) va en Geist Mono, en mayúsculas y con interletrado 3.

## En los videos (`src/marca3.js`)

- **16:9:** `brandTag` (símbolo y logotipo pequeño en hueso) arriba a la derecha de la barra de cine. Subtítulos en Instrument Sans Bold 40, en mayúsculas; las palabras clave en rosa.
- **9:16:**
  - arriba: firma, título del episodio en serif itálica 70 y líneas finas hueso al 22 %;
  - subtítulos en Instrument Sans Bold 60 con contorno negro;
  - progreso hueso con punto rosa.
- **Cierre:** `endCard3()`. "¿Y si sí?", luego la línea que se dibuja y se parte, el logotipo, el usuario y, opcionalmente, el próximo episodio.
- **Fragmentos:** la etiqueta "PARTE N/3" y las tarjetas finales siguen el mismo sistema (`herramientas/overlays/`).

## Kit (`marca/identidad-v3/`)

| Carpeta | Contenido |
| --- | --- |
| `logo/` | Logotipo horizontal 2400×700 (transparente, sobre negro y sobre hueso), símbolo 1200×1200 y palabra sola |
| `perfil/` | Avatar 1080 y tamaños por red (YouTube 800, Facebook 720, Instagram 320, TikTok 200) + alterno claro |
| `youtube/` | Banner 2560×1440 en JPG (0.6 MB) y PNG (4 MB), los dos por debajo del límite de 6 MB y con todo dentro de la zona segura de 1546×423. Además: foto de perfil de 800 px, marca de agua de 300×300 y `LEEME-youtube.md` (nombre, descripción, vínculos, pestaña principal y configuración). `generador/youtube_listo.py` verifica los límites |
| `facebook/` | Portada de 1640×624 |
| `instagram/` | 6 portadas de destacadas: episodios, México, fútbol, campeones, preguntas y detrás |
| `miniaturas/` | 2 por episodio (PNG 1920 y JPG 1280×720) y portadas verticales |
| `tablero-de-identidad.jpg` | La guía visual en una lámina |

## Regenerar o crear piezas nuevas

El kit sale de código, así que una miniatura nueva es una entrada más en `marca/generador/brand3.js`:

```powershell
cd marca\generador
node kit3_export.mjs ..\identidad-v3            # todo el kit
node kit3_export.mjs ..\identidad-v3 ep03       # solo lo que empiece con "ep03"
..\..\.venv\Scripts\python tablero.py           # vuelve a armar el tablero de identidad
```

Para crear miniaturas:

```js
add('miniaturas/ep03-miniatura-a', 1920, 1080, ctx => {
  thumbBase(ctx, [1360, 520, 900, .09]);
  /* … personaje con figure() … */
  punch(ctx, ['Remate.'], 90, 520, 230);
  stamp(ctx, 'DD·MM·AAAA', …);
});
```

1. Un remate de 1 a 3 palabras.
2. Un personaje grande con expresión fuerte (del 30 al 50 % del cuadro).
3. Un objeto que cuente la premisa (la copa, el taco, la tele).
4. La fecha del quiebre.

Para piezas estáticas grandes se usaron las skills `canvas-design` y `brand-studio:brand-identity-system`; para revisar consistencia, `brand-studio:brand-review`.
