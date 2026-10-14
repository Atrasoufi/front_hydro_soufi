import Link from 'next/link';
import { Instagram, Linkedin, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#071827] text-white" dir="rtl">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <div className="text-xl font-black">هیدرولیک صوفی <span className="text-[#ffb51b]">HS</span></div>
          <p className="mt-4 max-w-sm text-xs leading-7 text-white/55">طراحی، ساخت و تأمین تجهیزات و سیستم‌های هیدرولیک صنعتی با تمرکز بر کیفیت، مهندسی و پشتیبانی.</p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Linkedin].map((Icon, i) => <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70"><Icon size={14} /></span>)}
          </div>
        </div>
        <div><h3 className="mb-4 text-sm font-extrabold">دسترسی سریع</h3>{['محصولات','خدمات','صنایع','آموزش','مقالات'].map((x) => <Link key={x} href="#" className="block py-1.5 text-xs text-white/55 hover:text-[#ffb51b]">{x}</Link>)}</div>
        <div><h3 className="mb-4 text-sm font-extrabold">اطلاعات</h3>{['درباره ما','تماس با ما','پروژه‌ها','ویدیوها','راهنمای انتخاب'].map((x) => <Link key={x} href="#" className="block py-1.5 text-xs text-white/55 hover:text-[#ffb51b]">{x}</Link>)}</div>
        <div><h3 className="mb-4 text-sm font-extrabold">با کارشناسان ما در ارتباط باشید</h3><div className="space-y-3 text-xs text-white/60"><div className="flex items-center gap-2"><Phone size={14} className="text-[#ffb51b]" /> ۰۲۱-۱۲۳۴۵۶۷۸</div><div className="flex items-center gap-2"><MapPin size={14} className="text-[#ffb51b]" /> تهران، شهرک صنعتی</div><div>info@hydro-soofi.ir</div></div></div>
      </div>
      <div className="border-t border-white/10"><div className="container-site py-4 text-[10px] text-white/40">© تمامی حقوق محفوظ است. هیدرولیک صوفی</div></div>
    </footer>
  );
}
