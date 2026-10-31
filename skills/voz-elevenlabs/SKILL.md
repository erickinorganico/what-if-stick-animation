---
name: "voz-elevenlabs"
description: "Úsala antes de generar, regenerar o transcribir cualquier voz con ElevenLabs (conector, API o scripts) para un video de AI Lab School, para no duplicar créditos."
---

# Voz con ElevenLabs sin duplicar créditos

Varias sesiones (Cowork, Claude Code, Codex) pueden trabajar el mismo expediente a la vez. Si dos generan la misma locución, se paga dos veces (pasó el 24-oct-2026: ~870 créditos en vez de ~435). Esta skill es el candado.

## 1. Antes de generar: revisa

En el expediente (`produccion/<ID>/`):

1. `revision/voz-elevenlabs.json` (manifiesto). Si existe y su `guion_sha256` / texto coincide con el guion actual → **NO generes**. Reutiliza `proyecto/assets/voz-elevenlabs.mp3` y `revision/voz-palabras.json`.
2. `revision/voz-lock.json` (candado). Si existe y `creado_utc` tiene menos de 60 min y no es tuyo → **otra sesión está generando: no generes**. Espera a que aparezca el manifiesto (revisa cada 2–5 min) o trabaja en otra cosa.
3. Si ves en el chat, en el proyecto o en la memoria que otra sesión ya pidió la voz de ese expediente → no generes.

Si el guion cambió (hash distinto) sí puedes regenerar, pero solo las líneas que cambiaron cuando sea posible.

## 2. Si vas a generar: toma el candado primero

Escribe `revision/voz-lock.json` ANTES de llamar a ElevenLabs:

```json
{"pieza": "<ID>", "sesion": "<cowork|claude-code|codex> + descripción", "creado_utc": "<ISO>", "guion_sha256": "<hash>", "voz_id": "<id>", "modelo": "eleven_v4", "tomas": 1}
```

Si no puedes escribir en el expediente, deja el aviso en el proyecto (doc de la pieza) antes de generar.

## 3. Genera una sola toma

- `generations_count = 1` siempre (el conector usa 2 por defecto y duplica el costo). Más tomas solo si el usuario las pide.
- Usa `estimate_only` primero si el guion es largo (> 60 s).
- Nunca repitas una llamada de generación para "reintentar": cobra otra vez. Consulta el estado con `creative_get_flow_run_status`.
- Transcripción (Scribe) para tiempos por palabra: una sola vez por toma; reutiliza `voz-palabras.json` si ya existe para ese `generation_id`.

## 4. Después de generar: deja rastro y suelta el candado

1. Guarda el audio en `proyecto/assets/voz-elevenlabs.mp3` y las tomas extra en `revision/`.
2. Escribe/actualiza `revision/voz-elevenlabs.json`: voz_id, modelo, `generation_id` usada, flujo, créditos, guion_sha256, audio_sha256, duración.
3. Escribe `revision/voz-palabras.json` (palabras sin tags, con start/end).
4. Borra o marca como `"liberado": true` el `voz-lock.json`.
5. Anota en el doc de la pieza del proyecto: qué toma se usó y cuántos créditos costó.

## 5. Si no puedes mover el audio

La nube de Cowork no descarga de storage.googleapis.com. Si la voz ya existe en ElevenLabs pero no está en la PC, no la regeneres: reutiliza la `generation_id` (p. ej. para transcribir con `creative_add_flow_asset_node`) y deja el render final a la sesión que sí tiene el mp3.

## Anti-patrones

- Generar "por si acaso" sin revisar manifiesto y candado.
- Dos tomas por defecto.
- Sobrescribir `voz-palabras.json` de otra toma: los tiempos deben corresponder al mp3 que está en `proyecto/assets/`.