"use client";

import { useState } from "react";
import {
  X,
  AlertTriangle,
  Upload,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

interface RefundRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderCode: string;
  maxAmount: number;
  itemTitle: string;
  itemImage: string;
  onSuccess: (details: { reason: string; amount: number; note: string }) => void;
}

const REFUND_REASONS = [
  "Sản phẩm bị móp méo, hư hỏng nặng do vận chuyển",
  "Hàng không đúng mô tả / Sai phiên bản / Hàng nhái (Fake)",
  "Thiếu phụ kiện, part thay thế, hộp gốc bị tráo",
  "Hàng bị trầy xước, lem sơn nghiêm trọng không báo trước",
  "Người bán gửi sai sản phẩm hoàn toàn",
  "Lý do khác",
];

export function RefundRequestModal({
  isOpen,
  onClose,
  orderCode,
  maxAmount,
  itemTitle,
  itemImage,
  onSuccess,
}: RefundRequestModalProps) {
  const [selectedReason, setSelectedReason] = useState(REFUND_REASONS[0]);
  const [customReason, setCustomReason] = useState("");
  const [refundAmount, setRefundAmount] = useState(maxAmount);
  const [proofFiles, setProofFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setProofFiles((prev) => [...prev, ...newUrls].slice(0, 4));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccess({
        reason: selectedReason === "Lý do khác" ? customReason : selectedReason,
        amount: refundAmount,
        note: customReason,
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Yêu cầu Trả hàng & Hoàn tiền
              </h3>
              <p className="text-xs text-muted-foreground">
                Đơn hàng #{orderCode}
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
              Đã gửi yêu cầu khiếu nại thành công!
            </h4>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              Hệ thống GomGoods Buyer Protection đã tiếp nhận yêu cầu hoàn tiền số tiền{" "}
              <strong className="text-foreground">
                ₫{refundAmount.toLocaleString("vi-VN")}
              </strong>
              . Bộ phận Trọng tài sẽ liên hệ xử lý trong vòng 24 giờ.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              Đã hiểu & Đóng
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto pr-1 flex flex-col gap-4 pt-3 flex-1 text-xs"
          >
            {/* Buyer protection guarantee badge */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-300/40 text-amber-900 dark:text-amber-300 flex items-center gap-2.5">
              <ShieldCheck size={18} className="shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-[11px] leading-snug">
                GomGoods bảo vệ 100% tiền mua hàng. Tiền thanh toán sẽ được giữ tại quỹ ký quỹ GomGoods cho đến khi khiếu nại được giải quyết thỏa đáng.
              </p>
            </div>

            {/* Product summary */}
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-muted/40 border border-border/50">
              <div
                className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 border border-border/40"
                style={{ backgroundImage: `url(${itemImage})` }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{itemTitle}</p>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  Số tiền tối đa có thể hoàn: ₫{maxAmount.toLocaleString("vi-VN")}
                </p>
              </div>
            </div>

            {/* Reason selector */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-foreground">
                Lý do yêu cầu trả hàng / hoàn tiền <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground appearance-none pr-8 text-xs font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  {REFUND_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
                />
              </div>
            </div>

            {/* Custom details / Note */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-foreground">
                Mô tả chi tiết tình trạng sản phẩm <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Vui lòng mô tả rõ lỗi (ví dụ: gãy part tóc nhân vật, hộp móp méo, thẻ bài có nếp gấp...)"
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground/70 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
              />
            </div>

            {/* Refund amount */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-foreground">
                Số tiền yêu cầu hoàn (₫)
              </label>
              <input
                type="number"
                min={1000}
                max={maxAmount}
                value={refundAmount}
                onChange={(e) =>
                  setRefundAmount(
                    Math.min(maxAmount, Math.max(0, Number(e.target.value)))
                  )
                }
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
              <p className="text-[10px] text-muted-foreground">
                Bạn có thể yêu cầu hoàn 100% (₫{maxAmount.toLocaleString("vi-VN")}) hoặc một phần nếu giữ lại sản phẩm.
              </p>
            </div>

            {/* Proof files upload */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-foreground flex items-center justify-between">
                <span>Ảnh / Video unboxing bằng chứng</span>
                <span className="text-[11px] text-muted-foreground font-normal">
                  (Tối đa 4 tệp)
                </span>
              </label>

              <div className="grid grid-cols-4 gap-2">
                {proofFiles.map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted/60"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt="Proof"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setProofFiles((prev) => prev.filter((_, idx) => idx !== i))
                      }
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}

                {proofFiles.length < 4 && (
                  <label className="aspect-square rounded-xl border-2 border-dashed border-border/80 hover:border-primary/60 bg-muted/20 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors text-muted-foreground hover:text-primary">
                    <Upload size={16} />
                    <span className="text-[10px] font-medium">Tải ảnh/video</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleSimulateUpload}
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
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !customReason.trim()}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <FileText size={14} />
                <span>{isSubmitting ? "Đang gửi..." : "Gửi yêu cầu khiếu nại"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
