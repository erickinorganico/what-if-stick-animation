# Revisión v1 · ep04 · ¿Y si Cristiano Ronaldo hubiera nacido en México?

Fecha: 29 oct 2026 · Producido por Claude (Cowork) en la nube, con el repo subido por el puente. **Sin publicar ni programar.**

## Qué se hizo

- **Guion:** V3 de Erick (`guion/guion-voz-v3.txt`). Voz Joaquín, eleven_v4, una toma generada fuera (Codex, 1,449 créditos). En esta sesión: **0 créditos**.
- **Tiempos por palabra:** alineación del proveedor (`revision/voz-palabras.json`, 548 palabras) → `src/words_ep.js`. VO = 0.5 s.
- **Esqueleto:** 66 beats (1 de más de 5 s: el cierre). Animatic con voz: `videos/…-animatic.mp4`.
- **Tomas:** `src/cr-env.js` (cerros de Tijuana y Madeira, llano, cancha abandonada, cuartos, utilería, `cr()` con el 7, panza), `src/ep.js` (gancho, vida real, escenario 1) y `src/ep2.js` (bisagra, escenarios 2 y 3, cierre). ~62 tomas, 3 transiciones (2 `dip`, sin whips). Un solo empuje de cámara fuerte (¡Siuuu!).
- **Color:** Madeira y la vida real en frío; la colonia al atardecer; Lisboa como recuerdo desaturado con fundidos; el cierre pasa del atardecer a la noche.
- **Persona real:** Cristiano no dice ninguna frase; es un stickman con el 7 y su celebración. Sin fotos ni rostro en portadas.
- **Audio:** `proyecto/audio_episodio.py` reescrito para este episodio (cues por frase con `w()`; requinto en el llano, polka en el viernes botanero, pulso épico en el escenario 3, piano en el cierre; efectos por acción y ambientes por lugar). Mezcla −14.0 LUFS, −1.2 dBTP.
- **Salidas:** 16:9 y 9:16 completos y ligeros, 3 partes, 2 Shorts elegidos a mano (`short-viernes-botanero` 129.0–149.55 s y `short-siuuu` 152.55–176.15 s), miniaturas A/B, portada vertical y una portada por fragmento, copys.

## QA (medido)

| Pieza | Duración | LUFS | Pico |
|---|---|---|---|
| 16:9 | 3:29.9 | −14.0 | −1.1 |
| 9:16 | 3:29.9 | −14.0 | −1.1 |
| Partes 1/2/3 | 63.5 / 80.1 / 74.0 s | −14.1 / −13.9 / −14.1 | ≤ −1.1 |
| Short viernes botanero | 22.4 s | −13.8 | −1.2 |
| Short ¡Siuuu! | 25.4 s | −13.3 (fuera de ±0.6 por 0.1) | −1.2 |

- `probe.mjs` 16:9 y 9:16: 0 errores.
- `qa_render.py`: 0 destellos, sincronía de voz 0 ms. **13 congelados en el final** (21 en el crudo), todos en tarjetas y gráficos fijos: título (24–27 s), Balones de Oro antes de aparecer (50.8), tarjeta «Escenario uno» (62–63), bifurcación y «¿Y si sí?» (95–103), tabla (133.3), tarjeta «Escenario tres» (151.8) y cuadro de eliminación (172.1). Son pausas de lectura intencionales; si se quieren eliminar, basta con darles deriva de cámara y volver a renderizar (~47 min).
- Relación voz/cama revisada por medio segundo antes del sidechain; se bajaron el rugido de «campeones», el timbre del teléfono y la llave del taller.
- **Revisé** hojas de cuadros (16:9 y 9:16) del código y cuadros del MP4 final y de cada fragmento (a 3 s y el último). **No escuché** el MP4 con audífonos: la revisión de audio fue por medición (LUFS, pico, sincronía, relación voz/cama). Falta tu escucha.

## Datos verificados (29 oct 2026)

- Cristiano: 5-feb-1985, Funchal (Madeira); papá utilero del Andorinha; Sporting lo ficha a los 12 tras una prueba de 3 días (Goal).
- Pacto de caballeros: COFECE multó a 17 clubes y a la FMF en sept. 2021 (Expansión, El Financiero).
- Sin descenso desde 2020; reglamento del 15-jul-2026 lo mantiene (El Financiero).
- Xolos: único título de Liga MX, Apertura 2012 (Wikipedia).
- México solo llegó a cuartos en 1970 y 1986 y nunca pasó de ahí (N+). En 2026 cayó 3-2 con Inglaterra y terminó noveno.

## Pendiente de tu aprobación

1. Ritmo y tomas del episodio (no se pidió aprobación del animatic: pediste construir directo).
2. Shorts elegidos y portadas.
3. Copys (`copys/copys.md`).
