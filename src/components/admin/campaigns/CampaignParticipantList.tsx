"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, Users, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import {
  MOCK_ADMIN_PARTICIPANTS,
  type CampaignParticipantItem,
} from "../mock-data/campaigns-mock";

export function CampaignParticipantList() {
  const [participants, setParticipants] = useState<CampaignParticipantItem[]>(MOCK_ADMIN_PARTICIPANTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    let result = [...participants];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.user.name.toLowerCase().includes(q) ||
          p.user.username.toLowerCase().includes(q) ||
          p.campaignName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [participants, searchQuery]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display-sm font-bold text-on-surface">Người tham gia Chiến dịch</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Danh sách thành viên đăng ký và tham gia các hoạt động sự kiện trên GomGoods
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Tìm theo người dùng, username, tên chiến dịch..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface-container-lowest text-body-md text-on-surface transition outline-none"
          />
        </div>
        <span className="text-label-sm text-on-surface-variant whitespace-nowrap">
          Tìm thấy {filtered.length} người tham gia
        </span>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-6">Người dùng</th>
                <th className="py-3.5 px-4">Chiến dịch</th>
                <th className="py-3.5 px-4">Điểm tích lũy</th>
                <th className="py-3.5 px-4">Phần thưởng đã nhận</th>
                <th className="py-3.5 px-4">Ngày tham gia</th>
                <th className="py-3.5 px-6 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-md text-on-surface">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                    Không tìm thấy người tham gia nào.
                  </td>
                </tr>
              ) : (
                paginated.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-low/40 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.user.avatar}
                          alt={p.user.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <Link
                            href={`/vi/admin/users/${p.user.id}`}
                            className="font-semibold text-on-surface hover:text-primary transition"
                          >
                            {p.user.name}
                          </Link>
                          <span className="text-label-sm text-on-surface-variant block">
                            @{p.user.username}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-medium text-on-surface">
                      <Link
                        href={`/vi/admin/campaigns/${p.campaignId}`}
                        className="hover:text-primary transition"
                      >
                        {p.campaignName}
                      </Link>
                    </td>

                    <td className="py-4 px-4 font-bold text-primary">
                      {p.points} điểm
                    </td>

                    <td className="py-4 px-4 text-body-sm text-on-surface-variant">
                      {p.rewardsClaimed}
                    </td>

                    <td className="py-4 px-4 text-body-sm text-on-surface-variant">
                      {p.joinedAt}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-tertiary/15 text-tertiary">
                        <CheckCircle2 size={13} /> Hợp lệ
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/20 bg-surface-container-low/30">
            <span className="text-body-sm text-on-surface-variant">
              Trang {currentPage} / {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((cp) => Math.max(1, cp - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage((cp) => Math.min(totalPages, cp + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
