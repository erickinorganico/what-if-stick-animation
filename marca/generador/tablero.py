# Tablero de identidad 3x3 (3000x2000) a partir de las piezas exportadas por kit3_export.mjs
# uso (desde marca/generador): python tablero.py [kit=../identidad-v3] [salida=../identidad-v3/tablero-de-identidad.jpg]
# Necesita los paneles de guía (kit/guia/p-*.png): node kit3_export.mjs ../identidad-v3 guia
from PIL import Image, ImageDraw, ImageFont
import sys, os
AQUI = os.path.dirname(os.path.abspath(__file__))
K = sys.argv[1] if len(sys.argv) > 1 else os.path.join(AQUI, '..', 'identidad-v3')
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(K, 'tablero-de-identidad.jpg')
F = os.path.join(AQUI, '..', 'fuentes') + os.sep
mono = ImageFont.truetype(F + 'GeistMono-Regular.ttf', 20); sans = ImageFont.truetype(F + 'InstrumentSans-Regular.ttf', 30); sansB = ImageFont.truetype(F + 'InstrumentSans-Bold.ttf', 30)
HUESO = (239, 233, 223); HT = (239, 233, 223, 158); NEG = (13, 13, 15)
W, H, G, M = 3000, 2000, 30, 60
pw = (W - 2 * M - 2 * G) // 3; ph = (H - 2 * M - 2 * G - 80) // 3
B = Image.new('RGB', (W, H), (24, 24, 27)); d = ImageDraw.Draw(B, 'RGBA')
def slot(i): r, c = divmod(i, 3); return (M + c * (pw + G), M + 80 + r * (ph + G))
def fit(im, w, h, cover=True):
    im = im.convert('RGBA'); s = max(w / im.width, h / im.height) if cover else min(w / im.width, h / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS); x = (im.width - w) // 2; y = (im.height - h) // 2
    return im.crop((x, y, x + w, y + h)) if cover else im
def label(x, y, n, t, col=HT): d.text((x + 40, y + 36), n, font=mono, fill=col); d.text((x + 96, y + 36), t.upper(), font=mono, fill=col)
def panel(i, im): x, y = slot(i); B.paste(im.convert('RGB'), (x, y))
def dark(i):
    x, y = slot(i); bg = Image.open(K + '/guia/p-color.png').convert('RGB').resize((pw, ph)); ImageDraw.Draw(bg).rectangle([0, 0, pw, ph], fill=NEG); B.paste(bg, (x, y)); return x, y
# 1 portada
x, y = dark(0); logo = fit(Image.open(K + '/logo/logo-horizontal-transparente.png'), pw - 120, ph, cover=False); B.paste(logo, (x + (pw - logo.width) // 2, y + (ph - logo.height) // 2 - 10), logo); label(x, y, '01', 'logotipo')
d.text((x + 40, y + ph - 56), 'Historias de lo que pudo pasar', font=ImageFont.truetype(F + 'InstrumentSans-Regular.ttf', 24), fill=HT)
# 2 construcción, 3 esencia, 4 color, 5 tipografía
for i, n in [(1, 'p-construccion'), (2, 'p-esencia'), (3, 'p-color'), (4, 'p-tipografia')]: panel(i, Image.open(K + f'/guia/{n}.png').resize((pw, ph), Image.LANCZOS))
# 6 canal de YouTube (maqueta)
x, y = dark(5); ban = fit(Image.open(K + '/youtube/youtube-banner.png'), pw - 80, 230); B.paste(ban, (x + 40, y + 90))
av = Image.open(K + '/perfil/avatar-1080.png').convert('RGB').resize((150, 150), Image.LANCZOS); m = Image.new('L', (150, 150), 0); ImageDraw.Draw(m).ellipse([0, 0, 149, 149], fill=255); B.paste(av, (x + 40, y + 350), m)
d.text((x + 215, y + 368), 'El Hubiera', font=ImageFont.truetype(F + 'InstrumentSans-Bold.ttf', 40), fill=HUESO); d.text((x + 215, y + 422), '@aquielhubierasiexiste · historias de lo que pudo pasar', font=ImageFont.truetype(F + 'InstrumentSans-Regular.ttf', 22), fill=HT)
d.rounded_rectangle([x + 215, y + 462, x + 395, y + 508], radius=23, fill=HUESO); d.text((x + 238, y + 470), 'Suscribirme', font=ImageFont.truetype(F + 'InstrumentSans-Bold.ttf', 24), fill=NEG); label(x, y, '06', 'canal')
# 7 miniatura
th = fit(Image.open(K + '/miniaturas/ep01-miniatura-a.png'), pw, ph); panel(6, th); x, y = slot(6); d.rectangle([x + pw - 250, y + ph - 64, x + pw, y + ph], fill=(13, 13, 15, 255)); d.text((x + pw - 220, y + ph - 44), '07', font=mono, fill=HT); d.text((x + pw - 164, y + ph - 44), 'MINIATURA', font=mono, fill=HT)
# 8 destacadas + marca de agua
x, y = dark(7); ks = ['episodios', 'mexico', 'futbol', 'preguntas', 'detras', 'campeones']; s = 120
for j, k in enumerate(ks):
    im = Image.open(K + f'/instagram/instagram-destacada-{k}.png').convert('RGB').resize((s, s), Image.LANCZOS); m = Image.new('L', (s, s), 0); ImageDraw.Draw(m).ellipse([0, 0, s - 1, s - 1], fill=255)
    cx = x + 60 + (j % 3) * 150; cy = y + 120 + (j // 3) * 170; B.paste(im, (cx, cy), m); d.ellipse([cx - 5, cy - 5, cx + s + 4, cy + s + 4], outline=(239, 233, 223, 60), width=2)
    d.text((cx + s // 2, cy + s + 14), ['episodios', 'méxico', 'futbol', 'preguntas', 'detrás', 'campeones'][j], font=ImageFont.truetype(F + 'InstrumentSans-Regular.ttf', 18), fill=HT, anchor='mt')
wm = Image.open(K + '/youtube/youtube-marca-de-agua.png').convert('RGBA').resize((200, 200), Image.LANCZOS); B.paste(wm, (x + pw - 260, y + 170), wm); d.text((x + pw - 160, y + 390), 'marca de agua', font=ImageFont.truetype(F + 'InstrumentSans-Regular.ttf', 18), fill=HT, anchor='mt'); label(x, y, '08', 'destacadas · marca de agua')
# 9 cierre
panel(8, Image.open(K + '/guia/p-cierre.png').resize((pw, ph), Image.LANCZOS))
# encabezado
d.text((M, 46), 'EL HUBIERA', font=ImageFont.truetype(F + 'GeistMono-Bold.ttf', 22), fill=HUESO); d.text((M + 190, 46), 'IDENTIDAD V3 · BIFURCACIÓN', font=mono, fill=HT); d.text((W - M, 46), '@AQUIELHUBIERASIEXISTE · 25·10·2026', font=mono, fill=HT, anchor='ra')
d.ellipse([M + 168, 52, M + 178, 62], fill=(228, 0, 124))
B.save(OUT, quality=92)
print('ok', pw, ph)
