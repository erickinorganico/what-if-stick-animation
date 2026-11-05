# Plantillas de salida

Copia la plantilla de la etapa que entregues. Los corchetes son instrucciones; no los dejes en el texto final.

## Etapa 1 · ficha y hooks

```
# ¿Y si [premisa]?

## FICHA (10 líneas)
1. Título: ¿Y si …?
2. Regla del mundo: [una frase; lo único que cambia]
3. Motor: [qué voluntad choca con la regla: persona, gremio, institución]
4. Vehículo: [quién recorre el sistema; nombre común]
5. Escalada: [4–6 pasos, cada uno «por eso» del anterior, subiendo de escala: persona → ciudad → país → mundo/imposible]
6. Giro (≈ mitad): [reencuadre en una frase]
7. Loop: [qué se siembra antes de 0:20] → [cómo regresa transformado en el remate]
8. Tono: nivel [1 contenido / 2 sátira institucional / 3 género]; remate en clave [seca / negra / distópica / horror / optimista]; momento contenido previsto: […]
9. Datos reales: [id de fuente + cifra, unidad, periodo] o «ninguno»
10. Duración objetivo [m:ss] · Riesgos para el humano: [instituciones reales, localismos, dolor, dependencias]

## HOOKS (elige uno)
1. «[primera frase ≤ 14 palabras, en acción]» → [50–70 palabras hasta el primer pago] (primer pago: […] ~m:ss; loop sembrado: […])
2. «…» → …
3. «…» → …
Recomendación: [n], porque [una línea].

## HERMANOS (solo si es serie)
| Episodio | Hook (imagen) | Motor | Re-gancho dominante | Giro | Género del remate | Remate (tipo) |
```

## Etapa 2 · episodio `NN-slug.md`

```
# ¿Y si …?

## FICHA
- **Hook principal (0–3 s):** «…» ([n] palabras; qué pregunta abre)
- **Hooks alternativos:** 1. «…» → … 2. «…» → …
- **Loop principal → dónde se paga:** [siembra m:ss] → [pago m:ss]
- **Motor / escalada / giro / tono:** [de la ficha de etapa 1, actualizados]
- **Remate literal:** «…»
- **Duración estimada:** m:ss ([n] palabras a 145 ppm + [x] s de pausas)
- **Narrador:** [voces que actúa; plano puntual del narrador dibujado, si lo hay]
- **Mapa dopamínico:**

| Tiempo | Beat | Tipo |
|---|---|---|
| 0:00 | … | gancho |
| 0:0x | … | pago |
| … | … | re-gancho (mecanismo) / giro / interrupción / clímax / remate |

## LOCUCION

[Solo lo que dice el narrador. Párrafos cortos. Diálogos con «» o —. Cifras con letra.]

## FUENTES-Y-SUPUESTOS
- **HECHO (ID):** cifra, unidad, periodo, universo; fuente (URL o archivo); qué se dice en voz y qué va a rótulo.
- **SUPUESTO:** la regla del «y si».
- **CONSECUENCIA (sátira):** todo lo inventado, incluidas cifras absurdas e instituciones usadas dentro del absurdo.
- **Riesgos para el humano:** [lista con alternativa para cada uno]

## CHECKLIST
- Hook en 3 s: … · Primer pago: m:ss · Loop: … → … · Giro: m:ss · Remate: [n] palabras, clave «…»
- Re-ganchos (mecanismo y minuto): …
- Líneas literales conservadas: … · Fórmulas prohibidas: ninguna · Datos: solo de fuentes
- Hermanos: en qué se diferencia · Palabras antes → después: … (+x %)
- Pendiente de revisión humana.
```

`NN-slug.txt`: solo el contenido de `## LOCUCION`, idéntico palabra por palabra. Verifica con `python3 scripts/medir_guion.py NN-slug.md --txt NN-slug.txt`.

## Etapa 2 · `notas/NN-slug.md` (si reescribes)

```
# Notas · NN-slug
## Hook antes → después
## Qué corté / Qué añadí (viñetas; cada añadido con su corte)
## Palabras y duración: antes → después (+x %), duración estimada
## Autoevaluación 1–10: hook, cadencia, escalada, gags, giro, remate, voz oral, fidelidad al humano
## Dudas o riesgos para el humano
```

## Archivo de líneas literales (`literales.txt`)

Una línea por frase que debe aparecer con las mismas palabras en el mismo orden (la puntuación puede cambiar):

```
¿Eso fue un soborno? Aquí no hacemos eso.
Pues si no soy perro
```

## Etapa 3 · storyboard

Ver `storyboard.md`. Encabezado: `| # | Intervalo | Cita inicial → final | Plano/acción/acting | Texto en pantalla | Sonido |`, nota técnica de intervalos al pie.
