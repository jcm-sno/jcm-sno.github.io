import type { Metadata } from "next";
import "@fontsource/cormorant-sc/400.css";
import "@fontsource/cormorant-sc/500.css";
import "@fontsource/parisienne/400.css";
import "./globals.css";
import "./review-overrides.css";
import { defaultPaletteId } from "./palettes";

const siteTitle = "James & Samantha";
const siteDescription = "May 15, 2027 · Port Orange, Florida";
const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  "https://james-samantha-wedding.jamescmorrison00.chatgpt.site";
const socialImage = new URL("/wedding-banner-share.jpg", siteOrigin).toString();
const socialImageAlt = "James and Samantha embracing as they look out at the ocean";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: siteOrigin,
    images: [
      {
        url: socialImage,
        type: "image/jpeg",
        width: 1536,
        height: 1024,
        alt: socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: socialImage, alt: socialImageAlt }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-wedding-palette={defaultPaletteId}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/about-banner-2048.webp"
          imageSrcSet="/about-banner-960.webp 960w, /about-banner-1536.webp 1536w, /about-banner-2048.webp 2048w"
          imageSizes="(min-width: 1440px) 1320px, 100vw"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
