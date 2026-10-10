"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, MessageSquare, ShoppingBag } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useCart } from "@/context/CartContext";

interface ProductActionsProps {
  productId?: string | number;
  productTitle: string;
  productPrice: string;
  productImage?: string;
  sellerName?: string;
  sellerAvatar?: string;
  isGoldSeller?: boolean;
  dict: Dictionary;
  lang?: string;
}

export function ProductActions({
  productId = "",
  productTitle,
  productPrice,
  productImage = "",
  sellerName = "Người bán",
  sellerAvatar = "",
  isGoldSeller = false,
  dict,
  lang = "vi",
}: ProductActionsProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isSaved, setIsSaved] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const parseProductPrice = (priceStr: string) => {
    const digits = priceStr.replace(/\D/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  const handleBuyNow = () => {
    setIsBuying(true);
    const numericPrice = parseProductPrice(productPrice);
    const cartItemId = `cart-prod-${productId || Date.now()}`;

    addToCart({
      item: {
        id: cartItemId,
        productId: String(productId),
        title: productTitle,
        price: numericPrice,
        image: productImage,
        quantity: 1,
        inStock: true,
        maxQuantity: 10,
      },
      seller: {
        sellerId: sellerName.toLowerCase().replace(/\s+/g, "-"),
        sellerName: sellerName,
        sellerAvatar: sellerAvatar,
        isTrusted: isGoldSeller,
      },
    });

    setTimeout(() => {
      setIsBuying(false);
      router.push(`/${lang}/checkout?items=${cartItemId}`);
    }, 300);
  };

  const chatHref = productId
    ? `/${lang}/chat?productId=${encodeURIComponent(String(productId))}`
    : `/${lang}/chat`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-md border-t border-outline-variant shadow-[0_-4px_16px_rgba(0,0,0,0.08)] z-40 p-3 flex items-center gap-2.5">
      {/* Save Button */}
      <button
        type="button"
        onClick={() => setIsSaved(!isSaved)}
        className={`w-12 h-12 flex flex-col items-center justify-center rounded-xl border transition-colors flex-shrink-0 cursor-pointer ${
          isSaved
            ? "border-primary text-primary bg-primary/5"
            : "border-outline-variant text-on-surface-variant hover:text-primary"
        }`}
      >
        <Heart
          className={`w-4 h-4 ${isSaved ? "fill-primary text-primary" : ""}`}
        />
        <span className="text-[10px] font-semibold mt-0.5">
          {isSaved
            ? dict.product_detail?.saved || "Đã lưu"
            : dict.product_detail?.save || "Lưu"}
        </span>
      </button>

      {/* Chat Button */}
      <Link
        href={chatHref}
        className="w-12 h-12 flex flex-col items-center justify-center rounded-xl border border-secondary text-secondary hover:bg-secondary-container transition-colors flex-shrink-0"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="text-[10px] font-semibold mt-0.5">
          {dict.product_detail?.chat || "Chat"}
        </span>
      </Link>

      {/* Buy Now Button */}
      <button
        type="button"
        onClick={handleBuyNow}
        disabled={isBuying}
        className="flex-1 bg-primary hover:bg-primary-container text-white h-12 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer disabled:opacity-75"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>{isBuying ? "Đang xử lý..." : dict.product_detail?.buy_now || "Mua ngay"}</span>
      </button>
    </div>
  );
}
