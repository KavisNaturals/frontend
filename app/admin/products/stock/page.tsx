'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { productsApi, type Product, API_BASE_URL } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Save, Search, Package, AlertCircle } from 'lucide-react'

function getImage(product: Product) {
  const url = product.imageUrl || product.image_url || product.imagePath || product.image_path
  if (!url) return '/images/admin/product-image.png'
  if (url.startsWith('http') || url.startsWith('/')) return url
  return `${API_BASE_URL}/uploads/${url}`
}

interface StockRow {
  productId: string
  productName: string
  image: string
  isVariant: boolean
  variantLabel?: string // undefined = base product stock
  currentStock: number
  newStock: string
  dirty: boolean
}

const AdminStockPage = () => {
  const router = useRouter()
  const { isLoggedIn, isAdmin } = useAuth()
  const [rows, setRows] = useState<StockRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [savedCount, setSavedCount] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    productsApi.getAll()
      .then((products) => {
        const allRows: StockRow[] = []
        for (const p of products) {
          const opts = Array.isArray((p as any).options) ? (p as any).options : []
          if (opts.length > 0) {
            // One row per variant
            opts.forEach((v: any) => {
              allRows.push({
                productId: p.id,
                productName: p.name,
                image: getImage(p),
                isVariant: true,
                variantLabel: v.label,
                currentStock: Number(v.stock ?? 0),
                newStock: String(v.stock ?? 0),
                dirty: false,
              })
            })
          } else {
            // Single row for product
            allRows.push({
              productId: p.id,
              productName: p.name,
              image: getImage(p),
              isVariant: false,
              currentStock: Number(p.stock ?? 0),
              newStock: String(p.stock ?? 0),
              dirty: false,
            })
          }
        }
        setRows(allRows)
      })
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [isLoggedIn, isAdmin, router])

  const handleChange = (idx: number, val: string) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, newStock: val, dirty: r.currentStock !== Number(val) } : r))
  }

  const handleSave = async () => {
    const dirtyRows = rows.filter(r => r.dirty)
    if (dirtyRows.length === 0) return
    setSaving(true)
    setError('')
    let saved = 0
    try {
      // Group dirty rows by productId
      const productMap: Record<string, StockRow[]> = {}
      dirtyRows.forEach(r => {
        if (!productMap[r.productId]) productMap[r.productId] = []
        productMap[r.productId].push(r)
      })

      for (const [productId, changedRows] of Object.entries(productMap)) {
        const product = await productsApi.getById(productId) as any
        const isVariantProduct = changedRows[0].isVariant

        if (isVariantProduct) {
          const opts = Array.isArray(product.options) ? product.options : []
          const updatedOpts = opts.map((opt: any) => {
            const match = changedRows.find(r => r.variantLabel === opt.label)
            return match ? { ...opt, stock: Number(match.newStock) } : opt
          })
          await productsApi.update(productId, { options: updatedOpts })
        } else {
          await productsApi.update(productId, { stock: Number(changedRows[0].newStock) })
        }
        saved += changedRows.length
      }

      // Update currentStock to reflect saved values and clear dirty flag
      setRows(prev => prev.map(r => r.dirty ? { ...r, currentStock: Number(r.newStock), dirty: false } : r))
      setSavedCount(saved)
      setTimeout(() => setSavedCount(0), 3000)
    } catch (e: any) {
      setError(e?.message || 'Failed to save stock changes')
    } finally {
      setSaving(false)
    }
  }

  const filtered = rows.filter(r =>
    r.productName.toLowerCase().includes(search.toLowerCase()) ||
    (r.variantLabel?.toLowerCase() || '').includes(search.toLowerCase())
  )

  const dirtyCount = rows.filter(r => r.dirty).length

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
            <p className="text-sm text-gray-600">Update stock levels for all products and variants in one place</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || dirtyCount === 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#003F62] text-white font-semibold rounded-lg hover:bg-[#003F62]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={16} />
            {saving ? 'Saving...' : dirtyCount > 0 ? `Save ${dirtyCount} change${dirtyCount > 1 ? 's' : ''}` : 'No changes'}
          </button>
        </div>

        {savedCount > 0 && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
            ✓ Successfully updated {savedCount} stock level{savedCount > 1 ? 's' : ''}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Search */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or variants..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide">Product</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide">Variant</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide">Current Stock</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide">New Stock</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="py-4 px-4">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <Package size={36} className="mx-auto mb-2 text-gray-300" />
                    No products found
                  </td>
                </tr>
              ) : (
                filtered.map((row, idx) => {
                  const actualIdx = rows.findIndex(r => r.productId === row.productId && r.variantLabel === row.variantLabel && !r.variantLabel === !row.variantLabel)
                  const stock = Number(row.newStock)
                  return (
                    <tr key={`${row.productId}-${row.variantLabel ?? 'base'}`} className={`hover:bg-gray-50 ${row.dirty ? 'bg-yellow-50' : ''}`}>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <img src={row.image} alt={row.productName} className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.src = '/images/placeholder.svg' }} />
                          </div>
                          <span className="text-sm font-medium text-gray-800 line-clamp-2">{row.productName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {row.variantLabel ? (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">{row.variantLabel}</span>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Base product</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-sm font-semibold ${row.currentStock === 0 ? 'text-red-500' : row.currentStock <= 10 ? 'text-orange-500' : 'text-gray-800'}`}>
                          {row.currentStock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          value={row.newStock}
                          onChange={e => handleChange(actualIdx, e.target.value)}
                          className={`w-24 px-3 py-1.5 border rounded-lg text-sm text-center bg-white focus:outline-none focus:ring-2 focus:ring-primary
                            ${row.dirty ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        {stock === 0 ? (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">Out of Stock</span>
                        ) : stock <= 10 ? (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">Low ({stock})</span>
                        ) : (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">In Stock</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>

          {!loading && filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
              <span>Showing {filtered.length} of {rows.length} entries</span>
              {dirtyCount > 0 && <span className="text-yellow-600 font-medium">{dirtyCount} unsaved change{dirtyCount > 1 ? 's' : ''}</span>}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminStockPage
