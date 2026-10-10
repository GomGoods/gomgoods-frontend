"use client";

import {
  AlertTriangle,
  Shield,
  Zap,
  Hourglass,
  RefreshCw,
} from "lucide-react";
import { ALERTS } from "./dashboard-data";

const ICON_MAP: Record<string, React.ElementType> = {
  AlertTriangle,
  Shield,
  Zap,
  Hourglass,
};

const SEVERITY_COLOR: Record<string, string> = {
  critical: "text-error",
  high: "text-secondary",
  medium: "text-tertiary",
  low: "text-on-surface-variant",
};

export function UrgentAlerts() {
  return (
    <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-headline-sm text-on-surface">
              Cảnh báo &amp; Xử lý Khẩn
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-label-sm font-bold animate-bounce">
              {ALERTS.length} Mục
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-0.5">
            Yêu cầu can thiệp từ quản trị viên
          </p>
        </div>
        <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Alert items */}
      <div className="space-y-3.5">
        {ALERTS.map((alert) => {
          const Icon = ICON_MAP[alert.icon] || AlertTriangle;
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl ${alert.bgClass} space-y-3`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg ${alert.iconBgClass} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-label-lg text-on-surface font-bold">
                      {alert.title}
                    </span>
                    <span
                      className={`text-label-sm font-semibold ${SEVERITY_COLOR[alert.severity]}`}
                    >
                      {alert.severityLabel}
                    </span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mt-1">
                    {alert.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                {alert.actions.map((action) => (
                  <button
                    key={action.label}
                    className={`px-3 py-1.5 rounded-lg text-label-sm font-semibold transition-all ${
                      action.variant === "primary"
                        ? `${action.actionClass} shadow-sm hover:opacity-90`
                        : "text-on-surface-variant hover:bg-surface-container-lowest"
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
