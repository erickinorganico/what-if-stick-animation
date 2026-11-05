#!/usr/bin/env python3
"""medir_guion.py · control rápido de una locución de El Hubiera.

Uso:
  python3 medir_guion.py GUION.md                 # lee la sección ## LOCUCION
  python3 medir_guion.py GUION.txt                # lee el archivo entero como locución
  python3 medir_guion.py GUION.md --txt GUION.txt # además verifica .txt == LOCUCION
  python3 medir_guion.py GUION.md --prev V2.txt   # presupuesto: máx +10 % sobre la versión previa
  python3 medir_guion.py GUION.md --literales literales.txt  # líneas que deben ir palabra por palabra
  python3 medir_guion.py GUION.md --ventanas      # imprime cada ventana de 30 s (para revisión)
  python3 medir_guion.py GUION.md --pausas 18     # segundos de pausas (si no, 0.5 s por párrafo)
  python3 medir_guion.py GUION.md --json          # salida en JSON

Sin dependencias. Estima a 145 palabras por minuto (--ppm cambia el ritmo).
Avisa; no decide. Un PASS aquí no es aprobación editorial.
"""
import argparse
import json
import re
import sys
import unicodedata

PPM = 145
FORMULAS_PROHIBIDAS = [
    "pero eso no es lo peor",
    "lo que pasó después",
    "spoiler",
    "quédate hasta el final",
    "quedate hasta el final",
    "nadie se lo esperaba",
    "nadie lo hubiera apostado",
    "lo que nadie",
    "no te imaginas",
    "y entonces pasó lo impensable",
    "lo increíble es que",
    "esta ley no existe",
    "la inventamos",
    "sabías que",
]
ABRE_MAL = [
    r"^en esta realidad",
    r"^(en )?(el año )?(mil|dos mil)\b",
    r"^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b",
    r"^(hoy|actualmente|en la vida real|imagina|imagínate)\b",
    r"^¿y si\b",
]
MORALEJA = ["moraleja", "aprendió que", "aprendieron que", "lo importante es", "al final, lo que cuenta"]


def normaliza(s: str) -> str:
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    return s.lower()


def palabras(s: str):
    return re.findall(r"[0-9A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[-'’][0-9A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*", s)


def solo_palabras(s: str) -> str:
    return " ".join(normaliza(w) for w in palabras(s))


def extrae_locucion(texto: str, es_md: bool) -> str:
    if not es_md:
        return texto.strip()
    m = re.search(r"^##\s*LOCUCI[OÓ]N\s*$", texto, flags=re.M | re.I)
    if not m:
        sys.exit("No encontré la sección '## LOCUCION' en el .md")
    resto = texto[m.end():]
    fin = re.search(r"^##\s+", resto, flags=re.M)
    return (resto[: fin.start()] if fin else resto).strip()


def frases(texto: str):
    # separa por punto, signos de cierre o salto de párrafo; conserva citas cortas
    partes = re.split(r"(?<=[\.\!\?…»\"])\s+|\n\s*\n", texto)
    return [p.strip() for p in partes if p and palabras(p)]


def segundos(n_palabras: int, ppm: int) -> float:
    return n_palabras * 60.0 / ppm


