"use client";

import Image from "next/image";
import { Sparkles, ArrowRightLeft, ShieldCheck, Tag } from "lucide-react";
import type { CollectionItem } from "./profile-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface CollectionGridProps {
  collections: CollectionItem[];
  dict?: Dictionary;
}

export function CollectionGrid({ collections, dict }: CollectionGridProps) {
  const p = dict?.profile;

  if (collections.length === 0) {
    return (
      <div className="bg-card border border-border/80 rounded-2xl p-10 text-center flex flex-col items-center justify-center">
        <Sparkles className="w-10 h-10 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          {p?.collection_empty || "Chưa có vật phẩm nào trong WishList của bạn."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            WishList cá nhân
          </h2>
          <p className="text-xs text-muted-foreground">
            Danh sách vật phẩm hiếm, scale figure và thẻ bài trong bộ sưu tập yêu thích của bạn
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          {collections.length} món đồ
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-3.5">
        {collections.map((item) => (
          <div
            key={item.id}
            className="group bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
          >
            <div className="relative w-full pt-[100%] bg-muted overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-black/75 text-white backdrop-blur-xs">
                  {item.rarity}
                </span>
              </div>

              <div className="absolute top-2 right-2 z-10">
                {item.status === "open_for_trade" ? (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-white shadow-xs">
                    <ArrowRightLeft className="w-2.5 h-2.5" />
                    Trade
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-600 text-white shadow-xs">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    Trưng bày
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 flex flex-col flex-1">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                <span>{item.category}</span>
                <span>{item.acquiredDate}</span>
              </div>

              <h3 className="text-xs font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              {item.estimatedValue && (
                <div className="mt-auto pt-2 border-t border-border/60 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">Giá trị ước tính:</span>
                  <span className="text-xs sm:text-sm font-extrabold text-foreground">
                    ₫{item.estimatedValue.toLocaleString("vi-VN")}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
