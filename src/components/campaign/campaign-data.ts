export type CampaignCategory =
  | "all"
  | "eco"
  | "community"
  | "marketplace"
  | "fandom"
  | "special";

export type CampaignStatus = "active" | "upcoming" | "ended";

export interface CampaignItem {
  id: string;
  title: string;
  category: CampaignCategory;
  categoryName: string;
  status: CampaignStatus;
  statusText: string;
  description: string;
  image: string;
  period: string;
  participantsCount: string;
  participantsNum: number;
  highlightBadge?: string;
  location?: string;
  rewards?: string;
  // Donation & Eco fields
  isDonation?: boolean;
  targetAmount?: string;
  raisedAmount?: string;
  raisedPercent?: number;
  donorCount?: number;
  ecoImpact?: string;
}

export interface EcoRankData {
  tierName: string;
  currentPoints: number;
  maxPoints: number;
  nextTier: string;
  treesPlanted: number;
  co2SavedKg: number;
  benefits: string[];
}

export const sampleEcoRank: EcoRankData = {
  tierName: "Hiệp Sĩ Sống Xanh (Hạng Bạc)",
  currentPoints: 350,
  maxPoints: 500,
  nextTier: "Đại Sứ Môi Trường (Hạng Vàng)",
  treesPlanted: 3,
  co2SavedKg: 24.5,
  benefits: [
    "Voucher giảm 15% khi mua đồ cũ tái sử dụng",
    "Gắn huy hiệu Lá Xanh nổi bật trên hồ sơ & diễn đàn",
    "Được vinh danh trên Bảng Vàng Gây Quỹ Môi Trường",
  ],
};

export const sampleCampaignCategories = [
  { id: "all", name: "Tất cả chiến dịch", icon: "Layers" },
  { id: "eco", name: "Quyên góp & Môi trường 🌱", icon: "Sprout" },
  { id: "community", name: "Sự kiện cộng đồng", icon: "Calendar" },
  { id: "marketplace", name: "Hoạt động mua bán", icon: "Store" },
  { id: "fandom", name: "Fandom-specific", icon: "Users" },
  { id: "special", name: "Special campaigns", icon: "Star" },
] as const;

export const sampleHeroCampaign: CampaignItem = {
  id: "hero-eco-1",
  title: "Gom Xanh 2026: Đổi Đồ Cũ - Góp Rừng Xanh 🌱",
  category: "eco",
  categoryName: "Quyên góp & Môi trường",
  status: "active",
  statusText: "Đang gây quỹ sôi nổi",
  description:
    "Chiến dịch trọng điểm của GomGoods kết nối cộng đồng fandom vì Trái Đất! Mỗi món đồ thanh lý tuần hoàn hoặc tiền quyên góp sẽ đóng góp trực tiếp vào dự án trồng 10.000 cây xanh tại rừng phòng hộ và thu hồi 5 tấn rác thải nhựa fandom.",
  image:
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop",
  period: "01/06 - 31/07",
  participantsCount: "6.4k người đồng hành",
  participantsNum: 6420,
  highlightBadge: "QUỸ BẢO VỆ MÔI TRƯỜNG",
  rewards: "Chứng nhận Đại Sứ Xanh + Huy hiệu Lá Vàng + Voucher 100k",
  isDonation: true,
  targetAmount: "100.000.000đ",
  raisedAmount: "78.500.000đ",
  raisedPercent: 78,
  donorCount: 2150,
  ecoImpact: "Đã trồng 3.925 cây xanh và thu gom 1.8 tấn rác thải nhựa",
};

