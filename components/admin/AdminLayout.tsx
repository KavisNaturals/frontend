'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Bell, ChevronDown, LayoutDashboard, Package, ShoppingBag, Image as ImageIcon, Tag, Star, LogOut, Users, UserCircle, FileText, MessageSquare, Mail, BarChart3 } from 'lucide-react'
import { dashboardApi, contactApi, type Order, type ContactMessage } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showAdminMenu, setShowAdminMenu] = useState(false)

  // Notification state
  const [notifOrders, setNotifOrders] = useState<Order[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const lastOrderCountRef = useRef<number | null>(null)
  const lastSeenRef = useRef<string | null>(null)
  const [notifContacts, setNotifContacts] = useState<ContactMessage[]>([])
  const [unreadContactCount, setUnreadContactCount] = useState(0)
  const [notifTab, setNotifTab] = useState<'orders' | 'contacts'>('orders')

  // Request browser notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {})
    }
    // Load persisted last-seen timestamp
    const saved = localStorage.getItem('admin_notif_last_seen')
    if (saved) lastSeenRef.current = saved
  }, [])

  const triggerBrowserNotif = useCallback((newCount: number) => {
    if (typeof window === 'undefined' || !('Notification' in window)) return
    if (Notification.permission !== 'granted') return
    new Notification(`🛒 ${newCount} New Order${newCount > 1 ? 's' : ''}!`, {
      body: 'New orders have arrived on KaVi\'s Naturals. Click to view.',
      icon: '/images/logo.png',
    })
  }, [])

  const pollContacts = useCallback(async () => {
    try {
      const msgs = await contactApi.getAll()
      setNotifContacts(msgs.slice(0, 10))
      const unread = msgs.filter(m => !m.is_read).length
      setUnreadContactCount(prev => {
        if (prev < unread) {
          // new contact message arrived
          if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
            new Notification('📩 New Contact Enquiry!', {
              body: 'A new contact enquiry has been submitted.',
              icon: '/images/logo.png',
            })
          }
        }
        return unread
      })
    } catch { /* silent */ }
  }, [])

  const pollOrders = useCallback(async () => {
    try {
      const s = await dashboardApi.getStats()
      const orders: Order[] = s.recentOrders || []
      setNotifOrders(orders)

      const currentCount = s.totalOrders ?? 0
      if (lastOrderCountRef.current !== null && currentCount > lastOrderCountRef.current) {
        const diff = currentCount - lastOrderCountRef.current
        setUnreadCount(prev => prev + diff)
        triggerBrowserNotif(diff)
      }
      lastOrderCountRef.current = currentCount
    } catch { /* silent */ }
  }, [triggerBrowserNotif])

  // Poll every 30s
  useEffect(() => {
    pollOrders()
    const interval = setInterval(pollOrders, 30_000)
    return () => clearInterval(interval)
  }, [pollOrders])

  useEffect(() => {
    pollContacts()
    const interval = setInterval(pollContacts, 30_000)
    return () => clearInterval(interval)
  }, [pollContacts])

  const handleOpenNotifications = () => {
    setShowNotifications(v => !v)
    if (!showNotifications) {
      setUnreadCount(0)
      setUnreadContactCount(0)
      const now = new Date().toISOString()
      lastSeenRef.current = now
      localStorage.setItem('admin_notif_last_seen', now)
    }
  }

  const totalUnread = unreadCount + unreadContactCount

  const menuItems = [
    { label: 'DASHBOARD', icon: LayoutDashboard, href: '/admin/dashboard' },
    { label: 'ALL PRODUCTS', icon: Package, href: '/admin/products' },
    { label: 'STOCK MANAGEMENT', icon: BarChart3, href: '/admin/products/stock' },
    { label: 'ORDER LIST', icon: ShoppingBag, href: '/admin/orders' },
    { label: 'USERS', icon: Users, href: '/admin/users' },
    { label: 'BANNERS', icon: ImageIcon, href: '/admin/banners' },
    { label: 'CATEGORIES', icon: Tag, href: '/admin/categories' },
    { label: 'REVIEWS', icon: Star, href: '/admin/reviews' },
    { label: 'PAGES', icon: FileText, href: '/admin/pages' },
    { label: 'CONTACT ENQUIRY', icon: MessageSquare, href: '/admin/contact' },
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
                  onClick={handleOpenNotifications}
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                >
                  <Bell size={20} />
                  {totalUnread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {totalUnread > 9 ? '9+' : totalUnread}
                    </span>
                  )}
                  {totalUnread === 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-gray-300 rounded-full" />}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-2xl w-80 z-50">
                    <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setNotifTab('orders')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            notifTab === 'orders' ? 'bg-[#003F62] text-white' : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <ShoppingBag size={12} />
                          Orders
                          {unreadCount > 0 && <span className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">{unreadCount}</span>}
                        </button>
                        <button
                          onClick={() => setNotifTab('contacts')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            notifTab === 'contacts' ? 'bg-[#003F62] text-white' : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <Mail size={12} />
                          Enquiries
                          {unreadContactCount > 0 && <span className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">{unreadContactCount}</span>}
                        </button>
                      </div>
                      <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                      {notifTab === 'orders' ? (
                        notifOrders.length === 0 ? (
                          <p className="p-6 text-center text-sm text-gray-400">No recent orders</p>
                        ) : notifOrders.map((order: any) => (
                          <Link
                            key={order.id}
                            href={`/admin/orders/${order.id}`}
                            onClick={() => setShowNotifications(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-10 h-10 bg-[#003F62]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <ShoppingBag size={16} className="text-[#003F62]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {order.User?.name || order.user_name || 'Customer'}
                              </p>
                              <p className="text-xs text-gray-500">₹{Number(order.total_amount || 0).toFixed(0)} · {new Date(order.createdAt || '').toLocaleDateString()}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                              (order.delivery_status || order.status) === 'delivered' ? 'bg-green-100 text-green-700' :
                              (order.delivery_status || order.status) === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>{(order.delivery_status || order.status || 'pending').replace(/_/g, ' ')}</span>
                          </Link>
                        ))
                      ) : (
                        notifContacts.length === 0 ? (
                          <p className="p-6 text-center text-sm text-gray-400">No enquiries</p>
                        ) : notifContacts.map((msg) => (
                          <Link
                            key={msg.id}
                            href="/admin/contact"
                            onClick={() => setShowNotifications(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Mail size={16} className={msg.is_read ? 'text-gray-400' : 'text-orange-500'} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm truncate ${msg.is_read ? 'font-normal text-gray-600' : 'font-semibold text-gray-900'}`}>
                                {msg.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{msg.message}</p>
                            </div>
                            {!msg.is_read && <span className="w-2 h-2 rounded-full bg-[#003F62] flex-shrink-0" />}
                          </Link>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200 text-center">
                      {notifTab === 'orders' ? (
                        <Link href="/admin/orders" onClick={() => setShowNotifications(false)} className="text-xs bg-[#003F62] text-white px-4 py-2 rounded-lg hover:bg-[#003F62]/90 inline-block">
                          VIEW ALL ORDERS
                        </Link>
                      ) : (
                        <Link href="/admin/contact" onClick={() => setShowNotifications(false)} className="text-xs bg-[#003F62] text-white px-4 py-2 rounded-lg hover:bg-[#003F62]/90 inline-block">
                          VIEW ALL ENQUIRIES
                        </Link>
                      )}
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
                        href="/admin/profile"
                        onClick={() => setShowAdminMenu(false)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <UserCircle size={14} /> MY PROFILE
                      </Link>
                      <button
                        onClick={() => { logout(); router.push('/admin/login'); setShowAdminMenu(false) }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <LogOut size={14} /> LOG OUT
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
