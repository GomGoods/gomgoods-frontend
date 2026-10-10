"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  GripVertical,
  Eye,
  Pencil,
  Trash2,
  ArrowUpDown,
  Filter,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  MOCK_PROMOTIONS,
  PROMOTION_CONTENT_TYPE_LABELS,
  type PromotionItem,
  type PromotionStatus,
  type PromotionContentType,
} from "../dashboard-data";

const STATUS_CONFIG: Record<PromotionStatus, { label: string; class: string }> = {
  published: { label: "Đang hiển thị", class: "bg-tertiary/10 text-tertiary" },
  scheduled: { label: "Đã lên lịch", class: "bg-secondary-container text-on-secondary-container" },
  draft: { label: "Bản nháp", class: "bg-surface-container-high text-on-surface-variant" },
  expired: { label: "Đã hết hạn", class: "bg-error-container/40 text-error" },
};

const CONTENT_TYPE_CONFIG: Record<PromotionContentType, { label: string; class: string }> = {
  campaign: { label: "Chiến dịch", class: "bg-primary-container/40 text-primary" },
  category: { label: "Danh mục", class: "bg-tertiary-fixed/40 text-tertiary" },
  product_collection: { label: "Bộ sưu tập", class: "bg-secondary-fixed/60 text-on-secondary-fixed" },
  custom_link: { label: "Liên kết", class: "bg-surface-container-high text-on-surface-variant" },
};

