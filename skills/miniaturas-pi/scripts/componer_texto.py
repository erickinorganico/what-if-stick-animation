#!/usr/bin/env python3
"""Compone el texto de una miniatura de PI sobre una imagen generada sin texto.

Por qué existe: los generadores fallan tildes, ñ y kerning, y cambian la tipografía en cada intento.
Componer aparte mantiene la identidad (fuente, color, posición) idéntica entre videos.

Uso mínimo:
  componer_texto.py base.png salida.png --texto "dosis."
Con jerarquía (palabra auxiliar pequeña encima de la principal, como «your / environment»):
  componer_texto.py base.png salida.png --texto "combustible" --ante "no es placer, es"

Fuente: Coolvetica Regular si está instalada (licencia de escritorio de Typodermic: uso comercial en
imágenes finales en el equipo de la persona usuaria; no la copies a la skill ni la uses en servidores).
Si no la encuentra, usa Inter Display Black (licencia OFL, libre en cualquier entorno).
"""
import argparse
import glob
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ANCHO, ALTO = 1280, 720
PALETA = {  # ver references/direccion-de-arte.md §4
    "rojo": "#D7261E", "negro": "#0B0B0B", "blanco": "#FFFFFF",
    "crema": "#F6EEE3", "tinta": "#141A2E",
}
ZONAS = {  # (x, y) relativos del ancla; la esquina inferior derecha queda libre por el contador de duración
    "sup-izq": (0, 0), "sup-centro": (0.5, 0), "sup-der": (1, 0),
    "centro-izq": (0, 0.5), "centro": (0.5, 0.5), "centro-der": (1, 0.5),
    "inf-izq": (0, 1), "inf-centro": (0.5, 1),
}
BUSQUEDA_COOLVETICA = [
    "~/Library/Fonts/coolvetica*.otf", "~/Library/Fonts/Coolvetica*.otf", "/Library/Fonts/Coolvetica*.otf",
    "C:/Windows/Fonts/coolvetica*.otf", "~/AppData/Local/Microsoft/Windows/Fonts/coolvetica*.otf",
    "~/.local/share/fonts/**/coolvetica*.otf", "~/.fonts/**/coolvetica*.otf",
]
INTER = ["/usr/share/fonts/opentype/inter/InterDisplay-Black.otf",
         "~/Library/Fonts/InterDisplay-Black.otf", "C:/Windows/Fonts/InterDisplay-Black.otf"]


def buscar_fuente(explicita):
    if explicita:
        return explicita
    for patron in BUSQUEDA_COOLVETICA:
        for f in sorted(glob.glob(os.path.expanduser(patron), recursive=True)):
            nombre = os.path.basename(f).lower()
            if "condensed" not in nombre and "compressed" not in nombre and "crammed" not in nombre \
                    and "italic" not in nombre:
                return f
    for f in INTER:
        if os.path.exists(os.path.expanduser(f)):
            return os.path.expanduser(f)
    sys.exit("No encuentro Coolvetica ni Inter Display Black: pasa --fuente RUTA")


def color(valor):
    return PALETA.get(valor, valor)


def ancho_texto(fuente, texto, tracking):
    return sum(fuente.getlength(c) for c in texto) + tracking * fuente.size * (len(texto) - 1)


def dibujar(draw, xy, texto, fuente, tracking, relleno):
    x, y = xy
    for c in texto:
        draw.text((x, y), c, font=fuente, fill=relleno)
        x += fuente.getlength(c) + tracking * fuente.size


