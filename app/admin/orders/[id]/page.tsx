'use client'

import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { User, Package, MapPin, CreditCard } from 'lucide-react'

const OrderDetailsPage = () => {
  const products = [
    { name: 'Aloevera Shampoo', orderId: '#25421', quantity: 2, total: '₹800.40' },
    { name: 'Aloevera Shampoo', orderId: '#25421', quantity: 2, total: '₹800.40' },
    { name: 'Aloevera Shampoo', orderId: '#25421', quantity: 2, total: '₹800.40' },
    { name: 'Aloevera Shampoo', orderId: '#25421', quantity: 2, total: '₹800.40' }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Details</h1>
          <p className="text-sm text-gray-600">Home &gt; Order List &gt; Order Details</p>
        </div>

        {/* Order Info Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-gray-900">Orders ID: #6743</h2>
              <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">Pending</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Feb 16,2022 - Feb 20,2022</div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm">
                <option>Change Satus</option>
              </select>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Customer, Order, Delivery Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Customer</h3>
                <p className="text-sm text-gray-900">Full Name: Shristi Singh</p>
                <p className="text-sm text-gray-600">Email: shristi@gmail.com</p>
                <p className="text-sm text-gray-600">Phone: +91 904 231 1212</p>
              </div>
            </div>
            <button className="w-full bg-[#003F62] text-white py-2 rounded-lg text-sm font-semibold">
              View profile
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
                <Package size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Order Info</h3>
                <p className="text-sm text-gray-900">Shipping: Next express</p>
                <p className="text-sm text-gray-600">Payment Method: Paypal</p>
                <p className="text-sm text-gray-600">Status: Pending</p>
              </div>
            </div>
            <button className="w-full bg-[#003F62] text-white py-2 rounded-lg text-sm font-semibold">
              Download Info
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Deliver to</h3>
                <p className="text-sm text-gray-900">Address: Dharam Colony,</p>
                <p className="text-sm text-gray-600">Palam Vihar, Gurgaon,</p>
                <p className="text-sm text-gray-600">Haryana</p>
              </div>
            </div>
            <button className="w-full bg-[#003F62] text-white py-2 rounded-lg text-sm font-semibold">
              View profile
            </button>
          </div>
        </div>

        {/* Payment Info & Note */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center">
                  <CreditCard size={16} className="text-orange-600" />
                </div>
                <span className="text-gray-900">Master Card **** **** 6067</span>
              </div>
              <p className="text-gray-600">Business name: Shristi Singh</p>
              <p className="text-gray-600">Phone: +91 904 231 1212</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Note</h3>
            <textarea
              placeholder="Type some notes"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white resize-none"
            ></textarea>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Products</h2>
            <button className="text-gray-400">⋮</button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Product Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Quantity</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <span className="text-sm text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">{product.orderId}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{product.quantity}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-900">{product.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Summary */}
          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹3,201.6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (20%)</span>
                <span className="font-semibold">₹640.32</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="font-semibold">₹0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sipping Rate</span>
                <span className="font-semibold">₹0</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>₹3841.92</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default OrderDetailsPage
