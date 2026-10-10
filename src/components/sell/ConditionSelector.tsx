"use client";

import { ShieldCheck, AlertTriangle } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ConditionSelectorProps {
  condition: string;
  onConditionChange: (condition: string) => void;
  defectDescription: string;
  onDefectDescriptionChange: (val: string) => void;
  dict: Dictionary;
}

export function ConditionSelector({
  condition,
  onConditionChange,
  defectDescription,
  onDefectDescriptionChange,
  dict,
}: ConditionSelectorProps) {
  const t = dict.sell;

  const conditions = [
    {
      id: "new",
      label: t.cond_new,
      desc: "Chưa bóc seal / chưa qua sử dụng",
    },
    {
      id: "likenew",
      label: t.cond_likenew,
      desc: "Bóc seal kiểm tra, không tì vết",
    },
    {
      id: "good",
      label: t.cond_good,
      desc: "Đã trưng bày, còn đẹp, xước siêu nhẹ",
    },
    {
      id: "used",
      label: t.cond_used,
      desc: "Có vết cấn/xước, gãy/mất part",
    },
  ];

  const showDefectInput = condition === "used" || condition === "good";

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 md:p-6 shadow-sm">
      <h2 className="text-base md:text-lg font-bold text-on-surface flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <span>{t.condition_title} *</span>
      </h2>

      {/* Condition Radio Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-4">
        {conditions.map((item) => {
          const isSelected = condition === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onConditionChange(item.id)}
              className={`flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-xs ring-1 ring-primary"
                  : "border-outline-variant bg-surface hover:bg-surface-container-low text-on-surface hover:border-outline"
              }`}
            >
              <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
              <span className="text-[10px] sm:text-[11px] font-normal text-on-surface-variant mt-1 line-clamp-1">
                {item.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Defect Description (visible when 'good' or 'used') */}
      {showDefectInput && (
        <div className="mt-4 pt-4 border-t border-outline-variant/60 animate-in fade-in slide-in-from-top-2 duration-200">
          <label
            htmlFor="defect_desc"
            className="block text-xs sm:text-sm font-semibold text-on-surface mb-2 flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>{t.defect_title}</span>
            <span className="text-[11px] font-normal text-on-surface-variant">
              ({condition === "used" ? "Bắt buộc mô tả rõ" : "Nếu có"})
            </span>
          </label>
          <textarea
            id="defect_desc"
            rows={2}
            value={defectDescription}
            onChange={(e) => onDefectDescriptionChange(e.target.value)}
            placeholder={t.defect_desc_placeholder}
            className="w-full text-xs sm:text-sm p-3 rounded-lg border border-outline-variant bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
          />
        </div>
      )}
    </section>
  );
}
