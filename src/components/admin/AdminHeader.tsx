"use client";

import { Search, Bell, Shield } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="text"
            placeholder="Tìm kiếm nhanh người dùng, hàng hóa, chiến dịch..."
            className="w-full pl-9 pr-4 py-1.5 bg-surface-container-low rounded-lg text-on-surface placeholder:text-on-surface-variant text-body-sm focus:outline-none focus:bg-surface-container-high transition-colors"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface-container-lowest" />
        </button>

        {/* Reports shield */}
        <button className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors">
          <Shield size={22} />
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-semibold">
            0
          </span>
        </button>

        {/* Admin profile */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <span className="text-label-md text-on-surface block leading-tight">
              HQ Ops Officer
            </span>
            <span className="text-body-sm text-on-surface-variant block">
              Super Admin
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
