"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Eye,
  EyeOff,
  Trash2,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import type { UserListingItem } from "./profile-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProfileMyProductsProps {
  initialProducts: UserListingItem[];
  dict?: Dictionary;
  lang?: string;
}

export function ProfileMyProducts({
  initialProducts,
  dict,
  lang = "vi",
}: ProfileMyProductsProps) {
  const [products, setProducts] = useState<UserListingItem[]>(initialProducts);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const p = dict?.profile;

  useEffect(() => {
    const handleOutsideClick = () => setOpenMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleToggleHide = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "hidden" ? "active" : "hidden",
            }
          : item
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn gỡ bài đăng này không?")) {
      setProducts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("vi-VN")} ₫`;
  };

  const getConditionColor = (cond: UserListingItem["condition"]) => {
    switch (cond) {
      case "NEW":
        return "bg-primary text-primary-foreground";
      case "LIKENEW":
        return "bg-brand-yellow text-brand-dark";
      case "USED":
        return "bg-muted text-foreground border border-border";
      default:
        return "bg-muted text-foreground";
    }
  };

  return (
    <section className="flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            {p?.my_products_title || "Sản phẩm của tôi"}
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {products.length}
          </span>
        </div>
        <Link
          href={`/${lang}/marketplace`}
          className="text-xs sm:text-sm font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
        >
          {p?.view_all || "Xem tất cả"}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 5-Column Responsive Grid like Homepage */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-3.5">
        {/* "+ Thêm sản phẩm" Add Card */}
        <Link
          href={`/${lang}/sell`}
          className="group relative bg-card border-2 border-dashed border-primary/30 hover:border-primary rounded-lg overflow-hidden flex flex-col items-center justify-center p-3 text-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all aspect-[3/4] sm:aspect-auto sm:min-h-[220px]"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform text-primary">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-xs sm:text-[13px] font-bold text-foreground group-hover:text-primary">
            {p?.add_product || "Thêm sản phẩm"}
          </span>
          <span className="text-[10px] text-muted-foreground mt-0.5 max-w-[110px]">
            Đăng bán trong 1 phút
          </span>
        </Link>

        {/* Product Cards */}
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/${lang}/product/${item.id}`}
            className="bg-card rounded-lg overflow-hidden flex flex-col cursor-pointer border border-border shadow-xs hover:shadow-md hover:border-foreground/20 transition-all duration-150 group relative"
          >
            {/* Product Image */}
            <div className="relative aspect-square w-full bg-muted/40 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className={`object-cover group-hover:scale-103 transition-transform duration-200 ${
                  item.status === "hidden" ? "grayscale opacity-60" : ""
                }`}
              />

              {/* Condition Badge */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider ${getConditionColor(
                    item.condition
                  )}`}
                >
                  {item.condition}
                </span>
                {item.status === "hidden" && (
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-muted-foreground text-background">
                    ĐÃ ẨN
                  </span>
                )}
              </div>

              {/* "..." More Options Action Menu */}
              <div className="absolute top-2 right-2 z-20">
                <button
                  type="button"
                  aria-label="Tùy chọn sản phẩm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === item.id ? null : item.id);
                  }}
                  className="p-1 rounded-full bg-card/90 text-muted-foreground hover:text-foreground hover:bg-card border border-border shadow-xs transition-colors cursor-pointer"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>

                {openMenuId === item.id && (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="absolute right-0 top-7 bg-card border border-border rounded-lg shadow-lg py-1 w-36 z-30 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <Link
                      href={`/${lang}/sell?edit=${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted font-medium transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-primary" />
                      <span>Chỉnh sửa</span>
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleHide(item.id);
                        setOpenMenuId(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted font-medium transition-colors text-left cursor-pointer"
                    >
                      {item.status === "hidden" ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-brand-green" />
                          <span>Hiện bài đăng</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-amber-500" />
                          <span>Tạm ẩn bài</span>
                        </>
                      )}
                    </button>
                    <div className="my-1 border-t border-border" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(item.id);
                        setOpenMenuId(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 font-medium transition-colors text-left cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xoá bài đăng</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details - Compact Height matched to Home page ProductCard */}
            <div className="p-2.5 sm:p-3 flex flex-col gap-1.5 flex-1 justify-between">
              <div>
                <h3 className="text-xs sm:text-[13px] font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="mt-1">
                  <span className="text-sm sm:text-base font-bold text-foreground tracking-tight">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 pt-1.5 text-[10px] text-muted-foreground border-t border-border/50">
                <span className="truncate max-w-[85px]">{item.category}</span>
                <span className="flex-shrink-0">{item.createdAt}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