export function PromotionManagement() {
  const [promotions, setPromotions] = useState<PromotionItem[]>(MOCK_PROMOTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PromotionStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<PromotionContentType | "all">("all");
  const [previewPromo, setPreviewPromo] = useState<PromotionItem | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...promotions];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }
    if (typeFilter !== "all") {
      result = result.filter((p) => p.contentType === typeFilter);
    }
    return result.sort((a, b) => a.displayOrder - b.displayOrder);
  }, [promotions, searchQuery, statusFilter, typeFilter]);

  const handleDragStart = (idx: number) => setDragIdx(idx);

  const handleDrop = (targetIdx: number) => {
    if (dragIdx === null || dragIdx === targetIdx) return;
    const items = [...filtered];
    const [moved] = items.splice(dragIdx, 1);
    items.splice(targetIdx, 0, moved);
    const reordered = items.map((item, i) => ({ ...item, displayOrder: i + 1 }));
    setPromotions((prev) => {
      const map = new Map(reordered.map((p) => [p.id, p.displayOrder]));
      return prev.map((p) => (map.has(p.id) ? { ...p, displayOrder: map.get(p.id)! } : p));
    });
    setDragIdx(null);
  };

  const handleDelete = (id: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
    if (previewPromo?.id === id) setPreviewPromo(null);
  };

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-lg text-on-surface tracking-tight">
            Khuyến mãi &amp; Nổi bật
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Quản lý các chương trình khuyến mãi và nội dung nổi bật trên trang chủ
          </p>
        </div>
        <Link
          href="/vi/admin/storefront/promotions/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-label-md shadow-md hover:bg-on-primary-container transition-all active:scale-95"
        >
          <Plus size={18} />
          Tạo khuyến mãi mới
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm khuyến mãi..."
            className="w-full pl-9 pr-4 py-2.5 bg-surface-container-lowest rounded-xl text-on-surface placeholder:text-on-surface-variant text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface text-label-md border border-outline-variant/30 hover:bg-surface-container-low transition-colors"
        >
          <Filter size={16} />
          Bộ lọc
          <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-label-sm text-on-surface-variant mr-2">Trạng thái:</span>
            {(["all", "published", "scheduled", "draft", "expired"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-label-sm font-semibold transition-colors ${
                  statusFilter === s
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {s === "all" ? "Tất cả" : STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-label-sm text-on-surface-variant mr-2">Loại nội dung:</span>
            {(["all", "campaign", "category", "product_collection", "custom_link"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-full text-label-sm font-semibold transition-colors ${
                  typeFilter === t
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {t === "all" ? "Tất cả" : PROMOTION_CONTENT_TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {previewPromo && (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-headline-sm text-on-surface">Xem trước khuyến mãi</h3>
            <button onClick={() => setPreviewPromo(null)} className="text-label-sm text-on-surface-variant hover:text-on-surface">
              Đóng
            </button>
          </div>
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-primary-container/20 to-tertiary-container/20 border border-outline-variant/20">
            <div className="aspect-[2/1] sm:aspect-[3/1] bg-surface-container flex items-center justify-center">
              <div className="text-center p-6">
                <Sparkles size={32} className="mx-auto text-on-surface-variant/50 mb-2" />
                <p className="text-headline-sm text-on-surface">{previewPromo.title}</p>
                <p className="text-body-sm text-on-surface-variant mt-1">{previewPromo.description}</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-label-sm font-semibold ${CONTENT_TYPE_CONFIG[previewPromo.contentType].class}`}>
                    {PROMOTION_CONTENT_TYPE_LABELS[previewPromo.contentType]}
                  </span>
                  <span className="text-body-sm text-on-surface-variant">→ {previewPromo.target}</span>
                </div>
                {previewPromo.ctaText && (
                  <span className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-primary text-on-primary text-label-sm">
                    {previewPromo.ctaText}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
        <div className="grid grid-cols-[40px_1fr_130px_130px_120px_100px] gap-4 px-4 py-3 bg-surface-container-low/50 text-label-sm text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20">
          <span />
          <span className="flex items-center gap-1"><ArrowUpDown size={12} /> Tiêu đề</span>
          <span>Loại</span>
          <span>Trạng thái</span>
          <span>Thời gian</span>
          <span className="text-right">Thao tác</span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-body-md text-on-surface-variant">
            Không tìm thấy khuyến mãi nào phù hợp
          </div>
        ) : (
          filtered.map((promo, idx) => (
            <div
              key={promo.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(idx)}
              className={`grid grid-cols-[40px_1fr_130px_130px_120px_100px] gap-4 px-4 py-3.5 border-b border-outline-variant/10 items-center hover:bg-surface-container-low/30 transition-colors ${
                dragIdx === idx ? "opacity-50" : ""
              }`}
            >
              <button className="cursor-grab active:cursor-grabbing text-on-surface-variant/50 hover:text-on-surface-variant">
                <GripVertical size={18} />
              </button>

              <div className="min-w-0">
                <p className="text-label-lg text-on-surface truncate">{promo.title}</p>
                <p className="text-body-sm text-on-surface-variant truncate mt-0.5">{promo.description}</p>
              </div>

              <div>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-label-sm font-semibold ${CONTENT_TYPE_CONFIG[promo.contentType].class}`}>
                  {PROMOTION_CONTENT_TYPE_LABELS[promo.contentType]}
                </span>
              </div>

              <div>
                <span className={`inline-flex px-2.5 py-1 rounded-full text-label-sm font-semibold ${STATUS_CONFIG[promo.status].class}`}>
                  {STATUS_CONFIG[promo.status].label}
                </span>
              </div>

              <div className="text-body-sm text-on-surface-variant">
                <div>{promo.startDate}</div>
                <div className="text-on-surface-variant/60">→ {promo.endDate}</div>
              </div>

              <div className="flex items-center justify-end gap-1">
                <button onClick={() => setPreviewPromo(promo)} title="Xem trước" className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors">
                  <Eye size={16} />
                </button>
                <Link href={`/vi/admin/storefront/promotions/${promo.id}`} title="Chỉnh sửa" className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors">
                  <Pencil size={16} />
                </Link>
                <button onClick={() => handleDelete(promo.id)} title="Xóa" className="p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container/40 hover:text-error transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
        <span>Tổng cộng {filtered.length} khuyến mãi</span>
        <span>
          {promotions.filter((p) => p.status === "published").length} đang hiển thị ·{" "}
          {promotions.filter((p) => p.status === "scheduled").length} đã lên lịch ·{" "}
          {promotions.filter((p) => p.status === "draft").length} bản nháp
        </span>
      </div>
    </div>
  );
}
