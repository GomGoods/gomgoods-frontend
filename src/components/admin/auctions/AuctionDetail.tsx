"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Gavel,
  Clock,
  User,
  AlertTriangle,
  TrendingUp,
  History,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import {
  MOCK_ADMIN_AUCTIONS,
  AUCTION_STATUS_CONFIG,
  type AdminAuctionItem,
} from "../mock-data/auctions-mock";

export function AuctionDetail({ id }: { id: string }) {
  const [auction, setAuction] = useState<AdminAuctionItem>(() => {
    return MOCK_ADMIN_AUCTIONS.find((a) => a.id === id) || MOCK_ADMIN_AUCTIONS[0];
  });

  const [selectedImage, setSelectedImage] = useState(0);

  const toggleCancel = () => {
    setAuction((prev) => ({
      ...prev,
      status: prev.status === "cancelled" ? "live" : "cancelled",
    }));
  };

  const statusConf = AUCTION_STATUS_CONFIG[auction.status];

  return (
    <div className="space-y-6">
      {/* Top back button */}
      <div className="flex items-center gap-3">
        <Link
          href="/vi/admin/auctions"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-label-md transition"
        >
          <ArrowLeft size={16} /> Quay lại danh sách đấu giá
        </Link>
        <span className="text-on-surface-variant text-body-sm">
          Mã phiên: <span className="font-mono text-on-surface">{auction.id}</span>
        </span>
      </div>

      {/* Main Header Card */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-label-sm font-medium ${statusConf.class}`}>
              <Gavel size={14} /> {statusConf.label}
            </span>
            <span className="text-body-sm text-on-surface-variant">
              Bắt đầu: {new Date(auction.startTime).toLocaleString("vi-VN")}
            </span>
          </div>
          <h1 className="text-headline-md font-bold text-on-surface mt-2">{auction.title}</h1>
          <div className="flex items-baseline gap-4 mt-2">
            <div>
              <span className="text-label-sm text-on-surface-variant block">Giá cao nhất hiện tại</span>
              <span className="text-display-xs font-bold text-primary">
                {auction.currentBid.toLocaleString("vi-VN")} đ
              </span>
            </div>
            <div>
              <span className="text-label-sm text-on-surface-variant block">Lượt đặt giá</span>
              <span className="text-title-lg font-semibold text-on-surface">{auction.bidsCount} lượt</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="self-end md:self-center">
          <button
            onClick={toggleCancel}
            className={`px-4 py-2 rounded-xl text-label-md font-medium transition border ${
              auction.status === "cancelled"
                ? "bg-tertiary/15 text-tertiary border-tertiary/30 hover:bg-tertiary/25"
                : "bg-error-container/20 text-error border-error-container hover:bg-error-container/40"
            }`}
          >
            {auction.status === "cancelled" ? "Khôi phục phiên đấu giá" : "Hủy phiên đấu giá"}
          </button>
        </div>
      </div>

      {/* Grid: 2 Cols Left (Images + Bids history), 1 Col Right (Seller + Rules + Reports) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Hình ảnh vật phẩm</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/30 flex items-center justify-center">
              <img
                src={auction.images[selectedImage] || auction.images[0]}
                alt={auction.title}
                className="w-full h-full object-contain"
              />
            </div>
            {auction.images.length > 1 && (
              <div className="flex gap-3">
                {auction.images.map((img, idx) => (
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
            <p className="text-body-md text-on-surface pt-2">{auction.description}</p>
          </div>

          {/* Bid History */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-title-md font-bold text-on-surface flex items-center gap-2">
                <History size={20} className="text-primary" /> Lịch sử đặt giá (Bid History)
              </h2>
              <span className="text-label-sm text-on-surface-variant">
                Tổng cộng {auction.bidHistory.length} lượt đặt giá ghi nhận
              </span>
            </div>

            {auction.bidHistory.length === 0 ? (
              <p className="text-body-md text-on-surface-variant py-8 text-center">
                Chưa có lượt đặt giá nào cho phiên này.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30 text-label-sm text-on-surface-variant uppercase">
                      <th className="py-2.5 px-3">Người đặt giá</th>
                      <th className="py-2.5 px-3">Mức giá</th>
                      <th className="py-2.5 px-3">Thời gian</th>
                      <th className="py-2.5 px-3 text-right">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 text-body-md">
                    {auction.bidHistory.map((b) => (
                      <tr key={b.id} className="hover:bg-surface-container-low/30 transition">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={b.bidder.avatar}
                              alt={b.bidder.name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div>
                              <span className="font-semibold text-on-surface text-body-sm">{b.bidder.name}</span>
                              <span className="text-label-sm text-on-surface-variant block">@{b.bidder.username}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-bold text-on-surface">
                          {b.amount.toLocaleString("vi-VN")} đ
                        </td>
                        <td className="py-3 px-3 text-body-sm text-on-surface-variant">
                          {b.timestamp}
                        </td>
                        <td className="py-3 px-3 text-right">
                          {b.status === "winning" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-semibold bg-tertiary/15 text-tertiary">
                              <CheckCircle2 size={13} /> Dẫn đầu
                            </span>
                          ) : (
                            <span className="text-label-sm text-on-surface-variant">
                              Bị trả giá cao hơn
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Specifications & Seller & Reports */}
        <div className="space-y-6">
          {/* Rules & Price Specs */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Thông số phòng đấu giá</h2>
            <div className="space-y-3 text-body-md divide-y divide-outline-variant/20">
              <div className="flex justify-between py-1">
                <span className="text-on-surface-variant">Giá khởi điểm:</span>
                <span className="font-semibold text-on-surface">{auction.startingPrice.toLocaleString("vi-VN")} đ</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-on-surface-variant">Bước giá tối thiểu:</span>
                <span className="font-semibold text-on-surface">+{auction.bidIncrement.toLocaleString("vi-VN")} đ</span>
              </div>
              {auction.buyNowPrice && (
                <div className="flex justify-between py-2">
                  <span className="text-on-surface-variant">Giá mua ngay:</span>
                  <span className="font-semibold text-primary">{auction.buyNowPrice.toLocaleString("vi-VN")} đ</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-on-surface-variant">Thời gian kết thúc:</span>
                <span className="font-semibold text-on-surface">
                  {new Date(auction.endTime).toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Người tạo phòng</h2>
            <div className="flex items-center gap-3">
              <img
                src={auction.seller.avatar}
                alt={auction.seller.name}
                className="w-12 h-12 rounded-full object-cover border border-outline-variant/40"
              />
              <div>
                <h3 className="font-bold text-on-surface text-body-lg">{auction.seller.name}</h3>
                <p className="text-label-sm text-on-surface-variant">@{auction.seller.username}</p>
              </div>
            </div>
            <Link
              href={`/vi/admin/users/${auction.seller.id}`}
              className="block text-center w-full py-2 rounded-xl text-label-md font-medium border border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-on-surface transition"
            >
              Xem hồ sơ người bán
            </Link>
          </div>

          {/* Reports */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-3">
            <h2 className="text-title-md font-bold text-on-surface">Báo cáo khiếu nại phiên</h2>
            {auction.reports.length === 0 ? (
              <p className="text-body-sm text-on-surface-variant">Phiên đấu giá đang diễn ra minh bạch, không có báo cáo nào.</p>
            ) : (
              <div className="space-y-2">
                {auction.reports.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl border border-error-container/40 bg-error-container/10 text-body-sm space-y-1">
                    <p className="font-semibold text-error">{r.reason}</p>
                    <p className="text-label-sm text-on-surface-variant">Báo cáo bởi {r.reporter} • {r.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
