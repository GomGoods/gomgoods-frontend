"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useAuthModal } from "./AuthModalContext";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthModal() {
  const { isOpen, activeTab, closeModal, setActiveTab } = useAuthModal();

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={activeTab === "login" ? "Đăng nhập" : "Đăng ký"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 bg-white dark:bg-surface rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 scrollbar-hide">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 dark:bg-surface-container-high hover:bg-slate-200 dark:hover:bg-surface-container-highest flex items-center justify-center text-slate-500 dark:text-on-surface-variant hover:text-slate-800 dark:hover:text-on-surface transition-all duration-150 cursor-pointer"
          aria-label="Đóng"
        >
          <X size={16} className="stroke-[2.5]" />
        </button>

        {/* Tab Switcher */}
        <div className="px-6 pt-6 pb-0">
          <div className="flex bg-slate-100 dark:bg-surface-container-high rounded-xl p-1 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "login"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-slate-600 dark:text-on-surface-variant hover:text-slate-800 dark:hover:text-on-surface"
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "register"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-slate-600 dark:text-on-surface-variant hover:text-slate-800 dark:hover:text-on-surface"
              }`}
            >
              Đăng ký
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 pb-6">
          {activeTab === "login" ? (
            <LoginForm
              lang="vi"
              compact
              onSwitchToRegister={() => setActiveTab("register")}
            />
          ) : (
            <RegisterForm
              lang="vi"
              compact
              onSwitchToLogin={() => setActiveTab("login")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