def mmss(seg: float) -> str:
    seg = int(round(seg))
    return f"{seg // 60}:{seg % 60:02d}"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("archivo")
    ap.add_argument("--txt", help="archivo .txt que debe ser idéntico a LOCUCION")
    ap.add_argument("--prev", help="locución previa (.txt o .md) para el presupuesto de palabras")
    ap.add_argument("--literales", help="archivo con líneas literales obligatorias, una por línea")
    ap.add_argument("--ventanas", action="store_true", help="imprime las ventanas de 30 s")
    ap.add_argument("--pausas", type=float, default=None, help="segundos de pausas de reacción")
    ap.add_argument("--ppm", type=int, default=PPM)
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    texto = open(a.archivo, encoding="utf-8").read()
    loc = extrae_locucion(texto, a.archivo.lower().endswith(".md"))
    parrafos = [p.strip() for p in re.split(r"\n\s*\n", loc) if p.strip()]
    todas = palabras(loc)
    n = len(todas)
    pausas = a.pausas if a.pausas is not None else round(0.5 * len(parrafos), 1)
    dur_voz = segundos(n, a.ppm)
    dur_total = dur_voz + pausas
    avisos, hallazgos = [], {}

    # --- hook: lo que se dice en los primeros 3 s (≈ 7–9 palabras) y primera frase
    fr = frases(loc)
    primeras8 = " ".join(todas[:8])
    primera = fr[0] if fr else ""
    n_primera = len(palabras(primera))
    hallazgos["hook_3s"] = primeras8
    hallazgos["primera_frase"] = primera
    hallazgos["primera_frase_palabras"] = n_primera
    if n_primera > 14:
        avisos.append(f"Hook: la primera frase tiene {n_primera} palabras (> 14). Si es cita literal, está bien; si no, corta.")
    for pat in ABRE_MAL:
        if re.search(pat, normaliza(primera)):
            avisos.append(f"Hook: abre con contexto/fecha/fórmula ('{primera[:40]}…'). Debe abrir en acción.")
            break
    if not re.search(r"\b[a-záéíóúñ]+(a|e|an|en|ó|a[nr]on|ieron)\b", normaliza(primeras8)):
        avisos.append("Hook: no se ve un verbo de acción en las primeras 8 palabras. Revisa que pase algo.")

    # --- remate: última frase, palabra clave al final
    ultima = fr[-1] if fr else ""
    n_ultima = len(palabras(ultima))
    hallazgos["remate"] = ultima
    hallazgos["remate_palabras"] = n_ultima
    if n_ultima > 15:
        avisos.append(f"Remate: última frase de {n_ultima} palabras (> 15). Corta y deja la palabra clave al final.")
    if "?" in ultima and "hubieras" not in normaliza(ultima) and "tú" not in ultima and "tu " not in normaliza(ultima):
        avisos.append("Remate: termina en pregunta. Solo vale si es la pregunta de identificación de los episodios de visitas.")

    # --- fórmulas prohibidas y moraleja
    low = normaliza(loc)
    enc = [f for f in FORMULAS_PROHIBIDAS if normaliza(f) in low]
    if enc:
        avisos.append("Fórmulas prohibidas: " + "; ".join(enc))
    mor = [m for m in MORALEJA if normaliza(m) in low]
    if mor:
        avisos.append("Posible moraleja narrada: " + "; ".join(mor))
    y_luego = len(re.findall(r"\by luego\b|\bluego\b|\bdespués de eso\b", low))
    if y_luego:
        avisos.append(f"'luego' aparece {y_luego} vez/veces: cambia por 'por eso' / 'entonces' / 'y por lo tanto' si es escalada.")
    n_realidad = len(re.findall(r"en esta realidad", low))
    if n_realidad > 1:
        avisos.append(f"'En esta realidad' aparece {n_realidad} veces; con una basta.")

    # --- cifras en dígitos (el TTS las lee mal; escríbelas con letra)
    digs = re.findall(r"\d[\d\.,%]*", loc)
    if digs:
        avisos.append(f"Cifras en dígitos en la voz ({', '.join(digs[:6])}…): escríbelas con palabras para la locución.")

    # --- párrafos largos (posible bloque de datos o explicación)
    largos = []
    for i, p in enumerate(parrafos):
        w = len(palabras(p))
        if w > 45:
            largos.append((i + 1, w, round(segundos(w, a.ppm))))
    if largos:
        avisos.append("Párrafos de más de 45 palabras (≈18 s sin cambio): " + "; ".join(f"#{i} ({w} pal., ~{s} s)" for i, w, s in largos) + ". Trocea: una cifra o idea por beat, con un gag o reacción en medio.")
    seguidos = [i + 1 for i in range(len(parrafos) - 1) if len(palabras(parrafos[i])) > 35 and len(palabras(parrafos[i + 1])) > 35]
    if seguidos:
        avisos.append(f"Dos párrafos explicativos seguidos en #{seguidos}: mete un diálogo, un silencio o un salto de escala entre ellos.")
    dialogos = len(re.findall(r"«|—|“", loc))
    hallazgos["lineas_de_dialogo_aprox"] = dialogos
    if n > 250 and dialogos < 3:
        avisos.append("Menos de 3 líneas de diálogo actuado: el narrador explica en vez de actuar.")

    # --- ventanas de 30 s: cada una debe traer algo nuevo
    por_ventana = int(a.ppm / 2)  # ≈ 72 palabras
    ventanas = []
    for k in range(0, n, por_ventana):
        trozo = todas[k : k + por_ventana]
        ini = segundos(k, a.ppm) * (dur_total / dur_voz if dur_voz else 1)
        ventanas.append({"inicio": mmss(ini), "palabras": len(trozo), "texto": " ".join(trozo)})
    hallazgos["ventanas_30s"] = len(ventanas)

    # --- .txt == LOCUCION
    if a.txt:
        t = open(a.txt, encoding="utf-8").read()
        igual = solo_palabras(t) == solo_palabras(loc)
        hallazgos["txt_igual_a_locucion"] = igual
        if not igual:
            avisos.append("El .txt NO es idéntico a la sección LOCUCION (comparado por palabras).")

    # --- líneas literales
    if a.literales:
        faltan = []
        for linea in open(a.literales, encoding="utf-8"):
            linea = linea.strip()
            if linea and solo_palabras(linea) not in solo_palabras(loc):
                faltan.append(linea)
        hallazgos["literales_faltantes"] = faltan
        if faltan:
            avisos.append("Líneas literales que no aparecen con las mismas palabras en el mismo orden: " + " | ".join(faltan))

    # --- presupuesto de palabras
    if a.prev:
        tp = open(a.prev, encoding="utf-8").read()
        locp = extrae_locucion(tp, a.prev.lower().endswith(".md"))
        np_ = len(palabras(locp))
        delta = (n - np_) / np_ * 100 if np_ else 0
        hallazgos["prev_palabras"] = np_
        hallazgos["delta_pct"] = round(delta, 1)
        if delta > 10:
            avisos.append(f"Presupuesto: {np_} → {n} palabras ({delta:+.0f} %). Pasa de +10 %: cada gag nuevo paga con un corte, o justifica por escrito.")

    hallazgos.update({
        "palabras": n,
        "parrafos": len(parrafos),
        "pausas_s": pausas,
        "duracion_voz": mmss(dur_voz),
        "duracion_estimada": mmss(dur_total),
        "avisos": avisos,
    })

    if a.json:
        print(json.dumps(hallazgos, ensure_ascii=False, indent=2))
        return

    print(f"Palabras: {n} · párrafos: {len(parrafos)} · voz {mmss(dur_voz)} + pausas {pausas} s = ~{mmss(dur_total)} ({a.ppm} ppm)")
    print(f"Hook (3 s): «{primeras8}…»  · primera frase: {n_primera} palabras")
    print(f"Remate: «{ultima}» ({n_ultima} palabras)")
    if a.prev:
        print(f"Presupuesto: {hallazgos['prev_palabras']} → {n} ({hallazgos['delta_pct']:+} %)")
    if a.txt:
        print("txt == LOCUCION:", "sí" if hallazgos["txt_igual_a_locucion"] else "NO")
    if a.literales:
        print("Literales faltantes:", hallazgos["literales_faltantes"] or "ninguna")
    print("Avisos:" if avisos else "Avisos: ninguno (eso no es aprobación editorial).")
    for av in avisos:
        print(" -", av)
    if a.ventanas:
        print("\nVentanas de 30 s (en cada una debe pasar algo nuevo: gag, giro, amenaza, cifra, diálogo):")
        for i, v in enumerate(ventanas, 1):
            print(f"\n[{i}] {v['inicio']} · {v['palabras']} pal.\n{v['texto']}")


if __name__ == "__main__":
    main()
