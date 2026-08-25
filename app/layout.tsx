import type { Metadata } from "next";
import "@fontsource/cormorant-sc/400.css";
import "@fontsource/cormorant-sc/500.css";
import "@fontsource/parisienne/400.css";
import "./globals.css";
import { defaultPaletteId, paletteOptions, paletteStorageKey } from "./palettes";

const siteTitle = "James & Samantha";
const siteDescription =
  "Wedding details and stories for James Morrison and Samantha Oates — May 15, 2027 in Port Orange, Florida.";
const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  "https://james-samantha-wedding.jamescmorrison00.chatgpt.site";
const socialImage = new URL("/og.png", siteOrigin).toString();

const paletteInitScript = `(() => {
  try {
    const saved = window.localStorage.getItem(${JSON.stringify(paletteStorageKey)});
    const valid = ${JSON.stringify(paletteOptions.map((palette) => palette.id))};
    if (saved && valid.includes(saved)) {
      document.documentElement.dataset.weddingPalette = saved;
    }
  } catch {}
})();`;

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
        width: 1200,
        height: 630,
        alt: "James and Samantha — May 15, 2027 in Port Orange, Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
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
        <script dangerouslySetInnerHTML={{ __html: paletteInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
