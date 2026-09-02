"use client";

import { useEffect, useRef } from "react";

const links = [
  { href: "#schedule", label: "Schedule" },
  { href: "#travel", label: "Getting here" },
  { href: "#lodging", label: "Where to stay" },
] as const;

const scrollKeys = new Set([
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " ",
]);

export default function FastAnchorNav() {
  const navRef = useRef<HTMLElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const cancelScroll = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key)) cancelScroll();
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!link || !nav.contains(link)) return;

      const targetId = decodeURIComponent(link.hash.slice(1));
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      cancelScroll();
      const canUpdateHistory =
        typeof window.history?.pushState === "function";
      if (canUpdateHistory) {
        window.history.pushState(null, "", link.hash);
      }

      const startY = window.scrollY;
      const maximumY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const targetY = Math.min(
        maximumY,
        Math.max(0, startY + target.getBoundingClientRect().top),
      );
      const distance = targetY - startY;

      if (
        Math.abs(distance) < 2 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        window.scrollTo(0, targetY);
        if (!canUpdateHistory) document.location.hash = link.hash;
        return;
      }

      const startedAt = Date.now();
      const duration = 280;

      const step = () => {
        const progress = Math.min(1, (Date.now() - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          timerRef.current = window.setTimeout(step, 16);
        } else {
          timerRef.current = null;
          if (!canUpdateHistory) document.location.hash = link.hash;
        }
      };

      step();
    };

    nav.addEventListener("click", handleClick);
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    window.addEventListener("pointerdown", cancelScroll, { passive: true });
    window.addEventListener("keydown", handleKeydown);

    return () => {
      cancelScroll();
      nav.removeEventListener("click", handleClick);
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
      window.removeEventListener("pointerdown", cancelScroll);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="logistics-jump"
      aria-label="Logistics page sections"
    >
      {links.map((link) => (
        <a href={link.href} key={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
