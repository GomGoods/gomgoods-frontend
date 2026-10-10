"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Coins,
  Store,
  ChevronRight,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import type { UserOrder } from "./profile-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useGomXu } from "@/context/GomXuContext";

interface ProfileOrdersTabProps {
  orders: UserOrder[];
  dict?: Dictionary;
  lang?: string;
  onClaimXu?: (orderId: string) => void;
  claimedOrderIds?: string[];
}

type OrderStatusFilter = "all" | "pending" | "shipping" | "completed" | "cancelled";

export function ProfileOrdersTab({
  orders: initialOrders,
  dict,
  lang = "vi",
  onClaimXu,
  claimedOrderIds: externalClaimedIds,
}: ProfileOrdersTabProps) {
  const { addGomXu } = useGomXu();
  const [orders, setOrders] = useState<UserOrder[]>(initialOrders);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("gomgoods_user_orders");
      if (stored) {
        const parsed: UserOrder[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge newly placed orders avoiding duplicates
          const existingIds = new Set(initialOrders.map((o) => o.id));
          const newOnly = parsed.filter((o) => !existingIds.has(o.id));
          setOrders([...newOnly, ...initialOrders]);
        }
      }
    } catch {}
  }, [initialOrders]);
  const [localClaimed, setLocalClaimed] = useState<string[]>([]);
  const [filter, setFilter] = useState<OrderStatusFilter>("all");
  const [claimToast, setClaimToast] = useState<{
    message: string;
    submessage?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  } | null>(null);

  const claimedIds = externalClaimedIds || localClaimed;

  const handleClaimXu = (orderId: string, orderCode: string) => {
    if (claimedIds.includes(orderId)) return;
    addGomXu(200, `Thưởng tích xu đơn hàng #${orderCode}`);
    if (onClaimXu) {
      onClaimXu(orderId);
    } else {
      setLocalClaimed((prev) => [...prev, orderId]);
    }
    setClaimToast({
      message: `🎉 Nhận thành công +200 GomXu từ đơn hàng #${orderCode}!`,
      submessage: "200 GomXu đã được cộng vào ví của bạn để đổi voucher ưu đãi.",
    });
    setTimeout(() => {
      setClaimToast((prev) => (prev?.message.includes(orderCode) ? null : prev));
    }, 4500);
  };

  const handleShippingClick = (orderId: string, orderCode: string) => {
    setClaimToast({
      message: `🚚 Đơn hàng #${orderCode} đang được vận chuyển.`,
      submessage: "Bạn có thể bấm 'Nhận 200 GomXu' ngay sau khi đơn hàng được giao thành công.",
      action: {
        label: "Giả lập đã nhận & Nhận 200 Xu ngay",
        onClick: () => {
          setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: "completed" as const } : o))
          );
          handleClaimXu(orderId, orderCode);
        },
      },
    });
  };

  const p = dict?.profile;

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const getStatusBadge = (status: UserOrder["status"]) => {
    switch (status) {
      case "shipping":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
            <Truck className="w-3.5 h-3.5" />
            <span>{p?.orders_shipping || "Đang giao hàng"}</span>
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{p?.orders_completed || "Giao thành công"}</span>
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
            <Clock className="w-3.5 h-3.5" />
            <span>{p?.orders_pending || "Chờ xác nhận"}</span>
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40">
            <XCircle className="w-3.5 h-3.5" />
            <span>{p?.orders_cancelled || "Đã hủy"}</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filterTabs: { key: OrderStatusFilter; label: string }[] = [
    { key: "all", label: p?.orders_all || "Tất cả" },
    { key: "shipping", label: p?.orders_shipping || "Đang giao" },
    { key: "completed", label: p?.orders_completed || "Đã giao" },
    { key: "pending", label: p?.orders_pending || "Chờ xác nhận" },
    { key: "cancelled", label: p?.orders_cancelled || "Đã hủy" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Sub-filters Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filter === tab.key
                ? "bg-primary text-primary-foreground shadow-xs scale-[1.02]"
                : "bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Claim GomXu Toast Notification */}
      {claimToast && (
        <div className="bg-amber-500 text-slate-950 px-4 py-3 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-bold border border-amber-300 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-950/10 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Image
                src="/GomXu.png"
                alt="200 GomXu"
                width={28}
                height={28}
                className="object-contain drop-shadow-2xs"
              />
            </div>
            <div>
              <div className="text-slate-950 text-xs sm:text-sm font-black">
                {claimToast.message}
              </div>
              {claimToast.submessage && (
                <div className="text-[11px] font-medium text-slate-900 mt-0.5">
                  {claimToast.submessage}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {claimToast.action && (
              <button
                type="button"
                onClick={claimToast.action.onClick}
                className="px-3 py-1.5 rounded-xl bg-slate-950 text-amber-300 hover:bg-slate-900 text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap"
              >
                {claimToast.action.label}
              </button>
            )}
            <button
              type="button"
              onClick={() => setClaimToast(null)}
              className="w-6 h-6 rounded-lg bg-black/10 hover:bg-black/20 flex items-center justify-center text-slate-950 text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 2. Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-card border border-border/80 rounded-2xl p-10 text-center flex flex-col items-center justify-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
            <Package className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-foreground mb-1">
            Không có đơn hàng nào
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mb-4">
            Bạn chưa có đơn hàng nào ở trạng thái này. Khám phá chợ để tìm kiếm món đồ ưng ý nhé!
          </p>
          <Link
            href={`/${lang}/marketplace`}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-xs"
          >
            Khám phá chợ ngay
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {filteredOrders.map((order) => {
            const isCompleted = order.status === "completed";
            const isClaimed = claimedIds.includes(order.id);

            return (
              <div
                key={order.id}
                className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col gap-3.5"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono font-black text-xs sm:text-sm text-foreground">
                      #{order.orderCode}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {order.createdAt}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Store className="w-3.5 h-3.5 text-primary" />
                      <span>{order.sellerName}</span>
                    </div>
                  </div>

                  <div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Order Item Row */}
                <div className="flex gap-4 items-center">
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-muted shrink-0 border border-border/70 shadow-2xs">
                    <Image
                      src={order.itemImage}
                      alt={order.itemTitle}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 mb-1 leading-snug">
                      {order.itemTitle}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>Số lượng: <strong className="text-foreground">x{order.quantity}</strong></span>
                      {order.trackingCode && (
                        <span className="bg-muted px-2 py-0.5 rounded text-[11px] font-mono font-medium">
                          Mã vận đơn: {order.trackingCode}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base sm:text-lg font-bold text-foreground">
                      ₫{order.totalPrice.toLocaleString("vi-VN")}
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      Tổng thanh toán
                    </span>
                  </div>
                </div>

                {/* Order Footer Actions */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/60">
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    {order.status === "shipping" && (
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        🚚 Đang trên đường giao hàng đến bạn
                      </span>
                    )}
                    {order.status === "completed" && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        ✅ Kiện hàng đã giao thành công
                      </span>
                    )}
                    {order.status === "pending" && (
                      <span>Người bán đang chuẩn bị đóng gói hàng</span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                    {/* Button nhận 200 GomXu hoặc huy hiệu đã nhận xu */}
                    {isClaimed ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/60 shadow-2xs">
                        <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
                        <Image
                          src="/GomXu.png"
                          alt="200 GomXu"
                          width={16}
                          height={16}
                          className="object-contain drop-shadow-2xs"
                        />
                        <span>Đã nhận +200 GomXu</span>
                      </span>
                    ) : isCompleted ? (
                      <button
                        type="button"
                        onClick={() => handleClaimXu(order.id, order.orderCode)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 dark:text-amber-200 border border-amber-400/50 shadow-2xs active:scale-95 transition-all cursor-pointer group"
                      >
                        <Image
                          src="/GomXu.png"
                          alt="200 GomXu"
                          width={16}
                          height={16}
                          className="object-contain group-hover:rotate-12 transition-transform drop-shadow-2xs"
                        />
                        <span>Nhận 200 GomXu</span>
                        <Sparkles size={12} className="text-amber-600 dark:text-amber-300" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleShippingClick(order.id, order.orderCode)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-50/70 hover:bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 transition-all cursor-pointer group"
                        title="Bấm để nhận xu hoặc kiểm tra trạng thái"
                      >
                        <Image
                          src="/GomXu.png"
                          alt="200 GomXu"
                          width={16}
                          height={16}
                          className="object-contain group-hover:scale-110 transition-transform drop-shadow-2xs"
                        />
                        <span>Nhận +200 GomXu khi giao thành công</span>
                      </button>
                    )}

                    <Link
                      href={`/${lang}/chat`}
                      className="px-3 py-2 rounded-xl border border-border text-xs font-bold hover:bg-muted text-foreground transition-all flex items-center gap-1.5"
                    >
                      <MessageCircle size={13} className="text-primary" />
                      <span>Liên hệ người bán</span>
                    </Link>

                    {/* Button Xem chi tiết: dẫn thẳng vào trang chu trình vận chuyển /orders/[id] */}
                    <Link
                      href={`/${lang}/orders/${order.id}`}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Xem chi tiết</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
