"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Tag, X } from "lucide-react";
import { formatVND } from "./cart-data";
import { PaymentIcon } from "@/components/checkout/PaymentIcons";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface CartSummaryProps {
  selectedCount: number;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  dict: Dictionary;
  lang?: Locale;
  selectedIds: string[];
}

export function CartSummary({
  selectedCount,
  subtotal,
  shippingFee,
  discountAmount,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  dict,
  lang = "vi",
  selectedIds,
}: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  const total = Math.max(0, subtotal + shippingFee - discountAmount);

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

  const checkoutUrl =
    selectedIds.length > 0
      ? `/${lang}/checkout?items=${selectedIds.join(",")}`
      : "#";

  return (
    <div className="w-full lg:w-[360px] flex-shrink-0">
      <div className="bg-surface rounded-lg shadow-xs border border-outline-variant p-5 sticky top-24 flex flex-col gap-4">
        {/* Card Header */}
        <h2 className="text-base md:text-lg font-bold text-on-surface border-b border-outline-variant pb-3">
          {dict.cart?.order_summary || "Tóm tắt đơn hàng"}
        </h2>

        {/* Pricing Metrics */}
        <div className="flex flex-col gap-2.5 text-sm text-on-surface-variant">
          <div className="flex justify-between items-center">
            <span>
              {dict.cart?.subtotal || "Tạm tính"} ({selectedCount}{" "}
              {dict.cart?.items_count || "sản phẩm"})
            </span>
            <span className="text-on-surface font-semibold">
              {formatVND(subtotal)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>{dict.cart?.shipping_est || "Phí vận chuyển (Est.)"}</span>
            <span className="text-on-surface font-semibold">
              {shippingFee === 0 && selectedCount > 0
                ? dict.cart?.free_shipping || "Miễn phí"
                : formatVND(shippingFee)}
            </span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between items-center text-tertiary">
              <span className="flex items-center gap-1 font-medium">
                <Tag size={14} />
                <span>{dict.cart?.discount || "Giảm giá"}</span>
              </span>
              <span className="font-bold">-{formatVND(discountAmount)}</span>
            </div>
          )}
        </div>

        {/* Coupon Input Form */}
        <div className="pt-2 border-t border-outline-variant/60">
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
                className="flex-1 px-3 py-1.5 rounded-md border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!couponCode.trim()}
                className="px-3 py-1.5 bg-secondary-container text-on-secondary-container text-xs font-semibold rounded-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {dict.cart?.coupon_apply || "Áp dụng"}
              </button>
            </form>
          )}

          {couponError && (
            <p className="text-xs text-error mt-1.5">{couponError}</p>
          )}
        </div>

        {/* Total Price */}
        <div className="border-t border-outline-variant pt-3 flex justify-between items-end">
          <div>
            <span className="text-sm font-semibold text-on-surface">
              {dict.cart?.total || "Tổng tiền"}
            </span>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {dict.cart?.vat_included || "Đã bao gồm VAT"}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl md:text-2xl font-black text-foreground tracking-tight">
              {formatVND(total)}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2.5 mt-1">
          {selectedCount > 0 ? (
            <Link
              href={checkoutUrl}
              className="w-full bg-primary hover:bg-primary-container text-on-primary font-bold text-sm md:text-base py-3 px-4 rounded-lg shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>
                {dict.cart?.checkout_btn || "Mua hàng / Thanh toán"} (
                {selectedCount})
              </span>
              <ArrowRight size={18} />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="w-full bg-outline-variant text-on-surface-variant font-bold text-sm md:text-base py-3 px-4 rounded-lg cursor-not-allowed opacity-60 flex items-center justify-center gap-2 select-none"
            >
              <span>{dict.cart?.checkout_btn || "Mua hàng / Thanh toán"}</span>
              <ArrowRight size={18} />
            </button>
          )}

          <Link
            href={`/${lang}/marketplace`}
            className="w-full text-center text-secondary hover:text-primary text-xs md:text-sm py-1.5 transition-colors font-medium"
          >
            {dict.cart?.continue_shopping || "Tiếp tục mua sắm"}
          </Link>
        </div>

        {/* Accepted Payment Methods */}
        <div className="pt-3 border-t border-outline-variant/60 space-y-2">
          <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider block">
            Phương thức thanh toán hỗ trợ
          </span>
          <div className="flex flex-wrap gap-1.5 text-[11px] text-on-surface">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high font-medium border border-outline-variant/40">
              <PaymentIcon id="visa" size={16} /> Visa
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high font-medium border border-outline-variant/40">
              <PaymentIcon id="mastercard" size={16} /> Mastercard
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-pink-500/10 text-pink-600 font-semibold border border-pink-500/20">
              <PaymentIcon id="momo" size={16} /> MoMo
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-semibold border border-blue-500/20">
              <PaymentIcon id="vnpay" size={16} /> VNPAY
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-container/40 text-on-primary-container font-semibold">
              <PaymentIcon id="vietqr" size={16} /> VietQR
            </span>
            <span className="px-2 py-0.5 rounded bg-tertiary/15 text-tertiary font-semibold">GomPay Escrow</span>
          </div>
        </div>

        {/* Link to Support */}
        <div className="pt-2 border-t border-outline-variant/50">
          <Link
            href={`/${lang}/chat`}
            className="flex items-center justify-between text-xs text-secondary hover:text-primary font-medium py-1 transition-colors"
          >
            <span>Cần trợ giúp về giỏ hàng?</span>
            <span className="underline">Chat với CSKH →</span>
          </Link>
        </div>

        {/* Trust & Guarantee Note */}
        <div className="mt-1 pt-3 border-t border-outline-variant/50 flex items-start gap-2 text-xs text-on-surface-variant bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/30">
          <ShieldCheck size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <span className="leading-snug">
            <strong>GomPay Escrow:</strong> Tiền cọc được giữ an toàn tuyệt đối. Chỉ giải ngân cho người bán sau khi bạn kiểm tra và xác nhận hài lòng.
          </span>
        </div>
      </div>
    </div>
  );
}
