export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`} />;
}

export function GridSkeleton({ count = 6, variant = 'card' }: { count?: number; variant?: 'card' | 'product' }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Skeleton className={variant === 'product' ? 'h-52 rounded-none' : 'h-44 rounded-none'} />
          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <section className="bg-[#f6f8fa] py-10 md:py-14" dir="rtl">
      <div className="container-site">
        <div className="mb-6 h-16 animate-pulse rounded-2xl bg-slate-200" />
        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <Skeleton className="h-[420px]" />
          <GridSkeleton count={6} variant="product" />
        </div>
      </div>
    </section>
  );
}
