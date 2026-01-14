'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

const MyOrderPage = () => {
  const [activeTab, setActiveTab] = React.useState('orders')

  const orders = [
    {
      id: '#2352625',
      date: 'Jan 15, 2023',
      product: 'Onion Shampoo ( 200 ml )',
      productSubtext: 'Reduce, Repair & Restore hair',
      paymentStatus: 'Paid',
      deliveryStatus: 'Delivered',
      amount: '₹164',
      imagePath: '/images/onion-shampoo.png'
    },
    {
      id: '#2352625',
      date: 'Jan 15, 2023',
      product: 'Onion Shampoo ( 200 ml )',
      productSubtext: 'Reduce, Repair & Restore hair',
      paymentStatus: 'Paid',
      deliveryStatus: 'Delivered',
      amount: '₹164',
      imagePath: '/images/onion-shampoo.png'
    },
    {
      id: '#2352625',
      date: 'Jan 15, 2023',
      product: 'Onion Shampoo ( 200 ml )',
      productSubtext: 'Reduce, Repair & Restore hair',
      paymentStatus: 'Paid',
      deliveryStatus: 'Delivered',
      amount: '₹164',
      imagePath: '/images/onion-shampoo.png'
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full  py-12" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">My Order</h1>
        </div>
      </section>

      {/* My Order Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                <Link
                  href="/my-account"
                  className="block px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium"
                >
                  Account details
                </Link>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="w-full text-left px-6 py-4 bg-primary text-black font-bold rounded-lg"
                >
                  Orders
                </button>
                <Link
                  href="/my-account/reset-password"
                  className="block px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium"
                >
                  Reset Password
                </Link>
                <button className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium flex items-center space-x-2">
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Order History Table */}
            <div className="lg:col-span-3">
              <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 px-8 py-6 border-b-2 border-gray-200">
                  Order history
                </h2>

                {/* Table Header */}
                <div className="grid grid-cols-6 gap-4 px-8 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                  <div>Product</div>
                  <div>Order Id</div>
                  <div>Date</div>
                  <div>Payment Status</div>
                  <div>Status</div>
                  <div>Amount</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 px-8 py-6 items-center hover:bg-gray-50 transition-colors">
                      {/* Product */}
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Image
                            src={order.imagePath}
                            alt={order.product}
                            width={50}
                            height={50}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{order.product}</p>
                          <p className="text-xs text-gray-600">{order.productSubtext}</p>
                        </div>
                      </div>

                      {/* Order ID */}
                      <div className="text-sm text-gray-700">{order.id}</div>

                      {/* Date */}
                      <div className="text-sm text-gray-700">{order.date}</div>

                      {/* Payment Status */}
                      <div className="text-sm font-semibold text-gray-800">{order.paymentStatus}</div>

                      {/* Delivery Status */}
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                        <span className="text-sm font-semibold text-gray-800">{order.deliveryStatus}</span>
                      </div>

                      {/* Amount */}
                      <div className="text-base font-bold text-gray-900">{order.amount}</div>
                    </div>
                  ))}
                </div>
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
