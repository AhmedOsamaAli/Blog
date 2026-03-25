import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Tag, Edit, ChevronRight } from 'lucide-react'
import { useBlog } from '../context/BlogContext'
import ReadingProgress from '../components/ReadingProgress'
import MarkdownRenderer from '../components/MarkdownRenderer'
import LoadingSpinner from '../components/LoadingSpinner'
import { CATEGORIES, formatDate, extractHeadings } from '../utils/helpers'

const PAGE = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0 },
  transition: { duration: 0.35 },
}

export default function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { getBySlug, publishedPosts, isAdmin, loading } = useBlog()

  const post = getBySlug(slug)

  // Still loading from Supabase — wait before declaring 404
  if (loading && !post) {
    return <LoadingSpinner fullPage text="Loading post…" />
  }

  if (!post || !post.published) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-500 text-lg">Post not found.</p>
          <Link to="/blog" className="btn-secondary text-sm">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  const cat = CATEGORIES[post.category] || CATEGORIES.thoughts
  const headings = extractHeadings(post.content)
  const all = publishedPosts()
  const idx = all.findIndex(p => p.id === post.id)
  const prev = all[idx + 1] || null
  const next = all[idx - 1] || null

  return (
    <motion.div {...PAGE}>
      <ReadingProgress />

      {/* Hero */}
      <div className="relative">
        {post.coverImage && /^https:\/\//i.test(post.coverImage) ? (
          <div className="h-72 sm:h-96 relative overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/20" />
          </div>
        ) : (
          <div className={`h-56 sm:h-72 bg-gradient-to-br ${cat.gradient} relative`}>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
          </div>
        )}

        <div className="section-container relative -mt-24 sm:-mt-32 pb-0">
          <div className="max-w-3xl">
            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="btn-ghost mb-6 -ml-1 group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>

            {/* Category */}
            <span className={`category-badge ${cat.bgClass} ${cat.textClass} mb-4`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.dotColor }} />
              {cat.label}
            </span>

            {/* Title */}
            <h1 className="font-display font-extrabold text-slate-100 leading-tight mt-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />{formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />{post.readingTime} min read
              </span>
              {isAdmin && (
                <Link
                  to={`/admin/edit/${post.id}`}
                  className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors ml-auto"
                >
                  <Edit size={13} /> Edit
                </Link>
              )}
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mt-4">
                <Tag size={12} className="text-slate-600" />
                {post.tags.map(tag => (
                  <span key={tag}
                    className="text-xs text-slate-500 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="section-container py-12">
        <div className="flex gap-14 max-w-6xl">
          {/* Main content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <MarkdownRenderer content={post.content} />
          </article>

          {/* Sidebar TOC */}
          {headings.length > 1 && (
            <aside className="hidden xl:block w-56 flex-shrink-0">
              <div className="sticky top-28">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">
                  On This Page
                </p>
                <nav className="space-y-1">
                  {headings.map(h => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block text-xs leading-snug py-1 transition-colors hover:text-violet-400
                        ${h.level === 2 ? 'text-slate-400 font-medium' : 'text-slate-600 pl-3'}
                      `}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="max-w-3xl mt-16 grid sm:grid-cols-2 gap-4 pt-10 border-t border-white/[0.06]">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="card card-hover p-5 group">
                <p className="text-xs text-slate-600 mb-1.5">← Previous</p>
                <p className="text-sm font-semibold text-slate-300 group-hover:text-violet-300 transition-colors line-clamp-2">
                  {prev.title}
                </p>
              </Link>
            ) : <div />}

            {next && (
              <Link to={`/blog/${next.slug}`} className="card card-hover p-5 text-right group sm:col-start-2">
                <p className="text-xs text-slate-600 mb-1.5">Next →</p>
                <p className="text-sm font-semibold text-slate-300 group-hover:text-violet-300 transition-colors line-clamp-2">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        )}

        {/* Back to blog */}
        <div className="max-w-3xl mt-10">
          <Link to="/blog" className="btn-ghost -ml-1">
            <ArrowLeft size={14} /> All posts
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
