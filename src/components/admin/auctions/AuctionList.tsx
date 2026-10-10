"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Gavel,
  Eye,
  AlertTriangle,
  Clock,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Download,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Ban,
} from "lucide-react";
import {
  MOCK_ADMIN_AUCTIONS,
  AUCTION_STATUS_CONFIG,
  type AdminAuctionItem,
  type AuctionStatus,
} from "../mock-data/auctions-mock";

export function AuctionList() {
  const [auctions, setAuctions] = useState<AdminAuctionItem[]>(MOCK_ADMIN_AUCTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AuctionStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof AdminAuctionItem | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showColMenu, setShowColMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    seller: true,
    startingPrice: true,
    currentBid: true,
    bidsCount: true,
    endTime: true,
    status: true,
  });

  const handleSort = (field: keyof AdminAuctionItem) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortField(null);
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAuctions = useMemo(() => {
    let result = [...auctions];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.seller.username.toLowerCase().includes(q) ||
          a.seller.name.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((a) => a.status === statusFilter);
    }

    if (sortField) {
      result.sort((a, b) => {
        let valA: any = a[sortField];
        let valB: any = b[sortField];

        if (sortField === "seller") {
          valA = a.seller.name.toLowerCase();
          valB = b.seller.name.toLowerCase();
        } else if (typeof valA === "string") {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [auctions, searchQuery, statusFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAuctions.length / pageSize) || 1;
  const paginatedAuctions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAuctions.slice(start, start + pageSize);
  }, [filteredAuctions, currentPage, pageSize]);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedAuctions.length && paginatedAuctions.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedAuctions.map((a) => a.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const cancelAuction = (auctionId: string) => {
    setAuctions((prev) =>
      prev.map((a) =>
        a.id === auctionId
          ? { ...a, status: a.status === "cancelled" ? "ended" : "cancelled" }
          : a
      )
    );
  };

  const bulkCancel = () => {
    if (!confirm(`Bạn có chắc chắn muốn hủy ${selectedIds.length} phiên đấu giá đã chọn?`)) return;
    setAuctions((prev) =>
      prev.map((a) => (selectedIds.includes(a.id) ? { ...a, status: "cancelled" } : a))
    );
    setSelectedIds([]);
  };

  const exportCSV = (selectedOnly: boolean = false) => {
    const targetData = selectedOnly
      ? auctions.filter((a) => selectedIds.includes(a.id))
      : filteredAuctions;

    if (targetData.length === 0) {
      alert("Không có dữ liệu để xuất");
      return;
    }

    const headers = ["ID", "Tên vật phẩm", "Người bán", "Giá khởi điểm", "Giá hiện tại", "Lượt bid", "Thời gian kết thúc", "Trạng thái"];
    const rows = targetData.map((a) => [
      a.id,
      `"${a.title.replace(/"/g, '""')}"`,
      `"${a.seller.name} (@${a.seller.username})"`,
      a.startingPrice,
      a.currentBid,
      a.bidsCount,
      a.endTime,
      a.status,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `danh_sach_dau_gia_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display-sm font-bold text-on-surface">Quản lý Đấu giá Fandom</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Theo dõi và kiểm duyệt các phòng đấu giá vật phẩm hiếm theo thời gian thực
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Column Visibility */}
          <div className="relative">
            <button
              onClick={() => setShowColMenu(!showColMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 hover:bg-surface-container text-body-sm text-on-surface transition"
            >
              <SlidersHorizontal size={16} />
              <span>Cột</span>
            </button>
            {showColMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-lg p-2 z-20 space-y-1">
                <div className="text-label-sm font-semibold px-2 py-1 text-on-surface-variant">Hiển thị cột</div>
                {Object.entries({
                  seller: "Người tạo phiên",
                  startingPrice: "Giá khởi điểm",
                  currentBid: "Giá hiện tại",
                  bidsCount: "Lượt bid",
                  endTime: "Thời gian kết thúc",
                  status: "Trạng thái",
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 px-2 py-1.5 hover:bg-surface-container-low rounded-lg text-body-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleColumns[key as keyof typeof visibleColumns]}
                      onChange={(e) =>
                        setVisibleColumns((prev) => ({
                          ...prev,
                          [key]: e.target.checked,
                        }))
                      }
                      className="rounded border-outline-variant text-primary focus:ring-primary"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={() => exportCSV(false)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 hover:bg-surface-container text-body-sm font-medium text-on-surface transition"
          >
            <Download size={16} />
            <span>Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm theo tên vật phẩm đấu giá, người tạo phiên..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface-container-lowest text-body-md text-on-surface transition outline-none"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              aria-label="Trạng thái đấu giá"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="live">Đang diễn ra (Live)</option>
              <option value="scheduled">Đã lên lịch (Scheduled)</option>
              <option value="ended">Đã kết thúc (Ended)</option>
              <option value="cancelled">Đã hủy (Cancelled)</option>
              <option value="reported">Có khiếu nại (Reported)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 text-label-sm text-on-surface-variant">
          <span>Tìm thấy {filteredAuctions.length} phiên đấu giá</span>
          <div className="flex items-center gap-2">
            <span>Hiển thị mỗi trang:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-surface-container-low px-2 py-1 rounded-lg border border-outline-variant/30 text-body-sm outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-surface-container-highest/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-outline-variant shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 text-label-md font-semibold text-on-surface">
            <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm">
              {selectedIds.length}
            </span>
            <span>phiên đã chọn</span>
          </div>
          <div className="h-4 w-px bg-outline-variant/60" />
          <div className="flex items-center gap-2">
            <button
              onClick={bulkCancel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error text-on-error text-label-sm font-medium hover:opacity-90 transition"
            >
              <Ban size={15} />
              <span>Hủy các phiên</span>
            </button>
            <button
              onClick={() => exportCSV(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-label-sm font-medium hover:bg-surface-container-low transition"
            >
              <Download size={15} />
              <span>Xuất đã chọn</span>
            </button>
          </div>
          <button
            onClick={() => setSelectedIds([])}
            className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant transition ml-2"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Auction Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === paginatedAuctions.length &&
                      paginatedAuctions.length > 0
                    }
                    onChange={toggleSelectAll}
                    aria-label="Chọn tất cả phiên đấu giá"
                    className="rounded border-outline-variant text-primary focus:ring-primary"
                  />
                </th>
                <th
                  onClick={() => handleSort("title")}
                  className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Vật phẩm đấu giá</span>
                    <ArrowUpDown size={14} className={sortField === "title" ? "text-primary" : "opacity-40"} />
                  </div>
                </th>
                {visibleColumns.seller && (
                  <th
                    onClick={() => handleSort("seller")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Người tạo phiên</span>
                      <ArrowUpDown size={14} className={sortField === "seller" ? "text-primary" : "opacity-40"} />
                    </div>
                  </th>
                )}
                {visibleColumns.startingPrice && (
                  <th
                    onClick={() => handleSort("startingPrice")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Giá khởi điểm</span>
                      <ArrowUpDown size={14} className={sortField === "startingPrice" ? "text-primary" : "opacity-40"} />
                    </div>
                  </th>
                )}
                {visibleColumns.currentBid && (
                  <th
                    onClick={() => handleSort("currentBid")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Giá hiện tại</span>
                      <ArrowUpDown size={14} className={sortField === "currentBid" ? "text-primary" : "opacity-40"} />
                    </div>
                  </th>
                )}
                {visibleColumns.bidsCount && (
                  <th
                    onClick={() => handleSort("bidsCount")}
                    className="py-3.5 px-4 text-center cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Lượt bid</span>
                      <ArrowUpDown size={14} className={sortField === "bidsCount" ? "text-primary" : "opacity-40"} />
                    </div>
                  </th>
                )}
                {visibleColumns.endTime && (
                  <th
                    onClick={() => handleSort("endTime")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Thời gian kết thúc</span>
                      <ArrowUpDown size={14} className={sortField === "endTime" ? "text-primary" : "opacity-40"} />
                    </div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th
                    onClick={() => handleSort("status")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Trạng thái</span>
                      <ArrowUpDown size={14} className={sortField === "status" ? "text-primary" : "opacity-40"} />
                    </div>
                  </th>
                )}
                <th className="py-3.5 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-md text-on-surface">
              {paginatedAuctions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-on-surface-variant">
                    Không tìm thấy phiên đấu giá nào phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedAuctions.map((auction) => {
                  const statusConf = AUCTION_STATUS_CONFIG[auction.status];
                  const isSelected = selectedIds.includes(auction.id);
                  return (
                    <tr
                      key={auction.id}
                      className={`hover:bg-surface-container-low/40 transition ${
                        isSelected ? "bg-primary-container/10" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(auction.id)}
                          aria-label={`Chọn phiên ${auction.title}`}
                          className="rounded border-outline-variant text-primary focus:ring-primary"
                        />
                      </td>

                      {/* Title & Image */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={auction.images[0]}
                            alt={auction.title}
                            className="w-12 h-12 rounded-lg object-cover border border-outline-variant/40 flex-shrink-0"
                          />
                          <div className="min-w-0 max-w-xs">
                            <Link
                              href={`/vi/admin/auctions/${auction.id}`}
                              className="font-semibold text-on-surface hover:text-primary transition line-clamp-1"
                            >
                              {auction.title}
                            </Link>
                            <span className="text-label-sm font-mono text-on-surface-variant">
                              #{auction.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Seller */}
                      {visibleColumns.seller && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={auction.seller.avatar}
                              alt={auction.seller.name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <span className="text-body-sm font-medium text-on-surface">
                              @{auction.seller.username}
                            </span>
                          </div>
                        </td>
                      )}

                      {/* Starting Price */}
                      {visibleColumns.startingPrice && (
                        <td className="py-4 px-4 text-body-sm text-on-surface-variant">
                          {auction.startingPrice.toLocaleString("vi-VN")} đ
                        </td>
                      )}

                      {/* Current Bid */}
                      {visibleColumns.currentBid && (
                        <td className="py-4 px-4 font-bold text-primary">
                          {auction.currentBid.toLocaleString("vi-VN")} đ
                        </td>
                      )}

                      {/* Bids Count */}
                      {visibleColumns.bidsCount && (
                        <td className="py-4 px-4 text-center font-semibold">
                          {auction.bidsCount}
                        </td>
                      )}

                      {/* End Time */}
                      {visibleColumns.endTime && (
                        <td className="py-4 px-4 text-body-sm text-on-surface-variant">
                          {new Date(auction.endTime).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      )}

                      {/* Status */}
                      {visibleColumns.status && (
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-label-sm ${statusConf.class}`}>
                            {statusConf.label}
                          </span>
                        </td>
                      )}

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/vi/admin/auctions/${auction.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-label-sm font-medium bg-surface-container-low hover:bg-surface-container text-on-surface transition border border-outline-variant/30"
                          >
                            <Eye size={15} /> Chi tiết
                          </Link>
                          {auction.status === "live" && (
                            <button
                              onClick={() => cancelAuction(auction.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-label-sm font-medium bg-error-container/20 text-error border border-error-container hover:bg-error-container/40 transition"
                            >
                              Hủy phiên
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/20 bg-surface-container-low/30">
            <span className="text-body-sm text-on-surface-variant">
              Trang {currentPage} / {totalPages} (Tổng số {filteredAuctions.length} phiên)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
