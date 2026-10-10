"use client";

import {
  User,
  MapPin,
  Wallet,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProfileAccountSidebarProps {
  dict?: Dictionary;
  onNavigateSettings?: (section?: string) => void;
}

export function ProfileAccountSidebar({
  dict,
  onNavigateSettings,
}: ProfileAccountSidebarProps) {
  const p = dict?.profile;

  const menuItems = [
    {
      id: "info",
      label: p?.menu_account_info || "Thông tin tài khoản",
      icon: <User className="w-4 h-4 text-primary" />,
      active: true,
    },
    {
      id: "shipping",
      label: p?.menu_shipping_address || "Địa chỉ nhận hàng",
      icon: <MapPin className="w-4 h-4 text-emerald-600" />,
      badge: "2 địa chỉ",
    },
    {
      id: "payment",
      label: p?.menu_payment || "Thanh toán",
      icon: <Wallet className="w-4 h-4 text-amber-600" />,
      badge: "Ví GomPay",
    },
    {
      id: "security",
      label: p?.menu_security || "Bảo mật",
      icon: <ShieldCheck className="w-4 h-4 text-blue-600" />,
      badge: "2FA Bật",
    },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-3">
      <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs">
        <h3 className="text-sm font-bold text-foreground border-b border-border/70 pb-2.5 mb-2 flex items-center justify-between">
          <span>{p?.account_manage_title || "Quản lý tài khoản"}</span>
        </h3>

        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigateSettings?.(item.id)}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/70 text-left text-xs sm:text-sm font-medium text-foreground transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-muted group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1">
                  {item.badge && (
                    <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Safety & Fandom Assurance Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-bold text-foreground mb-1">GomGoods Bảo Vệ Fandom</p>
          <p className="text-muted-foreground leading-relaxed">
            Mọi giao dịch thanh lý đều được giữ tiền an toàn cho đến khi bạn nhận và kiểm tra hàng thành công.
          </p>
        </div>
      </div>
    </aside>
  );
}
