"use client";

import { useEffect, useRef } from "react";

const RSVPIFY_EMBED_URL = "https://weddingdraft3.rsvpify.com/embed";

export default function RsvpifyEmbed() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.replaceChildren();

    // RSVPify inserts the form relative to the script element. Loading it after
    // React hydrates prevents hydration from removing RSVPify's injected DOM.
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = RSVPIFY_EMBED_URL;
    host.appendChild(script);

    return () => {
      host.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="rsvpify-embed-host"
      aria-label="Wedding RSVP form"
    />
  );
}
