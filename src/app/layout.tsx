import type { Metadata } from "next";
import { Literata, Manrope } from "next/font/google";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const display = Literata({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Meridian — визовый сервис. Оформление виз без лишней бюрократии",
    template: "%s · Meridian",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Meridian — визовый сервис",
    description: siteConfig.description,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Meridian — оформление виз",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian — визовый сервис",
    description: siteConfig.description,
    images: ["/images/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-ink">
        <JsonLd />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
