"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Users,
  HandHeart,
  Megaphone,
  Award,
  CheckCircle2,
  AlertOctagon,
} from "lucide-react";
import {
  MOCK_ADMIN_CAMPAIGNS,
  MOCK_ADMIN_PARTICIPANTS,
  MOCK_ADMIN_CONTRIBUTIONS,
  CAMPAIGN_STATUS_CONFIG,
  type AdminCampaignItem,
} from "../mock-data/campaigns-mock";

export function CampaignDetail({ id }: { id: string }) {
  const [campaign, setCampaign] = useState<AdminCampaignItem>(() => {
    return MOCK_ADMIN_CAMPAIGNS.find((c) => c.id === id) || MOCK_ADMIN_CAMPAIGNS[0];
  });

  const [activeTab, setActiveTab] = useState<"overview" | "participants" | "contributions">("overview");

  const toggleStatus = () => {
    setCampaign((prev) => ({
      ...prev,
      status: prev.status === "published" ? "ended" : "published",
    }));
  };

  const statusConf = CAMPAIGN_STATUS_CONFIG[campaign.status];
  const participants = MOCK_ADMIN_PARTICIPANTS.filter((p) => p.campaignId === campaign.id);
  const contributions = MOCK_ADMIN_CONTRIBUTIONS.filter((c) => c.campaignId === campaign.id);

  return (
    <div className="space-y-6">
      {/* Top back button */}
      <div className="flex items-center gap-3">
        <Link
          href="/vi/admin/campaigns"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-label-md transition"
        >
          <ArrowLeft size={16} /> Quay lại danh sách chiến dịch
        </Link>
        <span className="text-on-surface-variant text-body-sm">
          Mã chiến dịch: <span className="font-mono text-on-surface">{campaign.id}</span>
        </span>
      </div>

      {/* Main Cover Banner Card */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <div className="aspect-[21/7] w-full relative overflow-hidden bg-surface-container-low">
          <img src={campaign.bannerImage} alt={campaign.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <div className="text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md text-label-sm ${statusConf.class}`}>
                  {statusConf.label}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-label-sm bg-white/20 backdrop-blur-sm">
                  {campaign.type}
                </span>
              </div>
              <h1 className="text-display-xs sm:text-display-sm font-bold">{campaign.name}</h1>
              <p className="text-body-sm opacity-90 flex items-center gap-2">
                <Calendar size={16} /> Thời gian: {campaign.startDate} đến {campaign.endDate}
              </p>
            </div>
          </div>
        </div>

        {/* Action toolbar */}
        <div className="p-4 bg-surface-container-lowest flex items-center justify-between border-t border-outline-variant/20">
          <div className="flex items-center gap-4 text-body-md text-on-surface">
            <span>
              <strong>{campaign.participantsCount.toLocaleString("vi-VN")}</strong> người tham gia
            </span>
            <span>•</span>
            <span>
              <strong>{campaign.contributionsCount.toLocaleString("vi-VN")}</strong> đóng góp / claim quà
            </span>
          </div>

          <button
            onClick={toggleStatus}
            className={`px-4 py-2 rounded-xl text-label-md font-medium transition border ${
              campaign.status === "published"
                ? "bg-error-container/20 text-error border-error-container hover:bg-error-container/40"
                : "bg-tertiary/15 text-tertiary border-tertiary/30 hover:bg-tertiary/25"
            }`}
          >
            {campaign.status === "published" ? "Kết thúc chiến dịch sớm" : "Kích hoạt chiến dịch"}
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-outline-variant/30 gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Tổng quan & Quy tắc
        </button>
        <button
          onClick={() => setActiveTab("participants")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 ${
            activeTab === "participants"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Người tham gia ({participants.length})
        </button>
        <button
          onClick={() => setActiveTab("contributions")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 ${
            activeTab === "contributions"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Đóng góp & Quà tặng ({contributions.length})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Mô tả chiến dịch</h2>
            <p className="text-body-md text-on-surface leading-relaxed">{campaign.description}</p>

            <h2 className="text-title-md font-bold text-on-surface pt-4 border-t border-outline-variant/20">
              Quy tắc tham gia
            </h2>
            <p className="text-body-md text-on-surface leading-relaxed">{campaign.rules}</p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface flex items-center gap-2">
              <Award size={20} className="text-primary" /> Cơ cấu giải thưởng & Quỹ quà tặng
            </h2>
            <div className="p-4 rounded-xl bg-primary-container/20 border border-primary-container/40">
              <p className="text-body-md font-semibold text-on-surface">{campaign.rewardPool}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-surface-container-low/40">
                <span className="text-label-sm text-on-surface-variant block">Ngày bắt đầu</span>
                <span className="text-body-lg font-bold text-on-surface">{campaign.startDate}</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low/40">
                <span className="text-label-sm text-on-surface-variant block">Ngày kết thúc</span>
                <span className="text-body-lg font-bold text-on-surface">{campaign.endDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "participants" && (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm">
          <h2 className="text-title-md font-bold text-on-surface mb-4">Danh sách người tham gia ghi nhận</h2>
          {participants.length === 0 ? (
            <p className="text-body-md text-on-surface-variant py-8 text-center">Chưa có người tham gia nào trong sự kiện này.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-label-sm text-on-surface-variant uppercase">
                    <th className="py-2.5 px-3">Người dùng</th>
                    <th className="py-2.5 px-3">Điểm tích lũy</th>
                    <th className="py-2.5 px-3">Phần thưởng đã nhận</th>
                    <th className="py-2.5 px-3">Ngày tham gia</th>
                    <th className="py-2.5 px-3 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                  {participants.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <img src={p.user.avatar} alt={p.user.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-semibold text-on-surface block">{p.user.name}</span>
                            <span className="text-label-sm text-on-surface-variant">@{p.user.username}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-bold text-primary">{p.points} pts</td>
                      <td className="py-3 px-3 text-on-surface">{p.rewardsClaimed}</td>
                      <td className="py-3 px-3 text-on-surface-variant">{p.joinedAt}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="text-label-sm px-2.5 py-0.5 rounded-full font-medium bg-tertiary/15 text-tertiary">
                          Hợp lệ
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "contributions" && (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm">
          <h2 className="text-title-md font-bold text-on-surface mb-4">Lịch sử đóng góp & Đổi quà</h2>
          {contributions.length === 0 ? (
            <p className="text-body-md text-on-surface-variant py-8 text-center">Chưa ghi nhận đóng góp nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-label-sm text-on-surface-variant uppercase">
                    <th className="py-2.5 px-3">Người đóng góp</th>
                    <th className="py-2.5 px-3">Loại đóng góp</th>
                    <th className="py-2.5 px-3">Chi tiết</th>
                    <th className="py-2.5 px-3">Giá trị</th>
                    <th className="py-2.5 px-3">Thời gian</th>
                    <th className="py-2.5 px-3 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                  {contributions.map((c) => (
                    <tr key={c.id}>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <img src={c.contributor.avatar} alt={c.contributor.name} className="w-8 h-8 rounded-full object-cover" />
                          <span className="font-semibold text-on-surface">{c.contributor.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-on-surface capitalize">{c.type.replace("_", " ")}</td>
                      <td className="py-3 px-3 text-on-surface">{c.details}</td>
                      <td className="py-3 px-3 font-semibold text-primary">{c.value}</td>
                      <td className="py-3 px-3 text-on-surface-variant">{c.timestamp}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="text-label-sm px-2.5 py-0.5 rounded-full font-medium bg-tertiary/15 text-tertiary">
                          Đã xác nhận
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
