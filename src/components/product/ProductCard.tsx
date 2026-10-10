"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Heart, BadgeCheck } from "lucide-react";

export interface ProductItem {
  id: string | number;
  title: string;
  price: string;
  image: string;
  badge?: {
    text: string;
    variant: "primary" | "secondary" | "tertiary";
  };
  seller: {
    name: string;
    avatar: string;
    location: string;
    isVerified?: boolean;
  };
  postedAt: string;
}

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const params = useParams();
  const lang = (params?.lang as string) || "vi";

  const badgeColors = {
    primary: "bg-brand-blue text-white",
    secondary: "bg-muted text-foreground border border-border",
    tertiary: "bg-brand-yellow text-brand-dark font-bold",
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  return (
    <Link
      href={`/${lang}/product/${product.id}`}
      className="bg-card rounded-lg overflow-hidden flex flex-col cursor-pointer border border-border shadow-xs hover:shadow-md hover:border-foreground/20 transition-all duration-150 group relative"
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-muted/40 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
          loading="lazy"
        />
        {product.badge && (
          <span
            className={`absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
              badgeColors[product.badge.variant] || badgeColors.primary
            }`}
          >
            {product.badge.text}
          </span>
        )}

        {/* Favorite Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove favorite" : "Add to favorite"}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full border border-border shadow-xs transition-colors duration-150 ${
            isFavorite
              ? "bg-brand-coral text-white"
              : "bg-card/90 text-muted-foreground hover:text-brand-coral hover:bg-card"
          }`}
        >
          <Heart
            size={14}
            className={`transition-colors ${isFavorite ? "fill-current" : ""}`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-2.5 sm:p-3 flex flex-col gap-1.5 flex-1 justify-between">
        <div>
          <h3 className="text-xs sm:text-[13px] font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <div className="mt-1">
            <span className="text-sm sm:text-base font-bold text-foreground tracking-tight">
              {product.price}
            </span>
          </div>
        </div>

        {/* Seller row */}
        <div className="flex items-center justify-between gap-1 pt-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              src={product.seller.avatar}
              alt={product.seller.name}
              className="w-4 h-4 rounded-full object-cover flex-shrink-0"
            />
            <span className="text-[11px] truncate max-w-[80px]">
              {product.seller.name}
            </span>
            {product.seller.isVerified && (
              <BadgeCheck
                size={13}
                className="text-primary flex-shrink-0"
                aria-label="Verified seller"
              />
            )}
          </div>

          <div className="flex items-center gap-0.5 text-[10px] flex-shrink-0">
            <MapPin size={10} />
            <span>{product.seller.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
