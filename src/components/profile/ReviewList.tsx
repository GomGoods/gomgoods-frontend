"use client";

import Image from "next/image";
import { Star, ThumbsUp, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { ProfileReview } from "./profile-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ReviewListProps {
  reviews: ProfileReview[];
  dict?: Dictionary;
}

export function ReviewList({ reviews, dict }: ReviewListProps) {
  const p = dict?.profile;

  return (
    <div className="flex flex-col gap-5">
      {/* Overall Score Banner */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl sm:text-5xl font-black text-foreground">
            5.0
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Dựa trên {reviews.length} đánh giá xác thực từ cộng đồng GomGoods
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs sm:text-sm border-t sm:border-t-0 sm:border-l border-border/80 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-around sm:justify-start">
          <div className="text-center">
            <div className="font-extrabold text-foreground text-base sm:text-lg">
              100%
            </div>
            <span className="text-muted-foreground text-xs">
              {p?.reviews_positive || "Phản hồi tích cực"}
            </span>
          </div>
          <div className="text-center">
            <div className="font-extrabold text-foreground text-base sm:text-lg">
              {"< 15 phút"}
            </div>
            <span className="text-muted-foreground text-xs">Tốc độ phản hồi</span>
          </div>
          <div className="text-center">
            <div className="font-extrabold text-foreground text-base sm:text-lg">
              100%
            </div>
            <span className="text-muted-foreground text-xs">Đóng gói an toàn</span>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="flex flex-col gap-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted border border-border shrink-0">
                  <Image
                    src={rev.authorAvatar}
                    alt={rev.authorName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-foreground">
                      {rev.authorName}
                    </h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {rev.role === "buyer" ? "Người mua" : "Người bán"}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {rev.date}
                  </span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <p className="text-xs sm:text-sm text-foreground leading-relaxed">
              {rev.comment}
            </p>

            {/* Verified Item */}
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-lg w-fit">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Giao dịch thành công:</span>
              <strong className="text-foreground truncate max-w-[280px]">
                {rev.itemTitle}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
