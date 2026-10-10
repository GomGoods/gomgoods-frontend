"use client";

import { SlidersHorizontal } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface MarketplaceToolbarProps {
  onOpenMobileFilters: () => void;
  activeFilterCount?: number;
  dict?: Dictionary;
}

export function MarketplaceToolbar({
  onOpenMobileFilters,
  activeFilterCount = 0,
  dict,
}: MarketplaceToolbarProps) {
  const t = dict?.marketplace;

  return (
    <div className="md:hidden flex items-center justify-between bg-surface p-2.5 rounded-xl border border-outline-variant/60 shadow-xs mb-3">
      <button
        type="button"
        onClick={onOpenMobileFilters}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface font-semibold text-xs hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
      >
        <SlidersHorizontal size={14} className="text-primary" />
        <span>{t?.filters || "Bộ lọc"}</span>
        {activeFilterCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>

      <span className="text-xs text-outline font-medium">
        GomGoods Marketplace
      </span>
    </div>
  );
}
