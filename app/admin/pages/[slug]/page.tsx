'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { Save } from 'lucide-react'
import { pagesApi, type PageContent } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useParams, useRouter } from 'next/navigation'

export default function AdminPageEditorPage() {
  const { isLoggedIn, isAdmin } = useAuth()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [page, setPage] = useState<PageContent | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    pagesApi.getPage(slug)
      .then(data => {
        setPage(data)
        setTitle(data.title)
        setContent(data.content)
      })
      .catch(() => setError('Failed to load page content'))
      .finally(() => setLoading(false))
  }, [isLoggedIn, isAdmin, slug, router])

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      const updated = await pagesApi.updatePage(slug, { title, content })
      setPage(updated)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e: any) {
      setError(e?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const PAGE_LABELS: Record<string, string> = {
    'privacy-policy': 'Privacy Policy',
    'terms-conditions': 'Terms & Conditions',
    'shipping-policy': 'Shipping & Returns Policy',
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003F62]" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{PAGE_LABELS[slug] || slug}</h1>
            <p className="text-sm text-gray-500">Home &gt; <Link href="/admin/pages" className="hover:underline">Pages</Link> &gt; {PAGE_LABELS[slug] || slug}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-[#003F62] text-white rounded-lg text-sm font-semibold hover:bg-[#003F62]/90 disabled:opacity-60"
            >
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">✓ Changes saved successfully</div>}

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
          {/* Page Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Page Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#003F62] focus:outline-none"
            />
          </div>

          {/* Content Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Page Content</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={28}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 resize-y focus:ring-2 focus:ring-[#003F62] focus:outline-none"
              placeholder="Enter page content here..."
            />
          </div>
        </div>

        {/* Bottom save */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-[#003F62] text-white rounded-lg font-semibold hover:bg-[#003F62]/90 disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
