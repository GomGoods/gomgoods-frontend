"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface AuctionStatusProps {
  code: string;
  title: string;
  status: "live" | "upcoming" | "ended";
  currentPrice: number;
  startingPrice: number;
  minIncrement: number;
  initialTimeLeftSeconds: number;
  dict: Dictionary;
  lang?: string;
  onTimeUp?: () => void;
}

export function AuctionStatus({
  code,
  title,
  status,
  currentPrice,
  startingPrice,
  minIncrement,
  initialTimeLeftSeconds,
  dict,
  lang = "vi",
  onTimeUp,
}: AuctionStatusProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialTimeLeftSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp?.();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, onTimeUp]);

  // Format seconds to hh : mm : ss
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const pad = (num: number) => String(num).padStart(2, "0");

  const formatVND = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num) + " đ";
  };

  const isUrgent = secondsLeft > 0 && secondsLeft < 600; // < 10 mins

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb & Live Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant font-medium">
          <Link
            href={`/${lang}/marketplace`}
            className="hover:text-primary transition-colors"
          >
            {dict.auction_detail?.breadcrumb_marketplace || "Khám phá"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/60" />
          <Link
            href={`/${lang}/auction`}
            className="hover:text-primary transition-colors"
          >
            {dict.auction_detail?.breadcrumb_auctions || "Sàn Đấu Giá"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/60" />
          <span className="text-on-surface font-semibold">{code}</span>
        </nav>

        {/* Live Badge */}
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            status === "live"
              ? "bg-primary-container/20 text-primary"
              : "bg-surface-container text-on-surface-variant"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              status === "live" ? "bg-primary animate-ping" : "bg-neutral-400"
            }`}
          />
          <span>
            {status === "live"
              ? dict.auction_detail?.status_live || "Đang diễn ra"
              : status === "upcoming"
              ? dict.auction_detail?.status_upcoming || "Sắp bắt đầu"
              : dict.auction_detail?.status_ended || "Đã kết thúc"}
          </span>
        </span>
      </div>

      {/* Main Item Title */}
      <div>
        <span className="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant mb-1.5 block">
          Phiên Đấu Giá GomGoods Live
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight leading-snug">
          {title}
        </h1>
      </div>

      {/* Countdown Box */}
      <div
        className={`p-4 rounded-2xl border transition-colors flex items-center justify-between ${
          isUrgent
            ? "bg-error/10 border-error/30"
            : "bg-surface border-outline-variant/50 shadow-xs"
        }`}
      >
        <div className="flex items-center gap-2">
          <Clock
            className={`w-4 h-4 ${
              isUrgent ? "text-error animate-spin" : "text-primary"
            }`}
          />
          <span className="text-xs sm:text-sm font-semibold text-on-surface-variant">
            {dict.auction_detail?.ends_in || "Kết thúc sau"}
          </span>
        </div>

        {secondsLeft > 0 ? (
          <div
            className={`flex items-center gap-1.5 font-mono text-base sm:text-xl font-bold tracking-tight ${
              isUrgent ? "text-error animate-pulse" : "text-primary"
            }`}
          >
            <span className="px-2.5 py-1 rounded-lg bg-primary-container/20">
              {pad(hours)}h
            </span>
            <span>:</span>
            <span className="px-2.5 py-1 rounded-lg bg-primary-container/20">
              {pad(minutes)}m
            </span>
            <span>:</span>
            <span className="px-2.5 py-1 rounded-lg bg-primary-container/20">
              {pad(seconds)}s
            </span>
          </div>
        ) : (
          <span className="text-sm font-bold text-error">
            {dict.auction_detail?.status_ended || "Đã kết thúc"}
          </span>
        )}
      </div>

      {/* Price Stats Box */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-surface border border-outline-variant/50 shadow-xs">
          <span className="text-xs text-on-surface-variant block mb-1 font-medium">
            {dict.auction_detail?.current_price || "Giá hiện tại"}
          </span>
          <span className="text-xl sm:text-2xl font-black text-primary tracking-tight">
            {formatVND(currentPrice)}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-surface border border-outline-variant/50 shadow-xs">
          <span className="text-xs text-on-surface-variant block mb-1 font-medium">
            {dict.auction_detail?.starting_price || "Giá khởi điểm"}
          </span>
          <span className="text-lg sm:text-xl font-bold text-on-surface">
            {formatVND(startingPrice)}
          </span>
        </div>
      </div>

      {/* Minimum increment info */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant px-1 font-medium">
        <span>{dict.auction_detail?.min_increment || "Bước giá tối thiểu:"}</span>
        <span className="font-bold text-on-surface">
          +{formatVND(minIncrement)}
        </span>
      </div>
    </div>
  );
}
