"use client";

import Image from "next/image";
import Link from "next/link";
import type { SellerProductPreview } from "./product-detail-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface SellerOtherProductsProps {
  products: SellerProductPreview[];
  dict: Dictionary;
  lang?: string;
}

export function SellerOtherProducts({
  products,
  dict,
  lang = "vi",
}: SellerOtherProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-surface rounded-2xl p-5 shadow-xs border border-outline-variant/40 flex flex-col gap-3.5">
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-sm sm:text-base font-bold text-on-background">
          {dict.product_detail?.from_same_seller || "Cùng người bán"}
        </h3>
        <Link
          href={`/${lang}/marketplace`}
          className="text-xs font-semibold text-primary hover:underline"
        >
          {dict.product_detail?.view_all || "Xem tất cả"}
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/${lang}/product/${item.id}`}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-low transition-colors group"
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container border border-outline-variant/40">
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                sizes="56px"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col justify-center flex-1 min-w-0">
              <span className="text-xs font-semibold text-on-background truncate group-hover:text-primary transition-colors">
                {item.title}
              </span>
              <span className="text-xs font-bold text-primary mt-1">
                {item.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
