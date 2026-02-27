'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { contactApi } from '@/lib/api'

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await contactApi.submit(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full  py-12" style={{ backgroundColor: 'rgb(206, 244, 165)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">Contact</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">Contact</span>
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">We would love to hear from you.</h2>
              <p className="text-gray-600 mb-8">
                If you've got great products you're making or looking to work with us then drop us a line.
              </p>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="text-green-600 text-xl font-semibold mb-2">Message sent successfully!</div>
                  <p className="text-gray-600">We'll get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 text-primary font-semibold">Send another message</button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter Your Name"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter Your Email"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter Your Message"
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary resize-none bg-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </form>
              )}
            </div>

            {/* Visit Our Store */}
            <div className=" p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Visit Our Store</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Address</h3>
                  <p className="text-gray-700 font-medium">Kavi's Naturals</p>
                  <p className="text-gray-700">Sri Mahallamman Agro Products</p>
                  <p className="text-gray-700">S.F.No: 123/6A, Kummakkalipalayam,</p>
                  <p className="text-gray-700">Perundurai-638052 Erode,</p>
                  <p className="text-gray-700">Tamilnadu, India</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
                  <p className="text-gray-700">kavisnaturals@gmail.com</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
                  <p className="text-gray-700">+91 98422 22355, 98429 22355</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ContactPage
