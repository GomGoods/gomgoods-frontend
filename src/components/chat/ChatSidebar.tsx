"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Store,
  Search,
  Bell,
  BellOff,
  User,
  Image as ImageIcon,
  FileText,
  Link2,
  ChevronDown,
  ChevronRight,
  Shield,
  Clock,
  CheckCircle2,
  Lock,
  Slash,
  Ban,
  AlertTriangle,
  EyeOff,
  X,
  Trash2,
} from "lucide-react";
import type { SellerProfileSummary } from "./types";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface ChatSidebarProps {
  sellerProfile?: SellerProfileSummary;
  dict?: Dictionary;
  lang?: Locale;
  onClose?: () => void;
}

export function ChatSidebar({
  sellerProfile,
  dict,
  lang = "vi",
  onClose,
}: ChatSidebarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(true);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [readReceiptsOn, setReadReceiptsOn] = useState(true);
  const [disappearingTime, setDisappearingTime] = useState<string>("Tắt");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  if (!sellerProfile) return null;

  const initial = sellerProfile.name ? sellerProfile.name.charAt(0).toUpperCase() : "?";
  const sellerSlug = encodeURIComponent(
    sellerProfile.name.toLowerCase().replace(/\s+/g, "-")
  );

  return (
    <div className="w-80 lg:w-88 flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex-shrink-0 h-full relative">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="absolute top-3 left-3 right-3 z-50 bg-brand-dark text-white px-3 py-2 rounded-lg text-xs font-medium shadow-md animate-in fade-in slide-in-from-top-2 duration-150 flex items-center justify-between">
          <span>{toastMsg}</span>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Panel Header */}
      <div className="p-3.5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between flex-shrink-0">
        <h3 className="text-sm font-bold text-on-surface">
          Chi tiết đoạn chat
        </h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
            title="Đóng"
            aria-label="Đóng"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/50">
        {/* 1. Seller Profile Card */}
        <div className="p-4 flex flex-col items-center text-center">
          <Link
            href={`/${lang}/seller/${sellerSlug}`}
            className="relative w-18 h-18 rounded-full border-2 border-primary p-0.5 mb-2 overflow-hidden flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
            title="Xem hồ sơ shop"
          >
            {sellerProfile.avatar ? (
              <Image
                src={sellerProfile.avatar}
                alt={sellerProfile.name}
                width={72}
                height={72}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xl">
                {initial}
              </div>
            )}
          </Link>

          <Link
            href={`/${lang}/seller/${sellerSlug}`}
            className="text-base font-bold text-on-surface truncate max-w-full hover:text-primary transition-colors cursor-pointer"
          >
            {sellerProfile.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 text-secondary mt-0.5 text-xs">
            <Star size={14} className="fill-brand-yellow text-brand-yellow" />
            <span className="font-bold text-on-surface">{sellerProfile.rating}</span>
            <span className="text-on-surface-variant">
              ({sellerProfile.reviewCount} đánh giá)
            </span>
          </div>

          {/* 3 Metrics */}
          <div className="w-full grid grid-cols-3 gap-1.5 py-3 mt-2 border-y border-outline-variant/60 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">
                Tham gia
              </span>
              <span className="text-xs font-bold text-on-surface mt-0.5">
                {sellerProfile.joinedYear}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">
                Phản hồi
              </span>
              <span className="text-xs font-bold text-brand-yellow mt-0.5">
                {sellerProfile.responseRate}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">
                Đã bán
              </span>
              <span className="text-xs font-bold text-on-surface mt-0.5">
                {sellerProfile.salesCount}
              </span>
            </div>
          </div>

          {/* Quick Action Icon Row */}
          <div className="grid grid-cols-3 gap-2 w-full mt-3">
            <button
              type="button"
              onClick={() => showToast("Đã kích hoạt tìm kiếm trong cuộc trò chuyện")}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface-container text-on-surface transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                <Search size={16} />
              </div>
              <span className="text-[11px] font-medium text-on-surface-variant group-hover:text-foreground">
                Tìm kiếm
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMuted(!isMuted);
                showToast(!isMuted ? "Đã tắt thông báo cuộc trò chuyện" : "Đã bật lại thông báo");
              }}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface-container text-on-surface transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                {isMuted ? <BellOff size={16} className="text-brand-coral" /> : <Bell size={16} />}
              </div>
              <span className="text-[11px] font-medium text-on-surface-variant group-hover:text-foreground">
                {isMuted ? "Bật chuông" : "Tắt chuông"}
              </span>
            </button>

            <Link
              href={`/${lang}/seller/${sellerSlug}`}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface-container text-on-surface transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                <Store size={16} />
              </div>
              <span className="text-[11px] font-medium text-on-surface-variant group-hover:text-foreground">
                Hồ sơ shop
              </span>
            </Link>
          </div>
        </div>

        {/* 2. Media, Files & Links Section */}
        <div className="p-3">
          <button
            type="button"
            onClick={() => setIsMediaOpen(!isMediaOpen)}
            className="w-full flex items-center justify-between py-1.5 text-xs font-bold text-on-surface uppercase tracking-wider hover:text-primary transition-colors cursor-pointer"
          >
            <span>File phương tiện &amp; Liên kết</span>
            {isMediaOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {isMediaOpen && (
            <div className="mt-2 flex flex-col gap-1 text-xs">
              <button
                type="button"
                onClick={() => showToast("Đang mở danh sách Ảnh & Video")}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5 text-on-surface">
                  <ImageIcon size={16} className="text-primary" />
                  <span>Ảnh &amp; Video</span>
                </div>
                <span className="text-[11px] text-on-surface-variant font-mono">14</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Đang mở danh sách File đính kèm")}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5 text-on-surface">
                  <FileText size={16} className="text-secondary" />
                  <span>File &amp; Tài liệu</span>
                </div>
                <span className="text-[11px] text-on-surface-variant font-mono">3</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Đang mở danh sách Liên kết")}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5 text-on-surface">
                  <Link2 size={16} className="text-brand-coral" />
                  <span>Liên kết đã chia sẻ</span>
                </div>
                <span className="text-[11px] text-on-surface-variant font-mono">5</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. Privacy & Support Section (Exact translation of Image 2) */}
        <div className="p-3">
          <button
            type="button"
            onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
            className="w-full flex items-center justify-between py-1.5 text-xs font-bold text-on-surface uppercase tracking-wider hover:text-primary transition-colors cursor-pointer"
          >
            <span>Quyền riêng tư &amp; Hỗ trợ</span>
            {isPrivacyOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {isPrivacyOpen && (
            <div className="mt-2 flex flex-col gap-1 text-xs">
              {/* Tắt thông báo */}
              <button
                type="button"
                onClick={() => {
                  setIsMuted(!isMuted);
                  showToast(!isMuted ? "Đã tắt thông báo" : "Đã bật thông báo");
                }}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container text-on-surface transition-colors text-left cursor-pointer"
              >
                <Bell size={16} className="text-on-surface-variant" />
                <div className="flex-1">
                  <div className="font-medium">Tắt thông báo</div>
                  <div className="text-[10px] text-on-surface-variant">
                    {isMuted ? "Đang tắt" : "Bật"}
                  </div>
                </div>
              </button>

              {/* Quyền gửi tin nhắn */}
              <button
                type="button"
                onClick={() => showToast("Quyền gửi tin nhắn: Mọi người")}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container text-on-surface transition-colors text-left cursor-pointer"
              >
                <Shield size={16} className="text-on-surface-variant" />
                <div className="flex-1">
                  <div className="font-medium">Quyền gửi tin nhắn</div>
                </div>
              </button>

              {/* Tin nhắn tự biến mất */}
              <button
                type="button"
                onClick={() => {
                  const next = disappearingTime === "Tắt" ? "24 giờ" : "Tắt";
                  setDisappearingTime(next);
                  showToast(`Tin nhắn tự xóa: ${next}`);
                }}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container text-on-surface transition-colors text-left cursor-pointer"
              >
                <Clock size={16} className="text-on-surface-variant" />
                <div className="flex-1">
                  <div className="font-medium">Tin nhắn tự biến mất</div>
                  <div className="text-[10px] text-on-surface-variant">
                    {disappearingTime}
                  </div>
                </div>
              </button>

              {/* Thông báo đã đọc */}
              <button
                type="button"
                onClick={() => {
                  setReadReceiptsOn(!readReceiptsOn);
                  showToast(readReceiptsOn ? "Đã tắt thông báo đã đọc" : "Đã bật thông báo đã đọc");
                }}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container text-on-surface transition-colors text-left cursor-pointer"
              >
                <CheckCircle2 size={16} className="text-on-surface-variant" />
                <div className="flex-1">
                  <div className="font-medium">Thông báo đã xem</div>
                  <div className="text-[10px] text-on-surface-variant">
                    {readReceiptsOn ? "Đang bật" : "Đã tắt"}
                  </div>
                </div>
              </button>

              {/* Xác minh mã hóa đầu cuối */}
              <button
                type="button"
                onClick={() => showToast("Đoạn chat được bảo mật bằng mã hóa đầu cuối")}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container text-on-surface transition-colors text-left cursor-pointer"
              >
                <Lock size={16} className="text-on-surface-variant" />
                <div className="flex-1">
                  <div className="font-medium">Xác minh mã hóa đầu cuối</div>
                </div>
              </button>

              {/* Hạn chế */}
              <button
                type="button"
                onClick={() => showToast("Đã hạn chế tương tác với tài khoản này")}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container text-on-surface transition-colors text-left cursor-pointer"
              >
                <Slash size={16} className="text-on-surface-variant" />
                <div className="flex-1">
                  <div className="font-medium">Hạn chế người này</div>
                </div>
              </button>

              {/* Chặn */}
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Bạn có chắc muốn chặn ${sellerProfile.name}?`)) {
                    showToast(`Đã chặn ${sellerProfile.name}`);
                  }
                }}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors text-left cursor-pointer"
              >
                <Ban size={16} />
                <div className="flex-1">
                  <div className="font-medium">Chặn tài khoản</div>
                </div>
              </button>

              {/* Báo cáo */}
              <button
                type="button"
                onClick={() => showToast("Đã mở biểu mẫu gửi báo cáo vi phạm")}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors text-left cursor-pointer"
              >
                <AlertTriangle size={16} />
                <div className="flex-1">
                  <div className="font-medium">Báo cáo cuộc trò chuyện</div>
                  <div className="text-[10px] text-destructive/80">
                    Gửi phản hồi và báo cáo nội dung này
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* 4. Bottom Controls: Ẩn cuộc trò chuyện & Xóa đoạn chat */}
        <div className="p-3 flex flex-col gap-1 text-xs">
          <button
            type="button"
            onClick={() => {
              if (confirm("Ẩn cuộc trò chuyện này khỏi danh sách?")) {
                showToast("Đã ẩn cuộc trò chuyện");
              }
            }}
            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors text-left cursor-pointer"
          >
            <EyeOff size={16} />
            <span className="font-medium">Ẩn cuộc trò chuyện</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử tin nhắn?")) {
                showToast("Đã xóa lịch sử tin nhắn");
              }
            }}
            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors text-left cursor-pointer"
          >
            <Trash2 size={16} />
            <span className="font-medium">Xóa lịch sử trò chuyện</span>
          </button>
        </div>
      </div>
    </div>
  );
}
