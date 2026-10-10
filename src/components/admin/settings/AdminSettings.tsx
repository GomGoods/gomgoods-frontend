"use client";

import { useState } from "react";
import {
  User,
  Shield,
  Bell,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Globe,
  Camera,
} from "lucide-react";

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState<"profile" | "general" | "notifications" | "danger">("profile");
  const [typedConfirm, setTypedConfirm] = useState("");
  const [dangerActionDone, setDangerActionDone] = useState(false);

  // Profile Form
  const [adminName, setAdminName] = useState("Nguyễn Văn Quản Trị");
  const [adminEmail, setAdminEmail] = useState("admin@gomgoods.com");
  const [adminAvatar, setAdminAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // General Form
  const [siteName, setSiteName] = useState("GomGoods - Chợ Fandom Sôi Động & Collectibles");
  const [contactEmail, setContactEmail] = useState("support@gomgoods.com");
  const [hotline, setHotline] = useState("1900 6868");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Notification Form
  const [disputeAlerts, setDisputeAlerts] = useState(true);
  const [reportAlerts, setReportAlerts] = useState(true);
  const [campaignAlerts, setCampaignAlerts] = useState(false);

  // Feedback message
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleSave = (section: string) => {
    setSaveMessage(`Đã cập nhật cấu hình ${section} thành công!`);
    setTimeout(() => setSaveMessage(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-display-sm font-bold text-on-surface">Cài đặt Hệ thống Quản trị</h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Quản lý tài khoản quản trị viên, thông tin sàn và thông báo hệ thống
        </p>
      </div>

      {saveMessage && (
        <div className="p-4 rounded-xl bg-tertiary/15 border border-tertiary/30 text-tertiary flex items-center gap-2 font-medium">
          <CheckCircle2 size={18} />
          {saveMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-outline-variant/30 gap-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 flex items-center gap-2 ${
            activeTab === "profile"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <User size={18} /> Hồ sơ Admin
        </button>
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 flex items-center gap-2 ${
            activeTab === "general"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <Globe size={18} /> Cài đặt chung
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 flex items-center gap-2 ${
            activeTab === "notifications"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <Bell size={18} /> Cảnh báo & Thông báo
        </button>
        <button
          onClick={() => setActiveTab("danger")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 flex items-center gap-2 ${
            activeTab === "danger"
              ? "border-error text-error font-semibold"
              : "border-transparent text-error/70 hover:text-error"
          }`}
        >
          <Shield size={18} /> Vùng nguy hiểm (Danger Zone)
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === "profile" && (
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={adminAvatar}
                alt="Admin Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-outline-variant/50"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-on-primary shadow-sm hover:opacity-90 transition"
              >
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h2 className="text-title-lg font-bold text-on-surface">{adminName}</h2>
              <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-label-sm font-semibold bg-primary-container text-on-primary-container">
                Super Admin
              </span>
              <p className="text-label-sm text-on-surface-variant mt-1">{adminEmail}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
            <div>
              <label className="text-label-md font-semibold text-on-surface block mb-1.5">
                Họ và tên
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface block mb-1.5">
                Email quản trị
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none"
              />
            </div>
          </div>

          {/* Password Change */}
          <div className="pt-4 border-t border-outline-variant/20 space-y-4">
            <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2">
              <Lock size={18} className="text-primary" /> Đổi mật khẩu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-label-sm font-semibold text-on-surface-variant block mb-1">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none"
                />
              </div>
              <div>
                <label className="text-label-sm font-semibold text-on-surface-variant block mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none"
                />
              </div>
              <div>
                <label className="text-label-sm font-semibold text-on-surface-variant block mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={() => handleSave("hồ sơ cá nhân")}
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-label-md hover:opacity-95 transition shadow-sm"
            >
              Lưu thay đổi hồ sơ
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: General */}
      {activeTab === "general" && (
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-6">
          <div>
            <label className="text-label-md font-semibold text-on-surface block mb-1.5">
              Tên sàn giao dịch
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface block mb-1.5">
                Email hỗ trợ khách hàng
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface block mb-1.5">
                Hotline chăm sóc khách hàng
              </label>
              <input
                type="text"
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-on-surface text-body-md">Chế độ bảo trì (Maintenance Mode)</h3>
              <p className="text-label-sm text-on-surface-variant">
                Khi bật, chỉ tài khoản Admin mới có thể truy cập hệ thống GomGoods.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex justify-end pt-4 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={() => handleSave("cài đặt chung")}
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-label-md hover:opacity-95 transition shadow-sm"
            >
              Lưu cài đặt chung
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-6">
          <div className="space-y-4 divide-y divide-outline-variant/20">
            {/* Dispute Alerts */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <h3 className="font-semibold text-on-surface text-body-md">Thông báo Tranh chấp mới (Dispute Alerts)</h3>
                <p className="text-label-sm text-on-surface-variant">
                  Gửi email và chuông thông báo ngay khi có khiếu nại phát sinh từ người mua hoặc người bán.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={disputeAlerts}
                  onChange={(e) => setDisputeAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Report Alerts */}
            <div className="flex items-center justify-between pt-4">
              <div>
                <h3 className="font-semibold text-on-surface text-body-md">Cảnh báo Vi phạm & Report (Report Alerts)</h3>
                <p className="text-label-sm text-on-surface-variant">
                  Báo động khi bài viết diễn đàn hoặc sản phẩm nhận từ 3 lượt báo cáo vi phạm trở lên.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reportAlerts}
                  onChange={(e) => setReportAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Campaign Alerts */}
            <div className="flex items-center justify-between pt-4">
              <div>
                <h3 className="font-semibold text-on-surface text-body-md">Thông báo Chiến dịch Marketing</h3>
                <p className="text-label-sm text-on-surface-variant">
                  Nhắc nhở khi chiến dịch đạt mốc người tham gia hoặc sắp kết thúc thời gian chạy.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={campaignAlerts}
                  onChange={(e) => setCampaignAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={() => handleSave("thông báo & cảnh báo")}
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-label-md hover:opacity-95 transition shadow-sm"
            >
              Lưu cấu hình thông báo
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Danger Zone */}
      {activeTab === "danger" && (
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border-2 border-error-container/60 shadow-sm space-y-6">
          <div className="p-4 rounded-xl bg-error-container/20 border border-error-container text-error space-y-1">
            <h2 className="text-title-md font-bold flex items-center gap-2">
              <Shield size={20} /> Vùng hành động nguy hiểm (Danger Zone)
            </h2>
            <p className="text-body-sm text-on-surface">
              Các thao tác bên dưới có tác động vĩnh viễn đến dữ liệu hệ thống hoặc trạng thái hoạt động của sàn GomGoods. Vui lòng cân nhắc kỹ lưỡng trước khi xác nhận.
            </p>
          </div>

          <div className="space-y-4 divide-y divide-outline-variant/20">
            {/* Action 1 */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-on-surface text-body-md">Xóa bộ nhớ đệm kiểm thử (Reset Mock Data Cache)</h3>
                <p className="text-body-sm text-on-surface-variant">
                  Khôi phục toàn bộ dữ liệu mock người dùng, sản phẩm và tranh chấp về trạng thái mặc định ban đầu.
                </p>
              </div>

              <div className="space-y-2 flex-shrink-0">
                <input
                  type="text"
                  value={typedConfirm}
                  onChange={(e) => setTypedConfirm(e.target.value)}
                  placeholder="Nhập 'XAC NHAN XOA'"
                  className="w-full sm:w-44 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant text-body-sm text-on-surface font-mono outline-none focus:border-error"
                />
                <button
                  type="button"
                  disabled={typedConfirm !== "XAC NHAN XOA"}
                  onClick={() => {
                    setDangerActionDone(true);
                    setTypedConfirm("");
                    handleSave("xóa cache & reset dữ liệu mock");
                  }}
                  className="w-full px-4 py-2 rounded-xl text-label-md font-semibold bg-error text-on-error hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  Xác nhận xóa dữ liệu
                </button>
              </div>
            </div>

            {/* Action 2 */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-on-surface text-body-md">Đình chỉ khẩn cấp tất cả phiên đấu giá live</h3>
                <p className="text-body-sm text-on-surface-variant">
                  Chỉ áp dụng khi phát hiện sự cố bảo mật nghiêm trọng. Tự động đóng băng cọc tiền của toàn bộ người tham gia.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleSave("đình chỉ khẩn cấp phòng đấu giá")}
                className="px-4 py-2 rounded-xl text-label-md font-semibold border border-error text-error bg-error-container/20 hover:bg-error-container/40 transition whitespace-nowrap self-start sm:self-auto"
              >
                Kích hoạt dừng khẩn cấp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
