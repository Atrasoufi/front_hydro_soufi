import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { organizationJsonLd, siteUrl, websiteJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "هیدرولیک صوفی | تجهیزات و سیستم‌های هیدرولیک صنعتی",
  description:
    "هیدرولیک صوفی؛ ارائه تجهیزات و سیستم‌های هیدرولیک صنعتی، طراحی و اجرای راهکارهای هیدرولیکی و خدمات تخصصی برای صنایع مختلف.",
  applicationName: "هیدرولیک صوفی",
  authors: [{ name: "هیدرولیک صوفی" }],
  creator: "هیدرولیک صوفی",
  publisher: "هیدرولیک صوفی",
  keywords: [
    "هیدرولیک",
    "هیدرولیک صوفی",
    "ساخت ابزار هیدرولیک",
    "ساخت تجهیزات هیدرولیک",
    "هیدرولیک صنعتی",
    "تجهیزات هیدرولیک",
    "سیستم هیدرولیک",
    "قطعات هیدرولیک",
    "طراحی سیستم هیدرولیک",
    "ساخت تجهیزات هیدرولیک",
    "تعمیرات هیدرولیک",
    "جک هیدرولیک",
    "پرس هیدرولیک",
    "پاورپک هیدرولیک",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "هیدرولیک صوفی",
    title: "هیدرولیک صوفی | تجهیزات و سیستم‌های هیدرولیک صنعتی",
    description:
      "تجهیزات، سیستم‌ها و راهکارهای هیدرولیک صنعتی با تمرکز بر کیفیت، مهندسی و پشتیبانی تخصصی.",
  },
  twitter: {
    card: "summary_large_image",
    title: "هیدرولیک صوفی | تجهیزات و سیستم‌های هیدرولیک صنعتی",
    description:
      "تجهیزات، سیستم‌ها و راهکارهای هیدرولیک صنعتی با تمرکز بر کیفیت، مهندسی و پشتیبانی تخصصی.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
