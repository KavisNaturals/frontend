'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { usersApi } from '@/lib/api'

const ResetPasswordPage = () => {
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setSaving(true)
    try {
      await usersApi.updateProfile({ currentPassword, password })
      setSuccess(true)
      setCurrentPassword(''); setPassword(''); setConfirmPassword('')
    } catch (err: any) {
      setError(err?.message || 'Failed to update password. Check your current password.')
    } finally { setSaving(false) }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="w-full py-12" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">My Account</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-2">
                <Link href="/my-account" className="block px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium">
                  Account details
                </Link>
                <Link href="/my-orders" className="block px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium">
                  Orders
                </Link>
                <button className="w-full text-left px-6 py-4 bg-primary text-black font-bold rounded-lg">
                  Reset Password
                </button>
                <button onClick={() => { logout(); router.push('/') }}
                  className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium flex items-center space-x-2">
                  <span>🚪</span><span>Logout</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 max-w-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Reset Account Password</h2>
                <p className="text-gray-600 mb-8">Enter your current password and a new password below.</p>

                {success && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                    Password updated successfully!
                  </div>
                )}
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">{error}</div>
                )}

                <form onSubmit={handlePasswordReset} className="space-y-6">
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Current Password</label>
                    <div className="relative">
                      <input type={showCurrent ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white pr-12" required />
                      <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">New Password</label>
                    <div className="relative">
                      <input type={showNew ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white pr-12" required />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Confirm New Password</label>
                    <div className="relative">
                      <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white pr-12" required />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={saving}
                    className="px-12 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60">
                    {saving ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ResetPasswordPage
