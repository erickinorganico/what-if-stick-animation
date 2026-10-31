# 03 · El motor

Cada episodio es una página web (`proyecto/index.html`) con un solo `<canvas>`. La función `window.render(t)` dibuja el cuadro del segundo `t` **sin estado**: el mismo `t` siempre da la misma imagen. Por eso se puede:

- renderizar en paralelo y por bloques;
- reanudar un render cortado;
- revisar cualquier instante sin generar video.

Playwright abre la página, llama `render(f/30)` en cada cuadro y le pasa la captura a FFmpeg.

## Archivos (orden de carga en `index.html`)

| Archivo | Qué tiene |
| --- | --- |
| `words.js` | `WORDS` del ep. 01 (las tomas del ep. 01 se anclan a esta voz) |
| `core.js` | Lienzo, modos 16:9 y 9:16, utilidades (`clamp`, `lerp`, `prog`, `ease`, `E.*`), ruido, caché de capas, luz (`glow`, `vignette`, `grade`, `haze`, `bokeh`, `dust`), cámara (`cam`, `shakeV`, `handheld`) y texto |
| `marca.js` / `marca3.js` | Marca v2 heredada y la **identidad v3**: `t3`, `mark3`, `word3`, `lockup3`, `brandTag` y `endCard3` |
| `char.js` | El personaje: `figure(ctx, o)` con tubos curvos y luz de borde, `face()` con 15 expresiones `EXPR`, marcha con IK (`gait`, `runCycle`, `walkCycle`, `runPhase`) y saltos (`hop`, `crouchOf`) |
| `env2.js` | Estadio y entorno: `stadiumWide2`, `fansForeground`, `pitchLevel`, `netForeground`, `ball2`, `scoreBug2`, `stamp2` y `tag` |
| `pitch.js` | Estadio en perspectiva con 11 contra 11 (`stadiumMatch`, `drawMatch`) y uniformes en `KIT` (MEX, NED, CRC, ARG, GER, ENG y AND) |
| `room.js` | La sala de la familia: `drawRoom`, la tele y la mesa |
| `shots2.js`, `shots3a/b/c.js` | Las tomas del ep. 01 y helpers reutilizables: `norm`, `A()`, `fam`, `player`, `bigTitle`, `flash`, `goalPOV`, `tvMatch`, `dog2`, `jumpArc` |
| `words2.js` / `words_ep.js` | `WORDS_EP`: tiempos por palabra del episodio |
| `e2a…e2d.js` / `ep.js` | **Las tomas del episodio.** Reinician `SHOTS` y `T`, definen anclas y registran las tomas nuevas |
| `main2.js` | Subtítulos (`CAPS`), cromo de 16:9 y de 9:16, `window.render`, `window.DUR` y la espera de fuentes (`READY`) |

## Conceptos clave

- **Mundo de 1920×1080.** Todo se dibuja en coordenadas de 16:9. En vertical (`?v=1`), `setView(cx)` toma una ventana de 800×1000 del mundo centrada en `cx` y la escala ×1.35 dentro del lienzo de 1080×1920, a partir de `VTOP=300`.
- **Tomas.** `S(t0, fn, vx)` registra una toma que empieza en `t0`. `fn(ctx, t)` dibuja en coordenadas del mundo. `vx` es el centro del encuadre vertical: un número o una función de `t` (seguir el balón, al que habla…).
- **Anclas.** `A2('frase exacta')` / `A3(...)` buscan la frase en `WORDS_EP` en orden y devuelven `VO + start`. Las tomas usan `T.nombre`, nunca segundos sueltos. Si cambia la voz, todo se reacomoda solo.
- **VO = 0.5.** La voz entra medio segundo después del inicio, tanto en el motor como en la mezcla.
- **Duración.** `window.DUR_EP = VO + última_palabra.end + 3.7`: el cierre necesita unos 3.7 s para respirar.
- **Espacio UI.** Los textos de interfaz van con `ui(ctx)` / `uiCenter(ctx, k)` y las anclas `uxC/uxL/uxR/uyC/uyT/uyB`. Así quedan bien en los dos formatos. En vertical, los subtítulos ocupan la franja y ≈ 1440–1560 del lienzo; no pongas nada importante ahí.
- **Subtítulos.** `CAPS` agrupa palabras: hasta 6 por grupo, se corta en pausas mayores a 0.4 s o en signos. Las palabras de `KEY` (en `main2.js`) salen en rosa `#ff3d9a`; edítalas por episodio.
- **Cromo.**
  - **16:9:** barras de cine de 138 px, `brandTag` arriba a la derecha y subtítulos en la barra de abajo.
  - **9:16:** bandas con la escena desenfocada, firma y título del episodio en serif itálica arriba, subtítulos grandes y barra de progreso hueso con un punto rosa.
