"use client";

import { ShoppingBag, Store, Handshake, Users } from "lucide-react";
import type { UserProfile } from "./profile-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProfileStatsProps {
  stats: UserProfile["stats"];
  dict?: Dictionary;
}

export function ProfileStats({ stats, dict }: ProfileStatsProps) {
  const p = dict?.profile;

  const statItems = [
    {
      id: "buyer",
      label: p?.stat_buyer_rep || "Uy tín người mua",
      value: `${stats.buyerReputation}`,
      unit: "/5",
      icon: <ShoppingBag className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      bgIcon: "bg-teal-50 dark:bg-teal-950/50",
      accentBorder: "hover:border-teal-300 dark:hover:border-teal-700",
    },
    {
      id: "seller",
      label: p?.stat_seller_rep || "Uy tín người bán",
      value: `${stats.sellerReputation}`,
      unit: "/5",
      icon: <Store className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      bgIcon: "bg-amber-50 dark:bg-amber-950/50",
      accentBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    },
    {
      id: "deals",
      label: p?.stat_deals || "Giao dịch T.Công",
      value: `${stats.completedDeals}`,
      unit: "",
      icon: <Handshake className="w-5 h-5 text-primary" />,
      bgIcon: "bg-primary/10",
      accentBorder: "hover:border-primary/40",
    },
    {
      id: "followers",
      label: p?.stat_followers || "Followers",
      value: stats.followers,
      unit: "",
      icon: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      bgIcon: "bg-indigo-50 dark:bg-indigo-950/50",
      accentBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    },
  ];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {statItems.map((item) => (
        <div
          key={item.id}
          className={`bg-card border border-border/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-default ${item.accentBorder}`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 ${item.bgIcon}`}
          >
            {item.icon}
          </div>
          <div className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-baseline gap-0.5">
            <span>{item.value}</span>
            {item.unit && (
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                {item.unit}
              </span>
            )}
          </div>
          <div className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1 line-clamp-1">
            {item.label}
          </div>
        </div>
      ))}
    </section>
  );
}
