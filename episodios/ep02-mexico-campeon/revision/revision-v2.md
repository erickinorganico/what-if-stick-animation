# YSS-20261025-02 · Revisión v2: "¿Y si México ganaba el Mundial?" (3:35)

Cambios que pidió el usuario sobre la v1:

1. **Corridos:**
   - ya no hablan de "sonetos" sino de "ciencia y filosofía";
   - entra un cantante (voz genérica norteña de ElevenLabs, estilo corrido tumbado, sin imitar la voz real de ningún artista): "¡Ay, mamá! Pura ciencia… y filosofía.";
   - en pantalla: el cancionero tacha ARMAS y CONVOYES y escribe CIENCIA Y FILOSOFÍA, y luego viene un primer plano del cantante en el Foro Sol antes del plano general.
2. **Librerías:**
   - se quedan sin libros de "superación personal genérica… porque la gente los quemó. Ya no lee basura.";
   - el estante dice SUPERACIÓN PERSONAL GENÉRICA · AGOTADO;
   - después viene una hoguera con títulos inventados ("MINDSET DE TIBURÓN", "SÉ MILLONARIO YA", "TU MEJOR VERSIÓN 3.0", "DESPIERTA TU ALFA") y un chavo asando un bombón.
3. **Nuevo final:** sale "no todo es fiesta", la copa sola, la placa a los diez años, Lo real/Lo inventado y el llamado a comentar. En su lugar va un time-lapse:
   - **2040:** gana la carrera de la IA (carrera de robots, 1.er lugar);
   - **2045:** gana la carrera espacial, con cohete y la primera bandera en Marte;
   - **2050:** Cumbre por la Paz en CDMX. Pasan tres días y termina con café de olla y una paloma;
   - **2060:** primer contacto. Una astronauta mexicana le ofrece un taco al pastor con piña a un extraterrestre (diseño original) y "se quedan" (TAQUERÍA ORBITAL);
   - **Copa Universal:** "COPA MUNDIAL" se tacha y pasa a "COPA UNIVERSAL 2060";
   - **Final:** México contra Andrómeda, 89', 2-2: disparo, poste (el mismo de 2026, con la placa "05·07·2026 ¿Y SI SÍ?") y ¡adentro!;
   - **Remate:** el sismógrafo de Marte registra el gol y cierra con "¿Y si sí?".

## Voz (sin gastar dos veces)
- Solo se generaron los fragmentos nuevos, con una toma por voz:
  - narrador Joaquín: `04rS4SiZheNrC1kb8Fbm`, 1,077 créditos;
  - cantante: `dm6GgLcEgdvpWWy3Xbjw`, 49 créditos.
- Se empalmaron sobre la toma aprobada con `proyecto/empalme_v2.py`, cortando en silencios. El resultado está en `proyecto/assets/voz-v2.wav` y sus tiempos en `revision/voz-palabras-v2.json`.
- El manifiesto `voz-elevenlabs.json` está actualizado y el candado liberado.

## Mezcla
−14 LUFS, pico −1.2 dBTP. La música baja sola bajo la voz (sidechain); la mediana de la voz sobre el fondo es de 27 dB. La música nueva incluye:
- un groove de corrido tumbado bajo el canto (tololoche y requinto);
- crepitar de la hoguera;
- un montaje épico de 2040 a 2050;
- un pad espacial y el zumbido del ovni;
- fanfarria para la Copa Universal.

## Skills del kit usadas
- **voz-elevenlabs:** candado y manifiesto, una toma y solo las líneas que cambiaron.
- **motion-studio-by-buck:** una idea por toma, sonido por acción y callback visual del poste.
- **ffmpeg-skill:** QA con ebur128 y hojas de contacto en ambos formatos.
- **Render reanudable:** `render_chunks.mjs` trabaja por bloques de 5 s y salta los ya terminados, porque el contenedor se reinició dos veces a media tarea.

## Entrega
- **Calidad completa (en el chat):**
  - `yss-02-mexico-campeon-v2-16x9.mp4`, 58 MB;
  - `yss-02-mexico-campeon-v2-9x16.mp4`, 62 MB.
- **Ligeras (en la carpeta):** `-16x9-ligero.mp4` y `-9x16-ligero.mp4`, de 29 MB cada una (2 pasadas, 940k).
- **QA:**
  - −14.0 LUFS en los dos formatos; pico real de −0.9 dBFS después de AAC;
  - la única pantalla negra va de 25.2 a 26.2 s y es intencional (igual que en la v1);
  - hojas de contacto: `hoja-contacto-v2-16x9.jpg` y `-9x16.jpg`.
- **Pendiente:**
  - el cromo superior, la marca de agua y la tarjeta final siguen diciendo "¿Y si sí?". Se cambian cuando el usuario confirme el nombre del canal (propuesta: El Hubiera, @elhubieramx);
  - el kit propuesto está en `marca\elhubiera-propuesta-v2\`.
