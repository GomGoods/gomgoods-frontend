"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Users,
  Gift,
  Clock,
  Heart,
  Sprout,
  TreePine,
  ShieldCheck,
} from "lucide-react";
import type { CampaignItem } from "./campaign-data";

interface CampaignHeroProps {
  campaign: CampaignItem;
  onJoin: (campaign: CampaignItem) => void;
  onDonate?: (campaign: CampaignItem) => void;
}

export function CampaignHero({ campaign, onJoin, onDonate }: CampaignHeroProps) {
  // Live countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 6,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full rounded-3xl overflow-hidden shadow-md group border border-emerald-500/30 bg-surface">
      {/* Background Image with subtle zoom on hover */}
      <div className="relative w-full min-h-[380px] sm:min-h-[420px] md:min-h-[460px] overflow-hidden flex flex-col justify-between">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          unoptimized
          priority
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Emerald Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-black/50 to-black/30" />

        {/* Top Badges & Countdown */}
        <div className="relative p-4 sm:p-6 flex items-center justify-between gap-2 flex-wrap z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-emerald-400/40 backdrop-blur-md">
              <Sprout className="w-3.5 h-3.5" />
              <span>{campaign.highlightBadge || "CHIẾN DỊCH VÌ MÔI TRƯỜNG"}</span>
            </span>
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{campaign.statusText}</span>
            </span>
          </div>

          {/* Countdown Widget */}
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-emerald-400/20 text-white">
            <Clock className="w-4 h-4 text-emerald-400" />
            <div className="flex items-center gap-1 text-xs font-black">
              <span>{timeLeft.days}n</span> :
              <span>{String(timeLeft.hours).padStart(2, "0")}h</span> :
              <span>{String(timeLeft.minutes).padStart(2, "0")}p</span> :
              <span className="text-emerald-400">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="relative p-5 sm:p-7 md:p-8 flex flex-col items-start gap-4 z-10 mt-auto">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md mb-2">
              {campaign.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/95 leading-relaxed drop-shadow-sm line-clamp-3">
              {campaign.description}
            </p>
          </div>

          {/* Fundraising Progress Bar (If campaign has donation) */}
          {campaign.isDonation && (
            <div className="w-full max-w-xl p-3.5 sm:p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-emerald-400/30 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs sm:text-sm text-white font-black">
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <TreePine className="w-4 h-4" />
                  <span>Đã gây quỹ: {campaign.raisedAmount}</span>
                </span>
                <span className="text-white/80 font-semibold">
                  Mục tiêu: {campaign.targetAmount}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${campaign.raisedPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/90 font-bold">
                <span>{campaign.donorCount} lượt người quyên góp</span>
                <span className="text-emerald-300">Đạt {campaign.raisedPercent}% mục tiêu</span>
              </div>

              {campaign.ecoImpact && (
                <div className="pt-1.5 border-t border-white/10 text-[11px] text-emerald-200 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{campaign.ecoImpact}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-1 flex-wrap">
            {campaign.isDonation && onDonate && (
              <button
                type="button"
                onClick={() => onDonate(campaign)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm py-3 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current text-white" />
                <span>Quyên góp quỹ ngay</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onJoin(campaign)}
              className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm py-3 px-5 sm:px-6 rounded-xl backdrop-blur-md border border-white/30 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sprout className="w-4 h-4 text-emerald-300" />
              <span>Tham gia gom đồ cũ</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
