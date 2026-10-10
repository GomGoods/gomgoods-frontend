"use client";

import { useState } from "react";
import { AlertCircle, X, ShieldAlert, Check } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ReportPostProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  dict?: Dictionary;
}

const REPORT_REASONS = [
  "Lừa đảo, scammer giả mạo giao dịch",
  "Hàng giả / Fake nhưng mạo danh hàng chính hãng",
  "Spam, quảng cáo rác ngoài chủ đề",
  "Ngôn từ thô tục, xúc phạm thành viên khác",
  "Tiết lộ thông tin cá nhân sai quy định",
  "Khác",
];

export function ReportPost({ postId, isOpen, onClose, dict }: ReportPostProps) {
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0]);
  const [detail, setDetail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container-low">
          <div className="flex items-center gap-2 text-error font-bold text-sm">
            <ShieldAlert size={18} />
            <span>{dict?.forum?.report || "Báo cáo bài viết vi phạm"}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Check size={24} />
            </div>
            <h4 className="font-bold text-sm text-on-background">
              Đã tiếp nhận báo cáo!
            </h4>
            <p className="text-xs text-on-surface-variant">
              Đội ngũ kiểm duyệt GomGoods sẽ xác minh bài viết #{postId} trong vòng 24 giờ.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-2">
                {dict?.forum?.report_reason || "Lý do bạn muốn báo cáo:"}
              </label>
              <div className="flex flex-col gap-2">
                {REPORT_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      selectedReason === reason
                        ? "border-primary bg-primary/5 text-primary font-medium"
                        : "border-outline-variant/60 hover:bg-surface-container-low text-on-surface"
                    }`}
                  >
                    <input
                      type="radio"
                      name="report-reason"
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="accent-primary"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                Chi tiết bổ sung (không bắt buộc):
              </label>
              <textarea
                rows={2}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Cung cấp thêm bằng chứng hoặc link nếu có..."
                className="w-full text-xs p-3 rounded-xl border border-outline-variant bg-surface focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-error text-on-error hover:bg-error/90 rounded-xl transition-all shadow-sm active:scale-95"
              >
                {dict?.forum?.report_submit || "Gửi báo cáo"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
