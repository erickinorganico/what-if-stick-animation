# YSS-20261024-01 · Revisión v4: video completo (3:01) + versión vertical

Entregas en `exportaciones/`:
- `yss-01-no-era-penal-v4-16x9.mp4`: horizontal 1920×1080, 30 fps, subtítulos quemados en la barra inferior.
- `yss-01-no-era-penal-v4-9x16.mp4`: vertical 1080×1920 para Reels, TikTok y Shorts, con título de la serie arriba, subtítulos grandes y barra de progreso.
- `yss-01-no-era-penal-v4.srt`: subtítulos aparte para YouTube.

Voz y mezcla: las mismas aprobadas en v1 (`render/mix.wav`, −14 LUFS). No se gastaron créditos de ElevenLabs.

## Qué se hizo
- **Parte 1 (0–61 s):** es la prueba v3 aprobada, con los mismos arreglos (11 vs 11, nadie se traspasa, carrera con IK, codos naturales, #NoEraPenal).
- **Parte 2 (61 s–3:01):** 40 tomas nuevas en el motor v3, todas ancladas a la voz:
  - Cuartos: llave del torneo y el sello "QUINTO PARTIDO".
  - Penales contra Costa Rica: inserto del balón en el manchón y dos atajadas vistas desde atrás de la red.
  - Los 4 mejores, con banderas de Brasil, Alemania, Argentina y México.
  - Papá llora; inserto de la mesa con "CEBOLLA: 0".
  - Semifinal contra Argentina: plano general de noche, 0-0 en el minuto 120 y el inserto "otra vez penales".
  - Te tapas los ojos y tu abuelo te quita las manos (las manos tapan la cara de verdad); "Míralo, mijo" en primer plano.
  - Tanda: gol, gol, atajada, gol, con marcador de penales.
  - Festejo "¡A LA FINAL!".
  - Final en el Maracaná contra Alemania:
    - salida de los equipos en dos filas sin encimarse;
    - marcador LED con el 1-7;
    - "nadie da un peso", con una moneda que gira;
    - 80' Alemania 1-0;
    - 89', centro y volea, ¡GOL! 1-1;
    - tiempo extra;
    - el país de pie en una plaza con pantalla gigante.
  - El caño del 118': el balón pasa entre las piernas y la toma corta a un contraplano, así el atacante nunca atraviesa al defensa. Luego ¡GOOOOL! y la copa con fuegos artificiales.
  - "Tienes doce años": la escuela, el niño árbitro con tarjeta amarilla, un cronómetro de 1 segundo y la generación que crece de 2014 a 2026 (con "CASI" tachado).
  - 2026: el Azteca con el sello de campeón y el abuelo con bastón en la tribuna.
  - La realidad: rebobinado, PENAL en gris y "PERDIMOS".
  - Plaza 2026 y el golpe del logo "¿Y SI SÍ?".
  - Cierre: el abuelo y el niño de noche que amanece con "la esperanza", llamado a comentar y dar like, y tarjeta final con el próximo episodio.
- **Vertical:** el mismo motor renderiza nativo a 1080×1920. Cada toma tiene su encuadre (sigue al balón, al que habla o a la acción). Los textos se reacomodan para pantalla vertical: la llave de cuartos va de arriba a abajo, los 4 mejores van en cuadrícula 2×2 y los sellos quedan por encima de los subtítulos.
- **Sonido:** los efectos del mix v1 están anclados a las mismas palabras (silbatos, rugidos, red, pops de etiquetas, whooshes en títulos), así que caen con las tomas nuevas.

## Skills del kit usadas
- motion-studio-by-buck: anticipación en saltos, cámara que aterriza, una idea por toma, sonido por acción.
- ffmpeg-skill: QA con ebur128, blackdetect y hojas de contacto en ambos formatos.
- voz-elevenlabs: voz bloqueada, sin regenerar.
