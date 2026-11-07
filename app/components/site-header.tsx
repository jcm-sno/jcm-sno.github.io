import NavigationLink from "./navigation-link";
import DeferredTabPrefetch from "./deferred-tab-prefetch";
import { RingFlourish } from "./ring-ornament";

type SiteHeaderProps = {
  active: "about" | "logistics" | "registry" | "rsvp";
};

const links = [
  { id: "about", href: "/", label: "About Us" },
  { id: "logistics", href: "/logistics/", label: "Logistics" },
  { id: "registry", href: "/registry/", label: "Registry" },
  { id: "rsvp", href: "/rsvp/", label: "RSVP" },
] as const;
const hrefs = links.map((link) => link.href);

export default function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-nav">
      <DeferredTabPrefetch currentHref={links.find((link) => link.id === active)!.href} hrefs={hrefs} />
      <NavigationLink className="wordmark" href="/" aria-label="Samantha and James home">
        Samantha <span>&amp;</span> James
      </NavigationLink>
      <RingFlourish />
      <nav aria-label="Wedding website navigation">
        {links.map((link) => (
          <NavigationLink
            className={`${link.id === active ? "is-active" : ""} ${link.id === "rsvp" ? "nav-rsvp" : ""}`.trim()}
            href={link.href}
            aria-current={link.id === active ? "page" : undefined}
            key={link.id}
          >
            {link.label}
          </NavigationLink>
        ))}
      </nav>
    </header>
  );
}
