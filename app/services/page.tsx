import { createPageMetadata } from "../../lib/seo";
import PageShell from '../../components/shared/PageShell';
import Hero from '../../components/shared/Hero';
import { getServices } from '../../lib/api';
import ServicesGrid from '../../components/services/ServicesGrid';

export const metadata = createPageMetadata("/services");
export default async function Services() {
  const result = await Promise.allSettled([getServices()]);
  const data = result[0].status === 'fulfilled' ? result[0].value : [];

  return (
    <PageShell>
      <Hero
        title="خدمات هیدرولیک صوفی"
        eyebrow="راهکارهای جامع هیدرولیکی"
        description="طراحی، ساخت، تعمیر و تأمین تجهیزات متناسب با نیاز پروژه شما؛ با نگاه مهندسی و پشتیبانی فنی." 
        image="/images/hero-services.svg"
      />
      <ServicesGrid data={data} />
    </PageShell>
  );
}
