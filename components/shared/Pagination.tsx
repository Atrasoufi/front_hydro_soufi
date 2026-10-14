'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ count, perPage = 9, basePath = '/products' }: { count: number; perPage?: number; basePath?: string }) {
  const sp = useSearchParams();
  const current = Number(sp.get('page') || 1);
  const pages = Math.max(1, Math.ceil(count / perPage));
  if (pages <= 1) return null;

  const makeHref = (page: number) => {
    const params = new URLSearchParams(sp.toString());
    params.set('page', String(page));
    return `${basePath}?${params.toString()}`;
  };

  const numbers = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === pages || Math.abs(n - current) <= 1,
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" dir="ltr" aria-label="صفحه‌بندی">
      <Link
        href={makeHref(Math.max(1, current - 1))}
        aria-label="صفحه قبل"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-[#ffb51b] hover:text-[#10243a]"
      >
        <ChevronLeft size={17} />
      </Link>
      {numbers.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && numbers[i - 1] !== n - 1 && <span className="px-1 text-slate-400">…</span>}
          <Link
            href={makeHref(n)}
            className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-bold transition ${
              n === current
                ? 'border-[#071827] bg-[#071827] text-white'
                : 'border-slate-200 bg-white text-[#10243a] hover:border-[#ffb51b]'
            }`}
          >
            {n}
          </Link>
        </span>
      ))}
      <Link
        href={makeHref(Math.min(pages, current + 1))}
        aria-label="صفحه بعد"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-[#ffb51b] hover:text-[#10243a]"
      >
        <ChevronRight size={17} />
      </Link>
    </nav>
  );
}
