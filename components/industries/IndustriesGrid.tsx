import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Factory, CheckCircle2 } from 'lucide-react';
import type { Industry } from '../../lib/types';

const fallbackImages = [
  '/images/industry-rail.svg',
  '/images/industry-agriculture.svg',
  '/images/industry-construction.svg',
  '/images/industry-mining.svg',
  '/images/industry-marine.svg',
  '/images/industry-energy.svg',
];

export default function IndustriesGrid({ data }: { data: Industry[] }) {
  return (
    <div dir="rtl">
      <section className="bg-[#f6f8fa] py-12 md:py-16">
        <div className="container-site">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-sm font-black text-[#e39b00]">صنایع تحت پوشش</div>
              <h2 className="mt-2 text-2xl font-black text-[#10243a] md:text-3xl">راهکارهای هیدرولیک برای محیط‌های صنعتی</h2>
              <p className="mt-3 max-w-2xl text-xs leading-7 text-slate-500">راهکارهای مهندسی شده برای شرایط کاری متفاوت؛ از صنعت ریلی و فولاد تا معدن، کشاورزی و صنایع دریایی.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm"><Factory size={15} className="text-[#e39b00]" /> {data.length.toLocaleString('fa-IR')} صنعت</div>
          </div>

          {data.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((industry, index) => (
                <Link key={industry.slug} href={`/industries/${industry.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(10,30,50,.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(10,30,50,.10)]">
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <Image src={industry.cover_image || fallbackImages[index % fallbackImages.length]} alt={industry.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/85 via-[#071827]/5 to-transparent" />
                    <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between text-white">
                      <h3 className="text-base font-black">{industry.name}</h3>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffb51b] text-[#071827]"><ArrowLeft size={15} /></div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="line-clamp-3 min-h-[60px] text-xs leading-6 text-slate-500">{industry.short_description}</p>
                    <div className="mt-4 flex items-center gap-2 text-[11px] font-extrabold text-[#e39b00]">مشاهده راهکارهای این صنعت <ArrowLeft size={14} /></div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center text-sm text-slate-500">هنوز صنعتی ثبت نشده است.</div>
          )}
        </div>
      </section>

      <section className="bg-[#071827] py-12 text-white md:py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="text-sm font-black text-[#ffb51b]">مهندسی متناسب با صنعت</div>
            <h2 className="mt-2 text-2xl font-black leading-[1.7] md:text-3xl">هر صنعت، شرایط کاری خودش را دارد.</h2>
            <p className="mt-3 max-w-xl text-xs leading-7 text-white/60">ما راهکارهای هیدرولیکی را با توجه به فشار، دما، سیکل کاری، فضای نصب و الزامات عملیاتی پروژه انتخاب و طراحی می‌کنیم.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['انتخاب تجهیزات متناسب با شرایط کاری', 'طراحی مدار و راهکار سفارشی', 'تأمین قطعات و تجهیزات تخصصی', 'پشتیبانی و خدمات پس از اجرا'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold"><CheckCircle2 size={16} className="text-[#ffb51b]" />{item}</div>
              ))}
            </div>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image src="/images/industrial-solution.svg" alt="راهکار صنعتی" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/80 to-transparent" />
          </div>
        </div>
      </section>
    </div>
  );
}
