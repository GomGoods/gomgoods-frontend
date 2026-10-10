"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  X,
  Eye,
  Save,
  Calendar,
  Link as LinkIcon,
  Sparkles,
} from "lucide-react";
import {
  PROMOTION_CONTENT_TYPE_LABELS,
  type PromotionItem,
  type PromotionStatus,
  type PromotionContentType,
} from "../dashboard-data";

interface PromotionFormProps {
  initialData?: PromotionItem;
  isEditing?: boolean;
}

const STATUS_OPTIONS: { value: PromotionStatus; label: string }[] = [
  { value: "draft", label: "Bản nháp" },
  { value: "scheduled", label: "Đã lên lịch" },
  { value: "published", label: "Đang hiển thị" },
];

const CONTENT_TYPES: { value: PromotionContentType; label: string }[] = [
  { value: "campaign", label: "Chiến dịch" },
  { value: "category", label: "Danh mục" },
  { value: "product_collection", label: "Bộ sưu tập sản phẩm" },
  { value: "custom_link", label: "Liên kết tùy chỉnh" },
];

export function PromotionForm({ initialData, isEditing = false }: PromotionFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    contentType: initialData?.contentType ?? ("campaign" as PromotionContentType),
    target: initialData?.target ?? "",
    ctaText: initialData?.ctaText ?? "",
    startDate: initialData?.startDate ?? "",
    endDate: initialData?.endDate ?? "",
    status: initialData?.status ?? ("draft" as PromotionStatus),
    displayOrder: initialData?.displayOrder ?? 1,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const updateField = useCallback(
    (field: string, value: string | number) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    alert(isEditing ? "Khuyến mãi đã được cập nhật!" : "Khuyến mãi mới đã được tạo!");
    router.push("/vi/admin/storefront/promotions");
  };

  const targetPlaceholder: Record<PromotionContentType, string> = {
    campaign: "Tên chiến dịch liên kết",
    category: "Tên danh mục sản phẩm",
    product_collection: "Tên bộ sưu tập",
    custom_link: "https://gomgoods.com/...",
  };

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/vi/admin/storefront/promotions"
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-headline-lg text-on-surface tracking-tight">
              {isEditing ? "Chỉnh sửa Khuyến mãi" : "Tạo Khuyến mãi mới"}
            </h1>
            <p className="text-body-sm text-on-surface-variant mt-0.5">
              {isEditing
                ? "Cập nhật nội dung và cấu hình khuyến mãi"
                : "Thiết lập nội dung nổi bật hiển thị trên trang chủ"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-label-md transition-colors ${
              showPreview
                ? "bg-primary-container text-on-primary-container"
                : "bg-surface-container-low text-on-surface-variant"
            }`}
          >
            <Eye size={16} />
            Xem trước
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-label-md shadow-md hover:bg-on-primary-container transition-all active:scale-95"
          >
            <Save size={16} />
            {isEditing ? "Cập nhật" : "Lưu"}
          </button>
        </div>
      </div>

      <div className={`grid gap-6 ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-2xl"}`}>
        {/* Form */}
        <div className="space-y-6">
          {/* Image */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20">
            <h3 className="text-label-lg text-on-surface mb-4">Hình ảnh</h3>
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full aspect-[2/1] object-cover" />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-on-surface/60 text-surface hover:bg-on-surface/80 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-[2/1] border-2 border-dashed border-outline-variant/40 rounded-xl cursor-pointer hover:border-primary/40 hover:bg-primary-container/5 transition-all">
                <Upload size={32} className="text-on-surface-variant/50 mb-2" />
                <span className="text-label-md text-on-surface-variant">Kéo thả hoặc nhấn để tải ảnh</span>
                <span className="text-body-sm text-on-surface-variant/60 mt-1">Khuyến nghị: 800×400px</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Content */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-4">
            <h3 className="text-label-lg text-on-surface mb-2">Nội dung</h3>

            <div>
              <label className="text-label-sm text-on-surface-variant block mb-1.5">Tiêu đề *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Tên chương trình khuyến mãi..."
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-on-surface placeholder:text-on-surface-variant/50 text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label className="text-label-sm text-on-surface-variant block mb-1.5">Mô tả</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Mô tả chi tiết chương trình..."
                rows={3}
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-on-surface placeholder:text-on-surface-variant/50 text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-label-sm text-on-surface-variant block mb-1.5">Loại nội dung</label>
                <select
                  value={form.contentType}
                  onChange={(e) => updateField("contentType", e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-on-surface text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                >
                  {CONTENT_TYPES.map((ct) => (
                    <option key={ct.value} value={ct.value}>{ct.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-label-sm text-on-surface-variant block mb-1.5">Đối tượng liên kết</label>
                <input
                  type="text"
                  value={form.target}
                  onChange={(e) => updateField("target", e.target.value)}
                  placeholder={targetPlaceholder[form.contentType]}
                  className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-on-surface placeholder:text-on-surface-variant/50 text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-label-sm text-on-surface-variant block mb-1.5">Nút CTA (Text)</label>
              <input
                type="text"
                value={form.ctaText}
                onChange={(e) => updateField("ctaText", e.target.value)}
                placeholder="VD: Khám phá ngay"
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-on-surface placeholder:text-on-surface-variant/50 text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-4">
            <h3 className="text-label-lg text-on-surface mb-2">Cấu hình</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-label-sm text-on-surface-variant block mb-1.5"><Calendar size={12} className="inline mr-1" />Ngày bắt đầu</label>
                <input type="date" value={form.startDate} onChange={(e) => updateField("startDate", e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-on-surface text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
              <div>
                <label className="text-label-sm text-on-surface-variant block mb-1.5"><Calendar size={12} className="inline mr-1" />Ngày kết thúc</label>
                <input type="date" value={form.endDate} onChange={(e) => updateField("endDate", e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-on-surface text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-label-sm text-on-surface-variant block mb-1.5">Trạng thái</label>
                <select value={form.status} onChange={(e) => updateField("status", e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-on-surface text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
                  {STATUS_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                </select>
              </div>
              <div>
                <label className="text-label-sm text-on-surface-variant block mb-1.5">Thứ tự hiển thị</label>
                <input type="number" value={form.displayOrder} onChange={(e) => updateField("displayOrder", parseInt(e.target.value) || 1)} min={1} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-on-surface text-body-md border border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        {showPreview && (
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-label-lg text-on-surface mb-4 flex items-center gap-2">
                <Eye size={16} className="text-primary" />
                Xem trước trực tiếp
              </h3>
              <div className="rounded-xl overflow-hidden bg-gradient-to-r from-primary-container/20 to-tertiary-container/20 border border-outline-variant/20">
                <div className="aspect-[2/1] bg-surface-container flex items-center justify-center relative">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Sparkles size={48} className="text-on-surface-variant/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-surface-container-lowest">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/20 text-label-sm font-semibold backdrop-blur-sm">
                        {PROMOTION_CONTENT_TYPE_LABELS[form.contentType]}
                      </span>
                    </div>
                    <p className="text-headline-sm font-bold">{form.title || "Tiêu đề khuyến mãi"}</p>
                    <p className="text-body-sm mt-1 opacity-90">{form.description || "Mô tả sẽ hiển thị ở đây"}</p>
                    {form.ctaText && (
                      <span className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-primary text-on-primary text-label-sm">
                        {form.ctaText}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-body-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Loại</span>
                  <span className="text-on-surface font-semibold">{PROMOTION_CONTENT_TYPE_LABELS[form.contentType]}</span>
                </div>
                {form.target && (
                  <div className="flex justify-between">
                    <span>Liên kết đến</span>
                    <span className="text-primary font-semibold truncate max-w-[200px]">{form.target}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Trạng thái</span>
                  <span className="text-on-surface font-semibold">{STATUS_OPTIONS.find((o) => o.value === form.status)?.label}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
