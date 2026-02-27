'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { contactApi, type ContactMessage } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Mail, MailOpen, RefreshCw } from 'lucide-react'

export default function AdminContactPage() {
  const { isLoggedIn, isAdmin } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    loadMessages()
  }, [isLoggedIn, isAdmin])

  const loadMessages = async () => {
    setLoading(true)
    try {
      const data = await contactApi.getAll()
      setMessages(data)
    } catch { /* silent */ } finally {
      setLoading(false)
    }
  }

  const handleOpen = async (msg: ContactMessage) => {
    setSelected(msg)
    if (!msg.is_read) {
      try {
        await contactApi.markRead(msg.id)
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m))
      } catch { /* silent */ }
    }
  }

  const filtered = messages.filter(m =>
    filter === 'all' ? true : filter === 'unread' ? !m.is_read : m.is_read
  )
  const unreadCount = messages.filter(m => !m.is_read).length

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Enquiries</h1>
            <p className="text-sm text-gray-500">
              Messages submitted via the contact form
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          <button
            onClick={loadMessages}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {(['all', 'unread', 'read'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === tab
                  ? 'bg-[#003F62] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab === 'unread' ? `Unread (${unreadCount})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-6 h-[calc(100vh-280px)] min-h-[400px]">
          {/* Message list */}
          <div className="w-96 flex-shrink-0 bg-white border border-gray-200 rounded-xl overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003F62]" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <Mail size={32} className="mb-3 opacity-40" />
                <p className="text-sm">No messages</p>
              </div>
            ) : (
              filtered.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => handleOpen(msg)}
                  className={`w-full text-left px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selected?.id === msg.id ? 'bg-[#003F62]/5 border-l-4 border-l-[#003F62]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex-shrink-0 ${msg.is_read ? 'text-gray-300' : 'text-[#003F62]'}`}>
                      {msg.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm truncate ${msg.is_read ? 'font-normal text-gray-600' : 'font-semibold text-gray-900'}`}>
                          {msg.name}
                        </p>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {new Date(msg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{msg.email}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">{msg.message}</p>
                    </div>
                    {!msg.is_read && (
                      <div className="w-2 h-2 rounded-full bg-[#003F62] flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Message detail */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl">
            {selected ? (
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selected.name}</h2>
                    <a href={`mailto:${selected.email}`} className="text-sm text-[#003F62] hover:underline">
                      {selected.email}
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{new Date(selected.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    <span className={`inline-flex items-center gap-1 mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                      selected.is_read ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {selected.is_read ? <MailOpen size={11} /> : <Mail size={11} />}
                      {selected.is_read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-5">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
                <div className="mt-4">
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your enquiry on KaVi's Naturals`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003F62] text-white text-sm font-semibold rounded-lg hover:bg-[#003F62]/90"
                  >
                    <Mail size={14} />
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <MailOpen size={40} className="mb-3 opacity-30" />
                <p className="text-sm">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
