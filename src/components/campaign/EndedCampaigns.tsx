"use client";

import { History, Trophy, Users, CheckCircle2, Sprout } from "lucide-react";
import type { CampaignItem } from "./campaign-data";

interface EndedCampaignsProps {
  campaigns: CampaignItem[];
}

export function EndedCampaigns({ campaigns }: EndedCampaignsProps) {
  if (campaigns.length === 0) return null;

  return (
    <section className="flex flex-col gap-3.5 opacity-90">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/25 pb-2.5">
        <h2 className="text-base sm:text-lg font-extrabold text-on-surface flex items-center gap-2 tracking-tight">
          <History className="w-4 h-4 text-emerald-600" />
          <span>Đã kết thúc</span>
        </h2>
      </div>

      {/* Archive List */}
      <div className="flex flex-col gap-2.5">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 bg-surface rounded-xl border border-emerald-500/20 hover:bg-emerald-500/5 transition-colors gap-3"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-700 dark:text-emerald-300 flex-shrink-0">
                {camp.isDonation ? (
                  <Sprout className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Trophy className="w-5 h-5 text-amber-500" />
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <h4 className="font-bold text-sm sm:text-base text-on-background truncate">
                  {camp.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5 flex-wrap">
                  <span>{camp.period}</span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {camp.rewards || "Hoàn thành tốt đẹp"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-on-surface-variant font-semibold flex-shrink-0 self-end sm:self-auto">
              <Users className="w-3.5 h-3.5" />
              <span>{camp.participantsCount}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
