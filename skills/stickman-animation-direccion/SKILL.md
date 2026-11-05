---
name: "stickman-animation-direccion"
description: "Úsala al escribir o corregir las tomas de un video de animación stickman 2D por código (canal El Hubiera y similares): storyboard, actuación, cámara, luz, gráficos, transiciones y sonido por acción con el kit."
---

# Stickman animation · dirección de tomas

El trabajo grueso de un episodio son las tomas: ~100 por cada 5–6 min. Esta skill hace que salgan bien a la primera y rápido. La guía completa está en `docs/13-direccion.md` del repo `el-hubiera`, y la API del kit en `docs/03-motor.md` (kit de dirección).

## Ciclo de trabajo (por bloques de 8–12 beats)

1. **Esqueleto (una vez):** corre `python herramientas/esqueleto.py <ep>`. Te da beats de 2–5 s con anclas `B.bN`, `revision/storyboard.md`, el animatic y el kit instalado.
2. **Storyboard del bloque:** por beat anota lugar y hora, plano, acción (con verbo), luz (frío = lo que pasó; cálido = lo que no pasó) y sonido. Varía los planos y busca rimas visuales con otros actos.
3. **Escribe las tomas:** `S(B.bN, (ctx, t) => { … }, vx)` en `src/ep.js` (o en archivos por acto). Cada toma que escribes reemplaza la tarjeta del animatic.
4. **Revisa sin render:**
   - `node herramientas/probe.mjs <ep>` y `--v`: 0 errores.
   - `node herramientas/snap.mjs <ep> rev <t…>` y `--v`: mira las hojas de verdad, no las supongas.
5. **Corrige y sigue con el siguiente bloque.** Al terminar el acto, corre `producir.py <ep> --prueba 20` o el animatic para ver el ritmo con voz.

Para el siguiente bloque, delega tareas mecánicas (probe, snap, medir) en subagentes de menor razonamiento. La dirección no se delega.

## Plantilla de toma con el kit

```js
S(B.b10, (ctx, t) => {                                   // «Tu papá lo prepara los jueves.»
  const t0 = B.b10, t1 = B.b11;
  camara(ctx, t, t0, t1, { a: [980, 600, 1.0], b: [960, 585, 1.08] });   // la cámara aterriza
  drawRoom(ctx, t);                                                        // fondo (room/env2/pitch o el tuyo)
  const o = { x: 860, y: 900, s: 1.55, dir: 1, t, seed: 7, shirt: '#3a5bd0' };
  const mano = [lerp(1030, 1060, ease(t, t0 + .3, t0 + 1.4)), 742];      // la acción tiene recorrido
  figure(ctx, { ...o, pose: agarre({ ...POSE.stand, lean: 9, head: 12 }, o, 'F', mano), face: 'sad', look: [3, 6] });
  contacto(ctx, 860, 905, 90);
  ctx.setTransform(1, 0, 0, 1, 0, 0);                                      // de aquí en adelante, pantalla
  tono(ctx, 'frio'); pozo(ctx, 960, 620, 430, .45); sello(ctx, 'JUEVES · 18:40', t, t0 + .2, t1);
}, 940);                                                                   // vx: centro del encuadre vertical
transicion(B.b30, 'dip', .7);                                              // solo saltos de tiempo o lugar
```

## Reglas que más se notan

- **Nadie posa mientras habla el narrador:** cada personaje hace algo. Usa las 21 poses del kit (`explain`, `think`, `shrug`, `offer`, `crossed`, `facepalm`, `headScratch`, `sitLaugh`…).
- **Brazos:** el kit relaja solo los extendidos. Para tocar algo usa `agarre()` (codo doblado); si el objeto queda lejos, `alcance()`. Nunca `POSE.point` como pose genérica.
- **Gag y reacción:** si el guion trae un chiste visual, anímalo antes de que la voz lo diga y deja la reacción (0.5–1 s) antes de explicarlo. Un beat sin acción que se pueda dibujar es señal de que el guion está en adjetivos: avísalo, no lo rellenes con poses.
- **Actuación:** anticipación, acción y asentamiento. Deja 0.5–1 s de reacción tras una frase con peso. En diálogo usa la boca con `habla(t, t0, t1)`; en una frase triste, asentimiento en vez de boca sonriente.
- **Cámara:** un encuadre y un movimiento propios por plano. Varía general, medio, cercano, inserto, sobre el hombro y cenital. Zoom de golpe como máximo 1–2 por episodio.
- **Color y marca:**
  - Frío y pozo de luz para lo que pasó; cálido para lo que no pasó.
  - Recuerdos desaturados con fundidos de 0.3 s.
  - Un acento rosa por cuadro; sin rayos ni confeti.
  - **Nunca rótulos arriba.** Usa sellos mono abajo a la izquierda (en vertical, arriba) y etiquetas diegéticas (gris = pasó, rosa = no pasó, `strike` en la palabra exacta).
- **Transiciones:** el corte seco es la norma.
  - `dip` para saltos de tiempo.
  - `whip` para cambio de lugar con energía.
  - `dissolve` solo con encuadres alineados.
  - Una por cada 8–10 cortes.
- **Composición:** dos personajes nunca se cruzan (corta a contraplano) y una idea por toma. El `vx` va en lo que importa.
- **Sonido:** un efecto por acción visible y un ambiente por lugar, en el script de audio, anclados a `timeline.json`.

## Errores que ya pasaron (no los repitas)

