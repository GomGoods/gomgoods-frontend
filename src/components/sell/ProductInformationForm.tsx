"use client";

import { useState } from "react";
import { Info, Sparkles, Wand2, Plus, Check } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { HashtagInput } from "./HashtagInput";

interface ProductInformationFormProps {
  name: string;
  onNameChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  fandom: string;
  onFandomChange: (val: string) => void;
  price: string;
  onPriceChange: (val: string) => void;
  negotiable: boolean;
  onNegotiableChange: (val: boolean) => void;
  description: string;
  onDescriptionChange: (val: string) => void;
  hashtags: string[];
  onHashtagsChange: (tags: string[]) => void;
  dict: Dictionary;
  errors?: {
    name?: string;
    category?: string;
    description?: string;
    hashtags?: string;
    price?: string;
  };
}

export function ProductInformationForm({
  name,
  onNameChange,
  category,
  onCategoryChange,
  fandom,
  onFandomChange,
  price,
  onPriceChange,
  negotiable,
  onNegotiableChange,
  description,
  onDescriptionChange,
  hashtags,
  onHashtagsChange,
  dict,
  errors = {},
}: ProductInformationFormProps) {
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [copiedChip, setCopiedChip] = useState<string | null>(null);

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    onPriceChange(rawValue);
  };

  const formattedPrice = price
    ? Number(price).toLocaleString("vi-VN")
    : "";

  const t = dict.sell;

  const quickChips = [
    { key: "df", text: t.chip_sensitive_df },
    { key: "escrow", text: t.chip_escrow },
    { key: "unbox", text: t.chip_unbox_video },
    { key: "box", text: t.chip_full_box },
    { key: "check", text: t.chip_video_check },
  ];

  const handleInsertChip = (text: string) => {
    setCopiedChip(text);
    setTimeout(() => setCopiedChip(null), 1000);

    if (description.includes(text)) return;
    const separator = description.trim() ? "\n- " : "- ";
    onDescriptionChange(description.trimEnd() + separator + text);
  };

  const handleAIAssist = () => {
    setIsGeneratingAI(true);

    setTimeout(() => {
      const prodName = name.trim() || "Item Goods Fandom chính hãng";
      const fandomText = fandom.trim() ? `[Series: ${fandom.trim()}]` : "";

      const aiDraft = `✨ [PASS ĐỒ] ${prodName} ${fandomText}
- Tình trạng: Hàng sưu tầm cá nhân, còn đẹp (chi tiết xem trên ảnh).
- Bảo quản cẩn thận trong tủ chống ẩm/bọc sleeve.
- Quy định giao dịch:
  • Nhạy df (defect/vết trầy nhỏ sản xuất) vui lòng bỏ qua để tránh mất lòng đôi bên.
  • Ưu tiên giao dịch trung gian có bảo hiểm 100% qua sàn GomGoods để an toàn cho cả hai bên.
  • Có thể quay clip check condition/check góc trực tiếp cho bạn nào thật sự thiện chí mua.
  • Khi nhận hàng vui lòng quay video unboxing rõ 6 mặt kiện hàng để được hỗ trợ nếu có sự cố vận chuyển.
Cảm ơn mọi người đã ghé xem tin!`;

      onDescriptionChange(aiDraft);
      setIsGeneratingAI(false);
    }, 600);
  };

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 md:p-6 shadow-sm space-y-5">
      <h2 className="text-base md:text-lg font-bold text-on-surface flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Info className="w-4 h-4" />
        </div>
        <span>{t.product_info_title}</span>
      </h2>

      {/* Product Name */}
      <div>
        <label
          htmlFor="product_name"
          className="block text-xs sm:text-sm font-semibold text-on-surface mb-1.5"
        >
          {t.product_name} <span className="text-primary font-bold">*</span>
        </label>
        <input
          id="product_name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={t.product_name_placeholder}
          className={`w-full text-xs sm:text-sm h-11 px-3.5 rounded-lg border bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none transition-all ${
            errors.name
              ? "border-error ring-1 ring-error"
              : "border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-error font-medium">{errors.name}</p>
        )}
      </div>

      {/* Category & Fandom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="category"
            className="block text-xs sm:text-sm font-semibold text-on-surface mb-1.5"
          >
            {t.category} <span className="text-primary font-bold">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={`w-full text-xs sm:text-sm h-11 px-3.5 rounded-lg border bg-surface text-on-surface focus:outline-none transition-all cursor-pointer ${
              errors.category
                ? "border-error ring-1 ring-error"
                : "border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary"
            }`}
          >
            <option value="" disabled>
              {t.category_select}
            </option>
            <option value="figure">{t.category_figure}</option>
            <option value="card">{t.category_card}</option>
            <option value="merch">{t.category_merch}</option>
            <option value="other">{t.category_other}</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-error font-medium">
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="fandom"
            className="block text-xs sm:text-sm font-semibold text-on-surface mb-1.5"
          >
            {t.fandom}
          </label>
          <input
            id="fandom"
            type="text"
            value={fandom}
            onChange={(e) => onFandomChange(e.target.value)}
            placeholder={t.fandom_placeholder}
            className="w-full text-xs sm:text-sm h-11 px-3.5 rounded-lg border border-outline-variant bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Giá bán & Thương lượng */}
      <div className="pt-1">
        <label
          htmlFor="price"
          className="block text-xs sm:text-sm font-semibold text-on-surface mb-1.5"
        >
          {t.price} <span className="text-primary font-bold">*</span>
        </label>
        <div className="relative max-w-md">
          <input
            id="price"
            type="text"
            inputMode="numeric"
            value={formattedPrice}
            onChange={handlePriceInput}
            placeholder={t.price_placeholder}
            className={`w-full text-xs sm:text-sm font-bold text-primary h-11 pl-3.5 pr-10 rounded-lg border bg-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-all ${
              errors.price
                ? "border-error ring-1 ring-error"
                : "border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary"
            }`}
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-on-surface-variant">
            đ
          </span>
        </div>

        {errors.price && (
          <p className="mt-1 text-xs text-error font-medium">{errors.price}</p>
        )}

        {/* Platform Fee & Net Payout Calculation */}
        {Number(price) > 0 && (
          <div className="mt-2.5 p-3 rounded-lg bg-surface-container-low border border-outline-variant/60 flex flex-col gap-1.5 text-xs animate-in fade-in">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span>Phí nền tảng & bảo hiểm GomGoods (5%):</span>
              <span className="font-semibold text-error">
                -₫{Math.round(Number(price) * 0.05).toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="flex items-center justify-between font-bold text-on-surface pt-1.5 border-t border-outline-variant/40">
              <span className="text-primary font-semibold">Dự kiến thực nhận về ví:</span>
              <span className="text-sm font-extrabold text-primary">
                ₫{Math.round(Number(price) * 0.95).toLocaleString("vi-VN")}
              </span>
            </div>
          </div>
        )}

        {/* Negotiable Checkbox */}
        <label className="mt-2.5 flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={negotiable}
            onChange={(e) => onNegotiableChange(e.target.checked)}
            className="w-4 h-4 rounded border-outline text-primary focus:ring-primary accent-primary cursor-pointer"
          />
          <span className="text-xs sm:text-sm text-on-surface font-medium">
            {t.negotiable}
          </span>
        </label>
      </div>

      {/* Description with AI Assistant & Quick Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label
            htmlFor="description"
            className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1.5"
          >
            <span>{t.description}</span>
            <span className="text-primary font-bold">*</span>
          </label>

          {/* AI Assist Writer Button */}
          <button
            type="button"
            onClick={handleAIAssist}
            disabled={isGeneratingAI}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary via-primary/90 to-primary-container text-white shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            title="Sử dụng AI hỗ trợ viết mẫu mô tả chuẩn pass đồ"
          >
            {isGeneratingAI ? (
              <Wand2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            )}
            <span>{isGeneratingAI ? t.ai_generating : t.ai_assistant_btn}</span>
          </button>
        </div>

        {/* Quick Insert Chips */}
        <div className="p-2.5 bg-surface rounded-lg border border-outline-variant/70 space-y-1.5">
          <span className="text-[11px] font-semibold text-on-surface-variant block">
            {t.quick_chips_label}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickChips.map((chip) => {
              const isSelected = copiedChip === chip.text;
              return (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => handleInsertChip(chip.text)}
                  className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary text-white border-primary"
                      : "bg-surface-container-low hover:bg-primary/10 hover:border-primary/50 text-on-surface border-outline-variant/60"
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Plus className="w-3 h-3 text-primary" />
                  )}
                  <span>{chip.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Textarea */}
        <textarea
          id="description"
          rows={5}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder={t.description_placeholder}
          className={`w-full text-xs sm:text-sm p-3.5 rounded-lg border bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none transition-all resize-y leading-relaxed font-sans ${
            errors.description
              ? "border-error ring-1 ring-error"
              : "border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary"
          }`}
        />
        {errors.description && (
          <p className="text-xs text-error font-medium">{errors.description}</p>
        )}
      </div>

      {/* Hashtags Input (Required) */}
      <div className="pt-2 border-t border-outline-variant/60">
        <HashtagInput
          hashtags={hashtags}
          onHashtagsChange={onHashtagsChange}
          fandom={fandom}
          category={category}
          dict={dict}
          error={errors.hashtags}
        />
      </div>
    </section>
  );
}
