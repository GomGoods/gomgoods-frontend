"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { UserQuickCard } from "./UserQuickCard";

const categories = [
  {
    name: "Anime/Manga",
    image: "/category_icons/01_anime_manga.png",
  },
  {
    name: "Game",
    image: "/category_icons/02_game.png",
  },
  {
    name: "Idol",
    image: "/category_icons/03_idol.png",
  },
  {
    name: "Figure",
    image: "/category_icons/04_figure.png",
  },
  {
    name: "Đồ cosplay",
    image: "/category_icons/05_do_cosplay.png",
  },
  {
    name: "Badge",
    image: "/category_icons/06_badge.png",
  },
  {
    name: "Plush",
    image: "/category_icons/07_plush.png",
  },
  {
    name: "Card",
    image: "/category_icons/08_card.png",
  },
];

export function CategoryNav() {
  const params = useParams();
  const lang = (params?.lang as string) || "vi";

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
      {/* 1. Left: Khám phá danh mục (lg:col-span-8) */}
      <section className="lg:col-span-8 flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-4 shadow-xs sm:p-5">
        {/* Header với subtitle và nút xem tất cả */}
        <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-brand-coral" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-tight">
                Khám phá danh mục
              </h2>
              <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                Vật phẩm sưu tầm chính hãng từ cộng đồng fandom
              </p>
            </div>
          </div>
          <Link
            href={`/${lang}/marketplace`}
            className="text-xs font-semibold text-primary hover:text-brand-blue-hover flex items-center gap-1 transition-colors group/all shrink-0"
          >
            <span>Tất cả</span>
            <ArrowRight size={13} className="stroke-[2.5] group-hover/all:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 8 icon danh mục nổi bật không viền nền, ảnh to rõ, hover nảy lên */}
        <div className="grid flex-1 grid-cols-4 items-center gap-x-2 gap-y-2 py-3 sm:gap-x-4 sm:gap-y-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/${lang}/marketplace?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center justify-center rounded-xl p-1 transition-transform duration-200 ease-out hover:-translate-y-1"
            >
              {/* Ảnh icon to nổi bật không khung nền, hiển thị sắc nét HD */}
              <div className="relative flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={120}
                  height={120}
                  unoptimized
                  className="h-16 w-16 object-contain drop-shadow-sm transition-transform duration-200 ease-out group-hover:scale-105 sm:h-[72px] sm:w-[72px]"
                />
              </div>

              {/* Tên danh mục bên dưới */}
              <span className="mt-1.5 line-clamp-1 text-center text-xs font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-sm">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Right: Thông tin người dùng & Đăng nhập nhanh (lg:col-span-4) */}
      <div className="lg:col-span-4">
        <UserQuickCard />
      </div>
    </div>
  );
}
