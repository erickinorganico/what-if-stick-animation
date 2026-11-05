# Storyboard · ¿Y si cruzar la garita de Tijuana tardara 30 segundos?

Expediente: `BUILD/por-validar/garita-30-segundos-v1-20261101/` (motor y rigs de Tijuana capital/cafeterías en lectura; ownership sólo este expediente).
Estado: **storyboard preparado, código en arranque**. Tiempos PROVISIONALES (sin voz; presupuesto de voz pendiente). `revision/animacion/storyboard-beats.md` tiene los 95 beats; al llegar la voz real se vuelve a correr `herramientas/gen_beats_plan.py` y los tiempos pasan a reales.
Reglas de este episodio: 30 s = tiempo de CRUCE/espera en la garita (no trayecto ni toda la frontera); la revisión sigue; la espera real es variable; rótulo «Realidad ficticia» visible en la bifurcación y en el cierre; sin números reales de espera; sin marcas ni funcionarios.
Cambio de plano cada 3–5 s (95 beats ≈ 2,8 s medios). Personajes del canal: Mariana (rig `dip2`), jefe (`func`), abuela (rig mayor), churrero, taquero; Dr. no aparece.

| Beats | Texto (resumen) | Plano / acción | Recursos |
|---|---|---|---|
| b1–b2 | «Llegó tan rápido…» / Es lunes | Cartel «00:30» sobre una garita vacía; corte a Mariana en el carro con café, reloj 7:45 | NUEVO `garitaCabinas`, `relojDigital`; `cochito` existente |
| b3–b6 | Sale de Otay, plan: cruzar; antes «madrugar»; hoy 30 s | Pan sobre fila larga recortada (collage) que se encoge hasta un solo carro; reloj corriendo 30→0 | NUEVO `filaCarros`; texto «30 s» |
| b7–b8 | Pregunta del canal + «¿Y si sí?» | Cartón título del canal, pausa de 0,5 s | marca3.js |
| b9–b15 | En la vida real: espera variable, «Hoy está feo», «Venía en la línea» | Fila real en perspectiva con vendedores; globos con las frases; semáforo de espera (verde/amarillo/rojo) sin cifras | `filaCarros`, NUEVO `semaforoEspera` |
| b16–b21 | Misma frontera; revisión y papeles; bifurcación | Línea que se divide en dos: «lo que pasa» / «lo que no pasó»; rótulo «Realidad ficticia · sátira» | transiciones.js, marca |
| b22–b35 | Oficina: jefe sin excusa, «un zapato», pregunta + «¿Y si sí?» | Oficina (room.js), Mariana 8:00, jefe 8:05 con el rig `func`; gag del zapato sobre el escritorio | `INTERIORES.oficina` (copiar de capital), NUEVO `zapato` |
| b36–b49 | Abuela en Chula Vista; visitas; «nomás me falta la sal» | Casa de la abuela, tamales/cobija; Mariana cruza 4× con contador de visitas | NUEVO `casaAbuela`, `tamales` |
| b50–b55 | Churrero y tamarindo | Churrero en la fila: el carro avanza sin parar, bolsa lanzada por la ventana; el tamarindo se muda al cine | NUEVO `carritoChurros`, `cineFachada` |
| b56–b65 | Mediodía: tacos de adobada, manejan, estacionan, llegan tarde | Reloj 12:10→13:05, trayecto en mapa mínimo con tramo «cruce 30 s» resaltado entre dos tramos de manejo | `puestoTacos`/`tacos` (capital), NUEVO `mapaMinimo` |
| b66–b72 | Dentista, farmacia, optometrista; sala de espera | Fachadas genéricas de la Zona Río / Revolución; la «fila» se convierte en sala de espera | NUEVO `fachadaDentista` (sin marcas) |
| b73–b81 | Viernes: Mariana sin fila donde pensar | Plano largo del carro frente a una garita vacía, atardecer; ícono de pensamiento vacío | `cochito`, atmósfera `tono('oro')` |
| b82–b89 | «Ojo: esto es ficción» / treinta segundos quitan la espera | Rótulo de ficción grande; plano que muestra «sigue la revisión» y «se va la fila» | marca3.js |
| b90–b95 | CTA: comentar; «¿Y si sí?» | Cuadro de comentarios con globos de excusas; cierre del canal | end card del motor |

## Código (orden de trabajo)
1. `proyecto/src/props-garita.js`: `garitaCabinas`, `filaCarros`, `relojDigital`, `semaforoEspera`, `zapato`, `casaAbuela`, `carritoChurros`, `mapaMinimo`, `fachadaDentista`.
2. `ep-garita-a.js` (b1–b49) y `ep-garita-b.js` (b50–b95) con `S/SH/ESC` del motor; `index.html` carga estos en lugar de ep-cafe-*.
3. Texto 9:16 con `herramientas/checktext.mjs` desde el primer render; bloques de 150 fotogramas.
4. Audio con tiempos reales cuando exista voz (no sintetizar).
5. H/V, clips por oración (`cortes_oracion.py`), portadas collage crema/negro/magenta con texto (`componer_texto_portada.py`), copys, limpieza con `verificar_recibo.py`.

## Pendiente real
- Voz de este episodio: presupuesto pendiente (Codex).
- `proyecto/index.html` aún apunta a archivos de episodio inexistentes: no renderiza hasta crear `ep-garita-*.js`.
