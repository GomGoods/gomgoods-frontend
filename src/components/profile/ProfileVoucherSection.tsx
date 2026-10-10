"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Ticket,
  Percent,
  Copy,
  Check,
  AlertCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useGomXu } from "@/context/GomXuContext";

export interface VoucherOption {
  id: string;
  type: "percent";
  title: string;
  discountDisplay: string;
  cost: number;
  maxDiscount: string;
  condition: string;
  code: string;
}

export const VOUCHER_OPTIONS: VoucherOption[] = [
  {
    id: "v-5pct",
    type: "percent",
    title: "Voucher Giảm 5% Đơn Hàng",
    discountDisplay: "Giảm 5%",
    cost: 1500,
    maxDiscount: "Giảm tối đa 50.000đ",
    condition: "Áp dụng mọi danh mục fandom",
    code: "GOM5DISCOUNT",
  },
  {
    id: "v-8pct",
    type: "percent",
    title: "Voucher Giảm 8% Đơn Hàng",
    discountDisplay: "Giảm 8%",
    cost: 2000,
    maxDiscount: "Giảm tối đa 50.000đ",
    condition: "Áp dụng mọi đơn hàng & deal pass",
    code: "GOM8SUPER",
  },
  {
    id: "v-10pct",
    type: "percent",
    title: "Voucher Giảm 10% Đơn Hàng",
    discountDisplay: "Giảm 10%",
    cost: 2500,
    maxDiscount: "Giảm tối đa 50.000đ",
    condition: "Mức giảm tối đa cho collector",
    code: "GOM10VIP",
  },
];

export interface RedeemedVoucher {
  id: string;
  title: string;
  discountDisplay: string;
  code: string;
  maxDiscount: string;
  redeemedAt: string;
  expiresIn: string;
}

interface ProfileVoucherSectionProps {
  gomXu?: number;
  setGomXu?: React.Dispatch<React.SetStateAction<number>>;
  dict?: Dictionary;
  defaultSubTab?: "exchange" | "my-vouchers";
}

export function ProfileVoucherSection({
  gomXu: externalGomXu,
  setGomXu: externalSetGomXu,
  defaultSubTab = "exchange",
}: ProfileVoucherSectionProps) {
  const { gomXu: contextGomXu, redeemVoucher, myVouchers } = useGomXu();
  const gomXu = externalGomXu !== undefined ? externalGomXu : contextGomXu;

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    code: string;
  } | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"exchange" | "my-vouchers">(defaultSubTab);

  useEffect(() => {
    if (defaultSubTab) {
      setActiveSubTab(defaultSubTab);
    }
  }, [defaultSubTab]);

  // Merge internal vouchers with context vouchers
  const allRedeemed: RedeemedVoucher[] = useMemo(() => {
    return myVouchers.map((v) => ({
      id: v.id,
      title: v.title,
      discountDisplay: v.discountDisplay,
      code: v.code,
      maxDiscount: v.maxDiscount,
      redeemedAt: v.redeemedAt,
      expiresIn: "Còn 30 ngày",
    }));
  }, [myVouchers]);

  const redeemedList = allRedeemed;

  const handleRedeem = (voucher: VoucherOption) => {
    if (gomXu < voucher.cost) return;

    const success = redeemVoucher(voucher);
    if (success) {
      if (externalSetGomXu) {
        externalSetGomXu((prev) => prev - voucher.cost);
      }
      setNotification({
        message: `Đổi thành công ${voucher.title}! Mã đã sẵn sàng áp dụng khi thanh toán.`,
        code: voucher.code,
      });

      setTimeout(() => {
        setNotification(null);
      }, 4500);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-xs flex flex-col gap-4">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-brand-green text-white px-3.5 py-2.5 rounded-lg shadow-sm flex items-center justify-between gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span>{notification.message}</span>
            <span className="bg-white/20 px-2 py-0.5 rounded font-mono font-bold text-[11px]">
              {notification.code}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-white/80 hover:text-white text-xs underline cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Ticket className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-base sm:text-lg text-foreground tracking-tight">
            Mã giảm giá
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted/60 p-1 rounded-lg border border-border/60">
            <button
              type="button"
              onClick={() => setActiveSubTab("exchange")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === "exchange"
                  ? "bg-card text-foreground shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Đổi mã ưu đãi
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("my-vouchers")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === "my-vouchers"
                  ? "bg-card text-foreground shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>Voucher của tôi</span>
              {redeemedList.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-primary text-primary-foreground font-bold">
                  {redeemedList.length}
                </span>
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1 text-[11px] text-muted-foreground pl-2">
            <Clock size={12} />
            <span>Hạn 30 ngày</span>
          </div>
        </div>
      </div>

      {/* Panel 1: Đổi Voucher */}
      {activeSubTab === "exchange" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VOUCHER_OPTIONS.map((v) => {
            const canAfford = gomXu >= v.cost;
            return (
              <div
                key={v.id}
                className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between hover:border-primary/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border border-border bg-muted/70 text-foreground">
                      <Percent size={11} className="text-primary" />
                      <span>{v.discountDisplay}</span>
                    </span>

                    <div className="flex items-center gap-1 text-xs font-bold text-foreground">
                      <Image
                        src="/GomXu.png"
                        alt="GomXu"
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                      <span>{v.cost.toLocaleString("vi-VN")} xu</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-sm text-foreground">
                    {v.title}
                  </h3>

                  <div className="mt-1.5 space-y-0.5 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground">
                      {v.maxDiscount}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {v.condition}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => handleRedeem(v)}
                    disabled={!canAfford}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      canAfford
                        ? "bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
                        : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                    }`}
                  >
                    {canAfford ? (
                      <>
                        <span>Đổi ngay ({v.cost.toLocaleString("vi-VN")} xu)</span>
                        <ArrowRight size={13} />
                      </>
                    ) : (
                      <>
                        <AlertCircle size={13} />
                        <span>Thiếu {(v.cost - gomXu).toLocaleString("vi-VN")} xu</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Panel 2: Ví Voucher của tôi */}
      {activeSubTab === "my-vouchers" && (
        <div>
          {allRedeemed.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground text-xs sm:text-sm bg-muted/20 border border-dashed border-border rounded-lg">
              Bạn chưa đổi voucher nào. Dùng GomXu tích lũy để đổi mã ưu đãi nhé!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {allRedeemed.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg p-3.5 flex flex-col justify-between gap-3 shadow-xs"
                >
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">
                      {item.discountDisplay}
                    </span>
                    <h4 className="font-semibold text-xs sm:text-sm text-foreground mt-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {item.maxDiscount} · {item.expiresIn}
                    </p>
                  </div>

                  <div className="bg-muted p-2 rounded-md flex items-center justify-between gap-2 border border-border/60">
                    <span className="font-mono font-bold text-xs text-foreground tracking-wider select-all">
                      {item.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(item.code)}
                      className="text-xs text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === item.code ? (
                        <>
                          <Check size={12} className="text-brand-green" />
                          <span className="text-brand-green">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
