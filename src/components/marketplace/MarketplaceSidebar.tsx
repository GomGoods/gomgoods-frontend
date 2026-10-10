"use client";

import { X } from "lucide-react";
import {
  MarketplaceFilter,
  type FilterState,
} from "./MarketplaceFilter";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface MarketplaceSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  dict?: Dictionary;
}

export function MarketplaceSidebar({
  filters,
  onFilterChange,
  onReset,
  isMobileOpen = false,
  onMobileClose,
  dict,
}: MarketplaceSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 hidden md:flex flex-col gap-6">
        <MarketplaceFilter
          filters={filters}
          onFilterChange={onFilterChange}
          onReset={onReset}
          dict={dict}
        />
      </aside>

      {/* Mobile Drawer (Slide-in) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={onMobileClose}
          />

          {/* Drawer content */}
          <div className="relative z-10 w-[85%] max-w-[320px] bg-surface h-full shadow-2xl overflow-y-auto p-4 flex flex-col gap-4 animate-in slide-in-from-left duration-200">
            {/* Close button header */}
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/60">
              <span className="font-bold text-on-surface text-base">
                {dict?.marketplace?.filters || "Bộ lọc"}
              </span>
              <button
                type="button"
                onClick={onMobileClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filters */}
            <MarketplaceFilter
              filters={filters}
              onFilterChange={onFilterChange}
              onReset={onReset}
              dict={dict}
            />
          </div>
        </div>
      )}
    </>
  );
}
