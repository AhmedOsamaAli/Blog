import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { CATEGORIES, formatDateShort } from '../utils/helpers'

export default function BlogCard({ post, index = 0 }) {
  const cat = CATEGORIES[post.category] || CATEGORIES.thoughts

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Link to={`/blog/${post.slug}`} className="block group gradient-border-wrap">
        <article className="card card-hover overflow-hidden h-full flex flex-col">
          {/* Cover */}
          <div className="relative h-44 overflow-hidden">
            {post.coverImage && /^https:\/\//i.test(post.coverImage) ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${cat.gradient}`} />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-700/80 via-transparent to-transparent" />

            {/* Featured badge */}
            {post.featured && (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest
                bg-violet-600/90 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
                Featured
              </span>
            )}

            {/* Category */}
            <span className={`absolute bottom-3 left-3 category-badge ${cat.bgClass} ${cat.textClass}`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.dotColor }} />
              {cat.label}
            </span>
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col flex-1 gap-3">
            <h2 className="font-display font-bold text-lg text-slate-100 leading-snug
              group-hover:text-violet-300 transition-colors duration-200 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[11px] text-slate-500 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer meta */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar size={11} />{formatDateShort(post.createdAt)}</span>
                <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime} min</span>
              </div>
              <span className="flex items-center gap-1 text-xs text-violet-400 font-medium
                opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Read <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
