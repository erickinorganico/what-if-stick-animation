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
