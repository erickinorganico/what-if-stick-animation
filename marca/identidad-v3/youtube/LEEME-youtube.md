# YouTube · El Hubiera · listo para subir

Todo en esta carpeta cumple los límites de YouTube Studio. `marca/generador/youtube_listo.py` lo verifica.

## Imágenes (Personalización > Perfil)

| Campo en Studio | Archivo | Medida y peso | Límite de YouTube |
| --- | --- | --- | --- |
| **Imagen del banner** | `youtube-banner-2560x1440.jpg` | 2560×1440 · 0.6 MB | ≥ 2048×1152 · ≤ 6 MB |
| (alternativa sin pérdida) | `youtube-banner.png` | 2560×1440 · 4.0 MB | ≥ 2048×1152 · ≤ 6 MB |
| (medida mínima exacta) | `youtube-banner-2048x1152.jpg` | 2048×1152 · 0.3 MB | ≥ 2048×1152 · ≤ 6 MB |
| **Imagen** (foto de perfil) | `youtube-perfil-800.png` | 800×800 PNG · 0.7 MB | ≥ 98×98 · ≤ 4 MB · PNG o GIF |
| **Marca de agua del video** | `youtube-marca-de-agua.png` | 300×300 PNG transparente | 150×150 recomendado · ≤ 1 MB |

- **Banner:** el logotipo, la frase y el usuario quedan dentro de la zona segura central de 1546×423 px, la que se ve igual en teléfono, computadora y TV. La línea de la bifurcación cruza todo el ancho a propósito: en pantallas anchas se ve completa y en el teléfono se recorta sin perder nada. Al subirlo, Studio muestra la vista previa por dispositivo; no muevas el recorte.
- **Foto de perfil:** el símbolo cabe completo en el círculo.
- **Marca de agua:** súbela en Personalización > Marca de agua, con el tiempo de visualización en **"Todo el video"**.
- Antes la carpeta tenía un banner PNG de 6.5 MB, que YouTube rechazaba por pasar del límite de 6 MB. Ya está corregido.

## Nombre

Recomendado: **El Hubiera**. Es el nombre del logotipo y de la marca; el identificador ya dice "aquí el hubiera sí existe".

Si prefieres el nombre largo, escríbelo con acento: **El Hubiera sí existe** ("sí" de afirmación lleva tilde). Ojo: YouTube solo deja cambiar el nombre dos veces cada 14 días.

## Identificador

`@aquielhubierasiexiste` ✓ (ya está; no lo cambies).

## Pronombres

Déjalo vacío: es un canal de marca, no una persona.

## Descripción (668 de 1,000 caracteres; copia y pega)

La primera línea es la que sale en los resultados de búsqueda, por eso lleva las preguntas y las palabras clave.

```text
¿Y si no hubiera sido penal? ¿Y si México ganaba el Mundial? Aquí el hubiera sí existe.

El Hubiera es un canal de historias animadas de "¿y si…?" sobre México. Tomamos un momento real (un penal, una final, una decisión que cambió todo) y te contamos qué hubiera pasado si la historia se iba por el otro camino.

Fútbol, historia de México y cultura pop, contados en segunda persona: tú estás ahí. Al final de cada episodio separamos lo real de lo inventado.

Episodios completos aquí y partes cortas en Shorts.
Comenta qué "¿y si…?" quieres ver y suscríbete para no perderte el siguiente.

¿Y si sí?

Historias ficticias animadas con código e inteligencia artificial.
```

## Vínculos (más abajo, en la misma pestaña)

Agrega solo las redes que ya creaste; YouTube muestra el primer vínculo junto a la descripción.

| Título | URL |
| --- | --- |
| TikTok | `https://www.tiktok.com/@aquielhubierasiexiste` |
| Instagram | `https://www.instagram.com/aquielhubierasiexiste` |
| Facebook | `https://www.facebook.com/aquielhubierasiexiste` (confirma el nombre de usuario de la página al crearla) |

**Información de contacto:** el correo para colaboraciones y prensa del canal.

## Pestaña principal

| Opción | Qué poner |
| --- | --- |
| Avance del canal (para quien no está suscrito) | **Ep. 01 · ¿Y si no hubiera sido penal?**: es el gancho más fuerte y presenta el formato |
| Video destacado (para suscriptores) | El episodio más reciente (hoy, **Ep. 02**). Cámbialo con cada episodio nuevo |
| Secciones, en este orden | 1. Videos (populares) · 2. Shorts · 3. Lista "Episodios de El Hubiera" · 4. Lista "¿Y si sí? · México potencia" |

Descripciones de las listas:

- **Episodios de El Hubiera:** "Todos los ¿y si…? en orden. Un momento real de México, partido en dos: lo que pasó y lo que hubiera pasado."
- **¿Y si sí? · México potencia:** "¿Y si México lo lograba? Historias de lo que hubiera pasado si sí."

## Configuración del canal

En Configuración > Canal y Configuración > Carga predeterminada:

- **País:** México.
- **Palabras clave:** `el hubiera, y si, qué pasaría si, historia alternativa, méxico, mundial, futbol mexicano, selección mexicana, no era penal, animación, what if en español`
- **Carga predeterminada:**
  - Categoría: **Cine y animación**.
  - Idioma: **Español (México)**.
  - Pega el bloque de vínculos al final de la descripción predeterminada.
- **Contenido alterado o sintético:** no es obligatorio marcarlo, porque es animación claramente no realista. La descripción ya aclara que son historias ficticias hechas con IA.
- **Al subir cada video:** miniatura A (la B va en "Probar y comparar"), texto de `episodios/<slug>/copys/copys.md` y la portada siempre adjunta.
