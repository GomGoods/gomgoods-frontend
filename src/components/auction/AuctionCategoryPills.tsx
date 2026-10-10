"use client";

import type { Dictionary } from "@/app/[lang]/dictionaries";

export interface CategoryOption {
  id: string;
  label: string;
}

interface AuctionCategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  dict: Dictionary;
}

export function AuctionCategoryPills({
  selectedCategory,
  onSelectCategory,
  dict,
}: AuctionCategoryPillsProps) {
  const categories: CategoryOption[] = [
    { id: "all", label: dict.auction?.all_categories || "Tất cả" },
    { id: "anime", label: dict.auction?.category_anime || "Mô hình Anime" },
    { id: "tcg", label: dict.auction?.category_tcg || "Thẻ bài TCG" },
    { id: "kpop", label: dict.auction?.category_kpop || "K-Pop Merch" },
    { id: "manga", label: dict.auction?.category_manga || "Truyện tranh cũ" },
    { id: "antique", label: dict.auction?.category_antique || "Đồ cổ" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2 my-2">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
              isSelected
                ? "bg-primary text-on-primary shadow-sm ring-2 ring-primary/20"
                : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant border border-outline-variant hover:text-on-surface"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
