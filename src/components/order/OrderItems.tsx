import Image from "next/image";
import Link from "next/link";
import { Store } from "lucide-react";

export interface OrderItemProps {
  seller: {
    name: string;
    location?: string;
  };
  items: Array<{
    id: string;
    title: string;
    image: string;
    category?: string;
    condition?: string;
    price: number;
    quantity: number;
  }>;
  lang?: string;
}

export function OrderItems({ seller, items, lang = "vi" }: OrderItemProps) {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
        <div className="flex items-center gap-2">
          <Store size={15} className="text-primary" />
          <span className="text-xs sm:text-sm font-bold text-foreground">
            {seller.name}
          </span>
          {seller.location && (
            <span className="text-[11px] text-muted-foreground">
              ({seller.location})
            </span>
          )}
        </div>
        <Link
          href={`/${lang}/chat`}
          className="text-xs text-primary font-bold hover:underline"
        >
          Nhắn tin shop
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3.5 py-1">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-muted shrink-0 border border-border/60">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              {item.condition && (
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground mb-1">
                  {item.condition}
                </div>
              )}
              <h4 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {item.category && `Phân loại: ${item.category} · `}Số lượng: x{item.quantity}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs sm:text-sm font-black text-primary">
                ₫{item.price.toLocaleString("vi-VN")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
