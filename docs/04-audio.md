# 04 · Audio

El audio se arma con 3 capas:

- **voz** (ElevenLabs, una toma);
- **música** sintetizada por código, cue por cue;
- **efectos** clavados a las palabras.

Todo se ancla a `timeline.json`, el mismo `T` que usa el motor, así que la música y los efectos caen exactos con las tomas.

```text
node herramientas/timeline.mjs <ep>            → proyecto/timeline.json   (T, DUR, VO, CAPS)
python audio_<ep>.py   (con cwd = proyecto/)   → assets/audio/musica.wav, assets/audio/fx.wav
python herramientas/mezclar.py …               → render/<slug>/mezcla.wav  (-14 LUFS, -1.2 dBTP)
```

`producir.py` hace los tres pasos (`--pasos timeline,audio`).

## Música por cue (sin licencias)

El script de cada episodio (`proyecto/audio_ep02.py` es la referencia) define:

- **Instrumentos con numpy y scipy:**
  - `pad` (colchón con sierras desafinadas y filtro);
  - `piano`, `pulse` (arpegio), `drum`, `boom` (impacto grave), `riser`;
  - `accordion_tone` y `polka` (norteño);
  - `tinkle` (cristales), `stab` y `rain`.
- **Un bus `M`** donde cada cue se suma en `T['ancla']` con ganancia y paneo:

```python
# 1 · la noche del partido: tensión que crece hasta el disparo
chords(Im, 0, T['mexico'], 3.4, .26, 900, 1.0, .8)
M.add(pulse(A2 / 2, T['ochenta'] - T['mexico'], 92, 2, 600), T['mexico'], .45)
M.add(riser(T['adentro'] - T['disparo'] + .1), T['disparo'] - .1, .35)
M.add(boom(3.0, 46), T['adentro'] + .05, .7)
```

**Criterios:**

- **Cada bloque del guion tiene su cue:**
  - tensión en menor;
  - estallido en mayor;
  - polka para lo mexicano festivo;
  - pad reflexivo para el giro;
  - piano para el cierre.
- **Silencio antes del golpe.** El *boom* cae en la palabra; el *riser* empieza en la anterior.
- **La música no compite con la voz:** filtro pasa-bajos en el pad y sidechain en la mezcla.

## Efectos

- **Fuentes, en `proyecto/assets/audio/` y `assets/sfx_el/`:**
  - estadio, rugido, canto de afición, silbato, patada en la red, latido, rebobinado y pops;
  - whooshes, impactos y campanitas de Freesound y Kenney;
  - efectos generados en ElevenLabs (sonido v2): cláxones, poste, Metro y bebés.
- **Bus `X`:** las ambientes se hacen con granulado (`amb`, `roar`) para que no se note el loop. Los puntuales se clavan a `T` (`X.add(A('pop.mp3'), T['cancha'], .35)`).
- **Regla del canal:** cada acción visible tiene su sonido (el balón pega en el poste, la etiqueta aparece con un pop, el título entra con whoosh), pero **los efectos nunca tapan al narrador**.
- **Para buscar o generar efectos nuevos:** skill `sound-effects`. Si se generan en ElevenLabs, una sola toma y se anotan los créditos en el manifiesto.

## Mezcla (`herramientas/mezclar.py`)

La cadena es esta:

1. **Voz:** se retrasa `VO` = 0.5 s, pasa por un pasa-altos de 70 Hz y un compresor suave (umbral 0.12, ratio 3).
2. **Cama:** música × 0.24 + efectos × 0.45.
3. **Sidechain** de la cama con la voz (umbral 0.015, ratio 10, ataque 8 ms, release 400 ms). La cama baja unos 10 dB cuando hay narración.
4. **Suma** de voz y cama, y luego **loudnorm a 2 pasadas** a −14 LUFS integrados, −1.2 dBTP y LRA 11.

Verifica el resultado con `python herramientas/medir.py render/<slug>/mezcla.wav`, que debe dar −14.0 LUFS y un pico de −1.2 dBTP.

Si la voz se pierde en un tramo, baja la ganancia de ese cue en el script; no subas la voz en la mezcla. Si el problema es general, usa `--vol-musica` y `--vol-fx`.

## Maestro aprobado

Cuando el usuario aprueba el audio, la mezcla se guarda como `audio/mezcla-final.flac` (sin pérdida, cabe en git y en el puente). A partir de ahí:

- **Solo cambia la imagen:** se re-renderiza y `codificar.py final` usa ese maestro. Cero créditos y cero cambios de audio.
- **Cambia la voz:** se regeneran solo las líneas nuevas (ver [02](02-guion-y-voz.md)), luego `timeline` → `audio` → `mezcla`, y se actualiza el maestro.

El ep. 01 está en modo `"maestro"`: su audio es la mezcla aprobada de la v1, y la imagen v5 se hizo con las mismas anclas. El ep. 02 está en modo `"mezclar"` y su script regenera la cama de forma idéntica (diferencia máxima de 1 LSB contra la mezcla entregada).
