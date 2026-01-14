'use client'

import Header from '@/components/Header'
import HeroBanner from '@/components/HeroBanner'
import CategoryBubbles from '@/components/CategoryBubbles'
import BestSellers from '@/components/BestSellers'
import OurPromise from '@/components/OurPromise'
import ShopByConcerns from '@/components/ShopByConcerns'
import Reviews from '@/components/Reviews'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import { useState } from 'react'

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <Header />
      <HeroBanner onSignUpClick={() => setIsAuthModalOpen(true)} />
      <CategoryBubbles />
      <BestSellers />
      <OurPromise />
      <ShopByConcerns />
      <Reviews />
      <Footer />
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signup"
      />
    </main>
  )
}