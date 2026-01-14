'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const EditAddressPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    flatHouseNo: '',
    areaStreet: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    email: '',
    phone: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Address updated:', formData)
    // Handle form submission
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full  py-12" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">Address</h1>
        </div>
      </section>

      {/* Edit Address Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                    required
                  />
                </div>
              </div>

              {/* Flat, House No */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">Flat, House No</label>
                <input
                  type="text"
                  value={formData.flatHouseNo}
                  onChange={(e) => setFormData({ ...formData, flatHouseNo: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                  required
                />
              </div>

              {/* Area, Street */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">Area, Street</label>
                <input
                  type="text"
                  value={formData.areaStreet}
                  onChange={(e) => setFormData({ ...formData, areaStreet: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                  required
                />
              </div>

              {/* Land mark */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">Land mark</label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                />
              </div>

              {/* Pincode & City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 font-medium mb-2">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                    required
                  />
                </div>
              </div>

              {/* State & Country */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 font-medium mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-medium mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                    required
                  />
                </div>
              </div>

              {/* Email Address & Phone Number */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="px-12 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Update
                </button>
                <Link
                  href="/my-account"
                  className="px-12 py-3 bg-white text-black font-bold border-2 border-gray-800 rounded-xl hover:bg-gray-100 transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default EditAddressPage
