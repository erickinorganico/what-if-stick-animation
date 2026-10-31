# 12 · Producción eficiente (medida)

Cómo se produce un episodio completo en el menor tiempo sin bajar la calidad. Todo lo de aquí está medido en la nube de Cowork con **2 núcleos**; en la PC, con más núcleos, escala con `--workers`.

## El flujo en comandos

```powershell
python herramientas\nuevo_episodio.py ep03-slug "¿Y si …?"        # motor + kit de dirección
#   guion → voz (skill voz-elevenlabs, 1 toma) → Scribe → palabras_a_js.py
python herramientas\esqueleto.py ep03                              # beats B.bN, storyboard.md, animatic (< 1 s)
python herramientas\producir.py ep03 --animatic                    # animatic con voz para aprobar el ritmo
#   tomas con el kit (skill stickman-animation-direccion), por bloques: probe.mjs + snap.mjs
python herramientas\producir.py ep03 --prueba 20                   # prueba de 20 s en ambos formatos
python herramientas\producir.py ep03                               # timeline → … → fragmentos → QA → QA de render
```

## Tiempos medidos

### ep02 «¿Y si México ganaba el Mundial?» (3:37), del render a la entrega, 29 oct 2026

| Paso | Antes (método anterior, medido) | Ahora | Cambio |
| --- | --- | --- | --- |
| Render 16:9 | ~12.8 min (pantallazo por cuadro, 8.5 fps) | **4.9 min** | JPEG en el navegador por lotes; x264 veryfast en el crudo |
| Render 9:16 | ~14.1 min (7.7 fps) | **5.4 min** | ídem |
| Final 16:9 + 9:16 | ~12.7 min (medium) | **4.6 min** | veryfast (`--calidad` vuelve a medium) y los dos en paralelo |
| Ligero 16:9 + 9:16 | 7.1 min | 7.1 min | sin cambio: la calidad del ligero importa (pasó el "pumping" del R4) |
| Fragmentos (3 + 2) | ~5.8 min | **2.9 min** | PNG decodificados una vez (idéntico píxel a píxel) + veryfast + 2 en paralelo |
| QA (medir) | 1.6 min | 1.6 min | — |
| QA de render | no existía | 1.0 min | congelados, destellos, negros y sincronía |
| **Total** | **~54 min** | **~27.5 min** | **~2×**, con más QA |

- **Calidad del render nuevo contra el anterior:** PSNR 47 dB y SSIM 0.995 (indistinguible).
- **Grano del final:** a 200 % de zoom, veryfast y medium se ven casi iguales.

### «¿Y si México acabara con el narco?» (5:44)

| Paso | Tiempo |
| --- | --- |
| Esqueleto (108 beats) | < 1 s |
| Animatic 16:9 con voz | **~6 min** (render 4 min + codificación) |
| Salidas en un comando (vertical, 3 partes, 2 Shorts, portadas, QA, base de copys; `salidas.py`) | **11.4 min** |

## Lo que encontró el QA automático (prueba de que sirve)

- **ep02:** 8 destellos de un cuadro en 1:06–1:08 (parpadeo del neón, intencional pero estroboscópico) y 25 tramos quietos de ≥ 0.4 s (gráficas e insertos sin animación secundaria, p. ej. 1:38–1:40 y 2:28–2:30). Son decisiones de dirección que antes nadie veía.
- **narco R4 final:** 0 destellos, 1 tramo quieto (el título central, intencional), −14.0 LUFS y voz a 0 ms.
- Detecta un congelado de 0.8 s y un destello de un cuadro metidos a propósito en una prueba.

## Cortes sugeridos contra los elegidos a mano

- **narco:** partes a ±0.11 s de los cortes del director.
- **ep02:** partes de 71, 77 y 76 s (todas en el rango de 60–90). Los Shorts candidatos cubren las zonas que eligió una persona («corridos» y «taco al pastor»).

## Dónde se va el tiempo ahora

1. **Las tomas:** el trabajo creativo. Esqueleto, animatic, kit y la skill de dirección lo acortan, pero es donde está el valor.
2. **El render:** proporcional a la duración. En la PC, `--workers` = núcleos / 2.
3. **El ligero:** 2 pasadas en medium, a propósito.
