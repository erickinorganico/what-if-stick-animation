# 13 · Dirección: cómo se ve y se siente un episodio

Este documento sale de lo que funcionó y lo que falló en los eps. 01–02 y en el R4 de «¿Y si México acabara con el narco?». Las herramientas están en [03 · Motor](03-motor.md#kit-de-dirección-srcdireccionjs-y-srctransicionesjs) y el flujo rápido en [12](12-produccion-eficiente.md).

## Antes de animar: storyboard y animatic

1. Corre `esqueleto.py`. Te da beats de 2–5 s (un cambio visual cada 3–5 s) y un plano sugerido para variar.
2. En `revision/storyboard.md`, llena por beat:
   - **lugar y hora**;
   - **plano** (general, medio, cercano, inserto, sobre el hombro, cenital, POV);
   - **qué hace el personaje**: una acción con verbo, no "está parado";
   - **luz y tono** (frío o cálido);
   - **sonido** de la acción.
3. Saca `producir.py <ep> --animatic` y revisa el ritmo con la voz antes de dibujar.

## Actuación (lo que más se nota)

- **Nadie posa mientras habla el narrador.** Cada personaje hace algo: cuenta billetes, acomoda refrescos, voltea, se rasca la nuca. Usa las poses del kit (`explain`, `think`, `shrug`, `offer`, `crossed`, `facepalm`, `headScratch`, `sitLaugh`…).
- **Nunca brazos rígidos.** El kit los relaja solo. Para tocar un objeto, usa `agarre()` (IK con el codo doblado); si queda lejos, `alcance()` mueve el cuerpo. `POSE.point` es solo para señalar algo de verdad.
- **Anticipación, acción y asentamiento** en todo gesto: antes de levantar algo se baja un poco; después de un golpe, rebota y se queda quieto.
- **Reacciones:** después de una frase con peso, dale 0.5–1 s a una cara (`sad`, `tender`, `shock`) antes de cortar.
- **Diálogo dentro de la narración** («Luego vemos, mijo»): el personaje mueve la boca con `habla()` solo en esa frase. En frases tristes no uses boca de sonrisa; mejor un asentimiento.
- **Nada congelado:** `qa_render.py` marca cualquier tramo de ≥ 0.4 s sin cambio. Si es a propósito (título), anótalo en `--ignorar`.

## Cámara y encuadre

- **Cada plano tiene su encuadre y su movimiento** (`camara(ctx, t, t0, t1, {a, b})`). La cámara aterriza; no rebota ni hace zoom de golpe más de 1–2 veces por episodio.
- **Varía:** de general a medio, cercano e inserto. El R3 falló por repetir la misma vista frontal de la tienda en 10 planos.
- **Planos que suben la calidad:**
  - sobre el hombro;
  - cenital tipo CCTV;
  - inserto macro del objeto clave (el sobre, el reloj);
  - grúa hacia atrás para "a otra escala";
  - travelling de establecimiento.
- **Rimas visuales:** repite un encuadre en el acto II para que el cambio se note (la misma esquina a los 12 y a los 22 años; la cortina que baja de noche y la que sube de día).
- **Vertical:** cada toma lleva su `vx` (centro del encuadre 9:16) en el personaje o el objeto que importa. Revisa con `snap.mjs --v`.

## Luz y color: la bifurcación también es de temperatura

- **Lo que pasó:** frío, una sola luz práctica y un pozo de luz sobre la atención (`tono(ctx, 'frio' | 'noche')`, `pozo()`).
- **Lo que no pasó:** cálido, luz de mañana o de lámpara de casa, dorado al aire libre (`'calido' | 'casa' | 'oro'`).
- **Recuerdos:** desaturados (`'recuerdo'`), con fundido de entrada y salida de 0.3 s; nunca corte seco.
- **Profundidad:** `primerPlano()` (silueta desenfocada al borde), `contacto()` (sombra de pies) y `velo()` para atenuar el fondo.

## Gráficos integrados (marca v3)

- **Nunca rótulos arriba** («ESCENARIO HIPOTÉTICO», «REALIDAD ALTERNATIVA»). Los subtítulos van abajo.
- **Sellos de lugar y hora** en Geist Mono, abajo a la izquierda (`sello()`): «JUEVES · 18:40», «MESES DESPUÉS».
- **Etiquetas diegéticas** con línea guía (`etiqueta()`): gris es lo que pasó y rosa lo que no pasó. `strike` tacha en la palabra exacta, como PROVEEDOR y RENTA.
- **La línea de la marca** (`trazo()`) resuelve las ideas abstractas: recto y gris, y una rama rosa que sube (economía, inversión). Nada de cajas genéricas de "INVERSIÓN · EMPLEO", ni rayos, ni confeti.
- **Un solo acento rosa por cuadro.**

## Transiciones

- **El corte seco es la norma.** Usa una transición por cada 8–10 cortes, y solo con razón:
  - `dip` (fundido a negro): salto de tiempo («Pasan los meses», «Tienes veintidós»);
  - `whip`: cambio de lugar con energía (tienda → casa → playa);
  - `dissolve`: solo entre encuadres alineados (mismo centro y escala). Si no están alineados, corta en seco.
- **Problemas que ya pasaron:**
  - whip con copias fantasma (se leía como "bajos FPS");
  - disolvencia entre dos globos desalineados;
  - un recuerdo con corte seco.

## Sonido por acción

Cada acción visible lleva su efecto: trapo, botella, billetes, cortina, pasos, balón en la red. Agrégale un ambiente por lugar (grillos, pájaros, olas, coches). La música va por cue de bloque:

| Momento | Música |
| --- | --- |
| Lo que pasó | Menor y oscura |
| La subida | Pulso que sube |
| «¿Y si sí?» | Golpe |
| Lo que no pasó | Mayor y cálida |
| Cierre | Golpe final |

La voz siempre manda: sidechain fuerte y cama a 0.24/0.45.

## Antes de entregar

- [ ] `probe.mjs` en 16:9 y 9:16, con 0 errores.
- [ ] Hojas de `snap.mjs` en los dos formatos: brazos, caras, encimados y `vx`.
- [ ] `qa_render.py` sin congelados, destellos ni negros largos que no sean a propósito, y la voz a ±40 ms.
- [ ] Escucha completa con audífonos (la revisión técnica no la sustituye).
- [ ] No afirmes haber visto o escuchado lo que no revisaste.
