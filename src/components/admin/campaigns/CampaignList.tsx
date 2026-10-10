"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  PlusCircle,
  Megaphone,
  Users,
  HandHeart,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  MOCK_ADMIN_CAMPAIGNS,
  CAMPAIGN_STATUS_CONFIG,
  type AdminCampaignItem,
  type CampaignStatus,
} from "../mock-data/campaigns-mock";

export function CampaignList() {
  const [campaigns, setCampaigns] = useState<AdminCampaignItem[]>(MOCK_ADMIN_CAMPAIGNS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "all">("all");

  const filteredCampaigns = useMemo(() => {
    let result = [...campaigns];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }

    return result;
  }, [campaigns, searchQuery, statusFilter]);

  const activeCount = campaigns.filter((c) => c.status === "published").length;
  const totalParticipants = campaigns.reduce((acc, c) => acc + c.participantsCount, 0);
  const totalContributions = campaigns.reduce((acc, c) => acc + c.contributionsCount, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display-sm font-bold text-on-surface">Chiến dịch Marketing & Engagement</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Quản lý các sự kiện lễ hội fandom, ngày hội trade goods và minigame săn quà
          </p>
        </div>
        <Link
          href="/vi/admin/campaigns/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-label-md font-semibold hover:opacity-95 transition shadow-sm self-start sm:self-auto"
        >
          <PlusCircle size={18} /> Tạo Chiến dịch mới
        </Link>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
            <Megaphone size={24} />
          </div>
          <div>
            <span className="text-label-sm text-on-surface-variant block">Chiến dịch đang chạy</span>
            <span className="text-headline-sm font-bold text-on-surface">{activeCount} chiến dịch</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <span className="text-label-sm text-on-surface-variant block">Tổng lượt tham gia</span>
            <span className="text-headline-sm font-bold text-on-surface">{totalParticipants.toLocaleString("vi-VN")}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-tertiary/15 text-tertiary flex items-center justify-center">
            <HandHeart size={24} />
          </div>
          <div>
            <span className="text-label-sm text-on-surface-variant block">Lượt đóng góp & claim quà</span>
            <span className="text-headline-sm font-bold text-on-surface">{totalContributions.toLocaleString("vi-VN")}</span>
          </div>
        </div>
      </div>

      {/* Search & Status Filter */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm chiến dịch..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface-container-lowest text-body-md text-on-surface transition outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {(["all", "published", "scheduled", "draft", "ended"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-label-sm font-medium transition border whitespace-nowrap ${
                statusFilter === st
                  ? "bg-primary text-on-primary border-transparent"
                  : "bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:text-on-surface"
              }`}
            >
              {st === "all" ? "Tất cả" : CAMPAIGN_STATUS_CONFIG[st].label}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampaigns.map((camp) => {
          const statusConf = CAMPAIGN_STATUS_CONFIG[camp.status];
          return (
            <div
              key={camp.id}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden flex flex-col justify-between hover:border-primary/50 transition"
            >
              <div>
                {/* Cover Banner */}
                <div className="aspect-[21/9] w-full relative overflow-hidden bg-surface-container-low">
                  <img src={camp.coverImage} alt={camp.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-md text-label-sm shadow-sm ${statusConf.class}`}>
                      {statusConf.label}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-label-sm font-medium bg-black/60 text-white backdrop-blur-sm">
                      {camp.type}
                    </span>
                  </div>
                </div>

                {/* Body info */}
                <div className="p-6 space-y-3">
                  <h2 className="text-title-lg font-bold text-on-surface line-clamp-1">{camp.name}</h2>
                  <p className="text-body-sm text-on-surface-variant line-clamp-2">{camp.description}</p>

                  <div className="flex items-center gap-2 text-label-sm text-on-surface-variant pt-1">
                    <Calendar size={15} />
                    <span>
                      {camp.startDate} đến {camp.endDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Stats & Actions */}
              <div className="px-6 py-4 border-t border-outline-variant/20 bg-surface-container-low/30 flex items-center justify-between">
                <div className="flex items-center gap-4 text-label-sm text-on-surface">
                  <span>
                    <strong>{camp.participantsCount.toLocaleString("vi-VN")}</strong> người tham gia
                  </span>
                  <span>•</span>
                  <span>
                    <strong>{camp.contributionsCount.toLocaleString("vi-VN")}</strong> đóng góp
                  </span>
                </div>

                <Link
                  href={`/vi/admin/campaigns/${camp.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-medium bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 text-on-surface transition"
                >
                  <Eye size={15} /> Chi tiết
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
