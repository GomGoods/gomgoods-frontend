"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Sparkles, Gift, CheckCircle2, Award, Sprout } from "lucide-react";
import type { CampaignItem } from "./campaign-data";

interface CampaignJoinModalProps {
  campaign: CampaignItem | null;
  onClose: () => void;
  onSuccess: (campaign: CampaignItem) => void;
}

export function CampaignJoinModal({
  campaign,
  onClose,
  onSuccess,
}: CampaignJoinModalProps) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!campaign) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess(campaign);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-surface rounded-3xl shadow-2xl border border-emerald-500/30 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header with image */}
        <div className="relative h-36 w-full overflow-hidden bg-emerald-950">
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            unoptimized
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[11px] font-black px-2 py-0.5 rounded bg-emerald-600 text-white uppercase tracking-wider flex items-center gap-1 w-fit">
              <Sprout className="w-3 h-3" />
              <span>{campaign.categoryName}</span>
            </span>
            <h3 className="text-lg font-black mt-1 truncate drop-shadow-sm">
              {campaign.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {isSuccess ? (
            <div className="py-8 flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-on-background">
                Tham gia thành công!
              </h4>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-xs">
                Bạn đã được cộng <strong className="text-emerald-600 dark:text-emerald-400">+25 Điểm Sống Xanh</strong> và nhận thông báo khi có diễn biến mới!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Rewards highlight */}
              {campaign.rewards && (
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-500/25 flex items-center gap-3">
                  <Gift className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-extrabold uppercase text-emerald-700 dark:text-emerald-400">
                      Phần thưởng chiến dịch
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-on-background">
                      {campaign.rewards}
                    </span>
                  </div>
                </div>
              )}

              {/* Input details */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Biệt danh / Tên hiển thị tham gia
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên hoặc nickname của bạn..."
                  className="w-full h-11 px-3.5 rounded-xl border border-outline-variant bg-surface-container-low text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant flex items-center gap-2 border border-outline-variant/30">
                <Sprout className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Nhận ngay <strong>+25 Điểm Sống Xanh</strong> tích lũy vào hồ sơ</span>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Để sau
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-70 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? "Đang xử lý..." : "Xác nhận tham gia"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
