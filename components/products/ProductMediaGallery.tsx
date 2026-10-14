"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Play, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ProductImage = {
  id?: number | string;
  url?: string;
  image?: string;
  is_primary?: boolean;
};

type ProductVideo = {
  id?: number | string;
  url?: string;
  video_url?: string;
  file?: string;
  thumbnail?: string;
  cover_image?: string;
};

type MediaItem =
  | {
      type: "image";
      id: string;
      url: string;
      isPrimary: boolean;
    }
  | {
      type: "video";
      id: string;
      url: string;
      thumbnail?: string;
    };

export default function ProductMediaGallery({
  images,
  videos,
  productName,
}: {
  images: ProductImage[];
  videos: ProductVideo[];
  productName: string;
}) {
  const media = useMemo<MediaItem[]>(() => {
    const imageItems: MediaItem[] = images
      .filter((item) => item.url || item.image)
      .map((item, index) => ({
        type: "image",
        id: `image-${item.id ?? index}`,
        url: item.url || item.image || "",
        isPrimary: item.is_primary === true,
      }));

    const videoItems: MediaItem[] = videos
      .filter((item) => item.url || item.video_url || item.file)
      .map((item, index) => ({
        type: "video",
        id: `video-${item.id ?? index}`,
        url: item.url || item.video_url || item.file || "",
        thumbnail: item.thumbnail || item.cover_image,
      }));

    return [...imageItems, ...videoItems];
  }, [images, videos]);

  const primaryIndex = useMemo(() => {
    const index = media.findIndex(
      (item) => item.type === "image" && item.isPrimary,
    );

    return index >= 0 ? index : 0;
  }, [media]);

  const [activeIndex, setActiveIndex] = useState(primaryIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveIndex(primaryIndex);
  }, [primaryIndex]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxOpen(false);
        return;
      }

      if (media.length <= 1) return;

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current >= media.length - 1 ? 0 : current + 1,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current <= 0 ? media.length - 1 : current - 1,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, media.length]);

  if (!media.length) {
    return (
      <div className="relative h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:h-[360px]">
        <Image
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80"
          alt={productName}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }

  const activeMedia = media[activeIndex];

  function nextMedia() {
    setActiveIndex((current) =>
      current >= media.length - 1 ? 0 : current + 1,
    );
  }

  function previousMedia() {
    setActiveIndex((current) =>
      current <= 0 ? media.length - 1 : current - 1,
    );
  }

  return (
    <>
      <div className="space-y-3">
        {/* MAIN MEDIA */}
        <div className="group relative h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-[#020b14] shadow-2xl md:h-[360px]">
          {activeMedia.type === "image" ? (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute inset-0 z-10 h-full w-full cursor-zoom-in"
            >
              <Image
                src={activeMedia.url}
                alt={productName}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                unoptimized
              />
            </button>
          ) : (
            <video
              key={activeMedia.id}
              src={activeMedia.url}
              controls
              playsInline
              className="h-full w-full object-contain"
            />
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/45 to-transparent" />

          {media.length > 1 && (
            <div className="absolute bottom-4 right-4 z-30 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-sm">
              {activeIndex + 1} / {media.length}
            </div>
          )}

          {activeMedia.type === "image" && (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute left-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65"
            >
              <Maximize2 size={15} />
            </button>
          )}

          {media.length > 1 && (
            <button
              type="button"
              onClick={previousMedia}
              className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/70"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {media.length > 1 && (
            <button
              type="button"
              onClick={nextMedia}
              className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/70"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {/* THUMBNAILS */}
        {media.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {media.map((item, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-[68px] w-[82px] shrink-0 overflow-hidden rounded-xl border-2 bg-[#071827] transition ${
                    active
                      ? "border-[#ffb51b]"
                      : "border-white/10 opacity-70 hover:border-white/30 hover:opacity-100"
                  }`}
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.url}
                      alt={`${productName} - ${index + 1}`}
                      fill
                      sizes="82px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt="ویدیو"
                      fill
                      sizes="82px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#10243a]">
                      <Play size={20} className="text-[#ffb51b]" />
                    </div>
                  )}

                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#071827]">
                        <Play size={13} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && activeMedia.type === "image" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02070d]/95 p-4"
          dir="rtl"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <X size={21} />
          </button>

          {/* Image area */}
          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeMedia.url}
              alt={productName}
              fill
              sizes="100vw"
              className="object-contain"
              unoptimized
            />
          </div>

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  previousMedia();
                }}
                className="absolute right-5 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <ChevronRight size={24} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  nextMedia();
                }}
                className="absolute left-5 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <ChevronLeft size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
