'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import Image from 'next/image'
import { MoreVertical, TrendingUp } from 'lucide-react'
import { API_BASE_URL, normalizeUrl, productsApi, type Product } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

function getImage(product: Product) {
  const url = product.imageUrl || product.image_url || product.imagePath || product.image_path
  if (!url) return '/images/admin/product-image.png'
  if (url.startsWith('/')) return url
  if (url.startsWith('http')) return normalizeUrl(url)
  return `${API_BASE_URL}/uploads/${url}`
}

const AdminProductsPage = () => {
  const router = useRouter()
  const { isLoggedIn, isAdmin } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      router.push('/admin/login')
      return
    }
    productsApi.getAll()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isLoggedIn, isAdmin, router])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <p className="text-sm text-gray-600">Home &gt; All Products</p>
          </div>
          <Link href="/admin/products/new" className="bg-black text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 flex items-center space-x-2">
            <span>⊕</span><span>ADD NEW PRODUCT</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/admin/products/${product.id}`}>
                <div className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                        <Image src={getImage(product)} alt={product.name} width={80} height={80} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-600">{product.category || 'Uncategorized'}</p>
                        <p className="text-base font-bold text-gray-900 mt-1">₹{Number((product as any).sale_price || product.price || 0).toFixed(2)}</p>
                      </div>
                    </div>
                    <button type="button" className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  <div className="space-y-3 border-t border-gray-100 pt-3">
                    <h4 className="text-xs font-bold text-gray-900 uppercase">Summary</h4>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {(product as any).short_description || product.description || 'No description available.'}
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-600">Stock</span>
                          <TrendingUp size={14} className="text-orange-400" />
                        </div>
                        {Number(product.stock || 0) === 0 ? (
                          <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Out of Stock</span>
                        ) : Number(product.stock || 0) <= 10 ? (
                          <span className="text-sm font-bold text-orange-600">{Number(product.stock || 0)} left</span>
                        ) : (
                          <span className="text-sm font-bold text-gray-900">{Number(product.stock || 0)}</span>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, Number(product.stock || 0))}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {products.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-400">No products found.</div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminProductsPage
