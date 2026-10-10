"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, ChevronRight, ShieldCheck, Star } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface SellerHeaderBarProps {
  seller: {
    name: string;
    avatar: string;
    isOnline: boolean;
    isGoldSeller: boolean;
    memberSince: string;
    location: string;
    onlineStatus: string;
    rating: number;
    soldCount: number;
    activeCount: number;
  };
  dict?: Dictionary;
  lang?: string;
}

export function SellerHeaderBar({
  seller,
  dict,
  lang = "vi",
}: SellerHeaderBarProps) {
  const sellerSlug = encodeURIComponent(
    seller.name.toLowerCase().replace(/\s+/g, "-")
  );

  return (
    <div className="bg-surface rounded-2xl p-3.5 sm:p-4 border border-outline-variant/40 shadow-xs flex items-center justify-between gap-3">
      {/* Left: Avatar + Details */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href={`/${lang}/seller/${sellerSlug}`}
          className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 flex-shrink-0 bg-surface hover:scale-105 transition-transform cursor-pointer"
        >
          <Image
            src={seller.avatar}
            alt={seller.name}
            fill
            unoptimized
            className="w-full h-full object-cover rounded-full"
          />
          {seller.isOnline && (
            <span
              title="Đang online"
              className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-surface"
            />
          )}
        </Link>

        <div className="flex flex-col min-w-0 gap-0.5">
          {/* Row 1: Seller Name (Clickable) + Credibility Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/${lang}/seller/${sellerSlug}`}
              className="font-extrabold text-on-background text-sm sm:text-base truncate hover:text-primary transition-colors cursor-pointer"
            >
              {seller.name}
            </Link>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/40">
              <ShieldCheck className="w-3 h-3" />
              <span>Uy tín cực tốt</span>
            </span>
          </div>

          {/* Row 2: Horizontal Meta Specs */}
          <div className="flex items-center gap-2 text-xs text-on-surface-variant flex-wrap">
            <span>{seller.location}</span>
            <span className="text-outline-variant">•</span>
            <span>{seller.onlineStatus}</span>
            <span className="text-outline-variant">•</span>
            <span>GomGoods {seller.memberSince ? `${new Date().getFullYear() - parseInt(seller.memberSince) || 3} năm` : "3 năm"}</span>
            <span className="text-outline-variant">•</span>
            <span>Đã bán {seller.soldCount} sp</span>
            <span className="text-outline-variant">•</span>
            <span className="flex items-center text-amber-500 font-semibold gap-0.5">
              <Star className="w-3 h-3 fill-current" />
              {seller.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
