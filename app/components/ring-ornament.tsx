/** Decorative vector engravings inspired by Samantha's ring. */
export default function RingOrnament({ className = "" }: { className?: string }) {
  return <span className={`ring-ornament ${className}`.trim()} aria-hidden="true" />;
}

export function RingFrame() {
  return (
    <span className="ring-frame" aria-hidden="true">
      <span className="ring-corner ring-corner-tl" />
      <span className="ring-corner ring-corner-tr" />
      <span className="ring-corner ring-corner-bl" />
      <span className="ring-corner ring-corner-br" />
    </span>
  );
}
