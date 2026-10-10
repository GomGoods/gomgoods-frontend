"use client";

import { useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export interface FilterState {
  categories: string[];
  condition: string | null;
  minPrice: string;
  maxPrice: string;
  location: string;
}

const defaultCategories = [
  { id: "figure", label: "Mô hình Anime (Figure)", count: "1.2k" },
  { id: "tcg", label: "Thẻ bài (TCG)", count: "842" },
  { id: "cosplay", label: "Phụ kiện & Cosplay", count: "450" },
  { id: "manga", label: "Truyện tranh (Manga)", count: "2.1k" },
];

const conditions = [
  { id: "new", label: "New (Seal)" },
  { id: "like_new", label: "Like New (99%)" },
  { id: "used", label: "Đã sử dụng" },
  { id: "defect", label: "Hàng lỗi (Defect)" },
];

const locations = [
  { id: "all", label: "Toàn quốc" },
  { id: "hn", label: "Hà Nội" },
  { id: "hcm", label: "TP. Hồ Chí Minh" },
  { id: "dn", label: "Đà Nẵng" },
];

interface MarketplaceFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  dict?: Dictionary;
}

export function MarketplaceFilter({
  filters,
  onFilterChange,
  onReset,
  dict,
}: MarketplaceFilterProps) {
  const t = dict?.marketplace;

  const [priceInput, setPriceInput] = useState({
    min: filters.minPrice,
    max: filters.maxPrice,
  });

  const toggleCategory = (catId: string) => {
    const isSelected = filters.categories.includes(catId);
    const newCats = isSelected
      ? filters.categories.filter((c) => c !== catId)
      : [...filters.categories, catId];
    onFilterChange({ ...filters, categories: newCats });
  };

  const selectCondition = (condId: string) => {
    onFilterChange({
      ...filters,
      condition: filters.condition === condId ? null : condId,
    });
  };

  const applyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      ...filters,
      minPrice: priceInput.min,
      maxPrice: priceInput.max,
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.condition !== null ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.location !== "all";

  return (
    <div className="bg-surface rounded-xl border border-outline-variant/60 p-4 shadow-sm flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/50">
        <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2 text-base md:text-lg">
          <SlidersHorizontal size={18} className="text-primary" />
          <span>{t?.filters || "Bộ lọc"}</span>
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>{t?.clear_all || "Xoá lọc"}</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-label-compact text-xs text-on-surface-variant mb-3 uppercase tracking-wider font-semibold">
          {t?.categories || "Danh mục"}
        </h4>
        <div className="flex flex-col gap-2.5">
          {defaultCategories.map((cat) => {
            const isChecked = filters.categories.includes(cat.id);
            return (
              <label
                key={cat.id}
                className="flex items-center gap-2.5 cursor-pointer group select-none text-body-sm"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategory(cat.id)}
                  className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer accent-primary"
                />
                <span
                  className={`transition-colors ${
                    isChecked
                      ? "text-primary font-semibold"
                      : "text-on-surface group-hover:text-primary"
                  }`}
                >
                  {cat.label}
                </span>
                <span className="ml-auto text-outline text-xs font-label-compact">
                  {cat.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="w-full h-px bg-outline-variant/50" />

      {/* Condition Filter */}
      <div>
        <h4 className="text-label-compact text-xs text-on-surface-variant mb-3 uppercase tracking-wider font-semibold">
          {t?.condition || "Tình trạng"}
        </h4>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {conditions.map((c) => {
            const isSelected = filters.condition === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => selectCondition(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "border border-primary bg-primary-container text-on-primary-container font-semibold shadow-sm"
                    : "border border-outline-variant bg-surface text-on-surface hover:border-primary hover:text-primary"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full h-px bg-outline-variant/50" />

      {/* Price Filter */}
      <div>
        <h4 className="text-label-compact text-xs text-on-surface-variant mb-3 uppercase tracking-wider font-semibold">
          {t?.price_range || "Mức giá (VNĐ)"}
        </h4>
        <form onSubmit={applyPrice} className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceInput.min}
              onChange={(e) =>
                setPriceInput((p) => ({ ...p, min: e.target.value }))
              }
              placeholder={t?.price_from || "Từ"}
              className="w-full p-2 text-xs sm:text-body-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
            />
            <span className="text-outline text-xs font-bold">-</span>
            <input
              type="number"
              value={priceInput.max}
              onChange={(e) =>
                setPriceInput((p) => ({ ...p, max: e.target.value }))
              }
              placeholder={t?.price_to || "Đến"}
              className="w-full p-2 text-xs sm:text-body-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full py-1.5 px-3 bg-secondary-container text-on-secondary-container text-xs sm:text-label-compact font-bold rounded-lg hover:bg-secondary hover:text-on-secondary transition-all active:scale-95 cursor-pointer shadow-sm text-center"
          >
            {t?.apply || "Áp dụng"}
          </button>
        </form>
      </div>

      <div className="w-full h-px bg-outline-variant/50" />

      {/* Location Filter */}
      <div>
        <h4 className="text-label-compact text-xs text-on-surface-variant mb-3 uppercase tracking-wider font-semibold">
          {t?.location || "Khu vực"}
        </h4>
        <select
          value={filters.location}
          onChange={(e) =>
            onFilterChange({ ...filters, location: e.target.value })
          }
          className="w-full p-2 text-xs sm:text-body-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer"
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.id === "all" ? t?.all_regions || loc.label : loc.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
