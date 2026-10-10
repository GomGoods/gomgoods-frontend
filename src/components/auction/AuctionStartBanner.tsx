"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface AuctionBannerProps {
  productName?: string;
  startPrice?: string;
  onComplete?: () => void;
}

export function AuctionStartBanner({
  productName = "Figure Hatsune Miku 1/7 Scale",
  startPrice = "500.000đ",
  onComplete,
}: AuctionBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Tự động chuyển trang / hoàn tất sau 3.2 giây (theo nhịp animation)
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-[3px] transition-opacity cursor-pointer select-none"
    >
      {/* Khung dải băng xoẹt ngang */}
      <div className="relative w-full max-w-5xl px-4 animate-auction-slash pointer-events-auto">
        {/* Hình mascot mèo vượt khung (3D pop-out) */}
        <div className="absolute -top-20 sm:-top-24 left-6 sm:left-12 md:left-16 z-20 w-40 sm:w-48 md:w-56 drop-shadow-[0_14px_28px_rgba(0,0,0,0.5)] animate-bounce-short pointer-events-none">
          <Image
            src="/Auction_img.png"
            alt="Đấu giá GomGoods"
            width={300}
            height={200}
            unoptimized
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Dải ruy băng chính vát chéo phong cách Anime / Comic */}
        <div className="relative transform -skew-x-12 bg-gradient-to-r from-red-600 via-brand-coral to-amber-500 border-y-4 border-yellow-300 shadow-[0_0_50px_rgba(235,87,87,0.5)] py-5 px-6 sm:px-8 md:px-14 overflow-hidden rounded-xs">
          {/* Vệt sáng chạy lướt qua (Shimmer effect) */}
          <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none" />

          {/* Nội dung chữ */}
          <div className="transform skew-x-12 ml-28 sm:ml-36 md:ml-48 text-white">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-300 text-black text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded tracking-wider shadow-xs">
                Live Auction
              </span>
              <span className="text-yellow-200 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                GomGoods Arena
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-4xl font-black italic tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] my-0.5 sm:my-1">
              PHIÊN ĐẤU GIÁ BẮT ĐẦU!
            </h2>

            <p className="text-xs sm:text-sm md:text-base font-medium text-amber-100 truncate max-w-xs sm:max-w-md md:max-w-lg">
              Vật phẩm: <span className="text-white font-bold">{productName}</span> • Khởi điểm: <span className="text-yellow-300 font-bold">{startPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionStartBanner;
