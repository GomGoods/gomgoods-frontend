"use client";

import { useState } from "react";
import { Gavel, Bell, Flag, CheckCircle2 } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface BidFormProps {
  currentPrice: number;
  minIncrement: number;
  onPlaceBid: (amount: number) => boolean;
  dict: Dictionary;
  isEnded?: boolean;
  winnerName?: string;
}

export function BidForm({
  currentPrice,
  minIncrement,
  onPlaceBid,
  dict,
  isEnded = false,
  winnerName,
}: BidFormProps) {
  const [bidValue, setBidValue] = useState<number>(currentPrice + minIncrement);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const minAllowed = currentPrice + minIncrement;

  const handleQuickAdd = (increment: number) => {
    setErrorMsg(null);
    setBidValue((prev) => {
      const base = Math.max(prev, currentPrice);
      return base + increment;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const val = parseInt(e.target.value, 10);
    setBidValue(isNaN(val) ? 0 : val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bidValue < minAllowed) {
      setErrorMsg(
        `${
          dict.auction_detail?.bid_error_min ||
          "Vui lòng đặt mức giá cao hơn giá hiện tại ít nhất"
        } ${new Intl.NumberFormat("vi-VN").format(minIncrement)} đ`
      );
      return;
    }

    const success = onPlaceBid(bidValue);
    if (success) {
      setIsSuccess(true);
      setErrorMsg(null);
      // Next bid suggestion
      setBidValue(bidValue + minIncrement);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  if (isEnded) {
    return (
      <div className="flex flex-col gap-3 p-5 rounded-2xl bg-surface border border-outline-variant/60 text-center animate-in fade-in">
        <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-500 mx-auto flex items-center justify-center text-xl">
          🏆
        </div>
        <div>
          <h3 className="text-base font-bold text-on-surface">
            Phiên đấu giá đã kết thúc!
          </h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Người chiến thắng: <strong className="text-primary font-bold">{winnerName || "Chưa có lượt bid"}</strong>
          </p>
          <div className="mt-2 text-lg font-black text-on-surface">
            {new Intl.NumberFormat("vi-VN").format(currentPrice)} đ
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Quick Increment Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleQuickAdd(20000)}
          className="flex-1 py-2 px-3 rounded-xl bg-surface hover:bg-surface-container border border-outline-variant/60 font-semibold text-xs text-on-surface transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          +20k
        </button>
        <button
          type="button"
          onClick={() => handleQuickAdd(50000)}
          className="flex-1 py-2 px-3 rounded-xl bg-surface hover:bg-surface-container border border-outline-variant/60 font-semibold text-xs text-on-surface transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          +50k
        </button>
        <button
          type="button"
          onClick={() => handleQuickAdd(100000)}
          className="flex-1 py-2 px-3 rounded-xl bg-surface hover:bg-surface-container border border-outline-variant/60 font-semibold text-xs text-on-surface transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          +100k
        </button>
      </div>

      {/* Input Field */}
      <div className="relative flex items-center">
        <input
          type="number"
          step={minIncrement}
          min={minAllowed}
          value={bidValue || ""}
          onChange={handleInputChange}
          className="w-full bg-surface px-4 py-3.5 rounded-2xl border-2 border-outline-variant/80 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-xl font-bold text-on-surface pl-10 shadow-inner"
        />
        <span className="absolute left-4 text-on-surface-variant font-bold text-base select-none">
          đ
        </span>
      </div>

      {/* Error / Success Feedback */}
      {errorMsg && (
        <p className="text-xs text-error font-medium px-1 animate-in fade-in">
          {errorMsg}
        </p>
      )}

      {isSuccess && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold px-1 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>
            {dict.auction_detail?.bid_success || "Đặt giá thầu thành công!"}
          </span>
        </div>
      )}

      {/* Main Place Bid CTA Button */}
      <button
        type="submit"
        className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-container text-white font-bold text-base sm:text-lg transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
      >
        <Gavel className="w-5 h-5" />
        <span>{dict.auction_detail?.place_bid || "Đặt giá thầu (Place Bid)"}</span>
      </button>

      {/* Secondary utility actions */}
      <div className="flex items-center justify-center gap-5 pt-1 text-xs text-on-surface-variant font-medium">
        <button
          type="button"
          onClick={() => setIsFollowing(!isFollowing)}
          className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
            isFollowing ? "text-primary font-bold" : "hover:text-primary"
          }`}
        >
          <Bell
            className={`w-3.5 h-3.5 ${isFollowing ? "fill-primary" : ""}`}
          />
          <span>
            {isFollowing
              ? "Đang theo dõi"
              : dict.auction_detail?.follow_auction || "Theo dõi phiên"}
          </span>
        </button>

        <span>•</span>

        <button
          type="button"
          onClick={() => alert("Cảm ơn bạn đã gửi báo cáo. Ban quản trị sẽ kiểm tra phiên đấu giá này.")}
          className="flex items-center gap-1.5 text-error/80 hover:text-error transition-colors cursor-pointer"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>{dict.auction_detail?.report || "Báo cáo vi phạm"}</span>
        </button>
      </div>
    </form>
  );
}
