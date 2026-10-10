"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItemType } from "./cart-data";
import { formatVND } from "./cart-data";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemove: (id: string) => void;
  dict: Dictionary;
  lang?: Locale;
}

export function CartItem({
  item,
  isSelected,
  onToggleSelect,
  onUpdateQuantity,
  onRemove,
  dict,
  lang = "vi",
}: CartItemProps) {
  const isOutOfStock = !item.inStock;

  return (
    <div
      className={`p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center relative group transition-colors hover:bg-surface-container-low/40 ${
        isOutOfStock ? "opacity-75" : ""
      }`}
    >
      {/* Desktop Checkbox */}
      <div className="hidden sm:flex items-center">
        <input
          type="checkbox"
          checked={isSelected && !isOutOfStock}
          disabled={isOutOfStock}
          onChange={() => onToggleSelect(item.id)}
          className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-surface cursor-pointer disabled:cursor-not-allowed"
          aria-label={item.title}
        />
      </div>

      {/* Product Image & Mobile Checkbox Wrapper */}
      <div className="relative w-full sm:w-24 h-24 flex-shrink-0 rounded-md border border-outline-variant overflow-hidden bg-surface-variant flex items-center justify-center">
        {/* Mobile Checkbox (Absolute Over Image) */}
        <div className="absolute top-2 left-2 sm:hidden z-10 bg-surface/80 rounded backdrop-blur-sm p-1">
          <input
            type="checkbox"
            checked={isSelected && !isOutOfStock}
            disabled={isOutOfStock}
            onChange={() => onToggleSelect(item.id)}
            className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-surface cursor-pointer disabled:cursor-not-allowed"
            aria-label={item.title}
          />
        </div>

        <Link
          href={`/${lang}/product/${item.productId}`}
          className="w-full h-full relative block"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, 96px"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <Link
          href={`/${lang}/product/${item.productId}`}
          className="text-sm md:text-base font-semibold text-on-surface truncate group-hover:text-primary transition-colors cursor-pointer"
        >
          {item.title}
        </Link>

        {item.variant && (
          <p className="text-xs text-on-surface-variant truncate">
            {dict.cart?.variant_label || "Phân loại"}: {item.variant}
          </p>
        )}

        {isOutOfStock && (
          <span className="inline-flex items-center text-[11px] font-semibold text-error mt-0.5">
            {dict.cart?.out_of_stock || "Tạm hết hàng"}
          </span>
        )}

        {/* Mobile Price & Controls */}
        <div className="flex sm:hidden items-center justify-between mt-2 pt-2 border-t border-outline-variant/40">
          <span className="text-base font-bold text-foreground">
            {formatVND(item.price)}
          </span>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center border border-outline-variant rounded-md overflow-hidden bg-surface ${
                isOutOfStock ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1 || isOutOfStock}
                className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 h-7 flex items-center justify-center text-xs font-semibold text-on-surface select-none">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                disabled={
                  isOutOfStock ||
                  (item.maxQuantity !== undefined &&
                    item.quantity >= item.maxQuantity)
                }
                className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-40"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="text-on-surface-variant hover:text-error transition-colors p-1"
              title={dict.cart?.delete_item || "Xóa sản phẩm"}
              aria-label={dict.cart?.delete_item || "Xóa sản phẩm"}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Price & Controls */}
      <div className="hidden sm:flex items-center gap-6">
        <span className="text-base md:text-lg font-bold text-foreground whitespace-nowrap w-32 text-right">
          {formatVND(item.price)}
        </span>

        <div
          className={`flex items-center border border-outline-variant rounded-md overflow-hidden bg-surface ${
            isOutOfStock ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1 || isOutOfStock}
            className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 h-8 flex items-center justify-center text-sm font-semibold text-on-surface select-none">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            disabled={
              isOutOfStock ||
              (item.maxQuantity !== undefined &&
                item.quantity >= item.maxQuantity)
            }
            className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-40"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="text-on-surface-variant hover:text-error transition-colors p-2 rounded-full hover:bg-error-container/20"
          title={dict.cart?.delete_item || "Xóa sản phẩm"}
          aria-label={dict.cart?.delete_item || "Xóa sản phẩm"}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
