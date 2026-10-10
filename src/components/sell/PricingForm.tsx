"use client";

import { DollarSign, Layers } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface PricingFormProps {
  price: string;
  onPriceChange: (val: string) => void;
  negotiable: boolean;
  onNegotiableChange: (val: boolean) => void;
  quantity: number;
  onQuantityChange: (val: number) => void;
  dict: Dictionary;
  error?: string;
}

export function PricingForm({
  price,
  onPriceChange,
  negotiable,
  onNegotiableChange,
  quantity,
  onQuantityChange,
  dict,
  error,
}: PricingFormProps) {
  const t = dict.sell;

  // Format raw number string for user convenience
  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    onPriceChange(rawValue);
  };

  const formattedPrice = price
    ? Number(price).toLocaleString("vi-VN")
    : "";

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 md:p-6 shadow-sm">
      <h2 className="text-base md:text-lg font-bold text-on-surface flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <DollarSign className="w-4 h-4" />
        </div>
        <span>{t.pricing_title}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {/* Price & Negotiable */}
        <div>
          <label
            htmlFor="price"
            className="block text-xs sm:text-sm font-semibold text-on-surface mb-1.5"
          >
            {t.price} <span className="text-primary font-bold">*</span>
          </label>
          <div className="relative">
            <input
              id="price"
              type="text"
              inputMode="numeric"
              value={formattedPrice}
              onChange={handlePriceInput}
              placeholder={t.price_placeholder}
              className={`w-full text-sm sm:text-base font-bold text-primary h-11 pl-3.5 pr-10 rounded-lg border bg-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-all ${
                error
                  ? "border-error ring-1 ring-error"
                  : "border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-on-surface-variant">
              đ
            </span>
          </div>

          {error && (
            <p className="mt-1 text-xs text-error font-medium">{error}</p>
          )}

          {/* Negotiable Checkbox */}
          <label className="mt-3 flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={negotiable}
              onChange={(e) => onNegotiableChange(e.target.checked)}
              className="w-4 h-4 rounded border-outline text-primary focus:ring-primary accent-primary cursor-pointer"
            />
            <span className="text-xs sm:text-sm text-on-surface font-medium">
              {t.negotiable}
            </span>
          </label>
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="block text-xs sm:text-sm font-semibold text-on-surface mb-1.5 flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-on-surface-variant" />
            <span>{t.quantity}</span>
            <span className="text-primary font-bold">*</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="w-11 h-11 rounded-lg border border-outline-variant bg-surface hover:bg-surface-container text-on-surface font-bold text-base flex items-center justify-center disabled:opacity-40 cursor-pointer transition-colors"
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-20 text-center font-bold text-sm sm:text-base h-11 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-11 h-11 rounded-lg border border-outline-variant bg-surface hover:bg-surface-container text-on-surface font-bold text-base flex items-center justify-center cursor-pointer transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
