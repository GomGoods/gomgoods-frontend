"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Flame, Layers, Tag, Compass } from "lucide-react";
import { ProductCard, type ProductItem } from "./ProductCard";
import { sampleProducts } from "@/components/home/home-products-data";
import { sampleMarketplaceProducts } from "@/components/marketplace/marketplace-data";

interface RecommendedProductsSectionProps {
  currentProductId: string | number;
  categoryName?: string;
  currentPrice?: string;
  lang?: string;
}

type FilterMode = "all" | "category" | "price" | "trending";

export function RecommendedProductsSection({
  currentProductId,
  categoryName = "Figure",
  currentPrice,
  lang = "vi",
}: RecommendedProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<FilterMode>("all");

  // Combine and deduplicate sample product pools
  const allCandidates = useMemo(() => {
    const combined: ProductItem[] = [
      ...sampleProducts,
      ...sampleMarketplaceProducts,
    ];

    // Deduplicate by ID and exclude current product
    const seen = new Set<string>();
    const currentIdStr = String(currentProductId);

    return combined.filter((p) => {
      const idStr = String(p.id);
      if (idStr === currentIdStr || seen.has(idStr)) {
        return false;
      }
      seen.add(idStr);
      return true;
    });
  }, [currentProductId]);

  // Parse numeric price for comparison
  const parseNumPrice = (priceStr?: string) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
  };

  const targetPrice = parseNumPrice(currentPrice);

  const filteredList = useMemo(() => {
    let list = [...allCandidates];

    if (activeTab === "category") {
      // Prioritize items with matching category/fandom keywords
      const catKeywords = categoryName.toLowerCase().split(/[\s/]+/);
      list = list.filter((p) => {
        const titleLower = p.title.toLowerCase();
        return catKeywords.some((kw) => kw.length > 2 && titleLower.includes(kw));
      });
      // Fallback if too few
      if (list.length < 4) {
        list = allCandidates.slice(0, 5);
      }
    } else if (activeTab === "price" && targetPrice > 0) {
      // Sort by price proximity to target price
      list.sort((a, b) => {
        const diffA = Math.abs(parseNumPrice(a.price) - targetPrice);
        const diffB = Math.abs(parseNumPrice(b.price) - targetPrice);
        return diffA - diffB;
      });
    } else if (activeTab === "trending") {
      // Trending: items with Hot, Rare or New badge
      list = list.filter((p) => p.badge?.text);
      if (list.length < 4) {
        list = allCandidates.slice(2, 7);
      }
    }

    return list.slice(0, 5);
  }, [allCandidates, activeTab, categoryName, targetPrice]);

  const tabs = [
    { id: "all" as const, label: "Tất cả gợi ý", icon: Sparkles },
    { id: "category" as const, label: "Cùng Fandom & Chủ đề", icon: Layers },
    { id: "price" as const, label: "Tầm giá tương đương", icon: Tag },
    { id: "trending" as const, label: "Đang được săn đón", icon: Flame },
  ];

  return (
    <section className="w-full pt-8 pb-4 border-t border-outline-variant/30 flex flex-col gap-5">
      {/* Header with AI / Recommendation System branding */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-on-background tracking-tight">
            Gợi ý dành riêng cho bạn
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">
            Dựa trên sản phẩm đang xem, danh mục fandom và mức giá phù hợp
          </p>
        </div>

        <Link
          href={`/${lang}/marketplace`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors group shrink-0"
        >
          <span>Khám phá thêm</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Recommendation Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-primary text-white shadow-xs scale-[1.02]"
                  : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/40"
              }`}
            >
              <Icon size={13} className={isActive ? "fill-white" : ""} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Recommended Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-3.5">
        {filteredList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom Subtle Banner */}
      <div className="mt-2 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-surface-container p-4 border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Compass size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">
              Chưa tìm thấy món ưng ý?
            </h4>
            <p className="text-xs text-on-surface-variant">
              Khám phá hàng ngàn deal pass đồ anime, manga, scale figure và TCG trên sàn
            </p>
          </div>
        </div>

        <Link
          href={`/${lang}/marketplace`}
          className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-primary hover:text-white text-xs font-bold text-on-surface transition-all shrink-0 shadow-2xs cursor-pointer"
        >
          Đến Marketplace
        </Link>
      </div>
    </section>
  );
}
