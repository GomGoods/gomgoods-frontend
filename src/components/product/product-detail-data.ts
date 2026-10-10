export interface ProductComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  sellerReply?: {
    sellerName: string;
    sellerAvatar: string;
    content: string;
  };
}

export interface SellerProductPreview {
  id: string;
  title: string;
  price: string;
  image: string;
}

export interface ProductDetailItem {
  id: string;
  title: string;
  originalPrice?: string;
  price: string;
  viewsCount: string;
  wantsCount: number;
  categoryName: string;
  categorySlug: string;
  badges?: { text: string; variant: "primary" | "secondary" }[];
  images: {
    main: string;
    detail1: string;
    detail2: string;
    extraCount?: number;
  };
  specs: {
    condition: string;
    quantity: string;
    postedAt: string;
    brand: string;
  };
  description: {
    intro: string;
    bulletsTitle?: string;
    bullets?: string[];
    shippingNote?: string;
    tags?: string[];
  };
  seller: {
    name: string;
    avatar: string;
    isOnline: boolean;
    isGoldSeller: boolean;
    memberSince: string;
    location: string;
    onlineStatus: string;
    rating: number;
    soldCount: number;
    activeCount: number;
  };
  otherProducts: SellerProductPreview[];
  initialComments: ProductComment[];
}

