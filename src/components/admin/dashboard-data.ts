// ─── KPI Data ───────────────────────────────────────────────
export interface KpiItem {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  subtitle: string;
  icon: string; // lucide icon name
  bgClass: string;
  iconBgClass: string;
}

export const KPI_DATA: KpiItem[] = [
  {
    label: "Tổng GMV",
    value: "1.482.500.000 đ",
    change: "+14.2%",
    changeType: "up",
    subtitle: "so với tháng trước",
    icon: "Banknote",
    bgClass: "bg-primary-container/10",
    iconBgClass: "bg-secondary-container text-on-secondary-fixed",
  },
  {
    label: "Đơn hoàn tất",
    value: "3,842 đơn",
    change: "+8.5%",
    changeType: "up",
    subtitle: "tỷ lệ hủy 1.2%",
    icon: "ShoppingBag",
    bgClass: "bg-secondary-fixed/40",
    iconBgClass: "bg-secondary-fixed text-on-secondary-fixed",
  },
  {
    label: "MAU / DAU",
    value: "52,430",
    change: "+18.3%",
    changeType: "up",
    subtitle: "tương tác sôi nổi",
    icon: "Users",
    bgClass: "bg-tertiary-fixed/40",
    iconBgClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  {
    label: "Đấu giá live",
    value: "248 phiên",
    change: "Sôi động",
    changeType: "neutral",
    subtitle: "1,410 lượt bid",
    icon: "Gavel",
    bgClass: "bg-primary-fixed/50",
    iconBgClass: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    label: "Tỷ lệ tranh chấp",
    value: "0.38%",
    change: "Vùng an toàn (<1%)",
    changeType: "neutral",
    subtitle: "",
    icon: "ShieldCheck",
    bgClass: "bg-surface-container-high",
    iconBgClass: "bg-surface-container-low text-tertiary",
  },
];

// ─── Chart Data ─────────────────────────────────────────────
export const CHART_FILTER_CHIPS = [
  "Tất cả",
  "K-Pop",
  "Anime/Manga",
  "TCG Card",
  "Blindbox",
  "Game",
  "Khác",
];

export interface WeeklyBarData {
  day: string;
  date: string;
  marketplace: number;
  auction: number;
  isWeekend: boolean;
}

export const WEEKLY_CHART_DATA: WeeklyBarData[] = [
  { day: "T2", date: "18/05", marketplace: 105, auction: 75, isWeekend: false },
  { day: "T3", date: "19/05", marketplace: 120, auction: 95, isWeekend: false },
  { day: "T4", date: "20/05", marketplace: 135, auction: 85, isWeekend: false },
  { day: "T5", date: "21/05", marketplace: 150, auction: 115, isWeekend: false },
  { day: "T6", date: "22/05", marketplace: 165, auction: 140, isWeekend: false },
  { day: "T7", date: "23/05", marketplace: 182, auction: 162, isWeekend: true },
  { day: "CN", date: "24/05", marketplace: 172, auction: 155, isWeekend: true },
];

// ─── Donut Categories ───────────────────────────────────────
export interface CategoryData {
  name: string;
  percentage: number;
  color: string;
  bgClass: string;
}

export const CATEGORY_DATA: CategoryData[] = [
  {
    name: "Card Bo Góc (Photocard K-Pop)",
    percentage: 38,
    color: "#ff5a5f",
    bgClass: "bg-primary-container",
  },
  {
    name: "Mô hình Figure (Scale / Nendoroid)",
    percentage: 31,
    color: "#529bc9",
    bgClass: "bg-tertiary-container",
  },
  {
    name: "Blindbox (Pop Mart, Skullpanda)",
    percentage: 18,
    color: "#d9c2b1",
    bgClass: "bg-secondary-fixed-dim",
  },
  {
    name: "Manga, Artbook & Khác",
    percentage: 13,
    color: "#8e706f",
    bgClass: "bg-outline",
  },
];

// ─── Activity Timeline ──────────────────────────────────────
export interface ActivityItem {
  id: string;
  type: "order" | "auction" | "moderation" | "forum" | "campaign";
  badge: string;
  badgeClass: string;
  dotClass: string;
  title: string;
  description: string;
  time: string;
  meta?: string[];
  actions?: { label: string; primary?: boolean }[];
}

export const ACTIVITIES: ActivityItem[] = [
  {
    id: "GM-99382",
    type: "order",
    badge: "ĐƠN HÀNG",
    badgeClass: "bg-primary-fixed text-on-primary-fixed",
    dotClass: "bg-primary-container",
    title: "#GM-99382",
    description:
      'Thanh toán thành công đơn hàng "Card Jisoo Born Pink World Tour" trị giá 550.000 đ qua GomPay Escrow.',
    time: "2 phút trước",
    meta: ["Buyer: @rose_stan99", "Seller: @kpop_official_corner"],
  },
  {
    id: "AUCN-88392",
    type: "auction",
    badge: "ĐẤU GIÁ",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    dotClass: "bg-tertiary-container",
    title: "#AUCN-88392",
    description:
      'Lượt đặt giá mới 480.000 đ cho vật phẩm "Limited Edition Stray Kids Hyunjin Subk Hologram" (Tổng 28 lượt bid).',
    time: "5 phút trước",
  },
  {
    id: "MOD-001",
    type: "moderation",
    badge: "KIỂM DUYỆT",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    dotClass: "bg-secondary-fixed-dim",
    title: "Người bán @ToyMaster_VN",
    description:
      "Vừa đăng tải 3 sản phẩm mô hình Anime mới phân loại giá trị cao (>3.000.000 đ) cần phê duyệt nguồn gốc.",
    time: "12 phút trước",
    actions: [
      { label: "Duyệt ngay", primary: true },
      { label: "Xem ảnh check legit" },
    ],
  },
  {
    id: "FORUM-001",
    type: "forum",
    badge: "DIỄN ĐÀN FANDOM",
    badgeClass: "bg-surface-container-high text-on-surface",
    dotClass: "bg-outline",
    title: "Minh Khang",
    description:
      'Đã tạo chủ đề cảnh báo: "Cảnh giác chiêu trò tráo card POB fake qua hình thức giao dịch ngoài sàn" (Đã có 42 lượt upvote).',
    time: "25 phút trước",
  },
  {
    id: "CAMP-001",
    type: "campaign",
    badge: "CHIẾN DỊCH",
    badgeClass: "bg-primary-container text-on-primary-container",
    dotClass: "bg-primary",
    title: "Summer Fandom Festival 2024",
    description:
      "Chiến dịch vừa cán mốc 5,000 người tham gia đổi voucher săn deal goods độc quyền!",
    time: "1 giờ trước",
  },
];

// ─── Urgent Alerts ──────────────────────────────────────────
export interface AlertItem {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  icon: string;
  title: string;
  severityLabel: string;
  description: string;
  bgClass: string;
  iconBgClass: string;
  actions: { label: string; variant: "primary" | "secondary"; actionClass?: string }[];
}

export const ALERTS: AlertItem[] = [
  {
    id: "alert-1",
    severity: "critical",
    icon: "AlertTriangle",
    title: "3 Khiếu nại / Tranh chấp mới",
    severityLabel: "Khẩn cấp",
    description:
      "Người mua báo lỗi trầy xước card và seller từ chối hoàn tiền. GomPay Escrow đang giữ tiền cọc.",
    bgClass: "bg-error-container/40",
    iconBgClass: "bg-error text-on-error",
    actions: [
      { label: "Bỏ qua", variant: "secondary" },
      { label: "Xử lý ngay", variant: "primary", actionClass: "bg-error text-on-error" },
    ],
  },
  {
    id: "alert-2",
    severity: "high",
    icon: "Shield",
    title: "12 Báo cáo nghi vấn hàng giả",
    severityLabel: "Ưu tiên cao",
    description:
      'Cộng đồng gom nhóm report seller @kpop_unoff_store bán card lậu không ghi rõ "Fanmade".',
    bgClass: "bg-secondary-container/60",
    iconBgClass: "bg-secondary text-on-secondary",
    actions: [
      { label: "Xem danh sách", variant: "secondary" },
      { label: "Khóa tạm thời", variant: "primary", actionClass: "bg-secondary text-on-secondary" },
    ],
  },
  {
    id: "alert-3",
    severity: "medium",
    icon: "Zap",
    title: "Tăng đột biến phòng đấu giá",
    severityLabel: "Tải cụm",
    description:
      'Phiên đấu giá "Gundam PG Unleashed RX-78-2 Custom sơn mạ vàng" đạt 1,200 người xem đồng thời.',
    bgClass: "bg-tertiary-fixed/40",
    iconBgClass: "bg-tertiary text-on-tertiary",
    actions: [
      { label: "Xem phòng", variant: "secondary" },
      { label: "Phân bổ tải CDN", variant: "primary", actionClass: "bg-tertiary text-on-tertiary" },
    ],
  },
  {
    id: "alert-4",
    severity: "low",
    icon: "Hourglass",
    title: "5 hồ sơ Store Seller chờ xử lý",
    severityLabel: "Chờ eKYC",
    description:
      "Các shop kinh doanh chuyên nghiệp gửi kèm CCCD gắn chip và tài khoản ngân hàng trùng khớp.",
    bgClass: "bg-surface-container-low",
    iconBgClass: "bg-outline text-surface-container-lowest",
    actions: [
      { label: "Duyệt hồ sơ nhanh", variant: "primary", actionClass: "bg-surface-container-highest text-on-surface" },
    ],
  },
];

// ─── Campaign/Homepage Summary ──────────────────────────────
export interface CampaignSummary {
  bannersActive: number;
  campaignsActive: number;
  campaignsScheduled: number;
  campaignsDraft: number;
  campaignsEndingSoon: number;
}

export const CAMPAIGN_SUMMARY: CampaignSummary = {
  bannersActive: 3,
  campaignsActive: 5,
  campaignsScheduled: 2,
  campaignsDraft: 3,
  campaignsEndingSoon: 1,
};

// ─── Banner Management Data ─────────────────────────────────
export type BannerStatus = "published" | "scheduled" | "draft" | "expired";

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  displayOrder: number;
  startDate: string;
  endDate: string;
  status: BannerStatus;
  createdAt: string;
  updatedAt: string;
}

