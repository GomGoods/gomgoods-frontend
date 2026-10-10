"use client";

import { ProductCard, type ProductItem } from "@/components/product/ProductCard";
import { PromoBanner } from "./PromoBanner";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { sampleMarketplaceProducts } from "./marketplace-data";
export { sampleMarketplaceProducts };

interface MarketplaceGridProps {
  products?: ProductItem[];
  dict?: Dictionary;
}

export function MarketplaceGrid({
  products = sampleMarketplaceProducts,
  dict,
}: MarketplaceGridProps) {
  // First two cards
  const firstTwo = products.slice(0, 2);
  // Remaining cards
  const remaining = products.slice(2);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
      {/* Cards 1 and 2 */}
      {firstTwo.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* Bento Promo Banner spanning 2 columns */}
      <PromoBanner
        ctaText={dict?.marketplace?.explore_now || "Khám phá ngay"}
      />

      {/* Remaining Cards */}
      {remaining.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
