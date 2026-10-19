import type { Metadata } from "next";

/**
 * Set NEXT_PUBLIC_SITE_URL in production, for example:
 * NEXT_PUBLIC_SITE_URL=https://example.com
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const businessPhone = "+989120481748";
export const businessEmail = "z.soofi.n@gmail.com";

export const socialUrls = [
  "https://www.instagram.com/soufi_hydrulic?psln=MXB0d2phcHpjMWNrMA==",
  "https://www.linkedin.com/in/ebrahim-soofi-netestani-54b429438/",
  "https://www.aparat.com/Hydraulicsoufi",
];

export const businessAddress = {
  "@type": "PostalAddress",
  streetAddress: "جاده احمدآباد، سه راهی خمین، 3RQ6+GFG",
  addressLocality: "اراک",
  addressRegion: "مرکزی",
  addressCountry: "IR",
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: "هیدرولیک صوفی",
  alternateName: "Hydraulic Soofi",
  description:
    "هیدرولیک صوفی در زمینه تجهیزات و سیستم‌های هیدرولیک صنعتی، طراحی و اجرای راهکارهای هیدرولیکی و خدمات تخصصی فعالیت می‌کند.",
  url: siteUrl,
  telephone: businessPhone,
  email: businessEmail,
  address: businessAddress,
  sameAs: socialUrls,
  areaServed: "IR",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "هیدرولیک صوفی",
  alternateName: "Hydraulic Soofi",
  url: siteUrl,
  inLanguage: "fa-IR",
  publisher: {
    "@id": `${siteUrl}/#business`,
  },
};

export const staticPages = [
  {
    path: "/",
    title: "هیدرولیک صوفی | تجهیزات و سیستم‌های هیدرولیک صنعتی",
    description:
      "تجهیزات و سیستم‌های هیدرولیک صنعتی، طراحی و اجرای راهکارهای هیدرولیکی و خدمات تخصصی هیدرولیک صوفی.",
  },
  {
    path: "/about",
    title: "درباره هیدرولیک صوفی | مجموعه تخصصی هیدرولیک",
    description:
      "آشنایی با هیدرولیک صوفی، حوزه فعالیت، تخصص و رویکرد مجموعه در ارائه تجهیزات و راهکارهای هیدرولیک صنعتی.",
  },
  {
    path: "/products",
    title: "محصولات هیدرولیک صنعتی | هیدرولیک صوفی",
    description:
      "مشاهده محصولات و تجهیزات هیدرولیک صنعتی شامل جک، پرس، پاورپک، شیرها و قطعات هیدرولیک.",
  },
  {
    path: "/services",
    title: "خدمات هیدرولیک صنعتی | هیدرولیک صوفی",
    description:
      "خدمات تخصصی هیدرولیک شامل طراحی، ساخت، تعمیر، تأمین تجهیزات و ارائه راهکارهای مهندسی برای پروژه‌های صنعتی.",
  },
  {
    path: "/industries",
    title: "صنایع و کاربردهای هیدرولیک | هیدرولیک صوفی",
    description:
      "راهکارهای هیدرولیک صنعتی برای صنایع مختلف با تمرکز بر عملکرد، دوام، انتخاب صحیح تجهیزات و نیاز پروژه.",
  },
  {
    path: "/education",
    title: "آموزش هیدرولیک و مقالات تخصصی | هیدرولیک صوفی",
    description:
      "مقالات و آموزش‌های تخصصی هیدرولیک درباره تجهیزات، سیستم‌ها، کاربردها و نکات فنی برای تصمیم‌گیری بهتر در صنعت.",
  },
  {
    path: "/consultation",
    title: "مشاوره هیدرولیک صنعتی | درخواست مشاوره | هیدرولیک صوفی",
    description:
      "برای انتخاب تجهیزات، طراحی سیستم هیدرولیک و دریافت راهکار متناسب با پروژه خود از کارشناسان هیدرولیک صوفی مشاوره بگیرید.",
  },
] as const;

export function createPageMetadata(path: string): Metadata {
  const page = staticPages.find((item) => item.path === path);

  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: page.path,
      siteName: "هیدرولیک صوفی",
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}
