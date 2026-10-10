"use client";

import {
  Banknote,
  ShoppingBag,
  Users,
  Gavel,
  ShieldCheck,
  TrendingUp,
  Flame,
} from "lucide-react";
import { KPI_DATA } from "./dashboard-data";

const ICON_MAP: Record<string, React.ElementType> = {
  Banknote,
  ShoppingBag,
  Users,
  Gavel,
  ShieldCheck,
};

export function KpiCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {KPI_DATA.map((kpi) => {
        const Icon = ICON_MAP[kpi.icon] || Banknote;
        return (
          <div
            key={kpi.label}
            className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            {/* Decorative circle */}
            <div
              className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${kpi.bgClass} group-hover:scale-125 transition-transform`}
            />

            <div className="flex items-center justify-between relative">
              <span className="text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                {kpi.label}
              </span>
              <div
                className={`w-9 h-9 rounded-xl ${kpi.iconBgClass} flex items-center justify-center`}
              >
                <Icon size={20} />
              </div>
            </div>

            <div className="mt-4 relative">
              <div className="text-headline-md text-on-surface tracking-tight">
                {kpi.value}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-label-sm">
                {kpi.changeType === "up" ? (
                  <>
                    <TrendingUp size={16} className="text-tertiary" />
                    <span className="font-bold text-tertiary">{kpi.change}</span>
                    <span className="text-on-surface-variant font-normal">
                      {kpi.subtitle}
                    </span>
                  </>
                ) : kpi.label === "Đấu giá live" ? (
                  <>
                    <Flame size={16} className="text-primary" />
                    <span className="font-bold text-primary">{kpi.change}</span>
                    <span className="text-on-surface-variant font-normal">
                      {kpi.subtitle}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="inline-block w-2 h-2 rounded-full bg-tertiary" />
                    <span className="font-bold text-tertiary">{kpi.change}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
