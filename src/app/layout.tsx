import type { Metadata } from "next";
import "./globals.css";

import { siteContent } from "@/content/siteContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://civil-premium-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteContent.meta.title,
    template: `%s | ${siteContent.brand.name}`,
  },
  description: siteContent.meta.description,
  applicationName: siteContent.brand.name,
  keywords: [
    "ingeniería civil",
    "dirección técnica",
    "control de obra",
    "regularización técnica",
    "consultoría estructural",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: siteContent.brand.name,
    title: siteContent.meta.ogTitle,
    description: siteContent.meta.ogDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteContent.brand.name} - dirección técnica y control de obra`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.meta.ogTitle,
    description: siteContent.meta.ogDescription,
    images: ["/twitter-image"],
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