export const sampleActiveCampaigns: CampaignItem[] = [
  {
    id: "camp-eco-1",
    title: "Quỹ Rừng Fandom: 1 Đơn Hàng = 1 Cây Xanh",
    category: "eco",
    categoryName: "Quyên góp & Môi trường",
    status: "active",
    statusText: "Đang gây quỹ",
    description:
      "Với mỗi đơn hàng thanh lý hoàn tất hoặc quyên góp tùy tâm từ 20.000đ, GomGoods cùng Quỹ Sống Xanh sẽ trồng 1 cây bần ngập mặn tại rừng Cần Giờ.",
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&h=400&fit=crop",
    period: "15/06 - 30/06",
    participantsCount: "2.8k người ủng hộ",
    participantsNum: 2840,
    rewards: "Tặng chứng nhận điện tử & mã định danh tọa độ cây xanh",
    isDonation: true,
    targetAmount: "50.000.000đ",
    raisedAmount: "42.200.000đ",
    raisedPercent: 84,
    donorCount: 1420,
    ecoImpact: "Đã trồng 2.110 cây bần xanh tươi",
  },
  {
    id: "camp-eco-2",
    title: "Gom Rác Công Nghệ - Tái Sinh Trái Đất",
    category: "eco",
    categoryName: "Quyên góp & Môi trường",
    status: "active",
    statusText: "Đang diễn ra",
    description:
      "Thu gom pin cũ, máy game hỏng, sạc cáp và vỏ nhựa figure không còn sử dụng để bàn giao đơn vị tái chế chuẩn ISO. Nhận voucher mua sắm xanh tới 50k.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
    period: "01/06 - 30/06",
    participantsCount: "1.9k lượt gom rác",
    participantsNum: 1950,
    rewards: "Voucher 50k + Huy hiệu Tái Chế Xanh",
    isDonation: true,
    targetAmount: "3.000 kg rác",
    raisedAmount: "2.150 kg rác",
    raisedPercent: 72,
    donorCount: 890,
    ecoImpact: "Giảm phát thải 4.5 tấn CO₂ tương đương",
  },
  {
    id: "camp-act-1",
    title: "Tuần Lễ Săn Hàng Hiếm & Đồ Cũ Tuần Hoàn",
    category: "marketplace",
    categoryName: "Hoạt động mua bán",
    status: "active",
    statusText: "Đang diễn ra",
    description:
      "Cơ hội sở hữu những món đồ limited edition từ các seller uy tín. Khuyến khích lối sống tuần hoàn đồ cũ, giảm thiểu sản xuất nhựa mới.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzLdif5k6QgfW81pUe7gKaqUqBRnEVKWdppakXV0RnV_XOlXwy52C6dWt5hndhV5YcQSahKai_RRIZObjD_WORdnXHYtZrS5F1nN3jDzGbKey0fFgGcpjdsR8Jw1cgZHVAs6hRQBOk5QvSrza9bgxP6g5QVqkNLJB_jhnY4z0btV1Ic43JrhXgVtoc7JfcJXcxfvYiCTTNpIIu3I-vox4hmFa2BkJZs65Wn7WGCyXo9tWSdHwJoasK",
    period: "15/06 - 30/06",
    participantsCount: "1.5k người tham gia",
    participantsNum: 1540,
    rewards: "Voucher 50k + Freeship đồ thanh lý",
  },
  {
    id: "camp-act-2",
    title: "Giao Lộ Game Thủ: Trao Đổi Đĩa Cũ",
    category: "community",
    categoryName: "Sự kiện cộng đồng",
    status: "active",
    statusText: "Đang diễn ra",
    description:
      "Offline giao lưu trao đổi đĩa game PS5/Switch và console cũ giữa các game thủ, tặng 100% doanh thu đấu giá mini cho Quỹ Bảo Trợ Động Vật Hoang Dã.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_GYxiRftEGnBcpGtpvOxpBBDIIvDd4H4rKdr-QGAnFHeBL-8LLD5sMatnhb5xywnxkZaKYyzmKNs4hHRUApNDnKf-7PSE1Y8zNOj6XKaxi8yebwMxbu_oxSbAOHfAezBXKjeY_cqCXWJxprAp5b3XZBohHieCzyUirwmBVy-uVf4GYtHToswZjcYB_etKtB60X6ODhJb7BOov2V25RvFd3ETI-gsCqkVAsmTB8VEGPw9-HURJKNWR",
    period: "24/06 - 25/06",
    participantsCount: "850 người tham gia",
    participantsNum: 850,
    rewards: "Bộ lót chuột Eco-cork + Quà tặng xanh",
  },
];

