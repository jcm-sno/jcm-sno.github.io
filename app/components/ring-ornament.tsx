/** A cropped view of the green acanthus engraving, with its central diamond retained.
 * The SVG viewport crops the sides on phones instead of shrinking the detail away.
 */
export default function RingOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`ring-ornament ${className}`.trim()}
      viewBox="0 253 2172 184"
      width="2172"
      height="184"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <image href="/green-acanthus-engraving.webp" width="2172" height="724" />
    </svg>
  );
}

export function RingFrame() {
  return <span className="ring-frame" aria-hidden="true" />;
}
