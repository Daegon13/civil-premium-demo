import type { Metadata } from "next";
import "./globals.css";

import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  metadataBase: new URL("https://civil-premium-demo.local"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
