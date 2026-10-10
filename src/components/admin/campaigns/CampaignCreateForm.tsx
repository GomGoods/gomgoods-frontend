"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, CheckCircle2, Calendar, Sparkles } from "lucide-react";
import type { CampaignStatus } from "../mock-data/campaigns-mock";

export function CampaignCreateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80");
  const [bannerImage, setBannerImage] = useState("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Fandom Festival");
  const [startDate, setStartDate] = useState("2024-07-01");
  const [endDate, setEndDate] = useState("2024-07-31");
  const [rules, setRules] = useState("");
  const [rewardPool, setRewardPool] = useState("");
  const [status, setStatus] = useState<CampaignStatus>("published");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (chosenStatus: CampaignStatus) => {
    setIsSubmitting(true);
    setStatus(chosenStatus);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(`Chiến dịch đã được lưu thành công dưới trạng thái: ${chosenStatus === "published" ? "Xuất bản ngay" : "Bản nháp"}`);
      setTimeout(() => {
        router.push("/vi/admin/campaigns");
      }, 1500);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top back button */}
      <div className="flex items-center gap-3">
        <Link
          href="/vi/admin/campaigns"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-label-md transition"
        >
          <ArrowLeft size={16} /> Quay lại danh sách chiến dịch
        </Link>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-display-sm font-bold text-on-surface">Tạo Chiến dịch Marketing & Engagement mới</h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Thiết lập thể lệ sự kiện, hình ảnh truyền thông và cài đặt phần thưởng cho cộng đồng
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-tertiary/15 border border-tertiary/30 text-tertiary flex items-center gap-2 font-medium">
          <CheckCircle2 size={20} />
          {successMsg}
        </div>
      )}

      {/* Main Form */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-6">
        {/* Campaign Name */}
        <div>
          <label className="text-label-md font-semibold text-on-surface block mb-1.5">
            Tên chiến dịch <span className="text-error">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Đại Tiệc Săn Deal Fandom Mùa Hè 2024"
            className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface-container-lowest text-body-md text-on-surface transition outline-none"
          />
        </div>

        {/* Campaign Type & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-label-md font-semibold text-on-surface block mb-1.5">
              Loại sự kiện
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="Fandom Festival">Fandom Festival (Lễ hội quy mô)</option>
              <option value="Trading Day">Trading Day (Ngày hội trao đổi goods)</option>
              <option value="Community Contest">Community Contest (Cuộc thi sáng tạo)</option>
              <option value="Voucher Hunt">Voucher Hunt (Săn mã giảm giá)</option>
            </select>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface block mb-1.5">
              Trạng thái khởi tạo
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="published">Xuất bản ngay (Published)</option>
              <option value="scheduled">Lên lịch mở sau (Scheduled)</option>
              <option value="draft">Lưu bản nháp (Draft)</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-label-md font-semibold text-on-surface block mb-1.5">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-label-md font-semibold text-on-surface block mb-1.5">
              Ngày kết thúc
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Media URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-label-md font-semibold text-on-surface block mb-1.5">
              Ảnh Cover (Thumbnail) URL
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none font-mono text-body-sm"
            />
          </div>
          <div>
            <label className="text-label-md font-semibold text-on-surface block mb-1.5">
              Ảnh Banner (Header rộng) URL
            </label>
            <input
              type="text"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none font-mono text-body-sm"
            />
          </div>
        </div>

        {/* Live Preview Card */}
        <div>
          <label className="text-label-md font-semibold text-on-surface block mb-1.5">
            Xem trước giao diện Banner chiến dịch
          </label>
          <div className="aspect-[21/8] w-full rounded-xl overflow-hidden relative bg-surface-container-low border border-outline-variant/30">
            <img src={bannerImage} alt="Banner preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="px-2 py-0.5 rounded text-label-sm bg-primary text-on-primary font-medium">
                  {type}
                </span>
                <p className="text-title-lg sm:text-headline-sm font-bold">
                  {name || "Tiêu đề chiến dịch sẽ hiển thị ở đây"}
                </p>
                <p className="text-label-sm opacity-80">
                  {startDate} đến {endDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-label-md font-semibold text-on-surface block mb-1.5">
            Mô tả chiến dịch
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Nội dung giới thiệu thông điệp của chiến dịch..."
            className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none resize-none"
          />
        </div>

        {/* Participation Rules */}
        <div>
          <label className="text-label-md font-semibold text-on-surface block mb-1.5">
            Quy tắc tham gia
          </label>
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            rows={2}
            placeholder="Ví dụ: Áp dụng cho mọi tài khoản mua/bán đơn hàng photocard trong thời gian diễn ra..."
            className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none resize-none"
          />
        </div>

        {/* Reward Pool */}
        <div>
          <label className="text-label-md font-semibold text-on-surface block mb-1.5">
            Cài đặt phần thưởng / Quỹ quà tặng
          </label>
          <input
            type="text"
            value={rewardPool}
            onChange={(e) => setRewardPool(e.target.value)}
            placeholder="Ví dụ: 1.000 voucher giảm giá 50k + 20 mô hình giới hạn"
            className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-outline-variant/30">
          <Link
            href="/vi/admin/campaigns"
            className="px-5 py-2.5 rounded-xl text-label-md font-medium border border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-on-surface transition"
          >
            Hủy
          </Link>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("draft")}
            className="px-5 py-2.5 rounded-xl text-label-md font-semibold border border-outline-variant/50 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface transition"
          >
            Lưu bản nháp
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("published")}
            className="px-6 py-2.5 rounded-xl text-label-md font-semibold bg-primary text-on-primary hover:opacity-95 transition shadow-sm"
          >
            {isSubmitting ? "Đang xử lý..." : "Xuất bản chiến dịch"}
          </button>
        </div>
      </div>
    </div>
  );
}
