#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 3 || $# -gt 4 ]]; then
  echo "Usage: $0 INPUT OUTPUT PROFILE [WEBP_QUALITY]" >&2
  echo "Profiles: clean, daylight, disposable-daylight, disposable-focus, night, native-film" >&2
  exit 2
fi

input_path="$1"
output_path="$2"
profile="$3"
webp_quality="${4:-94}"

if [[ ! -f "$input_path" ]]; then
  echo "Input image not found: $input_path" >&2
  exit 2
fi

if ! command -v convert >/dev/null 2>&1 || ! command -v identify >/dev/null 2>&1; then
  echo "ImageMagick's convert and identify commands are required." >&2
  exit 2
fi

srgb_profile="/usr/share/color/icc/sRGB.icc"
if [[ ! -f "$srgb_profile" ]]; then
  echo "Required sRGB profile not found: $srgb_profile" >&2
  exit 2
fi

# The film profiles share a print curve, luminance-only grain, pre-grain
# softness, warm highlight bloom, and a broad vignette. Their scene-specific
# values were tuned against the supplied daylight, cafe, and low-light film
# references. Noise is seeded from the source bytes for repeatable builds.
clean_output="false"
case "$profile" in
  clean)
    clean_output="true"
    ;;
  daylight)
    gamma="1.065"; sigmoid="2.10"; sigmoid_mid="47.5"
    fade_black="3.2"; fade_white="96.4"; saturation="85"
    red_mul="1.034"; red_sub="1.15"
    green_mul="1.003"; green_add="0.60"
    blue_mul="0.940"; blue_add="4.0"
    softness_sigma="0.72"; softness_opacity="7"
    bloom_sigma="4.4"; bloom_floor="69"; bloom_opacity="6"
    coarse_grain_scale="0"; coarse_grain_amount="0"; coarse_grain_opacity="0"
    grain_amount="0.26"
    vignette_edge="95"; focus_x="50"; focus_y="50"
    pre_blur_sigma="0"
    target_ratio="1.005"
    ;;
  disposable-daylight)
    gamma="1.065"; sigmoid="2.10"; sigmoid_mid="47.5"
    fade_black="3.8"; fade_white="96.0"; saturation="82"
    red_mul="1.034"; red_sub="1.15"
    green_mul="1.003"; green_add="0.60"
    blue_mul="0.940"; blue_add="4.0"
    softness_sigma="0.95"; softness_opacity="11"
    bloom_sigma="4.4"; bloom_floor="69"; bloom_opacity="7"
    coarse_grain_scale="60"; coarse_grain_amount="0.58"; coarse_grain_opacity="72"
    grain_amount="0.44"
    vignette_edge="95"; focus_x="50"; focus_y="50"
    pre_blur_sigma="0"
    target_ratio="1.005"
    ;;
  disposable-focus)
    gamma="1.065"; sigmoid="2.10"; sigmoid_mid="47.5"
    fade_black="3.8"; fade_white="96.0"; saturation="82"
    red_mul="1.034"; red_sub="1.15"
    green_mul="1.003"; green_add="0.60"
    blue_mul="0.940"; blue_add="4.0"
    softness_sigma="0.95"; softness_opacity="11"
    bloom_sigma="4.4"; bloom_floor="69"; bloom_opacity="7"
    coarse_grain_scale="60"; coarse_grain_amount="0.58"; coarse_grain_opacity="72"
    grain_amount="0.44"
    vignette_edge="93"; focus_x="86"; focus_y="56"
    pre_blur_sigma="0"
    target_ratio="1.005"
    ;;
  night)
    gamma="1.095"; sigmoid="2.05"; sigmoid_mid="46"
    fade_black="4.5"; fade_white="95.2"; saturation="84"
    red_mul="1.040"; red_sub="1.45"
    green_mul="1.006"; green_add="0.85"
    blue_mul="0.925"; blue_add="4.7"
    softness_sigma="1.10"; softness_opacity="12"
    bloom_sigma="4.4"; bloom_floor="65"; bloom_opacity="7"
    coarse_grain_scale="0"; coarse_grain_amount="0"; coarse_grain_opacity="0"
    grain_amount="0.34"
    vignette_edge="93"; focus_x="50"; focus_y="48"
    pre_blur_sigma="0.45"
    target_ratio="1.045"
    ;;
  native-film)
    gamma="1.000"; sigmoid="0.15"; sigmoid_mid="50"
    fade_black="0.6"; fade_white="99.4"; saturation="99"
    red_mul="1.002"; red_sub="0.05"
    green_mul="1.000"; green_add="0.00"
    blue_mul="0.998"; blue_add="0.10"
    softness_sigma="0.30"; softness_opacity="2"
    bloom_sigma="3.0"; bloom_floor="74"; bloom_opacity="1"
    coarse_grain_scale="0"; coarse_grain_amount="0"; coarse_grain_opacity="0"
    grain_amount="0.05"
    vignette_edge="99"; focus_x="50"; focus_y="50"
    pre_blur_sigma="0"
    target_ratio="1.000"
    ;;
  *)
    echo "Unknown profile: $profile" >&2
    echo "Profiles: clean, daylight, disposable-daylight, disposable-focus, night, native-film" >&2
    exit 2
    ;;
