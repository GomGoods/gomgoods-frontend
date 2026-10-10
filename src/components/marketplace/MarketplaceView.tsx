"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { X, Search } from "lucide-react";
import { MarketplaceSidebar } from "./MarketplaceSidebar";
import { MarketplaceToolbar } from "./MarketplaceToolbar";
import { MarketplaceSort, type SortOption } from "./MarketplaceSort";
import { MarketplaceGrid, sampleMarketplaceProducts } from "./MarketplaceGrid";
import { MarketplacePagination } from "./MarketplacePagination";
import type { FilterState } from "./MarketplaceFilter";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { ProductItem } from "@/components/product/ProductCard";

interface MarketplaceViewProps {
  dict: Dictionary;
}

const ITEMS_PER_PAGE = 8;

const initialFilterState: FilterState = {
  categories: [],
  condition: null,
  minPrice: "",
  maxPrice: "",
  location: "all",
};

function matchesCategory(product: ProductItem, categoryId: string): boolean {
  const t = (product.title || "").toLowerCase();
  switch (categoryId) {
    case "figure":
      return (
        t.includes("mô hình") ||
        t.includes("figure") ||
        t.includes("nendoroid") ||
        t.includes("scale") ||
        t.includes("ganyu") ||
        t.includes("rem") ||
        t.includes("miku")
      );
    case "tcg":
      return (
        t.includes("thẻ") ||
        t.includes("card") ||
        t.includes("tcg") ||
        t.includes("pokemon") ||
        t.includes("one piece") ||
        t.includes("bo góc")
      );
    case "cosplay":
      return (
        t.includes("cosplay") ||
        t.includes("keycap") ||
        t.includes("phụ kiện") ||
        t.includes("wig") ||
        t.includes("trang phục")
      );
    case "manga":
      return (
        t.includes("manga") ||
        t.includes("truyện") ||
        t.includes("artbook") ||
        t.includes("jujutsu") ||
        t.includes("chainsaw") ||
        t.includes("bleach")
      );
    default:
      return true;
  }
}

function matchesCondition(product: ProductItem, conditionId: string | null): boolean {
  if (!conditionId) return true;
  const badgeText = (product.badge?.text || "").toLowerCase();
  const title = (product.title || "").toLowerCase();
  switch (conditionId) {
    case "new":
      return badgeText.includes("new") || title.includes("new") || title.includes("seal");
    case "like_new":
      return (
        badgeText.includes("like new") ||
        title.includes("like new") ||
        title.includes("99%")
      );
    case "used":
      return (
        !badgeText.includes("new") ||
        title.includes("pass") ||
        title.includes("used")
      );
    case "defect":
      return (
        badgeText.includes("defect") ||
        title.includes("lỗi") ||
        title.includes("defect")
      );
    default:
      return true;
  }
}

