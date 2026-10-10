"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AuctionTicker() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2.5 px-4 rounded-2xl shadow-lg flex items-center border border-amber-500/30 w-full my-4">
      {/* Cụm Avatar Mèo Chủ Trì */}
      <div className="flex items-center gap-2.5 shrink-0 z-20 bg-black/50 px-3 py-1.5 rounded-xl backdrop-blur-md border border-amber-400/40 shadow-inner">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-amber-400 shadow-sm bg-white">
          <Image
            src="/Auction_img.png"
            alt="Cat Auctioneer"
            fill
            unoptimized
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-extrabold text-amber-400 tracking-wider uppercase leading-none">
            GomGoods Live
          </span>
          <span className="text-xs font-bold text-white leading-tight">
            Phòng Đấu Giá
          </span>
        </div>
      </div>

      {/* Hiệu ứng dòng chữ chạy ngang */}
      <div className="overflow-hidden whitespace-nowrap flex-1 ml-4 relative">
        <motion.div
          className="inline-block text-sm font-medium text-slate-100"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        >
          🔥 <span className="text-amber-300 font-bold">BÚA ĐẤU GIÁ ĐANG GÕ!</span> Mèo chủ trì vừa nhận mức giá <span className="text-rose-400 font-bold">130.000đ</span> cho phiên đặc biệt — ⏱️ Còn lại <span className="text-amber-400 font-bold">02 phút cuối</span> để chốt deal hàng hiếm! 🔨✨
        </motion.div>
      </div>
    </div>
  );
}
