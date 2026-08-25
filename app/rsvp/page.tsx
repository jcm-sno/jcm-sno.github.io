import type { Metadata } from "next";
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
          <p className="eyebrow">Celebrate with us</p>
          <h1 id="rsvp-title">RSVP</h1>
          <p className="utility-script">We hope you can join us.</p>
          <p>
            When invitations go out, this page will find your household by the
            name printed on your invitation and show exactly who—and which
            wedding events—you can respond for.
          </p>
        </section>

        <section className="rsvp-workspace" aria-labelledby="lookup-title">
          <div className="rsvp-status">
            <p className="section-number">Invitation lookup</p>
            <h2 id="lookup-title">Find Your Invitation</h2>
            <p>
              Online responses are not open yet. This preview is intentionally
              locked while we finish the guest list and select the response
              system that will protect it.
            </p>
            <span className="status-pill">RSVPs open with invitations</span>
          </div>

          <form className="rsvp-lookup" aria-label="Invitation lookup preview">
            <label htmlFor="rsvp-name">First and last name</label>
            <p id="rsvp-name-help">
              Enter one guest&apos;s name exactly as it appears on the invitation.
            </p>
            <div className="rsvp-input-row">
              <input
                id="rsvp-name"
                name="name"
                type="text"
                placeholder="RSVPs are not open yet"
                aria-describedby="rsvp-name-help"
                disabled
              />
              <button type="button" disabled>
                Continue
              </button>
            </div>
          </form>
        </section>

        <section className="rsvp-flow" aria-labelledby="rsvp-flow-title">
          <div className="utility-section-heading">
            <p className="section-number">What to expect</p>
            <h2 id="rsvp-flow-title">One Simple Response</h2>
          </div>
          <div className="rsvp-flow-grid">
            <article>
              <span>01</span>
              <h3>Find Your Party</h3>
              <p>Search privately using a name from your invitation.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Respond Together</h3>
              <p>Answer for each invited guest, plus-one, and eligible event.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Review &amp; Send</h3>
              <p>Confirm details, dietary notes, and your final response.</p>
            </article>
          </div>
        </section>

        <footer className="site-footer">
          <p>James &amp; Samantha</p>
          <p>May 15, 2027 · Port Orange, Florida</p>
        </footer>
      </article>
    </main>
  );
}