export const MOCK_BANNERS: BannerItem[] = [
  {
    id: "banner-1",
    title: "Summer Fandom Festival 2024",
    subtitle: "Săn deal độc quyền - Giảm đến 50% hàng ngàn collectibles",
    ctaText: "Khám phá ngay",
    ctaLink: "/campaign/summer-festival",
    imageUrl: "/banners/summer-festival.jpg",
    displayOrder: 1,
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    status: "published",
    createdAt: "2024-05-20T10:00:00Z",
    updatedAt: "2024-05-25T14:30:00Z",
  },
  {
    id: "banner-2",
    title: "K-Pop Photocard Bazaar",
    subtitle: "Marketplace lớn nhất cho collector K-Pop",
    ctaText: "Tham gia ngay",
    ctaLink: "/marketplace?category=kpop",
    imageUrl: "/banners/kpop-bazaar.jpg",
    displayOrder: 2,
    startDate: "2024-05-15",
    endDate: "2024-07-15",
    status: "published",
    createdAt: "2024-05-10T08:00:00Z",
    updatedAt: "2024-05-10T08:00:00Z",
  },
  {
    id: "banner-3",
    title: "Đấu giá Gundam Limited Edition",
    subtitle: "Phiên đấu giá đặc biệt - Mô hình Gundam hiếm",
    ctaText: "Xem phiên đấu giá",
    ctaLink: "/auction/gundam-limited",
    imageUrl: "/banners/gundam-auction.jpg",
    displayOrder: 3,
    startDate: "2024-06-10",
    endDate: "2024-06-15",
    status: "published",
    createdAt: "2024-06-01T09:00:00Z",
    updatedAt: "2024-06-05T11:00:00Z",
  },
  {
    id: "banner-4",
    title: "Flash Sale Blindbox Tháng 7",
    subtitle: "Pop Mart x Skullpanda - Giá sốc chỉ 24h",
    ctaText: "Đặt lịch nhắc nhở",
    ctaLink: "/campaign/flash-sale-july",
    imageUrl: "/banners/blindbox-flash.jpg",
    displayOrder: 4,
    startDate: "2024-07-01",
    endDate: "2024-07-02",
    status: "scheduled",
    createdAt: "2024-06-15T10:00:00Z",
    updatedAt: "2024-06-15T10:00:00Z",
  },
  {
    id: "banner-5",
    title: "TCG Tournament Season 3",
    subtitle: "Giải đấu thẻ bài mùa 3 - Phần thưởng hấp dẫn",
    ctaText: "Đăng ký tham gia",
    ctaLink: "/campaign/tcg-tournament-s3",
    imageUrl: "/banners/tcg-tournament.jpg",
    displayOrder: 5,
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    status: "draft",
    createdAt: "2024-06-20T16:00:00Z",
    updatedAt: "2024-06-20T16:00:00Z",
  },
  {
    id: "banner-6",
    title: "Anime Figure Expo Collab",
    subtitle: "Hợp tác với Anime Expo - Exclusive merch",
    ctaText: "Xem bộ sưu tập",
    ctaLink: "/marketplace?tag=anime-expo",
    imageUrl: "/banners/anime-expo.jpg",
    displayOrder: 6,
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    status: "expired",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-03-20T12:00:00Z",
  },
];

