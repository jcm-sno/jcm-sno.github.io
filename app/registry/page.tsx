import type { Metadata } from "next";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  title: "Wishlist | James & Samantha",
  description: "James and Samantha's wedding wishlist.",
};

export default function RegistryPage() {
  return (
    <main className="site-shell">
      <article className="album-page utility-page registry-page">
        <SiteHeader active="registry" />

        <section className="utility-hero" aria-labelledby="wishlist-title">
          <p className="eyebrow">For our next chapter</p>
          <h1 id="wishlist-title">Wishlist</h1>
        </section>

        <div className="registry-workspace">
          <section className="registry-connection" aria-labelledby="wishlist-status-title">
            <p className="section-number">Private for invited guests</p>
            <h2 id="wishlist-status-title">Opens with invitations</h2>
            <p>
              Sign in with your invitation to reserve an item and mark it ordered.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
