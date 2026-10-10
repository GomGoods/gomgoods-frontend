"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingCart,
  MessageSquare,
  ShoppingBag,
  Check,
} from "lucide-react";
import { SellerHeaderBar } from "./SellerHeaderBar";
import type { ProductDetailItem } from "./product-detail-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useCart } from "@/context/CartContext";

interface ProductMainPanelProps {
  product: ProductDetailItem;
  dict?: Dictionary;
  lang?: string;
}

export function ProductMainPanel({
  product,
  dict,
  lang = "vi",
}: ProductMainPanelProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [wantsCount, setWantsCount] = useState(product.wantsCount);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      setWantsCount((prev) => prev - 1);
      setIsFavorited(false);
    } else {
      setWantsCount((prev) => prev + 1);
      setIsFavorited(true);
    }
  };

  const parseProductPrice = (priceStr: string) => {
    const digits = priceStr.replace(/\D/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  const handleBuyNow = () => {
    setIsBuying(true);
    const numericPrice = parseProductPrice(product.price);
    const cartItemId = `cart-prod-${product.id}`;

    addToCart({
      item: {
        id: cartItemId,
        productId: product.id,
        title: product.title,
        price: numericPrice,
        image: product.images.main || "",
        quantity: 1,
        inStock: true,
        maxQuantity: 10,
      },
      seller: {
        sellerId: product.seller.name.toLowerCase().replace(/\s+/g, "-"),
        sellerName: product.seller.name,
        sellerAvatar: product.seller.avatar,
        isTrusted: product.seller.isGoldSeller,
      },
    });

    setAddedToast(true);
    setTimeout(() => {
      setIsBuying(false);
      router.push(`/${lang}/checkout?items=${cartItemId}`);
    }, 400);
  };

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const numericPrice = parseProductPrice(product.price);
    const cartItemId = `cart-prod-${product.id}`;

    addToCart({
      item: {
        id: cartItemId,
        productId: product.id,
        title: product.title,
        price: numericPrice,
        image: product.images.main || "",
        quantity: 1,
        inStock: true,
        maxQuantity: 10,
      },
      seller: {
        sellerId: product.seller.name.toLowerCase().replace(/\s+/g, "-"),
        sellerName: product.seller.name,
        sellerAvatar: product.seller.avatar,
        isTrusted: product.seller.isGoldSeller,
      },
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleChat = () => {
    router.push(`/${lang}/chat?productId=${encodeURIComponent(product.id)}`);
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* 1. Thông tin người bán dàn ngang (Song song đỉnh với ảnh) */}
      <SellerHeaderBar seller={product.seller} dict={dict} lang={lang} />

      {/* Main Info & Content Card */}
      <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-outline-variant/40 shadow-xs flex flex-col gap-4 relative">
        {/* Nút Trái Tim Wishlist ở góc trên phải div */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          title={isFavorited ? "Bỏ yêu thích" : "Thêm vào danh sách yêu thích"}
          aria-label={isFavorited ? "Bỏ yêu thích" : "Thêm vào danh sách yêu thích"}
          className={`absolute top-4 right-4 sm:top-5 sm:right-5 z-10 p-2 sm:p-2.5 rounded-full border transition-all duration-150 cursor-pointer active:scale-90 flex items-center justify-center shadow-xs ${
            isFavorited
              ? "bg-rose-500/10 text-rose-500 border-rose-300 dark:border-rose-900/60"
              : "bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-rose-500 border-outline-variant/50"
          }`}
        >
          <Heart
            size={18}
            className={`transition-colors ${
              isFavorited ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>

        {/* 2. Mức giá, bao ship và số người muốn mua / lượt xem */}
        <div className="flex flex-col gap-1.5 pb-3 border-b border-outline-variant/20 pr-12">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-on-surface-variant/70 line-through">
                {product.originalPrice}
              </span>
            )}
            <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 ml-0.5">
              | Bao ship
            </span>
          </div>

          <div className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
            <span>{wantsCount} muốn mua</span>
            <span className="text-outline-variant">•</span>
            <span>{product.viewsCount} lượt xem</span>
          </div>
        </div>

        {/* 3. Dưới price: Tiêu đề và 1 đoạn text cho seller ghi */}
        <div className="flex flex-col gap-2">
          <h1 className="text-base sm:text-lg font-bold text-on-background leading-snug">
            {product.title}
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
            {product.description.intro}
          </p>
        </div>

        {/* 4. Cụm 3 nút: "Chat ngay", "Mua ngay", "Thêm" */}
        <div className="grid grid-cols-12 gap-2.5 pt-3 border-t border-outline-variant/20">
          {/* Chat ngay (Vàng tươi nổi bật) */}
          <button
            type="button"
            onClick={handleChat}
            className="col-span-4 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span className="truncate">Chat ngay</span>
          </button>

          {/* Mua ngay (Nền tối / primary đậm) */}
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={isBuying}
            className="col-span-5 py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all duration-150 cursor-pointer active:scale-95 disabled:opacity-75"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isBuying ? "Đang xử lý..." : "Mua ngay"}</span>
          </button>

          {/* Thêm vào giỏ hàng */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`col-span-3 py-2.5 px-2 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer active:scale-95 ${
              isAdded
                ? "border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
                : "border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-background"
            }`}
            title="Thêm vào giỏ hàng"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                <span className="truncate">Đã thêm</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="truncate">Thêm</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
