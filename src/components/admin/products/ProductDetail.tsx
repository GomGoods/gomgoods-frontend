"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  AlertTriangle,
  Package,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  MOCK_ADMIN_PRODUCTS,
  PRODUCT_STATUS_CONFIG,
  type AdminProductItem,
} from "../mock-data/products-mock";

export function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<AdminProductItem>(() => {
    return MOCK_ADMIN_PRODUCTS.find((p) => p.id === id) || MOCK_ADMIN_PRODUCTS[0];
  });
  const [selectedImage, setSelectedImage] = useState(0);

  const toggleHide = () => {
    setProduct((prev) => ({
      ...prev,
      status: prev.status === "hidden" ? "active" : "hidden",
    }));
  };

  const resolveReports = () => {
    setProduct((prev) => ({
      ...prev,
      status: "active",
      reports: prev.reports.map((r) => ({ ...r, status: "resolved" })),
    }));
  };

  const statusConf = PRODUCT_STATUS_CONFIG[product.status];

  return (
    <div className="space-y-6">
      {/* Top navigation back */}
      <div className="flex items-center gap-3">
        <Link
          href="/vi/admin/products"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-label-md transition"
        >
          <ArrowLeft size={16} /> Quay lại danh sách sản phẩm
        </Link>
        <span className="text-on-surface-variant text-body-sm">
          Mã sản phẩm: <span className="font-mono text-on-surface">{product.id}</span>
        </span>
      </div>

      {/* Main Detail Header Card */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-label-sm font-medium ${statusConf.class}`}>
              {statusConf.label}
            </span>
            <span className="text-body-sm text-on-surface-variant">{product.category}</span>
          </div>
          <h1 className="text-headline-md font-bold text-on-surface mt-2">{product.title}</h1>
          <p className="text-display-xs font-bold text-primary mt-1">
            {product.price.toLocaleString("vi-VN")} đ
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-end md:self-center">
          {product.status === "reported" || product.status === "under_review" ? (
            <button
              onClick={resolveReports}
              className="px-4 py-2 rounded-xl text-label-md font-medium bg-tertiary text-on-tertiary hover:opacity-90 transition shadow-sm"
            >
              Đánh dấu báo cáo đã xử lý
            </button>
          ) : null}

          <button
            onClick={toggleHide}
            className={`px-4 py-2 rounded-xl text-label-md font-medium transition border ${
              product.status === "hidden"
                ? "bg-tertiary/15 text-tertiary border-tertiary/30 hover:bg-tertiary/25"
                : "bg-error-container/20 text-error border-error-container hover:bg-error-container/40"
            }`}
          >
            {product.status === "hidden" ? "Hiện lại sản phẩm" : "Ẩn sản phẩm này"}
          </button>
        </div>
      </div>

      {/* Main Grid Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Images & Product Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images Gallery */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Hình ảnh sản phẩm</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/30 flex items-center justify-center">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? "border-primary" : "border-outline-variant/40 opacity-70"
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description & Specifications */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Mô tả chi tiết</h2>
            <p className="text-body-md text-on-surface whitespace-pre-line leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-outline-variant/20">
              <div className="p-3 rounded-xl bg-surface-container-low/50">
                <span className="text-label-sm text-on-surface-variant block">Tình trạng</span>
                <span className="font-semibold text-on-surface text-body-md">{product.condition}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low/50">
                <span className="text-label-sm text-on-surface-variant block">Số lượng trong kho</span>
                <span className="font-semibold text-on-surface text-body-md">{product.quantity}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low/50">
                <span className="text-label-sm text-on-surface-variant block">Ngày đăng bán</span>
                <span className="font-semibold text-on-surface text-body-md">{product.createdAt.split("T")[0]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Seller & Reports & Activity */}
        <div className="space-y-6">
          {/* Seller Card */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Thông tin người bán</h2>
            <div className="flex items-center gap-3">
              <img
                src={product.seller.avatar}
                alt={product.seller.name}
                className="w-12 h-12 rounded-full object-cover border border-outline-variant/40"
              />
              <div>
                <h3 className="font-bold text-on-surface text-body-lg">{product.seller.name}</h3>
                <p className="text-label-sm text-on-surface-variant">@{product.seller.username}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-label-sm font-medium bg-secondary-container text-on-secondary-container">
                  {product.seller.accountType === "store" ? "Store Seller" : "Thành viên cá nhân"}
                </span>
              </div>
            </div>

            <Link
              href={`/vi/admin/users/${product.seller.id}`}
              className="block text-center w-full py-2 rounded-xl text-label-md font-medium border border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-on-surface transition"
            >
              Xem hồ sơ người bán
            </Link>
          </div>

          {/* Reports Card */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-title-md font-bold text-on-surface">Báo cáo vi phạm</h2>
              <span className={`text-label-sm px-2 py-0.5 rounded-full font-medium ${
                product.reports.length > 0 ? "bg-error-container text-error" : "bg-tertiary/15 text-tertiary"
              }`}>
                {product.reports.length} báo cáo
              </span>
            </div>

            {product.reports.length === 0 ? (
              <p className="text-body-sm text-on-surface-variant">Sản phẩm này chưa nhận báo cáo nào từ cộng đồng.</p>
            ) : (
              <div className="space-y-3">
                {product.reports.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl border border-error-container/40 bg-error-container/10 space-y-1.5 text-body-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-error">{r.reason}</span>
                      <span className="text-label-sm text-on-surface-variant">{r.status}</span>
                    </div>
                    <p className="text-label-sm text-on-surface-variant">Người báo cáo: {r.reporter} • {r.date}</p>
                    <p className="text-body-sm text-on-surface">{r.note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-3">
            <h2 className="text-title-md font-bold text-on-surface">Lịch sử cập nhật</h2>
            <div className="space-y-2">
              {product.activity.map((a) => (
                <div key={a.id} className="text-body-sm p-2 rounded-lg bg-surface-container-low/30 border border-outline-variant/20">
                  <p className="font-medium text-on-surface">{a.action}</p>
                  <p className="text-label-sm text-on-surface-variant">{a.timestamp} • bởi {a.user}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