// ─── Promotion Management Data ──────────────────────────────
export type PromotionStatus = "published" | "scheduled" | "draft" | "expired";
export type PromotionContentType = "campaign" | "category" | "product_collection" | "custom_link";

export interface PromotionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  contentType: PromotionContentType;
  target: string;
  ctaText: string;
  displayOrder: number;
  startDate: string;
  endDate: string;
  status: PromotionStatus;
  createdAt: string;
  updatedAt: string;
}

export const PROMOTION_CONTENT_TYPE_LABELS: Record<PromotionContentType, string> = {
  campaign: "Chiến dịch",
  category: "Danh mục",
  product_collection: "Bộ sưu tập sản phẩm",
  custom_link: "Liên kết tùy chỉnh",
};

export const MOCK_PROMOTIONS: PromotionItem[] = [
  {
    id: "promo-1",
    title: "Hot Deal K-Pop Photocard",
    description: "Giảm giá đến 30% cho tất cả photocard chính hãng từ SM, YG, JYP Entertainment",
    imageUrl: "/promotions/kpop-deal.jpg",
    contentType: "category",
    target: "K-Pop Photocard",
    ctaText: "Mua ngay",
    displayOrder: 1,
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    status: "published",
    createdAt: "2024-05-25T10:00:00Z",
    updatedAt: "2024-05-28T15:00:00Z",
  },
  {
    id: "promo-2",
    title: "Summer Fandom Festival",
    description: "Chiến dịch mùa hè với hàng trăm deal độc quyền cho fan fandom",
    imageUrl: "/promotions/summer-fest.jpg",
    contentType: "campaign",
    target: "Summer Fandom Festival 2024",
    ctaText: "Tham gia ngay",
    displayOrder: 2,
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    status: "published",
    createdAt: "2024-05-20T08:00:00Z",
    updatedAt: "2024-05-20T08:00:00Z",
  },
  {
    id: "promo-3",
    title: "Bộ sưu tập Nendoroid mới nhất",
    description: "Khám phá các mô hình Nendoroid mới ra mắt tháng này",
    imageUrl: "/promotions/nendoroid.jpg",
    contentType: "product_collection",
    target: "Nendoroid New Arrivals",
    ctaText: "Xem ngay",
    displayOrder: 3,
    startDate: "2024-06-10",
    endDate: "2024-07-10",
    status: "published",
    createdAt: "2024-06-05T12:00:00Z",
    updatedAt: "2024-06-05T12:00:00Z",
  },
  {
    id: "promo-4",
    title: "Pop Mart Mega Drop",
    description: "Pop Mart Mega Sale - Blindbox giá sốc trong 48h",
    imageUrl: "/promotions/popmart.jpg",
    contentType: "custom_link",
    target: "https://gomgoods.com/flash-sale/popmart",
    ctaText: "Đặt lịch nhắc",
    displayOrder: 4,
    startDate: "2024-07-15",
    endDate: "2024-07-17",
    status: "scheduled",
    createdAt: "2024-06-20T09:00:00Z",
    updatedAt: "2024-06-20T09:00:00Z",
  },
  {
    id: "promo-5",
    title: "TCG Card Trading Week",
    description: "Tuần lễ giao dịch thẻ bài - Kết nối collector toàn quốc",
    imageUrl: "/promotions/tcg-week.jpg",
    contentType: "campaign",
    target: "TCG Trading Week",
    ctaText: "Khám phá",
    displayOrder: 5,
    startDate: "2024-08-01",
    endDate: "2024-08-07",
    status: "draft",
    createdAt: "2024-06-25T14:00:00Z",
    updatedAt: "2024-06-25T14:00:00Z",
  },
];

