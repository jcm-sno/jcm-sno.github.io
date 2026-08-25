import type { Metadata } from "next";

const zolaUrl = "https://www.zola.com/wedding/jcm-sno";

export const metadata: Metadata = {
  title: "RSVP | James & Samantha",
  description: "Continue to James and Samantha's RSVP page on Zola.",
};

export default function RsvpPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${zolaUrl}`} />
      <main className="placeholder-page">
        <section className="placeholder-card">
          <p className="section-number">RSVP</p>
          <h1>Taking you to Zola…</h1>
          <p>If the page does not open automatically, continue below.</p>
          <a className="placeholder-back" href={zolaUrl}>
            Continue to RSVP
          </a>
        </section>
      </main>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(zolaUrl)});`,
        }}
      />
    </>
  );
}
