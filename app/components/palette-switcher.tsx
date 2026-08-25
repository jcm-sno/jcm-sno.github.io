"use client";

import { useSyncExternalStore } from "react";
import {
  defaultPaletteId,
  paletteOptions,
  paletteSlots,
  paletteStorageKey,
} from "../palettes";

type PaletteId = (typeof paletteOptions)[number]["id"];
const paletteChangeEvent = "wedding-palette-change";

function isPaletteId(value: string | null): value is PaletteId {
  return paletteOptions.some((palette) => palette.id === value);
}

function getSelectedPalette(): PaletteId {
  if (typeof document === "undefined") {
    return defaultPaletteId;
  }

  const selection = document.documentElement.getAttribute("data-wedding-palette");
  return isPaletteId(selection) ? selection : defaultPaletteId;
}

function subscribeToPalette(onStoreChange: () => void) {
  const handleChange = () => onStoreChange();
  window.addEventListener(paletteChangeEvent, handleChange);
  return () => window.removeEventListener(paletteChangeEvent, handleChange);
}

function applyPalette(id: PaletteId) {
  document.documentElement.setAttribute("data-wedding-palette", id);
  try {
    window.localStorage.setItem(paletteStorageKey, id);
  } catch {}
  window.dispatchEvent(new Event(paletteChangeEvent));
}

export default function PaletteSwitcher() {
  const selectedId = useSyncExternalStore(
    subscribeToPalette,
    getSelectedPalette,
    () => defaultPaletteId,
  );

  function selectPalette(id: PaletteId) {
    applyPalette(id);
  }

  const selectedPalette =
    paletteOptions.find((palette) => palette.id === selectedId) ?? paletteOptions[0];

  return (
    <div className="palette-matrix-wrap">
      <table className="palette-matrix">
        <caption className="sr-only">
          Selectable wedding website color palettes
        </caption>
        <colgroup>
          <col className="palette-name-column" />
          {paletteSlots.map((slot) => (
            <col key={slot} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Palette</th>
            {paletteSlots.map((slot) => (
              <th scope="col" key={slot}>
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paletteOptions.map((palette) => {
            const isSelected = palette.id === selectedId;

            return (
              <tr className={isSelected ? "is-current" : undefined} key={palette.id}>
                <th scope="row">
                  <button
                    className="palette-selector"
                    type="button"
                    aria-pressed={isSelected}
                    title={`${palette.name}: ${palette.note}`}
                    onClick={() => selectPalette(palette.id)}
                  >
                    <span>{isSelected ? "Selected" : palette.status}</span>
                    <strong>{palette.name}</strong>
                    <span className="sr-only">. {palette.note}</span>
                  </button>
                </th>
                {palette.colors.map((color) => (
                  <td key={color.role}>
                    <span
                      className="matrix-swatch"
                      style={{ backgroundColor: color.hex }}
                      aria-label={`${color.role}: ${color.hex}`}
                      role="img"
                    />
                    <code>{color.hex}</code>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="sr-only" aria-live="polite">
        {selectedPalette.name} palette applied.
      </p>
    </div>
  );
}
