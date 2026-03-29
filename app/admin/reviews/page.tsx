'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Trash2, Star, Plus, Edit2, X, Save, Upload } from 'lucide-react'
import { reviewsApi, productsApi, uploadApi, type Review, type Product } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { toastConfirm } from '@/lib/toastConfirm'

export default function AdminReviewsPage() {
  const router = useRouter()
  const { isLoggedIn, isAdmin } = useAuth()

  const [reviews, setReviews] = useState<Review[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [modalSaving, setModalSaving] = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [form, setForm] = useState({
    product_id: '',
    user_name: '',
    place: '',
    rating: 5,
    comment: '',
    reviewer_image: '',
  })

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    fetchReviews()
    productsApi.getAll().then(setProducts).catch(() => {})
  }, [isLoggedIn, isAdmin])

  const fetchReviews = () => {
    setLoading(true)
    reviewsApi.getAllAdmin()
      .then(setReviews)
      .catch(e => setError(e?.message || 'Failed to load reviews'))
      .finally(() => setLoading(false))
  }

  const openCreate = () => {
    setEditingReview(null)
    setForm({ product_id: '', user_name: '', place: '', rating: 5, comment: '', reviewer_image: '' })
    setShowModal(true)
  }

  const openEdit = (r: Review) => {
    setEditingReview(r)
    setForm({
      product_id: r.product_id || '',
      user_name: r.user_name || '',
      place: r.place || '',
      rating: Number(r.rating) || 5,
      comment: r.comment || '',
      reviewer_image: (r as any).reviewer_image || '',
    })
    setShowModal(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImg(true)
    try {
      const res = await uploadApi.uploadImage(file)
      setForm(f => ({ ...f, reviewer_image: res.url }))
    } catch { toast.error('Image upload failed') } finally { setUploadingImg(false) }
  }

  const handleSave = async () => {
    if (!form.user_name.trim() || !form.rating) {
      toast.error('Name and rating are required'); return
    }
    if (!editingReview && !form.product_id) {
      toast.error('Please select a product'); return
    }
    setModalSaving(true)
    try {
      if (editingReview) {
        const updated = await reviewsApi.adminUpdate(editingReview.id, {
          rating: form.rating,
          comment: form.comment,
          user_name: form.user_name,
          place: form.place,
          reviewer_image: form.reviewer_image,
        })
        setReviews(prev => prev.map(r => r.id === editingReview.id ? { ...r, ...updated } : r))
        toast.success('Review updated')
      } else {
        const created = await reviewsApi.adminCreate({
          product_id: form.product_id,
          rating: form.rating,
          comment: form.comment,
          user_name: form.user_name,
          place: form.place,
          reviewer_image: form.reviewer_image,
        })
        setReviews(prev => [created, ...prev])
        toast.success('Review created')
      }
      setShowModal(false)
    } catch (e: any) {
      toast.error(e?.message || 'Failed to save review')
    } finally { setModalSaving(false) }
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
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-[#003F62] text-white text-sm font-semibold rounded-lg hover:bg-[#003F62]/90 transition-colors"
          >
            <Plus size={16} /> Add Review
          </button>
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
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {(review as any).reviewer_image ? (
                          <img src={(review as any).reviewer_image} alt={review.user_name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#003F62]">
                            {(review.user_name || 'A')[0].toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{review.user_name || 'Anonymous'}</p>
                          {review.place && <p className="text-xs text-gray-400">{review.place}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{(review.Product as any)?.name || <span className="text-gray-400 italic">Unknown</span>}</td>
                    <td className="px-4 py-3">{renderStars(Number(review.rating))}</td>
                    <td className="px-4 py-3 text-gray-700 text-sm max-w-xs truncate">{review.comment}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">{review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-GB') : '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEdit(review)} className="text-[#003F62] hover:text-[#003F62]/70" title="Edit">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:text-red-700" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 mb-5">{editingReview ? 'Edit Review' : 'Add Review'}</h2>

            <div className="space-y-4">
              {/* Product (only on create) */}
              {!editingReview && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Product *</label>
                  <select
                    value={form.product_id}
                    onChange={e => setForm(f => ({ ...f, product_id: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#003F62] bg-white"
                  >
                    <option value="">Select a product...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Reviewer photo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Reviewer Photo</label>
                <div className="flex items-center gap-3">
                  {form.reviewer_image && (
                    <img src={form.reviewer_image} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-gray-200 flex-shrink-0" />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#003F62] text-sm text-gray-600 transition-colors">
                    {uploadingImg ? (
                      <span className="flex items-center gap-1"><div className="w-4 h-4 border-2 border-[#003F62] border-t-transparent rounded-full animate-spin" /> Uploading...</span>
                    ) : (
                      <><Upload size={14} /> Upload Photo</>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImg} />
                  </label>
                  {form.reviewer_image && (
                    <button onClick={() => setForm(f => ({ ...f, reviewer_image: '' }))} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
                  )}
                </div>
              </div>

              {/* Name & Place */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name *</label>
                  <input
                    value={form.user_name}
                    onChange={e => setForm(f => ({ ...f, user_name: e.target.value }))}
                    placeholder="e.g. Ramya"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#003F62] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Place</label>
                  <input
                    value={form.place}
                    onChange={e => setForm(f => ({ ...f, place: e.target.value }))}
                    placeholder="e.g. Erode"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#003F62] bg-white"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating *</label>
                <div className="flex items-center gap-2">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setForm(f => ({ ...f, rating: s }))}>
                      <Star size={28} className={s <= form.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Review Comment</label>
                <textarea
                  value={form.comment}
                  onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                  rows={3}
                  placeholder="Customer review text..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#003F62] bg-white resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={modalSaving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#003F62] text-white rounded-lg text-sm font-semibold hover:bg-[#003F62]/90 disabled:opacity-60"
              >
                <Save size={14} /> {modalSaving ? 'Saving...' : (editingReview ? 'Update' : 'Create')}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
