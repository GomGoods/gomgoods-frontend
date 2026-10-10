"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AuctionHeroBanner } from "./AuctionHeroBanner";
import { AuctionStartBanner } from "./AuctionStartBanner";
import { AuctionTabs, type AuctionTabKey } from "./AuctionTabs";
import { AuctionCategoryPills } from "./AuctionCategoryPills";
import { AuctionGrid } from "./AuctionGrid";
import type { AuctionItem } from "./AuctionCard";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export const sampleAuctions: AuctionItem[] = [
  // --- LIVE AUCTIONS ---
  {
    id: "auc-1",
    title: "Mô hình Gundam PG Unleashed RX-78-2 (Nguyên seal, chính hãng Bandai)",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWJlaxxJClkCot33mDN36D366mO1JB0TZU2OHyJwEcJyOoGbfpZzZ1JyN2iReQ-qP9md167cR1JJMOYgN2gylc00IpZ_nAsafA6ETVuk7YMXj-HWcLbiNjs2P9vFVblgYFQMa4YfxzDkdoV-EYI5w7EnQscEN2qLBfIOWP2e6Jol_3054U5cOmBmPJgMv1IRa9D5JSwr9BSgMsEkgsgk8AzBn_BXQtSWMg6RJu2ZxhIyIz2rIhjOfB",
    currentPrice: "3.500.000 đ",
    startingPrice: "2.800.000 đ",
    bidCount: 12,
    timeLeft: "02:15:40",
    isUrgent: false,
    status: "live",
    badge: "hot",
    category: "anime",
  },
  {
    id: "auc-2",
    title: "Thẻ bài Charizard Base Set 1st Edition PSA 9 - Không một vết xước",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTuliBgAtHkLKBZcfg34MdXjWe5ZItYR8tmF-8RIqjSsdj2qt5_2K0JCFzC9Y3o9ol-8A8GNsKjDzgYHkKmwLS0LGCu8TFxKFnUmgOE4B5JZgv4EVrDS2iVAZ75j5ewYG-9R8A89alOak-GkNZdca6GPShmdlXEyQXM7q1XuZpsG6EJ5VP-QoewPDWhCtRvTNbxID67KG2VPUMAqxHiGTMOPufk2TghcZuM_fesicgIG2MSV5EI9P6",
    currentPrice: "15.200.000 đ",
    startingPrice: "8.000.000 đ",
    bidCount: 45,
    timeLeft: "00:05:12",
    isUrgent: true,
    status: "live",
    badge: "rare",
    category: "tcg",
  },
  {
    id: "auc-3",
    title: "Lô truyện tranh Doraemon bản cũ 1992 trọn bộ 45 cuốn (Kim Đồng)",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB92yRbVGuNw-_WJt2D_fHG6n5FCAYn_hLzdvpP44pRghcYXkKB2ENOU7ezc6JYODWtwFn0iTNh5c0bjWxFffVp2i1T1JNatAp5IuY71316VU4EXsIUXAtZEWttNbba-buorGvJARMAdZsGefO9DMwJhb_K9OBLBMqNcB-QApUUcBcsW3GG56m4dhlrfr0xPCJlpWcIObZSrQKtNqqfROjlPOXq8YUfyqkwJYnWLqz9MgH2jFRc52i_",
    currentPrice: "650.000 đ",
    startingPrice: "500.000 đ",
    bidCount: 3,
    timeLeft: "15:45:00",
    isUrgent: false,
    status: "live",
    category: "manga",
  },
  {
    id: "auc-4",
    title: "Photocard Jungkook BTS Butter Album - Bản phát hành đặc biệt giới hạn",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4DT0u4RCo1ATY8gUKQI_qL2MSE2U6TACCBUwG7LXS-ksU2yVC2VyMV1ybd6zKWQtjSry1Yn1XdTuYqqpPbGyZqfszEF8KZtHZHYpFELBm_5PfDxzzeUkHinY1G7Ye3LqGKohPRP2swr30TEMAWMrXAjRwvhx8A9DX1zbxWUGke2XkpNCci_2xKn3r-Wo8mRm5vgAxRP0SWHj42PBWSsmN5Q6hm303UDdXQnmA_MBu0nrz9xQpZD3J",
    currentPrice: "1.200.000 đ",
    startingPrice: "600.000 đ",
    bidCount: 8,
    timeLeft: "12:20:10",
    isUrgent: false,
    status: "live",
    category: "kpop",
  },
  {
    id: "auc-5",
    title: "Mô hình One Piece Portrait.Of.Pirates 'WA-MAXIMUM' Monkey D. Luffy Gear 5",
    imageUrl:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    currentPrice: "5.800.000 đ",
    startingPrice: "4.500.000 đ",
    bidCount: 22,
    timeLeft: "00:08:45",
    isUrgent: true,
    status: "live",
    badge: "hot",
    category: "anime",
  },
  {
    id: "auc-6",
    title: "Thẻ bài Yu-Gi-Oh! Rồng Trắng Mắt Xanh (Blue-Eyes White Dragon) SDK-001 1st",
    imageUrl:
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&auto=format&fit=crop&q=80",
    currentPrice: "4.150.000 đ",
    startingPrice: "2.000.000 đ",
    bidCount: 19,
    timeLeft: "05:40:15",
    isUrgent: false,
    status: "live",
    badge: "rare",
    category: "tcg",
  },
  {
    id: "auc-7",
    title: "Đồng hồ để bàn mạ vàng cổ điển phong cách Pháp thế kỷ 19",
    imageUrl:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&auto=format&fit=crop&q=80",
    currentPrice: "9.500.000 đ",
    startingPrice: "7.000.000 đ",
    bidCount: 7,
    timeLeft: "18:10:00",
    isUrgent: false,
    status: "live",
    category: "antique",
  },
  {
    id: "auc-8",
    title: "Đĩa than giới hạn Blackpink - The Album Limited Special Edition Pink Vinyl",
    imageUrl:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80",
    currentPrice: "2.300.000 đ",
    startingPrice: "1.500.000 đ",
    bidCount: 14,
    timeLeft: "03:22:50",
    isUrgent: false,
    status: "live",
    category: "kpop",
  },

  // --- UPCOMING AUCTIONS ---
  {
    id: "auc-9",
    title: "Mô hình Bearbrick 1000% Iron Man Mark 50 Medicom Toy chính hãng",
    imageUrl:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
    currentPrice: "25.000.000 đ",
    startingPrice: "25.000.000 đ",
    bidCount: 0,
    timeLeft: "Bắt đầu sau 2 ngày",
    isUrgent: false,
    status: "upcoming",
    badge: "rare",
    category: "anime",
  },
  {
    id: "auc-10",
    title: "Bộ sưu tập Thám Tử Lừng Danh Conan ấn bản đầu 1995 tập 1-30",
    imageUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    currentPrice: "1.800.000 đ",
    startingPrice: "1.800.000 đ",
    bidCount: 0,
    timeLeft: "Bắt đầu sau 18 giờ",
    isUrgent: false,
    status: "upcoming",
    category: "manga",
  },
  {
    id: "auc-11",
    title: "Lightstick Ver.3 Blackpink có chữ ký thành viên kỷ niệm tour toàn cầu",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    currentPrice: "3.200.000 đ",
    startingPrice: "3.200.000 đ",
    bidCount: 0,
    timeLeft: "Bắt đầu sau 1 ngày",
    isUrgent: false,
    status: "upcoming",
    badge: "hot",
    category: "kpop",
  },

  // --- ENDED AUCTIONS ---
  {
    id: "auc-12",
    title: "Mô hình Metal Build Evangelion Unit-01 EVA-01 Test Type",
    imageUrl:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80",
    currentPrice: "7.200.000 đ",
    startingPrice: "4.500.000 đ",
    bidCount: 38,
    timeLeft: "Đã kết thúc",
    isUrgent: false,
    status: "ended",
    badge: "hot",
    category: "anime",
  },
  {
    id: "auc-13",
    title: "Thẻ bài Umbreon VMAX Evolving Skies Alt Art PSA 10 Gemini Gem Mint",
    imageUrl:
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&auto=format&fit=crop&q=80",
    currentPrice: "21.500.000 đ",
    startingPrice: "12.000.000 đ",
    bidCount: 62,
    timeLeft: "Đã kết thúc",
    isUrgent: false,
    status: "ended",
    badge: "rare",
    category: "tcg",
  },
];

