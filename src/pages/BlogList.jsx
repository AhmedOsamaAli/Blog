import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { useBlog } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'
import CategoryFilter from '../components/CategoryFilter'
import SearchBar from '../components/SearchBar'
import { CardSkeleton } from '../components/LoadingSpinner'

const PAGE = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0 },
  transition: { duration: 0.35 },
}

const PAGE_SIZE = 9

export default function BlogList() {
  const { publishedPosts, loading } = useBlog()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const all = publishedPosts()
  const catParam = searchParams.get('category') || 'all'

  // Reset page + scroll to top when filter/search changes
  useEffect(() => {
    setPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [search, catParam])

  const counts = useMemo(() => {
    const c = {}
    all.forEach(p => { c[p.category] = (c[p.category] || 0) + 1 })
    return c
  }, [all])

  const filtered = useMemo(() => {
    let r = all
    if (catParam !== 'all') r = r.filter(p => p.category === catParam)
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      )
    }
    return r
  }, [all, catParam, search])

  const shown = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = shown.length < filtered.length

  return (
    <motion.div {...PAGE} className="pt-28 pb-24">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500 block mb-2">
            All Posts
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100">
            The Blog
          </h1>
          <p className="text-slate-500 mt-2 max-w-lg">
            {all.length} posts spanning tech, career, personal growth, and more.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 max-w-sm">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        <div className="mb-8">
          <CategoryFilter
            selected={catParam}
            onChange={k => {
              setSearchParams(k === 'all' ? {} : { category: k })
            }}
            counts={counts}
          />
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <FileText size={40} className="text-slate-700" />
            <p className="text-slate-500 text-lg font-medium">No posts found</p>
            <p className="text-slate-600 text-sm">Try a different search or category</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shown.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i % PAGE_SIZE} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="btn-secondary"
                >
                  Load more posts
                </button>
                <p className="text-xs text-slate-600 mt-3">
                  Showing {shown.length} of {filtered.length}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}
