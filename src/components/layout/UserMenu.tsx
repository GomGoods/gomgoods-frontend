"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuthModal } from "@/components/auth/AuthModalContext";
import { LogOut, User, Settings } from "lucide-react";
import type { Locale } from "@/app/[lang]/dictionaries";

interface UserMenuProps {
  lang?: Locale;
}

export function UserMenu({ lang: propLang }: UserMenuProps) {
  const { openModal, isLoggedIn, user, logout } = useAuthModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lang = propLang || "vi";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // Not logged in: show login button
  if (!isLoggedIn || !user) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => openModal("login")}
          className="w-9 h-9 rounded-full overflow-hidden border border-outline-variant cursor-pointer bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:border-primary hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-primary/30"
          aria-label="Đăng nhập / Đăng ký"
          title="Đăng nhập / Đăng ký"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG1BBsjbfaBwk4sGUZmCahaTSHblgPxGCexvJEGSpDWwWAWKuQKABGWqJ71Y35VO9z93wSVRmHkdjwYKmme4nZlTxSvhZf2U_ykeA4ycUw-h9aK-WJh_ujHrAhlrmjuVau1hCmEBixRRsw3cQiGTfr4BZb-Z-88krf569JB4gIBn7V0ZzrTj7kuXC4SKjrZpvxTgL5zTaW9yjopkUu0lWHrplUaXZdaX0JZXJcOFUYf6rS2uujSaVk"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    );
  }

  // Logged in: show user avatar with dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen((v) => !v)}
        className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary cursor-pointer flex items-center justify-center hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-primary/30"
        aria-label="Menu người dùng"
        title={user.displayName}
      >
        <img
          src={user.avatar}
          alt={user.displayName}
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-outline-variant rounded-xl shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* User info */}
          <div className="px-4 py-2.5 border-b border-outline-variant/60">
            <p className="text-sm font-bold text-on-surface truncate">
              {user.displayName}
            </p>
            <p className="text-xs text-on-surface-variant truncate">
              @{user.username}
            </p>
          </div>

          {/* Menu items */}
          <Link
            href={`/${lang}/profile`}
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <User size={16} />
            <span>Trang cá nhân</span>
          </Link>
          <Link
            href={`/${lang}/profile?tab=settings`}
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <Settings size={16} />
            <span>Cài đặt</span>
          </Link>

          {/* Divider */}
          <div className="my-1 h-px bg-outline-variant/60" />

          {/* Logout */}
          <button
            type="button"
            onClick={() => {
              logout();
              setIsDropdownOpen(false);
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-error hover:bg-error/5 transition-colors w-full text-left cursor-pointer"
          >
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );
}

