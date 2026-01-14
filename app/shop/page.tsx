'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Star, Heart, ShoppingCart, Eye, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('featured')

  const products = [
    {
      id: 1,
      name: 'Aloe vera Shampoo ( 200 ml )',
      price: '₹185',
      originalPrice: '₹200',
      rating: 4.5,
      reviews: 89,
      imagePath: '/images/aloe-vera-shampoo.png',
      category: 'Hair Care',
      description: 'Frizz-Free, Strong & Health Hair'
    },
    {
      id: 2,
      name: 'Milk Protein Shampoo ( 200 ml )',
      price: '₹215',
      originalPrice: '₹250',
      rating: 4.7,
      reviews: 142,
      imagePath: '/images/milk-protein-shampoo.png',
      category: 'Hair Care',
      description: 'Hair Cleanser & hair strong and shiny'
    },
    {
      id: 3,
      name: 'Onion Shampoo ( 200 ml )',
      price: '₹195',
      originalPrice: '₹220',
      rating: 4.6,
      reviews: 167,
      imagePath: '/images/onion-shampoo.png',
      category: 'Hair Care',
      description: 'Reducing hair fall & breakage'
    },
    {
      id: 4,
      name: 'Shikakai & Reetha Shampoo ( 200 ml )',
      price: '₹175',
      originalPrice: '₹200',
      rating: 4.4,
      reviews: 98,
      imagePath: '/images/shikakai-shampoo.png',
      category: 'Hair Care',
      description: 'Natural hair strengthening formula'
    },
    {
      id: 5,
      name: 'Natural wash Organic Detergent Liquid ( 1000 ml )',
      price: '₹245',
      originalPrice: '₹280',
      rating: 4.8,
      reviews: 203,
      imagePath: '/images/organic-detergent.png',
      category: 'Home Care',
      description: 'Gentle on clothes, tough on stains'
    },
    {
      id: 6,
      name: 'Aavarampoo Tea ( 100 g )',
      price: '₹125',
      originalPrice: '₹150',
      rating: 4.9,
      reviews: 156,
      imagePath: '/images/aavarampoo-tea.png',
      category: 'Health Care',
      description: 'Herbal health tea for wellness'
    },
    {
      id: 7,
      name: 'Health Care Mix',
      price: '₹299',
      originalPrice: '₹350',
      rating: 4.6,
      reviews: 112,
      imagePath: '/images/health-mix.png',
      category: 'Health Care',
      description: 'Nutritious health care supplement'
    },
    {
      id: 8,
      name: 'Personal Care Set',
      price: '₹449',
      originalPrice: '₹550',
      rating: 4.7,
      reviews: 134,
      imagePath: '/images/personal-caree.png',
      category: 'Personal Care',
      description: 'Complete personal care collection'
    },
    {
      id: 9,
      name: 'Women Care Collection',
      price: '₹399',
      originalPrice: '₹480',
      rating: 4.8,
      reviews: 198,
      imagePath: '/images/women-care.png',
      category: 'Women Care',
      description: 'Specially formulated for women'
    },
  ]

  const categories = [
    'All Products',
    'Hair Care',
    'Personal Care',
    'Health Care',
    'Home Care',
    'Women Care'
  ]

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`${
              star <= Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : star === Math.ceil(rating) && rating % 1 !== 0
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const filteredProducts = selectedCategory && selectedCategory !== 'All Products'
    ? products.filter(p => p.category === selectedCategory)
    : products

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', ''))
    }
    if (sortBy === 'price-high') {
      return parseInt(b.price.replace('₹', '')) - parseInt(a.price.replace('₹', ''))
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating
    }
    return 0
  })

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Shop Hero Section */}
      <section className="w-full  py-12"  style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">Shop</h1>
        </div>
      </section>

      {/* Main Shop Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
           
            {/* Products Grid */}
            <div className="flex-1">
              {/* Filter Bar */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-100">
                <div className="text-gray-600">
                  <span className="font-semibold">{sortedProducts.length}</span> Products Found
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary cursor-pointer font-roboto"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group block"
                  >
                    {/* Product Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
                      <div className="w-full h-full relative">
                        <Image
                          src={product.imagePath}
                          alt={product.name}
                          fill
                          className="object-contain p-8"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      
                      {/* Quick Action Buttons - Bottom Left */}
                      <div className="absolute flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ bottom: '5rem', left: '8rem' }}>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                          <ShoppingCart size={18} strokeWidth={2} />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                          <Heart size={18} strokeWidth={2} />
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
                      <h3 className="font-semibold text-gray-800 mb-2 text-sm line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {/* Product Description */}
                      <p className="text-xs text-gray-600 mb-3">
                        {product.description}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-lg font-bold text-gray-800">
                          {product.price}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* No Products */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found in this category</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      
      <Footer />
    </main>
  )
}

export default ShopPage
