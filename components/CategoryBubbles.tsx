'use client'

import React from 'react'
import Image from 'next/image'

const CategoryBubbles = () => {
  const categories = [
    {
      id: 1,
      name: 'Personal Care',
      imagePath: '/images/personal-care.png',
      
    },
    {
      id: 2,
      name: 'Health Care',
      imagePath: '/images/health-care.png',
      
    },
    {
      id: 3,
      name: 'Home Care',
      imagePath: '/images/home-care.png',
      
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-6 justify-items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-center space-y-4">
                {/* Circular Image Container */}
                <div className="relative">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto rounded-full overflow-hidden shadow-card group-hover:shadow-xl transition-all duration-300 relative">
                    <Image
                      src={category.imagePath}
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
                  <h3
                    className="text-gray-800 group-hover:text-primary transition-colors"
                    style={{
                      fontWeight: 500,
                      fontSize: '24px',
                      lineHeight: '100%',
                      letterSpacing: '0%'
                    }}
                  >
                    {category.name}
                  </h3>
                 
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