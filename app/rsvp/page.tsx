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
          <p className="utility-script">Find your invitation below.</p>
          <p>
            Enter the name on your invitation to respond for your household.
          </p>
        </section>

        <section
          aria-label="RSVP form"
          style={{
            padding: "clamp(42px, 7vw, 92px) clamp(18px, 5vw, 72px)",
            background: "var(--canvas-white)",
          }}
        >
          <div
            style={{
              width: "min(920px, 100%)",
              marginInline: "auto",
            }}
          >
            <RsvpifyEmbed />

            <div
              style={{
                marginTop: "32px",
                paddingTop: "22px",
                borderTop: "1px solid var(--rule)",
                textAlign: "center",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              <p style={{ margin: "0 0 10px" }}>
                Having trouble with the embedded form?
              </p>
              <a
                href="https://weddingdraft3.rsvpify.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  paddingBottom: "3px",
                  borderBottom: "1px solid currentColor",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontSize: "10px",
                }}
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
