'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { productsApi, uploadApi, categoriesApi, API_BASE_URL, normalizeUrl } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { toastConfirm } from '@/lib/toastConfirm'

function getImage(product: any) {
  const url = product?.imageUrl || product?.image_url || product?.imagePath || product?.image_path
  if (!url) return ''
  if (url.startsWith('/')) return url
  if (url.startsWith('http')) return normalizeUrl(url)
  return `${API_BASE_URL}/uploads/${url}`
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
      } else { resolve(null) }
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null) }
    img.src = url
  })
}

const ProductDetailsPage = () => {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { isLoggedIn, isAdmin } = useAuth()

  const [productData, setProductData] = useState({
    name: '', description: '', product_description: '', category: '', size: '',
    stock: '', price: '', original_price: '', benefits: '', ingredients: '', direction: '', is_featured: false,
    meta_title: '', meta_description: '', meta_keywords: '',
  })
  const [imageUrl, setImageUrl] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null)
  const [variants, setVariants] = useState<{ label: string; price: string; stock: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    categoriesApi.getAll().then(cats => setCategories(cats.map(c => c.name))).catch(() => {})
    productsApi.getById(id)
      .then((p: any) => {
        setProductData({
          name: p.name || '',
          description: p.description || '',
          product_description: p.product_description || '',
          category: p.category || '',
          size: p.size || '',
          stock: String(p.stock ?? ''),
          price: String(p.price ?? ''),
          original_price: String(p.original_price ?? ''),
          benefits: Array.isArray(p.benefits) ? p.benefits.join('\n') : '',
          ingredients: Array.isArray(p.ingredients) ? p.ingredients.join('\n') : '',
          direction: p.direction || '',
          is_featured: !!p.is_featured,
          meta_title: p.meta_title || '',
          meta_description: p.meta_description || '',
          meta_keywords: p.meta_keywords || '',
        })
        setImageUrl(getImage(p))
        setImageUrls(Array.isArray(p.images) ? p.images : [])
        setVariants(Array.isArray(p.options) ? p.options.map((o: any) => ({ label: String(o.label || ''), price: String(o.price || ''), stock: String(o.stock ?? '') })) : [])
      })
      .catch((e: any) => setError(e?.message || 'Failed to load product'))
      .finally(() => setLoading(false))
  }, [isLoggedIn, isAdmin, id, router])

  const handleImageUpload = async (file?: File) => {
    if (!file) return
    setUploading(true)
    setError('')
    const dimError = await validateImageDimensions(file, 400, 400, 4500, 4500, 'Product')
    if (dimError) { setError(dimError); setUploading(false); return }
    try {
      const res = await uploadApi.uploadImage(file)
      setImageUrl(res.url)
    } catch (e: any) {
      setError(e?.message || 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleAdditionalImage = async (idx: number, file?: File) => {
    if (!file) return
    setUploadingIdx(idx)
    setError('')
    const dimError = await validateImageDimensions(file, 400, 400, 4500, 4500, 'Product')
    if (dimError) { setError(dimError); setUploadingIdx(null); return }
    try {
      const res = await uploadApi.uploadImage(file)
      setImageUrls(prev => { const next = [...prev]; next[idx] = res.url; return next })
    } catch (e: any) {
      setError(e?.message || 'Image upload failed')
    } finally { setUploadingIdx(null) }
  }

  const addVariant = () => setVariants(v => [...v, { label: '', price: '', stock: '' }])
  const removeVariant = (i: number) => setVariants(v => v.filter((_, x) => x !== i))
  const updateVariant = (i: number, field: 'label' | 'price' | 'stock', val: string) =>
    setVariants(v => v.map((x, idx) => idx === i ? { ...x, [field]: val } : x))

  const handleUpdate = async () => {
    setSaving(true)
    setError('')
    try {
      await productsApi.update(id, {
        ...productData,
        price: Number(productData.price || 0),
        original_price: productData.original_price ? Number(productData.original_price) : undefined,
        stock: Number(productData.stock || 0),
        benefits: productData.benefits ? productData.benefits.split('\n').map(x => x.trim()).filter(Boolean) : [],
        ingredients: productData.ingredients ? productData.ingredients.split('\n').map(x => x.trim()).filter(Boolean) : [],
        imageUrl,
        images: imageUrls.filter(Boolean),
        options: variants.filter(v => v.label.trim()).map(v => ({ label: v.label.trim(), price: Number(v.price || 0), stock: Number(v.stock || 0) })),
      })
      router.push('/admin/products')
    } catch (e: any) {
      setError(e?.message || 'Failed to update product')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = await toastConfirm('Delete this product?')
    if (!confirmed) return
    setSaving(true)
    setError('')
    try {
      await productsApi.delete(id)
      toast.success('Product deleted successfully')
      router.push('/admin/products')
    } catch (e: any) {
      toast.error(e?.message || 'Failed to delete product')
      setError(e?.message || 'Failed to delete product')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" /></div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
          <p className="text-sm text-gray-600">Home &gt; All Products &gt; Product Details</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <input value={productData.name} onChange={e => setProductData({ ...productData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white" />
              <input value={productData.description} onChange={e => setProductData({ ...productData, description: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white" />
              <textarea rows={4} value={productData.product_description} onChange={e => setProductData({ ...productData, product_description: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white resize-none" />

              <div className="grid grid-cols-2 gap-4">
                <select value={productData.category} onChange={e => setProductData({ ...productData, category: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input value={productData.size} onChange={e => setProductData({ ...productData, size: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <input value={productData.stock} onChange={e => setProductData({ ...productData, stock: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white" />
                <input value={productData.original_price} onChange={e => setProductData({ ...productData, original_price: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white" />
                <input value={productData.price} onChange={e => setProductData({ ...productData, price: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white" />
              </div>

              <textarea rows={3} value={productData.benefits} onChange={e => setProductData({ ...productData, benefits: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white resize-none" />
              <textarea rows={3} value={productData.ingredients} onChange={e => setProductData({ ...productData, ingredients: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white resize-none" />
              <textarea rows={3} value={productData.direction} onChange={e => setProductData({ ...productData, direction: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white resize-none" />

              <label className="inline-flex items-center space-x-2 text-sm text-gray-700">
                <input type="checkbox" checked={productData.is_featured} onChange={e => setProductData({ ...productData, is_featured: e.target.checked })} />
                <span>Featured Product</span>
              </label>

              {/* SEO */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm">SEO</h4>
                <input placeholder="Meta Title" value={productData.meta_title} onChange={e => setProductData({ ...productData, meta_title: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm" />
                <textarea rows={2} placeholder="Meta Description" value={productData.meta_description} onChange={e => setProductData({ ...productData, meta_description: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white resize-none text-sm" />
                <input placeholder="Meta Keywords (comma separated)" value={productData.meta_keywords} onChange={e => setProductData({ ...productData, meta_keywords: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-1">Primary Image</h3>
              <p className="text-xs text-gray-500 mb-3">Main product image shown in listings</p>
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center block cursor-pointer hover:border-primary transition-colors">
                <Upload size={28} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Drop your image here, or browse</p>
                <p className="text-xs text-gray-400 mt-1">Min: 400×400px — Max: 4500×4500px</p>
                <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={e => handleImageUpload(e.target.files?.[0])} />
              </label>
              {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
              {imageUrl ? (
                <div className="mt-3 relative">
                  <Image src={imageUrl} alt="Preview" width={200} height={200} className="rounded-lg object-cover w-full max-h-48" unoptimized />
                  <button type="button" onClick={() => setImageUrl('')} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"><X size={14} /></button>
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-3 text-center">No image selected</p>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-1">Additional Images</h3>
              <p className="text-xs text-gray-500 mb-3">Up to 4 extra gallery images</p>
              <div className="grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map(idx => (
                  <div key={idx}>
                    {imageUrls[idx] ? (
                      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                        <Image src={imageUrls[idx]} alt={`Extra ${idx + 1}`} width={120} height={120} className="object-cover w-full h-full" unoptimized />
                        <button type="button" onClick={() => setImageUrls(prev => { const n = [...prev]; n[idx] = ''; return n })} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"><X size={12} /></button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center" style={{ aspectRatio: '1' }}>
                        {uploadingIdx === idx ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                        ) : (
                          <>
                            <Upload size={20} className="text-gray-400 mb-1" />
                            <p className="text-xs text-gray-500">Image {idx + 2}</p>
                          </>
                        )}
                        <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={e => handleAdditionalImage(idx, e.target.files?.[0])} />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Product Variants</h3>
                  <p className="text-xs text-gray-500">e.g. 100ml / 200ml with prices</p>
                </div>
                <button type="button" onClick={addVariant} className="text-xs bg-primary text-black px-3 py-1.5 rounded-lg hover:bg-primary/80 font-medium">+ Add</button>
              </div>
              {variants.length === 0 && <p className="text-xs text-gray-400 text-center py-2">No variants — product has one size/price</p>}
              <div className="space-y-2">
                {variants.map((v, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input value={v.label} onChange={e => updateVariant(i, 'label', e.target.value)} placeholder="Label (e.g. 200ml)" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
                    <input value={v.price} onChange={e => updateVariant(i, 'price', e.target.value)} placeholder="₹ Price" type="number" min="0" className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
                    <input value={v.stock} onChange={e => updateVariant(i, 'stock', e.target.value)} placeholder="Stock" type="number" min="0" className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
                    <button type="button" onClick={() => removeVariant(i)} className="text-red-500 hover:text-red-700 flex-shrink-0"><X size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button onClick={handleUpdate} disabled={saving || uploading} className="px-8 py-3 bg-[#003F62] text-white font-semibold rounded-lg hover:bg-[#003F62]/90 disabled:opacity-60">
            {saving ? 'UPDATING...' : 'UPDATE'}
          </button>
          <button onClick={handleDelete} disabled={saving} className="px-8 py-3 bg-[#003F62] text-white font-semibold rounded-lg hover:bg-[#003F62]/90 disabled:opacity-60">
            DELETE
          </button>
          <Link href="/admin/products" className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50">
            CANCEL
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ProductDetailsPage
