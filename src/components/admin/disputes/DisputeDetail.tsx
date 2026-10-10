"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Package,
  User,
  Clock,
  CheckCircle2,
  FileText,
  Send,
  ShieldAlert,
} from "lucide-react";
import {
  MOCK_ADMIN_DISPUTES,
  DISPUTE_STATUS_CONFIG,
  DISPUTE_PRIORITY_CONFIG,
  type AdminDisputeItem,
  type DisputeStatus,
} from "../mock-data/disputes-mock";

export function DisputeDetail({ id }: { id: string }) {
  const [dispute, setDispute] = useState<AdminDisputeItem>(() => {
    return MOCK_ADMIN_DISPUTES.find((d) => d.id === id) || MOCK_ADMIN_DISPUTES[0];
  });

  const [adminNote, setAdminNote] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleResolution = (newStatus: DisputeStatus, message: string) => {
    setDispute((prev) => ({
      ...prev,
      status: newStatus,
      timeline: [
        ...prev.timeline,
        {
          id: `tl-${Date.now()}`,
          author: "Admin GomGoods",
          role: "admin",
          content: adminNote ? `${message}. Ghi chú: ${adminNote}` : message,
          timestamp: new Date().toLocaleString("vi-VN"),
        },
      ],
    }));
    setActionFeedback(message);
    setAdminNote("");
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const statusConf = DISPUTE_STATUS_CONFIG[dispute.status];
  const priorityConf = DISPUTE_PRIORITY_CONFIG[dispute.priority];

  return (
    <div className="space-y-6">
      {/* Top back button */}
      <div className="flex items-center gap-3">
        <Link
          href="/vi/admin/disputes"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-label-md transition"
        >
          <ArrowLeft size={16} /> Quay lại danh sách khiếu nại
        </Link>
        <span className="text-on-surface-variant text-body-sm">
          Mã tranh chấp: <span className="font-mono text-on-surface">#{dispute.id}</span>
        </span>
      </div>

      {/* Main Header Card */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-label-sm font-semibold ${priorityConf.class}`}>
              Ưu tiên {priorityConf.label}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-label-sm font-medium ${statusConf.class}`}>
              {statusConf.label}
            </span>
            <span className="text-body-sm text-on-surface-variant">
              Tạo lúc: {new Date(dispute.createdAt).toLocaleString("vi-VN")}
            </span>
          </div>
          <h1 className="text-headline-md font-bold text-on-surface mt-2">
            Hồ sơ khiếu nại #{dispute.id}
          </h1>
          <p className="text-body-md font-medium text-error mt-1">
            Lý do: {dispute.reason}
          </p>
        </div>

        {/* Total Dispute Value */}
        <div className="text-left md:text-right">
          <span className="text-label-sm text-on-surface-variant block">Giá trị giao dịch tranh chấp</span>
          <span className="text-headline-sm font-bold text-primary">
            {dispute.order.total.toLocaleString("vi-VN")} đ
          </span>
          <span className="text-label-sm text-on-surface-variant block mt-0.5">
            {dispute.order.paymentMethod}
          </span>
        </div>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div className="p-4 rounded-xl bg-tertiary/15 border border-tertiary/30 text-tertiary flex items-center gap-2 font-medium">
          <CheckCircle2 size={18} />
          {actionFeedback}
        </div>
      )}

      {/* Grid: Left 2 Cols (Order + Evidence + Timeline), Right 1 Col (Admin Decision Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Details */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-title-md font-bold text-on-surface flex items-center gap-2">
                <Package size={20} className="text-primary" /> Thông tin đơn hàng #{dispute.order.code}
              </h2>
              <span className="text-label-sm text-on-surface-variant">
                Vận chuyển: <strong>{dispute.order.shipmentStatus}</strong> ({dispute.order.trackingCode})
              </span>
            </div>

            {/* Products in this order */}
            <div className="space-y-3 pt-2">
              {dispute.order.products.map((p, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-surface-container-low/40 border border-outline-variant/20">
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-on-surface text-body-md truncate">{p.name}</h3>
                    <p className="text-body-sm text-on-surface-variant">Số lượng: {p.quantity}</p>
                  </div>
                  <span className="font-bold text-primary text-body-md">
                    {p.price.toLocaleString("vi-VN")} đ
                  </span>
                </div>
              ))}
            </div>

            {/* Buyer & Seller Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
              <div className="p-3 rounded-xl bg-surface-container-low/20 border border-outline-variant/20">
                <span className="text-label-sm font-semibold text-primary block mb-1">Bên khiếu nại (Người mua)</span>
                <div className="flex items-center gap-2">
                  <img src={dispute.buyer.avatar} alt={dispute.buyer.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <span className="font-semibold text-body-sm text-on-surface block">{dispute.buyer.name}</span>
                    <span className="text-label-sm text-on-surface-variant">@{dispute.buyer.username} • {dispute.buyer.phone}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low/20 border border-outline-variant/20">
                <span className="text-label-sm font-semibold text-secondary block mb-1">Bên bị khiếu nại (Người bán)</span>
                <div className="flex items-center gap-2">
                  <img src={dispute.seller.avatar} alt={dispute.seller.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <span className="font-semibold text-body-sm text-on-surface block">{dispute.seller.name}</span>
                    <span className="text-label-sm text-on-surface-variant">@{dispute.seller.username} • {dispute.seller.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dispute Description */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-3">
            <h2 className="text-title-md font-bold text-on-surface">Mô tả sự việc từ người mua</h2>
            <p className="text-body-md text-on-surface bg-surface-container-low/30 p-4 rounded-xl leading-relaxed">
              "{dispute.description}"
            </p>
          </div>

          {/* Evidence Vault */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Bằng chứng đối chất (Evidence)</h2>
            {dispute.evidence.length === 0 ? (
              <p className="text-body-md text-on-surface-variant py-6 text-center">
                Chưa có bằng chứng hình ảnh nào được tải lên.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dispute.evidence.map((evi) => (
                  <div key={evi.id} className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-label-sm px-2 py-0.5 rounded font-semibold ${
                        evi.uploader === "buyer" ? "bg-primary-container text-on-primary-container" : "bg-secondary-container text-on-secondary-container"
                      }`}>
                        {evi.uploader === "buyer" ? "Bằng chứng Người mua" : "Bằng chứng Người bán"}
                      </span>
                    </div>
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-surface-container border border-outline-variant/30">
                      <img src={evi.url} alt={evi.title} className="w-full h-full object-cover" />
                    </div>
                    <p className="font-semibold text-on-surface text-body-sm">{evi.title}</p>
                    <p className="text-label-sm text-on-surface-variant">{evi.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conversation & Timeline */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Diễn biến trao đổi & Dòng thời gian</h2>
            <div className="space-y-3">
              {dispute.timeline.map((evt) => (
                <div
                  key={evt.id}
                  className={`p-4 rounded-xl border space-y-1 ${
                    evt.role === "admin"
                      ? "bg-primary-container/20 border-primary-container"
                      : evt.role === "buyer"
                      ? "bg-surface-container-low/40 border-outline-variant/30"
                      : "bg-surface-container-low/20 border-outline-variant/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-body-sm text-on-surface">
                      {evt.author}
                      {evt.role === "admin" && (
                        <span className="ml-2 px-2 py-0.5 rounded bg-primary text-on-primary text-label-sm font-medium">
                          Admin
                        </span>
                      )}
                    </span>
                    <span className="text-label-sm text-on-surface-variant">{evt.timestamp}</span>
                  </div>
                  <p className="text-body-md text-on-surface">{evt.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Admin Resolution Decision Panel */}
        <div className="space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4 sticky top-20">
            <h2 className="text-title-md font-bold text-on-surface flex items-center gap-2">
              <ShieldAlert size={20} className="text-primary" /> Quyết định xử lý của Admin
            </h2>
            <p className="text-body-sm text-on-surface-variant">
              Chọn phương án phán quyết cho giao dịch tranh chấp này. GomPay Escrow sẽ tự động thực thi tương ứng.
            </p>

            {/* Note input */}
            <div>
              <label className="text-label-sm font-semibold text-on-surface block mb-1.5">
                Ghi chú phán quyết / Yêu cầu:
              </label>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Nhập lý do phán quyết hoặc yêu cầu bổ sung bằng chứng gửi đến 2 bên..."
                rows={3}
                className="w-full p-3 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface-container-lowest text-body-md text-on-surface transition outline-none resize-none"
              />
            </div>

            {/* Resolution buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() =>
                  handleResolution("resolved", "Admin đã quyết định: Hoàn tiền 100% cho Người mua")
                }
                className="w-full py-2.5 px-4 rounded-xl text-label-md font-semibold bg-tertiary text-on-tertiary hover:opacity-90 transition text-center shadow-sm"
              >
                Hoàn tiền cho Người mua (Refund)
              </button>

              <button
                onClick={() =>
                  handleResolution("resolved", "Admin đã quyết định: Giải ngân tiền cho Người bán")
                }
                className="w-full py-2.5 px-4 rounded-xl text-label-md font-semibold bg-primary text-on-primary hover:opacity-90 transition text-center shadow-sm"
              >
                Giải ngân cho Người bán (Release)
              </button>

              <button
                onClick={() =>
                  handleResolution("waiting_evidence", "Admin yêu cầu: Bổ sung thêm bằng chứng video/ảnh trong 24h")
                }
                className="w-full py-2.5 px-4 rounded-xl text-label-md font-semibold border border-outline-variant/50 bg-surface-container-low hover:bg-surface-container text-on-surface transition text-center"
              >
                Yêu cầu thêm bằng chứng
              </button>

              <button
                onClick={() =>
                  handleResolution("rejected", "Admin đã bác bỏ khiếu nại do không đủ căn cứ")
                }
                className="w-full py-2.5 px-4 rounded-xl text-label-md font-semibold border border-error-container text-error bg-error-container/20 hover:bg-error-container/40 transition text-center"
              >
                Bác bỏ khiếu nại (Reject)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
