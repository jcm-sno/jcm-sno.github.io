export const paletteStorageKey = "james-samantha-wedding-palette-v2";
export const defaultPaletteId = "florida-garden";

export const paletteSlots = ["White", "Paper", "Warm", "Green", "Blue", "Ink"] as const;

export const paletteOptions = [
  {
    id: "florida-garden",
    name: "Florida Garden",
    status: "Default",
    note: "Florida Sunrise's warm sand, tangerine, palm green, and deep teal, with Pressed Garden's softer periwinkle blue.",
    colors: [
      { role: "White", hex: "#FFFDF8" },
      { role: "Paper", hex: "#F7EACF" },
      { role: "Warm", hex: "#F2A65A" },
      { role: "Green", hex: "#6FAF82" },
      { role: "Blue", hex: "#A9B9D6" },
      { role: "Ink", hex: "#153B3B" },
    ],
  },
  {
    id: "coastal-bright",
    name: "Coastal Bright",
    status: "Alternative 01",
    note: "More color in the green and blue, with coral kept warm, dusty, and controlled.",
    colors: [
      { role: "White", hex: "#FFFFFF" },
      { role: "Paper", hex: "#F5F0E8" },
      { role: "Warm", hex: "#E09E7E" },
      { role: "Green", hex: "#6F9F72" },
      { role: "Blue", hex: "#A6CED9" },
      { role: "Ink", hex: "#1C2724" },
    ],
  },
  {
    id: "florida-sunrise",
    name: "Florida Sunrise",
    status: "Alternative 02",
    note: "Cheerful sand, tangerine, palm green, and lagoon blue with deep teal ink.",
    colors: [
      { role: "White", hex: "#FFFDF8" },
      { role: "Paper", hex: "#F7EACF" },
      { role: "Warm", hex: "#F2A65A" },
      { role: "Green", hex: "#6FAF82" },
      { role: "Blue", hex: "#79C6D0" },
      { role: "Ink", hex: "#153B3B" },
    ],
  },
  {
    id: "pressed-garden",
    name: "Pressed Garden",
    status: "Alternative 03",
    note: "Blush paper, dusty rose, olive, and periwinkle with aubergine ink.",
    colors: [
      { role: "White", hex: "#FFFCF7" },
      { role: "Paper", hex: "#F2E4E1" },
      { role: "Warm", hex: "#CD8A82" },
      { role: "Green", hex: "#8AA26E" },
      { role: "Blue", hex: "#A9B9D6" },
      { role: "Ink", hex: "#322A38" },
    ],
  },
  {
    id: "mid-century-atlantic",
    name: "Mid-Century Atlantic",
    status: "Alternative 04",
    note: "Cool fog, persimmon, sea-glass green, and cornflower blue with navy ink.",
    colors: [
      { role: "White", hex: "#FDFEFE" },
      { role: "Paper", hex: "#EAF1EF" },
      { role: "Warm", hex: "#E4775E" },
      { role: "Green", hex: "#69A88C" },
      { role: "Blue", hex: "#82B8DD" },
      { role: "Ink", hex: "#14273D" },
    ],
  },
  {
    id: "atlantic-garden",
    name: "Atlantic Garden",
    status: "Alternative 05",
    note: "Weathered blue-gray, dusty coral, plant green, and saturated Atlantic navy—closer to the save-the-date's coastal film tones.",
    colors: [
      { role: "White", hex: "#FFFFFF" },
      { role: "Paper", hex: "#F5F0E8" },
      { role: "Warm", hex: "#E09E7E" },
      { role: "Green", hex: "#69966B" },
      { role: "Blue", hex: "#AABBC0" },
      { role: "Ink", hex: "#08243E" },
    ],
  },
  {
    id: "save-the-date-editorial",
    name: "Save-the-Date Editorial",
    status: "Alternative 06",
    note: "A literal low-chroma pull from the save-the-date: white border, film gray-blue, olive-khaki, skin-tone warmth, and charcoal.",
    colors: [
      { role: "White", hex: "#FFFFFF" },
      { role: "Paper", hex: "#F2F0EA" },
      { role: "Warm", hex: "#C88973" },
      { role: "Green", hex: "#978F6F" },
      { role: "Blue", hex: "#959B9E" },
      { role: "Ink", hex: "#2D3433" },
    ],
  },
  {
    id: "navy-film",
    name: "Navy Film",
    status: "Alternative 07",
    note: "A stronger interpretation of the review: darker linen, burnt coral, olive, slate blue, and saturated Atlantic navy.",
    colors: [
      { role: "White", hex: "#FCFCFA" },
      { role: "Paper", hex: "#E5E1D8" },
      { role: "Warm", hex: "#D47658" },
      { role: "Green", hex: "#6E8060" },
      { role: "Blue", hex: "#748C99" },
      { role: "Ink", hex: "#08243E" },
    ],
  },
] as const;
