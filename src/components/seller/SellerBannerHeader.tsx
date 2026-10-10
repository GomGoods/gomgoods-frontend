"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Award,
  UserPlus,
  UserCheck,
  MessageSquare,
  Star,
  FileText,
  Edit3,
  Check,
  Flag,
} from "lucide-react";
import type { SellerProfileData } from "./seller-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface SellerBannerHeaderProps {
  seller: SellerProfileData;
  dict?: Dictionary;
  lang?: string;
  isOwner?: boolean;
}

export function SellerBannerHeader({
  seller,
  dict,
  lang = "vi",
  isOwner: isOwnerProp,
}: SellerBannerHeaderProps) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditingRules, setIsEditingRules] = useState(false);
  const [isOwner, setIsOwner] = useState(isOwnerProp ?? false);
  const [avatarSrc, setAvatarSrc] = useState(
    seller.avatar ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop"
  );
  const [rulesText, setRulesText] = useState(
    seller.rules ||
      seller.bio ||
      "Khách vui lòng quay video unbox khi nhận hàng để được giải quyết khiếu nại. Ship COD toàn quốc khi cọc trước phí ship. Hỗ trợ thanh toán an toàn qua GomGoods."
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const isOwnerParam =
        params.get("owner") === "true" || params.get("isOwner") === "true";
      const loggedSeller = localStorage.getItem("gomgoods_logged_in_seller");
      if (isOwnerProp !== undefined) {
        setIsOwner(isOwnerProp);
      } else if (isOwnerParam || loggedSeller === seller.id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [seller.id, isOwnerProp]);

  const handleToggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  const handleChat = () => {
    router.push(`/${lang || "vi"}/chat?seller=${encodeURIComponent(seller.name)}`);
  };

  return (
    <section className="bg-surface rounded-2xl shadow-sm border border-outline-variant/50 overflow-hidden mb-6">
      {/* 1. Cover Image */}
      <div className="h-32 sm:h-40 md:h-48 w-full bg-surface-container-high relative overflow-hidden">
        <Image
          src={seller.coverImage}
          alt={`${seller.name} Cover`}
          fill
          unoptimized
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />


        {/* Online Status Pill */}
        {seller.isOnline && (
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm text-on-background border border-outline-variant/30">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Đang trực tuyến</span>
          </div>
        )}
      </div>

      {/* 2. Profile Details Area */}
      <div className="px-5 sm:px-6 pb-6 relative">
        <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start">
          {/* Avatar (Overlapping Cover - Clean without Pro badge) */}
          <div className="-mt-12 sm:-mt-14 md:-mt-16 shrink-0 relative">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl border-4 border-surface overflow-hidden shadow-md bg-surface">
              <Image
                src={avatarSrc}
                alt={seller.name}
                fill
                unoptimized
                onError={() =>
                  setAvatarSrc(
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop"
                  )
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Core */}
          <div className="flex-1 pt-1 sm:pt-2 md:pt-4 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
              <div>
                <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-on-background tracking-tight">
                    {seller.name}
                  </h1>

                  {/* Danh hiệu của người bán */}
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-400/40 shadow-2xs"
                    title="Danh hiệu của người bán"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
                    <span>
                      {seller.title ||
                        (seller.isStore
                          ? "Gian Hàng Uy Tín 5★"
                          : "Chiến Thần Thanh Lý 🌟")}
                    </span>
                  </span>

                  {seller.isStore && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
                      Store Seller
                    </span>
                  )}
                </div>

                <div className="text-on-surface-variant text-xs sm:text-sm mt-1.5 flex items-center gap-3 sm:gap-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{seller.location}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-on-surface-variant/80 flex-shrink-0" />
                    <span>{seller.joinedDate}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons: Theo dõi + Chat ngay (hoặc Tài khoản của bạn khi đăng nhập) */}
              <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto">
                {isOwner ? (
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="px-3 py-2 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Tài khoản của bạn
                    </span>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleToggleFollow}
                      className={`flex-1 md:flex-none h-10 px-5 sm:px-6 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 shadow-xs cursor-pointer ${
                        isFollowing
                          ? "bg-surface-container-high text-on-surface border border-outline-variant hover:bg-surface-container-highest"
                          : "bg-primary text-on-primary hover:bg-primary/90"
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          <span>Đang theo dõi</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          <span>Theo dõi</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleChat}
                      className="flex-1 md:flex-none h-10 px-5 sm:px-6 rounded-full border border-secondary text-secondary hover:bg-secondary-container/30 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat ngay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const reason = window.prompt(`Nhập lý do tố cáo người bán "${seller.name}" (hàng giả, lừa đảo, thái độ tiêu cực...):`);
                        if (reason !== null && reason.trim()) {
                          alert(`Cảm ơn bạn! Khiếu nại / Tố cáo đối với người bán "${seller.name}" đã được gửi tới Ban quản trị GomGoods để xử lý.`);
                        }
                      }}
                      className="flex-none h-10 px-4 rounded-full border border-destructive/40 text-destructive hover:bg-destructive/10 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 cursor-pointer shadow-xs"
                      title="Tố cáo người bán"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>Tố cáo</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Seller Rules / Quy định mua bán từ seller (cho phép seller điền / sửa khi đăng nhập acc mình) */}
            <div className="mt-3.5 p-3.5 sm:p-4 bg-surface-container-low/90 rounded-xl border border-outline-variant/40">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-primary">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Quy định & Lưu ý từ người bán</span>
                </div>
                {/* Chỉ xuất hiện khi seller đăng nhập vào acc của mình */}
                {isOwner && !isEditingRules && (
                  <button
                    type="button"
                    onClick={() => setIsEditingRules(true)}
                    className="text-[11px] font-bold text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-surface-container-highest cursor-pointer"
                    title="Chỉnh sửa quy định giao dịch của bạn"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Điền / Sửa quy định</span>
                  </button>
                )}
              </div>

              {isOwner && isEditingRules ? (
                <div className="flex flex-col gap-2 mt-2">
                  <textarea
                    value={rulesText}
                    onChange={(e) => setRulesText(e.target.value)}
                    placeholder="Nhập quy định mua bán, điều kiện đổi trả, cọc hàng hoặc ship COD của shop bạn..."
                    rows={3}
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-primary/40 bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 leading-relaxed resize-none"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRulesText(seller.rules || seller.bio);
                        setIsEditingRules(false);
                      }}
                      className="px-3 py-1 text-xs font-semibold rounded-md border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingRules(false)}
                      className="px-3.5 py-1 text-xs font-bold rounded-md bg-primary text-on-primary hover:bg-primary/90 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Lưu quy định</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-on-surface leading-relaxed whitespace-pre-line">
                  {rulesText || "Người bán chưa thiết lập quy định giao dịch riêng."}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 3. Stats Bar (4 Columns) */}
        <div className="mt-5 pt-5 border-t border-outline-variant/40 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Rating */}
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-primary">
              {seller.stats.rating}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              Đánh giá ({seller.stats.reviewCount})
            </span>
            <div className="flex items-center justify-center text-amber-500 text-xs mt-1 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </div>

          {/* Sold */}
          <div className="flex flex-col border-l border-outline-variant/40">
            <span className="text-xl sm:text-2xl font-black text-on-background">
              {seller.stats.soldCount}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              Đã thanh lý
            </span>
          </div>

          {/* Followers */}
          <div className="flex flex-col border-l-0 md:border-l border-outline-variant/40 pt-3 md:pt-0 border-t md:border-t-0 mt-3 md:mt-0">
            <span className="text-xl sm:text-2xl font-black text-on-background">
              {seller.stats.followersCount}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              Người theo dõi
            </span>
          </div>

          {/* Response Rate */}
          <div className="flex flex-col border-l border-outline-variant/40 pt-3 md:pt-0 border-t md:border-t-0 mt-3 md:mt-0">
            <span className="text-xl sm:text-2xl font-black text-tertiary">
              {seller.stats.responseRate}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              Phản hồi ({seller.stats.responseTime})
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