export function MarketplaceView({ dict }: MarketplaceViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchQuery = searchParams.get("q") || "";
  const initialCat = searchParams.get("category");

  const [filters, setFilters] = useState<FilterState>(() => ({
    ...initialFilterState,
    categories: initialCat ? [initialCat] : [],
  }));
  const [currentSort, setCurrentSort] = useState<SortOption>("relevant");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category from URL param if changed externally
  useEffect(() => {
    if (initialCat && !filters.categories.includes(initialCat)) {
      setFilters((prev) => ({
        ...prev,
        categories: [initialCat],
      }));
    }
  }, [initialCat]);

  const handleResetFilters = () => {
    setFilters(initialFilterState);
    setCurrentPage(1);
    if (searchQuery) {
      router.push(pathname);
    }
  };

  const handleClearSearch = () => {
    router.push(pathname);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.condition !== null) count += 1;
    if (filters.minPrice !== "" || filters.maxPrice !== "") count += 1;
    if (filters.location !== "all") count += 1;
    if (searchQuery) count += 1;
    return count;
  }, [filters, searchQuery]);

  // Parse price string to number e.g. "3.200.000đ" -> 3200000
  const parsePrice = (priceStr: string) => {
    const digits = priceStr.replace(/\D/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  // Filter & Sort products
  const processedProducts = useMemo(() => {
    let list = [...sampleMarketplaceProducts];

    // Filter by text search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.seller.name.toLowerCase().includes(q) ||
          p.seller.location.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (filters.categories.length > 0) {
      list = list.filter((p) =>
        filters.categories.some((catId) => matchesCategory(p, catId))
      );
    }

    // Filter by condition
    if (filters.condition) {
      list = list.filter((p) => matchesCondition(p, filters.condition));
    }

    // Filter by location
    if (filters.location !== "all") {
      const locMap: Record<string, string> = {
        hn: "Hà Nội",
        hcm: "TP.HCM",
        dn: "Đà Nẵng",
      };
      const targetLoc = locMap[filters.location];
      if (targetLoc) {
        list = list.filter((p) => p.seller.location.includes(targetLoc));
      }
    }

    // Filter price
    const min = filters.minPrice ? parseInt(filters.minPrice, 10) : null;
    const max = filters.maxPrice ? parseInt(filters.maxPrice, 10) : null;
    if (min !== null) {
      list = list.filter((p) => parsePrice(p.price) >= min);
    }
    if (max !== null) {
      list = list.filter((p) => parsePrice(p.price) <= max);
    }

    // Sort
    if (currentSort === "price_asc") {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (currentSort === "price_desc") {
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (currentSort === "newest") {
      // Products with "Vừa đăng" or "giờ trước" first
      list.sort((a, b) => {
        const aNew = a.postedAt?.includes("Vừa") || a.postedAt?.includes("giờ");
        const bNew = b.postedAt?.includes("Vừa") || b.postedAt?.includes("giờ");
        return aNew === bNew ? 0 : aNew ? -1 : 1;
      });
    } else if (currentSort === "relevant" && searchQuery) {
      const q = searchQuery.toLowerCase();
      list.sort((a, b) => {
        const aMatch = a.title.toLowerCase().indexOf(q);
        const bMatch = b.title.toLowerCase().indexOf(q);
        return aMatch - bMatch;
      });
    }

    return list;
  }, [filters, currentSort, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(processedProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [processedProducts, currentPage]);

  const fromCount = processedProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const toCount = Math.min(currentPage * ITEMS_PER_PAGE, processedProducts.length);

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 lg:gap-8 pb-10">
      {/* Left Sidebar (Filters) */}
      <MarketplaceSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        isMobileOpen={isMobileFilterOpen}
        onMobileClose={() => setIsMobileFilterOpen(false)}
        dict={dict}
      />

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Search Query Active Banner */}
        {searchQuery && (
          <div className="mb-4 p-3 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Search size={14} className="text-primary" />
              <span>
                Kết quả tìm kiếm cho: <strong className="font-bold text-primary">&quot;{searchQuery}&quot;</strong> ({processedProducts.length} sản phẩm)
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearSearch}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline cursor-pointer"
            >
              <span>Xóa từ khóa</span>
              <X size={12} />
            </button>
          </div>
        )}

        {/* Mobile Toolbar */}
        <MarketplaceToolbar
          onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
          activeFilterCount={activeFilterCount}
          dict={dict}
        />

        {/* Sort Bar */}
        <MarketplaceSort
          currentSort={currentSort}
          onSortChange={setCurrentSort}
          totalCount={processedProducts.length}
          fromCount={fromCount}
          toCount={toCount}
          dict={dict}
        />

        {/* Product Grid */}
        {paginatedProducts.length > 0 ? (
          <MarketplaceGrid products={paginatedProducts} dict={dict} />
        ) : (
          <div className="py-16 text-center bg-card rounded-2xl border border-border/80 p-8 flex flex-col items-center justify-center gap-3">
            <span className="text-3xl">🔍</span>
            <h3 className="font-bold text-foreground text-base sm:text-lg">
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-sm">
              {searchQuery
                ? `Không có sản phẩm nào khớp với từ khóa "${searchQuery}". Hãy thử tìm kiếm với từ khóa khác.`
                : "Thử điều chỉnh lại bộ lọc danh mục hoặc khoảng giá để tìm được món hàng ưng ý nhé."}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer"
            >
              {dict?.marketplace?.clear_all || "Xoá bộ lọc"}
            </button>
          </div>
        )}

        {/* Real Pagination */}
        {totalPages > 1 && (
          <MarketplacePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </div>
    </div>
  );
}
