# YSS-20261024-01 · Revisión v3 (prueba 61 s)

Entrega: `exportaciones/yss-01-v3-prueba-60s.mp4` (1920×1080, 30 fps, −13.8 LUFS, 24 MB). Misma voz y mezcla de v2 (sin gastar créditos de ElevenLabs).

## Correcciones pedidas → qué se hizo
- **Número de jugadores**: plano del estadio rehecho con cámara en perspectiva real (cancha 105×68 m proyectada). 11 de México (4-3-3) contra 11 de Holanda (5-3-2, como en 2014) + árbitro, porteros con uniforme distinto, todos visibles.
- **Nadie se traspasa**: separación mínima de 2.4 m entre jugadores en la simulación; jugadas de la caída (90+4) y del cabezazo (113') reescenificadas con profundidad y distancia entre personajes. El defensor toca el balón y el atacante cae solo (refuerza "no era penal").
- **Correr bien**: nuevo ciclo de marcha con cinemática inversa (pie de apoyo plantado, sin patinar), fase calculada por distancia recorrida; trote y caminata del mismo sistema.
- **Brazos al revés**: convención de codos corregida en todas las poses (flexión siempre natural); revisada hoja de 14 poses + ciclos.
- **Gráfica de "NO ERA PENAL"**: eliminada. Ahora subrayado de pincel rojo + etiqueta #NoEraPenal (la frase que se volvió nacional).
- **Rostro y animación**: pupilas con mirada, sombra de párpado, 15 expresiones; saltos con anticipación, vuelo y amortiguación (tío, abuelo, festejos); uniformes con manga corta, número y calcetas.

## Skills del kit usadas
- motion-studio-by-buck (reglas: anticipación, cámara que aterriza, sonido por acción, hoja de poses antes de render).
- ffmpeg-skill (QA: ebur128, blackdetect, hojas de contacto).
- voz-elevenlabs (verificado voz-lock: no se regeneró voz).
