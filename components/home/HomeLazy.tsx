'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Cog, Headphones, Lightbulb, MessageCircle, PenTool, Search, Settings2, Wrench } from 'lucide-react';
import type { EducationHome, IndustryHome, Product, Service } from '../../lib/types';

const serviceImages = [
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
];

const serviceFallbacks = [
  { name: 'پرس‌های هیدرولیک', description: 'ساخت، تأمین و تعمیر انواع پرس هیدرولیک' },
  { name: 'پاورپک هیدرولیک', description: 'طراحی و ساخت پاورپک متناسب با نیاز پروژه' },
  { name: 'جک‌های هیدرولیک', description: 'طراحی و تأمین جک‌های هیدرولیک صنعتی' },
  { name: 'تجهیزات صنایع ریلی', description: 'تجهیزات و راهکارهای تخصصی صنعت ریلی' },
  { name: 'شیرها و قطعات هیدرولیک', description: 'تأمین انواع شیر و قطعات تخصصی هیدرولیک' },
  { name: 'بالابر و آسانسور هیدرولیک', description: 'راهکارهای هیدرولیکی برای جابه‌جایی بار و نفر' },
];

const industryImages = [
  'https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1565031491910-e57fac031c41?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=700&q=80',
];

function useLazyFetch<T>(url: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<T | null>(null);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || started) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();

        fetch(url, { headers: { Accept: 'application/json' } })
          .then((response) => {
            if (!response.ok) throw new Error(`Request failed: ${response.status}`);
            return response.json() as Promise<T>;
          })
          .then(setData)
          .catch(() => setData(null))
          .finally(() => setDone(true));
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [started, url]);

  return { ref, data, started, done };
}

function SectionSkeleton({ type }: { type: 'services' | 'products' | 'industries' | 'education' }) {
  if (type === 'education') {
    return (
      <div className="container-site grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div className="space-y-3">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
          <div className="h-12 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-10 w-32 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-28 animate-pulse rounded-lg bg-slate-200" />)}
        </div>
      </div>
    );
  }

  const count = type === 'services' ? 6 : type === 'products' ? 4 : 8;
  return (
    <div className="container-site">
      <div className="mb-7 space-y-2">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-8 w-72 animate-pulse rounded bg-slate-200" />
        <div className="h-5 w-96 max-w-full animate-pulse rounded bg-slate-100" />
      </div>
      <div className={type === 'services' ? 'grid gap-3 md:grid-cols-2 lg:grid-cols-3' : type === 'products' ? 'grid gap-3 sm:grid-cols-2 lg:grid-cols-4' : 'grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8'}>
        {Array.from({ length: count }).map((_, i) => <div key={i} className={`${type === 'industries' ? 'h-36' : type === 'products' ? 'h-52' : 'h-56'} animate-pulse rounded-xl bg-slate-200`} />)}
      </div>
    </div>
  );
}

const fallbackIndustries: IndustryHome[] = [
  { id: 1, name: 'صنایع ریلی', cover_image: industryImages[0] },
  { id: 2, name: 'کشاورزی', cover_image: industryImages[1] },
  { id: 3, name: 'راهسازی و ماشین‌آلات', cover_image: industryImages[2] },
  { id: 4, name: 'نفت، گاز و پتروشیمی', cover_image: industryImages[3] },
  { id: 5, name: 'فولاد و ریخته‌گری', cover_image: industryImages[4] },
  { id: 6, name: 'ماشین‌آلات صنعتی', cover_image: industryImages[5] },
  { id: 7, name: 'صنایع معدنی', cover_image: industryImages[6] },
  { id: 8, name: 'صنایع دریایی', cover_image: industryImages[7] },
];

