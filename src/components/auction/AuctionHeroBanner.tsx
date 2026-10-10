"use client";

import { Gavel } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface AuctionHeroBannerProps {
  dict: Dictionary;
}

export function AuctionHeroBanner({ dict }: AuctionHeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high border-2 border-outline-variant/60 shadow-lg mb-8 p-5 sm:p-7 md:p-8">
      {/* Decorative background blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-container/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Playful Title & Copy */}
        <div className="lg:col-span-7 flex flex-col items-start gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-on-background leading-tight">
            Săn Bảo Vật Hiếm, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 dark:from-sky-400 dark:via-blue-300 dark:to-brand-yellow bg-clip-text text-transparent">
              Đấu Giá Siêu Hào Hứng!
            </span>{" "}
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
            {dict.auction?.subtitle ||
              "Khám phá và tham gia các phiên đấu giá vật phẩm hiếm, sưu tầm độc quyền từ cộng đồng fandom."}{" "}
            Ra giá thông minh, rinh ngay bảo vật yêu thích! ✨
          </p>

          {/* Mini highlights */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface/90 border border-outline-variant text-xs font-semibold text-on-surface shadow-xs">
              <Gavel className="w-4 h-4 text-primary" />
              <span>Đấu giá trực tiếp</span>
            </div>
          </div>
        </div>

        {/* Right Column: Auto-playing Looping Video */}
        <div className="lg:col-span-5 w-full">
          <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-xl border-4 border-primary/20 bg-black/90 group aspect-video sm:aspect-[16/10] flex items-center justify-center">
            <video
              src="/Auction_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Video overlay badge */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>GomGoods Live</span>
            </div>

            {/* Subtle bottom gradient for readability */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
