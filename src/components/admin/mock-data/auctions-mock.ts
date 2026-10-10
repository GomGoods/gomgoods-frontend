export type AuctionStatus = "live" | "scheduled" | "ended" | "cancelled" | "reported";

export interface BidHistoryItem {
  id: string;
  bidder: {
    id: string;
    username: string;
    name: string;
    avatar: string;
  };
  amount: number;
  timestamp: string;
  status: "winning" | "outbid" | "cancelled";
}

export interface AuctionReport {
  id: string;
  reporter: string;
  reason: string;
  date: string;
  status: "pending" | "resolved";
}

export interface AdminAuctionItem {
  id: string;
  title: string;
  startingPrice: number;
  currentBid: number;
  bidIncrement: number;
  buyNowPrice?: number;
  bidsCount: number;
  startTime: string;
  endTime: string;
  status: AuctionStatus;
  images: string[];
  description: string;
  seller: {
    id: string;
    username: string;
    name: string;
    avatar: string;
  };
  bidHistory: BidHistoryItem[];
  reports: AuctionReport[];
}

export const AUCTION_STATUS_CONFIG: Record<AuctionStatus, { label: string; class: string }> = {
  live: { label: "Đang diễn ra", class: "bg-tertiary/15 text-tertiary font-semibold" },
  scheduled: { label: "Đã lên lịch", class: "bg-secondary-container text-on-secondary-container" },
  ended: { label: "Đã kết thúc", class: "bg-surface-container-high text-on-surface-variant" },
  cancelled: { label: "Đã hủy", class: "bg-outline/20 text-on-surface-variant" },
  reported: { label: "Có khiếu nại", class: "bg-error-container/60 text-error" },
};

export const MOCK_ADMIN_AUCTIONS: AdminAuctionItem[] = [
  {
    id: "auc-001",
    title: "Gundam PG Unleashed 1/60 RX-78-2 Custom Sơn Mạ Vàng",
    startingPrice: 5000000,
    currentBid: 8200000,
    bidIncrement: 200000,
    buyNowPrice: 12000000,
    bidsCount: 16,
    startTime: "2024-05-18T19:00:00Z",
    endTime: "2024-05-20T21:00:00Z",
    status: "live",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    ],
    description: "Mô hình PG Unleashed RX-78-2 ráp sẵn và được custom mạ vàng electroplate cực kỳ tinh xảo. Có hộp gốc và phụ kiện đế led kèm theo.",
    seller: {
      id: "usr-002",
      username: "ToyMaster_VN",
      name: "Cửa Hàng Figure ToyMaster",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    },
    bidHistory: [
      {
        id: "bid-1",
        bidder: { id: "usr-004", username: "tcg_hanoi_zone", name: "Phạm Tuấn Hùng", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
        amount: 8200000,
        timestamp: "2024-05-19 14:35",
        status: "winning",
      },
      {
        id: "bid-2",
        bidder: { id: "usr-005", username: "gundam_builder", name: "Lâm Đình Trí", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" },
        amount: 8000000,
        timestamp: "2024-05-19 13:10",
        status: "outbid",
      },
      {
        id: "bid-3",
        bidder: { id: "usr-001", username: "collector_sg", name: "Trần Minh", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80" },
        amount: 7600000,
        timestamp: "2024-05-19 11:20",
        status: "outbid",
      },
    ],
    reports: [],
  },
  {
    id: "auc-002",
    title: "Photocard BTS Jimin 'Face' Fansign Video Call Soundwave POB",
    startingPrice: 800000,
    currentBid: 1950000,
    bidIncrement: 50000,
    bidsCount: 23,
    startTime: "2024-05-18T12:00:00Z",
    endTime: "2024-05-20T22:30:00Z",
    status: "live",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
    ],
    description: "Card bo góc độc quyền Soundwave đợt fansign online album Face của Jimin. Đảm bảo góc bo chuẩn, không defect.",
    seller: {
      id: "usr-001",
      username: "rose_stan99",
      name: "Nguyễn Thảo Vy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    bidHistory: [
      {
        id: "bid-4",
        bidder: { id: "usr-009", username: "bts_jiminie", name: "Ngô Thanh Thư", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
        amount: 1950000,
        timestamp: "2024-05-19 15:40",
        status: "winning",
      },
      {
        id: "bid-5",
        bidder: { id: "usr-010", username: "army_forever", name: "Đặng Thuỳ Trang", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
        amount: 1900000,
        timestamp: "2024-05-19 14:15",
        status: "outbid",
      },
    ],
    reports: [],
  },
  {
    id: "auc-003",
    title: "Thẻ bài Pokemon 1st Edition Shadowless Charizard Holo Rare",
    startingPrice: 20000000,
    currentBid: 20000000,
    bidIncrement: 1000000,
    bidsCount: 0,
    startTime: "2024-05-25T20:00:00Z",
    endTime: "2024-05-27T22:00:00Z",
    status: "scheduled",
    images: [
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&auto=format&fit=crop&q=80",
    ],
    description: "Thẻ bài cực hiếm phiên bản Shadowless năm 1999. Đã lên lịch mở phòng đấu giá vào cuối tuần.",
    seller: {
      id: "usr-004",
      username: "tcg_hanoi_zone",
      name: "Phạm Tuấn Hùng",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    bidHistory: [],
    reports: [],
  },
  {
    id: "auc-004",
    title: "Mô hình Hatsune Miku Memorial Dress Ver. 1/7 Good Smile",
    startingPrice: 4000000,
    currentBid: 6800000,
    bidIncrement: 100000,
    bidsCount: 29,
    startTime: "2024-05-10T10:00:00Z",
    endTime: "2024-05-12T21:00:00Z",
    status: "ended",
    images: [
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    ],
    description: "Phiên đấu giá đã kết thúc thành công với giá thắng 6.800.000 đ.",
    seller: {
      id: "usr-002",
      username: "ToyMaster_VN",
      name: "Cửa Hàng Figure ToyMaster",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    },
    bidHistory: [
      {
        id: "bid-6",
        bidder: { id: "usr-012", username: "miku_fan_hn", name: "Đỗ Quốc Việt", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
        amount: 6800000,
        timestamp: "2024-05-12 20:58",
        status: "winning",
      },
    ],
    reports: [],
  },
  {
    id: "auc-005",
    title: "Blindbox Skullpanda The Mirage Secret Edition",
    startingPrice: 1500000,
    currentBid: 2100000,
    bidIncrement: 50000,
    bidsCount: 12,
    startTime: "2024-05-14T15:00:00Z",
    endTime: "2024-05-16T20:00:00Z",
    status: "reported",
    images: [
      "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=600&auto=format&fit=crop&q=80",
    ],
    description: "Mô hình Secret Skullpanda. Có khiếu nại về dấu hiệu dán lại đáy hộp trước khi đấu giá.",
    seller: {
      id: "usr-003",
      username: "kpop_unoff_store",
      name: "Lê Hoàng Phúc",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    },
    bidHistory: [
      {
        id: "bid-7",
        bidder: { id: "usr-005", username: "blindbox_mania", name: "Trần Mai Chi", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
        amount: 2100000,
        timestamp: "2024-05-15 18:30",
        status: "winning",
      },
    ],
    reports: [
      {
        id: "arep-1",
        reporter: "@blindbox_mania",
        reason: "Hộp có vết cắt màng co dưới đáy dán băng dính lại, nghi ngờ rạch check thẻ",
        date: "2024-05-15 19:10",
        status: "pending",
      },
    ],
  },
];
