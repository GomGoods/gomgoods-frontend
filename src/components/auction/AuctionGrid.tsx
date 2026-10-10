"use client";

import { Gavel } from "lucide-react";
import { AuctionCard, type AuctionItem } from "./AuctionCard";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface AuctionGridProps {
  items: AuctionItem[];
  dict: Dictionary;
  lang?: string;
  onSelect?: (item: AuctionItem) => void;
}

export function AuctionGrid({
  items,
  dict,
  lang = "vi",
  onSelect,
}: AuctionGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-surface-container-low rounded-2xl border border-outline-variant/60 my-6">
        <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant mb-4">
          <Gavel className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="font-semibold text-lg text-on-background mb-1">
          {dict.auction?.no_auctions || "Không tìm thấy phiên đấu giá nào"}
        </h3>
        <p className="text-sm text-on-surface-variant max-w-sm">
          {dict.auction?.no_auctions_desc ||
            "Hãy thử chọn danh mục khác hoặc quay lại sau nhé."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-3.5">
      {items.map((item) => (
        <AuctionCard
          key={item.id}
          item={item}
          dict={dict}
          lang={lang}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
