import PageShell from "../components/shared/PageShell";
import Hero from "../components/shared/Hero";
import HomeLazy from "../components/home/HomeLazy";

export default function Home() {
  return (
    <PageShell>
      <Hero
        title="تجهیزات و سیستم‌های هیدرولیک صنعتی"
        eyebrow="هیدرولیک صوفی"
        description="طراحی، ساخت و تأمین تجهیزات هیدرولیک برای صنایع مختلف با تمرکز بر کیفیت، عملکرد و راهکار مهندسی."
        image="https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1800&q=80"
      />
      <HomeLazy />
    </PageShell>
  );
}
