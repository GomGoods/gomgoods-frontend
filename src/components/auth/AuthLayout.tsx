import { AuthHeader } from "./AuthHeader";
import type { Locale } from "@/app/[lang]/dictionaries";

interface AuthLayoutProps {
  children: React.ReactNode;
  lang: Locale;
  mode: "login" | "register";
}

export function AuthLayout({ children, lang, mode }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-on-background selection:bg-primary selection:text-on-primary">
      {/* Header */}
      <AuthHeader lang={lang} mode={mode} />

      {/* Main Content */}
      <main className="flex-grow py-8 md:py-12 relative custom-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/80 dark:border-outline-variant/60 bg-white/80 dark:bg-surface/80 backdrop-blur-md py-6 text-xs text-slate-500 dark:text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2024 GomGoods Marketplace. All fandoms welcome.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
            <a href="#rules" className="hover:text-primary transition-colors">
              Quy chế hoạt động
            </a>
            <a href="#copyright" className="hover:text-primary transition-colors">
              Bảo vệ bản quyền
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Liên hệ CSKH
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
