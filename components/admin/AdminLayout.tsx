'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search, Bell, ChevronDown, LayoutDashboard, Package, ShoppingBag } from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showAdminMenu, setShowAdminMenu] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  const menuItems = [
    { label: 'DASHBOARD', icon: LayoutDashboard, href: '/admin/dashboard' },
    { label: 'ALL PRODUCTS', icon: Package, href: '/admin/products' },
    { label: 'ORDER LIST', icon: ShoppingBag, href: '/admin/orders' }
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-4 border-b border-gray-200 flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="KaVi's Naturals"
            width={100}
            height={50}
            className="object-contain"
          />
        </div>

        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center space-x-3 px-6 py-3 text-sm font-semibold ${
                pathname === item.href
                  ? 'bg-[#003F62] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Categories */}
        <div className="px-4 mt-8">
          <button 
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center justify-between w-full text-left font-bold text-gray-900 text-lg px-2 py-2"
          >
            <span>Categories</span>
            <ChevronDown size={20} className={`transition-transform ${showCategories ? 'rotate-180' : ''}`} />
          </button>
          {showCategories && (
            <div className="space-y-2 text-sm mt-3 pl-2">
              <div className="flex items-center justify-between text-gray-600">
                <span>Aloevera Shampoo</span>
                <span className="bg-[#003F62] text-white text-xs px-2 py-1 rounded">21</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Organic Products</span>
                <span className="text-xs">32</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Home Care</span>
                <span className="text-xs">18</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Search size={20} />
                </button>
                {showSearch && (
                  <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg w-64 p-2 z-50">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg w-80 z-50">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      <button className="text-xs text-gray-600">×</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded"></div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">Aloevera Shampoo</p>
                              <p className="text-xs text-gray-600">₹140</p>
                              <p className="text-xs text-gray-500">Nov 15,2023</p>
                            </div>
                            <span className="bg-[#003F62] text-white text-xs px-2 py-1 rounded">Sell</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 text-center">
                      <button className="text-xs text-gray-600 mr-4">MARK ALL AS READ</button>
                      <button className="text-xs bg-[#003F62] text-white px-4 py-2 rounded">VIEW ALL NOTIFICATON</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#003F62] text-white rounded-lg hover:bg-[#003F62]/90"
                >
                  <span className="text-sm font-semibold">ADMIN</span>
                  <ChevronDown size={16} />
                </button>
                {showAdminMenu && (
                  <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg w-56 z-50">
                    <div className="p-2">
                      <Link
                        href="/admin/change-password"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        CHANGE PASSWORD →
                      </Link>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center justify-between">
                        LOG OUT
                        <span>⇲</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
