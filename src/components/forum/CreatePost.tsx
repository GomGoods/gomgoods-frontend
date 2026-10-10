"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Image as ImageIcon,
  Tag,
  DollarSign,
  AlertTriangle,
  Sparkles,
  Plus,
  Trash2,
} from "lucide-react";
import type { ForumCategory, ForumPost } from "./forum-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: ForumPost) => void;
  dict?: Dictionary;
}

const CATEGORY_OPTIONS: {
  value: ForumCategory;
  label: string;
  tag: string;
  color: string;
}[] = [
  {
    value: "cbgd",
    label: "Cảnh báo giao dịch",
    tag: "#CBGD - CẢNH BÁO",
    color: "bg-error-container text-error",
  },
  {
    value: "pass",
    label: "Pass đồ / Bán lại",
    tag: "#PASS - BÁN LẠI",
    color: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    value: "gtt",
    label: "Check giá trị thực",
    tag: "#GTT - CHECK GIÁ TRỊ THỰC",
    color: "bg-secondary-container text-on-secondary-container",
  },
  {
    value: "collection",
    label: "Khoe bộ sưu tập",
    tag: "#COLLECTION - BỘ SƯU TẬP",
    color: "bg-surface-variant text-primary",
  },
];

const PRESET_SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
];

export function CreatePost({ isOpen, onClose, onSubmit, dict }: CreatePostProps) {
  const [category, setCategory] = useState<ForumCategory>("cbgd");
  const [content, setContent] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [hashtags, setHashtags] = useState("#kpop, #photocard");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddSampleImage = (url: string) => {
    if (!images.includes(url) && images.length < 4) {
      setImages((prev) => [...prev, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    const selectedOption = CATEGORY_OPTIONS.find((c) => c.value === category);

    const tagList = hashtags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      author: {
        name: "Bạn (User)",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80",
        badge: "Thành viên",
        badgeType: "verified",
        rating: 5.0,
      },
      createdAt: "Vừa xong",
      category,
      categoryTag: selectedOption ? selectedOption.tag : "#FORUM",
      content: content.trim(),
      priceRange: category === "pass" && priceRange ? priceRange : undefined,
      hashtags: tagList.length > 0 ? tagList : ["#fandom", "#gomgoods"],
      images: images.length > 0 ? images : [],
      likesCount: 1,
      commentsCount: 0,
      isLiked: true,
      comments: [],
      isHot: false,
      isSafe: true,
    };

    setTimeout(() => {
      onSubmit(newPost);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container-low">
          <h2 className="font-title-md text-sm font-bold text-on-background flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            <span>{dict?.forum?.modal_create_title || "Tạo bài viết mới"}</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex flex-col gap-4">
          {/* Category selection */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1.5">
              {dict?.forum?.post_category_label || "Phân loại bài viết"} *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCategory(opt.value)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                    category === opt.value
                      ? `${opt.color} ring-2 ring-primary shadow-xs`
                      : "border-outline-variant/60 hover:bg-surface-container-low text-on-surface"
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className="text-[10px] opacity-80">{opt.tag.split(" - ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range (if pass) */}
          {category === "pass" && (
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1 flex items-center gap-1">
                <DollarSign size={14} className="text-primary" />
                Mức giá dự kiến (VNĐ)
              </label>
              <input
                type="text"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                placeholder={dict?.forum?.post_price_placeholder || "VD: 250.000đ - 350.000đ..."}
                className="w-full text-xs p-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          )}

          {/* Content */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Nội dung bài viết *
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                category === "cbgd"
                  ? "Cung cấp tên facebook, stk ngân hàng và chi tiết hình thức lừa đảo để cộng đồng cảnh giác..."
                  : dict?.forum?.post_content_placeholder ||
                    "Chia sẻ thông tin, kinh nghiệm, cảnh báo hoặc món đồ bạn muốn pass..."
              }
              className="w-full text-xs p-3 rounded-xl border border-outline-variant bg-surface text-on-surface focus:border-primary focus:outline-none leading-relaxed"
            />
          </div>

          {/* Images Attachments */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <ImageIcon size={14} className="text-tertiary" />
                {dict?.forum?.post_images_label || "Hình ảnh đính kèm"} ({images.length}/4)
              </label>
              <span className="text-[10px] text-on-surface-variant">
                Bấm ảnh mẫu bên dưới để thêm nhanh
              </span>
            </div>

            {/* Quick sample pickers */}
            <div className="flex gap-2 mb-2.5">
              {PRESET_SAMPLE_IMAGES.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAddSampleImage(url)}
                  disabled={images.includes(url) || images.length >= 4}
                  className="relative w-12 h-12 rounded-lg overflow-hidden border border-outline-variant group disabled:opacity-40"
                  title="Thêm ảnh mẫu này"
                >
                  <Image
                    src={url}
                    alt={`sample ${i}`}
                    fill
                    sizes="48px"
                    unoptimized
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                    <Plus size={14} />
                  </div>
                </button>
              ))}
            </div>

            {/* Selected image previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-xl overflow-hidden border border-outline-variant group"
                  >
                    <Image
                      src={url}
                      alt={`upload ${idx}`}
                      fill
                      sizes="100px"
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-error transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hashtags */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1 flex items-center gap-1">
              <Tag size={13} className="text-secondary" />
              {dict?.forum?.post_tags_label || "Hashtags (cách nhau bởi dấu phẩy)"}
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#scammer, #kpop, #photocard"
              className="w-full text-xs p-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-colors"
            >
              {dict?.forum?.post_cancel || "Hủy bỏ"}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-5 py-2.5 text-xs font-bold bg-primary text-on-primary hover:bg-primary-container rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>{dict?.forum?.post_submit || "Đăng bài"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
