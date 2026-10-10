"use client";

import type { ForumCategory } from "./forum-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export type FilterTab = "latest" | "hot" | "safe" | "review" | "cbgd" | "pass";

interface ForumFilterProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  dict?: Dictionary;
}

export function ForumFilter({ activeTab, onTabChange, dict }: ForumFilterProps) {
  const tabs: { key: FilterTab; label: string }[] = [
    { key: "latest", label: dict?.forum?.tab_all || "Mới nhất" },
    { key: "hot", label: dict?.forum?.tab_hot || "Đang Hot" },
    { key: "safe", label: dict?.forum?.tab_safe || "Giao dịch an toàn" },
    { key: "review", label: dict?.forum?.tab_review || "Review Seller" },
    { key: "cbgd", label: dict?.forum?.tab_cbgd || "Cảnh báo (#CBGD)" },
    { key: "pass", label: dict?.forum?.tab_pass || "Pass đồ (#PASS)" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`font-label-compact text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              isActive
                ? "bg-on-background text-surface-container-lowest font-bold shadow-xs"
                : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant hover:text-on-surface border border-outline-variant/60 font-medium"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
