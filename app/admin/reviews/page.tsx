'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Trash2, Star } from 'lucide-react'
import { reviewsApi, type Review } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { toastConfirm } from '@/lib/toastConfirm'

export default function AdminReviewsPage() {
  const router = useRouter()
  const { isLoggedIn, isAdmin } = useAuth()

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    fetchReviews()
  }, [isLoggedIn, isAdmin])

  const fetchReviews = () => {
    setLoading(true)
    reviewsApi.getAllAdmin()
      .then(setReviews)
      .catch(e => setError(e?.message || 'Failed to load reviews'))
      .finally(() => setLoading(false))
  }

  const handleDelete = async (id: string) => {
    const confirmed = await toastConfirm('Delete this review?')
    if (!confirmed) return
    try {
      await reviewsApi.deleteReview(id)
      toast.success('Review deleted successfully')
      setReviews(prev => prev.filter(r => r.id !== id))
    } catch (e: any) {
      toast.error(e?.message || 'Failed to delete review')
      setError(e?.message || 'Failed to delete review')
    }
  }

  const filtered = reviews.filter(r => {
    const matchRating = filterRating === null || Math.floor(Number(r.rating)) === filterRating
    const matchSearch = !search || r.user_name?.toLowerCase().includes(search.toLowerCase()) || r.comment?.toLowerCase().includes(search.toLowerCase()) || (r.Product as any)?.name?.toLowerCase().includes(search.toLowerCase())
    return matchRating && matchSearch
  })

  const renderStars = (rating: number) => (
    <div className="flex items-center space-x-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={14} className={s <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
      ))}
    </div>
  )

  const avgRating = reviews.length ? (reviews.reduce((a, r) => a + Number(r.rating), 0) / reviews.length).toFixed(1) : '0.0'

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
            <p className="text-sm text-gray-600">{reviews.length} total reviews · Avg rating: {avgRating}</p>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}<button className="ml-2 underline text-xs" onClick={() => setError('')}>dismiss</button></div>}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <input
            placeholder="Search by name, comment, product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm w-72"
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filter:</span>
            {[null, 5, 4, 3, 2, 1].map(r => (
              <button key={String(r)} onClick={() => setFilterRating(r)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${filterRating === r ? 'bg-[#003F62] text-white border-[#003F62]' : 'border-gray-300 text-gray-700 hover:border-[#003F62]'}`}>
                {r === null ? 'All' : `${r}★`}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[5,4,3,2,1].map(s => {
            const count = reviews.filter(r => Math.floor(Number(r.rating)) === s).length
            const pct = reviews.length ? Math.round(count / reviews.length * 100) : 0
            return (
              <div key={s} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="flex justify-center mb-1">{renderStars(s)}</div>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-xs text-gray-500">{pct}%</p>
              </div>
            )
          })}
        </div>

        {/* Reviews Table */}
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No reviews found.</div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Product</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Rating</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Review</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(review => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{review.user_name || 'Anonymous'}</td>
                    <td className="px-4 py-3 text-gray-600">{(review.Product as any)?.name || <span className="text-gray-400 italic">Unknown</span>}</td>
                    <td className="px-4 py-3">{renderStars(Number(review.rating))}</td>
                    <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{review.comment}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-GB') : '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
