export interface BidHistoryItem {
  id: string;
  bidderName: string;
  avatarText: string;
  amount: number;
  timeAgo: string;
  isYou?: boolean;
}

export interface SellerInfo {
  name: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: string;
  responseTime: string;
  isVerified: boolean;
}

export interface ProductAttribute {
  label: string;
  value: string;
  isHighlight?: boolean;
}

export interface AuctionDetailItem {
  id: string;
  code: string;
  title: string;
  description: string;
  images: string[];
  editionBadge?: string;
  status: "live" | "upcoming" | "ended";
  badge?: "hot" | "rare";
  currentPrice: number;
  startingPrice: number;
  minIncrement: number;
  timeLeftSeconds: number; // in seconds for realtime countdown
  bidCount: number;
  category: string;
  attributes: ProductAttribute[];
  seller: SellerInfo;
  bidHistory: BidHistoryItem[];
}

export const sampleAuctionDetails: Record<string, AuctionDetailItem> = {
  "auc-1": {
    id: "auc-1",
    code: "AUCN-88391",
    title: "Mô hình Gundam PG Unleashed RX-78-2 (Nguyên seal, chính hãng Bandai)",
    description:
      "Mô hình Gundam PG Unleashed RX-78-2 tỷ lệ 1/60 đỉnh cao công nghệ Gunpla từ Bandai Spirits. Hàng nguyên seal 100% nhập khẩu chính hãng Nhật Bản, hộp sắc cạnh không móp méo, đầy đủ tem mác phân phối. Phiên bản khung xương kim loại nhiều lớp, hệ thống LED đa điểm và decal nước cao cấp. Giao hàng đóng gói chống sốc 3 lớp chuyên dụng cho collector.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWJlaxxJClkCot33mDN36D366mO1JB0TZU2OHyJwEcJyOoGbfpZzZ1JyN2iReQ-qP9md167cR1JJMOYgN2gylc00IpZ_nAsafA6ETVuk7YMXj-HWcLbiNjs2P9vFVblgYFQMa4YfxzDkdoV-EYI5w7EnQscEN2qLBfIOWP2e6Jol_3054U5cOmBmPJgMv1IRa9D5JSwr9BSgMsEkgsgk8AzBn_BXQtSWMg6RJu2ZxhIyIz2rIhjOfB",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80",
    ],
    editionBadge: "Perfect Grade Unleashed • 1/60 Scale",
    status: "live",
    badge: "hot",
    currentPrice: 3500000,
    startingPrice: 2800000,
    minIncrement: 50000,
    timeLeftSeconds: 8140, // ~02:15:40
    bidCount: 12,
    category: "anime",
    attributes: [
      { label: "Thương hiệu", value: "Bandai Spirits" },
      { label: "Tỷ lệ / Kích thước", value: "1/60 PG (~30cm)" },
      { label: "Tình trạng", value: "Nguyên seal 100%", isHighlight: true },
      { label: "Xuất xứ", value: "Nhật Bản (Made in Japan)" },
      { label: "Vật liệu", value: "PS, ABS, Kim loại & LED" },
      { label: "Đóng gói", value: "Hộp xốp + Thùng carton 5 lớp" },
    ],
    seller: {
      name: "GunplaMaster_Store",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAlILujOJZIGrTUz8EZ8wk6LJAc42x-d_sbHByRHS9sq8Ac7svvaXI9aHTv-eciUgrjJBtaju4qElyhuIay6W3vUBxvGiboRshJiP7gjnP6gVlYNf-E7KcdSfsVio3w-kf-buKyksjGRWci8f_VBKc5ZRG09ei7rXKkUhJEsPOr7pQW9Gq2IYUFDuVkm81_yldh0lbx3mZHEss4uc8qyVbZXB0IvjZrWmbjVJAQM1MeajyTaTMedCNw",
      rating: 4.9,
      reviewsCount: "2.4k",
      responseTime: "Phản hồi trong vài phút",
      isVerified: true,
    },
    bidHistory: [
      {
        id: "b-1",
        bidderName: "V***h",
        avatarText: "V***h",
        amount: 3500000,
        timeAgo: "Vừa xong",
      },
      {
        id: "b-2",
        bidderName: "H***g",
        avatarText: "H***g",
        amount: 3400000,
        timeAgo: "6 phút trước",
      },
      {
        id: "b-3",
        bidderName: "Q***n",
        avatarText: "Q***n",
        amount: 3200000,
        timeAgo: "15 phút trước",
      },
      {
        id: "b-4",
        bidderName: "T***ng",
        avatarText: "T***ng",
        amount: 3000000,
        timeAgo: "30 phút trước",
      },
    ],
  },
  "auc-2": {
    id: "auc-2",
    code: "AUCN-88392",
    title: "Thẻ bài Charizard Base Set 1st Edition PSA 9 - Không một vết xước",
    description:
      "Thẻ bài Charizard Shadowless 1st Edition nguyên bản phát hành năm 1999, được giám định và niêm phong trong slab acrylic đạt chứng nhận PSA 9 (Mint). Bề mặt lấp lánh phản quang hoàn mỹ, centering cân đối tuyệt đối 50/50, 4 góc sắc nhọn không mòn trắng cạnh. Tặng kèm bao chống trầy toploader cao cấp.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTuliBgAtHkLKBZcfg34MdXjWe5ZItYR8tmF-8RIqjSsdj2qt5_2K0JCFzC9Y3o9ol-8A8GNsKjDzgYHkKmwLS0LGCu8TFxKFnUmgOE4B5JZgv4EVrDS2iVAZ75j5ewYG-9R8A89alOak-GkNZdca6GPShmdlXEyQXM7q1XuZpsG6EJ5VP-QoewPDWhCtRvTNbxID67KG2VPUMAqxHiGTMOPufk2TghcZuM_fesicgIG2MSV5EI9P6",
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&auto=format&fit=crop&q=80",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJUUbg3U97QhRcok37QRfFPhzj75iNGQ17PFfuw2TR-zfZCbBqn2PoG41_3PvSuI8ZXhswwW5ox1kGwRDqbJy3k66MRvo0OLhILYaHqVs3E30tE9C0Vgd2HuDEulifdp2ffBhntbv9jeQrMnuwuz2EngWHQeQe0_pBoMiTEFZ_1GVgLNIRxJgLpPWzg6L2BYLtTNLdiM6wacsN8_K70dEJRb_tJfXc9jcKluJgMlEzv7tR68-6wSKz",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyAOKQcdBOalvpUARGmJ5s7ssI0-mXb2rvGB6w8Vce8yb4navLSEEO4StkEcRifi4qSZG5iXc-r_a53bEN7nPFF0b0jJBJu03KchWaaJHP2-thHwaSffZLm7NsoCY1ghOkaLhfeylT1Gu1gzmAQzYU62FPH4JxD3nquMX3RdH6nL-PAxpSUjAXVGa6BKbl70BPgGHASLsgn6gkCtjNUk2dGALdGw3ePQDh3P7mR8JE4gOtzbvLvb_K",
    ],
    editionBadge: "PSA 9 Mint • 1st Edition Shadowless",
    status: "live",
    badge: "rare",
    currentPrice: 15200000,
    startingPrice: 8000000,
    minIncrement: 100000,
    timeLeftSeconds: 312, // ~00:05:12 (urgent)
    bidCount: 45,
    category: "tcg",
    attributes: [
      { label: "Bộ phát hành", value: "Base Set 1999" },
      { label: "Giám định", value: "PSA 9 (Mint)", isHighlight: true },
      { label: "Chứng chỉ", value: "PSA Cert #48920194" },
      { label: "Phiên bản", value: "1st Edition Shadowless" },
      { label: "Ngôn ngữ", value: "Tiếng Anh (English)" },
      { label: "Bảo quản", value: "Slab Acrylic + Sleeve UV" },
    ],
    seller: {
      name: "PokemonVault_VN",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAlILujOJZIGrTUz8EZ8wk6LJAc42x-d_sbHByRHS9sq8Ac7svvaXI9aHTv-eciUgrjJBtaju4qElyhuIay6W3vUBxvGiboRshJiP7gjnP6gVlYNf-E7KcdSfsVio3w-kf-buKyksjGRWci8f_VBKc5ZRG09ei7rXKkUhJEsPOr7pQW9Gq2IYUFDuVkm81_yldh0lbx3mZHEss4uc8qyVbZXB0IvjZrWmbjVJAQM1MeajyTaTMedCNw",
      rating: 5.0,
      reviewsCount: "1.8k",
      responseTime: "Phản hồi trong 1 phút",
      isVerified: true,
    },
    bidHistory: [
      {
        id: "b-1",
        bidderName: "P***k",
        avatarText: "P***k",
        amount: 15200000,
        timeAgo: "Vừa xong",
      },
      {
        id: "b-2",
        bidderName: "A***n",
        avatarText: "A***n",
        amount: 15000000,
        timeAgo: "2 phút trước",
      },
      {
        id: "b-3",
        bidderName: "K***m",
        avatarText: "K***m",
        amount: 14500000,
        timeAgo: "5 phút trước",
      },
    ],
  },
  "auc-4": {
    id: "auc-4",
    code: "AUCN-88394",
    title: "Photocard Jungkook BTS Butter Album - Bản phát hành đặc biệt giới hạn",
    description:
      "Card chính hãng pull trực tiếp từ album Butter đợt preorder đầu tiên từ Weverse Shop. Đã được bọc double sleeve + toploader bảo quản cẩn thận ngay từ khi unbox. Không cấn mòn, không xước defect, bề mặt láng bóng hoàn hảo. Gói hàng kỹ lưỡng bằng carton cứng và bubble wrap nhiều lớp kèm quà tặng freebies xinh xắn.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4DT0u4RCo1ATY8gUKQI_qL2MSE2U6TACCBUwG7LXS-ksU2yVC2VyMV1ybd6zKWQtjSry1Yn1XdTuYqqpPbGyZqfszEF8KZtHZHYpFELBm_5PfDxzzeUkHinY1G7Ye3LqGKohPRP2swr30TEMAWMrXAjRwvhx8A9DX1zbxWUGke2XkpNCci_2xKn3r-Wo8mRm5vgAxRP0SWHj42PBWSsmN5Q6hm303UDdXQnmA_MBu0nrz9xQpZD3J",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-eK0VcyVhGRnd0qTDDFdA00qNB4MC53k4zzfRGyDkOIDhGi0ujT-ZgQrJ5wcsd5Hsl92vkjpRfUHrffOjlZzd0kJF_D7X_tCGyofLN8OIB6YK-BHyfl-MmGUJQ_w2Y3rHewnkPo4unV33AHjosHTSTKb-2vhul7B7bqAAGQcLgaUKx30oUl96WI2uUNBi06mnqm5visRfTUGLQLDAbEDjlIJhw97Wt-jO1KC3k5AQuvTTOMwYjL36",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyAOKQcdBOalvpUARGmJ5s7ssI0-mXb2rvGB6w8Vce8yb4navLSEEO4StkEcRifi4qSZG5iXc-r_a53bEN7nPFF0b0jJBJu03KchWaaJHP2-thHwaSffZLm7NsoCY1ghOkaLhfeylT1Gu1gzmAQzYU62FPH4JxD3nquMX3RdH6nL-PAxpSUjAXVGa6BKbl70BPgGHASLsgn6gkCtjNUk2dGALdGw3ePQDh3P7mR8JE4gOtzbvLvb_K",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0ISlp_DQpBq694-bDHMSBLmB_INa6VRPPibmhnZAn1aQKhHgklatNKmzTRN37QToBu2nLev-bPa167zazPk8fpjDA_QTDDEAIx7jTXAmJV1SbxSnx9lC6K7ymSiy-9UEwJWZrdFi7MA0SOan5sZUrTXNaJinzhCFr_Nw4JjHaq3-DOqBEkktUsQDr-cm73f33R9rg9yqkcf4spllqk-P3nPaLStcCxHdos1GECfCXasWKee1K6JVS",
    ],
    editionBadge: "Holographic POB Edition • Weverse Official",
    status: "live",
    currentPrice: 1200000,
    startingPrice: 600000,
    minIncrement: 20000,
    timeLeftSeconds: 44410, // ~12:20:10
    bidCount: 8,
    category: "kpop",
    attributes: [
      { label: "Fandom / Group", value: "BTS (Bangtan Sonyeondan)" },
      { label: "Thành viên", value: "Jungkook (Jeon Jung-kook)" },
      { label: "Tình trạng", value: "Mint / 99.9%", isHighlight: true },
      { label: "Album", value: "Butter Single Album" },
      { label: "Nguồn gốc", value: "Weverse Shop POB Official" },
      { label: "Bảo quản", value: "Double Sleeve + Toploader" },
    ],
    seller: {
      name: "MoonBunny_Store",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAlILujOJZIGrTUz8EZ8wk6LJAc42x-d_sbHByRHS9sq8Ac7svvaXI9aHTv-eciUgrjJBtaju4qElyhuIay6W3vUBxvGiboRshJiP7gjnP6gVlYNf-E7KcdSfsVio3w-kf-buKyksjGRWci8f_VBKc5ZRG09ei7rXKkUhJEsPOr7pQW9Gq2IYUFDuVkm81_yldh0lbx3mZHEss4uc8qyVbZXB0IvjZrWmbjVJAQM1MeajyTaTMedCNw",
      rating: 4.9,
      reviewsCount: "1.2k",
      responseTime: "Phản hồi trong vài phút",
      isVerified: true,
    },
    bidHistory: [
      {
        id: "b-1",
        bidderName: "T***g",
        avatarText: "T***g",
        amount: 1200000,
        timeAgo: "Vừa xong",
      },
      {
        id: "b-2",
        bidderName: "L***a",
        avatarText: "L***a",
        amount: 1150000,
        timeAgo: "5 phút trước",
      },
      {
        id: "b-3",
        bidderName: "M***i",
        avatarText: "M***i",
        amount: 1000000,
        timeAgo: "12 phút trước",
      },
    ],
  },
};

