'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ordersApi, type Order, API_BASE_URL } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { Package, MapPin, CreditCard, ChevronLeft, Truck } from 'lucide-react'

function getProductImage(product: any) {
  const url = product?.imageUrl || product?.image_url || product?.imagePath || product?.image_path
  if (!url) return '/images/placeholder.svg'
  if (url.startsWith('http') || url.startsWith('/')) return url
  return `${API_BASE_URL}/uploads/${url}`
}

const STATUS_STEPS = ['pending', 'processing', 'out_for_delivery', 'shipped', 'delivered']

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  processing: 'bg-blue-100 text-blue-700 border-blue-200',
  out_for_delivery: 'bg-purple-100 text-purple-700 border-purple-200',
  shipped: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
  returned: 'bg-orange-100 text-orange-700 border-orange-200',
}

const PAYMENT_COLORS: Record<string, string> = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  failed: 'bg-red-100 text-red-700',
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  const { isLoggedIn, authLoading } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (authLoading) return
    if (!isLoggedIn) { router.push('/'); return }
    ordersApi.getById(orderId)
      .then(setOrder)
      .catch(() => setError('Order not found or you do not have permission to view it.'))
      .finally(() => setLoading(false))
  }, [isLoggedIn, authLoading, orderId, router])

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
          <Package size={56} className="mx-auto text-gray-300" strokeWidth={1} />
          <p className="text-xl text-gray-500">{error || 'Order not found.'}</p>
          <Link href="/my-orders" className="inline-block px-8 py-3 bg-primary text-black font-bold rounded-xl">
            Back to My Orders
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const addr = (order as any).shipping_address || {}
  const items = (order as any).OrderItems || (order as any).items || []
  const deliveryStatus = (order as any).delivery_status || (order as any).status || 'pending'
  const isCancelledOrReturned = deliveryStatus === 'cancelled' || deliveryStatus === 'returned'
  const currentStep = isCancelledOrReturned ? -1 : STATUS_STEPS.indexOf(deliveryStatus)

  const shipping = Number(order.total_amount) >= 660 ? 0 : 60 // approx: grandTotal=total+60 if <600
  const subtotal = items.reduce((s: number, i: any) => s + Number(i.price) * i.quantity, 0)

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="w-full py-10" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/my-orders" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary mb-2">
            <ChevronLeft size={16} /> Back to My Orders
          </Link>
          <h1 className="text-3xl font-bold text-black">Order Details</h1>
          <p className="text-sm text-gray-600 mt-1">Order #{order.id.slice(0, 8).toUpperCase()}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-6">

          {/* Status Banner */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order Status</p>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold border capitalize ${STATUS_COLORS[deliveryStatus] || 'bg-gray-100 text-gray-600'}`}>
                {deliveryStatus.replace(/_/g, ' ')}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Payment</p>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${PAYMENT_COLORS[order.payment_status] || 'bg-gray-100 text-gray-600'}`}>
                {order.payment_status}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Placed On</p>
              <p className="text-sm font-semibold text-gray-800">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total</p>
              <p className="text-lg font-bold text-gray-900">₹{Number(order.total_amount).toFixed(2)}</p>
            </div>
          </div>

          {/* Progress Tracker */}
          {!isCancelledOrReturned && (
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2"><Truck size={18} /> Order Progress</h2>
              <div className="flex items-center justify-between relative">
                <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0">
                  <div
                    className="h-1 bg-primary transition-all duration-500"
                    style={{ width: currentStep >= 0 ? `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` : '0%' }}
                  />
                </div>
                {STATUS_STEPS.map((step, idx) => (
                  <div key={step} className="flex flex-col items-center z-10 flex-1">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all
                      ${idx <= currentStep ? 'bg-primary border-primary text-black' : 'bg-white border-gray-300 text-gray-400'}`}>
                      {idx < currentStep ? '✓' : idx + 1}
                    </div>
                    <p className={`text-xs mt-2 text-center capitalize font-medium ${idx <= currentStep ? 'text-gray-800' : 'text-gray-400'}`}>
                      {step.replace(/_/g, ' ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isCancelledOrReturned && (
            <div className={`rounded-2xl p-4 border-2 text-center font-semibold capitalize ${STATUS_COLORS[deliveryStatus]}`}>
              This order has been {deliveryStatus}.
            </div>
          )}

          {/* Items */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><Package size={18} /> Items Ordered</h2>
            <div className="divide-y divide-gray-100">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4 py-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <img
                      src={getProductImage(item.Product)}
                      alt={item.Product?.name || 'Product'}
                      className="w-12 h-12 object-contain"
                      onError={(e) => { e.currentTarget.src = '/images/placeholder.svg' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">
                      {item.Product?.name || 'Product'}
                      {item.variant_label && <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{item.variant_label}</span>}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">₹{(Number(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            {/* Summary */}
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-1.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span><span>{Number(order.total_amount) - subtotal <= 0.5 ? 'Free' : `₹${(Number(order.total_amount) - subtotal).toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-2 mt-1">
                <span>Grand Total</span><span>₹{Number(order.total_amount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          {addr && Object.keys(addr).length > 0 && (
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2"><MapPin size={18} /> Delivery Address</h2>
              <p className="text-sm text-gray-700 font-semibold">{addr.name}</p>
              {addr.phone && <p className="text-sm text-gray-600">{addr.phone}</p>}
              <p className="text-sm text-gray-600">{addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ''}</p>
              <p className="text-sm text-gray-600">{addr.city}, {addr.state} — {addr.pincode}</p>
              {addr.email && <p className="text-sm text-gray-500 mt-1">{addr.email}</p>}
            </div>
          )}

          {/* Payment Info */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2"><CreditCard size={18} /> Payment Info</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Payment Status</p>
                <p className="font-semibold text-gray-800 capitalize">{order.payment_status}</p>
              </div>
              {(order as any).razorpay_payment_id && (
                <div>
                  <p className="text-gray-500">Payment ID</p>
                  <p className="font-semibold text-gray-800 text-xs break-all">{(order as any).razorpay_payment_id}</p>
                </div>
              )}
              {(order as any).razorpay_order_id && (
                <div>
                  <p className="text-gray-500">Razorpay Order ID</p>
                  <p className="font-semibold text-gray-800 text-xs break-all">{(order as any).razorpay_order_id}</p>
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
