"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import { ProductCard, type ProductItem } from "@/components/product/ProductCard";

import { sampleProducts } from "./home-products-data";
export { sampleProducts };

export function RecommendedProducts() {
  const params = useParams();
  const lang = (params?.lang as string) || "vi";

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4.5 rounded-full bg-brand-blue" />
          <h2 className="text-lg md:text-xl font-bold text-foreground tracking-tight flex items-center gap-1.5">
            <span>Đề xuất cho bạn</span>
            <Sparkles size={16} className="text-amber-500 fill-amber-400" />
          </h2>
        </div>
        <Link
          href={`/${lang}/marketplace`}
          className="text-xs sm:text-sm font-semibold text-primary hover:text-brand-blue-hover flex items-center gap-1 transition-all group"
        >
          <span>Xem tất cả</span>
          <ArrowRight size={14} className="stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-3.5">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
