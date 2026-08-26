import type { Metadata } from "next";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  title: "RSVP | James & Samantha",
  description: "Respond to James and Samantha's wedding invitation.",
};

export default function RsvpPage() {
  return (
    <main className="site-shell">
      <article className="album-page utility-page rsvp-page rsvp-minimal">
        <SiteHeader active="rsvp" />

        <section className="utility-hero" aria-labelledby="rsvp-title">
          <h1 id="rsvp-title">RSVP</h1>
          <p>Online RSVPs will open with invitations.</p>
        </section>
      </article>
    </main>
  );
}
