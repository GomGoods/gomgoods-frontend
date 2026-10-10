import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { ProductContext } from "./types";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface ProductContextBarProps {
  product: ProductContext;
  dict: Dictionary;
  lang?: Locale;
}

export function ProductContextBar({
  product,
  dict,
  lang = "vi",
}: ProductContextBarProps) {
  return (
    <div className="px-3 md:px-4 py-2.5 bg-surface border-b border-outline-variant flex items-center gap-3 flex-shrink-0 shadow-xs z-10">
      {/* Product Image & Info Link */}
      <Link
        href={`/${lang}/product/${product.id}`}
        className="flex items-center gap-3 flex-1 min-w-0 group hover:opacity-90 transition-opacity"
      >
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden border border-outline-variant flex-shrink-0 bg-surface-container-lowest">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="56px"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="min-w-0">
          <h4 className="text-xs md:text-sm font-semibold text-on-surface truncate leading-snug group-hover:text-primary transition-colors">
            {product.title}
          </h4>
          <div className="text-sm md:text-base font-bold text-foreground mt-0.5">
            {product.price}
          </div>
        </div>
      </Link>

      {/* CTA Button */}
      <Link
        href={`/${lang}/checkout?productId=${product.id}`}
        className="px-3 md:px-4 py-1.5 md:py-2 bg-primary text-on-primary rounded-lg text-xs md:text-sm font-bold hover:bg-primary-container transition-colors duration-150 whitespace-nowrap shadow-xs active:scale-95 flex items-center gap-1.5"
      >
        <ShoppingBag size={14} className="hidden sm:inline-block" />
        <span>{dict.chat?.buy_now || "Buy now"}</span>
      </Link>
    </div>
  );
}
