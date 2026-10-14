import PageShell from "../components/shared/PageShell";
import Hero from "../components/shared/Hero";
import HomeLazy from "../components/home/HomeLazy";

import {
  getHomeService,
  getIndustriesHome,
  getServices,
  getFeaturedProducts,
  getEducatoinHome
} from "../lib/api";

import type {
  IndustryHome,
  Service,
  Product,
  EducationHome
} from "../lib/types";

const fallbackIndustries: IndustryHome[] = [
  {
    id: 1,
    name: "صنایع ریلی",
    cover_image:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "کشاورزی",
    cover_image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "راهسازی و ماشین‌آلات",
    cover_image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "نفت، گاز و پتروشیمی",
    cover_image:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "فولاد و ریخته‌گری",
    cover_image:
      "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "ماشین‌آلات صنعتی",
    cover_image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "صنایع معدنی",
    cover_image:
      "https://images.unsplash.com/photo-1565031491910-e57fac031c41?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "صنایع دریایی",
    cover_image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80",
  },
];

export default async function Home() {
  const [
    industryResult,
    homeServiceResult,
    servicesResult,
    featuredProductsResult,
    educatinoHomeResult
  ] = await Promise.allSettled([
    getIndustriesHome(),
    getHomeService(),
    getServices(),
    getFeaturedProducts(),
    getEducatoinHome()
  ]);

  const industries =
    industryResult.status === "fulfilled" &&
    industryResult.value.length
      ? industryResult.value
      : fallbackIndustries;

  const homeService =
    homeServiceResult.status === "fulfilled"
      ? homeServiceResult.value
      : null;

  const services: Service[] =
    servicesResult.status === "fulfilled"
      ? servicesResult.value
      : [];

  const featuredProducts: Product[] =
    featuredProductsResult.status === "fulfilled"
      ? featuredProductsResult.value
      : [];
    
  const educationHome: EducationHome[] = educatinoHomeResult.status === "fulfilled"
        ? educatinoHomeResult.value : [];

  return (
    <PageShell>
      <Hero
        title="تجهیزات و سیستم‌های هیدرولیک صنعتی"
        eyebrow="هیدرولیک صوفی"
        description="طراحی، ساخت و تأمین تجهیزات هیدرولیک برای صنایع مختلف با تمرکز بر کیفیت، عملکرد و راهکار مهندسی."
        image="https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1800&q=80"
      />

      <HomeLazy
        industries={industries}
        services={services}
        service={homeService}
        featuredProducts={featuredProducts}
        educationHome={educationHome}
      />
    </PageShell>
  );
}
