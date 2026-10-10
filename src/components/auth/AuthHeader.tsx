"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, HelpCircle } from "lucide-react";
import type { Locale } from "@/app/[lang]/dictionaries";

interface AuthHeaderProps {
  lang: Locale;
  mode: "login" | "register";
}

export function AuthHeader({ lang, mode }: AuthHeaderProps) {
  const pageTitle = mode === "login" ? "Đăng nhập" : "Đăng ký tài khoản";

  return (
    <header className="w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/60 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Back Button + Logo + Title */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Back to Home Button */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-primary/10 text-on-surface hover:text-primary text-xs sm:text-sm font-semibold transition-all group"
            title="Về trang chủ GomGoods"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Trang chủ</span>
          </Link>

          <div className="h-5 w-px bg-outline-variant/80 hidden sm:block" />

          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 transition hover:opacity-95"
            title="GomGoods Trang chủ"
          >
            <Image
              src="/Logo_Gomgoods_clean.png"
              alt="GomGoods Logo"
              width={220}
              height={112}
              priority
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />
          </Link>

          <div className="h-5 w-px bg-outline-variant/80 hidden sm:block" />

          {/* Page Title */}
          <span className="hidden sm:inline-block text-lg font-bold text-on-surface tracking-tight">
            {pageTitle}
          </span>
        </div>

        {/* Right: Help Action */}
        <div className="flex items-center gap-4">
          <a
            href="#help"
            className="text-xs sm:text-sm font-medium text-on-surface-variant hover:text-primary transition flex items-center gap-1.5"
          >
            <HelpCircle size={18} className="text-primary" />
            <span>Bạn cần trợ giúp?</span>
          </a>
        </div>
      </div>
    </header>
  );
}
