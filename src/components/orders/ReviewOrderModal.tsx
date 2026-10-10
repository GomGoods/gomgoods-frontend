"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Star,
  Camera,
  CheckCircle2,
  Sparkles,
  ThumbsUp,
  PackageCheck,
  MessageSquare,
} from "lucide-react";
import { useGomXu } from "@/context/GomXuContext";

interface ReviewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderCode: string;
  itemTitle: string;
  itemImage: string;
  sellerName: string;
  onSuccess: () => void;
}

export function ReviewOrderModal({
  isOpen,
  onClose,
  orderCode,
  itemTitle,
  itemImage,
  sellerName,
  onSuccess,
}: ReviewOrderModalProps) {
  const { addGomXu } = useGomXu();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [descriptionAccurate, setDescriptionAccurate] = useState(5);
  const [packagingQuality, setPackagingQuality] = useState(5);
  const [sellerService, setSellerService] = useState(5);
  const [comment, setComment] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const urls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedPhotos((prev) => [...prev, ...urls].slice(0, 4));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Bonus +50 GomXu for reviewing
      addGomXu(50, `Thưởng đánh giá đơn hàng #${orderCode}`);
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccess();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
              <Star size={18} className="fill-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Đánh giá sản phẩm
              </h3>
              <p className="text-xs text-muted-foreground">
                Đơn hàng #{orderCode} · Shop {sellerName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="text-lg font-bold text-foreground">
              Cảm ơn đánh giá của bạn!
            </h4>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold text-xs border border-amber-300/40">
              <Sparkles size={14} className="text-amber-500" />
              <span>Bạn nhận được +50 GomXu thưởng!</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mt-1">
              Đánh giá kèm ảnh thực tế của bạn sẽ giúp cộng đồng Collector GomGoods có thêm thông tin tham khảo hữu ích.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              Hoàn tất
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto pr-1 flex flex-col gap-4 pt-3 flex-1 text-xs"
          >
            {/* Reward incentive banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-300/50 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <Image
                  src="/GomXu.png"
                  alt="GomXu"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-amber-900 dark:text-amber-300">
                Nhận ngay <strong className="font-black">+50 GomXu</strong> sau khi gửi đánh giá giúp ích cho người mua tiếp theo!
              </p>
            </div>

            {/* Product snippet */}
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-muted/40 border border-border/50">
              <div
                className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 border border-border/40"
                style={{ backgroundImage: `url(${itemImage})` }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{itemTitle}</p>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  Người bán: {sellerName}
                </p>
              </div>
            </div>

            {/* Overall Star Rating */}
            <div className="flex flex-col items-center justify-center py-2 gap-2 bg-muted/20 rounded-2xl border border-border/40">
              <span className="font-bold text-foreground text-xs">
                Chất lượng tổng quan sản phẩm
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(s)}
                    className="p-1 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      size={28}
                      className={
                        (hoverRating || rating) >= s
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/40"
                      }
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                {rating === 5 && "Tuyệt vời (5 sao) - Đúng chuẩn Authentic"}
                {rating === 4 && "Hài lòng (4 sao) - Sản phẩm tốt"}
                {rating === 3 && "Bình thường (3 sao) - Tạm ổn"}
                {rating === 2 && "Chưa hài lòng (2 sao) - Có lỗi nhỏ"}
                {rating === 1 && "Thất vọng (1 sao) - Rất tệ"}
              </span>
            </div>

            {/* Detailed Criteria */}
            <div className="space-y-2.5 p-3 rounded-2xl bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                  <PackageCheck size={14} className="text-primary" />
                  <span>Đúng với mô tả & hình ảnh</span>
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setDescriptionAccurate(v)}
                      className="cursor-pointer"
                    >
                      <Star
                        size={14}
                        className={
                          descriptionAccurate >= v
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                  <ThumbsUp size={14} className="text-emerald-500" />
                  <span>Đóng gói cẩn thận, chống sốc</span>
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setPackagingQuality(v)}
                      className="cursor-pointer"
                    >
                      <Star
                        size={14}
                        className={
                          packagingQuality >= v
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                  <MessageSquare size={14} className="text-blue-500" />
                  <span>Thái độ phục vụ của người bán</span>
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSellerService(v)}
                      className="cursor-pointer"
                    >
                      <Star
                        size={14}
                        className={
                          sellerService >= v
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Comment textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-foreground">
                Nhận xét chi tiết của bạn
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Hãy chia sẻ cảm nhận về độ nét của figure/card, tình trạng hộp, thời gian giao hàng..."
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground/70 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
              />
            </div>

            {/* Photo upload */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-foreground flex items-center justify-between">
                <span>Hình ảnh thực tế sản phẩm</span>
                <span className="text-[11px] text-muted-foreground font-normal">
                  (Khuyên khích ảnh unboxing)
                </span>
              </label>

              <div className="grid grid-cols-4 gap-2">
                {uploadedPhotos.map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted/60"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt="Review"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setUploadedPhotos((prev) =>
                          prev.filter((_, idx) => idx !== i)
                        )
                      }
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}

                {uploadedPhotos.length < 4 && (
                  <label className="aspect-square rounded-xl border-2 border-dashed border-border/80 hover:border-primary/60 bg-muted/20 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors text-muted-foreground hover:text-primary">
                    <Camera size={16} />
                    <span className="text-[10px] font-medium">Thêm ảnh</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleSimulatePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-border mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-all cursor-pointer"
              >
                Để sau
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !comment.trim()}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Sparkles size={14} />
                <span>{isSubmitting ? "Đang gửi..." : "Gửi đánh giá (+50 Xu)"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
