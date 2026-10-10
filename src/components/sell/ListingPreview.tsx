"use client";

import Image from "next/image";
import { X, ShieldCheck, Tag, Eye, ShoppingBag, Sparkles } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ListingPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    images: string[];
    name: string;
    category: string;
    fandom: string;
    condition: string;
    defectDescription: string;
    description: string;
    hashtags: string[];
    price: string;
    negotiable: boolean;
    quantity: number;
  };
  dict: Dictionary;
}

export function ListingPreview({
  isOpen,
  onClose,
  data,
  dict,
}: ListingPreviewProps) {
  if (!isOpen) return null;

  const t = dict.sell;

  const conditionLabels: Record<string, string> = {
    new: t.cond_new,
    likenew: t.cond_likenew,
    good: t.cond_good,
    used: t.cond_used,
  };

  const formattedPrice = data.price
    ? Number(data.price).toLocaleString("vi-VN") + "đ"
    : "0đ";

  const coverImage = data.images[0] || "/placeholder-product.png";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-outline-variant rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant flex items-center justify-between sticky top-0 bg-surface z-10">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <h3 className="text-base sm:text-lg font-bold text-on-surface">
              {t.preview}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Main Card Preview */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            {/* Image Preview */}
            <div className="relative aspect-video sm:aspect-2/1 bg-surface-container overflow-hidden">
              {data.images.length > 0 ? (
                <Image
                  src={coverImage}
                  alt={data.name || "Preview"}
                  fill
                  unoptimized
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant text-sm">
                  <ShoppingBag className="w-10 h-10 opacity-30 mb-2" />
                  <span>Chưa có hình ảnh</span>
                </div>
              )}

              {/* Badges on top */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-on-primary shadow-xs">
                  {conditionLabels[data.condition] || t.cond_new}
                </span>
                {data.fandom && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container-highest text-on-surface shadow-xs">
                    {data.fandom}
                  </span>
                )}
              </div>

              {data.images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                  +{data.images.length - 1} ảnh
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-4 sm:p-5 space-y-4">
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-on-surface leading-snug">
                  {data.name || "Chưa có tên sản phẩm"}
                </h4>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-black text-primary tracking-tight">
                    {formattedPrice}
                  </span>
                  {data.negotiable && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-secondary/10 text-secondary">
                      Thương lượng
                    </span>
                  )}
                  <span className="text-xs text-on-surface-variant ml-auto">
                    Kho: {data.quantity}
                  </span>
                </div>
              </div>

              {/* Hashtags */}
              {data.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/60">
                  {data.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Defect note if any */}
              {data.defectDescription && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-on-surface space-y-1">
                  <span className="font-bold text-amber-700 dark:text-amber-400 block">
                    Lưu ý lỗi (Defect):
                  </span>
                  <p className="whitespace-pre-line">{data.defectDescription}</p>
                </div>
              )}

              {/* Detailed Description */}
              <div className="pt-2 border-t border-outline-variant/60 space-y-2">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                  Mô tả của người bán
                </span>
                <p className="text-sm text-on-surface whitespace-pre-line leading-relaxed">
                  {data.description || "Chưa có mô tả chi tiết."}
                </p>
              </div>

              {/* Escrow note */}
              <div className="p-3 rounded-lg bg-surface-container flex items-center gap-2 text-xs text-on-surface-variant">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Giao dịch an toàn & bảo vệ người mua 100% qua trung gian GomGoods.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant bg-surface flex items-center justify-end gap-3 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-semibold border border-outline-variant hover:bg-surface-container text-on-surface transition-colors cursor-pointer"
          >
            {t.close_preview}
          </button>
        </div>
      </div>
    </div>
  );
}
