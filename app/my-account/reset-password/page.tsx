'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const ResetPasswordPage = () => {
  const [step, setStep] = useState<'email' | 'password'>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('password')
  }

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Password reset:', { password, confirmPassword })
    // Handle password reset
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full  py-12" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">My Account</h1>
        </div>
      </section>

      {/* Reset Password Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                <Link
                  href="/my-account"
                  className="block px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium"
                >
                  Account details
                </Link>
                <Link
                  href="/my-orders"
                  className="block px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium"
                >
                  Orders
                </Link>
                <button className="w-full text-left px-6 py-4 bg-primary text-black font-bold rounded-lg">
                  Reset Password
                </button>
                <button className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-primary transition-colors rounded-lg text-gray-800 font-medium flex items-center space-x-2">
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Reset Password Form */}
            <div className="lg:col-span-3">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 max-w-xl">
                {step === 'email' ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Reset Password</h2>
                    <p className="text-gray-600 mb-8">We Will Send You an Email to reset Your Password</p>

                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                      <div>
                        <label className="block text-gray-800 font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-12 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary-dark transition-colors"
                      >
                        Submit
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Reset Account Password</h2>
                    <p className="text-gray-600 mb-8">Enter a New Password</p>

                    <form onSubmit={handlePasswordReset} className="space-y-6">
                      <div>
                        <label className="block text-gray-800 font-medium mb-2">Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-800 font-medium mb-2">Confirm Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-12 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary-dark transition-colors"
                      >
                        Reset Password
                      </button>
                    </form>
                  </>
                )}
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
