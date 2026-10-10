"use client";

import Image from "next/image";
import { Clock3, PackageCheck, Star, Store } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalContext";

const quickLinks = [
  { label: "Đã mua", icon: PackageCheck },
  { label: "Bộ sưu tập", icon: Star },
  { label: "Shop đã lưu", icon: Store },
  { label: "Lịch sử xem", icon: Clock3 },
];

export function UserQuickCard() {
  const { openModal } = useAuthModal();

  return (
    <aside className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-4 shadow-xs sm:p-5">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-card">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG1BBsjbfaBwk4sGUZmCahaTSHblgPxGCexvJEGSpDWwWAWKuQKABGWqJ71Y35VO9z93wSVRmHkdjwYKmme4nZlTxSvhZf2U_ykeA4ycUw-h9aK-WJh_ujHrAhlrmjuVau1hCmEBixRRsw3cQiGTfr4BZb-Z-88krf569JB4gIBn7V0ZzrTj7kuXC4SKjrZpvxTgL5zTaW9yjopkUu0lWHrplUaXZdaX0JZXJcOFUYf6rS2uujSaVk"
            alt="Ảnh đại diện GomGoods Collector"
            width={44}
            height={44}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">
            GomGoods Collector
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => openModal("register")}
              className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coral"
            >
              Đăng ký
            </button>
            <span aria-hidden="true" className="h-3 w-px bg-border" />
            <button
              type="button"
              onClick={() => openModal("login")}
              className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coral"
            >
              Mở shop
            </button>
          </div>
        </div>
      </div>

      <div className="my-3 text-center sm:my-3.5">
        <h3 className="text-base font-bold tracking-tight text-foreground">
          Đăng nhập GomGoods, nhiều ưu đãi hơn
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Gợi ý đúng gu, tìm kiếm nhanh và mua bán an toàn.
        </p>

        <button
          type="button"
          onClick={() => openModal("login")}
          className="mt-3 min-h-11 w-full rounded-xl bg-brand-coral px-4 text-sm font-bold text-white transition-colors hover:bg-brand-coral-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coral"
        >
          Đăng nhập ngay
        </button>
      </div>

      <div className="grid grid-cols-4 gap-1">
        {quickLinks.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => openModal("login")}
            className="group flex min-h-[58px] flex-col items-center justify-center gap-1.5 rounded-xl px-1 text-center transition-colors hover:bg-muted active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-coral"
          >
            <Icon
              aria-hidden="true"
              size={22}
              strokeWidth={1.8}
              className="text-foreground transition-colors group-hover:text-brand-coral"
            />
            <span className="text-[10.5px] font-medium leading-tight text-foreground">
              {label}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => openModal("login")}
        className="group mt-auto flex w-full items-end gap-3 border-t border-border/70 pt-3 text-left active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coral"
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-foreground">
            Tích GomXu đổi voucher
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Điểm danh mỗi ngày để nhận xu
          </p>
          <span className="mt-2 inline-flex rounded-md bg-brand-coral px-2.5 py-1 text-[10px] font-bold text-white transition-colors group-hover:bg-brand-coral-hover">
            Nhận ngay
          </span>
        </div>

        <Image
          src="/GomXu.png"
          alt="Đồng GomXu"
          width={54}
          height={54}
          className="h-[54px] w-[54px] shrink-0 object-contain"
        />
      </button>
    </aside>
  );
}
