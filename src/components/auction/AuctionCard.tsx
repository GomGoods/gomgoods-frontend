"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gavel, Clock, Heart } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export interface AuctionItem {
  id: string;
  title: string;
  imageUrl: string;
  currentPrice: string;
  startingPrice?: string;
  bidCount: number;
  timeLeft: string;
  isUrgent?: boolean;
  status: "live" | "upcoming" | "ended";
  badge?: "hot" | "rare";
  category: string;
}

interface AuctionCardProps {
  item: AuctionItem;
  dict: Dictionary;
  lang?: string;
  onSelect?: (item: AuctionItem) => void;
}

export function AuctionCard({
  item,
  dict,
  lang = "vi",
  onSelect,
}: AuctionCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(item);
    }
  };

  const getBadgeLabel = () => {
    if (item.badge === "hot") return dict.auction?.status_hot || "Hot";
    if (item.badge === "rare") return dict.auction?.status_rare || "Rare";
    return null;
  };

  const badgeText = getBadgeLabel();

  return (
    <Link
      href={`/${lang}/auction/${item.id}`}
      onClick={handleClick}
      className="group bg-surface rounded-xl overflow-hidden border border-outline-variant shadow-[0px_4px_12px_rgba(35,41,101,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative w-full aspect-square bg-surface-container-low overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {badgeText && (
            <span
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold shadow-sm tracking-wide uppercase ${item.badge === "hot"
                  ? "bg-primary text-on-primary"
                  : "bg-tertiary text-white"
                }`}
            >
              {badgeText}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label="Favorite"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isFavorite
                ? "fill-primary text-primary"
                : "text-on-surface-variant hover:text-primary"
              }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1 gap-2.5">
        <h3 className="font-body-sm text-[13px] md:text-sm text-on-background line-clamp-2 min-h-[38px] leading-snug font-medium group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        {/* Metadata row: Bids + Timer */}
        <div className="flex items-center justify-between gap-1.5 mt-auto pt-1">
          <div className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-md text-xs font-medium flex items-center gap-1">
            <Gavel className="w-3.5 h-3.5 text-on-surface-variant" />
            <span>
              {item.bidCount} {dict.auction?.bids || "lượt"}
            </span>
          </div>

          <div
            className={`px-2 py-0.5 rounded-md text-xs font-semibold flex items-center gap-1 ${item.isUrgent
                ? "bg-error/15 text-error animate-pulse"
                : "bg-secondary-container/30 text-on-secondary-container"
              }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{item.timeLeft}</span>
          </div>
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between pt-1 border-t border-outline-variant/60">
          {item.startingPrice ? (
            <div>
              <span className="block text-[10px] text-on-surface-variant font-medium">
                {dict.auction?.starting_price || "Khởi điểm"}
              </span>
              <span className="text-xs text-on-surface-variant font-semibold">
                {item.startingPrice}
              </span>
            </div>
          ) : (
            <div />
          )}

          <div className="text-right">
            <span className="block text-[10px] text-on-surface-variant font-medium">
              {dict.auction?.current_price || "Giá hiện tại"}
            </span>
            <span className="text-base md:text-lg font-bold text-primary tracking-tight">
              {item.currentPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
