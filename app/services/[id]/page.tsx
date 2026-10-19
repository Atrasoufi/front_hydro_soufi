import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import PageShell from "../../../components/shared/PageShell";
import { apiUrl } from "../../../lib/api";

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(apiUrl(`/services/api/services/${id}/`), {
    next: { revalidate: 600 },
  });
  if (!response.ok)
    return (
      <PageShell>
        <div className="container-site py-24 text-center" dir="rtl">
          <h1 className="text-2xl font-black">خدمت پیدا نشد</h1>
          <Link href="/services" className="gold-btn mt-6">
            بازگشت به خدمات
          </Link>
        </div>
      </PageShell>
    );
  const service = await response.json();

  return (
    <PageShell>
      <section
        className="relative overflow-hidden bg-[#071827] py-10 text-white md:py-14"
        dir="rtl"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero-services.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#071827] via-[#071827]/80 to-[#071827]/35" />
        </div>
        <div className="container-site relative z-10">
          <Link
            href="/services"
            className="mb-5 inline-flex items-center gap-2 text-xs text-white/60 hover:text-white"
          >
            <ArrowRight size={14} /> بازگشت به خدمات
          </Link>
          <div className="max-w-2xl">
            <div className="text-sm font-bold text-[#ffb51b]">
              خدمات هیدرولیک صوفی
            </div>
            <h1 className="mt-2 text-2xl font-black leading-[1.65] sm:text-3xl md:text-4xl">
              {service.name}
            </h1>
            <p className="mt-4 text-[13px] leading-7 text-white/65 sm:text-sm sm:leading-8">
              {service.short_description}
            </p>
            <Link href="/#consult" className="gold-btn mt-6">
              درخواست مشاوره <MessageCircle size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8fa] py-10 md:py-14" dir="rtl">
        <div className="container-site grid gap-7 lg:grid-cols-[1fr_340px]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(10,30,50,.05)] md:p-8">
            <div className="text-sm font-black text-[#e39b00]">جزئیات خدمت</div>
            <h2 className="mt-2 text-2xl font-black text-[#10243a]">
              راهکار متناسب با پروژه شما
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate-600">
              {service.short_description}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "بررسی نیاز پروژه",
                "انتخاب تجهیزات مناسب",
                "طراحی و اجرای راهکار",
                "پشتیبانی فنی",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl bg-[#f7f9fb] p-4 text-xs font-bold text-[#10243a]"
                >
                  <CheckCircle2 size={17} className="text-[#e39b00]" />
                  {item}
                </div>
              ))}
            </div>
          </article>
          <aside className="h-fit rounded-3xl bg-[#071827] p-6 text-white shadow-xl">
            <div className="text-sm font-black">نیاز به مشاوره دارید؟</div>
            <p className="mt-3 text-xs leading-6 text-white/60">
              شرایط پروژه را با ما در میان بگذارید تا مناسب‌ترین راهکار را
              پیشنهاد کنیم.
            </p>
            <Link
              href="/#consult"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#ffb51b] px-4 py-3 text-xs font-black text-[#071827]"
            >
              درخواست مشاوره <MessageCircle size={14} />
            </Link>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
