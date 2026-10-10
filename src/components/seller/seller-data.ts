import type { ProductItem } from "@/components/product/ProductCard";
import { sampleMarketplaceProducts } from "@/components/marketplace/marketplace-data";
import { sampleProducts as sampleHomeProducts } from "@/components/home/home-products-data";

export interface SellerReviewItem {
  id: string;
  authorName: string;
  authorAvatar?: string;
  initial: string;
  rating: number;
  timeAgo: string;
  comment: string;
  photo?: string;
}

export interface SellerFeedPost {
  id: string;
  createdAt: string;
  content: string;
  tag?: string;
  isPinned?: boolean;
  images?: string[];
  likesCount: number;
  commentsCount: number;
}

export interface SellerProfileData {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  isOnline: boolean;
  isPro: boolean;
  isStore: boolean;
  location: string;
  joinedDate: string;
  bio: string;
  title?: string;
  rules?: string;
  stats: {
    rating: number;
    reviewCount: string;
    soldCount: string;
    followersCount: string;
    responseRate: string;
    responseTime: string;
  };
  activeListingsCount: number;
  soldListingsCount: number;
  collectionCount: number;
  reviews: SellerReviewItem[];
  feedPosts: SellerFeedPost[];
}

export const sampleSellerOtakuHaven: SellerProfileData = {
  id: "otakuhaven",
  name: "OtakuHaven",
  title: "Bậc Thầy Mô Hình & Figure 👑",
  rules: "Khách vui lòng quay video unbox khi nhận hàng để được giải quyết khiếu nại. Ship COD toàn quốc khi cọc trước phí ship. Hàng thanh lý chuẩn auth 100%, hỗ trợ giữ slot tối đa 24h.",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBR2BKrW-sNTUNSn9bhd83OqAZO51f5jal-CtnIvebSf2KSriZLa7pbUAwJE0LGckrCepsyOa6iUW0lBVf20GpYvjzVzt3WYV-5b2X59MdraRyhn9OfVQPDU0d2R5v5tuCQsLeaHSXmX_ySR5aqRqp5EVhuEx386-sP8btcys-chNlAefQfks0x1rF0vHinYhjhkOK0T0hvXyytiUfTlPsdym4jBZV3Z1eShnoeBC1EnLwbRz5xgbiu",
  coverImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB9avoxZGB5hxvIs1XS5945qNmJgGMpjHeVMFd6AJU8dY4dWtTnR7iZj5_uBwUXPmhcDuGI9EzncU6rRdSr7eWMr1X7_f0Mh-VoTbAMcxMrLxoBpoIi9FZbp71VRqYuZBr4wX5sHl-t2xPxH4_Da9PUdkKhzPgsdiri2h7_P8UA4B5C47-EI3ttUMG0ET6R1sqEmUdu668RuEWjVlq-nkI96IOZHi0-emcdUU4T-9VsfFwK60Tk7Ym6",
  isOnline: true,
  isPro: true,
  isStore: true,
  location: "TP. Hồ Chí Minh",
  joinedDate: "Tham gia Thg 4, 2021",
  bio: "Khách vui lòng quay video unbox khi nhận hàng để được giải quyết khiếu nại. Ship COD toàn quốc khi cọc trước phí ship. Hàng thanh lý chuẩn auth 100%, hỗ trợ giữ slot tối đa 24h.",
  stats: {
    rating: 4.9,
    reviewCount: "1.2k",
    soldCount: "3,450",
    followersCount: "8.5k",
    responseRate: "98%",
    responseTime: "< 1 giờ",
  },
  activeListingsCount: 142,
  soldListingsCount: 3450,
  collectionCount: 3,
  reviews: [
    {
      id: "r-1",
      authorName: "KhoaNguyen99",
      initial: "K",
      rating: 5,
      timeAgo: "2 ngày trước",
      comment:
        "Shop đóng gói siêu kỹ, bọc 3 lớp bọt khí. Giao hàng hỏa tốc trong 2 tiếng. Figure đẹp mĩ mãn không tì vết!",
      photo:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQInD4pvd0Eutuq2WbHtVafoahVFLf6x-o_estQzUJHHtMgOlUxE6SiJDOmMy533zLAjUZm6IvLOnoL3vslk3td-H_ZDPqBdJkb4jl1TydqStGd1MirhmlbhYUoiCDQWyYGR0fcvW0v97r-nBFStI3alKpGn7kHe3_7PWnQZdO2Wwz5AlcwKwQvWmlEyaHd-3CHLMw3wC_DctLFJq2GUHNFrCCpTpH2OY0wjqblW1n0AnNtcw8tTl4",
    },
    {
      id: "r-2",
      authorName: "HuyenTr",
      initial: "H",
      rating: 5,
      timeAgo: "5 ngày trước",
      comment:
        "Chủ shop tư vấn nhiệt tình, deal giá ngon. Sẽ ủng hộ dài dài.",
    },
    {
      id: "r-3",
      authorName: "GamerVN",
      initial: "G",
      rating: 5,
      timeAgo: "1 tuần trước",
      comment:
        "Card nguyên seal chuẩn PSA 10, đóng gói hộp carton cứng cáp rất an tâm.",
    },
  ],
  feedPosts: [
    {
      id: "feed-1",
      createdAt: "Hôm nay lúc 14:30",
      tag: "Hàng mới về 📦",
      isPinned: true,
      content:
        "🔥 ĐỢT GOM HÀNG XẢ KHO THÁNG 9 VỪA ĐÁP TP.HCM!\n\nChào cả nhà, đợt kiện hàng Nhật gồm 80+ bé figure chính hãng (Nendoroid Miku, Scale Ganyu Apex, Gundam RG Hi-Nu) và card Pokemon bóc lẻ đã về tới kho an toàn. Shop đang tiến hành bọc bọt khí 3 lớp và đóng gói đơn trả anh em cọc trước.\n\nCác món lẻ chưa cọc sẽ được lên kệ tại tab 'Sản phẩm' trong tối nay. Anh em theo dõi shop để không bỏ lỡ deal hời nhé! ✨",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB9avoxZGB5hxvIs1XS5945qNmJgGMpjHeVMFd6AJU8dY4dWtTnR7iZj5_uBwUXPmhcDuGI9EzncU6rRdSr7eWMr1X7_f0Mh-VoTbAMcxMrLxoBpoIi9FZbp71VRqYuZBr4wX5sHl-t2xPxH4_Da9PUdkKhzPgsdiri2h7_P8UA4B5C47-EI3ttUMG0ET6R1sqEmUdu668RuEWjVlq-nkI96IOZHi0-emcdUU4T-9VsfFwK60Tk7Ym6",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkGu0JplirA6_8mwYDkXQmXGDtWdynRlzdg5h2OfrXru6Mj1GuRTyBOYbUIzPfA3X_g3Row0_ILZ9P-08rM1G--DRGCWIzv3SdAQxzdRJdBudP2Tvto1eEZ0UrNwcY20NsiUWrqHbcaNNS5sQEq558wQX24-p-vdokbjSE-Uia7EfJzQ2afAAAq3mbJ3NKzDKd2ojjuNF7V1WrMrTRhWkNa-9iROKIX8ZClY8Ul2_d-Ptqvb0pOfn",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA5QYEF4H6kj1JayYisb90V7-QRLkRUwvB2lvCCDA38Zn1CspWOnJ5olagNQ7OP3ttnVoVJWdPJOsX9pP78o_l-96cYcv9xFH75kLU0HF4eZJJonYD4B2rATeS0rt8hMe12waeHxnZVFg0opEBjCLKtSIxhLVS3tTXiODjfW9m5hQNc18bAG91CN3zMTSjr5b73TRFKUUm0H3K5dQ4SLSEXvgecR9GIHAL9Bfh1fuCsk9Nj7TDq1xfi",
      ],
      likesCount: 128,
      commentsCount: 24,
    },
    {
      id: "feed-2",
      createdAt: "2 ngày trước",
      tag: "Hậu trường & Cam kết 🎬",
      content:
        "Góc hậu trường đóng hàng hôm nay của shop! Mọi đơn hàng từ mô hình đến card bo góc đều được bọc tối thiểu 3 lớp bọt khí chống sốc + chèn túi khí xung quanh. Cam kết hàng đến tay các bạn nguyên vẹn 100%, góc cạnh sắc nét không móp méo.",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQInD4pvd0Eutuq2WbHtVafoahVFLf6x-o_estQzUJHHtMgOlUxE6SiJDOmMy533zLAjUZm6IvLOnoL3vslk3td-H_ZDPqBdJkb4jl1TydqStGd1MirhmlbhYUoiCDQWyYGR0fcvW0v97r-nBFStI3alKpGn7kHe3_7PWnQZdO2Wwz5AlcwKwQvWmlEyaHd-3CHLMw3wC_DctLFJq2GUHNFrCCpTpH2OY0wjqblW1n0AnNtcw8tTl4",
      ],
      likesCount: 95,
      commentsCount: 11,
    },
    {
      id: "feed-3",
      createdAt: "5 ngày trước",
      tag: "Thông báo chính sách 📢",
      content:
        "🎉 Tri ân khách hàng: Từ nay shop kích hoạt chương trình FREESHIP toàn quốc cho tất cả đơn hàng từ 500k. Ngoài ra, mỗi đơn hàng figure bất kỳ đều được tặng kèm 1 standee mini hoặc badge ngẫu nhiên. Chúc anh em săn được nhiều deal ưng ý!",
      likesCount: 164,
      commentsCount: 38,
    },
  ],
};

