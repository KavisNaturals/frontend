'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const AdminLoginPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    adminId: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/images/logo.png"
          alt="KaVi's Naturals"
          width={200}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
        <p className="text-sm text-gray-600 mb-6">
          <a href="#" className="text-gray-600 hover:text-primary">Forgot your password?</a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Admin Id"
              value={formData.adminId}
              onChange={(e) => setFormData({ ...formData, adminId: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#003F62] text-white font-semibold py-3 rounded-lg hover:bg-[#003F62]/90 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
