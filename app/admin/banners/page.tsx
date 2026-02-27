'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Image from 'next/image'
import { Trash2, Upload, ToggleLeft, ToggleRight, Plus } from 'lucide-react'
import { bannersApi, uploadApi, API_BASE_URL, normalizeUrl, type Banner } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { toastConfirm } from '@/lib/toastConfirm'

function getBannerUrl(banner: Banner) {
  const p = banner.image_path
  if (!p) return '/images/banner.png'
  if (p.startsWith('/')) return p
  if (p.startsWith('http')) return normalizeUrl(p)
  return `${API_BASE_URL}/uploads/${p}`
}

function validateImageDimensions(
  file: File,
  minWidth: number,
  minHeight: number,
  maxWidth: number,
  maxHeight: number,
  label: string
): Promise<string | null> {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      const { width: w, height: h } = img
      if (w < minWidth || h < minHeight) {
        resolve(`${label} image must be at least ${minWidth}×${minHeight}px. Your image is ${w}×${h}px.`)
      } else if (w > maxWidth || h > maxHeight) {
        resolve(`${label} image must not exceed ${maxWidth}×${maxHeight}px. Your image is ${w}×${h}px.`)
      } else {
        resolve(null)
      }
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null) }
    img.src = url
  })
}

export default function AdminBannersPage() {
  const router = useRouter()
  const { isLoggedIn, isAdmin } = useAuth()

  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newLink, setNewLink] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newSortOrder, setNewSortOrder] = useState('')
  const [adding, setAdding] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    fetchBanners()
  }, [isLoggedIn, isAdmin])

  const fetchBanners = () => {
    setLoading(true)
    bannersApi.getAll()
      .then(setBanners)
      .catch(e => setError(e?.message || 'Failed to load banners'))
      .finally(() => setLoading(false))
  }

  const handleUpload = async (file?: File) => {
    if (!file) return
    setError('')
    // Banner: landscape, min 800×200, max 3000×1200
    const dimError = await validateImageDimensions(file, 800, 200, 3000, 1200, 'Banner')
    if (dimError) { setError(dimError); return }
    setUploading(true)
    try {
      const res = await uploadApi.uploadImage(file)
      setNewImageUrl(res.url)
    } catch (e: any) {
      setError(e?.message || 'Upload failed')
    } finally { setUploading(false) }
  }

  const handleAdd = async () => {
    if (!newImageUrl) { setError('Please upload an image first'); return }
    setAdding(true)
    try {
      await bannersApi.create({
        title: newTitle,
        image_path: newImageUrl,
        link: newLink,
        sort_order: newSortOrder ? Number(newSortOrder) : 0,
        is_active: true,
      })
      setNewTitle(''); setNewLink(''); setNewImageUrl(''); setNewSortOrder('')
      setShowForm(false)
      fetchBanners()
    } catch (e: any) {
      setError(e?.message || 'Failed to add banner')
    } finally { setAdding(false) }
  }

  const handleToggle = async (banner: Banner) => {
    try {
      await bannersApi.update(banner.id, { is_active: !banner.is_active })
      fetchBanners()
    } catch (e: any) { setError(e?.message || 'Failed to update') }
  }

  const handleDelete = async (id: string) => {
    const confirmed = await toastConfirm('Delete this banner?')
    if (!confirmed) return
    try {
      await bannersApi.delete(id)
      toast.success('Banner deleted successfully')
      fetchBanners()
    } catch (e: any) {
      toast.error(e?.message || 'Failed to delete')
      setError(e?.message || 'Failed to delete')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Banners</h1>
            <p className="text-sm text-gray-600">Manage homepage banners</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center space-x-2 px-4 py-2 bg-[#003F62] text-white rounded-lg hover:bg-[#003F62]/90">
            <Plus size={18} /><span>Add Banner</span>
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}<button className="ml-2 underline text-xs" onClick={() => setError('')}>dismiss</button></div>}

        {/* Add Banner Form */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">New Banner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Title (optional)" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg bg-white" />
              <input placeholder="Link URL (optional)" value={newLink} onChange={e => setNewLink(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg bg-white" />
              <input placeholder="Sort order (0, 1, 2...)" type="number" value={newSortOrder} onChange={e => setNewSortOrder(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg bg-white" />
            </div>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition-colors">
              <Upload size={28} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click to upload banner image</span>
              <span className="text-xs text-gray-400 mt-1">Recommended: 1200×400px — Min: 800×200px — Max: 3000×1200px (landscape)</span>
              {uploading && <span className="text-sm text-blue-600 mt-1">Uploading...</span>}
              {newImageUrl && <span className="text-xs text-green-600 mt-1 break-all">{newImageUrl}</span>}
              <input type="file" accept="image/*" className="hidden" onChange={e => handleUpload(e.target.files?.[0])} />
            </label>
            {newImageUrl && (
              <Image src={newImageUrl} alt="Preview" width={600} height={200} className="rounded-lg object-cover w-full max-h-40" unoptimized />
            )}
            <div className="flex space-x-3">
              <button onClick={handleAdd} disabled={adding || uploading} className="px-6 py-2 bg-[#003F62] text-white rounded-lg disabled:opacity-60">
                {adding ? 'Adding...' : 'Add Banner'}
              </button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
            </div>
          </div>
        )}

        {/* Banners List */}
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" /></div>
        ) : banners.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No banners yet. Add your first banner!</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {banners.map(banner => (
              <div key={banner.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center space-x-4 p-4">
                <div className="w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img src={getBannerUrl(banner)} alt={banner.title || 'Banner'} className="w-full h-full object-cover" onError={e => { e.currentTarget.src = '/images/banner.png' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{banner.title || <span className="text-gray-400 italic">No title</span>}</p>
                  {banner.link && <p className="text-xs text-blue-600 truncate">{banner.link}</p>}
                  <p className="text-xs text-gray-500 mt-1">Sort order: {banner.sort_order ?? 0}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => handleToggle(banner)} title={banner.is_active ? 'Deactivate' : 'Activate'} className={banner.is_active ? 'text-green-500' : 'text-gray-400'}>
                    {banner.is_active ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${banner.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {banner.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <button onClick={() => handleDelete(banner.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
