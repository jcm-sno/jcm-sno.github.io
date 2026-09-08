import type { Metadata } from "next";
import RsvpifyEmbed from "../components/rsvpify-embed";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  title: "RSVP | James & Samantha",
  description: "Respond to James and Samantha's wedding invitation.",
};

export default function RsvpPage() {
  return (
    <main className="site-shell">
      <article className="album-page utility-page rsvp-page">
        <SiteHeader active="rsvp" />

        <section className="utility-hero" aria-labelledby="rsvp-title">
          <p className="eyebrow">May 15, 2027 · Port Orange, Florida</p>
          <h1 id="rsvp-title">RSVP</h1>
        </section>

        <section className="rsvp-form-section" aria-label="RSVP form">
          <div className="rsvp-form-shell">
            <RsvpifyEmbed />

            <div className="rsvp-fallback">
              <p>Having trouble with the embedded form?</p>
              <a
                className="rsvp-fallback-link"
                href="https://weddingdraft3.rsvpify.com"
                target="_blank"
                rel="noreferrer"
              >
                Open RSVP in a new window
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
