#!/usr/bin/env bash
# Hoja de revisión a tamaño real de miniatura. No llama a ningún servicio: solo ImageMagick local.
# Uso: preview_movil.sh <candidata> <salida.png> [referencia1 referencia2 ...]
#  - Fila 1: la candidata a 360x202 (feed móvil), 246x138 (sugeridos) y 168x94 (barra lateral).
#  - Fila 2: la misma a 246x138 en escala de grises (¿se lee sin color?) y desenfocada (¿la masa principal sigue clara?).
#  - Fila 3 (opcional): la candidata a 246x138 junto a las referencias elegidas, al mismo tamaño, para comparar familia.
# También imprime luminosidad media (L), saturación media (S) y desviación de luminosidad (contraste global), 0-100.
set -euo pipefail
[ $# -ge 2 ] || { echo "uso: $0 candidata.png salida.png [referencias...]" >&2; exit 1; }
in="$1"; out="$2"; shift 2
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

convert "$in" -resize 1280x720^ -gravity center -extent 1280x720 "$tmp/base.png"
for s in 360x202 246x138 168x94; do convert "$tmp/base.png" -resize "$s!" "$tmp/c_$s.png"; done
convert "$tmp/c_246x138.png" -colorspace Gray "$tmp/gris.png"
convert "$tmp/c_246x138.png" -blur 0x4 "$tmp/blur.png"

montage -label '%t' -background '#0f0f0f' -fill '#ccc' "$tmp/c_360x202.png" "$tmp/c_246x138.png" "$tmp/c_168x94.png" \
  -tile 3x1 -geometry +12+12 "$tmp/fila1.png"
montage -background '#0f0f0f' "$tmp/gris.png" "$tmp/blur.png" -tile 2x1 -geometry +12+12 "$tmp/fila2.png"
filas=("$tmp/fila1.png" "$tmp/fila2.png")
if [ $# -gt 0 ]; then
  i=0; refs=()
  for r in "$@"; do convert "$r" -resize 246x138^ -gravity center -extent 246x138 "$tmp/r$i.png"; refs+=("$tmp/r$i.png"); i=$((i+1)); done
  montage -background '#0f0f0f' "$tmp/c_246x138.png" "${refs[@]}" -tile "$(( ${#refs[@]} + 1 ))x1" -geometry +12+12 "$tmp/fila3.png"
  filas+=("$tmp/fila3.png")
fi
convert -background '#0f0f0f' "${filas[@]}" -append "$out"

convert "$tmp/base.png" -colorspace HSL -format "L=%[fx:round(mean.b*100)] S=%[fx:round(mean.g*100)] " info:
convert "$tmp/base.png" -colorspace Gray -format "contraste_sdL=%[fx:round(standard_deviation*100)]\n" info:
echo "hoja: $out"
