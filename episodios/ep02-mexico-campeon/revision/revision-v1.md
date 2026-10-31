# YSS-20261025-02 · Revisión v1: "¿Y si México ganaba el Mundial?" (3:13)

Entregas en `exportaciones/`:
- `yss-02-mexico-campeon-v1-16x9.mp4`: horizontal 1920×1080, 30 fps, subtítulos quemados.
- `yss-02-mexico-campeon-v1-9x16.mp4`: vertical 1080×1920 nativo para Reels, TikTok y Shorts.
- Versiones `-ligero` (menos de 30 MB) para revisar en el celular.
- `yss-02-mexico-campeon-v1.srt`: subtítulos aparte para YouTube.

Voz: una sola toma de ElevenLabs (ver `voz-elevenlabs.json`), con tiempos por palabra de Scribe (`voz-palabras.json`). No se regeneró nada.
Mezcla: −14 LUFS integrados, pico −1.2 dBTP. La voz va al frente: la música y los efectos bajan solos cuando habla el narrador (sidechain). Durante la narración, la voz queda en promedio 28 dB arriba del fondo.

## Tomas (38, todas ancladas a la voz)
1. **Frío (0–27 s):** Estadio Ciudad de México, 05·07·2026, octavos contra Inglaterra. Conducción al 89' con 2-2. La tribuna aguanta la respiración. Disparo, poste y adentro: ¡GOL!, el estadio brinca y el sismógrafo registra el gol. Luego la realidad en gris (2-3) y el golpe "¿Y SI SÍ?".
2. **Camino al título:** tarjetas de octavos, cuartos y semifinal, y la final del 19 de julio en Nueva Jersey. El capitán levanta la copa con fuegos artificiales. Después, "¿UNA COPA ARREGLA UN PAÍS? ¿O SÍ?".
3. **La fiesta:** 10 millones en la calle y el Ángel tapado por la gente. Cláxones en Tijuana y en San Diego. Baby boom con la tarjeta "NOMBRE: EL DEL GOL".
4. **La cabeza:** el cambio no está en la calle. La cámara entra a la cabeza y se enciende un "SÍ".
5. **El chiste muere:** letrero de neón "JUGAMOS COMO NUNCA / PERDIMOS COMO SIEMPRE" que estalla en pedazos.
6. **La generación del sí:** niños que crecen frente al mural "SÍ SE PUEDE".
7. **Plan Campeón (ficticio):** conferencia y tres tarjetas: cancha y escuela, becas y fábricas.
8. **El chavo de 15 años:** de noche, una sola opción en la esquina. De día, beca, robótica y box: "algo que perder y algo que ganar".
9. **La violencia baja:** gráfica de un índice ficticio que baja tres escalones, uno por cada "baja". Después, el noticiero sin nada que contar ("TODO TRANQUILO").
10. **Vida diaria:** celular con altavoz en el Metro. La bici sin candado sigue ahí dos días después (time-lapse). Mamá pide la ubicación "por costumbre".
11. **Cultura:**
    - corridos que tachan "ARMAS" y "CONVOYES" y cantan "SONETOS";
    - "El Bélico de las Metáforas" en el Foro Sol;
    - Nezahualcóyotl agotado en las librerías.
12. **2036:** México entra al top 10 de economías (ficticio). Barco "HECHO EN MÉXICO" que exporta carros, chips, medicinas, aguacate y tequila. En Tokio, una tablet "HECHO EN MÉXICO".
13. **La caída:** el país "se la cree" (portadas de revista y corona) y en el Mundial 2030 queda eliminado en grupos, bajo la lluvia.
14. **Lo arregla la gente:** la copa sola en la oscuridad. Luego entra la gente desde los dos lados, sin cruzarse.
15. **La placa:** 2036, estadio lleno y placa en el poste: "05·07·2026 · ¿Y SI SÍ?".
16. **Cierre:**
    - tarjetas "Lo real / Lo inventado";
    - pregunta para comentar ("¿qué arreglarías tú primero?") y like;
    - tarjeta final con suscríbete y próximo episodio: "¿Y si México tuviera tren bala?".

## Vertical
- Mismo motor, render nativo a 1080×1920. Cada toma tiene su encuadre.
- Las tarjetas se apilan (Plan Campeón, Lo real/Lo inventado, exportaciones 3+2).
- Los textos quedan por encima de los subtítulos.

## Sonido
- **Música:** sintetizada por cue: tensión en el estadio, tema heroico en la final, cajita musical en el baby boom, polka norteña en los corridos, piano solo en "la copa sola" y crecimiento en "lo arregla la gente".
- **ElevenLabs SFX (5, ~83 créditos):** cláxones, poste, Metro y bebé se usaron. El del corrido salió de 0.5 s y se reemplazó con la polka sintetizada.
- **CC0 de Freesound/Kenney:** campanita de notificación, triángulo, impacto, whoosh, data reveal y clic.
- **Sintetizados:** vidrio del neón roto, zumbido del neón y lluvia.

## Pendiente de decisión
- Datos ficticios marcados en pantalla como "ESCENARIO FICTICIO" (Plan Campeón, índice de violencia y top 10).
- Nada publicado.

## Skills del kit usadas
- **voz-elevenlabs:** candado y manifiesto. Una toma, sin regenerar.
- **motion-studio-by-buck:** una idea por toma, anticipación, sonido por acción y cámara que aterriza.
- **dataviz:** la gráfica de violencia lleva una sola serie, un solo tono, ejes discretos y el título dice qué es.
- **ffmpeg-skill:** QA con ebur128, blackdetect y hojas de contacto en ambos formatos.
