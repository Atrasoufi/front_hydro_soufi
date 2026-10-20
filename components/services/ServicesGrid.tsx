import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Cog,
  Settings2,
  Wrench,
  Headphones,
  PenTool,
  Gauge,
} from "lucide-react";
import type { Service } from "../../lib/types";

const fallbackImages = [
  "/images/hero-products.svg",
  "/images/industrial-machinery.svg",
  "/images/service-engineering.svg",
  "/images/consultation-background.svg",
  "/images/hero-home.svg",
  "/images/service-electronics.svg",
];

const icons = [Cog, Settings2, Wrench, Gauge, PenTool, Headphones];

export default function ServicesGrid({ data }: { data: Service[] }) {
  const active = data.filter((s) => s.is_active);

  return (
    <div dir="rtl">
      <section className="bg-[#f6f8fa] py-12 md:py-16">
        <div className="container-site">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-sm font-black text-[#e39b00]">
                خدمات هیدرولیک صوفی
              </div>

              <h2 className="mt-2 text-2xl font-black text-[#10243a] md:text-3xl">
                از طراحی تا اجرا، کنار پروژه شما هستیم
              </h2>

              <p className="mt-3 max-w-2xl text-xs leading-7 text-slate-500">
                خدمات تخصصی هیدرولیک با تمرکز بر انتخاب صحیح تجهیزات، طراحی
                راهکار، ساخت، تعمیر و پشتیبانی فنی.
              </p>
            </div>

            <div className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm">
              {active.length.toLocaleString("fa-IR")} خدمت فعال
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {active.map((service, index) => {
              const Icon = icons[index % icons.length];

              const imageSrc =
                service.cover_image ||
                fallbackImages[index % fallbackImages.length];

              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(10,30,50,.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(10,30,50,.10)]"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <Image
                      src={imageSrc}
                      alt={service.name}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      unoptimized
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/70 via-[#071827]/5 to-transparent" />

                    <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[#071827]/70 text-[#ffb51b] backdrop-blur-sm">
                      <Icon size={20} />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-black text-[#10243a]">
                      {service.name}
                    </h3>

                    <p className="mt-2 min-h-12 text-xs leading-6 text-slate-500">
                      {service.short_description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-[11px] font-extrabold">
                      <span className="text-[#e39b00]">جزئیات خدمت</span>

                      <ArrowLeft
                        size={15}
                        className="text-[#e39b00] transition group-hover:-translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-[#071827] shadow-[0_18px_50px_rgba(3,15,27,.18)]">
            <Image
              src="/images/hero-services.svg"
              alt="مشاوره و خدمات هیدرولیک"
              fill
              sizes="(max-width:1024px) 100vw, 40vw"
              className="object-cover opacity-75"
              unoptimized
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071827] via-[#071827]/40 to-transparent" />

            <div className="absolute bottom-7 right-7 left-7 text-white">
              <div className="text-xs font-bold text-[#ffb51b]">
                پشتیبانی فنی
              </div>

              <div className="mt-2 text-xl font-black leading-8">
                راهکار را فقط تحویل نمی‌دهیم؛ تا راه‌اندازی همراه شما هستیم.
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-black text-[#e39b00]">
              چرا هیدرولیک صوفی؟
            </div>

            <h2 className="mt-2 text-2xl font-black text-[#10243a] md:text-3xl">
              یک تیم، از مسئله تا راهکار نهایی
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                "بررسی دقیق نیاز پروژه",
                "انتخاب تجهیزات متناسب",
                "طراحی و ساخت سفارشی",
                "پشتیبانی و تعمیرات تخصصی",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#f8fafb] p-4"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#e39b00]"
                  />

                  <span className="text-xs font-bold leading-6 text-[#10243a]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/#consult" className="gold-btn mt-7">
              درخواست مشاوره
              <ArrowLeft size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
