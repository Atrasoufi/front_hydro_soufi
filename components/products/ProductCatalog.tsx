'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, ArrowLeft, RotateCcw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { IndustryFilter, Paginated, Product, ProductCategory } from '../../lib/types';
import Pagination from '../shared/Pagination';

const fallbackCategories: ProductCategory[] = [
  { id: 1, name: 'جک‌های هیدرولیک' },
  { id: 2, name: 'پاورپک و یونیت هیدرولیک' },
  { id: 3, name: 'پرس‌های هیدرولیک' },
  { id: 4, name: 'بالابر و آسانسور هیدرولیک' },
  { id: 5, name: 'شیرها و قطعات هیدرولیک' },
  { id: 6, name: 'تجهیزات صنایع ریلی' },
];

export default function ProductCatalog({
  data,
  categories,
  industries,
}: {
  data: Paginated<Product>;
  categories: ProductCategory[];
  industries: IndustryFilter[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [mobileFilters, setMobileFilters] = useState(false);

  const activeCategories = searchParams.getAll('category');
  const activeIndustries = searchParams.getAll('industry_product');
  const currentSearch = searchParams.get('search') ?? '';
  const categoryOptions = categories.length ? categories : fallbackCategories;

  function updateQuery(key: string, value: string, checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    params.delete(key);
    if (checked) params.set(key, value);
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function submitSearch(formData: FormData) {
    const params = new URLSearchParams(searchParams.toString());
    const search = String(formData.get('search') ?? '').trim();
    params.delete('page');
    if (search) params.set('search', search);
    else params.delete('search');
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function clearFilters() {
    startTransition(() => router.push(pathname));
    setMobileFilters(false);
  }

  const FilterPanel = () => (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(10,30,50,.05)]" dir="rtl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="text-base font-black text-[#10243a]">فیلتر محصولات</div>
          <div className="mt-1 text-[11px] text-slate-400">نتایج را دقیق‌تر پیدا کنید</div>
        </div>
        <SlidersHorizontal size={18} className="text-[#e39b00]" />
      </div>

      <div className="border-b border-slate-100 py-5">
        <div className="mb-3 text-xs font-extrabold text-[#10243a]">دسته‌بندی</div>
        <div className="space-y-2.5">
          {categoryOptions.map((category) => {
            const checked = activeCategories.includes(String(category.id));
            return (
              <label key={category.id} className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-xs text-slate-600 transition hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => updateQuery('category', String(category.id), e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-[#ffb51b]"
                />
                <span>{category.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="py-5">
        <div className="mb-3 text-xs font-extrabold text-[#10243a]">صنعت مورد استفاده</div>
        <div className="max-h-56 space-y-2.5 overflow-y-auto pr-1">
          {industries.map((industry) => {
            const checked = activeIndustries.includes(String(industry.id));
            return (
              <label key={industry.id} className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-xs text-slate-600 transition hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => updateQuery('industry_product', String(industry.id), e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-[#ffb51b]"
                />
                <span>{industry.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {(activeCategories.length || activeIndustries.length || currentSearch) ? (
        <button onClick={clearFilters} className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 transition hover:border-[#ffb51b] hover:text-[#10243a]">
          <RotateCcw size={14} /> حذف همه فیلترها
        </button>
      ) : null}
    </aside>
  );

  console.log(categories);
  console.log(data);
  return (
    <section className="bg-[#f6f8fa] py-10 md:py-14" dir="rtl">
      <div className="container-site">
        {/* Search is deliberately outside the filters */}
        <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(10,30,50,.05)] md:p-4">
          <form action={submitSearch} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                name="search"
                defaultValue={currentSearch}
                placeholder="نام محصول، تجهیز یا کد محصول را جستجو کنید..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#ffb51b] focus:bg-white focus:ring-4 focus:ring-[#ffb51b]/10"
              />
            </div>
            <button className="gold-btn h-12 min-w-32" type="submit">
              جستجو
              <Search size={16} />
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={() => setMobileFilters(true)}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold lg:hidden"
        >
          <SlidersHorizontal size={16} /> فیلتر محصولات
        </button>

        <div className="grid gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-[#e39b00]">کاتالوگ محصولات</div>
                <h2 className="mt-1 text-2xl font-black text-[#10243a]">محصولات هیدرولیک صوفی</h2>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-[11px] font-bold text-slate-500 shadow-sm">
                {data.count.toLocaleString('fa-IR')} محصول
              </div>
            </div>

            {pending && <div className="mb-4 h-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-1/3 animate-pulse rounded-full bg-[#ffb51b]" /></div>}

            {data.results.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {data.results.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(10,30,50,.05)] transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(10,30,50,.10)]">
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <Image src={product.image} alt={product.name} fill sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" unoptimized />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="line-clamp-1 text-sm font-black text-[#10243a]">{product.name}</h3>
                      <p className="mt-2 line-clamp-2 min-h-10 text-[11px] leading-5 text-slate-500">{product.short_description}</p>
                      <div className="mt-5 flex items-center justify-between text-[11px] font-bold">
                        <span className="text-[#e39b00]">مشاهده محصول</span>
                        <ArrowLeft size={15} className="text-[#e39b00] transition group-hover:-translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400"><Search size={22} /></div>
                <h3 className="mt-5 text-lg font-black text-[#10243a]">محصولی پیدا نشد</h3>
                <p className="mt-2 text-xs text-slate-500">فیلترها یا عبارت جستجو را تغییر دهید.</p>
                <button onClick={clearFilters} className="gold-btn mt-5">حذف فیلترها</button>
              </div>
            )}

            <Pagination count={data.count} />
          </div>
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button aria-label="بستن فیلتر" className="absolute inset-0 bg-[#071827]/60" onClick={() => setMobileFilters(false)} />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto bg-[#f6f8fa] p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <strong>فیلترها</strong>
              <button onClick={() => setMobileFilters(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white"><X size={17} /></button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </section>
  );
}
