"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Star, MessageSquare } from "lucide-react";
import type { ProductAttribute, SellerInfo } from "./auction-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface AuctionInfoProps {
  description: string;
  attributes: ProductAttribute[];
  seller: SellerInfo;
  dict: Dictionary;
  lang?: string;
}

export function AuctionInfo({
  description,
  attributes,
  seller,
  dict,
  lang = "vi",
}: AuctionInfoProps) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Product Details Section */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex flex-col gap-5 shadow-xs">
        <h3 className="text-lg sm:text-xl font-bold text-on-surface">
          {dict.auction_detail?.product_details || "Chi tiết sản phẩm"}
        </h3>

        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          {description}
        </p>

        {/* Attribute badges grid */}
        {attributes && attributes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {attributes.map((attr, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-surface border border-outline-variant/40"
              >
                <span className="text-xs text-on-surface-variant block mb-1">
                  {attr.label}
                </span>
                <span
                  className={`text-sm font-semibold block truncate ${
                    attr.isHighlight ? "text-primary font-bold" : "text-on-surface"
                  }`}
                >
                  {attr.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seller Information Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20 bg-surface">
            <Image
              src={seller.avatarUrl}
              alt={seller.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-base sm:text-lg text-on-surface">
                {seller.name}
              </span>
              {seller.isVerified && (
                <span
                  title={dict.auction_detail?.verified_seller || "Đã xác thực"}
                  className="inline-flex items-center text-tertiary"
                >
                  <ShieldCheck className="w-5 h-5 fill-tertiary/20 text-tertiary" />
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-on-surface-variant">
              <span className="flex items-center gap-1 text-secondary font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{seller.rating}</span>
                <span className="text-on-surface-variant font-normal">
                  ({seller.reviewsCount}{" "}
                  {dict.auction_detail?.reviews || "đánh giá"})
                </span>
              </span>
              <span>•</span>
              <span>
                {seller.responseTime ||
                  dict.auction_detail?.quick_response ||
                  "Phản hồi trong vài phút"}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/${lang}/chat`}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-surface hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm border border-outline-variant/60 transition-colors flex items-center justify-center gap-2 shadow-xs active:scale-95"
        >
          <MessageSquare className="w-4 h-4 text-primary" />
          <span>{dict.auction_detail?.chat_now || "Chat ngay"}</span>
        </Link>
      </div>
    </div>
  );
}
