import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  productId: string;
  name: string;
  price: number; // USD
  quantity: number;
  state?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  totalQuantity: number;
  totalAmount: number; // USD
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (_) {
      // ignore
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (_) {
      // ignore
    }
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clear = () => setItems([]);

  const { totalAmount, totalQuantity } = useMemo(() => {
    const totals = items.reduce(
      (acc, i) => {
        acc.totalAmount += (Number(i.price) || 0) * i.quantity;
        acc.totalQuantity += i.quantity;
        return acc;
      },
      { totalAmount: 0, totalQuantity: 0 }
    );
    return totals;
  }, [items]);

  const value: CartContextType = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    totalAmount,
    totalQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
