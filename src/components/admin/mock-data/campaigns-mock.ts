export type CampaignStatus = "draft" | "scheduled" | "published" | "ended";

export interface AdminCampaignItem {
  id: string;
  name: string;
  coverImage: string;
  bannerImage: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  participantsCount: number;
  contributionsCount: number;
  rules: string;
  rewardPool: string;
}

export interface CampaignParticipantItem {
  id: string;
  campaignId: string;
  campaignName: string;
  user: {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar: string;
  };
  joinedAt: string;
  status: "active" | "completed" | "disqualified";
  points: number;
  rewardsClaimed: string;
}

export interface CampaignContributionItem {
  id: string;
  campaignId: string;
  campaignName: string;
  contributor: {
    id: string;
    username: string;
    name: string;
    avatar: string;
  };
  type: "item_trade" | "fandom_project" | "voucher_claim" | "donation";
  details: string;
  value: string;
  timestamp: string;
  status: "verified" | "pending" | "flagged";
}

export const CAMPAIGN_STATUS_CONFIG: Record<CampaignStatus, { label: string; class: string }> = {
  published: { label: "Đang diễn ra", class: "bg-tertiary/15 text-tertiary font-semibold" },
  scheduled: { label: "Đã lên lịch", class: "bg-secondary-container text-on-secondary-container" },
  draft: { label: "Bản nháp", class: "bg-surface-container-high text-on-surface-variant" },
  ended: { label: "Đã kết thúc", class: "bg-outline/20 text-on-surface-variant" },
};

export const MOCK_ADMIN_CAMPAIGNS: AdminCampaignItem[] = [
  {
    id: "camp-001",
    name: "Summer Fandom Festival 2024",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    description: "Lễ hội mùa hè kết nối fan K-Pop, Anime, Manga và TCG. Săn voucher giảm giá 50%, tham gia minigame nhận quà độc quyền từ các store đối tác uy tín.",
    type: "Fandom Festival",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    status: "published",
    participantsCount: 5420,
    contributionsCount: 1890,
    rules: "Tất cả thành viên có tài khoản xác thực email và tối thiểu 1 giao dịch trên sàn đều có thể tham gia săn quà và tích điểm tương tác.",
    rewardPool: "Tổng giá trị voucher & merch quà tặng lên tới 50.000.000 đ",
  },
  {
    id: "camp-002",
    name: "K-Pop Photocard Bazaar - Ngày Hội Trao Đổi Card",
    coverImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&auto=format&fit=crop&q=80",
    description: "Sự kiện giao lưu và trao đổi photocard chính hãng giữa các fandom lớn (Blink, Army, Once, Stay, Bunny). Miễn phí vận chuyển cho các đơn trade card.",
    type: "Trading Day",
    startDate: "2024-05-15",
    endDate: "2024-07-15",
    status: "published",
    participantsCount: 3120,
    contributionsCount: 945,
    rules: "Áp dụng cho các bài đăng sử dụng hashtag #GTT và giao dịch qua cơ chế ký quỹ GomPay Escrow an toàn.",
    rewardPool: "Tặng 1.000 toploader cao cấp và 500 voucher ship 0đ",
  },
  {
    id: "camp-003",
    name: "TCG Championship & Card Collector Expo Mùa 3",
    coverImage: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=1200&auto=format&fit=crop&q=80",
    description: "Giải đấu Pokemon TCG và triển lãm bộ sưu tập thẻ bài hiếm. Cơ hội đấu giá các lá bài Secret Rare PSA 10.",
    type: "Community Contest",
    startDate: "2024-07-01",
    endDate: "2024-07-10",
    status: "scheduled",
    participantsCount: 850,
    contributionsCount: 120,
    rules: "Dành cho các collector và game thủ đăng ký theo bảng đấu TCG chính quy.",
    rewardPool: "Cúp lưu niệm & Thẻ bài Booster Box nguyên seal",
  },
  {
    id: "camp-004",
    name: "GomGoods Blindbox Unboxing Challenge",
    coverImage: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=600&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=1200&auto=format&fit=crop&q=80",
    description: "Chiến dịch video unbox blindbox Pop Mart nhận coin thưởng và vé quay số trúng Secret Figure.",
    type: "Voucher Hunt",
    startDate: "2024-08-01",
    endDate: "2024-08-20",
    status: "draft",
    participantsCount: 0,
    contributionsCount: 0,
    rules: "Đăng tải video unboxing lên diễn đàn fandom kèm hashtag hợp lệ.",
    rewardPool: "10 bộ full set Skullpanda & Hirono",
  },
];

export const MOCK_ADMIN_PARTICIPANTS: CampaignParticipantItem[] = [
  {
    id: "part-001",
    campaignId: "camp-001",
    campaignName: "Summer Fandom Festival 2024",
    user: {
      id: "usr-001",
      username: "rose_stan99",
      name: "Nguyễn Thảo Vy",
      email: "thaovy.rose@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    joinedAt: "2024-06-02 10:15",
    status: "active",
    points: 450,
    rewardsClaimed: "Voucher giảm 50k + Set Sleeve Hologram",
  },
  {
    id: "part-002",
    campaignId: "camp-001",
    campaignName: "Summer Fandom Festival 2024",
    user: {
      id: "usr-002",
      username: "ToyMaster_VN",
      name: "Cửa Hàng Figure ToyMaster",
      email: "contact@toymaster.vn",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    },
    joinedAt: "2024-06-01 08:30",
    status: "active",
    points: 1200,
    rewardsClaimed: "Huy hiệu Top Sponsor Chiến Dịch",
  },
  {
    id: "part-003",
    campaignId: "camp-002",
    campaignName: "K-Pop Photocard Bazaar",
    user: {
      id: "usr-012",
      username: "miku_fan_hn",
      name: "Đỗ Quốc Việt",
      email: "quocviet.figure@gmail.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    joinedAt: "2024-05-16 14:20",
    status: "completed",
    points: 200,
    rewardsClaimed: "Mã freeship GomGoods 0đ",
  },
];

export const MOCK_ADMIN_CONTRIBUTIONS: CampaignContributionItem[] = [
  {
    id: "con-001",
    campaignId: "camp-001",
    campaignName: "Summer Fandom Festival 2024",
    contributor: {
      id: "usr-002",
      username: "ToyMaster_VN",
      name: "Cửa Hàng Figure ToyMaster",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    },
    type: "fandom_project",
    details: "Tài trợ 20 mô hình Chibi Miku làm quà tặng quay số may mắn",
    value: "5.000.000 đ",
    timestamp: "2024-06-01 09:00",
    status: "verified",
  },
  {
    id: "con-002",
    campaignId: "camp-002",
    campaignName: "K-Pop Photocard Bazaar",
    contributor: {
      id: "usr-001",
      username: "rose_stan99",
      name: "Nguyễn Thảo Vy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    type: "item_trade",
    details: "Hoàn tất trade 3 photocard chính hãng trong ngày hội",
    value: "3 thẻ bài",
    timestamp: "2024-05-18 16:30",
    status: "verified",
  },
  {
    id: "con-003",
    campaignId: "camp-001",
    campaignName: "Summer Fandom Festival 2024",
    contributor: {
      id: "usr-005",
      username: "blindbox_mania",
      name: "Trần Mai Chi",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
    type: "voucher_claim",
    details: "Đổi điểm tương tác lấy voucher giảm giá Pop Mart",
    value: "Voucher 100.000 đ",
    timestamp: "2024-06-05 11:20",
    status: "verified",
  },
];
