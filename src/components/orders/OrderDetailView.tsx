"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Coins,
  MapPin,
  MessageCircle,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  Store,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { OrderDetailTracking } from "./order-tracking-data";
import { getGomXuImage } from "../profile/ProfileGomXuCard";
import { useGomXu } from "@/context/GomXuContext";
import { RefundRequestModal } from "./RefundRequestModal";
import { ReviewOrderModal } from "./ReviewOrderModal";

interface OrderDetailViewProps {
  order: OrderDetailTracking;
  lang?: string;
}

export function OrderDetailView({ order: initialOrder, lang = "vi" }: OrderDetailViewProps) {
  const { addGomXu } = useGomXu();
  const [order, setOrder] = useState<OrderDetailTracking>(initialOrder);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [isClaimed, setIsClaimed] = useState(initialOrder.gomXuReward.isCredited);
  const [claimToast, setClaimToast] = useState<string | null>(null);

  // Refund and review states
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [refundClaim, setRefundClaim] = useState<{
    reason: string;
    amount: number;
    note: string;
  } | null>(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  // Client-side hydration from gomgoods_user_orders
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gomgoods_user_orders");
      if (stored) {
        const parsed = JSON.parse(stored);
        const match = parsed.find((o: any) => o.id === initialOrder.id);
        if (match) {
          setOrder((prev) => ({
            ...prev,
            orderCode: match.orderCode || prev.orderCode,
            status: match.status || prev.status,
            statusText:
              match.status === "completed"
                ? "Giao thành công"
                : match.status === "shipping"
                ? "Đang giao hàng"
                : "Chờ người bán xác nhận",
            carrier: {
              ...prev.carrier,
              trackingCode: match.trackingCode || prev.carrier.trackingCode,
            },
            seller: {
              ...prev.seller,
              name: match.sellerName || prev.seller.name,
            },
            item: {
              ...prev.item,
              title: match.itemTitle || prev.item.title,
              image: match.itemImage || prev.item.image,
              price:
                match.totalPrice && match.quantity
                  ? Math.round(match.totalPrice / match.quantity)
                  : prev.item.price,
              quantity: match.quantity || prev.item.quantity,
            },
            pricing: {
              ...prev.pricing,
              subtotal: match.totalPrice || prev.pricing.subtotal,
              total: match.totalPrice || prev.pricing.total,
            },
          }));
        }
      }
    } catch {}
  }, [initialOrder.id]);

  const handleConfirmReceived = () => {
    setOrder((prev) => ({
      ...prev,
      status: "completed",
      statusText: "Giao thành công",
      currentStep: 5,
      stages: prev.stages.map((st) =>
        st.key === "completed"
          ? { ...st, isCompleted: true, isCurrent: true, timestamp: "Vừa xong" }
          : { ...st, isCompleted: true, isCurrent: false }
      ),
      trackingLogs: [
        {
          id: `log-${Date.now()}`,
          time: "Vừa xong",
          title: "Khách hàng xác nhận đã nhận hàng",
          description: "Khách hàng đã kiểm tra và nhận bưu kiện nguyên vẹn.",
          isCurrent: true,
        },
        ...prev.trackingLogs.map((l) => ({ ...l, isCurrent: false })),
      ],
    }));

    // Update in localStorage
    try {
      const stored = localStorage.getItem("gomgoods_user_orders");
      if (stored) {
        const parsed = JSON.parse(stored);
        const updated = parsed.map((o: any) =>
          o.id === initialOrder.id ? { ...o, status: "completed" } : o
        );
        localStorage.setItem("gomgoods_user_orders", JSON.stringify(updated));
      }
    } catch {}

    setClaimToast("✅ Đã xác nhận nhận hàng thành công! Bạn có thể nhận GomXu và đánh giá sản phẩm.");
    setTimeout(() => setClaimToast(null), 5000);
  };

  const handleClaimXu = () => {
    setIsClaimed(true);
    addGomXu(
      order.gomXuReward.amount,
      `Thưởng nhận hàng thành công #${order.orderCode}`
    );
    setClaimToast(`🎉 Chúc mừng! Bạn đã nhận thành công +${order.gomXuReward.amount} GomXu từ đơn hàng!`);
    setTimeout(() => setClaimToast(null), 4000);
  };

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(order.carrier.trackingCode);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const getStageIcon = (key: string, isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted && !isCurrent) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
    switch (key) {
      case "placed":
        return <ShoppingBag className="w-5 h-5" />;
      case "confirmed":
        return <Package className="w-5 h-5" />;
      case "shipped":
        return <Truck className="w-5 h-5" />;
      case "delivering":
        return <Truck className="w-5 h-5" />;
      case "completed":
      default:
        return <Coins className="w-5 h-5 fill-amber-400 text-amber-500" />;
    }
  };

  const visibleLogs = showAllLogs
    ? order.trackingLogs
    : order.trackingLogs.slice(0, 3);

  return (
    <div className="w-full pb-20 pt-2 flex flex-col gap-5">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground font-medium">
        <Link href={`/${lang}`} className="hover:text-primary transition-colors">
          Trang chủ
        </Link>
        <ChevronRight size={14} className="opacity-60" />
        <Link href={`/${lang}/profile`} className="hover:text-primary transition-colors">
          Hồ sơ cá nhân
        </Link>
        <ChevronRight size={14} className="opacity-60" />
        <span className="text-foreground font-semibold">
          Chi tiết đơn #{order.orderCode}
        </span>
      </nav>

      {/* 2. Order Header Bar */}
      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-lg sm:text-2xl font-black text-foreground tracking-tight">
              Đơn hàng #{order.orderCode}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                order.status === "completed"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                  : order.status === "shipping"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
              }`}
            >
              {order.status === "completed" ? (
                <CheckCircle2 size={13} />
              ) : (
                <Truck size={13} />
              )}
              <span>{order.statusText}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Đặt ngày {order.createdAt} · Mã vận đơn: <strong className="text-foreground">{order.carrier.trackingCode}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            href={`/${lang}/chat`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-border bg-background hover:bg-muted text-foreground transition-all shadow-2xs"
          >
            <MessageCircle size={14} className="text-primary" />
            <span>Liên hệ người bán</span>
          </Link>
          <Link
            href={`/${lang}/profile`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-muted hover:bg-muted/80 text-foreground transition-all"
          >
            Quay lại đơn hàng
          </Link>
        </div>
      </div>

      {/* 3. Thanh chu trình tiến trình vận chuyển từ đầu đến cuối (Full Lifecycle Stepper) */}
      <section className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-black text-foreground">
              Chu trình giao hàng
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Theo dõi trực tiếp từng giai đoạn đơn hàng từ người bán tới tay bạn
            </p>
          </div>
          <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40 inline-flex items-center gap-1.5">
            <ShieldCheck size={14} />
            <span>Đơn hàng bảo đảm 100% bởi GomGoods</span>
          </div>
        </div>

        {/* Stepper Steps Bar */}
        <div className="relative">
          {/* Stepper Desktop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {order.stages.map((stage, idx) => {
              const isPast = stage.isCompleted && !stage.isCurrent;
              const isCurrent = stage.isCurrent;
              const isFuture = !stage.isCompleted && !stage.isCurrent;

              return (
                <div
                  key={stage.step}
                  className={`flex flex-col items-center text-center p-3 rounded-2xl relative transition-all ${
                    isCurrent
                      ? "bg-primary/5 dark:bg-primary/10 border-2 border-primary shadow-xs"
                      : isPast
                      ? "bg-muted/30 border border-border/50"
                      : "opacity-60 border border-transparent"
                  }`}
                >
                  {/* Step Icon Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2.5 transition-all shadow-2xs ${
                      isPast
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700"
                        : isCurrent
                        ? "bg-primary text-primary-foreground animate-pulse shadow-md shadow-primary/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {getStageIcon(stage.key, stage.isCompleted, stage.isCurrent)}
                  </div>

                  {/* Stage Title */}
                  <h4 className={`text-xs sm:text-sm font-bold leading-tight ${
                    isCurrent ? "text-primary" : "text-foreground"
                  }`}>
                    {stage.title}
                  </h4>

                  {/* Stage Description */}
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-snug">
                    {stage.desc}
                  </p>

                  {/* Stage Timestamp */}
                  {stage.timestamp && (
                    <span className="text-[10px] font-semibold text-muted-foreground/80 mt-1.5 bg-background/80 px-2 py-0.5 rounded-md border border-border/40">
                      {stage.timestamp}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Tracking Logs Timeline */}
        <div className="mt-2 pt-4 border-t border-border/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
              <Clock size={14} className="text-primary" />
              <span>Nhật ký vận chuyển chi tiết</span>
            </h3>
            <span className="text-[11px] text-muted-foreground">
              {order.carrier.name} · {order.carrier.estimatedDelivery}
            </span>
          </div>

          <div className="flex flex-col gap-2.5 pl-2 relative border-l-2 border-primary/20 ml-2">
            {visibleLogs.map((log) => (
              <div key={log.id} className="relative pl-4 text-xs">
                {/* Node dot */}
                <div
                  className={`absolute -left-[9px] top-1 w-3.5 h-3.5 rounded-full border-2 border-background ${
                    log.isCurrent
                      ? "bg-primary ring-4 ring-primary/20"
                      : "bg-muted-foreground/50"
                  }`}
                />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">
                      {log.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {log.time}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {log.description}
                  </p>
                  {log.hubLocation && (
                    <span className="text-[10px] text-primary font-medium">
                      📍 {log.hubLocation}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {order.trackingLogs.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllLogs(!showAllLogs)}
              className="self-center mt-1 text-xs text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showAllLogs ? "Thu gọn nhật ký" : `Xem thêm ${order.trackingLogs.length - 3} mốc hành trình khác`}</span>
              {showAllLogs ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          )}
        </div>
      </section>

      {/* 4. Two Column Layout: Delivery Info & Item / Pricing Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Delivery Address & Carrier Info */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Shipping Address */}
          <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-sm">
            <h3 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 mb-3">
              <MapPin size={15} className="text-primary" />
              <span>Địa chỉ nhận hàng</span>
            </h3>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-sm text-foreground">
                {order.recipient.fullName} <span className="font-normal text-muted-foreground">({order.recipient.phone})</span>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {order.recipient.address}
              </p>
            </div>
          </div>

          {/* Carrier Info */}
          <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-sm">
            <h3 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 mb-3">
              <Truck size={15} className="text-primary" />
              <span>Đơn vị vận chuyển</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Đơn vị:</span>
                <span className="font-bold text-foreground">{order.carrier.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Mã vận đơn:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-foreground">{order.carrier.trackingCode}</span>
                  <button
                    type="button"
                    onClick={handleCopyTracking}
                    className="p-1 hover:bg-muted rounded text-primary transition-all cursor-pointer"
                    title="Sao chép mã vận đơn"
                  >
                    {copiedTracking ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
              {order.carrier.shipperName && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Bưu tá phát:</span>
                  <span className="font-semibold text-foreground">
                    {order.carrier.shipperName} ({order.carrier.shipperPhone})
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-1 border-t border-border/50">
                <span className="text-muted-foreground">Hotline hỗ trợ:</span>
                <span className="font-bold text-primary">{order.carrier.hotline}</span>
              </div>
            </div>
          </div>

          {/* GomXu Reward Notice Box */}
          <div className="bg-gradient-to-r from-amber-500/15 via-yellow-400/10 to-amber-500/5 border border-amber-300/50 dark:border-amber-700/40 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <Image
                  src="/GomXu.png"
                  alt="GomXu"
                  width={32}
                  height={32}
                  className="object-contain drop-shadow-2xs"
                />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1">
                  <span>Điểm thưởng GomXu</span>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-extrabold bg-amber-200 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    +{order.gomXuReward.amount} Xu
                  </span>
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {order.gomXuReward.notice}
                </p>
                {claimToast && (
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mt-1 animate-in fade-in">
                    {claimToast}
                  </p>
                )}
              </div>
            </div>

            <div className="shrink-0">
              {isClaimed ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100/80 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/60 shadow-2xs">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <Image
                    src={getGomXuImage(order.gomXuReward.amount)}
                    alt={`${order.gomXuReward.amount} GomXu`}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <span>Đã nhận +{order.gomXuReward.amount} GomXu</span>
                </span>
              ) : order.status === "completed" ? (
                <button
                  type="button"
                  onClick={handleClaimXu}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer border border-amber-300 group"
                >
                  <Image
                    src={getGomXuImage(order.gomXuReward.amount)}
                    alt={`${order.gomXuReward.amount} GomXu`}
                    width={18}
                    height={18}
                    className="object-contain group-hover:rotate-12 transition-transform"
                  />
                  <span>Nhận {order.gomXuReward.amount} GomXu</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-medium bg-amber-50/70 text-amber-900/80 dark:bg-amber-950/50 dark:text-amber-300/90 border border-amber-200/60">
                  <Image
                    src={getGomXuImage(order.gomXuReward.amount)}
                    alt={`${order.gomXuReward.amount} GomXu`}
                    width={14}
                    height={14}
                    className="object-contain"
                  />
                  <span>Nhận +{order.gomXuReward.amount} GomXu khi giao thành công</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Ordered Item & Payment Summary */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Item Details */}
          <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <div className="flex items-center gap-2">
                <Store size={15} className="text-primary" />
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  {order.seller.name}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  ({order.seller.location})
                </span>
              </div>
              <Link
                href={`/${lang}/chat`}
                className="text-xs text-primary font-bold hover:underline"
              >
                Nhắn tin shop
              </Link>
            </div>

            {/* Product Item Row */}
            <div className="flex items-center gap-3.5 py-1">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-muted shrink-0 border border-border/60">
                <Image
                  src={order.item.image}
                  alt={order.item.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground mb-1">
                  {order.item.condition}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 leading-snug">
                  {order.item.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Phân loại: {order.item.category} · Số lượng: x{order.item.quantity}
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm sm:text-base font-black text-primary">
                  ₫{order.item.price.toLocaleString("vi-VN")}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Total Summary */}
          <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-2.5 text-xs">
            <h3 className="text-xs sm:text-sm font-bold text-foreground mb-1">
              Chi tiết thanh toán
            </h3>

            <div className="flex items-center justify-between text-muted-foreground">
              <span>Tổng tiền hàng:</span>
              <span className="text-foreground font-medium">₫{order.pricing.subtotal.toLocaleString("vi-VN")}</span>
            </div>

            <div className="flex items-center justify-between text-muted-foreground">
              <span>Phí vận chuyển:</span>
              <span className="text-foreground font-medium">₫{order.pricing.shippingFee.toLocaleString("vi-VN")}</span>
            </div>

            {order.pricing.discount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Giảm giá ({order.pricing.discountReason || "Voucher"}):</span>
                <span>-₫{order.pricing.discount.toLocaleString("vi-VN")}</span>
              </div>
            )}

            <div className="flex items-baseline justify-between pt-2.5 border-t border-border/60">
              <div>
                <span className="text-sm sm:text-base font-black text-foreground">
                  Tổng thanh toán:
                </span>
                <p className="text-[11px] text-muted-foreground">
                  {order.pricing.paymentMethod}
                </p>
              </div>
              <span className="text-lg sm:text-xl font-black text-primary">
                ₫{order.pricing.total.toLocaleString("vi-VN")}
              </span>
            </div>

            {/* Post-order action buttons */}
            <div className="pt-3 border-t border-border/60 flex flex-wrap items-center justify-end gap-2.5">
              {order.status !== "completed" && (
                <button
                  type="button"
                  onClick={handleConfirmReceived}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 size={14} />
                  <span>Đã nhận được hàng</span>
                </button>
              )}

              {order.status === "completed" && (
                <>
                  {hasReviewed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-muted text-foreground border border-border">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>Đã gửi đánh giá</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsReviewModalOpen(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles size={14} />
                      <span>Đánh giá nhận +50 GomXu</span>
                    </button>
                  )}
                </>
              )}

              {refundClaim ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200">
                  <RotateCcw size={13} />
                  <span>Đã gửi khiếu nại hoàn tiền</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsRefundModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-rose-300/70 hover:bg-rose-50 dark:border-rose-900/60 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw size={13} />
                  <span>Yêu cầu Trả hàng / Hoàn tiền</span>
                </button>
              )}
            </div>

            {/* Refund claim active status note */}
            {refundClaim && (
              <div className="mt-2 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 flex flex-col gap-1 text-rose-900 dark:text-rose-200">
                <span className="font-bold flex items-center gap-1.5">
                  <RotateCcw size={13} className="text-rose-600" />
                  <span>Khiếu nại đang được GomGoods xử lý</span>
                </span>
                <p className="text-[11px] leading-relaxed">
                  Lý do: <strong>{refundClaim.reason}</strong> · Số tiền yêu cầu hoàn: <strong>₫{refundClaim.amount.toLocaleString("vi-VN")}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Refund Request Modal */}
      <RefundRequestModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        orderCode={order.orderCode}
        maxAmount={order.pricing.total}
        itemTitle={order.item.title}
        itemImage={order.item.image}
        onSuccess={(details) => setRefundClaim(details)}
      />

      {/* Review Modal */}
      <ReviewOrderModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        orderCode={order.orderCode}
        itemTitle={order.item.title}
        itemImage={order.item.image}
        sellerName={order.seller.name}
        onSuccess={() => setHasReviewed(true)}
      />
    </div>
  );
}