def luminancia(rgb):
    def canal(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (canal(v) for v in rgb[:3])
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("imagen"); p.add_argument("salida")
    p.add_argument("--texto", required=True, help="palabra o frase principal (1-4 palabras)")
    p.add_argument("--ante", help="línea auxiliar pequeña encima de la principal")
    p.add_argument("--zona", default="sup-izq", choices=ZONAS)
    p.add_argument("--color", default="blanco", help="nombre de la paleta o #hex")
    p.add_argument("--color-ante", help="color de la línea auxiliar (por defecto el mismo)")
    p.add_argument("--altura", type=float, default=0.20, help="altura de la línea principal / alto de la imagen")
    p.add_argument("--tracking", type=float, default=-0.035, help="interletrado en em (negativo = apretado)")
    p.add_argument("--margen", type=float, default=0.055)
    p.add_argument("--mayusculas", action="store_true")
    p.add_argument("--sombra", action="store_true", help="sombra suave para texto sobre foto")
    p.add_argument("--fuente")
    a = p.parse_args()

    base = Image.open(a.imagen).convert("RGB")
    escala = max(ANCHO / base.width, ALTO / base.height)
    base = base.resize((round(base.width * escala), round(base.height * escala)), Image.LANCZOS)
    izq, arr = (base.width - ANCHO) // 2, (base.height - ALTO) // 2
    base = base.crop((izq, arr, izq + ANCHO, arr + ALTO))

    ruta = buscar_fuente(a.fuente)
    texto = a.texto.upper() if a.mayusculas else a.texto
    tam = round(ALTO * a.altura / 0.72)  # la altura de mayúscula ronda el 72 % del cuerpo
    max_ancho = ANCHO * (1 - 2 * a.margen)
    fuente = ImageFont.truetype(ruta, tam)
    while ancho_texto(fuente, texto, a.tracking) > max_ancho and tam > 20:
        tam = int(tam * 0.95)
        fuente = ImageFont.truetype(ruta, tam)
    if tam < round(ALTO * a.altura / 0.72):
        print(f"aviso: texto reducido a {tam}px para caber; considera menos palabras", file=sys.stderr)
    f_ante = ImageFont.truetype(ruta, max(18, round(tam * 0.32))) if a.ante else None

    w = ancho_texto(fuente, texto, a.tracking)
    asc, desc = fuente.getmetrics()
    h = asc + desc
    h_ante = sum(f_ante.getmetrics()) * 0.85 if f_ante else 0
    bloque_h = h + h_ante
    rx, ry = ZONAS[a.zona]
    m = ANCHO * a.margen
    x = m + rx * (ANCHO - 2 * m - w)
    y = m + ry * (ALTO - 2 * m - bloque_h)

    capa = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    if a.ante:
        w_ante = ancho_texto(f_ante, a.ante, a.tracking)
        x_ante = x + rx * (w - w_ante)
        dibujar(d, (x_ante, y), a.ante, f_ante, a.tracking, color(a.color_ante or a.color))
    dibujar(d, (x, y + h_ante), texto, fuente, a.tracking, color(a.color))

    if a.sombra:
        sombra = Image.new("RGBA", base.size, (0, 0, 0, 0))
        sombra.putalpha(capa.getchannel("A").point(lambda v: int(v * 0.45)))
        base = Image.alpha_composite(base.convert("RGBA"), sombra.filter(ImageFilter.GaussianBlur(tam * 0.06)))
    final = Image.alpha_composite(base.convert("RGBA"), capa).convert("RGB")
    final.save(a.salida, quality=95)

    caja = (int(x), int(y), int(x + w), int(y + bloque_h))
    fondo = base.convert("RGB").crop(caja).resize((1, 1), Image.BOX).getpixel((0, 0))
    l1 = luminancia(Image.new("RGB", (1, 1), color(a.color)).getpixel((0, 0)))
    l2 = luminancia(fondo)
    ratio = (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)
    print(f"fuente: {os.path.basename(ruta)}  tamaño: {tam}px  ancho: {w / ANCHO:.0%}")
    print(f"contraste texto/fondo medio: {ratio:.1f}:1 " + ("(bajo: <4.5, revisa a 168 px)" if ratio < 4.5 else "(ok)"))
    print(f"salida: {a.salida}")


if __name__ == "__main__":
    main()
