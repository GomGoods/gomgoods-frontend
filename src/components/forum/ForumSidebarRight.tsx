"use client";

import Image from "next/image";
import { TrendingUp, Trophy, Star, ShieldCheck, Flame } from "lucide-react";
import { sampleTrendingFandoms, sampleTopContributors } from "./forum-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ForumSidebarRightProps {
  onSearchTag?: (tag: string) => void;
  dict?: Dictionary;
}

export function ForumSidebarRight({ onSearchTag, dict }: ForumSidebarRightProps) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 order-3 hidden lg:flex flex-col gap-5 sticky top-20 h-max">
      {/* Trending Fandoms */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 card-shadow border border-outline-variant/60">
        <h2 className="font-title-md text-base font-bold text-on-surface mb-3 flex items-center gap-2 border-b border-surface-variant pb-2.5">
          <TrendingUp size={18} className="text-secondary" />
          <span>{dict?.forum?.trending_fandoms || "Trending Fandoms"}</span>
        </h2>
        <div className="flex flex-col gap-2.5">
          {sampleTrendingFandoms.map((item) => (
            <button
              key={item.rank}
              type="button"
              onClick={() => onSearchTag?.(item.tag)}
              className="flex items-center gap-3 p-2 rounded-xl text-left hover:bg-surface-container-low transition-colors group"
            >
              <span className="font-headline-lg text-lg font-black text-outline-variant/60 group-hover:text-primary w-5 text-center flex-shrink-0 transition-colors">
                {item.rank}
              </span>
              <div className="flex-1 min-w-0">
                <span className="font-label-compact text-xs font-bold text-on-background group-hover:text-primary transition-colors block truncate">
                  {item.name}
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <Flame size={11} className="text-primary/70" />
                  {item.postsToday}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Contributors Bento */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 card-shadow border border-outline-variant/60">
        <h2 className="font-title-md text-base font-bold text-on-surface mb-3 flex items-center gap-2 border-b border-surface-variant pb-2.5">
          <Trophy size={18} className="text-tertiary" />
          <span>{dict?.forum?.top_contributors || "Top Đóng Góp"}</span>
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {sampleTopContributors.map((user) => (
            <div
              key={user.id}
              className="bg-surface-container-low p-2.5 rounded-xl flex flex-col items-center text-center gap-1.5 hover:bg-surface-container transition-all cursor-pointer border border-transparent hover:border-outline-variant group"
            >
              <div
                className={`w-11 h-11 rounded-full overflow-hidden border-2 relative ${user.borderClass} shadow-sm`}
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  sizes="44px"
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="w-full">
                <span className="font-label-compact text-[11px] font-bold text-on-background block truncate group-hover:text-primary transition-colors">
                  {user.name}
                </span>
                <span className="font-body-sm text-[10px] text-primary flex items-center justify-center gap-0.5 mt-0.5 font-semibold">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  {user.rating}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full mt-3 text-primary text-xs font-bold hover:underline py-1 text-center block transition-all"
        >
          {dict?.forum?.view_all_leaderboard || "Xem tất cả bảng xếp hạng"} →
        </button>
      </div>

      {/* Rules Banner */}
      <div className="bg-gradient-to-br from-surface-container-low to-surface-container-high rounded-2xl p-4 border border-outline-variant/60 flex items-start gap-3 text-xs">
        <ShieldCheck size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-on-background text-xs mb-1">
            {dict?.forum?.rules_title || "Quy tắc an toàn"}
          </h4>
          <p className="text-on-surface-variant text-[11px] leading-relaxed">
            {dict?.forum?.rules_desc ||
              "Giao dịch trung gian qua sàn GomGoods để được bảo hiểm 100% rủi ro lừa đảo."}
          </p>
        </div>
      </div>
    </aside>
  );
}
