'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
