'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { FileText, Edit } from 'lucide-react'
import { pagesApi, type PageContent } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const PAGE_META: Record<string, { label: string; description: string }> = {
  'privacy-policy': { label: 'Privacy Policy', description: 'Customer data handling, cookie usage, and legal disclosures.' },
  'terms-conditions': { label: 'Terms & Conditions', description: 'Rules governing use of the website and purchases.' },
  'shipping-policy': { label: 'Shipping & Returns Policy', description: 'Delivery timelines, charges, returns, and refunds.' },
}

export default function AdminPagesListPage() {
  const { isLoggedIn, isAdmin } = useAuth()
  const router = useRouter()
  const [pages, setPages] = useState<PageContent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    pagesApi.getAllPages()
      .then(setPages)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isLoggedIn, isAdmin, router])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Page Content</h1>
          <p className="text-sm text-gray-500">Edit the content of your policy and information pages</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003F62]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(PAGE_META).map(([slug, meta]) => {
              const page = pages.find(p => p.slug === slug)
              return (
                <div key={slug} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-[#003F62] text-white rounded-xl flex items-center justify-center mb-4">
                      <FileText size={22} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">{meta.label}</h2>
                    <p className="text-sm text-gray-500 mb-4">{meta.description}</p>
                    {page && (
                      <p className="text-xs text-gray-400">
                        Last updated: {new Date(page.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/admin/pages/${slug}`}
                    className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 bg-[#003F62] text-white rounded-lg text-sm font-semibold hover:bg-[#003F62]/90 transition-colors"
                  >
                    <Edit size={15} />
                    Edit Content
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
