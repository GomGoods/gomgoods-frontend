"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Store } from "lucide-react";
import type { CartSellerGroupType } from "./cart-data";
import { CartItem } from "./CartItem";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface CartSellerGroupProps {
  group: CartSellerGroupType;
  selectedItemIds: Set<string>;
  onToggleItem: (id: string) => void;
  onToggleSeller: (sellerId: string) => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  dict: Dictionary;
  lang?: Locale;
}

export function CartSellerGroup({
  group,
  selectedItemIds,
  onToggleItem,
  onToggleSeller,
  onUpdateQuantity,
  onRemoveItem,
  dict,
  lang = "vi",
}: CartSellerGroupProps) {
  const sellerSlug = encodeURIComponent(
    group.sellerName.toLowerCase().replace(/\s+/g, "-")
  );

  const inStockItems = group.items.filter((item) => item.inStock);
  const isAllSellerSelected =
    inStockItems.length > 0 &&
    inStockItems.every((item) => selectedItemIds.has(item.id));
  const isPartiallySelected =
    inStockItems.some((item) => selectedItemIds.has(item.id)) &&
    !isAllSellerSelected;

  const isAllOutOfStock = inStockItems.length === 0;

  return (
    <div
      className={`bg-surface rounded-lg shadow-xs border border-outline-variant overflow-hidden transition-opacity ${
        isAllOutOfStock ? "opacity-75" : ""
      }`}
    >
      {/* Seller Header */}
      <div className="bg-surface-container-lowest border-b border-outline-variant px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <input
            type="checkbox"
            checked={isAllSellerSelected}
            disabled={isAllOutOfStock}
            ref={(input) => {
              if (input) {
                input.indeterminate = isPartiallySelected;
              }
            }}
            onChange={() => onToggleSeller(group.sellerId)}
            className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-surface cursor-pointer disabled:cursor-not-allowed"
            aria-label={`Select all from ${group.sellerName}`}
          />

          {/* Seller Avatar */}
          <Link
            href={`/${lang}/seller/${sellerSlug}`}
            className="relative w-7 h-7 rounded-full overflow-hidden border border-outline-variant flex-shrink-0 hover:scale-105 transition-transform"
          >
            {group.sellerAvatar ? (
              <Image
                src={group.sellerAvatar}
                alt={group.sellerName}
                fill
                sizes="28px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary-container flex items-center justify-center text-on-secondary-container text-xs font-bold">
                {group.sellerName.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>

          {/* Seller Name */}
          <Link
            href={`/${lang}/seller/${sellerSlug}`}
            className="font-semibold text-sm md:text-base text-on-surface truncate hover:text-primary transition-colors cursor-pointer"
          >
            {group.sellerName}
          </Link>

          {/* Credibility Badge */}
          {group.isTrusted && (
            <span className="bg-primary-container text-on-primary-container text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
              <ShieldCheck size={12} className="text-on-primary-container" />
              <span>{dict.cart?.trusted_badge || "Trusted"}</span>
            </span>
          )}
        </div>

        <Link
          href={`/${lang}/seller/${sellerSlug}`}
          className="text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap flex-shrink-0"
        >
          <Store size={13} />
          <span className="hidden sm:inline">
            {dict.chat?.view_profile || "Xem shop"}
          </span>
        </Link>
      </div>

      {/* Items List */}
      <div className="divide-y divide-outline-variant/50">
        {group.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            isSelected={selectedItemIds.has(item.id)}
            onToggleSelect={onToggleItem}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveItem}
            dict={dict}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
}
