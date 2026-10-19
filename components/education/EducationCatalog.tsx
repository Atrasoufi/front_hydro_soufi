"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import type {
  Education,
  EducationCategory,
  Paginated,
} from "../../lib/types";

import Pagination from "../shared/Pagination";

export default function EducationCatalog({
  data,
  categories,
}: {
  data: Paginated<Education>;
  categories: EducationCategory[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pending, startTransition] = useTransition();

  const activeCategories = searchParams.getAll("category");
  const currentSearch = searchParams.get("search") ?? "";

  function updateQuery(
    key: string,
    value: string,
    checked: boolean,
  ) {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");

    if (checked) {
      params.append(key, value);
    } else {
      const values = params.getAll(key);

      params.delete(key);

      values
        .filter((item) => item !== value)
        .forEach((item) => params.append(key, item));
    }

    const query = params.toString();

    startTransition(() => {
      router.push(
        query ? `${pathname}?${query}` : pathname,
      );
    });
  }

  function submitSearch(formData: FormData) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    const search = String(
      formData.get("search") ?? "",
    ).trim();

    params.delete("page");

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    const query = params.toString();

    startTransition(() => {
      router.push(
        query ? `${pathname}?${query}` : pathname,
      );
    });
  }

  function clearFilters() {
    startTransition(() => {
      router.push(pathname);
    });
  }

  const FilterPanel = () => (
    <aside
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(10,30,50,.05)]"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="text-base font-black text-[#10243a]">
            فیلتر آموزش‌ها
          </div>

          <div className="mt-1 text-[11px] text-slate-400">
            نتایج را دقیق‌تر پیدا کنید
          </div>
        </div>

        <SlidersHorizontal
          size={18}
          className="text-[#e39b00]"
        />
      </div>

      {/* Categories */}
      <div className="border-b border-slate-100 py-5">
        <div className="mb-3 text-xs font-extrabold text-[#10243a]">
          دسته‌بندی
        </div>

        <div className="space-y-2.5">
          {categories.map((category) => {
            const checked = activeCategories.includes(
              String(category.id),
            );

            return (
              <label
                key={category.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-xs text-slate-600 transition hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    updateQuery(
                      "category",
                      String(category.id),
                      e.target.checked,
                    )
                  }
                  className="h-4 w-4 rounded border-slate-300 accent-[#ffb51b]"
                />

                <span>{category.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Clear filters */}
      {activeCategories.length || currentSearch ? (
        <div className="pt-5">
          <button
            onClick={clearFilters}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 transition hover:border-[#ffb51b] hover:text-[#10243a]"
          >
            <RotateCcw size={14} />
            حذف همه فیلترها
          </button>
        </div>
      ) : null}
    </aside>
  );

  return (
    <section
      className="bg-[#f6f8fa] py-10 md:py-14"
      dir="rtl"
    >
      <div className="container-site">

        {/* =========================
            SEARCH
        ========================== */}
        <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(10,30,50,.05)] md:p-4">
          <form
            action={submitSearch}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                name="search"
                defaultValue={currentSearch}
                placeholder="عنوان مقاله، آموزش یا محتوای آموزشی را جستجو کنید..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#ffb51b] focus:bg-white focus:ring-4 focus:ring-[#ffb51b]/10"
              />
            </div>

            <button
              className="gold-btn h-12 w-full sm:min-w-32 sm:w-auto"
              type="submit"
            >
              جستجو
              <Search size={16} />
            </button>
          </form>
        </div>

        {/* Mobile filter button */}
        <button
          type="button"
          onClick={() => {
            const element =
              document.getElementById(
                "education-mobile-filter",
              );

            element?.classList.remove("hidden");
          }}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold lg:hidden"
        >
          <SlidersHorizontal size={16} />
          فیلتر آموزش‌ها
        </button>

        {/* =========================
            MAIN GRID
        ========================== */}
        <div className="grid gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">

          {/* Desktop Filter */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0">

            {/* Heading */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-sm font-bold text-[#e39b00]">
                  آموزش و دانش
                </div>

                <h2 className="mt-1 text-2xl font-black text-[#10243a]">
                  مقالات و آموزش‌های تخصصی
                </h2>
              </div>

              <div className="w-fit rounded-full bg-white px-4 py-2 text-[11px] font-bold text-slate-500 shadow-sm">
                {data.count.toLocaleString("fa-IR")} محتوا
              </div>
            </div>

            {/* Loading indicator */}
            {pending && (
              <div className="mb-4 h-1 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-1/3 animate-pulse rounded-full bg-[#ffb51b]" />
              </div>
            )}

            {/* =========================
                CARDS
            ========================== */}
            {data.results.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {data.results.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/education/${item.slug}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(10,30,50,.05)] transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(10,30,50,.10)]"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      {item.featured_media ? (
                        <Image
                          src={item.featured_media}
                          alt={item.title}
                          fill
                          sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-slate-400">
                          تصویر موجود نیست
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="mb-3">
                        <span className="inline-flex rounded-full bg-[#ffb51b]/10 px-3 py-1 text-[10px] font-bold text-[#c27e00]">
                          {item.content_type || "آموزش"}
                        </span>
                      </div>

                      <h3 className="line-clamp-2 text-sm font-black leading-6 text-[#10243a]">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 min-h-10 text-[11px] leading-5 text-slate-500">
                        {item.excerpt}
                      </p>

                      <div className="mt-5 flex items-center justify-between text-[11px] font-bold">
                        <span className="text-[#e39b00]">
                          مطالعه بیشتر
                        </span>

                        <ArrowLeft
                          size={15}
                          className="text-[#e39b00] transition group-hover:-translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Search size={22} />
                </div>

                <h3 className="mt-5 text-lg font-black text-[#10243a]">
                  محتوایی پیدا نشد
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  فیلترها یا عبارت جستجو را تغییر دهید.
                </p>

                <button
                  onClick={clearFilters}
                  className="gold-btn mt-5"
                >
                  حذف فیلترها
                </button>
              </div>
            )}

            {/* Pagination */}
            <Pagination
              count={data.count}
            />
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE FILTER
      ========================== */}
      <div
        id="education-mobile-filter"
        className="fixed inset-0 z-[70] hidden lg:hidden"
      >
        <button
          aria-label="بستن فیلتر"
          className="absolute inset-0 bg-[#071827]/60"
          onClick={() => {
            document
              .getElementById(
                "education-mobile-filter",
              )
              ?.classList.add("hidden");
          }}
        />

        <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto bg-[#f6f8fa] p-4 shadow-2xl">

          <div className="mb-3 flex items-center justify-between">
            <strong className="text-sm text-[#10243a]">
              فیلترها
            </strong>

            <button
              onClick={() => {
                document
                  .getElementById(
                    "education-mobile-filter",
                  )
                  ?.classList.add("hidden");
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white"
            >
              <X size={17} />
            </button>
          </div>

          <FilterPanel />
        </div>
      </div>
    </section>
  );
}