"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Image,
  Sparkles,
  LayoutDashboard,
  Megaphone,
  PlusCircle,
  Users,
  HandHeart,
  User,
  Package,
  Gavel,
  MessageSquare,
  AlertTriangle,
  Settings,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_STRUCTURE: (NavItem | NavGroup)[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutGrid },
  {
    title: "Storefront",
    items: [
      { label: "Quản lý Banner", path: "/admin/storefront/banners", icon: Image },
      { label: "Khuyến mãi & Nổi bật", path: "/admin/storefront/promotions", icon: Sparkles },
      { label: "Bố cục Trang chủ", path: "/admin/storefront/layout", icon: LayoutDashboard },
    ],
  },
  {
    title: "Engagement",
    items: [
      { label: "Tất cả Chiến dịch", path: "/admin/campaigns", icon: Megaphone },
      { label: "Tạo Chiến dịch", path: "/admin/campaigns/create", icon: PlusCircle },
      { label: "Người tham gia", path: "/admin/campaigns/participants", icon: Users },
      { label: "Đóng góp", path: "/admin/campaigns/contributions", icon: HandHeart },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Người dùng", path: "/admin/users", icon: User },
      { label: "Sản phẩm", path: "/admin/products", icon: Package },
      { label: "Đấu giá", path: "/admin/auctions", icon: Gavel },
      { label: "Diễn đàn", path: "/admin/forum", icon: MessageSquare },
      { label: "Tranh chấp", path: "/admin/disputes", icon: AlertTriangle },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "Cài đặt", path: "/admin/settings", icon: Settings },
    ],
  },
];

function isActive(pathname: string, itemPath: string): boolean {
  // Exact match for dashboard
  if (itemPath === "/admin") {
    return pathname === "/admin" || pathname.match(/^\/[a-z]{2}\/admin$/) !== null;
  }
  // Prefix match for sub-routes (strip locale prefix)
  const stripped = pathname.replace(/^\/[a-z]{2}/, "");
  return stripped === itemPath || stripped.startsWith(itemPath + "/");
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-6">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-container text-on-primary text-headline-sm font-semibold">
          G
        </span>
        <div>
          <span className="text-headline-sm text-on-surface tracking-tight block leading-tight">
            GomGoods
          </span>
          <span className="text-label-sm text-on-surface-variant block uppercase tracking-wider">
            Admin Workspace
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide">
        {NAV_STRUCTURE.map((entry, idx) => {
          // Top-level item (Dashboard)
          if ("path" in entry) {
            const active = isActive(pathname, entry.path);
            return (
              <nav key={idx} className="space-y-1">
                <Link
                  href={`/vi${entry.path}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-label-lg ${
                    active
                      ? "bg-primary-container text-on-primary-container font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                >
                  <entry.icon size={20} />
                  <span>{entry.label}</span>
                </Link>
              </nav>
            );
          }

          // Group
          return (
            <div key={idx}>
              <span className="px-3 text-label-sm uppercase tracking-wider text-on-surface-variant/70 font-semibold">
                {entry.title}
              </span>
              <nav className="mt-1.5 space-y-0.5">
                {entry.items.map((item) => {
                  const active = isActive(pathname, item.path);
                  return (
                    <Link
                      key={item.path}
                      href={`/vi${item.path}`}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-label-lg ${
                        active
                          ? "bg-primary-container text-on-primary-container font-semibold"
                          : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                      }`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          );
        })}
      </div>

      {/* Bottom Status */}
      <div className="p-4 bg-surface-container-low mx-3 mb-3 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-tertiary" />
          <span className="text-label-sm text-on-surface">Cluster Live</span>
        </div>
        <span className="text-body-sm text-on-surface-variant">v2.4.1</span>
      </div>
    </aside>
  );
}
