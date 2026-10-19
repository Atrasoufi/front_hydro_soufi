import type { MetadataRoute } from "next";
import { siteUrl, staticPages } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency:
      page.path === "/" || page.path === "/education" ? "weekly" : "monthly",
    priority:
      page.path === "/"
        ? 1
        : page.path === "/products" || page.path === "/services"
          ? 0.9
          : page.path === "/education"
            ? 0.85
            : 0.7,
  }));
}
