"use client";

import { useAuthModal } from "@/components/auth/AuthModalContext";
import { Lock, LogIn, UserPlus } from "lucide-react";

interface RequireAuthProps {
  children: React.ReactNode;
  /** Page title to show in the gate screen */
  pageName?: string;
}

/**
 * Wraps protected page content.
 * If the user is not logged in, shows a styled gate screen
 * prompting them to log in instead of the actual content.
 */
export function RequireAuth({ children, pageName }: RequireAuthProps) {
  const { isLoggedIn, openModal } = useAuthModal();

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[55vh] py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock
            className="text-primary"
            size={36}
            strokeWidth={1.8}
          />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
          Bạn cần đăng nhập để truy cập{" "}
          {pageName && (
            <span className="text-primary">{pageName}</span>
          )}
        </h2>

        {/* Description */}
        <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm mx-auto">
          Đăng nhập hoặc đăng ký tài khoản GomGoods để tham gia cộng đồng,
          khám phá chiến dịch và nhiều tính năng hấp dẫn khác.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => openModal("login")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:opacity-95 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
          >
            <LogIn size={18} />
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => openModal("register")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 active:scale-[0.98] transition-all cursor-pointer"
          >
            <UserPlus size={18} />
            Đăng ký ngay
          </button>
        </div>

        {/* Subtle note */}
        <p className="text-xs text-on-surface-variant/60 pt-2">
          Hoàn toàn miễn phí • Chỉ mất 30 giây
        </p>
      </div>
    </section>
  );
}