// ─── Homepage Layout Data ───────────────────────────────────
export interface HomepageSection {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  order: number;
  description: string;
}

export const MOCK_HOMEPAGE_SECTIONS: HomepageSection[] = [
  { id: "hero", name: "Hero Banner Carousel", type: "banner", visible: true, order: 1, description: "Banner quay vòng chính trên đầu trang" },
  { id: "promo-strip", name: "Dải Khuyến mãi", type: "promotion", visible: true, order: 2, description: "Dải ngang hiển thị các chương trình khuyến mãi nổi bật" },
  { id: "categories", name: "Danh mục Nổi bật", type: "category_nav", visible: true, order: 3, description: "Thanh điều hướng danh mục sản phẩm" },
  { id: "trending", name: "Sản phẩm Trending", type: "product_grid", visible: true, order: 4, description: "Lưới sản phẩm đang hot, dựa trên lượt xem và giao dịch" },
  { id: "live-auctions", name: "Đấu giá Đang diễn ra", type: "auction_carousel", visible: true, order: 5, description: "Carousel hiển thị các phiên đấu giá live" },
  { id: "campaign-banner", name: "Banner Chiến dịch", type: "campaign", visible: true, order: 6, description: "Banner chiến dịch đang chạy (ví dụ: Summer Festival)" },
  { id: "new-arrivals", name: "Hàng mới về", type: "product_grid", visible: true, order: 7, description: "Lưới sản phẩm mới đăng trong 7 ngày qua" },
  { id: "forum-highlights", name: "Diễn đàn Nổi bật", type: "forum_widget", visible: false, order: 8, description: "Widget hiển thị bài viết diễn đàn được upvote nhiều nhất" },
  { id: "seller-spotlight", name: "Store Seller Nổi bật", type: "seller_carousel", visible: false, order: 9, description: "Carousel giới thiệu các Store Seller uy tín" },
];
