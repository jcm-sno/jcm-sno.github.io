import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import ZolaRegistry from "../components/zola-registry";

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
          <p className="eyebrow">With gratitude</p>
          <h1 id="registry-title">Registry</h1>
          <p className="utility-script">Celebrating with you is the gift.</p>
          <p>
            For friends and family who have asked, our Zola registry will live
            here once it is ready.
          </p>
        </section>

        <div className="registry-workspace">
          <ZolaRegistry />
        </div>

        <footer className="site-footer">
          <p>James &amp; Samantha</p>
          <p>May 15, 2027 · Port Orange, Florida</p>
        </footer>
      </article>
    </main>
  );
}
