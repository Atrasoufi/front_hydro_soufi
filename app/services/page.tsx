import PageShell from '../../components/shared/PageShell';
import Hero from '../../components/shared/Hero';
import { getServices } from '../../lib/api';
import ServicesGrid from '../../components/services/ServicesGrid';

export default async function Services() {
  const result = await Promise.allSettled([getServices()]);
  const data = result[0].status === 'fulfilled' ? result[0].value : [];

  return (
    <PageShell>
      <Hero
        title="خدمات هیدرولیک صوفی"
        eyebrow="راهکارهای جامع هیدرولیکی"
        description="طراحی، ساخت، تعمیر و تأمین تجهیزات متناسب با نیاز پروژه شما؛ با نگاه مهندسی و پشتیبانی فنی." 
        image="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1800&q=80"
      />
      <ServicesGrid data={data} />
    </PageShell>
  );
}
