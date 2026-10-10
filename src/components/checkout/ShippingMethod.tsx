"use client";

import { Truck } from "lucide-react";
import { shippingMethods, formatVND, type ShippingMethodOption } from "./checkout-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ShippingMethodProps {
  selectedMethodId: string;
  onSelectMethod: (id: "standard" | "express" | "pickup") => void;
  dict: Dictionary;
}

export function ShippingMethod({
  selectedMethodId,
  onSelectMethod,
  dict,
}: ShippingMethodProps) {
  return (
    <section className="bg-surface rounded-lg p-4 shadow-xs border border-outline-variant">
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-outline-variant/60 text-primary">
        <Truck size={18} />
        <h2 className="font-bold text-sm md:text-base text-on-background">
          {dict.checkout?.shipping_method || "Phương thức giao hàng"}
        </h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {shippingMethods.map((method: ShippingMethodOption) => {
          const isSelected = method.id === selectedMethodId;
          return (
            <label
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? "border-primary bg-surface-container-low shadow-xs"
                  : "border-outline-variant hover:bg-surface-container-lowest"
              }`}
            >
              <input
                type="radio"
                name="shipping_method"
                checked={isSelected}
                onChange={() => onSelectMethod(method.id)}
                className="mt-1 mr-3 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs md:text-sm text-on-background">
                    {method.title}
                  </span>
                  <span className="text-xs md:text-sm font-bold text-primary whitespace-nowrap">
                    {method.price === 0
                      ? dict.checkout?.free || "Miễn phí"
                      : formatVND(method.price)}
                  </span>
                </div>
                <div className="text-[11px] md:text-xs text-on-surface-variant mt-0.5">
                  {method.desc}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
