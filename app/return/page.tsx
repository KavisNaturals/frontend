'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const ReturnPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full  py-12" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">Return</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">Return</span>
          </p>
        </div>
      </section>

      {/* Return Policy Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-700 mb-12">
            We issue refunds only for eligible returns or cancellations as per the policy above.
          </p>

          {/* Refund Eligibility */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Eligibility</h2>
            <p className="text-gray-700 mb-4 font-medium">Refunds will be processed if:</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold">•</span>
                <span>Cancellation is made in time</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold">•</span>
                <span>Return is verified by our team and approved</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold">•</span>
                <span>Item is returned unused and in original condition</span>
              </li>
            </ul>
          </div>

          {/* Refund Mode */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Mode</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold">•</span>
                <span>Prepaid orders: Refunded to the original payment method</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold">•</span>
                <span>COD orders: Refunded via UPI or bank transfer (requires bank details)</span>
              </li>
            </ul>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline</h2>
            <p className="text-gray-700">
              Refunds are processed within 5–7 working days after we receive and inspect the returned item.
            </p>
          </div>

          {/* No Refund If */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">No Refund If:</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold">•</span>
                <span>Return request exceeds 2-day window</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold">•</span>
                <span>Package shows signs of use or tampering</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary font-bold">•</span>
                <span>Delivery was unsuccessful due to customer error</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ReturnPage
