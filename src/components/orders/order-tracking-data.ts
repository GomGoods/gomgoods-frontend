export interface TrackingStage {
  step: number;
  key: "placed" | "confirmed" | "shipped" | "delivering" | "completed";
  title: string;
  desc: string;
  timestamp?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface TrackingScanLog {
  id: string;
  time: string;
  title: string;
  description: string;
  hubLocation?: string;
  isCurrent?: boolean;
}

export interface OrderDetailTracking {
  id: string;
  orderCode: string;
  createdAt: string;
  status: "pending" | "shipping" | "completed" | "cancelled";
  statusText: string;
  currentStep: number; // 1 to 5
  stages: TrackingStage[];
  trackingLogs: TrackingScanLog[];
  carrier: {
    name: string;
    trackingCode: string;
    hotline: string;
    shipperName?: string;
    shipperPhone?: string;
    estimatedDelivery: string;
  };
  recipient: {
    fullName: string;
    phone: string;
    address: string;
  };
  seller: {
    name: string;
    avatar: string;
    location: string;
  };
  item: {
    id: string;
    title: string;
    image: string;
    category: string;
    condition: string;
    price: number;
    quantity: number;
  };
  pricing: {
    subtotal: number;
    shippingFee: number;
    discount: number;
    discountReason?: string;
    total: number;
    paymentMethod: string;
    paidStatus: string;
  };
  gomXuReward: {
    amount: number;
    isCredited: boolean;
    notice: string;
  };
}

export const MOCK_ORDER_TRACKING_DETAILS: Record<string, OrderDetailTracking> = {
  "ord-1": {
    id: "ord-1",
    orderCode: "GG-2026-9812",
    createdAt: "16/09/2026 14:25",
    status: "shipping",
    statusText: "Đang giao hàng",
    currentStep: 4,
    stages: [
      {
        step: 1,
        key: "placed",
        title: "Đặt hàng thành công",
        desc: "Đơn hàng đã được tạo & gửi tới người bán",
        timestamp: "16/09/2026 14:25",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 2,
        key: "confirmed",
        title: "Xác nhận & Đóng gói",
        desc: "Người bán đã bọc bubble wrap 3 lớp & dán mã",
        timestamp: "16/09/2026 16:40",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 3,
        key: "shipped",
        title: "Đã bàn giao vận chuyển",
        desc: "Bưu cục GHN Cầu Giấy đã tiếp nhận kiện hàng",
        timestamp: "17/09/2026 09:15",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 4,
        key: "delivering",
        title: "Đang giao tới bạn",
        desc: "Shipper đang trên đường giao hàng đến địa chỉ",
        timestamp: "18/09/2026 08:30",
        isCompleted: false,
        isCurrent: true,
      },
      {
        step: 5,
        key: "completed",
        title: "Giao thành công (+200 GomXu)",
        desc: "Nhận hàng, kiểm tra & nhận thưởng 200 xu",
        isCompleted: false,
        isCurrent: false,
      },
    ],
    trackingLogs: [
      {
        id: "log-1",
        time: "08:30 - Hôm nay 18/09/2026",
        title: "Shipper Nguyễn Văn Hùng đang giao hàng",
        description: "Bưu tá đã xuất kho phát, vui lòng giữ liên lạc qua số điện thoại để nhận hàng.",
        hubLocation: "Bưu cục phát Cầu Giấy",
        isCurrent: true,
      },
      {
        id: "log-2",
        time: "04:15 - Hôm nay 18/09/2026",
        title: "Đơn hàng đã đến kho phân loại Cầu Giấy Hub",
        description: "Kiện hàng đã qua máy quét phân loại và sẵn sàng giao cho bưu tá phụ trách tuyến.",
        hubLocation: "Kho BN Hub -> Kho Cầu Giấy",
      },
      {
        id: "log-3",
        time: "21:40 - 17/09/2026",
        title: "Đơn hàng đang trung chuyển liên tỉnh",
        description: "Kiện hàng đã rời kho trung chuyển tổng miền Bắc, tiến hành điều phối đến trạm giao.",
        hubLocation: "Kho trung chuyển tổng GHN Bắc Ninh",
      },
      {
        id: "log-4",
        time: "09:15 - 17/09/2026",
        title: "Đơn vị vận chuyển đã lấy hàng thành công",
        description: "Nhân viên bưu cục GHN đã đến lấy hàng từ người bán Akira Hobby Store.",
        hubLocation: "Trạm tiếp nhận Ba Đình, Hà Nội",
      },
      {
        id: "log-5",
        time: "16:40 - 16/09/2026",
        title: "Người bán đã đóng gói kiện hàng",
        description: "Sản phẩm đã được kiểm tra góc cạnh và bọc chống sốc kỹ càng theo tiêu chuẩn GomGoods.",
      },
      {
        id: "log-6",
        time: "14:25 - 16/09/2026",
        title: "Đơn hàng đã được tạo thành công",
        description: "Hệ thống GomGoods ghi nhận đơn hàng #GG-2026-9812 từ người mua.",
      },
    ],
    carrier: {
      name: "Giao Hàng Nhanh (GHN Express)",
      trackingCode: "GHN-8829104",
      hotline: "1900 636677",
      shipperName: "Nguyễn Văn Hùng",
      shipperPhone: "0982 451 912",
      estimatedDelivery: "Hôm nay, 18/09/2026 (Trước 18:00)",
    },
    recipient: {
      fullName: "Nguyễn Vũ Hoàng",
      phone: "098****321",
      address: "Số 28, Ngõ 105 Doãn Kế Thiện, Phường Mai Dịch, Quận Cầu Giấy, Hà Nội",
    },
    seller: {
      name: "Akira Hobby Store",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      location: "Hà Nội",
    },
    item: {
      id: "prod-zoro",
      title: "Mô hình One Piece Roronoa Zoro Wano Kuni Ichiban Kuji Masterlise",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80",
      category: "Mô hình Figure",
      condition: "Chính hãng Fullbox Likenew",
      price: 1650000,
      quantity: 1,
    },
    pricing: {
      subtotal: 1650000,
      shippingFee: 30000,
      discount: 30000,
      discountReason: "Voucher Freeship 1k GomXu",
      total: 1650000,
      paymentMethod: "Thanh toán khi nhận hàng (COD)",
      paidStatus: "Chờ thanh toán khi nhận hàng",
    },
    gomXuReward: {
      amount: 200,
      isCredited: false,
      notice: "Bạn sẽ nhận ngay +200 GomXu vào ví ngay khi nhận hàng & hoàn tất đơn!",
    },
  },
  "ord-2": {
    id: "ord-2",
    orderCode: "GG-2026-9410",
    createdAt: "10/09/2026 09:12",
    status: "completed",
    statusText: "Giao thành công",
    currentStep: 5,
    stages: [
      {
        step: 1,
        key: "placed",
        title: "Đặt hàng thành công",
        desc: "Đơn hàng đã được tạo & chuyển khoản cọc bảo đảm",
        timestamp: "10/09/2026 09:12",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 2,
        key: "confirmed",
        title: "Xác nhận & Đóng gói",
        desc: "Đóng gói bọc góc & dán tem niêm phong",
        timestamp: "10/09/2026 11:05",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 3,
        key: "shipped",
        title: "Đã bàn giao vận chuyển",
        desc: "Viettel Post đã tiếp nhận kiện hàng",
        timestamp: "10/09/2026 15:30",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 4,
        key: "delivering",
        title: "Đang giao tới bạn",
        desc: "Shipper đã liên hệ giao hàng thành công",
        timestamp: "12/09/2026 10:15",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 5,
        key: "completed",
        title: "Giao thành công (+200 GomXu)",
        desc: "Đã nhận hàng & tự động cộng 200 GomXu vào ví",
        timestamp: "12/09/2026 10:45",
        isCompleted: true,
        isCurrent: true,
      },
    ],
    trackingLogs: [
      {
        id: "log-201",
        time: "10:45 - 12/09/2026",
        title: "Giao hàng thành công & Hoàn tất đơn",
        description: "Người mua đã kiểm tra hàng đúng mô tả và ký nhận. Hệ thống đã tự động cộng +200 GomXu vào ví tài khoản.",
        isCurrent: true,
      },
      {
        id: "log-202",
        time: "09:30 - 12/09/2026",
        title: "Shipper Viettel Post đang giao hàng",
        description: "Bưu tá Trần Văn Nam đang trên đường giao kiện hàng tới địa chỉ nhận.",
      },
      {
        id: "log-203",
        time: "15:30 - 10/09/2026",
        title: "Viettel Post đã tiếp nhận kiện hàng",
        description: "Bưu cục hoàn tất cân đo và nhập mã vận đơn VTP-449102.",
      },
    ],
    carrier: {
      name: "Viettel Post",
      trackingCode: "VTP-449102",
      hotline: "1900 8095",
      estimatedDelivery: "Đã giao lúc 10:45 ngày 12/09/2026",
    },
    recipient: {
      fullName: "Nguyễn Vũ Hoàng",
      phone: "098****321",
      address: "Số 28, Ngõ 105 Doãn Kế Thiện, Phường Mai Dịch, Quận Cầu Giấy, Hà Nội",
    },
    seller: {
      name: "Tokyo Cards VN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      location: "TP. Hồ Chí Minh",
    },
    item: {
      id: "prod-card-151",
      title: "Pack Thẻ bài Pokemon Scarlet & Violet 151 Japanese Booster Pack x5",
      image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=400&q=80",
      category: "Thẻ bài TCG",
      condition: "Nguyên seal chưa cân",
      price: 450000,
      quantity: 5,
    },
    pricing: {
      subtotal: 450000,
      shippingFee: 25000,
      discount: 25000,
      discountReason: "Voucher Freeship GomGoods",
      total: 450000,
      paymentMethod: "Ví GomGoods Cọc 100%",
      paidStatus: "Đã thanh toán hoàn tất",
    },
    gomXuReward: {
      amount: 200,
      isCredited: true,
      notice: "🎉 Đã cộng +200 GomXu vào ví của bạn khi đơn hàng hoàn thành!",
    },
  },
  "ord-3": {
    id: "ord-3",
    orderCode: "GG-2026-8921",
    createdAt: "28/08/2026 11:20",
    status: "completed",
    statusText: "Giao thành công",
    currentStep: 5,
    stages: [
      {
        step: 1,
        key: "placed",
        title: "Đặt hàng thành công",
        desc: "Đơn hàng đã được xác nhận thanh toán",
        timestamp: "28/08/2026 11:20",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 2,
        key: "confirmed",
        title: "Xác nhận & Đóng gói",
        desc: "Người bán bọc xốp bóng khí 4 lớp gia cố hộp",
        timestamp: "28/08/2026 15:10",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 3,
        key: "shipped",
        title: "Đã bàn giao vận chuyển",
        desc: "SPX Express đã lấy hàng",
        timestamp: "29/08/2026 09:00",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 4,
        key: "delivering",
        title: "Đang giao tới bạn",
        desc: "Đã phát hàng thành công",
        timestamp: "31/08/2026 14:10",
        isCompleted: true,
        isCurrent: false,
      },
      {
        step: 5,
        key: "completed",
        title: "Giao thành công (+200 GomXu)",
        desc: "Hoàn tất đơn hàng và nhận 200 GomXu",
        timestamp: "31/08/2026 14:30",
        isCompleted: true,
        isCurrent: true,
      },
    ],
    trackingLogs: [
      {
        id: "log-301",
        time: "14:30 - 31/08/2026",
        title: "Giao hàng thành công",
        description: "Khách hàng đã nhận kiện hàng nguyên vẹn, hài lòng với sản phẩm và nhận +200 GomXu.",
        isCurrent: true,
      },
    ],
    carrier: {
      name: "SPX Express",
      trackingCode: "SPX-112093",
      hotline: "1900 1221",
      estimatedDelivery: "Đã giao lúc 14:30 ngày 31/08/2026",
    },
    recipient: {
      fullName: "Nguyễn Vũ Hoàng",
      phone: "098****321",
      address: "Số 28, Ngõ 105 Doãn Kế Thiện, Phường Mai Dịch, Quận Cầu Giấy, Hà Nội",
    },
    seller: {
      name: "Otaku Land",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      location: "Đà Nẵng",
    },
    item: {
      id: "prod-miku-symphony",
      title: "Scale 1/7 Hatsune Miku Symphony 5th Anniversary Ver. Good Smile Company",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
      category: "Scale Figure",
      condition: "Authentic New Seal",
      price: 3890000,
      quantity: 1,
    },
    pricing: {
      subtotal: 3890000,
      shippingFee: 40000,
      discount: 40000,
      discountReason: "Freeship Voucher GomGoods",
      total: 3890000,
      paymentMethod: "Chuyển khoản QR ngân hàng",
      paidStatus: "Đã thanh toán",
    },
    gomXuReward: {
      amount: 200,
      isCredited: true,
      notice: "🎉 Đã cộng +200 GomXu vào ví của bạn khi đơn hàng hoàn thành!",
    },
  },
};

export function getOrderTrackingById(id: string): OrderDetailTracking {
  if (MOCK_ORDER_TRACKING_DETAILS[id]) {
    return MOCK_ORDER_TRACKING_DETAILS[id];
  }

  // Fallback for any other order code/id
  return {
    ...MOCK_ORDER_TRACKING_DETAILS["ord-1"],
    id,
    orderCode: `GG-2026-${id.toUpperCase()}`,
  };
}
