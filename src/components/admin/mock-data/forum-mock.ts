export type ForumPostStatus = "published" | "hidden";

export interface ForumComment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  isHidden: boolean;
}

export interface ForumReport {
  id: string;
  reporter: string;
  reporterAvatar?: string;
  reason: string;
  createdAt: string;
  status: "pending" | "resolved";
}

export interface AdminForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
    name: string;
    avatar: string;
  };
  hashtags: string[];
  images: string[];
  commentsCount: number;
  reactionsCount: number;
  reportsCount: number;
  status: ForumPostStatus;
  createdAt: string;
  comments: ForumComment[];
  reports: ForumReport[];
}

export const FORUM_TAG_OPTIONS = ["#CBGD", "#CNGD", "#GTT", "#CheckLegit", "#ReviewStore"];

export const MOCK_ADMIN_FORUM_POSTS: AdminForumPost[] = [
  {
    id: "post-001",
    title: "[CẢNH BÁO] Cảnh giác tài khoản giả mạo seller uy tín lừa cọc card POB Born Pink",
    content: "Mọi người lưu ý tài khoản clone @rose_stan99_real đang chủ động nhắn tin báo có card Jisoo POB giá rẻ yêu cầu chuyển khoản ngoài sàn trước. Các bạn tuyệt đối chỉ giao dịch qua GomPay Escrow để được bảo vệ quyền lợi nhé!",
    author: {
      id: "usr-001",
      username: "rose_stan99",
      name: "Nguyễn Thảo Vy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    hashtags: ["#CBGD", "#CheckLegit"],
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
    ],
    commentsCount: 28,
    reactionsCount: 142,
    reportsCount: 0,
    status: "published",
    createdAt: "2024-05-18T10:30:00Z",
    comments: [
      {
        id: "com-1",
        author: "Minh Quân (@quan_merch)",
        authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        content: "Cảm ơn bạn đã cảnh báo, suýt nữa mình cũng chuyển khoản riêng cho tài khoản clone đó.",
        createdAt: "2024-05-18 11:05",
        isHidden: false,
      },
      {
        id: "com-2",
        author: "Bích Ngọc (@ngoc_blackpink)",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        content: "Cứ qua escrow sàn giữ tiền nhận hàng kiểm tra ok mới thanh toán là an toàn nhất.",
        createdAt: "2024-05-18 11:20",
        isHidden: false,
      },
    ],
    reports: [],
  },
  {
    id: "post-002",
    title: "[FEEDBACK] Cảm ơn shop ToyMaster giao mô hình Nendoroid siêu tốc bọc 5 lớp xốp",
    content: "Vừa nhận được em Gojo Satoru từ shop @ToyMaster_VN. Hộp góc cạnh sắc lẹm không một vết tì vết, đóng gói có tâm nhất quả đất. Sẽ tiếp tục ủng hộ shop dài dài!",
    author: {
      id: "usr-012",
      username: "miku_fan_hn",
      name: "Đỗ Quốc Việt",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    hashtags: ["#CNGD", "#ReviewStore"],
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    ],
    commentsCount: 14,
    reactionsCount: 89,
    reportsCount: 0,
    status: "published",
    createdAt: "2024-05-17T15:40:00Z",
    comments: [
      {
        id: "com-3",
        author: "ToyMaster_VN",
        authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80",
        content: "Cảm ơn bạn Việt đã tin tưởng và ủng hộ cửa hàng ạ! Chúc bạn có trải nghiệm tuyệt vời cùng em Gojo nhé.",
        createdAt: "2024-05-17 16:00",
        isHidden: false,
      },
    ],
    reports: [],
  },
  {
    id: "post-003",
    title: "[GÓC TÌM KIẾM] Tìm card Bo góc Chaewon Fearless ver Black Petrol hoặc trade card Sakura",
    content: "Mình còn dư 1 card Sakura ver Blue Kitsch nguyên sleeve, muốn trade 1-1 lấy card Chaewon ver Black Petrol hoặc mua thẳng nếu bạn nào pass giá hữu nghị tại khu vực TP.HCM.",
    author: {
      id: "usr-015",
      username: "lesserafim_stan",
      name: "Trần Bảo Vy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    hashtags: ["#GTT"],
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    ],
    commentsCount: 9,
    reactionsCount: 35,
    reportsCount: 0,
    status: "published",
    createdAt: "2024-05-16T09:15:00Z",
    comments: [],
    reports: [],
  },
  {
    id: "post-004",
    title: "[BỊ BÁO CÁO] Spam link cá cược trong phần bình luận trao đổi card",
    content: "Tham gia nhóm nhận ngay 500k thẻ cào miễn phí tại link bên dưới...",
    author: {
      id: "usr-099",
      username: "bot_spammer_99",
      name: "Tài khoản Quảng cáo",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    },
    hashtags: ["#CBGD"],
    images: [],
    commentsCount: 0,
    reactionsCount: 0,
    reportsCount: 8,
    status: "hidden",
    createdAt: "2024-05-15T08:00:00Z",
    comments: [],
    reports: [
      {
        id: "forep-1",
        reporter: "@rose_stan99",
        reason: "Spam link lừa đảo / cờ bạc trái phép",
        createdAt: "2024-05-15 08:20",
        status: "resolved",
      },
    ],
  },
];
