"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Sprout, TreePine, Recycle, HeartHandshake } from "lucide-react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { CampaignSidebar } from "./CampaignSidebar";
import { CampaignHero } from "./CampaignHero";
import { ActiveCampaigns } from "./ActiveCampaigns";
import { UpcomingCampaigns } from "./UpcomingCampaigns";
import { EndedCampaigns } from "./EndedCampaigns";
import { CampaignJoinModal } from "./CampaignJoinModal";
import { CampaignDonateModal } from "./CampaignDonateModal";
import {
  sampleHeroCampaign,
  sampleActiveCampaigns,
  sampleUpcomingCampaigns,
  sampleEndedCampaigns,
  sampleEcoRank,
  type CampaignCategory,
  type CampaignStatus,
  type CampaignItem,
  type EcoRankData,
} from "./campaign-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface CampaignViewProps {
  dict?: Dictionary;
  lang?: string;
}

export function CampaignView({ dict, lang = "vi" }: CampaignViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CampaignCategory>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | CampaignStatus>(
    "all"
  );
  const [ecoRank, setEcoRank] = useState<EcoRankData>(sampleEcoRank);
  const [activeList, setActiveList] =
    useState<CampaignItem[]>(sampleActiveCampaigns);
  const [heroCampaign, setHeroCampaign] =
    useState<CampaignItem>(sampleHeroCampaign);

  const [modalCampaign, setModalCampaign] = useState<CampaignItem | null>(null);
  const [donateModalCampaign, setDonateModalCampaign] =
    useState<CampaignItem | null>(null);

  // Filter functions
  const filterCampaigns = (items: CampaignItem[]) => {
    return items.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchStatus =
        selectedStatus === "all" || item.status === selectedStatus;
      return matchCategory && matchStatus;
    });
  };

  const filteredActive = filterCampaigns(activeList);
  const filteredUpcoming = filterCampaigns(sampleUpcomingCampaigns);
  const filteredEnded = filterCampaigns(sampleEndedCampaigns);

  const showHero =
    (selectedCategory === "all" ||
      heroCampaign.category === selectedCategory) &&
    (selectedStatus === "all" || selectedStatus === "active");

  const handleOpenJoinModal = (camp: CampaignItem) => {
    setModalCampaign(camp);
  };

  const handleOpenDonateModal = (camp: CampaignItem) => {
    setDonateModalCampaign(camp);
  };

  const handleJoinSuccess = (camp: CampaignItem) => {
    // Add 25 points to eco rank
    setEcoRank((prev) => ({
      ...prev,
      currentPoints: Math.min(prev.maxPoints, prev.currentPoints + 25),
    }));
  };

  const handleDonateSuccess = (amount: number, campaignId: string) => {
    // Update eco points and planted trees
    const trees = Math.max(1, Math.round(amount / 30000));
    setEcoRank((prev) => ({
      ...prev,
      treesPlanted: prev.treesPlanted + trees,
      co2SavedKg: Math.round((prev.co2SavedKg + trees * 3.2) * 10) / 10,
      currentPoints: Math.min(prev.maxPoints, prev.currentPoints + Math.round(amount / 1000)),
    }));

    // Update campaign raised amount
    if (campaignId === heroCampaign.id) {
      setHeroCampaign((prev) => {
        const current = parseInt((prev.raisedAmount || "0").replace(/\D/g, ""), 10) || 0;
        const target = parseInt((prev.targetAmount || "100000000").replace(/\D/g, ""), 10) || 100000000;
        const nextTotal = current + amount;
        return {
          ...prev,
          raisedAmount: `${nextTotal.toLocaleString("vi-VN")}đ`,
          raisedPercent: Math.min(100, Math.round((nextTotal / target) * 100)),
          donorCount: (prev.donorCount || 0) + 1,
        };
      });
    } else {
      setActiveList((prevList) =>
        prevList.map((item) => {
          if (item.id === campaignId) {
            const current = parseInt((item.raisedAmount || "0").replace(/\D/g, ""), 10) || 0;
            const target = parseInt((item.targetAmount || "50000000").replace(/\D/g, ""), 10) || 50000000;
            const nextTotal = current + amount;
            return {
              ...item,
              raisedAmount: `${nextTotal.toLocaleString("vi-VN")}đ`,
              raisedPercent: Math.min(100, Math.round((nextTotal / target) * 100)),
              donorCount: (item.donorCount || 0) + 1,
            };
          }
          return item;
        })
      );
    }
  };

  const hasAnyResults =
    (showHero ? 1 : 0) +
      filteredActive.length +
      filteredUpcoming.length +
      filteredEnded.length >
    0;

  return (
    <RequireAuth pageName="Chiến dịch">
    <div className="w-full pb-16 pt-2 flex flex-col gap-4">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant font-medium">
        <Link href={`/${lang}`} className="hover:text-emerald-600 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/60" />
        <span className="text-on-background font-semibold">Chiến dịch & Quyên góp</span>
      </nav>

      {/* 2. Top Green Environmental Pledge Banner */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-200">
              GomGoods Green Earth: Vì một Fandom Xanh & Bền Vững 🌱
            </h2>
            <p className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5">
              Mỗi món đồ cũ trao tay là một bước giảm rác thải nhựa. Quyên góp quỹ ủng hộ dự án trồng rừng đầu nguồn 2026.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1.5 bg-surface/80 backdrop-blur-xs px-3 py-1 rounded-full border border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <TreePine className="w-3.5 h-3.5 text-emerald-600" />
            <span>8.200+ Cây đã trồng</span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface/80 backdrop-blur-xs px-3 py-1 rounded-full border border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <Recycle className="w-3.5 h-3.5 text-emerald-600" />
            <span>14.5 tấn rác thu hồi</span>
          </div>
        </div>
      </div>

      {/* 3. Main Two-Column Layout */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start mt-1">
        {/* Left Sidebar */}
        <CampaignSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          ecoRank={ecoRank}
        />

        {/* Right Content Area */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-8">
          {/* Spotlight Hero Banner */}
          {showHero && (
            <CampaignHero
              campaign={heroCampaign}
              onJoin={handleOpenJoinModal}
              onDonate={handleOpenDonateModal}
            />
          )}

          {/* Active Campaigns */}
          {(selectedStatus === "all" || selectedStatus === "active") && (
            <ActiveCampaigns
              campaigns={filteredActive}
              onJoin={handleOpenJoinModal}
              onDonate={handleOpenDonateModal}
            />
          )}

          {/* Upcoming Campaigns */}
          {(selectedStatus === "all" || selectedStatus === "upcoming") && (
            <UpcomingCampaigns
              campaigns={filteredUpcoming}
              onDonate={handleOpenDonateModal}
            />
          )}

          {/* Ended Campaigns */}
          {(selectedStatus === "all" || selectedStatus === "ended") && (
            <EndedCampaigns campaigns={filteredEnded} />
          )}

          {/* No results fallback */}
          {!hasAnyResults && (
            <div className="bg-surface rounded-2xl p-10 text-center border border-emerald-500/20 flex flex-col items-center gap-3">
              <p className="text-base font-bold text-on-surface">
                Chưa có chiến dịch nào thuộc bộ lọc này
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                }}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            </div>
          )}
        </main>
      </div>

      {/* 4. Modals */}
      {/* Join Event Modal */}
      <CampaignJoinModal
        campaign={modalCampaign}
        onClose={() => setModalCampaign(null)}
        onSuccess={handleJoinSuccess}
      />

      {/* Donate Charity Modal */}
      <CampaignDonateModal
        campaign={donateModalCampaign}
        onClose={() => setDonateModalCampaign(null)}
        onDonateSuccess={handleDonateSuccess}
      />
    </div>
    </RequireAuth>
  );
}
