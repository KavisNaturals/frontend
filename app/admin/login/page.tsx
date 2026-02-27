'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const AdminLoginPage = () => {
  const router = useRouter()
  const { login, logout } = useAuth()
  const [formData, setFormData] = useState({ adminId: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(formData.adminId, formData.password)
      const savedUser = JSON.parse(localStorage.getItem('user') || 'null')
      if (!savedUser || savedUser.role !== 'admin') {
        logout()
        setError('Access denied. Admin accounts only.')
        return
      }
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Invalid credentials. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Image src="/images/logo.png" alt="KaVi's Naturals" width={200} height={80} className="object-contain" />
      </div>

      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Login</h1>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="text" placeholder="Admin Id / Email" value={formData.adminId}
              onChange={e => setFormData({ ...formData, adminId: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" required />
          </div>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white pr-12" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-[#003F62] text-white font-semibold py-3 rounded-lg hover:bg-[#003F62]/90 transition-colors disabled:opacity-60">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
