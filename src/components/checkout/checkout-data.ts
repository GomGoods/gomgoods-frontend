export interface AddressItem {
  id: string;
  name: string;
  phone: string;
  address: string;
  isDefault?: boolean;
}

export interface CheckoutItemType {
  id: string;
  productId: string;
  title: string;
  variant?: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CheckoutSellerGroupType {
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  isTrusted?: boolean;
  items: CheckoutItemType[];
}

export interface ShippingMethodOption {
  id: "standard" | "express" | "pickup";
  title: string;
  desc: string;
  price: number;
  badge?: string;
}

export type PaymentMethodId =
  | "cod"
  | "wallet"
  | "intl_card"
  | "napas"
  | "bank_transfer";

export interface SubPaymentOption {
  id: string;
  name: string;
  tag?: string;
}

export interface PaymentCategoryOption {
  id: PaymentMethodId;
  title: string;
  desc: string;
  subOptions?: SubPaymentOption[];
}

export const sampleAddresses: AddressItem[] = [
  {
    id: "addr-1",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Đường B, Phường C, Quận D, Thành phố Hồ Chí Minh",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    address: "Tòa nhà Bitexco, 2 Hải Triều, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    isDefault: false,
  },
];

export const sampleCheckoutGroups: CheckoutSellerGroupType[] = [
  {
    sellerId: "kpopcardstore",
    sellerName: "K-Pop Card Store",
    sellerAvatar: "",
    isTrusted: true,
    items: [
      {
        id: "checkout-item-1",
        productId: "prod-card-tcg",
        title:
          "Card bo góc BlackPink Jisoo Born Pink World Tour Limited Edition",
        variant: "Hologram",
        price: 550000,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA-p3VJnNZIA9WKfo2ARhkNmCMjCAp4TndqDb9qTR4bIGi1ru2bRJgalkFzAP96PylZU-q13WLnFmfpbmr_p92sWUNN3pjIPrmCyioLmEWPAgCSxYi06nvpXzurMMncO3zBopZCC9obEAO_4Qlo6wTgjFuJ0T5Ml8mfNb9SluLK9-ep9eTWrv0f4baqZwfjMauVRsWKlcHn2RejJZIoWMhh3qpuR_E-NFnwi-rjH7Qx3Hcy7Z-bd1xd",
        quantity: 1,
      },
    ],
  },
];

export const shippingMethods: ShippingMethodOption[] = [
  {
    id: "standard",
    title: "Giao hàng tận nơi (Tiêu chuẩn)",
    desc: "Dự kiến nhận hàng sau 2-3 ngày",
    price: 30000,
  },
  {
    id: "express",
    title: "Giao hàng hỏa tốc",
    desc: "Nhận ngay trong 2-4 giờ (nội thành)",
    price: 50000,
  },
  {
    id: "pickup",
    title: "Tự đến lấy tại cửa hàng",
    desc: "Nhận tại địa chỉ của người bán",
    price: 0,
    badge: "Miễn phí",
  },
];

export const paymentCategories: PaymentCategoryOption[] = [
  {
    id: "cod",
    title: "Thanh toán khi nhận hàng (COD)",
    desc: "Kiểm tra hàng an tâm rồi thanh toán tiền mặt trực tiếp cho shipper.",
  },
  {
    id: "bank_transfer",
    title: "Chuyển khoản & Cổng thanh toán (VietQR / VNPAY / OnePay)",
    desc: "Quét mã VietQR tự động khớp đơn ngay lập tức hoặc qua cổng trực tuyến.",
    subOptions: [
      { id: "vietqr", name: "VietQR (Quét mã QR tự động)", tag: "Khuyên dùng" },
      { id: "vnpay", name: "Cổng VNPAY-QR" },
      { id: "onepay", name: "Cổng OnePay" },
    ],
  },
  {
    id: "wallet",
    title: "Ví điện tử",
    desc: "Thanh toán siêu tốc qua ví điện tử liên kết.",
    subOptions: [
      { id: "momo", name: "Ví MoMo", tag: "Phổ biến" },
      { id: "shopeepay", name: "Ví ShopeePay" },
      { id: "zalopay", name: "Ví ZaloPay" },
      { id: "viettelmoney", name: "Viettel Money" },
    ],
  },
  {
    id: "intl_card",
    title: "Thẻ ngân hàng quốc tế (Visa / Mastercard / JCB)",
    desc: "Hỗ trợ cả thẻ ghi nợ (Debit) và thẻ tín dụng (Credit) bảo mật 3D Secure.",
    subOptions: [
      { id: "visa", name: "Visa" },
      { id: "mastercard", name: "Mastercard" },
      { id: "jcb", name: "JCB" },
    ],
  },
  {
    id: "napas",
    title: "Thẻ nội địa (NAPAS)",
    desc: "Thẻ ATM nội địa kết nối hơn 40 ngân hàng tại Việt Nam (Vietcombank, Techcombank, MB, BIDV, v.v.).",
  },
];

export function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
}
