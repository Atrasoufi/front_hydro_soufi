import { createPageMetadata } from "../../lib/seo";
import PageShell from "../../components/shared/PageShell";
import ConsultationForm from "../../components/consultation/ConsultationForm";

export const metadata = createPageMetadata("/consultation");
export default function ConsultationPage() {
  return (
    <PageShell>
      <section
        className="relative overflow-hidden bg-[#071827] text-white"
        dir="rtl"
      >
        <div className="absolute inset-0">
          <img
            src="/images/industrial-machinery.svg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,13,23,.96)_0%,rgba(3,13,23,.88)_36%,rgba(3,13,23,.48)_68%,rgba(3,13,23,.32)_100%)]" />
        </div>

        <div className="container-site relative z-10 flex min-h-[300px] items-center justify-center py-10 text-center sm:min-h-[315px] sm:py-12 md:min-h-[330px]">
          <div className="max-w-[720px]">
            <div className="text-sm font-extrabold text-[#ffb51b]">
              با ما در ارتباط باشید
            </div>
            <h1 className="mt-3 text-[30px] font-black leading-[1.55] tracking-tight sm:text-[36px] md:text-[46px]">
              درخواست مشاوره
            </h1>
            <p className="mx-auto mt-3 max-w-[620px] text-sm leading-8 text-white/80 md:text-[15px]">
              برای دریافت مشاوره تخصصی، اطلاعات خود را در فرم زیر وارد کنید تا
              کارشناسان ما در سریع‌ترین زمان ممکن با شما تماس بگیرند.
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[#f5f8fb] py-12 md:py-14"
        dir="rtl"
      >
        <div className="pointer-events-none absolute bottom-0 left-0 hidden h-72 w-[520px] opacity-40 sm:block [background-image:repeating-linear-gradient(25deg,transparent_0,transparent_9px,#dce5ed_10px,#dce5ed_11px)] [mask-image:linear-gradient(to_top_right,black,transparent_70%)]" />

        <div className="container-site relative z-10 grid gap-6 lg:grid-cols-[1.65fr_.85fr] lg:items-start">
          <ConsultationForm />

          <aside className="rounded-2xl bg-[#071827] p-7 text-white shadow-[0_12px_35px_rgba(7,24,39,.16)] md:p-8">
            <h2 className="text-2xl font-black">چرا با ما مشاوره کنید؟</h2>

            <div className="mt-8 space-y-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ffb51b] text-[#ffb51b]">
                  <span className="text-xl">♙</span>
                </div>
                <div>
                  <h3 className="text-sm font-black">مشاوره تخصصی و دقیق</h3>
                  <p className="mt-1 text-xs leading-6 text-white/65">
                    دریافت راهنمایی از کارشناسان مجرب در زمینه محصولات و خدمات
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-[#ffb51b]">
                  <span className="text-xl">ϟ</span>
                </div>
                <div>
                  <h3 className="text-sm font-black">پاسخ سریع</h3>
                  <p className="mt-1 text-xs leading-6 text-white/65">
                    در کوتاه‌ترین زمان ممکن با شما تماس خواهیم گرفت
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ffb51b] text-[#ffb51b]">
                  <span className="text-xl">⚙</span>
                </div>
                <div>
                  <h3 className="text-sm font-black">راهکارهای اختصاصی</h3>
                  <p className="mt-1 text-xs leading-6 text-white/65">
                    ارائه بهترین راهکار متناسب با نیازهای پروژه شما
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-[#ffb51b]">
                  <span className="text-xl">◉</span>
                </div>
                <div>
                  <h3 className="text-sm font-black">پشتیبانی کامل</h3>
                  <p className="mt-1 text-xs leading-6 text-white/65">
                    همراهی در تمام مراحل خرید و اجرای پروژه
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 rounded-xl bg-[#0b2b47] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[10px] text-white/70">
                  در صورت نیاز به تماس مستقیم
                </div>
                <div className="mt-1 text-lg font-black tracking-wider">
                  0912-048-1748
                </div>
              </div>
              <div className="text-2xl text-[#ffb51b]">☎</div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
