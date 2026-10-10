export interface CartItemType {
  id: string;
  productId: string;
  title: string;
  variant?: string;
  price: number; // in VND
  image: string;
  quantity: number;
  inStock: boolean;
  maxQuantity?: number;
}

export interface CartSellerGroupType {
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  isTrusted?: boolean;
  items: CartItemType[];
}

export const initialCartGroups: CartSellerGroupType[] = [
  {
    sellerId: "kpop-treasure-vault",
    sellerName: "K-Pop Treasure Vault",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLOSx9EYI8ecJKWPDIjXk5xP--ep8H6p9UKt2Rd_Pd49il9NqxGW3jjGTmjD1qDB45nhJKrF0o0AnRf_tErU1nTQZfmwK2dz5OXJ22fiTZKPVSOQJZBvJOhqtKogCxiXMO98A19Q1PV48jHdduKFmWABCStoCkgtQm00pmXyjq65J7BG_LQ60Nw0Ke0EUdY1uWwSJhb1g92YZnG8DmsFbaUZHkTaEhzozR6LzBDyjKEoY7-OL__tHc",
    isTrusted: true,
    items: [
      {
        id: "cart-item-1",
        productId: "prod-card-hologram",
        title: "Official Hologram Photocard - Limited Tour Edition",
        variant: "Hologram",
        price: 450000,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBpdR4AlumTK6Gu_epv77vKnKPG5rbOZb1n7Q5F4vaFCywXWvEW9mjzlwdn9pufG9LQW45k72WAzQyT6zpZOiz4UNr5mSPOdBYKxrL5RKaCnotcVl5jWSJ4cm0slRaUNvmYES75dfCyY5y6p68D3rRpBzgLJdLEBGw7-A48NjxkEYPGjQvKsIG6nukLHGMEkiBa8oHtMlYWHqtC15D4g6hEW2_FxlQmDGkLeAWLi_4p5YWNoK5yWOx1",
        quantity: 1,
        inStock: true,
        maxQuantity: 5,
      },
      {
        id: "cart-item-2",
        productId: "prod-pin-retro-console",
        title: "Retro Console Enamel Pin (Gold Plated)",
        variant: "Standard Pin",
        price: 120000,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDMa-dyiCSUEA1POTLfu1rde2VDLPOSffKaERkms0KrwqDRFED0ofLI8PJbX-jhvpDv4WJE4F3mDe0S1THCD-3TIQQGqzts-y35aRABIkSSf6sosw7kG6oRzo_NcMKgyFuyN-G-58SiWYrPpu_HHBrYmZfTeur7LakCHEf9pH55m7tMuuzlclwE9GkAD2qo5LKMlIzl_2o9eLkH5BM1hwRVMpRPC0BWuivrG2_uD8-Q7Z53Fl9OsJ6R",
        quantity: 2,
        inStock: true,
        maxQuantity: 10,
      },
    ],
  },
  {
    sellerId: "anime-figure-deals",
    sellerName: "Anime Figure Deals",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqfEATHb_gKw1Vnzy6TFcZnGn8WVtQwJ1X2V9OE4t-SQQyGjz3zn7sgPKAugX7r_NHeIgwF5QK-ouBm00tk_TQbTdWhmhIWuGReyLVHK-6PKzEPMF9Prd7pW21z8MxBKscInyoeXt8jbgjtlyLgT63qa9wZA8EmLw9CfKL684OsQIun_5Vd_9X990jBUio6jO5eWblmIS9ywwW42vrvfUEHUWyfDftSHrZXp7N9FAO1QLIxNKCoYYT",
    isTrusted: false,
    items: [
      {
        id: "cart-item-3",
        productId: "prod-figure-1-7-scale",
        title: "1/7 Scale Action Figure - Mint Condition",
        variant: "No Box (Loose)",
        price: 1250000,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAT8GD_vpFB76Gu_cXmyjztYBphQli26I7228j453ayxX-sr4eniXe3MmAY25siymbSntr-Jx_KAi3aROHlX3macCXXhUpq5IA-zlh0eyaF9gx96516JwSaLBrzvrHFoMpbqw5ZEWfka2yMZlIF2doCG5096Cqmzx3hO40mUVD9aNvmWyGXMgb56CpldKwRDZNrQcjWoKJ5YGDwBGBruv_LkP0PL5LKwXTDMrGu67B_bD7BVwRjOTlb",
        quantity: 1,
        inStock: false,
        maxQuantity: 1,
      },
    ],
  },
];

export function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
}
