import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlusCircle, Edit, Trash2, Eye, EyeOff, LogOut, Shield, AlertTriangle } from 'lucide-react'
import { useBlog } from '../context/BlogContext'
import { CATEGORIES, formatDateShort } from '../utils/helpers'

const PAGE = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0 },
  transition: { duration: 0.3 },
}

// ── AUTH WALL ─────────────────────────────────────────────────────────────────
function AuthWall() {
  const { hasPassword, setupPassword, login, isConfigured } = useBlog()
  const [email, setEmail]     = useState('')
  const [pw, setPw]           = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError]     = useState('')
  const [busy, setBusy]       = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      // ── Supabase mode ─────────────────────────────────────────────────────
      if (isConfigured) {
        const { error: err } = await login({ email, password: pw })
        if (err) setError(err)
        return
      }

      // ── Offline mode ──────────────────────────────────────────────────────
      if (!hasPassword) {
        if (pw.length < 8) { setError('Password must be at least 8 characters.'); return }
        if (pw !== confirm) { setError('Passwords do not match.'); return }
        await setupPassword(pw)
      } else {
        const { error: err } = await login({ password: pw })
        if (err) setError(err)
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500
            flex items-center justify-center shadow-xl shadow-violet-500/20">
            <Shield size={24} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl text-slate-100 mb-1">Admin Access</h1>
          <p className="text-slate-500 text-sm">
            {isConfigured
              ? 'Sign in with your Supabase admin account.'
              : hasPassword
                ? 'Enter your admin password to continue.'
                : 'Create a password to protect the admin panel.'}
          </p>
        </div>

        <form onSubmit={handle} className="card p-6 space-y-4">
          {/* Email — only in Supabase mode */}
          {isConfigured && (
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                autoFocus
                required
              />
            </div>
          )}

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              className="input"
              placeholder="••••••••"
              autoFocus={!isConfigured}
              required
            />
          </div>

          {/* Confirm — only in offline setup mode */}
          {!isConfigured && !hasPassword && (
            <div>
              <label className="label">Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {error && (
            <p className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">
              <AlertTriangle size={13} /> {error}
            </p>
          )}

          <button type="submit" disabled={busy} className="btn-primary w-full justify-center">
            {busy
              ? 'Signing in…'
              : isConfigured
                ? 'Sign In'
                : hasPassword ? 'Sign In' : 'Set Password & Enter'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-4">
          {isConfigured
            ? 'Credentials verified securely via Supabase Auth.'
            : 'Password stored locally as a PBKDF2 hash with salt.'}
        </p>
      </div>
    </div>
  )
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const { posts, logout, deletePost, togglePublished } = useBlog()
  const navigate = useNavigate()
  const [deleteId, setDeleteId]   = useState(null)
  const [toggling, setToggling]   = useState(null)
  const [deleting, setDeleting]   = useState(false)

  const published = posts.filter(p => p.published).length
  const drafts    = posts.length - published

  const confirmDelete = async (id) => {
    setDeleting(true)
    await deletePost(id)
    setDeleting(false)
    setDeleteId(null)
  }

  const handleToggle = async (id) => {
    setToggling(id)
    await togglePublished(id)
    setToggling(null)
  }

  return (
    <div className="pt-28 pb-24">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-1 block">Admin</span>
            <h1 className="font-display font-bold text-3xl text-slate-100">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={logout} className="btn-ghost text-slate-500">
              <LogOut size={14} /> Sign out
            </button>
            <Link to="/admin/new" className="btn-primary">
              <PlusCircle size={16} /> New Post
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total', value: posts.length, color: 'text-slate-300' },
            { label: 'Published', value: published, color: 'text-emerald-400' },
            { label: 'Drafts', value: drafts, color: 'text-amber-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card p-5 text-center">
              <p className={`text-3xl font-display font-bold ${color}`}>{value}</p>
              <p className="text-xs text-slate-600 uppercase tracking-wider mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Posts table */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300">All Posts</h2>
          </div>

          {posts.length === 0 ? (
            <div className="py-20 text-center text-slate-600">
              <p>No posts yet. <Link to="/admin/new" className="text-violet-400 hover:underline">Create your first post →</Link></p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {posts.map(post => {
                const cat = CATEGORIES[post.category] || CATEGORIES.thoughts
                return (
                  <div key={post.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-slate-200 line-clamp-1">{post.title}</p>
                        {post.featured && (
                          <span className="text-[10px] bg-violet-500/20 text-violet-400 border border-violet-500/20 px-1.5 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs ${cat.textClass}`}>{cat.label}</span>
                        <span className="text-xs text-slate-600">{formatDateShort(post.createdAt)}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <span className={`hidden sm:block text-xs px-2.5 py-1 rounded-full border ${
                      post.published
                        ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                        : 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleToggle(post.id)}
                        disabled={toggling === post.id}
                        title={post.published ? 'Unpublish' : 'Publish'}
                        className="btn-ghost p-2 text-slate-500 disabled:opacity-40"
                      >
                        {toggling === post.id
                          ? <span className="w-3.5 h-3.5 border border-slate-500 border-t-transparent rounded-full animate-spin inline-block" />
                          : post.published ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      <button
                        onClick={() => navigate(`/admin/edit/${post.id}`)}
                        title="Edit"
                        className="btn-ghost p-2 text-slate-500"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(post.id)}
                        title="Delete"
                        className="btn-ghost p-2 text-red-500/70 hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-sm w-full p-6 text-center"
          >
            <AlertTriangle size={32} className="text-red-400 mx-auto mb-4" />
            <h3 className="font-display font-bold text-lg text-slate-100 mb-2">Delete Post?</h3>
            <p className="text-slate-500 text-sm mb-6">This is permanent and cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
              <button
                onClick={() => confirmDelete(deleteId)}
                disabled={deleting}
                className="flex-1 justify-center inline-flex items-center gap-2 px-4 py-3
                  bg-red-600/80 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
export default function Admin() {
  const { isAdmin } = useBlog()
  return (
    <motion.div {...PAGE}>
      {isAdmin ? <Dashboard /> : <AuthWall />}
    </motion.div>
  )
}
