"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  GripVertical,
  Eye,
  Pencil,
  Copy,
  Trash2,
  ArrowUpDown,
  Calendar,
  Filter,
  ChevronDown,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import { MOCK_BANNERS, type BannerItem, type BannerStatus } from "../dashboard-data";

const STATUS_CONFIG: Record<BannerStatus, { label: string; class: string }> = {
  published: { label: "Đang hiển thị", class: "bg-tertiary/10 text-tertiary" },
  scheduled: { label: "Đã lên lịch", class: "bg-secondary-container text-on-secondary-container" },
  draft: { label: "Bản nháp", class: "bg-surface-container-high text-on-surface-variant" },
  expired: { label: "Đã hết hạn", class: "bg-error-container/40 text-error" },
};

function BannerPreviewCard({ banner }: { banner: BannerItem }) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary-container/30 to-tertiary-container/30 border border-outline-variant/30">
      <div className="aspect-[3/1] bg-surface-container flex items-center justify-center">
        <div className="text-center p-6">
          <ImageIcon size={32} className="mx-auto text-on-surface-variant/50 mb-2" />
          <p className="text-headline-sm text-on-surface">{banner.title}</p>
          <p className="text-body-sm text-on-surface-variant mt-1">{banner.subtitle}</p>
          {banner.ctaText && (
            <span className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-primary text-on-primary text-label-sm">
              {banner.ctaText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function BannerManagement() {
  const [banners, setBanners] = useState<BannerItem[]>(MOCK_BANNERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BannerStatus | "all">("all");
  const [previewBanner, setPreviewBanner] = useState<BannerItem | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...banners];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.subtitle.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((b) => b.status === statusFilter);
    }
    return result.sort((a, b) => a.displayOrder - b.displayOrder);
  }, [banners, searchQuery, statusFilter]);

  const handleDragStart = (idx: number) => setDragIdx(idx);

  const handleDrop = (targetIdx: number) => {
    if (dragIdx === null || dragIdx === targetIdx) return;
    const items = [...filtered];
    const [moved] = items.splice(dragIdx, 1);
    items.splice(targetIdx, 0, moved);
    // Reassign display orders
    const reordered = items.map((item, i) => ({ ...item, displayOrder: i + 1 }));
    setBanners((prev) => {
      const map = new Map(reordered.map((b) => [b.id, b.displayOrder]));
      return prev.map((b) => (map.has(b.id) ? { ...b, displayOrder: map.get(b.id)! } : b));
    });
    setDragIdx(null);
  };

  const handleDuplicate = (banner: BannerItem) => {
    const newBanner: BannerItem = {
      ...banner,
      id: `banner-${Date.now()}`,
      title: `${banner.title} (Bản sao)`,
      status: "draft",
      displayOrder: banners.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBanners((prev) => [...prev, newBanner]);
  };

  const handleDelete = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    if (previewBanner?.id === id) setPreviewBanner(null);
  };

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-lg text-on-surface tracking-tight">
            Quản lý Banner
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Tạo, chỉnh sửa và sắp xếp banner hiển thị trên trang chủ
          </p>
        </div>
        <Link
          href="/vi/admin/storefront/banners/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-label-md shadow-md hover:bg-on-primary-container transition-all active:scale-95"
        >
          <Plus size={18} />
          Tạo banner mới
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm banner theo tiêu đề, mô tả..."
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

      {/* Filter chips */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <span className="text-label-sm text-on-surface-variant mr-2 self-center">Trạng thái:</span>
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
      )}

      {/* Preview panel */}
      {previewBanner && (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-headline-sm text-on-surface">Xem trước banner</h3>
            <button
              onClick={() => setPreviewBanner(null)}
              className="text-label-sm text-on-surface-variant hover:text-on-surface"
            >
              Đóng
            </button>
          </div>
          <BannerPreviewCard banner={previewBanner} />
          <div className="mt-3 flex items-center gap-4 text-body-sm text-on-surface-variant">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {previewBanner.startDate} → {previewBanner.endDate}
            </span>
            <span className="flex items-center gap-1">
              <ExternalLink size={14} />
              {previewBanner.ctaLink}
            </span>
          </div>
        </div>
      )}

      {/* Banner List */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[40px_1fr_140px_120px_140px_120px] gap-4 px-4 py-3 bg-surface-container-low/50 text-label-sm text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20">
          <span />
          <span className="flex items-center gap-1">
            <ArrowUpDown size={12} /> Tiêu đề
          </span>
          <span>Trạng thái</span>
          <span>Thứ tự</span>
          <span>Thời gian</span>
          <span className="text-right">Thao tác</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-body-md text-on-surface-variant">
            Không tìm thấy banner nào phù hợp
          </div>
        ) : (
          filtered.map((banner, idx) => (
            <div
              key={banner.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(idx)}
              className={`grid grid-cols-[40px_1fr_140px_120px_140px_120px] gap-4 px-4 py-3.5 border-b border-outline-variant/10 items-center hover:bg-surface-container-low/30 transition-colors ${
                dragIdx === idx ? "opacity-50" : ""
              }`}
            >
              {/* Drag handle */}
              <button className="cursor-grab active:cursor-grabbing text-on-surface-variant/50 hover:text-on-surface-variant">
                <GripVertical size={18} />
              </button>

              {/* Title + subtitle */}
              <div className="min-w-0">
                <p className="text-label-lg text-on-surface truncate">{banner.title}</p>
                <p className="text-body-sm text-on-surface-variant truncate mt-0.5">
                  {banner.subtitle}
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-label-sm font-semibold ${STATUS_CONFIG[banner.status].class}`}
                >
                  {STATUS_CONFIG[banner.status].label}
                </span>
              </div>

              {/* Order */}
              <div className="text-label-md text-on-surface-variant">
                #{banner.displayOrder}
              </div>

              {/* Date */}
              <div className="text-body-sm text-on-surface-variant">
                <div>{banner.startDate}</div>
                <div className="text-on-surface-variant/60">→ {banner.endDate}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => setPreviewBanner(banner)}
                  title="Xem trước"
                  className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                >
                  <Eye size={16} />
                </button>
                <Link
                  href={`/vi/admin/storefront/banners/${banner.id}`}
                  title="Chỉnh sửa"
                  className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDuplicate(banner)}
                  title="Nhân bản"
                  className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                >
                  <Copy size={16} />
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  title="Xóa"
                  className="p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container/40 hover:text-error transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
        <span>Tổng cộng {filtered.length} banner</span>
        <span>
          {banners.filter((b) => b.status === "published").length} đang hiển thị ·{" "}
          {banners.filter((b) => b.status === "scheduled").length} đã lên lịch ·{" "}
          {banners.filter((b) => b.status === "draft").length} bản nháp
        </span>
      </div>
    </div>
  );
}