export const sampleProductDetail: ProductDetailItem = {
  id: "miku-15th",
  title: "Mô hình Hatsune Miku 15th Anniversary (Strawberry Dress Ver.) 1/7",
  originalPrice: "5.500.000 đ",
  price: "4.850.000 đ",
  viewsCount: "1.2k",
  wantsCount: 342,
  categoryName: "Mô hình Anime",
  categorySlug: "anime",
  badges: [
    { text: "RARE", variant: "secondary" },
  ],
  images: {
    main: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPZxaSk7LAN_cBJ3gAFKNbFAnjJDnnowcWghhQpr5ZyGxDSutyiygnSoC40_4rBkvr09OBGEEvJpfjuSUmHF9lQ1qi8JYMu5OiyA9CQ_wjA5y9ODQSUYIXSKc8SFBDMX0HjXzm9IQYdsrGURrWHuXUOjzOXPEjuRF3FW5PZ5je_Q8RLdIoj5089lfxvyoNxaI2CUlPkjKNVlrslRkKMLLZmE5Ur4Yjh7GGJV6g0cYcXsW3m82F_2ik",
    detail1:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbzptDCajbyoPQdiGxLoeHfkD1Lz4zE3DaCmjPS2cVF2PXmp_TK79-32D6BGaqFeIqdiES6VX3-H-CmTJoghagasvLOffEgGdLKnYO5AxRWNbkG2lpxjMMXbvQ7Rx3IWfvab_Rdi0UWi1UC0_TVMksg4fGBmidCL5gP-ZVLfeonSAHNfMC33fcU2togf0C0z_U8DQEuCJXiplimVi1qcg1mbsRWPm5vzmdZv3Mx6jMwDnAmZ2WC4hK",
    detail2:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkp-rELHmtJXeGHUrPShJIpNxwBBaFZA8K9eAk_b5C2FcRRMI3fT8GdsbpPmRvYfPMido6jJPWRNDius-MkrNR2zY6Bv9ufdietxOTR_O9AouPQLFATozIosl07dWoevr7qd9HgF6ep64EuvR8O0iDGzHJVRjookSuXVjdylJwf0m3toY4BCeelpV_0ffNT5bWAjVPHAq40AAn19dkbEEqjJpYB6XDmo7ag8Ni8DdUagKcD3xoOiAv",
    extraCount: 5,
  },
  specs: {
    condition: "Mới 100% (Seal)",
    quantity: "1 sản phẩm",
    postedAt: "2 giờ trước",
    brand: "Good Smile Company",
  },
  description: {
    intro:
      "Nhượng lại deal Miku 15th Anniversary siêu đẹp, box còn seal nguyên vẹn chưa khui. Mình order nhầm 2 bé nên pass lại giá hạt dẻ cho anh em đam mê. Hàng chính hãng Good Smile Company full box, box vuông vức 100%. Giao dịch trực tiếp tại TP.HCM hoặc ship toàn quốc.",
  },
  seller: {
    name: "MikuShop",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJogh0hCB-9uCpABAtLiDcprtV-LhusmkDEtpAPkEExwKzuHyB8dpDVIK2zTf6C4Z1Vyoqsd7ArdXjWMi7IETqqTFUlgfKSRk-3wmd0iAybcdVbuLptntpIkWemdmFIw2l12WiqHXcf78wyiRH7eIbqAyXvMHpEL_1h82QOjgDHgv72hcDzkdgAgiZQTXXspVdhgEN-OQz28Cy6BHzF3Fm3-dLIP33LC6786wF6RKKOIceJv9nMvyK",
    isOnline: true,
    isGoldSeller: true,
    memberSince: "2021",
    location: "TP. Hồ Chí Minh",
    onlineStatus: "Online 5 phút trước",
    rating: 4.9,
    soldCount: 142,
    activeCount: 38,
  },
  otherProducts: [
    {
      id: "mp-other-1",
      title: "Nendoroid Gura Hololive Production",
      price: "1.200.000 đ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBC4EPSQgeAP_uilYHc_laBUNYggP_nT1mEulvY6UKRiZ0CiR5g-n_BgzF4vTBmYxHuAIZgCeI8AbzRiH7GXlSd2qEaYyDNTwx0_Rb1uqH_g-KKHETS_yHsrBYVWOxbUMCvcpKBoFe04aMF3BOOvU7AFO-nXMR4e5Df8_4ZdAofP0B_Z8fPEupC0yoc7s3F9FiTG9w06X7tasRm6qcMBae3ynkFO1SSzaiaRIfPwVJcjuz4_eDL1Ig5",
    },
    {
      id: "mp-other-2",
      title: "Scale Demon Slayer Tanjiro Kamado Hinokami",
      price: "2.850.000 đ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDzrF3AXd2KUYGV2paE5dp1cDDxD5ZfgsR1bZxj6by3stJawBGmOresvvzGLMk8M-Ga-6C01ZExItJR6LkylbXgTWmVPYTgSvc-Jgxtu-fLsFglQozXExuGZScg2vMLbBSB6bpWaajI8FEuk0_0fNZqiS2PL_s_flSbN33NEYD384-NHdcHN0YN-NbHe6fFeP4D2f0UL5_t7Fi3aIQ0ql5yyRJMVwBMfeBJZWl5Es88xRJZwwwUht8r",
    },
  ],
  initialComments: [
    {
      id: "c-1",
      authorName: "WibuLord99",
      authorAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCLt0GXukLBjLdgW7MlRW8pXxW7CNi3vPkaHreVht3KmU1UcDXSC4qWiq9jileAHTR9uCRZ3ArjXDLA-s7V8X8Suc0y_AQbJ1s85jjvRHOGf1gkgMfbVfK7yCp_1nQBHBxeO8kqvvhLkz3dXmVUYlzSkeW4chtxOIrxfNFMtGYvolsB_ugOCXwEpZiaZYFvDCtfLAG6pfvDNQlsj4dvbuISG7NMf3Dua3uvEt32A-jAFRGjX50c4UQS",
      timeAgo: "1 giờ trước",
      content:
        "Cho mình xin hình thật mặt sau của box với ạ, sợ vận chuyển bị móp.",
      sellerReply: {
        sellerName: "MikuShop (Người bán)",
        sellerAvatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDgDjEQo6xYSvMbr8fND5Fw9lrIkZvBOsvw2twHbyEAVEF-oAp75E_YVOQEwq2Bq2brvXJ466kzfEoGhoqh8oZkNg2l5C4TVH-h9wuOeHW-Hjoh0HqQ2z0o0ht9poBJSWh_FNDdJ5U3epbP5nBJCnQM2W5RG68wkFJ_kKZkHtwDFoh2FoSIEMzndFMPUHI3Jccl0TiprGhqp6cyRYrJk8cMoDRw6zXnU3xYq5UJFlG1g02cKZS-I0fb",
        content:
          "Chào bạn, mình đã up thêm hình thật ở cuối gallery rồi nhé. Box vuông vức 100% nha!",
      },
    },
    {
      id: "c-2",
      authorName: "FigureHunter",
      authorAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDhkNtNKyhnO8dmsUyJ1dHDK4P7IFeotdAxhIpfwyCGTSjhrxZ1lp6gmu6b3G5IHNSJbHwpt9NwuX_ih3V78sJADxkeLKkTfivrkGGg4T0rHXgJwMbM-WtGk_CqWU3IDzSSVBN0LfnqLdrgU5xCMjjZxVOtnWEUx2ktOMxoEexeRE8jThr6iBX1D7ibfzIR_49TqFr71MfZHw3we8JkRBhFvfNYjQ9iEkzPM8ktlo-1hRchJKw-nDz1",
      timeAgo: "30 phút trước",
      content:
        "Giá này fix thêm được không shop? Mình qua lấy trực tiếp liền.",
    },
  ],
};

