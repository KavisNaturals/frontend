'use client'

import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'

const AdminOrdersPage = () => {
  const orders = [
    { product: 'Aloevera Shampoo', orderId: '#25426', date: 'Nov 8th,2023', customer: 'Kavin', status: 'Delivered', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25425', date: 'Nov 7th,2023', customer: 'Komael', status: 'Canceled', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25424', date: 'Nov 6th,2023', customer: 'Nikhil', status: 'Delivered', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25423', date: 'Nov 5th,2023', customer: 'Shivam', status: 'Canceled', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25422', date: 'Nov 4th,2023', customer: 'Shadab', status: 'Delivered', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25421', date: 'Nov 2nd,2023', customer: 'Yogesh', status: 'Delivered', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25423', date: 'Nov 1st,2023', customer: 'Sunita', status: 'Canceled', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25421', date: 'Nov 1st,2023', customer: 'Priyanka', status: 'Delivered', amount: '₹200.00' }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders List</h1>
            <p className="text-sm text-gray-600">Home &gt; Order List</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">Feb 16,2022 to Feb 20,2022</div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-primary">
              <option>Change Status</option>
            </select>
          </div>
        </div>

        {/* Recent Purchases Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Purchases</h2>
            <button className="text-gray-400">⋮</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Customer Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{order.product}</td>
                    <td className="py-4 px-4">
                      <Link href={`/admin/orders/${order.orderId.replace('#', '')}`} className="text-sm text-blue-600 hover:underline">
                        {order.orderId}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{order.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-900">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center space-x-1 text-sm ${
                        order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-600' : 'bg-orange-600'
                        }`}></span>
                        <span>{order.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 pt-6">
            <button className="px-4 py-2 bg-black text-white rounded-lg font-semibold">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">4</button>
            <span className="px-4">...</span>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">10</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">NEXT →</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminOrdersPage
