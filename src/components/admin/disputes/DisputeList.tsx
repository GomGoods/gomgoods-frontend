"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  AlertTriangle,
  Eye,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  MOCK_ADMIN_DISPUTES,
  DISPUTE_STATUS_CONFIG,
  DISPUTE_PRIORITY_CONFIG,
  type AdminDisputeItem,
  type DisputeStatus,
  type DisputePriority,
} from "../mock-data/disputes-mock";

export function DisputeList() {
  const [disputes, setDisputes] = useState<AdminDisputeItem[]>(MOCK_ADMIN_DISPUTES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DisputeStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<DisputePriority | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof AdminDisputeItem | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showColMenu, setShowColMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    orderCode: true,
    buyer: true,
    seller: true,
    reason: true,
    priority: true,
    status: true,
    createdAt: true,
  });

  const handleSort = (field: keyof AdminDisputeItem) => {
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

  const filteredDisputes = useMemo(() => {
    let result = [...disputes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.id.toLowerCase().includes(q) ||
          d.order.code.toLowerCase().includes(q) ||
          d.buyer.username.toLowerCase().includes(q) ||
          d.seller.username.toLowerCase().includes(q) ||
          d.reason.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((d) => d.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      result = result.filter((d) => d.priority === priorityFilter);
    }

    if (sortField) {
      result.sort((a, b) => {
        let valA: any = a[sortField];
        let valB: any = b[sortField];

        if (sortField === "buyer") {
          valA = a.buyer.name.toLowerCase();
          valB = b.buyer.name.toLowerCase();
        } else if (sortField === "seller") {
          valA = a.seller.name.toLowerCase();
          valB = b.seller.name.toLowerCase();
        } else if (sortField === "order") {
          valA = a.order.code.toLowerCase();
          valB = b.order.code.toLowerCase();
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
  }, [disputes, searchQuery, statusFilter, priorityFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredDisputes.length / pageSize) || 1;
  const paginatedDisputes = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDisputes.slice(start, start + pageSize);
  }, [filteredDisputes, currentPage, pageSize]);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedDisputes.length && paginatedDisputes.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedDisputes.map((d) => d.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const bulkResolve = (status: "resolved" | "rejected") => {
    const actionLabel = status === "resolved" ? "giải quyết" : "bác bỏ";
    if (!confirm(`Bạn có chắc chắn muốn ${actionLabel} ${selectedIds.length} khiếu nại đã chọn?`)) return;
    setDisputes((prev) =>
      prev.map((d) => (selectedIds.includes(d.id) ? { ...d, status } : d))
    );
    setSelectedIds([]);
  };

  const exportCSV = (selectedOnly: boolean = false) => {
    const targetData = selectedOnly
      ? disputes.filter((d) => selectedIds.includes(d.id))
      : filteredDisputes;

    if (targetData.length === 0) {
      alert("Không có dữ liệu để xuất");
      return;
    }

    const headers = ["Mã khiếu nại", "Mã đơn hàng", "Người mua", "Người bán", "Lý do tranh chấp", "Mức ưu tiên", "Trạng thái", "Ngày tạo"];
    const rows = targetData.map((d) => [
      d.id,
      d.order.code,
      `"${d.buyer.name} (@${d.buyer.username})"`,
      `"${d.seller.name} (@${d.seller.username})"`,
      `"${d.reason.replace(/"/g, '""')}"`,
      d.priority,
      d.status,
      d.createdAt,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `danh_sach_tranh_chap_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display-sm font-bold text-on-surface">Quản trị Tranh chấp & Khiếu nại</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Xử lý các mâu thuẫn giao dịch C2C được bảo vệ bởi GomPay Escrow
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
                  orderCode: "Đơn hàng",
                  buyer: "Người mua",
                  seller: "Người bán",
                  reason: "Lý do tranh chấp",
                  priority: "Ưu tiên",
                  status: "Trạng thái",
                  createdAt: "Ngày tạo",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm theo mã DSP, mã đơn, buyer, seller..."
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
              aria-label="Trạng thái khiếu nại"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="open">Mới tạo (Open)</option>
              <option value="investigating">Đang điều tra (Investigating)</option>
              <option value="waiting_evidence">Chờ bằng chứng (Waiting)</option>
              <option value="resolved">Đã giải quyết (Resolved)</option>
              <option value="rejected">Đã bác bỏ (Rejected)</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              aria-label="Mức độ ưu tiên"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="all">Tất cả mức ưu tiên</option>
              <option value="critical">Khẩn cấp (Critical)</option>
              <option value="high">Cao (High)</option>
              <option value="medium">Trung bình (Medium)</option>
              <option value="low">Thấp (Low)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 text-label-sm text-on-surface-variant">
          <span>Tìm thấy {filteredDisputes.length} hồ sơ khiếu nại</span>
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
            <span>khiếu nại đã chọn</span>
          </div>
          <div className="h-4 w-px bg-outline-variant/60" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => bulkResolve("resolved")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-label-sm font-medium hover:opacity-90 transition"
            >
              <CheckCircle size={15} />
              <span>Giải quyết</span>
            </button>
            <button
              onClick={() => bulkResolve("rejected")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error text-on-error text-label-sm font-medium hover:opacity-90 transition"
            >
              <XCircle size={15} />
              <span>Bác bỏ</span>
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

      {/* Disputes Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === paginatedDisputes.length &&
                      paginatedDisputes.length > 0
                    }
                    onChange={toggleSelectAll}
                    aria-label="Chọn tất cả khiếu nại"
                    className="rounded border-outline-variant text-primary focus:ring-primary"
                  />
                </th>
                <th
                  onClick={() => handleSort("id")}
                  className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Mã khiếu nại</span>
                    <ArrowUpDown size={14} className={sortField === "id" ? "text-primary" : "opacity-40"} />
                  </div>
                </th>
                {visibleColumns.orderCode && (
                  <th className="py-3.5 px-4 select-none">
                    <span>Đơn hàng</span>
                  </th>
                )}
                {visibleColumns.buyer && (
                  <th
                    onClick={() => handleSort("buyer")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Người mua</span>
                      <ArrowUpDown size={14} className={sortField === "buyer" ? "text-primary" : "opacity-40"} />
                    </div>
                  </th>
                )}
                {visibleColumns.seller && (
                  <th
                    onClick={() => handleSort("seller")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Người bán</span>
                      <ArrowUpDown size={14} className={sortField === "seller" ? "text-primary" : "opacity-40"} />
                    </div>
                  </th>
                )}
                {visibleColumns.reason && (
                  <th className="py-3.5 px-4 select-none">
                    <span>Lý do tranh chấp</span>
                  </th>
                )}
                {visibleColumns.priority && (
                  <th
                    onClick={() => handleSort("priority")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Ưu tiên</span>
                      <ArrowUpDown size={14} className={sortField === "priority" ? "text-primary" : "opacity-40"} />
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
                {visibleColumns.createdAt && (
                  <th
                    onClick={() => handleSort("createdAt")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Ngày tạo</span>
                      <ArrowUpDown size={14} className={sortField === "createdAt" ? "text-primary" : "opacity-40"} />
                    </div>
                  </th>
                )}
                <th className="py-3.5 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-md text-on-surface">
              {paginatedDisputes.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-on-surface-variant">
                    Không tìm thấy hồ sơ tranh chấp phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedDisputes.map((dispute) => {
                  const statusConf = DISPUTE_STATUS_CONFIG[dispute.status];
                  const priorityConf = DISPUTE_PRIORITY_CONFIG[dispute.priority];
                  const isSelected = selectedIds.includes(dispute.id);
                  return (
                    <tr
                      key={dispute.id}
                      className={`hover:bg-surface-container-low/40 transition ${
                        isSelected ? "bg-primary-container/10" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(dispute.id)}
                          aria-label={`Chọn khiếu nại ${dispute.id}`}
                          className="rounded border-outline-variant text-primary focus:ring-primary"
                        />
                      </td>

                      {/* Dispute ID */}
                      <td className="py-4 px-4 font-mono font-bold text-on-surface">
                        <Link
                          href={`/vi/admin/disputes/${dispute.id}`}
                          className="hover:text-primary transition"
                        >
                          #{dispute.id}
                        </Link>
                      </td>

                      {/* Order Code */}
                      {visibleColumns.orderCode && (
                        <td className="py-4 px-4 font-mono text-body-sm text-on-surface-variant">
                          {dispute.order.code}
                        </td>
                      )}

                      {/* Buyer */}
                      {visibleColumns.buyer && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={dispute.buyer.avatar}
                              alt={dispute.buyer.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-body-sm font-medium text-on-surface">
                              @{dispute.buyer.username}
                            </span>
                          </div>
                        </td>
                      )}

                      {/* Seller */}
                      {visibleColumns.seller && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={dispute.seller.avatar}
                              alt={dispute.seller.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-body-sm font-medium text-on-surface">
                              @{dispute.seller.username}
                            </span>
                          </div>
                        </td>
                      )}

                      {/* Reason */}
                      {visibleColumns.reason && (
                        <td className="py-4 px-4">
                          <span className="text-body-sm text-on-surface font-medium line-clamp-1 max-w-xs">
                            {dispute.reason}
                          </span>
                        </td>
                      )}

                      {/* Priority */}
                      {visibleColumns.priority && (
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-label-sm font-semibold ${priorityConf.class}`}>
                            {priorityConf.label}
                          </span>
                        </td>
                      )}

                      {/* Status */}
                      {visibleColumns.status && (
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-label-sm ${statusConf.class}`}>
                            {statusConf.label}
                          </span>
                        </td>
                      )}

                      {/* Date */}
                      {visibleColumns.createdAt && (
                        <td className="py-4 px-4 text-body-sm text-on-surface-variant">
                          {dispute.createdAt.split("T")[0]}
                        </td>
                      )}

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/vi/admin/disputes/${dispute.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-label-sm font-medium bg-surface-container-low hover:bg-surface-container text-on-surface transition border border-outline-variant/30"
                        >
                          <Eye size={15} /> Xử lý
                        </Link>
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
              Trang {currentPage} / {totalPages} (Tổng số {filteredDisputes.length} khiếu nại)
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
