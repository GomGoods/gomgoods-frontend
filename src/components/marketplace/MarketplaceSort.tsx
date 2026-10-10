"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export type SortOption = "relevant" | "newest" | "price_asc" | "price_desc";

interface MarketplaceSortProps {
  currentSort?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  totalCount?: number;
  fromCount?: number;
  toCount?: number;
  dict?: Dictionary;
}

export function MarketplaceSort({
  currentSort = "relevant",
  onSortChange,
  totalCount = 1500000,
  fromCount = 1,
  toCount = 24,
  dict,
}: MarketplaceSortProps) {
  const t = dict?.marketplace;

  const sortOptions = [
    { key: "relevant" as const, label: t?.sort_relevant || "Liên quan" },
    { key: "newest" as const, label: t?.sort_newest || "Mới nhất" },
    {
      key: "price_asc" as const,
      label: t?.sort_price_asc || "Giá",
      icon: <ArrowUp size={13} className="ml-1" />,
    },
    {
      key: "price_desc" as const,
      label: t?.sort_price_desc || "Giá",
      icon: <ArrowDown size={13} className="ml-1" />,
    },
  ];

  const formatCount = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toLocaleString();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-surface p-2.5 sm:p-3 rounded-xl border border-outline-variant/60 shadow-sm mb-4 sm:mb-6 gap-3 sm:gap-4">
      {/* Sort Buttons Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide">
        <span className="text-label-compact text-xs sm:text-sm text-on-surface-variant whitespace-nowrap font-medium pr-1">
          {t?.sort_by || "Sắp xếp theo:"}
        </span>

        {sortOptions.map(({ key, label, icon }) => {
          const isActive = currentSort === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSortChange?.(key)}
              className={`px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-label-compact font-bold whitespace-nowrap flex items-center transition-all duration-150 active:scale-95 cursor-pointer ${
                isActive
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-low text-on-surface hover:bg-surface-container hover:text-primary"
              }`}
            >
              <span>{label}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="text-body-sm text-outline font-medium whitespace-nowrap text-xs sm:text-sm self-end sm:self-center">
        {t?.showing_results || "Hiển thị"} {fromCount} - {toCount} / {formatCount(totalCount)} {t?.results || "kết quả"}
      </div>
    </div>
  );
}
