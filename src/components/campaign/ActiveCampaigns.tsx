"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Clock,
  Users,
  Bookmark,
  ChevronRight,
  Heart,
  Sprout,
  ArrowUpRight,
  TreePine,
} from "lucide-react";
import type { CampaignItem } from "./campaign-data";

interface ActiveCampaignsProps {
  campaigns: CampaignItem[];
  onJoin: (campaign: CampaignItem) => void;
  onDonate?: (campaign: CampaignItem) => void;
}

export function ActiveCampaigns({
  campaigns,
  onJoin,
  onDonate,
}: ActiveCampaignsProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>(
    {}
  );

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (campaigns.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/25 pb-2.5">
        <h2 className="text-lg sm:text-xl font-black text-on-background flex items-center gap-2 tracking-tight">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Đang diễn ra</span>
        </h2>
        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5 cursor-pointer hover:underline">
          <span>Xem tất cả ({campaigns.length})</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>

      {/* List of Horizontal Campaign Cards */}
      <div className="flex flex-col gap-3.5">
        {campaigns.map((camp) => {
          const isBookmarked = !!bookmarkedIds[camp.id];

          return (
            <div
              key={camp.id}
              className="flex flex-col sm:flex-row bg-surface rounded-2xl overflow-hidden border border-emerald-500/25 shadow-xs hover:shadow-md transition-all duration-300 group"
            >
              {/* Left Image */}
              <div className="w-full sm:w-52 md:w-60 h-44 sm:h-auto flex-shrink-0 relative overflow-hidden bg-surface-container-high">
                <Image
                  src={camp.image}
                  alt={camp.title}
                  fill
                  unoptimized
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 bg-emerald-600/90 text-white font-black text-[11px] px-2.5 py-0.5 rounded-md shadow-xs backdrop-blur-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>{camp.statusText}</span>
                </div>
              </div>

              {/* Right Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-0.5 flex items-center gap-1">
                        {camp.isDonation ? (
                          <>
                            <Sprout className="w-3.5 h-3.5" />
                            <span>Quyên góp vì cộng đồng</span>
                          </>
                        ) : (
                          <span>{camp.categoryName}</span>
                        )}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-on-background group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {camp.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleBookmark(camp.id)}
                      className={`p-2 rounded-full border transition-all cursor-pointer ${
                        isBookmarked
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-600"
                          : "border-outline-variant/40 text-on-surface-variant hover:border-emerald-500/40 hover:text-emerald-600"
                      }`}
                      title={isBookmarked ? "Bỏ lưu" : "Lưu chiến dịch"}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                    {camp.description}
                  </p>

                  {/* Fundraising progress for donation items */}
                  {camp.isDonation && camp.targetAmount && (
                    <div className="mt-2.5 p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-500/20 flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        <span>Đã góp: {camp.raisedAmount}</span>
                        <span className="text-on-surface-variant">
                          Mục tiêu: {camp.targetAmount}
                        </span>
                      </div>
                      <div className="w-full bg-emerald-200/50 dark:bg-emerald-900/40 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${camp.raisedPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                        {camp.ecoImpact || `Đã có ${camp.donorCount} người quyên góp`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-outline-variant/30">
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant font-semibold flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{camp.period}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                      <Users className="w-3.5 h-3.5" />
                      <span>{camp.participantsCount}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 ml-auto sm:ml-0">
                    {camp.isDonation && onDonate ? (
                      <button
                        type="button"
                        onClick={() => onDonate(camp)}
                        className="h-8 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>Quyên góp</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onJoin(camp)}
                        className="h-8 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <span>Tham gia</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