- **Brazos:** brazos rectos al frente en 30 planos; IK estirado al 100 %.
- **Cámara:** la misma vista frontal de la tienda en 10 planos.
- **Transiciones:** whip con copias fantasma (se leyó como "bajos FPS"); disolvencia entre globos desalineados; recuerdo con corte seco; iris que no revelaba nada (el exterior cambió de color al mismo tiempo).
- **Animación congelada:** un brazo arriba congelado; una pierna arriba congelada; un cierre 100 % estático; gráficas sin animación secundaria (el QA de ep02 encontró 25 tramos quietos).
- **Parpadeos:** luces estroboscópicas (el neón de ep02 dio 8 destellos de un cuadro). Usa parpadeo con ruido suave.

## Antes de dar las tomas por buenas

`producir.py <ep> --prueba 20` o el render, y luego `qa_render.py`: 0 congelados no intencionales, 0 destellos de un cuadro y la voz a ±40 ms. Revisa las hojas de cuadros en los dos formatos. No afirmes haber visto lo que no revisaste.
## Trampas del motor (aprendidas en ep04, 29 oct 2026)

- **`W` es el ancho del lienzo** (`const W = 1920` en `core.js`). La función de anclas del kit vive en `window.W`: en el archivo de tomas define `const Wd = window.W;` y ancla con `Wd('frase')`. `WE()` ya usa `window.W` (corregido en el kit).
- **`hop()` devuelve un objeto** `{ y, sq, crouch }`: usa `hop(...).y` para `jump`. Si pasas el objeto, la figura desaparece (NaN) sin error en `probe`.
- **Frases repetidas** («¿Y si sí?», «Real Madrid», «diecisiete»): ancla con `Wd('frase', B.bN)` o con una frase más larga; si no, toma la primera aparición.
- **Bordes del mundo:** con zoom `z`, mantén el centro de cámara entre `960/z` y `1920 − 960/z`; si no, aparece una franja negra (pasó en dos planos).
- **Vallas LED de `pitchLevel`:** pon `window.BOARD = 'MUNDIAL'` (o el texto del lugar) antes de dibujar; por defecto dicen «BRASIL 2014».
- **Gráficos de pantalla completa en vertical** (bifurcación, tablas): usa coordenadas distintas con `V ? … : …`; la ventana vertical solo ve ~800 px del mundo.
- **`postGoalPOV` es del ep02** y no se copia a episodios nuevos; usa `goalPOV` o `penaltyPOV` (de `shots2`/`shots3a`).
- **Personajes reales:** silueta stickman con el número y su celebración; sin frases atribuidas, sin rostro ni fotos.
- **Revisión por hojas:** `snap.mjs` con 12–30 tiempos y una hoja en mosaico (16:9 y `--v`) detectó en ep04 personajes que se cruzaban, franjas negras, el trofeo tapando la cara y una figura invisible.

## Corrección de un episodio existente con contexto mínimo (aprendido en ep06 R2, 31 oct 2026)

- **No leas los archivos de tomas completos para orientarte.** Primero `node herramientas/planos_r2.mjs <ep>`: una línea por plano con inicio, duración y el texto de voz que cae en él. Lee sólo el bloque `sh(N, …)` que vas a cambiar.
- **API de utilería sin leer los entornos:** lista firmas con una sola línea de node (regex sobre `function nombre(args)`) en vez de abrir `mx-env.js`, `cr-env.js`, `char.js` completos. Abre una función sólo si vas a usarla con parámetros nuevos.
- **Revisión sin render:** `node herramientas/hoja_r2.mjs <ep> <dir> --planos A-B --por 3` arma en el navegador una hoja en mosaico (inicio, medio y fin de cada plano). 92 planos = 12 hojas en 16:9 y 8 en 9:16. Mira primero la hoja de los planos tocados; la hoja completa sólo una vez al final.
- **Parche por plano, no reescritura:** escribe sólo los planos nuevos (y, al inicio, los ayudantes que necesiten) y aplica `node herramientas/parche_planos.cjs <base.js> <nuevos.js> <salida.js>`. Conserva todo lo que no reemplaza. Falla sin escribir si un plano está repetido o no existe, si un bloque no cierra, si el resultado no compila o si la salida ya existe. Conserva la versión anterior en `src/v1/`.
- **Kit R2 (`kit-r2.js`), opt-in por episodio.** Sin `window.KIT_R2` no redefine nada (probado: 30/30 cuadros idénticos en ep04 16:9 y 9:16). Actívalo sólo en episodios nuevos o abiertos con `<script>window.KIT_R2 = { camara: true, deriva: true }</script>` antes de cargarlo. Nunca en episodios cerrados. Evita tres fallos que antes sólo se veían a ojo:
  - `cam()` acotado: con zoom `z ≥ 1` el centro queda entre `960/z` y `1920 − 960/z` (sin franjas negras laterales).
  - `fondoVivo()`: gráficos con deriva lenta que sobrevive a `ui()`/`uiCenter()`. En ep06 bajó los congelados del crudo 16:9 de 22 a 2.
  - `tramo()`/`camTramos()`: planos de más de 5 s con un corte interno anclado a una palabra (`Wd('frase', t0)`).
- **Trampas nuevas del motor:**
  - `layer(clave, …)` cachea por clave: nunca la llames con una clave existente y una función vacía (deja el fondo en blanco).
  - Los ayudantes de personaje (`funcionario`, `chuy`, `dr`…) son `(ctx, o)`; un envoltorio que olvide `ctx` truena con `ctx.save is not a function`.
  - `ui()`/`uiCenter()` hacen `setTransform`: cualquier transformación previa se pierde.
  - Personajes secundarios con lentes y bigote se confunden con el Dr.: usa lentes **o** bigote, nunca los dos, fuera de los planos del Dr.
- **Vertical:** después de cada bloque, una hoja `--v` de los gráficos a pantalla completa. En ep06 fallaron sólo los gráficos anchos (tríptico, contador que viaja, letreros a la derecha). Arréglalos con `vfit(ctx, V ? .42 : .6)` o con un `vx` por tramo.
