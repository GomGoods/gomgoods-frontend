"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Star,
  MapPin,
  Clock,
  MessageSquare,
  Heart,
  ShoppingBag,
} from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface SellerInfoProps {
  seller: {
    name: string;
    avatar: string;
    isOnline: boolean;
    isGoldSeller: boolean;
    memberSince: string;
    location: string;
    onlineStatus: string;
    rating: number;
    soldCount: number;
    activeCount: number;
  };
  productTitle: string;
  productPrice: string;
  dict: Dictionary;
  lang?: string;
}

export function SellerInfo({
  seller,
  productTitle,
  productPrice,
  dict,
  lang = "vi",
}: SellerInfoProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const handleBuyNow = () => {
    setIsBuying(true);
    setTimeout(() => {
      setIsBuying(false);
      alert(
        `Đã thêm "${productTitle}" vào đơn hàng với giá ${productPrice}. Tiến hành thanh toán!`
      );
    }, 400);
  };

  return (
    <div className="bg-surface rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/50 flex flex-col gap-5">
      {/* Seller Header */}
      <div className="flex items-start gap-3.5">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-secondary-container p-0.5 flex-shrink-0 bg-surface">
          <Image
            src={seller.avatar}
            alt={seller.name}
            fill
            unoptimized
            className="w-full h-full object-cover rounded-full"
          />
          {seller.isOnline && (
            <span
              title="Đang hoạt động"
              className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full z-10"
            />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-on-background flex items-center gap-1.5 truncate">
            <span>{seller.name}</span>
            {seller.isGoldSeller && (
              <span
                title="Gold Seller"
                className="inline-flex items-center text-secondary"
              >
                <Award className="w-4 h-4 text-amber-500 fill-amber-400" />
              </span>
            )}
          </h3>

          <span className="text-xs text-on-surface-variant mb-1">
            {dict.product_detail?.seller_member_since || "Thành viên từ"}{" "}
            {seller.memberSince}
          </span>

          <div className="flex items-center gap-1 text-on-surface-variant text-[11px]">
            <MapPin className="w-3 h-3 text-on-surface-variant" />
            <span>{seller.location}</span>
          </div>

          <div className="flex items-center gap-1 text-on-surface-variant text-[11px] mt-0.5">
            <Clock className="w-3 h-3 text-on-surface-variant" />
            <span>{seller.onlineStatus}</span>
          </div>
        </div>
      </div>

      {/* 3 Metrics: Rating, Sold, Active */}
      <div className="grid grid-cols-3 gap-2 border-y border-outline-variant/30 py-3 text-center">
        <div className="flex flex-col items-center">
          <span className="font-bold text-base text-on-background flex items-center gap-0.5">
            <span>{seller.rating}</span>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          </span>
          <span className="text-[10px] text-on-surface-variant mt-0.5">
            {dict.product_detail?.rating || "Đánh giá"}
          </span>
        </div>

        <div className="flex flex-col items-center border-x border-outline-variant/30">
          <span className="font-bold text-base text-on-background">
            {seller.soldCount}
          </span>
          <span className="text-[10px] text-on-surface-variant mt-0.5">
            {dict.product_detail?.sold || "Đã bán"}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-bold text-base text-on-background">
            {seller.activeCount}
          </span>
          <span className="text-[10px] text-on-surface-variant mt-0.5">
            {dict.product_detail?.active_listings || "Đang bán"}
          </span>
        </div>
      </div>

      {/* Desktop Interaction Buttons */}
      <div className="hidden lg:flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={isBuying}
          className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{dict.product_detail?.buy_now || "Mua ngay"}</span>
        </button>

        <div className="flex gap-2.5">
          <Link
            href={`/${lang}/chat`}
            className="w-1/2 bg-surface hover:bg-secondary-container hover:text-on-secondary-container text-secondary border border-secondary py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors duration-200 flex items-center justify-center gap-1.5 shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{dict.product_detail?.chat || "Chat"}</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className={`w-1/2 bg-surface border py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
              isSaved
                ? "border-primary text-primary bg-primary/5"
                : "border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                isSaved ? "fill-primary text-primary" : ""
              }`}
            />
            <span>
              {isSaved
                ? dict.product_detail?.saved || "Đã lưu"
                : dict.product_detail?.save || "Lưu"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
