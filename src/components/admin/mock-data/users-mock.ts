export type AccountType = "user" | "store";
export type UserStatus = "active" | "suspended";

export interface AdminUserListItem {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  accountType: AccountType;
  status: UserStatus;
  joinedAt: string;
  listingsCount: number;
  ordersCount: number;
  reviewsCount: number;
  reportsCount: number;
}

export interface UserListingItem {
  id: string;
  title: string;
  price: number;
  status: "active" | "sold" | "hidden";
  category: string;
  image: string;
  createdAt: string;
}

export interface UserOrderItem {
  id: string;
  code: string;
  type: "buy" | "sell";
  total: number;
  status: "completed" | "shipping" | "cancelled";
  date: string;
  counterparty: string;
  productTitle: string;
}

export interface UserReviewItem {
  id: string;
  author: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
  role: "buyer" | "seller";
}

export interface UserReportItem {
  id: string;
  reporter: string;
  reason: string;
  date: string;
  status: "pending" | "resolved" | "dismissed";
  details: string;
}

export interface UserActivityLog {
  id: string;
  action: string;
  timestamp: string;
  ip: string;
  device: string;
}

export interface AdminUserDetail extends AdminUserListItem {
  bio: string;
  location: string;
  listings: UserListingItem[];
  orders: UserOrderItem[];
  reviews: UserReviewItem[];
  reports: UserReportItem[];
  activity: UserActivityLog[];
}