esac

work_dir="$(mktemp -d)"
trap 'rm -rf "$work_dir"' EXIT
mkdir -p "$(dirname "$output_path")"

source_png="$work_dir/source-srgb.png"
graded_png="$work_dir/graded.png"
candidate_webp="$work_dir/candidate.webp"

# Convert embedded Display-P3 sources to sRGB before grading. Sources without
# an embedded profile are treated as sRGB. Auto-orient happens once, before all
# geometry measurements, and output metadata is removed for web delivery.
convert "$input_path" -auto-orient -profile "$srgb_profile" -alpha off "$source_png"

if [[ "$clean_output" == "true" ]]; then
  source_mean="$(convert "$source_png" -colorspace Gray -format '%[fx:mean]' info:)"
  source_sd="$(convert "$source_png" -colorspace Gray -format '%[fx:standard_deviation]' info:)"
  convert "$source_png" \
    -strip -define webp:method=6 -quality "$webp_quality" "$output_path"
  output_mean="$(convert "$output_path" -colorspace Gray -format '%[fx:mean]' info:)"
  output_sd="$(convert "$output_path" -colorspace Gray -format '%[fx:standard_deviation]' info:)"
  output_width="$(identify -format '%w' "$output_path")"
  output_height="$(identify -format '%h' "$output_path")"
  printf 'profile=clean dimensions=%sx%s source_mean=%s output_mean=%s source_sd=%s output_sd=%s\n' \
    "$output_width" "$output_height" "$source_mean" "$output_mean" "$source_sd" "$output_sd"
  exit 0
fi

width="$(identify -format '%w' "$source_png")"
height="$(identify -format '%h' "$source_png")"
focus_x_px=$(( width * focus_x / 100 ))
focus_y_px=$(( height * focus_y / 100 ))
grain_seed="$(cksum < "$input_path" | awk '{print $1}')"
coarse_grain_seed="$(printf '%s' "${grain_seed}-coarse" | cksum | awk '{print $1}')"

pre_blur_args=()
if [[ "$pre_blur_sigma" != "0" ]]; then
  pre_blur_args=(-blur "0x${pre_blur_sigma}")
fi

coarse_grain_args=()
if [[ "$coarse_grain_scale" != "0" ]]; then
  coarse_width=$(( (width * coarse_grain_scale + 50) / 100 ))
  coarse_height=$(( (height * coarse_grain_scale + 50) / 100 ))
  coarse_grain_args=(
    '(' -size "${coarse_width}x${coarse_height}" xc:gray50 -colorspace Gray
    -seed "$coarse_grain_seed" -attenuate "$coarse_grain_amount" +noise Gaussian
    -filter Gaussian -resize "${width}x${height}!"
    -alpha set -channel A -evaluate set "${coarse_grain_opacity}%" +channel ')'
    -compose SoftLight -composite
  )
