"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  User,
  Store,
  CheckCircle2,
  AlertOctagon,
  ArrowUpDown,
  MoreVertical,
  Eye,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Download,
  SlidersHorizontal,
  CheckSquare,
  Square,
  Lock,
  Unlock,
  X,
} from "lucide-react";
import {
  MOCK_ADMIN_USERS,
  type AdminUserListItem,
  type AccountType,
  type UserStatus,
} from "../mock-data/users-mock";

export function UserList() {
  const [users, setUsers] = useState<AdminUserListItem[]>(MOCK_ADMIN_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<AccountType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [sortField, setSortField] = useState<"name" | "joinedAt" | "ordersCount" | "listingsCount">("joinedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  // Column Visibility
  const [visibleColumns, setVisibleColumns] = useState({
    user: true,
    accountType: true,
    status: true,
    joinedAt: true,
    listings: true,
    orders: true,
  });

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.includes(q)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((u) => u.accountType === typeFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((u) => u.status === statusFilter);
    }

    result.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];
      if (sortField === "joinedAt") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }
      if (typeof valA === "string") {
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchQuery, typeFilter, statusFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const toggleSort = (field: "name" | "joinedAt" | "ordersCount" | "listingsCount") => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const toggleSelectAll = () => {
    const currentPageIds = paginatedUsers.map((u) => u.id);
    const allSelected = currentPageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u
      )
    );
  };

  // Bulk actions
  const bulkUpdateStatus = (newStatus: UserStatus) => {
    setUsers((prev) =>
      prev.map((u) => (selectedIds.includes(u.id) ? { ...u, status: newStatus } : u))
    );
    setSelectedIds([]);
  };

  // Export CSV
  const exportToCsv = () => {
    const dataToExport =
      selectedIds.length > 0
        ? users.filter((u) => selectedIds.includes(u.id))
        : filteredUsers;

    const headers = ["ID", "Tên", "Username", "Email", "SĐT", "Loại", "Trạng thái", "Ngày tạo", "Tin đăng", "Đơn hàng"];
    const rows = dataToExport.map((u) => [
      u.id,
      `"${u.name}"`,
      u.username,
      u.email,
      u.phone,
      u.accountType,
      u.status,
      u.joinedAt,
      u.listingsCount,
      u.ordersCount,
    ]);

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gomgoods_users_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAllCurrentPageSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((u) => selectedIds.includes(u.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display-sm font-bold text-on-surface">Quản lý Người dùng</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Tổng cộng {users.length} tài khoản trong hệ thống GomGoods
          </p>
        </div>

        {/* Export & Column Toggle actions */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Column Toggle dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowColumnMenu(!showColumnMenu)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-label-md transition"
            >
              <SlidersHorizontal size={16} /> Tùy chỉnh cột
            </button>

            {showColumnMenu && (
              <div className="absolute right-0 mt-2 w-52 p-3 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/40 z-20 space-y-2 text-body-sm">
                <span className="text-label-sm font-semibold text-on-surface-variant block mb-1">
                  Hiển thị cột
                </span>
                {Object.keys(visibleColumns).map((colKey) => (
                  <label key={colKey} className="flex items-center gap-2 cursor-pointer text-on-surface">
                    <input
                      type="checkbox"
                      checked={(visibleColumns as any)[colKey]}
                      onChange={(e) =>
                        setVisibleColumns((prev) => ({
                          ...prev,
                          [colKey]: e.target.checked,
                        }))
                      }
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="capitalize">
                      {colKey === "user" ? "Người dùng" : colKey === "accountType" ? "Loại tài khoản" : colKey === "status" ? "Trạng thái" : colKey === "joinedAt" ? "Ngày tạo" : colKey === "listings" ? "Tin đăng" : "Đơn hàng"}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={exportToCsv}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-label-md font-semibold hover:opacity-95 transition shadow-sm"
          >
            <Download size={16} /> Xuất CSV
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
              placeholder="Tìm theo username, họ tên, email, SĐT..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface-container-lowest text-body-md text-on-surface transition outline-none"
            />
          </div>

          {/* Account Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              aria-label="Loại tài khoản"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="all">Tất cả loại tài khoản</option>
              <option value="user">Người dùng cá nhân (User)</option>
              <option value="store">Cửa hàng (Store)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              aria-label="Trạng thái tài khoản"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động (Active)</option>
              <option value="suspended">Tạm khóa (Suspended)</option>
            </select>
          </div>
        </div>

        {/* Bottom stats & Page size selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-outline-variant/20 text-label-sm text-on-surface-variant">
          <span>Tìm thấy {filteredUsers.length} kết quả</span>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Hiển thị:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface text-body-sm outline-none cursor-pointer"
              >
                <option value={5}>5 dòng / trang</option>
                <option value={10}>10 dòng / trang</option>
                <option value={20}>20 dòng / trang</option>
                <option value={50}>50 dòng / trang</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-between shadow-md transition-all animate-in fade-in">
          <div className="flex items-center gap-2 text-label-md font-semibold">
            <CheckCircle2 size={18} />
            <span>Đã chọn {selectedIds.length} người dùng</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => bulkUpdateStatus("suspended")}
              className="px-3 py-1.5 rounded-lg bg-error text-on-error text-label-sm font-semibold flex items-center gap-1 hover:opacity-90 transition"
            >
              <Lock size={14} /> Khóa tài khoản
            </button>
            <button
              onClick={() => bulkUpdateStatus("active")}
              className="px-3 py-1.5 rounded-lg bg-tertiary text-on-tertiary text-label-sm font-semibold flex items-center gap-1 hover:opacity-90 transition"
            >
              <Unlock size={14} /> Mở khóa
            </button>
            <button
              onClick={exportToCsv}
              className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface border border-outline-variant/40 text-label-sm font-semibold hover:bg-surface-container transition"
            >
              Xuất {selectedIds.length} dòng
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="p-1.5 hover:bg-black/10 rounded-lg text-on-primary-container"
              title="Bỏ chọn tất cả"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                {/* Select All Checkbox */}
                <th className="py-3.5 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllCurrentPageSelected}
                    onChange={toggleSelectAll}
                    aria-label="Chọn tất cả người dùng trang này"
                    className="rounded text-primary focus:ring-primary cursor-pointer"
                  />
                </th>

                {/* Sortable User Column */}
                {visibleColumns.user && (
                  <th
                    onClick={() => toggleSort("name")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Người dùng</span>
                      {sortField === "name" ? (
                        <span className="text-primary">{sortOrder === "asc" ? "▲" : "▼"}</span>
                      ) : (
                        <ArrowUpDown size={14} className="opacity-40" />
                      )}
                    </div>
                  </th>
                )}

                {visibleColumns.accountType && <th className="py-3.5 px-4">Loại tài khoản</th>}
                {visibleColumns.status && <th className="py-3.5 px-4">Trạng thái</th>}

                {/* Sortable Joined Date */}
                {visibleColumns.joinedAt && (
                  <th
                    onClick={() => toggleSort("joinedAt")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Ngày đăng ký</span>
                      {sortField === "joinedAt" ? (
                        <span className="text-primary">{sortOrder === "asc" ? "▲" : "▼"}</span>
                      ) : (
                        <ArrowUpDown size={14} className="opacity-40" />
                      )}
                    </div>
                  </th>
                )}

                {/* Sortable Listings */}
                {visibleColumns.listings && (
                  <th
                    onClick={() => toggleSort("listingsCount")}
                    className="py-3.5 px-4 text-center cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Tin đăng</span>
                      {sortField === "listingsCount" ? (
                        <span className="text-primary">{sortOrder === "asc" ? "▲" : "▼"}</span>
                      ) : (
                        <ArrowUpDown size={14} className="opacity-40" />
                      )}
                    </div>
                  </th>
                )}

                {/* Sortable Orders */}
                {visibleColumns.orders && (
                  <th
                    onClick={() => toggleSort("ordersCount")}
                    className="py-3.5 px-4 text-center cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Đơn hàng</span>
                      {sortField === "ordersCount" ? (
                        <span className="text-primary">{sortOrder === "asc" ? "▲" : "▼"}</span>
                      ) : (
                        <ArrowUpDown size={14} className="opacity-40" />
                      )}
                    </div>
                  </th>
                )}

                <th className="py-3.5 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-md text-on-surface">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-on-surface-variant">
                    Không tìm thấy người dùng phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => {
                  const isSelected = selectedIds.includes(user.id);
                  return (
                    <tr
                      key={user.id}
                      className={`transition ${
                        isSelected
                          ? "bg-primary-container/15 hover:bg-primary-container/20"
                          : "hover:bg-surface-container-low/40"
                      }`}
                    >
                      {/* Row Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(user.id)}
                          aria-label={`Chọn ${user.name}`}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                        />
                      </td>

                      {/* User info */}
                      {visibleColumns.user && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover border border-outline-variant/50"
                            />
                            <div>
                              <Link
                                href={`/vi/admin/users/${user.id}`}
                                className="font-semibold text-on-surface hover:text-primary transition"
                              >
                                {user.name}
                              </Link>
                              <div className="text-label-sm text-on-surface-variant flex items-center gap-2">
                                <span>@{user.username}</span>
                                <span>•</span>
                                <span>{user.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      )}

                      {/* Account Type */}
                      {visibleColumns.accountType && (
                        <td className="py-4 px-4">
                          {user.accountType === "store" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-label-sm font-medium bg-primary-container text-on-primary-container">
                              <Store size={14} /> Store
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-label-sm font-medium bg-secondary-container text-on-secondary-container">
                              <User size={14} /> User
                            </span>
                          )}
                        </td>
                      )}

                      {/* Status */}
                      {visibleColumns.status && (
                        <td className="py-4 px-4">
                          {user.status === "active" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-label-sm font-medium bg-tertiary/15 text-tertiary">
                              <CheckCircle2 size={14} /> Hoạt động
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-label-sm font-medium bg-error-container/60 text-error">
                              <AlertOctagon size={14} /> Tạm khóa
                            </span>
                          )}
                        </td>
                      )}

                      {/* Joined Date */}
                      {visibleColumns.joinedAt && (
                        <td className="py-4 px-4 text-body-sm text-on-surface-variant">
                          {user.joinedAt}
                        </td>
                      )}

                      {/* Listings count */}
                      {visibleColumns.listings && (
                        <td className="py-4 px-4 text-center font-medium">
                          {user.listingsCount}
                        </td>
                      )}

                      {/* Orders count */}
                      {visibleColumns.orders && (
                        <td className="py-4 px-4 text-center font-medium">
                          {user.ordersCount}
                        </td>
                      )}

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/vi/admin/users/${user.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-label-sm font-medium bg-surface-container-low hover:bg-surface-container text-on-surface transition border border-outline-variant/30"
                          >
                            <Eye size={15} /> Xem
                          </Link>
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-label-sm font-medium transition border ${
                              user.status === "active"
                                ? "bg-error-container/20 text-error border-error-container hover:bg-error-container/40"
                                : "bg-tertiary/15 text-tertiary border-tertiary/30 hover:bg-tertiary/25"
                            }`}
                          >
                            {user.status === "active" ? "Khóa" : "Mở khóa"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-outline-variant/20 bg-surface-container-low/30 gap-4">
          <span className="text-body-sm text-on-surface-variant">
            Hiển thị {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredUsers.length)} trong tổng số {filteredUsers.length} người dùng
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low transition"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-body-sm px-2 text-on-surface font-semibold">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
