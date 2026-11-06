import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import { RingScroll } from "../components/ring-ornament";

export const metadata: Metadata = {
  title: "Registry | Samantha & James",
  description: "Samantha and James’s wedding registry.",
};

export default function RegistryPage() {
  return (
    <main className="site-shell">
      <article className="album-page utility-page registry-page">
        <SiteHeader active="registry" />

        <div className="registry-workspace">
          <RingScroll className="registry-scroll-left" />
          <RingScroll className="registry-scroll-right" />
          <h1 id="registry-title" className="registry-title">Registry</h1>
          <section className="registry-intro" aria-label="About our registry">
            <p>
              If you would like to send us a gift, our registry is linked below.
            </p>
          </section>

          <section className="registry-connection registry-connection-minimal" aria-label="Registry link">
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
