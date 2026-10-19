import { createPageMetadata } from "../../lib/seo";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Headphones,
  Instagram,
  Linkedin,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Users,
  CirclePlay,
} from "lucide-react";

import PageShell from "../../components/shared/PageShell";

/* =========================================================
   Stats
========================================================= */

const stats = [
  {
    value: "۲۰+",
    title: "سال سابقه فعالیت",
    description: "تجربه مستمر در صنعت هیدرولیک",
    icon: Award,
  },
  {
    value: "۵۰۰+",
    title: "مشتری و همکار",
    description: "اعتماد مجموعه‌ای از مشتریان",
    icon: Users,
  },
  {
    value: "۱۰۰٪",
    title: "تضمین کیفیت",
    description: "کیفیت، اولویت اصلی ماست",
    icon: ShieldCheck,
  },
  {
    value: "۵۰+",
    title: "نیروی متخصص",
    description: "تجربه و تخصص در کنار هم",
    icon: Headphones,
  },
];

/* =========================================================
   Social Links
========================================================= */

const socialLinks = [
  {
    title: "اینستاگرام",
    icon: Instagram,
    href: "https://www.instagram.com/soufi_hydrulic?psln=MXB0d2phcHpjMWNrMA==",
  },
  {
    title: "لینکدین",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ebrahim-soofi-netestani-54b429438/",
  },
  {
    title: "آپارات",
    icon: CirclePlay,
    href: "https://www.aparat.com/Hydraulicsoufi",
  },
];

/* =========================================================
   Images
========================================================= */

const heroImage =
  "/images/industrial-machinery.svg";

const companyImage =
  "/images/company-facility.svg";

