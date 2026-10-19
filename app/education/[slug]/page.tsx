import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Image as ImageIcon,
  MessageCircle,
  PlayCircle,
} from "lucide-react";

import PageShell from "../../../components/shared/PageShell";
import Hero from "../../../components/shared/Hero";
import { apiUrl } from "../../../lib/api";
import { siteUrl } from "../../../lib/seo";

type EducationImage = {
  id: number;
  url: string;
  alt_text?: string;
  is_primary?: boolean;
  caption?: string;
};

type EducationVideo = {
  id: number;
  url: string;
  source?: string;
  is_primary?: boolean;
  caption?: string;
};

type EducationDetailData = {
  title: string;
  slug: string;
  excerpt?: string;
  content_type?: string;
  featured_media?: string;
  images?: EducationImage[];
  videos?: EducationVideo[];
  content?: string;
};

const fallbackImage = "/images/hero-education.svg";

function getVideoType(source?: string) {
  return String(source || "")
    .toLowerCase()
    .trim();
}

function getAparatEmbedUrl(url: string) {
  if (!url) return "";

  // اگر بک‌اند مستقیماً embed URL داده باشد
  if (url.includes("/embed/")) {
    return url;
  }

  /*
   * اگر URL به شکل:
   * https://www.aparat.com/v/VIDEO_ID
   * یا:
   * https://www.aparat.com/video/VIDEO_ID
   * باشد، آن را به embed تبدیل می‌کنیم.
   */
  const match = url.match(/aparat\.com\/(?:v|video)\/([^/?#]+)/i);

  if (match?.[1]) {
    return `https://www.aparat.com/embed/${match[1]}`;
  }

  return url;
}

function renderVideo(video: EducationVideo, title: string) {
  const source = getVideoType(video.source);

  if (source === "aparat") {
    const embedUrl = getAparatEmbedUrl(video.url);

    return (
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#071827] sm:rounded-2xl">
        <iframe
          src={embedUrl}
          title={video.caption || title}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-[#071827] sm:rounded-2xl">
      <video
        key={video.id}
        src={video.url}
        controls
        playsInline
        preload="metadata"
        className="h-full w-full object-contain"
      >
        مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
      </video>
    </div>
  );
}

export default async function EducationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await fetch(apiUrl(`/education/api/education/${slug}/`), {
    next: {
      revalidate: 300,
    },
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return (
      <PageShell>
        <section className="bg-[#f7f9fc] px-4 py-10 sm:px-6 md:py-14" dir="rtl">
          <div className="container-site">
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-8">
              <BookOpen className="mx-auto mb-4 text-slate-300" size={42} />

              <h1 className="text-xl font-black text-[#071827]">
                آموزش مورد نظر پیدا نشد
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
                ممکن است این آموزش حذف شده باشد یا آدرس آن تغییر کرده باشد.
              </p>

              <Link
                href="/education"
                className="gold-btn mx-auto mt-7 inline-flex"
              >
                بازگشت به آموزش‌ها
              </Link>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  const data = await response.json();

  const education: EducationDetailData = data?.results?.[0] || data;

  const images = Array.isArray(education.images) ? education.images : [];

  const videos = Array.isArray(education.videos) ? education.videos : [];

  const primaryImage =
    education.featured_media ||
    images.find((item) => item.is_primary)?.url ||
    images[0]?.url ||
    fallbackImage;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: education.title,
    description: education.excerpt || "آموزش و مقاله تخصصی هیدرولیک صنعتی.",
    image: primaryImage.startsWith("http")
      ? primaryImage
      : `${siteUrl}${primaryImage}`,
    mainEntityOfPage: `${siteUrl}/education/${education.slug || slug}`,
    inLanguage: "fa-IR",
    author: {
      "@type": "Organization",
      name: "هیدرولیک صوفی",
    },
    publisher: {
      "@type": "Organization",
      name: "هیدرولیک صوفی",
    },
  };

  return (
    <PageShell>
      {/* Hero */}
      <Hero
        title={education.title}
        description={education.excerpt || ""}
        image={primaryImage}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Main Content */}
      <main
        className="bg-[#f7f9fc] px-4 py-8 sm:px-6 md:py-10 lg:py-12"
        dir="rtl"
      >
        <div className="container-site">
          <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
            {/* Main Content */}
            <article className="min-w-0">
              {/* Article Card */}
              <div className="overflow-hidden rounded-2xl border border-[#e2e9f0] bg-white shadow-[0_10px_35px_rgba(10,30,50,.05)]">
                {/* Article Header */}
                <div className="border-b border-slate-100 px-5 py-7 sm:px-6 md:px-9 md:py-9">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff7df] px-3 py-1.5 text-[11px] font-bold text-[#a66b00]">
                      <BookOpen size={14} />
                      آموزش تخصصی
                    </span>

                    {education.content_type && (
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                        {education.content_type}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-black leading-[1.8] text-[#071827] md:text-3xl">
                    {education.title}
                  </h2>

                  {education.excerpt && (
                    <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-500 md:text-[15px]">
                      {education.excerpt}
                    </p>
                  )}
                </div>

                {/* Article Content */}
                {education.content && (
                  <div className="px-5 py-8 sm:px-6 md:px-9 md:py-11">
                    <div
                      className="
                        education-content
                        text-[14px]
                        leading-[2.25]
                        text-[#33475b]
                        md:text-[15px]

                        [&_h1]:mb-5
                        [&_h1]:mt-8
                        [&_h1]:text-2xl
                        [&_h1]:font-black
                        [&_h1]:leading-[1.8]
                        [&_h1]:text-[#071827]

                        [&_h2]:mb-4
                        [&_h2]:mt-9
                        [&_h2]:text-xl
                        [&_h2]:font-black
                        [&_h2]:leading-[1.8]
                        [&_h2]:text-[#071827]

                        [&_h3]:mb-3
                        [&_h3]:mt-7
                        [&_h3]:text-lg
                        [&_h3]:font-black
                        [&_h3]:text-[#071827]

                        [&_p]:mb-5

                        [&_ul]:mb-6
                        [&_ul]:list-disc
                        [&_ul]:pr-6

                        [&_ol]:mb-6
                        [&_ol]:list-decimal
                        [&_ol]:pr-6

                        [&_li]:mb-2

                        [&_strong]:font-black
                        [&_strong]:text-[#071827]

                        [&_a]:font-bold
                        [&_a]:text-[#c48600]
                        [&_a]:underline
                        [&_a]:underline-offset-4

                        [&_blockquote]:my-7
                        [&_blockquote]:border-r-4
                        [&_blockquote]:border-[#ffb51b]
                        [&_blockquote]:bg-[#fffaf0]
                        [&_blockquote]:px-5
                        [&_blockquote]:py-4
                        [&_blockquote]:text-[#5b4a27]

                        [&_img]:my-7
                        [&_img]:max-h-[520px]
                        [&_img]:w-full
                        [&_img]:rounded-2xl
                        [&_img]:object-cover

                        [&_table]:my-7
                        [&_table]:w-full
                        [&_table]:overflow-hidden
                        [&_table]:rounded-xl
                        [&_table]:border
                        [&_table]:border-slate-200

                        [&_th]:bg-[#071827]
                        [&_th]:px-4
                        [&_th]:py-3
                        [&_th]:text-right
                        [&_th]:font-bold
                        [&_th]:text-white

                        [&_td]:border-t
                        [&_td]:border-slate-200
                        [&_td]:px-4
                        [&_td]:py-3
                      "
                      dangerouslySetInnerHTML={{
                        __html: education.content,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Videos */}
              {videos.length > 0 && (
                <section className="mt-10 md:mt-12">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071827] text-[#ffb51b]">
                      <PlayCircle size={19} />
                    </div>

                    <div>
                      <h2 className="text-lg font-black text-[#071827]">
                        ویدیوهای آموزشی
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        محتوای ویدیویی مرتبط با این آموزش
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {videos.map((video) => (
                      <div
                        key={video.id}
                        className="overflow-hidden rounded-2xl border border-[#e2e9f0] bg-white p-3 shadow-[0_10px_35px_rgba(10,30,50,.05)]"
                      >
                        {renderVideo(video, education.title)}

                        {video.caption && (
                          <p className="px-2 pb-1 pt-4 text-sm font-semibold leading-7 text-slate-600">
                            {video.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Image Gallery */}
              {images.length > 0 && (
                <section className="mt-10 md:mt-12">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071827] text-[#ffb51b]">
                      <ImageIcon size={18} />
                    </div>

                    <div>
                      <h2 className="text-lg font-black text-[#071827]">
                        تصاویر آموزش
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        تصاویر و محتوای تصویری مرتبط
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="group overflow-hidden rounded-2xl border border-[#e2e9f0] bg-white shadow-sm"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                          <Image
                            src={image.url}
                            alt={
                              image.alt_text || image.caption || education.title
                            }
                            fill
                            sizes="(max-width: 479px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>

                        {image.caption && (
                          <div className="px-3 py-3 text-xs leading-6 text-slate-500">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar */}
            <aside className="h-fit lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-[#dfe7ef] bg-white shadow-[0_10px_35px_rgba(10,30,50,.05)]">
                {/* Sidebar Header */}
                <div className="bg-[#071827] px-5 py-5 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffb51b] text-[#071827]">
                      <BookOpen size={18} />
                    </div>

                    <div>
                      <div className="text-sm font-black">درباره این آموزش</div>

                      <div className="mt-1 text-[11px] text-white/55">
                        محتوای تخصصی هیدرولیک
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Content */}
                <div className="p-5">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#d79a00]"
                      />

                      <div>
                        <div className="text-xs font-bold text-[#071827]">
                          محتوای تخصصی
                        </div>

                        <div className="mt-1 text-[11px] leading-6 text-slate-400">
                          آموزش متناسب با حوزه تجهیزات هیدرولیک
                        </div>
                      </div>
                    </div>

                    {videos.length > 0 && (
                      <div className="flex items-start gap-3">
                        <PlayCircle
                          size={17}
                          className="mt-0.5 shrink-0 text-[#d79a00]"
                        />

                        <div>
                          <div className="text-xs font-bold text-[#071827]">
                            محتوای ویدیویی
                          </div>

                          <div className="mt-1 text-[11px] leading-6 text-slate-400">
                            {videos.length} ویدیوی مرتبط با این آموزش
                          </div>
                        </div>
                      </div>
                    )}

                    {images.length > 0 && (
                      <div className="flex items-start gap-3">
                        <ImageIcon
                          size={17}
                          className="mt-0.5 shrink-0 text-[#d79a00]"
                        />

                        <div>
                          <div className="text-xs font-bold text-[#071827]">
                            گالری تصاویر
                          </div>

                          <div className="mt-1 text-[11px] leading-6 text-slate-400">
                            {images.length} تصویر مرتبط با آموزش
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="my-6 h-px bg-slate-100" />

                  {/* CTA */}
                  <div className="rounded-xl bg-[#f7f9fc] p-4">
                    <div className="text-sm font-black leading-6 text-[#071827]">
                      برای انتخاب تجهیزات نیاز به راهنمایی دارید؟
                    </div>

                    <p className="mt-2 text-[11px] leading-6 text-slate-500">
                      کارشناسان هیدرولیک صوفی آماده پاسخگویی و مشاوره فنی هستند.
                    </p>

                    <Link href="/consultation" className="gold-btn mt-4 w-full">
                      <MessageCircle size={15} />
                      درخواست مشاوره
                    </Link>
                  </div>
                </div>
              </div>

              {/* Back */}
              <Link
                href="/education"
                className="mt-5 flex h-12 items-center justify-center gap-2 rounded-xl border border-[#dce5ed] bg-white text-xs font-bold text-[#071827] transition hover:border-[#ffb51b] hover:bg-[#fffaf0]"
              >
                بازگشت به آموزش‌ها
              </Link>
            </aside>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
