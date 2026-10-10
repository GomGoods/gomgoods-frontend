"use client";

import type { Dictionary } from "@/app/[lang]/dictionaries";

export type AuctionTabKey = "live" | "upcoming" | "ended";

interface AuctionTabsProps {
  activeTab: AuctionTabKey;
  onTabChange: (tab: AuctionTabKey) => void;
  dict: Dictionary;
  counts?: Record<AuctionTabKey, number>;
}

export function AuctionTabs({
  activeTab,
  onTabChange,
  dict,
  counts,
}: AuctionTabsProps) {
  const tabs: { key: AuctionTabKey; label: string }[] = [
    {
      key: "live",
      label: dict.auction?.tab_live || "Đang diễn ra",
    },
    {
      key: "upcoming",
      label: dict.auction?.tab_upcoming || "Sắp bắt đầu",
    },
    {
      key: "ended",
      label: dict.auction?.tab_ended || "Đã kết thúc",
    },
  ];

  return (
    <div className="flex gap-2 sm:gap-6 border-b border-outline-variant overflow-x-auto hide-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const count = counts?.[tab.key];

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`pb-3 px-2 sm:px-4 font-semibold text-sm sm:text-base whitespace-nowrap transition-all duration-200 relative flex items-center gap-2 ${
              isActive
                ? "text-primary border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span>{tab.label}</span>
            {typeof count === "number" && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "bg-surface-container text-on-surface-variant"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
