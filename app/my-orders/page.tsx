'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ordersApi, Order, API_BASE_URL } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

function getFirstProductImage(order: Order) {
  const item = order.OrderItems?.[0]
  const product = item?.Product
  if (!product) return '/images/placeholder.svg'
  const url = product.imageUrl || product.image_url || product.imagePath || product.image_path
  if (!url) return '/images/placeholder.svg'
  if (url.startsWith('http') || url.startsWith('/')) return url
  return `${API_BASE_URL}/uploads/${url}`
}

const MyOrderPage = () => {
  const { isLoggedIn, logout, authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return           // wait for localStorage hydration
    if (!isLoggedIn) { router.push('/'); return }
    ordersApi.getMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [isLoggedIn, authLoading, router])

  if (authLoading) return (
    <main className="min-h-screen bg-white flex items-center justify-center"><Header />
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </main>
  )

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="w-full py-12" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">My Order</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                <Link href="/my-account" className="block px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium">
                  Account details
                </Link>
                <div className="w-full text-left px-6 py-4 bg-primary text-black font-bold rounded-lg">Orders</div>
                <Link href="/my-account/reset-password" className="block px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium">
                  Reset Password
                </Link>
                <button onClick={() => { logout(); router.push('/') }} className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium">
                  Logout
                </button>
              </div>
            </div>

            {/* Order History Table */}
            <div className="lg:col-span-3">
              <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 px-8 py-6 border-b-2 border-gray-200">Order history</h2>

                <div className="grid grid-cols-6 gap-4 px-8 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                  <div>Product</div>
                  <div>Order Id</div>
                  <div>Date</div>
                  <div>Payment Status</div>
                  <div>Status</div>
                  <div>Amount</div>
                </div>

                {loading ? (
                  <div className="p-8 text-center text-gray-500">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No orders yet.</div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <Link key={order.id} href={`/my-orders/${order.id}`} className="grid grid-cols-6 gap-4 px-8 py-6 items-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img src={getFirstProductImage(order)} alt="product" className="w-12 h-12 object-contain" onError={(e) => { e.currentTarget.src = '/images/placeholder.svg' }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{order.OrderItems?.[0]?.Product?.name || 'Order'}</p>
                            <p className="text-xs text-gray-600">{order.OrderItems?.length || 0} item(s)</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700">#{order.id.slice(0, 8)}</div>
                        <div className="text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</div>
                        <div className="text-sm font-semibold text-gray-800 capitalize">{order.payment_status}</div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-black rounded-full" />
                          <span className="text-sm font-semibold text-gray-800 capitalize">{(order as any).delivery_status || (order as any).status || 'pending'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold text-gray-900">₹{order.total_amount}</span>
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default MyOrderPage
