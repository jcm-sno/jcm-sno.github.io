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

        <section className="utility-hero no-bookmark" aria-labelledby="registry-title">
          <h1 id="registry-title">Registry</h1>
        </section>

        <div className="registry-workspace">
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
