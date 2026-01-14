'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'

const TrackOrderStatusPage = () => {
  const orderStatuses = [
    { label: 'Ordered', completed: true, icon: '/images/track-icons/icon-1.png' },
    { label: 'Order Ready', completed: true, icon: '/images/track-icons/icon-2.png' },
    { label: 'Shipped', completed: true, icon: '/images/track-icons/icon-3.png' },
    { label: 'Out for Delivery', completed: true, icon: '/images/track-icons/icon-4.png' },
    { label: 'Delivered', completed: true, icon: '/images/track-icons/icon-5.png' }
  ]

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

      {/* Order Tracking Timeline */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-8">
            {orderStatuses.map((status, index) => (
              <div key={index} className="flex items-center space-x-4 relative">
                {/* Connecting Line - Vertical */}
                {index < orderStatuses.length - 1 && (
                  <div className="absolute  h-12 w-1 bg-primary" style={{ top: '3rem', left:'2.2rem' }}></div>
                )}

                {/* Left Section - Check Icon & Line */}
                <div className="flex flex-col items-center">
                  {/* Green Check Circle */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    status.completed ? 'bg-primary' : 'bg-white border-2 border-gray-300'
                  }`}>
                    {status.completed && (
                      <Check size={24} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>

                {/* Right Section - Status Icon & Label */}
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-14 h-14 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-50 flex-shrink-0">
                    <Image
                      src={status.icon}
                      alt={status.label}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <p className={`text-lg font-semibold ${
                    status.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {status.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default TrackOrderStatusPage
