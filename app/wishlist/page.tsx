'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, ShoppingCart, Eye, Trash2 } from 'lucide-react'

const WishlistPage = () => {
  const wishlistProducts = [
    {
      id: 1,
      name: 'Aloe vera Shampoo ( 200 ml )',
      price: '₹164',
      originalPrice: '₹199',
      rating: 4.8,
      reviews: 2366,
      imagePath: '/images/aloe-vera-shampoo.png',
      description: 'Frizz-Free, Strong & Health Hair'
    },
    {
      id: 2,
      name: 'Milk Protein Shampoo ( 200 ml )',
      price: '₹164',
      originalPrice: '₹199',
      rating: 4.8,
      reviews: 2366,
      imagePath: '/images/milk-protein-shampoo.png',
      description: 'Hair Cleanser & hair strong and shiny'
    },
    {
      id: 3,
      name: 'Onion Shampoo ( 200 ml )',
      price: '₹164',
      originalPrice: '₹199',
      rating: 4.8,
      reviews: 2366,
      imagePath: '/images/onion-shampoo.png',
      description: 'Reducing hair fall & breakage'
    },
    {
      id: 4,
      name: 'Shikakai & Reetha Shampoo ( 200 ml )',
      price: '₹164',
      originalPrice: '₹199',
      rating: 4.8,
      reviews: 2366,
      imagePath: '/images/shikakai-shampoo.png',
      description: 'Natural hair strengthening formula'
    },
    {
      id: 5,
      name: 'Natural wash Organic Detergent Liquid ( 1000 ml )',
      price: '₹200',
      originalPrice: '₹240',
      rating: 4.8,
      reviews: 2366,
      imagePath: '/images/organic-detergent.png',
      description: 'Gentle on clothes, tough on stains'
    },
    {
      id: 6,
      name: 'Aavarampoo Tea ( 100 g )',
      price: '₹164',
      originalPrice: '₹199',
      rating: 4.8,
      reviews: 2366,
      imagePath: '/images/aavarampoo-tea.png',
      description: 'Herbal health tea for wellness'
    }
  ]

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`${
              star <= Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full  py-12" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">Wishlist</h1>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group relative"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
                  <Image
                    src={product.imagePath}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-contain p-6"
                  />

                  {/* Action Buttons */}
                  <div className="absolute flex space-x-2 opacity-100" style={{ bottom: '5rem', left: '8rem' }}>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                      <ShoppingCart size={18} strokeWidth={2} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                      <Trash2 size={18} strokeWidth={2} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                      <Eye size={18} strokeWidth={2} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 text-center">
                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-base font-bold text-gray-800">
                      {product.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default WishlistPage
