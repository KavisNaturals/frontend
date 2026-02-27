'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { categoriesApi, API_BASE_URL, type Category } from '@/lib/api'

const CategoryBubbles = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    categoriesApi.getAll()
      .then(data => setCategories(data))
      .catch(() => {/* silently ignore */ })
  }, [])

  const getImageSrc = (imagePath?: string | null) => {
    if (!imagePath) return '/images/placeholder.svg'
    if (imagePath.startsWith('http')) return imagePath
    return `${API_BASE_URL}/uploads/${imagePath}`
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-center space-y-4">
                {/* Circular Image Container */}
                <div className="relative">
                  <div className="w-40 h-40 lg:w-48 lg:h-48 mx-auto rounded-full overflow-hidden shadow-card group-hover:shadow-xl transition-all duration-300 relative">
                    <Image
                      src={getImageSrc(category.image_path)}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Hover Effect Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>
                </div>

                {/* Category Title */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 max-w-48 mx-auto">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryBubbles