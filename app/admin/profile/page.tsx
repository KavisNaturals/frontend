'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { usersApi, settingsApi, type UserProfile, type SocialLinks } from '@/lib/api'
import { UserCircle, Edit2, Save, X, Lock, Mail, User, Eye, EyeOff, Facebook, Instagram, Twitter, Youtube, Link as LinkIcon } from 'lucide-react'

const AdminProfilePage = () => {
  const router = useRouter()
  const { isLoggedIn, isAdmin, user: authUser } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [changingPwd, setChangingPwd] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  const [form, setForm] = useState({ name: '', email: '' })
  const [pwdForm, setPwdForm] = useState({ newPassword: '', confirmPassword: '' })
  const [pwdError, setPwdError] = useState('')
  const [showNewPwd, setShowNewPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)

  // Social links
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({ facebook: '', instagram: '', twitter: '', youtube: '' })
  const [editingSocial, setEditingSocial] = useState(false)
  const [socialForm, setSocialForm] = useState<SocialLinks>({ facebook: '', instagram: '', twitter: '', youtube: '' })
  const [savingSocial, setSavingSocial] = useState(false)

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) { router.push('/admin/login'); return }
    usersApi.getProfile()
      .then(p => { setProfile(p); setForm({ name: p.name, email: p.email }) })
      .catch(() => {})
      .finally(() => setLoading(false))
    settingsApi.getSocialLinks()
      .then(res => { setSocialLinks(res.value || {}); setSocialForm(res.value || {}) })
      .catch(() => {})
  }, [isLoggedIn, isAdmin, router])

  const handleSaveProfile = async () => {
    if (!form.name.trim() || !form.email.trim()) return
    setSaving(true)
    try {
      const updated = await usersApi.updateProfile({ name: form.name, email: form.email })
      setProfile(updated)
      setForm({ name: updated.name, email: updated.email })
      setEditing(false)
      setSaveMsg('Profile updated successfully!')
      setTimeout(() => setSaveMsg(''), 3000)
    } catch { setSaveMsg('Failed to update profile.') } finally { setSaving(false) }
  }

  const handleSavePassword = async () => {
    setPwdError('')
    if (!pwdForm.newPassword || pwdForm.newPassword.length < 6) {
      setPwdError('Password must be at least 6 characters.'); return
    }
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setPwdError('Passwords do not match.'); return
    }
    setSaving(true)
    try {
      await usersApi.updateProfile({ password: pwdForm.newPassword })
      setChangingPwd(false)
      setPwdForm({ newPassword: '', confirmPassword: '' })
      setSaveMsg('Password changed successfully!')
      setTimeout(() => setSaveMsg(''), 3000)
    } catch { setPwdError('Failed to change password.') } finally { setSaving(false) }
  }

  const handleSaveSocial = async () => {
    setSavingSocial(true)
    try {
      const res = await settingsApi.updateSocialLinks(socialForm)
      setSocialLinks(res.value)
      setSocialForm(res.value)
      setEditingSocial(false)
      setSaveMsg('Social links updated!')
      setTimeout(() => setSaveMsg(''), 3000)
    } catch { setSaveMsg('Failed to update social links.') } finally { setSavingSocial(false) }
  }

  if (loading) return (
    <AdminLayout>
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003F62]" />
      </div>
    </AdminLayout>
  )

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-sm text-gray-600">Home &gt; Admin Profile</p>
        </div>

        {saveMsg && (
          <div className={`px-4 py-3 rounded-lg text-sm font-medium ${saveMsg.includes('success') ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
            {saveMsg}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Profile Details</h2>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#003F62] border border-[#003F62] rounded-lg hover:bg-[#003F62] hover:text-white transition-colors"
              >
                <Edit2 size={14} /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditing(false); setForm({ name: profile?.name || '', email: profile?.email || '' }) }}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <X size={14} /> Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-[#003F62] text-white rounded-lg hover:bg-[#003F62]/90 disabled:opacity-60"
                >
                  <Save size={14} /> {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full bg-[#003F62]/10 flex items-center justify-center overflow-hidden flex-shrink-0">
              {profile?.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <UserCircle size={48} className="text-[#003F62]" />
              )}
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{profile?.name}</p>
              <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">{profile?.role || 'Admin'}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                <User size={14} /> Full Name
              </label>
              {editing ? (
                <input
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003F62] text-sm bg-white"
                />
              ) : (
                <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-sm text-gray-800">{profile?.name}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              {editing ? (
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003F62] text-sm bg-white"
                />
              ) : (
                <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-sm text-gray-800">{profile?.email}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-sm text-gray-500 capitalize">{profile?.role || 'admin'}</div>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Lock size={18} /> Change Password
            </h2>
            {!changingPwd && (
              <button
                onClick={() => setChangingPwd(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#003F62] border border-[#003F62] rounded-lg hover:bg-[#003F62] hover:text-white transition-colors"
              >
                <Edit2 size={14} /> Change
              </button>
            )}
          </div>

          {!changingPwd ? (
            <p className="text-sm text-gray-500">Click "Change" to update your password.</p>
          ) : (
            <div className="space-y-4">
              {pwdError && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{pwdError}</div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPwd ? 'text' : 'password'}
                    value={pwdForm.newPassword}
                    onChange={e => setPwdForm(p => ({ ...p, newPassword: e.target.value }))}
                    placeholder="Min. 6 characters"
                    className="w-full px-4 py-2.5 pr-11 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003F62] text-sm bg-white"
                  />
                  <button type="button" onClick={() => setShowNewPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNewPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPwd ? 'text' : 'password'}
                    value={pwdForm.confirmPassword}
                    onChange={e => setPwdForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="Repeat new password"
                    className="w-full px-4 py-2.5 pr-11 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003F62] text-sm bg-white"
                  />
                  <button type="button" onClick={() => setShowConfirmPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirmPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => { setChangingPwd(false); setPwdForm({ newPassword: '', confirmPassword: '' }); setPwdError('') }}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <X size={14} /> Cancel
                </button>
                <button
                  onClick={handleSavePassword}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold bg-[#003F62] text-white rounded-lg hover:bg-[#003F62]/90 disabled:opacity-60"
                >
                  <Save size={14} /> {saving ? 'Saving...' : 'Update Password'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Social Media Links Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <LinkIcon size={18} /> Social Media Links
            </h2>
            {!editingSocial ? (
              <button
                onClick={() => { setEditingSocial(true); setSocialForm(socialLinks) }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#003F62] border border-[#003F62] rounded-lg hover:bg-[#003F62] hover:text-white transition-colors"
              >
                <Edit2 size={14} /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => { setEditingSocial(false); setSocialForm(socialLinks) }} className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <X size={14} /> Cancel
                </button>
                <button onClick={handleSaveSocial} disabled={savingSocial} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-[#003F62] text-white rounded-lg hover:bg-[#003F62]/90 disabled:opacity-60">
                  <Save size={14} /> {savingSocial ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {[
              { key: 'facebook' as const, icon: Facebook, label: 'Facebook', placeholder: 'https://facebook.com/yourpage' },
              { key: 'instagram' as const, icon: Instagram, label: 'Instagram', placeholder: 'https://instagram.com/yourhandle' },
              { key: 'twitter' as const, icon: Twitter, label: 'Twitter / X', placeholder: 'https://twitter.com/yourhandle' },
              { key: 'youtube' as const, icon: Youtube, label: 'YouTube', placeholder: 'https://youtube.com/yourchannel' },
            ].map(({ key, icon: Icon, label, placeholder }) => (
              <div key={key} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
                  {editingSocial ? (
                    <input
                      type="url"
                      value={socialForm[key] || ''}
                      onChange={e => setSocialForm(p => ({ ...p, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#003F62] bg-white"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 truncate">
                      {socialLinks[key] || <span className="text-gray-300 italic">Not set</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminProfilePage
