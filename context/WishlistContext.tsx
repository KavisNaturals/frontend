'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { wishlistApi, WishlistItem } from '@/lib/api';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  items: WishlistItem[];
  count: number;
  loading: boolean;
  isInWishlist: (productId: string) => boolean;
  toggle: (productId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isLoggedIn) { setItems([]); return; }
    setLoading(true);
    try {
      const data = await wishlistApi.get();
      setItems(data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => { refresh(); }, [refresh]);

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.product_id === productId),
    [items]
  );

  const toggle = useCallback(
    async (productId: string) => {
      if (!isLoggedIn) return;
      if (isInWishlist(productId)) {
        await wishlistApi.remove(productId);
        setItems((prev) => prev.filter((i) => i.product_id !== productId));
      } else {
        const item = await wishlistApi.add(productId);
        setItems((prev) => [...prev, item]);
      }
    },
    [isLoggedIn, isInWishlist]
  );

  return (
    <WishlistContext.Provider
      value={{ items, count: items.length, loading, isInWishlist, toggle, refresh }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
