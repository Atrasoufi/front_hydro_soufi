import Link from "next/link";
import { MessageCircle } from "lucide-react";

const nav = [
  ["خانه", "/"],
  ["محصولات", "/products"],
  ["خدمات", "/services"],
  ["صنایع", "/industries"],
  ["آموزش", "/education"],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#071827]/95 text-white backdrop-blur-md">
      <div
        className="container-site flex h-[68px] items-center gap-7"
        dir="rtl"
      >
        <Link href="/" className="shrink-0 leading-tight">
          <div className="flex items-center gap-1 text-[19px] font-black">
            <span>هیدرولیک صوفی</span>
            <span className="text-2xl text-[#ffb51b]">HS</span>
          </div>
          <div className="mt-0.5 text-[8px] text-white/55">
            طراحی و تامین تجهیزات هیدرولیک صنعتی
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 text-[12px] font-semibold lg:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-[#ffb51b]"
            >
              {label}
            </Link>
          ))}
          <span className="cursor-default text-white/80">درباره ما</span>
        </nav>

        <div className="mr-auto flex items-center gap-4">
          <Link
            href="/consultation"
            className="gold-btn hidden px-4 py-2.5 text-[11px] sm:inline-flex"
          >
            درخواست مشاوره
            <MessageCircle size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
