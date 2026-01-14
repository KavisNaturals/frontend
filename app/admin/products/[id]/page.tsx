'use client'

import React, { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { Upload, Check } from 'lucide-react'

const ProductDetailsPage = () => {
  const [productData, setProductData] = useState({
    name: 'Aloevera Shampoo',
    description: 'Aloevera Shampoo Is A Dummy Text',
    category: 'Home Care',
    sku: '#32A53',
    stockQuantity: '211',
    regularPrice: '₹110.40',
    salePrice: '₹450',
    descriptionText: '',
    benefits: '',
    ingredients: '',
    directionToUse: ''
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
          <p className="text-sm text-gray-600">Home &gt; All Products &gt; Product Details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                  <input
                    type="text"
                    value={productData.description}
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                  <input
                    type="text"
                    value={productData.category}
                    onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
                  />
                </div>

                {/* SKU & Stock Quantity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">SKU</label>
                    <input
                      type="text"
                      value={productData.sku}
                      onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Stock Quantity</label>
                    <input
                      type="text"
                      value={productData.stockQuantity}
                      onChange={(e) => setProductData({ ...productData, stockQuantity: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                </div>

                {/* Regular Price & Sale Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Regular Price</label>
                    <input
                      type="text"
                      value={productData.regularPrice}
                      onChange={(e) => setProductData({ ...productData, regularPrice: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Sale Price</label>
                    <input
                      type="text"
                      value={productData.salePrice}
                      onChange={(e) => setProductData({ ...productData, salePrice: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                </div>

                {/* Description Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Description Image</label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Description.png</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-primary h-1 rounded-full"></div>
                          <Check size={20} className="text-primary" />
                        </div>
                      </div>
                    </div>
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Upload size={20} />
                    </button>
                  </div>
                </div>

                {/* Description Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={productData.descriptionText}
                    onChange={(e) => setProductData({ ...productData, descriptionText: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white resize-none"
                  ></textarea>
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Benefits</label>
                  <textarea
                    rows={4}
                    value={productData.benefits}
                    onChange={(e) => setProductData({ ...productData, benefits: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white resize-none"
                  ></textarea>
                </div>

                {/* Ingredients */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Ingredients</label>
                  <textarea
                    rows={4}
                    value={productData.ingredients}
                    onChange={(e) => setProductData({ ...productData, ingredients: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white resize-none"
                  ></textarea>
                </div>

                {/* Direction To Use */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Direction To Use</label>
                  <textarea
                    rows={4}
                    value={productData.directionToUse}
                    onChange={(e) => setProductData({ ...productData, directionToUse: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
            </div>

            {/* Product Gallery */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Product Gallery</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload size={40} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Drop your images here, or browse</p>
                <p className="text-xs text-gray-500">Jpeg, png are allowed</p>
              </div>

              <div className="mt-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-900">Product-thumbnail.png</span>
                        <Check size={20} className="text-primary" />
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-primary h-1 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <button className="px-8 py-3 bg-[#003F62] text-white font-semibold rounded-lg hover:bg-[#003F62]/90">
            UPDATE
          </button>
          <button className="px-8 py-3 bg-[#003F62] text-white font-semibold rounded-lg hover:bg-[#003F62]/90">
            DELETE
          </button>
          <Link
            href="/admin/products"
            className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50"
          >
            CANCEL
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ProductDetailsPage
