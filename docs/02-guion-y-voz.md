# 02 · Guion y voz

## Fórmula del guion

Los eps. 01 y 02 siguen la misma estructura, que funciona. Las duraciones son proporcionales a 3 minutos.

| Bloque | Duración | Qué pasa | Ejemplo (ep. 02) |
| --- | --- | --- | --- |
| **Gancho con fecha** | 0–20 s | Fecha, lugar y el instante exacto del quiebre, narrado como transmisión | "Cinco de julio de dos mil veintiséis. Estadio Ciudad de México…" |
| **La realidad** | 3–5 s | Lo que pasó de verdad, seco | "En la vida real, esa noche perdimos tres a dos." |
| **La pregunta** | 2 s | "Pero… ¿y si sí?" | Sello del canal |
| **Escalada** | 60–70 % del video | Consecuencias en cadena, cada vez más grandes y más absurdas, en segunda persona y con detalles mexicanos | Calles, baby boom, el chiste que se muere, Plan Campeón, corridos de sonetos |
| **Giro honesto** | 10 s | Algo sale mal o se aterriza en lo real | "La copa no arregla nada sola…" |
| **Vuelta al punto de quiebre** | 10 s | Se cierra el círculo con una imagen | La placa en el poste: "¿Y si sí?" |
| **Lo real y lo inventado** | 5 s | Una frase que separa hechos de ficción | "Lo real: … Lo inventado: …" |
| **CTA** | 8 s | Pregunta para **comentar** + **seguir**/like + "¿Y si sí?" | "¿Qué arreglarías tú primero? Te leo en los comentarios." |

**Reglas de escritura:**

- **Frases cortas** que se puedan animar: una frase, una imagen.
- **Números escritos con letra** ("dos mil veintiséis"), para que la voz los lea bien y las anclas coincidan.
- **Datos reales verificados** (marcadores, minutos, sedes). Lo inventado se dice como inventado.
- **Humor de remate,** nunca de burla. Nada de violencia gráfica: se insinúa ("la esquina", "convoyes").
- **Pronunciación:** "Ai Lab School" se escribe así si llega a aparecer. Para nombres raros, escribe la forma fonética en el guion de voz.

## Etiquetas de emoción (ElevenLabs v4)

Van al inicio de la línea: `[nostalgic, low]`, `[tense]`, `[whispers]`, `[building excitement]`, `[shouting]`, `[amazed]`, `[bitter]`, `[intriguing, slow]`, `[epic, slow]`, `[playful]`, `[firm]`, `[soft]`, `[relieved]`, `[amused]`, `[laughs softly]`, `[warm]`, `[reflective]`, `[conversational]`, `[soft smile]`. El guion del ep. 02 (`episodios/ep02-mexico-campeon/guion/guion-voz-v1.txt`) es el ejemplo completo.

## Voz: una sola toma, sin gastar doble

| Campo | Valor |
| --- | --- |
| Voz del narrador | **Joaquín - Rich and Captivating** · `<APPROVED_VOICE_ID>` |
| Modelo | `eleven_v4` |
| Idioma | Español de México |
| Vía | Conector ElevenLabs de Claude (OAuth). La API con `.env` es la ruta alterna de la carpeta Automatizacion |
| Costo de referencia | ~3,000–3,100 créditos por 3 minutos, ~1,100 por un lote de líneas nuevas |

**Protocolo (skill `voz-elevenlabs`):**

1. Si `revision/voz-elevenlabs.json` existe y su `guion_sha256` coincide con el guion actual, **no se genera**: se reutiliza.
2. Si `revision/voz-lock.json` tiene menos de 60 minutos y es de otra sesión, **no se genera**: otra sesión ya está en eso.
3. Antes de llamar a ElevenLabs, toma el candado: escribe `voz-lock.json`.
4. Genera con `generations_count = 1`. Si el guion pasa de 60 s, primero pide `estimate_only`. Nunca repitas la llamada para "reintentar": consulta el estado con `creative_get_flow_run_status`.
5. Guarda el resultado:
   - el audio en `proyecto/assets/voz-elevenlabs.mp3`;
   - el manifiesto: voz, modelo, `generation_id`, créditos, hashes y duración;
   - los tiempos de Scribe en `revision/voz-palabras.json`.
6. Suelta el candado (`"liberado": true`).

## Cambiar líneas sin regenerar todo

Lo hicimos en el ep. 02 con la voz v2:

- Se generan **solo las líneas nuevas** en una toma: narrador y, si hace falta, otra voz.
- Se empalman en la toma aprobada con cortes en silencios y rampas de 12 ms. El ejemplo es `episodios/ep02-mexico-campeon/audio/empalme_v2.py`, que deja `voz-v2.wav` y `voz-palabras-v2.json`.
- Los tiempos se recalculan solo en la zona afectada.

## Rescatar una frase de un clip

El caso fue el "¡Ay, mamá!" del clip que mandó el usuario.

1. Separa la voz del clip:
   `python herramientas/separar_voz.py clip.mp3 voz.wav instrumental.wav` (MDX-Net Kim_Vocal_2).
2. Ubica la frase:
   `python herramientas/transcribir.py buscar voz.wav 0.0:1.0:3.0:s`.
3. Insértala al mismo nivel que la frase que reemplaza. El ejemplo es `episodios/ep02-mexico-campeon/audio/aymama_v3.py`.
4. Si el clip es de una canción comercial, anótalo en `episodio.json` como **riesgo de Content ID**.

## Tiempos por palabra → motor

```powershell
.\.venv\Scripts\python herramientas\palabras_a_js.py episodios\ep03-slug\revision\voz-palabras.json episodios\ep03-slug\proyecto\src\words_ep.js
```

El motor ancla cada toma a una frase con `A2('frase exacta')` o `A3(...)`. Si cambias una palabra del guion, la ancla truena con `no encontré: …`, y así te enteras antes de renderizar.
