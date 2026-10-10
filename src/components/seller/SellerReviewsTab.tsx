"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ThumbsUp, MessageSquare, CheckCircle2 } from "lucide-react";
import type { SellerReviewItem, SellerProfileData } from "./seller-data";

interface SellerReviewsTabProps {
  seller: SellerProfileData;
}

export function SellerReviewsTab({ seller }: SellerReviewsTabProps) {
  const [starFilter, setStarFilter] = useState<string>("all");
  const reviews = seller.reviews;

  const filteredReviews = reviews.filter((r) => {
    if (starFilter === "photo") return !!r.photo;
    if (starFilter === "5") return r.rating === 5;
    if (starFilter === "4") return r.rating === 4;
    return true;
  });

  return (
    <div className="flex-1 w-full flex flex-col gap-5">
      {/* 1. Overall Rating Score Card */}
      <div className="bg-surface rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="flex flex-col">
            <span className="text-4xl sm:text-5xl font-black text-primary tracking-tight">
              {seller.stats.rating}
            </span>
            <div className="flex items-center text-amber-500 text-sm mt-1 gap-0.5 justify-center sm:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-on-surface-variant mt-1 font-medium">
              Dựa trên {seller.stats.reviewCount} đánh giá từ người mua
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
          <button
            type="button"
            onClick={() => setStarFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
              starFilter === "all"
                ? "bg-primary text-on-primary border-primary font-bold shadow-xs"
                : "bg-surface-container-low text-on-surface-variant border-outline-variant/50 hover:bg-surface-container"
            }`}
          >
            Tất cả ({reviews.length})
          </button>
          <button
            type="button"
            onClick={() => setStarFilter("5")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
              starFilter === "5"
                ? "bg-primary text-on-primary border-primary font-bold shadow-xs"
                : "bg-surface-container-low text-on-surface-variant border-outline-variant/50 hover:bg-surface-container"
            }`}
          >
            5 sao ({reviews.filter((r) => r.rating === 5).length})
          </button>
          <button
            type="button"
            onClick={() => setStarFilter("photo")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
              starFilter === "photo"
                ? "bg-primary text-on-primary border-primary font-bold shadow-xs"
                : "bg-surface-container-low text-on-surface-variant border-outline-variant/50 hover:bg-surface-container"
            }`}
          >
            Có hình ảnh ({reviews.filter((r) => !!r.photo).length})
          </button>
        </div>
      </div>

      {/* 2. Reviews List */}
      <div className="flex flex-col gap-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-surface rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-xs flex flex-col gap-3.5"
          >
            {/* Reviewer Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-sm text-on-surface flex-shrink-0">
                  {rev.initial}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-on-background">
                    {rev.authorName}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500 text-xs gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-on-surface-variant">
                      • {rev.timeAgo}
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã mua hàng</span>
              </span>
            </div>

            {/* Comment Body */}
            <p className="text-sm text-on-surface leading-relaxed">
              {rev.comment}
            </p>

            {/* Attached Photo */}
            {rev.photo && (
              <div className="pt-1">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-outline-variant/50 group cursor-pointer shadow-xs">
                  <Image
                    src={rev.photo}
                    alt="Ảnh feedback mở hộp thực tế"
                    fill
                    unoptimized
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            )}

            {/* Seller Reply Box */}
            <div className="mt-1 bg-surface-container-low p-3.5 rounded-xl border-l-2 border-primary text-xs flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-primary font-bold">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Phản hồi từ người bán ({seller.name}):</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Cảm ơn bạn đã tin tưởng ủng hộ shop! Chúc bạn có trải nghiệm tuyệt vời với sản phẩm và hẹn gặp lại bạn trong những đợt gom deal tới nhé!
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