- **Modos de página** (query string):
  - `?v=1` → vertical;
  - `?clean=1` → sin cromo;
  - `?noui=1` → sin cromo ni títulos (sirve para miniaturas).

## Escribir una toma

```js
// en src/ep.js, después de definir T con A3(...)
S(T.disparo - .3, (ctx, t) => {
  const tHit = T.poste + .1;                       // el golpe cae exacto en la palabra "poste"
  cam(ctx, 960, 560, lerp(1, 1.06, ease(t, T.disparo, tHit, E.inOut)));  // la cámara aterriza, no rebota
  stadiumWide2(ctx, t, { sky: 'night' });
  ball2(ctx, lerp(700, 1420, prog(t, T.disparo, tHit)), 610, 14, t * 20);
  if (t > tHit) flash(ctx, t, tHit, .25);
  vignette(ctx, .55); grade(ctx, '#ffb070', .1);
}, t => lerp(760, 1300, prog(t, T.disparo, T.poste)));  // encuadre vertical: sigue el balón
```

**Reglas:**

- **Una idea por toma.** Corta en la palabra ancla y no después.
- **La toma se dibuja completa en cada `t`.** No hay estado ni `Math.random()` suelto: usa `rnd(seed)`, `hash` o `noise1`.
- **Personajes:** `figure(ctx, {x, y, s, dir, pose, face, t, shirt, …})`, o `fam()` y `player()`, que ya traen la ropa y la luz. Las expresiones válidas son `neutral`, `smile`, `happy`, `laugh`, `shout`, `cheer`, `shock`, `scared`, `determined`, `angry`, `sad`, `cry`, `smug`, `closed` y `tender`.
- **Ángulos:** 0 = abajo, 90 = al frente y 180 = arriba. En los codos, el signo + es la flexión natural.
- **Puesta en escena:** dos personajes nunca se cruzan. Si la acción lo pide, corta a contraplano, como el caño del 118' en el ep. 01.
- **Variantes:** `asAlien(fn)` dibuja cualquier figura como extraterrestre (ep. 02).
- **Textos grandes:**
  - `bigTitle()` para golpes de una o dos palabras;
  - `t3()` con `italic: true` para frases de marca;
  - `stamp2()` o `tag()` para sellos y etiquetas.
- **Sin rayos, sin confeti de marca y sin zooms de golpe seguidos.** El golpe visual se reserva para 1 o 2 momentos por episodio.

## Kit de dirección (`src/direccion.js` y `src/transiciones.js`)

Nació en el R4 del narco. `nuevo_episodio.py` y `esqueleto.py` lo copian e instalan solos. **No modifica el rig:** envuelve `figure()`.

