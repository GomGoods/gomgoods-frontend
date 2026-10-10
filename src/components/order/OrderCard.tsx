import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Store } from "lucide-react";
import { OrderStatus } from "./OrderStatus";

export interface OrderCardData {
  id: string;
  orderCode: string;
  createdAt: string;
  status: "pending" | "shipping" | "completed" | "cancelled";
  sellerName: string;
  itemTitle: string;
  itemImage: string;
  totalPrice: number;
  quantity: number;
}

export interface OrderCardProps {
  order: OrderCardData;
  lang?: string;
  onConfirmReceived?: (id: string) => void;
}

export function OrderCard({ order, lang = "vi", onConfirmReceived }: OrderCardProps) {
  return (
    <article className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col gap-3.5">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Store size={15} className="text-primary" />
          <span className="text-xs sm:text-sm font-bold text-foreground">
            {order.sellerName}
          </span>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-xs text-muted-foreground font-mono">
            #{order.orderCode}
          </span>
        </div>
        <OrderStatus status={order.status} />
      </div>

      {/* Item Body */}
      <div className="flex items-center gap-3.5">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-muted shrink-0 border border-border/60">
          <Image
            src={order.itemImage}
            alt={order.itemTitle}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 leading-snug">
            {order.itemTitle}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Số lượng: x{order.quantity} · Đặt ngày {order.createdAt}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs text-muted-foreground block">Tổng tiền</span>
          <div className="text-sm sm:text-base font-black text-primary">
            ₫{order.totalPrice.toLocaleString("vi-VN")}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
        {order.status !== "completed" && onConfirmReceived && (
          <button
            type="button"
            onClick={() => onConfirmReceived(order.id)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200/60 transition-all cursor-pointer"
          >
            Đã nhận hàng
          </button>
        )}
        <Link
          href={`/${lang}/orders/${order.id}`}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>Xem chi tiết</span>
          <ChevronRight size={14} />
        </Link>
      </div>
    </article>
  );
}
