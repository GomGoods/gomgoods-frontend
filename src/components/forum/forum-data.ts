export type ForumCategory =
  | "all"
  | "cbgd"
  | "gtt"
  | "pass"
  | "collection"
  | "review";

export interface ForumAuthor {
  name: string;
  avatar: string;
  badge?: string;
  badgeType?: "primary" | "secondary" | "admin" | "verified";
  rating?: number;
  role?: string;
}

export interface ForumComment {
  id: string;
  author: ForumAuthor;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface ForumPost {
  id: string;
  author: ForumAuthor;
  createdAt: string;
  category: ForumCategory;
  categoryTag: string;
  title?: string;
  content: string;
  priceRange?: string;
  hashtags: string[];
  images: string[];
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  comments: ForumComment[];
  isHot?: boolean;
  isSafe?: boolean;
}

export interface ForumTopic {
  tag: string;
  name: string;
  description: string;
  category: ForumCategory;
  iconBg: string;
  iconColor: string;
  iconType: "alert" | "price" | "tag" | "collection" | "star";
  postCount: number;
}

export interface TrendingFandom {
  rank: number;
  name: string;
  postsToday: string;
  tag: string;
}

export interface TopContributor {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  role: string;
  borderClass: string;
  postCount: number;
}

export const sampleTopics: ForumTopic[] = [
  {
    tag: "#CBGD",
    name: "Cảnh báo giao dịch",
    description: "Cảnh báo scammer, nguồn hàng fake",
    category: "cbgd",
    iconBg: "bg-error-container text-error",
    iconColor: "text-error",
    iconType: "alert",
    postCount: 142,
  },
  {
    tag: "#GTT",
    name: "Giá trị thực (Price Check)",
    description: "Hỏi giá thị trường, định giá card/figure",
    category: "gtt",
    iconBg: "bg-secondary-container text-on-secondary-container",
    iconColor: "text-secondary",
    iconType: "price",
    postCount: 389,
  },
  {
    tag: "#PASS",
    name: "Pass đồ / Bán lại",
    description: "Pass deal tốt, nhượng slot gom order",
    category: "pass",
    iconBg: "bg-tertiary-container text-on-tertiary-container",
    iconColor: "text-tertiary",
    iconType: "tag",
    postCount: 820,
  },
  {
    tag: "#COLLECTION",
    name: "Khoe bộ sưu tập",
    description: "Góc khoe góc decor, unboxing figure",
    category: "collection",
    iconBg: "bg-surface-variant text-primary",
    iconColor: "text-primary",
    iconType: "collection",
    postCount: 512,
  },
];

export const sampleTrendingFandoms: TrendingFandom[] = [
  {
    rank: 1,
    name: "Blackpink Photocards",
    postsToday: "1.2k bài hôm nay",
    tag: "#blackpink",
  },
  {
    rank: 2,
    name: "Popmart Labubu",
    postsToday: "856 bài hôm nay",
    tag: "#labubu",
  },
  {
    rank: 3,
    name: "Genshin Impact Merch",
    postsToday: "643 bài hôm nay",
    tag: "#genshin",
  },
  {
    rank: 4,
    name: "One Piece TCG Card",
    postsToday: "419 bài hôm nay",
    tag: "#onepiece",
  },
  {
    rank: 5,
    name: "Skullpanda Series",
    postsToday: "310 bài hôm nay",
    tag: "#skullpanda",
  },
];

export const sampleTopContributors: TopContributor[] = [
  {
    id: "user-1",
    name: "Trang Meow",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    rating: 4.9,
    role: "Collector Kpop",
    borderClass: "border-primary",
    postCount: 148,
  },
  {
    id: "user-2",
    name: "Huy Collect",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    rating: 4.8,
    role: "Popmart Hunter",
    borderClass: "border-secondary",
    postCount: 96,
  },
  {
    id: "user-3",
    name: "Minh Vy Anime",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
    rating: 5.0,
    role: "Figure Authenticator",
    borderClass: "border-tertiary",
    postCount: 215,
  },
  {
    id: "user-4",
    name: "Khang CardBo",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    rating: 4.7,
    role: "TCG Trader",
    borderClass: "border-outline",
    postCount: 84,
  },
];

export const initialPosts: ForumPost[] = [
  {
    id: "post-1",
    author: {
      name: "Minh Khang",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80",
      badge: "Uy tín",
      badgeType: "verified",
      rating: 4.9,
    },
    createdAt: "2 giờ trước",
    category: "cbgd",
    categoryTag: "#CBGD - CẢNH BÁO",
    content:
      "Góc cảnh báo cho anh em newbie. Tên facebook: **Nguyễn Văn A**, stk: **123456789 MB Bank**. Chuyên dùng ảnh fake để scam card bo góc Kpop. Mọi người chú ý check kĩ legit trước khi giao dịch nhé. Bài học 500k của mình 😭",
    hashtags: ["#scammer", "#kpop", "#photocard", "#canhbao"],
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    ],
    likesCount: 124,
    commentsCount: 45,
    isLiked: false,
    isSaved: true,
    isHot: true,
    isSafe: false,
    comments: [
      {
        id: "c1",
        author: {
          name: "Ngọc Lan",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        },
        content:
          "Thằng này tuần trước cũng mới nhắn tin gạ pass card Jennie concert cho mình mà bị mình bắt thóp quay video kèm giờ báo thức, nó chặn luôn!",
        createdAt: "1 giờ trước",
        likes: 12,
        isLiked: true,
      },
      {
        id: "c2",
        author: {
          name: "Hoàng Long",
          avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
        },
        content:
          "Cảm ơn bạn đã cảnh báo! Mọi người nên giao dịch qua ví giữ tiền GomGoods để bảo hiểm 100% cho an tâm.",
        createdAt: "30 phút trước",
        likes: 8,
      },
    ],
  },
  {
    id: "post-2",
    author: {
      name: "Linh Nhi Collections",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
      badge: "Top Seller",
      badgeType: "secondary",
      rating: 5.0,
    },
    createdAt: "5 giờ trước",
    category: "pass",
    categoryTag: "#PASS - BÁN LẠI",
    content:
      "Pass dọn tủ vài bé blindbox Popmart chính hãng. Tình trạng như hình, khui hộp check card chưa xé seal túi dính. Gdtt tại Q1 HCM hoặc ship COD có cọc nha. Inbox để lấy video quay chi tiết hoặc đặt trực tiếp qua sàn.",
    priceRange: "250.000đ - 350.000đ",
    hashtags: ["#popmart", "#blindbox", "#skullpanda", "#labubu"],
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80",
    ],
    likesCount: 342,
    commentsCount: 89,
    isLiked: true,
    isSaved: false,
    isHot: true,
    isSafe: true,
    comments: [
      {
        id: "c3",
        author: {
          name: "Tuấn Anh",
          avatar:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
        },
        content: "Bé Skullpanda màu tím còn slot không shop ơi? Mình ở Bình Thạnh ship trong ngày được không?",
        createdAt: "4 giờ trước",
        likes: 4,
      },
      {
        id: "c4",
        author: {
          name: "Linh Nhi Collections",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
        },
        content: "@Tuấn Anh Dạ còn nha b ơi, b bấm nút 'Nhắn tin' phía dưới card để mình gửi clip check seal nhé ạ!",
        createdAt: "3 giờ trước",
        likes: 6,
      },
    ],
  },
  {
    id: "post-3",
    author: {
      name: "Trang Meow",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      badge: "Uy tín",
      badgeType: "verified",
      rating: 4.9,
    },
    createdAt: "8 giờ trước",
    category: "collection",
    categoryTag: "#COLLECTION - BỘ SƯU TẬP",
    content:
      "Sau 2 năm kiên trì lùng sục khắp các group và sàn GomGoods thì cuối cùng cũng full set photocard Born Pink World Tour của Rosé 🌹 Cảm ơn các seller uy tín trên sàn đã hỗ trợ nhiệt tình!",
    hashtags: ["#blackpink", "#rose", "#collection", "#photocard"],
    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    ],
    likesCount: 518,
    commentsCount: 62,
    isLiked: false,
    isSaved: false,
    isHot: true,
    isSafe: true,
    comments: [
      {
        id: "c5",
        author: {
          name: "Hà My",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        },
        content: "Đẹp xỉu chị ơiii, mê nhất card POB đợt concert Seoul, nhìn góc sáng óng ánh mê mẩn luôn.",
        createdAt: "6 giờ trước",
        likes: 7,
      },
    ],
  },
  {
    id: "post-4",
    author: {
      name: "Duy TCG Master",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80",
      badge: "Chuyên gia TCG",
      badgeType: "admin",
      rating: 4.9,
    },
    createdAt: "1 ngày trước",
    category: "gtt",
    categoryTag: "#GTT - CHECK GIÁ TRỊ THỰC",
    content:
      "Nhờ anh em trong hội check giúp lá Luffy Manga Art OP-05 này góc bo viền có bị cấn tì vết nào không ạ? Thị trường hiện tại giá dao động tầm bao nhiêu để mình deal lại với seller nước ngoài?",
    hashtags: ["#onepiece", "#tcg", "#pricecheck", "#luffymanga"],
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    ],
    likesCount: 97,
    commentsCount: 31,
    isLiked: false,
    isSaved: false,
    isHot: false,
    isSafe: true,
    comments: [
      {
        id: "c6",
        author: {
          name: "Quốc Huy",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        },
        content:
          "Lá này bản Nhật mint 10 đang dao động tầm 8-9 củ nha bác. Viền trên góc phải hơi xước nhẹ 1 xíu nếu nhìn kĩ dưới đèn UV, bác nhớ xin seller thêm clip quay flash nhé.",
        createdAt: "22 giờ trước",
        likes: 15,
      },
    ],
  },
];