| Herramienta | Para qué |
| --- | --- |
| `W('frase')`, `WE('frase')` | Inicio y fin de una frase (con VO). Si la frase no existe, truena |
| `B.bN` (de `beats.js`) | Inicio de cada beat del storyboard. Es el ancla por defecto de cada toma |
| 21 poses nuevas en `POSE` | `explain`, `think`, `shrug`, `offer`, `crossed`, `facepalm`, `wave`, `index`, `open`, `carry`, `slump`, `crouch`, `sitBack`, `sitLaugh`, `sitReach`, `cheerBent`, `cheerSit`, `headScratch`, `pockets`, `shy`, `neck` |
| Brazos sin rigidez (automático) | Todo brazo extendido al frente sin contacto se vuelve un gesto con codo flexionado y vaivén. Para desactivarlo: `raw: true` o una pose con `_ik` |
| `agarre(pose, o, 'F', [x, y])` / `armTo` | La mano llega al objeto con el codo doblado (IK de dos huesos) |
| `alcance(o, lado, objetivo)` | Mueve el cuerpo o inclina el torso si el objeto queda lejos; nunca brazo recto |
| `camara(ctx, t, t0, t1, {a, b, hh})` | La cámara aterriza de `a` a `b` durante el plano (`[cx, cy, zoom, rot°]`); `hh` = mano alzada sutil |
| `tono(ctx, 'frio' \| 'noche' \| 'calido' \| 'casa' \| 'oro' \| 'recuerdo' …)` | Paleta por escena: gris y frío para lo que pasó, cálido para lo que no pasó |
| `pozo(ctx, x, y, r)`, `velo`, `tinte`, `primerPlano`, `contacto` | Luz que dirige la mirada, profundidad y sombra de contacto |
| `sello(ctx, 'JUEVES · 18:40', t, t0, t1)` | Lugar y hora abajo a la izquierda (en vertical, arriba). **Nunca rótulos arriba** |
| `etiqueta(ctx, 'VACÍO', x, y, t, t0, {rosa, strike})`, `trazo()` | Gráficos diegéticos de marca |
| `habla(t, t0, t1)` | Boca abierta 0..1 mientras suena una palabra: `figure({…, mouth: habla(t, t0, t1)})` |
| `transicion(B.b30, 'dip' \| 'whip' \| 'dissolve', d)` | Fundido a negro para saltos de tiempo; whip con desenfoque real; disolvencia solo con cámaras alineadas |

Después de dibujar la escena, vuelve a la pantalla con `ctx.setTransform(1, 0, 0, 1, 0, 0)` y aplica `tono`, `pozo` y `sello`, que ya usan `BASE`.

## Storyboard y animatic automáticos

```powershell
python herramientas\esqueleto.py ep03          # beats de 2–5 s, B.bN, revision\storyboard.md, animatic
python herramientas\producir.py ep03 --animatic # 16:9 con la voz para aprobar el ritmo antes de animar
```

Cada beat sin toma propia muestra una tarjeta (texto, plano sugerido y tiempo). Cuando escribes `S(B.bN, …)`, esa tarjeta desaparece sola. Así el episodio siempre se puede ver completo y `probe`, `snap` y `render` funcionan desde el día 1.

## Cierre de marca

```js
S(T.cierre, (ctx, t) => { /* fondo oscuro */ endCard3(ctx, t, T.cierre, { next: '¿Y si …?' }); });
```

`endCard3` hace esta secuencia:

1. "¿Y si sí?" en serif itálica;
2. la línea se dibuja y se parte (de τ 1.15 a 2.05 s);
3. aparece el logotipo;
4. aparece el usuario;
5. opcionalmente, el próximo episodio.

## Revisar sin renderizar

```powershell
node herramientas\probe.mjs ep03              # todos los t cada 0.1 s: lista los que truenan
node herramientas\probe.mjs ep03 --v          # lo mismo en vertical (el encuadre vx puede romper cosas)
node herramientas\snap.mjs ep03 cuadros --hoja 4 [--v]
node herramientas\snap.mjs ep03 cuadros 12.5 47 63.2
```

Revisa las hojas buscando:

- textos encimados o tapados por los subtítulos;
- personajes que se atraviesan;
- encuadres verticales que dejan fuera la acción;
- acentos de color fuera de marca.

## Episodio nuevo

```powershell
.\.venv\Scripts\python herramientas\nuevo_episodio.py ep03-chicharito "¿Y si el Chicharito no se lesionaba?"
```

Copia el motor del ep. 02 y deja un `src/ep.js` inicial con título, anclas y cierre, más la estructura del expediente. Después:

1. Escribe el guion y genera la voz.
2. Corre `palabras_a_js.py`.
3. Escribe las tomas.
4. Ajusta las palabras de `KEY` en `main2.js`.
5. Reescribe las cues de `audio_episodio.py`.
