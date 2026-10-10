"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Eye, Bookmark, Sparkles, AlertCircle } from "lucide-react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { ProductImageUpload } from "./ProductImageUpload";
import { ProductInformationForm } from "./ProductInformationForm";
import { ListingPreview } from "./ListingPreview";

interface SellViewProps {
  dict: Dictionary;
  lang: Locale;
}

export function SellView({ dict, lang }: SellViewProps) {
  const t = dict.sell;

  // Form states
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [fandom, setFandom] = useState("");
  const [condition, setCondition] = useState("new");
  const [defectDescription, setDefectDescription] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState<string[]>(["#pass"]);
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // UI interaction states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showDraftToast, setShowDraftToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (images.length === 0) {
      errs.images = t.validation_error_images;
    }
    if (!name.trim()) {
      errs.name = t.validation_error_name;
    }
    if (!category) {
      errs.category = t.validation_error_category;
    }
    if (!description.trim()) {
      errs.description = t.validation_error_desc;
    }
    if (hashtags.length === 0) {
      errs.hashtags = t.validation_error_hashtags;
    }
    if (!price || Number(price) <= 0) {
      errs.price = t.validation_error_price;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Auto-restore draft on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gomgoods_sell_draft");
      if (stored) {
        const d = JSON.parse(stored);
        if (d.name) setName(d.name);
        if (d.category) setCategory(d.category);
        if (d.fandom) setFandom(d.fandom);
        if (d.description) setDescription(d.description);
        if (d.hashtags) setHashtags(d.hashtags);
        if (d.price) setPrice(d.price);
        if (typeof d.negotiable === "boolean") setNegotiable(d.negotiable);
      }
    } catch {}
  }, []);

  const handleSaveDraft = () => {
    try {
      const draft = {
        name,
        category,
        fandom,
        description,
        hashtags,
        price,
        negotiable,
        savedAt: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      localStorage.setItem("gomgoods_sell_draft", JSON.stringify(draft));
    } catch {}
    setShowDraftToast(true);
    setTimeout(() => setShowDraftToast(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the first error
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Save created listing to localStorage
      try {
        const newListing = {
          id: `item-${Date.now()}`,
          title: name,
          price: `${Number(price).toLocaleString("vi-VN")}đ`,
          image: images[0] || "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
          category,
          fandom,
          description,
          hashtags,
          createdAt: "Vừa xong",
        };
        const existing = JSON.parse(
          localStorage.getItem("gomgoods_my_listings") || "[]"
        );
        localStorage.setItem(
          "gomgoods_my_listings",
          JSON.stringify([newListing, ...existing])
        );
        localStorage.removeItem("gomgoods_sell_draft");
      } catch {}

      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 600);
  };

  const handleResetForm = () => {
    setImages([]);
    setName("");
    setCategory("");
    setFandom("");
    setCondition("new");
    setDefectDescription("");
    setDescription("");
    setHashtags(["#pass"]);
    setPrice("");
    setNegotiable(true);
    setQuantity(1);
    setErrors({});
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="max-w-[860px] mx-auto pb-24 md:pb-12 space-y-6">
      {/* Page Header */}
      <div className="space-y-1.5 pt-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight">
            {t.title}
          </h1>
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            Fandom Pass
          </span>
        </div>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          {t.subtitle}
        </p>
      </div>

      {/* Draft Notification Toast */}
      {showDraftToast && (
        <div className="fixed top-20 right-4 z-50 bg-surface-container-highest border border-outline-variant shadow-lg text-on-surface text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{t.draft_saved}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Hình ảnh & Video */}
        <ProductImageUpload
          images={images}
          onImagesChange={(imgs) => {
            setImages(imgs);
            if (errors.images) {
              setErrors((prev) => ({ ...prev, images: "" }));
            }
          }}
          dict={dict}
          error={errors.images}
        />

        {/* 2. Thông tin sản phẩm, Giá & Mô tả AI */}
        <ProductInformationForm
          name={name}
          onNameChange={(val) => {
            setName(val);
            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
          }}
          category={category}
          onCategoryChange={(val) => {
            setCategory(val);
            if (errors.category)
              setErrors((prev) => ({ ...prev, category: "" }));
          }}
          fandom={fandom}
          onFandomChange={setFandom}
          price={price}
          onPriceChange={(val) => {
            setPrice(val);
            if (errors.price) setErrors((prev) => ({ ...prev, price: "" }));
          }}
          negotiable={negotiable}
          onNegotiableChange={setNegotiable}
          description={description}
          onDescriptionChange={(val) => {
            setDescription(val);
            if (errors.description)
              setErrors((prev) => ({ ...prev, description: "" }));
          }}
          hashtags={hashtags}
          onHashtagsChange={(tags) => {
            setHashtags(tags);
            if (errors.hashtags)
              setErrors((prev) => ({ ...prev, hashtags: "" }));
          }}
          dict={dict}
          errors={errors}
        />

        {/* Form error summary if any */}
        {Object.keys(errors).length > 0 && (
          <div className="p-4 rounded-xl bg-error/10 border border-error/20 flex items-center gap-2 text-xs sm:text-sm text-error font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Vui lòng kiểm tra lại các trường thông tin bắt buộc được đánh dấu đỏ phía trên.</span>
          </div>
        )}

        {/* Action Buttons (Desktop relative, Mobile fixed bottom) */}
        <div className="fixed bottom-0 left-0 right-0 p-3.5 bg-surface/95 backdrop-blur-sm border-t border-outline-variant shadow-lg z-40 md:relative md:bg-transparent md:backdrop-blur-none md:border-0 md:p-0 md:shadow-none flex items-center justify-between md:justify-end gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container text-on-surface text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-4 h-4" />
            <span>{t.save_draft}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl border border-primary/40 hover:bg-primary/5 text-primary text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>{t.preview}</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 md:flex-initial px-6 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary/90 active:scale-95 text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? "Đang xử lý..." : t.publish_now}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Listing Preview Modal */}
      <ListingPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={{
          images,
          name,
          category,
          fandom,
          condition,
          defectDescription,
          description,
          hashtags,
          price,
          negotiable,
          quantity,
        }}
        dict={dict}
      />

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-outline-variant rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-on-surface">
                {t.publish_success_title}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                {t.publish_success_desc}
              </p>
            </div>

            <div className="p-3 bg-surface-container rounded-xl text-left text-xs space-y-1 border border-outline-variant/60">
              <div className="font-bold text-on-surface line-clamp-1">
                {name || "Sản phẩm vừa đăng"}
              </div>
              <div className="text-primary font-bold">
                {Number(price).toLocaleString("vi-VN")}đ
              </div>
              <div className="text-on-surface-variant text-[11px]">
                Hashtags: {hashtags.join(" ")}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleResetForm}
                className="flex-1 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container text-on-surface text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Đăng bài khác
              </button>
              <Link
                href={`/${lang}/marketplace`}
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary/90 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Xem trên sàn</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
