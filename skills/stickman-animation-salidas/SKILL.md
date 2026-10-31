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

- Remate de 1–3 palabras en serif itálica que termina en punto rosa.
- Fecha o punto de quiebre en Geist Mono.
- Personaje grande (30–50 %) con expresión fuerte y el objeto de la premisa; fondo oscuro con brillo.
- **Revisa:** la etiqueta mono no tapa caras ni props legibles; la tarjeta final no choca con un título grande; el título del vertical no toca el badge PARTE N/3 (x 849–1026, y 148–169).

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