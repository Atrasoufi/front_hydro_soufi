import PageShell from '../../components/shared/PageShell';
import Hero from '../../components/shared/Hero';
import { getIndustries } from '../../lib/api';
import IndustriesGrid from '../../components/industries/IndustriesGrid';

export default async function Industries() {
  const result = await Promise.allSettled([getIndustries()]);
  const data = result[0].status === 'fulfilled' ? result[0].value : [];

  return (
    <PageShell>
      <Hero
        title="صنایع تحت پوشش"
        eyebrow="راهکارهای هیدرولیک برای صنایع مختلف"
        description="راهکارهای تخصصی هیدرولیکی برای صنایع مختلف، با تمرکز بر عملکرد، دوام و انتخاب صحیح تجهیزات."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=80"
      />
      <IndustriesGrid data={data} />
    </PageShell>
  );
}
