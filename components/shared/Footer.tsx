import Link from "next/link";
import {
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  CirclePlay,
  Clock3,
  MessageCircle,
  Mail,
  ShieldCheck,
} from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/soufi_hydrulic?psln=MXB0d2phcHpjMWNrMA==",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ebrahim-soofi-netestani-54b429438/",
    icon: Linkedin,
  },
  {
    label: "Aparat",
    href: "https://www.aparat.com/Hydraulicsoufi",
    icon: CirclePlay,
  },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#071827] text-white" dir="rtl">
      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="container-site px-5 py-12 sm:px-6 sm:py-14 lg:py-16">
        <div
          className="
            grid
            grid-cols-1
            gap-10
            md:grid-cols-2
            md:gap-x-12
            md:gap-y-12
            lg:grid-cols-[1.35fr_1fr_1.15fr]
            lg:gap-14
            xl:gap-20
          "
        >
          {/* =================================================
              BRAND / ABOUT
          ================================================== */}

          <div className="min-w-0">
            <div className="text-center md:text-right">
              <Link
                href="/"
                className="
                  inline-block
                  text-xl
                  font-black
                  tracking-tight
                  transition
                  hover:text-white
                "
              >
                هیدرولیک صوفی <span className="text-[#ffb51b]">HS</span>
              </Link>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-[430px]
                  text-xs
                  leading-7
                  text-white/55
                  md:mx-0
                "
              >
                طراحی، ساخت و تأمین تجهیزات و سیستم‌های هیدرولیک صنعتی با تمرکز
                بر کیفیت، مهندسی و پشتیبانی تخصصی.
              </p>
            </div>

            {/* Trust box */}
            <div
              className="
                mt-6
                rounded-2xl
                border
                border-white/10
                bg-white/[0.035]
                p-4
              "
            >
              <div className="flex items-start gap-3">
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#ffb51b]/10
                    text-[#ffb51b]
                  "
                >
                  <ShieldCheck size={18} />
                </span>

                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-white">
                    کیفیت و پشتیبانی تخصصی
                  </div>

                  <p className="mt-1 text-[11px] leading-6 text-white/45">
                    همراه شما در انتخاب، تأمین و اجرای تجهیزات و سیستم‌های
                    هیدرولیک.
                  </p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6">
              <p className="mb-3 text-[11px] font-bold text-white/45">
                ما را دنبال کنید
              </p>

              <div className="flex justify-center gap-2 md:justify-start">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        text-white/60
                        transition
                        duration-200
                        hover:border-[#ffb51b]/40
                        hover:bg-[#ffb51b]/10
                        hover:text-[#ffb51b]
                      "
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =================================================
              CONTACT INFORMATION
          ================================================== */}

          <div className="min-w-0">
            <h3 className="mb-5 text-center text-sm font-extrabold text-white md:text-right">
              اطلاعات تماس
            </h3>

            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:+989120481748"
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-white/5
                  bg-white/[0.025]
                  p-3
                  transition
                  hover:border-[#ffb51b]/20
                  hover:bg-white/[0.045]
                  md:justify-start
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#ffb51b]/10
                    text-[#ffb51b]
                  "
                >
                  <Phone size={14} />
                </span>

                <div className="min-w-0 text-center md:text-right">
                  <div className="text-[10px] text-white/35">شماره تماس</div>

                  <span
                    dir="ltr"
                    className="
                      mt-0.5
                      block
                      text-xs
                      font-bold
                      text-white/70
                      transition
                      group-hover:text-white
                    "
                  >
                    ۰۹۱۲-۰۴۸-۱۷۴۸
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:z.soofi.n@gmail.com"
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-white/5
                  bg-white/[0.025]
                  p-3
                  transition
                  hover:border-[#ffb51b]/20
                  hover:bg-white/[0.045]
                  md:justify-start
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#ffb51b]/10
                    text-[#ffb51b]
                  "
                >
                  <Mail size={14} />
                </span>

                <div className="min-w-0 text-center md:text-right">
                  <div className="text-[10px] text-white/35">ایمیل</div>

                  <span
                    dir="ltr"
                    className="
                      mt-0.5
                      block
                      break-all
                      text-xs
                      font-medium
                      text-white/65
                      transition
                      group-hover:text-[#ffb51b]
                    "
                  >
                    z.soofi.n@gmail.com
                  </span>
                </div>
              </a>

              {/* Location */}
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-white/5
                  bg-white/[0.025]
                  p-3
                  md:justify-start
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#ffb51b]/10
                    text-[#ffb51b]
                  "
                >
                  <MapPin size={14} />
                </span>

                <div className="text-center md:text-right">
                  <div className="text-[10px] text-white/35">محل فعالیت</div>

                  <span className="mt-0.5 block text-xs font-medium text-white/65">
                    اراک، جاده احمدآباد، سه راهی خمین، 3RQ6+GFG
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              WORKING HOURS / CONSULTATION
          ================================================== */}

          <div className="min-w-0">
            <h3 className="mb-5 text-center text-sm font-extrabold text-white md:text-right">
              ارتباط با کارشناسان
            </h3>

            {/* Working hours */}
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.035]
                p-5
              "
            >
              <div className="flex items-start gap-3">
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#ffb51b]/10
                    text-[#ffb51b]
                  "
                >
                  <Clock3 size={17} />
                </span>

                <div>
                  <div className="text-xs font-extrabold text-white">
                    ساعات پاسخگویی
                  </div>

                  <p className="mt-1 text-[11px] leading-6 text-white/45">
                    برای دریافت مشاوره و اطلاعات فنی می‌توانید با کارشناسان
                    مجموعه در ارتباط باشید.
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-4
                  border-t
                  border-white/10
                  pt-4
                  text-center
                  text-xs
                  text-white/55
                  md:text-right
                "
              >
                شنبه تا پنجشنبه
                <span className="mx-2 text-white/20">•</span>
                ۸:۰۰ تا ۱۷:۰۰
              </div>
            </div>

            {/* Consultation CTA */}
            <Link
              href="/consultation"
              className="
                mt-4
                flex
                min-h-[52px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#ffb51b]
                px-5
                text-sm
                font-extrabold
                text-[#071827]
                shadow-[0_8px_25px_rgba(255,181,27,0.12)]
                transition
                duration-200
                hover:bg-[#ffc13a]
                hover:shadow-[0_10px_30px_rgba(255,181,27,0.18)]
              "
            >
              <MessageCircle size={17} />
              درخواست مشاوره تخصصی
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <div className="border-t border-white/10">
        <div
          className="
            container-site
            flex
            min-h-[60px]
            flex-col
            items-center
            justify-center
            gap-2
            px-5
            py-4
            text-center
            sm:flex-row
            sm:justify-between
            sm:px-6
            sm:text-right
          "
        >
          <p className="text-[10px] leading-5 text-white/40 sm:text-xs">
            © تمامی حقوق محفوظ است. هیدرولیک صوفی
          </p>

          <p className="text-[10px] leading-5 text-white/30 sm:text-xs">
            طراحی و توسعه با تمرکز بر کیفیت و عملکرد
          </p>
        </div>
      </div>
    </footer>
  );
}
