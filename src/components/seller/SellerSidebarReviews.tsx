"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck } from "lucide-react";
import type { SellerReviewItem } from "./seller-data";

interface SellerSidebarReviewsProps {
  reviews: SellerReviewItem[];
  sellerName: string;
}

export function SellerSidebarReviews({
  reviews,
  sellerName,
}: SellerSidebarReviewsProps) {
  return (
    <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-5">
      {/* 1. Featured Reviews Card */}
      <div className="bg-surface p-5 rounded-2xl border border-outline-variant/50 shadow-xs flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-base text-on-background">
            Đánh giá nổi bật
          </h2>
          <button
            type="button"
            onClick={() => alert(`Xem toàn bộ đánh giá của ${sellerName}`)}
            className="text-primary text-xs font-semibold hover:underline cursor-pointer"
          >
            Xem tất cả
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="border-b border-outline-variant/40 pb-4 last:border-0 last:pb-0 flex flex-col gap-2"
            >
              {/* Header: User avatar/initial + Name + 5 Stars */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-xs font-bold text-on-surface flex-shrink-0">
                  {rev.initial}
                </div>
                <span className="font-bold text-xs text-on-background truncate max-w-[120px]">
                  {rev.authorName}
                </span>

                <div className="ml-auto text-amber-500 text-[11px] flex gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>

              {/* Comment text */}
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {rev.comment}
              </p>

              {/* Optional Buyer Snapshot / Unbox Photo */}
              {rev.photo && (
                <div className="flex gap-2 pt-0.5">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-outline-variant/40 group cursor-pointer">
                    <Image
                      src={rev.photo}
                      alt="Ảnh thực tế từ người mua"
                      fill
                      unoptimized
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Trust & Safety Panel */}
      <div className="bg-surface-container-low p-4 sm:p-4.5 rounded-2xl border border-outline-variant/50 flex gap-3.5 items-start shadow-xs">
        <ShieldCheck className="w-6 h-6 text-tertiary flex-shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-xs sm:text-sm text-on-background">
            Giao dịch an toàn
          </h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Thanh toán qua hệ thống GomGoods. Tiền chỉ được chuyển cho người bán khi bạn xác nhận đã nhận đúng hàng.
          </p>
        </div>
      </div>
    </aside>
  );
}
