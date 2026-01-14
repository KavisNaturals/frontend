'use client'

import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import Image from 'next/image'
import { MoreVertical, TrendingUp } from 'lucide-react'

const AdminProductsPage = () => {
  const products = Array(12).fill({
    name: 'Aloevera Shampoo',
    category: 'Battery',
    price: '₹110.40',
    image: '/images/admin/product-image.png',
    sales: 1269,
    remaining: 1269
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <p className="text-sm text-gray-600">Home &gt; All Products</p>
          </div>
          <Link
            href="/admin/products/new"
            className="bg-black text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 flex items-center space-x-2"
          >
            <span>⊕</span>
            <span>ADD NEW PRODUCT</span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Link key={index} href={`/admin/products/${index + 1}`}>
              <div className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                      <p className="text-xs text-gray-600">{product.category}</p>
                      <p className="text-base font-bold text-gray-900 mt-1">{product.price}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-3">
                  <h4 className="text-xs font-bold text-gray-900 uppercase">Summary</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Aloevera Shampoo is placeholder text commonly used in the graphic.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-600">Sales</span>
                        <TrendingUp size={14} className="text-orange-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{product.sales}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Remaining Products</span>
                      <span className="text-sm font-bold text-gray-900">{product.remaining}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 pt-6">
          <button className="px-4 py-2 bg-black text-white rounded-lg font-semibold">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">4</button>
          <span className="px-4">...</span>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">10</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">NEXT →</button>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminProductsPage
