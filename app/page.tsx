'use client'

import Header from '@/components/Header'
import HeroBanner from '@/components/HeroBanner'
import CategoryBubbles from '@/components/CategoryBubbles'
import BestSellers from '@/components/BestSellers'
import OurPromise from '@/components/OurPromise'
import ShopByConcerns from '@/components/ShopByConcerns'
import Reviews from '@/components/Reviews'
import Footer from '@/components/Footer'
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroBanner />
      <CategoryBubbles />
      <BestSellers />
      <OurPromise />
      <ShopByConcerns />
      <Reviews />
      <Footer />
    </main>
  )
}