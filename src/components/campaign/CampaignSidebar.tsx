"use client";

import {
  Calendar,
  Store,
  Users,
  Star,
  Layers,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Sprout,
  TreePine,
  Globe2,
  HeartHandshake,
} from "lucide-react";
import type {
  CampaignCategory,
  CampaignStatus,
  EcoRankData,
} from "./campaign-data";

interface CampaignSidebarProps {
  selectedCategory: CampaignCategory;
  onSelectCategory: (cat: CampaignCategory) => void;
  selectedStatus: "all" | CampaignStatus;
  onSelectStatus: (status: "all" | CampaignStatus) => void;
  ecoRank: EcoRankData;
}

export function CampaignSidebar({
  selectedCategory,
  onSelectCategory,
  selectedStatus,
  onSelectStatus,
  ecoRank,
}: CampaignSidebarProps) {
  const categories = [
    { id: "all" as CampaignCategory, name: "Tất cả chiến dịch", icon: Layers },
    {
      id: "eco" as CampaignCategory,
      name: "Quyên góp & Môi trường 🌱",
      icon: Sprout,
      badge: "Mới",
    },
    {
      id: "community" as CampaignCategory,
      name: "Sự kiện cộng đồng",
      icon: Calendar,
    },
    {
      id: "marketplace" as CampaignCategory,
      name: "Hoạt động mua bán",
      icon: Store,
    },
    {
      id: "fandom" as CampaignCategory,
      name: "Fandom-specific",
      icon: Users,
    },
    {
      id: "special" as CampaignCategory,
      name: "Special campaigns",
      icon: Star,
    },
  ];

  const statuses: { id: "all" | CampaignStatus; label: string }[] = [
    { id: "all", label: "Tất cả" },
    { id: "active", label: "Đang diễn ra" },
    { id: "upcoming", label: "Sắp tới" },
    { id: "ended", label: "Đã kết thúc" },
  ];

  const progressPercent = Math.min(
    100,
    Math.round((ecoRank.currentPoints / ecoRank.maxPoints) * 100)
  );

  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 flex flex-col gap-5">
      {/* 1. Category Navigation Box */}
      <div className="bg-surface rounded-2xl p-4 sm:p-5 shadow-xs border border-emerald-500/25">
        <div className="flex items-center gap-2 mb-3.5">
          <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="font-extrabold text-sm sm:text-base text-on-background tracking-tight">
            Danh mục sự kiện
          </h2>
        </div>

        <ul className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-on-surface-variant hover:bg-emerald-500/10 hover:text-emerald-800 dark:hover:text-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {"badge" in cat && !isSelected && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                        {cat.badge}
                      </span>
                    )}
                    {isSelected && <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2. Quick Status Filter */}
      <div className="bg-surface rounded-2xl p-4 shadow-xs border border-emerald-500/20">
        <h3 className="font-bold text-xs uppercase tracking-wider text-on-surface-variant mb-2.5">
          Trạng thái sự kiện
        </h3>
        <div className="grid grid-cols-2 gap-1.5">
          {statuses.map((s) => {
            const isSelected = selectedStatus === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectStatus(s.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  isSelected
                    ? "bg-emerald-600/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Eco Loyalty Gamification Card (Huy Hiệu Sống Xanh) */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Sprout className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="font-black text-sm block leading-tight">
                Điểm Sống Xanh
              </span>
              <span className="text-[11px] text-emerald-100 font-medium">
                {ecoRank.tierName}
              </span>
            </div>
          </div>
          <span className="text-xs font-black px-2 py-0.5 rounded-full bg-white/20 border border-white/20">
            {progressPercent}%
          </span>
        </div>

        <p className="text-xs text-white/90 mb-3 leading-relaxed">
          Tham gia gây quỹ, tái chế và gom đồ cũ để tích lũy cây xanh & thăng hạng lên{" "}
          <strong className="text-emerald-200">{ecoRank.nextTier}</strong>.
        </p>

        {/* Eco Statistics Pill */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-black/20 backdrop-blur-xs rounded-xl mb-3 text-center border border-white/10">
          <div>
            <span className="text-base font-black text-emerald-300 block leading-tight">
              {ecoRank.treesPlanted} 🌱
            </span>
            <span className="text-[10px] font-semibold text-white/80">Cây đã trồng</span>
          </div>
          <div className="border-l border-white/15">
            <span className="text-base font-black text-emerald-300 block leading-tight">
              -{ecoRank.co2SavedKg}kg 🌍
            </span>
            <span className="text-[10px] font-semibold text-white/80">CO₂ giảm thiểu</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/25 rounded-full h-2 mb-2 overflow-hidden p-0.5">
          <div
            className="bg-emerald-300 h-full rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-bold text-white/85">
          <span>{ecoRank.tierName.split(" ")[0]}</span>
          <span>
            {ecoRank.currentPoints}/{ecoRank.maxPoints} Điểm Xanh
          </span>
        </div>

        {/* Benefits list preview */}
        <div className="mt-3 pt-3 border-t border-white/15 flex flex-col gap-1.5 text-[11px] text-white/85">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
            <span className="truncate">Voucher 15% đồ cũ tuần hoàn mỗi tháng</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
