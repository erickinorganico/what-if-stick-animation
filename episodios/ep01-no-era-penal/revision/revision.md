# YSS-20261024-01 · ¿Y si NO hubiera sido penal? — Revisión v1 (prueba del sistema)

**Canal:** ¿Y si sí? · **Formato:** 16:9 1920×1080, 30 fps, ~3:01, cinemascope (barras 2.39:1) con subtítulos en la barra inferior.
**Voz:** ElevenLabs Eleven v4, Joaquín (<APPROVED_VOICE_ID>), 1 toma, 3,009.7 créditos. Tiempos por palabra con Scribe (0 créditos).
**SFX:** 7 efectos ElevenLabs (116.7 créditos). Salieron de 1–4 s; se alargaron con capas granulares (sin regenerar).
**Música:** sintetizada por cue en `proyecto/audio_yss.py` (sin licencias de terceros).
**Mezcla:** cama con sidechain a la voz (mediana voz–cama ≈ 21 dB), master −14 LUFS, pico −1.2 dBTP.

## Motor
`proyecto/` = canvas 2D determinista (render(t)); `src/shots.js` ancla 41 tomas a palabras de la voz; `render.mjs` renderiza en 2 procesos con Playwright → ffmpeg.
Comandos: `node snap.mjs <dir> sheet 3` (hoja de contacto) · `node render.mjs 0 2 p0.mp4` + `node render.mjs 1 2 p1.mp4` · `python3 audio_yss.py` · `./mezcla_yss.sh 180.73`.

## Estructura (41 tomas)
Fortaleza 2014 → gol de Gio → empate 88' → 90+4 caída en cámara lenta → PENAL → "NO ERA PENAL" → rebobinado VHS "¿y si no lo marca?" → título → la sala (tú, papá, tío, abuelo, perro) → dato del quinto partido → 113' cabezazo y gol → el abuelo brinca → cuartos vs Costa Rica + penales → top 4 → "no hay cebolla" → semifinal vs Argentina, "Míralo, mijo" → penales → final en el Maracaná → 1-1 al 89' → el país de pie → caño al 118' → campeones → escuela/árbitro → 2026 campeón defensor y el abuelo con bastón → la realidad (gris) → 2026 "¿Y si sí?" → CTA → póster.

## Autocrítica (jurado interno)
Funciona: el gancho se entiende sin sonido; cada frase tiene imagen; golpes en silencios; continuidad de familia y marcador.
A mejorar en v2:
1. Personajes en la sala y en la cancha se ven rígidos (poses sin transición); faltan parpadeos y micro-movimiento.
2. Tribunas y estadio aéreo se leen como patrón de puntos; falta profundidad (niebla, luces volumétricas).
3. Varias tomas de gol reutilizan la misma portería; variar ángulos (lateral, contrapicado) para el gol final.
4. SFX cortos alargados por capas: el rugido suena repetitivo; generar uno largo con duración explícita en la API.
