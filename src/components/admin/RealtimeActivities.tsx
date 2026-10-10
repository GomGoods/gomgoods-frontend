"use client";

import { UserCircle, Store } from "lucide-react";
import { ACTIVITIES } from "./dashboard-data";

export function RealtimeActivities() {
  return (
    <div className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-headline-sm text-on-surface">
              Hoạt động thời gian thực
            </h2>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-0.5">
            Cập nhật liên tục các giao dịch và tương tác fandom
          </p>
        </div>
        <button className="text-label-md text-primary hover:underline">
          Xem tất cả
        </button>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container">
        {ACTIVITIES.map((act) => (
          <div key={act.id} className="relative flex items-start gap-4">
            {/* Dot */}
            <div
              className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full ${act.dotClass} flex items-center justify-center ring-4 ring-surface-container-lowest`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest" />
            </div>

            {/* Content */}
            <div className="flex-1 bg-surface-container-low/60 p-3.5 rounded-xl hover:bg-surface-container-low transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-label-sm font-bold ${act.badgeClass}`}
                  >
                    {act.badge}
                  </span>
                  <span className="text-label-md text-on-surface font-semibold">
                    {act.title}
                  </span>
                </div>
                <span className="text-body-sm text-on-surface-variant">
                  {act.time}
                </span>
              </div>

              <p className="text-body-sm text-on-surface mt-1.5">
                {act.description}
              </p>

              {act.meta && (
                <div className="flex items-center gap-3 mt-2 text-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <UserCircle size={14} /> {act.meta[0]}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Store size={14} /> {act.meta[1]}
                  </span>
                </div>
              )}

              {act.actions && (
                <div className="mt-2.5 flex items-center gap-2">
                  {act.actions.map((action) => (
                    <button
                      key={action.label}
                      className={`px-2.5 py-1 rounded text-label-sm font-semibold transition-colors ${
                        action.primary
                          ? "bg-surface-container-highest text-on-surface hover:bg-surface-container"
                          : "text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