export const MOCK_ADMIN_USERS: AdminUserDetail[] = [
  {
    id: "usr-001",
    username: "rose_stan99",
    name: "Nguyễn Thảo Vy",
    email: "thaovy.rose@gmail.com",
    phone: "0908 123 456",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    accountType: "user",
    status: "active",
    joinedAt: "2023-10-15",
    bio: "Collector chính hiệu BLACKPINK & NewJeans. Chuyên săn photocard fansign & POB.",
    location: "TP. Hồ Chí Minh",
    listingsCount: 14,
    ordersCount: 48,
    reviewsCount: 32,
    reportsCount: 0,
    listings: [
      {
        id: "prd-001",
        title: "Photocard Jennie Born Pink Tour Exclusive",
        price: 450000,
        status: "active",
        category: "Card Bo Góc",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&auto=format&fit=crop&q=80",
        createdAt: "2024-05-12",
      },
      {
        id: "prd-002",
        title: "Album NewJeans 'Get Up' Bunny Beach Bag Ver",
        price: 320000,
        status: "sold",
        category: "Album & Merch",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
        createdAt: "2024-04-20",
      },
    ],
    orders: [
      {
        id: "ord-101",
        code: "GM-99382",
        type: "buy",
        total: 550000,
        status: "completed",
        date: "2024-05-18",
        counterparty: "@kpop_official_corner",
        productTitle: "Card Jisoo Born Pink World Tour",
      },
      {
        id: "ord-102",
        code: "GM-88219",
        type: "sell",
        total: 320000,
        status: "completed",
        date: "2024-04-21",
        counterparty: "@hanni_fanboy",
        productTitle: "Album NewJeans 'Get Up' Bunny Beach Bag Ver",
      },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Hải Đăng (@haidang_kpop)",
        authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        comment: "Gói hàng siêu kỹ bằng bìa lạnh và túi bóng khí, card không vết xước.",
        date: "2024-04-23",
        role: "buyer",
      },
      {
        id: "rev-2",
        author: "Minh Thư (@thu_merch)",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        comment: "Giao dịch nhanh gọn, bạn mua rất nhiệt tình và chuyển khoản chuẩn giờ.",
        date: "2024-05-18",
        role: "seller",
      },
    ],
    reports: [],
    activity: [
      { id: "act-1", action: "Đăng tải sản phẩm mới #prd-001", timestamp: "2024-05-12 14:20", ip: "14.232.208.12", device: "Chrome / Windows 11" },
      { id: "act-2", action: "Đăng nhập thành công", timestamp: "2024-05-19 09:12", ip: "14.232.208.12", device: "Safari / iOS 17.4" },
    ],
  },
  {
    id: "usr-002",
    username: "ToyMaster_VN",
    name: "Cửa Hàng Figure ToyMaster",
    email: "contact@toymaster.vn",
    phone: "0912 888 999",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    accountType: "store",
    status: "active",
    joinedAt: "2023-08-20",
    bio: "Chuyên nhập khẩu chính hãng mô hình Good Smile Company, Kotobukiya, Bandai.",
    location: "Hà Nội",
    listingsCount: 156,
    ordersCount: 840,
    reviewsCount: 420,
    reportsCount: 1,
    listings: [
      {
        id: "prd-003",
        title: "Mô hình Nendoroid Gojo Satoru Jujutsu Kaisen",
        price: 1250000,
        status: "active",
        category: "Figure / Mô hình",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80",
        createdAt: "2024-05-10",
      },
      {
        id: "prd-004",
        title: "Scale 1/7 Hololive Houshou Marine Max Factory",
        price: 4600000,
        status: "active",
        category: "Figure / Mô hình",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=80",
        createdAt: "2024-05-08",
      },
    ],
    orders: [
      {
        id: "ord-103",
        code: "GM-77401",
        type: "sell",
        total: 1250000,
        status: "shipping",
        date: "2024-05-19",
        counterparty: "@otaku_collector",
        productTitle: "Mô hình Nendoroid Gojo Satoru Jujutsu Kaisen",
      },
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Bảo Long (@long_figure)",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        comment: "Hàng nguyên seal chuẩn Nhật, hộp bén cạnh không móp méo!",
        date: "2024-05-15",
        role: "buyer",
      },
    ],
    reports: [
      {
        id: "rep-1",
        reporter: "@buyer_check",
        reason: "Nghi ngờ giá chênh lệch so với niêm yết hãng",
        date: "2024-03-10",
        status: "resolved",
        details: "Admin đã kiểm tra hóa đơn nhập chính ngạch từ AmiAmi, xác nhận hợp lệ.",
      },
    ],
    activity: [
      { id: "act-3", action: "Cập nhật tồn kho sản phẩm #prd-003", timestamp: "2024-05-19 11:30", ip: "118.70.190.5", device: "Firefox / Windows 11" },
    ],
  },
  {
    id: "usr-003",
    username: "kpop_unoff_store",
    name: "Lê Hoàng Phúc",
    email: "phuc.kpopcorner@gmail.com",
    phone: "0934 567 890",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    accountType: "user",
    status: "suspended",
    joinedAt: "2024-01-10",
    bio: "Pass đồ K-Pop giá hạt dẻ.",
    location: "Đà Nẵng",
    listingsCount: 22,
    ordersCount: 15,
    reviewsCount: 8,
    reportsCount: 6,
    listings: [
      {
        id: "prd-005",
        title: "Photocard Jungkook Golden Fanmade",
        price: 45000,
        status: "hidden",
        category: "Card Bo Góc",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&auto=format&fit=crop&q=80",
        createdAt: "2024-05-01",
      },
    ],
    orders: [],
    reviews: [
      {
        id: "rev-4",
        author: "Ngọc Anh (@anh_army)",
        authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        rating: 1,
        comment: "Bán hàng fanmade nhưng ghi là official, báo admin xử lý!",
        date: "2024-05-05",
        role: "buyer",
      },
    ],
    reports: [
      {
        id: "rep-2",
        reporter: "@anh_army",
        reason: "Bán hàng không đúng mô tả (hàng fanmade ghi official)",
        date: "2024-05-05",
        status: "pending",
        details: "Người mua phát hiện card không có tem hologram phản quang và bề mặt in mờ.",
      },
    ],
    activity: [
      { id: "act-4", action: "Tài khoản bị tạm khóa bởi Admin do nhiều khiếu nại", timestamp: "2024-05-06 10:00", ip: "127.0.0.1", device: "System" },
    ],
  },
  {
    id: "usr-004",
    username: "tcg_hanoi_zone",
    name: "Phạm Tuấn Hùng",
    email: "tuanhung.tcg@gmail.com",
    phone: "0987 654 321",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    accountType: "store",
    status: "active",
    joinedAt: "2023-11-05",
    bio: "Chuyên đấu giá và buôn bán Pokemon TCG & Yu-Gi-Oh! PSA Grade 9-10.",
    location: "Hà Nội",
    listingsCount: 65,
    ordersCount: 310,
    reviewsCount: 180,
    reportsCount: 0,
    listings: [],
    orders: [],
    reviews: [],
    reports: [],
    activity: [],
  },
  {
    id: "usr-005",
    username: "blindbox_mania",
    name: "Trần Mai Chi",
    email: "maichi.blindbox@gmail.com",
    phone: "0971 234 567",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    accountType: "user",
    status: "active",
    joinedAt: "2024-02-18",
    bio: "Nghiện khui blindbox Skullpanda, Hirono, Dimoo. Chỉ pass hàng unbox check card.",
    location: "TP. Hồ Chí Minh",
    listingsCount: 38,
    ordersCount: 72,
    reviewsCount: 45,
    reportsCount: 0,
    listings: [],
    orders: [],
    reviews: [],
    reports: [],
    activity: [],
  },
];
