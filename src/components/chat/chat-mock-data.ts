import type { Conversation } from "./types";

export const initialConversations: Conversation[] = [
  {
    id: "conv-1",
    partner: {
      id: "u-toymaster",
      name: "ToyMaster_VN",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD3aMO1oJMVWYs-ynapHTymrBINEJDWiuK4c1dJu1koDuk0p_BGZcgDE_gf41J1KZ4uHK0VEDyKVVCrmkbVJAoOrizSzyrqmB49LU-OAYaJV7RUC_P8bRcb0KVGwH_pZNtkPA7C0SfBw8V_Dvqvv9DJyk0_j0_vsnbci53IwOquQcaEETOJXwQ_X4gKmRAt48tAQfZDfpIbZcG7tyC07hOmYhVhP-_vzw6YdE9tgocO14FxljP0Wdm6",
      isOnline: true,
      role: "Seller",
    },
    lastMessage: "Vâng, hộp còn nguyên seal niêm phong. Mình có thể gửi ngay trong hôm nay ạ.",
    lastMessageTime: "10:42 AM",
    unreadCount: 0,
    product: {
      id: "prod-eva-01",
      title: "Limited Edition Evangelion Unit-01 Metal Build",
      price: "₫4,500,000",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDA1TyGIlBj3c9xhR8k7bwNGnW_vTCVTn4Sxwbs3SMHxUSVz9jhvA-JH7RI2Kdl4H11WLOpb5Ep1OrXyNgqzbF4lUuyQb4qCnrud2AKF0lWdSttKEpkrt6ZYlbHz9fEViMbD3gk_Fce5CeLev71Hxyn-DeKelTtwmadzcLar5SjYXh6smFaDamvW6SpBWtPjiSCvqY7YQoG5AFzajYLDt-mZTgVsk18qB-9JAJYJCX7_lQMVdEYB1qJ",
    },
    sellerProfile: {
      name: "ToyMaster_VN",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA1J0l02beHTSa7ZckF4lVlZwtCpmG8RjErzXN_Uv2Rt5rENFM6TqSPgC6WdcnoyQFS-Il3mu_6hMxNQHcdy3YyLnc6zk4dxO8zKNjF6AVom55sB8_F0eXsoi6Ry1DKjBqsk0HC5K2vjZgFk9l_t5O_1hFcuamCX_Zcv7ybwf7GhVAO48HmUVxK9_f94JYYFYzvYWRvEefckn9SoaGSVLnM6NhqbZ1yrVuTYmE470i6ohCAxUBYRS59",
      rating: 4.9,
      reviewCount: 128,
      joinedYear: "2022",
      responseRate: "98%",
      salesCount: "450+",
      isVerified: true,
    },
    messages: [
      {
        id: "msg-1-1",
        sender: "system",
        text: "Bạn đã bắt đầu cuộc trò chuyện về sản phẩm này.",
        timestamp: "9:30 AM",
      },
      {
        id: "msg-1-2",
        sender: "me",
        text: "Chào shop, sản phẩm này còn không ạ? Tình trạng hộp còn nguyên vẹn 100% không shop?",
        timestamp: "9:32 AM",
      },
      {
        id: "msg-1-3",
        sender: "partner",
        text: "Chào bạn! Món này bên mình vẫn còn nhé. Hộp hoàn toàn nguyên seal và mới tinh, mình bảo quản trong hộp mica bảo vệ từ lúc mua về luôn ạ.",
        timestamp: "10:15 AM",
      },
      {
        id: "msg-1-4",
        sender: "partner",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCkWudtxcTF0O_vwe_24Zle__JKcbhGkNZwhbXu0tzskyxgDrjOFuO7DApdtyzJeQUWQnlVEGoSMsbJHL-6wY5wm44Bo98JIvtzoOA0Q2-9K_uJhKf1LkIyvf-8QYd2n8XKc1dsqe_AfptmUItYBRx7F5Vae4oU6K_b-glVja4QvN_KhOYJUMQ3GUZtYfCaDC3FEBq7UkmW-N5NoYxU4eWj4ztU0VL8pzKng3EPrrn__4Lv4RmF_nzv",
        timestamp: "10:16 AM",
      },
      {
        id: "msg-1-5",
        sender: "me",
        text: "Góc cạnh đẹp quá! Nếu mình đặt mua ngay bây giờ thì hôm nay shop có kịp gửi hàng không?",
        timestamp: "10:30 AM",
      },
      {
        id: "msg-1-6",
        sender: "partner",
        text: "Vâng, hộp còn nguyên seal niêm phong. Mình có thể gửi ngay trong hôm nay ạ.",
        timestamp: "10:42 AM",
      },
    ],
  },
  {
    id: "conv-2",
    partner: {
      id: "u-gundamfan",
      name: "GundamFan99",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCCKNVXgua4Mo0jUePT6r7TmqnDZO_j1ln4FtsNsEbBqV3Ivs2RsPQfzsOeYPasNeA7keQmGrChIIAWP9ihXKmyQMoJoyroXl57_9j-nFfHzAcHdrrb13YgIyICOhBP5WfsdhndeAOgQBylXwi7KWc7ZNZz4TuvEwV1kkXGovz607H-teE9Zl1ViqmJfrS1h_PIyJ-NDF1yIGnjofc6rWS7CSFoQ4ITS9N-IWG6A5Etnm1-j0-PLTv2",
      isOnline: false,
      role: "Buyer",
    },
    lastMessage: "Giá này có thương lượng bớt chút tiền ship được không bạn?",
    lastMessageTime: "Hôm qua",
    unreadCount: 2,
    product: {
      id: "prod-gundam-pg",
      title: "Mô hình PG 1/60 RX-78-2 Gundam Unleashed Full Box",
      price: "₫5,200,000",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB4bO0ByTie0rHpgekeIuC3y8yVWldFOyH2h4dwExVwoY4d5QshceRXQADfJ8G1NAuJxnFJUipRzpid4cg1BSGq3m9CTUT8_adqoe1P0rNsld34RUeoCzTDboK45fe9x2eEvDy0RnqNpqlyWgE1InEiAs5uCGM_RZNw86Fsq3dSwIszoxtn3JwJ7xVQbW5ZHMZYNLmvHrQK301PApHMXH1VXFZmPd4K1SWNAo0Kzzu7Xl-3_NNy1E06",
    },
    sellerProfile: {
      name: "GundamFan99",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCCKNVXgua4Mo0jUePT6r7TmqnDZO_j1ln4FtsNsEbBqV3Ivs2RsPQfzsOeYPasNeA7keQmGrChIIAWP9ihXKmyQMoJoyroXl57_9j-nFfHzAcHdrrb13YgIyICOhBP5WfsdhndeAOgQBylXwi7KWc7ZNZz4TuvEwV1kkXGovz607H-teE9Zl1ViqmJfrS1h_PIyJ-NDF1yIGnjofc6rWS7CSFoQ4ITS9N-IWG6A5Etnm1-j0-PLTv2",
      rating: 4.8,
      reviewCount: 32,
      joinedYear: "2023",
      responseRate: "92%",
      salesCount: "85+",
    },
    messages: [
      {
        id: "msg-2-1",
        sender: "partner",
        text: "Chào bạn, con PG RX-78-2 Unleashed bạn còn nhận deal không?",
        timestamp: "Hôm qua, 14:15",
      },
      {
        id: "msg-2-2",
        sender: "partner",
        text: "Giá này có thương lượng bớt chút tiền ship được không bạn?",
        timestamp: "Hôm qua, 14:16",
      },
    ],
  },
  {
    id: "conv-3",
    partner: {
      id: "u-kpopcard",
      name: "KpopCardStore",
      avatar: "",
      isOnline: false,
      role: "Seller",
    },
    lastMessage: "Cảm ơn bạn đã mua hàng tại shop! Chúc bạn sưu tầm vui vẻ.",
    lastMessageTime: "Thứ hai",
    unreadCount: 0,
    product: {
      id: "prod-card-tcg",
      title: "Card Bo Góc NewJeans Hanni Hype Boy Limited",
      price: "₫350,000",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCyGucZv6bj4eccTXusuHuRmpi5WTSuv2-4FqJ9XUbKpj3n-syyANhsIum8b9e-pl4FmCrkjzCh2AUvj9lAa0wnEwGsvYoHI7y_FimBt7XmoveJkT9OLAAs1_IZP0FNQ-eRfVaZ8ncuW3nuQq9GOnFwCIwlqbzHh3LIN5bvJVA4pOFZq1qY0cSso-PqDWkoUKkUCdDzfDWY0vz8962PqGoQ2NRYrALFshjGPlILP1NuX7oIZU7nRP3F",
    },
    sellerProfile: {
      name: "KpopCardStore",
      avatar: "",
      rating: 5.0,
      reviewCount: 210,
      joinedYear: "2021",
      responseRate: "99%",
      salesCount: "1200+",
      isVerified: true,
    },
    messages: [
      {
        id: "msg-3-1",
        sender: "partner",
        text: "Đơn hàng card Hanni của bạn đã được đơn vị vận chuyển lấy hàng rồi nhé.",
        timestamp: "Thứ hai, 09:10",
      },
      {
        id: "msg-3-2",
        sender: "me",
        text: "Mình nhận được rồi ạ, đóng gói cẩn thận 3 lớp toploader rất xịn. Cảm ơn shop!",
        timestamp: "Thứ hai, 16:30",
      },
      {
        id: "msg-3-3",
        sender: "partner",
        text: "Cảm ơn bạn đã mua hàng tại shop! Chúc bạn sưu tầm vui vẻ.",
        timestamp: "Thứ hai, 16:45",
      },
    ],
  },
];
