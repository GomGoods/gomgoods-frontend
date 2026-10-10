"use client";

import { useState, useCallback } from "react";
import {
  GripVertical,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  CheckCircle2,
  Layout,
  Info,
} from "lucide-react";
import { MOCK_HOMEPAGE_SECTIONS, type HomepageSection } from "../dashboard-data";

export function HomepageLayoutEditor() {
  const [sections, setSections] = useState<HomepageSection[]>(
    [...MOCK_HOMEPAGE_SECTIONS].sort((a, b) => a.order - b.order)
  );
  const [saved, setSaved] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => {
    setDragIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setDragOverIdx(idx);
  };

  const handleDrop = (targetIdx: number) => {
    if (dragIdx === null || dragIdx === targetIdx) {
      setDragIdx(null);
      setDragOverIdx(null);
      return;
    }
    const items = [...sections];
    const [moved] = items.splice(dragIdx, 1);
    items.splice(targetIdx, 0, moved);
    const reordered = items.map((item, i) => ({ ...item, order: i + 1 }));
    setSections(reordered);
    setDragIdx(null);
    setDragOverIdx(null);
    setSaved(false);
  };

  const toggleVisibility = useCallback((id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
    setSaved(false);
  }, []);

  const handleSave = () => {
    setSaved(true);
    // Mock save
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSections(
      [...MOCK_HOMEPAGE_SECTIONS].sort((a, b) => a.order - b.order)
    );
    setSaved(false);
  };

  const visibleCount = sections.filter((s) => s.visible).length;
  const hiddenCount = sections.filter((s) => !s.visible).length;

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-lg text-on-surface tracking-tight">
            Bố cục Trang chủ
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Kéo thả để sắp xếp thứ tự các section trên trang chủ. Bật/tắt để ẩn hiện.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant text-label-md border border-outline-variant/30 hover:bg-surface-container-low transition-colors"
          >
            <RotateCcw size={16} />
            Đặt lại
          </button>
          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-label-md shadow-md transition-all active:scale-95 ${
              saved
                ? "bg-tertiary text-on-tertiary"
                : "bg-primary text-on-primary hover:bg-on-primary-container"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 size={16} />
                Đã lưu!
              </>
            ) : (
              <>
                <Save size={16} />
                Lưu bố cục
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 bg-tertiary-fixed/20 rounded-xl border border-tertiary/10">
        <Info size={18} className="text-tertiary mt-0.5 shrink-0" />
        <div>
          <p className="text-label-md text-on-surface">
            Kéo thả các block bên dưới để thay đổi thứ tự hiển thị trên trang chủ.
          </p>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Các section bị ẩn sẽ không hiển thị cho người dùng nhưng vẫn được lưu cấu hình. Nhấn biểu tượng mắt để bật/tắt.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-label-sm">
        <span className="flex items-center gap-1.5 text-tertiary">
          <Eye size={14} />
          <span className="font-semibold">{visibleCount}</span> đang hiện
        </span>
        <span className="flex items-center gap-1.5 text-on-surface-variant">
          <EyeOff size={14} />
          <span className="font-semibold">{hiddenCount}</span> đang ẩn
        </span>
      </div>

      {/* Section list */}
      <div className="space-y-2">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragLeave={() => setDragOverIdx(null)}
            onDrop={() => handleDrop(idx)}
            className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${
              dragOverIdx === idx
                ? "border-primary bg-primary-container/10 shadow-md"
                : section.visible
                  ? "bg-surface-container-lowest border-outline-variant/20 hover:shadow-sm"
                  : "bg-surface-container-low/50 border-outline-variant/10 opacity-60 hover:opacity-80"
            } ${dragIdx === idx ? "opacity-40 scale-[0.98]" : ""}`}
          >
            {/* Drag handle */}
            <button className="cursor-grab active:cursor-grabbing text-on-surface-variant/40 group-hover:text-on-surface-variant transition-colors">
              <GripVertical size={20} />
            </button>

            {/* Order badge */}
            <span
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-label-md font-bold shrink-0 ${
                section.visible
                  ? "bg-primary-container/30 text-primary"
                  : "bg-surface-container text-on-surface-variant/50"
              }`}
            >
              {idx + 1}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Layout size={16} className="text-on-surface-variant shrink-0" />
                <span className="text-label-lg text-on-surface truncate">
                  {section.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-label-sm text-on-surface-variant font-semibold shrink-0">
                  {section.type}
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant mt-0.5 truncate">
                {section.description}
              </p>
            </div>

            {/* Toggle visibility */}
            <button
              onClick={() => toggleVisibility(section.id)}
              title={section.visible ? "Ẩn section" : "Hiện section"}
              className={`p-2 rounded-lg transition-colors ${
                section.visible
                  ? "text-tertiary hover:bg-tertiary/10"
                  : "text-on-surface-variant/50 hover:bg-surface-container hover:text-on-surface-variant"
              }`}
            >
              {section.visible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        ))}
      </div>

      {/* Preview summary */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20">
        <h3 className="text-label-lg text-on-surface mb-4">
          Thứ tự hiển thị trên trang chủ
        </h3>
        <div className="flex flex-wrap gap-2">
          {sections
            .filter((s) => s.visible)
            .map((section, idx) => (
              <span
                key={section.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container/20 text-label-sm text-on-surface"
              >
                <span className="font-bold text-primary">{idx + 1}</span>
                {section.name}
              </span>
            ))}
        </div>
        {hiddenCount > 0 && (
          <p className="text-body-sm text-on-surface-variant mt-3">
            + {hiddenCount} section đang ẩn
          </p>
        )}
      </div>
    </div>
  );
}
