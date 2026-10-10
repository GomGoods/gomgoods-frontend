"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface MarketplacePaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function MarketplacePagination({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
}: MarketplacePaginationProps) {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className="mt-8 sm:mt-10 flex justify-center items-center gap-1.5 sm:gap-2"
    >
      {/* Previous Page */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => handlePageClick(currentPage - 1)}
        aria-label="Previous page"
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors disabled:opacity-40 disabled:pointer-events-none active:scale-95"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((item, index) => {
        if (typeof item === "string") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-on-surface-variant text-body-sm select-none"
            >
              ...
            </span>
          );
        }

        const isActive = item === currentPage;
        return (
          <button
            key={item}
            type="button"
            onClick={() => handlePageClick(item)}
            aria-current={isActive ? "page" : undefined}
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-xs sm:text-label-compact font-bold transition-all duration-150 active:scale-95 ${
              isActive
                ? "bg-primary text-on-primary shadow-sm"
                : "border border-outline-variant text-on-surface hover:bg-surface-container hover:border-primary/40"
            }`}
          >
            {item}
          </button>
        );
      })}

      {/* Next Page */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        aria-label="Next page"
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors disabled:opacity-40 disabled:pointer-events-none active:scale-95"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
