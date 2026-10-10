"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductBentoGallery } from "./ProductBentoGallery";
import { ProductMainPanel } from "./ProductMainPanel";
import { ProductReviews } from "./ProductReviews";
import { SellerOtherProducts } from "./SellerOtherProducts";
import { ProductActions } from "./ProductActions";
import { RecommendedProductsSection } from "./RecommendedProductsSection";
import type { ProductDetailItem } from "./product-detail-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProductDetailViewProps {
  product: ProductDetailItem;
  dict: Dictionary;
  lang?: string;
}

export function ProductDetailView({
  product,
  dict,
  lang = "vi",
}: ProductDetailViewProps) {
  return (
    <div className="w-full pb-20 lg:pb-12 pt-2 flex flex-col gap-5">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant font-medium">
        <Link
          href={`/${lang}`}
          className="hover:text-primary transition-colors"
        >
          {dict.product_detail?.home || "Trang chủ"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/60" />
        <Link
          href={`/${lang}/marketplace`}
          className="hover:text-primary transition-colors"
        >
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/60" />
        <span className="text-on-background font-semibold truncate max-w-[220px] sm:max-w-md">
          {product.title}
        </span>
      </nav>

      {/* Main Top Hero Section:
          Left = Image Gallery ONLY
          Right = Horizontal Seller Bar (aligned with top of image) -> Price -> Product Details by Seller -> Action Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Product Images ONLY */}
        <div className="lg:col-span-6 xl:col-span-7">
          <ProductBentoGallery
            images={product.images}
            title={product.title}
            badges={product.badges}
          />
        </div>

        {/* Right Column: Seller Info Bar (aligned with image top) -> Price -> Seller Product Details -> Action Buttons */}
        <div className="lg:col-span-6 xl:col-span-5">
          <ProductMainPanel
            product={product}
            dict={dict}
            lang={lang}
          />
        </div>
      </div>

      {/* Bottom Section: Q&A Reviews (Left) + Other Seller Products (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-4 border-t border-outline-variant/30">
        {/* Left: Interactive Q&A / Reviews */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <ProductReviews
            initialComments={product.initialComments}
            dict={dict}
          />
        </div>

        {/* Right: Other products by this seller */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <SellerOtherProducts
            products={product.otherProducts}
            dict={dict}
            lang={lang}
          />
        </div>
      </div>

      {/* Smart Recommendation System Section */}
      <RecommendedProductsSection
        currentProductId={product.id}
        categoryName={product.categoryName}
        currentPrice={product.price}
        lang={lang}
      />

      {/* Mobile Fixed Bottom Bar */}
      <ProductActions
        productId={product.id}
        productTitle={product.title}
        productPrice={product.price}
        productImage={product.images.main}
        sellerName={product.seller.name}
        sellerAvatar={product.seller.avatar}
        isGoldSeller={product.seller.isGoldSeller}
        dict={dict}
        lang={lang}
      />
    </div>
  );
}
