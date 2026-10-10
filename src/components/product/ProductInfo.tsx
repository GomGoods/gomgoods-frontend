"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Eye, Heart, CheckCircle2 } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProductInfoProps {
  title: string;
  originalPrice?: string;
  price: string;
  viewsCount: string;
  initialWantsCount: number;
  categoryName: string;
  categorySlug: string;
  specs: {
    condition: string;
    quantity: string;
    postedAt: string;
    brand: string;
  };
  dict: Dictionary;
  lang?: string;
  hideBreadcrumbs?: boolean;
}

export function ProductInfo({
  title,
  originalPrice,
  price,
  viewsCount,
  initialWantsCount,
  categoryName,
  categorySlug,
  specs,
  dict,
  lang = "vi",
  hideBreadcrumbs = false,
}: ProductInfoProps) {
  const [wantsCount, setWantsCount] = useState(initialWantsCount);
  const [isWanted, setIsWanted] = useState(false);

  const handleToggleWant = () => {
    if (isWanted) {
      setWantsCount((prev) => prev - 1);
      setIsWanted(false);
    } else {
      setWantsCount((prev) => prev + 1);
      setIsWanted(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumbs */}
      {!hideBreadcrumbs && (
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant font-medium">
          <Link
            href={`/${lang}`}
            className="hover:text-primary transition-colors"
          >
            {dict.product_detail?.home || "Trang chủ"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/60" />
          <Link
            href={`/${lang}/marketplace`}
            className="hover:text-primary transition-colors"
          >
            {categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/60" />
          <span className="text-on-background font-semibold truncate max-w-[200px] sm:max-w-md">
            {title}
          </span>
        </nav>
      )}

      {/* Main Header Details Card */}
      <div className="bg-surface rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col gap-4 border border-outline-variant/40">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-on-background leading-snug tracking-tight">
          {title}
        </h1>

        {/* Price & Want/Views Row */}
        <div className="flex flex-wrap items-end justify-between border-b border-outline-variant/30 pb-4 gap-3">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-xs sm:text-sm text-on-surface-variant line-through mb-0.5">
                {originalPrice}
              </span>
            )}
            <span className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
              {price}
            </span>
            <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 ml-1">
              | Bao ship
            </span>
          </div>

          <div className="flex items-center gap-3 text-on-surface-variant text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-on-surface-variant" />
              <span>
                {viewsCount} {dict.product_detail?.views || "lượt xem"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleWant}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-2 rounded-lg ${
                isWanted
                  ? "bg-primary/10 text-primary font-bold"
                  : "hover:text-primary"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isWanted ? "fill-primary text-primary" : "text-primary"
                }`}
              />
              <span>
                {wantsCount} {dict.product_detail?.want || "muốn mua"}
              </span>
            </button>
          </div>
        </div>

        {/* 4 Specs Chips (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="flex flex-col gap-0.5 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <span className="text-on-surface-variant text-xs">
              {dict.product_detail?.condition || "Tình trạng"}
            </span>
            <span className="text-on-background text-xs sm:text-sm font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-tertiary flex-shrink-0" />
              <span className="truncate">{specs.condition}</span>
            </span>
          </div>

          <div className="flex flex-col gap-0.5 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <span className="text-on-surface-variant text-xs">
              {dict.product_detail?.quantity || "Số lượng"}
            </span>
            <span className="text-on-background text-xs sm:text-sm font-bold truncate">
              {specs.quantity}
            </span>
          </div>

          <div className="flex flex-col gap-0.5 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <span className="text-on-surface-variant text-xs">
              {dict.product_detail?.posted_at || "Đăng lúc"}
            </span>
            <span className="text-on-background text-xs sm:text-sm font-bold truncate">
              {specs.postedAt}
            </span>
          </div>

          <div className="flex flex-col gap-0.5 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <span className="text-on-surface-variant text-xs">
              {dict.product_detail?.brand || "Thương hiệu"}
            </span>
            <span className="text-on-background text-xs sm:text-sm font-bold truncate">
              {specs.brand}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
