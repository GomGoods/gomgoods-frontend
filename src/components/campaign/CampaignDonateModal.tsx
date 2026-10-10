"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  Sprout,
  CheckCircle2,
  TreePine,
  Sparkles,
  ShieldCheck,
  Send,
} from "lucide-react";
import type { CampaignItem } from "./campaign-data";

interface CampaignDonateModalProps {
  campaign: CampaignItem | null;
  onClose: () => void;
  onDonateSuccess: (amount: number, campaignId: string) => void;
}

export function CampaignDonateModal({
  campaign,
  onClose,
  onDonateSuccess,
}: CampaignDonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [donationType, setDonationType] = useState<"money" | "item">("money");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!campaign) return null;

  const presetAmounts = [
    { value: 20000, label: "20.000đ", impact: "🌱 Trồng 1 cây non" },
    { value: 50000, label: "50.000đ", impact: "🌿 2 Cây + 1kg rác nhựa" },
    { value: 100000, label: "100.000đ", impact: "🌳 Bảo trợ góc rừng" },
    { value: 200000, label: "200.000đ", impact: "🌍 Hiệp sĩ Trái Đất" },
  ];

  const currentAmount = customAmount
    ? parseInt(customAmount.replace(/\D/g, ""), 10) || 0
    : selectedAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onDonateSuccess(currentAmount, campaign.id);
        onClose();
      }, 1600);
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

      {/* Modal Container */}
      <div className="relative z-10 bg-surface rounded-3xl shadow-2xl border border-emerald-500/30 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Green Eco Header Banner */}
        <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-emerald-900">
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            unoptimized
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/60 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-600/90 text-white uppercase tracking-wider mb-1">
              <Sprout className="w-3.5 h-3.5" />
              <span>Quyên góp vì Môi trường</span>
            </div>
            <h3 className="text-base sm:text-lg font-black truncate drop-shadow-sm">
              {campaign.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 flex flex-col items-center text-center gap-3 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-black text-on-background">
                Quyên góp thành công!
              </h4>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm leading-relaxed">
                Cảm ơn bạn đã chung tay bảo vệ môi trường cùng GomGoods! Khoản đóng góp của bạn đã được ghi nhận vào Quỹ và cộng{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">
                  +{Math.round(currentAmount / 1000)} Điểm Sống Xanh
                </strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Type Switcher: Quyên góp tiền vs Quyên góp đồ cũ */}
              <div className="grid grid-cols-2 p-1 bg-surface-container-high rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => setDonationType("money")}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    donationType === "money"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-on-surface-variant hover:text-on-background"
                  }`}
                >
                  Ủng hộ tiền quỹ
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType("item")}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    donationType === "item"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-on-surface-variant hover:text-on-background"
                  }`}
                >
                  Quyên góp đồ cũ tái chế
                </button>
              </div>

              {donationType === "money" ? (
                <>
                  {/* Preset donation amounts */}
                  <div>
                    <label className="text-xs font-bold text-on-surface block mb-2">
                      Chọn mức đóng góp:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {presetAmounts.map((p) => {
                        const isSelected =
                          !customAmount && selectedAmount === p.value;
                        return (
                          <button
                            key={p.value}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(p.value);
                              setCustomAmount("");
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-extrabold shadow-2xs"
                                : "bg-surface-container-low border-outline-variant/50 hover:border-emerald-400 text-on-surface"
                            }`}
                          >
                            <span className="block text-sm font-black">
                              {p.label}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                              {p.impact}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Amount input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">
                      Hoặc số tiền tùy tâm (VNĐ)
                    </label>
                    <input
                      type="text"
                      value={customAmount}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setCustomAmount(
                          val ? parseInt(val, 10).toLocaleString("vi-VN") : ""
                        );
                      }}
                      placeholder="Ví dụ: 300.000"
                      className="w-full h-11 px-3.5 rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-bold"
                    />
                  </div>
                </>
              ) : (
                /* Quyên góp đồ cũ */
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-500/20 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <TreePine className="w-4 h-4 text-emerald-600" />
                    <span>Quyên góp đồ cũ (Figure, Manga, Phụ kiện, Pin cũ)</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    GomGoods sẽ điều phối đơn vị vận chuyển đến nhận miễn phí tại nhà bạn hoặc bạn có thể gửi tại các trạm Gom Xanh trên toàn quốc.
                  </p>
                </div>
              )}

              {/* Donor Name & Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Tên hiển thị / Fandom của bạn
                </label>
                <input
                  type="text"
                  value={donorName}
                  disabled={isAnonymous}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder={
                    isAnonymous
                      ? "Người ủng hộ ẩn danh"
                      : "Ví dụ: Hội Mê Figure Xanh..."
                  }
                  className="w-full h-10 px-3.5 rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Lời nhắn gửi vì Trái Đất (tùy chọn)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Gửi lời chúc cho dự án rừng xanh hoặc lời nhắn đến cộng đồng..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                />
              </div>

              {/* Anonymous checkbox */}
              <label className="flex items-center gap-2 text-xs font-semibold text-on-surface cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Ủng hộ ẩn danh trên Bảng vinh danh cộng đồng</span>
              </label>

              {/* Trust badge */}
              <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-2 text-[11px] text-on-surface-variant font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% tiền quyên góp được giải ngân minh bạch & kiểm toán độc lập</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Để sau
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-70 flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current text-white" />
                  <span>
                    {isSubmitting
                      ? "Đang xử lý..."
                      : donationType === "money"
                      ? `Quyên góp ${currentAmount.toLocaleString("vi-VN")}đ`
                      : "Xác nhận quyên góp đồ cũ"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
