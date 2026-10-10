"use client";

import {
  User,
  ShoppingBag,
  Ticket,
  Heart,
  Star,
  Settings,
} from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export type ProfileTabKey =
  | "overview"
  | "orders"
  | "redeemedList"
  | "collection"
  | "reviews"
  | "settings";

interface ProfileTabsProps {
  activeTab: ProfileTabKey;
  onSelectTab: (tab: ProfileTabKey) => void;
  dict?: Dictionary;
  badgeCounts?: {
    orders?: number;
    collection?: number;
    reviews?: number;
    redeemed?: number;
  };
}

export function ProfileTabs({
  activeTab,
  onSelectTab,
  dict,
  badgeCounts,
}: ProfileTabsProps) {
  const p = dict?.profile;

  const tabs: { key: ProfileTabKey; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      key: "overview",
      label: p?.tab_overview || "Hồ sơ của tôi",
      icon: <User className="w-4 h-4" />,
    },
    {
      key: "orders",
      label: p?.tab_orders || "Đơn hàng",
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: badgeCounts?.orders,
    },
    {
      key: "redeemedList",
      label: "Kho Voucher",
      icon: <Ticket className="w-4 h-4" />,
      badge: badgeCounts?.redeemed,
    },
    {
      key: "collection",
      label: "WishList",
      icon: <Heart className="w-4 h-4" />,
      badge: badgeCounts?.collection,
    },
    {
      key: "reviews",
      label: p?.tab_reviews || "Đánh giá",
      icon: <Star className="w-4 h-4" />,
      badge: badgeCounts?.reviews,
    },
    {
      key: "settings",
      label: p?.tab_settings || "Cài đặt",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <nav className="sticky top-16 z-30 bg-card/95 backdrop-blur border-b border-border shadow-xs rounded-t-2xl px-2 sm:px-4 overflow-x-auto overflow-y-hidden scrollbar-hide">
      <div className="flex items-center gap-1 sm:gap-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onSelectTab(tab.key)}
              className={`relative flex items-center gap-2 py-3.5 px-3 sm:px-4 text-sm font-semibold transition-all border-b-2 -mb-px whitespace-nowrap ${
                isActive
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
              }`}
            >
              <span className={isActive ? "text-primary" : "text-muted-foreground"}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {typeof tab.badge === "number" && tab.badge > 0 && (
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
