"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SellerBannerHeader } from "./SellerBannerHeader";
import { SellerProductsTab } from "./SellerProductsTab";
import { SellerSidebarReviews } from "./SellerSidebarReviews";
import type { SellerProfileData } from "./seller-data";
import type { ProductItem } from "@/components/product/ProductCard";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface SellerProfileViewProps {
  seller: SellerProfileData;
  products: ProductItem[];
  dict?: Dictionary;
  lang?: string;
}

export function SellerProfileView({
  seller,
  products,
  dict,
  lang = "vi",
}: SellerProfileViewProps) {
  return (
    <div className="w-full pb-16 pt-1 flex flex-col gap-4">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant font-medium">
        <Link href={`/${lang}`} className="hover:text-primary transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/60" />
        <Link href={`/${lang}/marketplace`} className="hover:text-primary transition-colors">
          Thanh lý & Chợ đồ cũ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/60" />
        <span className="text-on-background font-semibold truncate max-w-[240px]">
          {seller.name}
        </span>
      </nav>

      {/* 2. Top Banner & Profile Header */}
      <SellerBannerHeader seller={seller} dict={dict} lang={lang} />

      {/* 3. Main Content: 2 Columns */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Products, Reviews & Feed Tabs (Flex-1) */}
        <SellerProductsTab
          products={products}
          seller={seller}
        />

        {/* Right: Featured Reviews & Trust Panel */}
        <SellerSidebarReviews
          reviews={seller.reviews}
          sellerName={seller.name}
        />
      </div>
    </div>
  );
}
