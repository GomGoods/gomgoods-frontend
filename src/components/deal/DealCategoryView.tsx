"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Flame,
  ArrowUpDown,
  Search,
  Heart,
  MapPin,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import type { DealCategoryInfo, DealProductItem } from "./deal-data";

interface DealCategoryViewProps {
  deal: DealCategoryInfo;
  lang: string;
}

export function DealCategoryView({ deal, lang }: DealCategoryViewProps) {
  const [selectedTab, setSelectedTab] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = useMemo(() => {
    let list = [...deal.products];

    // Subcategory filter
    if (selectedTab !== "Tất cả") {
      list = list.filter((p) => p.category === selectedTab);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.seller.name.toLowerCase().includes(q)
      );
    }

    // Sort
    const parsePrice = (priceStr: string) => {
      return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
    };

    if (sortBy === "price-asc") {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return list;
  }, [deal.products, selectedTab, searchQuery, sortBy]);

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-12">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-on-surface-variant pt-2">
        <Link
          href={`/${lang}`}
          className="hover:text-primary transition-colors font-medium"
        >
          Trang chủ
        </Link>
        <ChevronRight size={14} className="opacity-60" />
        <span className="text-on-surface-variant font-medium">Săn Deal</span>
        <ChevronRight size={14} className="opacity-60" />
        <span className="text-on-surface font-bold text-primary">
          {deal.title}
        </span>
      </nav>

      {/* 2. Hero Banner Showcase */}
      <section
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border ${deal.theme.borderColor} ${deal.theme.cardBg}`}
      >
        {/* Background Watermark */}
        <span className="absolute -top-4 right-6 text-white/35 font-black text-6xl sm:text-8xl md:text-9xl tracking-widest pointer-events-none select-none italic">
          {deal.watermark}
        </span>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Column: Details */}
          <div className="flex-1 text-slate-900">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
              <Flame size={14} className="text-amber-400 fill-amber-400" />
              <span>{deal.badgeText}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {deal.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-800/90 font-medium mt-2 max-w-xl leading-relaxed">
              {deal.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-bold text-slate-900">
              <span className="bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/60 shadow-2xs">
                ⚡ Cập nhật deal mỗi ngày
              </span>
            </div>
          </div>

          {/* Right Column: Mascot */}
          <div className="relative shrink-0 filter drop-shadow-xl animate-bounce-subtle">
            <Image
              src={deal.mascot}
              alt={deal.title}
              width={200}
              height={200}
              priority
              className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 object-contain"
            />
          </div>
        </div>
      </section>

      {/* 4. Filter & Search Controls */}
      <section className="bg-white dark:bg-surface-container-low rounded-2xl p-3.5 sm:p-4 border border-slate-100 dark:border-outline-variant/40 shadow-xs flex flex-col gap-3.5">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {deal.filterTabs.map((tab) => {
            const active = selectedTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-outline-variant/30">
          <div className="relative w-full sm:w-72">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm trong deal này..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-surface-container rounded-xl text-xs text-on-surface border border-slate-200 dark:border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            <span className="text-xs text-on-surface-variant font-medium">
              Tìm thấy <strong className="text-on-surface">{filteredProducts.length}</strong> món
            </span>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown size={14} className="text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 dark:bg-surface-container border border-slate-200 dark:border-outline-variant/50 rounded-xl px-2.5 py-1.5 text-xs text-on-surface font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Grid */}
      <section>
        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-surface-container-low rounded-3xl p-12 text-center border border-slate-100 dark:border-outline-variant/40">
            <p className="text-sm font-semibold text-on-surface-variant">
              Không tìm thấy sản phẩm nào khớp với tìm kiếm.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedTab("Tất cả");
                setSearchQuery("");
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map((product) => {
              const isFav = !!favorites[product.id];
              return (
                <Link
                  key={product.id}
                  href={`/${lang}/product/${product.id}`}
                  className="bg-white dark:bg-surface-container-low rounded-2xl overflow-hidden flex flex-col cursor-pointer border border-slate-100 dark:border-outline-variant/50 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 group relative"
                >
                  {/* Product Image Area */}
                  <div className="relative aspect-square w-full bg-slate-100 dark:bg-surface-container overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white shadow-xs">
                        {product.badge.text}
                      </span>
                    )}

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(String(product.id), e)}
                      aria-label="Thêm vào yêu thích"
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 dark:bg-surface/80 backdrop-blur-xs flex items-center justify-center text-on-surface-variant hover:text-rose-500 hover:bg-white transition-all shadow-xs cursor-pointer"
                    >
                      <Heart
                        size={15}
                        className={isFav ? "fill-rose-500 text-rose-500" : ""}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-base font-bold text-foreground">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-slate-400 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-semibold text-on-surface line-clamp-2 mt-1 leading-snug group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </div>

                    {/* Seller & Footer */}
                    <div className="pt-2 border-t border-slate-100 dark:border-outline-variant/30 flex items-center justify-between text-[11px] text-on-surface-variant">
                      <div className="flex items-center gap-1.5 truncate">
                        <img
                          src={product.seller.avatar}
                          alt={product.seller.name}
                          className="w-4 h-4 rounded-full object-cover shrink-0"
                        />
                        <span className="truncate font-medium">{product.seller.name}</span>
                        {product.seller.isVerified && (
                          <BadgeCheck size={12} className="text-blue-500 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0 text-slate-400">
                        <MapPin size={11} />
                        <span>{product.seller.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
