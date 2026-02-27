'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { pagesApi, type PageContent } from '@/lib/api'

export default function PrivacyPolicyPage() {
  const [page, setPage] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    pagesApi.getPage('privacy-policy').then(setPage).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16 text-gray-700">
        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003F62]" /></div>
        ) : page ? (
          <>
            <h1 className="text-3xl font-bold text-[#003F62] mb-3">{page.title}</h1>
            <p className="text-sm text-gray-400 mb-10">Last updated: {new Date(page.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="space-y-5">
              {page.content.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
          </>
        ) : <p className="text-gray-500">Content not available.</p>}
      </main>
      <Footer />
    </>
  )
}