export default function HomeLazy() {
  const servicesRequest = useLazyFetch<Service[]>('/api/services');
  const productsRequest = useLazyFetch<Product[]>('/api/products/featured');
  const industriesRequest = useLazyFetch<IndustryHome[]>('/api/industries/home');
  const educationRequest = useLazyFetch<EducationHome[]>('/api/education/home');

  const servicesDone = servicesRequest.done;

  const backendServices = [...(servicesRequest.data ?? [])];
  const serviceItems = backendServices.length
    ? backendServices.slice(0, 6).map((item) => ({ name: item.name, description: item.short_description, id: item.id }))
    : serviceFallbacks.map((item, index) => ({ ...item, id: `fallback-${index}` }));

  return (
    <div id="home-lazy" dir="rtl">
      <section className="border-b border-white/10 bg-[#071827] text-white">
        <div className="container-site grid grid-cols-2 md:grid-cols-4">
          {[
            [Cog, 'تجربه صنعتی', 'طراحی و ساخت بر اساس نیاز'],
            [PenTool, 'طراحی سفارشی', 'متناسب با شرایط پروژه'],
            [Lightbulb, 'مشاوره تخصصی', 'پیشنهاد بهترین راهکار'],
            [Headphones, 'پشتیبانی فنی', 'همراهی در تمام مراحل'],
          ].map(([Icon, title, desc], i) => {
            const I = Icon as typeof Cog;
            return <div key={i} className="flex min-h-[76px] items-center justify-center gap-3 border-l border-white/10 px-3 last:border-l-0 md:px-6"><I className="shrink-0 text-[#ffb51b]" size={25} strokeWidth={1.6} /><div><div className="text-xs font-extrabold md:text-sm">{title as string}</div><div className="mt-1 text-[9px] text-white/50 md:text-[10px]">{desc as string}</div></div></div>;
          })}
        </div>
      </section>

      <section ref={servicesRequest.ref} className="bg-[#f7f9fb] py-14 md:py-16">
        {!servicesDone ? <SectionSkeleton type="services" /> : (
          <div className="container-site">
            <div className="mb-7 flex items-end justify-between gap-6"><div><div className="section-label">خدمات ما</div><h2 className="mt-1 text-2xl font-black text-[#10243a] md:text-3xl">راهکارهای هیدرولیک صوفی</h2><p className="mt-2 text-xs leading-6 text-slate-500">ارائه‌دهنده تجهیزات و سیستم‌های هیدرولیک صنعتی با کیفیت بالا و مطابق با نیازهای شما</p></div><Link href="/services" className="hidden text-xs font-bold text-[#10243a] md:block">مشاهده همه خدمات ←</Link></div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {serviceItems.map(({ name, description, id }, i) => <Link key={`${id}-${name}`} href="/services" className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"><div className="relative h-[128px] overflow-hidden bg-slate-100"><Image src={serviceImages[i]} alt={name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" unoptimized /><div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" /></div><div className="p-4"><h3 className="text-sm font-extrabold text-[#10243a]">{name}</h3><p className="mt-1.5 text-[10px] leading-5 text-slate-500">{description}</p><div className="mt-3 text-[10px] font-bold text-[#e39b00]">مشاهده جزئیات ←</div></div></Link>)}
            </div>
          </div>
        )}
      </section>

      <section className="relative overflow-hidden bg-[#071827] py-12 text-white md:py-14">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(90deg,rgba(5,20,32,.98) 0%,rgba(5,20,32,.86) 48%,rgba(5,20,32,.45) 100%), url(https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80)" }} />
        <div className="container-site relative z-10 grid items-center gap-10 md:grid-cols-[1fr_1.15fr]"><div className="max-w-xl"><div className="text-sm font-extrabold text-[#ffb51b]">راهنمای انتخاب تجهیزات</div><h2 className="mt-2 text-2xl font-black leading-[1.7] md:text-3xl">دستگاه مورد نظر خود را پیدا نمی‌کنید؟</h2><p className="mt-2 text-xs leading-7 text-white/65">ما بر اساس نیاز شما، شرایط کاری و نوع پروژه، بهترین تجهیزات و راهکار هیدرولیکی را پیشنهاد می‌کنیم.</p><Link href="/products" className="gold-btn mt-5">مشاهده محصولات <Search size={15} /></Link></div><div className="grid grid-cols-3 gap-3 md:gap-5">{[['01','ساخت','تولید و تأمین راهکار'],['02','تست','بررسی شرایط و انتخاب'],['03','تحویل','ثبت و تحویل پروژه']].map(([n,t,d]) => <div key={n} className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#ffb51b]/50 bg-white/5 text-sm font-black text-[#ffb51b]">{n}</div><div className="mt-3 text-xs font-extrabold">{t}</div><div className="mt-1 text-[9px] leading-5 text-white/45">{d}</div></div>)}</div></div>
      </section>

      <section ref={productsRequest.ref} className="bg-white py-14 md:py-16">
        {!productsRequest.done ? <SectionSkeleton type="products" /> : (
          <div className="container-site"><div className="mb-7 flex items-end justify-between gap-6" dir="rtl"><div><div className="section-label">پروژه‌ها و تجهیزات شاخص</div><h2 className="mt-1 text-2xl font-black text-[#10243a]">نمونه‌ای از پروژه‌های هیدرولیک صوفی</h2><p className="mt-2 text-xs leading-6 text-slate-500">نمونه‌ای از پروژه‌ها و تجهیزاتی که توسط تیم ما طراحی، تأمین و اجرا شده‌اند.</p></div><Link href="/products" className="hidden text-xs font-bold text-[#10243a] transition-colors hover:text-[#e39b00] md:block">مشاهده همه محصولات ←</Link></div>
            {productsRequest.data.length > 0 ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" dir="rtl">{productsRequest.data.slice(0, 4).map((product) => <Link key={product.id} href={`/products/${product.slug}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"><div className="relative h-40 overflow-hidden bg-slate-100">{product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-300 group-hover:scale-105" unoptimized /> : <div className="flex h-full items-center justify-center text-xs text-slate-400">تصویر محصول موجود نیست</div>}</div><div className="flex items-center justify-between p-3"><div className="text-xs font-extrabold text-[#10243a]">{product.name}</div><ArrowLeft size={14} className="shrink-0 text-[#e39b00]" /></div></Link>)}</div> : <div className="rounded-xl border border-slate-200 bg-slate-50 py-12 text-center" dir="rtl"><p className="text-xs text-slate-500">در حال حاضر پروژه شاخصی برای نمایش وجود ندارد.</p><Link href="/products" className="mt-3 inline-block text-xs font-bold text-[#e39b00]">مشاهده محصولات</Link></div>}
            <div className="mt-5 text-center md:hidden"><Link href="/products" className="text-xs font-bold text-[#10243a]">مشاهده همه محصولات ←</Link></div>
          </div>
        )}
      </section>

      <section ref={industriesRequest.ref} className="bg-[#0b2236] py-14 text-white md:py-16">
        {!industriesRequest.done ? <SectionSkeleton type="industries" /> : (
          <div className="container-site"><div className="mb-7 flex items-end justify-between"><div><div className="text-sm font-extrabold text-[#ffb51b]">صنایع تحت پوشش</div><h2 className="mt-1 text-2xl font-black md:text-3xl">راهکارهای هیدرولیک برای صنایع مختلف</h2></div><Link href="/industries" className="text-xs font-bold text-white/80">مشاهده همه صنایع ←</Link></div><div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">{(industriesRequest.data.length ? industriesRequest.data : fallbackIndustries).slice(0, 8).map((industry, i) => <Link key={`industry-${industry.id}-${i}`} href="/industries" className="group relative h-36 overflow-hidden rounded-lg border border-white/10 bg-white/5"><Image src={industry.cover_image || industryImages[i]} alt={industry.name} fill sizes="(max-width:640px) 50vw, 12vw" className="object-cover transition duration-300 group-hover:scale-105" unoptimized /><div className="absolute inset-0 bg-gradient-to-t from-[#071827] via-[#071827]/15 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-2.5 text-[10px] font-bold">{industry.name}</div></Link>)}</div></div>
        )}
      </section>

      <section ref={educationRequest.ref} className="bg-white py-12 md:py-14">
        {!educationRequest.done ? <SectionSkeleton type="education" /> : (
          <div className="container-site grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-center"><div><div className="section-label">دانش هیدرولیک</div><h2 className="mt-1 text-2xl font-black">هیدرولیک را در محل ببینید</h2><p className="mt-2 text-xs leading-6 text-slate-500">ویدیوهای آموزشی و مقالات تخصصی برای انتخاب، طراحی و نگهداری سیستم‌های هیدرولیک.</p><Link href="/education" className="gold-btn mt-5 bg-white text-[#10243a] ring-1 ring-[#ffb51b]">مشاهده آموزش‌ها <ArrowLeft size={14} /></Link></div><div className="grid grid-cols-3 gap-3">{educationRequest.data.slice(0, 3).map((item) => <Link key={item.slug} href={`/education/${item.slug}`} className="group"><div className="relative h-28 overflow-hidden rounded-lg bg-slate-100">{item.featured_media ? <Image src={item.featured_media} alt={item.title} fill sizes="(max-width: 768px) 33vw, 220px" className="object-cover transition duration-300 group-hover:scale-105" unoptimized /> : <div className="flex h-full items-center justify-center text-[10px] text-slate-400">تصویر موجود نیست</div>}<div className="absolute inset-0 flex items-center justify-center bg-black/25"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#071827]">▶</div></div></div><div className="mt-2 line-clamp-2 text-center text-[10px] font-bold leading-5">{item.title}</div></Link>)}</div></div>
        )}
      </section>

      <section id="consult" className="relative overflow-hidden bg-[#071827] py-9 text-white"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(90deg,rgba(5,18,30,.92),rgba(5,18,30,.7)), url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=80)" }} /><div className="container-site relative z-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"><div><div className="text-sm font-extrabold">برای پروژه هیدرولیک خود مشاوره می‌خواهید؟</div><p className="mt-1 text-[10px] text-white/55">مشخصات پروژه را برای ما ارسال کنید تا کارشناسان ما راهکار مناسب را پیشنهاد دهند.</p></div><div className="flex gap-2"><Link href="#" className="dark-btn px-6 py-2.5 text-xs">تماس مستقیم با کارشناسان</Link><Link href="#" className="gold-btn px-6 py-2.5 text-xs">درخواست مشاوره <MessageCircle size={14} /></Link></div></div></section>
    </div>
  );
}
