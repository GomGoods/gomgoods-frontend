"use client";

import Link from "next/link";
import { CheckCircle2, QrCode, Copy, ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatVND, type PaymentMethodId } from "./checkout-data";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface OrderSuccessModalProps {
  orderCode: string;
  totalAmount: number;
  paymentMethod: PaymentMethodId;
  subPaymentOption?: string;
  dict: Dictionary;
  lang?: Locale;
  onClose: () => void;
}

export function OrderSuccessModal({
  orderCode,
  totalAmount,
  paymentMethod,
  dict,
  lang = "vi",
}: OrderSuccessModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBankTransfer = paymentMethod === "bank_transfer";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-surface rounded-2xl border border-outline-variant shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header Icon */}
        <div className="bg-primary/10 px-6 pt-8 pb-6 flex flex-col items-center text-center border-b border-outline-variant/40">
          <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center mb-3 shadow-md">
            <CheckCircle2 size={36} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-on-surface">
            {dict.checkout?.order_success_title || "Đặt hàng thành công!"}
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1 max-w-xs">
            {dict.checkout?.order_success_desc ||
              "Đơn hàng của bạn đã được tiếp nhận và người bán đang chuẩn bị hàng."}
          </p>
          <div className="mt-3 px-3 py-1 bg-surface rounded-full border border-outline-variant text-xs font-mono font-bold text-primary">
            {dict.checkout?.order_code || "Mã đơn hàng"}: {orderCode}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-4">
          {/* VietQR Transfer Instructions */}
          {isBankTransfer && (
            <div className="bg-surface-container-low rounded-xl border border-outline-variant p-4 flex flex-col items-center text-center">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary mb-2">
                <QrCode size={16} />
                <span>
                  {dict.checkout?.scan_qr_title || "Quét mã VietQR để thanh toán"}
                </span>
              </div>

              {/* QR Code Placeholder Graphic */}
              <div className="relative w-44 h-44 bg-white p-2.5 rounded-xl border border-outline-variant shadow-sm flex flex-col items-center justify-center my-2">
                {/* SVG Mock QR pattern */}
                <svg
                  className="w-full h-full text-slate-800"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm-2 10h8v8H2v-8zm2 2v4h4v-4H4zm10-14h8v8h-8V2zm2 2v4h4V4h-4zm2 10h2v2h-2v-2zm-2 2h2v4h-2v-4zm4 2h2v2h-2v-2zm0-4h2v2h-2v-2zm-4 4h4v2h-4v-2z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary text-on-primary text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                    GomGoods
                  </div>
                </div>
              </div>

              <div className="w-full text-left text-xs space-y-1.5 mt-3 pt-3 border-t border-outline-variant/60">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">
                    {dict.checkout?.bank_name || "Ngân hàng"}:
                  </span>
                  <span className="font-bold text-on-surface">MB Bank</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">
                    {dict.checkout?.account_number || "Số tài khoản"}:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy("0988776655")}
                    className="font-mono font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    <span>0988776655</span>
                    <Copy size={12} />
                  </button>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">
                    {dict.checkout?.account_holder || "Chủ tài khoản"}:
                  </span>
                  <span className="font-semibold text-on-surface">
                    CONG TY GOMGOODS VN
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">
                    {dict.checkout?.transfer_content || "Nội dung CK"}:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(orderCode.replace("#", ""))}
                    className="font-mono font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    <span>{orderCode.replace("#", "")}</span>
                    <Copy size={12} />
                  </button>
                </div>
                <div className="flex justify-between pt-1 border-t border-outline-variant/40">
                  <span className="text-on-surface-variant">Số tiền:</span>
                  <span className="font-bold text-primary">
                    {formatVND(totalAmount)}
                  </span>
                </div>
              </div>

              {copied && (
                <div className="text-[11px] text-emerald-600 font-semibold mt-2 animate-in fade-in">
                  Đã sao chép vào bộ nhớ tạm!
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href={`/${lang}/orders`}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-container text-on-primary font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all text-center"
            >
              <span>
                {dict.checkout?.view_orders_btn || "Xem đơn hàng của tôi"}
              </span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href={`/${lang}/marketplace`}
              className="w-full py-2.5 px-4 border border-outline-variant text-on-surface font-semibold text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all text-center"
            >
              <ShoppingBag size={14} />
              <span>
                {dict.checkout?.continue_shopping || "Tiếp tục mua sắm"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
