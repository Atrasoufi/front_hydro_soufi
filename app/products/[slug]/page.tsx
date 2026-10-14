import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

import PageShell from "../../../components/shared/PageShell";
import ProductMediaGallery from "../../../components/products/ProductMediaGallery";
import { apiUrl } from "../../../lib/api";

async function getProduct(slug: string) {
  const response = await fetch(apiUrl(`/products/api/products/${slug}/`), {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) return null;

  return response.json();
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return (
      <PageShell>
        <div className="container-site py-24 text-center" dir="rtl">
          <h1 className="text-2xl font-black">محصول پیدا نشد</h1>

          <Link href="/products" className="gold-btn mt-6">
            بازگشت به محصولات
          </Link>
        </div>
      </PageShell>
    );
  }

  const images = Array.isArray(product.images) ? product.images : [];

  const videos = Array.isArray(product.videos) ? product.videos : [];

  return (
    <PageShell>
      {/* PRODUCT HERO */}
      <section
        className="relative overflow-hidden bg-[#071827] py-10 text-white md:py-14"
        dir="rtl"
      >
        <div className="container-site relative z-10">
          <Link
            href="/products"
            className="mb-5 inline-flex items-center gap-2 text-xs text-white/60 transition hover:text-white"
          >
            <ArrowRight size={14} />
            بازگشت به کاتالوگ
          </Link>

          <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
            {/* Product info */}
            <div>
              <div className="text-sm font-bold text-[#ffb51b]">
                محصول هیدرولیک صوفی
              </div>

              <h1 className="mt-2 text-3xl font-black leading-[1.6] md:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/65">
                {product.short_description}
              </p>

              <Link href="/#consult" className="gold-btn mt-6">
                درخواست مشاوره
                <MessageCircle size={15} />
              </Link>
            </div>

            {/* Gallery فقط Client است */}
            <ProductMediaGallery
              images={images}
              videos={videos}
              productName={product.name}
            />
          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="bg-[#f6f8fa] py-10 md:py-14" dir="rtl">
        <div className="container-site grid gap-7 lg:grid-cols-[1fr_330px]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(10,30,50,.05)] md:p-8">
            <div className="text-sm font-black text-[#e39b00]">معرفی محصول</div>

            <h2 className="mt-2 text-2xl font-black text-[#10243a]">
              توضیحات فنی
            </h2>

            <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-600">
              {product.full_description}
            </p>
          </article>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(10,30,50,.05)]">
            <div className="text-sm font-black text-[#10243a]">
              مشخصات محصول
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {(product.product_specs ?? []).map((spec: any) => (
                <div
                  key={
                    spec.id ??
                    `${spec.specification_name}-${spec.specification_value}`
                  }
                  className="flex items-start justify-between gap-4 py-3 text-xs"
                >
                  <span className="font-bold text-slate-500">
                    {spec.specification_name}
                  </span>

                  <span className="text-left font-black text-[#10243a]">
                    {spec.specification_value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[#071827] p-4 text-white">
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 size={16} className="text-[#ffb51b]" />
                مناسب برای پروژه‌های صنعتی
              </div>

              <Link
                href="/#consult"
                className="mt-4 block rounded-xl bg-[#ffb51b] px-4 py-3 text-center text-xs font-black text-[#071827]"
              >
                استعلام و مشاوره
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import {
//   ArrowLeft,
//   ArrowRight,
//   CheckCircle2,
//   ChevronLeft,
//   ChevronRight,
//   Maximize2,
//   MessageCircle,
//   Play,
//   X,
// } from 'lucide-react';
// import { useEffect, useMemo, useState } from 'react';
// import PageShell from '../../../components/shared/PageShell';
// import { apiUrl } from '../../../lib/api';

// type ProductImage = {
//   id?: number | string;
//   url?: string;
//   image?: string;
//   is_primary?: boolean;
// };

// type ProductVideo = {
//   id?: number | string;
//   url?: string;
//   video_url?: string;
//   file?: string;
//   thumbnail?: string;
//   cover_image?: string;
// };

// type ProductSpec = {
//   id?: number | string;
//   specification_name: string;
//   specification_value: string;
// };

// type Product = {
//   id: number;
//   name: string;
//   slug: string;
//   short_description?: string;
//   full_description?: string;
//   image?: string;
//   images?: ProductImage[];
//   videos?: ProductVideo[];
//   product_specs?: ProductSpec[];
// };

// type MediaItem =
//   | {
//       type: 'image';
//       id: string;
//       url: string;
//       isPrimary?: boolean;
//     }
//   | {
//       type: 'video';
//       id: string;
//       url: string;
//       thumbnail?: string;
//     };

// async function getProduct(slug: string): Promise<Product | null> {
//   const response = await fetch(
//     apiUrl(`/products/api/products/${slug}/`),
//     {
//       next: { revalidate: 300 },
//     }
//   );

//   if (!response.ok) return null;

//   return response.json();
// }

// function getImageUrl(image: ProductImage) {
//   return image.url || image.image || '';
// }

// function getVideoUrl(video: ProductVideo) {
//   return video.url || video.video_url || video.file || '';
// }

// function getVideoThumbnail(video: ProductVideo) {
//   return video.thumbnail || video.cover_image || '';
// }

// function ProductMediaGallery({
//   images,
//   videos,
//   productName,
// }: {
//   images: ProductImage[];
//   videos: ProductVideo[];
//   productName: string;
// }) {
//   const media = useMemo<MediaItem[]>(() => {
//     const imageItems: MediaItem[] = images
//       .filter((image) => getImageUrl(image))
//       .map((image, index) => ({
//         type: 'image',
//         id: `image-${image.id ?? index}`,
//         url: getImageUrl(image),
//         isPrimary: image.is_primary === true,
//       }));

//     const videoItems: MediaItem[] = videos
//       .filter((video) => getVideoUrl(video))
//       .map((video, index) => ({
//         type: 'video',
//         id: `video-${video.id ?? index}`,
//         url: getVideoUrl(video),
//         thumbnail: getVideoThumbnail(video) || undefined,
//       }));

//     return [...imageItems, ...videoItems];
//   }, [images, videos]);

//   const primaryIndex = useMemo(() => {
//     const index = media.findIndex(
//       (item) => item.type === 'image' && item.isPrimary
//     );

//     return index >= 0 ? index : 0;
//   }, [media]);

//   const [activeIndex, setActiveIndex] = useState(primaryIndex);
//   const [lightboxOpen, setLightboxOpen] = useState(false);

//   useEffect(() => {
//     setActiveIndex(primaryIndex);
//   }, [primaryIndex]);

//   useEffect(() => {
//     if (!lightboxOpen) return;

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         setLightboxOpen(false);
//       }

//       if (event.key === 'ArrowLeft') {
//         setActiveIndex((current) =>
//           current >= media.length - 1 ? 0 : current + 1
//         );
//       }

//       if (event.key === 'ArrowRight') {
//         setActiveIndex((current) =>
//           current <= 0 ? media.length - 1 : current - 1
//         );
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [lightboxOpen, media.length]);

//   if (!media.length) {
//     return (
//       <div className="relative h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:h-[360px]">
//         <Image
//           src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80"
//           alt={productName}
//           fill
//           priority
//           sizes="(max-width:1024px) 100vw, 50vw"
//           className="object-cover"
//           unoptimized
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/50 to-transparent" />
//       </div>
//     );
//   }

//   const activeMedia = media[activeIndex];

//   function nextMedia() {
//     setActiveIndex((current) =>
//       current >= media.length - 1 ? 0 : current + 1
//     );
//   }

//   function previousMedia() {
//     setActiveIndex((current) =>
//       current <= 0 ? media.length - 1 : current - 1
//     );
//   }

//   return (
//     <>
//       <div className="space-y-3">
//         {/* Main media */}
//         <div className="group relative h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-[#020b14] shadow-2xl md:h-[360px]">
//           {activeMedia.type === 'image' ? (
//             <button
//               type="button"
//               onClick={() => setLightboxOpen(true)}
//               className="absolute inset-0 z-10 h-full w-full cursor-zoom-in"
//               aria-label="نمایش تصویر بزرگ"
//             >
//               <Image
//                 src={activeMedia.url}
//                 alt={productName}
//                 fill
//                 priority
//                 sizes="(max-width:1024px) 100vw, 50vw"
//                 className="object-cover transition duration-500 group-hover:scale-[1.02]"
//                 unoptimized
//               />
//             </button>
//           ) : (
//             <video
//               key={activeMedia.url}
//               src={activeMedia.url}
//               controls
//               playsInline
//               className="h-full w-full object-contain"
//             />
//           )}

//           {/* Bottom overlay */}
//           <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/45 to-transparent" />

//           {/* Media counter */}
//           {media.length > 1 && (
//             <div className="absolute bottom-4 right-4 z-30 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-sm">
//               {activeIndex + 1} / {media.length}
//             </div>
//           )}

//           {/* Fullscreen */}
//           {activeMedia.type === 'image' && (
//             <button
//               type="button"
//               onClick={() => setLightboxOpen(true)}
//               className="absolute left-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65"
//               aria-label="نمایش تمام صفحه"
//             >
//               <Maximize2 size={15} />
//             </button>
//           )}

//           {/* Previous */}
//           {media.length > 1 && (
//             <button
//               type="button"
//               onClick={previousMedia}
//               className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/70"
//               aria-label="رسانه قبلی"
//             >
//               <ChevronRight size={20} />
//             </button>
//           )}

//           {/* Next */}
//           {media.length > 1 && (
//             <button
//               type="button"
//               onClick={nextMedia}
//               className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/70"
//               aria-label="رسانه بعدی"
//             >
//               <ChevronLeft size={20} />
//             </button>
//           )}
//         </div>

//         {/* Thumbnails */}
//         {media.length > 1 && (
//           <div className="flex gap-2 overflow-x-auto pb-1">
//             {media.map((item, index) => {
//               const active = index === activeIndex;

//               return (
//                 <button
//                   key={item.id}
//                   type="button"
//                   onClick={() => setActiveIndex(index)}
//                   className={`relative h-[68px] w-[82px] shrink-0 overflow-hidden rounded-xl border-2 bg-[#071827] transition ${
//                     active
//                       ? 'border-[#ffb51b] shadow-[0_0_0_2px_rgba(255,181,27,.12)]'
//                       : 'border-white/10 opacity-70 hover:border-white/30 hover:opacity-100'
//                   }`}
//                   aria-label={`نمایش رسانه ${index + 1}`}
//                 >
//                   {item.type === 'image' ? (
//                     <Image
//                       src={item.url}
//                       alt={`${productName} - ${index + 1}`}
//                       fill
//                       sizes="82px"
//                       className="object-cover"
//                       unoptimized
//                     />
//                   ) : item.thumbnail ? (
//                     <Image
//                       src={item.thumbnail}
//                       alt="ویدیو"
//                       fill
//                       sizes="82px"
//                       className="object-cover"
//                       unoptimized
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-[#10243a]">
//                       <Play size={20} className="text-[#ffb51b]" />
//                     </div>
//                   )}

//                   {item.type === 'video' && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-black/25">
//                       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#071827]">
//                         <Play size={13} fill="currentColor" />
//                       </div>
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Lightbox */}
//       {lightboxOpen && activeMedia.type === 'image' && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02070d]/95 p-4"
//           dir="rtl"
//           role="dialog"
//           aria-modal="true"
//         >
//           <button
//             type="button"
//             onClick={() => setLightboxOpen(false)}
//             className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
//             aria-label="بستن"
//           >
//             <X size={21} />
//           </button>

//           <div className="relative h-[80vh] w-full max-w-6xl">
//             <Image
//               src={activeMedia.url}
//               alt={productName}
//               fill
//               sizes="100vw"
//               className="object-contain"
//               unoptimized
//             />
//           </div>

//           {media.length > 1 && (
//             <>
//               <button
//                 type="button"
//                 onClick={previousMedia}
//                 className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
//                 aria-label="تصویر قبلی"
//               >
//                 <ChevronRight size={24} />
//               </button>

//               <button
//                 type="button"
//                 onClick={nextMedia}
//                 className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
//                 aria-label="تصویر بعدی"
//               >
//                 <ChevronLeft size={24} />
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default async function ProductDetail({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const product = await getProduct(slug);

//   if (!product) {
//     return (
//       <PageShell>
//         <div
//           className="container-site py-24 text-center"
//           dir="rtl"
//         >
//           <h1 className="text-2xl font-black">
//             محصول پیدا نشد
//           </h1>

//           <Link
//             href="/products"
//             className="gold-btn mt-6"
//           >
//             بازگشت به محصولات
//           </Link>
//         </div>
//       </PageShell>
//     );
//   }

//   const images = Array.isArray(product.images)
//     ? product.images
//     : [];

//   const videos = Array.isArray(product.videos)
//     ? product.videos
//     : [];

//   return (
//     <PageShell>
//       {/* HERO / PRODUCT MEDIA */}
//       <section
//         className="relative overflow-hidden bg-[#071827] py-10 text-white md:py-14"
//         dir="rtl"
//       >
//         <div className="container-site relative z-10">
//           <Link
//             href="/products"
//             className="mb-5 inline-flex items-center gap-2 text-xs text-white/60 transition hover:text-white"
//           >
//             <ArrowRight size={14} />
//             بازگشت به کاتالوگ
//           </Link>

//           <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
//             {/* Product information */}
//             <div>
//               <div className="text-sm font-bold text-[#ffb51b]">
//                 محصول هیدرولیک صوفی
//               </div>

//               <h1 className="mt-2 text-3xl font-black leading-[1.6] md:text-4xl">
//                 {product.name}
//               </h1>

//               <p className="mt-4 max-w-2xl text-sm leading-8 text-white/65">
//                 {product.short_description}
//               </p>

//               <Link
//                 href="/#consult"
//                 className="gold-btn mt-6"
//               >
//                 درخواست مشاوره
//                 <MessageCircle size={15} />
//               </Link>
//             </div>

//             {/* Product Gallery */}
//             <ProductMediaGallery
//               images={images}
//               videos={videos}
//               productName={product.name}
//             />
//           </div>
//         </div>
//       </section>

//       {/* PRODUCT DETAILS */}
//       <section
//         className="bg-[#f6f8fa] py-10 md:py-14"
//         dir="rtl"
//       >
//         <div className="container-site grid gap-7 lg:grid-cols-[1fr_330px]">
//           <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(10,30,50,.05)] md:p-8">
//             <div className="text-sm font-black text-[#e39b00]">
//               معرفی محصول
//             </div>

//             <h2 className="mt-2 text-2xl font-black text-[#10243a]">
//               توضیحات فنی
//             </h2>

//             <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-600">
//               {product.full_description}
//             </p>
//           </article>

//           <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(10,30,50,.05)]">
//             <div className="text-sm font-black text-[#10243a]">
//               مشخصات محصول
//             </div>

//             <div className="mt-4 divide-y divide-slate-100">
//               {(product.product_specs ?? []).map((spec) => (
//                 <div
//                   key={
//                     spec.id ??
//                     `${spec.specification_name}-${spec.specification_value}`
//                   }
//                   className="flex items-start justify-between gap-4 py-3 text-xs"
//                 >
//                   <span className="font-bold text-slate-500">
//                     {spec.specification_name}
//                   </span>

//                   <span className="text-left font-black text-[#10243a]">
//                     {spec.specification_value}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-5 rounded-2xl bg-[#071827] p-4 text-white">
//               <div className="flex items-center gap-2 text-xs font-bold">
//                 <CheckCircle2
//                   size={16}
//                   className="text-[#ffb51b]"
//                 />
//                 مناسب برای پروژه‌های صنعتی
//               </div>

//               <Link
//                 href="/#consult"
//                 className="mt-4 block rounded-xl bg-[#ffb51b] px-4 py-3 text-center text-xs font-black text-[#071827]"
//               >
//                 استعلام و مشاوره
//               </Link>
//             </div>
//           </aside>
//         </div>
//       </section>
//     </PageShell>
//   );
// }
// beast
// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
// import PageShell from '../../../components/shared/PageShell';
// import { apiUrl } from '../../../lib/api';

// async function getProduct(slug: string) {
//   const response = await fetch(apiUrl(`/products/api/products/${slug}/`), { next: { revalidate: 300 } });
//   if (!response.ok) return null;
//   return response.json();
// }

// export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const product = await getProduct(slug);

//   if (!product) {
//     return <PageShell><div className="container-site py-24 text-center" dir="rtl"><h1 className="text-2xl font-black">محصول پیدا نشد</h1><Link href="/products" className="gold-btn mt-6">بازگشت به محصولات</Link></div></PageShell>;
//   }

//   const images = Array.isArray(product.images) ? product.images : [];
//   const mainImage = images[0]?.url || product.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80';

//   return (
//     <PageShell>
//       <section className="relative overflow-hidden bg-[#071827] py-10 text-white md:py-14" dir="rtl">
//         <div className="container-site relative z-10">
//           <Link href="/products" className="mb-5 inline-flex items-center gap-2 text-xs text-white/60 hover:text-white"><ArrowRight size={14} /> بازگشت به کاتالوگ</Link>
//           <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
//             <div>
//               <div className="text-sm font-bold text-[#ffb51b]">محصول هیدرولیک صوفی</div>
//               <h1 className="mt-2 text-3xl font-black leading-[1.6] md:text-4xl">{product.name}</h1>
//               <p className="mt-4 max-w-2xl text-sm leading-8 text-white/65">{product.short_description}</p>
//               <Link href="/#consult" className="gold-btn mt-6">درخواست مشاوره <MessageCircle size={15} /></Link>
//             </div>
//             <div className="relative h-[280px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl md:h-[360px]">
//               <Image src={mainImage} alt={product.name} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" unoptimized />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/40 to-transparent" />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="bg-[#f6f8fa] py-10 md:py-14" dir="rtl">
//         <div className="container-site grid gap-7 lg:grid-cols-[1fr_330px]">
//           <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(10,30,50,.05)] md:p-8">
//             <div className="text-sm font-black text-[#e39b00]">معرفی محصول</div>
//             <h2 className="mt-2 text-2xl font-black text-[#10243a]">توضیحات فنی</h2>
//             <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-600">{product.full_description}</p>
//           </article>

//           <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(10,30,50,.05)]">
//             <div className="text-sm font-black text-[#10243a]">مشخصات محصول</div>
//             <div className="mt-4 divide-y divide-slate-100">
//               {(product.product_specs ?? []).map((spec: any) => (
//                 <div key={spec.id ?? `${spec.specification_name}-${spec.specification_value}`} className="flex items-start justify-between gap-4 py-3 text-xs">
//                   <span className="font-bold text-slate-500">{spec.specification_name}</span>
//                   <span className="text-left font-black text-[#10243a]">{spec.specification_value}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-5 rounded-2xl bg-[#071827] p-4 text-white">
//               <div className="flex items-center gap-2 text-xs font-bold"><CheckCircle2 size={16} className="text-[#ffb51b]" /> مناسب برای پروژه‌های صنعتی</div>
//               <Link href="/#consult" className="mt-4 block rounded-xl bg-[#ffb51b] px-4 py-3 text-center text-xs font-black text-[#071827]">استعلام و مشاوره</Link>
//             </div>
//           </aside>
//         </div>
//       </section>
//     </PageShell>
//   );
// }
