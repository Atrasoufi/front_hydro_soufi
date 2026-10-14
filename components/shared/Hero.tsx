import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';

export default function Hero({
  title,
  eyebrow,
  description,
  image,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  image: string;
}) {
  return (
    <section
      className="relative overflow-hidden bg-[#071827] text-white shadow-hero"
      dir="rtl"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay - stronger behind the text on the right */}
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(3,13,23,.97)_0%,rgba(3,13,23,.82)_32%,rgba(3,13,23,.35)_62%,rgba(3,13,23,.06)_100%)]" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#071827]/65 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-site relative z-10 flex min-h-[300px] items-center py-12 md:min-h-[355px] md:py-16">
        <div className="max-w-[570px]">
          {eyebrow && (
            <div className="mb-3 text-sm font-extrabold text-[#ffb51b]">
              {eyebrow}
            </div>
          )}

          <h1 className="text-[34px] font-black leading-[1.45] tracking-tight md:text-[45px]">
            {title}
          </h1>

          {description && (
            <p className="mt-3 max-w-[520px] text-[14px] leading-8 text-white/85 md:text-[16px]">
              {description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#consult" className="gold-btn">
              مشاوره و استعلام قیمت
              <MessageCircle size={15} />
            </Link>

            <Link href="/products" className="dark-btn">
              مشاهده محصولات
              <ArrowLeft size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
