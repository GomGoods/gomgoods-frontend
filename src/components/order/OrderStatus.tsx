import { CheckCircle2, Clock, Truck, XCircle } from "lucide-react";

export interface OrderStatusProps {
  status: "pending" | "shipping" | "completed" | "cancelled";
  text?: string;
}

export function OrderStatus({ status, text }: OrderStatusProps) {
  switch (status) {
    case "completed":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
          <CheckCircle2 size={13} />
          <span>{text || "Giao thành công"}</span>
        </span>
      );
    case "shipping":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
          <Truck size={13} />
          <span>{text || "Đang giao hàng"}</span>
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
          <XCircle size={13} />
          <span>{text || "Đã hủy"}</span>
        </span>
      );
    case "pending":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
          <Clock size={13} />
          <span>{text || "Chờ xác nhận"}</span>
        </span>
      );
  }
}