export const sampleSellerMikuShop: SellerProfileData = {
  id: "mikushop",
  name: "MikuShop",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDJogh0hCB-9uCpABAtLiDcprtV-LhusmkDEtpAPkEExwKzuHyB8dpDVIK2zTf6C4Z1Vyoqsd7ArdXjWMi7IETqqTFUlgfKSRk-3wmd0iAybcdVbuLptntpIkWemdmFIw2l12WiqHXcf78wyiRH7eIbqAyXvMHpEL_1h82QOjgDHgv72hcDzkdgAgiZQTXXspVdhgEN-OQz28Cy6BHzF3Fm3-dLIP33LC6786wF6RKKOIceJv9nMvyK",
  coverImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB9avoxZGB5hxvIs1XS5945qNmJgGMpjHeVMFd6AJU8dY4dWtTnR7iZj5_uBwUXPmhcDuGI9EzncU6rRdSr7eWMr1X7_f0Mh-VoTbAMcxMrLxoBpoIi9FZbp71VRqYuZBr4wX5sHl-t2xPxH4_Da9PUdkKhzPgsdiri2h7_P8UA4B5C47-EI3ttUMG0ET6R1sqEmUdu668RuEWjVlq-nkI96IOZHi0-emcdUU4T-9VsfFwK60Tk7Ym6",
  isOnline: true,
  isPro: true,
  isStore: true,
  location: "TP. Hồ Chí Minh",
  joinedDate: "Tham gia Thg 10, 2021",
  bio: "Pass lại figure Vocaloid, Scale figure chính hãng GSC, Alter, Max Factory. Nhận trade và giao lưu anh em cùng đam mê mô hình tại Sài Gòn.",
  stats: {
    rating: 4.9,
    reviewCount: "86",
    soldCount: "142",
    followersCount: "1.4k",
    responseRate: "100%",
    responseTime: "< 5 phút",
  },
  activeListingsCount: 38,
  soldListingsCount: 142,
  collectionCount: 5,
  reviews: [
    {
      id: "rm-1",
      authorName: "WibuLord99",
      initial: "W",
      rating: 5,
      timeAgo: "1 ngày trước",
      comment: "Bé Miku 15th đẹp mê ly, seal nguyên bản box phẳng lì 10/10.",
      photo:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQInD4pvd0Eutuq2WbHtVafoahVFLf6x-o_estQzUJHHtMgOlUxE6SiJDOmMy533zLAjUZm6IvLOnoL3vslk3td-H_ZDPqBdJkb4jl1TydqStGd1MirhmlbhYUoiCDQWyYGR0fcvW0v97r-nBFStI3alKpGn7kHe3_7PWnQZdO2Wwz5AlcwKwQvWmlEyaHd-3CHLMw3wC_DctLFJq2GUHNFrCCpTpH2OY0wjqblW1n0AnNtcw8tTl4",
    },
    {
      id: "rm-2",
      authorName: "FigureHunter",
      initial: "F",
      rating: 5,
      timeAgo: "3 ngày trước",
      comment: "Giao dịch trực tiếp nhanh gọn tại quận 1, chủ shop nhiệt tình mời cà phê.",
    },
  ],
  feedPosts: [
    {
      id: "feed-m1",
      createdAt: "Hôm qua lúc 19:15",
      tag: "Thông báo hàng về 📦",
      isPinned: true,
      content:
        "Miku 15th Anniversary Strawberry Dress và Nendoroid Gura đã có sẵn tại shop! Toàn bộ đều là hàng new seal box, có bill order chính hãng từ GSC. Các bạn có thể qua quận 1 kiểm tra trực tiếp hoặc ship COD toàn quốc nhé!",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAPZxaSk7LAN_cBJ3gAFKNbFAnjJDnnowcWghhQpr5ZyGxDSutyiygnSoC40_4rBkvr09OBGEEvJpfjuSUmHF9lQ1qi8JYMu5OiyA9CQ_wjA5y9ODQSUYIXSKc8SFBDMX0HjXzm9IQYdsrGURrWHuXUOjzOXPEjuRF3FW5PZ5je_Q8RLdIoj5089lfxvyoNxaI2CUlPkjKNVlrslRkKMLLZmE5Ur4Yjh7GGJV6g0cYcXsW3m82F_2ik",
      ],
      likesCount: 62,
      commentsCount: 9,
    },
  ],
};

