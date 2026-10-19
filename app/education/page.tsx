import { createPageMetadata } from "../../lib/seo";
import PageShell from "../../components/shared/PageShell";
import Hero from "../../components/shared/Hero";
import {
  getEducation,
  getEducationCategories,
} from "../../lib/api";
import EducationCatalog from "../../components/education/EducationCatalog";

export const metadata = createPageMetadata("/education");
export default async function Education({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const p = await searchParams;

  const q = new URLSearchParams();

  if (p.page) q.set("page", p.page);
  if (p.search) q.set("search", p.search);
  if (p.category) q.set("category", p.category);

  const [data, categories] = await Promise.all([
    getEducation(q.toString() ? `?${q.toString()}` : ""),
    getEducationCategories(),
  ]);

  const educationItems = Array.isArray(data.results) ? data.results : [];

  const educationCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "آموزش هیدرولیک و مقالات تخصصی",
    description:
      "مقالات و آموزش‌های تخصصی هیدرولیک درباره تجهیزات، سیستم‌ها، کاربردها و نکات فنی برای تصمیم‌گیری بهتر در صنعت.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000"}/education`,
    inLanguage: "fa-IR",
    isPartOf: {
      "@type": "WebSite",
      name: "هیدرولیک صوفی",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: educationItems.slice(0, 20).map((item: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000"}/education/${item.slug}`,
      })),
    },
  };

  return (
    <PageShell>
      <Hero
        title="مقالات و آموزش‌های تخصصی هیدرولیک"
        description="دانش فنی برای شناخت تجهیزات، سیستم‌ها و راهکارهای هیدرولیک صنعتی"
        image="/images/hero-education.svg"
      />

      <section className="bg-white py-8 md:py-10" dir="rtl">
        <div className="container-site">
          <div className="max-w-4xl">
            <h2 className="text-xl font-black leading-[1.8] text-[#071827] md:text-2xl">
              آموزش هیدرولیک؛ از مفاهیم پایه تا کاربردهای صنعتی
            </h2>
            <p className="mt-3 text-sm leading-8 text-slate-500 md:text-[15px]">
              در این بخش می‌توانید مقالات و آموزش‌های تخصصی درباره تجهیزات،
              قطعات، سیستم‌های هیدرولیک و کاربرد آن‌ها در صنایع مختلف را مطالعه
              کنید و برای انتخاب و استفاده صحیح از تجهیزات، اطلاعات فنی کاربردی
              به دست آورید.
            </p>
          </div>
        </div>
      </section>

      <EducationCatalog
        data={data}
        categories={categories}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationCollectionJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </PageShell>
  );
}
