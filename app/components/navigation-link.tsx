"use client";

import { useEffect, useState, type ComponentProps } from "react";

// GitHub Pages serves .rsc as application/octet-stream, which the router rejects.
// Native links use the prefetched HTML directly and also work before hydration.
export default function NavigationLink({ children, onClick, ...props }: ComponentProps<"a">) {
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const reset = () => setPending(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);
  return (
    <a {...props} onClick={(event) => {
      onClick?.(event);
      if (!event.defaultPrevented && event.button === 0 && !event.metaKey &&
          !event.ctrlKey && !event.shiftKey && !event.altKey &&
          (!props.target || props.target === "_self")) setPending(true);
    }}>
      {children}
      <span className="nav-feedback" data-pending={pending || undefined} role="status">
        {pending ? "Loading page…" : ""}
      </span>
    </a>
  );
}
