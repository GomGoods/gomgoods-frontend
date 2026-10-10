"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductComment } from "./product-detail-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProductReviewsProps {
  initialComments: ProductComment[];
  dict: Dictionary;
}

export function ProductReviews({
  initialComments,
  dict,
}: ProductReviewsProps) {
  const [comments, setComments] = useState<ProductComment[]>(initialComments);
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newComment: ProductComment = {
      id: `comment-${Date.now()}`,
      authorName: "Bạn (Wibu Collector)",
      authorAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBb2sXpa4ZU7h4ZA1JbPDD-TTFHz-k6Uowvspcd_WmQb0ZfYtPgc6UXMn1y_zPRwQj3gRSNaDEz7Ydw8W6JPsVrhaFVzDqVJuSGhEmYuUDo5LgddsAL7h_lZQg8mVZwJSu4zxCiariKKdKx6iT5ke7N_34cYwixgnKCA2oBozTr6QEKBHpmUWMcoTKPnJmgBnEvjVidye_YAxgKtpO0ENDCEtrTaS_ZKIdm8h6LuGrAcLc7ea381IrE",
      timeAgo: "Vừa xong",
      content: inputText.trim(),
    };

    setComments((prev) => [newComment, ...prev]);
    setInputText("");
  };

  return (
    <div className="bg-surface rounded-2xl p-5 sm:p-6 shadow-xs border border-outline-variant/40 flex flex-col gap-6">
      <h2 className="text-lg sm:text-xl font-bold text-on-background">
        {dict.product_detail?.comments_title || "Hỏi đáp & Bình luận"} (
        {comments.length})
      </h2>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-outline-variant bg-surface-container">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb2sXpa4ZU7h4ZA1JbPDD-TTFHz-k6Uowvspcd_WmQb0ZfYtPgc6UXMn1y_zPRwQj3gRSNaDEz7Ydw8W6JPsVrhaFVzDqVJuSGhEmYuUDo5LgddsAL7h_lZQg8mVZwJSu4zxCiariKKdKx6iT5ke7N_34cYwixgnKCA2oBozTr6QEKBHpmUWMcoTKPnJmgBnEvjVidye_YAxgKtpO0ENDCEtrTaS_ZKIdm8h6LuGrAcLc7ea381IrE"
            alt="My Avatar"
            width={40}
            height={40}
            unoptimized
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              dict.product_detail?.comment_placeholder ||
              "Bạn có thắc mắc gì về sản phẩm này?"
            }
            className="w-full h-10 px-4 rounded-xl border border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-surface-container-lowest text-xs sm:text-sm text-on-surface transition-colors"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {dict.product_detail?.send || "Gửi"}
          </button>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((c, idx) => (
          <div
            key={c.id}
            className={`flex gap-3.5 ${
              idx !== comments.length - 1
                ? "pb-4 border-b border-outline-variant/30"
                : ""
            }`}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-surface-container border border-outline-variant/40">
              <Image
                src={c.authorAvatar}
                alt={c.authorName}
                width={36}
                height={36}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs sm:text-sm font-bold text-on-background">
                  {c.authorName}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  {c.timeAgo}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {c.content}
              </p>

              {/* Threaded Seller Reply */}
              {c.sellerReply && (
                <div className="flex gap-2.5 mt-3 bg-surface-container-low p-3 rounded-xl border-l-3 border-primary">
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-surface">
                    <Image
                      src={c.sellerReply.sellerAvatar}
                      alt={c.sellerReply.sellerName}
                      width={28}
                      height={28}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs font-bold text-primary">
                        {c.sellerReply.sellerName}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {c.sellerReply.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
