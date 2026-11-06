/** Acanthus leaves, milgrain dots, and diamond settings echo Samantha's ring. */
export function RingDivider() {
  return (
    <svg className="ring-divider" viewBox="0 0 760 104" width="760" height="104"
      aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 52H110M350 52H362M398 52H410M650 52H760" />
        <path d="M380 34L398 52L380 70L362 52ZM380 41L391 52L380 63L369 52Z" />
        <path d="M377 52H383M380 49V55" />
      </g>
      <image href="/ring-acanthus-scroll.webp" width="80" height="240"
        transform="translate(110 92) rotate(-90)" />
      <g transform="translate(760 0) scale(-1 1)">
        <image href="/ring-acanthus-scroll.webp" width="80" height="240"
          transform="translate(110 92) rotate(-90)" />
      </g>
    </svg>
  );
}

export function RingScroll({ className = "" }: { className?: string }) {
  return (
    <svg className={`ring-scroll ${className}`.trim()} viewBox="0 0 320 960"
      width="320" height="960" aria-hidden="true" focusable="false">
      <image href="/ring-acanthus-scroll.webp" width="320" height="960" />
    </svg>
  );
}

export function RingCorners() {
  return (
    <span className="ring-corners" aria-hidden="true">
      <span className="ring-corner ring-corner-top" />
      <span className="ring-corner ring-corner-bottom" />
    </span>
  );
}

export function RingRule() {
  return (
    <svg className="ring-rule" viewBox="0 0 500 22" width="500" height="22"
      fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
      <path d="M0 9H229M271 9H500" strokeWidth=".8" />
      <path d="M3 14H229M271 14H497" strokeDasharray=".1 4" strokeLinecap="round" strokeWidth="1.3" />
      <path d="M250 1L260 11L250 21L240 11ZM250 5L256 11L250 17L244 11Z" strokeWidth=".9" />
      <path d="M248 11H252M250 9V13" strokeWidth=".8" />
    </svg>
  );
}

export function RingAxis() {
  return (
    <svg className="ring-axis" viewBox="0 0 24 240" width="24" height="240"
      fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 0V99M12 141V240" strokeWidth=".8" />
      <path d="M7 4V98M7 142V236" strokeDasharray=".1 4" strokeLinecap="round" strokeWidth="1.3" />
      <path d="M12 105L22 120L12 135L2 120ZM12 111L18 120L12 129L6 120Z" strokeWidth=".9" />
      <path d="M12 116C16 111 21 120 12 124C3 120 8 111 12 116Z" strokeWidth=".7" />
    </svg>
  );
}
