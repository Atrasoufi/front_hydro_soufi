import PageShell from "../../components/shared/PageShell";
import Hero from "../../components/shared/Hero";
import {
  getEducation,
  getEducationCategories,
} from "../../lib/api";
import EducationCatalog from "../../components/education/EducationCatalog";

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

  return (
    <PageShell>
      <Hero
        title="مقالات و آموزش‌های تخصصی"
        description="دانش فنی برای تصمیم‌گیری بهتر در صنعت"
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=80"
      />

      <EducationCatalog
        data={data}
        categories={categories}
      />
    </PageShell>
  );
}