# Caso · ep04 «¿Y si Cristiano Ronaldo hubiera nacido en México?» — pipeline stickman medido

Fecha: 28–29 oct 2026 · Canal: Aquí el hubiera sí existe · Producción: Claude (Cowork, nube con 2 núcleos) + Codex (voz) · Estado: v1 por validar, sin publicar.
Evidencia para la demo del curso de animación de AI Lab School.

## Rutas

- Entrega: `<LOCAL_PROJECT_PATH>` (video, fragmentos, portadas, copys, revision).
- Código: `…\Ai Lab School\Automatizacion\el-hubiera\episodios\ep04-cristiano-mexico\` (copia en este kit: `Automatizacion\el-hubiera\episodios\ep04-cristiano-mexico\`).

## Del guion a la entrega

| Fase | Skill / herramienta | Tiempo medido | Notas |
|---|---|---|---|
| Guion (4 versiones) | `escritura-guiones-ai-lab` + investigación web | ≈ 45 min de conversación | Se descartó «mundo sin crimen» (fuera de nicho y dependía del episodio anterior); el guion final es de Erick (V3). Regla nueva: cada episodio se entiende solo. |
| Voz | `voz-elevenlabs` (en Codex) | 1 toma · 1,449 créditos | 0 créditos en Cowork. Alineación del proveedor reutilizada como tiempos por palabra. |
| Montaje del repo en la nube | puente (stage) | ~4 min | ~150 archivos en 5 llamadas; sin `.venv`, `modelos/` ni `videos/`. |
| Episodio + palabras + esqueleto | `nuevo_episodio.py`, `palabras_a_js.py`, `esqueleto.py` | 3.9 s | 66 beats. |
| Animatic con voz | `producir.py --animatic` | 5.5 min (238 s render + 92 s codificación) | |
| Tomas | `stickman-animation-direccion` | ≈ 19 min | ~62 tomas en 3 archivos; 5 hojas de revisión (16:9 y 9:16); `probe` 0 errores. |
| Audio por código | `audio_episodio.py` | ≈ 4 min de escritura + 53 s | Cues por frase con `w()`; rebalanceo + remezcla 1 min. |
| Render → entrega | `producir.py` | **47.1 min** | render 16:9 8.7 · 9:16 10.9 · final 7.3 · ligero 10.8 · cortes 0.1 · fragmentos 4.2 · QA 2.8 · QA de render 1.4 (min). |
| Shorts elegidos a mano | `fragmentos.py` | 47 s | |
| Portadas (8) | `src/portadas.js` + `exportar_portadas.mjs` | 5 s (+ ~6 min de diseño en paralelo al render) | |
| Copia a la PC | puente (commit) | ~5 min | MP4 y JPG van con `SendUserFile` → `fileUuid`; los completos de > 30 MB en partes de 20 MB (`partes.py`) + `UNIR-COMPLETOS.cmd`. |

**Del audio recibido (00:30) a la entrega en la PC (≈ 02:10): ~1 h 40 min**, de los cuales ~47 min son máquina sin intervención.

## Resultado (medido)

- 3:29.9 · −14.0 LUFS · −1.1 dBTP · sincronía de voz 0 ms · 0 destellos.
- 13 congelados en el final, todos en tarjetas y gráficos fijos (pausas de lectura).
- 3 partes (63.5 / 80.1 / 74.0 s) y 2 Shorts (22.4 y 25.4 s).

## Lecciones (ya en las skills)

1. `W` del núcleo es el ancho del lienzo: ancla con `window.W` (`Wd`). `WE()` del kit estaba roto por eso: corregido en `herramientas/kit/direccion.js`, junto con el trazo del `sello()`.
2. `hop()` devuelve un objeto: usa `.y`.
3. Ancla frases repetidas con `Wd('frase', B.bN)`.
4. Cámara dentro de `[960/z, 1920 − 960/z]` para evitar franjas negras.
5. `window.BOARD` para las vallas LED.
6. Gráficos de pantalla completa con coordenadas propias en vertical.
7. En la nube: enlazar `node_modules/playwright` y `pip install numpy scipy soundfile pillow`.
8. Medios por el puente: `SendUserFile` + `fileUuid`; partes para > 30 MB.
9. Persona real: sin frases atribuidas, stickman con el número, sin fotos ni rostro.
10. Mientras renderiza, adelanta portadas, copys y documentación.