interface AuctionViewProps {
  dict: Dictionary;
  lang?: string;
}

export function AuctionView({ dict, lang = "vi" }: AuctionViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AuctionTabKey>("live");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);
  const [slashItem, setSlashItem] = useState<AuctionItem | null>(null);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      live: sampleAuctions.filter((a) => a.status === "live").length,
      upcoming: sampleAuctions.filter((a) => a.status === "upcoming").length,
      ended: sampleAuctions.filter((a) => a.status === "ended").length,
    };
  }, []);

  // Filter items by active tab & category
  const filteredItems = useMemo(() => {
    return sampleAuctions.filter((item) => {
      if (item.status !== activeTab) return false;
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [activeTab, selectedCategory]);

  const displayedItems = filteredItems.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredItems.length;

  const handleTabChange = (newTab: AuctionTabKey) => {
    setActiveTab(newTab);
    setVisibleCount(8);
  };

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setVisibleCount(8);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleSelectItem = (item: AuctionItem) => {
    setSlashItem(item);
  };

  const handleBannerComplete = () => {
    const targetId = slashItem?.id;
    setSlashItem(null);
    if (targetId) {
      router.push(`/${lang}/auction/${targetId}`);
    }
  };

  return (
    <div className="w-full pb-10">
      {/* Playful Hero Banner with Auto-play Looping Video */}
      <AuctionHeroBanner dict={dict} />

      {/* Tabs */}
      <AuctionTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        dict={dict}
        counts={tabCounts}
      />

      {/* Categories */}
      <AuctionCategoryPills
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        dict={dict}
      />

      {/* Grid */}
      <div className="mt-4">
        <AuctionGrid
          items={displayedItems}
          dict={dict}
          lang={lang}
          onSelect={handleSelectItem}
        />
      </div>

      {/* Load More Button */}
      {canLoadMore && (
        <div className="w-full flex justify-center mt-10">
          <button
            type="button"
            onClick={handleLoadMore}
            className="px-8 py-2.5 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-on-primary transition-all duration-200 shadow-sm active:scale-95"
          >
            {dict.auction?.load_more || "Tải thêm"}
          </button>
        </div>
      )}

      {/* Anime / Game Gacha Slash Banner on product click */}
      {slashItem && (
        <AuctionStartBanner
          productName={slashItem.title}
          startPrice={slashItem.startingPrice || slashItem.currentPrice}
          onComplete={handleBannerComplete}
        />
      )}
    </div>
  );
}
