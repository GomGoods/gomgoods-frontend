export type ProductStatus = "active" | "reported" | "under_review" | "hidden" | "sold";

export interface ProductReport {
  id: string;
  reporter: string;
  reporterAvatar?: string;
  reason: string;
  date: string;
  status: "pending" | "investigating" | "resolved" | "dismissed";
  note: string;
}

export interface ProductActivity {
  id: string;
  action: string;
  timestamp: string;
  user: string;
}

export interface AdminProductItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  condition: string;
  category: string;
  description: string;
  images: string[];
  status: ProductStatus;
  createdAt: string;
  seller: {
    id: string;
    username: string;
    name: string;
    avatar: string;
    accountType: "user" | "store";
  };
  reports: ProductReport[];
  activity: ProductActivity[];
}

export const PRODUCT_STATUS_CONFIG: Record<ProductStatus, { label: string; class: string }> = {
  active: { label: "Đang bán", class: "bg-tertiary/10 text-tertiary" },
  reported: { label: "Bị báo cáo", class: "bg-error-container/60 text-error" },
  under_review: { label: "Đang xử lý báo cáo", class: "bg-secondary-container text-on-secondary-container" },
  hidden: { label: "Đã ẩn", class: "bg-surface-container-high text-on-surface-variant" },
  sold: { label: "Đã bán", class: "bg-surface-container text-outline" },
};

export const MOCK_ADMIN_PRODUCTS: AdminProductItem[] = [
  {
    id: "prd-001",
    title: "Photocard Jennie Born Pink Tour Exclusive Limited POB",
    price: 450000,
    quantity: 1,
    condition: "Mới 100% (Nguyên sleeve)",
    category: "Card Bo Góc (Photocard)",
    description: "Card Jennie chính hãng bóc từ merch Born Pink World Tour Seoul. Tặng kèm toploader và sleeve hologram bảo vệ. Cam kết 100% official.",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    ],
    status: "active",
    createdAt: "2024-05-12T14:20:00Z",
    seller: {
      id: "usr-001",
      username: "rose_stan99",
      name: "Nguyễn Thảo Vy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      accountType: "user",
    },
    reports: [],
    activity: [
      { id: "pact-1", action: "Đăng tải sản phẩm mới", timestamp: "2024-05-12 14:20", user: "rose_stan99" },
    ],
  },
  {
    id: "prd-002",
    title: "Mô hình Nendoroid Gojo Satoru Jujutsu Kaisen 1528",
    price: 1250000,
    quantity: 3,
    condition: "Mới 100% (Nguyên seal hộp)",
    category: "Figure / Mô hình",
    description: "Good Smile Company chính hãng. Nguyên seal chưa khui, đầy đủ part phụ và đế dựng.",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    ],
    status: "active",
    createdAt: "2024-05-10T10:15:00Z",
    seller: {
      id: "usr-002",
      username: "ToyMaster_VN",
      name: "Cửa Hàng Figure ToyMaster",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
      accountType: "store",
    },
    reports: [],
    activity: [
      { id: "pact-2", action: "Đăng tải sản phẩm", timestamp: "2024-05-10 10:15", user: "ToyMaster_VN" },
      { id: "pact-3", action: "Cập nhật tồn kho (3 sản phẩm)", timestamp: "2024-05-11 08:30", user: "ToyMaster_VN" },
    ],
  },
  {
    id: "prd-003",
    title: "Photocard Jungkook Golden Fanmade Unofficial",
    price: 45000,
    quantity: 1,
    condition: "Like New 99%",
    category: "Card Bo Góc (Photocard)",
    description: "Card ảnh Jungkook Golden in ấn độ nét cao.",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
    ],
    status: "reported",
    createdAt: "2024-05-01T08:00:00Z",
    seller: {
      id: "usr-003",
      username: "kpop_unoff_store",
      name: "Lê Hoàng Phúc",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      accountType: "user",
    },
    reports: [
      {
        id: "prep-1",
        reporter: "@anh_army",
        reporterAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        reason: "Hàng fanmade nhưng không gắn nhãn rõ ràng trong tiêu đề",
        date: "2024-05-05 15:30",
        status: "investigating",
        note: "Tiêu đề ban đầu ghi 'Jungkook Golden POB' khiến người mua lầm tưởng là official.",
      },
    ],
    activity: [
      { id: "pact-4", action: "Người dùng @anh_army gửi báo cáo vi phạm", timestamp: "2024-05-05 15:30", user: "anh_army" },
      { id: "pact-5", action: "Hệ thống gắn cờ 'Bị báo cáo'", timestamp: "2024-05-05 15:30", user: "System" },
    ],
  },
  {
    id: "prd-004",
    title: "Thẻ bài Charizard VMAX Shiny Secret Rare PSA 10",
    price: 8500000,
    quantity: 1,
    condition: "Mới 100% (PSA Grade 10)",
    category: "TCG Card / Thẻ bài",
    description: "Thẻ bài Pokemon TCG Charizard VMAX Shining Fates đã được định giá PSA điểm 10 hoàn hảo. Có mã số chứng chỉ xác thực trên vỏ case.",
    images: [
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&auto=format&fit=crop&q=80",
    ],
    status: "active",
    createdAt: "2024-05-15T09:00:00Z",
    seller: {
      id: "usr-004",
      username: "tcg_hanoi_zone",
      name: "Phạm Tuấn Hùng",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      accountType: "store",
    },
    reports: [],
    activity: [
      { id: "pact-6", action: "Đăng tải sản phẩm mới", timestamp: "2024-05-15 09:00", user: "tcg_hanoi_zone" },
    ],
  },
  {
    id: "prd-005",
    title: "Blindbox Skullpanda The Warmth Series - Trọn bộ 12 Hộp",
    price: 3600000,
    quantity: 1,
    condition: "Mới 100% (Nguyên màng co)",
    category: "Blindbox / Art Toys",
    description: "Set 12 hộp nguyên màng co seal Pop Mart. Tỷ lệ ra Secret theo chuẩn nhà sản xuất.",
    images: [
      "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=600&auto=format&fit=crop&q=80",
    ],
    status: "sold",
    createdAt: "2024-04-28T16:00:00Z",
    seller: {
      id: "usr-005",
      username: "blindbox_mania",
      name: "Trần Mai Chi",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      accountType: "user",
    },
    reports: [],
    activity: [
      { id: "pact-7", action: "Đã bán qua sàn", timestamp: "2024-05-02 20:10", user: "System" },
    ],
  },
  {
    id: "prd-006",
    title: "Poster có chữ ký Stray Kids '5-STAR' Album",
    price: 900000,
    quantity: 1,
    condition: "Like New 98%",
    category: "Album & Merch",
    description: "Poster tặng kèm sự kiện fansign Makestar, chữ ký rõ nét bảo quản trong ống tube.",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    ],
    status: "under_review",
    createdAt: "2024-05-16T11:00:00Z",
    seller: {
      id: "usr-001",
      username: "rose_stan99",
      name: "Nguyễn Thảo Vy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      accountType: "user",
    },
    reports: [
      {
        id: "prep-2",
        reporter: "@straykids_stay",
        reason: "Yêu cầu cung cấp hóa đơn hoặc ảnh tại sự kiện để kiểm tra tính xác thực của chữ ký",
        date: "2024-05-17 10:20",
        status: "pending",
        note: "Người bán đang được yêu cầu bổ sung ảnh chụp tại buổi ký.",
      },
    ],
    activity: [
      { id: "pact-8", action: "Chuyển sang trạng thái Đang xử lý báo cáo", timestamp: "2024-05-17 14:00", user: "Admin" },
    ],
  },
];
