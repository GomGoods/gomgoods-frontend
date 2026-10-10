"use client";

import Image from "next/image";

export interface PaymentIconProps {
  id: string;
  size?: number;
  className?: string;
  alt?: string;
}

const ICON_MAP: Record<string, { src: string; name: string }> = {
  momo: { src: "/icon_payments/Logo-MoMo-Square.webp", name: "Ví MoMo" },
  zalopay: { src: "/icon_payments/ZaloPay.png", name: "Ví ZaloPay" },
  vietqr: { src: "/icon_payments/logo-vietqrpay.webp", name: "VietQR" },
  vnpay: { src: "/icon_payments/logo-vnpay.png", name: "VNPAY-QR" },
  shopeepay: { src: "/icon_payments/Logo-Shopeepay-PNG-4.png", name: "Ví ShopeePay" },
  viettelmoney: { src: "/icon_payments/logo-viettel-money-compressed.webp", name: "Viettel Money" },
  visa: { src: "/icon_payments/VISA.jpg", name: "Visa" },
  mastercard: { src: "/icon_payments/mastercard-logo.webp", name: "Mastercard" },
  jcb: { src: "/icon_payments/jcb_emblem_logo.png", name: "JCB" },
  napas: { src: "/icon_payments/napas-vietnam_BIG.png", name: "NAPAS" },
  cod: { src: "/payments/cod.svg", name: "Thanh toán khi nhận hàng" },
  onepay: { src: "/icon_payments/logo-vnpay.png", name: "OnePay" },
};

export function PaymentIcon({
  id,
  size = 24,
  className = "",
  alt,
}: PaymentIconProps) {
  const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, "");
  const info = ICON_MAP[normalizedId] || ICON_MAP[id] || {
    src: "/icon_payments/logo-vietqrpay.webp",
    name: id,
  };

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded bg-white p-0.5 overflow-hidden shadow-2xs border border-outline-variant/30 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={info.src}
        alt={alt || info.name}
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-contain"
      />
    </span>
  );
}

export function MoMoIcon({ size = 24, className }: Omit<PaymentIconProps, "id">) {
  return <PaymentIcon id="momo" size={size} className={className} />;
}

export function ZaloPayIcon({ size = 24, className }: Omit<PaymentIconProps, "id">) {
  return <PaymentIcon id="zalopay" size={size} className={className} />;
}

export function VietQRIcon({ size = 24, className }: Omit<PaymentIconProps, "id">) {
  return <PaymentIcon id="vietqr" size={size} className={className} />;
}

export function VNPAYIcon({ size = 24, className }: Omit<PaymentIconProps, "id">) {
  return <PaymentIcon id="vnpay" size={size} className={className} />;
}

export function ShopeePayIcon({ size = 24, className }: Omit<PaymentIconProps, "id">) {
  return <PaymentIcon id="shopeepay" size={size} className={className} />;
}

export function ViettelMoneyIcon({ size = 24, className }: Omit<PaymentIconProps, "id">) {
  return <PaymentIcon id="viettelmoney" size={size} className={className} />;
}

export function VisaIcon({ size = 24, className }: Omit<PaymentIconProps, "id">) {
  return <PaymentIcon id="visa" size={size} className={className} />;
}

export function MastercardIcon({ size = 24, className }: Omit<PaymentIconProps, "id">) {
  return <PaymentIcon id="mastercard" size={size} className={className} />;
}

export function NapasIcon({ size = 24, className }: Omit<PaymentIconProps, "id">) {
  return <PaymentIcon id="napas" size={size} className={className} />;
}
