"use client";

import { useState } from "react";
import { CHART_FILTER_CHIPS, WEEKLY_CHART_DATA } from "./dashboard-data";

export function WeeklyRevenueChart() {
  const [activeChip, setActiveChip] = useState("Tất cả");

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-headline-sm text-on-surface">
              Tăng trưởng Doanh số &amp; Giao dịch Tuần
            </h2>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-0.5">
            So sánh hiệu suất giữa Sàn thông thường và Phòng đấu giá Collectibles
          </p>
        </div>
        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CHART_FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`px-3 py-1.5 rounded-full text-label-sm font-semibold transition-colors ${
                activeChip === chip
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chart SVG */}
      <div className="w-full mt-6">
        <svg
          className="w-full h-64 overflow-visible"
          viewBox="0 0 720 230"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[20, 70, 120, 170].map((y) => (
            <line
              key={y}
              x1="0"
              x2="720"
              y1={y}
              y2={y}
              stroke="var(--surface-container-low)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          ))}
          <line
            x1="0"
            x2="720"
            y1="210"
            y2="210"
            stroke="var(--surface-container-high)"
            strokeWidth="1"
          />

          {/* Bars */}
          {WEEKLY_CHART_DATA.map((d, i) => {
            const x = 35 + i * 100;
            const mH = d.marketplace;
            const aH = d.auction;
            return (
              <g key={d.day}>
                <rect
                  x={x}
                  y={210 - mH}
                  width="22"
                  height={mH}
                  rx="5"
                  fill="var(--primary-container)"
                  opacity="0.9"
                />
                <rect
                  x={x + 27}
                  y={210 - aH}
                  width="22"
                  height={aH}
                  rx="5"
                  fill="var(--tertiary-container)"
                  opacity="0.9"
                />
              </g>
            );
          })}

          {/* Trend line */}
          <path
            d="M 46 100 Q 146 80, 246 65 T 446 38 T 646 22"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="646" cy="22" r="5" fill="var(--primary)" />
        </svg>

        {/* X-axis labels */}
        <div className="grid grid-cols-7 text-center text-label-sm text-on-surface-variant mt-2">
          {WEEKLY_CHART_DATA.map((d) => (
            <span
              key={d.day}
              className={d.isWeekend ? "font-bold text-primary" : ""}
            >
              {d.day} ({d.date})
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between pt-4 mt-4 bg-surface-container-low/50 px-4 py-3 rounded-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-primary-container" />
            <span className="text-label-sm text-on-surface">Marketplace (890M)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-tertiary-container" />
            <span className="text-label-sm text-on-surface">Phòng Đấu Giá (592.5M)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-primary rounded-full" />
            <span className="text-label-sm text-on-surface">Xu hướng tổng</span>
          </div>
        </div>
        <div className="text-label-sm text-on-surface-variant">
          Thời điểm sôi động nhất:{" "}
          <strong className="text-on-surface">20:00 - 22:30 mỗi tối</strong>
        </div>
      </div>
    </div>
  );
}