export function getSellerProfileById(id: string): SellerProfileData {
  const cleanId = decodeURIComponent(id).toLowerCase().replace(/\s+/g, "-");

  if (cleanId === "otakuhaven") {
    return sampleSellerOtakuHaven;
  }
  if (cleanId === "mikushop" || cleanId.includes("miku")) {
    return sampleSellerMikuShop;
  }

  // Find in products
  const allProducts = [...sampleMarketplaceProducts, ...sampleHomeProducts];
  const matched = allProducts.find(
    (p) =>
      p.seller.name.toLowerCase().replace(/\s+/g, "-") === cleanId ||
      p.seller.name.toLowerCase() === cleanId
  );

  const displayName = matched
    ? matched.seller.name
    : decodeURIComponent(id)
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

  const isStore =
    displayName.toLowerCase().includes("shop") ||
    displayName.toLowerCase().includes("store");

  const defaultTitle = isStore
    ? "Gian Hàng Uy Tín 5★"
    : displayName.toLowerCase().includes("manga")
    ? "Tín Đồ Manga & Goods Hiếm 📚"
    : "Chiến Thần Thanh Lý 🌟";

  const defaultRules = `Khách vui lòng quay video unbox khi nhận kiện hàng để được giải quyết hỗ trợ khiếu nại. Nhận giữ slot tối đa 24h, ship COD toàn quốc khi cọc trước phí ship.`;

  return {
    ...sampleSellerOtakuHaven,
    id: cleanId,
    name: displayName,
    title: defaultTitle,
    rules: defaultRules,
    avatar: matched ? matched.seller.avatar : sampleSellerOtakuHaven.avatar,
    location: matched ? matched.seller.location : "Hà Nội",
    isStore,
    isPro: isStore,
    bio: defaultRules,
  };
}

export function getSellerProducts(sellerNameOrId: string): ProductItem[] {
  const clean = decodeURIComponent(sellerNameOrId).toLowerCase().replace(/\s+/g, "-");
  const allProducts = [...sampleMarketplaceProducts, ...sampleHomeProducts];

  const matched = allProducts.filter(
    (p) =>
      p.seller.name.toLowerCase().replace(/\s+/g, "-") === clean ||
      p.seller.name.toLowerCase() === clean
  );

  if (matched.length >= 2) {
    return matched;
  }

  // If not enough items, combine and return enriched list
  return allProducts.slice(0, 8);
}
