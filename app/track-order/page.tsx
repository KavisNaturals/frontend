'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('')
  const [billingEmail, setBillingEmail] = useState('')

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to track order status page
    window.location.href = '/track-order/status'
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full  py-12" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">Track Order</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">Track Order</span>
          </p>
        </div>
      </section>

      {/* Track Order Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center text-gray-700 mb-8">
            To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.
          </p>

          <form onSubmit={handleTrack} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-medium mb-2">Order ID</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Your Order ID"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">Billing Email</label>
              <input
                type="email"
                value={billingEmail}
                onChange={(e) => setBillingEmail(e.target.value)}
                placeholder="Enter Your Billing E-mail Address"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-primary-dark transition-colors"
            >
              Track
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default TrackOrderPage
