"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Minus, Plus, Store, Trash2 } from "lucide-react";
import type { CheckoutSellerGroupType } from "./checkout-data";
import { formatVND } from "./checkout-data";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface CheckoutItemsProps {
  groups: CheckoutSellerGroupType[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  dict: Dictionary;
  lang?: Locale;
}

export function CheckoutItems({
  groups,
  onUpdateQuantity,
  onRemoveItem,
  dict,
  lang = "vi",
}: CheckoutItemsProps) {
  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => {
        const sellerSlug = encodeURIComponent(
          group.sellerName.toLowerCase().replace(/\s+/g, "-")
        );

        return (
          <section
            key={group.sellerId}
            className="bg-surface rounded-lg p-4 shadow-xs border border-outline-variant"
          >
            {/* Seller Header */}
            <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-outline-variant/60">
              <Store size={18} className="text-secondary" />
              <Link
                href={`/${lang}/seller/${sellerSlug}`}
                className="font-bold text-xs md:text-sm text-on-background hover:text-primary transition-colors truncate"
              >
                {group.sellerName}
              </Link>
              <Link
                href={`/${lang}/chat`}
                className="ml-auto text-primary border border-primary px-3 py-1 rounded text-xs font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1 active:scale-95"
              >
                <MessageCircle size={14} />
                <span>{dict.checkout?.chat_with_seller || "Chat"}</span>
              </Link>
            </div>

            {/* Item Rows */}
            <div className="flex flex-col divide-y divide-outline-variant/40">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-md border border-outline-variant overflow-hidden bg-surface-variant">
                    <Link href={`/${lang}/product/${item.productId}`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-h-[80px] w-full min-w-0">
                    <div>
                      <Link
                        href={`/${lang}/product/${item.productId}`}
                        className="font-semibold text-xs md:text-sm text-on-background hover:text-primary transition-colors line-clamp-2 leading-snug"
                      >
                        {item.title}
                      </Link>
                      {item.variant && (
                        <p className="text-[11px] md:text-xs text-on-surface-variant mt-1">
                          {dict.cart?.variant_label || "Phân loại"}:{" "}
                          {item.variant}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-outline-variant/30 sm:border-0 sm:pt-0">
                      <span className="text-sm md:text-base font-bold text-primary">
                        {formatVND(item.price)}
                      </span>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-outline-variant rounded-md overflow-hidden bg-surface-container-lowest h-7 sm:h-8">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="px-2 hover:bg-surface-container transition-colors flex items-center justify-center text-on-surface-variant disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <div className="w-8 text-center text-xs font-semibold border-x border-outline-variant flex items-center justify-center h-full select-none text-on-surface">
                            {item.quantity}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 hover:bg-surface-container transition-colors flex items-center justify-center text-on-surface-variant"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors p-1"
                          title="Xóa món này"
                        >
                          <Trash2 size={16} />
                          <span className="text-xs hidden sm:inline">Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
