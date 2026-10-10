"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

const GOMXU_STORAGE_KEY = "gomgoods_user_gomxu_v1";
const VOUCHERS_STORAGE_KEY = "gomgoods_user_vouchers_v1";

export interface UserVoucher {
  id: string;
  code: string;
  title: string;
  discountDisplay: string;
  maxDiscount: string;
  redeemedAt: string;
}

export interface GomXuHistoryItem {
  id: string;
  title: string;
  amount: number;
  type: "earn" | "spend";
  date: string;
}

interface GomXuContextType {
  gomXu: number;
  addGomXu: (amount: number, reason: string) => void;
  spendGomXu: (amount: number, reason: string) => boolean;
  myVouchers: UserVoucher[];
  redeemVoucher: (voucher: {
    id: string;
    code: string;
    title: string;
    discountDisplay: string;
    cost: number;
    maxDiscount: string;
  }) => boolean;
  history: GomXuHistoryItem[];
}

const GomXuContext = createContext<GomXuContextType | null>(null);

export function GomXuProvider({ children }: { children: ReactNode }) {
  const [gomXu, setGomXu] = useState<number>(2800);
  const [myVouchers, setMyVouchers] = useState<UserVoucher[]>([]);
  const [history, setHistory] = useState<GomXuHistoryItem[]>([
    {
      id: "h-1",
      title: "Điểm danh hàng ngày",
      amount: 100,
      type: "earn",
      date: "Hôm qua",
    },
    {
      id: "h-2",
      title: "Hoàn tất đơn hàng #GOM-84920",
      amount: 200,
      type: "earn",
      date: "3 ngày trước",
    },
  ]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const storedXu = localStorage.getItem(GOMXU_STORAGE_KEY);
      if (storedXu !== null) {
        setGomXu(Number(storedXu));
      }
      const storedVouchers = localStorage.getItem(VOUCHERS_STORAGE_KEY);
      if (storedVouchers) {
        setMyVouchers(JSON.parse(storedVouchers));
      }
    } catch {
      // fallback to initial
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(GOMXU_STORAGE_KEY, String(gomXu));
      localStorage.setItem(VOUCHERS_STORAGE_KEY, JSON.stringify(myVouchers));
    } catch {}
  }, [gomXu, myVouchers, isHydrated]);

  const addGomXu = useCallback((amount: number, reason: string) => {
    setGomXu((prev) => prev + amount);
    setHistory((prev) => [
      {
        id: `h-${Date.now()}`,
        title: reason,
        amount,
        type: "earn",
        date: "Vừa xong",
      },
      ...prev,
    ]);
  }, []);

  const spendGomXu = useCallback((amount: number, reason: string): boolean => {
    let success = false;
    setGomXu((prev) => {
      if (prev >= amount) {
        success = true;
        return prev - amount;
      }
      return prev;
    });

    if (success) {
      setHistory((prev) => [
        {
          id: `h-${Date.now()}`,
          title: reason,
          amount,
          type: "spend",
          date: "Vừa xong",
        },
        ...prev,
      ]);
    }
    return success;
  }, []);

  const redeemVoucher = useCallback(
    (voucher: {
      id: string;
      code: string;
      title: string;
      discountDisplay: string;
      cost: number;
      maxDiscount: string;
    }): boolean => {
      if (gomXu < voucher.cost) return false;

      setGomXu((prev) => prev - voucher.cost);
      const newVoucher: UserVoucher = {
        id: `vouch-${Date.now()}`,
        code: voucher.code,
        title: voucher.title,
        discountDisplay: voucher.discountDisplay,
        maxDiscount: voucher.maxDiscount,
        redeemedAt: new Date().toLocaleDateString("vi-VN"),
      };

      setMyVouchers((prev) => [newVoucher, ...prev]);
      setHistory((prev) => [
        {
          id: `h-${Date.now()}`,
          title: `Đổi voucher: ${voucher.title}`,
          amount: voucher.cost,
          type: "spend",
          date: "Vừa xong",
        },
        ...prev,
      ]);
      return true;
    },
    [gomXu]
  );

  return (
    <GomXuContext.Provider
      value={{
        gomXu,
        addGomXu,
        spendGomXu,
        myVouchers,
        redeemVoucher,
        history,
      }}
    >
      {children}
    </GomXuContext.Provider>
  );
}

export function useGomXu() {
  const context = useContext(GomXuContext);
  if (!context) {
    throw new Error("useGomXu must be used within a GomXuProvider");
  }
  return context;
}
