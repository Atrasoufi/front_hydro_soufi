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
        image="/images/hero-home.svg"
      />
      <HomeLazy />
    </PageShell>
  );
}
