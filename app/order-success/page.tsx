'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ordersApi, type Order } from '@/lib/api'
import { CheckCircle, Package } from 'lucide-react'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) { setLoading(false); return }
    ordersApi.getById(orderId)
      .then(setOrder)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [orderId])

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
        <CheckCircle size={72} className="mx-auto text-green-500 mb-6" strokeWidth={1.5} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-6">
          {order?.payment_status === 'pending'
            ? "Your order is confirmed. Please keep cash ready when your order is delivered."
            : "Thank you for shopping with KaVi's Naturals. Your payment was successful and your order is confirmed."
          }
        </p>

        {loading ? (
          <div className="animate-pulse space-y-3 mb-8">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        ) : order ? (
          <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Order ID</span>
              <span className="text-gray-900 font-bold text-xs font-mono">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Total Paid</span>
              <span className="text-gray-900 font-bold">₹{Number(order.total_amount).toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Payment Status</span>
              <span className="capitalize px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                {order.payment_status}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Delivery Status</span>
              <span className="capitalize px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                {order.delivery_status}
              </span>
            </div>
            {order.OrderItems && order.OrderItems.length > 0 && (
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Items Ordered</p>
                {order.OrderItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs text-gray-600 py-1">
                    <span>{(item as any).Product?.name || 'Product'} × {item.quantity}</span>
                    <span>₹{(Number(item.price) * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : orderId ? (
          <div className="bg-gray-50 rounded-2xl p-5 mb-8">
            <p className="text-sm text-gray-500">Order ID: <span className="font-mono font-bold text-gray-700">{orderId}</span></p>
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/my-orders"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#003F62] text-white font-bold rounded-xl hover:bg-[#002a42] transition-colors">
            <Package size={18} />
            <span>Track My Order</span>
          </Link>
          <Link href="/shop"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F62]" />
        </div>
      }>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </main>
  )
}
