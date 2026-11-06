/** Acanthus leaves, milgrain dots, and diamond settings echo Samantha's ring. */
export function RingDivider() {
  return (
    <svg className="ring-divider" viewBox="0 0 760 104" width="760" height="104"
      aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M380 34L398 52L380 70L362 52ZM380 41L391 52L380 63L369 52Z" />
        <path d="M377 52H383M380 49V55" />
      </g>
      <image href="/ring-acanthus-scroll.webp" width="80" height="240"
        transform="translate(110 85) rotate(-90)" />
      <g transform="translate(760 0) scale(-1 1)">
        <image href="/ring-acanthus-scroll.webp" width="80" height="240"
          transform="translate(110 85) rotate(-90)" />
      </g>
    </svg>
  );
}

/** One connected, exactly mirrored botanical ornament for the mobile invitation. */
export function RingFlourish() {
  return (
    <svg className="ring-flourish" viewBox="0 0 460 100" width="460" height="100"
      aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="invitation-flourish-half">
          <path d="M0 0H230V100H0Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#invitation-flourish-half)">
        <image href="/ring-acanthus-scroll.webp" width="80" height="240"
          transform="translate(0 90) rotate(-90)" />
      </g>
      <g transform="translate(460 0) scale(-1 1)">
        <g clipPath="url(#invitation-flourish-half)">
          <image href="/ring-acanthus-scroll.webp" width="80" height="240"
            transform="translate(0 90) rotate(-90)" />
        </g>
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
      <span className="ring-corner ring-corner-top-left" />
      <span className="ring-corner ring-corner-top-right" />
      <span className="ring-corner ring-corner-bottom-left" />
      <span className="ring-corner ring-corner-bottom-right" />
    </span>
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

/** A short engraved edge for a logistics section title. */
export function RingHeadingAxis() {
  return (
    <svg className="ring-heading-axis" viewBox="0 0 16 100" width="16" height="100"
      preserveAspectRatio="none" fill="none" stroke="currentColor"
      aria-hidden="true" focusable="false">
      <path d="M8 0V34M8 66V100" strokeWidth=".9" />
      <path d="M12 4V33M12 67V96" strokeWidth="1.2" strokeDasharray=".1 4" strokeLinecap="round" />
      <path d="M8 39L15 50L8 61L1 50ZM8 44L12 50L8 56L4 50Z" strokeWidth=".85" />
    </svg>
  );
}
