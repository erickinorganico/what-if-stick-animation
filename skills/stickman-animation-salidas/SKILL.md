---
name: "stickman-animation-salidas"
description: "Úsala cuando un video de animación stickman 2D (El Hubiera y similares) ya tiene su 16:9 aprobado y hay que sacar vertical, 3 partes + 2 Shorts, miniaturas A/B, portadas verticales, copys y QA sin re-animar."
---

# Stickman animation · salidas de un episodio

No toques guion, voz ni animación. Todo sale del mismo motor y del mismo tiempo.

## A. Episodio del repo `el-hubiera` (motor con `?v=1`)

1. **Cortes:**

   ```bash
   python herramientas/cortes.py <ep> --claves palabra1,palabra2 [--fin-util SEG]
   ```

   - La parte 1 termina justo antes del gancho «¿Y si sí?» si cae entre 45 y 95 s; si no, en el tercio.
   - Las demás partes van en silencios de fin de oración, con 1.5–3.5 s de traslape.
   - Da 6 candidatos de Short (18–33 s, oraciones completas).
   - En ep02 sugirió partes de 60–90 s y Shorts en las mismas zonas que eligió una persona.
   - **Tú eliges los 2 Shorts:** el momento más compartible y entendible sin contexto. Después corre `--escribir` y renómbralos por tema.

2. **Fragmentos:** `python herramientas/producir.py <ep> --pasos fragmentos,qa`. Usa `fragmentos.py` v2, en paralelo e idéntico píxel a píxel; `--calidad` da archivos ~20 % más chicos.

3. **Portadas:** con el generador de `marca/generador/` (miniatura A y B a 1280×720 JPG + 1920 PNG, portada vertical 1080×1920 y una por fragmento). Busca candidatos con `snap.mjs <ep> cand --hoja 10` usando `?noui=1`.

## B. Proyecto fuera del repo (p. ej. el R4 del narco)

```bash
python herramientas/salidas.py salidas.json --pasos cortes,candidatos   # sugerencias en segundos
python herramientas/salidas.py salidas.json                              # todo (~11 min medidos con 2 núcleos)
```

- Los pasos son `mezcla`, `vertical`, `cortes`, `fragmentos`, `candidatos`, `portadas`, `qa` y `copys`, y anotan `tiempos.json`. El ejemplo y la evidencia están en `BUILD\por-validar\narco-v6-muestra-v1-20261028\completo-v6\r4\` (`salidas.json`, `DEMO-PIPELINE.md`).
- **Vertical:** `main-vertical.js` toma una ventana de 720×804 que sigue el `att` de cada toma (×1.5). El título va arriba, los subtítulos grandes abajo, y debajo de y 1650 queda negro para la barra.
- **Portadas:** `thumbs.html` + `portada(spec)` desde JSON (`escena:[t,cx,cy,s,px,py]`, `split` con `gris`, `remate`, `tag`).

## Reglas de portada (canal)

Aplicar [miniaturas-el-hubiera](../miniaturas-el-hubiera/SKILL.md), adaptada de miniaturas-pi por solicitud de Erick el 1/nov/2026. Esa guía sustituye la receta fija de personaje grande, expresión fuerte y fondo oscuro con brillo.

- Una relación narrativa visible y propia por fragmento; no repetir cuadro/layout cambiando sólo título o número.
- Conservar stickman, paleta y fuentes vigentes; texto complementario normalmente de 0–4 palabras. Serif itálica/punto rosa como recursos, sin sacrificar lectura móvil.
- Los generadores y cuadros reales son herramientas de ejecución, no conceptos aprobados. Recomponer horizontal/vertical según la idea y revisar la hoja de serie a 168 px de ancho.
- Revisión esencial y correcciones sólo donde fallen: legibilidad, recortes, identidad, coherencia con el fragmento y diferenciación. Versionar propuestas, conservar anteriores y registrar aprobación por archivo.

## Copys (`copys/copys.md`, skill `copy-redes-ai-lab`)

- **Largo:** 2–3 títulos para probar con A/B; descripción con capítulos (los tiempos salen de `copys-base.md` o de los beats); **lo real y lo inventado**; nota de historia ficticia hecha con IA; etiquetas y comentario fijado.
- **Partes:** gancho, «Parte N/3», pregunta para comentar e invitación a seguir.
- **Shorts:** `#shorts` y «Video relacionado».
- 3–5 hashtags (`#elhubiera #ysisi` + tema), la tabla de portada por pieza y el calendario de 3 días.

## QA y entrega

- Por fragmento: −14 ±0.6 LUFS, pico ≤ −1, ≤ 25 MB y Shorts ≤ 35 s con el congelado.
- Hoja con el cuadro a 3 s y el último cuadro de cada pieza: míralas.
- Si el largo pasa de ~4:30, las partes duran más de 90 s: avísalo y ofrece 4 partes.
- Entrega `fragmentos/`, `portadas/`, `copys/` y la evidencia (`tiempos.json`, `qa.json`, hojas). Responde con las rutas.
- **No publiques ni programes** sin aprobación explícita.
## Portadas desde cuadros reales y partes N/5 (ep06 R2, 31 oct 2026)

- **5 partes:** `overlays_fragmentos.mjs <ep> <dir_temporal>` genera `badge-NdeM` y `fin-parteN`. Copia sólo las que falten a `herramientas/overlays/`, sin sobrescribir las existentes.
- **Shorts ≤ 35 s:** revisa los `clips.json` heredados. En ep06 el Short de Taco Bell venía de 44.5 s y se recortó a 29.8 s, entre oraciones completas.
- **Portadas sin generador nuevo:**
  1. Corre `node portadas_r2.mjs <ep> <salida> portadas.json`. Toma el cuadro limpio (`?noui=1`) y apaga los sellos de escena.
  2. En vertical, amplía la ventana de escena a pantalla completa.
  3. Compón texto y marca según miniaturas-el-hubiera; no impongas el mismo remate/layout a todos los clips.
  4. Usa `top` para mover marca y etiqueta si chocan con un letrero.
  5. Revisa la hoja de todas las portadas en una sola imagen.
  6. Corrige sólo las que fallen: en ep06 se rehicieron 3 de 11, por texto cortado, un personaje fuera de cuadro y un letrero sobre la marca.
