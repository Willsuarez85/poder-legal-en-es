import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  productId: string;
  name: string;
  price: number; // USD
  quantity: number;
  state?: string;
};

export type CustomerData = {
  name: string;
  phone: string;
  email?: string;
};

type CartContextType = {
  items: CartItem[];
  customerData: CustomerData | null;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  setCustomerData: (data: CustomerData | null) => void;
  totalQuantity: number;
  totalAmount: number; // USD
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cart_v1";
const CUSTOMER_STORAGE_KEY = "customer_data_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customerData, setCustomerDataState] = useState<CustomerData | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      
      const customerRaw = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (customerRaw) setCustomerDataState(JSON.parse(customerRaw));
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

  // Persist customer data to localStorage
  useEffect(() => {
    try {
      if (customerData) {
        localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerData));
      } else {
        localStorage.removeItem(CUSTOMER_STORAGE_KEY);
      }
    } catch (_) {
      // ignore
    }
  }, [customerData]);

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

  const setCustomerData = (data: CustomerData | null) => {
    setCustomerDataState(data);
  };

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
    customerData,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    setCustomerData,
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
