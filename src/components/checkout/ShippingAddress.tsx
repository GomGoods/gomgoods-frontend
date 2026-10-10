"use client";

import { useState } from "react";
import { MapPin, Check, Plus, X } from "lucide-react";
import type { AddressItem } from "./checkout-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ShippingAddressProps {
  selectedAddress: AddressItem;
  allAddresses: AddressItem[];
  onSelectAddress: (address: AddressItem) => void;
  dict: Dictionary;
}

export function ShippingAddress({
  selectedAddress,
  allAddresses,
  onSelectAddress,
  dict,
}: ShippingAddressProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-surface rounded-lg p-4 shadow-xs border border-outline-variant">
        <div className="flex justify-between items-center mb-3 pb-2.5 border-b border-outline-variant/60">
          <div className="flex items-center gap-2 text-primary">
            <MapPin size={18} className="fill-primary/20 text-primary" />
            <h2 className="font-bold text-sm md:text-base text-on-background">
              {dict.checkout?.shipping_address || "Địa chỉ nhận hàng"}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-secondary text-xs font-semibold hover:underline active:scale-95 transition-all"
          >
            {dict.checkout?.change_address || "Thay đổi"}
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-3">
            <span className="font-bold text-sm md:text-base text-on-background">
              {selectedAddress.name}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              {selectedAddress.phone}
            </span>
            {selectedAddress.isDefault && (
              <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.5 rounded-xs">
                {dict.checkout?.default_badge || "Mặc định"}
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
            {selectedAddress.address}
          </p>
        </div>
      </section>

      {/* Address Switcher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-surface rounded-xl border border-outline-variant shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-bold text-base text-on-surface">
                {dict.checkout?.select_address || "Chọn địa chỉ nhận hàng"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
              {allAddresses.map((addr) => {
                const isCurrent = addr.id === selectedAddress.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => {
                      onSelectAddress(addr);
                      setIsModalOpen(false);
                    }}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isCurrent
                        ? "border-primary bg-surface-container-low shadow-xs"
                        : "border-outline-variant hover:bg-surface-container-lowest"
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-on-surface">
                          {addr.name}
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          {addr.phone}
                        </span>
                        {addr.isDefault && (
                          <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.5 rounded-xs">
                            {dict.checkout?.default_badge || "Mặc định"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {addr.address}
                      </p>
                    </div>

                    {isCurrent && (
                      <div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-lg hover:bg-surface-container-low transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