export const metadata = createPageMetadata("/about");
export default function AboutPage() {
  return (
    <PageShell>
      <main dir="rtl" className="bg-white">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative min-h-[390px] overflow-hidden bg-[#071827] text-white md:min-h-[440px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="هیدرولیک صوفی"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(3,13,23,.98)_0%,rgba(3,13,23,.91)_34%,rgba(3,13,23,.58)_62%,rgba(3,13,23,.18)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071827]/70 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="container-site relative z-10 flex min-h-[390px] items-center py-14 md:min-h-[440px] md:py-16">
            <div className="max-w-[650px]">
              {/* Breadcrumb */}
              <div className="mb-5 flex items-center gap-2 text-xs text-white/55">
                <Link href="/" className="transition hover:text-white">
                  خانه
                </Link>

                <ArrowLeft size={12} />

                <span className="text-[#ffb51b]">درباره ما</span>
              </div>

              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-9 bg-[#ffb51b]" />

                <span className="text-sm font-extrabold text-[#ffb51b]">
                  معرفی هیدرولیک صوفی
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[34px] font-black leading-[1.5] tracking-tight md:text-[48px]">
                درباره شرکت{" "}
                <span className="text-[#ffb51b]">هیدرولیک صوفی</span>
              </h1>

              <p className="mt-5 max-w-[590px] text-sm leading-8 text-white/80 md:text-[16px]">
                با تجربه و تخصص در صنعت هیدرولیک، در کنار شما برای طراحی، تأمین
                و اجرای راهکارهای مطمئن و کاربردی هیدرولیکی هستیم.
              </p>

              {/* Buttons */}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/consultation" className="gold-btn">
                  <MessageCircle size={16} />
                  درخواست مشاوره
                </Link>

                <Link
                  href="#company"
                  className="dark-btn border border-white/20 bg-white/10"
                >
                  بیشتر درباره ما
                  <ArrowLeft size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            COMPANY INTRO
        ====================================================== */}

        <section id="company" className="bg-white py-16 md:py-20 lg:py-24">
          <div className="container-site">
            {/*
              مهم:
              به خاطر RTL:
              آیتم اول = ستون سمت راست
              آیتم دوم = ستون سمت چپ

              بنابراین TEXT را اول گذاشتیم
              و IMAGE را دوم.
            */}

            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              {/* =================================================
                  TEXT — RIGHT
              ================================================== */}

              <div className="order-1 min-w-0">
                {/* Section Label */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-[#ffb51b]" />

                  <span className="text-xs font-black text-[#b57a00]">
                    معرفی شرکت
                  </span>
                </div>

                {/* Heading */}
                <h2 className="max-w-[560px] text-[30px] font-black leading-[1.65] text-[#071827] md:text-[38px]">
                  تخصص ما، <span className="text-[#d79500]">هیدرولیک</span> است
                </h2>

                {/* Description */}
                <div className="mt-5 max-w-[610px] space-y-3">
                  <p className="text-sm leading-8 text-slate-500 md:text-[15px]">
                    هیدرولیک صوفی با تمرکز بر صنعت هیدرولیک، در زمینه تأمین
                    تجهیزات، طراحی و اجرای سیستم‌های هیدرولیکی فعالیت می‌کند.
                  </p>

                  <p className="text-sm leading-8 text-slate-500 md:text-[15px]">
                    هدف ما ارائه راهکارهایی مطمئن، کاربردی و متناسب با نیاز
                    واقعی مشتریان است؛ از انتخاب قطعات و تجهیزات مناسب تا ارائه
                    خدمات فنی و پشتیبانی.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#f8fafc] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff5d8] text-[#c78a00]">
                      <CheckCircle2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-black text-[#071827]">
                        کیفیت و اصالت
                      </div>

                      <p className="mt-1 text-[11px] leading-6 text-slate-400">
                        تمرکز بر ارائه محصولات و راهکارهای مطمئن
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#f8fafc] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff5d8] text-[#c78a00]">
                      <Headphones size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-black text-[#071827]">
                        مشاوره تخصصی
                      </div>

                      <p className="mt-1 text-[11px] leading-6 text-slate-400">
                        همراهی مشتری از انتخاب تا اجرای راهکار
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact + Social */}
                <div className="mt-7 border-t border-slate-100 pt-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Phone */}
                    <a
                      href="tel:+989120481748"
                      className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-[#f8fafc] p-3 transition hover:border-[#ffb51b]/40 hover:bg-[#fffaf0]"
                      dir="rtl"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071827] text-[#ffb51b]">
                        <Phone size={17} />
                      </div>

                      <div className="min-w-0">
                        <div className="text-[10px] text-slate-400">
                          شماره تماس
                        </div>

                        <div
                          dir="ltr"
                          className="mt-1 text-sm font-black text-[#071827]"
                        >
                          ۰۹۱۲-۰۴۸-۱۷۴۸
                        </div>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:z.soofi.n@gmail.com"
                      className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-[#f8fafc] p-3 transition hover:border-[#ffb51b]/40 hover:bg-[#fffaf0]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071827] text-[#ffb51b]">
                        <Mail size={17} />
                      </div>

                      <div className="min-w-0">
                        <div className="text-[10px] text-slate-400">
                          ایمیل
                        </div>

                        <div
                          dir="ltr"
                          className="mt-1 truncate text-xs font-bold text-[#071827]"
                        >
                          z.soofi.n@gmail.com
                        </div>
                      </div>
                    </a>

                    {/* Address */}
                    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-[#f8fafc] p-3 sm:col-span-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071827] text-[#ffb51b]">
                        <MapPin size={17} />
                      </div>

                      <div className="min-w-0">
                        <div className="text-[10px] text-slate-400">
                          آدرس
                        </div>

                        <div className="mt-1 text-xs font-bold leading-6 text-[#071827]">
                          اراک، جاده احمدآباد، سه راهی خمین، 3RQ6+GFG
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social */}
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[11px] font-bold text-slate-400">
                      شبکه‌های اجتماعی
                    </span>

                    <div className="flex items-center gap-2">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;

                        return (
                          <a
                            key={social.title}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={social.title}
                            title={social.title}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe7ef] bg-white text-[#071827] transition hover:border-[#ffb51b] hover:bg-[#fff8e8] hover:text-[#b77900]"
                          >
                            <Icon size={17} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  IMAGE — LEFT
              ================================================== */}

              <div className="order-2 min-w-0">
                <div className="relative mx-auto w-full max-w-[560px] lg:mr-auto lg:ml-0">
                  {/* Gold Decoration */}
                  <div className="absolute -right-3 -top-3 h-24 w-24 rounded-2xl bg-[#ffb51b] md:-right-5 md:-top-5" />

                  {/* Image Card */}
                  <div className="relative overflow-hidden rounded-[22px] border border-[#dfe7ef] bg-white p-2 shadow-[0_18px_55px_rgba(7,24,39,.11)]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
                      <Image
                        src={companyImage}
                        alt="مجموعه هیدرولیک صوفی"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/25 to-transparent" />
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-5 left-5 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_12px_35px_rgba(7,24,39,.12)] sm:flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff5d8] text-[#c48700]">
                      <Award size={19} />
                    </div>

                    <div>
                      <div className="text-xs font-black text-[#071827]">
                        راهکارهای هیدرولیکی
                      </div>

                      <div className="mt-1 text-[10px] text-slate-400">
                        برای آینده صنعت
                      </div>
                    </div>

                    <ArrowLeft size={16} className="text-[#c48700]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            STATS
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#071827] py-14 md:py-16">
          {/* subtle background */}
          <div className="absolute inset-0 opacity-[0.06]">
            <div className="absolute -right-20 top-10 h-72 w-72 rounded-full border-[50px] border-[#ffb51b]" />
            <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full border-[40px] border-white" />
          </div>

          <div className="container-site relative z-10">
            {/* Section Heading */}
            <div className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-[#ffb51b]" />

                  <span className="text-xs font-bold text-[#ffb51b]">
                    چرا هیدرولیک صوفی؟
                  </span>
                </div>

                <h2 className="text-2xl font-black leading-[1.6] text-white md:text-3xl">
                  تجربه، کیفیت و <span className="text-[#ffb51b]">اعتماد</span>
                </h2>
              </div>

              <p className="max-w-[440px] text-xs leading-7 text-white/55 md:text-sm">
                ما تلاش می‌کنیم با تکیه بر تجربه و تخصص، بهترین خدمات و محصولات
                را متناسب با نیاز مشتریان ارائه کنیم.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-6 text-center backdrop-blur-sm md:px-5 md:py-7"
                  >
                    {/* Icon */}
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#ffb51b]/30 bg-[#ffb51b]/10 text-[#ffb51b]">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    {/* Number */}
                    <div className="mt-4 text-2xl font-black text-white md:text-3xl">
                      {stat.value}
                    </div>

                    {/* Title */}
                    <div className="mt-2 text-xs font-black text-white/90">
                      {stat.title}
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-[10px] leading-6 text-white/40">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