export const sampleUpcomingCampaigns: CampaignItem[] = [
  {
    id: "camp-up-eco-1",
    title: "Ngày Hội Cosplay Clean-Up & Nhặt Rác Xanh",
    category: "eco",
    categoryName: "Quyên góp & Môi trường",
    status: "upcoming",
    statusText: "Sắp diễn ra",
    description:
      "Cộng đồng cosplayer và otaku cùng nhau dọn dẹp sạch sẽ công viên sau các fes lớn. Lan tỏa hình ảnh fandom văn minh, yêu môi trường.",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&h=400&fit=crop",
    period: "Bắt đầu sau 3 ngày",
    participantsCount: "1.6k người đăng ký",
    participantsNum: 1600,
    rewards: "Túi Tote vải Organic + Huy hiệu Chiến Binh Xanh",
    isDonation: true,
    targetAmount: "10.000.000đ",
    raisedAmount: "4.500.000đ",
    raisedPercent: 45,
    donorCount: 320,
    ecoImpact: "Làm sạch 5 công viên lớn tại Hà Nội và TP.HCM",
  },
  {
    id: "camp-up-1",
    title: "Tháng Handmade Tái Chế Eco-Craft",
    category: "special",
    categoryName: "Special campaigns",
    status: "upcoming",
    statusText: "Sắp diễn ra",
    description:
      "Workshop sáng tạo móc khóa, túi xách và phụ kiện anime từ vải jean cũ và nhựa tái sinh. Toàn bộ lợi nhuận ủng hộ Quỹ Trái Đất.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsInZmFfwV7XsWJ37d7MXjBImDyrRwSxwWLEniHTak6sDGYflzB4gptOY_jXx97NU1LOMfIGxcog2U1Il6y08SleWORBYExpATBPOhSDcOvE3ZNmPZFtf40L_h5n4FNa89EkbnI_CAy5nNuW9UsMtl7yJoCfOTgGKQhGYqHuyCk_E17pBq43olmtVE2CmzrQJTkcPI1wTDafE3rfEHzL-mWm4vVKwoxsDmPm4_f-gvT4R0g3uuAS8j",
    period: "01/07 - 15/07",
    participantsCount: "1.2k người đăng ký",
    participantsNum: 1200,
    rewards: "Kit tự làm Eco-Craft + Voucher 30k",
  },
];

export const sampleEndedCampaigns: CampaignItem[] = [
  {
    id: "camp-end-eco-1",
    title: "Đấu Giá Tranh Sơn Dầu Bảo Vệ Rừng Sơn Trà",
    category: "eco",
    categoryName: "Quyên góp & Môi trường",
    status: "ended",
    statusText: "Đã hoàn thành",
    description:
      "Đấu giá 20 bức tranh nghệ thuật của các họa sĩ fandom, quyên góp được 85.000.000đ cho trung tâm cứu hộ voọc chà vá chân nâu.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop",
    period: "Kết thúc: 25/05/2026",
    participantsCount: "3.5k người tham gia",
    participantsNum: 3500,
    rewards: "Quyên góp thành công 85.000.000đ",
  },
  {
    id: "camp-end-1",
    title: "Đại Hội Kpop Fans: Tủ Sách Cho Em",
    category: "fandom",
    categoryName: "Fandom-specific",
    status: "ended",
    statusText: "Đã hoàn thành",
    description:
      "Quyên góp hơn 2.000 cuốn manga và sách tham khảo cho học sinh vùng cao dưới tên các idol Kpop.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAStAziyQV7QlSn49YzP5CM2WfG2WY2l6-6vrI8L4edVKNf9hoM9deNeY0ZmaOEroKTzU-YqxGq-hJfu8w6P-ofz8UjZShzBZxpXOsfGWvrPVOvqSWzq__mCvwTdLW04iA7s1p6LKqbG7LGYD8D_F6kBGGDCqKWjEPg512irbLAiViwLeS02IXXzO7jBPHA5dy5Nq1YQV2zNKYENWc1teU--VwnHB1580tiksocElBjKVJg0ISVICb3",
    period: "Kết thúc: 10/05/2026",
    participantsCount: "3.2k người đã tham gia",
    participantsNum: 3200,
    rewards: "Xây dựng thành công 2 thư viện sách",
  },
];
