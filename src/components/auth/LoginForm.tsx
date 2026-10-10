"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalContext";
import type { Locale } from "@/app/[lang]/dictionaries";

interface LoginFormProps {
  lang: Locale;
  compact?: boolean;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ lang, compact, onSwitchToRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const { login } = useAuthModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login — set auth state with default user data
    login({
      username: formData.identifier || "nguyen_collector",
      displayName: formData.identifier || "Nguyễn Vũ Hoàng",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    });
  };

  const formContent = (
    <>
      {/* Heading */}
      <div className={compact ? "mb-4" : "mb-6"}>
        <h2
          className={
            compact
              ? "text-xl font-black text-slate-900 dark:text-white tracking-tight"
              : "text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight"
          }
        >
          Đăng nhập GomGoods
        </h2>
        <p
          className={
            compact
              ? "text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium"
              : "text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium"
          }
        >
          Chào mừng trở lại — Fandom của bạn đang chờ!
        </p>
      </div>

      {/* Social Login Buttons — 3 ngang (Google, Facebook, Discord) */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {/* Google */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-outline-variant/80 hover:border-primary/60 hover:bg-primary-container/10 text-xs sm:text-sm font-medium text-on-surface transition duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" fill="#EA4335" />
            <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4" />
            <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.1-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" fill="#FBBC05" />
            <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" fill="#34A853" />
          </svg>
          <span>Google</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-outline-variant/80 hover:border-[#1877F2]/50 hover:bg-blue-50/30 text-xs sm:text-sm font-medium text-on-surface transition duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Facebook</span>
        </button>

        {/* Discord */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-outline-variant/80 hover:border-[#5865F2]/50 hover:bg-indigo-50/30 text-xs sm:text-sm font-medium text-on-surface transition duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-[#5865F2]" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          <span>Discord</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex py-2 items-center mb-6">
        <div className="flex-grow border-t border-outline-variant/60" />
        <span className="flex-shrink mx-3 text-[11px] font-semibold text-on-surface-variant/80 uppercase tracking-wider text-center">
          Hoặc đăng nhập bằng tài khoản GomGoods
        </span>
        <div className="flex-grow border-t border-outline-variant/60" />
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email or Username */}
        <div>
          <label
            htmlFor={compact ? "modal-identifier" : "identifier"}
            className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5"
          >
            Email hoặc Tên tài khoản (@username)
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/70">
              <Mail size={18} />
            </div>
            <input
              id={compact ? "modal-identifier" : "identifier"}
              type="text"
              placeholder="you@email.com hoặc @username"
              value={formData.identifier}
              onChange={(e) =>
                setFormData({ ...formData, identifier: e.target.value })
              }
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-outline-variant/80 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/60 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              autoComplete="username"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor={compact ? "modal-password" : "password"}
            className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5"
          >
            Mật khẩu
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/70">
              <Lock size={18} />
            </div>
            <input
              id={compact ? "modal-password" : "password"}
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-11 pr-12 py-3 rounded-xl border border-outline-variant/80 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/60 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-primary transition cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/30 cursor-pointer"
            />
            <span className="text-on-surface-variant font-medium">
              Ghi nhớ đăng nhập
            </span>
          </label>
          <a
            href="#forgot"
            className="text-primary font-semibold hover:underline transition"
          >
            Quên mật khẩu?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:opacity-95 hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer"
        >
          Đăng nhập
        </button>
      </form>

      {/* Switch to Register */}
      <p className="text-center text-sm text-on-surface-variant mt-6">
        Chưa có tài khoản GomGoods?{" "}
        {onSwitchToRegister ? (
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary font-bold hover:underline transition cursor-pointer bg-transparent border-0 p-0"
          >
            Đăng ký ngay
          </button>
        ) : (
          <Link
            href={`/${lang}/register`}
            className="text-primary font-bold hover:underline transition"
          >
            Đăng ký ngay
          </Link>
        )}
      </p>
    </>
  );

  if (compact) {
    return <div data-purpose="login-card">{formContent}</div>;
  }

  return (
    <section className="lg:col-span-7" data-purpose="login-card">
      <div className="bg-white dark:bg-surface rounded-3xl p-6 sm:p-10 shadow-soft-card border border-primary/15 dark:border-outline-variant/60 relative">
        {formContent}
      </div>
    </section>
  );
}
