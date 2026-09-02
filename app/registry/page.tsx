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
          <section className="registry-intro" aria-label="About our wishlist">
            <p>
              We have no expectation of receiving a gift from you, but if you
              would like to send one, our address is below, along with a few
              things we’d love to have as we furnish our new home.
            </p>
            <p>
              If you decide to get something from the list, please mark it as
              covered below so no one else picks the same thing. And if there’s
              something you own and love—or something that simply makes you
              think of us—please feel free to ignore the list entirely.
            </p>
            <p>
              We opted for a wishlist instead of a traditional registry so
              you’re free to shop wherever you like and choose whatever brand
              you think is best. If you send us something, please include a note
              with your name so we can make sure to thank you.
            </p>
          </section>

          <section className="registry-connection" aria-labelledby="wishlist-status-title">
            <p className="section-number">Private for invited guests</p>
            <h2 id="wishlist-status-title">Opens with invitations</h2>
          </section>
        </div>
      </article>
    </main>
  );
}
