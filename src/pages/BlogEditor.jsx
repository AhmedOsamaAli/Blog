import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, Eye, EyeOff, ArrowLeft, AlertTriangle } from 'lucide-react'
import { useBlog } from '../context/BlogContext'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { slugify, readingTime, CATEGORIES } from '../utils/helpers'

const PAGE = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0 },
  transition: { duration: 0.3 },
}

const EMPTY = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'tech',
  tags: '',
  coverImage: '',
  published: false,
  featured: false,
}

export default function BlogEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAdmin, getById, createPost, updatePost } = useBlog()

  const existing = id ? getById(id) : null

  const [form, setForm] = useState(() => {
    if (existing) {
      return {
        ...existing,
        tags: (existing.tags || []).join(', '),
      }
    }
    return EMPTY
  })

  const [preview, setPreview]     = useState(false)
  const [slugManual, setSlugManual] = useState(!!existing)
  const [error, setError]           = useState('')
  const [saving, setSaving]         = useState(false)

  // Auto-generate slug from title (unless manually edited)
  useEffect(() => {
    if (!slugManual && form.title) {
      setForm(f => ({ ...f, slug: slugify(f.title) }))
    }
  }, [form.title, slugManual])

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-slate-400">You need to be logged in as admin.</p>
          <Link to="/admin" className="btn-primary text-sm">Go to Admin →</Link>
        </div>
      </div>
    )
  }

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title.trim())   { setError('Title is required.');   return }
    if (!form.slug.trim())    { setError('Slug is required.');     return }
    if (!form.content.trim()) { setError('Content is required.'); return }
    if (form.coverImage && !/^https:\/\//i.test(form.coverImage)) {
      setError('Cover image URL must start with https://')
      return
    }

    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      readingTime: readingTime(form.content),
    }
    delete data.id
    delete data.createdAt
    delete data.updatedAt

    setSaving(true)
    const { error: err } = existing
      ? await updatePost(existing.id, data)
      : await createPost(data)
    setSaving(false)

    if (err) { setError(err); return }
    navigate('/admin')
  }

  return (
    <motion.div {...PAGE} className="pt-24 pb-16 min-h-screen">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="btn-ghost -ml-1">
              <ArrowLeft size={14} /> Admin
            </Link>
            <span className="text-slate-700">/</span>
            <h1 className="font-display font-bold text-xl text-slate-100">
              {existing ? 'Edit Post' : 'New Post'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreview(p => !p)}
              className="btn-ghost"
            >
              {preview ? <EyeOff size={14} /> : <Eye size={14} />}
              {preview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={handleSubmit} disabled={saving} className="btn-primary disabled:opacity-60">
              {saving
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                : <><Save size={15} /> {existing ? 'Save Changes' : 'Publish'}</>}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 mb-6">
            <AlertTriangle size={14} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid xl:grid-cols-2 gap-6">
            {/* ── LEFT: form fields ── */}
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="label">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  className="input text-lg font-medium"
                  placeholder="An Interesting Post Title"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="label">Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={e => { setSlugManual(true); set('slug', e.target.value) }}
                  className="input font-mono text-sm"
                  placeholder="auto-generated-from-title"
                />
                <p className="text-xs text-slate-600 mt-1">Will be used as the URL: /blog/<em>{form.slug || 'your-slug'}</em></p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="label">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => set('excerpt', e.target.value)}
                  className="textarea"
                  rows={3}
                  placeholder="A short summary that appears in blog cards and SEO descriptions…"
                />
              </div>

              {/* Category & Tags row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Category *</label>
                  <select
                    value={form.category}
                    onChange={e => set('category', e.target.value)}
                    className="input"
                  >
                    {Object.entries(CATEGORIES).map(([key, cfg]) => (
                      <option key={key} value={key}>{cfg.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Tags <span className="text-slate-600 font-normal">(comma-separated)</span></label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={e => set('tags', e.target.value)}
                    className="input"
                    placeholder="react, javascript, tips"
                  />
                </div>
              </div>

              {/* Cover image */}
              <div>
                <label className="label">Cover Image URL</label>
                <input
                  type="url"
                  value={form.coverImage}
                  onChange={e => set('coverImage', e.target.value)}
                  className="input"
                  placeholder="https://images.unsplash.com/…"
                />
                {form.coverImage && /^https:\/\//i.test(form.coverImage) && (
                  <img
                    src={form.coverImage}
                    alt="Cover preview"
                    className="mt-3 h-36 w-full object-cover rounded-xl border border-white/[0.06]"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                )}
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-8 pt-1">
                <ToggleField
                  label="Published"
                  sublabel="Visible to readers"
                  checked={form.published}
                  onChange={v => set('published', v)}
                />
                <ToggleField
                  label="Featured"
                  sublabel="Show on homepage"
                  checked={form.featured}
                  onChange={v => set('featured', v)}
                />
              </div>
            </div>

            {/* ── RIGHT: content editor or preview ── */}
            <div className="flex flex-col">
              {preview ? (
                <div className="card p-6 flex-1 overflow-y-auto max-h-[70vh] xl:max-h-none">
                  {form.content
                    ? <MarkdownRenderer content={form.content} />
                    : <p className="text-slate-600 text-sm italic">Nothing to preview yet.</p>
                  }
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <label className="label">
                    Content <span className="text-slate-600 font-normal">(Markdown)</span>
                  </label>
                  <textarea
                    value={form.content}
                    onChange={e => set('content', e.target.value)}
                    className="textarea flex-1 font-mono text-sm leading-relaxed min-h-[60vh]"
                    placeholder={`## Introduction\n\nStart writing your post here. Markdown is fully supported.\n\n\`\`\`js\nconsole.log('Hello, world!')\n\`\`\``}
                  />
                  <p className="text-xs text-slate-600 mt-1.5">
                    {form.content.split(/\s+/).filter(Boolean).length} words ·{' '}
                    ~{readingTime(form.content)} min read
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom submit */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/[0.05]">
            <Link to="/admin" className="btn-secondary">Cancel</Link>
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
              {saving
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                : <><Save size={15} /> {existing ? 'Save Changes' : 'Create Post'}</>}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

function ToggleField({ label, sublabel, checked, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="toggle flex-shrink-0">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="toggle-slider" />
      </label>
      <div>
        <p className="text-sm font-medium text-slate-300">{label}</p>
        <p className="text-xs text-slate-600">{sublabel}</p>
      </div>
    </div>
  )
}
