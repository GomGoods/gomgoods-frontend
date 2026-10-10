"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { CartSellerGroup } from "./CartSellerGroup";
import { CartSummary } from "./CartSummary";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { useCart } from "@/context/CartContext";

interface CartViewProps {
  dict: Dictionary;
  lang: Locale;
}

export function CartView({ dict, lang }: CartViewProps) {
  const {
    groups,
    selectedItemIds,
    totalItemCount,
    selectedCount,
    subtotal,
    shippingFee,
    discountAmount,
    appliedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleSelectItem,
    toggleSelectSeller,
    toggleSelectAll,
    isAllSelected,
    isPartiallySelected,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const handleRemoveSelected = () => {
    if (selectedItemIds.length === 0) return;
    clearCart(selectedItemIds);
  };

  const selectedSet = useMemo(() => new Set(selectedItemIds), [selectedItemIds]);

  const allAvailableCount = useMemo(() => {
    return groups.flatMap((g) => g.items).filter((i) => i.inStock).length;
  }, [groups]);

  // Empty Cart State
  if (totalItemCount === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant mb-4 border border-outline-variant">
          <ShoppingBag size={36} className="text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-on-surface mb-2">
          {dict.cart?.empty_title || "Giỏ hàng của bạn đang trống"}
        </h2>
        <p className="text-sm text-on-surface-variant max-w-md mb-6 leading-relaxed">
          {dict.cart?.empty_desc ||
            "Hãy khám phá hàng ngàn mô hình, thẻ bài và phụ kiện fandom độc đáo trên GomGoods."}
        </p>
        <Link
          href={`/${lang}/marketplace`}
          className="px-6 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-bold text-sm rounded-lg shadow-sm active:scale-95 transition-all"
        >
          {dict.cart?.explore_btn || "Khám phá ngay"}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Page Title */}
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-on-background tracking-tight">
          {dict.cart?.title || "Giỏ hàng"}
        </h1>
        <span className="text-sm text-on-surface-variant">
          ({totalItemCount} {dict.cart?.items_count || "sản phẩm"})
        </span>
      </div>

      {/* Main 2-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Cart Content Area (Left) */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Select All Control Bar */}
          <div className="bg-surface rounded-lg shadow-xs border border-outline-variant px-4 py-3.5 flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = isPartiallySelected;
                  }
                }}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-surface cursor-pointer"
              />
              <span className="text-sm md:text-base font-medium text-on-surface group-hover:text-primary transition-colors">
                {dict.cart?.select_all || "Chọn tất cả"} ({allAvailableCount}{" "}
                {dict.cart?.items_count || "sản phẩm"})
              </span>
            </label>

            <button
              type="button"
              onClick={handleRemoveSelected}
              disabled={selectedItemIds.length === 0}
              className="text-xs md:text-sm text-error hover:text-on-error-container font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Trash2 size={16} />
              <span>{dict.cart?.delete_selected || "Xóa đã chọn"}</span>
            </button>
          </div>

          {/* Seller Groups */}
          <div className="flex flex-col gap-4">
            {groups.map((group) => (
              <CartSellerGroup
                key={group.sellerId}
                group={group}
                selectedItemIds={selectedSet}
                onToggleItem={toggleSelectItem}
                onToggleSeller={toggleSelectSeller}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                dict={dict}
                lang={lang}
              />
            ))}
          </div>

          {/* Suggested Add-ons for Fandom Collectibles */}
          <div className="bg-surface rounded-xl shadow-xs border border-outline-variant p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  Phụ kiện bảo vệ Goods mua kèm (Gợi ý)
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Bảo vệ tối đa photocard, figure và vật phẩm sưu tầm khi vận chuyển
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary-container text-on-primary-container">
                Fandom Essentials
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: "addon-1",
                  name: "Toploader Ultra Pro Chống Xước (Set 5 cái)",
                  price: 45000,
                  image:
                    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=150&auto=format&fit=crop&q=80",
                  tag: "Bán chạy nhất",
                },
                {
                  id: "addon-2",
                  name: "Pack 50 Túi Bọc Sleeve Hologram Ánh Sao",
                  price: 35000,
                  image:
                    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop&q=80",
                  tag: "K-Pop Must Have",
                },
                {
                  id: "addon-3",
                  name: "Hộp Mica Trong Suốt Trưng Bày Blindbox / Nendoroid",
                  price: 75000,
                  image:
                    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop&q=80",
                  tag: "Chống bụi",
                },
                {
                  id: "addon-4",
                  name: "Set Bìa Carton Lạnh & Xốp Khí Gói Hàng Chuẩn Nhựa",
                  price: 15000,
                  image:
                    "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=150&auto=format&fit=crop&q=80",
                  tag: "An toàn 100%",
                },
              ].map((addon) => (
                <div
                  key={addon.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant/50 bg-surface-container-low/30 hover:border-primary/40 transition-all"
                >
                  <img
                    src={addon.image}
                    alt={addon.name}
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-primary block">
                      {addon.tag}
                    </span>
                    <h4 className="text-xs font-semibold text-on-surface truncate">
                      {addon.name}
                    </h4>
                    <span className="text-xs font-bold text-on-surface mt-0.5 block">
                      {addon.price.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (groups.length > 0) {
                        addToCart({
                          item: {
                            id: `${addon.id}-${Date.now()}`,
                            productId: addon.id,
                            title: addon.name,
                            price: addon.price,
                            image: addon.image,
                            quantity: 1,
                            inStock: true,
                          },
                          seller: {
                            sellerId: groups[0].sellerId,
                            sellerName: groups[0].sellerName,
                            sellerAvatar: groups[0].sellerAvatar,
                            isTrusted: groups[0].isTrusted,
                          },
                        });
                      }
                    }}
                    className="px-2.5 py-1.5 rounded bg-surface border border-outline-variant hover:bg-primary hover:text-on-primary hover:border-primary text-xs font-semibold transition-all whitespace-nowrap shadow-2xs cursor-pointer"
                  >
                    + Thêm
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Sidebar (Right) */}
        <CartSummary
          selectedCount={selectedCount}
          subtotal={subtotal}
          shippingFee={shippingFee}
          discountAmount={discountAmount}
          appliedCoupon={appliedCoupon}
          onApplyCoupon={applyCoupon}
          onRemoveCoupon={removeCoupon}
          dict={dict}
          lang={lang}
          selectedIds={selectedItemIds}
        />
      </div>
    </div>
  );
}
