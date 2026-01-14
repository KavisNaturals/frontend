'use client'

import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Image from 'next/image'
import { TrendingUp, Package, CheckCircle, RotateCcw } from 'lucide-react'

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Oders', value: '₹126,500', change: '34.7%', icon: Package, color: 'bg-blue-500' },
    { title: 'Active Orders', value: '₹126,500', change: '34.7%', icon: Package, color: 'bg-blue-500' },
    { title: 'Completed Orders', value: '₹126,500', change: '34.7%', icon: CheckCircle, color: 'bg-blue-500' },
    { title: 'Return Orders', value: '₹126,500', change: '34.7%', icon: RotateCcw, color: 'bg-blue-500' }
  ]

  const bestSellers = [
    { name: 'Aloevera Shampoo', price: '₹126.50', sales: '999 sales' },
    { name: 'Aloevera Shampoo', price: '₹126.50', sales: '999 sales' },
    { name: 'Aloevera Shampoo', price: '₹126.50', sales: '999 sales' }
  ]

  const recentOrders = [
    { product: 'Aloevera Shampoo', orderId: '#25426', date: 'Nov 8th,2023', customer: 'Kavin', status: 'Delivered', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25425', date: 'Nov 7th,2023', customer: 'Komael', status: 'Canceled', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25424', date: 'Nov 6th,2023', customer: 'Nikhil', status: 'Delivered', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25423', date: 'Nov 5th,2023', customer: 'Shivam', status: 'Canceled', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25422', date: 'Nov 4th,2023', customer: 'Shadab', status: 'Delivered', amount: '₹200.00' },
    { product: 'Aloevera Shampoo', orderId: '#25421', date: 'Nov 2nd,2023', customer: 'Yogesh', status: 'Delivered', amount: '₹200.00' }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600">Home &gt; Dashboard</p>
          </div>
          <div className="text-sm text-gray-600">Oct 11,2023 - Nov 11,2022</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-600">{stat.title}</h3>
                <button className="text-gray-400">⋮</button>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp size={14} className="mr-1" />
                    {stat.change}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Compared to Oct 2023</p>
            </div>
          ))}
        </div>

        {/* Sale Graph & Best Sellers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sale Graph */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Sale Graph</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">WEEKLY</button>
                <button className="px-4 py-2 text-sm bg-[#003F62] text-white rounded-lg">MONTHLY</button>
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">YEARLY</button>
              </div>
            </div>
            <div className="relative w-full h-64">
              <Image
                src="/images/admin/graph.png"
                alt="Sales Graph"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Best Sellers */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Best Sellers</h2>
              <button className="text-gray-400">⋮</button>
            </div>
            <div className="space-y-4">
              {bestSellers.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">{item.name}</p>
                    <p className="text-lg font-bold text-gray-900">{item.price}</p>
                    <p className="text-xs text-gray-600">{item.sales}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-black text-white py-2 rounded-lg text-sm font-semibold">REPORT</button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
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
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{order.product}</td>
                    <td className="py-4 px-4 text-sm text-gray-900">{order.orderId}</td>
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
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