import { sampleMarketplaceProducts } from "@/components/marketplace/marketplace-data";
import { sampleProducts as sampleHomeProducts } from "@/components/home/home-products-data";

export function getProductDetailById(id: string): ProductDetailItem {
  if (id === "miku-15th") {
    return sampleProductDetail;
  }

  // Check marketplace sample products
  const mpItem = sampleMarketplaceProducts.find(
    (p) => String(p.id) === String(id)
  );
  if (mpItem) {
    return {
      ...sampleProductDetail,
      id: String(mpItem.id),
      title: mpItem.title,
      price: mpItem.price,
      badges: mpItem.badge
        ? [
            {
              text: mpItem.badge.text,
              variant:
                mpItem.badge.variant === "tertiary" ? "secondary" : mpItem.badge.variant,
            },
          ]
        : [],
      images: {
        ...sampleProductDetail.images,
        main: mpItem.image,
      },
      seller: {
        ...sampleProductDetail.seller,
        name: mpItem.seller.name,
        avatar: mpItem.seller.avatar,
        location: mpItem.seller.location,
      },
      specs: {
        ...sampleProductDetail.specs,
        postedAt: mpItem.postedAt,
      },
      description: {
        intro: `Pass lại ${mpItem.title}. Tình trạng hàng đẹp, chính hãng, giao dịch tại ${mpItem.seller.location} hoặc ship toàn quốc. Anh em quan tâm bấm Chat ngay nhé!`,
      },
    };
  }

  // Check home sample products
  const homeItem = sampleHomeProducts.find(
    (p) => String(p.id) === String(id)
  );
  if (homeItem) {
    return {
      ...sampleProductDetail,
      id: String(homeItem.id),
      title: homeItem.title,
      price: homeItem.price,
      badges: homeItem.badge
        ? [
            {
              text: homeItem.badge.text,
              variant:
                homeItem.badge.variant === "tertiary" ? "secondary" : homeItem.badge.variant,
            },
          ]
        : [],
      images: {
        ...sampleProductDetail.images,
        main: homeItem.image,
      },
      seller: {
        ...sampleProductDetail.seller,
        name: homeItem.seller.name,
        avatar: homeItem.seller.avatar,
        location: homeItem.seller.location,
      },
      specs: {
        ...sampleProductDetail.specs,
        postedAt: homeItem.postedAt,
      },
      description: {
        intro: `Pass lại ${homeItem.title}. Tình trạng sản phẩm còn rất mới, chính hãng. Bao ship toàn quốc khi chốt nhanh!`,
      },
    };
  }

  // Fallback for any other product ID
  return {
    ...sampleProductDetail,
    id,
    title: `Sản phẩm Fandom GomGoods #${id.toUpperCase()}`,
  };
}
