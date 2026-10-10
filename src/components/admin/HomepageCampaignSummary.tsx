"use client";

import {
  Image as ImageIcon,
  Play,
  Clock,
  FileText,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { CAMPAIGN_SUMMARY } from "./dashboard-data";

export function HomepageCampaignSummary() {
  const s = CAMPAIGN_SUMMARY;

  const items = [
    {
      icon: ImageIcon,
      label: "banners đang hiển thị",
      value: s.bannersActive,
      color: "text-tertiary",
      bgColor: "bg-tertiary-fixed/40",
    },
    {
      icon: Play,
      label: "chiến dịch đang chạy",
      value: s.campaignsActive,
      color: "text-primary",
      bgColor: "bg-primary-container/30",
    },
    {
      icon: Clock,
      label: "chiến dịch đã lên lịch",
      value: s.campaignsScheduled,
      color: "text-secondary",
      bgColor: "bg-secondary-container/40",
    },
    {
      icon: FileText,
      label: "chiến dịch nháp",
      value: s.campaignsDraft,
      color: "text-on-surface-variant",
      bgColor: "bg-surface-container-low",
    },
    {
      icon: AlertCircle,
      label: "chiến dịch sắp kết thúc",
      value: s.campaignsEndingSoon,
      color: "text-error",
      bgColor: "bg-error-container/30",
    },
  ];

  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-headline-sm text-on-surface">
          Trang chủ &amp; Chiến dịch
        </h3>
        <Link
          href="/vi/admin/storefront/banners"
          className="text-label-sm text-primary hover:underline flex items-center gap-1"
        >
          Quản lý <ArrowRight size={14} />
        </Link>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${item.bgColor}`}
          >
            <item.icon size={16} className={item.color} />
            <span className="text-label-md text-on-surface">
              <strong className={`font-bold ${item.color}`}>{item.value}</strong>{" "}
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
