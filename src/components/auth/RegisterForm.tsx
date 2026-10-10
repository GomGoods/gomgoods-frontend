"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Check } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalContext";
import type { Locale } from "@/app/[lang]/dictionaries";

interface RegisterFormProps {
  lang: Locale;
  compact?: boolean;
  onSwitchToLogin?: () => void;
}

export function RegisterForm({ lang, compact, onSwitchToLogin }: RegisterFormProps) {
  const { login } = useAuthModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "gom_otaku99",
    contact: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });

  // Dynamic Password Strength Meter
  const passwordStrength = useMemo(() => {
    const p = formData.password;
    if (!p) return { score: 0, label: "" };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 1) return { score: 1, label: "Yếu" };
    if (score === 2) return { score: 2, label: "Trung bình" };
    if (score === 3) return { score: 3, label: "Khá mạnh" };
    return { score: 4, label: "Rất mạnh" };
  }, [formData.password]);

  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register — immediately log in with provided data
    login({
      username: formData.username || "gom_otaku99",
      displayName: formData.fullName || formData.username || "GomGoods User",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    });
  };

  const idPrefix = compact ? "modal-reg-" : "";

  const formContent = (
    <>
      {/* Form Header */}
      <div className={compact ? "mb-4" : "mb-8"}>
        <h2
          className={
            compact
              ? "text-xl font-black text-slate-900 dark:text-white tracking-tight"
              : "text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight"
          }
        >
          Tạo tài khoản mới
        </h2>
        <p
          className={
            compact
              ? "text-xs text-slate-500 dark:text-slate-400 mt-0.5"
              : "text-sm text-slate-500 dark:text-slate-400 mt-1"
          }
        >
          Đăng ký thành viên GomGoods chỉ trong 30 giây
        </p>
      </div>

      {/* Social Registration Buttons (Google, Facebook, Discord) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6" data-purpose="social-login">
        {/* Google */}
        <button
          type="button"
          className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-outline-variant/80 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-surface-container-high font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-200 transition cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span>Google</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-outline-variant/80 hover:border-slate-300 hover:bg-[#1877F2]/5 font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-200 transition group cursor-pointer"
        >
          <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Facebook</span>
        </button>

        {/* Discord */}
        <button
          type="button"
          className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-outline-variant/80 hover:border-slate-300 hover:bg-[#5865F2]/5 font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-200 transition group cursor-pointer"
        >
          <svg className="w-4 h-4 fill-[#5865F2]" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          <span>Discord</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-slate-200 dark:border-outline-variant/60 w-full" />
        <span className="bg-white dark:bg-surface px-3 text-xs uppercase tracking-wider text-slate-400 font-semibold absolute">
          Hoặc đăng ký bằng email
        </span>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name & Display Name */}
        <div>
          <label
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5"
            htmlFor={`${idPrefix}full-name`}
          >
            Họ và tên / Tên hiển thị <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-outline-variant/80 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white dark:bg-surface-container-lowest"
              id={`${idPrefix}full-name`}
              placeholder="Ví dụ: Ryouma Collector"
              required
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
        </div>

        {/* Username with Availability Indicator */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200"
              htmlFor={`${idPrefix}username`}
            >
              Username định danh <span className="text-primary">*</span>
            </label>

            {/* Availability Indicator */}
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <Check size={12} className="text-emerald-500 stroke-[3]" />
              <span>Khả dụng</span>
            </span>
          </div>

          <div className="relative rounded-xl border border-slate-200 dark:border-outline-variant/80 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 bg-white dark:bg-surface-container-lowest overflow-hidden transition">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm font-semibold">
              @
            </span>
            <input
              className="w-full border-0 pl-8 pr-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 bg-transparent focus:ring-0 outline-none"
              id={`${idPrefix}username`}
              required
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Dùng để tag trong deal, xem shop cá nhân: gomgoods.vn/@{formData.username || "username"}
          </p>
        </div>

        {/* Email or Phone */}
        <div>
          <label
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5"
            htmlFor={`${idPrefix}contact`}
          >
            Email hoặc Số điện thoại <span className="text-primary">*</span>
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 dark:border-outline-variant/80 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white dark:bg-surface-container-lowest"
            id={`${idPrefix}contact`}
            placeholder="name@domain.com hoặc 0912..."
            required
            type="text"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
        </div>

        {/* Password & Password Strength Indicator */}
        <div>
          <label
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5"
            htmlFor={`${idPrefix}password`}
          >
            Mật khẩu <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-outline-variant/80 px-3.5 pr-11 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white dark:bg-surface-container-lowest"
              id={`${idPrefix}password`}
              placeholder="Tối thiểu 8 ký tự"
              required
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-primary transition cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Password Strength Meter - Chỉ hiển thị khi người dùng nhập mật khẩu */}
          {formData.password.length > 0 && (
            <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                <span>
                  Độ mạnh:{" "}
                  <strong
                    className={
                      passwordStrength.score >= 3
                        ? "text-emerald-600 dark:text-emerald-400"
                        : passwordStrength.score === 2
                        ? "text-amber-500"
                        : "text-red-500"
                    }
                  >
                    {passwordStrength.label}
                  </strong>
                </span>
                <span>{passwordStrength.score}/4</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i <= passwordStrength.score
                        ? passwordStrength.score >= 3
                          ? "bg-emerald-500"
                          : passwordStrength.score === 2
                          ? "bg-amber-500"
                          : "bg-red-500"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200"
              htmlFor={`${idPrefix}confirm-password`}
            >
              Xác nhận mật khẩu <span className="text-primary">*</span>
            </label>
            {passwordsMatch && (
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <Check size={12} className="stroke-[3]" /> Khớp mật khẩu
              </span>
            )}
          </div>
          <div className="relative">
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-outline-variant/80 px-3.5 pr-11 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white dark:bg-surface-container-lowest"
              id={`${idPrefix}confirm-password`}
              placeholder="Nhập lại mật khẩu vừa tạo"
              required
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-primary transition cursor-pointer"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* NOTE: Seller intent option excluded per user instruction "(Trừ phần đăng kí làm người bán)" */}

        {/* Terms & Privacy Agreement */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              className="mt-0.5 h-4 w-4 text-primary border-slate-300 rounded focus:ring-primary cursor-pointer"
              required
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) =>
                setFormData({ ...formData, agreeTerms: e.target.checked })
              }
            />
            <span className="text-xs text-slate-600 dark:text-slate-300 leading-tight">
              Tôi đồng ý với{" "}
              <a className="text-primary font-semibold hover:underline" href="#terms">
                Điều khoản dịch vụ
              </a>{" "}
              &amp;{" "}
              <a className="text-primary font-semibold hover:underline" href="#privacy">
                Chính sách quyền riêng tư
              </a>{" "}
              của GomGoods.
            </span>
          </label>
        </div>

        {/* Submit CTA Button with Tactile Shadow */}
        <button
          className="w-full mt-3 bg-primary hover:bg-primary/95 text-white font-bold text-base py-3.5 px-6 rounded-2xl shadow-clay active:translate-y-1 active:shadow-none transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          type="submit"
        >
          <span>Đăng ký tài khoản</span>
          <ArrowRight size={18} />
        </button>

        {/* Redirect to Sign In */}
        <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-3">
          Đã có tài khoản GomGoods?{" "}
          {onSwitchToLogin ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary font-bold hover:underline cursor-pointer bg-transparent border-0 p-0"
            >
              Đăng nhập ngay
            </button>
          ) : (
            <Link
              className="text-primary font-bold hover:underline"
              href={`/${lang}/login`}
            >
              Đăng nhập ngay
            </Link>
          )}
        </p>
      </form>
    </>
  );

  if (compact) {
    return <div data-purpose="registration-card">{formContent}</div>;
  }

  return (
    <section className="lg:col-span-7" data-purpose="registration-card">
      <div className="bg-white dark:bg-surface rounded-3xl p-6 sm:p-10 shadow-soft-card border border-primary/15 dark:border-outline-variant/60 relative">
        {formContent}
      </div>
    </section>
  );
}
