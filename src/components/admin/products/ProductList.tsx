"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Package,
  ChevronLeft,
  ChevronRight,
  Download,
  SlidersHorizontal,
  X,
  EyeOff,
  ArrowUpDown,
} from "lucide-react";
import {
  MOCK_ADMIN_PRODUCTS,
  PRODUCT_STATUS_CONFIG,
  type AdminProductItem,
  type ProductStatus,
} from "../mock-data/products-mock";

export function ProductList() {
  const [products, setProducts] = useState<AdminProductItem[]>(MOCK_ADMIN_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<ProductStatus | "all">("all");
  const [sortField, setSortField] = useState<"title" | "price" | "quantity" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    product: true,
    seller: true,
    price: true,
    quantity: true,
    condition: true,
    status: true,
    createdAt: true,
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.seller.username.toLowerCase().includes(q) ||
          p.seller.name.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category.includes(categoryFilter));
    }

    if (conditionFilter !== "all") {
      result = result.filter((p) => p.condition.includes(conditionFilter));
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    result.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];
      if (sortField === "createdAt") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }
      if (typeof valA === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [products, searchQuery, categoryFilter, conditionFilter, statusFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const toggleSort = (field: "title" | "price" | "quantity" | "createdAt") => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const toggleSelectAll = () => {
    const pageIds = paginatedProducts.map((p) => p.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleProductStatus = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, status: p.status === "hidden" ? "active" : "hidden" }
          : p
      )
    );
  };

  const bulkUpdateStatus = (newStatus: ProductStatus) => {
    setProducts((prev) =>
      prev.map((p) => (selectedIds.includes(p.id) ? { ...p, status: newStatus } : p))
    );
    setSelectedIds([]);
  };

  const exportToCsv = () => {
    const dataToExport =
      selectedIds.length > 0
        ? products.filter((p) => selectedIds.includes(p.id))
        : filteredProducts;

    const headers = ["ID", "Tên sản phẩm", "Danh mục", "Người bán", "Giá (VND)", "Tồn kho", "Tình trạng", "Trạng thái", "Ngày đăng"];
    const rows = dataToExport.map((p) => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.seller.username,
      p.price,
      p.quantity,
      `"${p.condition}"`,
      p.status,
      p.createdAt.split("T")[0],
    ]);

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gomgoods_products_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAllCurrentPageSelected =
    paginatedProducts.length > 0 &&
    paginatedProducts.every((p) => selectedIds.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display-sm font-bold text-on-surface">Quản lý Sản phẩm / Listings</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Quản lý tin đăng thị trường C2C fandom của người dùng và cửa hàng
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Column Toggle */}
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
                      {colKey === "product" ? "Sản phẩm" : colKey === "seller" ? "Người bán" : colKey === "price" ? "Giá bán" : colKey === "quantity" ? "Tồn kho" : colKey === "condition" ? "Tình trạng" : colKey === "status" ? "Trạng thái" : "Ngày đăng"}
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
          <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm theo tên sản phẩm, người bán..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface-container-lowest text-body-md text-on-surface transition outline-none"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Danh mục"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="Card Bo Góc">Card Bo Góc (Photocard)</option>
              <option value="Figure">Figure / Mô hình</option>
              <option value="TCG Card">TCG Card / Thẻ bài</option>
              <option value="Blindbox">Blindbox / Art Toys</option>
              <option value="Album">Album & Merch</option>
            </select>
          </div>

          <div>
            <select
              value={conditionFilter}
              onChange={(e) => {
                setConditionFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Tình trạng"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="all">Tất cả tình trạng</option>
              <option value="Mới 100%">Mới 100%</option>
              <option value="Like New">Like New (98-99%)</option>
              <option value="Đã sử dụng">Đã qua sử dụng</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              aria-label="Trạng thái tin đăng"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang bán</option>
              <option value="reported">Bị báo cáo</option>
              <option value="under_review">Đang xử lý báo cáo</option>
              <option value="hidden">Đã ẩn</option>
              <option value="sold">Đã bán</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-outline-variant/20 text-label-sm text-on-surface-variant">
          <span>Tìm thấy {filteredProducts.length} sản phẩm</span>

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

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-between shadow-md transition-all animate-in fade-in">
          <div className="flex items-center gap-2 text-label-md font-semibold">
            <CheckCircle2 size={18} />
            <span>Đã chọn {selectedIds.length} sản phẩm</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => bulkUpdateStatus("hidden")}
              className="px-3 py-1.5 rounded-lg bg-error-container text-error text-label-sm font-semibold flex items-center gap-1 hover:opacity-90 transition"
            >
              <EyeOff size={14} /> Ẩn đã chọn
            </button>
            <button
              onClick={() => bulkUpdateStatus("active")}
              className="px-3 py-1.5 rounded-lg bg-tertiary text-on-tertiary text-label-sm font-semibold flex items-center gap-1 hover:opacity-90 transition"
            >
              <Eye size={14} /> Hiện lại đã chọn
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

      {/* Product Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllCurrentPageSelected}
                    onChange={toggleSelectAll}
                    aria-label="Chọn tất cả sản phẩm trang này"
                    className="rounded text-primary focus:ring-primary cursor-pointer"
                  />
                </th>

                {visibleColumns.product && (
                  <th
                    onClick={() => toggleSort("title")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Sản phẩm</span>
                      {sortField === "title" ? (
                        <span className="text-primary">{sortOrder === "asc" ? "▲" : "▼"}</span>
                      ) : (
                        <ArrowUpDown size={14} className="opacity-40" />
                      )}
                    </div>
                  </th>
                )}

                {visibleColumns.seller && <th className="py-3.5 px-4">Người bán</th>}

                {visibleColumns.price && (
                  <th
                    onClick={() => toggleSort("price")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Giá bán</span>
                      {sortField === "price" ? (
                        <span className="text-primary">{sortOrder === "asc" ? "▲" : "▼"}</span>
                      ) : (
                        <ArrowUpDown size={14} className="opacity-40" />
                      )}
                    </div>
                  </th>
                )}

                {visibleColumns.quantity && (
                  <th
                    onClick={() => toggleSort("quantity")}
                    className="py-3.5 px-4 text-center cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Tồn kho</span>
                      {sortField === "quantity" ? (
                        <span className="text-primary">{sortOrder === "asc" ? "▲" : "▼"}</span>
                      ) : (
                        <ArrowUpDown size={14} className="opacity-40" />
                      )}
                    </div>
                  </th>
                )}

                {visibleColumns.condition && <th className="py-3.5 px-4">Tình trạng</th>}
                {visibleColumns.status && <th className="py-3.5 px-4">Trạng thái</th>}

                {visibleColumns.createdAt && (
                  <th
                    onClick={() => toggleSort("createdAt")}
                    className="py-3.5 px-4 cursor-pointer hover:text-on-surface transition select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Ngày đăng</span>
                      {sortField === "createdAt" ? (
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
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-on-surface-variant">
                    Không tìm thấy sản phẩm phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => {
                  const statusConf = PRODUCT_STATUS_CONFIG[product.status];
                  const isSelected = selectedIds.includes(product.id);
                  return (
                    <tr
                      key={product.id}
                      className={`transition ${
                        isSelected
                          ? "bg-primary-container/15 hover:bg-primary-container/20"
                          : "hover:bg-surface-container-low/40"
                      }`}
                    >
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(product.id)}
                          aria-label={`Chọn ${product.title}`}
                          className="rounded text-primary focus:ring-primary cursor-pointer"
                        />
                      </td>

                      {visibleColumns.product && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-12 h-12 rounded-lg object-cover border border-outline-variant/40 flex-shrink-0"
                            />
                            <div className="min-w-0 max-w-xs">
                              <Link
                                href={`/vi/admin/products/${product.id}`}
                                className="font-semibold text-on-surface hover:text-primary transition line-clamp-1"
                              >
                                {product.title}
                              </Link>
                              <span className="text-label-sm text-on-surface-variant block truncate">
                                {product.category}
                              </span>
                            </div>
                          </div>
                        </td>
                      )}

                      {visibleColumns.seller && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={product.seller.avatar}
                              alt={product.seller.name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <span className="text-body-sm font-medium text-on-surface">
                              @{product.seller.username}
                            </span>
                          </div>
                        </td>
                      )}

                      {visibleColumns.price && (
                        <td className="py-4 px-4 font-bold text-primary">
                          {product.price.toLocaleString("vi-VN")} đ
                        </td>
                      )}

                      {visibleColumns.quantity && (
                        <td className="py-4 px-4 text-center font-medium">
                          {product.quantity}
                        </td>
                      )}

                      {visibleColumns.condition && (
                        <td className="py-4 px-4 text-body-sm text-on-surface-variant">
                          {product.condition}
                        </td>
                      )}

                      {visibleColumns.status && (
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-label-sm font-medium ${statusConf.class}`}>
                            {product.status === "reported" && <AlertTriangle size={13} />}
                            {statusConf.label}
                          </span>
                        </td>
                      )}

                      {visibleColumns.createdAt && (
                        <td className="py-4 px-4 text-body-sm text-on-surface-variant">
                          {product.createdAt.split("T")[0]}
                        </td>
                      )}

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/vi/admin/products/${product.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-label-sm font-medium bg-surface-container-low hover:bg-surface-container text-on-surface transition border border-outline-variant/30"
                          >
                            <Eye size={15} /> Chi tiết
                          </Link>
                          <button
                            onClick={() => toggleProductStatus(product.id)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-label-sm font-medium transition border ${
                              product.status === "hidden"
                                ? "bg-tertiary/15 text-tertiary border-tertiary/30 hover:bg-tertiary/25"
                                : "bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container hover:text-on-surface"
                            }`}
                          >
                            {product.status === "hidden" ? "Hiện" : "Ẩn"}
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

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-outline-variant/20 bg-surface-container-low/30 gap-4">
          <span className="text-body-sm text-on-surface-variant">
            Hiển thị {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredProducts.length)} trong tổng số {filteredProducts.length} sản phẩm
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
