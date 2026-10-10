"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Bell, Check, Sprout, Heart } from "lucide-react";
import type { CampaignItem } from "./campaign-data";

interface UpcomingCampaignsProps {
  campaigns: CampaignItem[];
  onDonate?: (campaign: CampaignItem) => void;
}

export function UpcomingCampaigns({
  campaigns,
  onDonate,
}: UpcomingCampaignsProps) {
  const [remindedIds, setRemindedIds] = useState<Record<string, boolean>>({});

  const toggleReminder = (id: string) => {
    setRemindedIds((prev) => {
      const next = !prev[id];
      if (next) {
        alert(
          "Đã bật thông báo nhắc nhở! Bạn sẽ nhận được thông báo khi chiến dịch mở cổng."
        );
      }
      return { ...prev, [id]: next };
    });
  };

  if (campaigns.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/25 pb-2.5">
        <h2 className="text-lg sm:text-xl font-black text-on-background flex items-center gap-2 tracking-tight">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span>Sắp tới</span>
        </h2>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((camp) => {
          const isReminded = !!remindedIds[camp.id];

          return (
            <div
              key={camp.id}
              className="bg-surface p-4 sm:p-4.5 rounded-2xl border border-emerald-500/20 shadow-xs hover:shadow-md transition-all duration-300 group flex gap-3.5 sm:gap-4 items-start"
            >
              {/* Thumbnail Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden relative bg-surface-container-high">
                <Image
                  src={camp.image}
                  alt={camp.title}
                  fill
                  unoptimized
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Information & Action */}
              <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-0.5">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      {camp.isDonation && <Sprout className="w-3 h-3" />}
                      <span>Sắp diễn ra</span>
                    </span>
                    <span className="text-[11px] font-bold text-on-surface-variant/80">
                      {camp.period}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-on-background group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1">
                    {camp.title}
                  </h3>

                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                    {camp.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-outline-variant/30 gap-2">
                  <span className="text-[11px] font-semibold text-on-surface-variant truncate">
                    {camp.participantsCount}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleReminder(camp.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                        isReminded
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                          : "bg-surface-container-high hover:bg-emerald-600 hover:text-white text-on-surface border-outline-variant/50 hover:border-emerald-600"
                      }`}
                    >
                      {isReminded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã đặt nhắc</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-3.5 h-3.5" />
                          <span>Nhắc tôi</span>
                        </>
                      )}
                    </button>
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
