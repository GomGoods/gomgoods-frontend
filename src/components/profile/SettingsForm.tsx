"use client";

import { useState } from "react";
import { Check, Save, User, Mail, Phone, MapPin, Bell, Shield } from "lucide-react";
import type { UserProfile } from "./profile-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface SettingsFormProps {
  user: UserProfile;
  dict?: Dictionary;
}

export function SettingsForm({ user, dict }: SettingsFormProps) {
  const p = dict?.profile;

  const [displayName, setDisplayName] = useState(user.displayName);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [email, setEmail] = useState("nguyen.collector@gomgoods.vn");
  const [phone, setPhone] = useState("0987 654 321");
  const [notifyDeals, setNotifyDeals] = useState(true);
  const [notifyChat, setNotifyChat] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border/80 rounded-2xl p-5 sm:p-7 shadow-xs flex flex-col gap-6"
    >
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-foreground">
          {p?.tab_settings || "Cài đặt hồ sơ & Tài khoản"}
        </h2>
        <p className="text-xs text-muted-foreground">
          Quản lý thông tin công khai và tùy chọn tài khoản của bạn trên GomGoods
        </p>
      </div>

      {isSaved && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-200/80 text-xs sm:text-sm font-medium animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{p?.settings_saved_success || "Đã cập nhật thông tin thành công!"}</span>
        </div>
      )}

      {/* Basic Profile */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
          Thông tin cơ bản
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">
              Tên hiển thị
            </label>
            <div className="relative">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">
              Username (@ định danh)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                @
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 pl-8 pr-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground">
            Tiểu sử (Bio)
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
          />
          <span className="text-[11px] text-muted-foreground">
            Mô tả ngắn gọn về niềm đam mê sưu tầm hoặc phong cách đóng gói của bạn.
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground">
            Khu vực / Tỉnh thành
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
          Thông tin liên hệ & Bảo mật
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">
              Địa chỉ Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">
              Số điện thoại
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
          Tùy chọn thông báo
        </h3>

        <label className="flex items-center justify-between p-3 rounded-xl border border-border/70 hover:bg-muted/40 cursor-pointer transition-colors">
          <div>
            <span className="text-xs sm:text-sm font-semibold text-foreground block">
              Thông báo cập nhật giao dịch
            </span>
            <span className="text-[11px] text-muted-foreground">
              Nhận thông báo khi có người đặt mua hoặc trạng thái đơn hàng thay đổi.
            </span>
          </div>
          <input
            type="checkbox"
            checked={notifyDeals}
            onChange={(e) => setNotifyDeals(e.target.checked)}
            className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
          />
        </label>

        <label className="flex items-center justify-between p-3 rounded-xl border border-border/70 hover:bg-muted/40 cursor-pointer transition-colors">
          <div>
            <span className="text-xs sm:text-sm font-semibold text-foreground block">
              Thông báo tin nhắn riêng
            </span>
            <span className="text-[11px] text-muted-foreground">
              Gửi email nhắc nhở khi có tin nhắn thương lượng mới từ khách hàng.
            </span>
          </div>
          <input
            type="checkbox"
            checked={notifyChat}
            onChange={(e) => setNotifyChat(e.target.checked)}
            className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
          />
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20"
        >
          <Save className="w-4 h-4" />
          <span>{p?.settings_save || "Lưu thay đổi"}</span>
        </button>
      </div>
    </form>
  );
}
