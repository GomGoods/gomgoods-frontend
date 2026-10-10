"use client";

import { MoreHorizontal } from "lucide-react";
import { CATEGORY_DATA } from "./dashboard-data";

export function CategoryDonutChart() {
  // Calculate donut segments
  const circumference = 2 * Math.PI * 38; // ~238.76
  let offset = 0;

  return (
    <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-headline-sm text-on-surface">Phân bố Danh mục Hot</h2>
          <button className="text-on-surface-variant hover:text-on-surface">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <p className="text-body-sm text-on-surface-variant mt-0.5">
          Thị phần giao dịch theo thể loại sưu tầm
        </p>
      </div>

      {/* Donut */}
      <div className="relative flex items-center justify-center my-6">
        <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="transparent"
            stroke="var(--surface-container-low)"
            strokeWidth="14"
          />
          {CATEGORY_DATA.map((cat) => {
            const dashLen = (cat.percentage / 100) * circumference;
            const currentOffset = offset;
            offset += dashLen;
            return (
              <circle
                key={cat.name}
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke={cat.color}
                strokeWidth="14"
                strokeDasharray={`${dashLen} ${circumference}`}
                strokeDashoffset={-currentOffset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-headline-md text-on-surface font-bold">100%</span>
          <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
            Top Goods
          </span>
        </div>
      </div>

      {/* Category progress */}
      <div className="space-y-3">
        {CATEGORY_DATA.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center justify-between text-label-sm">
              <span className="flex items-center gap-2 text-on-surface">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${cat.bgClass}`}
                />
                {cat.name}
              </span>
              <span className="font-bold text-on-surface">{cat.percentage}%</span>
            </div>
            <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-1 overflow-hidden">
              <div
                className={`${cat.bgClass} h-full rounded-full`}
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
