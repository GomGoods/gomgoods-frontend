export interface PaymentInfoProps {
  subtotal: number;
  shippingFee: number;
  discount: number;
  discountReason?: string;
  total: number;
  paymentMethod: string;
}

export function PaymentInfo({
  subtotal,
  shippingFee,
  discount,
  discountReason,
  total,
  paymentMethod,
}: PaymentInfoProps) {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-2.5 text-xs">
      <h3 className="text-xs sm:text-sm font-bold text-foreground mb-1">
        Chi tiết thanh toán
      </h3>

      <div className="flex items-center justify-between text-muted-foreground">
        <span>Tổng tiền hàng:</span>
        <span className="text-foreground font-medium">
          ₫{subtotal.toLocaleString("vi-VN")}
        </span>
      </div>

      <div className="flex items-center justify-between text-muted-foreground">
        <span>Phí vận chuyển:</span>
        <span className="text-foreground font-medium">
          ₫{shippingFee.toLocaleString("vi-VN")}
        </span>
      </div>

      {discount > 0 && (
        <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-medium">
          <span>Giảm giá ({discountReason || "Voucher"}):</span>
          <span>-₫{discount.toLocaleString("vi-VN")}</span>
        </div>
      )}

      <div className="flex items-baseline justify-between pt-2.5 border-t border-border/60">
        <div>
          <span className="text-sm sm:text-base font-black text-foreground">
            Tổng thanh toán:
          </span>
          <p className="text-[11px] text-muted-foreground">{paymentMethod}</p>
        </div>
        <span className="text-lg sm:text-xl font-black text-primary">
          ₫{total.toLocaleString("vi-VN")}
        </span>
      </div>
    </div>
  );
}
