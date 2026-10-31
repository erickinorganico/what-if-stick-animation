# 11 · Publicar con Claude (YouTube, TikTok, Instagram y Facebook)

Ruta probada el 25 de octubre de 2026 para el lanzamiento de Ep. 01 y Ep. 02. Claude sube y programa desde **Claude in Chrome**, en el Brave donde está la sesión de El Hubiera, sin tomar el control de la PC. Solo con aprobación explícita y después de revisar lo ya programado (ver [06](06-fragmentos-y-distribucion.md)).

## Por qué en trozos

- `file_upload` de Claude in Chrome acepta **10 MB por llamada** (sumando todo el lote).
- La carpeta de salidas de Cowork puede inyectar metadatos en archivos de medios. Por eso cada trozo lleva la cabecera `ELHUBIERA-CHUNK\n` y no es un `.mp4`.
- La página rearma el archivo en memoria y se lo entrega al input de YouTube, y el SHA-256 confirma que llegó idéntico.

## YouTube Studio

1. **Trocear** (en la nube de Cowork, desde los videos del repo):

   ```bash
   python herramientas/trocear.py videos/ep02-mexico-campeon/elhubiera-ep02-mexico-campeon-16x9.mp4 /mnt/user-data/outputs/subida/ep02-largo
   ```

2. **Ayudantes:** en Studio > Contenido, pega [`herramientas/subida_youtube.js`](../herramientas/subida_youtube.js) con `javascript_tool`. Vuelve a pegarlo después de cada navegación.
3. **Trozos:** busca con `find` el input "cc chunk receptor". En **un lote por trozo**, haz `file_upload` de `cNN.bin` y luego `await __ccRead()`.
4. **Verifica:** `await __ccSha16()` debe coincidir con los primeros 16 caracteres que imprimió `trocear.py`.
5. **Sube:** Crear > Subir videos > `__ccInject('nombre.mp4')`. La página se congela de 30 a 90 s; espera (`sleep` en Bash) y reintenta.
6. **Detalles:** `__llenar(titulo, descripcion)` llena el título y la descripción de `copys/copys.md` y marca los radios. Para las etiquetas, `__tagsFocus()` da la coordenada; haz clic ahí y escribe las etiquetas separadas por comas, con una coma al final.
7. **Siguiente ×3.** En Verificaciones, revisa que diga "No se encontraron problemas"; si hay reclamo de Content ID, detente y avisa.
8. **Programar:**
   - Expande "Programar".
   - **Fecha:** abre el calendario y haz clic en el día.
   - **Zona horaria:** "(GMT-07:00) Tijuana", con `find`.
   - **Hora:** abre la lista y elige la opción ("1:00 p.m."). Escribirla no funciona.
   - Verifica con un `zoom` y pulsa Programar.
9. **Anota** el vínculo del diálogo "Se programó el video" en el recibo.

### Si la extensión deja de responder

> "Cannot access a chrome-extension:// URL of different extension"

Pasa cuando otra extensión (vidIQ) mete un marco en el diálogo de subida. `javascript_tool`, los clics y las capturas dejan de funcionar en esa pestaña; `find`, `read_page` y `get_page_text` siguen sirviendo.

**Prevención (la que funciona):** en una pestaña nueva, navega y, **en el mismo lote, sin esperar**, ejecuta un `MutationObserver` que borre todo `iframe` con `src` `chrome-extension://` antes de que vidIQ lo inserte:

```js
(() => { const kill = n => { if (n.tagName === 'IFRAME' && /^chrome-extension:/.test(n.src || '')) { n.remove(); return 1; } let c = 0; n.querySelectorAll?.('iframe').forEach(f => { if (/^chrome-extension:/.test(f.src || '')) { f.remove(); c++; } }); return c; };
  let r = kill(document.documentElement);
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) r += kill(n); }))).observe(document.documentElement, { childList: true, subtree: true });
  window.__extRemoved = () => r; return 'ok'; })()
```

Con eso la pestaña sigue respondiendo. Si llegas tarde, esa pestaña ya no se recupera, ni navegando:

1. Con `find`, lee el vínculo del video (`youtu.be/…` o `shorts/…`) y espera a "Se completó la carga del video". Lo que ya se haya llenado con `__llenar` se guarda en el borrador.
2. Abre una pestaña nueva con el observador de arriba en `studio.youtube.com/video/<ID>/edit` y pulsa "Editar borrador". Ahí continúas con los radios, las etiquetas y la programación.
3. La pestaña vieja queda con el diálogo nativo "¿Salir del sitio?". No la navegues: déjala o pide al usuario que la cierre.

`find`, `read_page`, `get_page_text` y `file_upload` funcionan aunque la pestaña esté bloqueada. El uso de computadora no sirve de respaldo: en navegadores solo da permiso de lectura.

### Miniaturas y verificaciones

- **Miniatura personalizada:** requiere el teléfono verificado (youtube.com/verify); el usuario lo hace, Claude no escribe códigos. Con `find` localiza `#file-loader` (input `image/jpeg,image/png`), haz `file_upload` de la JPG de 1280×720 y pulsa **Guardar**.
- **Pruebas A/B ("Probar y comparar"):** con miniatura ya puesta, el acceso es Opciones (⋮ de la miniatura) > Pruebas A/B, y el menú corta las últimas opciones, así que hazlo con JS. Además pide la **verificación de funciones avanzadas**, aparte de la del teléfono. Si aparece "Se requiere una verificación única", cancela y avísale al usuario.
- **Idioma de una playlist:** también pide la verificación avanzada. Crea la playlist sin idioma.
- **Shorts:** su portada no se cambia desde la web.
- **El botón "Editar" junto a la miniatura es de vidIQ** (editor con IA), no de YouTube. Ciérralo con la X.

## TikTok, Instagram y Facebook

Se sigue la skill `publicar-redes-ai-lab` (TikTok Studio con Programación y Meta Business Suite con "Crear reel" para FB + IG), con dos cambios:

- **Las cuentas son las de El Hubiera,** no las de AI Lab School. Antes de subir, confirma en pantalla el nombre de la cuenta activa.
- **Los fragmentos pasan de 10 MB.** Usa el mismo método de trozos: el receptor `cc-chunk`, `__ccRead` y `DataTransfer` sobre el input `type=file` del compositor, interceptado con `HTMLInputElement.prototype.click`.

Los textos por red están en `episodios/<slug>/copys/copys.md`, y la portada vertical va siempre adjunta. Hora: 19:00 Tijuana.

Claude no inicia sesión ni crea cuentas: el usuario deja la sesión abierta en Brave.

## Después

- Llena el recibo en `publicacion/` con el vínculo, la fecha y el estado por destino.
- Actualiza `estado` y `publicacion` en `episodio.json` y la tabla del `README.md`.
- A la hora de publicación: fija el comentario de `copys.md` y verifica que el video salió.
