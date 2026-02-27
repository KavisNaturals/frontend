'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { usersApi, type AdminUser } from '@/lib/api'
import { Search, UserCircle } from 'lucide-react'

const AdminUsersPage = () => {
  const router = useRouter()
  const { isLoggedIn, isAdmin } = useAuth()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    usersApi.getAllUsers()
      .then(setUsers)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isLoggedIn, isAdmin, router])

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
            <p className="text-sm text-gray-600">Home &gt; Users</p>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#003F62] w-64 bg-white"
            />
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: users.length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'Admins', value: users.filter(u => u.role === 'admin').length, color: 'bg-purple-50 text-purple-700 border-purple-200' },
            { label: 'Customers', value: users.filter(u => u.role === 'user').length, color: 'bg-green-50 text-green-700 border-green-200' },
            { label: 'Showing', value: filtered.length, color: 'bg-gray-50 text-gray-700 border-gray-200' },
          ].map(card => (
            <div key={card.label} className={`rounded-xl border p-4 ${card.color}`}>
              <p className="text-xs font-medium opacity-70">{card.label}</p>
              <p className="text-2xl font-bold mt-1">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003F62]" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wide">User</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#003F62]/10 flex items-center justify-center">
                              <UserCircle size={20} className="text-[#003F62]" />
                            </div>
                          )}
                          <span className="font-medium text-gray-900 text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{user.email}</td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-400">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminUsersPage
