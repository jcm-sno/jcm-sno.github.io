type SiteHeaderProps = {
  active: "about" | "logistics" | "registry" | "rsvp";
};

const links = [
  { id: "about", href: "/", label: "About Us" },
  { id: "logistics", href: "/logistics/", label: "Logistics" },
  { id: "registry", href: "/registry/", label: "Wishlist" },
  { id: "rsvp", href: "/rsvp/", label: "RSVP" },
] as const;

export default function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-nav">
      <Link className="wordmark" href="/" aria-label="James and Samantha home">
        James <span>&amp;</span> Samantha
      </Link>
      <nav aria-label="Wedding website navigation">
        {links.map((link) => (
          <Link
            className={`${link.id === active ? "is-active" : ""} ${link.id === "rsvp" ? "nav-rsvp" : ""}`.trim()}
            href={link.href}
            aria-current={link.id === active ? "page" : undefined}
            key={link.id}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
import Link from "next/link";
