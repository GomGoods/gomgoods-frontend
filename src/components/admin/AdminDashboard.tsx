"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { KpiCards } from "./KpiCards";
import { WeeklyRevenueChart } from "./WeeklyRevenueChart";
import { CategoryDonutChart } from "./CategoryDonutChart";
import { RealtimeActivities } from "./RealtimeActivities";
import { UrgentAlerts } from "./UrgentAlerts";
import { HomepageCampaignSummary } from "./HomepageCampaignSummary";
import { QuickActionsDock } from "./QuickActionsDock";

const TIMEFRAMES = ["Hôm nay", "7 ngày qua", "Tháng này"] as const;

export function AdminDashboard() {
  const [activeTimeframe, setActiveTimeframe] = useState<string>("7 ngày qua");

  const exportDashboardReport = () => {
    const reportDate = new Date().toLocaleDateString("vi-VN");
    const headers = ["Chỉ số", "Giá trị", "Khung thời gian", "Ghi chú"];
    const rows = [
      ["Tổng doanh thu GMV", "128,450,000 đ", activeTimeframe, "+14.2% so với kỳ trước"],
      ["Đơn hàng hoàn tất", "342 đơn", activeTimeframe, "Tỷ lệ giao thành công 98.4%"],
      ["Phiên đấu giá Live", "18 phiên", activeTimeframe, "Tổng 142 lượt bid đang hoạt động"],
      ["Tranh chấp cần xử lý", "3 hồ sơ", activeTimeframe, "Bảo vệ bởi GomPay Escrow"],
      ["Người dùng mới", "89 thành viên", activeTimeframe, "+22% tăng trưởng"],
    ];

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bao_cao_dashboard_gomgoods_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-8">
      {/* SECTION 1: Header & Timeframe */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm uppercase tracking-wider bg-secondary-container text-on-secondary-container">
              GomGoods Admin Ops
            </span>
            <span className="inline-flex items-center gap-1.5 text-label-sm text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              Đồng bộ thời gian thực
            </span>
          </div>
          <h1 className="text-headline-lg text-on-surface tracking-tight">
            Xin chào Quản trị viên!{" "}
            <span className="inline-block hover:rotate-12 transition-transform cursor-default">
              👋
            </span>
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Tổng hợp tình hình kinh doanh sàn Fandom &amp; Đấu giá vật phẩm sưu
            tầm hôm nay.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl shadow-sm">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={`px-4 py-2 rounded-lg text-label-md transition-all ${
                  activeTimeframe === tf
                    ? "bg-surface-container-lowest text-primary shadow-sm font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <button
            onClick={exportDashboardReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container text-label-md shadow-md hover:bg-primary hover:text-on-primary transition-all active:scale-95 cursor-pointer"
          >
            <Download size={18} />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </section>

      {/* SECTION 2: KPI Cards */}
      <KpiCards />

      {/* SECTION 3: Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <WeeklyRevenueChart />
        <CategoryDonutChart />
      </section>

      {/* SECTION 4: Activities & Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <RealtimeActivities />
        <div className="lg:col-span-5 space-y-6">
          <UrgentAlerts />
          <HomepageCampaignSummary />
        </div>
      </section>

      {/* SECTION 5: Quick Actions */}
      <QuickActionsDock />
    </div>
  );
}
