"use client";

import {
  Banknote,
  CreditCard,
  Landmark,
  QrCode,
  ShieldCheck,
  Wallet,
  Check,
} from "lucide-react";
import {
  paymentCategories,
  type PaymentMethodId,
} from "./checkout-data";
import { PaymentIcon } from "./PaymentIcons";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface PaymentMethodProps {
  selectedCategory: PaymentMethodId;
  onSelectCategory: (id: PaymentMethodId) => void;
  selectedSubOption: string;
  onSelectSubOption: (id: string) => void;
  dict: Dictionary;
}

export function PaymentMethod({
  selectedCategory,
  onSelectCategory,
  selectedSubOption,
  onSelectSubOption,
  dict,
}: PaymentMethodProps) {
  const getCategoryIcon = (id: PaymentMethodId) => {
    switch (id) {
      case "cod":
        return <Banknote size={20} className="text-secondary" />;
      case "bank_transfer":
        return <QrCode size={20} className="text-primary" />;
      case "wallet":
        return <Wallet size={20} className="text-tertiary" />;
      case "intl_card":
        return <CreditCard size={20} className="text-secondary" />;
      case "napas":
        return <PaymentIcon id="napas" size={22} className="rounded-xs" />;
    }
  };

  return (
    <section className="bg-surface rounded-lg p-4 shadow-xs border border-outline-variant">
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-outline-variant/60 text-primary">
        <CreditCard size={18} />
        <h2 className="font-bold text-sm md:text-base text-on-background">
          {dict.checkout?.payment_method || "Phương thức thanh toán"}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {paymentCategories.map((cat) => {
          const isSelected = cat.id === selectedCategory;

          return (
            <div
              key={cat.id}
              className={`border rounded-lg transition-all overflow-hidden ${
                isSelected
                  ? "border-primary bg-surface-container-low/50 shadow-xs"
                  : "border-outline-variant hover:bg-surface-container-lowest"
              }`}
            >
              {/* Category Header Row */}
              <label
                onClick={() => onSelectCategory(cat.id)}
                className="flex items-start p-3 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="payment_category"
                  checked={isSelected}
                  onChange={() => onSelectCategory(cat.id)}
                  className="mt-1 mr-3 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                />
                <div className="mr-3 mt-0.5 flex-shrink-0">
                  {getCategoryIcon(cat.id)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs md:text-sm text-on-background flex items-center gap-2 flex-wrap">
                    <span>{cat.title}</span>
                  </div>
                  <div className="text-[11px] md:text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                    {cat.desc}
                  </div>
                </div>
              </label>

              {/* Sub-options (when this category is active) */}
              {isSelected && cat.subOptions && cat.subOptions.length > 0 && (
                <div className="px-4 pb-3.5 pt-1 border-t border-outline-variant/40 bg-surface/70">
                  <div className="text-[11px] font-semibold text-on-surface-variant mb-2">
                    Chọn kênh thanh toán cụ thể:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {cat.subOptions.map((sub) => {
                      const isSubSelected = selectedSubOption === sub.id;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => onSelectSubOption(sub.id)}
                          className={`px-2.5 py-2 rounded-lg border text-xs font-semibold flex items-center justify-between gap-1.5 transition-all text-left ${
                            isSubSelected
                              ? "border-primary bg-primary text-on-primary shadow-xs"
                              : "border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <PaymentIcon id={sub.id} size={22} className="rounded-sm" />
                            <span className="truncate">{sub.name}</span>
                          </div>
                          {isSubSelected ? (
                            <Check size={14} className="flex-shrink-0" />
                          ) : (
                            sub.tag && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-secondary-container text-on-secondary-container font-normal shrink-0">
                                {sub.tag}
                              </span>
                            )
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Security Note */}
      <div className="mt-3.5 pt-3 border-t border-outline-variant/40 flex items-center gap-2 text-xs text-on-surface-variant">
        <ShieldCheck size={16} className="text-primary flex-shrink-0" />
        <span className="text-[11px] sm:text-xs">
          Mọi thông tin thanh toán đều được mã hóa bảo mật chuẩn PCI-DSS & bảo vệ bởi GomGoods Escrow.
        </span>
      </div>
    </section>
  );
}
