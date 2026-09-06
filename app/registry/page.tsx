import type { Metadata } from "next";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  title: "Registry | James & Samantha",
  description: "James and Samantha's wedding registry.",
};

export default function RegistryPage() {
  return (
    <main className="site-shell">
      <article className="album-page utility-page registry-page">
        <SiteHeader active="registry" />

        <section className="utility-hero" aria-labelledby="registry-title">
          <p className="eyebrow">For our next chapter</p>
          <h1 id="registry-title">Registry</h1>
        </section>

        <div className="registry-workspace">
          <section className="registry-intro" aria-label="About our registry">
            <p>
              We have no expectation of receiving a gift from you, but if you
              would like to send one, our Crate &amp; Barrel registry is linked
              below.
            </p>
            <p>
              Purchases made through the registry are reflected there, helping
              everyone see what is still needed. And if there’s something you
              own and love—or something that simply makes you think of us—please
              feel free to ignore the registry entirely.
            </p>
            <p>
              You’re also free to shop wherever you like and choose whatever
              brand you think is best. If you send us something, please include
              a note with your name so we can make sure to thank you.
            </p>
          </section>

          <section className="registry-connection" aria-labelledby="registry-link-title">
            <p className="section-number">Wedding registry</p>
            <h2 id="registry-link-title">Crate &amp; Barrel</h2>
            <p>Browse our registry and see which items are still available.</p>
            <a
              className="registry-link"
              href="https://www.crateandbarrel.com/gift-registry/samantha-and-james-morrison/r7629037"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View our Crate and Barrel registry in a new tab"
            >
              View registry
            </a>
          </section>
        </div>
      </article>
    </main>
  );
}
