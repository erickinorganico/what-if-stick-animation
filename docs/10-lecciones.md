# 10 · Lecciones aprendidas

Cosas que ya pasaron con los eps. 01 y 02 y cómo se evitan.

## Voz y créditos

- **Se pagó la voz dos veces** (24 oct: unos 870 créditos en vez de 435) porque dos sesiones generaron la misma locución. Desde entonces existen el candado y el manifiesto (skill `voz-elevenlabs`), y siempre se pide `generations_count = 1`.
- **El conector genera 2 tomas por defecto.** Hay que pedir 1 de forma explícita.
- **Para cambiar 6 líneas no se regenera todo:** se empalman en la toma aprobada (`empalme_v2.py`). Costó 1,126 créditos en vez de unos 3,100.

## Render

- **Los reinicios del contenedor mataban renders largos.** Por eso el render es por bloques con escritura atómica y se reanuda corriendo el mismo comando.
- **Sobrescribir `v_raw.mp4` mientras `fragmentos` lo leía** dio "moov atom not found". El concat ahora escribe a `.tmp` y renombra. Nunca regeneres un crudo mientras otro proceso lo usa.
- **Un error de JS a la mitad del episodio** se descubre tarde si no corres `probe.mjs` antes. Córrelo siempre en los dos formatos: el encuadre vertical (`vx`) rompe cosas que en 16:9 no fallan.
- **Las fuentes nuevas no se habían cargado** al primer cuadro. `main2.js` espera `document.fonts.load(...)` antes de marcar `READY`.

## Audio

- **"Los efectos tapan al narrador."** La solución fue un sidechain fuerte (ratio 10), la cama a 0.24/0.45 y bajar el cue culpable en el script, no subir la voz.
- **El "¡Ay, mamá!" genérico de ElevenLabs no convencía.** Se rescató del clip del usuario con MDX-Net, al mismo nivel RMS que el original. Es un riesgo de Content ID; queda anotado.

## Marca

- **v1 "sosa":** personaje chico, frases descriptivas y verde sobre verde.
- **v2 "no adecuada":** rosa con rayos, confeti y Anton con contorno; se veía a plantilla.
- **v3 aprobada:** un solo concepto (la bifurcación), vacío, un acento y serif itálica. Lo que la hizo funcionar fue quitar, no agregar.
- **El lockup se encimaba** porque la palabra heredaba la alineación. Ahora se fuerza `align: 'left'` dentro de `lockup3`.
- **La fecha tapaba el remate** en las miniaturas. La fecha va arriba, en mono pequeña.

## Puente a la PC

- **El límite del puente es de 30 MB por archivo** (100 MB y 50 archivos por llamada), pero desde la carpeta de salidas solo pasan directo los archivos de menos de ~25 MB. Con 27–29 MB da error 400 y hay que usar SendUserFile + `fileUuid`. Por eso los completos van en partes de 20 MB (`partes.py`) y los fragmentos grandes se recomprimen solos.
- **Desde la nube de Cowork no hay HuggingFace ni googleapis.** Los modelos vienen de los releases de GitHub.

## Proceso

- **No se publica sin aprobación.** Antes de programar, se revisa lo ya programado para no duplicar.
- **CTA de comentar y seguir** en todo, y la portada siempre adjunta al subir.
- **No uses `pkill -f`** con un patrón que también aparezca en tu propio comando: te matas solo.

## Publicación (25 oct 2026)

- **Claude in Chrome sube como máximo 10 MB por lote.** Los videos van en trozos de 9.4 MB con cabecera; la página los rearma y el SHA-256 confirma que llegaron idénticos (`trocear.py` + `subida_youtube.js`).
- **vidIQ bloquea la extensión** ("Cannot access a chrome-extension:// URL") cuando inserta su iframe en Studio, y la pestaña ya no se recupera. Hay que prevenirlo: pestaña nueva, navegar y, en el mismo lote, un `MutationObserver` que borre iframes `chrome-extension://` (código en docs/11). Si ya pasó, abre el borrador en otra pestaña (`/video/<ID>/edit` → "Editar borrador"); lo que se llenó se conserva.
- **A/B de miniaturas e idioma de playlist** piden la verificación de funciones avanzadas, distinta de la del teléfono.
- **En el programador de YouTube la hora no se escribe:** se elige de la lista. La zona va en "(GMT-07:00) Tijuana".
- **Sin verificar el teléfono no hay miniaturas personalizadas,** ni A/B ni idioma de playlist. Hay que pedirle al usuario que verifique antes de subir.
- **Antes de programar en otras redes,** confirma que la cuenta exista y tenga sesión. El 25 oct no existía TikTok de El Hubiera y Brave no tenía sesión de Instagram.
