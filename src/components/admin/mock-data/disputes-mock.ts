export type DisputeStatus = "open" | "investigating" | "waiting_evidence" | "resolved" | "rejected";
export type DisputePriority = "critical" | "high" | "medium" | "low";

export interface DisputeEvidence {
  id: string;
  uploader: "buyer" | "seller";
  title: string;
  url: string;
  type: "image" | "video";
  description: string;
}

export interface DisputeTimelineEvent {
  id: string;
  author: string;
  role: "buyer" | "seller" | "admin";
  content: string;
  timestamp: string;
}

export interface AdminDisputeItem {
  id: string;
  order: {
    id: string;
    code: string;
    total: number;
    paymentMethod: string;
    shipmentStatus: string;
    trackingCode: string;
    products: {
      name: string;
      price: number;
      quantity: number;
      image: string;
    }[];
  };
  buyer: {
    id: string;
    username: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  seller: {
    id: string;
    username: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  reason: string;
  description: string;
  priority: DisputePriority;
  status: DisputeStatus;
  createdAt: string;
  evidence: DisputeEvidence[];
  timeline: DisputeTimelineEvent[];
}

export const DISPUTE_STATUS_CONFIG: Record<DisputeStatus, { label: string; class: string }> = {
  open: { label: "Mới tạo", class: "bg-error-container/60 text-error font-medium" },
  investigating: { label: "Đang điều tra", class: "bg-secondary-container text-on-secondary-container font-medium" },
  waiting_evidence: { label: "Chờ bổ sung bằng chứng", class: "bg-primary-container text-on-primary-container font-medium" },
  resolved: { label: "Đã giải quyết", class: "bg-tertiary/15 text-tertiary font-medium" },
  rejected: { label: "Đã bác bỏ", class: "bg-surface-container-high text-on-surface-variant font-medium" },
};

export const DISPUTE_PRIORITY_CONFIG: Record<DisputePriority, { label: string; class: string }> = {
  critical: { label: "Khẩn cấp", class: "bg-error text-on-error" },
  high: { label: "Cao", class: "bg-error-container text-error" },
  medium: { label: "Trung bình", class: "bg-secondary-container text-on-secondary-container" },
  low: { label: "Thấp", class: "bg-surface-container-high text-on-surface-variant" },
};

export const MOCK_ADMIN_DISPUTES: AdminDisputeItem[] = [
  {
    id: "DSP-001",
    order: {
      id: "ord-101",
      code: "GM-99382",
      total: 550000,
      paymentMethod: "GomPay Escrow (Tạm giữ tiền)",
      shipmentStatus: "Đã giao thành công",
      trackingCode: "VNPOST-7892182",
      products: [
        {
          name: "Card Jisoo Born Pink World Tour Seoul POB",
          price: 550000,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&auto=format&fit=crop&q=80",
        },
      ],
    },
    buyer: {
      id: "usr-001",
      username: "rose_stan99",
      name: "Nguyễn Thảo Vy",
      email: "thaovy.rose@gmail.com",
      phone: "0908 123 456",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    seller: {
      id: "usr-003",
      username: "kpop_unoff_store",
      name: "Lê Hoàng Phúc",
      email: "phuc.kpopcorner@gmail.com",
      phone: "0934 567 890",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    },
    reason: "Sản phẩm bị xước xát nghiêm trọng không đúng mô tả",
    description: "Tôi nhận hàng và quay video mở hộp ngay lập tức. Bề mặt card bị xước dọc 2 đường rõ rệt dưới ánh đèn neon, trong khi bài đăng của người bán cam kết 'Card cond 10/10 không defect'. Người bán từ chối hoàn trả.",
    priority: "high",
    status: "investigating",
    createdAt: "2024-05-18T16:20:00Z",
    evidence: [
      {
        id: "evi-1",
        uploader: "buyer",
        title: "Ảnh chụp cận cảnh góc nghiêng vết xước trên mặt card",
        url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
        type: "image",
        description: "Vết xước rõ dài 2cm ở phần trán và góc trái card",
      },
      {
        id: "evi-2",
        uploader: "seller",
        title: "Ảnh lúc đóng gói đưa vào toploader",
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        type: "image",
        description: "Seller khẳng định trước khi gửi card không có vết xước, nghi do bên vận chuyển đè ép",
      },
    ],
    timeline: [
      {
        id: "tl-1",
        author: "Nguyễn Thảo Vy (@rose_stan99)",
        role: "buyer",
        content: "Đã gửi yêu cầu khiếu nại hoàn tiền do sản phẩm bị lỗi nặng không đúng cam kết ban đầu.",
        timestamp: "2024-05-18 16:20",
      },
      {
        id: "tl-2",
        author: "Lê Hoàng Phúc (@kpop_unoff_store)",
        role: "seller",
        content: "Tôi có ảnh chụp trước khi đóng gói không có xước. Không đồng ý hoàn tiền.",
        timestamp: "2024-05-18 18:00",
      },
      {
        id: "tl-3",
        author: "Admin GomGoods",
        role: "admin",
        content: "Admin đã can thiệp, yêu cầu bên mua cung cấp video unboxing liền mạch không cắt ghép trong 24 giờ.",
        timestamp: "2024-05-19 09:15",
      },
    ],
  },
  {
    id: "DSP-002",
    order: {
      id: "ord-104",
      code: "GM-77123",
      total: 1250000,
      paymentMethod: "GomPay Escrow",
      shipmentStatus: "Đã giao thành công",
      trackingCode: "GHTK-9902341",
      products: [
        {
          name: "Mô hình Nendoroid Gojo Satoru Jujutsu Kaisen",
          price: 1250000,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80",
        },
      ],
    },
    buyer: {
      id: "usr-012",
      username: "miku_fan_hn",
      name: "Đỗ Quốc Việt",
      email: "quocviet.figure@gmail.com",
      phone: "0961 888 222",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    seller: {
      id: "usr-002",
      username: "ToyMaster_VN",
      name: "Cửa Hàng Figure ToyMaster",
      email: "contact@toymaster.vn",
      phone: "0912 888 999",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    },
    reason: "Hộp mô hình bị móp góc lớn trong quá trình vận chuyển",
    description: "Hộp bên ngoài bị cấn thủng 1 lỗ nhỏ làm móp góc hộp seal bên trong. Mong muốn đổi hộp mới hoặc hỗ trợ giảm giá 150.000 đ.",
    priority: "medium",
    status: "resolved",
    createdAt: "2024-05-14T11:00:00Z",
    evidence: [
      {
        id: "evi-3",
        uploader: "buyer",
        title: "Ảnh chụp hộp bị móp góc",
        url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
        type: "image",
        description: "Góc trên bên phải hộp móp nhẹ",
      },
    ],
    timeline: [
      {
        id: "tl-4",
        author: "Đỗ Quốc Việt (@miku_fan_hn)",
        role: "buyer",
        content: "Mở khiếu nại yêu cầu hỗ trợ bồi thường hộp móp do vận chuyển.",
        timestamp: "2024-05-14 11:00",
      },
      {
        id: "tl-5",
        author: "ToyMaster_VN",
        role: "seller",
        content: "Shop đồng ý hỗ trợ voucher 200.000 đ cho đơn tiếp theo hoặc hoàn lại 150.000 đ trực tiếp vào ví.",
        timestamp: "2024-05-14 14:00",
      },
      {
        id: "tl-6",
        author: "Admin GomGoods",
        role: "admin",
        content: "Hai bên đã thống nhất phương án hoàn một phần 150.000 đ cho người mua. Tranh chấp hoàn tất giải quyết.",
        timestamp: "2024-05-14 16:30",
      },
    ],
  },
  {
    id: "DSP-003",
    order: {
      id: "ord-105",
      code: "GM-55198",
      total: 3600000,
      paymentMethod: "GomPay Escrow",
      shipmentStatus: "Đang giao hàng",
      trackingCode: "JNT-8819231",
      products: [
        {
          name: "Blindbox Skullpanda The Warmth Series - Set 12 Hộp",
          price: 3600000,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=300&auto=format&fit=crop&q=80",
        },
      ],
    },
    buyer: {
      id: "usr-015",
      username: "lesserafim_stan",
      name: "Trần Bảo Vy",
      email: "baovy.popmart@gmail.com",
      phone: "0944 111 222",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    seller: {
      id: "usr-005",
      username: "blindbox_mania",
      name: "Trần Mai Chi",
      email: "maichi.blindbox@gmail.com",
      phone: "0971 234 567",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
    reason: "Bưu tá cập nhật đã giao nhưng người mua chưa nhận được kiện hàng",
    description: "Hệ thống hiển thị bưu tá đã phát thành công lúc 14:00 nhưng bảo vệ chung cư báo không có ai giao kiện hàng nào tên tôi.",
    priority: "high",
    status: "waiting_evidence",
    createdAt: "2024-05-19T08:30:00Z",
    evidence: [],
    timeline: [
      {
        id: "tl-7",
        author: "Trần Bảo Vy (@lesserafim_stan)",
        role: "buyer",
        content: "Mở khiếu nại thất lạc bưu kiện hoặc bưu tá giao sai địa chỉ.",
        timestamp: "2024-05-19 08:30",
      },
      {
        id: "tl-8",
        author: "Admin GomGoods",
        role: "admin",
        content: "Đã liên hệ bên vận chuyển J&T Express tra soát chữ ký người nhận.",
        timestamp: "2024-05-19 10:00",
      },
    ],
  },
];
