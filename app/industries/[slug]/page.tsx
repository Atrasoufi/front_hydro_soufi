import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import PageShell from '../../../components/shared/PageShell';
import { apiUrl } from '../../../lib/api';

export default async function IndustryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await fetch(apiUrl('/industries/api/industries/'), { next: { revalidate: 600 } });
  const items = response.ok ? await response.json() : [];
  const industry = items.find((item: any) => item.slug === slug);

  if (!industry) return <PageShell><div className="container-site py-24 text-center" dir="rtl"><h1 className="text-2xl font-black">صنعت پیدا نشد</h1><Link href="/industries" className="gold-btn mt-6">بازگشت به صنایع</Link></div></PageShell>;

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-[#071827] py-10 text-white md:py-14" dir="rtl">
        <div className="absolute inset-0"><Image src={industry.cover_image} alt="" fill priority sizes="100vw" className="object-cover opacity-45" unoptimized /><div className="absolute inset-0 bg-gradient-to-l from-[#071827] via-[#071827]/80 to-[#071827]/35" /></div>
        <div className="container-site relative z-10">
          <Link href="/industries" className="mb-5 inline-flex items-center gap-2 text-xs text-white/60 hover:text-white"><ArrowRight size={14} /> بازگشت به صنایع</Link>
          <div className="max-w-2xl"><div className="text-sm font-bold text-[#ffb51b]">راهکارهای صنعتی</div><h1 className="mt-2 text-3xl font-black leading-[1.6] md:text-4xl">{industry.name}</h1><p className="mt-4 text-sm leading-8 text-white/65">{industry.short_description}</p><Link href="/#consult" className="gold-btn mt-6">مشاوره برای این صنعت <MessageCircle size={15} /></Link></div>
        </div>
      </section>

      <section className="bg-[#f6f8fa] py-10 md:py-14" dir="rtl">
        <div className="container-site grid gap-7 lg:grid-cols-[1fr_340px]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(10,30,50,.05)] md:p-8"><div className="text-sm font-black text-[#e39b00]">راهکار هیدرولیک</div><h2 className="mt-2 text-2xl font-black text-[#10243a]">تجهیزات متناسب با نیاز {industry.name}</h2><p className="mt-5 text-sm leading-8 text-slate-600">{industry.short_description}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{['انتخاب تجهیزات مناسب شرایط کاری', 'طراحی راهکار سفارشی', 'تأمین قطعات و تجهیزات', 'پشتیبانی فنی و تعمیرات'].map((item) => <div key={item} className="flex items-center gap-2 rounded-2xl bg-[#f7f9fb] p-4 text-xs font-bold text-[#10243a]"><CheckCircle2 size={17} className="text-[#e39b00]" />{item}</div>)}</div></article>
          <aside className="h-fit overflow-hidden rounded-3xl bg-[#071827] text-white shadow-xl"><div className="relative h-44"><Image src={industry.cover_image} alt={industry.name} fill sizes="340px" className="object-cover opacity-60" unoptimized /><div className="absolute inset-0 bg-gradient-to-t from-[#071827] to-transparent" /></div><div className="p-6"><div className="text-sm font-black">پروژه‌ای در این صنعت دارید؟</div><p className="mt-3 text-xs leading-6 text-white/60">نیاز پروژه را ارسال کنید تا تیم ما راهکار مناسب را بررسی کند.</p><Link href="/#consult" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#ffb51b] px-4 py-3 text-xs font-black text-[#071827]">درخواست مشاوره</Link></div></aside>
        </div>
      </section>
    </PageShell>
  );
}
