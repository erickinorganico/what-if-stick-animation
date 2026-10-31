# 06 · Fragmentos y distribución

## Estrategia

Copia lo que hace la competencia; lo revisamos el 25 de octubre de 2026 en IFOLOGY, Ifverse y Versión Extrema.

| Pieza | Formato | Dónde | Detalle |
| --- | --- | --- | --- |
| **Episodio completo** | 16:9 | YouTube | Es la pieza principal. Hoy dura unos 3 minutos; la meta es 6 a 10 |
| **2 Shorts** | 9:16, 20–35 s | YouTube Shorts | Avance con gancho y tarjeta "Mira cómo termina". Al subirlo se enlaza al largo con "Video relacionado" |
| **3 partes** | 9:16, 60–90 s | TikTok, Reels de Instagram y de Facebook | Etiqueta "PARTE N/3" y tarjeta "Continúa en la parte N". Al pasar de 1 minuto califican para recompensas de TikTok |
| **Película completa** | 16:9 | YouTube | Cuando haya 3 o 4 episodios, se juntan (como la "FULL MOVIE" de Ifverse) |
| **Secuela** | — | — | Al tema que más pegue se le hace parte 2 |

**Calendario por episodio:**

- **Día 1:** el largo en YouTube y la parte 1 en TikTok y Reels.
- **Día 2:** el Short 1 y la parte 2.
- **Día 3:** el Short 2 y la parte 3.

## Cómo elegir los cortes

- **Parte 1:** del gancho a la pregunta "¿y si sí?" y el arranque de la escalada. Debe terminar en suspenso, sin resolver.
- **Partes 2 y 3:** empiezan 2 o 3 s **antes** del final de la parte anterior para recordar dónde íbamos. Por eso hay traslapes (ep. 02: parte 2 desde 59.65 aunque la 1 acaba en 62.68).
- **Shorts:** el momento más compartible, solo, entendible sin contexto ("Míralo, mijo", "Corridos de ciencia y filosofía", "Taco al pastor con piña").
- **Corta en silencios.** Para encontrar el silencio exacto entre frases, usa `voz-palabras.json` o `transcribir.py buscar`.

## `clips.json`

```json
{
 "video": "render/ep02-mexico-campeon/v_raw.mp4",
 "clips": [
  {"nombre": "ep02-parte-1-de-3", "a": 0,      "e": 62.68,  "badge": "badge-1de3", "fin": "fin-parte2"},
  {"nombre": "ep02-parte-2-de-3", "a": 59.65,  "e": 144.45, "badge": "badge-2de3", "fin": "fin-parte3"},
  {"nombre": "ep02-parte-3-de-3", "a": 144.47, "e": 212.95, "badge": "badge-3de3", "fin": "fin-final"},
  {"nombre": "ep02-short-corridos", "a": 121.57, "e": 144.45, "fin": "fin-completo"}
 ]
}
```

```powershell
python herramientas\fragmentos.py episodios\ep02-mexico-campeon\clips.json --video render\ep02-mexico-campeon\v_raw.mp4 --audio render\ep02-mexico-campeon\mezcla.wav --salida videos\ep02-mexico-campeon\fragmentos [--force] [--solo ep02-short-corridos]
```

Cada fragmento lleva:

- la barra de progreso propia del fragmento, en hueso con punto rosa;
- la etiqueta "PARTE N/3" con su punto rosa;
- un congelado final de 1.8 s con la tarjeta (fundido de 0.25 s);
- un woosh y un pop.

Las tarjetas están en `herramientas/overlays/` y se regeneran con `overlays_fragmentos.mjs`:

- `fin-parte2`, `fin-parte3`: "Continúa en la parte N";
- `fin-final`: "¿Y tú qué harías? · COMÉNTALO · SÍGUENOS";
- `fin-completo`: "Mira cómo termina · VIDEO COMPLETO EN EL CANAL".

## Textos para publicar

Cada episodio tiene su `copys/copys.md` con:

- título, descripción con capítulos y etiquetas del largo;
- texto por fragmento y por red;
- comentario fijado;
- qué portada va con cada pieza.

Reglas (skill `copy-redes-ai-lab`):

- **Pregunta para comentar** en cada texto ("¿Dónde estabas tú en 2014? Te leo"). Invitación a **seguir** en las partes.
- **De 3 a 5 hashtags:** el del tema (#noerapenal, #mundial2026), #elhubiera y #ysisi.
- **Shorts:** `#shorts` y "Video relacionado" al largo.
- **Lo real y lo inventado** en la descripción del largo, y la nota de que es una historia ficticia hecha con IA.

## Portadas

En `videos/<slug>/portadas/` y en `marca/identidad-v3/miniaturas/`:

- **Miniatura A y B** (1280×720 en JPG para subir; 1920×1080 en PNG): para "Probar y comparar" de YouTube.
- **Portada vertical** (1080×1920): para Reels y TikTok y para las partes.
- **Regla:** remate de 1 a 3 palabras en serif itálica que termina en punto rosa, más la fecha del punto de quiebre en mono. Ejemplos: "No era." / "Míralo, mijo." / "Con piña." / "Ya ganamos.".
- **Siempre se adjunta la portada al subir.**

## Publicar (solo con aprobación)

1. **Aprobación explícita** del usuario: archivo, texto, portada, red, fecha y hora (America/Tijuana).
2. **Revisar lo ya programado o publicado** en cada red para no duplicar. Skill `publicar-redes-ai-lab`: Meta Business Suite para Instagram y Facebook, TikTok Studio y YouTube Studio.
3. **Programar en cada red por separado** y anotar el ID de cada programación en el registro.
4. **Cómo subir desde Claude** (trozos, ayudantes JS, programar): [11 · Publicar con Claude](11-publicar-con-claude.md). Recibos en `publicacion/`.
5. **A las 24–72 h,** medir vistas, retención y comentarios (Windsor o YouTube Studio) y decidir la secuela.