// Default fallback item if id is not found
export function getAuctionDetailById(id: string): AuctionDetailItem {
  if (sampleAuctionDetails[id]) {
    return sampleAuctionDetails[id];
  }
  // Generate reasonable mock detail using the id
  return {
    id,
    code: `AUCN-${id.toUpperCase()}`,
    title: "Vật phẩm Đấu Giá Giới Hạn Fandom GomGoods",
    description:
      "Vật phẩm đấu giá độc quyền trên GomGoods. Tình trạng hoàn hảo, nguyên seal hoặc bảo quản chuyên nghiệp. Được xác thực bởi đội ngũ chuyên gia của chúng tôi.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWJlaxxJClkCot33mDN36D366mO1JB0TZU2OHyJwEcJyOoGbfpZzZ1JyN2iReQ-qP9md167cR1JJMOYgN2gylc00IpZ_nAsafA6ETVuk7YMXj-HWcLbiNjs2P9vFVblgYFQMa4YfxzDkdoV-EYI5w7EnQscEN2qLBfIOWP2e6Jol_3054U5cOmBmPJgMv1IRa9D5JSwr9BSgMsEkgsgk8AzBn_BXQtSWMg6RJu2ZxhIyIz2rIhjOfB",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&auto=format&fit=crop&q=80",
    ],
    editionBadge: "Limited Edition • Official Verified",
    status: "live",
    currentPrice: 850000,
    startingPrice: 500000,
    minIncrement: 20000,
    timeLeftSeconds: 5400,
    bidCount: 9,
    category: "general",
    attributes: [
      { label: "Phân loại", value: "Vật phẩm sưu tầm" },
      { label: "Tình trạng", value: "Tuyệt hảo (99%)", isHighlight: true },
      { label: "Xác thực", value: "100% Chính hãng" },
    ],
    seller: {
      name: "GomGoods_Official",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAlILujOJZIGrTUz8EZ8wk6LJAc42x-d_sbHByRHS9sq8Ac7svvaXI9aHTv-eciUgrjJBtaju4qElyhuIay6W3vUBxvGiboRshJiP7gjnP6gVlYNf-E7KcdSfsVio3w-kf-buKyksjGRWci8f_VBKc5ZRG09ei7rXKkUhJEsPOr7pQW9Gq2IYUFDuVkm81_yldh0lbx3mZHEss4uc8qyVbZXB0IvjZrWmbjVJAQM1MeajyTaTMedCNw",
      rating: 5.0,
      reviewsCount: "3.5k",
      responseTime: "Phản hồi trong 1 phút",
      isVerified: true,
    },
    bidHistory: [
      {
        id: "b-1",
        bidderName: "U***r",
        avatarText: "U***r",
        amount: 850000,
        timeAgo: "Vừa xong",
      },
      {
        id: "b-2",
        bidderName: "M***i",
        avatarText: "M***i",
        amount: 800000,
        timeAgo: "10 phút trước",
      },
    ],
  };
}
