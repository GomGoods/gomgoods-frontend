"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

interface CartHeaderButtonProps {
  lang: string;
  title: string;
}

export function CartHeaderButton({ lang, title }: CartHeaderButtonProps) {
  const { totalItemCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href={`/${lang}/cart`}
      title={title}
      className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors duration-150 active:scale-95 relative"
    >
      <ShoppingBag size={18} />
      {mounted && totalItemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-75 duration-200">
          {totalItemCount > 99 ? "99+" : totalItemCount}
        </span>
      )}
    </Link>
  );
}
