"use client";

import type { BidHistoryItem } from "./auction-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface BidHistoryProps {
  history: BidHistoryItem[];
  dict: Dictionary;
}

export function BidHistory({ history, dict }: BidHistoryProps) {
  const formatVND = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num) + " đ";
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/60 shadow-xs flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-on-surface">
          {dict.auction_detail?.bid_history || "Lịch sử đấu giá"}
        </h3>
        <span className="px-3 py-1 rounded-full bg-surface text-xs font-semibold text-on-surface-variant border border-outline-variant/40">
          {history.length} {dict.auction_detail?.bids_count || "lượt đặt"}
        </span>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2.5 max-h-96 overflow-y-auto pr-1">
        {history.map((bid, idx) => {
          const isTop = idx === 0;
          return (
            <div
              key={bid.id}
              className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all ${
                isTop
                  ? "bg-surface border-primary/30 shadow-xs ring-1 ring-primary/10"
                  : "bg-surface/80 border-outline-variant/30 opacity-90"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                    isTop
                      ? "bg-primary-container/20 text-primary"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {bid.avatarText}
                </div>

                <div>
                  <span className="text-xs sm:text-sm font-bold text-on-surface block">
                    {bid.isYou ? "Bạn đã đặt giá" : `${bid.bidderName} đã đặt giá`}
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    {bid.timeAgo}
                  </span>
                </div>
              </div>

              <span
                className={`text-sm sm:text-base font-bold ${
                  isTop ? "text-primary" : "text-on-surface"
                }`}
              >
                {formatVND(bid.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
