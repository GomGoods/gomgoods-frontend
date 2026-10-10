"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Store,
  CheckCircle2,
  AlertOctagon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Package,
  ShoppingBag,
  Star,
  ShieldAlert,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  MOCK_ADMIN_USERS,
  type AdminUserDetail as UserDetailType,
} from "../mock-data/users-mock";

export function UserDetail({ id }: { id: string }) {
  const [userData, setUserData] = useState<UserDetailType>(() => {
    return (
      MOCK_ADMIN_USERS.find((u) => u.id === id) || MOCK_ADMIN_USERS[0]
    );
  });

  const [activeTab, setActiveTab] = useState<
    "basic" | "activity" | "listings" | "orders" | "reviews" | "reports"
  >("basic");

  const toggleStatus = () => {
    setUserData((prev) => ({
      ...prev,
      status: prev.status === "active" ? "suspended" : "active",
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top navigation back */}
      <div className="flex items-center gap-3">
        <Link
          href="/vi/admin/users"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-label-md transition"
        >
          <ArrowLeft size={16} /> Quay lại danh sách
        </Link>
        <span className="text-on-surface-variant text-body-sm">
          Mã người dùng: <span className="font-mono text-on-surface">{userData.id}</span>
        </span>
      </div>

      {/* User Header Profile Card */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-outline-variant/50 shadow-sm"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-headline-md font-bold text-on-surface">{userData.name}</h1>
              {userData.accountType === "store" ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-primary-container text-on-primary-container">
                  <Store size={14} /> Store Seller
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-secondary-container text-on-secondary-container">
                  <User size={14} /> Cá nhân
                </span>
              )}

              {userData.status === "active" ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-tertiary/15 text-tertiary">
                  <CheckCircle2 size={14} /> Hoạt động
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-error-container/60 text-error">
                  <AlertOctagon size={14} /> Tạm khóa
                </span>
              )}
            </div>

            <p className="text-body-md text-on-surface-variant mt-1">@{userData.username}</p>
            <p className="text-body-sm text-on-surface-variant/80 mt-1">{userData.bio}</p>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <button
            onClick={toggleStatus}
            className={`px-4 py-2 rounded-xl text-label-md font-medium transition border ${
              userData.status === "active"
                ? "bg-error-container/20 text-error border-error-container hover:bg-error-container/40"
                : "bg-tertiary/15 text-tertiary border-tertiary/30 hover:bg-tertiary/25"
            }`}
          >
            {userData.status === "active" ? "Tạm khóa tài khoản" : "Mở khóa tài khoản"}
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-outline-variant/30 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab("basic")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 whitespace-nowrap ${
            activeTab === "basic"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Thông tin cơ bản
        </button>
        <button
          onClick={() => setActiveTab("listings")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "listings"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Tin đăng <span className="text-label-sm px-1.5 py-0.5 rounded-full bg-surface-container-high">{userData.listings.length}</span>
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "orders"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Đơn hàng <span className="text-label-sm px-1.5 py-0.5 rounded-full bg-surface-container-high">{userData.orders.length}</span>
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "reviews"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Đánh giá <span className="text-label-sm px-1.5 py-0.5 rounded-full bg-surface-container-high">{userData.reviews.length}</span>
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "reports"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Báo cáo vi phạm <span className="text-label-sm px-1.5 py-0.5 rounded-full bg-error-container/40 text-error">{userData.reports.length}</span>
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`pb-3 px-4 text-label-lg font-medium transition border-b-2 whitespace-nowrap ${
            activeTab === "activity"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Lịch sử hoạt động
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "basic" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Details */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Thông tin liên hệ & Vị trí</h2>
            <div className="space-y-3 text-body-md">
              <div className="flex items-center gap-3 text-on-surface">
                <Mail size={18} className="text-on-surface-variant" />
                <span>Email: <strong>{userData.email}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-on-surface">
                <Phone size={18} className="text-on-surface-variant" />
                <span>Số điện thoại: <strong>{userData.phone}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-on-surface">
                <MapPin size={18} className="text-on-surface-variant" />
                <span>Khu vực: <strong>{userData.location}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-on-surface">
                <Calendar size={18} className="text-on-surface-variant" />
                <span>Ngày tham gia: <strong>{userData.joinedAt}</strong></span>
              </div>
            </div>
          </div>

          {/* Account Overview Stats */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Thống kê giao dịch</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-label-sm text-on-surface-variant block">Tổng tin đăng</span>
                <span className="text-headline-sm font-bold text-on-surface">{userData.listingsCount}</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-label-sm text-on-surface-variant block">Tổng đơn hàng</span>
                <span className="text-headline-sm font-bold text-on-surface">{userData.ordersCount}</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-label-sm text-on-surface-variant block">Đánh giá nhận được</span>
                <span className="text-headline-sm font-bold text-on-surface">{userData.reviewsCount}</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-label-sm text-on-surface-variant block">Lượt bị báo cáo</span>
                <span className={`text-headline-sm font-bold ${userData.reportsCount > 0 ? "text-error" : "text-tertiary"}`}>
                  {userData.reportsCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "listings" && (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm">
          <h2 className="text-title-md font-bold text-on-surface mb-4">Danh sách sản phẩm của người dùng</h2>
          {userData.listings.length === 0 ? (
            <p className="text-body-md text-on-surface-variant py-8 text-center">Người dùng chưa đăng tải sản phẩm nào.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData.listings.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low/30 flex gap-4">
                  <img src={item.image} alt={item.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-label-sm text-on-surface-variant block">{item.category}</span>
                    <h3 className="font-semibold text-on-surface text-body-md truncate">{item.title}</h3>
                    <p className="font-bold text-primary text-body-md mt-1">{item.price.toLocaleString("vi-VN")} đ</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-label-sm px-2 py-0.5 rounded bg-surface-container font-medium text-on-surface-variant">
                        {item.status === "active" ? "Đang bán" : item.status === "sold" ? "Đã bán" : "Đã ẩn"}
                      </span>
                      <span className="text-label-sm text-on-surface-variant">{item.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm">
          <h2 className="text-title-md font-bold text-on-surface mb-4">Lịch sử đơn hàng</h2>
          {userData.orders.length === 0 ? (
            <p className="text-body-md text-on-surface-variant py-8 text-center">Chưa có giao dịch đơn hàng nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-label-sm text-on-surface-variant uppercase">
                    <th className="py-2.5 px-3">Mã đơn</th>
                    <th className="py-2.5 px-3">Loại</th>
                    <th className="py-2.5 px-3">Sản phẩm</th>
                    <th className="py-2.5 px-3">Đối tác</th>
                    <th className="py-2.5 px-3">Tổng tiền</th>
                    <th className="py-2.5 px-3">Trạng thái</th>
                    <th className="py-2.5 px-3">Ngày</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                  {userData.orders.map((o) => (
                    <tr key={o.id}>
                      <td className="py-3 px-3 font-mono font-medium text-on-surface">{o.code}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-label-sm ${o.type === "buy" ? "bg-primary-container/40 text-on-primary-container" : "bg-secondary-container/40 text-on-secondary-container"}`}>
                          {o.type === "buy" ? "Mua hàng" : "Bán hàng"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-on-surface">{o.productTitle}</td>
                      <td className="py-3 px-3 text-on-surface-variant">{o.counterparty}</td>
                      <td className="py-3 px-3 font-semibold text-on-surface">{o.total.toLocaleString("vi-VN")} đ</td>
                      <td className="py-3 px-3">
                        <span className="text-label-sm text-tertiary font-medium">Hoàn tất</span>
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
          <h2 className="text-title-md font-bold text-on-surface mb-2">Đánh giá từ cộng đồng</h2>
          {userData.reviews.length === 0 ? (
            <p className="text-body-md text-on-surface-variant py-8 text-center">Chưa có đánh giá nào.</p>
          ) : (
            <div className="space-y-3">
              {userData.reviews.map((r) => (
                <div key={r.id} className="p-4 rounded-xl border border-outline-variant/20 bg-surface-container-low/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={r.authorAvatar} alt={r.author} className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-semibold text-on-surface text-body-md">{r.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-body-md text-on-surface">{r.comment}</p>
                  <span className="text-label-sm text-on-surface-variant block">{r.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "reports" && (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
          <h2 className="text-title-md font-bold text-on-surface mb-2">Lịch sử báo cáo vi phạm</h2>
          {userData.reports.length === 0 ? (
            <p className="text-body-md text-on-surface-variant py-8 text-center">Tài khoản trong sạch, không có báo cáo vi phạm nào.</p>
          ) : (
            <div className="space-y-3">
              {userData.reports.map((rep) => (
                <div key={rep.id} className="p-4 rounded-xl border border-error-container/40 bg-error-container/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-error text-body-md">{rep.reason}</span>
                    <span className="text-label-sm px-2 py-0.5 rounded bg-error-container text-error font-medium">
                      {rep.status === "pending" ? "Chờ xử lý" : rep.status === "resolved" ? "Đã giải quyết" : "Bỏ qua"}
                    </span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">Người báo cáo: <strong>{rep.reporter}</strong> ({rep.date})</p>
                  <p className="text-body-md text-on-surface">{rep.details}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "activity" && (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm">
          <h2 className="text-title-md font-bold text-on-surface mb-4">Nhật ký hoạt động</h2>
          <div className="space-y-3">
            {userData.activity.map((act) => (
              <div key={act.id} className="flex items-start gap-3 p-3 rounded-lg border border-outline-variant/20 bg-surface-container-low/20">
                <Clock size={16} className="text-on-surface-variant mt-0.5" />
                <div className="flex-1 text-body-sm">
                  <p className="font-medium text-on-surface">{act.action}</p>
                  <p className="text-label-sm text-on-surface-variant mt-0.5">
                    Thời gian: {act.timestamp} • IP: {act.ip} • Thiết bị: {act.device}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
