'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  size?: string;
  variant_label?: string;
  maxStock?: number; // max purchasable quantity (variant or product stock)
}

interface CartContextType {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string, variant_label?: string) => void;
  updateQty: (id: string, quantity: number, variant_label?: string) => void;
  clearCart: () => void;
}

const CART_KEY = 'kn_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.id === item.id && (i.variant_label ?? '') === (item.variant_label ?? '')
        );
        if (existing) {
          return prev.map((i) =>
            i.id === item.id && (i.variant_label ?? '') === (item.variant_label ?? '')
              ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
              : i
          );
        }
        return [...prev, { ...item, quantity: item.quantity ?? 1 }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string, variant_label?: string) => {
    setItems((prev) => prev.filter((i) =>
      !(i.id === id && (i.variant_label ?? '') === (variant_label ?? ''))
    ));
  }, []);

  const updateQty = useCallback((id: string, quantity: number, variant_label?: string) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => {
      if (i.id === id && (i.variant_label ?? '') === (variant_label ?? '')) {
        const capped = i.maxStock != null && i.maxStock > 0 ? Math.min(quantity, i.maxStock) : quantity;
        return { ...i, quantity: capped };
      }
      return i;
    }));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, count, total, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
