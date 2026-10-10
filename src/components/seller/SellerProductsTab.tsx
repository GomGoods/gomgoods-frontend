"use client";

import { useState } from "react";
import { Filter, Sparkles, Package, Star, MessageSquare } from "lucide-react";
import { ProductCard, type ProductItem } from "@/components/product/ProductCard";
import { SellerFeedTab } from "./SellerFeedTab";
import { SellerReviewsTab } from "./SellerReviewsTab";
import type { SellerProfileData } from "./seller-data";

interface SellerProductsTabProps {
  products: ProductItem[];
  seller: SellerProfileData;
}

export function SellerProductsTab({
  products,
  seller,
}: SellerProductsTabProps) {
  // Level 1 Tabs: "products" | "reviews" | "feed"
  const [mainTab, setMainTab] = useState<"products" | "reviews" | "feed">("products");

  // Level 2 Sub-tabs for "products": "all" | "active" | "sold"
  const [subTab, setSubTab] = useState<"all" | "active" | "sold">("all");
  const [activeFilter, setActiveFilter] = useState<string>("newest");

  // Products filtering by sub-tab
  const subFilteredProducts = products.filter((p) => {
    if (subTab === "sold") {
      // simulate sold items if any
      return false;
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...subFilteredProducts].sort((a, b) => {
    if (activeFilter === "price-asc") {
      const priceA = parseInt(a.price.replace(/\D/g, "")) || 0;
      const priceB = parseInt(b.price.replace(/\D/g, "")) || 0;
      return priceA - priceB;
    }
    return 0;
  });

  return (
    <div className="flex-1 w-full flex flex-col">
      {/* 1. LEVEL 1: MAIN NAVIGATION TABS (Sản phẩm | Đánh giá | Bảng tin) */}
      <div className="flex border-b border-outline-variant/50 mb-5 overflow-x-auto hide-scrollbar gap-2 sm:gap-4">
        {/* Tab 1: Sản phẩm */}
        <button
          type="button"
          onClick={() => setMainTab("products")}
          className={`flex items-center gap-2 px-5 sm:px-6 py-3 font-extrabold text-sm sm:text-base whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            mainTab === "products"
              ? "text-primary border-primary"
              : "text-on-surface-variant hover:text-primary border-transparent"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Sản phẩm ({products.length})</span>
        </button>

        {/* Tab 2: Đánh giá */}
        <button
          type="button"
          onClick={() => setMainTab("reviews")}
          className={`flex items-center gap-2 px-5 sm:px-6 py-3 font-extrabold text-sm sm:text-base whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            mainTab === "reviews"
              ? "text-primary border-primary"
              : "text-on-surface-variant hover:text-primary border-transparent"
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Đánh giá ({seller.stats.reviewCount})</span>
        </button>

        {/* Tab 3: Bảng tin */}
        <button
          type="button"
          onClick={() => setMainTab("feed")}
          className={`flex items-center gap-2 px-5 sm:px-6 py-3 font-extrabold text-sm sm:text-base whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            mainTab === "feed"
              ? "text-primary border-primary"
              : "text-on-surface-variant hover:text-primary border-transparent"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Bảng tin ({seller.feedPosts?.length || 3})</span>
        </button>
      </div>

      {/* 2. CONTENT FOR "SẢN PHẨM" TAB */}
      {mainTab === "products" && (
        <div className="flex flex-col gap-4">
          {/* Sub-tabs (Tất cả, Đang bán, Đã bán) & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
            {/* Sub-tabs pills */}
            <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 w-fit">
              <button
                type="button"
                onClick={() => setSubTab("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  subTab === "all"
                    ? "bg-surface text-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-background"
                }`}
              >
                Tất cả ({products.length})
              </button>
              <button
                type="button"
                onClick={() => setSubTab("active")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  subTab === "active"
                    ? "bg-surface text-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-background"
                }`}
              >
                Đang bán ({seller.activeListingsCount})
              </button>
              <button
                type="button"
                onClick={() => setSubTab("sold")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  subTab === "sold"
                    ? "bg-surface text-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-background"
                }`}
              >
                Đã bán ({seller.soldListingsCount})
              </button>
            </div>

            {/* Quick Sort & Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveFilter("newest")}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                  activeFilter === "newest"
                    ? "bg-surface-container-high border-outline-variant text-on-surface font-bold"
                    : "bg-surface border-outline-variant/60 text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                Mới nhất
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("price-asc")}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                  activeFilter === "price-asc"
                    ? "bg-surface-container-high border-outline-variant text-on-surface font-bold"
                    : "bg-surface border-outline-variant/60 text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                Giá thấp - cao
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("freeship")}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                  activeFilter === "freeship"
                    ? "bg-surface-container-high border-outline-variant text-on-surface font-bold"
                    : "bg-surface border-outline-variant/60 text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                Freeship
              </button>

              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-surface-container-low ml-auto sm:ml-0"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Lọc</span>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {subTab !== "sold" ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5 pt-1">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More Button */}
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  className="px-6 py-2 rounded-full border border-outline-variant text-on-surface hover:bg-surface-container-high text-xs sm:text-sm font-semibold transition-colors shadow-xs active:scale-95 cursor-pointer"
                >
                  Xem thêm ({seller.activeListingsCount - sortedProducts.length > 0 ? seller.activeListingsCount - sortedProducts.length : 12} sản phẩm)
                </button>
              </div>
            </>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-2 bg-surface rounded-2xl border border-outline-variant/40">
              <p className="text-on-surface-variant text-sm">
                {seller.name} đã thanh lý thành công {seller.soldListingsCount} sản phẩm trên GomGoods.
              </p>
              <span className="text-xs text-on-surface-variant/80">
                Toàn bộ lịch sử bán hàng được hệ thống lưu trữ an toàn.
              </span>
            </div>
          )}
        </div>
      )}

      {/* 3. CONTENT FOR "ĐÁNH GIÁ" TAB */}
      {mainTab === "reviews" && <SellerReviewsTab seller={seller} />}

      {/* 4. CONTENT FOR "BẢNG TIN" TAB */}
      {mainTab === "feed" && <SellerFeedTab seller={seller} />}
    </div>
  );
}