fi

source_mean="$(convert "$source_png" -colorspace Gray -format '%[fx:mean]' info:)"
source_sd="$(convert "$source_png" -colorspace Gray -format '%[fx:standard_deviation]' info:)"
target_mean="$(awk -v mean="$source_mean" -v ratio="$target_ratio" 'BEGIN { printf "%.9f", mean * ratio }')"

# Softness is composited before grain so the texture remains crisp like a scan.
# Noise is added only to Lab lightness, making it highly correlated across RGB
# like the supplied references rather than independent digital color speckles.
convert "$source_png" \
  "${pre_blur_args[@]}" \
  -gamma "$gamma" \
  -sigmoidal-contrast "${sigmoid}x${sigmoid_mid}%" \
  +level "${fade_black}%,${fade_white}%" \
  -modulate "100,${saturation},100" \
  -channel R -evaluate multiply "$red_mul" -evaluate subtract "${red_sub}%" +channel \
  -channel G -evaluate multiply "$green_mul" -evaluate add "${green_add}%" +channel \
  -channel B -evaluate multiply "$blue_mul" -evaluate add "${blue_add}%" +channel \
  \( +clone -blur "0x${softness_sigma}" \
     -alpha set -channel A -evaluate set "${softness_opacity}%" +channel \) \
  -compose Over -composite \
  \( +clone -blur "0x${bloom_sigma}" -level "${bloom_floor}%,100%" \
     -channel R -evaluate multiply 1.025 +channel \
     -channel B -evaluate multiply 0.975 +channel \
     -alpha set -channel A -evaluate set "${bloom_opacity}%" +channel \) \
  -compose Screen -composite \
  "${coarse_grain_args[@]}" \
  \( -size "${width}x${height}" \
     -define gradient:center="${focus_x_px},${focus_y_px}" \
     "radial-gradient:white-gray${vignette_edge}" \) \
  -compose Multiply -composite \
  -colorspace Lab -channel R \
  -seed "$grain_seed" -attenuate "$grain_amount" +noise Gaussian \
  +channel -colorspace sRGB \
  -clamp -depth 8 "$graded_png"

# Match the decoded WebP's mean luminance to the scene target. This prevents the
# film curve, vignette, and final codec from accidentally making daylight photos
# dimmer; the low-light profile is intentionally lifted by 4.5%.
brightness_low="88.0"
brightness_high="118.0"
for _ in {1..13}; do
  brightness_mid="$(awk -v low="$brightness_low" -v high="$brightness_high" 'BEGIN { printf "%.7f", (low + high) / 2 }')"
  convert "$graded_png" \
    -modulate "$brightness_mid",100,100 \
    -strip -define webp:method=6 -quality "$webp_quality" "$candidate_webp"
  candidate_mean="$(convert "$candidate_webp" -colorspace Gray -format '%[fx:mean]' info:)"

  if awk -v candidate="$candidate_mean" -v target="$target_mean" 'BEGIN { exit !(candidate < target) }'; then
    brightness_low="$brightness_mid"
  else
    brightness_high="$brightness_mid"
  fi
done

convert "$graded_png" \
  -modulate "$brightness_high",100,100 \
  -strip -define webp:method=6 -quality "$webp_quality" "$output_path"

output_mean="$(convert "$output_path" -colorspace Gray -format '%[fx:mean]' info:)"
output_sd="$(convert "$output_path" -colorspace Gray -format '%[fx:standard_deviation]' info:)"
output_width="$(identify -format '%w' "$output_path")"
output_height="$(identify -format '%h' "$output_path")"

printf 'profile=%s seed=%s dimensions=%sx%s brightness=%s source_mean=%s target_mean=%s output_mean=%s source_sd=%s output_sd=%s\n' \
  "$profile" "$grain_seed" "$output_width" "$output_height" "$brightness_high" \
  "$source_mean" "$target_mean" "$output_mean" "$source_sd" "$output_sd"
