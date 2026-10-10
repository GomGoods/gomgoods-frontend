"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Tag,
  X,
  ArrowRight,
  Truck,
  CreditCard,
  Banknote,
  QrCode,
  Wallet,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import {
  formatVND,
  shippingMethods,
  paymentCategories,
  type PaymentMethodId,
  type ShippingMethodOption,
} from "./checkout-data";
import { PaymentIcon } from "./PaymentIcons";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface OrderSummaryProps {
  itemsTotal: number;
  shippingFee: number;
  serviceFee: number;
  discountAmount: number;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  onPlaceOrder: () => void;
  isSubmitting: boolean;
  dict: Dictionary;
  lang?: Locale;
  selectedShippingMethodId: "standard" | "express" | "pickup";
  onSelectShippingMethod: (id: "standard" | "express" | "pickup") => void;
  selectedPaymentCategory: PaymentMethodId;
  onSelectPaymentCategory: (id: PaymentMethodId) => void;
  selectedSubPaymentOption: string;
  onSelectSubPaymentOption: (id: string) => void;
}

export function OrderSummary({
  itemsTotal,
  shippingFee,
  serviceFee,
  discountAmount,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onPlaceOrder,
  isSubmitting,
  dict,
  lang = "vi",
  selectedShippingMethodId,
  onSelectShippingMethod,
  selectedPaymentCategory,
  onSelectPaymentCategory,
  selectedSubPaymentOption,
  onSelectSubPaymentOption,
}: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  const grandTotal = Math.max(
    0,
    itemsTotal + shippingFee + serviceFee - discountAmount
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const success = onApplyCoupon(couponCode.trim());
    if (success) {
      setCouponCode("");
      setCouponError(null);
    } else {
      setCouponError(dict.cart?.coupon_invalid || "Mã giảm giá không hợp lệ");
    }
  };

  const getCategoryIcon = (id: PaymentMethodId) => {
    switch (id) {
      case "cod":
        return <Banknote size={18} className="text-secondary" />;
      case "bank_transfer":
        return <QrCode size={18} className="text-primary" />;
      case "wallet":
        return <Wallet size={18} className="text-tertiary" />;
      case "intl_card":
        return <CreditCard size={18} className="text-secondary" />;
      case "napas":
        return <Landmark size={18} className="text-primary" />;
    }
  };

  return (
    <div className="w-full">
      <section className="bg-surface rounded-lg p-5 shadow-xs border border-outline-variant flex flex-col gap-4">
        {/* Title */}
        <h2 className="font-bold text-base md:text-lg text-on-background pb-3 border-b border-outline-variant">
          {dict.checkout?.order_summary || "Chi tiết thanh toán"}
        </h2>

        {/* 1. Voucher Input */}
        <div className="pb-3 border-b border-outline-variant/60">
          {appliedCoupon ? (
            <div className="flex items-center justify-between px-3 py-2 rounded-md bg-tertiary-container/30 border border-tertiary/30 text-xs text-on-surface">
              <div className="flex items-center gap-1.5 font-medium">
                <Check size={14} className="text-tertiary" />
                <span>{appliedCoupon}</span>
              </div>
              <button
                type="button"
                onClick={onRemoveCoupon}
                className="text-on-surface-variant hover:text-error p-0.5 rounded transition-colors"
                title="Gỡ mã giảm giá"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  if (couponError) setCouponError(null);
                }}
                placeholder={
                  dict.cart?.coupon_placeholder || "Nhập mã giảm giá..."
                }
                className="flex-1 px-3 py-2 border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-md font-body-sm text-xs md:text-sm text-on-surface outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!couponCode.trim()}
                className="bg-secondary-container text-on-secondary-container font-semibold text-xs px-4 rounded-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {dict.cart?.coupon_apply || "Áp dụng"}
              </button>
            </form>
          )}

          {couponError && (
            <p className="text-xs text-error mt-1.5">{couponError}</p>
          )}
        </div>


        {/* 2. Phương thức giao hàng (Shipping Method) */}
        <div className="pb-4 border-b border-outline-variant/60">
          <div className="flex items-center gap-1.5 mb-2.5 text-on-background">
            <Truck size={17} className="text-primary" />
            <h3 className="font-bold text-sm md:text-base">
              {dict.checkout?.shipping_method || "Phương thức giao hàng"}
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            {shippingMethods.map((method: ShippingMethodOption) => {
              const isSelected = method.id === selectedShippingMethodId;
              return (
                <label
                  key={method.id}
                  onClick={() => onSelectShippingMethod(method.id)}
                  className={`flex items-start p-2.5 border rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-surface-container-low shadow-xs"
                      : "border-outline-variant hover:bg-surface-container-lowest"
                  }`}
                >
                  <input
                    type="radio"
                    name="sidebar_shipping_method"
                    checked={isSelected}
                    onChange={() => onSelectShippingMethod(method.id)}
                    className="mt-0.5 mr-2.5 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs md:text-sm text-on-background">
                      {method.title}
                    </div>
                    <div className="text-[11px] text-on-surface-variant mt-0.5">
                      {method.desc}
                    </div>
                    <div className="text-xs font-bold text-primary mt-1">
                      {method.price === 0
                        ? dict.checkout?.free || "Miễn phí"
                        : formatVND(method.price)}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* 3. Phương thức thanh toán (Payment Method) */}
        <div className="pb-4 border-b border-outline-variant/60">
          <div className="flex items-center gap-1.5 mb-2.5 text-on-background">
            <CreditCard size={17} className="text-primary" />
            <h3 className="font-bold text-sm md:text-base">
              {dict.checkout?.payment_method || "Phương thức thanh toán"}
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            {paymentCategories.map((cat) => {
              const isSelected = cat.id === selectedPaymentCategory;
              return (
                <div
                  key={cat.id}
                  className={`border rounded-lg transition-all overflow-hidden ${
                    isSelected
                      ? "border-primary bg-surface-container-low shadow-xs"
                      : "border-outline-variant hover:bg-surface-container-lowest"
                  }`}
                >
                  <label
                    onClick={() => onSelectPaymentCategory(cat.id)}
                    className="flex items-start p-2.5 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="sidebar_payment_category"
                      checked={isSelected}
                      onChange={() => onSelectPaymentCategory(cat.id)}
                      className="mt-0.5 mr-2.5 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                    />
                    <div className="mr-2 mt-0.5 flex-shrink-0">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs md:text-sm text-on-background">
                        {cat.title}
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                        {cat.desc}
                      </div>
                    </div>
                  </label>

                  {/* Sub-options inside selected payment method */}
                  {isSelected && cat.subOptions && cat.subOptions.length > 0 && (
                    <div className="px-3 pb-3 pt-1 border-t border-outline-variant/40 bg-surface/70">
                      <div className="text-[10px] font-semibold text-on-surface-variant mb-1.5">
                        Kênh thanh toán:
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {cat.subOptions.map((sub) => {
                          const isSubSelected = selectedSubPaymentOption === sub.id;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => onSelectSubPaymentOption(sub.id)}
                              className={`px-2.5 py-1.5 rounded border text-[11px] font-semibold flex items-center justify-between gap-1 transition-all text-left ${
                                isSubSelected
                                  ? "border-primary bg-primary text-on-primary shadow-xs"
                                  : "border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
                              }`}
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <PaymentIcon id={sub.id} size={18} className="rounded-xs" />
                                <span className="truncate">{sub.name}</span>
                              </div>
                              {isSubSelected && (
                                <Check size={12} className="flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Chi tiết giá tiền (Price Breakdown) */}
        <div className="flex flex-col gap-2.5 text-xs md:text-sm text-on-surface-variant">
          <div className="flex justify-between items-center">
            <span>{dict.checkout?.items_total || "Tổng tiền hàng"}</span>
            <span className="text-on-background font-semibold">
              {formatVND(itemsTotal)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>{dict.checkout?.shipping_fee || "Phí vận chuyển"}</span>
            <span className="text-on-background font-semibold">
              {shippingFee === 0
                ? dict.checkout?.free || "Miễn phí"
                : formatVND(shippingFee)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>{dict.checkout?.service_fee || "Phí dịch vụ sàn"}</span>
            <span className="text-on-background font-semibold">
              {formatVND(serviceFee)}
            </span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between items-center text-tertiary">
              <span className="flex items-center gap-1 font-medium">
                <Tag size={13} />
                <span>{dict.checkout?.discount || "Giảm giá"}</span>
              </span>
              <span className="font-bold">-{formatVND(discountAmount)}</span>
            </div>
          )}

        </div>

        {/* 5. Grand Total */}
        <div className="border-t border-outline-variant pt-3.5 flex justify-between items-end">
          <div>
            <span className="font-bold text-sm md:text-base text-on-background">
              {dict.checkout?.total_payment || "Tổng thanh toán"}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl md:text-2xl font-black text-foreground tracking-tight">
              {formatVND(grandTotal)}
            </span>
          </div>
        </div>

        {/* 6. Place Order CTA Button */}
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={isSubmitting || itemsTotal === 0}
          className="w-full bg-primary hover:bg-primary-container text-on-primary font-bold text-sm md:text-base py-3.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1 cursor-pointer"
        >
          {isSubmitting ? (
            <span className="inline-block animate-spin mr-2">⏳</span>
          ) : (
            <ArrowRight size={18} />
          )}
          <span>
            {dict.checkout?.place_order_btn || "Đặt hàng / Thanh toán"}
          </span>
        </button>

        {/* 7. Terms Note */}
        <p className="text-center text-[11px] text-on-surface-variant leading-relaxed opacity-85">
          {dict.checkout?.terms_note || "Bằng việc đặt hàng, bạn đồng ý với"}{" "}
          <Link
            href={`/${lang}/policies`}
            className="text-primary hover:underline font-medium"
          >
            {dict.checkout?.terms_link || "Điều khoản của GomGoods"}
          </Link>
          .
        </p>

        {/* 8. Security & Escrow Protection Badge */}
        <div className="pt-3 border-t border-outline-variant/60 space-y-2.5">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low/50 border border-outline-variant/40 text-xs text-on-surface">
            <div className="w-8 h-8 rounded-lg bg-tertiary/15 text-tertiary flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <span className="font-bold text-on-surface block">
                Bảo vệ người mua GomPay Escrow
              </span>
              <span className="text-[11px] text-on-surface-variant block mt-0.5 leading-snug">
                100% Bảo đảm an toàn: Tiền được giữ an toàn trên sàn và chỉ giải ngân cho người bán sau khi bạn kiểm tra và xác nhận hài lòng.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-on-surface-variant font-medium pt-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30">
              <PaymentIcon id="visa" size={16} /> Visa
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30">
              <PaymentIcon id="mastercard" size={16} /> Mastercard
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-pink-500/10 text-pink-600 font-semibold border border-pink-500/20">
              <PaymentIcon id="momo" size={16} /> MoMo
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-semibold border border-blue-500/20">
              <PaymentIcon id="zalopay" size={16} /> ZaloPay
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-container/40 text-on-primary-container font-semibold">
              <PaymentIcon id="vietqr" size={16} /> VietQR
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30">
              <PaymentIcon id="napas" size={16} /> Napas
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
