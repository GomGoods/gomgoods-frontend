"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  sampleAddresses,
  sampleCheckoutGroups,
  shippingMethods,
  type AddressItem,
  type CheckoutSellerGroupType,
  type PaymentMethodId,
} from "./checkout-data";
import { ShippingAddress } from "./ShippingAddress";
import { CheckoutItems } from "./CheckoutItems";
import { OrderSummary } from "./OrderSummary";
import { OrderSuccessModal } from "./OrderSuccessModal";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { useCart } from "@/context/CartContext";

interface CheckoutViewProps {
  dict: Dictionary;
  lang: Locale;
}

export function CheckoutView({ dict, lang }: CheckoutViewProps) {
  const searchParams = useSearchParams();
  const itemsParam = searchParams.get("items");
  const { groups: cartGroups, clearCart, updateQuantity: cartUpdateQuantity } = useCart();

  const [addresses] = useState<AddressItem[]>(sampleAddresses);
  const [selectedAddress, setSelectedAddress] = useState<AddressItem>(
    sampleAddresses[0]
  );

  // Compute checkout groups from CartContext & URL params
  const initialGroups = useMemo(() => {
    if (!itemsParam) {
      // If no param, take all items from cartGroups that are in stock
      const filtered = cartGroups
        .map((g) => ({
          ...g,
          items: g.items.filter((i) => i.inStock),
        }))
        .filter((g) => g.items.length > 0);
      return filtered.length > 0 ? filtered : sampleCheckoutGroups;
    }

    const requestedIds = new Set(itemsParam.split(",").map((s) => s.trim()));
    const matched = cartGroups
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => requestedIds.has(i.id)),
      }))
      .filter((g) => g.items.length > 0);

    return matched.length > 0 ? matched : sampleCheckoutGroups;
  }, [itemsParam, cartGroups]);

  const [groups, setGroups] = useState<CheckoutSellerGroupType[]>(initialGroups);

  useEffect(() => {
    setGroups(initialGroups);
  }, [initialGroups]);

  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<
    "standard" | "express" | "pickup"
  >("standard");

  const [selectedPaymentCategory, setSelectedPaymentCategory] =
    useState<PaymentMethodId>("bank_transfer");
  const [selectedSubPaymentOption, setSelectedSubPaymentOption] =
    useState<string>("vietqr");

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderCode, setPlacedOrderCode] = useState<string | null>(null);

  // Calculate items subtotal
  const itemsTotal = useMemo(() => {
    return groups.reduce((acc, g) => {
      return (
        acc +
        g.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      );
    }, 0);
  }, [groups]);

  // Shipping fee based on selected method
  const shippingFee = useMemo(() => {
    if (appliedCoupon === "FREESHIP" || itemsTotal >= 1000000) return 0;
    const method = shippingMethods.find(
      (m) => m.id === selectedShippingMethodId
    );
    return method ? method.price : 30000;
  }, [selectedShippingMethodId, appliedCoupon, itemsTotal]);

  // Fixed buyer protection / service fee
  const serviceFee = itemsTotal > 0 ? 11000 : 0;

  // Voucher discount
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === "GOM5DISCOUNT") {
      return Math.min(50000, Math.round(itemsTotal * 0.05));
    }
    if (appliedCoupon === "GOM8SUPER") {
      return Math.min(50000, Math.round(itemsTotal * 0.08));
    }
    if (appliedCoupon === "GOM10VIP") {
      return Math.min(50000, Math.round(itemsTotal * 0.1));
    }
    if (appliedCoupon === "GOMGOODS" || appliedCoupon === "GIAM50K") {
      return Math.min(50000, itemsTotal);
    }
    if (appliedCoupon === "GOM10" || appliedCoupon === "VIP10") {
      return Math.round(itemsTotal * 0.1);
    }
    return 30000;
  }, [appliedCoupon, itemsTotal]);

  const grandTotal = Math.max(
    0,
    itemsTotal + shippingFee + serviceFee - discountAmount
  );

  // Quantity and item removals
  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setGroups((prev) =>
      prev.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        ),
      }))
    );
    cartUpdateQuantity(id, newQty);
  };

  const handleRemoveItem = (id: string) => {
    setGroups((prev) =>
      prev
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => item.id !== id),
        }))
        .filter((group) => group.items.length > 0)
    );
  };

  // Coupons
  const handleApplyCoupon = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    const validCodes = [
      "GOMGOODS",
      "FREESHIP",
      "GIAM50K",
      "GOM10",
      "VIP10",
      "WELCOME",
      "GOM5DISCOUNT",
      "GOM8SUPER",
      "GOM10VIP",
    ];

    if (validCodes.includes(upper)) {
      setAppliedCoupon(upper);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Place Order
  const handlePlaceOrder = () => {
    if (itemsTotal === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedCode = `#GOM-${Math.floor(10000 + Math.random() * 90000)}`;
      setPlacedOrderCode(generatedCode);
      setIsSubmitting(false);

      // Save order to localStorage for ProfileOrdersTab
      const newOrders = groups.flatMap((g) =>
        g.items.map((item) => ({
          id: `order-${Date.now()}-${item.id}`,
          orderCode: generatedCode.replace("#", ""),
          createdAt: "Vừa xong",
          status: "pending" as const,
          sellerName: g.sellerName,
          itemTitle: item.title,
          itemImage: item.image,
          totalPrice: item.price * item.quantity,
          quantity: item.quantity,
          trackingCode: `VNPOST${Math.floor(10000000 + Math.random() * 90000000)}VN`,
        }))
      );

      try {
        const existing = JSON.parse(
          localStorage.getItem("gomgoods_user_orders") || "[]"
        );
        localStorage.setItem(
          "gomgoods_user_orders",
          JSON.stringify([...newOrders, ...existing])
        );
      } catch {}

      // Clear purchased items from Cart
      const purchasedIds = groups.flatMap((g) => g.items.map((i) => i.id));
      clearCart(purchasedIds);
    }, 600);
  };

  return (
    <div className="w-full">
      {/* Top Back & Page Title */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href={`/${lang}/cart`}
          className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container-low"
          title={dict.checkout?.back_to_cart || "Quay lại giỏ hàng"}
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-on-background tracking-tight">
          {dict.checkout?.title || "Thanh toán"}
        </h1>
      </div>

      {/* Main 2-Column Grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column (Items & Shipping Details) */}
        <div className="flex-1 w-full space-y-6">
          {/* 1. Địa chỉ giao hàng */}
          <ShippingAddress
            allAddresses={addresses}
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddress}
            dict={dict}
          />

          {/* 2. Danh sách sản phẩm mua */}
          <CheckoutItems
            groups={groups}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            dict={dict}
            lang={lang}
          />
        </div>

        {/* Right Column (Summary & Payment & Action) */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <OrderSummary
            itemsTotal={itemsTotal}
            shippingFee={shippingFee}
            serviceFee={serviceFee}
            discountAmount={discountAmount}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={handleApplyCoupon}
            onRemoveCoupon={handleRemoveCoupon}
            onPlaceOrder={handlePlaceOrder}
            isSubmitting={isSubmitting}
            dict={dict}
            lang={lang}
            selectedShippingMethodId={selectedShippingMethodId}
            onSelectShippingMethod={setSelectedShippingMethodId}
            selectedPaymentCategory={selectedPaymentCategory}
            onSelectPaymentCategory={setSelectedPaymentCategory}
            selectedSubPaymentOption={selectedSubPaymentOption}
            onSelectSubPaymentOption={setSelectedSubPaymentOption}
          />
        </div>
      </div>

      {/* Order Success Modal */}
      {placedOrderCode && (
        <OrderSuccessModal
          orderCode={placedOrderCode}
          totalAmount={grandTotal}
          paymentMethod={selectedPaymentCategory}
          subPaymentOption={selectedSubPaymentOption}
          dict={dict}
          lang={lang}
          onClose={() => setPlacedOrderCode(null)}
        />
      )}
    </div>
  );
}
