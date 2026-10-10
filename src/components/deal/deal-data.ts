import type { ProductItem } from "@/components/product/ProductCard";

export interface DealProductItem extends ProductItem {
  originalPrice?: string;
  category: string;
}

export interface DealCategoryInfo {
  slug: string;
  aliases: string[];
  title: string;
  subtitle: string;
  watermark: string;
  badgeText: string;
  mascot: string;
  theme: {
    bgGradient: string;
    cardBg: string;
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    borderColor: string;
  };
  filterTabs: string[];
  products: DealProductItem[];
}

export const dealCategories: Record<string, DealCategoryInfo> = {
  "kho-do-suu-tam": {
    slug: "kho-do-suu-tam",
    aliases: ["collection", "kho-do-suu-tam"],
    title: "Kho Đồ Sưu Tầm",
    subtitle: "Pass đồ xịn giá siêu hời — Sưu tầm manga, photocard, TCG & anime merch",
    watermark: "COLLECTION",
    badgeText: "DEAL SƯU TẦM",
    mascot: "/Category_Card_1.png",
    theme: {
      bgGradient: "from-[#FFF6C8] via-[#FFDE31] to-[#FBBF24]",
      cardBg: "bg-[#FFDE31]",
      accentColor: "#F59E0B",
      badgeBg: "bg-slate-900",
      badgeText: "text-[#FFDE31]",
      borderColor: "border-amber-300/80",
    },
    filterTabs: [
      "Tất cả",
      "Manga & Artbook",
      "Thẻ bài TCG",
      "Photocard & Goods",
      "Phụ kiện sưu tầm",
    ],
    products: [
      {
        id: "4",
        title: "Full set Manga Jujutsu Kaisen tập 1-20 kèm quà tặng",
        price: "178.000đ",
        originalPrice: "250.000đ",
        category: "Manga & Artbook",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBYG6MPWGz5vKH1KbkYwanhfyvdylwwduQFXmPLko2XIAPzFyhjzdTpLmBG1HflzxZA-uEal6hhlKyIEfsv0z3YTF6vSCrpjLeYAQsoWBruZKwzr2VZ2lk7o3-TgZzxE747cVeZBb7ch4EA-M_VHkT0LQGdA7gJrymlhUu8a4wInmZaHeRIGFksXPlbnuAC4YQyHK2wjfKT6gF_4fMeXvr52Ut466EKlYsCnWAG7buAL2PWoMrVtC4y",
        badge: { text: "Hot Deal", variant: "primary" },
        seller: {
          name: "MangaLover",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDk_VV3OJ4PbZiQY_CoZaom58E54YxeOP8ToVIBTtsjMRB9MdBJ8Oo0lml4Fnv2ebqpMmyCp1k7qSfdROHe0LDFkajh1UUurjXYa-sii25gQ3_MckT2cWkKkX9Ar4tFD0Wbn7j5NiZ5wLptfP_KDmna4NCKBTG9VzFyxkBUITq3Hz_wTw3nBSc7cbmoVxbGX5YEtWLVGEY7qfaHqjTOtn83crVPxOEkwudXwUUBN4uV4vHgWjnm0wq",
          location: "HN",
          isVerified: true,
        },
        postedAt: "1 ngày trước",
      },
      {
        id: "2",
        title: "Pack Card Pokemon TCG Scarlet & Violet - Bóc lẻ",
        price: "118.000đ",
        originalPrice: "150.000đ",
        category: "Thẻ bài TCG",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAYpuyTtVVcBisS0nbmHa19Cflx6W344r1lUq7olditp4q_HDLdc02atXauC0YsDc7UYIoPeU9jxBYLcqgNs-Dw-tFYHSMAJn7scTT3u49mBEi4lJ7H6sOpZmXzYEhGpHRKumHete4hED1tsarvvaSPD1zo7-eXV9v0SSAdw36SEt3MT-faskbAFWdwPNyIWs4CD2vgIfLmxdGzVvuIQ324Jh4lrTNQS5LQrkgbyJR4lA6q74BBPFvN",
        badge: { text: "Rare", variant: "secondary" },
        seller: {
          name: "PokeCollector",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCf9mr8soK-EheTHrkYfu7YwIRApzX9qi3EeInGT5zKKwL1oFOlYn8JkJlBZyThs7gSMpe4Mdiqfldlvoy2ulZMkRqhH2ln4hVfi907ZHrYNeMSeAe68l7hWE7KJsxGY6emxYDp2bL7leIt71H6U9JKF7hnWVPYusDk5y1M61MK_z28hQejY2-xeq0tGcqJgs8Gqr-5KVThRzez_yedlS7CJna3l8QaXGOPPJC3I0XqQRKGsnGC1uYO",
          location: "HCM",
          isVerified: true,
        },
        postedAt: "2 giờ trước",
      },
      {
        id: "mp-2",
        title: "Thẻ Pokemon Charizard VMAX SSR Shiny Star V - Pass nhanh",
        price: "1.500.000đ",
        originalPrice: "1.800.000đ",
        category: "Thẻ bài TCG",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCyGucZv6bj4eccTXusuHuRmpi5WTSuv2-4FqJ9XUbKpj3n-syyANhsIum8b9e-pl4FmCrkjzCh2AUvj9lAa0wnEwGsvYoHI7y_FimBt7XmoveJkT9OLAAs1_IZP0FNQ-eRfVaZ8ncuW3nuQq9GOnFwCIwlqbzHh3LIN5bvJVA4pOFZq1qY0cSso-PqDWkoUKkUCdDzfDWY0vz8962PqGoQ2NRYrALFshjGPlILP1NuX7oIZU7nRP3F",
        badge: { text: "LIKE NEW", variant: "secondary" },
        seller: {
          name: "TCG_Master",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBRfwhfSr1UouPZYV2jksPqhyIE_1QEVTZSmuecaw8MacArCFZApYrii9kUoYQhitoxYITtcHuXHm942hkFVvU5Z_5BdVkuhJ9h9efvYtbYWLbkwoSLFmw7OK9d5VOyqzQ26jzhnfDI54DXsTV682IU2ECkXmUeJ6iTbk8kSPbHltPqrUUSTgtBrMM_DAJIphcAQkOc4KoXrv2nktwzOjMrDpt8LgtnPnd8RTj7IHbAv6Gn4Bk4Vj1c",
          location: "TP.HCM",
          isVerified: true,
        },
        postedAt: "1 giờ trước",
      },
      {
        id: "7",
        title: "Card bo góc Lisa Blackpink Born Pink Special Edition",
        price: "150.000đ",
        originalPrice: "190.000đ",
        category: "Photocard & Goods",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAadvzWNkZAAXGaR-ZXsFEMSnDiLexDoI5FzPZN7lOxKFOXFREGzZ2E0nJksYIiFNHnr_2yLKtbRGMKAK8ELn8z4CGFMTWP-ldxRz8iqnb_X7SAP4Tn7Qr0hQX8yoejtEKLytW_OINQWWbIV20cNWcW4QaJHvX302TMUGUtxZTxUR6ZhxJF8hyG4KBWRmzMufh5ZTcWMCVSFSCJ46YvxM_ak0VpMFGMdWvlGWjlb3JGEwCHr5_QAAAC",
        badge: { text: "Rare", variant: "secondary" },
        seller: {
          name: "BlinkCorner",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB7aFZR8sjW430MRXs9KYQC_TPBl_LW1k4FepBQ20m4JSppPnEOcXw09_1HiBpENwNSr8yQv36ph1k43AkN8Mw5MLZmi-e2-_YCw-M92ZRxwC7Nell3TKxYkqaqoHECiP7wm07fO8QKpKqBUEGd7AbP1RG1YJk7XZk5FvJOKbLJJtlfldgvIFhKW_aYy2uFxitVNsJ9EsM6hsqeGQD3g_pEzPN1ZaGDk0Uxw9Cf7PSa9GDe-OglvlsE",
          location: "HCM",
          isVerified: true,
        },
        postedAt: "8 giờ trước",
      },
      {
        id: "8",
        title: "Huy hiệu Badge Kimetsu no Yaiba Tanjiro & Nezuko holo",
        price: "45.000đ",
        originalPrice: "65.000đ",
        category: "Phụ kiện sưu tầm",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBYG6MPWGz5vKH1KbkYwanhfyvdylwwduQFXmPLko2XIAPzFyhjzdTpLmBG1HflzxZA-uEal6hhlKyIEfsv0z3YTF6vSCrpjLeYAQsoWBruZKwzr2VZ2lk7o3-TgZzxE747cVeZBb7ch4EA-M_VHkT0LQGdA7gJrymlhUu8a4wInmZaHeRIGFksXPlbnuAC4YQyHK2wjfKT6gF_4fMeXvr52Ut466EKlYsCnWAG7buAL2PWoMrVtC4y",
        badge: { text: "Hot", variant: "primary" },
        seller: {
          name: "AnimePin VN",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDk_VV3OJ4PbZiQY_CoZaom58E54YxeOP8ToVIBTtsjMRB9MdBJ8Oo0lml4Fnv2ebqpMmyCp1k7qSfdROHe0LDFkajh1UUurjXYa-sii25gQ3_MckT2cWkKkX9Ar4tFD0Wbn7j5NiZ5wLptfP_KDmna4NCKBTG9VzFyxkBUITq3Hz_wTw3nBSc7cbmoVxbGX5YEtWLVGEY7qfaHqjTOtn83crVPxOEkwudXwUUBN4uV4vHgWjnm0wq",
          location: "HN",
        },
        postedAt: "12 giờ trước",
      },
      {
        id: "10",
        title: "Artbook Suzume no Tojimari - Makoto Shinkai bản bìa cứng",
        price: "480.000đ",
        originalPrice: "550.000đ",
        category: "Manga & Artbook",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDk_VV3OJ4PbZiQY_CoZaom58E54YxeOP8ToVIBTtsjMRB9MdBJ8Oo0lml4Fnv2ebqpMmyCp1k7qSfdROHe0LDFkajh1UUurjXYa-sii25gQ3_MckT2cWkKkX9Ar4tFD0Wbn7j5NiZ5wLptfP_KDmna4NCKBTG9VzFyxkBUITq3Hz_wTw3nBSc7cbmoVxbGX5YEtWLVGEY7qfaHqjTOtn83crVPxOEkwudXwUUBN4uV4vHgWjnm0wq",
        badge: { text: "Freeship", variant: "tertiary" },
        seller: {
          name: "MangaLover",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB7aFZR8sjW430MRXs9KYQC_TPBl_LW1k4FepBQ20m4JSppPnEOcXw09_1HiBpENwNSr8yQv36ph1k43AkN8Mw5MLZmi-e2-_YCw-M92ZRxwC7Nell3TKxYkqaqoHECiP7wm07fO8QKpKqBUEGd7AbP1RG1YJk7XZk5FvJOKbLJJtlfldgvIFhKW_aYy2uFxitVNsJ9EsM6hsqeGQD3g_pEzPN1ZaGDk0Uxw9Cf7PSa9GDe-OglvlsE",
          location: "ĐN",
          isVerified: true,
        },
        postedAt: "2 ngày trước",
      },
      {
        id: "mp-3",
        title: "Keycap lẻ Artisan Resin - Chủ đề Evangelion EVA-01",
        price: "450.000đ",
        originalPrice: "520.000đ",
        category: "Phụ kiện sưu tầm",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAkbR_BJrOAkH_87sQjq4kNAsrxb7NAGrWvuXnsQ9ns84cZu9h8YTES-BxcjKM7JP1g9CWu3GBFh74--LI0vfk4AjIma0LdFlNYfvK0AdpeHNYZostH_OPMJw-rEE1DJlw2gvvRh-AHkhMAdZn-UV_mrlbu5p2yl4Xn1F-DpCW2MEDjf6CL-r15BauYF6WLCRO44pgOxNUKrbkj01JDl5SqZTNX7M_EEgQFbtKYTb-KxOLrqNyrVxXT",
        seller: {
          name: "MechaNerd",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCXGUgPnxJCq1sSNizfLBhgtUjsYFxJVpGJJv2ir_NnkdPpTgzjJqZPPCcdcFjEj1xTGWdLvwCr5L7SBQEoN0ZCHuHXCulSBEuLnR1yvz2lJqA7Bw_TB9R8EG9Jkjh639CmbBSIgr9XFGtn10bmzKS_Ykt5oU0xcvcSFcshxoM2AeXNGO9wYTzp71EteysV0MjAjm2-v19yT6xwUwc3eFTvHw5Q2Vk7h6Y-79xb8pShPshRdRXER5eI",
          location: "Đà Nẵng",
          isVerified: true,
        },
        postedAt: "3 giờ trước",
      },
      {
        id: "mp-4",
        title: "Tamagotchi Connection V4.5 Original - Hàng cổ sưu tầm",
        price: "2.100.000đ",
        originalPrice: "2.400.000đ",
        category: "Phụ kiện sưu tầm",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD2dLER236EcT2Z2wWnfXP7EjxbdNq475CUsIP2J5WIDMxfZuY8z8acYNLTr2PWkSilXpdaWFlmOV4gTgl8FYvHO2WRXSxSR6z2NnJTB21x_sUMQnHOYzoGDLgWJN8LHipJV7zcGadmtHSoxQBRJ_Fl_ItfwEo492PydOBOTd1TK84ncNyzedc2rG2RJcrL7Oh36NvmnxH4VT6_JwYtc2J1G0cYxMs_FDCvgSPiEXa9Ndxx2X2-yjHI",
        badge: { text: "FREE SHIP", variant: "tertiary" },
        seller: {
          name: "RetroToys",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBgjOUZwfFQ1iuzHxnorR6bJkBFxmpKebwzas1xXBk-RHQp75b0PSxI68Mqewr5wJg4BmzD3PCuYd5qU4p9UpjgwiNH8IbGfmmv5A1xzwMxWk6Qj5WLn4_TGFNZR_t0f12ko2ptN95I-IQIGsizMyNN1gFrQ9Cv_ghY7YuiI2d_lPbGSyrq2ZxVaQCfMGhlKv38610A_YXm8R_5SDpB_u260Gd6L9YoKmUeehKJJ8-RNq7na6CGdsE7",
          location: "Hà Nội",
          isVerified: false,
        },
        postedAt: "4 giờ trước",
      },
    ],
  },
  "mo-hinh-acg": {
    slug: "mo-hinh-acg",
    aliases: ["figure", "mo-hinh-acg"],
    title: "Mô Hình & ACG",
    subtitle: "Hàng hot săn ngay giá tốt — Figure, Nendoroid, Gunpla & plushies",
    watermark: "FIGURE",
    badgeText: "DEAL MÔ HÌNH",
    mascot: "/Category_Card_2.png",
    theme: {
      bgGradient: "from-[#A7F3D0] via-[#86EFAC] to-[#4ADE80]",
      cardBg: "bg-gradient-to-r from-[#86EFAC] to-[#4ADE80]",
      accentColor: "#10B981",
      badgeBg: "bg-slate-900",
      badgeText: "text-[#86EFAC]",
      borderColor: "border-emerald-300/80",
    },
    filterTabs: [
      "Tất cả",
      "Scale Figure",
      "Nendoroid & Chibi",
      "Gunpla & Mecha",
      "Plush & Gấu bông",
    ],
    products: [
      {
        id: "1",
        title: "Mô hình Nendoroid Hatsune Miku 15th Anniversary Ver.",
        price: "607.000đ",
        originalPrice: "1.250.000đ",
        category: "Nendoroid & Chibi",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAx-EKCsfuShMcUmSdW-l_2ggcmY7wa1yEWpnbOGNFjzaU-PPg1-JafBaflr6M-0vKryiT0DrwZoeSPRAAIv03DP-gXIwh8ewk84MOtoMHsXVLJWMqIs0jUnOyxgpvhE4HvWmiiKqQnH_tevBN9fxAZn6CJm9K5tU9vGAH0P55k6IeaWyJtgujCU9d5e9mt-0IGpiPI8i3dz1wlt_Easb1vs3_FzapKIwkyPLT7Lw3H3qEtGnPHruXZ",
        badge: { text: "Giảm 50%", variant: "primary" },
        seller: {
          name: "OtakuShop VN",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDI1yTttd3FslDalbLF4Mezugitm4P6498JJ6nQymx60DRfD_BFZZBEJklnUNlAu4iRFtoBBkSNwELxAkNkw6qjkPTB6M1FAF9XLEH2Dq_eOqlKx0KfbsdYOmwTGsenWIs3ryTzfheA-ec5s68i7rJqtmiA36SyzsyrlfFc1E26Edlf_E5Qe0IKAxpQg795YR7CFawOtI2aFdP5h3xcIxsjvAtteEmPdGYzzKeMt3oyw1Hbc0XUa2n7",
          location: "HN",
          isVerified: true,
        },
        postedAt: "Vừa đăng",
      },
      {
        id: "3",
        title: "Gấu bông Anya Forger Spy x Family 20cm siêu mềm",
        price: "200.000đ",
        originalPrice: "250.000đ",
        category: "Plush & Gấu bông",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAadvzWNkZAAXGaR-ZXsFEMSnDiLexDoI5FzPZN7lOxKFOXFREGzZ2E0nJksYIiFNHnr_2yLKtbRGMKAK8ELn8z4CGFMTWP-ldxRz8iqnb_X7SAP4Tn7Qr0hQX8yoejtEKLytW_OINQWWbIV20cNWcW4QaJHvX302TMUGUtxZTxUR6ZhxJF8hyG4KBWRmzMufh5ZTcWMCVSFSCJ46YvxM_ak0VpMFGMdWvlGWjlb3JGEwCHr5_QAAAC",
        badge: { text: "Hot Deal", variant: "primary" },
        seller: {
          name: "WibuStore",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB7aFZR8sjW430MRXs9KYQC_TPBl_LW1k4FepBQ20m4JSppPnEOcXw09_1HiBpENwNSr8yQv36ph1k43AkN8Mw5MLZmi-e2-_YCw-M92ZRxwC7Nell3TKxYkqaqoHECiP7wm07fO8QKpKqBUEGd7AbP1RG1YJk7XZk5FvJOKbLJJtlfldgvIFhKW_aYy2uFxitVNsJ9EsM6hsqeGQD3g_pEzPN1ZaGDk0Uxw9Cf7PSa9GDe-OglvlsE",
          location: "ĐN",
          isVerified: true,
        },
        postedAt: "5 giờ trước",
      },
      {
        id: "9",
        title: "Mô hình Albedo Overlord 1/7 Kadokawa KDcolle chính hãng",
        price: "4.500.000đ",
        originalPrice: "5.200.000đ",
        category: "Scale Figure",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAx-EKCsfuShMcUmSdW-l_2ggcmY7wa1yEWpnbOGNFjzaU-PPg1-JafBaflr6M-0vKryiT0DrwZoeSPRAAIv03DP-gXIwh8ewk84MOtoMHsXVLJWMqIs0jUnOyxgpvhE4HvWmiiKqQnH_tevBN9fxAZn6CJm9K5tU9vGAH0P55k6IeaWyJtgujCU9d5e9mt-0IGpiPI8i3dz1wlt_Easb1vs3_FzapKIwkyPLT7Lw3H3qEtGnPHruXZ",
        badge: { text: "Rare", variant: "secondary" },
        seller: {
          name: "OtakuShop VN",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDI1yTttd3FslDalbLF4Mezugitm4P6498JJ6nQymx60DRfD_BFZZBEJklnUNlAu4iRFtoBBkSNwELxAkNkw6qjkPTB6M1FAF9XLEH2Dq_eOqlKx0KfbsdYOmwTGsenWIs3ryTzfheA-ec5s68i7rJqtmiA36SyzsyrlfFc1E26Edlf_E5Qe0IKAxpQg795YR7CFawOtI2aFdP5h3xcIxsjvAtteEmPdGYzzKeMt3oyw1Hbc0XUa2n7",
          location: "HN",
          isVerified: true,
        },
        postedAt: "1 ngày trước",
      },
      {
        id: "mp-1",
        title: "Mô hình Ganyu Genshin Impact 1/7 - Hàng chính hãng Apex",
        price: "3.200.000đ",
        originalPrice: "3.600.000đ",
        category: "Scale Figure",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB4bO0ByTie0rHpgekeIuC3y8yVWldFOyH2h4dwExVwoY4d5QshceRXQADfJ8G1NAuJxnFJUipRzpid4cg1BSGq3m9CTUT8_adqoe1P0rNsld34RUeoCzTDboK45fe9x2eEvDy0RnqNpqlyWgE1InEiAs5uCGM_RZNw86Fsq3dSwIszoxtn3JwJ7xVQbW5ZHMZYNLmvHrQK301PApHMXH1VXFZmPd4K1SWNAo0Kzzu7Xl-3_NNy1E06",
        badge: { text: "NEW", variant: "primary" },
        seller: {
          name: "OtakuShopHN",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBH2y68WxH-1cGNLHcNqmejtQeSS_pRuPaOOKexUp5vwYDw839VGATeC27HNqX_L3dqw-Ekq2LWPbkYQTsKcjNuBXnYZB9ji8l0m22wG3Wmw-f3V3wSsdWvwpj-8ZIW5R-hGYH3QnsOO-kQ3FbOe0hAMj8rTPRuTNgx-jNCmlkux9iN26zFjaIN5sO07-sffdefj7_QbsAfZ_fJ1SdV3-cQ54mge3h5_CSjQsrRXGJVhRR4-XlZtUrd",
          location: "Hà Nội",
          isVerified: false,
        },
        postedAt: "Vừa đăng",
      },
      {
        id: "6",
        title: "Mô hình Bandai Gunpla RG 1/144 Hi-Nu Gundam",
        price: "1.050.000đ",
        originalPrice: "1.250.000đ",
        category: "Gunpla & Mecha",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAYpuyTtVVcBisS0nbmHa19Cflx6W344r1lUq7olditp4q_HDLdc02atXauC0YsDc7UYIoPeU9jxBYLcqgNs-Dw-tFYHSMAJn7scTT3u49mBEi4lJ7H6sOpZmXzYEhGpHRKumHete4hED1tsarvvaSPD1zo7-eXV9v0SSAdw36SEt3MT-faskbAFWdwPNyIWs4CD2vgIfLmxdGzVvuIQ324Jh4lrTNQS5LQrkgbyJR4lA6q74BBPFvN",
        badge: { text: "New", variant: "primary" },
        seller: {
          name: "GundamStore VN",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCf9mr8soK-EheTHrkYfu7YwIRApzX9qi3EeInGT5zKKwL1oFOlYn8JkJlBZyThs7gSMpe4Mdiqfldlvoy2ulZMkRqhH2ln4hVfi907ZHrYNeMSeAe68l7hWE7KJsxGY6emxYDp2bL7leIt71H6U9JKF7hnWVPYusDk5y1M61MK_z28hQejY2-xeq0tGcqJgs8Gqr-5KVThRzez_yedlS7CJna3l8QaXGOPPJC3I0XqQRKGsnGC1uYO",
          location: "HN",
          isVerified: true,
        },
        postedAt: "6 giờ trước",
      },
      {
        id: "5",
        title: "Standee Acrylic Furina Genshin Impact chính hãng Mihoyo",
        price: "180.000đ",
        originalPrice: "220.000đ",
        category: "Nendoroid & Chibi",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAx-EKCsfuShMcUmSdW-l_2ggcmY7wa1yEWpnbOGNFjzaU-PPg1-JafBaflr6M-0vKryiT0DrwZoeSPRAAIv03DP-gXIwh8ewk84MOtoMHsXVLJWMqIs0jUnOyxgpvhE4HvWmiiKqQnH_tevBN9fxAZn6CJm9K5tU9vGAH0P55k6IeaWyJtgujCU9d5e9mt-0IGpiPI8i3dz1wlt_Easb1vs3_FzapKIwkyPLT7Lw3H3qEtGnPHruXZ",
        badge: { text: "Hot", variant: "primary" },
        seller: {
          name: "GenshinGacha",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDI1yTttd3FslDalbLF4Mezugitm4P6498JJ6nQymx60DRfD_BFZZBEJklnUNlAu4iRFtoBBkSNwELxAkNkw6qjkPTB6M1FAF9XLEH2Dq_eOqlKx0KfbsdYOmwTGsenWIs3ryTzfheA-ec5s68i7rJqtmiA36SyzsyrlfFc1E26Edlf_E5Qe0IKAxpQg795YR7CFawOtI2aFdP5h3xcIxsjvAtteEmPdGYzzKeMt3oyw1Hbc0XUa2n7",
          location: "HCM",
        },
        postedAt: "3 giờ trước",
      },
    ],
  },
};

export function getDealCategory(slug: string): DealCategoryInfo | undefined {
  const normalized = slug.toLowerCase().trim();
  if (dealCategories[normalized]) {
    return dealCategories[normalized];
  }
  for (const cat of Object.values(dealCategories)) {
    if (cat.aliases.includes(normalized)) {
      return cat;
    }
  }
  return undefined;
}
