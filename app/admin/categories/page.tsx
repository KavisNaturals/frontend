'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Image from 'next/image'
import { Trash2, Upload, Plus, Pencil, Check, X } from 'lucide-react'
import { categoriesApi, uploadApi, API_BASE_URL, normalizeUrl, type Category } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { toastConfirm } from '@/lib/toastConfirm'

function getCatImage(cat: Category) {
  const p = cat.image_path
  if (!p) return '/images/placeholder.svg'
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

export default function AdminCategoriesPage() {
  const router = useRouter()
  const { isLoggedIn, isAdmin } = useAuth()

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const [form, setForm] = useState({ name: '', description: '', image_path: '', sort_order: '' })

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    fetchCategories()
  }, [isLoggedIn, isAdmin])

  const fetchCategories = () => {
    setLoading(true)
    categoriesApi.getAllAdmin()
      .then(setCategories)
      .catch(e => setError(e?.message || 'Failed to load categories'))
      .finally(() => setLoading(false))
  }

  const handleUpload = async (file?: File) => {
    if (!file) return
    setError('')
    // Category: square/circular, min 200×200, max 1000×1000
    const dimError = await validateImageDimensions(file, 200, 200, 1000, 1000, 'Category')
    if (dimError) { setError(dimError); return }
    setUploading(true)
    try {
      const res = await uploadApi.uploadImage(file)
      setForm(prev => ({ ...prev, image_path: res.url }))
    } catch (e: any) { setError(e?.message || 'Upload failed') }
    finally { setUploading(false) }
  }

  const handleAdd = async () => {
    if (!form.name.trim()) { setError('Category name is required'); return }
    setAdding(true)
    try {
      await categoriesApi.create({
        name: form.name.trim(),
        description: form.description,
        image_path: form.image_path,
        sort_order: form.sort_order ? Number(form.sort_order) : 0,
        is_active: true,
      })
      setForm({ name: '', description: '', image_path: '', sort_order: '' })
      setShowForm(false)
      fetchCategories()
    } catch (e: any) { setError(e?.message || 'Failed to add category') }
    finally { setAdding(false) }
  }

  const handleRename = async (cat: Category) => {
    if (!editName.trim()) return
    try {
      await categoriesApi.update(cat.id, { name: editName.trim() })
      setEditingId(null)
      fetchCategories()
    } catch (e: any) { setError(e?.message || 'Failed to rename') }
  }

  const handleDelete = async (id: string) => {
    const confirmed = await toastConfirm('Delete this category? Products in this category will not be deleted.')
    if (!confirmed) return
    try {
      await categoriesApi.delete(id)
      toast.success('Category deleted successfully')
      fetchCategories()
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
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-sm text-gray-600">Manage product categories shown on the website</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center space-x-2 px-4 py-2 bg-[#003F62] text-white rounded-lg hover:bg-[#003F62]/90">
            <Plus size={18} /><span>Add Category</span>
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}<button className="ml-2 underline text-xs" onClick={() => setError('')}>dismiss</button></div>}

        {/* Add Category Form */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">New Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Category Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg bg-white" />
              <input placeholder="Description (optional)" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg bg-white" />
              <input placeholder="Sort order (0, 1, 2...)" type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg bg-white" />
            </div>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-colors">
              <Upload size={24} className="text-gray-400 mb-1" />
              <span className="text-sm text-gray-600">Upload category image (optional)</span>
              <span className="text-xs text-gray-400 mt-1">Recommended: 400×400px — Min: 200×200px — Max: 1000×1000px (square)</span>
              {uploading && <span className="text-sm text-blue-600 mt-1">Uploading...</span>}
              {form.image_path && <span className="text-xs text-green-600 mt-1 break-all">{form.image_path}</span>}
              <input type="file" accept="image/*" className="hidden" onChange={e => handleUpload(e.target.files?.[0])} />
            </label>
            {form.image_path && (
              <Image src={form.image_path} alt="Preview" width={200} height={200} className="w-24 h-24 rounded-full object-cover" unoptimized />
            )}
            <div className="flex space-x-3">
              <button onClick={handleAdd} disabled={adding || uploading} className="px-6 py-2 bg-[#003F62] text-white rounded-lg disabled:opacity-60">
                {adding ? 'Adding...' : 'Add Category'}
              </button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" /></div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No categories yet. Add your first category!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(cat => (
              <div key={cat.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={getCatImage(cat)} alt={cat.name} className="w-full h-full object-cover" onError={e => { e.currentTarget.src = '/images/placeholder.svg' }} />
                </div>
                <div className="flex-1 min-w-0">
                  {editingId === cat.id ? (
                    <div className="flex items-center space-x-2">
                      <input value={editName} onChange={e => setEditName(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm bg-white w-full" onKeyDown={e => e.key === 'Enter' && handleRename(cat)} autoFocus />
                      <button onClick={() => handleRename(cat)} className="text-green-600"><Check size={16} /></button>
                      <button onClick={() => setEditingId(null)} className="text-gray-400"><X size={16} /></button>
                    </div>
                  ) : (
                    <p className="font-semibold text-gray-900 truncate">{cat.name}</p>
                  )}
                  {cat.description && <p className="text-xs text-gray-500 truncate">{cat.description}</p>}
                  <p className="text-xs text-gray-400">Sort: {cat.sort_order ?? 0} · {cat.is_active ? '✓ Active' : '○ Inactive'}</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <button onClick={() => { setEditingId(cat.id); setEditName(cat.name) }} className="text-blue-500 hover:text-blue-700"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
