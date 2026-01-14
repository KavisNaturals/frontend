'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const MyAccountPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full  py-12" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">My Account</h1>
        </div>
      </section>

      {/* Account Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                <button className="w-full text-left px-6 py-4 bg-primary text-black font-bold rounded-lg">
                  Account details
                </button>
                <Link
                  href="/my-orders"
                  className="block px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium"
                >
                  Orders
                </Link>
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

            {/* Address Details */}
            <div className="lg:col-span-3">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Address</h2>

                <div className="space-y-2 mb-6">
                  <p className="text-gray-800 font-semibold">Rajkumar K</p>
                  <p className="text-gray-700">D mart erode</p>
                  <p className="text-gray-700">14, cheran Nagar, Sengunthar nagar 5 th Street,</p>
                  <p className="text-gray-700">periya semur</p>
                  <p className="text-gray-700">638004 Erode TN</p>
                  <p className="text-gray-700">India</p>
                </div>

                <div className="flex space-x-4">
                  <Link
                    href="/my-account/edit-address"
                    className="px-8 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    Edit
                  </Link>
                  <button className="px-8 py-3 bg-white text-black font-bold border-2 border-gray-800 rounded-xl hover:bg-gray-100 transition-colors">
                    Delete
                  </button>
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

export default MyAccountPage
