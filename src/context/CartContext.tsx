"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  initialCartGroups,
  type CartItemType,
  type CartSellerGroupType,
} from "@/components/cart/cart-data";

const CART_STORAGE_KEY = "gomgoods_cart_groups_v1";

interface AddToCartParams {
  item: {
    id?: string;
    productId: string;
    title: string;
    variant?: string;
    price: number;
    image: string;
    quantity?: number;
    inStock?: boolean;
    maxQuantity?: number;
  };
  seller: {
    sellerId: string;
    sellerName: string;
    sellerAvatar?: string;
    isTrusted?: boolean;
  };
}

interface CartContextType {
  groups: CartSellerGroupType[];
  selectedItemIds: string[];
  totalItemCount: number;
  selectedCount: number;
  selectedItems: CartItemType[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  grandTotal: number;
  appliedCoupon: string | null;
  addToCart: (params: AddToCartParams) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleSelectItem: (itemId: string) => void;
  toggleSelectSeller: (sellerId: string) => void;
  toggleSelectAll: () => void;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: (itemIds?: string[]) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<CartSellerGroupType[]>(initialCartGroups);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([
    "cart-item-1",
    "cart-item-2",
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed: CartSellerGroupType[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setGroups(parsed);
          const allInStockIds = parsed
            .flatMap((g) => g.items)
            .filter((i) => i.inStock)
            .map((i) => i.id);
          setSelectedItemIds(allInStockIds);
        }
      }
    } catch {
      // fallback to initial
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever groups change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(groups));
    } catch {
      // ignore write error
    }
  }, [groups, isHydrated]);

  // All in-stock items
  const allAvailableItems = useMemo(() => {
    return groups.flatMap((g) => g.items).filter((item) => item.inStock);
  }, [groups]);

  // Total quantity of items in the cart
  const totalItemCount = useMemo(() => {
    return groups.reduce((acc, g) => {
      return acc + g.items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);
  }, [groups]);

  // Selected items array
  const selectedSet = useMemo(() => new Set(selectedItemIds), [selectedItemIds]);

  const selectedItems = useMemo(() => {
    return allAvailableItems.filter((item) => selectedSet.has(item.id));
  }, [allAvailableItems, selectedSet]);

  const selectedCount = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [selectedItems]);

  // Subtotal calculation
  const subtotal = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [selectedItems]);

  // Shipping fee: Free if FREESHIP coupon or subtotal >= 1.000.000₫
  const shippingFee = useMemo(() => {
    if (selectedCount === 0) return 0;
    if (appliedCoupon === "FREESHIP" || subtotal >= 1000000) return 0;
    return 35000;
  }, [selectedCount, appliedCoupon, subtotal]);

  // Discount calculation
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === "GOMGOODS" || appliedCoupon === "GIAM50K") {
      return Math.min(50000, subtotal);
    }
    if (
      appliedCoupon === "GOM10" ||
      appliedCoupon === "VIP10" ||
      appliedCoupon === "GOM10VIP"
    ) {
      return Math.round(subtotal * 0.1);
    }
    if (appliedCoupon === "GOM5DISCOUNT") {
      return Math.min(Math.round(subtotal * 0.05), 50000);
    }
    if (appliedCoupon === "GOM8SUPER") {
      return Math.min(Math.round(subtotal * 0.08), 50000);
    }
    return 30000;
  }, [appliedCoupon, subtotal]);

  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  // Master selection checks
  const isAllSelected =
    allAvailableItems.length > 0 &&
    allAvailableItems.every((item) => selectedSet.has(item.id));

  const isPartiallySelected =
    allAvailableItems.some((item) => selectedSet.has(item.id)) && !isAllSelected;

  // Actions
  const addToCart = useCallback(
    ({ item, seller }: AddToCartParams) => {
      const generatedId =
        item.id || `cart-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const qtyToAdd = item.quantity && item.quantity > 0 ? item.quantity : 1;

      setGroups((prevGroups) => {
        const existingGroupIndex = prevGroups.findIndex(
          (g) => g.sellerId === seller.sellerId
        );

        if (existingGroupIndex >= 0) {
          const group = prevGroups[existingGroupIndex];
          const existingItemIndex = group.items.findIndex(
            (i) =>
              i.productId === item.productId &&
              (item.variant ? i.variant === item.variant : true)
          );

          if (existingItemIndex >= 0) {
            // Item exists in this seller's group -> increment quantity
            const updatedItems = [...group.items];
            const currentItem = updatedItems[existingItemIndex];
            const maxQ = currentItem.maxQuantity || 99;
            const newQty = Math.min(currentItem.quantity + qtyToAdd, maxQ);

            updatedItems[existingItemIndex] = {
              ...currentItem,
              quantity: newQty,
            };

            const updatedGroups = [...prevGroups];
            updatedGroups[existingGroupIndex] = {
              ...group,
              items: updatedItems,
            };
            return updatedGroups;
          } else {
            // New item in existing seller group
            const newItem: CartItemType = {
              id: generatedId,
              productId: item.productId,
              title: item.title,
              variant: item.variant || "Standard",
              price: item.price,
              image: item.image,
              quantity: qtyToAdd,
              inStock: item.inStock !== false,
              maxQuantity: item.maxQuantity || 10,
            };

            const updatedGroups = [...prevGroups];
            updatedGroups[existingGroupIndex] = {
              ...group,
              items: [newItem, ...group.items],
            };
            return updatedGroups;
          }
        } else {
          // New seller group
          const newItem: CartItemType = {
            id: generatedId,
            productId: item.productId,
            title: item.title,
            variant: item.variant || "Standard",
            price: item.price,
            image: item.image,
            quantity: qtyToAdd,
            inStock: item.inStock !== false,
            maxQuantity: item.maxQuantity || 10,
          };

          const newGroup: CartSellerGroupType = {
            sellerId: seller.sellerId,
            sellerName: seller.sellerName,
            sellerAvatar: seller.sellerAvatar,
            isTrusted: seller.isTrusted,
            items: [newItem],
          };

          return [newGroup, ...prevGroups];
        }
      });

      // Auto-select the newly added item
      setSelectedItemIds((prev) =>
        prev.includes(generatedId) ? prev : [...prev, generatedId]
      );
    },
    []
  );

  const removeFromCart = useCallback((itemId: string) => {
    setGroups((prev) =>
      prev
        .map((g) => ({
          ...g,
          items: g.items.filter((i) => i.id !== itemId),
        }))
        .filter((g) => g.items.length > 0)
    );
    setSelectedItemIds((prev) => prev.filter((id) => id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, newQty: number) => {
    if (newQty < 1) return;
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        items: g.items.map((item) => {
          if (item.id === itemId) {
            const maxQ = item.maxQuantity || 99;
            return { ...item, quantity: Math.min(newQty, maxQ) };
          }
          return item;
        }),
      }))
    );
  }, []);

  const toggleSelectItem = useCallback((itemId: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const toggleSelectSeller = useCallback(
    (sellerId: string) => {
      const group = groups.find((g) => g.sellerId === sellerId);
      if (!group) return;

      const groupInStockItemIds = group.items
        .filter((i) => i.inStock)
        .map((i) => i.id);

      const allSellerSelected = groupInStockItemIds.every((id) =>
        selectedSet.has(id)
      );

      if (allSellerSelected) {
        // Deselect all items from this seller
        setSelectedItemIds((prev) =>
          prev.filter((id) => !groupInStockItemIds.includes(id))
        );
      } else {
        // Select all items from this seller
        setSelectedItemIds((prev) => {
          const union = new Set([...prev, ...groupInStockItemIds]);
          return Array.from(union);
        });
      }
    },
    [groups, selectedSet]
  );

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(allAvailableItems.map((i) => i.id));
    }
  }, [isAllSelected, allAvailableItems]);

  const applyCoupon = useCallback((code: string): boolean => {
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
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const clearCart = useCallback((itemIds?: string[]) => {
    if (!itemIds || itemIds.length === 0) {
      setGroups([]);
      setSelectedItemIds([]);
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch {}
      return;
    }

    const idsToRemove = new Set(itemIds);
    setGroups((prev) =>
      prev
        .map((g) => ({
          ...g,
          items: g.items.filter((i) => !idsToRemove.has(i.id)),
        }))
        .filter((g) => g.items.length > 0)
    );
    setSelectedItemIds((prev) => prev.filter((id) => !idsToRemove.has(id)));
  }, []);

  return (
    <CartContext.Provider
      value={{
        groups,
        selectedItemIds,
        totalItemCount,
        selectedCount,
        selectedItems,
        subtotal,
        shippingFee,
        discountAmount,
        grandTotal,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelectItem,
        toggleSelectSeller,
        toggleSelectAll,
        isAllSelected,
        isPartiallySelected,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
