export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  isProSeller: boolean;
  isReputableBuyer: boolean;
  stats: {
    buyerReputation: number;
    sellerReputation: number;
    completedDeals: number;
    followers: string;
    following: number;
  };
}

export interface UserListingItem {
  id: string;
  title: string;
  price: number;
  condition: "NEW" | "LIKENEW" | "USED";
  image: string;
  category: string;
  createdAt: string;
  views: number;
  likes: number;
  status: "active" | "hidden" | "sold";
}

export interface UserOrder {
  id: string;
  orderCode: string;
  createdAt: string;
  status: "pending" | "shipping" | "completed" | "cancelled";
  sellerName: string;
  itemTitle: string;
  itemImage: string;
  totalPrice: number;
  quantity: number;
  trackingCode?: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  category: string;
  image: string;
  acquiredDate: string;
  rarity: string;
  status: "display" | "open_for_trade";
  estimatedValue?: number;
}

export interface ProfileReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
  itemTitle: string;
  role: "buyer" | "seller";
}

export const MOCK_USER_PROFILE: UserProfile = {
  id: "u-nguyen-collector",
  username: "nguyen_collector",
  displayName: "Nguyễn Vũ Hoàng",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  bio: "Passionate collector of vintage anime figures and rare TCG cards. Always open to trades. Will package your items like they are my own children 📦✨",
  location: "Hà Nội, VN",
  joinedDate: "01/2022",
  isProSeller: true,
  isReputableBuyer: true,
  stats: {
    buyerReputation: 4.9,
    sellerReputation: 5.0,
    completedDeals: 156,
    followers: "1.2k",
    following: 84,
  },
};

export const MOCK_USER_LISTINGS: UserListingItem[] = [
  {
    id: "lst-1",
    title: "Vintage Base Set Booster Box Sealed Japanese - Tình trạng hoàn hảo nguyên seal",
    price: 4500000,
    condition: "NEW",
    image:
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=600&q=80",
    category: "Thẻ bài TCG",
    createdAt: "2 ngày trước",
    views: 420,
    likes: 38,
    status: "active",
  },
  {
    id: "lst-2",
    title: "Evangelion Unit-01 Real Grade Model Kit Assembled - Đã dán decal nước & kẻ lằn",
    price: 850000,
    condition: "USED",
    image:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    category: "Mô hình & Gunpla",
    createdAt: "4 ngày trước",
    views: 310,
    likes: 19,
    status: "active",
  },
  {
    id: "lst-3",
    title: "Nendoroid Satoru Gojo Jujutsu Kaisen GoodSmile Authentic Fullbox phụ kiện",
    price: 1250000,
    condition: "LIKENEW",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    category: "Nendoroid & Chibi",
    createdAt: "1 tuần trước",
    views: 650,
    likes: 72,
    status: "active",
  },
  {
    id: "lst-4",
    title: "Charizard VMAX SSR Shiny Star V Gem Mint 10 PSA - Sưu tầm đỉnh cao",
    price: 3200000,
    condition: "NEW",
    image:
      "https://images.unsplash.com/photo-1607604775465-b778c1ee904a?auto=format&fit=crop&w=600&q=80",
    category: "Thẻ bài TCG",
    createdAt: "2 tuần trước",
    views: 890,
    likes: 95,
    status: "active",
  },
];

export const MOCK_USER_ORDERS: UserOrder[] = [
  {
    id: "ord-1",
    orderCode: "GG-2026-9812",
    createdAt: "16/09/2026",
    status: "shipping",
    sellerName: "Akira Hobby Store",
    itemTitle: "Mô hình One Piece Roronoa Zoro Wano Kuni Ichiban Kuji Masterlise",
    itemImage:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80",
    totalPrice: 1650000,
    quantity: 1,
    trackingCode: "GHN-8829104",
  },
  {
    id: "ord-2",
    orderCode: "GG-2026-9410",
    createdAt: "10/09/2026",
    status: "completed",
    sellerName: "Tokyo Cards VN",
    itemTitle: "Pack Thẻ bài Pokemon Scarlet & Violet 151 Japanese Booster Pack x5",
    itemImage:
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=400&q=80",
    totalPrice: 450000,
    quantity: 5,
    trackingCode: "VTP-449102",
  },
  {
    id: "ord-3",
    orderCode: "GG-2026-8921",
    createdAt: "28/08/2026",
    status: "completed",
    sellerName: "Otaku Land",
    itemTitle: "Scale 1/7 Hatsune Miku Symphony 5th Anniversary Ver. Good Smile Company",
    itemImage:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
    totalPrice: 3890000,
    quantity: 1,
    trackingCode: "SPX-112093",
  },
];

export const MOCK_USER_COLLECTIONS: CollectionItem[] = [
  {
    id: "col-1",
    title: "Hatsune Miku 1/7 Scale 10th Anniversary Memorial Box",
    category: "Scale Figure",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    acquiredDate: "2023",
    rarity: "Grail / Limited",
    status: "display",
    estimatedValue: 7500000,
  },
  {
    id: "col-2",
    title: "Pikachu Illustrator Promo Card Reprint Japanese Gold Foil",
    category: "TCG Card",
    image:
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=600&q=80",
    acquiredDate: "2024",
    rarity: "Ultra Rare",
    status: "open_for_trade",
    estimatedValue: 4200000,
  },
  {
    id: "col-3",
    title: "Metal Build Gundam Exia Repair IV Graham Custom",
    category: "Mecha / Die-cast",
    image:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    acquiredDate: "2022",
    rarity: "Tamashii Exclusive",
    status: "display",
    estimatedValue: 6800000,
  },
];

export const MOCK_USER_REVIEWS: ProfileReview[] = [
  {
    id: "rev-1",
    authorName: "Minh Triết Fandom",
    authorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "14/09/2026",
    comment:
      "Gói hàng siêu kỹ càng, quấn bubble wrap 5 lớp góc cạnh không tì vết! Chủ shop nói chuyện cực kỳ nhiệt tình và am hiểu fandom.",
    itemTitle: "Vintage Base Set Booster Box Sealed Japanese",
    role: "buyer",
  },
  {
    id: "rev-2",
    authorName: "Linh Lan Figure Store",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "05/09/2026",
    comment:
      "Người mua rất uy tín, chuyển khoản cọc dứt khoát nhanh chóng. Hy vọng sẽ tiếp tục giao dịch nhiều lần sau nữa!",
    itemTitle: "Scale 1/7 Hatsune Miku Symphony",
    role: "seller",
  },
  {
    id: "rev-3",
    authorName: "Quang Gundam",
    authorAvatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "22/08/2026",
    comment:
      "Kit ráp đẹp, khớp chắc chắn và đầy đủ phụ kiện như miêu tả. 10/10 điểm cho bạn seller có tâm!",
    itemTitle: "Evangelion Unit-01 Real Grade Model Kit",
    role: "buyer",
  },
];
