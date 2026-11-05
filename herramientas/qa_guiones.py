#!/usr/bin/env python3
"""qa_guiones.py · control en lote de una carpeta de guiones de El Hubiera.

Cada guion es un par NN-slug.md (con secciones ## FICHA, ## LOCUCION, ## STORYBOARD
opcional, ## FUENTES-Y-SUPUESTOS, ## CHECKLIST) + NN-slug.txt (solo la locución).

Uso:
  python3 herramientas/qa_guiones.py <carpeta> [--prev <carpeta_v_anterior>]
          [--literales literales.json] [--sin-storyboard] [--json]

Revisa por episodio: secciones, .txt == LOCUCION (por palabras), líneas literales,
fórmulas prohibidas, presupuesto de palabras (+10 % sobre --prev), primeras 8 palabras
y remate. Para el detalle de un guion usa skills/guion-hubiera/scripts/medir_guion.py.
Sin dependencias. Avisa; no aprueba. Sale con código 1 si hay errores de estructura.
"""
import argparse, json, os, re, sys, unicodedata

SECCIONES = ["FICHA", "LOCUCION", "STORYBOARD", "FUENTES-Y-SUPUESTOS", "CHECKLIST"]
PROHIBIDAS = ["pero eso no es lo peor", "lo que paso despues", "quedate hasta el final",
              "nadie se lo esperaba", "spoiler", "esta ley no existe", "la inventamos", "sabias que"]
NOMBRES_VETADOS = ["rocio", "ofe"]
PPM = 145


def norm(s):
    s = unicodedata.normalize("NFKD", s)
    return "".join(c for c in s if not unicodedata.combining(c)).lower()


def palabras(s):
    return re.findall(r"[0-9a-z]+", norm(s))


def seccion(md, nombre):
    m = re.search(r"^##\s*" + re.escape(nombre) + r"\s*$(.*?)(?=^##\s|\Z)", md, re.M | re.S)
    return m.group(1).strip() if m else None


def leer(p):
    with open(p, encoding="utf-8") as f:
        return f.read().replace("\r\n", "\n")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("carpeta")
    ap.add_argument("--prev")
    ap.add_argument("--literales")
    ap.add_argument("--sin-storyboard", action="store_true", help="no exigir ## STORYBOARD (etapa 2)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    lit = {}
    if a.literales:
        lit = {k: v for k, v in json.loads(leer(a.literales)).items() if not k.startswith("_")}
    slugs = sorted(f[:-3] for f in os.listdir(a.carpeta) if f.endswith(".md"))
    filas, errores = [], 0
    for slug in slugs:
        md = leer(os.path.join(a.carpeta, slug + ".md"))
        txt_p = os.path.join(a.carpeta, slug + ".txt")
        avisos, errs = [], []
        req = [s for s in SECCIONES if not (a.sin_storyboard and s == "STORYBOARD")]
        for s in req:
            if seccion(md, s) is None:
                errs.append(f"falta ## {s}")
        loc = seccion(md, "LOCUCION") or ""
        if not os.path.exists(txt_p):
            errs.append("falta .txt")
            txt = loc
        else:
            txt = leer(txt_p)
            if palabras(txt) != palabras(loc):
                errs.append(".txt != LOCUCION")
        w = palabras(txt)
        base = " ".join(w)
        for l in lit.get(slug, []):
            if " ".join(palabras(l)) not in base:
                errs.append(f"falta literal «{l}»")
        for p in PROHIBIDAS:
            if p in base:
                avisos.append(f"fórmula «{p}»")
        for n in NOMBRES_VETADOS:
            if re.search(r"\b" + n + r"\b", base):
                avisos.append(f"nombre vetado «{n}»")
        delta = None
        if a.prev and os.path.exists(os.path.join(a.prev, slug + ".txt")):
            wp = len(palabras(leer(os.path.join(a.prev, slug + ".txt"))))
            delta = round((len(w) - wp) / wp * 100, 1) if wp else None
            if delta is not None and delta > 10:
                avisos.append(f"presupuesto {delta:+} % (> +10 %)")
        parrafos = [p for p in re.split(r"\n\s*\n", txt.strip()) if p.strip()]
        remate = parrafos[-1].strip().replace("\n", " ") if parrafos else ""
        seg = len(w) * 60 / PPM + 0.5 * len(parrafos)
        filas.append({"slug": slug, "palabras": len(w), "delta_pct": delta,
                      "duracion": f"{int(seg // 60)}:{int(seg % 60):02d}",
                      "hook_8": " ".join(txt.split()[:8]), "remate": remate[-90:],
                      "errores": errs, "avisos": avisos})
        errores += len(errs)

    if a.json:
        print(json.dumps(filas, ensure_ascii=False, indent=2))
    else:
        print(f"{'episodio':30} {'pal.':>5} {'Δ%':>6} {'dur.':>5}  estado")
        for f in filas:
            d = "" if f["delta_pct"] is None else f"{f['delta_pct']:+.0f}"
            estado = "; ".join(f["errores"] + f["avisos"]) or "OK"
            print(f"{f['slug'][:30]:30} {f['palabras']:>5} {d:>6} {f['duracion']:>5}  {estado}")
        print(f"\n{len(filas)} guiones · {errores} errores de estructura · los avisos no bloquean.")
        print("Un OK aquí no es aprobación editorial.")
    sys.exit(1 if errores else 0)


if __name__ == "__main__":
    main()
