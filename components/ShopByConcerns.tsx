'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { concernsApi, Concern, API_BASE_URL } from '@/lib/api'

const FALLBACK: Concern[] = [
  { id: '1', title: 'Health Mix', image_path: '/images/health-mix.png', is_active: true },
  { id: '2', title: 'Personal Care', image_path: '/images/personal-caree.png', is_active: true },
  { id: '3', title: 'Women Care', image_path: '/images/women-care.png', is_active: true },
  { id: '4', title: 'Home Care', image_path: '/images/home-caree.png', is_active: true },
]

function getConcernImage(concern: Concern) {
  const p = concern.image_path
  if (!p) return '/images/placeholder.svg'
  if (p.startsWith('http') || p.startsWith('/')) return p
  return `${API_BASE_URL}/uploads/${p}`
}

const ShopByConcerns = () => {
  const [concerns, setConcerns] = useState<Concern[]>(FALLBACK)

  useEffect(() => {
    concernsApi.getActive()
      .then((data) => { if (data.length > 0) setConcerns(data) })
      .catch(() => {})
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title title-underline mb-4">SHOP BY CONCERNS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {concerns.map((concern) => (
            <Link
              key={concern.id}
              href={`/shop?category=${encodeURIComponent(concern.title)}`}
              className="group relative overflow-hidden rounded-[26px] shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden rounded-[26px]">
                <img
                  src={getConcernImage(concern)}
                  alt={concern.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.currentTarget.src = '/images/placeholder.svg' }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-colors duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg whitespace-nowrap">
                    {concern.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopByConcerns
