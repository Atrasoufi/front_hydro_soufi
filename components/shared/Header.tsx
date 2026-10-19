import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";

const nav = [
  ["خانه", "/"],
  ["محصولات", "/products"],
  ["خدمات", "/services"],
  ["صنایع", "/industries"],
  ["آموزش", "/education"],
  ["درباره ما", "/about"],
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071827]/95 text-white backdrop-blur-md">
      <div className="container-site" dir="rtl">
        <div className="flex min-h-[68px] items-center gap-4 lg:gap-7">
          {/* Logo */}
          <Link href="/" className="min-w-0 shrink-0 leading-tight">
            <div className="flex items-center gap-1 text-[17px] font-black sm:text-[19px]">
              <span className="whitespace-nowrap">هیدرولیک صوفی</span>
              <span className="text-xl text-[#ffb51b] sm:text-2xl">HS</span>
            </div>
            <div className="mt-0.5 hidden text-[8px] text-white/55 sm:block">
              طراحی و تامین تجهیزات هیدرولیک صنعتی
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 text-[12px] font-semibold xl:flex 2xl:gap-7">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="whitespace-nowrap transition hover:text-[#ffb51b]"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="mr-auto hidden shrink-0 sm:flex items-center">
            <Link
              href="/consultation"
              className="gold-btn px-3 py-2.5 text-[11px] sm:px-4"
            >
              درخواست مشاوره
              <MessageCircle size={14} />
            </Link>
          </div>

          {/* Mobile menu */}
          <details className="relative mr-auto xl:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white marker:hidden [&::-webkit-details-marker]:hidden">
              <Menu size={20} />
            </summary>

            <div className="absolute left-0 top-[54px] w-[min(86vw,330px)] overflow-hidden rounded-2xl border border-white/10 bg-[#071827] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <span className="text-sm font-black">منوی سایت</span>
                <X size={16} className="text-white/40" />
              </div>

              <nav className="p-2">
                {nav.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-[#ffb51b]"
                  >
                    {label}
                  </Link>
                ))}

                <Link
                  href="/consultation"
                  className="gold-btn mt-2 w-full text-xs"
                >
                  درخواست مشاوره
                  <MessageCircle size={14} />
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
