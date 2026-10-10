"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Gavel, Clock, Flame, ArrowRight } from "lucide-react";
import type { AuctionItem } from "./AuctionCard";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface AuctionBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AuctionItem | null;
  dict: Dictionary;
  lang?: string;
}

export function AuctionBidModal({
  isOpen,
  onClose,
  item,
  dict,
  lang = "vi",
}: AuctionBidModalProps) {
  const router = useRouter();

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleStartBidding = () => {
    onClose();
    router.push(`/${lang}/auction/${item.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-surface rounded-3xl border-2 border-outline-variant shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-200">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/60 bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            <h3 className="font-bold text-base text-on-background flex items-center gap-1.5">
              <span>Sàn Đấu Giá Trực Tiếp</span>
              <Flame className="w-4 h-4 text-primary" />
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 flex flex-col items-center text-center">
          {/* Product Mini Info */}
          <div className="w-full flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/60 mb-5 text-left">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container border border-outline-variant">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-xs sm:text-sm text-on-background line-clamp-1">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-on-surface-variant font-medium">
                  {dict.auction?.current_price || "Giá hiện tại"}:
                </span>
                <span className="text-sm font-bold text-primary">
                  {item.currentPrice}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary-container/30 text-on-secondary-container text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>{item.timeLeft}</span>
            </div>
          </div>

          {/* CUTE CAT AUCTIONEER WITH PROMINENT RED BORDER AS REQUESTED */}
          <div className="w-full my-2">
            <div className="relative mx-auto rounded-2xl overflow-hidden border-4 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.35)] ring-4 ring-red-500/25 transition-transform hover:scale-[1.02] duration-300 bg-white">
              <Image
                src="/Auction_img.png"
                alt="Auctioneer Room Cat"
                width={500}
                height={260}
                unoptimized
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-on-surface-variant font-medium mt-3">
              🐾 Phiên đấu giá đang cực kỳ sôi nổi, sẵn sàng trả giá cùng các thầu thủ!
            </p>
          </div>

          {/* "BẮT ĐẦU ĐẤU GIÁ" ACTION BUTTON */}
          <button
            type="button"
            onClick={handleStartBidding}
            className="w-full mt-5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-primary via-primary-container to-primary text-white font-bold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:brightness-110 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Gavel className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            <span>Bắt đầu đấu giá</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}
