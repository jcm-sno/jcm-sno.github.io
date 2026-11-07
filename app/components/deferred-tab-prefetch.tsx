"use client";

import { useEffect } from "react";
import { scheduleTabPrefetch } from "./schedule-tab-prefetch.mjs";

async function warmPage(href: string) {
  try {
    // Populate the normal HTTP cache used by native navigation. Do not mount
    // hidden pages: their photographs and RSVP form should wait until needed.
    const response = await fetch(href, { priority: "low", credentials: "same-origin" });
    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) return;
    const html = await response.text();
    // Read only module hints; parsing an entire document could load its images.
    const modules = html.matchAll(/<(?:script|link)\b[^>]*>/gi);
    for (const [tag] of modules) {
      if (!/\b(?:type=["']module["']|rel=["']modulepreload["'])/i.test(tag)) continue;
      const path = tag.match(/\b(?:src|href)=["']([^"']+)["']/i)?.[1];
      if (!path) continue;
      const url = new URL(path, response.url);
      if (url.origin !== window.location.origin || Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="modulepreload"]')).some((link) => link.href === url.href)) continue;
      const preload = document.createElement("link");
      preload.rel = "modulepreload";
      preload.href = url.href;
      preload.fetchPriority = "low";
      document.head.appendChild(preload);
    }
  } catch {
    // An interrupted warmup must never interfere with a normal link click.
  }
}

export default function DeferredTabPrefetch({ currentHref, hrefs }: {
  currentHref: string;
  hrefs: string[];
}) {
  useEffect(() => scheduleTabPrefetch({
    window,
    document,
    currentHref,
    hrefs,
    prefetch: warmPage,
  }), [currentHref, hrefs]);

  return null;
}
